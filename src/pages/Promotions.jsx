import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { fetchPromotions } from "../api/promotions";
import Footer from "../components/Footer";
import Header from "../components/Header";

export default function Promotions() {
    const { t } = useTranslation();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            try {
                const data = await fetchPromotions();
                setItems(Array.isArray(data) ? data : []);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    return (
        <div className="min-h-screen">
            <Header />

            <main className="mx-auto max-w-6xl px-4 pt-28 pb-16">
                <section className="relative overflow-hidden">
                    <div className="absolute inset-0 opacity-70 bg-gradient-to-b from-arabica-aqua/10 via-transparent to-transparent" />
                    <div className="mx-auto max-w-6xl px-4 py-10">
                        <motion.div
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.55 }}
                        >

                            <h1 className="mt-4 font-sukar text-3xl sm:text-4xl md:text-5xl">
                                {/* <span className="text-arabica-aqua">{t("contact.title")}</span> */}{t("promotions.title")}
                            </h1>

                            {/* <p className="mt-3 max-w-2xl text-white/80">{t("menu.subtitle")}</p> */}
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.05 }}
                            className="mt-2 opacity-80"
                        >
                            {t("promotions.subtitle")}
                        </motion.p>
                    </div>
                </section>

                <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
                    {loading &&
                        Array.from({ length: 6 }).map((_, i) => (
                            <div
                                key={i}
                                className="h-56 rounded-2xl bg-white/5 border border-white/10 animate-pulse"
                            />
                        ))}

                    {!loading && items.length === 0 && (
                        <div className="mt-10 opacity-80">{t("promotions.empty")}</div>
                    )}

                    {items.map((p, idx) => (
                        <motion.a
                            key={p.id}
                            href={p.link || "#"}
                            target={p.link ? "_blank" : undefined}
                            rel={p.link ? "noreferrer" : undefined}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.05 * Math.min(idx, 8) }}
                            whileHover={{ y: -4 }}
                            className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md"
                        >
                            <div className="relative h-56">
                                <img
                                    src={p.image_url}
                                    alt="promotion"
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-black/10" />
                            </div>

                            <div className="p-4 flex items-center justify-between">
                                <div className="text-sm opacity-80">
                                    {p.link ? t("promotions.cta") : t("promotions.view")}
                                </div>
                                <div className="text-lg opacity-80 group-hover:opacity-100 transition">
                                    →
                                </div>
                            </div>
                        </motion.a>
                    ))}
                </div>
            </main>

            <Footer />
        </div>
    );
}
