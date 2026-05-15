"use client";
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Define target positions for a scattered "spread" look
const NEWSPAPERS = [
    { id: 1, src: "/assets/News/article_interview.jpg", rotate: -15, x: -150, y: -50, scale: 0.9 },
    { id: 2, src: "/assets/News/media_collage_1.jpg", rotate: 10, x: 180, y: 80, scale: 0.95 },
    { id: 3, src: "/assets/News/media_collage_2.jpg", rotate: -5, x: 20, y: 20, scale: 1.1 }, // Main one in center-ish
];

interface NewsIntroProps {
    onComplete: () => void;
}

export default function NewsIntro({ onComplete }: NewsIntroProps) {
    const [visibleCount, setVisibleCount] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        // Check if mobile on mount and window resize
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);

        const interval = setInterval(() => {
            setVisibleCount((prev) => {
                if (prev < NEWSPAPERS.length) {
                    return prev + 1;
                }
                clearInterval(interval);
                setTimeout(onComplete, 2500); // Give user time to see the full spread
                return prev;
            });
        }, 600);

        return () => {
            clearInterval(interval);
            window.removeEventListener('resize', checkMobile);
        };
    }, [onComplete]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden perspective-1000">
            {/* Artistic Background */}
            <div className="absolute inset-0 bg-[#050505] overflow-hidden">
                {/* 1. Scrolling Text Marquee (High Fashion Style) */}
                <motion.div
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
                    className="absolute top-1/2 -translate-y-1/2 whitespace-nowrap opacity-20 pointer-events-none select-none"
                    style={{ willChange: "transform" }}
                >
                    <div
                        className="text-[20vh] font-serif font-black text-transparent leading-none"
                        style={{ WebkitTextStroke: "1px rgba(255, 255, 255, 0.3)" }}
                    >
                        BREAKING NEWS • LATEST HEADLINES • PRESS COVERAGE • EXCLUSIVE INTERVIEW • BREAKING NEWS • LATEST HEADLINES • PRESS COVERAGE • EXCLUSIVE INTERVIEW •
                    </div>
                </motion.div>

                {/* 2. Paparazzi Flash Effects */}
                <div className="absolute inset-0 pointer-events-none">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.4, 0] }}
                        transition={{ duration: 0.1, repeat: Infinity, repeatDelay: 3, delay: 0.5 }}
                        className="absolute top-[10%] left-[20%] w-[400px] h-[400px] bg-white rounded-full blur-[100px]"
                    />
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.3, 0] }}
                        transition={{ duration: 0.1, repeat: Infinity, repeatDelay: 4.2, delay: 1.2 }}
                        className="absolute bottom-[20%] right-[10%] w-[300px] h-[300px] bg-white rounded-full blur-[80px]"
                    />
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: [0, 0.2, 0] }}
                        transition={{ duration: 0.1, repeat: Infinity, repeatDelay: 2.5, delay: 2.8 }}
                        className="absolute top-[40%] right-[30%] w-[200px] h-[200px] bg-white rounded-full blur-[60px]"
                    />
                </div>

                {/* Spotlight Effect */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_#000_90%)] opacity-80" />

                {/* Gold Particles/Dust */}
                <div className="absolute inset-0 opacity-20 bg-[url('/assets/noise.png')]" />
            </div>

            <div className="relative w-full h-full max-w-6xl mx-auto flex items-center justify-center">
                <AnimatePresence>
                    {NEWSPAPERS.slice(0, visibleCount).map((paper, index) => (
                        <motion.div
                            key={paper.id}
                            initial={{
                                y: -1200,
                                x: (isMobile ? paper.x * 0.3 : paper.x) + (Math.random() * (isMobile ? 20 : 50) - (isMobile ? 10 : 25)),
                                opacity: 0,
                                rotate: Math.random() * 60 - 30,
                                scale: 1.5
                            }}
                            animate={{
                                y: isMobile ? paper.y * 0.4 : paper.y,
                                x: isMobile ? paper.x * 0.3 : paper.x,
                                opacity: 1,
                                rotate: paper.rotate,
                                scale: isMobile ? paper.scale * 0.8 : paper.scale
                            }}
                            transition={{
                                type: "spring",
                                stiffness: 120,
                                damping: 15,
                                mass: 1
                            }}
                            style={{
                                zIndex: index,
                            }}
                            className="absolute shadow-[0_20px_50px_rgba(0,0,0,0.5)]"
                        >
                            {/* Sticker Effect Container */}
                            <div className="p-3 bg-white rounded-xl shadow-sm rotate-1">
                                <div className="relative w-[280px] md:w-[350px] aspect-[3/4] overflow-hidden bg-gray-100">
                                    <img
                                        src={paper.src}
                                        alt="News Clipping"
                                        className="w-full h-full object-contain filter contrast-[1.1] sepia-[0.1]"
                                    />
                                    {/* Glossy overlay */}
                                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent opacity-50 pointer-events-none" />
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: visibleCount >= 1 ? 1 : 0, y: 0 }}
                className="absolute bottom-12 left-0 right-0 text-center"
            >
                <div className="inline-block px-4 py-2 rounded-full border border-gold/20 bg-black/40 backdrop-blur-md text-gold/80 font-serif tracking-[0.3em] text-xs uppercase shadow-lg">
                    Latest Headlines
                </div>
            </motion.div>
        </div>
    );
}
