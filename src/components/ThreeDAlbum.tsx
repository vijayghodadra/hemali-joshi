"use client";
import React from "react";
import { motion } from "framer-motion";

interface ThreeDAlbumProps {
    coverImage: string;
    compact?: boolean;
    isSpinning?: boolean;
    fullImage?: boolean;
}

export default function ThreeDAlbum({ coverImage, compact = false }: ThreeDAlbumProps) {
    const sizeClasses = compact
        ? "w-[160px] h-[160px] md:w-[200px] md:h-[200px]"
        : "w-[300px] h-[300px] md:w-[400px] md:h-[400px]";

    const roundedClass = compact ? "rounded-2xl" : "rounded-3xl";

    return (
        <div className={`relative ${sizeClasses} group mx-auto perspective-1000`}>
            {/* Ambient Back Glow */}
            <div className="absolute inset-0 z-0 bg-gold/5 blur-[30px] rounded-3xl opacity-0 group-hover:opacity-60 transition-opacity duration-700" />
            
            {/* Ambient Border Glow */}
            <div className={`absolute -inset-0.5 bg-gradient-to-tr from-gold/40 via-white/5 to-gold/40 rounded-3xl opacity-0 group-hover:opacity-100 blur-md transition-all duration-700 -z-10`} />

            {/* The Album Cover Container */}
            <motion.div
                className={`relative w-full h-full z-10 bg-zinc-900 ${roundedClass} border border-white/15 overflow-hidden shadow-[0_15px_35px_rgba(0,0,0,0.6)] group-hover:shadow-[0_25px_50px_rgba(0,0,0,0.8)] transition-all duration-500`}
                whileHover={{ 
                    rotateY: -8, 
                    rotateX: 6,
                    scale: 1.03
                }}
                transition={{ type: "spring", stiffness: 150, damping: 20 }}
            >
                {/* Album Cover Image */}
                <img
                    src={coverImage}
                    alt="Album Cover"
                    className="w-full h-full object-contain select-none"
                />

                {/* Glossy Glass Reflection Overlay */}
                <div className="absolute inset-0 bg-gradient-to-tr from-white/5 via-transparent to-black/40 pointer-events-none" />

                {/* Dynamic Diagonal Glare Sweep on Hover */}
                <div className="absolute inset-0 bg-[linear-gradient(135deg,transparent_30%,rgba(255,255,255,0.12)_45%,rgba(255,255,255,0.22)_50%,rgba(255,255,255,0.12)_55%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                
                {/* Vinyl Grooves Overlay for subtle music vibe */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(255,255,255,0.02)_60%,transparent_80%)] mix-blend-overlay pointer-events-none" />
            </motion.div>
        </div>
    );
}
