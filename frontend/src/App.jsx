import React, { useState, useEffect, useRef } from 'react';
import {
  Eye,
  MapPin,
  Bell,
  TrendingUp,
  Leaf,
  BarChart3,
  Shield,
  Smartphone,
  ArrowRight,
  CheckCircle,
  Menu,
  X,
  Play,
  Users,
  Mail,
  Phone
} from 'lucide-react';
import VideoModal from './components/VideoModal';
import Spline from '@splinetool/react-spline';
import { useNavigate } from "react-router-dom";



const HomePage = () => {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  const videoRef = useRef(null);
  const [fade, setFade] = useState(false);
  const [visible, setVisible] = useState(false); // controls first load fade
   const navigate = useNavigate();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleTimeUpdate = () => {
      if (video.duration - video.currentTime < 0.5) {
        setFade(true);
      }
    };

    const handleEnded = () => {
      video.currentTime = 0;
      setFade(false); // fade back in after replay
      video.play();
    };

    const handleLoaded = () => {
      setTimeout(() => setVisible(true), 50);
      // small delay ensures CSS transition actually runs
    };

    video.addEventListener("timeupdate", handleTimeUpdate);
    video.addEventListener("ended", handleEnded);
    video.addEventListener("loadeddata", handleLoaded);

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.removeEventListener("ended", handleEnded);
      video.removeEventListener("loadeddata", handleLoaded);
    };
  }, []);




  const [isVisible, setIsVisible] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);


  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          setIsVisible(prev => ({
            ...prev,
            [entry.target.id]: entry.isIntersecting
          }));
        });
      },
      { threshold: 0.1 }
    );

    const elements = document.querySelectorAll('[id]');
    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const features = [
    {
      icon: <Eye className="w-8 h-8" />,
      title: "Whole Field View",
      description: "See complete field-level insights with spectral imaging and AI."
    },
    {
      icon: <MapPin className="w-8 h-8" />,
      title: "Custom Multi-Field Monitoring",
      description: "Set your own fields and get personalized insights."
    },
    {
      icon: <Bell className="w-8 h-8" />,
      title: "Real-Time Alerts & Notifications",
      description: "Get SMS/email alerts for soil, crop health, and pest risks."
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Proactive Crop Management",
      description: "Shift from reactive to proactive farming decisions."
    }
  ];



  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-black text-white overflow-hidden">
      {/* Navigation */}

      {/* Animated Background */}
      {/* <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-green-600/20 via-transparent to-blue-600/20 animate-pulse"></div>
        <div className="absolute top-0 left-0 w-full h-full">
          {[...Array(50)].map((_, i) => (
            <div
              key={i}
              className="absolute bg-green-400/10 rounded-full animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                width: `${Math.random() * 4 + 1}px`,
                height: `${Math.random() * 4 + 1}px`,
                animationDelay: `${Math.random() * 5}s`,
                animationDuration: `${Math.random() * 3 + 2}s`
              }}
            />
          ))}
        </div>
      </div> */}

      {/* Hero Section */}
      <section className="relative z-10 min-h-screen pt-24 sm:pt-16 flex items-center justify-between px-4 sm:px-6 lg:px-16 overflow-hidden bg-[#131215]">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-green-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
          <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-blue-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
          <div className="absolute bottom-1/4 left-1/2 w-72 h-72 bg-green-400 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        </div>

        {/* Floating particles */}
        {/* <div className="absolute inset-0">
    {[...Array(15)].map((_, i) => (
      <div
        key={i}
        className="absolute rounded-full bg-green-500/10 animate-float"
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          width: `${Math.random() * 20 + 5}px`,
          height: `${Math.random() * 20 + 5}px`,
          animationDelay: `${Math.random() * 5}s`,
          animationDuration: `${Math.random() * 10 + 15}s`,
        }}
      ></div>
    ))}
  </div> */}

        {/* Hero Text */}
        <div className="relative z-20 max-w-4xl text-left lg:text-left lg:max-w-xl ">
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight pb-2 bg-gradient-to-r from-green-400 via-blue-500 to-green-600 bg-clip-text text-transparent animate-gradient">
            AI-Powered Agriculture Insights
          </h1>

          <p className="text-xl sm:text-2xl lg:text-3xl mb-10 text-gray-300 max-w-3xl leading-relaxed">
            From soil to yield — get real-time, field-level intelligence using AI, spectral imaging, and sensor fusion.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start items-center max-[473px]:mb-6">
            <button
              onClick={() => navigate("/fieldinfo")}
              className="group bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 hover:shadow-2xl flex items-center gap-3 shadow-lg shadow-green-500/20 hover:shadow-green-500/40"
            >
              Try the Model
              <ArrowRight className="w-5 h-5 transform transition-transform duration-300 ease-in-out group-hover:translate-x-1" />
            </button>

            <button
              onClick={() => setIsModalOpen(true)}
              className="group bg-transparent border-2 border-green-400 hover:bg-green-400/10 text-green-400 font-bold py-4 px-8 rounded-full text-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-3 hover:shadow-lg hover:shadow-green-400/20"
            >
              <Play className="mr-1 sm:mr-2 w-4 h-4 sm:w-5 sm:h-5 group-hover:scale-110 transition-transform " />
              Watch Demo
            </button>
          </div>
        </div>

        {/* Video Container with Smooth Transition */}
        <div className="hidden lg:flex absolute top-1/2 right-0 w-1/2 h-[90%] mt-8 -translate-y-1/2 items-center justify-center p-8">
          <div className="relative w-full h-full max-w-xl rounded-2xl overflow-hidden shadow-2xl ">
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              className={`w-[95%] h-full object-cover transition-opacity duration-700 ease-in-out ${visible ? (fade ? "opacity-0" : "opacity-100") : "opacity-0"}`}
              poster=""
            >
              <source src="../Final Robot.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>

            {/* Subtle overlay */}
            <div className="absolute inset-0 bg-gradient-to-l from-black/10 to-transparent pointer-events-none"></div>
          </div>
        </div>








        {/* Demo Modal (simplified) */}
        {isModalOpen && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4">
            <div className="bg-gray-900 rounded-xl max-w-2xl w-full p-6">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-xl font-bold text-green-400">Product Demo</h3>
                <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-white">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="aspect-video bg-black rounded-lg flex items-center justify-center">
                <p className="text-gray-400">Demo video would play here</p>
              </div>
            </div>
          </div>
        )}
      </section>


      {/* Features Section */}
      <section id="features" className="relative z-10 pb-20 pt-10 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-green-400">
              Powerful Features
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Advanced AI technology meets precision agriculture
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 hover:border-green-500/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20 ${isVisible.features ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
                style={{ transitionDelay: `${index * 0.1}s` }}
              >
                <div className="text-green-400 mb-4 group-hover:text-green-300 transition-colors">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-3 text-white">
                  {feature.title}
                </h3>
                <p className="text-gray-300 group-hover:text-gray-200 transition-colors">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Problem & Solution Section */}
      <section id="problem-solution" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-900/50 to-green-900/30">
        <div className="max-w-7xl mx-auto">
          <div className={`text-center mb-16 transition-all duration-1000 ${isVisible['problem-solution'] ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-white">
              Transforming Agriculture
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              From traditional challenges to AI-powered solutions
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Problem */}
            <div className={`transition-all duration-1000 ${isVisible['problem-solution'] ? 'opacity-100 -translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <div className="bg-red-900/20 backdrop-blur-sm p-8 rounded-2xl border border-red-500/30 hover:border-red-400/50 transition-all duration-300">
                <div className="flex items-center mb-6">
                  <Shield className="w-10 h-10 text-red-400 mr-4" />
                  <h3 className="text-3xl font-bold text-red-400">The Problem</h3>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  Agriculture faces threats from soil degradation, unpredictable weather, and pest outbreaks. Traditional monitoring is delayed, labor-intensive, and imprecise.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-300">
                    <div className="w-2 h-2 bg-red-400 rounded-full mr-3"></div>
                    Reactive farming decisions
                  </li>
                  <li className="flex items-center text-gray-300">
                    <div className="w-2 h-2 bg-red-400 rounded-full mr-3"></div>
                    Limited field visibility
                  </li>
                  <li className="flex items-center text-gray-300">
                    <div className="w-2 h-2 bg-red-400 rounded-full mr-3"></div>
                    Manual monitoring processes
                  </li>
                </ul>
              </div>
            </div>

            {/* Solution */}
            <div className={`transition-all duration-1000 ${isVisible['problem-solution'] ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="bg-green-900/20 backdrop-blur-sm p-8 rounded-2xl border border-green-500/30 hover:border-green-400/50 transition-all duration-300">
                <div className="flex items-center mb-6">
                  <Leaf className="w-10 h-10 text-green-400 mr-4" />
                  <h3 className="text-3xl font-bold text-green-400">Our Solution</h3>
                </div>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  Our AI platform integrates hyperspectral imaging, sensor data, and deep learning (LSTM, CNN) to provide early detection of stress, disease risks, and actionable insights.
                </p>
                <ul className="space-y-3">
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                    Proactive field management
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                    Real-time AI insights
                  </li>
                  <li className="flex items-center text-gray-300">
                    <CheckCircle className="w-5 h-5 text-green-400 mr-3" />
                    Automated monitoring systems
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Dashboard Preview Section */}
      <section id="dashboard" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className={`text-center mb-12 transition-all duration-1000 ${isVisible.dashboard ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
            <h2 className="text-4xl font-bold mb-4 text-white">
              Real-Time Dashboard
            </h2>
            <p className="text-xl text-gray-300">
              Monitor your fields with AI-powered analytics
            </p>
          </div>

          <div className={`bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm rounded-3xl p-8 border border-gray-700/50 shadow-2xl transition-all duration-1000 ${isVisible.dashboard ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 translate-y-20 scale-95'}`}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Field Health Map */}
              <div className="bg-gradient-to-br from-green-600/20 to-blue-600/20 p-6 rounded-xl border border-green-500/30 hover:border-green-400/50 transition-all duration-300">
                <h3 className="text-lg font-semibold mb-4 text-green-400 flex items-center gap-2">
                  <BarChart3 className="w-5 h-5" />
                  Field Health Map
                </h3>
                <div className="w-full h-32 bg-gradient-to-r from-green-400/30 to-yellow-400/30 rounded-lg relative overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-transparent via-green-400/10 to-red-400/20"></div>
                  <div className="absolute top-2 right-2 text-xs bg-green-500 px-2 py-1 rounded font-semibold">85% Healthy</div>
                  <div className="absolute bottom-2 left-2 text-xs text-gray-300">Live Data</div>
                </div>
              </div>

              {/* Soil Indices */}
              <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 p-6 rounded-xl border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300">
                <h3 className="text-lg font-semibold mb-4 text-blue-400 flex items-center gap-2">
                  <Eye className="w-5 h-5" />
                  Soil Analysis
                </h3>
                <div className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-300">Moisture</span>
                      <span className="text-sm font-semibold text-blue-400">78%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-blue-400 h-2 rounded-full w-3/4 transition-all duration-500"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-300">pH Level</span>
                      <span className="text-sm font-semibold text-green-400">6.5</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-green-400 h-2 rounded-full w-2/3 transition-all duration-500"></div>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm text-gray-300">Nutrients</span>
                      <span className="text-sm font-semibold text-yellow-400">Good</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-2">
                      <div className="bg-yellow-400 h-2 rounded-full w-4/5 transition-all duration-500"></div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Alerts */}
              <div className="bg-gradient-to-br from-yellow-600/20 to-red-600/20 p-6 rounded-xl border border-yellow-500/30 hover:border-yellow-400/50 transition-all duration-300">
                <h3 className="text-lg font-semibold mb-4 text-yellow-400 flex items-center gap-2">
                  <Bell className="w-5 h-5" />
                  Recent Alerts
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-2 bg-yellow-500/10 rounded-lg">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full animate-pulse mt-2"></div>
                    <div>
                      <span className="text-sm text-gray-300 block">Low irrigation - Field B</span>
                      <span className="text-xs text-gray-400">2 hours ago</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-2 bg-green-500/10 rounded-lg">
                    <div className="w-2 h-2 bg-green-400 rounded-full mt-2"></div>
                    <div>
                      <span className="text-sm text-gray-300 block">Optimal growth - Field A</span>
                      <span className="text-xs text-gray-400">4 hours ago</span>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-2 bg-red-500/10 rounded-lg">
                    <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse mt-2"></div>
                    <div>
                      <span className="text-sm text-gray-300 block">Pest risk detected</span>
                      <span className="text-xs text-gray-400">6 hours ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Notification Highlight */}
      <section id="notifications" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-900/30 to-green-900/30">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className={`transition-all duration-1000 ${isVisible.notifications ? 'opacity-100 -translate-x-0' : 'opacity-0 -translate-x-10'}`}>
              <h2 className="text-4xl font-bold mb-6 text-white">
                Stay Connected to Your Fields
              </h2>
              <p className="text-xl text-gray-300 mb-8 leading-relaxed">
                Receive instant SMS and mobile notifications for critical field conditions. Never miss important changes in soil moisture, pest alerts, or weather warnings.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
                {[
                  { icon: <Smartphone className="w-5 h-5" />, text: "Real-time SMS alerts" },
                  { icon: <Bell className="w-5 h-5" />, text: "Mobile notifications" },
                  { icon: <Mail className="w-5 h-5" />, text: "Email summaries" },
                  { icon: <Shield className="w-5 h-5" />, text: "Emergency warnings" }
                ].map((feature, index) => (
                  <div key={index} className="flex items-center gap-3 p-3 bg-gray-800/30 rounded-lg border border-gray-700/50">
                    <div className="text-green-400">{feature.icon}</div>
                    <span className="text-gray-300">{feature.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={`transition-all duration-1000 ${isVisible.notifications ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-10'}`}>
              <div className="relative mx-auto max-w-sm">
                {/* Phone Mockup */}
                <div className="bg-gray-900 rounded-3xl p-3 border-4 border-gray-700 shadow-2xl transform rotate-3 hover:rotate-0 transition-transform duration-300">
                  <div className="bg-black rounded-2xl overflow-hidden">
                    {/* Phone Header */}
                    <div className="bg-gradient-to-r from-gray-800 to-gray-700 p-4 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 bg-gradient-to-r from-green-400 to-blue-500 rounded flex items-center justify-center">
                          <Leaf className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-sm font-semibold text-white">AgriAI Alerts</span>
                      </div>
                      <div className="text-xs text-gray-400">Now</div>
                    </div>

                    {/* Critical Alert */}
                    <div className="p-4 bg-gradient-to-r from-red-600/20 to-orange-600/20 border-l-4 border-red-400">
                      <div className="flex items-start gap-3">
                        <Bell className="w-6 h-6 text-red-400 mt-1 animate-pulse" />
                        <div>
                          <h4 className="font-semibold text-white mb-1 flex items-center gap-2">
                            Critical Alert
                            <span className="bg-red-500 text-xs px-2 py-0.5 rounded-full">URGENT</span>
                          </h4>
                          <p className="text-sm text-gray-300 mb-2">
                            Soil moisture low in Field A. Irrigation needed within 2 hours.
                          </p>
                          <div className="flex items-center justify-between">
                            <div className="text-xs text-gray-400">
                              Field A • Moisture: 15%
                            </div>
                            <button className="text-xs text-blue-400 hover:text-blue-300">
                              View Details →
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Normal notification */}
                    <div className="p-4 bg-gradient-to-r from-green-600/20 to-blue-600/20 border-l-4 border-green-400">
                      <div className="flex items-start gap-3">
                        <CheckCircle className="w-6 h-6 text-green-400 mt-1" />
                        <div>
                          <h4 className="font-semibold text-white mb-1">Growth Update</h4>
                          <p className="text-sm text-gray-300 mb-2">
                            Field B showing optimal growth conditions.
                          </p>
                          <div className="text-xs text-gray-400">
                            Field B • Health Score: 92%
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Weather Alert */}
                    <div className="p-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 border-l-4 border-blue-400">
                      <div className="flex items-start gap-3">
                        <Shield className="w-6 h-6 text-blue-400 mt-1" />
                        <div>
                          <h4 className="font-semibold text-white mb-1">Weather Advisory</h4>
                          <p className="text-sm text-gray-300">
                            Rain expected in 3 hours. Adjust irrigation schedule.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>


      <VideoModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        videoUrl="https://www.youtube.com/embed/y6GHcK8pHQo?si=9QON2cUpbEvvKSIj"
        type="youtube"
      />

      {/* Footer */}
    </div>
  );
};

export default HomePage;
