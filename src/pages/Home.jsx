import AboutSection from "../components/AboutSection.jsx";
import ArabicaValues from "../components/ArabicaValues.jsx";
import BlogSection from "../components/BlogSection";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";
import Hero from "../components/Hero.jsx";
import Testimonials from "../components/Testimonials.jsx";
import WhyChooseUs from "../components/WhyChooseUs.jsx";



export default function Home() {
    return (
        <div className="min-h-screen bg-arabica-deep text-white">
            <Header />

            <main>
                <Hero />
                <AboutSection />
                <Testimonials />
                <WhyChooseUs />
                <ArabicaValues />
                <BlogSection />
            </main>

            <Footer />
        </div>
    );
}
