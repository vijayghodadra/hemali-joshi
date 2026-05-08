"use client";
import React from "react";
import { motion } from "framer-motion";
import Footer from "@/components/Footer";
import ThreeDAlbum from "@/components/ThreeDAlbum";
import MusicPortals, { PORTAL_DATA } from "@/components/MusicPortals";
import ArtisticVideoScreens from "@/components/ArtisticVideoScreens";
import ArtisticScrollTitle from "@/components/ArtisticScrollTitle";
import MusicSection from "@/components/MusicSection";

export default function MusicContent() {
    const [mousePos, setMousePos] = React.useState({ x: 0, y: 0 });

    React.useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({
                x: (e.clientX / window.innerWidth - 0.5) * 20,
                y: (e.clientY / window.innerHeight - 0.5) * 20
            });
        };
        window.addEventListener('mousemove', handleMouseMove);
        return () => window.removeEventListener('mousemove', handleMouseMove);
    }, []);

    const devotionalData = PORTAL_DATA.map((item, index) => {
        if (index === 0) {
            return {
                ...item,
                audio: "/assets/audio/jay_adhya_sakti.m4a",
                title: "Jay Adhya Sakti" // Updated title as requested
            };
        }
        if (index === 1) {
            return {
                ...item,
                audio: "/assets/audio/harsidhi_mata.m4a",
                title: "Harsidhi mata"
            };
        }
        if (index === 2) {
            return {
                ...item,
                audio: "/assets/audio/sukh_karta.m4a",
                title: "Sukh Karta"
            };
        }
        if (index === 3) {
            return {
                ...item,
                audio: "/assets/audio/maha_mrityunjaya.m4a",
                title: "Maha Mrityunjaya"
            };
        }
        return item;
    });

    const bollywoodData = PORTAL_DATA.map((item, index) => {
        if (index === 0) {
            return {
                ...item,
                audio: "/assets/audio/ujjala.m4a",
                title: "Ujjala"
            };
        }
        if (index === 1) {
            return {
                ...item,
                audio: "/assets/audio/rang_lagyo.m4a",
                title: "Rang Lagyo"
            };
        }
        if (index === 2) {
            return {
                ...item,
                audio: "/assets/audio/pehla_nasha.m4a",
                title: "Pehla Nasha"
            };
        }
        if (index === 3) {
            return {
                ...item,
                audio: "/assets/audio/mein_teri_behna_hoon.m4a",
                title: "Mein Teri Behna Hoon"
            };
        }
        return item;
    });

    return (
        <main className="min-h-screen bg-black text-white selection:bg-gold selection:text-black overflow-x-hidden">
            {/* Ambient Background Base */}
            <div className="fixed inset-0 bg-black -z-30" />

            {/* Interactive Disco Background */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{
                    opacity: 0.4,
                    x: mousePos.x,
                    y: mousePos.y,
                    scale: 1.1
                }}
                transition={{
                    opacity: { duration: 1 },
                    x: { type: "spring", stiffness: 50, damping: 30 },
                    y: { type: "spring", stiffness: 50, damping: 30 }
                }}
                className="fixed inset-0 w-full h-full -z-20 bg-cover bg-center pointer-events-none brightness-50"
                style={{ backgroundImage: "url('/assets/disco1.jpeg')" }}
            >
                <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/60" />
            </motion.div>

            {/* Hero Section */}
            <section className="relative min-h-[90vh] flex flex-col items-center justify-center pt-24 pb-12">
                <div className="container mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        className="mb-12"
                    >
                        <div className="inline-block p-1 px-4 rounded-full border border-gold/30 bg-gold/5 text-gold text-xs font-serif tracking-[0.3em] uppercase mb-8 backdrop-blur-md">
                            Now Streaming Online
                        </div>
                        <h1 className="font-serif text-6xl md:text-8xl mb-6 text-white leading-tight">
                            The <span className="text-gold italic">Discography</span>
                        </h1>
                        <p className="text-gray-400 max-w-xl mx-auto text-lg">
                            Experience the journey through sound with the <strong>best singer in India</strong>. Available on Spotify, Apple Music, and more.
                        </p>
                    </motion.div>

                    {/* 3D Album Centerpiece */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.2 }}
                        className="mb-10"
                    >
                        <ThreeDAlbum coverImage="/assets/Discograohy.jpeg" fullImage />

                        <div className="mt-8 text-center opacity-60">
                            <span className="text-xs uppercase tracking-[0.5em] text-gold">LATEST BOLLYWOOD,TRADITIONAL,DEVOTIONAL AND GARBA RELEASES</span>
                        </div>
                    </motion.div>

                    {/* Garba Music Title with Artistic Writing Effect */}
                    <div className="mt-8 -mb-6">
                        <ArtisticScrollTitle text="Garba Music" />
                    </div>

                    {/* Portals Grid */}
                    <MusicPortals />

                    {/* Bollywood Vibes Title */}
                    <div className="mt-12 -mb-6">
                        <ArtisticScrollTitle text="Bollywood Vibes" />
                    </div>

                    {/* Portals Grid */}
                    <MusicPortals data={bollywoodData} />

                    {/* Devotional Peace Title */}
                    <div className="mt-12 -mb-6">
                        <ArtisticScrollTitle text="Devotional Peace" />
                    </div>

                    {/* Portals Grid (Duplicate for now as requested) */}
                    <MusicPortals data={devotionalData} />

                </div>

                {/* Artistic Video Screens Section */}
                <div className="relative z-20 w-full bg-black/50 backdrop-blur-sm border-t border-white/5">
                    <ArtisticVideoScreens />
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 1 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20"
                >
                    <span className="text-[10px] uppercase tracking-widest">Scroll to Explore</span>
                    <div className="w-px h-12 bg-gradient-to-b from-white/20 to-transparent" />
                </motion.div>
            </section>

            <Footer />
        </main>
    );
}
