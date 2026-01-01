import { motion } from "framer-motion";
import { useMemo } from "react";
import { useTranslation } from "react-i18next";

function Stars({ count = 5 }) {
    return (
        <div className="flex items-center gap-1">
            {Array.from({ length: count }).map((_, i) => (
                <span key={i} className="text-arabica-aqua/90">★</span>
            ))}
        </div>
    );
}

function Card({ name, city, text, rating }) {
    return (
        <div className="w-[320px] md:w-[360px] shrink-0 rounded-2xl bg-white/10 p-6 ring-1 ring-white/15 backdrop-blur-glass shadow-glass">
            <Stars count={rating} />
            <p className="mt-4 text-sm md:text-base text-white/85 leading-relaxed">
                “{text}”
            </p>

            <div className="mt-6 flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-arabica-aqua/20 ring-1 ring-arabica-aqua/30" />
                <div className="leading-tight">
                    <div className="font-semibold text-white">{name}</div>
                    <div className="text-xs text-white/60">{city}</div>
                </div>
            </div>
        </div>
    );
}

export default function Testimonials() {
    const { t, i18n } = useTranslation();

    const lang = i18n.language?.startsWith("ar")
        ? "ar"
        : i18n.language?.startsWith("ms")
            ? "ms"
            : "en";

    const items = useMemo(() => {
        // بيانات ديمو مترجمة (بدون API حالياً)
        if (lang === "ar") {
            return [
                { name: "سارة", city: "كوالالمبور", rating: 5, text: "الطعم رائع والخدمة سريعة جدًا. رجعت مرتين بنفس الأسبوع!" },
                { name: "أحمد", city: "سوبانغ", rating: 5, text: "أجواء راقية ونظافة ممتازة. المشاوي عندهم من الأفضل." },
                { name: "ليلى", city: "بوتراجايا", rating: 5, text: "المنيو متنوع والحلويات ولا أطيب. الكنافة 🔥" },
                { name: "محمد", city: "شاه علم", rating: 5, text: "الشاورما خرافية والصلصات متوازنة. تجربة تستاهل." },
                { name: "نور", city: "أمبانغ", rating: 5, text: "كل شي مرتب… من الاستقبال للتقديم. أكيد بوصي أصحابي." },
                { name: "ريم", city: "دامنسارا", rating: 5, text: "أفضل مكان للّمة! جو مريح وطعام يشهي." },
            ];
        }
        if (lang === "ms") {
            return [
                { name: "Aina", city: "Kuala Lumpur", rating: 5, text: "Rasa memang sedap dan servis sangat pantas. Pasti datang lagi!" },
                { name: "Haziq", city: "Subang", rating: 5, text: "Suasana elegan dan bersih. Grill mereka antara yang terbaik." },
                { name: "Farah", city: "Putrajaya", rating: 5, text: "Menu pelbagai dan pencuci mulut terbaik. Kunafa memang padu!" },
                { name: "Amir", city: "Shah Alam", rating: 5, text: "Shawarma sangat berbaloi. Sos seimbang dan tidak muak." },
                { name: "Nadia", city: "Ampang", rating: 5, text: "Semuanya kemas — dari sambutan hingga hidangan. Sangat disyorkan." },
                { name: "Zara", city: "Damansara", rating: 5, text: "Tempat terbaik untuk berkumpul. Suasana selesa dan makanan menyelerakan." },
            ];
        }
        return [
            { name: "Sarah", city: "Kuala Lumpur", rating: 5, text: "Incredible flavor and super fast service. Came back twice this week!" },
            { name: "Ahmed", city: "Subang", rating: 5, text: "Refined ambiance and spotless. Their grills are among the best." },
            { name: "Laila", city: "Putrajaya", rating: 5, text: "Great variety and desserts are amazing. The kunafa is a must!" },
            { name: "Mohammed", city: "Shah Alam", rating: 5, text: "Shawarma is outstanding and sauces are perfectly balanced." },
            { name: "Noor", city: "Ampang", rating: 5, text: "Everything is well organized — from welcome to plating. Highly recommended." },
            { name: "Reem", city: "Damansara", rating: 5, text: "Perfect spot for gatherings — cozy vibe and delicious food." },
        ];
    }, [lang]);

    // نكرر القائمة مرتين حتى يصير شريط لا نهائي (translateX -50%)
    const track = [...items, ...items];

    return (
        <section className="relative py-20 bg-arabica-deep overflow-hidden" id="testimonials">
            <div className="mx-auto max-w-6xl px-4">
                <motion.div
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="max-w-3xl"
                >
                    <span className="inline-block rounded-full bg-white/10 px-4 py-2 text-sm text-white/80 ring-1 ring-white/15">
                        {t("testimonials.title")}
                    </span>

                    <h2 className="mt-6 font-sukar text-3xl md:text-4xl">
                        {t("testimonials.headline")}
                    </h2>

                    <p className="mt-3 text-white/75">
                        {t("testimonials.text")}
                    </p>
                </motion.div>
            </div>

            <div className="mt-10">
                <div className="mx-auto max-w-6xl px-4 overflow-hidden relative">
                    <div className="pointer-events-none absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-arabica-deep to-transparent" />
                    <div className="pointer-events-none absolute inset-y-0 right-0 w-16 bg-gradient-to-l from-arabica-deep to-transparent" />

                    <div
                        className="arabica-marquee flex w-max gap-5"
                        style={{
                            animation: `${lang === "ar" ? "arabica-marquee-rtl" : "arabica-marquee-ltr"} 28s linear infinite`,
                        }}

                    >
                        {track.map((it, idx) => (
                            <Card key={`${it.name}-${idx}`} {...it} />
                        ))}
                    </div>
                </div>
            </div>

        </section>
    );
}
