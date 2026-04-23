"use client";
import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Instagram, Youtube, Mail, ArrowUp, Facebook } from "lucide-react";
import { motion, useMotionValue, useTransform } from "framer-motion";

export default function Footer() {
    const pathname = usePathname();

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Parallax Effect Values
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);

    // Background moves slightly opposite to cursor for depth
    const moveX = useTransform(mouseX, [-0.5, 0.5], ["2%", "-2%"]);
    const moveY = useTransform(mouseY, [-0.5, 0.5], ["2%", "-2%"]);

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const width = rect.width;
        const height = rect.height;
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        mouseX.set((x / width) - 0.5);
        mouseY.set((y / height) - 0.5);
    };

    return (
        <footer
            className="relative w-full bg-black text-white border-t border-white/10 pt-16 pb-8 px-6 overflow-hidden"
            onMouseMove={handleMouseMove}
        >
            {/* Artistic Parallax Background */}
            <motion.div
                className="absolute inset-0 z-0 bg-cover bg-center opacity-70"
                style={{
                    backgroundImage: "url('/assets/splash-full.jpg')",
                    x: moveX,
                    y: moveY,
                    scale: 1.1 // Slight scale to prevent whitespace on move
                }}
            />
            {/* Gradient Overlay for Readability */}
            <div className="absolute inset-0 z-0 bg-gradient-to-t from-black via-black/80 to-black/60" />


            <div className="container mx-auto relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
                    {/* Brand */}
                    <div className="space-y-4">
                        <h2 className="font-serif text-3xl text-gold">Himali Joshi</h2>
                        <p className="text-gray-400 text-sm leading-relaxed max-w-xs">
                            The <strong>best singer in Vadodara</strong> and the top <strong>playback & Garba singer in Gujarat</strong>. Experience world-class live performances for weddings and events.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div className="space-y-4">
                        <h3 className="text-gold uppercase tracking-widest text-xs font-bold">Connect</h3>
                        <div className="flex gap-4">
                            <a href="https://www.facebook.com/himali.joshi.2025" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-[#1877F2] bg-[#1877F2] text-white flex items-center justify-center hover:brightness-110 transition-all">
                                <Facebook size={18} />
                            </a>
                            <a href="https://www.instagram.com/singer_himali_joshi_14?igsh=cnAzMWJzeWhwanJq" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-[#E1306C] bg-[#E1306C] text-white flex items-center justify-center hover:brightness-110 transition-all">
                                <Instagram size={18} />
                            </a>
                            <a href="https://www.youtube.com/channel/UCvyI4RHfXex8nchIYopXLOQ" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-full border border-[#FF0000] bg-[#FF0000] text-white flex items-center justify-center hover:brightness-110 transition-all">
                                <Youtube size={18} />
                            </a>
                            <Link
                                href="/contact#contact"
                                onClick={(e) => {
                                    if (pathname === "/contact") {
                                        e.preventDefault();
                                        document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" });
                                    }
                                }}
                                className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-gold hover:text-black transition-all"
                            >
                                <Mail size={18} />
                            </Link>
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div className="space-y-4">
                        <h3 className="text-gold uppercase tracking-widest text-xs font-bold">Stay Updated</h3>
                        <form className="flex gap-2">
                            <input
                                type="email"
                                placeholder="Updates & Show dates"
                                className="bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-sm w-full focus:outline-none focus:border-gold transition-colors backdrop-blur-sm"
                            />
                            <button className="bg-white/10 px-4 py-2 rounded-lg hover:bg-gold hover:text-black transition-colors backdrop-blur-sm">
                                →
                            </button>
                        </form>
                    </div>
                </div>

                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                    <div className="flex flex-col md:flex-row items-center gap-4">
                        <p>© 2026 Himali Joshi. All rights reserved.</p>
                        <span className="hidden md:block">|</span>
                        <p className="flex items-center gap-2">
                            Powered by -
                            <a href="https://www.tejaskpaisoftware.com/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 hover:text-gold transition-colors font-semibold">
                                <img src="/assets/tejaskp-logo.jpg" alt="Tejaskp AI Software" className="h-5 w-auto rounded-sm" />
                                TEJASKP AI SOFTWARE
                            </a>
                        </p>
                    </div>
                    <button
                        onClick={scrollToTop}
                        className="flex items-center gap-2 hover:text-gold transition-colors"
                    >
                        Back to Top <ArrowUp size={14} />
                    </button>
                </div>
            </div>
        </footer>
    );
}
