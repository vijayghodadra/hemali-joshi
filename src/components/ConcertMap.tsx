"use client";
import React from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { Globe, MapPin } from "lucide-react";
import dynamic from "next/dynamic";

const WorldMap3D = dynamic(() => import("./WorldMap3D"), { ssr: false });

const LOCATIONS = [
    { name: "INDIA", x: "68%", y: "45%", status: "done", color: "#FFD700" },
    { name: "USA", x: "18%", y: "38%", status: "done", color: "#FFD700" },
    { name: "UK", x: "47%", y: "25%", status: "done", color: "#FFD700" },
    { name: "DUBAI", x: "58%", y: "42%", status: "done", color: "#FFD700" },
    { name: "Australia", x: "85%", y: "75%", status: "soon", color: "#ffffff" },
    { name: "Canada", x: "15%", y: "22%", status: "soon", color: "#ffffff" },
    { name: "Europe", x: "50%", y: "30%", status: "soon", color: "#ffffff" },
];

export default function ConcertMap() {
    // Mobile optimization: Height and spacing adjusted
    return (
        <section className="py-8 md:py-16 bg-black overflow-hidden relative border-t border-white/5">
            <div className="container mx-auto px-4 md:px-6">

                {/* Heading Area */}
                <div className="text-center mb-4 md:mb-8 relative z-10">
                    <motion.span
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        className="text-gold text-xs md:text-sm tracking-[0.3em] uppercase mb-2 md:mb-4 block font-bold"
                    >
                        Global Presence
                    </motion.span>
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="text-3xl md:text-5xl font-serif text-white mb-2 md:mb-4"
                    >
                        Concert <span className="text-gold italic">Destinations</span>
                    </motion.h2>
                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="text-sm md:text-base text-gray-400 max-w-2xl mx-auto italic px-4"
                    >
                        Spreading the magic of melodies across continents. From vibrant stages in India to grand tours in USA, UK, and Dubai.
                    </motion.p>
                </div>

                {/* 3D Map Container - Flags Only */}
                <div
                    className="relative h-[250px] md:h-[400px] w-full flex items-center justify-center -mt-2 mb-2"
                >
                    <div className="absolute inset-0 z-0">
                        <WorldMap3D />
                    </div>

                    {/* Subtle Texture Overlay */}
                    <div className="absolute inset-0 opacity-[0.03] pointer-events-none p-4 md:p-12 overflow-hidden z-10">
                        <div className="w-full h-full bg-[radial-gradient(#FFD700_1px,transparent_1px)] bg-[size:40px_40px]" />
                    </div>

                    {/* Decorative Background Elements */}
                    <div className="absolute -top-20 -left-20 w-80 h-80 bg-gold/10 rounded-full filter blur-3xl mix-blend-screen animate-pulse-slow" />
                    <div className="absolute -bottom-20 -right-20 w-80 h-80 bg-gold/5 rounded-full filter blur-3xl mix-blend-screen" />

                    {/* Placeholder or Static content could go here if requested. For now, just decorative space. */}
                </div>

                {/* Coming Soon List */}
                <div className="mt-12 flex flex-wrap justify-center gap-8 opacity-60">
                    <a href="/tours" className="text-[10px] tracking-[0.3em] uppercase text-white font-medium flex items-center gap-2 hover:opacity-80 transition-opacity">
                        <span className="w-1.5 h-1.5 rounded-full bg-gold" /> Past Concerts
                    </a>
                    <a href="/tours" className="text-[10px] tracking-[0.3em] uppercase text-white/50 font-medium flex items-center gap-2 hover:opacity-80 transition-opacity">
                        <span className="w-1.5 h-1.5 rounded-full bg-white/20" /> Coming Soon
                    </a>
                </div>
            </div>
        </section>
    );
}
