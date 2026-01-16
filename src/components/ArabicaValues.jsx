import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

const VALUES = [
    { src: "/images/values/arabica-value-quality.png", alt: "Quality is our hallmark" },
    { src: "/images/values/arabica-value-customer-first.png", alt: "Customer first" },
    { src: "/images/values/arabica-value-clean.png", alt: "Always clean environment" },
];

function ValueCard({ src, alt, i }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: "easeOut", delay: i * 0.06 }}
            viewport={{ amount: 0.35, once: false }}
            className="group relative overflow-hidden rounded-2xl bg-white/5 ring-1 ring-white/10 backdrop-blur-glass"
        >
            {/* Hover glow */}
            <div className="pointer-events-none absolute -right-20 -top-20 h-52 w-52 rounded-full bg-arabica-aqua/12 blur-3xl opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

            {/* Shimmer on hover */}
            <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <div className="absolute -left-1/2 top-0 h-full w-1/2 rotate-12 bg-gradient-to-r from-transparent via-white/18 to-transparent blur-sm animate-[shine_1.2s_linear_infinite]" />
            </div>

            <div className="p-6 md:p-7">
                <img
                    src={src}
                    alt={alt}
                    className="mx-auto h-[140px] w-auto object-contain md:h-[160px] drop-shadow-[0_14px_28px_rgba(0,0,0,0.25)] transition-transform duration-500 group-hover:scale-[1.02]"
                    draggable="false"
                />
            </div>
        </motion.div>
    );
}

export default function ArabicaValues() {
    const { t } = useTranslation();
    return (
        <section id="values" className="bg-arabica-deep py-20 overflow-hidden">
            <div className="mx-auto max-w-6xl px-4">
                <div className="mx-auto max-w-6xl px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 24 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        viewport={{ once: true }}
                        className="max-w-3xl"
                    >
                        <span className="inline-block rounded-full bg-white/10 px-4 py-2 text-sm text-white/80 ring-1 ring-white/15">
                            {t("values.title")}
                        </span>

                        {/* <h2 className="mt-6 font-sukar text-3xl leading-tight md:text-4xl">
                            {t("values.headline")}
                        </h2>

                        <p className="mt-5 text-base leading-relaxed text-white/80 md:text-lg">
                            {t("values.text")}
                        </p> */}
                    </motion.div>
                </div>

                <div className="mt-10 grid gap-6 md:grid-cols-3">
                    {VALUES.map((v, i) => (
                        <ValueCard key={v.src} src={v.src} alt={v.alt} i={i} />
                    ))}
                </div>


            </div>


        </section>

    );
}
