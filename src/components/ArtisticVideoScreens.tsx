import React, { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { getDevicePower } from "@/utils/devicePower";

const CHANNEL_SUBSCRIBE_LINK = "https://www.youtube.com/channel/UCvyI4RHfXex8nchIYopXLOQ?sub_confirmation=1";

const VIDEOS = [
    {
        id: "KVtG3h480ZU",
        title: "Smart TV Experience",
        type: "smart-tv"
    },
    {
        id: "eYcyERjY9jU",
        title: "Projector Experience",
        type: "projector"
    },
    {
        id: "b7oGOR0s26k",
        title: "Vintage TV Experience",
        type: "vintage-tv"
    }
];

export default function ArtisticVideoScreens() {
    const containerRef = useRef<HTMLElement>(null);
    const [isLowPower, setIsLowPower] = useState(false);

    useEffect(() => {
        setIsLowPower(getDevicePower() === "low");
    }, []);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["0.2 1", "0.8 0"]
    });

    // Spring configuration for smooth interpolation (removes scroll jitter)
    // Simplify for low power devices
    const springConfig = isLowPower 
        ? { stiffness: 50, damping: 20 } 
        : { stiffness: 100, damping: 30, restDelta: 0.001 };
    const smoothProgress = useSpring(scrollYProgress, springConfig);

    // Projector Animations
    const projectorScaleY = useTransform(smoothProgress, [0.1, 0.4], [0, 1]);
    const projectorOpacity = useTransform(smoothProgress, [0.35, 0.45], [0, 1]);

    // Smart TV Animations
    const tvTurnOnScaleY = useTransform(smoothProgress, [0.3, 0.4, 0.45], [0, 0.02, 1]);
    const tvVideoOpacity = useTransform(smoothProgress, [0.45, 0.55], [0, 1]);
    const tvGlowOpacity = useTransform(smoothProgress, [0.45, 0.6], [0, 1]);
    const tvBoxShadow = useTransform(
        tvGlowOpacity,
        [0, 1],
        ["0 0 50px rgba(0,0,0,0.8)", "0 0 80px rgba(59,130,246,0.2)"]
    );

    // Vintage TV Animations
    const vintageTvOpacity = useTransform(smoothProgress, [0.4, 0.6], [0.2, 1]);
    const vintageTvSepia = useTransform(smoothProgress, [0.5, 0.7], [1, 0.3]);
    const vintageTvBrightness = useTransform(smoothProgress, [0.4, 0.6], [0.3, 1]);
    const vintageTvX = useTransform(smoothProgress, [0.3, 0.6], [50, 0]);
    const vintageTvRotate = useTransform(smoothProgress, [0.3, 0.6], [-5, 2]);

    return (
        <section ref={containerRef} className="py-24 bg-black relative overflow-hidden">
            {/* Ambient Background Glows */}
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-purple-900/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-900/20 rounded-full blur-[120px] pointer-events-none" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-gold/5 rounded-full blur-[150px] pointer-events-none" />

            <div className="container mx-auto px-6 relative z-10">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="text-center mb-20"
                >
                    <div className="inline-block p-1 px-4 rounded-full border border-white/20 bg-white/5 text-white text-xs font-serif tracking-[0.3em] uppercase mb-6 backdrop-blur-md">
                        Featured Visuals
                    </div>
                    <h2 className="font-serif text-4xl md:text-6xl mb-4 text-white leading-tight">
                        A Visual <span className="text-gold italic">Symphony</span>
                    </h2>
                    <p className="text-gray-400 max-w-2xl mx-auto text-lg">
                        Immerse yourself in our most viewed visual experiences across different cinematic eras. Click any screen to join the journey.
                    </p>
                </motion.div>

                {/* Video Screens Layout */}
                <div className="flex flex-col lg:flex-row items-center justify-center gap-16 lg:gap-12 xl:gap-20">

                    {/* 1. Projector Screen (Left - Hanging) */}
                    <motion.a
                        href={CHANNEL_SUBSCRIBE_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ y: -10 }}
                        className="relative group w-full max-w-sm lg:max-w-[18rem] xl:max-w-sm xl:-mt-20"
                    >
                        {/* Roller Bar */}
                        <div className="h-4 w-[110%] -ml-[5%] bg-gradient-to-b from-gray-300 via-gray-100 to-gray-400 rounded-full shadow-[0_5px_15px_rgba(0,0,0,0.5)] z-20 relative border border-white/20" />

                        {/* Connecting Strings */}
                        <div className="absolute -top-12 left-[10%] w-0.5 h-12 bg-white/20" />
                        <div className="absolute -top-12 right-[10%] w-0.5 h-12 bg-white/20" />

                        {/* Screen Canvas (Scroll Animated) */}
                        <motion.div
                            style={{ scaleY: projectorScaleY, opacity: 1 }}
                            className="relative bg-white pt-[56.25%] shadow-[0_20px_50px_rgba(255,255,255,0.05)] border-b-8 border-gray-200 overflow-hidden transform-gpu origin-top transition-transform duration-500 group-hover:scale-[1.02]"
                        >
                            {/* Content */}
                            <motion.div style={{ opacity: projectorOpacity }} className="absolute inset-2 bg-black overflow-hidden">
                                <img
                                    src={`https://img.youtube.com/vi/${VIDEOS[1].id}/maxresdefault.jpg`}
                                    alt="Projector Video"
                                    className="w-full h-full object-cover opacity-90 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
                                />
                                {/* Light Beam effect over image */}
                                <div className="absolute inset-0 bg-gradient-to-tr from-white/10 via-transparent to-transparent mix-blend-overlay pointer-events-none" />
                            </motion.div>

                            {/* Bottom Weight Bar */}
                            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-gray-300 via-white to-gray-300" />
                        </motion.div>

                        {/* Projection Light source ray */}
                        <motion.div style={{ opacity: projectorOpacity }} className="absolute -top-20 left-1/2 -translate-x-1/2 w-4 h-32 bg-gradient-to-b from-white/5 to-transparent blur-xl -z-10" />
                    </motion.a>

                    {/* 2. Smart TV (Center - Dominant) */}
                    <motion.a
                        href={CHANNEL_SUBSCRIBE_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        whileHover={{ scale: 1.05 }}
                        className="relative group w-full max-w-xl lg:max-w-lg xl:max-w-2xl z-20"
                    >
                        {/* TV Frame */}
                        <motion.div
                            style={{
                                boxShadow: tvBoxShadow,
                                willChange: "box-shadow"
                            }}
                            className="relative bg-[#0a0a0a] rounded-xl p-2 border border-white/10 transition-shadow duration-500 group-hover:shadow-[0_0_80px_rgba(255,255,255,0.2)] group-hover:border-white/20 transform-gpu"
                        >
                            {/* Screen */}
                            <div className="relative pt-[56.25%] bg-black rounded-lg overflow-hidden border border-white/5 flex items-center justify-center">

                                {/* Turn On Animation Layer */}
                                <motion.div
                                    style={{ scaleY: tvTurnOnScaleY, willChange: "transform" }}
                                    className="absolute inset-0 w-full h-full bg-white origin-center z-0"
                                />

                                <motion.img
                                    style={{ opacity: tvVideoOpacity, willChange: "opacity" }}
                                    src={`https://img.youtube.com/vi/${VIDEOS[0].id}/hqdefault.jpg`}
                                    alt="Smart TV Video"
                                    className="absolute inset-0 w-full h-full object-cover scale-100 group-hover:scale-110 transition-transform duration-700 z-10"
                                />
                                {/* Glossy Reflection */}
                                <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/10 to-transparent skew-y-[-10deg] origin-top-left pointer-events-none z-20" />

                                {/* Overlay Play Button */}
                                <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-30">
                                    <div className="w-16 h-16 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center border border-white/30">
                                        <div className="w-0 h-0 border-t-[8px] border-t-transparent border-l-[12px] border-l-white border-b-[8px] border-b-transparent ml-1" />
                                    </div>
                                </div>
                            </div>

                            {/* TV Stand/Base */}
                            <div className="absolute -bottom-6 left-1/2 -translate-x-1/2 w-32 h-6 flex flex-col items-center">
                                <div className="w-4 h-4 bg-gradient-to-b from-neutral-800 to-neutral-900 border-x border-white/10" />
                                <div className="w-full h-2 bg-gradient-to-b from-neutral-700 to-neutral-900 rounded-b-md border border-white/10 border-t-0 shadow-lg" />
                            </div>
                        </motion.div>
                    </motion.a>

                    {/* 3. Vintage TV (Right - Seated) */}
                    <motion.a
                        href={CHANNEL_SUBSCRIBE_LINK}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ x: vintageTvX, rotate: vintageTvRotate, willChange: "transform" }}
                        whileHover={{ rotate: 0, scale: 1.05 }}
                        className="relative group w-full max-w-xs lg:max-w-[16rem] xl:max-w-xs xl:mt-20 transform-gpu"
                    >
                        {/* Wooden Frame */}
                        <div className="relative bg-[#5a3a22] rounded-[2rem] p-4 lg:p-6 shadow-[inset_0_0_20px_rgba(0,0,0,0.8),0_20px_40px_rgba(0,0,0,0.6)] border-4 border-[#3a2212] overflow-hidden">

                            {/* Wood Grain Texture Overlay */}
                            <div className="absolute inset-0 opacity-20 pointer-events-none mix-blend-multiply bg-[url('https://www.transparenttextures.com/patterns/wood-pattern.png')]" />

                            <div className="flex gap-4">
                                {/* CRT Screen */}
                                <div className="flex-1 relative">
                                    {/* Curved Bezel */}
                                    <div className="absolute -inset-2 bg-neutral-900 rounded-[1.5rem] shadow-[inset_0_0_15px_rgba(0,0,0,1)]" />

                                    {/* The actual screen area */}
                                    <div className="relative pt-[75%] bg-black rounded-xl overflow-hidden border border-white/5 z-10 box-shadow-[inset_0_0_20px_rgba(255,255,255,0.2)]">
                                        <motion.img
                                            style={{
                                                filter: useTransform(vintageTvSepia, s => `contrast(1.25) sepia(${s}) brightness(${vintageTvBrightness.get()}) opacity(${vintageTvOpacity.get()})`),
                                                willChange: "filter"
                                            }}
                                            src={`https://img.youtube.com/vi/${VIDEOS[2].id}/maxresdefault.jpg`}
                                            alt="Vintage TV Video"
                                            className="absolute inset-0 w-full h-full object-cover group-hover:scale-110 group-hover:!sepia-0 transition-all duration-700"
                                        />

                                        {/* Scanlines Effect */}
                                        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0),rgba(255,255,255,0)_50%,rgba(0,0,0,0.1)_50%,rgba(0,0,0,0.1))] bg-[length:100%_4px] pointer-events-none opacity-50" />

                                        {/* CRT Glass Curvature Highlight */}
                                        <div className="absolute inset-0 bg-radial-gradient from-white/10 via-transparent to-black/60 pointer-events-none" />
                                    </div>
                                </div>

                                {/* Dials/Controls Area */}
                                <div className="w-12 flex flex-col items-center justify-around py-2 z-10 relative">
                                    {/* Dial 1 */}
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-300 to-gray-600 shadow-md border-2 border-gray-800 flex items-center justify-center transform group-hover:rotate-45 transition-transform duration-500">
                                        <div className="w-1 h-3 bg-gray-800 -mt-3 rounded-full" />
                                    </div>
                                    {/* Dial 2 */}
                                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-gray-300 to-gray-600 shadow-md border-2 border-gray-800 flex items-center justify-center transform group-hover:-rotate-45 transition-transform duration-500 delay-100">
                                        <div className="w-1 h-3 bg-gray-800 -mt-3 rounded-full" />
                                    </div>
                                    {/* Speaker Grill Holes */}
                                    <div className="grid grid-cols-2 gap-1 mt-2">
                                        {[...Array(6)].map((_, i) => (
                                            <div key={i} className="w-1.5 h-1.5 rounded-full bg-black/60 shadow-inner" />
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Antenna */}
                            <div className="absolute -top-16 left-8 w-1 h-20 bg-gray-400 rotate-[-15deg] origin-bottom shadow-sm hidden md:block">
                                <div className="absolute -top-1 -left-1 w-3 h-3 rounded-full bg-gray-300" />
                            </div>
                            <div className="absolute -top-12 left-12 w-1 h-16 bg-gray-400 rotate-[30deg] origin-bottom shadow-sm hidden md:block">
                                <div className="absolute -top-1 -left-1 w-3 h-3 rounded-full bg-gray-300" />
                            </div>
                        </div>
                    </motion.a>

                </div>

            </div>
        </section>
    );
}
