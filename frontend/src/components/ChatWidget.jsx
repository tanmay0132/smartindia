"use client"

import React from "react"

import { useState } from "react"
import { MessageCircle, X, Send, Leaf, Bot, User } from "lucide-react"

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false)
  const [message, setMessage] = useState("")
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "👋 Welcome to AgriAI! I'm here to help you with field monitoring, crop analysis, and agricultural insights. How can I assist you today?",
      sender: "bot",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    },
  ])

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: messages.length + 1,
        text: message,
        sender: "user",
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages([...messages, newMessage])
      setMessage("")

      // Simulate bot response
      setTimeout(() => {
        const botResponse = {
          id: messages.length + 2,
          text: "Thanks for your question! I'm analyzing your field data and will provide insights shortly. Our AI models are processing the latest sensor readings and spectral imaging data.",
          sender: "bot",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        }
        setMessages((prev) => [...prev, botResponse])
      }, 1500)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      {/* Chat Toggle Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="group bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 text-white p-3 sm:p-4 rounded-full shadow-2xl shadow-green-500/25 hover:shadow-green-500/40 transition-all duration-300 transform hover:scale-110 hover:rotate-3 backdrop-blur-sm border border-green-400/20"
        >
          <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6 group-hover:scale-110 transition-transform duration-300" />

          {/* Pulse animation */}
          <div className="absolute inset-0 rounded-full bg-gradient-to-r from-green-500 to-blue-600 animate-ping opacity-20"></div>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div className="w-screen h-screen sm:w-96 sm:h-[500px] fixed sm:relative inset-0 sm:inset-auto bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 backdrop-blur-xl rounded-none sm:rounded-2xl shadow-2xl shadow-black/50 border-0 sm:border border-gray-700/50 flex flex-col overflow-hidden animate-in slide-in-from-bottom-5 duration-300">
          {/* Header */}
          <div className="bg-gradient-to-r from-green-600/90 to-blue-600/90 backdrop-blur-sm text-white px-4 sm:px-6 py-4 flex justify-between items-center border-b border-green-500/20">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-lg">
                <Leaf className="w-4 h-4 text-white" />
              </div>
              <div>
                <span className="font-semibold text-base sm:text-lg">AgriAI Assistant</span>
                <div className="flex items-center gap-2 text-xs text-green-200">
                  <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                  Online
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/10 p-2 rounded-full transition-all duration-200 hover:rotate-90"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Messages Section */}
          <div className="flex-1 p-3 sm:p-4 overflow-y-auto space-y-4 bg-gradient-to-b from-gray-900/50 to-black/50 backdrop-blur-sm">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex items-start gap-2 sm:gap-3 ${msg.sender === "user" ? "flex-row-reverse" : "flex-row"}`}
              >
                {/* Avatar */}
                <div
                  className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    msg.sender === "user"
                      ? "bg-gradient-to-r from-blue-500 to-purple-600"
                      : "bg-gradient-to-r from-green-500 to-blue-600"
                  }`}
                >
                  {msg.sender === "user" ? (
                    <User className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  ) : (
                    <Bot className="w-3 h-3 sm:w-4 sm:h-4 text-white" />
                  )}
                </div>

                {/* Message Bubble */}
                <div className={`max-w-[80%] sm:max-w-[75%] ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                  <div
                    className={`p-2.5 sm:p-3 rounded-2xl backdrop-blur-sm border transition-all duration-200 hover:scale-[1.02] ${
                      msg.sender === "user"
                        ? "bg-gradient-to-r from-blue-600/80 to-purple-600/80 text-white border-blue-500/30 rounded-br-md"
                        : "bg-gradient-to-r from-gray-800/80 to-gray-700/80 text-gray-100 border-gray-600/30 rounded-bl-md"
                    }`}
                  >
                    <p className="text-xs sm:text-sm leading-relaxed">{msg.text}</p>
                  </div>
                  <div className={`text-xs text-gray-400 mt-1 ${msg.sender === "user" ? "text-right" : "text-left"}`}>
                    {msg.timestamp}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input Section */}
          <div className="p-3 sm:p-4 bg-gradient-to-r from-gray-800/90 to-gray-900/90 backdrop-blur-sm border-t border-gray-700/50">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex-1 relative">
                <input
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask about your crops, soil, or field conditions..."
                  className="w-full bg-gray-700/50 backdrop-blur-sm border border-gray-600/50 rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500/50 focus:border-green-500/50 transition-all duration-200"
                />
              </div>
              <button
                onClick={handleSendMessage}
                disabled={!message.trim()}
                className="bg-gradient-to-r from-green-500 to-blue-600 hover:from-green-600 hover:to-blue-700 disabled:from-gray-600 disabled:to-gray-700 text-white p-2.5 sm:p-3 rounded-xl transition-all duration-200 transform hover:scale-105 disabled:scale-100 disabled:cursor-not-allowed shadow-lg shadow-green-500/20 hover:shadow-green-500/40"
              >
                <Send className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
