import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import {
    fetchAllProducts,
    fetchCategories,
    fetchCategoryProducts,
    fetchRecommendedProducts,
    fetchSmallBanners,
} from "../api/menu.js";
import Footer from "../components/Footer.jsx";
import Header from "../components/Header.jsx";

function getLocalized(obj, lang, baseKey) {
    const map = { ar: `${baseKey}_ar`, en: `${baseKey}_en`, ms: `${baseKey}_ms` };
    return obj?.[map[lang]] || obj?.[map.en] || obj?.[map.ar] || "";
}

function clampPage(n) {
    const p = Number(n);
    if (!Number.isFinite(p) || p < 1) return 1;
    return Math.floor(p);
}

function buildPageItems(current, total) {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);

    const items = new Set([1, 2, total - 1, total, current]);
    items.add(current - 1);
    items.add(current + 1);

    const sorted = [...items].filter((x) => x >= 1 && x <= total).sort((a, b) => a - b);
    const out = [];
    for (let i = 0; i < sorted.length; i++) {
        const v = sorted[i];
        const prev = sorted[i - 1];
        if (i > 0 && v - prev > 1) out.push("...");
        out.push(v);
    }
    return out;
}

export default function Menu() {
    const { t, i18n } = useTranslation();
    const lang = i18n.language;

    const [categories, setCategories] = useState([]);
    const [activeCategoryId, setActiveCategoryId] = useState(null); // null = All

    const [banners, setBanners] = useState([]);
    const [recommended, setRecommended] = useState([]);

    const [products, setProducts] = useState([]);
    const [count, setCount] = useState(0);

    const [page, setPage] = useState(1);
    const pageSize = 12;

    const [loadingTop, setLoadingTop] = useState(true);
    const [loadingProducts, setLoadingProducts] = useState(true);
    const [error, setError] = useState("");

    // modal
    const [selectedProduct, setSelectedProduct] = useState(null);

    const openProduct = (p) => setSelectedProduct(p);
    const closeProduct = () => setSelectedProduct(null);

    // ====== BANNERS SLIDER (NEW) ======
    const [bannerIndex, setBannerIndex] = useState(0);
    const [bannerDir, setBannerDir] = useState(1); // 1 next, -1 prev

    const isRTL = (typeof i18n.dir === "function" ? i18n.dir() : (lang === "ar")) === "rtl";

    const goPrevBanner = () => {
        if (!banners.length) return;
        setBannerDir(-1);
        setBannerIndex((i) => (i - 1 + banners.length) % banners.length);
    };

    const goNextBanner = () => {
        if (!banners.length) return;
        setBannerDir(1);
        setBannerIndex((i) => (i + 1) % banners.length);
    };

    // Clamp banner index when banners change
    useEffect(() => {
        setBannerIndex((i) => {
            if (!banners?.length) return 0;
            return Math.min(i, banners.length - 1);
        });
    }, [banners.length]);

    // Autoplay (slower): every 4.5 seconds
    useEffect(() => {
        if (!banners.length) return;
        const id = setInterval(() => {
            setBannerDir(1);
            setBannerIndex((i) => (i + 1) % banners.length);
        }, 4500);

        return () => clearInterval(id);
    }, [banners.length]);
    // ====== END BANNERS SLIDER (NEW) ======

    const categoryNameById = useMemo(() => {
        const m = new Map();
        for (const c of categories) {
            m.set(c.id, getLocalized(c, lang, "name"));
        }
        return m;
    }, [categories, lang]);

    // Load categories + banners + recommended
    useEffect(() => {
        let alive = true;
        (async () => {
            try {
                setLoadingTop(true);
                const [cats, smallBanners, rec] = await Promise.all([
                    fetchCategories(),
                    fetchSmallBanners(),
                    fetchRecommendedProducts(),
                ]);

                if (!alive) return;
                setCategories(Array.isArray(cats) ? cats : []);
                // ✅ no slice(0,4): bring ALL banners from backend
                setBanners(Array.isArray(smallBanners) ? smallBanners : []);
                setRecommended(Array.isArray(rec) ? rec : []);
            } catch (e) {
                if (!alive) return;
                setError(t("menu.errors.loadTop"));
            } finally {
                if (alive) setLoadingTop(false);
            }
        })();
        return () => {
            alive = false;
        };
    }, [t]);

    // Load products whenever active category/page changes
    useEffect(() => {
        let alive = true;
        (async () => {
            try {
                setLoadingProducts(true);
                setError("");

                const currentPage = clampPage(page);
                const data = activeCategoryId
                    ? await fetchCategoryProducts({ categoryId: activeCategoryId, page: currentPage, pageSize })
                    : await fetchAllProducts({ page: currentPage, pageSize });

                if (!alive) return;

                const list = Array.isArray(data) ? data : data?.results ?? [];
                setProducts(list);
                setCount(Array.isArray(data) ? list.length : data?.count ?? list.length);
            } catch (e) {
                if (!alive) return;
                setError(t("menu.errors.loadProducts"));
            } finally {
                if (alive) setLoadingProducts(false);
            }
        })();
        return () => {
            alive = false;
        };
    }, [activeCategoryId, page, pageSize, t]);

    const totalPages = useMemo(() => {
        const tp = Math.ceil((count || 0) / pageSize);
        return tp || 1;
    }, [count, pageSize]);

    const pageItems = useMemo(() => buildPageItems(page, totalPages), [page, totalPages]);

    const activeCategory = useMemo(() => {
        return categories.find((c) => c.id === activeCategoryId) || null;
    }, [categories, activeCategoryId]);

    const pickCategory = (id) => {
        setActiveCategoryId(id);
        setPage(1);
    };

    // helpers for modal display
    const getName = (p) => getLocalized(p, lang, "name");
    const getDescription = (p) => getLocalized(p, lang, "description");

    return (
        <div className="min-h-screen bg-arabica-deep text-white">
            <Header />

            <main className="mx-auto max-w-6xl px-4 pt-24 pb-16">
                {/* Top title strip */}

                {/* Small banners -> Slider (Responsive + Frame + Better arrows + RTL flip) */}
                <section id="promotions" className="mx-auto max-w-6xl px-4 pb-10">
                    {loadingTop ? (
                        <div className="h-[200px] sm:h-[320px] lg:h-[460px] rounded-3xl border border-white/10 bg-white/5" />
                    ) : banners.length ? (
                        <div className="relative">
                            <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-glass">
                                <div className="relative w-full aspect-[21/9] sm:aspect-[21/9] lg:aspect-[21/9]">
                                    <AnimatePresence initial={false} custom={bannerDir} mode="wait">
                                        <motion.a
                                            key={banners[bannerIndex]?.id}
                                            href={banners[bannerIndex]?.link || "#"}
                                            className="absolute inset-0 block"
                                            custom={bannerDir}
                                            variants={{
                                                enter: (dir) => ({
                                                    x: (dir * (isRTL ? -1 : 1)) * 30,
                                                    opacity: 0,
                                                    filter: "blur(6px)",
                                                    scale: 0.995,
                                                }),
                                                center: { x: 0, opacity: 1, filter: "blur(0px)", scale: 1 },
                                                exit: (dir) => ({
                                                    x: (dir * (isRTL ? -1 : 1)) * -30,
                                                    opacity: 0,
                                                    filter: "blur(6px)",
                                                    scale: 0.995,
                                                }),
                                            }}
                                            initial="enter"
                                            animate="center"
                                            exit="exit"
                                            transition={{ duration: 0.32, ease: "easeOut" }}
                                            whileHover={{ y: -2 }}
                                            aria-label="Promotion banner"
                                        >
                                            {/* ✅ Inner frame/padding to make ALL images clearer */}
                                            <div className="absolute inset-0 p-2 sm:p-3">
                                                <div className="h-full w-full overflow-hidden rounded-[22px] bg-black/10 ring-1 ring-white/10">
                                                    <img
                                                        src={banners[bannerIndex]?.image_url}
                                                        alt=""
                                                        className="h-full w-full object-cover object-center"
                                                        loading="lazy"
                                                    />
                                                </div>
                                            </div>

                                            <div className="absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />
                                        </motion.a>
                                    </AnimatePresence>
                                </div>
                            </div>

                            {/* ✅ Arrows clearer + RTL flip (right=prev in RTL) */}
                            {/* {(() => {
                                const PrevButton = (
                                    <button
                                        type="button"
                                        onClick={goPrevBanner}
                                        className="absolute top-[45%] -translate-y-1/2 rounded-full bg-black/40 px-3 py-2 text-xl ring-1 ring-white/20 hover:bg-black/55 backdrop-blur-glass shadow-glass"
                                        aria-label="Previous banner"
                                    >
                                        ‹
                                    </button>
                                );

                                const NextButton = (
                                    <button
                                        type="button"
                                        onClick={goNextBanner}
                                        className="absolute top-1/2 -translate-y-1/2 rounded-full bg-black/40 px-3 py-2 text-xl ring-1 ring-white/20 hover:bg-black/55 backdrop-blur-glass shadow-glass"
                                        aria-label="Next banner"
                                    >
                                        ›
                                    </button>
                                );

                                return (
                                    <>
                                        <div className="absolute left-3">
                                            {isRTL ? NextButton : PrevButton}
                                        </div>
                                        <div className="absolute right-3">
                                            {isRTL ? PrevButton : NextButton}
                                        </div>
                                    </>
                                );
                            })()} */}

                            {/* Dots */}
                            <div className="mt-3 flex items-center justify-center gap-2">
                                {banners.map((_, i) => {
                                    const active = i === bannerIndex;
                                    return (
                                        <button
                                            key={i}
                                            type="button"
                                            onClick={() => {
                                                setBannerDir(i > bannerIndex ? 1 : -1);
                                                setBannerIndex(i);
                                            }}
                                            className={[
                                                "h-2.5 w-2.5 rounded-full ring-1 transition",
                                                active
                                                    ? "bg-arabica-aqua/70 ring-arabica-aqua/60"
                                                    : "bg-white/20 ring-white/20 hover:bg-white/35",
                                            ].join(" ")}
                                            aria-label={`Go to banner ${i + 1}`}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                    ) : (
                        <div className="rounded-3xl border border-white/10 bg-white/5 p-4 text-white/70">
                            {t("menu.noBanners")}
                        </div>
                    )}
                </section>

                {/* Recommended products: continuous marquee, pauses on hover */}
                <section className="mx-auto max-w-6xl px-4 pb-12">
                    <div className="flex items-end justify-between gap-3">
                        <div>
                            <h2 className="font-sukar text-xl sm:text-2xl">{t("menu.recommendedTitle")}</h2>
                            <p className="mt-1 text-sm text-white/70">{t("menu.recommendedSubtitle")}</p>
                        </div>
                    </div>

                    {loadingTop ? (
                        <div className="flex gap-3">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <div
                                    key={i}
                                    className="w-[240px] overflow-hidden rounded-2xl border border-white/10 bg-white/5"
                                >
                                    <div className="h-28 bg-white/10" />
                                    <div className="p-3">
                                        <div className="h-4 w-2/3 bg-white/10 rounded" />
                                        <div className="mt-2 h-3 w-1/2 bg-white/10 rounded" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : recommended.length ? (
                        <div dir="ltr" className="mt-4 arabica-marquee rounded-3xl border border-white/10 bg-white/5 shadow-glass p-3">
                            {loadingTop ? (
                                <div className="flex gap-3">
                                    {Array.from({ length: 6 }).map((_, i) => (
                                        <div
                                            key={i}
                                            className="w-[240px] overflow-hidden rounded-2xl border border-white/10 bg-white/5"
                                        >
                                            <div className="h-28 bg-white/10" />
                                            <div className="p-3">
                                                <div className="h-4 w-2/3 bg-white/10 rounded" />
                                                <div className="mt-2 h-3 w-1/2 bg-white/10 rounded" />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            ) : recommended.length ? (
                                <div className="arabica-marquee-move">
                                    <div className="arabica-marquee-track">
                                        {recommended.map((p) => (
                                            <div key={`a-${p.id}`} className="px-2">
                                                <RecommendedMarqueeCard
                                                    p={p}
                                                    lang={lang}
                                                    t={t}
                                                    onClick={() => openProduct(p)}
                                                />
                                            </div>
                                        ))}
                                    </div>

                                    <div className="arabica-marquee-track" aria-hidden="true">
                                        {recommended.map((p) => (
                                            <div key={`b-${p.id}`} className="px-2">
                                                <RecommendedMarqueeCard
                                                    p={p}
                                                    lang={lang}
                                                    t={t}
                                                    onClick={() => openProduct(p)}
                                                />
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            ) : (
                                <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-white/70">
                                    {t("menu.noRecommended")}
                                </div>
                            )}
                        </div>

                    ) : (
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-white/70">
                            {t("menu.noRecommended")}
                        </div>
                    )}

                </section>

                {/* Categories + Products */}
                <section id="menu" className="mx-auto max-w-6xl px-4 pb-16">
                    <div className="flex flex-col gap-3">
                        <div className="flex items-end justify-between gap-3">
                            <div>
                                <h2 className="font-sukar text-2xl">{t("menu.productsTitle")}</h2>
                                <p className="mt-1 text-sm text-white/70">
                                    {activeCategory
                                        ? t("menu.showingCategory", { name: getLocalized(activeCategory, lang, "name") })
                                        : t("menu.showingAll")}
                                </p>
                            </div>

                            <div className="hidden sm:flex items-center gap-2">
                                <Pagination
                                    t={t}
                                    page={page}
                                    totalPages={totalPages}
                                    items={pageItems}
                                    loading={loadingProducts}
                                    onPrev={() => setPage((p) => Math.max(1, p - 1))}
                                    onNext={() => setPage((p) => Math.min(totalPages, p + 1))}
                                    onPick={(p) => setPage(p)}
                                />
                            </div>
                        </div>

                        {/* Category tabs */}
                        <div className="rounded-3xl border border-white/10 bg-white/5 backdrop-blur-glass shadow-glass overflow-hidden">
                            <div className="-mx-2 px-2 overflow-x-auto">
                                <div className="flex items-center gap-2 py-3 min-w-max">
                                    <TabButton
                                        active={activeCategoryId === null}
                                        onClick={() => pickCategory(null)}
                                        label={t("menu.all")}
                                    />

                                    {loadingTop ? (
                                        Array.from({ length: 6 }).map((_, i) => (
                                            <div key={i} className="h-10 w-28 rounded-2xl bg-white/10" />
                                        ))
                                    ) : (
                                        categories.map((c) => (
                                            <TabButton
                                                key={c.id}
                                                active={activeCategoryId === c.id}
                                                onClick={() => pickCategory(c.id)}
                                                label={getLocalized(c, lang, "name")}
                                                imageUrl={c.image_url}
                                            />
                                        ))
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Products grid */}
                        {error ? (
                            <div className="rounded-3xl border border-red-500/30 bg-red-500/10 p-4 text-white">
                                {error}
                            </div>
                        ) : (
                            <AnimatePresence mode="wait">
                                {loadingProducts ? (
                                    <motion.div
                                        key="loading"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                    >
                                        <ProductSkeletonGrid />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key={`${activeCategoryId ?? "all"}-${page}`}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ duration: 0.35 }}
                                        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                                    >
                                        {products.map((p) => (
                                            <ProductCard
                                                key={p.id}
                                                p={p}
                                                lang={lang}
                                                t={t}
                                                categoryName={categoryNameById.get(p.category_id) || ""}
                                                onClick={() => openProduct(p)}
                                            />
                                        ))}

                                        {!products.length && (
                                            <div className="sm:col-span-2 lg:col-span-3 rounded-3xl border border-white/10 bg-white/5 p-10 text-center text-white/70">
                                                {t("menu.noProducts")}
                                            </div>
                                        )}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        )}

                        {/* Mobile pagination */}
                        <div className="sm:hidden">
                            <Pagination
                                t={t}
                                page={page}
                                totalPages={totalPages}
                                items={pageItems}
                                loading={loadingProducts}
                                onPrev={() => setPage((p) => Math.max(1, p - 1))}
                                onNext={() => setPage((p) => Math.min(totalPages, p + 1))}
                                onPick={(p) => setPage(p)}
                            />
                        </div>
                    </div>
                </section>
            </main>

            <Footer />

            {/* Product Modal */}
            <AnimatePresence>
                {selectedProduct && (
                    <motion.div
                        className="fixed inset-0 z-[999] flex items-center justify-center px-4"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeProduct}
                    >
                        <div className="absolute inset-0 bg-black/60" />

                        <motion.div
                            className="relative w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-white/10 backdrop-blur-glass shadow-[0_20px_60px_rgba(0,0,0,0.55)]"
                            initial={{ opacity: 0, y: 14, scale: 0.98 }}
                            animate={{ opacity: 1, y: 0, scale: 1 }}
                            exit={{ opacity: 0, y: 10, scale: 0.99 }}
                            transition={{ duration: 0.22 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="relative h-56 bg-white/10">
                                {selectedProduct.image_url ? (
                                    <img
                                        src={selectedProduct.image_url}
                                        alt=""
                                        className="h-full w-full object-cover"
                                        loading="lazy"
                                    />
                                ) : (
                                    <div className="h-full w-full bg-gradient-to-br from-white/10 to-white/5" />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
                            </div>

                            <div className="p-5">
                                <div className="flex items-start justify-between gap-4">
                                    <div className="min-w-0">
                                        <div className="font-sukar text-2xl leading-snug text-white">
                                            {getName(selectedProduct)}
                                        </div>
                                        <div className="mt-1 text-sm text-white/70">
                                            {categoryNameById.get(selectedProduct.category_id) || ""}
                                        </div>
                                    </div>

                                    <div className="shrink-0 font-extrabold text-white text-lg">
                                        {Number(selectedProduct.price).toFixed(2)} RM
                                    </div>
                                </div>

                                {/* الوصف هنا فقط */}
                                {getDescription(selectedProduct) ? (
                                    <p className="mt-4 text-white/80 leading-relaxed">
                                        {getDescription(selectedProduct)}
                                    </p>
                                ) : null}

                                <div className="mt-6 flex justify-end">
                                    <button
                                        onClick={closeProduct}
                                        className="rounded-2xl bg-white/10 px-4 py-2 text-sm ring-1 ring-white/15 hover:bg-white/15"
                                    >
                                        {t("menu.close")}
                                    </button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}

function TabButton({ active, onClick, label, imageUrl }) {
    return (
        <button
            onClick={onClick}
            className={[
                "flex items-center gap-2 rounded-2xl px-4 py-2 text-sm transition ring-1",
                active
                    ? "bg-arabica-aqua/20 ring-arabica-aqua/40 text-white"
                    : "bg-white/5 ring-white/10 text-white/85 hover:bg-white/10",
            ].join(" ")}
        >
            {imageUrl ? (
                <img
                    src={imageUrl}
                    alt=""
                    className="h-6 w-6 rounded-lg object-cover border border-white/10"
                    loading="lazy"
                />
            ) : null}
            <span className="whitespace-nowrap">{label}</span>
        </button>
    );
}

function RecommendedMarqueeCard({ p, lang, t, onClick }) {
    const name = getLocalized(p, lang, "name");
    return (
        <button
            type="button"
            onClick={onClick}
            className="w-[240px] text-left group overflow-hidden rounded-2xl bg-white/5 hover:bg-white/10 transition"

            title={name}
        >
            <div className="relative h-28">
                {p.image_url ? (
                    <img
                        src={p.image_url}
                        alt=""
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
                        loading="lazy"
                    />
                ) : (
                    <div className="h-full w-full bg-gradient-to-br from-white/10 to-white/5" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent" />
                <div className="absolute top-2 left-2 rounded-full bg-arabica-aqua/20 border border-arabica-aqua/40 px-3 py-1 text-xs">
                    {t("menu.recommended")}
                </div>
            </div>

            <div className="p-3">
                <div className="flex items-start justify-between gap-3">
                    <div className="text-white font-bold leading-snug line-clamp-2">{name}</div>
                    <div className="shrink-0 font-extrabold text-white">{Number(p.price).toFixed(2)} RM</div>
                </div>
            </div>
        </button>
    );
}

function ProductCard({ p, lang, t, categoryName, onClick }) {
    const name = getLocalized(p, lang, "name");

    return (
        <motion.button
            type="button"
            onClick={onClick}
            whileHover={{ y: -5 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="group text-left overflow-hidden rounded-3xl border border-white/10 bg-white/5 shadow-glass hover:bg-white/10 transition"
        >
            <div className="relative h-44">
                {p.image_url ? (
                    <img
                        src={p.image_url}
                        alt=""
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                        loading="lazy"
                    />
                ) : (
                    <div className="h-full w-full bg-gradient-to-br from-white/10 to-white/5" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent" />

                {p.is_recommended ? (
                    <div className="absolute top-3 left-3 rounded-full bg-arabica-aqua/20 border border-arabica-aqua/40 px-3 py-1 text-xs">
                        {t("menu.recommended")}
                    </div>
                ) : null}
            </div>

            <div className="p-4">
                <div className="text-xs text-white/60">{categoryName}</div>

                <div className="mt-1 flex items-start justify-between gap-3">
                    <h3 className="text-white font-bold leading-snug line-clamp-2">{name}</h3>
                    <div className="shrink-0 font-extrabold text-white">{Number(p.price).toFixed(2)} RM</div>
                </div>

                {/* لا وصف على الكرت */}
            </div>
        </motion.button>
    );
}

function Pagination({ t, page, totalPages, items, loading, onPrev, onNext, onPick }) {
    return (
        <div className="flex items-center justify-between gap-3">
            <button
                disabled={loading || page <= 1}
                onClick={onPrev}
                className="rounded-2xl bg-white/10 px-4 py-2 text-sm ring-1 ring-white/15 hover:bg-white/15 disabled:opacity-40 disabled:cursor-not-allowed"
            >
                {t("menu.prev")}
            </button>

            <div className="flex items-center gap-1">
                {items.map((it, idx) => {
                    if (it === "...") {
                        return (
                            <span key={`dots-${idx}`} className="px-2 text-white/60">
                                …
                            </span>
                        );
                    }
                    const n = it;
                    const active = n === page;
                    return (
                        <button
                            key={n}
                            disabled={loading}
                            onClick={() => onPick(n)}
                            className={[
                                "h-10 min-w-10 rounded-2xl px-3 text-sm ring-1 transition",
                                active
                                    ? "bg-arabica-aqua/20 ring-arabica-aqua/40 text-white"
                                    : "bg-white/5 ring-white/10 text-white/80 hover:bg-white/10",
                                loading ? "opacity-50" : "",
                            ].join(" ")}
                        >
                            {n}
                        </button>
                    );
                })}
            </div>

            <button
                disabled={loading || page >= totalPages || !totalPages}
                onClick={onNext}
                className="rounded-2xl bg-white/10 px-4 py-2 text-sm ring-1 ring-white/15 hover:bg-white/15 disabled:opacity-40 disabled:cursor-not-allowed"
            >
                {t("menu.next")}
            </button>
        </div>
    );
}

function ProductSkeletonGrid() {
    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {Array.from({ length: 9 }).map((_, i) => (
                <div key={i} className="rounded-3xl border border-white/10 bg-white/5 overflow-hidden">
                    <div className="h-44 bg-white/10" />
                    <div className="p-4">
                        <div className="h-4 w-3/4 bg-white/10 rounded" />
                        <div className="mt-2 h-3 w-2/3 bg-white/10 rounded" />
                        <div className="mt-4 h-3 w-1/2 bg-white/10 rounded" />
                    </div>
                </div>
            ))}
        </div>
    );
}



