import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import Portfolio from "./components/Portfolio";
import Booking from "./components/Booking";
import Contact from "./components/Contact";
import Footer from "./components/Footer";

import AdminDashboard from "./pages/AdminDashboard";

import { Routes, Route, Navigate } from "react-router-dom";

function PublicSite() {
  // Shared WhatsApp data
  const whatsAppBusinessID = "525654814212";
  const whatsAppMessage = encodeURIComponent(
    "Hola, me gustaría agendar una cita de maquillaje/peinado. ¿Me puedes compartir tu disponibilidad?"
  );
  const whatsappLink = `https://wa.me/${whatsAppBusinessID}?text=${whatsAppMessage}`;

  return (
    <div className="site">
      <Navbar />
      <Hero whatsappLink={whatsappLink} />
      <Services />
      <Portfolio />
      <Booking whatsappLink={whatsappLink} />
      <Contact whatsappLink={whatsappLink} />
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<PublicSite />} />
      <Route path="/admin" element={<AdminDashboard />} />

      {/* optional: anything else goes home */}
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
