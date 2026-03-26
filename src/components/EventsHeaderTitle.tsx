"use client";

import { motion } from "framer-motion";

export default function EventsHeaderTitle() {
    return (
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 md:gap-8 mb-6 relative z-10">
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
                    className="h-32 md:h-48 w-auto object-contain drop-shadow-xl filter brightness-110 transition-all"
                />
            </motion.div>
            <h1 className="font-serif text-5xl md:text-8xl text-center leading-tight">
                GLOBAL <span className="text-gold italic">TOURS</span>
            </h1>
        </div>
    );
}
