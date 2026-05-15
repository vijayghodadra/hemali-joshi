"use client";
import { motion } from "framer-motion";
import Image from "next/image";
import { Youtube, ExternalLink, Play, Heart } from "lucide-react";
import { youtubePosters } from "@/data/youtubeData";

export default function YoutubeCinematicGallery() {
    return (
        <section className="relative py-24 md:py-40 bg-black overflow-hidden perspective-2000">
            {/* Ambient Background Atmosphere */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-[800px] h-[800px] bg-red-900/10 rounded-full blur-[180px] opacity-30" />
                <div className="absolute bottom-1/4 right-1/4 w-[800px] h-[800px] bg-gold/5 rounded-full blur-[180px] opacity-20" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(0,0,0,0),rgba(0,0,0,0.8))]" />
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-24 md:mb-32">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-flex items-center gap-3 mb-6 bg-white/5 p-2 px-4 rounded-full border border-white/10 backdrop-blur-sm"
                    >
                        <Youtube className="text-red-600 w-5 h-5 animate-pulse" />
                        <span className="text-gold text-xs md:text-sm uppercase tracking-[0.5em] font-bold">Kinetic Chronicles</span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="font-serif text-4xl md:text-7xl text-white mb-8 leading-tight tracking-tight text-glow"
                    >
                        Take a <span className="text-gold italic font-light">Look</span>
                    </motion.h2>

                    <div className="h-px w-24 bg-gradient-to-r from-transparent via-red-600 to-transparent mx-auto mb-8" />
                </div>

                {/* The Kinetic Sculpture Grid */}
                <div className="flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-8 xl:gap-16">
                    {youtubePosters.map((poster, index) => (
                        <DeviceCard key={poster.id} poster={poster} index={index} />
                    ))}
                </div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="mt-32 text-center"
                >
                    <a
                        href="https://www.youtube.com/channel/UCvyI4RHfXex8nchIYopXLOQ"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative inline-flex items-center gap-6 bg-red-600 border border-red-600/50 p-5 px-12 rounded-full transition-all duration-500 hover:scale-105 hover:shadow-[0_0_40px_rgba(220,38,38,0.5)] overflow-hidden"
                    >
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
                        <Youtube className="text-white w-8 h-8 group-hover:rotate-12 transition-transform duration-300" />
                        <span className="text-white uppercase tracking-[0.3em] text-sm font-black">Join the Journey</span>
                        <div className="flex gap-1 ml-2">
                            <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.1s]" />
                            <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.3s]" />
                            <div className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:-0.5s]" />
                        </div>
                    </a>
                </motion.div>
            </div>
        </section>
    );
}

function DeviceCard({ poster, index }: { poster: any; index: number }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.2, duration: 0.8 }}
            className="perspective-1000 group cursor-pointer w-full max-w-[320px] mx-auto"
        >
            <motion.div
                className="relative flex justify-center"
                whileHover={{
                    scale: 1.05,
                    rotateY: 5,
                    rotateX: 5,
                    zIndex: 50
                }}
                transition={{ type: "spring", stiffness: 300, damping: 20 }}
            >
                <a href={poster.href} target="_blank" rel="noopener noreferrer" className="block relative z-50 w-full h-full flex justify-center">
                    {poster.device === 'ios' && <IosFrame><ScreenContent poster={poster} /></IosFrame>}
                    {poster.device === 'android' && <AndroidFrame><ScreenContent poster={poster} /></AndroidFrame>}
                    {poster.device === 'tablet' && <TabletFrame><ScreenContent poster={poster} /></TabletFrame>}
                </a>

                {/* Float shadow */}
                <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-black/50 blur-xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            </motion.div>
        </motion.div>
    );
}

