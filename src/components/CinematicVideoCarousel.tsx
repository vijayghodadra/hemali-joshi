"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Play, ChevronLeft, ChevronRight } from "lucide-react";
import { getDevicePower } from "@/utils/devicePower";

const VIDEOS = [
    {
        id: 1,
        title: "Wedding Event Review",
        thumbnail: "/assets/Client.png",
        videoUrl: "",
    },
    {
        id: 2,
        title: "Wedding Event Review",
        thumbnail: "/assets/Client1.png",
        videoUrl: "",
    },
    {
        id: 3,
        title: "Audience Review",
        thumbnail: "/assets/splash-full.jpg",
        videoUrl: "/assets/Audience.mp4",
    },
    {
        id: 4,
        title: "Wedding Event Review",
        thumbnail: "",
        videoUrl: "/assets/News.mp4",
    },
];

const CinematicCard = ({ card, position, onPrev, onNext }: { card: any, position: string, onPrev: () => void, onNext: () => void }) => {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [actualUrl, setActualUrl] = useState(card.videoUrl);

    const hasVideo = Boolean(card.videoUrl);

    useEffect(() => {
        if (hasVideo && getDevicePower() === "low") {
            // Only apply low-res fallback for hj2.mp4 since Audience_low.mp4 doesn't exist
            if (card.videoUrl.includes("hj2.mp4")) {
                setActualUrl(card.videoUrl.replace(".MP4", "_low.mp4").replace(".mp4", "_low.mp4"));
            } else {
                setActualUrl(card.videoUrl);
            }
        } else {
            setActualUrl(card.videoUrl);
        }
    }, [card.videoUrl, hasVideo]);

    const isCenter = position === "center";
    const isLeft = position === "left";

    // Mouse move handling for 3D effect
    const x = useMotionValue(0);
    const y = useMotionValue(0);

    // Smooth physics-based spring animation for 3D tilt
    // Matching the gallery card feel
    const rotateX = useSpring(useTransform(y, [-0.5, 0.5], [15, -15]), {
        stiffness: 150,
        damping: 20,
    });
    const rotateY = useSpring(useTransform(x, [-0.5, 0.5], [-15, 15]), {
        stiffness: 150,
        damping: 20,
    });

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        if (!isCenter) return;

        // Disable 3D tilt on mobile/touch devices for performance
        if (window.matchMedia("(pointer: coarse)").matches) return;

        const rect = e.currentTarget.getBoundingClientRect();

        const width = rect.width;
        const height = rect.height;

        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;

        const xPct = mouseX / width - 0.5;
        const yPct = mouseY / height - 0.5;

        x.set(xPct);
        y.set(yPct);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        x.set(0);
        y.set(0);
    };

    useEffect(() => {
        let timeout: NodeJS.Timeout;
        if (isCenter && isHovered && videoRef.current && hasVideo) {
            timeout = setTimeout(() => {
                videoRef.current?.play()
                    .then(() => setIsPlaying(true))
                    .catch(() => { });
            }, 500);
        } else {
            if (videoRef.current) {
                videoRef.current.pause();
                videoRef.current.currentTime = 0;
                setIsPlaying(false);
            }
        }
        return () => clearTimeout(timeout);
    }, [isCenter, isHovered, hasVideo]);

    return (
        <motion.div
            layoutId={`card-${card.id}`}
            className={`absolute rounded-2xl transition-all duration-500
                ${isCenter ? "z-30 w-[80%] md:w-[60%] h-full border-2 border-gold/30 shadow-[0_0_50px_rgba(212,175,55,0.2)]" : "z-10 w-[60%] md:w-[40%] h-[80%] opacity-60 brightness-50 grayscale hover:grayscale-0 cursor-pointer"}
            `}
            initial={{
                x: isCenter ? 0 : isLeft ? "-60%" : "60%",
                scale: isCenter ? 1 : 0.8,
                rotateY: isCenter ? 0 : isLeft ? 25 : -25,
                opacity: 0
            }}
            animate={{
                x: isCenter ? 0 : isLeft ? "-60%" : "60%",
                scale: isCenter ? 1 : 0.8,
                rotateY: isCenter ? 0 : isLeft ? 25 : -25, // We will override this for center hover
                opacity: isCenter ? 1 : 0.6,
                zIndex: isCenter ? 30 : 10
            }}
            style={{
                rotateX: isCenter ? rotateX : 0,
                rotateY: isCenter && isHovered ? rotateY : (isCenter ? 0 : (isLeft ? 25 : -25)),
                transformStyle: "preserve-3d",
            }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            onClick={() => !isCenter && (isLeft ? onPrev() : onNext())}
            onMouseMove={handleMouseMove}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={handleMouseLeave}
        >
            {/* Glass Overlay for side cards */}
            {!isCenter && <div className="absolute inset-0 bg-black/20 backdrop-blur-[1px]" />}

            <div
                className="relative w-full h-full bg-black overflow-hidden rounded-2xl"
                style={{
                    transform: "translateZ(50px)",
                    transformStyle: "preserve-3d",
                }}
            >
                {/* 1. Thumbnail Image (Placeholder) */}
                {card.thumbnail ? (
                    <Image
                        src={card.thumbnail}
                        alt={card.title}
                        fill
                        className={`object-cover transition-opacity duration-300 ${isPlaying ? "opacity-0" : "opacity-100"}`}
                        sizes="(max-width: 768px) 100vw, 50vw"
                    />
                ) : hasVideo ? (
                    <video
                        src={`${actualUrl}#t=1.0`}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isPlaying ? "opacity-0" : "opacity-100"}`}
                        preload="metadata"
                    />
                ) : null}

                {/* 2. Video Element (Plays on Hover) */}
                {hasVideo && (
                    <video
                        ref={videoRef}
                        src={actualUrl}
                        className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-300 ${isPlaying ? "opacity-100" : "opacity-0"}`}
                        muted
                        playsInline
                        loop
                        preload="none" // Optimize loading
                    />
                )}

                {/* Spotlight/Sheen Effect on Hover */}
                {isCenter && (
                    <motion.div
                        className="absolute inset-0 pointer-events-none z-20 mix-blend-overlay opacity-0 bg-gradient-to-br from-white/30 via-transparent to-black/40"
                        animate={{ opacity: isHovered ? 1 : 0 }}
                    />
                )}

                {/* Dynamic Sheen following mouse */}
                {isCenter && isHovered && (
                    <div
                        className="absolute inset-0 pointer-events-none z-20 mix-blend-soft-light"
                        style={{
                            background: `radial-gradient(circle at ${x.get() * 100 + 50}% ${y.get() * 100 + 50}%, rgba(255,255,255,0.4), transparent 50%)`
                        }}
                    />
                )}


                {/* Overlays (Title, Play Button) - visible when NOT playing */}
                <div
                    className={`absolute inset-0 transition-opacity duration-300 ${isPlaying ? "opacity-0" : "opacity-100"}`}
                    style={{ transform: "translateZ(30px)" }}
                >
                    <div className="absolute inset-0 flex items-center justify-center bg-black/20 transition-colors">
                        {isCenter && hasVideo && (
                            <motion.div
                                whileHover={{ scale: 1.1 }}
                                className="w-20 h-20 rounded-full bg-gold/20 md:backdrop-blur-md border border-gold flex items-center justify-center text-gold shadow-[0_0_30px_rgba(212,175,55,0.4)]"
                            >
                                <Play fill="currentColor" size={32} className="ml-1" />
                            </motion.div>
                        )}
                    </div>
                    <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/90 to-transparent">
                        <h3 className={`font-serif text-white ${isCenter ? "text-3xl" : "text-xl"}`}>{card.title}</h3>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default function CinematicVideoCarousel() {
    const [activeIndex, setActiveIndex] = useState(0);

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % VIDEOS.length);
    };

    const handlePrev = () => {
        setActiveIndex((prev) => (prev - 1 + VIDEOS.length) % VIDEOS.length);
    };

    const getVisibleCards = () => {
        const total = VIDEOS.length;
        const prevIndex = (activeIndex - 1 + total) % total;
        const nextIndex = (activeIndex + 1) % total;
        return [
            { ...VIDEOS[prevIndex], position: "left", index: prevIndex },
            { ...VIDEOS[activeIndex], position: "center", index: activeIndex },
            { ...VIDEOS[nextIndex], position: "right", index: nextIndex },
        ];
    };

    return (
        <section className="relative py-24 px-6 md:perspective-1000 overflow-hidden">
            {/* Section Specific Artistic Background */}
            <div
                className="absolute inset-0 z-0 bg-cover bg-center bg-no-repeat opacity-30 mix-blend-overlay"
                style={{ backgroundImage: "url('/assets/carousel-bg-new.jpg')" }}
            />
            <div className="absolute inset-0 z-0 bg-gradient-to-t from-black via-transparent to-black" />

            <div className="container mx-auto max-w-6xl relative z-10">
                <div className="flex flex-col items-center mb-12">
                    <h2 className="font-serif text-5xl mb-4 text-center">Client <span className="text-gold">Reviews</span></h2>
                    <div className="h-1 w-24 bg-gradient-to-r from-transparent via-gold to-transparent" />
                </div>

                <div className="relative h-[400px] md:h-[500px] flex items-center justify-center">
                    <AnimatePresence mode="popLayout">
                        {getVisibleCards().map((card) => (
                            <CinematicCard
                                key={card.id}
                                card={card}
                                position={card.position}
                                onPrev={handlePrev}
                                onNext={handleNext}
                            />
                        ))}
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <button
                        onClick={handlePrev}
                        className="absolute left-4 md:left-10 z-40 p-3 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white hover:bg-gold hover:text-black hover:scale-110 transition-all font-bold group"
                    >
                        <ChevronLeft size={32} />
                    </button>
                    <button
                        onClick={handleNext}
                        className="absolute right-4 md:right-10 z-40 p-3 rounded-full bg-black/20 backdrop-blur-md border border-white/10 text-white hover:bg-gold hover:text-black hover:scale-110 transition-all font-bold group"
                    >
                        <ChevronRight size={32} />
                    </button>
                </div>
            </div>
        </section>
    );
}
