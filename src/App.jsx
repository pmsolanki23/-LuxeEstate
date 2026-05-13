import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Navigate, Route, Routes, useLocation } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Loader from "./components/Loader";
import Home from "./pages/Home";
import PropertiesPage from "./pages/PropertiesPage";
import ServicesPage from "./pages/ServicesPage";
import AgentsPage from "./pages/AgentsPage";
import ContactPage from "./pages/ContactPage";
import PropertyDetails from "./pages/PropertyDetails";

function App() {
  const [loading, setLoading] = useState(true);
  const location = useLocation();
  const { darkMode } = useContext(ThemeContext);

  return (
    <div style={{ background: darkMode ? "#0a0a0a" : "#F5F0E8", minHeight: "100vh", transition: "background 0.5s" }}>
      <AnimatePresence>
        {loading && <Loader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      {!loading && (
        <>
          <Navbar />
          <AnimatePresence mode="wait" initial={false}>
            <Routes location={location} key={location.key}>
              <Route path="/" element={<Home />} />
              <Route path="/properties" element={<PropertiesPage />} />
              <Route path="/services" element={<ServicesPage />} />
              <Route path="/agents" element={<AgentsPage />} />
              <Route path="/contact" element={<ContactPage />} />
              <Route path="/property/:id" element={<PropertyDetails />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </AnimatePresence>
        </>
      )}
    </div>
  );
}

export default App;
