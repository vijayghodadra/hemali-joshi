"use client";
import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface ArtisticScrollTitleProps {
    text: string;
    className?: string;
}

const ArtisticScrollTitle = ({ text, className = "" }: ArtisticScrollTitleProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start 90%", "start 40%"] // Triggers as it enters the bottom half and finishes near the top
    });

    const smoothProgress = useSpring(scrollYProgress, {
        stiffness: 50,
        damping: 20,
        restDelta: 0.001
    });

    const width = useTransform(smoothProgress, [0, 1], ["0%", "100%"]);
    const opacity = useTransform(smoothProgress, [0, 0.1], [0, 1]);
    const glowOpacity = useTransform(smoothProgress, [0.2, 0.8], [0.3, 0.6]);

    return (
        <div ref={containerRef} className={`relative flex flex-col items-center justify-center w-full overflow-visible py-16 ${className}`}>
            <motion.div 
                style={{ opacity }}
                className="relative px-4"
            >
                {/* Ambient Glow behind text */}
                <motion.div 
                    style={{ opacity: glowOpacity }}
                    className="absolute inset-0 bg-gold/10 blur-[60px] rounded-full scale-150 -z-10"
                />

                {/* Background Shadow/Ghost Text */}
                <h2 className="font-signature text-7xl md:text-9xl text-white/5 select-none text-center">
                    {text}
                </h2>

                {/* Animated Writing Layer */}
                <motion.div 
                    className="absolute inset-0 px-4 overflow-hidden"
                    style={{ width }}
                >
                    <h2 className="font-signature text-7xl md:text-9xl text-gold whitespace-nowrap drop-shadow-[0_0_20px_rgba(212,175,55,0.4)] text-center">
                        {text}
                    </h2>
                </motion.div>

                {/* Writing Spark / Pen Tip */}
                <motion.div
                    className="absolute top-0 bottom-0 z-30 pointer-events-none flex items-center"
                    style={{ 
                        left: width,
                        opacity: useTransform(smoothProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0])
                    }}
                >
                    <div className="relative w-1 h-[70%] bg-gradient-to-b from-transparent via-gold to-transparent">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-4 h-4 bg-white rounded-full blur-[2px] shadow-[0_0_15px_#fff]" />
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-8 bg-gold/50 rounded-full blur-[8px]" />
                        
                        {/* Small Sparkles */}
                        {[...Array(3)].map((_, i) => (
                            <motion.div
                                key={i}
                                animate={{ 
                                    y: [0, (i - 1) * 20],
                                    x: [0, -10 - (i * 10)],
                                    scale: [1, 0],
                                    opacity: [1, 0]
                                }}
                                transition={{ 
                                    duration: 0.5, 
                                    repeat: Infinity, 
                                    delay: i * 0.1 
                                }}
                                className="absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full"
                            />
                        ))}
                    </div>
                </motion.div>

                {/* Underline Flourish */}
                <div className="mt-4 w-full flex justify-center">
                    <motion.div 
                        style={{ scaleX: smoothProgress, opacity }}
                        className="h-[2px] bg-gradient-to-r from-transparent via-gold to-transparent w-[80%] origin-center"
                    />
                </div>
            </motion.div>
            
            {/* Optional secondary text */}
            <motion.p 
                style={{ opacity: useTransform(smoothProgress, [0.6, 1], [0, 0.5]) }}
                className="mt-6 text-[10px] uppercase tracking-[0.5em] text-gold/80 font-inter"
            >
                Authentic Musical Journey
            </motion.p>
        </div>
    );
};

export default ArtisticScrollTitle;