function ScreenContent({ poster }: { poster: any }) {
    return (
        <div className="relative w-full h-full bg-black overflow-hidden perspective-1000"> {/* Set base bg to black */}

            {/* Screen Wake Animation Wrapper */}
            <motion.div
                initial={{ opacity: 0, filter: "brightness(0)" }}
                whileInView={{ opacity: 1, filter: "brightness(1)" }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{
                    duration: 1.5,
                    ease: [0.22, 1, 0.36, 1], // Custom cubic-bezier for "turn on" feel
                    delay: 0.2
                }}
                className="w-full h-full relative"
            >
                {/* Animated Signature Background - Moved to top black space */}
                <div className="absolute inset-x-0 top-0 h-[30%] flex items-center justify-center z-20 opacity-90 pointer-events-none p-2">
                    <div className="relative w-full h-full flex items-center justify-center">
                        <svg viewBox="0 0 300 100" className="w-full h-full max-h-[60px]">
                            <motion.text
                                x="50%"
                                y="60%"
                                textAnchor="middle"
                                dominantBaseline="middle"
                                stroke="white"
                                strokeWidth="1.5"
                                fill="white"
                                className="font-[family-name:var(--font-great-vibes)] text-5xl"
                                initial={{ strokeDasharray: 1000, strokeDashoffset: 1000, fillOpacity: 0 }}
                                whileInView={{ strokeDashoffset: 0, fillOpacity: 1 }}
                                viewport={{ once: true }}
                                transition={{
                                    strokeDashoffset: { duration: 2.5, ease: "easeInOut", delay: 1.2 }, // Delayed to start after screen wake
                                    fillOpacity: { duration: 1, delay: 3 }
                                }}
                                style={{ filter: 'drop-shadow(0 0 5px rgba(255,255,255,0.5))' }}
                            >
                                {poster.topText || 'Himali Joshi'}
                            </motion.text>
                        </svg>
                    </div>
                </div>

                {/* Main Image */}
                <Image
                    src={poster.src}
                    alt={poster.title}
                    fill
                    className="object-contain brightness-[0.8] group-hover:brightness-100 transition-all duration-500 mt-8"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />

                {/* Play Button Overlay */}
                <div className="absolute inset-0 flex items-center justify-center z-30">
                    <div className="relative w-14 h-14 rounded-full border border-white/30 flex items-center justify-center backdrop-blur-sm bg-black/30 group-hover:bg-red-600/90 group-hover:scale-110 transition-all duration-300">
                        <Play className="text-white fill-white w-5 h-5 ml-1" />
                    </div>
                </div>

                {/* Screen Reflection / Glare */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent pointer-events-none z-40" />
            </motion.div>


            {/* Gesture Animation Layer - Ghost Touch Sequence */}
            <InteractionLayer />

            {/* Startup Flash (Optional, for that CRT/OLED turn-on feel) */}
            <motion.div
                initial={{ opacity: 0 }}
                whileInView={{ opacity: [0, 0.6, 0] }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, times: [0, 0.1, 1], delay: 1.8 }} // Flash happens AFTER gesture
                className="absolute inset-0 bg-white pointer-events-none z-60 mix-blend-overlay"
            />
        </div>
    );
}

function InteractionLayer() {
    return (
        <motion.div
            className="absolute inset-0 z-50 pointer-events-none"
            initial="idle"
            whileInView="animate"
            viewport={{ once: true, margin: "-100px" }}
        >
            {/* 1. Slide to Unlock Hint */}
            <motion.div
                variants={{
                    idle: { opacity: 0 },
                    animate: { opacity: [0, 1, 0], transition: { duration: 1.5, times: [0, 0.2, 1], delay: 0.5 } }
                }}
                className="absolute inset-x-0 bottom-10 flex flex-col items-center justify-end"
            >
                <motion.div
                    animate={{ y: [0, -40] }}
                    transition={{ duration: 1.2, ease: "easeOut", delay: 0.5 }}
                    className="flex flex-col items-center gap-2"
                >
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30 shadow-lg">
                        <div className="w-8 h-8 bg-white/80 rounded-full" />
                    </div>
                    <span className="text-white/70 text-xs uppercase tracking-widest font-medium text-shadow-sm">Slide to Open</span>
                </motion.div>
            </motion.div>

            {/* 2. Ghost Finger Animation Sequence */}
            <GhostFinger />

            {/* 3. Double Tap Heart Reaction */}
            <motion.div
                className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                variants={{
                    idle: { opacity: 0, scale: 0 },
                    animate: {
                        opacity: [0, 1, 0],
                        scale: [0.5, 1.2, 1.5],
                        transition: { duration: 0.8, times: [0, 0.1, 1], delay: 3.2 } // Appears after double tap
                    }
                }}
            >
                <Heart className="w-24 h-24 text-white fill-white drop-shadow-xl" />
            </motion.div>
        </motion.div>
    );
}

