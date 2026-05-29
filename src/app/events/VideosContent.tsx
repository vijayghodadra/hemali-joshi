"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ArtisticVideoCard from "@/components/ArtisticVideoCard";
import { Play, Info, Volume2, VolumeX, X } from "lucide-react";
import { getDevicePower } from "@/utils/devicePower";
import { useEffect } from "react";
import Footer from "@/components/Footer";

export default function VideosContent() {
    const [selectedVideo, setSelectedVideo] = useState<string | null>(null);
    const [isMuted, setIsMuted] = useState(true);

    const videos = [
        { id: 1, src: "/assets/Gal/videos/319267f0-a223-4356-b981-c6d6cd42cedf.MP4", poster: "/assets/concert.jpg", title: "Live Concert in UK", desc: "Experience the energy of the live stage performance.", category: "performance" },
        { id: 2, src: "/assets/boly.mp4", title: "Bollywood Night", desc: "A raw, acoustic rendition of classic hits.", category: "performance" },
        { id: 3, src: "/assets/vichu.mp4", poster: "/assets/vi.jpeg", title: "Album Launch", desc: "Behind the scenes access to the artist's life.", objectFit: "contain" as const, category: "performance" },
        { id: 4, src: "/assets/Gal/videos/WEDDING REEL (19-12-2024)-1.MP4", poster: "/assets/wedding_vibes.jpg", title: "Wedding Vibes", desc: "Magical musical moments from recent weddings.", objectFit: "contain" as const, category: "performance" },
        { id: 7, src: "/assets/Gal/videos/DRFT 4 .MP4", poster: "/assets/Poster11.png", title: "Musical Journey", desc: "Our mission is simple: to transform every event into a unique musical journey that leaves lasting impressions and cherished memories.", category: "performance" },
        { id: 15, src: "/assets/hitu.mp4", poster: "/assets/hituu.jpeg", title: "Hitu Kanodia (Gujarati Actor)", desc: "Appreciation and blessings from the famous superstar actor.", category: "celebrity" },
        { id: 13, src: "/assets/kanodia.mp4", poster: "/assets/mona.jpeg", title: "Mona Thiba Kanodia (Gujarati Actress)", desc: "A beautiful review and appreciation from the renowned actress.", objectFit: "contain" as const, category: "celebrity" },
        { id: 14, src: "/assets/News.mp4", poster: "/assets/media_uk.jpg", title: "Media spot in UK", desc: "Featured in news media for her unique garba releases and musical achievements.", objectFit: "contain" as const, category: "celebrity" },
        { id: 17, src: "/assets/au.mp4", poster: "/assets/cc.jpeg", title: "Audience Love", desc: "Unconditional love and support from our beautiful audience.", objectFit: "cover" as const, objectPosition: "object-center", category: "audience" },
        { id: 16, src: "/assets/cli.mp4", poster: "/assets/Client.png", title: "Client Review", desc: "Amazing energy and love from our wonderful audience.", category: "audience" },
        { id: 11, src: "/assets/Audience.mp4", poster: "/assets/Client1.png", title: "Client Review", desc: "A glimpse of the love and support from amazing fans.", category: "audience" },
        { id: 12, src: "/assets/vid2.mp4", poster: "/assets/ccl.png", title: "Fan Moments", desc: "Pure joy and unmatched support from our lovely audience during the live show.", category: "audience" },
    ];

    // Featured video logic
    const featuredVideo = videos.find(v => v.id === 7) || videos[0];
    const [featuredSrc, setFeaturedSrc] = useState(featuredVideo.src);

    useEffect(() => {
        if (getDevicePower() === "low" && featuredVideo.src.includes("hj2.mp4")) {
            setFeaturedSrc(featuredVideo.src.replace(".MP4", "_low.mp4").replace(".mp4", "_low.mp4"));
        } else {
            setFeaturedSrc(featuredVideo.src);
        }
    }, [featuredVideo.src]);

    const getOptimalSrc = (src: string) => {
        if (getDevicePower() === "low" && src.includes("hj2.mp4")) {
            return src.replace(".MP4", "_low.mp4").replace(".mp4", "_low.mp4");
        }
        return src;
    };

    return (
        <main className="min-h-screen bg-[#141414] text-white overflow-x-hidden">
            <section className="relative w-full h-[85vh] overflow-hidden">
                <div className="absolute inset-0 w-full h-full">
                    <video
                        key={featuredSrc}
                        src={featuredSrc}
                        className="w-full h-full object-cover opacity-60 pointer-events-none"
                        autoPlay
                        muted={isMuted}
                        loop
                        playsInline
                        preload="metadata"
                        style={{ WebkitTransform: "translateZ(0)", transform: "translateZ(0)", willChange: "transform, opacity" }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-transparent" />
                </div>

                <div className="relative z-10 w-full h-full flex items-start pt-24 md:pt-28 container mx-auto px-6 md:px-12">
                    <div className="max-w-3xl space-y-6">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 1.2, ease: "easeOut" }}
                            className="text-5xl md:text-7xl font-serif text-white tracking-tight leading-none"
                        >
                            <span className="block text-gold italic text-3xl md:text-4xl mb-2 font-light">Best Singer in India</span>
                            {featuredVideo.title}
                        </motion.h1>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 1 }}
                            className="flex flex-col gap-4"
                        >
                            <div className="w-24 h-[1px] bg-gold/50" />
                            <p className="text-base md:text-lg text-gray-300 font-light max-w-xl leading-relaxed">
                                {featuredVideo.desc}
                            </p>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.8 }}
                            className="flex items-center gap-6 pt-6"
                        >
                            <button
                                onClick={() => setSelectedVideo(featuredSrc)}
                                className="group relative px-8 py-3 overflow-hidden rounded-full bg-gold/10 backdrop-blur-sm border border-gold/30 text-gold hover:text-black transition-colors duration-500"
                            >
                                <span className="absolute inset-0 w-full h-full bg-gold transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                                <span className="relative flex items-center gap-3 font-serif tracking-widest text-sm uppercase">
                                    <Play size={16} fill="currentColor" />
                                    Watch Performance
                                </span>
                            </button>
                        </motion.div>
                    </div>

                    <div className="absolute bottom-12 right-12 z-20">
                        <button
                            onClick={() => setIsMuted(!isMuted)}
                            className="p-3 rounded-full text-white/50 hover:text-white transition-colors"
                        >
                            {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                        </button>
                    </div>
                </div>
            </section>

            <section className="relative z-20 px-6 md:px-12 py-20 space-y-24">
                <div className="space-y-8">
                    <div className="flex items-end justify-between border-b border-white/10 pb-4">
                        <h3 className="text-3xl md:text-4xl font-serif text-white">Event <span className="italic text-gold">Performances</span></h3>
                        <span className="text-xs uppercase tracking-widest text-white/40 hidden md:block">Highlights from Live Shows</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {videos.filter((vid) => vid.category === "performance" && vid.id !== featuredVideo.id).map((vid) => (
                            <ArtisticVideoCard
                                key={vid.id}
                                src={vid.src}
                                title={vid.title}
                                description={vid.desc}
                                onClick={() => setSelectedVideo(getOptimalSrc(vid.src))}
                                year="2024"
                                tag="Cover"
                                poster={(vid as any).poster}
                                objectFit={(vid as any).objectFit}
                                objectPosition={(vid as any).objectPosition}
                            />
                        ))}
                    </div>
                </div>

                <div id="what-celebrities-say" className="space-y-8 pt-12 scroll-mt-28">
                    <div className="flex items-end justify-between border-b border-white/10 pb-4">
                        <h3 className="text-3xl md:text-4xl font-serif text-white">What Celebrities <span className="italic text-gold">Say</span></h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                        {videos.filter((vid) => vid.category === "celebrity").map((vid) => (
                            <ArtisticVideoCard
                                key={vid.id}
                                src={vid.src}
                                title={vid.title}
                                description={vid.desc}
                                onClick={() => setSelectedVideo(getOptimalSrc(vid.src))}
                                year="2024"
                                tag="Review"
                                poster={(vid as any).poster}
                                objectFit={(vid as any).objectFit}
                                objectPosition={(vid as any).objectPosition}
                            />
                        ))}
                    </div>
                </div>

                <div className="space-y-8 pt-12">
                    <div className="flex items-end justify-between border-b border-white/10 pb-4">
                        <h3 className="text-3xl md:text-4xl font-serif text-white">Audience <span className="italic text-gold">Love</span></h3>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                        {videos.filter((vid) => vid.category === "audience").map((vid) => (
                            <ArtisticVideoCard
                                key={vid.id}
                                src={vid.src}
                                title={vid.title}
                                description={vid.desc}
                                onClick={() => setSelectedVideo(getOptimalSrc(vid.src))}
                                year="2024"
                                tag="Audience"
                                poster={(vid as any).poster}
                                objectFit={(vid as any).objectFit}
                                objectPosition={(vid as any).objectPosition}
                            />
                        ))}
                    </div>
                </div>
            </section>

            <AnimatePresence>
                {selectedVideo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-0 backdrop-blur-md"
                        onClick={() => setSelectedVideo(null)}
                    >
                        <button className="absolute top-6 right-6 text-white hover:text-red-500 transition-colors p-2 bg-black/50 rounded-full z-[110]">
                            <X size={40} />
                        </button>
                        <motion.div
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            className="w-full h-full md:p-12 flex items-center justify-center"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <video
                                src={selectedVideo}
                                className="max-w-full max-h-[85vh] shadow-2xl bg-black rounded-lg"
                                controls
                                autoPlay
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            <Footer />
        </main>
    );
}
