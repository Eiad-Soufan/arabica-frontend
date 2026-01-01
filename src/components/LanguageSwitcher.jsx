import { useTranslation } from "react-i18next";
import { SUPPORTED_LANGS } from "../utils/lang.js";

const LABELS = {
    ar: "AR",
    en: "EN",
    ms: "MS",
};

export default function LanguageSwitcher() {
    const { i18n } = useTranslation();

    const current = i18n.language?.startsWith("ar")
        ? "ar"
        : i18n.language?.startsWith("ms")
            ? "ms"
            : "en";

    const setLang = async (lang) => {
        await i18n.changeLanguage(lang);
        // التخزين يتم تلقائيًا عبر LanguageDetector (arabica_lang)
    };

    return (
        <div className="flex items-center gap-2">
            {SUPPORTED_LANGS.map((lang) => {
                const active = lang === current;
                return (
                    <button
                        key={lang}
                        onClick={() => setLang(lang)}
                        className={`rounded-xl px-3 py-2 text-xs font-bold ring-1 transition ${active
                                ? "bg-arabica-aqua text-arabica-deep ring-arabica-aqua"
                                : "bg-white/10 text-white ring-white/15 hover:bg-white/15"
                            }`}
                        aria-label={`Switch language to ${lang}`}
                    >
                        {LABELS[lang]}
                    </button>
                );
            })}
        </div>
    );
}
