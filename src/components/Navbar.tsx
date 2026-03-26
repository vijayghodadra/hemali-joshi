"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import MusicalKeyText from "./MusicalKeyText";

import { Menu, X } from "lucide-react";

export default function Navbar() {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const pathname = usePathname();

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isOpen]);

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const navLinks = [
        { name: "Home", href: "/" },
        { name: "Events", href: "/events" },
        { name: "Music", href: "/music" },
        { name: "Gallery", href: "/gallery" },
        { name: "Tours", href: "/tours" },
        { name: "Himali’s Buzz", href: "/himalis-buzz" },
        { name: "About", href: "/about" },
        { name: "Contact", href: "/contact" },
    ];

    return (
        <nav
            className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${scrolled ? "bg-black/80 backdrop-blur-md py-4 shadow-lg" : "bg-gradient-to-b from-black/90 to-transparent py-6"
                }`}
        >
            <div className="w-full px-4 md:px-8 flex items-center justify-between">
                {/* Logo - Matches Splash Screen Style */}
                <Link href="/" className="relative z-50 flex items-center gap-3 flex-shrink-0 group mr-auto pr-8">
                    <motion.div
                        whileHover={{
                            rotateX: 10,
                            rotateY: -10,
                            scale: 1.05,
                            transition: { type: "spring", stiffness: 300 }
                        }}
                        style={{ perspective: 1000 }}
                        className="relative"
                    >
                        <img
                            src="/assets/logo-gold.png"
                            alt="Himali Joshi Logo"
                            className="h-10 md:h-14 w-auto object-contain drop-shadow-md filter brightness-110 group-hover:brightness-125 transition-all"
                        />
                    </motion.div>
                    <div className="flex flex-col justify-center">
                        <div className="font-serif italic text-base md:text-2xl font-bold tracking-wide flex items-baseline whitespace-nowrap leading-none transition-all group-hover:drop-shadow-gold">
                            <MusicalKeyText text="Himali" className="text-white mr-1.5 md:mr-2" />
                            <MusicalKeyText text="Joshi" className="text-gold" goldHighlight={true} />
                        </div>
                    </div>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-4 lg:gap-8">
                    {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            href={link.href}
                            className={`relative text-xs lg:text-sm font-serif font-semibold uppercase tracking-wider transition-colors hover:text-gold drop-shadow-md whitespace-nowrap ${pathname === link.href ? "text-gold" : "text-white/90"
                                }`}
                        >
                            {link.name}
                            {pathname === link.href && (
                                <motion.div
                                    layoutId="underline"
                                    className="absolute left-0 right-0 -bottom-1 h-0.5 bg-gold"
                                />
                            )}
                        </Link>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <button
                    className="md:hidden text-white z-50"
                    onClick={() => setIsOpen(!isOpen)}
                >
                    {isOpen ? <X size={28} /> : <Menu size={28} />}
                </button>

                {/* Mobile Nav Overlay */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, x: "100%" }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed inset-0 h-[100dvh] bg-black/98 backdrop-blur-2xl flex flex-col items-center justify-center gap-6 md:hidden z-[60] overscroll-none"
                        >
                            <div className="flex flex-col items-center gap-4">
                                {navLinks.map((link, idx) => (
                                    <motion.div
                                        key={link.name}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: idx * 0.05 + 0.2 }}
                                    >
                                        <Link
                                            href={link.href}
                                            onClick={() => setIsOpen(false)}
                                            className={`text-3xl font-serif tracking-tight transition-colors ${pathname === link.href ? "text-gold" : "text-white/80 hover:text-white"
                                                }`}
                                        >
                                            {link.name}
                                        </Link>
                                    </motion.div>
                                ))}
                            </div>

                            {/* Decorative background element for mobile menu */}
                            <div className="absolute top-0 right-0 w-full h-full -z-10 opacity-20 pointer-events-none overflow-hidden">
                                <div className="absolute -top-[10%] -right-[10%] w-[50%] h-[50%] bg-gold/20 rounded-full blur-[100px]" />
                                <div className="absolute -bottom-[10%] -left-[10%] w-[50%] h-[50%] bg-maroon/20 rounded-full blur-[100px]" />
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </nav>
    );
}
