"use client"

import { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { X, Plus, Trash2, Info, MapPin } from "lucide-react"
import LocationMap from "../LocationMap"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function FieldInfo() {
  const navigate = useNavigate()
  const [fields, setFields] = useState([])
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [isLocationMapOpen, setIsLocationMapOpen] = useState(false)
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [areaName, setAreaName] = useState("")
  const [fieldName, setFieldName] = useState("")

  // ✅ Check localStorage for userEmail on mount
  useEffect(() => {
    const email = localStorage.getItem("userEmail")
    if (!email) {
      navigate("/loginsignup") // redirect
    }
  }, [navigate])

  useEffect(() => {
    const fetchFields = async () => {
      const userEmail = localStorage.getItem("userEmail")
      if (!userEmail) return

      try {
        const response = await fetch(`http://localhost:5000/api/fields/${encodeURIComponent(userEmail)}`)
        const data = await response.json()

        if (response.ok) {
          const transformedFields = data.fields.map((field) => ({
            id: field.id,
            areaName: field.area_name,
            fieldName: field.field_name,
            location:
              field.latitude && field.longitude
                ? {
                  lat: Number.parseFloat(field.latitude),
                  lng: Number.parseFloat(field.longitude),
                  address: field.address,
                }
                : null,
          }))
          setFields(transformedFields)
        } else {
          console.error("Error fetching fields:", data.error)
        }
      } catch (err) {
        console.error("Failed to fetch fields:", err)
      }
    }

    fetchFields()
  }, [])

  const addField = async () => {
    if (areaName.trim() && fieldName.trim()) {
      const userEmail = localStorage.getItem("userEmail")

      const newField = {
        id: Date.now(),
        areaName: areaName.trim(),
        fieldName: fieldName.trim(),
        location: selectedLocation,
      }

      // ✅ Store in state (for UI)
      setFields([...fields, newField])
      setAreaName("")
      setFieldName("")
      setSelectedLocation(null)
      setIsModalOpen(false)

      // ✅ Send to backend
      try {
        const res = await fetch("http://localhost:5000/api/fields", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            userEmail,
            areaName: newField.areaName,
            fieldName: newField.fieldName,
            location: newField.location,
          }),
        })

        const data = await res.json()
        if (!res.ok) {
          console.error("Error:", data.error)
        } else {
          console.log("Field saved:", data)
          setFields((prevFields) =>
            prevFields.map((field) => (field.id === newField.id ? { ...field, id: data.id } : field)),
          )
        }
      } catch (err) {
        console.error("Request failed:", err)
      }
    }
  }

  const deleteField = async (id) => {
    const userEmail = localStorage.getItem("userEmail")

    // Remove from UI immediately for better UX
    setFields(fields.filter((field) => field.id !== id))

    // Sync with database
    try {
      const response = await fetch(`http://localhost:5000/api/fields/${id}`, {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ userEmail }),
      })

      const data = await response.json()
      if (!response.ok) {
        console.error("Error deleting field:", data.error)
        // If delete failed, refresh fields from database
        window.location.reload()
      }
    } catch (err) {
      console.error("Failed to delete field:", err)
      // If delete failed, refresh fields from database
      window.location.reload()
    }
  }

  const handleLocationSelect = (location) => {
    setSelectedLocation(location)
    setIsLocationMapOpen(false)
    if (!areaName.trim()) {
      setAreaName(location.address)
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900/20 to-black relative overflow-hidden">
       <ToastContainer position="top-center" theme="dark" autoClose={false} />
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-spin-slow"></div>
      </div>

      {/* Floating Particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-green-400/30 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          ></div>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-4 py-8 pt-24">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 via-emerald-300 to-blue-400 bg-clip-text text-transparent mb-4 animate-fade-in">
            Field Information Hub
          </h1>
          <p className="text-gray-100 text-lg md:text-xl animate-fade-in-delay">
            Discover and manage agricultural field data with precision
          </p>
        </div>

        {/* Default World Field Info */}
        <Card className="mb-8 bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl border border-green-500/20 hover:border-green-400/40 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-green-500/10 animate-slide-up">
          <div className="p-6 md:p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex items-center space-x-4">
                <div className="p-3 bg-gradient-to-br from-green-500/20 to-emerald-600/20 rounded-xl backdrop-blur-sm">
                  <MapPin className="w-8 h-8 text-green-400" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-white mb-2">World Field Info</h3>
                  <p className="text-gray-100">Global agricultural field database with comprehensive insights</p>
                </div>
              </div>
              <button className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-3 rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/25 flex items-center justify-center">
                <Info className="w-4 h-4 mr-2" />
                Know More
              </button>
            </div>
          </div>
        </Card>

        {/* User Added Fields */}
        <div className="grid gap-6 mb-8">
          {fields.map((field, index) => (
            <Card
              key={field.id}
              className="bg-gradient-to-br from-gray-800/40 to-gray-900/40 backdrop-blur-xl border border-blue-500/20 hover:border-blue-400/40 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-blue-500/10 animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="p-4 sm:p-6">
                {" "}
                {/* reduced padding for small screens */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                  {/* Left Section */}
                  <div className="flex items-start sm:items-center space-x-3 sm:space-x-4">
                    <div className="p-2.5 sm:p-3 bg-gradient-to-br from-blue-500/20 to-cyan-600/20 rounded-xl backdrop-blur-sm">
                      <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-blue-400" />
                    </div>
                    <div>
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-1 break-words">{field.fieldName}</h3>
                      <p className="text-gray-100 flex items-center text-sm sm:text-base">
                        <MapPin className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1 text-gray-400" />
                        {field.areaName}
                      </p>
                    </div>
                  </div>

                  {/* Right Section (Buttons) */}
                  <div className="flex flex-col xs:flex-row flex-wrap gap-2 w-full sm:w-auto">
                    <button className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-3 py-2 sm:px-4 rounded-lg transition-all duration-300 hover:scale-105 flex items-center justify-center text-sm sm:text-base">
                      <Info className="w-4 h-4 mr-1 sm:mr-2" />
                      Know More
                    </button>
                    {/* <button
                      onClick={() => deleteField(field.id)}
                      className="bg-red-600 hover:bg-red-700 text-white font-semibold p-2 rounded-lg transition-all duration-300 hover:scale-105 flex items-center justify-center"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button> */}

                   <button
  onClick={() => {
    toast(
      ({ closeToast }) => (
        <div className="flex flex-col gap-4">
          <p className="text-lg font-bold text-gray-100 text-center">
            ⚠️  Are you sure you want to delete?
          </p>
          <div className="flex gap-4 justify-center">
            <button
              className="bg-gradient-to-r from-red-600 to-pink-600 hover:from-red-700 hover:to-pink-700 
                         px-5 py-2 rounded-lg text-white font-semibold 
                         shadow-lg shadow-red-500/30 transition-all duration-300 hover:scale-105"
              onClick={() => {
                deleteField(field.id);
                closeToast();
              }}
            >
              Yes, Delete
            </button>
            <button
              className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 
                         px-5 py-2 rounded-lg text-white font-semibold 
                         shadow-lg shadow-cyan-500/30 transition-all duration-300 hover:scale-105"
              onClick={closeToast}
            >
              Cancel
            </button>
          </div>
        </div>
      ),
      {
        position: "top-center",
        closeOnClick: false,
        autoClose: false,
        hideProgressBar: true,
        draggable: false,
        className:
          "bg-black/90 backdrop-blur-md text-white rounded-2xl shadow-xl border border-gray-700",
      }
    );
  }}
  className="bg-red-600 hover:bg-red-700 text-white font-semibold p-2 rounded-lg transition-all duration-300 hover:scale-105 flex items-center justify-center"
>
  <Trash2 className="w-4 h-4" />
</button>






                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Add Field Button */}
        <div className="sticky bottom-6 md:bottom-8 flex justify-end">
          <button
            onClick={() => setIsModalOpen(true)}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-4 md:px-6 py-3 md:py-4 rounded-full shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 hover:scale-110 animate-bounce-subtle flex items-center"
          >
            <Plus className="w-5 h-5 mr-2" />
            Add Your Own Field
          </button>
        </div>

        {/* Modal */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in px-4">
            <Card className="bg-gradient-to-br from-gray-800/90 to-gray-900/90 backdrop-blur-xl border border-green-500/30 w-full max-w-md animate-scale-in">
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">Add New Field</h2>
                  <Button
                    onClick={() => setIsModalOpen(false)}
                    className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors"
                  >
                    <X className="w-5 h-5 text-gray-400" />
                  </Button>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label htmlFor="areaName" className="text-gray-200 mb-2 block">
                      Lat And Lng
                    </Label>
                    <Input
                      id="areaName"
                      value={areaName}
                      onChange={(e) => setAreaName(e.target.value)}
                      placeholder="Enter Lat and Lng (Ex:-20.2587, 85.8357)"
                      className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500/20"
                    />
                  </div>

                  <div>
                    <Label htmlFor="fieldName" className="text-gray-200 mb-2 block">
                      Field Name
                    </Label>
                    <Input
                      id="fieldName"
                      value={fieldName}
                      onChange={(e) => setFieldName(e.target.value)}
                      placeholder="Enter field name..."
                      className="bg-gray-700/50 border-gray-600 text-white placeholder-gray-400 focus:border-green-500 focus:ring-green-500/20"
                    />
                  </div>

                  <div>
                    <Label className="text-gray-200 mb-2 block">Location</Label>
                    <button
                      onClick={() => setIsLocationMapOpen(true)}
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:scale-105 flex items-center justify-center"
                    >
                      <MapPin className="w-4 h-4 mr-2" />
                      Select Current Location
                    </button>
                    {selectedLocation && (
                      <div className="mt-2 p-3 bg-green-600/20 border border-green-500/30 rounded-lg">
                        <p className="text-green-300 text-sm flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {selectedLocation.address}
                        </p>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={addField}
                    disabled={!areaName.trim() || !fieldName.trim()}
                    className="w-full bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:hover:bg-gray-600 text-white font-semibold py-3 rounded-xl transition-all duration-300 hover:scale-105 disabled:scale-100 flex items-center justify-center"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Field
                  </button>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* LocationMap Component */}
        {isLocationMapOpen && (
          <LocationMap onLocationSelect={handleLocationSelect} onClose={() => setIsLocationMapOpen(false)} />
        )}
      </div>
    </div>
  )
}
