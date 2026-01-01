import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

export default function AboutSection() {
    const { t } = useTranslation();

    return (
        <section
            id="about"
            className="relative bg-arabica-deep py-20"
        >
            <div className="mx-auto max-w-6xl px-4">
                <motion.div
                    initial={{ opacity: 0, y: 24 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    viewport={{ once: true }}
                    className="w-full md:max-w-5xl"

                >
                    <span className="inline-block rounded-full bg-white/10 px-4 py-2 text-sm text-white/80 ring-1 ring-white/15">
                        {t("about.title")}
                    </span>

                    <h2 className="mt-6 font-sukar text-3xl leading-tight md:text-4xl">
                        {t("about.headline")}
                    </h2>

                    <p className="mt-5 text-base leading-relaxed text-white/80 md:text-lg">
                        {t("about.text")}
                    </p>
                </motion.div>
            </div>

            {/* فاصل بصري خفيف */}
            {/* <div className="pointer-events-none absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-black/40 to-transparent" /> */}
        </section>
    );
}
