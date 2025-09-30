import { useState, useEffect } from "react"
import { X, Video, Phone, MessageSquare, Upload, Calendar, Clock, User, Star, Award, CheckCircle } from "lucide-react"
import { useNavigate } from "react-router-dom"

export default function ConsultExpertPage() {
    const navigate = useNavigate()
    const [selectedExpert, setSelectedExpert] = useState(null)
    const [consultationType, setConsultationType] = useState("")
    const [selectedDate, setSelectedDate] = useState("")
    const [selectedTime, setSelectedTime] = useState("")
    const [uploadedFile, setUploadedFile] = useState(null)
    const [step, setStep] = useState(1) // 1: Select Expert, 2: Choose Options, 3: Upload Report, 4: Confirmation
    const [showModal, setShowModal] = useState(false)

    // Mock expert data
    const experts = [
        {
            id: 1,
            name: "Dr. Rajesh Kumar",
            specialty: "Agricultural Weather Specialist",
            experience: "15+ years",
            rating: 4.9,
            avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
            consultations: 2500,
            expertise: ["Crop Weather Analysis", "Climate Risk Assessment", "Seasonal Forecasting"],
            available: true
        },
        {
            id: 2,
            name: "Dr. Priya Sharma",
            specialty: "Climate Data Analyst",
            experience: "12+ years",
            rating: 4.8,
            avatar: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=150&h=150&fit=crop&crop=face",
            consultations: 1800,
            expertise: ["Weather Pattern Analysis", "Data Interpretation", "Agricultural Planning"],
            available: true
        },
        {
            id: 3,
            name: "Dr. Anil Patel",
            specialty: "Meteorological Consultant",
            experience: "20+ years",
            rating: 4.9,
            avatar: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=150&h=150&fit=crop&crop=face",
            consultations: 3200,
            expertise: ["Extreme Weather Events", "Risk Management", "Weather Insurance"],
            available: false
        },
        {
            id: 4,
            name: "Dr. Sunita Reddy",
            specialty: "Agricultural Meteorologist",
            experience: "10+ years",
            rating: 4.7,
            avatar: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=150&h=150&fit=crop&crop=face",
            consultations: 1500,
            expertise: ["Irrigation Planning", "Crop Scheduling", "Weather-based Advisories"],
            available: true
        }
    ]

    const timeSlots = [
        "09:00 AM", "10:00 AM", "11:00 AM", "12:00 PM",
        "02:00 PM", "03:00 PM", "04:00 PM", "05:00 PM"
    ]

    const openModal = (expert) => {
        setSelectedExpert(expert)
        setShowModal(true)
        setStep(1)
        document.body.style.overflow = 'hidden'
    }

    const closeModal = () => {
        setShowModal(false)
        setSelectedExpert(null)
        setConsultationType("")
        setSelectedDate("")
        setSelectedTime("")
        setUploadedFile(null)
        setStep(1)
        document.body.style.overflow = 'unset'
    }

    const handleFileUpload = (event) => {
        const file = event.target.files[0]
        if (file) {
            setUploadedFile(file)
        }
    }

    const handleNext = () => {
        if (step === 1 && consultationType) {
            setStep(2)
        } else if (step === 2 && selectedDate && selectedTime) {
            setStep(3)
        } else if (step === 3 && uploadedFile) {
            setStep(4)
        }
    }

    const handleDirectConsultation = (type) => {
        setConsultationType(type)
        setStep(3) // Skip date/time selection for immediate consultation
    }
// useEffect(() => {
//     const email = localStorage.getItem("userEmail")
//     if (!email) {
//       navigate("/loginsignup") // redirect
//     }
//   }, [navigate])

    useEffect(() => {
        const createParticle = () => {
            const particle = document.createElement("div")
            particle.className = "expert-particle"
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
                if (particle.parentNode) {
                    particle.remove()
                }
            }, 7000)
        }

        const interval = setInterval(createParticle, 500)
        return () => {
            clearInterval(interval)
            const particles = document.querySelectorAll('.expert-particle')
            particles.forEach(particle => particle.remove())
        }
    }, [])

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-black text-white overflow-hidden">
            {/* Background animations */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl animate-spin-slow"></div>
            </div>

            <div className="relative z-10 p-4 sm:p-6 sm:pt-20 max-[600px]:pt-20  lg:p-8 lg:pt-20">
                {/* Header */}
                <div className="text-center mb-8 lg:mb-12 animate-fade-in">
                    <h1 className="text-3xl sm:text-4xl lg:text-6xl font-bold mb-4 bg-gradient-to-r from-green-400 via-blue-500 to-emerald-400 bg-clip-text text-transparent animate-gradient">
                        Consult Expert
                    </h1>
                    <p className="text-base sm:text-xl text-gray-100 font-light max-w-2xl mx-auto">
                        Connect with our weather and agricultural experts for personalized consultations
                    </p>
                </div>

                {/* Experts Grid */}
                <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 animate-slide-up">
                    {experts.map((expert, index) => (
                        <div
                            key={expert.id}
                            className={`group relative bg-black/40 backdrop-blur-xl border border-white/10 rounded-3xl p-6 shadow-2xl hover:shadow-green-500/20 transition-all duration-500 hover:scale-105 animate-fade-in-delay ${!expert.available ? 'opacity-60' : ''}`}
                            style={{ animationDelay: `${index * 100}ms` }}
                        >
                            {/* Glow border */}
                            <div className="absolute -inset-1 bg-gradient-to-r from-green-400 via-blue-500 to-emerald-400 rounded-3xl blur opacity-0 group-hover:opacity-25 transition-opacity duration-500"></div>

                            <div className="relative">
                                {/* Availability Badge */}
                                <div className={`absolute -top-2 -right-2 px-2 py-1 rounded-full text-xs font-semibold ${expert.available ? 'bg-green-500 text-white' : 'bg-gray-500 text-gray-300'}`}>
                                    {expert.available ? 'Available' : 'Busy'}
                                </div>

                                {/* Avatar */}
                                <div className="relative mb-4">
                                    <img
                                        src={expert.avatar}
                                        alt={expert.name}
                                        className="w-20 h-20 rounded-full mx-auto border-4 border-white/20 group-hover:border-green-400/50 transition-colors duration-300"
                                    />
                                    <div className="absolute -bottom-2 -right-2 bg-yellow-500 rounded-full p-1">
                                        <Award className="w-4 h-4 text-white" />
                                    </div>
                                </div>

                                {/* Expert Info */}
                                <div className="text-center mb-4">
                                    <h3 className="text-xl font-bold text-white mb-1">{expert.name}</h3>
                                    <p className="text-green-400 font-medium mb-2">{expert.specialty}</p>
                                    <div className="flex items-center justify-center space-x-4 text-sm text-gray-300 mb-3">
                                        <span className="flex items-center space-x-1">
                                            <Star className="w-4 h-4 text-yellow-400 fill-current" />
                                            <span>{expert.rating}</span>
                                        </span>
                                        <span>{expert.experience}</span>
                                        <span>{expert.consultations}+ consults</span>
                                    </div>
                                </div>

                                {/* Expertise Tags */}
                                <div className="flex flex-wrap justify-center gap-2 mb-6">
                                    {expert.expertise.slice(0, 2).map((skill, idx) => (
                                        <span
                                            key={idx}
                                            className="px-3 py-1 bg-white/10 rounded-full text-xs text-gray-300"
                                        >
                                            {skill}
                                        </span>
                                    ))}
                                    {expert.expertise.length > 2 && (
                                        <span className="px-3 py-1 bg-white/10 rounded-full text-xs text-gray-300">
                                            +{expert.expertise.length - 2} more
                                        </span>
                                    )}
                                </div>

                                {/* Action Buttons */}
                                <div className="space-y-3">
                                    {expert.available ? (
                                        <>
                                            {/* Quick Actions */}
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => {
                                                        setSelectedExpert(expert)
                                                        handleDirectConsultation('video')
                                                        setShowModal(true)
                                                    }}
                                                    className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-400 hover:to-blue-500 p-2 rounded-xl transition-all duration-300 hover:scale-105"
                                                >
                                                    <Video className="w-4 h-4 mx-auto" />
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setSelectedExpert(expert)
                                                        handleDirectConsultation('call')
                                                        setShowModal(true)
                                                    }}
                                                    className="flex-1 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-400 hover:to-green-500 p-2 rounded-xl transition-all duration-300 hover:scale-105"
                                                >
                                                    <Phone className="w-4 h-4 mx-auto" />
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setSelectedExpert(expert)
                                                        handleDirectConsultation('message')
                                                        setShowModal(true)
                                                    }}
                                                    className="flex-1 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-400 hover:to-purple-500 p-2 rounded-xl transition-all duration-300 hover:scale-105"
                                                >
                                                    <MessageSquare className="w-4 h-4 mx-auto" />
                                                </button>
                                            </div>
                                            {/* Schedule Button */}
                                            <button
                                                onClick={() => openModal(expert)}
                                                className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 py-3 rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-emerald-500/25"
                                            >
                                                Schedule Consultation
                                            </button>
                                        </>
                                    ) : (
                                        <button
                                            disabled
                                            className="w-full bg-gray-600 py-3 rounded-xl font-semibold cursor-not-allowed opacity-50"
                                        >
                                            Currently Unavailable
                                        </button>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Consultation Modal */}
            {showModal && selectedExpert && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 custom-scrollbar">
                    {/* Backdrop */}
                    <div 
                        className="absolute inset-0 bg-black/70 backdrop-blur-sm animate-fade-in"
                        onClick={closeModal}
                    ></div>

                    {/* Modal Content */}
                    <div className="relative w-full max-w-2xl max-h-[95vh] overflow-y-auto bg-gradient-to-br from-gray-900 via-green-900 to-black rounded-3xl animate-scale-in">
                        {/* Background effects */}
                        <div className="absolute inset-0 overflow-hidden rounded-3xl">
                            <div className="absolute -top-40 -right-40 w-80 h-80 bg-green-500/10 rounded-full blur-3xl animate-pulse"></div>
                            <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                        </div>

                        {/* Close button */}
                        <button
                            onClick={closeModal}
                            className="absolute top-4 right-4 z-20 p-2 bg-white/10 hover:bg-white/20 rounded-full transition-all duration-300 hover:scale-110 group"
                        >
                            <X className="w-5 h-5 text-white group-hover:rotate-90 transition-transform duration-300" />
                        </button>

                        {/* Modal Content */}
                        <div className="relative z-10 p-6 pt-16 ">
                            {/* Progress Indicator */}
                            <div className="flex justify-center mb-8">
                                <div className="flex items-center space-x-4">
                                    {[1, 2, 3, 4].map((stepNum) => (
                                        <div key={stepNum} className="flex items-center">
                                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${
                                                step >= stepNum 
                                                    ? 'bg-green-500 text-white' 
                                                    : 'bg-white/20 text-gray-400'
                                            }`}>
                                                {step > stepNum ? <CheckCircle className="w-4 h-4" /> : stepNum}
                                            </div>
                                            {stepNum < 4 && (
                                                <div className={`w-8 h-1 mx-2 rounded transition-all duration-300 ${
                                                    step > stepNum ? 'bg-green-500' : 'bg-white/20'
                                                }`}></div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Expert Header */}
                            <div className="text-center mb-6">
                                <img
                                    src={selectedExpert.avatar}
                                    alt={selectedExpert.name}
                                    className="w-16 h-16 rounded-full mx-auto mb-3 border-4 border-green-400/50"
                                />
                                <h2 className="text-2xl font-bold text-white mb-1">{selectedExpert.name}</h2>
                                <p className="text-green-400">{selectedExpert.specialty}</p>
                            </div>

                            {/* Step Content */}
                            {step === 1 && (
                                <div className="space-y-6">
                                    <h3 className="text-xl font-semibold text-center mb-6">Choose Consultation Type</h3>
                                    <div className="space-y-3">
                                        <button
                                            onClick={() => setConsultationType('video')}
                                            className={`w-full p-4 rounded-2xl border-2 transition-all duration-300 flex items-center space-x-4 ${
                                                consultationType === 'video' 
                                                    ? 'border-blue-400 bg-blue-500/20' 
                                                    : 'border-white/20 hover:border-blue-400/50'
                                            }`}
                                        >
                                            <Video className="w-6 h-6 text-blue-400" />
                                            <div className="text-left">
                                                <div className="font-semibold">Video Call</div>
                                                <div className="text-sm text-gray-400">Face-to-face consultation</div>
                                            </div>
                                        </button>
                                        <button
                                            onClick={() => setConsultationType('call')}
                                            className={`w-full p-4 rounded-2xl border-2 transition-all duration-300 flex items-center space-x-4 ${
                                                consultationType === 'call' 
                                                    ? 'border-green-400 bg-green-500/20' 
                                                    : 'border-white/20 hover:border-green-400/50'
                                            }`}
                                        >
                                            <Phone className="w-6 h-6 text-green-400" />
                                            <div className="text-left">
                                                <div className="font-semibold">Voice Call</div>
                                                <div className="text-sm text-gray-400">Audio consultation</div>
                                            </div>
                                        </button>
                                        <button
                                            onClick={() => setConsultationType('message')}
                                            className={`w-full p-4 rounded-2xl border-2 transition-all duration-300 flex items-center space-x-4 ${
                                                consultationType === 'message' 
                                                    ? 'border-purple-400 bg-purple-500/20' 
                                                    : 'border-white/20 hover:border-purple-400/50'
                                            }`}
                                        >
                                            <MessageSquare className="w-6 h-6 text-purple-400" />
                                            <div className="text-left">
                                                <div className="font-semibold">Message</div>
                                                <div className="text-sm text-gray-400">Text-based consultation</div>
                                            </div>
                                        </button>
                                    </div>
                                </div>
                            )}

                            {step === 2 && (
                                <div className="space-y-6">
                                    <h3 className="text-xl font-semibold text-center mb-6">Select Date & Time</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Select Date</label>
                                            <input
                                                type="date"
                                                value={selectedDate}
                                                onChange={(e) => setSelectedDate(e.target.value)}
                                                min={new Date().toISOString().split('T')[0]}
                                                className="w-full px-4 py-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white focus:outline-none focus:ring-2 focus:ring-green-400/50 focus:border-green-400/50 transition-all duration-300"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-sm font-medium text-gray-300 mb-2">Select Time</label>
                                            <div className="grid grid-cols-2 gap-3">
                                                {timeSlots.map((time) => (
                                                    <button
                                                        key={time}
                                                        onClick={() => setSelectedTime(time)}
                                                        className={`p-3 rounded-xl border-2 transition-all duration-300 ${
                                                            selectedTime === time 
                                                                ? 'border-green-400 bg-green-500/20' 
                                                                : 'border-white/20 hover:border-green-400/50'
                                                        }`}
                                                    >
                                                        {time}
                                                    </button>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )}

                            {step === 3 && (
                                <div className="space-y-6">
                                    <h3 className="text-xl font-semibold text-center mb-6">Upload Field Report</h3>
                                    <div className="border-2 border-dashed border-white/30 rounded-2xl p-8 text-center hover:border-green-400/50 transition-all duration-300">
                                        <input
                                            type="file"
                                            onChange={handleFileUpload}
                                            accept=".pdf,.doc,.docx,.jpg,.png"
                                            className="hidden"
                                            id="file-upload"
                                        />
                                        <label htmlFor="file-upload" className="cursor-pointer">
                                            <Upload className="w-12 h-12 text-green-400 mx-auto mb-4" />
                                            <p className="text-lg font-medium text-white mb-2">
                                                {uploadedFile ? uploadedFile.name : "Drop your field report here"}
                                            </p>
                                            <p className="text-gray-400">
                                                Supported: PDF, DOC, DOCX, JPG, PNG (Max 10MB)
                                            </p>
                                        </label>
                                    </div>
                                    {uploadedFile && (
                                        <div className="bg-green-500/20 border border-green-400/50 rounded-xl p-4 flex items-center space-x-3">
                                            <CheckCircle className="w-6 h-6 text-green-400" />
                                            <div>
                                                <p className="text-white font-medium">File uploaded successfully</p>
                                                <p className="text-green-400 text-sm">{uploadedFile.name}</p>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            )}

                            {step === 4 && (
                                <div className="text-center space-y-6">
                                    <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                                        <CheckCircle className="w-10 h-10 text-white" />
                                    </div>
                                    <h3 className="text-2xl font-semibold text-white">Consultation Booked!</h3>
                                    <p className="text-gray-300">
                                        Your consultation with {selectedExpert.name} has been scheduled. You will receive a confirmation shortly.
                                    </p>
                                    <div className="bg-white/10 rounded-2xl p-4 space-y-2 text-left">
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Expert:</span>
                                            <span className="text-white">{selectedExpert.name}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-400">Type:</span>
                                            <span className="text-white capitalize">{consultationType}</span>
                                        </div>
                                        {selectedDate && (
                                            <div className="flex justify-between">
                                                <span className="text-gray-400">Date:</span>
                                                <span className="text-white">{selectedDate}</span>
                                            </div>
                                        )}
                                        {selectedTime && (
                                            <div className="flex justify-between">
                                                <span className="text-gray-400">Time:</span>
                                                <span className="text-white">{selectedTime}</span>
                                            </div>
                                        )}
                                        {uploadedFile && (
                                            <div className="flex justify-between">
                                                <span className="text-gray-400">Report:</span>
                                                <span className="text-white text-sm">{uploadedFile.name}</span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            )}

                            {/* Action Buttons */}
                            <div className="flex space-x-4 mt-8">
                                {step > 1 && step < 4 && (
                                    <button
                                        onClick={() => setStep(step - 1)}
                                        className="flex-1 px-6 py-3 bg-white/10 hover:bg-white/20 rounded-2xl font-semibold transition-all duration-300"
                                    >
                                        Back
                                    </button>
                                )}
                                {step < 4 ? (
                                    <button
                                        onClick={handleNext}
                                        disabled={
                                            (step === 1 && !consultationType) ||
                                            (step === 2 && (!selectedDate || !selectedTime)) ||
                                            (step === 3 && !uploadedFile)
                                        }
                                        className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 rounded-2xl font-semibold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 disabled:hover:scale-100"
                                    >
                                        {step === 3 ? 'Book Consultation' : 'Next'}
                                    </button>
                                ) : (
                                    <button
                                        onClick={closeModal}
                                        className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-400 hover:to-emerald-500 rounded-2xl font-semibold transition-all duration-300 hover:scale-105"
                                    >
                                        Done
                                    </button>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Animations */}
            <style jsx>{`
                @keyframes float-up {
                    to { transform: translateY(-100vh); opacity: 0; }
                }
                @keyframes gradient {
                    0%, 100% { background-position: 0% 50%; }
                    50% { background-position: 100% 50%; }
                }
                .animate-gradient { background-size: 200% 200%; animation: gradient 3s ease infinite; }
                .animate-spin-slow { animation: spin 20s linear infinite; }
                .animate-fade-in { animation: fadeIn 1s ease-out; }
                .animate-slide-up { animation: slideUp 1s ease-out; }
                .animate-scale-in { animation: scaleIn 0.8s ease-out; }
                .animate-fade-in-delay { animation: fadeIn 0.8s ease-out both; }
                @keyframes fadeIn { 
                    from { opacity: 0; transform: translateY(20px);} 
                    to { opacity: 1; transform: translateY(0);} 
                }
                @keyframes slideUp { 
                    from { opacity: 0; transform: translateY(30px);} 
                    to { opacity: 1; transform: translateY(0);} 
                }
                @keyframes scaleIn { 
                    from { opacity: 0; transform: scale(0.9);} 
                    to { opacity: 1; transform: scale(1);} 
                }
            `}</style>
        </div>
    )
}