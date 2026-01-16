import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher.jsx";

function useScrolled(threshold = 12) {
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > threshold);
        onScroll();
        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [threshold]);

    return scrolled;
}

export default function Header() {
    const scrolled = useScrolled(12);
    const { t } = useTranslation();
    const navigate = useNavigate();

    const [mobileOpen, setMobileOpen] = useState(false);

    const cls = useMemo(() => {
        if (!scrolled) {
            return "bg-[#2a0e07]/55 backdrop-blur-glass ring-1 ring-white/5";
        }
        return "bg-white/10 backdrop-blur-glass shadow-glass ring-1 ring-white/10";
    }, [scrolled]);

    // Hover أجمل: underline ناعم + glow خفيف
    const navBtn =
        "relative text-sm text-white/85 transition hover:text-white " +
        "after:absolute after:-bottom-2 after:left-0 after:h-[2px] after:w-0 after:rounded-full " +
        "after:bg-arabica-aqua/70 after:transition-all after:duration-300 hover:after:w-full";

    const disabledBtn = `${navBtn} opacity-40 cursor-not-allowed pointer-events-none`;

    const go = (path) => {
        navigate(path);
        setMobileOpen(false); // أغلق منيو الموبايل بعد التنقل
    };

    return (
        <motion.header
            className={`fixed left-0 top-0 z-50 w-full transition-colors duration-300 ${cls}`}
            initial={{ y: -16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
        >
            <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3">
                {/* Logo -> Home */}
                <button
                    type="button"
                    onClick={() => go("/")}
                    className="group flex items-center gap-3 text-left"
                    aria-label="Go to home"
                >
                    <div className="rounded-2xl bg-black/25 ring-1 ring-white/10 backdrop-blur-sm p-2 shadow-glass">
                        <motion.img
                            src="/images/logo-arabica2.png"
                            alt="Arabica Logo"
                            className="h-20 w-auto object-contain opacity-95 group-hover:opacity-100 transition"
                            initial={{ opacity: 0, y: -6 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                        />
                    </div>
                </button>

                {/* Nav (Desktop) */}
                <nav className="hidden items-center gap-7 md:flex">
                    <button type="button" className={navBtn} onClick={() => go("/")}>
                        {t("nav.home")}
                    </button>

                    <button type="button" className={navBtn} onClick={() => go("/menu")}>
                        {t("nav.menu")}
                    </button>

                    <button type="button" className={navBtn} onClick={() => go("/promotions")}>
                        {t("nav.promotions")}
                    </button>

                    <button type="button" className={navBtn} onClick={() => go("/gallery")}>
                        {t("nav.gallery")}
                    </button>

                    <button type="button" className={navBtn} onClick={() => go("/contact")}>
                        {t("nav.contact")}
                    </button>
                </nav>

                <div className="flex items-center gap-3">
                    {/* Mobile menu button */}
                    <button
                        type="button"
                        className="md:hidden rounded-xl bg-white/10 px-3 py-2 text-white/90 ring-1 ring-white/10 backdrop-blur-sm hover:bg-white/15 transition"
                        onClick={() => setMobileOpen((v) => !v)}
                        aria-label="Toggle menu"
                        aria-expanded={mobileOpen}
                    >
                        ☰
                    </button>

                    <LanguageSwitcher />
                </div>
            </div>

            {/* Mobile dropdown */}
            {mobileOpen && (
                <div className="md:hidden px-4 pb-4">
                    <div className="rounded-2xl bg-black/25 ring-1 ring-white/10 backdrop-blur-glass p-3 shadow-glass flex flex-col gap-3">
                        <button type="button" className={navBtn} onClick={() => go("/")}>
                            {t("nav.home")}
                        </button>

                        <button type="button" className={navBtn} onClick={() => go("/menu")}>
                            {t("nav.menu")}
                        </button>

                        <button type="button" className={navBtn} onClick={() => go("/promotions")}>
                            {t("nav.promotions")}
                        </button>

                        <button type="button" className={navBtn} onClick={() => go("/gallery")}>
                            {t("nav.gallery")}
                        </button>

                        <button type="button" className={navBtn} onClick={() => go("/contact")}>
                            {t("nav.contact")}
                        </button>
                    </div>
                </div>
            )}
        </motion.header>
    );
}
