import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getDir } from "../utils/lang.js";

export default function LanguageHtmlSync() {
    const { i18n } = useTranslation();

    useEffect(() => {
        const lang = i18n.language?.startsWith("ar")
            ? "ar"
            : i18n.language?.startsWith("ms")
                ? "ms"
                : "en";

        const dir = getDir(lang);

        document.documentElement.lang = lang;
        document.documentElement.dir = dir;
    }, [i18n.language]);

    return null;
}
