"use client";
import { motion, useSpring, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState, useRef } from "react";

import AudioContextManager from "@/utils/audio";

const KineticGoldStrings = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const mouseX = useMotionValue(0);
    const mouseY = useMotionValue(0);
    const [isMuted, setIsMuted] = useState(false);
    // Use responsive string count to save performance on mobile
    const [stringCount, setStringCount] = useState(40); // Default to safer lower count

    useEffect(() => {
        // Initialize global audio unlock listeners
        AudioContextManager.getInstance().initializeAutoUnlock();

        // Check screen width to determine string count
        const handleResize = () => {
            if (window.innerWidth < 768) {
                setStringCount(30); // Mobile: Significantly fewer strings
            } else {
                setStringCount(80); // Desktop: Full visual fidelity
            }
        };

        handleResize(); // Initial check
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const playStringSound = (index: number) => {
        if (isMuted) return;

        try {
            const manager = AudioContextManager.getInstance();
            const ctx = manager.getContext();

            // Should already be unlocked by global listener, but good to ensure
            if (ctx.state === 'suspended') {
                manager.resumeContext();
            }

            const oscillator = ctx.createOscillator();
            const gainNode = ctx.createGain();

            oscillator.connect(gainNode);
            gainNode.connect(ctx.destination);

            // Pentatonic scale frequency calculation or simple harmonic series
            // Base frequency + (index * step) roughly
            const baseFreq = 220; // A3
            // Create a nice harmonic distribution
            const freq = baseFreq + (index * 15);

            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(freq, ctx.currentTime);

            // Pluck envelope
            gainNode.gain.setValueAtTime(0, ctx.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.3, ctx.currentTime + 0.05); // Attack
            gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5); // Decay

            oscillator.start(ctx.currentTime);
            oscillator.stop(ctx.currentTime + 0.5);
        } catch (e) {
            console.error("Audio playback failed", e);
        }
    };

    // Smooth physics configuration
    const springConfig = { damping: 30, stiffness: 200, mass: 0.5 };
    const mouseXSpring = useSpring(mouseX, springConfig);
    const mouseYSpring = useSpring(mouseY, springConfig);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!containerRef.current) return;
            const rect = containerRef.current.getBoundingClientRect();
            const x = (e.clientX - rect.left) / rect.width - 0.5;
            const y = (e.clientY - rect.top) / rect.height - 0.5;
            mouseX.set(x);
            mouseY.set(y);
        };

        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [mouseX, mouseY]);

    // Dynamic string count for responsive performance
    const strings = Array.from({ length: stringCount });

    return (
        <section
            ref={containerRef}
            className="relative py-12 bg-black overflow-hidden flex items-center justify-center"
        >
            {/* Ambient Background Glow */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gold/5 blur-[120px] rounded-full opacity-20" />
            </div>

            {/* Mute/Unmute Control */}
            <button
                onClick={() => setIsMuted(!isMuted)}
                className="absolute top-6 right-6 z-20 p-3 rounded-full bg-white/5 border border-white/10 text-gold hover:bg-white/10 hover:scale-110 transition-all backdrop-blur-sm group"
            >
                {isMuted ? (
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="1" y1="1" x2="23" y2="23"></line><path d="M9 9v6a3 3 0 0 0 5.12 2.12M15 9.34V4a3 3 0 0 0-5.94-.6"></path><path d="M17 16.95A7 7 0 0 1 5 12v-2m14 0v2a7 7 0 0 1-.11 1.23"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
                ) : (
                    <div className="relative">
                        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path><path d="M19 10v2a7 7 0 0 1-14 0v-2"></path><line x1="12" y1="19" x2="12" y2="23"></line><line x1="8" y1="23" x2="16" y2="23"></line></svg>
                        <span className="absolute -top-1 -right-1 flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-gold opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-gold"></span>
                        </span>
                    </div>
                )}
            </button>


            <div className="relative w-full h-40 flex items-center justify-center gap-1 md:gap-1.5 px-10 overflow-visible">
                {strings.map((_, i) => {
                    const xOffset = (i / 80) - 0.5;

                    return (
                        <StringElement
                            key={i}
                            index={i}
                            mouseX={mouseXSpring}
                            mouseY={mouseYSpring}
                            xOffset={xOffset}
                            onHover={() => playStringSound(i)}
                        />
                    );
                })}
            </div>
        </section>
    );
};

const StringElement = ({ index, mouseX, mouseY, xOffset, onHover }: { index: number, mouseX: any, mouseY: any, xOffset: number, onHover: () => void }) => {
    // Distance calculation for ripple effect
    const dist = useTransform([mouseX, mouseY], ([x, y]) => {
        const dx = (x as number) - xOffset;
        const dy = (y as number);
        // Sensitive interaction
        return Math.sqrt(dx * dx * 4 + dy * dy);
    });

    // Detect when distance is very small (hover) to trigger sound
    // Note: useTransform callbacks shouldn't directly trigger side effects ideally, 
    // but for this specific visualizer, the onMouseEnter prop is cleaner.

    return (
        <motion.div
            style={{
                height: useTransform(dist, [0, 0.4, 0.8], ["100%", "40%", "20%"]),
                opacity: useTransform(dist, [0, 0.4, 0.8], [1, 0.4, 0.2]),
                scaleX: useTransform(dist, [0, 0.4, 1], [1.2, 1, 0.9]),
                skewY: useTransform(dist, [0, 0.5], [index % 2 === 0 ? 10 : -10, 0]),
                backgroundColor: useTransform(dist, [0, 0.5], ["#FFD700", "#D4AF37"]),
                transformStyle: "preserve-3d",
            }}
            className="w-[2px] md:w-[3px] rounded-full relative group"
            onMouseEnter={onHover} // Trigger sound on direct interaction
            onTouchStart={onHover} // Trigger sound on mobile tap/slide
        >
            {/* High-end Glow Tip */}
            <motion.div
                style={{
                    opacity: useTransform(dist, [0, 0.2], [1, 0])
                }}
                className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-white blur-[2px] rounded-full shadow-[0_0_10px_#fff]"
            />
            <motion.div
                style={{
                    opacity: useTransform(dist, [0, 0.2], [1, 0])
                }}
                className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-white blur-[2px] rounded-full shadow-[0_0_10px_#fff]"
            />

            {/* Subtle inner shadow for 3D look */}
            <div className="absolute inset-y-0 left-0 w-[1px] bg-white/20" />
            <div className="absolute inset-y-0 right-0 w-[1px] bg-black/40" />
        </motion.div>
    );
};

export default KineticGoldStrings;