function GhostFinger() {
    return (
        <motion.div
            className="absolute w-12 h-12 rounded-full border-2 border-white/50 bg-white/20 backdrop-blur-sm shadow-[0_0_15px_rgba(255,255,255,0.3)] z-50 flex items-center justify-center"
            variants={{
                idle: { opacity: 0, x: "50%", y: "110%" }, // Start off-screen bottom
                animate: {
                    opacity: [0, 1, 1, 1, 0],
                    x: ["50%", "50%", "50%", "50%", "50%"], // Center horizontally
                    y: ["90%", "30%", "40%", "40%", "50%"], // Slide up -> Center -> Wait -> Center for play
                    scale: [1, 1, 0.9, 0.9, 1], // Tap effect
                    transition: {
                        duration: 4,
                        times: [0, 0.2, 0.7, 0.8, 1], // Timing of gestures
                        ease: "easeInOut",
                        delay: 1 // Start after initial "Slide to Open" hint
                    }
                }
            }}
        >
            {/* Tap Ripple Effect */}
            <motion.div
                className="absolute inset-0 rounded-full border border-white/80"
                variants={{
                    idle: { opacity: 0, scale: 1 },
                    animate: {
                        opacity: [0, 1, 0, 0, 1, 0], // Double tap ripples
                        scale: [1, 1.5, 1, 1.5],
                        transition: {
                            duration: 1,
                            delay: 3, // Sync with double tap position
                            repeat: 0
                        }
                    }
                }}
            />
        </motion.div>
    );
}

function IosFrame({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative w-full max-w-[280px] aspect-[280/580] bg-[#1a1a1a] rounded-[50px] border-[8px] border-[#2a2a2a] shadow-2xl overflow-hidden ring-1 ring-white/10 mx-auto">
            {/* Dynamic Island */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-[30%] h-[5%] bg-black rounded-full z-40 flex items-center justify-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-[#112]" />
            </div>
            {/* Screen */}
            <div className="absolute inset-1 rounded-[42px] overflow-hidden bg-black">
                {children}
            </div>
            {/* Home Indicator */}
            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 w-[35%] h-1 bg-white/20 rounded-full z-40" />
        </div>
    );
}

function AndroidFrame({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative w-full max-w-[290px] aspect-[290/600] bg-[#1a1a1a] rounded-[30px] border-[4px] border-[#2a2a2a] shadow-2xl overflow-hidden ring-1 ring-white/10 mx-auto">
            {/* Punch hole camera */}
            <div className="absolute top-4 left-1/2 -translate-x-1/2 w-3 h-3 bg-black rounded-full z-40 ring-1 ring-white/5" />
            {/* Screen */}
            <div className="absolute inset-1 rounded-[24px] overflow-hidden bg-black">
                {children}
            </div>
        </div>
    );
}

function TabletFrame({ children }: { children: React.ReactNode }) {
    return (
        <div className="relative w-full max-w-[400px] aspect-[400/540] bg-[#1a1a1a] rounded-[24px] border-[12px] border-[#2a2a2a] shadow-2xl overflow-hidden ring-1 ring-white/10 mx-auto">
            {/* Camera - landscape top */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-3 bg-transparent z-40 flex items-center justify-center">
                <div className="w-1.5 h-1.5 bg-black rounded-full opacity-50" />
            </div>
            {/* Screen */}
            <div className="absolute inset-0 rounded-[12px] overflow-hidden bg-black">
                {children}
            </div>
        </div>
    );
}


