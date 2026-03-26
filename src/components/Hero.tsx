"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Play, Volume2, VolumeX } from "lucide-react";
import Link from "next/link";
import MusicalKeyText from "./MusicalKeyText";

export default function Hero() {
    const [isMuted, setIsMuted] = useState(true);

    return (
        <section className="relative h-screen w-full overflow-hidden">
            {/* Artistic Video Background - hj2.mp4 */}
            <div className="absolute inset-0 z-0 bg-black flex items-center justify-center">
                <video
                    autoPlay
                    loop
                    muted={isMuted}
                    playsInline
                    preload="metadata"
                    poster="/assets/splash-full.jpg"
                    className="w-full h-full object-cover md:object-contain pointer-events-none"
                    style={{ WebkitTransform: "translateZ(0)", transform: "translateZ(0)", willChange: "transform, opacity" }}
                >
                    <source src="/assets/hj2.mp4" type="video/mp4" />
                </video>

                {/* Performance optimized blur overlay instead of filtering the video directly */}
                <div className="absolute inset-0 backdrop-blur-[3px] bg-black/10 pointer-events-none" style={{ WebkitTransform: "translateZ(0)", transform: "translateZ(0)" }} />

                {/* Cinematic Vignette Overlay to frame the video artistically */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_50%,_rgba(0,0,0,0.6)_100%)] pointer-events-none" />

                {/* Very subtle gold glow at the bottom for theme integration */}
                <div className="absolute bottom-0 left-0 right-0 h-1/3 bg-gradient-to-t from-maroon/20 to-transparent pointer-events-none mix-blend-screen" />
            </div>

            {/* Mute/Unmute Control - Bottom Right */}
            <div className="absolute bottom-8 right-6 md:right-10 z-30">
                <button
                    onClick={() => setIsMuted(!isMuted)}
                    className="p-3 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white/70 hover:text-white hover:bg-black/60 transition-all duration-300 group"
                    aria-label={isMuted ? "Unmute video" : "Mute video"}
                >
                    {isMuted ? (
                        <VolumeX size={20} className="group-hover:scale-110 transition-transform" />
                    ) : (
                        <Volume2 size={20} className="group-hover:scale-110 transition-transform" />
                    )}
                </button>
            </div>

            {/* Content */}
            <div className="relative z-20 flex min-h-[100dvh] flex-col items-center justify-center px-4 text-center pb-20 md:pb-0">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1, delay: 0.5 }}
                    className="max-w-4xl flex flex-col items-center gap-1 md:gap-2"
                >
                    {/* Interactive "Keyboard" Title - Fluid Typography */}
                    <div className="font-serif italic text-[clamp(2.5rem,12vw,8rem)] leading-none drop-shadow-xl mb-2 md:mb-6">
                        <MusicalKeyText text="Himali" className="mr-2 md:mr-4 text-white" />
                        <MusicalKeyText text="Joshi" className="text-gold" goldHighlight={true} />
                    </div>

                    <h2 className="mb-6 md:mb-8 font-serif text-[clamp(1rem,4vw,2rem)] italic leading-tight text-white/90 drop-shadow-lg max-w-[90%]">
                        “Music is not just sound,<br /> <span className="text-gold drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]">it’s a feeling.</span>”
                    </h2>

                    <div className="flex flex-col md:flex-row items-center justify-center gap-6 mt-10">
                        <Link href="/contact#contact">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="group relative px-8 py-4 bg-gradient-to-r from-gold to-amber text-black rounded-full font-bold uppercase tracking-wider overflow-hidden shadow-[0_0_20px_rgba(255,191,0,0.3)]"
                            >
                                <span className="relative z-10 flex items-center gap-2">
                                    Book a Concert <ArrowRight size={20} />
                                </span>
                                <div className="absolute inset-0 -z-0 bg-white/40 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
                            </motion.button>
                        </Link>

                        <Link href="/music">
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="group px-8 py-4 border border-white/30 rounded-full font-light uppercase tracking-wider text-white backdrop-blur-sm hover:bg-white/10 transition-all"
                            >
                                <span className="flex items-center gap-2">
                                    Explore Music <Play size={18} fill="currentColor" />
                                </span>
                            </motion.button>
                        </Link>
                    </div>
                </motion.div>
            </div>

            {/* Scroll Down Indicator */}
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1, y: [0, 10, 0] }}
                transition={{ delay: 2, duration: 2, repeat: Infinity }}
                className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/50 pointer-events-none"
            >
                <span className="text-xs uppercase tracking-[0.2em]">Scroll</span>
            </motion.div>
        </section>
    );
}
