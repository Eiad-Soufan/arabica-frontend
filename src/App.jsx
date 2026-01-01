import { Navigate, Route, Routes } from "react-router-dom";
import LanguageHtmlSync from "./components/LanguageHtmlSync.jsx";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import Home from "./pages/Home.jsx";
import Menu from "./pages/Menu";
import Promotions from "./pages/Promotions";
import ScrollToTop from "./ScrollToTop.jsx"; // 👈 جديد

export default function App() {
  return (
    <>
      <LanguageHtmlSync />
      <ScrollToTop /> {/* 👈 هنا */}
      <Routes>
        <Route path="/promotions" element={<Promotions />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/contact" element={<Contact />} />

        <Route path="/" element={<Home />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}
