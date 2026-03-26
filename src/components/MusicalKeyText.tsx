"use client";
import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

interface MusicalKeyTextProps {
    text: string;
    className?: string;
    goldHighlight?: boolean;
}

// C Major Scale frequencies for a pleasant, uplifting progression
const SCALE = [
    261.63, // C4
    293.66, // D4
    329.63, // E4
    349.23, // F4
    392.00, // G4
    440.00, // A4
    493.88, // B4
    523.25, // C5
    587.33, // D5
    659.25, // E5
    698.46, // F5
    783.99, // G5
];

import AudioContextManager from "@/utils/audio";

const playNote = (frequency: number, isGold: boolean) => {
    const audioManager = AudioContextManager.getInstance();
    // Try to resume if not already running (just in case)
    audioManager.resumeContext();

    const audioCtx = audioManager.getContext();

    // Create oscillator and gain node
    const osc = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();

    // Use a warmer waveform for gold text, cleaner for white
    osc.type = isGold ? 'triangle' : 'sine';
    osc.frequency.value = frequency;

    // Envelope for a "pluck" sound
    const now = audioCtx.currentTime;
    gainNode.gain.setValueAtTime(0, now);
    gainNode.gain.linearRampToValueAtTime(isGold ? 0.3 : 0.2, now + 0.02); // Attack
    gainNode.gain.exponentialRampToValueAtTime(0.001, now + 0.5); // Decay

    osc.connect(gainNode);
    gainNode.connect(audioCtx.destination);

    osc.start(now);
    osc.stop(now + 0.6);
};

const MusicalChar = ({ char, index, isGold }: { char: string, index: number, isGold: boolean }) => {
    if (char === " ") return <span className="inline-block w-4"> </span>;

    const noteIndex = index % SCALE.length;
    const frequency = SCALE[noteIndex];

    return (
        <motion.span
            className={`inline-block cursor-grab active:cursor-grabbing select-none relative ${isGold ? "text-gold" : "text-white"}`}
            initial={{ y: 0, scale: 1 }}
            onMouseEnter={() => playNote(frequency, isGold)}
            onTouchStart={() => playNote(frequency, isGold)} // Enable sound on touch tap
            whileHover={{
                y: -15,
                scale: 1.25,
                rotate: isGold ? -5 : 5,
                color: isGold ? "#FFEA00" : "#FFFFFF",
                textShadow: isGold
                    ? "0 0 30px rgba(255, 215, 0, 0.9), 0 0 60px rgba(255, 215, 0, 0.6)"
                    : "0 0 20px rgba(255, 255, 255, 0.9)",
                zIndex: 50,
                transition: { type: "spring", stiffness: 300, damping: 10 }
            }}
            whileTap={{ scale: 0.9, y: 5 }}
            style={{ margin: "0 2px" }}
        >
            {char}
        </motion.span>
    );
};

export default function MusicalKeyText({ text, className = "", goldHighlight = false }: MusicalKeyTextProps) {
    return (
        <div className={`relative inline-flex flex-wrap justify-center ${className}`}>
            {text.split("").map((char, index) => (
                <MusicalChar
                    key={`${char}-${index}`}
                    char={char}
                    index={index}
                    isGold={goldHighlight}
                />
            ))}
        </div>
    );
}
