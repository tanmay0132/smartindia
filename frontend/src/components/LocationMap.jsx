"use client"

import { useState } from "react"
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import { MapPin, Navigation, Check } from "lucide-react"
import L from "leaflet"

// Fix default marker icon issue in leaflet
delete L.Icon.Default.prototype._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
})

function LocationPicker({ onSelect }) {
  useMapEvents({
    click(e) {
      onSelect(e.latlng)
    },
  })
  return null
}

export default function LocationMap({ onLocationSelect, onClose }) {
  const [selectedLocation, setSelectedLocation] = useState(null)
  const [isLoading, setIsLoading] = useState(false)

  const getCurrentLocation = () => {
    setIsLoading(true)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords
          setSelectedLocation({ lat: latitude, lng: longitude })
          setIsLoading(false)
        },
        (error) => {
          console.error("Error getting location:", error)
          setIsLoading(false)
        },
      )
    } else {
      setIsLoading(false)
    }
  }

  const confirmLocation = () => {
    if (selectedLocation) {
      onLocationSelect({
        latitude: selectedLocation.lat,
        longitude: selectedLocation.lng,
        address: `${selectedLocation.lat.toFixed(4)}, ${selectedLocation.lng.toFixed(4)}`,
      })
    }
  }

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 animate-fade-in">
      <div className="bg-gradient-to-br from-gray-800/95 to-gray-900/95 backdrop-blur-xl border border-green-500/30 rounded-2xl w-full max-w-4xl mx-2 sm:mx-4 h-[80vh] animate-scale-in overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-4 sm:p-6 border-b border-gray-700/50">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center">
              <MapPin className="w-5 h-5 sm:w-6 sm:h-6 mr-2 text-green-400" />
              Select Location
            </h2>
            <div className="flex flex-col xs:flex-row gap-2 sm:space-x-2">
              <button
                onClick={getCurrentLocation}
                disabled={isLoading}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white font-semibold px-3 sm:px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 flex items-center justify-center text-sm sm:text-base"
              >
                <Navigation className={`w-4 h-4 mr-2 ${isLoading ? "animate-spin" : ""}`} />
                {isLoading ? "Getting..." : "Current Location"}
              </button>
              <button
                onClick={onClose}
                className="bg-gray-600 hover:bg-gray-700 text-white font-semibold px-3 sm:px-4 py-2 rounded-lg transition-all duration-300 hover:scale-105 text-sm sm:text-base"
              >
                Cancel
              </button>
            </div>
          </div>
          <p className="text-gray-300 mt-2 text-sm sm:text-base">
            Click on the map to place a pin at your desired location
          </p>
        </div>

        {/* Map Area */}
        <div className="flex-1 relative">
          <MapContainer
            center={[20.5937, 78.9629]} // India center
            zoom={5}
            style={{ width: "100%", height: "100%" }}
          >
            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
            <LocationPicker onSelect={setSelectedLocation} />
            {selectedLocation && <Marker position={selectedLocation} />}
          </MapContainer>
        </div>

        {/* Footer */}
        {selectedLocation && (
          <div className="p-4 sm:p-6 border-t border-gray-700/50 bg-gradient-to-r from-gray-800/50 to-gray-900/50">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
              <div className="text-white text-sm sm:text-base">
                <p className="font-semibold">Selected Location:</p>
                <p className="text-gray-300 text-xs sm:text-sm">
                  Lat: {selectedLocation.lat.toFixed(6)}, Lng: {selectedLocation.lng.toFixed(6)}
                </p>
              </div>
              <button
                onClick={confirmLocation}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-4 sm:px-6 py-2 sm:py-3 rounded-lg sm:rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-green-500/25 flex items-center justify-center text-sm sm:text-base"
              >
                <Check className="w-4 h-4 mr-2" />
                Confirm Location
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
