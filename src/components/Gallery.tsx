"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { X } from "lucide-react";
import ArtisticGalleryCard from "./ArtisticGalleryCard";
import { galleryImages } from "@/data/galleryData";
import { useRouter } from "next/navigation";

// 💎 HUB PANEL COMPONENT
function HubPanel({ section, index, onClick }: { section: any, index: number, onClick: () => void }) {
    const mouseX = useMotionValue(0.5);
    const mouseY = useMotionValue(0.5);

    const handleMouseMove = (e: React.MouseEvent) => {
        const rect = e.currentTarget.getBoundingClientRect();
        mouseX.set((e.clientX - rect.left) / rect.width);
        mouseY.set((e.clientY - rect.top) / rect.height);
    };

    const imgX = useTransform(mouseX, [0, 1], ["2%", "-2%"]);
    const imgY = useTransform(mouseY, [0, 1], ["2%", "-2%"]);

    return (
        <motion.div
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: (index % 4) * 0.1, duration: 0.8, ease: "circOut" }}
            onClick={onClick}
            onMouseMove={handleMouseMove}
            className="group relative flex-1 flex items-center justify-center cursor-pointer overflow-hidden border-b md:border-b-0 md:border-r border-white/5 last:border-0 transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] hover:flex-[2.5] shadow-[0_0_20px_rgba(212,175,55,0.2)] hover:shadow-[0_0_40px_rgba(212,175,55,0.5)] before:absolute before:inset-0 before:z-20 before:bg-gradient-to-r before:from-transparent before:via-white/10 before:to-transparent before:translate-x-[-200%] before:hover:translate-x-[200%] before:transition-transform before:duration-1000 before:ease-in-out before:rotate-[35deg]"
        >
            {/* Background Image with Parallax & Zoom */}
            <motion.img
                src={section.image}
                alt={section.title}
                style={{ x: imgX, y: imgY }}
                className="absolute inset-0 w-[110%] h-[110%] -left-[5%] -top-[5%] object-cover grayscale brightness-[0.7] group-hover:grayscale-0 group-hover:brightness-100 group-hover:scale-105 group-hover:blur-[1.5px] transition-all duration-700 ease-[cubic-bezier(0.23,1,0.32,1)]"
            />

            {/* Glassmorphism Overlay */}
            <div className="absolute inset-0 z-10 bg-gradient-to-b from-black/70 via-black/30 to-transparent transition-all duration-700" />

            {/* Content: Vertical Text & Gold Line */}
            <div className="relative z-30 flex flex-col items-center justify-center h-full w-full pointer-events-none">
                <div className="md:transform md:-rotate-90 md:origin-center whitespace-nowrap overflow-visible">
                    <h2 className="text-2xl md:text-3xl lg:text-4xl tracking-[0.4em] font-sans font-black text-white/90 group-hover:text-gold group-hover:drop-shadow-[0_0_10px_rgba(212,175,55,0.5)] transition-all duration-700 uppercase">
                        {section.title}
                    </h2>
                </div>
                <div className="hidden md:block absolute bottom-12 w-px h-0 group-hover:h-32 bg-gold shadow-[0_0_15px_rgba(212,175,55,0.8)] transition-all duration-700 ease-in-out" />
            </div>
        </motion.div>
    );
}

