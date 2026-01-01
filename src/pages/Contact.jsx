import { motion } from "framer-motion";
import { useTranslation } from "react-i18next";
import Footer from "../components/Footer";
import Header from "../components/Header";

const LTR = ({ children, className = "" }) => (
    <span dir="ltr" className={`inline-block text-left ${className}`}>
        {children}
    </span>
);

export default function Contact() {
    const { t } = useTranslation();

    const social = [
        { name: "Facebook", href: "https://www.facebook.com/share/17oQF4dybw/?mibextid=wwXIfr" },
        { name: "Instagram", href: "https://www.instagram.com/arabicamy?igsh=MXB6ZHJ3enI1NGJpNQ%3D%3D&utm_source=qr" },
        { name: "TikTok", href: "https://www.tiktok.com/@arabicarestaurant?_r=1&_t=ZS-92b9CZ2hLeR" },
    ];

    const email = "arabicadamnsara@gmail.com";

    // خليه كما هو بدون مسافات داخل الرقم النهائي (العرض بس يكون LTR)
    const managementPhone = "01111112008";
    const restaurantPhone = "01160772422"; // من "0 1160772422" مع إزالة المسافة

    return (
        <div className="min-h-screen">
            <Header />

            <main className="mx-auto max-w-6xl px-4 pt-28 pb-16">
                <section className="relative overflow-hidden">
                    <div className="absolute inset-0 opacity-70 bg-gradient-to-b from-arabica-aqua/10 via-transparent to-transparent" />
                    <div className="mx-auto max-w-6xl px-4 py-10">
                        <motion.div
                            initial={{ opacity: 0, y: 14 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.55 }}
                        >

                            <h1 className="mt-4 font-sukar text-3xl sm:text-4xl md:text-5xl">
                                {/* <span className="text-arabica-aqua">{t("contact.title")}</span> */}{t("contact.title")}
                            </h1>

                            {/* <p className="mt-3 max-w-2xl text-white/80">{t("menu.subtitle")}</p> */}
                        </motion.div>

                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.05 }}
                            className="mt-2 opacity-80"
                        >
                            {t("contact.subtitle")}
                        </motion.p>
                    </div>
                </section>



                <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-5">
                    {/* Social */}
                    <motion.section
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.05 }}
                        className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-5"
                    >
                        <h2 className="text-xl font-semibold">{t("contact.social")}</h2>

                        <div className="mt-4 space-y-3">
                            {social.map((s) => (
                                <a
                                    key={s.name}
                                    href={s.href}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 hover:bg-white/10 transition"
                                >
                                    <span className="font-medium">{s.name}</span>
                                    <span className="opacity-80">→</span>
                                </a>
                            ))}
                        </div>
                    </motion.section>

                    {/* Working hours */}
                    <motion.section
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.08 }}
                        className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-5"
                    >
                        <h2 className="text-xl font-semibold">{t("contact.hours")}</h2>

                        <div className="mt-4 space-y-2 opacity-90">
                            <div className="flex items-center justify-between gap-3">
                                <span>{t("contact.everyday")}</span>
                                <span className="opacity-80">{t("contact.open")}</span>
                            </div>

                            <div className="flex items-center justify-between gap-3">
                                <span>{t("contact.fromTo")}</span>
                                <LTR className="font-medium">10:00 AM – 2:00 AM</LTR>
                            </div>

                            <div className="mt-3 rounded-xl border border-white/10 bg-white/5 p-4">
                                <div className="text-sm opacity-80">{t("contact.lastOrder")}</div>
                                <div className="mt-1">
                                    <LTR className="text-lg font-semibold">1:30 AM</LTR>
                                </div>
                            </div>
                        </div>
                    </motion.section>

                    {/* Email & phones */}
                    <motion.section
                        initial={{ opacity: 0, y: 14 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.11 }}
                        className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md p-5"
                    >
                        <h2 className="text-xl font-semibold">{t("contact.reachUs")}</h2>

                        <div className="mt-4 space-y-3">
                            <a
                                href={`mailto:${email}`}
                                className="block rounded-xl border border-white/10 bg-white/5 px-4 py-3 hover:bg-white/10 transition"
                            >
                                <div className="text-sm opacity-80">{t("contact.email")}</div>
                                <div className="mt-1 font-medium">
                                    <LTR>{email}</LTR>
                                </div>
                            </a>

                            <a
                                href={`tel:${managementPhone}`}
                                className="block rounded-xl border border-white/10 bg-white/5 px-4 py-3 hover:bg-white/10 transition"
                            >
                                <div className="text-sm opacity-80">{t("contact.management")}</div>
                                <div className="mt-1 font-medium">
                                    <LTR>{managementPhone}</LTR>
                                </div>
                            </a>

                            <a
                                href={`tel:${restaurantPhone}`}
                                className="block rounded-xl border border-white/10 bg-white/5 px-4 py-3 hover:bg-white/10 transition"
                            >
                                <div className="text-sm opacity-80">{t("contact.restaurant")}</div>
                                <div className="mt-1 font-medium">
                                    <LTR>{restaurantPhone}</LTR>
                                </div>
                            </a>

                            <div className="text-xs opacity-70">
                                {t("contact.note")}
                            </div>
                        </div>
                    </motion.section>
                </div>
            </main>

            <Footer />
        </div>
    );
}
