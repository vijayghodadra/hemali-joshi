"use client";
import { useEffect } from "react";
import { motion, useSpring, useMotionValue } from "framer-motion";
import { Mic } from "lucide-react";

export default function SplashCursor() {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);

    const springConfig = { damping: 25, stiffness: 700 };
    const cursorXSpring = useSpring(cursorX, springConfig);
    const cursorYSpring = useSpring(cursorY, springConfig);

    useEffect(() => {
        const moveCursor = (e: MouseEvent) => {
            cursorX.set(e.clientX - 12); // Offset to align tip somewhat
            cursorY.set(e.clientY - 4);
        };

        // Strictly disable on mobile/touch devices to prevent "hangs"
        if (typeof window !== 'undefined' && window.matchMedia("(pointer: coarse)").matches) {
            return;
        }

        window.addEventListener("mousemove", moveCursor);
        return () => {
            window.removeEventListener("mousemove", moveCursor);
        };
    }, [cursorX, cursorY]);

    return (
        <motion.div
            className="hidden md:block pointer-events-none fixed left-0 top-0 z-[9999] text-gold drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]"
            style={{
                translateX: cursorXSpring,
                translateY: cursorYSpring,
            }}
        >
            {/* Realistic Black Mic with Gold Outline/Grille */}
            <Mic
                size={34}
                className="fill-neutral-900 stroke-[1.5px]" // Black body, Gold outline (inherited)
                style={{ filter: "drop-shadow(0 0 2px rgba(212,175,55,0.8))" }} // Extra inner glow for metallic feel
            />
        </motion.div>
    );
}
