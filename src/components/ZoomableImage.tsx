"use client";
import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';

interface ZoomableImageProps {
    src: string;
    alt: string;
    className?: string;
}

export default function ZoomableImage({ src, alt, className }: ZoomableImageProps) {
    const [isOpen, setIsOpen] = useState(false);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Prevent scrolling when modal is open
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    const modalContent = isOpen ? (
        <div 
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-[999999] flex items-center justify-center bg-black/95 p-4 cursor-zoom-out"
            style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0 }}
        >
            <img
                src={src}
                alt={alt}
                className="max-w-full max-h-[90vh] object-contain rounded-xl shadow-[0_0_50px_rgba(255,215,0,0.15)] border border-white/10"
                onClick={(e) => e.stopPropagation()}
            />
            <div className="absolute top-6 right-6 text-white/50 text-sm tracking-widest uppercase pointer-events-none">
                Click anywhere to close
            </div>
        </div>
    ) : null;

    return (
        <>
            <img 
                src={src} 
                alt={alt} 
                className={`cursor-zoom-in relative z-10 ${className}`}
                onClick={() => setIsOpen(true)}
            />
            
            {mounted && document.body && createPortal(modalContent, document.body)}
        </>
    );
}
