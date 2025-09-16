"use client"

import { useState, useEffect } from "react"
import {
    Award,
    Target,
    Lightbulb,
    Code,
    Database,
    Smartphone,
    Palette,
    Brain,
    Github,
    Linkedin,
    Mail,
    Calendar,
    MapPin,
    Trophy,
    Rocket,
    Heart,
    CodeXml,
} from "lucide-react"

const AboutPage = () => {
    const [isVisible, setIsVisible] = useState({})

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    setIsVisible((prev) => ({
                        ...prev,
                        [entry.target.id]: entry.isIntersecting,
                    }))
                })
            },
            { threshold: 0.1 },
        )

        const elements = document.querySelectorAll("[id]")
        elements.forEach((el) => observer.observe(el))

        return () => observer.disconnect()
    }, [])

    const teamMembers = [
        {
            name: "Tanmay",
            role: "Team Lead & AI/ML",
            description:
                "Leads the team and development of AI models. Specializes in machine learning integration and deep learning.",
            skills: ["TensorFlow", "PyTorch", "Computer Vision", "LSTM", "CNN"],
            icon: <Code className="w-6 h-6" />,
            avatar: "https://media.licdn.com/dms/image/v2/D4E03AQEZHxL99kcujg/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1728161143722?e=1759968000&v=beta&t=gudYEnwr8Py9T5U6qJHRVSO96GWtjmaHw3rHsvyfMIU",
            linkedin: "https://www.linkedin.com/in/tanmayyash-mallick-229b82325/",
        },
        {
            name: "Saanvi",
            role: "AI/ML Engineer",
            description:
                "Develops deep learning models for crop analysis and spectral imaging. Expert in computer vision and neural networks.",
            skills: ["TensorFlow", "PyTorch", "Computer Vision", "LSTM", "CNN"],
            icon: <Brain className="w-6 h-6" />,
            avatar: "https://media.licdn.com/dms/image/v2/D5603AQETpv64ZR9eIA/profile-displayphoto-shrink_400_400/B56ZdO0eiLHEAg-/0/1749374070994?e=1759968000&v=beta&t=vzWE7q5PSOdhSEdu4SGTb5C7yzpXyi1CoeUazGxF8ZA",
            linkedin: "https://www.linkedin.com/in/saanvi-konchada/",
        },
        {
            name: "Swayampragyan",
            role: "Backend Developer",
            description:
                "Leads backend development, architecting robust APIs and scalable database systems. Ensures high performance and reliability across applications.",
            skills: ["Node Js.", "Express Js.", "MySQL", "Mern Stack", "Server Management"],
            icon: <Database className="w-6 h-6" />,
            avatar: "https://media.licdn.com/dms/image/v2/D4D03AQFHt-fnX0dQCA/profile-displayphoto-scale_400_400/B4DZlS2eLHJAAg-/0/1758031638241?e=1761177600&v=beta&t=Cz067H_vCKF9LTlOCZThK91KdShQqr2loO-76IvoKG4",
            linkedin: "https://www.linkedin.com/in/swayampragyan-sahoo-210607328/",
        },
        {
            name: "Saurav",
            role: "Frontend Developer",
            description:
                "Builds modern and interactive web applications with clean, maintainable code. Passionate about crafting smooth user interactions.",
            skills: ["React", "JavaScript", "Tailwind CSS", "Responsive Design"],
            icon: <CodeXml className="w-6 h-6" />,
            avatar: "https://media.licdn.com/dms/image/v2/D4E03AQFpLhyBWSIPWg/profile-displayphoto-crop_800_800/B4EZlOFtoJKsAM-/0/1757951746601?e=1761177600&v=beta&t=NIlHJz5RQvt3BUmWy4Mw21LWJbrkPfC85CKTc8JULxg",
            linkedin: "https://www.linkedin.com/in/saurav-panigrahi-6b9576323/",
        },
        {
            name: "Prateek",
            role: "UI/UX Designer",
            description:
                "Creates intuitive user interfaces and engaging experiences. Skilled in design thinking, prototyping, and user research.",
            skills: ["Figma", "UI/UX", "Wireframing", "Prototyping", "User Research"],
            icon: <Palette className="w-6 h-6" />,
            avatar: "https://media.licdn.com/dms/image/v2/D5603AQEMOMUwQqe1CQ/profile-displayphoto-scale_400_400/B56ZkZ0ocrG0Aw-/0/1757074853763?e=1759968000&v=beta&t=UvSLhOwYOjJ39WXUmY3tx1z7aBmmEl8m4qjpP0HaJss",
            linkedin: "https://www.linkedin.com/in/prateek-mohanty-519240330/",
        },

        {
            name: "Surya",
            role: "Reasearch And Backend",
            description:
                "Leads research initiatives, building scalable APIs and managing deployment pipelines. Skilled in cross-platform mobile solutions to ensure robust, efficient systems.",
            skills: ["Django", "Python", "AI & ML", "Research", "Web Development"],
            icon: <Smartphone className="w-6 h-6" />,
            avatar: "https://media.licdn.com/dms/image/v2/D5635AQEjDAPwP7vMCw/profile-framedphoto-shrink_800_800/B56ZjpnC_qIAAg-/0/1756265984442?e=1758542400&v=beta&t=SppRN5a_0hbZP1REuyG6ofCy12UoXw983sFRypAjrOM",
            linkedin: "https://www.linkedin.com/in/surya-pratap-dash-b5b496287/",
        },
    ]

    const projectHighlights = [
        {
            icon: <Award className="w-8 h-8" />,
            title: "SIH 2025 Innovation",
            description: "Competing in Smart India Hackathon 2025 with cutting-edge agricultural technology solutions.",
        },
        {
            icon: <Brain className="w-8 h-8" />,
            title: "AI-Powered Analytics",
            description: "Advanced machine learning models for crop health prediction and yield optimization.",
        },
        {
            icon: <Target className="w-8 h-8" />,
            title: "Real-World Impact",
            description: "Addressing critical agricultural challenges faced by farmers across India.",
        },
        {
            icon: <Rocket className="w-8 h-8" />,
            title: "Scalable Solution",
            description: "Built for nationwide deployment with cloud-native architecture and mobile accessibility.",
        },
    ]

    const technologies = [
        { name: "React & Javascript", category: "Frontend" },
        { name: "Python & Express Js", category: "Backend" },
        { name: "TensorFlow & PyTorch", category: "AI/ML" },
        { name: "MySQL", category: "Database" },
        { name: "React Native", category: "Mobile" },
        { name: "LSTM & CNN", category: "Deep Learning" },
        { name: "Tailwind CSS", category: "Styling" },
        { name: "Computer Vision", category: "AI/ML" },
    ]

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-black text-white overflow-hidden">
            {/* Animated Background */}
            <div className="fixed inset-0 z-0">
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
                                animationDuration: `${Math.random() * 3 + 2}s`,
                            }}
                        />
                    ))}
                </div>
            </div>

            {/* Hero Section */}
            <section
                className="relative z-10 pt-20 pb-11 px-4 sm:px-6 lg:px-8"
                style={{ paddingTop: "118px" }}
            >
                <div className="max-w-4xl mx-auto text-center">
                    <div className="animate-fade-in">
                        <div className="flex items-center justify-center gap-3 mb-6">
                            <Trophy className="w-12 h-12 text-yellow-400" />
                            <span className="bg-gradient-to-r from-yellow-400 to-orange-500 px-4 py-2 rounded-full text-black font-bold text-lg">
                                Smart India Hackathon 2025
                            </span>
                        </div>
                        <h1 className="text-5xl sm:text-6xl lg:text-7xl mb-6 font-bold bg-gradient-to-r from-green-400 via-blue-500 to-green-600 bg-clip-text text-transparent leading-[1.2] pb-2">
                            Team Zero Degree
                        </h1>

                        <p className="text-xl sm:text-2xl lg:text-3xl mb-8 text-gray-300 max-w-3xl mx-auto leading-relaxed">
                            Revolutionizing agriculture through AI-powered insights and innovative
                            technology solutions
                        </p>

                        <div className="flex items-center justify-center gap-6 text-gray-300 mb-10">
                            <div className="flex items-center gap-2">
                                <Calendar className="w-5 h-5 text-green-400" />
                                <span>Smart India Hackathon 2025</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <MapPin className="w-5 h-5 text-blue-400" />
                                <span>India</span>
                            </div>
                        </div>

                        {/* Download Button */}
                        <div className="flex justify-center">
                            <a
                                href=".../sih.pdf" // Replace with your PDF path
                                download
                                className="px-6 py-3 bg-gradient-to-r from-green-400 via-blue-500 to-green-600 text-white font-semibold rounded-lg shadow-lg 
               transform transition-all duration-300 ease-in-out text-sm sm:text-base
               hover:scale-110 hover:shadow-xl hover:shadow-green-500/30 hover:bg-gradient-to-r hover:from-blue-500 hover:via-green-500 hover:to-green-700"
                            >
                                Download SIH PDF
                            </a>
                        </div>

                    </div>
                </div>
            </section>


            {/* Project Highlights */}
            <section id="highlights" className="relative z-10 py-16 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div
                        className={`text-center mb-16 transition-all duration-1000 ${isVisible.highlights ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                    >
                        <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-green-400">Project Highlights</h2>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            Our innovative approach to solving agricultural challenges
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {projectHighlights.map((highlight, index) => (
                            <div
                                key={index}
                                className={`group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 hover:border-green-500/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20 ${isVisible.highlights ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                                style={{ transitionDelay: `${index * 0.1}s` }}
                            >
                                <div className="text-green-400 mb-4 group-hover:text-green-300 transition-colors">{highlight.icon}</div>
                                <h3 className="text-xl font-semibold mb-3 text-white">{highlight.title}</h3>
                                <p className="text-gray-300 group-hover:text-gray-200 transition-colors">{highlight.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Team Section */}
            <section
                id="team"
                className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-gray-900/50 to-green-900/30"
            >
                <div className="max-w-7xl mx-auto">
                    <div
                        className={`text-center mb-16 transition-all duration-1000 ${isVisible.team ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                    >
                        <h2 className="text-4xl sm:text-5xl font-bold mb-4 text-white">Meet Our Team</h2>
                        <p className="text-xl text-gray-300 max-w-2xl mx-auto">
                            Five passionate developers united by innovation and agricultural technology
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {teamMembers.map((member, index) => (
                            <div
                                key={index}
                                className={`group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-8 rounded-2xl border border-gray-700/50 hover:border-green-500/50 transition-all duration-500 transform hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20 ${isVisible.team ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                                style={{ transitionDelay: `${index * 0.0001}s` }}
                            >
                                {/* Avatar */}
                                <div className="relative mb-6">
                                    <img
                                        src={`${member.avatar}`}
                                        alt={member.name}
                                        className={`w-24 h-24 rounded-full mx-auto border-4 transition-all duration-300  border-green-400/50 group-hover:border-green-400
                                            `}
                                    />
                                    <div
                                        className={`absolute -bottom-2 -right-2 p-2 rounded-full bg-gradient-to-r from-green-500 to-blue-600`}
                                    >
                                        <div className="text-white">{member.icon}</div>
                                    </div>
                                </div>


                                {/* Member Info */}
                                <div className="text-center mb-6">
                                    <h3 className="text-2xl font-bold mb-2 text-white group-hover:text-green-400 transition-colors">
                                        {member.name}
                                    </h3>
                                    <p className="text-green-400 font-semibold mb-3">{member.role}</p>
                                    <p className="text-gray-300 text-sm leading-relaxed">{member.description}</p>
                                </div>

                                {/* Skills */}
                                <div className="mb-6">
                                    <div className="flex flex-wrap gap-2 justify-center">
                                        {member.skills.map((skill, skillIndex) => (
                                            <span
                                                key={skillIndex}
                                                className="bg-green-500/20 text-green-400 px-3 py-1 rounded-full text-xs font-medium border border-green-500/30"
                                            >
                                                {skill}
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Social Links */}
                                <div className="flex justify-center gap-4">
                                    <a
                                        href={member.github}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 bg-gray-700/50 hover:bg-green-500/20 rounded-full transition-all duration-300 group/btn"
                                    >
                                        <Github className="w-4 h-4 text-gray-400 group-hover/btn:text-green-400" />
                                    </a>

                                    <a
                                        href={member.linkedin}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-2 bg-gray-700/50 hover:bg-blue-500/20 rounded-full transition-all duration-300 group/btn"
                                    >
                                        <Linkedin className="w-4 h-4 text-gray-400 group-hover/btn:text-blue-400" />
                                    </a>

                                    <a
                                        href={`mailto:${member.mail}`}
                                        className="p-2 bg-gray-700/50 hover:bg-purple-500/20 rounded-full transition-all duration-300 group/btn"
                                    >
                                        <Mail className="w-4 h-4 text-gray-400 group-hover/btn:text-purple-400" />
                                    </a>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Technology Stack */}
            <section id="technology" className="relative z-10 py-20 px-4 sm:px-6 lg:px-8">
                <div className="max-w-6xl mx-auto">
                    <div
                        className={`text-center mb-16 transition-all duration-1000 ${isVisible.technology ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                    >
                        <h2 className="text-4xl font-bold mb-4 text-white">Technology Stack</h2>
                        <p className="text-xl text-gray-300">Cutting-edge technologies powering our agricultural platform</p>
                    </div>

                    <div
                        className={`grid grid-cols-2 md:grid-cols-4 gap-6 transition-all duration-1000 ${isVisible.technology ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                    >
                        {technologies.map((tech, index) => (
                            <div
                                key={index}
                                className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50 hover:border-green-500/50 transition-all duration-300 text-center"
                                style={{ transitionDelay: `${index * 0.05}s` }}
                            >
                                <h4 className="font-semibold text-white mb-2 group-hover:text-green-400 transition-colors">
                                    {tech.name}
                                </h4>
                                <span className="text-sm text-gray-400 bg-gray-700/50 px-3 py-1 rounded-full">{tech.category}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Mission & Vision */}
            <section
                id="mission"
                className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-900/30 to-green-900/30"
            >
                <div className="max-w-6xl mx-auto">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                        {/* Mission */}
                        <div
                            className={`transition-all duration-1000 ${isVisible.mission ? "opacity-100 -translate-x-0" : "opacity-0 -translate-x-10"}`}
                        >
                            <div className="bg-gradient-to-br from-green-600/20 to-blue-600/20 backdrop-blur-sm p-8 rounded-2xl border border-green-500/30 hover:border-green-400/50 transition-all duration-300">
                                <div className="flex items-center mb-6">
                                    <Target className="w-10 h-10 text-green-400 mr-4" />
                                    <h3 className="text-3xl font-bold text-white">Our Mission</h3>
                                </div>
                                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                                    To empower farmers with AI-driven insights that transform traditional agriculture into precision
                                    farming, ensuring sustainable crop production and food security for future generations.
                                </p>
                                <ul className="space-y-3">
                                    <li className="flex items-center text-gray-300">
                                        <Heart className="w-5 h-5 text-green-400 mr-3" />
                                        Democratize agricultural technology
                                    </li>
                                    <li className="flex items-center text-gray-300">
                                        <Lightbulb className="w-5 h-5 text-green-400 mr-3" />
                                        Enable data-driven farming decisions
                                    </li>
                                    <li className="flex items-center text-gray-300">
                                        <Rocket className="w-5 h-5 text-green-400 mr-3" />
                                        Accelerate agricultural innovation
                                    </li>
                                </ul>
                            </div>
                        </div>

                        {/* Vision */}
                        <div
                            className={`transition-all duration-1000 ${isVisible.mission ? "opacity-100 translate-x-0" : "opacity-0 translate-x-10"}`}
                        >
                            <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 backdrop-blur-sm p-8 rounded-2xl border border-blue-500/30 hover:border-blue-400/50 transition-all duration-300">
                                <div className="flex items-center mb-6">
                                    <Lightbulb className="w-10 h-10 text-blue-400 mr-4" />
                                    <h3 className="text-3xl font-bold text-white">Our Vision</h3>
                                </div>
                                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                                    A world where every farmer has access to intelligent agricultural systems that maximize yield,
                                    minimize environmental impact, and create a sustainable future for global food production.
                                </p>
                                <div className="space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-3"></div>
                                        <span className="text-gray-300">Global agricultural transformation through AI</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-3"></div>
                                        <span className="text-gray-300">Sustainable farming practices worldwide</span>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="w-2 h-2 bg-blue-400 rounded-full mt-3"></div>
                                        <span className="text-gray-300">Enhanced food security for all</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    )
}

export default AboutPage
