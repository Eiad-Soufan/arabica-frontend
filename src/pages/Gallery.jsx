import { motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { fetchGalleryImages, fetchVideos } from "../api/gallery";
import Footer from "../components/Footer";
import Header from "../components/Header";

// بسيط: نحاول نطلع رابط embed لليوتيوب إذا كان يوتيوب
function toYouTubeEmbed(url) {
    try {
        const u = new URL(url);
        // youtu.be/ID
        if (u.hostname.includes("youtu.be")) {
            const id = u.pathname.replace("/", "");
            return id ? `https://www.youtube.com/embed/${id}` : null;
        }
        // youtube.com/watch?v=ID
        if (u.hostname.includes("youtube.com")) {
            const id = u.searchParams.get("v");
            return id ? `https://www.youtube.com/embed/${id}` : null;
        }
        return null;
    } catch {
        return null;
    }
}

export default function Gallery() {
    const { t } = useTranslation();
    const [images, setImages] = useState([]);
    const [videos, setVideos] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            setLoading(true);
            try {
                const [imgs, vids] = await Promise.all([
                    fetchGalleryImages(),
                    fetchVideos(),
                ]);
                setImages(Array.isArray(imgs) ? imgs : []);
                setVideos(Array.isArray(vids) ? vids : []);
            } finally {
                setLoading(false);
            }
        })();
    }, []);

    const hasContent = images.length > 0 || videos.length > 0;

    const videoCards = useMemo(() => {
        return videos.map((v) => {
            const yt = toYouTubeEmbed(v.video_url);
            return { ...v, embed: yt };
        });
    }, [videos]);

    return (
        <div className="min-h-screen">
            <Header />

            <main className="mx-auto max-w-6xl px-4 pt-24 pb-16">


                {/* Videos */}
                <section className="mt-10">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold">{t("gallery.videos")}</h2>
                    </div>

                    <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-5">
                        {loading &&
                            Array.from({ length: 2 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="h-64 rounded-2xl bg-white/5 border border-white/10 animate-pulse"
                                />
                            ))}

                        {!loading && videoCards.length === 0 && (
                            <div className="opacity-75">{t("gallery.noVideos")}</div>
                        )}

                        {videoCards.map((v, idx) => (
                            <motion.div
                                key={v.id}
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.05 * Math.min(idx, 8) }}
                                className="overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md"
                            >
                                {v.embed ? (
                                    <div className="relative w-full" style={{ paddingTop: "56.25%" }}>
                                        <iframe
                                            className="absolute inset-0 h-full w-full"
                                            src={v.embed}
                                            title="video"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                            allowFullScreen
                                        />
                                    </div>
                                ) : (
                                    <video
                                        controls
                                        className="w-full h-64 object-cover"
                                        src={v.video_url}
                                    />
                                )}

                                <div className="p-4 flex items-center justify-between">
                                    <div className="text-sm opacity-80">{t("gallery.video")}</div>
                                    <a
                                        href={v.video_url}
                                        target="_blank"
                                        rel="noreferrer"
                                        className="text-sm opacity-80 hover:opacity-100 transition"
                                    >
                                        {t("gallery.open")}
                                    </a>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Images */}
                <section className="mt-12">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-semibold">{t("gallery.images")}</h2>
                    </div>

                    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                        {loading &&
                            Array.from({ length: 8 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="aspect-square rounded-2xl bg-white/5 border border-white/10 animate-pulse"
                                />
                            ))}

                        {!loading && images.length === 0 && (
                            <div className="opacity-75">{t("gallery.noImages")}</div>
                        )}

                        {images.map((img, idx) => (
                            <motion.a
                                key={img.id}
                                href={img.image_url}
                                target="_blank"
                                rel="noreferrer"
                                initial={{ opacity: 0, y: 12 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.02 * Math.min(idx, 16) }}
                                whileHover={{ y: -3 }}
                                className="group overflow-hidden rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md"
                            >
                                <div className="aspect-square">
                                    <img
                                        src={img.image_url}
                                        alt="gallery"
                                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.04]"
                                        loading="lazy"
                                    />
                                </div>
                            </motion.a>
                        ))}
                    </div>

                    {!loading && !hasContent && (
                        <div className="mt-10 opacity-80">{t("gallery.empty")}</div>
                    )}
                </section>
            </main>

            <Footer />
        </div>
    );
}
