"use client"

import { useState, useEffect } from "react"

export default function Weather() {
    const [city, setCity] = useState("Bhubaneswar")
    const [weather, setWeather] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const API_KEY = "3395b1ce12d64c66bc984131242210" // your WeatherAPI key

    const fetchWeather = async () => {
        try {
            setLoading(true)
            setError(null)
            //   const res = await fetch(
            //     `http://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`
            //   )
            //   const data = await res.json()


            const res = await fetch(
                `/weatherapi/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`
            );
            const data = await res.json();


            if (data.error) {
                setError(data.error.message)
                setWeather(null)
            } else {
                setWeather(data)
            }
        } catch (err) {
            console.error("Error fetching weather:", err)
            setError("Something went wrong. Please try again.")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const createParticle = () => {
            const particle = document.createElement("div")
            particle.className = "particle"
            particle.style.cssText = `
        position: fixed;
        width: ${Math.random() * 4 + 2}px;
        height: ${Math.random() * 4 + 2}px;
        background: ${Math.random() > 0.5 ? "#10b981" : "#3b82f6"};
        border-radius: 50%;
        pointer-events: none;
        z-index: 1;
        left: ${Math.random() * 100}vw;
        top: 100vh;
        opacity: ${Math.random() * 0.5 + 0.3};
        animation: float-up ${Math.random() * 3 + 4}s linear forwards;
      `
            document.body.appendChild(particle)

            setTimeout(() => {
                particle.remove()
            }, 7000)
        }

        const interval = setInterval(createParticle, 300)
        return () => clearInterval(interval)
    }, [])

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-black text-white overflow-hidden">
            {/* Background animations */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-spin-slow"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 flex flex-col items-center min-h-screen p-4 sm:p-6 pt-20 sm:pt-28">
                {/* Header */}
                <div className="text-center mb-12 animate-fade-in px-2">
                    <h1 className="text-4xl sm:text-6xl font-bold mb-4 bg-gradient-to-r from-green-400 via-blue-500 to-emerald-400 bg-clip-text text-transparent animate-gradient">
                        Weather Nexus
                    </h1>
                    <p className="text-base sm:text-xl text-gray-100 font-light">
                        Real-time weather insights at your fingertips
                    </p>
                </div>

                {/* Input & Search */}
                <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-4 sm:space-y-0 mb-12 animate-slide-up w-full max-w-md px-2">
                    <div className="relative flex-1">
                        <input
                            type="text"
                            value={city}
                            onChange={(e) => setCity(e.target.value)}
                            placeholder="Enter city name..."
                            className="px-4 py-3 w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-green-400/50 transition-all duration-300 hover:bg-white/15"
                            onKeyPress={(e) => e.key === "Enter" && fetchWeather()}
                        />
                    </div>
                    <button
                        onClick={fetchWeather}
                        disabled={loading}
                        className="group relative px-6 py-3 sm:px-8 sm:py-4 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl font-semibold transition-all duration-300 hover:from-green-400 hover:to-emerald-500 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/25 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        <span className="relative">
                            {loading ? (
                                <div className="flex items-center space-x-2">
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    <span>Searching...</span>
                                </div>
                            ) : (
                                "Search"
                            )}
                        </span>
                    </button>
                </div>

                {/* Error Message */}
                {error && (
                    <div className="text-red-400 bg-red-500/10 px-4 py-2 rounded-xl text-center mb-6 max-w-xs">
                        {error}
                    </div>
                )}

                {/* Weather Card */}
                {weather && (
                    <div className="group relative w-full max-w-2xl animate-scale-in px-2">
                        {/* Glow border */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-green-400 via-blue-500 to-emerald-400 rounded-3xl blur opacity-25 group-hover:opacity-50 transition-opacity duration-500 animate-gradient"></div>

                        <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 sm:p-8 shadow-2xl hover:shadow-green-500/10 transition-all duration-500 hover:scale-[1.02]">
                            {/* Location Header */}
                            <div className="text-center mb-8">
                                <h2 className="text-2xl sm:text-4xl font-bold mb-2 text-white">{weather.location.name}</h2>
                                <p className="text-sm sm:text-lg text-gray-300 mb-2">
                                    {weather.location.region}, {weather.location.country}
                                </p>
                                <p className="text-xs sm:text-sm text-gray-400 flex items-center justify-center space-x-2">
                                    <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                    <span>Local Time: {weather.location.localtime}</span>
                                </p>
                            </div>

                            {/* Main Weather */}
                            <div className="flex flex-col sm:flex-row justify-center items-center mb-8 space-y-4 sm:space-y-0 sm:space-x-8">
                                <div className="relative">
                                    <img
                                        src={weather.current.condition.icon || "/placeholder.svg"}
                                        alt={weather.current.condition.text}
                                        className="w-20 h-20 sm:w-24 sm:h-24 animate-float mx-auto"
                                    />
                                </div>
                                <div className="text-center">
                                    <p className="text-5xl sm:text-7xl font-bold mb-2 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                                        {weather.current.temp_c}°C
                                    </p>
                                    <p className="text-lg text-gray-300 capitalize font-medium">
                                        {weather.current.condition.text}
                                    </p>
                                </div>
                            </div>

                            {/* Details */}
                            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                                {[
                                    { icon: "💧", label: "Humidity", value: `${weather.current.humidity}%`, color: "from-blue-400 to-cyan-400" },
                                    { icon: "💨", label: "Wind", value: `${weather.current.wind_kph} kph`, color: "from-green-400 to-emerald-400" },
                                    { icon: "🌡️", label: "Feels Like", value: `${weather.current.feelslike_c}°C`, color: "from-orange-400 to-red-400" },
                                    { icon: "☀️", label: "UV Index", value: weather.current.uv, color: "from-yellow-400 to-orange-400" },
                                ].map((item, index) => (
                                    <div
                                        key={index}
                                        className="group/item relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-4 text-center hover:bg-white/10 transition-all duration-300 hover:scale-105 animate-fade-in-delay"
                                        style={{ animationDelay: `${index * 100}ms` }}
                                    >
                                        <div className={`absolute inset-0 bg-gradient-to-r ${item.color} rounded-2xl opacity-0 group-hover/item:opacity-10 transition-opacity duration-300`}></div>
                                        <div className="relative">
                                            <div className="text-xl sm:text-2xl mb-2 animate-bounce-subtle">{item.icon}</div>
                                            <p className="text-xs sm:text-sm text-gray-400 mb-1">{item.label}</p>
                                            <p className="text-base sm:text-lg font-semibold text-white">{item.value}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>

            {/* Animations */}
            <style jsx>{`
        @keyframes float-up {
          to { transform: translateY(-100vh); opacity: 0; }
        }
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-10px); }
        }
        @keyframes bounce-subtle {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-2px); }
        }
        .animate-gradient { background-size: 200% 200%; animation: gradient 3s ease infinite; }
        .animate-spin-slow { animation: spin 20s linear infinite; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-bounce-subtle { animation: bounce-subtle 2s ease-in-out infinite; }
        .animate-fade-in { animation: fadeIn 1s ease-out; }
        .animate-slide-up { animation: slideUp 1s ease-out; }
        .animate-scale-in { animation: scaleIn 0.8s ease-out; }
        .animate-fade-in-delay { animation: fadeIn 0.8s ease-out both; }
        @keyframes fadeIn { from { opacity: 0; transform: translateY(20px);} to { opacity: 1; transform: translateY(0);} }
        @keyframes slideUp { from { opacity: 0; transform: translateY(30px);} to { opacity: 1; transform: translateY(0);} }
        @keyframes scaleIn { from { opacity: 0; transform: scale(0.9);} to { opacity: 1; transform: scale(1);} }
      `}</style>
        </div>
    )
}
