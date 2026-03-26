"use client";
import React from "react";
import { motion } from "framer-motion";

interface ThreeDAlbumProps {
    coverImage: string;
    compact?: boolean;
    isSpinning?: boolean;
    fullImage?: boolean;
}

export default function ThreeDAlbum({ coverImage, compact = false, isSpinning = false, fullImage = false }: ThreeDAlbumProps) {
    const sizeClasses = compact
        ? "w-[160px] h-[160px] md:w-[200px] md:h-[200px]"
        : "w-[300px] h-[300px] md:w-[400px] md:h-[400px]";

    return (
        <div className={`relative ${sizeClasses} group mx-auto perspective-1000`}>
            {/* Vintage CD Jewel Case (The Container) */}
            <motion.div
                className="absolute inset-0 z-10 bg-white/5 backdrop-blur-sm rounded-lg border border-white/20 shadow-2xl overflow-hidden"
                whileHover={{ rotateY: -10, rotateX: 5 }}
                transition={{ type: "spring", stiffness: 100 }}
            >
                {/* Glossy Plastic Texture */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-black/30 pointer-events-none" />
                <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-white/5 to-transparent pointer-events-none" />
            </motion.div>

            {/* The Vintage CD (Silver Disc) */}
            <motion.div
                className="absolute top-[5%] left-[5%] w-[90%] h-[90%] rounded-full z-20 shadow-2xl flex items-center justify-center overflow-hidden"
                initial={{ rotate: 0, x: 0 }}
                animate={isSpinning ? { rotate: 360 } : {}}
                whileHover={{
                    x: typeof window !== 'undefined' && window.innerWidth > 768 ? "30%" : 0,
                    scale: 1.05
                }}
                transition={isSpinning ? {
                    rotate: { duration: 4, repeat: Infinity, ease: "linear" },
                    x: { duration: 0.6, ease: "easeOut" }
                } : { duration: 0.6, ease: "easeOut" }}
            >
                {/* Silver Prismatic Base */}
                <div className="absolute inset-0 bg-[#e2e8f0]" />
                <div
                    className="absolute inset-0 opacity-60 mix-blend-color-dodge ring-offset-black"
                    style={{
                        background: `conic-gradient(
                            from 0deg,
                            rgba(255,0,0,0.3) 0deg,
                            rgba(255,255,0,0.3) 60deg,
                            rgba(0,255,0,0.3) 120deg,
                            rgba(0,255,255,0.3) 180deg,
                            rgba(0,0,255,0.3) 240deg,
                            rgba(255,0,255,0.3) 300deg,
                            rgba(255,0,0,0.3) 360deg
                        )`
                    }}
                />

                {/* Concentric Disc Rings */}
                <div className="absolute inset-0 rounded-full border-[1px] border-black/5 opacity-50" />
                <div className="absolute inset-2 rounded-full border-[1px] border-black/5 opacity-40" />
                <div className="absolute inset-4 rounded-full border-[1px] border-black/5 opacity-30" />

                {/* Circular Cursive Signature Text */}
                <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                    <svg viewBox="0 0 100 100" className="w-full h-full rotate-[-90deg]">
                        <defs>
                            <path
                                id="curvePath"
                                d="M 50, 50 m -38, 0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
                            />
                        </defs>
                        <text className="fill-black/80 font-serif italic text-[8px] uppercase tracking-[0.3em]" style={{ fontFamily: "'Dancing Script', cursive, serif" }}>
                            <textPath xlinkHref="#curvePath" startOffset="25%" textAnchor="middle">
                                Himali Joshi
                            </textPath>
                        </text>
                        <text className="fill-black/80 font-serif italic text-[8px] uppercase tracking-[0.3em]" style={{ fontFamily: "'Dancing Script', cursive, serif" }}>
                            <textPath xlinkHref="#curvePath" startOffset="75%" textAnchor="middle">
                                Himali Joshi
                            </textPath>
                        </text>
                    </svg>
                </div>

                {/* Cover Image as Disc Label */}
                <div className="absolute inset-0 z-10 flex items-center justify-center">
                    <div className={`${fullImage ? "w-full h-full" : "w-[60%] h-[60%]"} rounded-full overflow-hidden border-2 border-white/20 shadow-inner group-hover:scale-105 transition-transform duration-700`}>
                        <img
                            src={coverImage}
                            alt="Disc Label"
                            className="w-full h-full object-cover grayscale-[0.2] contrast-[1.2]"
                        />
                        {/* Overlay to blend image into disc */}
                        <div className="absolute inset-0 bg-gradient-to-tr from-white/10 to-transparent mix-blend-overlay" />
                    </div>
                </div>

                {/* Center Hole / Hub - Hidden if fullImage is true */}
                {!fullImage && (
                    <div className="absolute w-[18%] h-[18%] rounded-full bg-black/10 backdrop-blur-md border-4 border-white/30 flex items-center justify-center z-30 shadow-inner">
                        <div className="w-[40%] h-[40%] rounded-full bg-white/20 border border-white/40" />
                    </div>
                )}

                {/* Prismatic Shine Reflection */}
                <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_40%,rgba(255,255,255,0.4)_50%,transparent_60%)] opacity-50 pointer-events-none" />
            </motion.div>

            {/* Back Glow Effect */}
            <div className="absolute inset-0 z-0 bg-white/10 blur-[50px] rounded-full opacity-0 group-hover:opacity-40 transition-opacity duration-700" />
        </div>
    );
}
