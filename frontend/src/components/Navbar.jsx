import React, { useState, useEffect } from 'react';
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
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const userEmail = localStorage.getItem("userEmail");
        setIsLoggedIn(!!userEmail);
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("userEmail");
        setIsLoggedIn(false);
        navigate("/"); // redirect to home
    }

    const menuItems = ["Home", "Field-Info", "Consult-Expert", "About"];
    return (
        <>
            <nav className="fixed top-0 left-0 right-0 z-50 bg-gray-900/70 backdrop-blur-xl border-b border-gray-700/50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-16">
                        {/* Logo */}
                        <div className="flex items-center gap-2">
                            <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                                <Leaf className="w-5 h-5 text-white" />
                            </div>
                            <span className="text-xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                                AgriAI
                            </span>
                        </div>

                        {/* Desktop Navigation */}
                        <div className="hidden md:flex items-center space-x-8">
                            {menuItems.map((item) => (
                                <Link
                                    key={item}
                                    to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                                    className="text-gray-300 hover:text-green-400 transition-colors duration-200 font-medium"
                                >
                                    {item}
                                </Link>
                            ))}

                            {isLoggedIn ? (
                                <button
                                    onClick={handleLogout}
                                    className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105"
                                >
                                    Logout
                                </button>
                            ) : (
                                <Link
                                    to="/loginsignup"
                                    className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold py-2 px-6 rounded-full transition-all duration-300 transform hover:scale-105"
                                >
                                    Login / Sign Up
                                </Link>
                            )}
                        </div>

                        {/* Mobile menu button */}
                        <div className="md:hidden">
                            <button
                                onClick={() => setIsMenuOpen(!isMenuOpen)}
                                className="text-gray-300 hover:text-white transition-colors"
                            >
                                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
                            </button>
                        </div>
                    </div>

                    {/* Mobile Navigation */}
                    <div
                        className={`md:hidden bg-gray-800/90 backdrop-blur-lg border-t border-gray-700/50 transform transition-all duration-500
                        ${isMenuOpen ? "opacity-100 max-h-screen translate-y-0" : "opacity-0 max-h-0 -translate-y-2 overflow-hidden"}`}
                    >
                        <div className="px-2 pt-2 pb-3 space-y-1">
                            {menuItems.map((item) => (
                                <Link
                                    key={item}
                                    to={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                                    onClick={() => setIsMenuOpen(false)}
                                    className="block px-3 py-2 text-gray-300 hover:text-green-400 transition-colors duration-200 font-medium"
                                >
                                    {item}
                                </Link>
                            ))}

                            {isLoggedIn ? (
                                <button
                                    onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                                    className="w-full mt-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-semibold py-2 px-6 rounded-full transition-all duration-300"
                                >
                                    Logout
                                </button>
                            ) : (
                                <Link to="/loginsignup" onClick={() => setIsMenuOpen(false)}>
                                    <button className="w-full mt-4 bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white font-semibold py-2 px-6 rounded-full transition-all duration-300">
                                        Login / Sign Up
                                    </button>
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}

export default Navbar;
