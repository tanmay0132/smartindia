// main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";

import App from "./App.jsx";
import Navbar from "./components/Navbar.jsx";
import Footer from "./components/Footer.jsx";
import "./index.css";

import About from "./components/pages/About.jsx";
import LoginSignup from "./components/pages/LoginSignup.jsx";
import FieldInfo from "./components/pages/FieldInfo.jsx";
import ConsultExpertPage from "./components/pages/ConsultExpert.jsx";


// Page transition wrapper
function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <PageWrapper>
              <App />
            </PageWrapper>
          }
        />
        <Route
          path="/about"
          element={
            <PageWrapper>
              <About />
            </PageWrapper>
          }
        />
        <Route
          path="/loginsignup"
          element={
            <PageWrapper>
              <LoginSignup />
            </PageWrapper>
          }
        />
        <Route
          path="/consult-expert"
          element={
            <PageWrapper>
              <ConsultExpertPage />
            </PageWrapper>
          }
        />
        <Route
          path="/field-info"
          element={
            <PageWrapper>
              <FieldInfo />
            </PageWrapper>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

// Reusable animation wrapper for pages First Choice
function PageWrapper({ children }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -30 }}
      transition={{ duration: 0.5, ease: "easeInOut" }}
      className="min-h-screen"
    >
      {children}
    </motion.div>
  );
}

// Reusable animation wrapper for pages Second Choice
// function PageWrapper({ children }) {
//   return (
//     <motion.div
//       initial={{ opacity: 0, y: 15 }}
//       animate={{ opacity: 1, y: 0 }}
//       exit={{ opacity: 0, y: -15 }}
//       transition={{
//         duration: 0.7,
//         ease: [0.25, 0.8, 0.25, 1], // smooth cubic-bezier
//       }}
//       className="min-h-screen"
//     >
//       {children}
//     </motion.div>
//   );
// }


ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-green-900 to-black text-white overflow-hidden">
        <Navbar />
        <AnimatedRoutes />
        <Footer />
      </div>
    </BrowserRouter>
  </React.StrictMode>
);
