"use client"

import { useState, useEffect, useRef } from "react"
import { useForm } from "react-hook-form"
import { Mail, Lock, User, Eye, EyeOff, Phone } from "lucide-react"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

export default function LoginSignup() {
  const [isLogin, setIsLogin] = useState(true)
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [otpSent, setOtpSent] = useState(false)
  const [enteredOtp, setEnteredOtp] = useState("")
  const [emailForOtp, setEmailForOtp] = useState("")
  const [phoneForOtp, setPhoneForOtp] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [otpTimer, setOtpTimer] = useState(0)

  const timerRef = useRef(null) // keep reference to clear interval later

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm()

  const password = watch("password")

  const emailValidation = {
    required: "Email is required",
    pattern: {
      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: "Please enter a valid email address",
    },
  }

  const phoneValidation = {
    required: "Phone number is required",
    pattern: {
      value: /^[+]?[\d\s\-$$$$]{10,15}$/,
      message: "Please enter a valid phone number",
    },
  }

  const passwordValidation = {
    required: "Password is required",
    minLength: {
      value: 6,
      message: "Password must be at least 6 characters long",
    },
  }

  const startOtpTimer = () => {
    setOtpTimer(300) // 5 minutes
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = setInterval(() => {
      setOtpTimer((prev) => {
        if (prev <= 1) {
          clearInterval(timerRef.current)
          timerRef.current = null
          return 0
        }
        return prev - 1
      })
    }, 1000)
  }

  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [])

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const resetFormState = () => {
    reset()
    setOtpSent(false)
    setEnteredOtp("")
    setEmailForOtp("")
    setPhoneForOtp("")
    setOtpTimer(0)
    setShowPassword(false)
    setShowConfirmPassword(false)
    if (timerRef.current) {
      clearInterval(timerRef.current)
      timerRef.current = null
    }
  }

  const apiRequest = async (url, data) => {
    let result
    let response
    try {
      response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify(data),
      })
      result = await response.json().catch(() => null)
    } catch (error) {
      throw new Error("Failed to connect to server")
    }

    if (!response.ok) {
      throw new Error(result?.message || `Server error: ${response.status}`)
    }

    return result
  }

  const onSubmit = async (data) => {
    if (isLoading) return

    setIsLoading(true)

    try {
      if (isLogin) {
        const result = await apiRequest("http://localhost:5000/api/login", {
          email: data.email?.toLowerCase().trim(),
          password: data.password,
        })

        const userData = {
          email: result.email,
          name: result.name,
          loginTime: new Date().toISOString(),
        }

        localStorage.setItem("userEmail", result.email)
        localStorage.setItem("userData", JSON.stringify(userData))

        toast.success("Login successful!")

        setTimeout(() => {
          window.location.href = "/"
        }, 1500)
      } else {
        if (!otpSent) {
          console.log(data);
          const result = await apiRequest("http://localhost:5000/api/send-otp", {
            email: data.email?.toLowerCase().trim(),
            phone: data.phone?.trim(),
            name: data.name?.trim(),
          })

          setOtpSent(true)
          setEmailForOtp(data.email?.toLowerCase().trim())
          setPhoneForOtp(data.phone?.trim())
          startOtpTimer()
          toast.info("OTP sent to your email and phone number. Please check both.", {
            autoClose: 5000,
          })
          return
        }

        if (!enteredOtp || enteredOtp.length !== 6) {
          toast.error("Please enter a valid 6-digit OTP")
          return
        }

        await apiRequest("http://localhost:5000/api/verify-otp", {
          email: emailForOtp,
          phone: phoneForOtp,
          otp: enteredOtp.trim(),
        })

        const signupData = {
          name: data.name?.trim(),
          email: emailForOtp,
          phone: phoneForOtp,
          password: data.password,
          confirmPassword: data.confirmPassword,
        }

        await apiRequest("http://localhost:5000/api/signup", signupData)

        toast.success("Account created successfully! Please log in.")

        setTimeout(() => {
          setIsLogin(true)
          resetFormState()
        }, 2000)
      }
    } catch (error) {
      console.error("Submit error:", error)
      toast.error(error.message || "Something went wrong. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const resendOtp = async () => {
    if (isLoading || otpTimer > 0) return

    setIsLoading(true)
    try {
      await apiRequest("http://localhost:5000/api/send-otp", {
        email: emailForOtp,
        phone: phoneForOtp,
      })

      setEnteredOtp("")
      startOtpTimer()
      toast.info("New OTP sent to your email and phone number")
    } catch (error) {
      toast.error(error.message || "Failed to resend OTP")
    } finally {
      setIsLoading(false)
    }
  }

  const switchMode = () => {
    setIsLogin(!isLogin)
    resetFormState()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-black text-white overflow-hidden">
      <ToastContainer
        position="top-center"
        autoClose={3000}
        pauseOnHover
        draggable
        theme="dark"
        style={{ zIndex: 9999 }}
      />

      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 via-transparent to-blue-600/20 animate-pulse"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full mt-20 mb-10">
          <div className="text-center mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-r from-green-400 via-blue-500 to-green-600 bg-clip-text text-transparent leading-tight pb-2">
              {isLogin ? "Welcome Back" : otpSent ? "Verify OTP" : "Join Us"}
            </h1>
            <p className="text-base sm:text-lg text-gray-300 mt-4">
              {isLogin
                ? "Log in to access your agricultural insights"
                : otpSent
                  ? `Enter the OTP sent to ${emailForOtp} and ${phoneForOtp}`
                  : "Create your account to revolutionize farming"}
            </p>
          </div>

          <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-4 sm:p-8 rounded-2xl border border-gray-700/50 transition-all duration-500 shadow-2xl">
            {!otpSent && (
              <div className="flex mb-8 bg-gray-700/30 rounded-xl p-1">
                <button
                  onClick={() => setIsLogin(true)}
                  type="button"
                  disabled={isLoading}
                  className={`flex-1 py-3 rounded-lg font-semibold transition-all duration-200 ${
                    isLogin
                      ? "bg-gradient-to-r from-green-500 to-blue-600 text-white shadow-lg"
                      : "text-gray-400 hover:text-white"
                  } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  Log In
                </button>
                <button
                  onClick={() => setIsLogin(false)}
                  type="button"
                  disabled={isLoading}
                  className={`flex-1 py-3 rounded-lg font-semibold transition-all duration-200 ${
                    !isLogin
                      ? "bg-gradient-to-r from-green-500 to-blue-600 text-white shadow-lg"
                      : "text-gray-400 hover:text-white"
                  } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                >
                  Sign Up
                </button>
              </div>
            )}

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
              {!isLogin && !otpSent && (
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="text"
                    placeholder="Full Name"
                    disabled={isLoading}
                    {...register("name", {
                      required: "Name is required",
                      minLength: {
                        value: 2,
                        message: "Name must be at least 2 characters long",
                      },
                      pattern: {
                        value: /^[a-zA-Z\s]+$/,
                        message: "Name can only contain letters and spaces",
                      },
                    })}
                    className={`w-full pl-10 pr-4 py-3 sm:py-4 bg-gray-700/50 border rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500/50 transition-all duration-200 ${
                      errors.name ? "border-red-500" : "border-gray-600/50"
                    } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                  />
                  {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name.message}</p>}
                </div>
              )}

              {!isLogin && !otpSent && (
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    disabled={isLoading}
                    {...register("phone", phoneValidation)}
                    className={`w-full pl-10 pr-4 py-3 sm:py-4 bg-gray-700/50 border rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500/50 transition-all duration-200 ${
                      errors.phone ? "border-red-500" : "border-gray-600/50"
                    } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                  />
                  {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone.message}</p>}
                </div>
              )}

              {!otpSent && (
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type="email"
                    placeholder="Email Address"
                    disabled={isLoading}
                    {...register("email", emailValidation)}
                    className={`w-full pl-10 pr-4 py-3 sm:py-4 bg-gray-700/50 border rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500/50 transition-all duration-200 ${
                      errors.email ? "border-red-500" : "border-gray-600/50"
                    } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                  />
                  {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email.message}</p>}
                </div>
              )}

              {!otpSent && (
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Password"
                    disabled={isLoading}
                    {...register("password", passwordValidation)}
                    className={`w-full pl-10 pr-12 py-3 sm:py-4 bg-gray-700/50 border rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500/50 transition-all duration-200 ${
                      errors.password ? "border-red-500" : "border-gray-600/50"
                    } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    disabled={isLoading}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                  {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password.message}</p>}
                </div>
              )}

              {!isLogin && !otpSent && (
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    disabled={isLoading}
                    {...register("confirmPassword", {
                      required: "Please confirm your password",
                      validate: (value) => value === password || "Passwords do not match",
                    })}
                    className={`w-full pl-10 pr-12 py-3 sm:py-4 bg-gray-700/50 border rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500/50 transition-all duration-200 ${
                      errors.confirmPassword ? "border-red-500" : "border-gray-600/50"
                    } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    disabled={isLoading}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showConfirmPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                  </button>
                  {errors.confirmPassword && (
                    <p className="text-red-400 text-sm mt-1">{errors.confirmPassword.message}</p>
                  )}
                </div>
              )}

              {otpSent && (
                <div className="space-y-4">
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Enter 6-digit OTP"
                      value={enteredOtp}
                      onChange={(e) => {
                        const value = e.target.value.replace(/\D/g, "").slice(0, 6)
                        setEnteredOtp(value)
                      }}
                      disabled={isLoading}
                      maxLength="6"
                      className="w-full pl-10 pr-4 py-3 sm:py-4 bg-gray-700/50 border border-gray-600/50 rounded-xl text-white placeholder-gray-400 focus:ring-2 focus:ring-green-500/50 text-center text-lg tracking-widest"
                    />
                  </div>

                  <div className="flex justify-between items-center text-sm">
                    <div className="text-gray-400">
                      {otpTimer > 0 ? (
                        <span>Resend OTP in {formatTime(otpTimer)}</span>
                      ) : (
                        <button
                          type="button"
                          onClick={resendOtp}
                          disabled={isLoading}
                          className="text-green-400 hover:text-green-300 font-semibold transition-colors"
                        >
                          Resend OTP
                        </button>
                      )}
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        setOtpSent(false)
                        setEnteredOtp("")
                        setOtpTimer(0)
                      }}
                      disabled={isLoading}
                      className="text-gray-400 hover:text-white transition-colors"
                    >
                      Change Details
                    </button>
                  </div>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading || (otpSent && enteredOtp.length !== 6)}
                className={`w-full bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold py-3 sm:py-4 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 ${
                  isLoading || (otpSent && enteredOtp.length !== 6)
                    ? "opacity-50 cursor-not-allowed transform-none"
                    : ""
                }`}
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </span>
                ) : (
                  <>{isLogin ? "Log In" : otpSent ? "Verify OTP & Create Account" : "Send OTP"}</>
                )}
              </button>
            </form>
          </div>

          <div className="text-center mt-6 sm:mt-8">
            <p className="text-gray-400 text-sm sm:text-base">
              {isLogin ? "Don't have an account? " : "Already have an account? "}
              <button
                onClick={switchMode}
                disabled={isLoading}
                className={`text-green-400 hover:text-green-300 font-semibold transition-colors ${
                  isLoading ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                {isLogin ? "Sign up here" : "Log in here"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
