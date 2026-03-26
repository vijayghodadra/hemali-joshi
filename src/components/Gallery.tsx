"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform } from "framer-motion";
import { X } from "lucide-react";
import ArtisticGalleryCard from "./ArtisticGalleryCard";


import { galleryImages } from "@/data/galleryData";

export default function Gallery() {
    const [selectedImage, setSelectedImage] = useState<string | null>(null);

    const containerRef = useRef<HTMLDivElement>(null);

    // Parallax Effect Values
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Background moves slightly opposite to cursor for depth
    const moveX = useTransform(mouseX, [-0.5, 0.5], ["5%", "-5%"]);
    const moveY = useTransform(mouseY, [-0.5, 0.5], ["5%", "-5%"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        mouseX.set((x / width) - 0.5);
        mouseY.set((y / height) - 0.5);
    };


    return (
        <section id="gallery" className="w-full py-20 px-6 bg-transparent text-white">
            <div className="container mx-auto">
                <div className="flex flex-col items-center text-center mb-16">
                    <h1 className="font-serif text-5xl md:text-6xl mb-6">Visual <span className="text-gold">Stories</span></h1>
                    <p className="text-gray-400 max-w-2xl text-lg opacity-80">
                        Moments frozen in time—where every frame sings a melody of its own.
                        Hover to interact with the memories.
                    </p>
                    <div className="mt-8 h-1 w-24 bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
                </div>

                {/* Desktop "H & J" Monogram Layout */}
                <div
                    ref={containerRef}
                    onMouseMove={handleMouseMove}
                    className="hidden lg:grid relative grid-cols-12 gap-6 mb-24 p-12 rounded-3xl overflow-hidden border border-white/10 group"
                >
                    {/* Background Image - Parallax Motion */}
                    <motion.div
                        className="absolute inset-0 z-0 bg-cover bg-center opacity-60"
                        style={{
                            backgroundImage: "url('/assets/gallery-bg.jpg')",
                            x: moveX,
                            y: moveY,
                            scale: 1.1 // Checked to ensure no white edges when moving
                        }}
                    />
                    <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/90 via-black/40 to-black/90" />

                    {/* The "H" - Spans columns 1-5 */}
                    <div className="col-span-6 grid grid-cols-3 gap-6 relative z-10">
                        {/* Left Pillar */}
                        <div className="flex flex-col gap-6">
                            {galleryImages.slice(0, 2).map((img) => (
                                <ArtisticGalleryCard key={img.id} src={img.src} onClick={() => setSelectedImage(img.src)} />
                            ))}
                        </div>
                        {/* Center Bridge - Centered vertically */}
                        <div className="flex flex-col justify-center">
                            <ArtisticGalleryCard src={galleryImages[2].src} onClick={() => setSelectedImage(galleryImages[2].src)} />
                        </div>
                        {/* Right Pillar */}
                        <div className="flex flex-col gap-6">
                            {galleryImages.slice(3, 5).map((img) => (
                                <ArtisticGalleryCard key={img.id} src={img.src} onClick={() => setSelectedImage(img.src)} />
                            ))}
                        </div>
                    </div>

                    {/* Spacer / Divider */}
                    <div className="col-span-1 relative z-10" />

                    {/* The "J" - Spans columns 7-11 */}
                    <div className="col-span-5 grid grid-cols-3 gap-6 relative z-10">
                        {/* Left helper (Empty except for hook bottom?) */}
                        <div className="flex flex-col justify-end">
                            <ArtisticGalleryCard src={galleryImages[5].src} onClick={() => setSelectedImage(galleryImages[5].src)} />
                        </div>
                        {/* Center Stem (The main J body) */}
                        <div className="col-span-1 flex flex-col gap-6">
                            {galleryImages.slice(6, 9).map((img) => (
                                <ArtisticGalleryCard key={img.id} src={img.src} onClick={() => setSelectedImage(img.src)} />
                            ))}
                        </div>
                        {/* Col 3 is empty */}
                    </div>
                </div>

                {/* Mobile/Tablet & Remaining Images Grid */}
                {/* On Desktop, we show images starting from index 9. On Mobile, show ALL images using standard layout. */}
                {/* Mobile/Tablet & Remaining Images Grid - Unified Responsive Layout */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-auto">
                    {galleryImages.map((img, idx) => (
                        <div key={img.id} className={idx < 9 ? "lg:hidden contents" : ""}>
                            {/* Show all on mobile, but on Desktop hide the first 9 (as they are in the H & J layout) */}
                            <div className={(idx < 9 ? "block lg:hidden" : "block")}>
                                <ArtisticGalleryCard
                                    src={img.src}
                                    onClick={() => setSelectedImage(img.src)}
                                />
                            </div>
                        </div>
                    ))}
                </div>


            </div>

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
