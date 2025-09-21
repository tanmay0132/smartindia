import express from "express"
import mysql from "mysql2"
import cors from "cors"
import dotenv from "dotenv"
import bcrypt from "bcrypt"
import nodemailer from "nodemailer"
import twilio from "twilio"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 5000

// Middleware
app.use(cors())
app.use(express.json())

// ✅ Use pool instead of single connection
const pool = mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASS || "",
  database: process.env.DB_NAME || "cropdb",
  connectionLimit: 10,
})

// Promisify db queries
const dbQuery = (query, params = []) => {
  return new Promise((resolve, reject) => {
    pool.query(query, params, (err, results) => {
      if (err) reject(err)
      else resolve(results)
    })
  })
}

// Check DB connection
pool.getConnection((err, conn) => {
  if (err) {
    console.error("❌ MySQL connection error:", err)
    process.exit(1)
  }
  console.log("✅ MySQL connected")
  conn.release()
})

// Create tables
const createTables = async () => {
  try {
    await dbQuery(`CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        email VARCHAR(100) UNIQUE NOT NULL,
        phone VARCHAR(15),
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )`)

    await dbQuery(`CREATE TABLE IF NOT EXISTS otps (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(100),
        phone VARCHAR(15),
        otp VARCHAR(10) NOT NULL,
        expires_at TIMESTAMP NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        INDEX idx_email_expires (email, expires_at),
        INDEX idx_phone_expires (phone, expires_at)
    )`)

    await dbQuery(`CREATE TABLE IF NOT EXISTS fields (
         id INT AUTO_INCREMENT PRIMARY KEY,
    user_email VARCHAR(255) NOT NULL,
    area_name VARCHAR(255) NOT NULL,
    field_name VARCHAR(255) NOT NULL,
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    INDEX idx_user_email (user_email)
   )`);


    console.log("✅ Tables created/verified")
  } catch (err) {
    console.error("❌ Table creation error:", err)
  }
}

createTables()

// Input validation
const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
const validatePassword = (password) => password && password.length >= 6
const validatePhone = (phone) => /^\+?[1-9]\d{1,14}$/.test(phone)

// Nodemailer config
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
})

// Twilio config for SMS
const twilioClient = (() => {
  const accountSid = process.env.TWILIO_ACCOUNT_SID
  const authToken = process.env.TWILIO_AUTH_TOKEN

  if (!accountSid || !authToken) {
    console.warn("⚠️ Twilio credentials not found. SMS functionality will be disabled.")
    return null
  }

  try {
    return twilio(accountSid, authToken)
  } catch (error) {
    console.error("❌ Failed to initialize Twilio client:", error)
    return null
  }
})()

