"use client";

import { useEffect, useState } from "react";
import SecurityWatermark from "./SecurityWatermark";

const DISABLE_SECURITY = true;

export default function SecurityProvider({ children }: { children: React.ReactNode }) {
    const [isBlackout, setIsBlackout] = useState(false);

    useEffect(() => {
        if (DISABLE_SECURITY) return;

        // Disable right-click context menu
        const handleContextMenu = (e: MouseEvent) => {
            e.preventDefault();
            return false;
        };

        // Disable text selection via JS (in addition to CSS)
        const handleSelectStart = (e: Event) => {
            e.preventDefault();
            return false;
        };

        // Disable specific keyboard shortcuts
        const handleKeyDown = (e: KeyboardEvent) => {
            // Block F12 (DevTools)
            if (e.key === "F12") {
                e.preventDefault();
                return false;
            }

            // Block Ctrl+Shift+I / Cmd+Option+I (DevTools)
            if ((e.ctrlKey || e.metaKey) && e.shiftKey && (e.key === "I" || e.key === "i" || e.key === "c" || e.key === "C" || e.key === "j" || e.key === "J")) {
                e.preventDefault();
                return false;
            }

            // Block Ctrl+C / Cmd+C (Copy)
            if ((e.ctrlKey || e.metaKey) && (e.key === "C" || e.key === "c")) {
                e.preventDefault();
                return false;
            }

            // Block Ctrl+U / Cmd+U (View Source)
            if ((e.ctrlKey || e.metaKey) && (e.key === "U" || e.key === "u")) {
                e.preventDefault();
                return false;
            }

            // Block Ctrl+S / Cmd+S (Save Page)
            if ((e.ctrlKey || e.metaKey) && (e.key === "S" || e.key === "s")) {
                e.preventDefault();
                return false;
            }

            // Block Ctrl+P / Cmd+P (Print)
            if ((e.ctrlKey || e.metaKey) && (e.key === "P" || e.key === "p")) {
                e.preventDefault();
                setIsBlackout(true); // Blackout for printing too
                setTimeout(() => setIsBlackout(false), 2000);
                return false;
            }

            // Attempt to block Screenshot shortcuts (limited OS support)
            // Mac: Cmd+Shift+3, Cmd+Shift+4, Cmd+Shift+5
            if ((e.metaKey && e.shiftKey) && (e.key === "3" || e.key === "4" || e.key === "5")) {
                e.preventDefault();
                setIsBlackout(true);
                setTimeout(() => setIsBlackout(false), 2000);
                return false;
            }

            // Windows: Print Screen
            if (e.key === "PrintScreen") {
                e.preventDefault();
                setIsBlackout(true);
                setTimeout(() => setIsBlackout(false), 2000);
                return false;
            }
        };

        // Strict Mode: Blackout when window loses focus (e.g. Snipping Tool or App Switcher on Mobile)
        const handleBlur = () => {
            setIsBlackout(true);
        };

        const handleFocus = () => {
            setIsBlackout(false);
        };

        // Aggressive Mode: Blackout if mouse leaves the window (e.g. to click outside)
        // Re-enabled for stricter security as requested
        const handleMouseLeave = () => {
            setIsBlackout(true);
        };

        const handleMouseEnter = () => {
            setIsBlackout(false);
        };

        const handleVisibilityChange = () => {
            if (document.hidden) {
                setIsBlackout(true);
            } else {
                setIsBlackout(false);
            }
        };

        document.addEventListener("contextmenu", handleContextMenu);
        document.addEventListener("selectstart", handleSelectStart);
        document.addEventListener("keydown", handleKeyDown);
        document.addEventListener("visibilitychange", handleVisibilityChange);

        // Window level events
        window.addEventListener("blur", handleBlur);
        window.addEventListener("focus", handleFocus);
        document.documentElement.addEventListener("mouseleave", handleMouseLeave);
        document.documentElement.addEventListener("mouseenter", handleMouseEnter);

        // Initial check to clear selection
        if (window.getSelection) {
            window.getSelection()?.removeAllRanges();
        }

        return () => {
            document.removeEventListener("contextmenu", handleContextMenu);
            document.removeEventListener("selectstart", handleSelectStart);
            document.removeEventListener("keydown", handleKeyDown);
            document.removeEventListener("visibilitychange", handleVisibilityChange);

            window.removeEventListener("blur", handleBlur);
            window.removeEventListener("focus", handleFocus);
            document.documentElement.removeEventListener("mouseleave", handleMouseLeave);
            document.documentElement.removeEventListener("mouseenter", handleMouseEnter);
        };
    }, []);

    if (DISABLE_SECURITY) {
        return <>{children}</>;
    }

    return (
        <>
            {isBlackout && (
                <div className="fixed inset-0 z-[99999] bg-black flex items-center justify-center pointer-events-none">
                    <div className="text-white/50 font-serif tracking-widest uppercase text-sm">
                        Security Protection Active
                    </div>
                </div>
            )}

            {/* Subtle Watermark Layer */}
            <SecurityWatermark />

            <div className={`transition-opacity duration-200 ${isBlackout ? "opacity-0 filter blur-xl" : "opacity-100"}`}>
                {children}
            </div>
        </>
    );
}
