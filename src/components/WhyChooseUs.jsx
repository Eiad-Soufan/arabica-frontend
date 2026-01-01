import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

function Icon({ type }) {
    const common = "h-6 w-6";
    if (type === "chef") {
        return (
            <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
                <path
                    d="M6 10c-1.7 0-3-1.3-3-3 0-1.4.9-2.5 2.2-2.9C5.6 2.9 6.7 2 8 2c1.1 0 2 .6 2.5 1.5C11 2.6 12 2 13.2 2c1.4 0 2.6 1 2.9 2.4 1.1.4 1.9 1.5 1.9 2.8 0 1.7-1.3 3-3 3H6Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                />
                <path
                    d="M7 10v2.5c0 .8.7 1.5 1.5 1.5h7c.8 0 1.5-.7 1.5-1.5V10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                />
                <path
                    d="M9 14v8M15 14v8M7 22h10"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                />
            </svg>
        );
    }
    if (type === "sparkle") {
        return (
            <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
                <path
                    d="M12 2l1.2 5.2L18 8.5l-4.8 1.3L12 15l-1.2-5.2L6 8.5l4.8-1.3L12 2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                />
                <path
                    d="M19 13l.7 3 2.3.6-2.3.6-.7 3-.7-3-2.3-.6 2.3-.6.7-3Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                />
            </svg>
        );
    }
    if (type === "home") {
        return (
            <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
                <path
                    d="M3 11.5 12 4l9 7.5V21a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1V11.5Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinejoin="round"
                />
            </svg>
        );
    }
    // bolt
    return (
        <svg viewBox="0 0 24 24" className={common} fill="none" aria-hidden="true">
            <path
                d="M13 2 4 14h7l-1 8 10-14h-7l0-6Z"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinejoin="round"
            />
        </svg>
    );
}

function FeatureCard({ icon, title, text, index }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: index * 0.06 }}
            viewport={{ amount: 0.35, once: false }} // ✅ يعيد الانيميشن عند الرجوع
            className="group relative overflow-hidden rounded-2xl bg-white/8 p-6 ring-1 ring-white/12 backdrop-blur-glass"
        >
            {/* glow */}
            <div className="pointer-events-none absolute -right-16 -top-16 h-44 w-44 rounded-full bg-arabica-aqua/10 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            {/* icon badge */}
            <div className="flex items-start justify-between">
                <div className="grid h-12 w-12 place-items-center rounded-2xl bg-arabica-aqua/18 ring-1 ring-arabica-aqua/35 text-arabica-aqua">
                    <Icon type={icon} />
                </div>

                <div className="rounded-full bg-white/8 px-3 py-1 text-[11px] text-white/70 ring-1 ring-white/10">
                    Arabica
                </div>
            </div>

            <h3 className="mt-5 font-sukar text-xl leading-snug text-white">
                {title}
            </h3>

            <p className="mt-2 text-sm md:text-base leading-relaxed text-white/78">
                {text}
            </p>

            <div className="mt-6 h-px w-full bg-white/10" />
            <div className="mt-4 flex items-center justify-between">
                <span className="text-xs text-white/55">Quality Promise</span>
                <span className="h-2 w-2 rounded-full bg-arabica-aqua/80" />
            </div>
        </motion.div>
    );
}

export default function WhyChooseUs() {
    const { t } = useTranslation();
    const items = t("why.items", { returnObjects: true });

    // نربط كل عنصر بأيقونة (ثابتة)
    const icons = ["chef", "sparkle", "home", "bolt"];

    return (
        <section id="why" className="relative bg-arabica-deep py-20 overflow-hidden">
            <div className="mx-auto max-w-6xl px-4">
                <motion.div
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ amount: 0.45, once: false }}
                    className="max-w-3xl"
                >
                    <span className="inline-block rounded-full bg-white/10 px-4 py-2 text-sm text-white/80 ring-1 ring-white/15">
                        {t("why.title")}
                    </span>

                    <h2 className="mt-6 font-sukar text-3xl md:text-4xl">
                        {t("why.headline")}
                    </h2>

                    <p className="mt-3 text-white/75">
                        {t("why.text")}
                    </p>
                </motion.div>

                {/* ✅ 2x2 Grid */}
                <div className="mt-10 grid gap-6 md:grid-cols-2">
                    {Array.isArray(items) &&
                        items.slice(0, 4).map((it, idx) => (
                            <FeatureCard
                                key={idx}
                                icon={icons[idx] || "sparkle"}
                                title={it.title}
                                text={it.text}
                                index={idx}
                            />
                        ))}
                </div>
            </div>

            {/* background glow */}
            <div className="pointer-events-none absolute -left-24 bottom-0 h-72 w-72 rounded-full bg-arabica-aqua/10 blur-3xl" />


        </section>
    );
}
