import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";

import QualityIcon from "../assets/Quality.png";
import AuthenticityIcon from "../assets/Authenticity.png";
import AmbienceIcon from "../assets/Ambience.png";

/**
 * 🔤 Local Translations (inside file)
 */
const CONTENT = {
  ar: [
    {
      icon: QualityIcon,
      title: "الجودة",
      text: "أطباق طازجة بأجود المكونات يوميًا",
    },
    {
      icon: AuthenticityIcon,
      title: "الأصالة",
      text: "نكهات عربية يمنية وسورية تقليدية",
    },
    {
      icon: AmbienceIcon,
      title: "الأجواء",
      text: "تجربة عائلية مريحة وخدمة ودودة",
    },
  ],
  en: [
    {
      icon: QualityIcon,
      title: "Quality",
      text: "Fresh dishes prepared daily with the finest ingredients",
    },
    {
      icon: AuthenticityIcon,
      title: "Authenticity",
      text: "Traditional Yemeni and Syrian Arabic flavors",
    },
    {
      icon: AmbienceIcon,
      title: "Ambience",
      text: "A cozy family-friendly experience with warm service",
    },
  ],
  ms: [
    {
      icon: QualityIcon,
      title: "Kualiti",
      text: "Hidangan segar setiap hari dengan bahan berkualiti tinggi",
    },
    {
      icon: AuthenticityIcon,
      title: "Keaslian",
      text: "Cita rasa Arab Yaman dan Syria yang tradisional",
    },
    {
      icon: AmbienceIcon,
      title: "Suasana",
      text: "Pengalaman kekeluargaan yang selesa dengan layanan mesra",
    },
  ],
};

function Feature({ icon, title, text, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, ease: "easeOut", delay: index * 0.08 }}
      viewport={{ once: false, amount: 0.35 }}
      className="flex flex-col items-center text-center rounded-2xl bg-white/8 p-8 ring-1 ring-white/12 backdrop-blur-glass"
    >
      {/* Icon */}
      <div className="mb-6 flex h-24 w-24 items-center justify-center rounded-2xl bg-arabica-aqua/15 ring-1 ring-arabica-aqua/30">
        <img
          src={icon}
          alt={title}
          className="h-14 w-14 object-contain"
          loading="lazy"
        />
      </div>

      {/* Title */}
      <h3 className="font-sukar text-xl text-white">
        {title}
      </h3>

      {/* Text */}
      <p className="mt-3 text-sm md:text-base text-white/75 leading-relaxed">
        {text}
      </p>
    </motion.div>
  );
}

export default function WhyChooseUs() {
  const { i18n } = useTranslation();
  const lang = i18n.language?.startsWith("ar")
    ? "ar"
    : i18n.language?.startsWith("ms")
    ? "ms"
    : "en";

  const items = CONTENT[lang];

  return (
    <section
      id="why"
      className="relative overflow-hidden bg-arabica-deep py-20"
    >
      <div className="mx-auto max-w-6xl px-4">

        {/* Grid */}
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
          {items.map((item, index) => (
            <Feature
              key={index}
              icon={item.icon}
              title={item.title}
              text={item.text}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Background glow */}
      <div className="pointer-events-none absolute -right-24 top-1/3 h-72 w-72 rounded-full bg-arabica-aqua/10 blur-3xl" />
    </section>
  );
}
