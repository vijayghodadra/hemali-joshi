"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export default function SplashScreen({ onFinish }: { onFinish: () => void }) {
    const [isVisible, setIsVisible] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsVisible(false);
            setTimeout(onFinish, 1000); // Allow exit animation to finish
        }, 4000); // Display for 4 seconds

        return () => clearTimeout(timer);
    }, [onFinish]);

    return (
        <AnimatePresence>
            {isVisible && (
                <motion.div
                    className="fixed inset-0 z-[100] flex items-center justify-center bg-black overflow-hidden"
                    exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
                    transition={{ duration: 1, ease: "easeInOut" }}
                >
                    {/* Full Screen Image Background */}
                    <div className="absolute inset-0 z-0">
                        <Image
                            src="/assets/splash-full.jpg"
                            alt="Himali Joshi Live"
                            fill
                            priority
                            className="object-cover opacity-90"
                            sizes="100vw"
                        />
                        {/* Gradient Overlay for Text Readability */}
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/40 mix-blend-multiply" />
                        <div className="absolute inset-0 bg-black/20" />
                    </div>

                    {/* Animated Light Overlay */}
                    <motion.div
                        animate={{ opacity: [0.1, 0.3, 0.1], scale: [1, 1.1, 1] }}
                        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                        className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--color-gold)_0%,_transparent_60%)] opacity-20 z-10 pointer-events-none"
                    />

                    {/* Text Container */}
                    <div className="absolute inset-0 flex flex-col justify-start items-start p-8 md:p-16 z-20 pointer-events-none">
                        <div className="flex flex-col items-start mt-10 md:mt-0">
                            {/* Himali */}
                            <div className="transform -rotate-3">
                                <StaggeredText
                                    text="Himali"
                                    className="text-[6rem] md:text-[10rem] text-gold font-cursive leading-none"
                                    delay={0.5}
                                />
                            </div>

                            {/* Joshi */}
                            <div className="transform -rotate-3 md:-mt-12 ml-[12rem] md:ml-[24rem]">
                                <StaggeredText
                                    text="Joshi"
                                    className="text-[2.5rem] md:text-[4.5rem] text-gold font-cursive leading-none"
                                    delay={1.2}
                                />
                            </div>
                        </div>
                    </div>

                    {/* Footer Text */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5, duration: 1 }}
                        className="absolute bottom-10 left-0 right-0 text-center text-white/90 uppercase text-xs md:text-sm tracking-[0.4em] font-light z-30 drop-shadow-md"
                    >
                        Enter The Experience
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}

const StaggeredText = ({ text, className, delay = 0 }: { text: string, className?: string, delay?: number }) => {
    // Split text into array of characters
    const letters = Array.from(text);

    const container = {
        hidden: { opacity: 0 },
        visible: (i = 1) => ({
            opacity: 1,
            transition: { staggerChildren: 0.15, delayChildren: delay } // 0.15s stagger for "musical" feel
        })
    };

    const child = {
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 200, // Springy like a piano key
            } as const
        },
        hidden: {
            opacity: 0,
            y: -40, // Drop from above
            scale: 0.8,
            transition: {
                type: "spring",
                damping: 12,
                stiffness: 200,
            } as const
        }
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className={`flex overflow-visible ${className} will-change-transform`}
            style={{
                textShadow: `
                    0 2px 0 #8a6d20,
                    0 4px 6px rgba(0,0,0,0.8),
                    0 0 20px rgba(212,175,55,0.5)
                `
            }}
        >
            {letters.map((letter, index) => (
                <motion.span variants={child} key={index}>
                    {letter === " " ? "\u00A0" : letter}
                </motion.span>
            ))}
        </motion.div>
    );
};