// ✅ Send OTP - Updated to handle both email and phone
app.post("/api/send-otp", async (req, res) => {
  try {
    const { email, phone, name } = req.body
    if (!email && !phone) return res.status(400).json({ message: "Email or phone is required" })
    if (email && !validateEmail(email)) return res.status(400).json({ message: "Invalid email format" })
    if (phone && !validatePhone(phone)) return res.status(400).json({ message: "Invalid phone format" })

    const normalizedEmail = email ? email.toLowerCase().trim() : null
    const phonenumber = phone ? phone.trim() : null

    const normalizedPhone = `+91${phonenumber}`;

    // Check if already registered
    let existingUser = []
    if (normalizedEmail) {
      existingUser = await dbQuery("SELECT id FROM users WHERE email = ?", [normalizedEmail])
    }
    if (existingUser.length === 0 && normalizedPhone) {
      existingUser = await dbQuery("SELECT id FROM users WHERE phone = ?", [normalizedPhone])
    }

    if (existingUser.length > 0) {
      return res.status(400).json({ message: "Email or phone already registered. Please login instead." })
    }

    // Generate OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString()
    const expiresAt = new Date(Date.now() + 5 * 60 * 1000) // 5 min

    // Clean expired & old OTPs
    await dbQuery("DELETE FROM otps WHERE expires_at < NOW()")
    if (normalizedEmail) {
      await dbQuery("DELETE FROM otps WHERE email = ?", [normalizedEmail])
    }
    if (normalizedPhone) {
      await dbQuery("DELETE FROM otps WHERE phone = ?", [normalizedPhone])
    }

    // Save OTP
    await dbQuery("INSERT INTO otps (email, phone, otp, expires_at) VALUES (?, ?, ?, ?)", [
      normalizedEmail,
      normalizedPhone,
      otp,
      expiresAt,
    ])

    console.log(`📩 OTP for ${normalizedEmail || normalizedPhone}: ${otp}`)

    if (normalizedEmail) {
      const htmlContent = `
       <!DOCTYPE html>
<html>
<head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>AgriAI OTP Verification</title>
</head>
<body style="margin: 0; padding: 0; font-family: Arial, Helvetica, sans-serif; background-color: #f5f9f6;">
    <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%" style="max-width: 600px; margin: 20px auto; background: #ffffff; border-radius: 12px; box-shadow: 0 4px 12px rgba(0,0,0,0.08); overflow: hidden;">
        <!-- Header -->
        <tr>
            <td style="padding: 25px 20px 15px; text-align: center; background: linear-gradient(90deg, #16a34a 0%, #3b82f6 100%);">
                <table role="presentation" cellspacing="0" cellpadding="0" border="0" width="100%">
                    <tr>
                        <td style="text-align: center;">
                            <div style="display: inline-block; vertical-align: middle;">
                                
                            </div>
                            <div style="display: inline-block; vertical-align: middle; margin-left: 10px;">
                                <span style="font-size: 26px; font-weight: bold; color: #fff;">AgriAI</span>
                            </div>
                        </td>
                    </tr>
                </table>
            </td>
        </tr>
        
        <!-- Content -->
        <tr>
            <td style="padding: 30px 25px;">
                <h2 style="color: #16a34a; text-align: center; margin-top: 0; margin-bottom: 20px; font-size: 22px;">🌱 Account Verification</h2>
                
                <p style="font-size: 16px; color: #333333; line-height: 1.6; margin-bottom: 25px;">
                    Hello there,<br><br>
                    Thank you for using AgriAI. Your One-Time Password (OTP) for account verification is:
                </p>
                
                <!-- OTP Box -->
                <div style="text-align: center; margin: 30px 0;">
                    <div style="display: inline-block; background: #f1f7ff; padding: 15px 30px; border-radius: 8px; border: 1px dashed #3b82f6;">
                        <span style="font-size: 32px; font-weight: bold; color: #2563eb; letter-spacing: 8px; font-family: monospace;">${otp}</span>
                    </div>
                </div>
                
                <p style="font-size: 15px; color: #666666; line-height: 1.6; text-align: center; margin-bottom: 0;">
                    This OTP is valid for <strong style="color: #dc2626;">5 minutes</strong>. Please do not share this code with anyone.
                </p>
            </td>
        </tr>
        
        <!-- Footer -->
        <tr>
            <td style="padding: 20px; text-align: center; background-color: #f8fafc; border-top: 1px solid #e5e7eb;">
                <p style="font-size: 13px; color: #6b7280; line-height: 1.5; margin: 0;">
                    If you didn't request this code, please ignore this email.<br>
                    © 2023 AgriAI. All rights reserved.
                </p>
            </td>
        </tr>
    </table>
</body>
</html>

      `

      await transporter.sendMail({
        from: `"Agri AI" <${process.env.EMAIL_USER}>`,
        to: normalizedEmail,
        subject: "Your OTP Code - Agri AI",
        html: htmlContent,
      })
    }

    if (normalizedPhone) {
      if (!twilioClient) {
        console.error("❌ Twilio client not initialized. Cannot send SMS.")
        return res.status(500).json({ message: "SMS service unavailable. Please use email verification." })
      }

      if (!process.env.TWILIO_PHONE_NUMBER) {
        console.error("❌ TWILIO_PHONE_NUMBER not configured")
        return res.status(500).json({ message: "SMS service not configured. Please use email verification." })
      }

      try {
        await twilioClient.messages.create({
          body: `Hello Mr. ${name}. Thanks For Choosing AgriAI. Your AgriAI verification code is: ${otp}. Valid for 5 minutes. Do not share this code.`,
          from: process.env.TWILIO_PHONE_NUMBER,
          to: normalizedPhone,
        })
        console.log(`📱 SMS sent to ${normalizedPhone}`)
      } catch (smsError) {
        console.error("❌ SMS sending failed:", smsError)
        // If SMS fails but email succeeded, still return success
        if (normalizedEmail) {
          return res.json({ message: "OTP sent to email successfully. SMS delivery failed." })
        } else {
          return res.status(500).json({ message: "Failed to send SMS. Please try again or use email verification." })
        }
      }
    }

    const message =
      normalizedEmail && normalizedPhone
        ? "OTP sent to both email and phone successfully"
        : normalizedEmail
          ? "OTP sent to email successfully"
          : "OTP sent to phone successfully"

    return res.json({ message })
  } catch (error) {
    console.error("Send OTP error:", error)
    return res.status(500).json({ message: "Failed to send OTP. Please try again." })
  }
})

