"use client";
import { Star, MapPin, Calendar, ArrowRight } from "lucide-react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useState, useEffect } from "react";
import Footer from "@/components/Footer";
import EventsHeaderTitle from "@/components/EventsHeaderTitle";

export default function ToursContent() {
    // Mouse tracking for parallax
    const mouseX = useMotionValue(0.5);
    const mouseY = useMotionValue(0.5);

    const springConfig = { damping: 30, stiffness: 100 };
    const springX = useSpring(mouseX, springConfig);
    const springY = useSpring(mouseY, springConfig);

    // Subtle parallax shifts
    const translateX = useTransform(springX, [0, 1], [-20, 20]);
    const translateY = useTransform(springY, [0, 1], [-20, 20]);
    const rotateX = useTransform(springY, [0, 1], [5, -5]);
    const rotateY = useTransform(springX, [0, 1], [-5, 5]);

    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleMouseMove = (e: React.MouseEvent) => {
        const { currentTarget, clientX, clientY } = e;
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        mouseX.set((clientX - left) / width);
        mouseY.set((clientY - top) / height);
    };

    // Parallax styles only applied on client to avoid hydration mismatch
    const parallaxStyle = mounted ? {
        x: translateX,
        y: translateY,
        rotateX,
        rotateY
    } : {};

    return (
        <main
            onMouseMove={handleMouseMove}
            className="min-h-screen bg-black text-white pt-24 selection:bg-gold selection:text-black overflow-x-hidden"
        >
            {/* Hero Section */}
            <section className="relative px-6 py-20 text-center container mx-auto">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-gold/50" />

                <EventsHeaderTitle />
                <p className="text-xl md:text-2xl text-gold/80 font-serif italic tracking-wider mb-12">
                    Performing on stages across the globe.
                </p>

                <div className="flex justify-center">
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-50" />
                </div>
            </section>

            {/* Artistic Events List */}
            <section className="container mx-auto px-6 pb-24 max-w-5xl">
                <div className="grid gap-8">
                    {/* Event 1 */}
                    <div className="group relative bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:bg-white/10 transition-all duration-500">
                        <div className="absolute inset-0 bg-gradient-to-r from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                            <div className="text-center md:text-left flex-1 w-full">
                                <span className="inline-block px-3 py-1 border border-gold/30 rounded-full text-xs uppercase tracking-widest text-gold mb-4">International</span>
                                <h3 className="text-3xl md:text-5xl font-serif mb-2 text-white">Event at Dubai</h3>
                                <p className="text-gray-400 flex items-center justify-center md:justify-start gap-2 mb-4">
                                    <MapPin size={16} className="text-gold" /> Dubai, UAE
                                </p>

                                {/* Classic Cinematic Stack Gallery with Parallax */}
                                <div className="relative mt-4 md:-mt-4 min-h-[350px] md:min-h-[420px] flex items-center justify-center">
                                    <div className="relative w-full h-full max-w-[600px] perspective-1000">
                                        {/* Background Wide Image - Classic Frame */}
                                        <motion.div
                                            initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                            whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                            whileHover={{ rotateX: -2, rotateY: 2, scale: 1.02, transition: { duration: 0.4 } }}
                                            transition={{ duration: 0.8, ease: "easeOut" }}
                                            viewport={{ once: true }}
                                            className="relative w-full aspect-[16/9] rounded-xl overflow-hidden border-2 border-gold/20 shadow-[0_40px_80px_rgba(0,0,0,0.8)] z-0"
                                            style={{ transformStyle: "preserve-3d" }}
                                        >
                                            <img
                                                src="/assets/tours/dubai/dubai2.JPG"
                                                alt="Dubai Event Background"
                                                className="w-full h-full object-cover brightness-75 group-hover:brightness-90 transition-all duration-700"
                                            />
                                            <div className="absolute inset-0 ring-1 ring-inset ring-gold/30 rounded-xl" />
                                        </motion.div>

                                        {/* Floating Portrait 1 - Sensitive to parallax */}
                                        <motion.div
                                            initial={{ opacity: 0, x: -50, rotate: -5 }}
                                            whileInView={{ opacity: 1, x: -20, rotate: -2 }}
                                            whileHover={{ scale: 1.1, rotate: 0, zIndex: 40, y: -10 }}
                                            animate={{
                                                y: [0, -5, 0],
                                                rotate: [-2, -1, -2]
                                            }}
                                            transition={{
                                                y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                                                rotate: { duration: 5, repeat: Infinity, ease: "easeInOut" },
                                                default: { duration: 0.6, type: "spring" }
                                            }}
                                            style={{ ...parallaxStyle }}
                                            className="absolute -left-4 md:-left-12 top-1/4 w-[160px] md:w-[220px] aspect-[3/4] rounded-lg overflow-hidden border-[1px] border-gold/40 shadow-2xl z-10 bg-black"
                                        >
                                            <img
                                                src="/assets/tours/dubai/dubai1.JPG"
                                                alt="Dubai Performance"
                                                className="w-full h-full object-cover"
                                            />
                                        </motion.div>

                                        {/* Floating Portrait 2 - Sensitive to parallax */}
                                        <motion.div
                                            initial={{ opacity: 0, x: 50, rotate: 5 }}
                                            whileInView={{ opacity: 1, x: 20, rotate: 2 }}
                                            whileHover={{ scale: 1.1, rotate: 0, zIndex: 40, y: -10 }}
                                            animate={{
                                                y: [0, 5, 0],
                                                rotate: [2, 3, 2]
                                            }}
                                            transition={{
                                                y: { duration: 4, delay: 1, repeat: Infinity, ease: "easeInOut" },
                                                rotate: { duration: 5, delay: 0.5, repeat: Infinity, ease: "easeInOut" },
                                                default: { duration: 0.6, type: "spring" }
                                            }}
                                            viewport={{ once: true }}
                                            style={{ ...parallaxStyle }}
                                            className="absolute -right-4 md:-right-12 bottom-1/4 w-[160px] md:w-[220px] aspect-[3/4] rounded-lg overflow-hidden border-[1px] border-gold/40 shadow-2xl z-20 bg-black"
                                        >
                                            <img
                                                src="/assets/tours/dubai/dubai3.JPG"
                                                alt="Dubai Stage"
                                                className="w-full h-full object-cover"
                                            />
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                            <div className="w-full md:w-auto border-t md:border-t-0 md:border-l border-white/10 pt-8 md:pt-0 md:pl-12 flex flex-col items-center md:items-end gap-4 z-20">
                                <span className="text-4xl md:text-6xl font-serif text-gold/10 group-hover:text-gold/30 transition-colors duration-500">01</span>
                                <button className="text-sm uppercase tracking-widest border-b border-gold/50 pb-1 hover:text-gold hover:border-gold transition-all">View Details</button>
                            </div>
                        </div>
                    </div>

                    {/* Event 2 */}
                    <div className="group relative bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:bg-white/10 transition-all duration-500">
                        <div className="absolute inset-0 bg-gradient-to-r from-maroon/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                            <div className="text-center md:text-left flex-1">
                                <span className="inline-block px-3 py-1 border border-maroon/50 rounded-full text-xs uppercase tracking-widest text-maroon-400 mb-4 text-gold">Cultural</span>
                                <h3 className="text-3xl md:text-5xl font-serif mb-2 text-white">Ratri Before Navratri</h3>
                                <p className="text-gray-400 flex items-center justify-center md:justify-start gap-2 mb-4">
                                    <Calendar size={16} className="text-gold" /> Upcoming Festival
                                </p>

                                {/* Optimized Artistic Fan Spread Gallery */}
                                <div className="relative mt-2 md:-mt-10 min-h-[320px] md:min-h-[400px] flex items-center justify-center">
                                    {/* Background decorative glow */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[280px] bg-maroon/10 blur-[100px] pointer-events-none rounded-full" />

                                    <div className="relative w-full h-full">
                                        {[
                                            { src: "ratri1.JPG", rotate: -12, left: "0%", top: "5%", z: 10, label: "Cultural Dance", delay: 0 },
                                            { src: "ratri3.JPG", rotate: 15, left: "52%", top: "-5%", z: 20, label: "Devotional Moments", delay: 0.2 },
                                            { src: "ratri2.JPG", rotate: -4, left: "26%", top: "25%", z: 30, label: "Vibrant Navratri", delay: 0.1 }
                                        ].map((img, idx) => (
                                            <motion.div
                                                key={idx}
                                                initial={{ opacity: 0, scale: 0.8, rotate: 0, y: 40 }}
                                                whileInView={{
                                                    opacity: 1,
                                                    scale: 1,
                                                    rotate: img.rotate,
                                                    left: img.left,
                                                    top: img.top,
                                                    y: 0,
                                                    transition: { delay: img.delay, type: "spring", stiffness: 90, damping: 18 }
                                                }}
                                                whileHover={{
                                                    scale: 1.08,
                                                    rotate: 0,
                                                    zIndex: 100,
                                                    y: -30,
                                                    transition: { duration: 0.3 }
                                                }}
                                                viewport={{ once: true }}
                                                className="absolute w-[240px] sm:w-[300px] md:w-[380px] aspect-[14/9] rounded-2xl overflow-hidden border-[6px] border-white shadow-[0_30px_60px_rgba(0,0,0,0.6)] transition-all duration-300 pointer-events-auto cursor-pointer group/card"
                                                style={{
                                                    zIndex: img.z,
                                                    ...parallaxStyle
                                                }}
                                            >
                                                <img
                                                    src={`/assets/tours/ratri/${img.src}`}
                                                    alt={img.label}
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute inset-0 bg-black/15 transition-colors group-hover/card:bg-transparent" />
                                                <div className="absolute inset-x-0 bottom-0 p-6 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                                                    <p className="text-sm uppercase tracking-widest text-gold text-center font-medium">{img.label}</p>
                                                </div>
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="w-full md:w-auto border-t md:border-t-0 md:border-l border-white/10 pt-8 md:pt-0 md:pl-12 flex flex-col items-center md:items-end gap-4">
                                <span className="text-4xl md:text-6xl font-serif text-gold/10 group-hover:text-gold/30 transition-colors duration-500">02</span>
                                <button className="text-sm uppercase tracking-widest border-b border-gold/50 pb-1 hover:text-gold hover:border-gold transition-all">View Details</button>
                            </div>
                        </div>
                    </div>

                    {/* Event 3 */}
                    <div className="group relative bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:bg-white/10 transition-all duration-500">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="p-8 md:p-12 flex flex-col md:flex-row items-center justify-between gap-8 relative z-10">
                            <div className="text-center md:text-left">
                                <span className="inline-block px-3 py-1 border border-purple-500/30 rounded-full text-xs uppercase tracking-widest text-purple-400 mb-4 text-gold">Bollywood</span>
                                <h3 className="text-3xl md:text-5xl font-serif mb-2 text-white">Work at Yash Raj Studios</h3>
                                <p className="text-gray-400 flex items-center justify-center md:justify-start gap-2 mb-8">
                                    <Star size={16} className="text-gold" /> Exclusive Project
                                </p>

                                {/* Optimized Animated Collage */}
                                <div className="relative w-full mt-4 md:mt-2 min-h-[450px] md:min-h-[400px]">
                                    {/* Sublte Background Glow to fill space */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[300px] bg-purple-900/10 blur-[100px] pointer-events-none rounded-full" />

                                    <div className="relative w-full h-full">
                                        {[
                                            { src: "yrf1.JPG", rotate: -10, left: "2%", top: "10%", z: 10, scale: 0.85 },
                                            { src: "yrf2.JPG", rotate: 8, left: "55%", top: "0%", z: 20, scale: 0.9 },
                                            { src: "yrf3.JPG", rotate: -5, left: "28%", top: "35%", z: 30, scale: 1 }
                                        ].map((img, idx) => (
                                            <motion.div
                                                key={idx}
                                                initial={{ opacity: 0, scale: 0.8, rotate: img.rotate + 15, y: 30 }}
                                                whileInView={{ opacity: 1, scale: img.scale, rotate: img.rotate, y: 0 }}
                                                whileHover={{ scale: img.scale + 0.05, rotate: 0, zIndex: 50, transition: { duration: 0.3 } }}
                                                transition={{ delay: idx * 0.15, type: "spring", stiffness: 80, damping: 15 }}
                                                viewport={{ once: true }}
                                                className="absolute w-[200px] sm:w-[240px] md:w-[320px] aspect-[4/5] rounded-xl overflow-hidden border-[6px] border-white shadow-[0_20px_50px_rgba(0,0,0,0.5)] transition-all duration-300 pointer-events-auto"
                                                style={{
                                                    left: img.left,
                                                    top: img.top,
                                                    zIndex: img.z,
                                                    ...parallaxStyle
                                                }}
                                            >
                                                <img
                                                    src={`/assets/tours/${img.src}`}
                                                    alt={`Yash Raj Studios Work ${idx + 1}`}
                                                    className="w-full h-full object-cover"
                                                />
                                                <div className="absolute inset-0 bg-black/10 hover:bg-transparent transition-colors" />
                                            </motion.div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            <div className="w-full md:w-auto border-t md:border-t-0 md:border-l border-white/10 pt-8 md:pt-0 md:pl-12 flex flex-col items-center md:items-end gap-4 z-20">
                                <span className="text-4xl md:text-6xl font-serif text-gold/10 group-hover:text-gold/30 transition-colors duration-500">03</span>
                                <button className="text-sm uppercase tracking-widest border-b border-gold/50 pb-1 hover:text-gold hover:border-gold transition-all">View Details</button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Quote */}
                <div className="mt-20 text-center">
                    <p className="font-serif italic text-2xl text-gray-500">
                        "Creating moments that last a lifetime."
                    </p>
                </div>
            </section>

            <Footer />
        </main>
    );
}
