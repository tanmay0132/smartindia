import { useState, useEffect } from "react"
import { X, Cloud } from "lucide-react"

export default function WeatherWidget() {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [isHovered, setIsHovered] = useState(false)
    const [city, setCity] = useState("Bhubaneswar")
    const [weather, setWeather] = useState(null)
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    const API_KEY = "3395b1ce12d64c66bc984131242210"

    const fetchWeather = async () => {
        if (!city) return
        try {
            setLoading(true)
            setError(null)
            setWeather(null)

            const res = await fetch(
                `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`
            )

            if (!res.ok) {
                throw new Error("Failed to fetch data")
            }

            const data = await res.json()

            if (data.error) {
                setError(data.error.message)
                setWeather(null)
            } else {
                setWeather(data)
            }

        } catch (err) {
            console.error("Error fetching weather:", err)
            setError("Something went wrong. Please try again.")
            setWeather(null)
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        if (isModalOpen) {
            const createParticle = () => {
                const particle = document.createElement("div")
                particle.className = "weather-particle"
                particle.style.cssText = `
                    position: fixed;
                    width: ${Math.random() * 4 + 2}px;
                    height: ${Math.random() * 4 + 2}px;
                    background: ${Math.random() > 0.5 ? "#10b981" : "#3b82f6"};
                    border-radius: 50%;
                    pointer-events: none;
                    z-index: 9999;
                    left: ${Math.random() * 100}vw;
                    top: 100vh;
                    opacity: ${Math.random() * 0.5 + 0.3};
                    animation: float-up ${Math.random() * 3 + 4}s linear forwards;
                `
                document.body.appendChild(particle)

                setTimeout(() => {
                    if (particle.parentNode) particle.remove()
                }, 7000)
            }

            const interval = setInterval(createParticle, 300)
            return () => {
                clearInterval(interval)
                document.querySelectorAll(".weather-particle").forEach(p => p.remove())
            }
        }
    }, [isModalOpen])

    const openModal = () => {
        setIsModalOpen(true)
        document.body.style.overflow = "hidden"
    }

    const closeModal = () => {
        setIsModalOpen(false)
        document.body.style.overflow = "unset"
        setWeather(null)
        setError(null)
    }

    return (
        <>
            {/* Weather Widget Button */}
            <div className="fixed left-0 max-[600px]:top-[45vh] top-[30vh] transform -translate-y-1/2 z-40 opacity-0 animate-slide-in-left">
                <div
                    className={`relative transition-all duration-500 ease-in-out ${
                        isHovered ? "translate-x-0" : "-translate-x-3"
                    }`}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                >
                    <div className="relative">
                        <button
                            onClick={openModal}
                            className="group relative bg-gradient-to-br from-blue-500 to-emerald-500 hover:from-blue-400 hover:to-emerald-400 rounded-r-2xl pl-4 pr-3 py-4 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 border-l-0"
                        >
                            <Cloud className="w-6 h-6 text-white group-hover:animate-bounce" />
                            <div className="absolute inset-0 rounded-r-2xl bg-gradient-to-br from-blue-400 to-emerald-400 animate-ping opacity-20"></div>
                            <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-emerald-400 rounded-r-2xl opacity-0 group-hover:opacity-20 blur-sm transition-opacity duration-300"></div>
                        </button>

                        <div
                            className={`absolute left-full top-1/2 transform -translate-y-1/2 ml-2 bg-gray-900/90 backdrop-blur-sm text-white px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-all duration-300 pointer-events-none ${
                                isHovered
                                    ? "opacity-100 translate-x-0 visible"
                                    : "opacity-0 -translate-x-2 invisible"
                            }`}
                        >
                            Check Weather
                            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-1 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-gray-900/90"></div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 custom-scrollbar">
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-fade-in"
                        onClick={closeModal}
                    ></div>

                    <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-gray-900 via-green-900 to-black rounded-3xl animate-scale-in">
                        <div className="absolute inset-0 overflow-hidden rounded-3xl">
                            <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
                            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                        </div>

                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 z-20 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 hover:scale-110 group"
                        >
                            <X className="w-5 h-5 text-white group-hover:rotate-90 transition-transform duration-300" />
                        </button>

                        <div className="relative z-10 p-4 sm:p-6 pt-16 sm:pt-20">
                            <div className="text-center mb-8 animate-fade-in">
                                <h1 className="text-2xl sm:text-4xl font-bold mb-2 bg-gradient-to-r from-green-400 via-blue-500 to-emerald-400 bg-clip-text text-transparent animate-gradient">
                                    Weather Nexus
                                </h1>
                                <p className="text-sm sm:text-lg text-gray-100 font-light">
                                    Real-time weather insights
                                </p>
                            </div>

                            {/* Input & Search */}
                            <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-3 sm:space-y-0 mb-8 animate-slide-up">
                                <div className="relative flex-1">
                                    <input
                                        type="text"
                                        value={city}
                                        onChange={(e) => setCity(e.target.value)}
                                        placeholder="Enter city name..."
                                        className="px-4 py-3 w-full bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white placeholder-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-green-400/50 transition-all duration-300 hover:bg-white/15 text-sm sm:text-base"
                                        onKeyPress={(e) => e.key === "Enter" && fetchWeather()}
                                    />
                                </div>
                                <button
                                    onClick={fetchWeather}
                                    disabled={loading}
                                    className="group relative px-4 py-3 sm:px-6 sm:py-3 bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl font-semibold transition-all duration-300 hover:from-green-400 hover:to-emerald-500 hover:scale-105 hover:shadow-2xl hover:shadow-green-500/25 disabled:opacity-50 disabled:cursor-not-allowed text-sm sm:text-base"
                                >
                                    {loading ? (
                                        <div className="flex items-center justify-center space-x-2">
                                            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            <span className="hidden sm:inline">Searching...</span>
                                        </div>
                                    ) : (
                                        "Search"
                                    )}
                                </button>
                            </div>

                            {error && (
                                <div className="text-red-400 bg-red-500/10 px-4 py-2 rounded-xl text-center mb-6 text-sm">
                                    {error}
                                </div>
                            )}

                            {/* Weather Card */}
                            {weather && (
                                <div className="group relative animate-scale-in">
                                    <div className="absolute -inset-1 bg-gradient-to-r from-green-400 via-blue-500 to-emerald-400 rounded-3xl blur opacity-25 group-hover:opacity-50 transition-opacity duration-500 animate-gradient"></div>

                                    <div className="relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-4 sm:p-6 shadow-2xl hover:shadow-green-500/10 transition-all duration-500 hover:scale-[1.02]">
                                        <div className="text-center mb-6">
                                            <h2 className="text-xl sm:text-3xl font-bold mb-2 text-white">{weather.location.name}</h2>
                                            <p className="text-sm sm:text-base text-gray-300 mb-2">
                                                {weather.location.region}, {weather.location.country}
                                            </p>
                                            <p className="text-xs sm:text-sm text-gray-400 flex items-center justify-center space-x-2">
                                                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                                <span>Local Time: {weather.location.localtime}</span>
                                            </p>
                                        </div>

                                        <div className="flex flex-col sm:flex-row justify-center items-center mb-6 space-y-4 sm:space-y-0 sm:space-x-8">
                                            <div className="relative">
                                                <img
                                                    src={weather.current.condition.icon || "/placeholder.svg"}
                                                    alt={weather.current.condition.text}
                                                    className="w-16 h-16 sm:w-20 sm:h-20 animate-float mx-auto"
                                                />
                                            </div>
                                            <div className="text-center">
                                                <p className="text-4xl sm:text-6xl font-bold mb-2 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
                                                    {weather.current.temp_c}°C
                                                </p>
                                                <p className="text-base sm:text-lg text-gray-300 capitalize font-medium">
                                                    {weather.current.condition.text}
                                                </p>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-2 gap-3 sm:gap-4">
                                            {[
                                                { icon: "💧", label: "Humidity", value: `${weather.current.humidity}%`, color: "from-blue-400 to-cyan-400" },
                                                { icon: "💨", label: "Wind", value: `${weather.current.wind_kph} kph`, color: "from-green-400 to-emerald-400" },
                                                { icon: "🌡️", label: "Feels Like", value: `${weather.current.feelslike_c}°C`, color: "from-orange-400 to-red-400" },
                                                { icon: "☀️", label: "UV Index", value: weather.current.uv, color: "from-yellow-400 to-orange-400" },
                                            ].map((item, index) => (
                                                <div
                                                    key={index}
                                                    className="group/item relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-3 sm:p-4 text-center hover:bg-white/10 transition-all duration-300 hover:scale-105 animate-fade-in-delay"
                                                    style={{ animationDelay: `${index * 100}ms` }}
                                                >
                                                    <div className={`absolute inset-0 bg-gradient-to-r ${item.color} rounded-2xl opacity-0 group-hover/item:opacity-10 transition-opacity duration-300`}></div>
                                                    <div className="relative">
                                                        <div className="text-lg sm:text-xl mb-1 sm:mb-2 animate-bounce-subtle">{item.icon}</div>
                                                        <p className="text-xs text-gray-400 mb-1">{item.label}</p>
                                                        <p className="text-sm sm:text-base font-semibold text-white">{item.value}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}