// ✅ Verify OTP - Updated to handle both email and phone
app.post("/api/verify-otp", async (req, res) => {
  try {
    const { email, phone, otp } = req.body

    if ((!email && !phone) || !otp) return res.status(400).json({ message: "Email/phone and OTP required" })

    const normalizedEmail = email ? email.toLowerCase().trim() : null
    const normalizedPhone = phone ? phone.trim() : null

    let rows = []
    if (normalizedEmail && normalizedPhone) {
      rows = await dbQuery("SELECT * FROM otps WHERE (email = ? OR phone = ?) AND otp = ? AND expires_at > NOW()", [
        normalizedEmail,
        normalizedPhone,
        otp,
      ])
    } else if (normalizedEmail) {
      rows = await dbQuery("SELECT * FROM otps WHERE email = ? AND otp = ? AND expires_at > NOW()", [
        normalizedEmail,
        otp,
      ])
    } else if (normalizedPhone) {
      rows = await dbQuery("SELECT * FROM otps WHERE phone = ? AND otp = ? AND expires_at > NOW()", [
        normalizedPhone,
        otp,
      ])
    }

    if (rows.length === 0) {
      return res.status(400).json({ message: "Invalid or expired OTP" })
    }

    // ✅ OTP is valid → cleanup
    if (normalizedEmail) {
      await dbQuery("DELETE FROM otps WHERE email = ?", [normalizedEmail])
    }
    if (normalizedPhone) {
      await dbQuery("DELETE FROM otps WHERE phone = ?", [normalizedPhone])
    }

    return res.json({ message: "OTP verified successfully" })
  } catch (error) {
    console.error("Verify OTP error:", error)
    return res.status(500).json({ message: "Failed to verify OTP" })
  }
})

// ✅ Signup - Updated to handle phone number
app.post("/api/signup", async (req, res) => {
  try {
    const { name, email, phone, password, confirmPassword } = req.body
    if (!name || !email || !password || !confirmPassword) {
      return res.status(400).json({ message: "Name, email, and password are required" })
    }

    const normalizedEmail = email.toLowerCase().trim()
    const normalizedPhone = phone ? phone.trim() : null

    if (!validateEmail(normalizedEmail)) return res.status(400).json({ message: "Invalid email format" })
    if (normalizedPhone && !validatePhone(normalizedPhone))
      return res.status(400).json({ message: "Invalid phone format" })
    if (!validatePassword(password)) return res.status(400).json({ message: "Password too short" })
    if (password !== confirmPassword) return res.status(400).json({ message: "Passwords do not match" })

    const existingUser = await dbQuery("SELECT id FROM users WHERE email = ? OR phone = ?", [
      normalizedEmail,
      normalizedPhone,
    ])
    if (existingUser.length > 0) return res.status(400).json({ message: "Email or phone already registered" })

    const hashedPassword = await bcrypt.hash(password, 12)
    await dbQuery("INSERT INTO users (name, email, phone, password) VALUES (?, ?, ?, ?)", [
      name.trim(),
      normalizedEmail,
      normalizedPhone,
      hashedPassword,
    ])

    return res.status(201).json({ message: "Account created successfully", email: normalizedEmail })
  } catch (error) {
    console.error("Signup error:", error)
    if (error.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ message: "Email or phone already registered" })
    }
    return res.status(500).json({ message: "Failed to create account. Please try again." })
  }
})

