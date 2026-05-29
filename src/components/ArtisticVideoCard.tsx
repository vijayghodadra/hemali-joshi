"use client";
import React, { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Volume2, VolumeX } from "lucide-react";
import { getDevicePower } from "@/utils/devicePower";

interface ArtisticVideoCardProps {
    src: string;
    title: string;
    description?: string;
    onClick: () => void;
    year?: string;
    tag?: string;
    poster?: string;
    objectFit?: "cover" | "contain";
    objectPosition?: string;
}

export default function ArtisticVideoCard({ src, title, description, onClick, year = "2024", tag = "Performance", poster, objectFit = "cover", objectPosition = "object-center" }: ArtisticVideoCardProps) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [isMuted, setIsMuted] = useState(true);
    const [actualSrc, setActualSrc] = useState(src);

    useEffect(() => {
        if (getDevicePower() === "low" && src.includes("hj2.mp4")) {
            setActualSrc("/assets/hj2_low.mp4");
        } else {
            setActualSrc(src);
        }
    }, [src]);

    // Auto-play logic with delay on hover
    useEffect(() => {
        let timeout: NodeJS.Timeout;

        if (isHovered && videoRef.current) {
            timeout = setTimeout(() => {
                videoRef.current?.play().then(() => setIsPlaying(true)).catch(() => { });
            }, 600);
        } else {
            if (videoRef.current) {
                videoRef.current.pause();
                videoRef.current.currentTime = 0;
                setIsPlaying(false);
            }
        }

        return () => clearTimeout(timeout);
    }, [isHovered]);

    const toggleMute = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (videoRef.current) {
            videoRef.current.muted = !isMuted;
            setIsMuted(!isMuted);
        }
    };

    return (
        <motion.div
            className="group relative w-full cursor-pointer"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={onClick}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
        >
            {/* Video Container with Elegant Border */}
            <div className="relative aspect-video w-full overflow-hidden rounded-sm border border-white/10 transition-all duration-500 group-hover:border-gold/30 group-hover:shadow-[0_0_30px_-10px_rgba(212,175,55,0.15)]">
                {/* Overlay Gradient */}
                <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-40" />

                {/* Play Icon - Centered and subtle */}
                <div className="absolute inset-0 z-20 flex items-center justify-center opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:scale-110 pointer-events-none">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/20 bg-black/40 backdrop-blur-sm transition-transform duration-300">
                        <Play size={20} className="fill-white text-white ml-1" />
                    </div>
                </div>

                {/* Mute Toggle Button */}
                <AnimatePresence>
                    {isPlaying && isHovered && (
                        <motion.button
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.8 }}
                            onClick={toggleMute}
                            className="absolute bottom-3 right-3 z-30 p-2 rounded-full bg-black/50 backdrop-blur-md border border-white/10 text-white/80 hover:text-white hover:bg-black/70 transition-colors"
                        >
                            {isMuted ? <VolumeX size={14} /> : <Volume2 size={14} />}
                        </motion.button>
                    )}
                </AnimatePresence>

                {/* Static Placeholder */}
                {poster ? (
                    <img 
                        src={poster}
                        alt={title}
                        loading="lazy"
                        decoding="async"
                        className={`h-full w-full ${objectFit === "contain" ? "object-contain bg-black" : `object-cover ${objectPosition}`} transition-transform duration-700 group-hover:scale-105 ${isPlaying ? "opacity-0" : "opacity-100"}`}
                    />
                ) : (
                    <video
                        src={`${actualSrc}#t=1.0`}
                        className={`h-full w-full ${objectFit === "contain" ? "object-contain bg-black" : `object-cover ${objectPosition}`} transition-transform duration-700 group-hover:scale-105 ${isPlaying ? "opacity-0" : "opacity-100"}`}
                        preload="none"
                    />
                )}

                {/* Hover Auto-play Video */}
                <video
                    ref={videoRef}
                    src={actualSrc}
                    className={`absolute inset-0 h-full w-full ${objectFit === "contain" ? "object-contain bg-black" : `object-cover ${objectPosition}`} transition-opacity duration-500 ${isPlaying ? "opacity-100" : "opacity-0"}`}
                    muted={isMuted}
                    playsInline
                    loop
                    preload="none"
                />
            </div>

            {/* Metadata Section - Minimal and Clean */}
            <div className="mt-4 flex flex-col gap-1 px-1">
                <div className="flex items-center justify-between">
                    <h3 className="font-serif text-lg tracking-wide text-white transition-colors duration-300 group-hover:text-gold">
                        {title}
                    </h3>
                    <span className="text-[10px] uppercase tracking-widest text-white/40">{year}</span>
                </div>

            </div>
        </motion.div>
    );
}
