import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";

export default function Footer() {
    const { t } = useTranslation();
    const navigate = useNavigate();

    const linkCls =
        "text-sm text-white/75 hover:text-white transition";

    const chipCls =
        "inline-flex items-center gap-2 rounded-xl bg-white/10 px-3 py-2 text-sm ring-1 ring-white/15 hover:bg-white/15 transition";

    return (
        <footer className="relative border-t border-white/10 bg-arabica-deep overflow-hidden">
            {/* subtle background glow */}
            <div className="pointer-events-none absolute -top-28 left-1/2 h-64 w-[520px] -translate-x-1/2 rounded-full bg-arabica-aqua/10 blur-3xl" />
            <div className="pointer-events-none absolute inset-0 opacity-60 bg-gradient-to-b from-white/0 via-white/0 to-black/20" />

            <div className="relative mx-auto max-w-6xl px-4 py-12">
                <div className="grid gap-10 md:grid-cols-3">
                    {/* Brand */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45 }}
                    >
                        <div className="flex items-center gap-3">
                            <img
                                src="/images/logo-arabica.png"
                                alt="Arabica Logo"
                                className="h-11 w-auto object-contain"
                            />


                            <div className="leading-tight">
                                <div className="font-sukar text-lg tracking-wide">ARABICA</div>
                                <div className="text-xs text-white/70">{t("footer.tagline")}</div>
                            </div>
                        </div>

                        <p className="mt-4 max-w-sm text-sm text-white/75 leading-relaxed">
                            {t("footer.description")}
                        </p>

                        {/* mini badges */}
                        <div className="mt-5 flex flex-wrap gap-2">
                            <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/75 ring-1 ring-white/10">
                                {t("footer.badge1")}
                            </span>
                            <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/75 ring-1 ring-white/10">
                                {t("footer.badge2")}
                            </span>
                            <span className="rounded-full bg-white/10 px-3 py-1 text-xs text-white/75 ring-1 ring-white/10">
                                {t("footer.badge3")}
                            </span>
                        </div>
                    </motion.div>

                    {/* Links */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, delay: 0.05 }}
                    >
                        <h4 className="font-sukar text-lg">{t("footer.quickLinks")}</h4>

                        <ul className="mt-4 space-y-2">
                            <li>
                                <button className={linkCls} onClick={() => navigate("/menu")}>
                                    {t("nav.menu")}
                                </button>
                            </li>
                            <li>
                                <button className={linkCls} onClick={() => navigate("/promotions")}>
                                    {t("nav.promotions")}
                                </button>
                            </li>
                            <li>
                                <button className={linkCls} onClick={() => navigate("/gallery")}>
                                    {t("nav.gallery")}
                                </button>
                            </li>
                            <li>
                                <button className={linkCls} onClick={() => navigate("/contact")}>
                                    {t("nav.contact")}
                                </button>
                            </li>
                        </ul>


                    </motion.div>

                    {/* Contact */}
                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.45, delay: 0.1 }}
                    >
                        <h4 className="font-sukar text-lg">{t("footer.contact")}</h4>

                        <div className="mt-4 space-y-2 text-sm text-white/75">
                            <div>
                                <span className="text-white/60">{t("footer.location")}:</span>{" "}
                                <span>{t("footer.locationValue")}</span>
                            </div>
                            <div>
                                <span className="text-white/60">{t("footer.hours")}:</span>{" "}
                                <span>{t("footer.hoursValue")}</span>
                            </div>
                            <div className="flex flex-wrap gap-x-2 gap-y-1">
                                <span className="text-white/60">{t("footer.email")}:</span>
                                <a className="hover:text-white transition" href="mailto:arabicadamnsara@gmail.com">
                                    arabicadamnsara@gmail.com
                                </a>
                            </div>
                        </div>

                        <div className="mt-6 flex flex-wrap items-center gap-3">
                            <a className={chipCls} href="https://www.instagram.com/arabicamy?igsh=MXB6ZHJ3enI1NGJpNQ%3D%3D&utm_source=qr" aria-label="Instagram">
                                Instagram
                            </a>
                            <a className={chipCls} href="https://www.tiktok.com/@arabicarestaurant?_r=1&_t=ZS-92b9CZ2hLeR" aria-label="TikTok">
                                TikTok
                            </a>
                            <a className={chipCls} href="https://www.facebook.com/share/17oQF4dybw/?mibextid=wwXIfr" aria-label="TikTok">
                                Facebook
                            </a>
                        </div>

                    </motion.div>
                </div>

                {/* Bottom bar */}
                <div className="mt-10 border-t border-white/10 pt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <div className="text-xs text-white/60">
                        © {new Date().getFullYear()} Arabica. {t("footer.rights")}
                    </div>

                    <div className="flex items-center gap-4 text-xs text-white/60">

                    </div>
                </div>
            </div>
        </footer>
    );
}
