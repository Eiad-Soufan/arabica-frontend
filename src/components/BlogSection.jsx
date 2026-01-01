import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

import chefImg from "../assets/blog/chef.jpg";
import dallahImg from "../assets/blog/dallah.jpg";
import spicesImg from "../assets/blog/spices.jpg";

const fadeUp = {
    hidden: { opacity: 0, y: 18 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.21, 0.61, 0.35, 1] } },
};

function BlogModal({ open, onClose, item, dir = "ltr" }) {
    useEffect(() => {
        if (!open) return;
        const prev = document.body.style.overflow;
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = prev;
        };
    }, [open]);

    useEffect(() => {
        if (!open) return;
        const onKey = (e) => e.key === "Escape" && onClose();
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    return (
        <AnimatePresence>
            {open && item ? (
                <motion.div
                    className="fixed inset-0 z-[80] flex items-center justify-center px-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    dir={dir}
                >
                    {/* backdrop */}
                    <button
                        aria-label="Close"
                        onClick={onClose}
                        className="absolute inset-0 bg-black/50 backdrop-blur-md"
                    />

                    {/* modal */}
                    <motion.div
                        role="dialog"
                        aria-modal="true"
                        className="relative w-full max-w-4xl h-[82vh] max-h-[720px] overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-2xl backdrop-blur-xl"

                        initial={{ opacity: 0, y: 22, scale: 0.98 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 18, scale: 0.98 }}
                        transition={{ duration: 0.35, ease: [0.21, 0.61, 0.35, 1] }}
                    >
                        {/* close */}
                        <button
                            onClick={onClose}
                            className="absolute top-4 z-10 rounded-full border border-white/15 bg-black/30 px-3 py-1 text-sm text-white/90 hover:bg-black/40"
                        >
                            ✕
                        </button>

                        <div className="grid h-full md:grid-cols-2">

                            <div className="relative h-full overflow-hidden">

                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="absolute inset-0 h-full w-full object-cover"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/10 to-transparent" />
                            </div>


                            <div
                                className={`p-6 md:p-8 overflow-y-auto ${dir === "rtl" ? "text-right" : "text-left"}`}
                            >


                                <p className="text-xs tracking-wide text-white/60">
                                    {item.kicker}
                                </p>
                                <h3 className="mt-2 text-2xl font-semibold text-white">
                                    {item.title}
                                </h3>
                                <p className="mt-4 leading-relaxed text-white/80">
                                    {item.body}
                                </p>

                                <div className="mt-6 flex flex-wrap gap-2">
                                    {item.tags?.map((t) => (
                                        <span
                                            key={t}
                                            className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </motion.div>
            ) : null}
        </AnimatePresence>
    );
}

export default function BlogSection() {
    const [active, setActive] = useState(null);
    const { i18n } = useTranslation();

    const lang = i18n.language?.startsWith("ar")
        ? "ar"
        : i18n.language?.startsWith("ms")
            ? "ms"
            : "en";

    const dir = lang === "ar" ? "rtl" : "ltr";

    // t: دالتك للترجمة (حسب نظامك الحالي). إذا ما عندك t، استخدم النصوص مباشرة.
    const items = useMemo(() => {
        // نصوص ممتازة (AR/EN/MS) — عدّلها براحتك
        const copy = {
            ar: {
                title: "قصص أرابيكا",
                subtitle: "لمحات قصيرة من وراء الكواليس… نكهة، ضيافة، وحكايات من مطبخنا.",
                cards: [
                    {
                        kicker: "المكوّنات",
                        title: "سرّ النكهة يبدأ من التتبيلة",
                        body:
                            "نختار توابلنا بعناية ونوازنها بهدوء—حتى تظل النكهة عربية أصيلة، لكن بأسلوب عصري يليق بالمكان.",
                        tags: ["توابل", "تتبيلة", "تفاصيل"],
                    },
                    {
                        kicker: "المطبخ",
                        title: "لمسة الشيف… قبل أن يصل الطبق لطاولتك",
                        body:
                            "كل طبق يمرّ بمرحلة “تشطيب” دقيقة: ترتيب، صوص، لمعة أخيرة—لأن التجربة عندنا تُؤكل وتُرى.",
                        tags: ["Fine Dining", "Plating", "حِرفة"],
                    },
                    {
                        kicker: "الضيافة",
                        title: "دلة القهوة… رمز الترحيب",
                        body:
                            "القهوة العربية ليست مشروبًا فقط—هي إشارة احترام وبداية جلسة جميلة. نحب أن تشعر أنك في بيتك.",
                        tags: ["قهوة", "ضيافة", "دفء"],
                    },
                ],
            },
            en: {
                title: "Arabica Journal",
                subtitle: "Short behind-the-scenes notes—flavor, hospitality, and stories from our kitchen.",
                cards: [
                    {
                        kicker: "Ingredients",
                        title: "Flavor starts with the spice balance",
                        body:
                            "We select and blend spices with intention—keeping the soul of Arabic flavor, refined with a modern touch.",
                        tags: ["Spices", "Balance", "Details"],
                    },
                    {
                        kicker: "Kitchen",
                        title: "The chef’s final touch",
                        body:
                            "Every plate gets a precise finish—placement, sauce, and a final shine—because experience is both taste and sight.",
                        tags: ["Fine Dining", "Plating", "Craft"],
                    },
                    {
                        kicker: "Hospitality",
                        title: "The dallah: a welcome in itself",
                        body:
                            "Arabic coffee is more than a drink—it’s warmth and respect. We want you to feel at home from the first sip.",
                        tags: ["Coffee", "Hospitality", "Warmth"],
                    },
                ],
            },
            ms: {
                title: "Catatan Arabica",
                subtitle: "Kisah ringkas di sebalik tabir—rasa, layanan, dan cerita dari dapur kami.",
                cards: [
                    {
                        kicker: "Bahan",
                        title: "Rahsia rasa bermula pada keseimbangan rempah",
                        body:
                            "Kami memilih dan mencampur rempah dengan teliti—mengekalkan jiwa rasa Arab, dengan sentuhan moden yang halus.",
                        tags: ["Rempah", "Seimbang", "Butiran"],
                    },
                    {
                        kicker: "Dapur",
                        title: "Sentuhan akhir chef",
                        body:
                            "Setiap hidangan disiapkan dengan kemas—susunan, sos, dan kemasan terakhir—kerana pengalaman itu rasa dan rupa.",
                        tags: ["Fine Dining", "Plating", "Kraf"],
                    },
                    {
                        kicker: "Layanan",
                        title: "Dallah: simbol sambutan",
                        body:
                            "Kopi Arab bukan sekadar minuman—ia lambang mesra dan hormat. Kami mahu anda rasa seperti di rumah.",
                        tags: ["Kopi", "Hospitaliti", "Mesra"],
                    },
                ],
            },
        };

        const c = copy[lang] || copy.ar;

        return [
            { ...c.cards[0], image: spicesImg },
            { ...c.cards[1], image: chefImg },
            { ...c.cards[2], image: dallahImg },
        ].map((x, idx) => ({ ...x, id: idx }));
    }, [lang]);
    const { t } = useTranslation();


    return (
        <section className="relative py-20" dir={dir}>
            <div className="mx-auto w-full max-w-6xl px-4">
                <div className="mx-auto max-w-6xl px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="max-w-3xl"
                    >
                        <span className="inline-block rounded-full bg-white/10 px-4 py-2 text-sm text-white/80 ring-1 ring-white/15">
                            {t("stories.title")}
                        </span>

                        <h2 className="mt-6 font-sukar text-3xl leading-tight md:text-4xl">
                            {t("stories.headline")}
                        </h2>

                        <p className="mt-5 text-base leading-relaxed text-white/80 md:text-lg">
                            {t("stories.text")}
                        </p>
                    </motion.div>
                </div>

                <div className="mt-10 grid gap-6 md:grid-cols-3 auto-rows-fr" dir={dir}>

                    {items.map((item) => (
                        <motion.button
                            key={item.id}
                            type="button"
                            onClick={() => setActive(item)}
                            className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-xl backdrop-blur-md ${dir === "rtl" ? "text-right" : "text-left"
                                }`}


                            initial={{ opacity: 0, y: 18 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: false, amount: 0.25 }}
                            transition={{ duration: 0.55, ease: [0.21, 0.61, 0.35, 1] }}
                        >
                            <div className="relative h-56 w-full overflow-hidden">
                                <img
                                    src={item.image}
                                    alt={item.title}
                                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
                                    loading="lazy"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />


                                {/* shimmer on hover */}
                                <div className="pointer-events-none absolute -inset-20 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                                    <div className="absolute left-0 top-0 h-full w-1/2 -skew-x-12 bg-white/10 blur-2xl translate-x-[-120%] group-hover:translate-x-[260%] transition-transform duration-1000" />
                                </div>
                            </div>

                            <div className="p-6 flex flex-col flex-1">
                                <p className="text-xs text-white/60">{item.kicker}</p>

                                <h3 className="mt-2 text-lg font-semibold text-white">
                                    {item.title}
                                </h3>

                                <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-white/75 flex-1">
                                    {item.body}
                                </p>

                                <div className="mt-5 flex items-center justify-between">
                                    <span className="text-sm text-white/70">
                                        {lang === "ar" ? "اقرأ المزيد" : lang === "ms" ? "Baca lagi" : "Read more"}
                                    </span>
                                    <span className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/70">
                                        ⟶
                                    </span>
                                </div>
                            </div>

                        </motion.button>
                    ))}
                </div>
            </div>
            <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent" />

            <BlogModal
                open={!!active}
                item={active}
                onClose={() => setActive(null)}
                dir={dir}
            />
        </section>
    );
}