// ✅ Login
app.post("/api/login", async (req, res) => {
  try {
    const { email, phone, password } = req.body
    if ((!email && !phone) || !password) return res.status(400).json({ message: "Email/phone and password required" })

    const normalizedEmail = email ? email.toLowerCase().trim() : null
    const normalizedPhone = phone ? phone.trim() : null

    let results = []
    if (normalizedEmail && normalizedPhone) {
      results = await dbQuery("SELECT * FROM users WHERE email = ? OR phone = ?", [normalizedEmail, normalizedPhone])
    } else if (normalizedEmail) {
      results = await dbQuery("SELECT * FROM users WHERE email = ?", [normalizedEmail])
    } else if (normalizedPhone) {
      results = await dbQuery("SELECT * FROM users WHERE phone = ?", [normalizedPhone])
    }

    if (results.length === 0) return res.status(401).json({ message: "Invalid email/phone or password" })

    const user = results[0]
    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) return res.status(401).json({ message: "Invalid email/phone or password" })

    return res.json({ message: "Login successful", email: user.email, phone: user.phone, name: user.name })
  } catch (error) {
    console.error("Login error:", error)
    return res.status(500).json({ message: "Login failed. Please try again." })
  }
})

// Add a field
app.post("/api/fields", async (req, res) => {
  console.log("REQ BODY:", req.body)

  // res.send("Hello from fields endpoint");
  try {



    const { userEmail, areaName, fieldName, location } = req.body
    console.log("Received field data:", req.body) // Add logging

    if (!userEmail || !fieldName) {
      return res.status(400).json({ error: "Missing required fields" })
    }


    const lat = location?.latitude || null
    const lng = location?.longitude || null
    const address = location?.address || null


    // Use dbQuery instead of db.execute
    const result = await dbQuery(
      "INSERT INTO fields (user_email, area_name, field_name, latitude, longitude, address) VALUES (?, ?, ?, ?, ?, ?)",
      [
        userEmail,
        areaName || null,
        fieldName,
        lat || null,
        lng || null,
        address || null
      ]
    )

    console.log("Field inserted with ID:", result.insertId)
    res.json({ message: "Field added successfully", id: result.insertId })
  } catch (err) {
    console.error("Add field error:", err)
    res.status(500).json({ error: "Failed to add field", details: err.message })
  }
})


app.delete("/api/fields/:id", async (req, res) => {
  try {
    const { id } = req.params
    const { userEmail } = req.body

    if (!id || !userEmail) {
      return res.status(400).json({ error: "Field ID and user email are required" })
    }

    // Verify the field belongs to the user before deleting
    const result = await dbQuery("DELETE FROM fields WHERE id = ? AND user_email = ?", [id, userEmail])

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Field not found or unauthorized" })
    }

    res.json({ message: "Field deleted successfully" })
  } catch (err) {
    console.error("Delete field error:", err)
    res.status(500).json({ error: "Failed to delete field", details: err.message })
  }
})


app.get("/api/fields/:userEmail", async (req, res) => {
  try {
    const { userEmail } = req.params

    if (!userEmail) {
      return res.status(400).json({ error: "User email is required" })
    }

    const fields = await dbQuery("SELECT * FROM fields WHERE user_email = ? ORDER BY created_at DESC", [userEmail])

    res.json({ fields })
  } catch (err) {
    console.error("Fetch fields error:", err)
    res.status(500).json({ error: "Failed to fetch fields", details: err.message })
  }
})



// Health check
app.get("/api/health", (req, res) => {
  res.json({ status: "OK", timestamp: new Date().toISOString() })
})

// 404 handler
app.use(/.*/, (req, res) => {
  res.status(404).json({ message: "Route not found" })
})

// Graceful shutdown
process.on("SIGTERM", () => {
  console.log("SIGTERM received, closing DB pool...")
  pool.end(() => {
    console.log("Database pool closed.")
    process.exit(0)
  })
})






app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`))
