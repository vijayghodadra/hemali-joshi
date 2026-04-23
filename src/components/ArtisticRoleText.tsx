"use client";
import React from "react";
import { motion } from "framer-motion";

interface ArtisticRoleTextProps {
    text: string;
    className?: string;
}

const ArtisticRoleText = ({ text, className = "" }: ArtisticRoleTextProps) => {
    const characters = Array.from(text);

    const container = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.05,
                delayChildren: 0.2,
            },
        },
    };

    const child = {
        hidden: {
            opacity: 0,
            y: 20,
            filter: "blur(10px)",
            scale: 1.2
        },
        visible: {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            scale: 1,
            transition: {
                type: "spring",
                damping: 15,
                stiffness: 100,
            } as const,
        },
    };

    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="visible"
            className={`relative inline-flex flex-wrap justify-center overflow-hidden py-2 ${className}`}
        >
            {/* Shimmer Effect Background */}
            <motion.div
                className="absolute inset-0 z-0 bg-gradient-to-r from-transparent via-gold/30 to-transparent w-[200%] h-full"
                animate={{
                    x: ["-100%", "100%"]
                }}
                transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "linear",
                    repeatDelay: 1
                }}
                style={{ mixBlendMode: 'overlay' }}
            />

            {characters.map((char, index) => (
                <motion.span
                    key={index}
                    variants={child}
                    className="inline-block"
                    style={{
                        display: char === " " ? "inline" : "inline-block",
                        minWidth: char === " " ? "0.6em" : "auto"
                    }}
                >
                    {char === " " ? "\u00A0" : char}
                </motion.span>
            ))}

            {/* Subtle bottom line expansion */}
            <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 0.5 }}
                transition={{ delay: 1.5, duration: 1.5, ease: "circOut" }}
                className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gold to-transparent origin-center"
            />
        </motion.div>
    );
};

export default ArtisticRoleText;