export default function Gallery({ initialCategory = null }: { initialCategory?: string | null }) {
    const router = useRouter();
    const [selectedImage, setSelectedImage] = useState<string | null>(null);
    const [activeCategory, setActiveCategory] = useState<string | null>(initialCategory);

    const containerRef = useRef<HTMLDivElement>(null);

    const gMouseX = useMotionValue(0);
    const gMouseY = useMotionValue(0);

    const moveX = useTransform(gMouseX, [-0.5, 0.5], ["5%", "-5%"]);
    const moveY = useTransform(gMouseY, [-0.5, 0.5], ["5%", "-5%"]);

    const handleGlobalMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        gMouseX.set((e.clientX - rect.left) / rect.width - 0.5);
        gMouseY.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    // ✅ Filter images based on category
    const filteredImages = activeCategory
        ? galleryImages.filter((img) => img.category === activeCategory)
        : galleryImages;

    // 🎯 SECTION DATA
    const ALL_SECTIONS = [
        { id: "navratri", title: "NAVRATRI", image: "/assets/portrait-1.jpg" },
        { id: "wedding", title: "WEDDINGS", image: "/assets/gallery/wedding.png" },
        { id: "concerts", title: "CONCERTS", image: "/assets/gallery/prewedding.png" },
        { id: "brands", title: "BRAND SHOOT", image: "/assets/splash-poster.jpg" },
        { id: "albums", title: "ALBUMS", image: "/assets/gallery/events.png" },
    ];

    return (
        <section id="gallery" className="w-full min-h-screen bg-black text-white selection:bg-gold selection:text-black">

            {/* ========================= */}
            {/* 🔥 STEP 1: SECTION HUB */}
            {/* ========================= */}
            <AnimatePresence mode="wait">
                {!activeCategory && (
                    <div key="hub" className="flex flex-col bg-black">
                        {/* GALLERY HUB SECTION */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="h-screen flex flex-col md:flex-row overflow-hidden sticky top-0"
                        >
                            {ALL_SECTIONS.map((sec, idx) => (
                                <HubPanel
                                    key={sec.id}
                                    section={sec}
                                    index={idx}
                                    onClick={() => {
                                        router.push(`/gallery/${sec.id}`);
                                    }}
                                />
                            ))}
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* ========================= */}
            {/* 🔥 STEP 2: GALLERY VIEW */}
            {/* ========================= */}
            <AnimatePresence>
                {activeCategory && (
                    <motion.div
                        key="gallery-view"
                        initial={{ opacity: 0, y: 30 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.6 }}
                        className="py-24 px-6 container mx-auto"
                    >
                        {/* Header & Back Button */}
                        <div className="flex flex-col items-center text-center mb-20 relative">
                            <motion.button
                                initial={{ x: -20, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ delay: 0.3 }}
                                onClick={() => setActiveCategory(null)}
                                className="absolute left-0 top-0 text-gold/60 hover:text-gold tracking-widest text-sm font-bold transition-all flex items-center gap-2 group"
                            >
                                <span className="group-hover:-translate-x-1 transition-transform">←</span> BACK TO HUB
                            </motion.button>

                            <motion.h1
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="font-serif text-4xl md:text-6xl mb-8 tracking-tighter uppercase"
                            >
                                {activeCategory === "navratri" ? (
                                    <>
                                        NAVRATRI <span className="text-gold italic ml-4 font-allura normal-case tracking-normal">Utsav</span>
                                    </>
                                ) : activeCategory === "wedding" ? (
                                    <>
                                        WEDDING <span className="text-gold italic ml-4 font-allura normal-case tracking-normal">Stories</span>
                                    </>
                                ) : activeCategory === "concerts" ? (
                                    <>
                                        LIVE <span className="text-gold italic ml-4 font-allura normal-case tracking-normal">Concerts</span>
                                    </>
                                ) : activeCategory === "brands" ? (
                                    <>
                                        BRAND <span className="text-gold italic ml-4 font-allura normal-case tracking-normal">Shoot</span>
                                    </>
                                ) : (
                                    <>
                                        ALBUMS
                                    </>
                                )}
                            </motion.h1>
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: 100 }}
                                transition={{ delay: 0.5, duration: 1 }}
                                className="h-px bg-gradient-to-r from-transparent via-gold to-transparent"
                            />
                        </div>

                        {/* Desktop "H & J" Monogram Layout */}
                        <div
                            ref={containerRef}
                            onMouseMove={handleGlobalMouseMove}
                            className="hidden lg:grid relative grid-cols-12 gap-8 mb-32 p-16 rounded-[3rem] overflow-hidden border border-white/5 shadow-2xl shadow-gold/5"
                        >
                            {/* Parallax Background */}
                            <motion.div
                                className="absolute inset-0 z-0 bg-cover bg-center opacity-40 scale-110"
                                style={{
                                    backgroundImage: "url('/assets/gallery-bg.jpg')",
                                    x: moveX,
                                    y: moveY,
                                }}
                            />
                            <div className="absolute inset-0 z-0 bg-gradient-to-br from-black via-black/80 to-black" />

                            {/* The "H" - Proportional grid */}
                            <div className="col-span-6 grid grid-cols-3 gap-8 relative z-10">
                                <div className="flex flex-col gap-8">
                                    {filteredImages.slice(0, 2).map((img) => (
                                        <ArtisticGalleryCard key={img.id} src={img.src} onClick={() => setSelectedImage(img.src)} />
                                    ))}
                                </div>
                                <div className="flex flex-col justify-center">
                                    {filteredImages[2] && (
                                        <ArtisticGalleryCard src={filteredImages[2].src} onClick={() => setSelectedImage(filteredImages[2].src)} />
                                    )}
                                </div>
                                <div className="flex flex-col gap-8">
                                    {filteredImages.slice(3, 5).map((img) => (
                                        <ArtisticGalleryCard key={img.id} src={img.src} onClick={() => setSelectedImage(img.src)} />
                                    ))}
                                </div>
                            </div>

                            {/* Elegant Spacer */}
                            <div className="col-span-1 flex items-center justify-center relative z-10">
                                <div className="w-[1px] h-32 bg-gradient-to-b from-transparent via-white/10 to-transparent" />
                            </div>

                            {/* The "J" - Defined by negative space */}
                            <div className="col-span-5 grid grid-cols-3 gap-8 relative z-10">
                                <div className="flex flex-col justify-end">
                                    {filteredImages[5] && (
                                        <ArtisticGalleryCard src={filteredImages[5].src} onClick={() => setSelectedImage(filteredImages[5].src)} />
                                    )}
                                </div>
                                <div className="col-span-1 flex flex-col gap-8">
                                    {filteredImages.slice(6, 9).map((img) => (
                                        <ArtisticGalleryCard key={img.id} src={img.src} onClick={() => setSelectedImage(img.src)} />
                                    ))}
                                </div>
                            </div>
                        </div>

                        {/* Secondary Grid - Premium Masonry Layout */}
                        <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8">
                            {filteredImages.map((img, idx) => (
                                <div key={img.id} className={idx < 9 ? "lg:hidden" : "block"}>
                                    <ArtisticGalleryCard
                                        src={img.src}
                                        onClick={() => setSelectedImage(img.src)}
                                    />
                                </div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Image Lightbox */}
            <AnimatePresence>
                {selectedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-2 md:p-4 backdrop-blur-sm"
                        onClick={() => setSelectedImage(null)}
                    >
                        <button className="absolute top-4 right-4 text-white hover:text-gold transition-colors p-2 bg-black/50 rounded-full z-[70]">
                            <X size={28} />
                        </button>
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            className="relative w-full max-w-5xl max-h-[85vh] flex items-center justify-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <img src={selectedImage} alt="Full view" className="max-w-full max-h-full object-contain rounded-md shadow-2xl shadow-gold/10" />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}