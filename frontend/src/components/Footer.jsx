import React, { useState } from 'react';
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

const Footer = () => {
  return (
    <>
    <footer id="footer" className="relative z-10 py-12 px-4 sm:px-6 lg:px-8 bg-gray-900/50 backdrop-blur-sm border-t border-gray-700/50">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            
            {/* Logo & About */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-lg flex items-center justify-center">
                  <Leaf className="w-5 h-5 text-white" />
                </div>
                <span className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
                  AgriAI Platform
                </span>
              </div>
              <p className="text-gray-300 mb-4 max-w-md">
                Revolutionizing farming with AI-powered insights and precision agriculture technology for sustainable crop management.
              </p>
              <div className="flex space-x-4">
                <div className="w-10 h-10 bg-gray-800 hover:bg-green-600 rounded-full flex items-center justify-center cursor-pointer transition-colors">
                  <Users className="w-5 h-5 text-gray-300" />
                </div>
                <div className="w-10 h-10 bg-gray-800 hover:bg-green-600 rounded-full flex items-center justify-center cursor-pointer transition-colors">
                  <Mail className="w-5 h-5 text-gray-300" />
                </div>
                <div className="w-10 h-10 bg-gray-800 hover:bg-green-600 rounded-full flex items-center justify-center cursor-pointer transition-colors">
                  <Phone className="w-5 h-5 text-gray-300" />
                </div>
              </div>
            </div>

            {/* Platform Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Platform</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#features" className="hover:text-green-400 transition-colors">Features</a></li>
                <li><a href="#problem-solution" className="hover:text-green-400 transition-colors">Solutions</a></li>
                <li><a href="#dashboard" className="hover:text-green-400 transition-colors">Dashboard</a></li>
                <li><a href="#notifications" className="hover:text-green-400 transition-colors">Notifications</a></li>
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h4 className="text-lg font-semibold text-white mb-4">Support</h4>
              <ul className="space-y-2 text-gray-300">
                <li><a href="#" className="hover:text-green-400 transition-colors">Help Center</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-green-400 transition-colors">Contact Us</a></li>
              </ul>
            </div>

          </div>

          {/* Bottom Note */}
          <div className="mt-12 text-center text-gray-500 text-sm border-t border-gray-700/50 pt-6">
            © {new Date().getFullYear()} AgriAI. All rights reserved.
          </div>
        </div>
      </footer>
    </>
  )
}

export default Footer