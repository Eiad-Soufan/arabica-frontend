import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { api } from "../api/client.js";

// fallback ثابت (لو ما صار fetch أو ما بدك تربطي حاليا)
const FALLBACK_IMAGES = [
    "https://images.unsplash.com/photo-1646551479178-0c55c940a6b9?fm=jpg&ixlib=rb-4.1.0&q=80&w=2000",
    "https://images.unsplash.com/photo-1603360946369-dc9bb6258143?fm=jpg&ixlib=rb-4.1.0&q=80&w=2000",
    "https://images.unsplash.com/photo-1695593217066-1e663f8524db?fm=jpg&ixlib=rb-4.1.0&q=80&w=2000",
];

function useInterval(callback, delay) {
    useEffect(() => {
        if (delay == null) return;
        const id = setInterval(callback, delay);
        return () => clearInterval(id);
    }, [callback, delay]);
}

export default function Hero() {
    const [images, setImages] = useState(FALLBACK_IMAGES);
    const [active, setActive] = useState(0);
    const { t } = useTranslation();
    const navigate = useNavigate();

    // جاهز للربط مع API بدون ما “تجربي” شيء: إذا رد، يستخدمه، إذا لا يبقى fallback
    useEffect(() => {
        let mounted = true;
        api
            .get("/hero-images/")
            .then((res) => {
                const urls = Array.isArray(res?.data)
                    ? res.data.map((x) => x?.image_url).filter(Boolean)
                    : [];
                if (mounted && urls.length >= 3) setImages(urls.slice(0, 3));
            })
            .catch(() => { });
        return () => {
            mounted = false;
        };
    }, []);

    const current = images[active % images.length];

    useInterval(() => {
        setActive((p) => (p + 1) % images.length);
    }, 5500);

    const overlayStyle = useMemo(
        () => ({
            background:
                "linear-gradient(115deg, rgba(77,31,3,0.78) 0%, rgba(42,12,6,0.72) 55%, rgba(79,186,179,0.18) 100%)",
        }),
        []
    );

    return (
        <section className="relative h-[92vh] min-h-[640px] w-full overflow-hidden">
            {/* صور الخلفية */}

            <AnimatePresence mode="wait">

                <motion.div
                    key={current}
                    className="absolute inset-0"
                    initial={{ opacity: 0, scale: 1.02 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.01 }}
                    transition={{ duration: 1.15, ease: "easeInOut" }}
                    style={{
                        backgroundImage: `url("${current}")`,
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                    }}
                />
            </AnimatePresence>

            {/* طبقة الهوية الشفافة */}
            <div className="absolute inset-0" style={overlayStyle} />

            {/* ضباب/Glow خفيف */}
            <div className="absolute -left-24 top-24 h-64 w-64 rounded-full bg-arabica-aqua/20 blur-3xl" />
            <div className="absolute -right-24 bottom-24 h-72 w-72 rounded-full bg-white/10 blur-3xl" />

            {/* المحتوى */}
            <div className="relative z-10 flex h-full items-center pt-16">
                <div className="mx-auto w-full max-w-6xl px-4">
                    <motion.div
                        className="max-w-2xl"
                        initial={{ opacity: 0, y: 18 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.9, ease: "easeOut" }}
                    >


                        <h1 className="mt-5 font-sukar text-4xl md:text-6xl text-white drop-shadow-[0_10px_30px_rgba(0,0,0,0.65)]">

                            <div className="inline-block rounded-3xl bg-black/35 backdrop-blur-md ring-1 ring-white/10 px-6 py-5">
                                <span className="text-arabica-aqua">{t("hero.title")}</span>
                            </div>
                        </h1>

                        <p className="mt-4 text-base text-white/85 md:text-lg">
                            {t("hero.description")}
                        </p>

                        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                            <button
                                onClick={() => navigate("/menu")}
                                className="rounded-2xl bg-arabica-aqua px-6 py-3 font-bold text-arabica-deep shadow-glass hover:opacity-95"
                            >
                                {t("hero.cta1")}
                            </button>

                            <button onClick={() => navigate("/promotions")} className="rounded-2xl bg-white/10 px-6 py-3 font-semibold text-white ring-1 ring-white/20 hover:bg-white/15">
                                {t("hero.cta2")}
                            </button>
                        </div>

                        {/* مؤشرات الصور */}
                        <div className="mt-10 flex items-center gap-2">
                            {images.slice(0, 3).map((_, i) => {
                                const on = i === (active % images.length);
                                return (
                                    <button
                                        key={i}
                                        onClick={() => setActive(i)}
                                        className={`h-2.5 rounded-full transition-all ${on ? "w-10 bg-arabica-aqua" : "w-2.5 bg-white/35 hover:bg-white/55"
                                            }`}
                                        aria-label={`Go to slide ${i + 1}`}
                                    />
                                );
                            })}
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* فاصل سفلي */}
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-arabica-deep to-transparent" />
        </section>
    );
}
