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
        if (lang === "ar") {
            return [
                {
                    name: "Esraa Mady",
                    city: "Google Review",
                    rating: 5,
                    text: "مطعم رائع جدا شكرا لكم على حسن الضيافة خصوصا الغرفة العربية والطعام رااائع\nجزاكم الله كل خير",
                },
                {
                    name: "Arwa Mohammed",
                    city: "Google Review",
                    rating: 5,
                    text: "كل شئ مزبوط الاكل لذيذ والضيافة ممتازة شكرا",
                },
                {
                    name: "Ibrahim Obadi",
                    city: "Google Review",
                    rating: 5,
                    text: "مشاء الله مطعم نظيف وبنصح بالمشاااااااااوي\nوخاصه الغرفه العربيه 🥰🥰🥰🥰",
                },
                {
                    name: "Puteri Amira Qistina",
                    city: "Google Review",
                    rating: 5,
                    text: "خدمة جيدة جدًا وطعام لذيذ وأجواء مريحة!",
                },
                {
                    name: "ash moh",
                    city: "Google Review",
                    rating: 5,
                    text: "بصراحه الاكل جدا لا ينوصف من مذاق و ريحه\nوالخدمه جدا راقيه\nف انصح كل واحد يجرب لانو اذا ما جرب راح نص عمره 😍😍😍",
                },
                {
                    name: "Ali Ahmed",
                    city: "Google Review",
                    rating: 5,
                    text: "من افضل المطاعم والضيافه فيهه من راقيه\nشكرا خاص رضووان على الخدمه الاكثر من ممتازه",
                },
                {
                    name: "Fahad Omar",
                    city: "Google Review",
                    rating: 5,
                    text: "افضل مطعم واحلا اكل والخدمة رهيبة ، انصح فيه الكل",
                },
            ];
        }

        if (lang === "ms") {
            return [
                {
                    name: "Esraa Mady",
                    city: "Google Review",
                    rating: 5,
                    text: "Restoran yang sangat hebat—terima kasih atas layanan dan hospitaliti yang baik, terutamanya bilik Arab dan makanan yang sangat sedap. Semoga Allah membalas kebaikan anda.",
                },
                {
                    name: "Arwa Mohammed",
                    city: "Google Review",
                    rating: 5,
                    text: "Semuanya memang terbaik—makanan sedap dan hospitaliti ممتاز. Terima kasih.",
                },
                {
                    name: "Ibrahim Obadi",
                    city: "Google Review",
                    rating: 5,
                    text: "MasyaAllah, restoran sangat bersih. Saya sangat syorkan hidangan panggang—terutamanya bilik Arab 🥰🥰🥰🥰",
                },
                {
                    name: "Puteri Amira Qistina",
                    city: "Google Review",
                    rating: 5,
                    text: "Servis sangat baik, makanan sedap, dan suasana yang selesa!",
                },
                {
                    name: "ash moh",
                    city: "Google Review",
                    rating: 5,
                    text: "Sejujurnya, makanan memang tak dapat digambarkan—rasa dan bau sangat memukau, dan servis sangat classy. Saya nasihatkan semua orang cuba, kalau tak cuba macam rugi 😍😍😍",
                },
                {
                    name: "Ali Ahmed",
                    city: "Google Review",
                    rating: 5,
                    text: "Antara restoran terbaik dengan hospitaliti yang sangat classy. Terima kasih khas kepada Radwan atas servis yang lebih daripada ممتاز.",
                },
                {
                    name: "Fahad Omar",
                    city: "Google Review",
                    rating: 5,
                    text: "Restoran terbaik, makanan sedap, dan servis memang hebat. Saya syorkan kepada semua.",
                },
            ];
        }

        // en
        return [
            {
                name: "Esraa Mady",
                city: "Google Review",
                rating: 5,
                text: "A truly wonderful restaurant—thank you for the great hospitality, especially the Arabic room and the amazing food. May Allah reward you with خير.",
            },
            {
                name: "Arwa Mohammed",
                city: "Google Review",
                rating: 5,
                text: "Everything is spot on—delicious food and excellent hospitality. Thank you.",
            },
            {
                name: "Ibrahim Obadi",
                city: "Google Review",
                rating: 5,
                text: "Mashallah, a clean restaurant. I highly recommend the grills—especially the Arabic room 🥰🥰🥰🥰",
            },
            {
                name: "Puteri Amira Qistina",
                city: "Google Review",
                rating: 5,
                text: "Very good service, tasty food, and a comfortable atmosphere!",
            },
            {
                name: "ash moh",
                city: "Google Review",
                rating: 5,
                text: "Honestly, the food is indescribable—taste and aroma are amazing, and the service is very classy. I recommend everyone to try it, because if you don’t, you’ll miss out 😍😍😍",
            },
            {
                name: "Ali Ahmed",
                city: "Google Review",
                rating: 5,
                text: "One of the best restaurants, with very classy hospitality. Special thanks to Radwan for the more-than-excellent service.",
            },
            {
                name: "Fahad Omar",
                city: "Google Review",
                rating: 5,
                text: "Best restaurant, delicious food, and amazing service. I recommend it to everyone.",
            },
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

                    {/* <h2 className="mt-6 font-sukar text-3xl md:text-4xl">
                        {t("testimonials.headline")}
                    </h2>

                    <p className="mt-3 text-white/75">
                        {t("testimonials.text")}
                    </p> */}
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
