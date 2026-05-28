"use client";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { Play, ChevronLeft, ChevronRight, Volume2, VolumeX } from "lucide-react";
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
];

const CinematicCard = ({ card, position, onPrev, onNext, onSelectVideo, isModalOpen }: { card: any, position: string, onPrev: () => void, onNext: () => void, onSelectVideo: (videoUrl: string, title: string) => void, isModalOpen: boolean }) => {
    const router = useRouter();
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isHovered, setIsHovered] = useState(false);
    const [isPlaying, setIsPlaying] = useState(false);
    const [cardMuted, setCardMuted] = useState(false);
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
        if (isCenter && isHovered && videoRef.current && hasVideo && !isModalOpen) {
            timeout = setTimeout(() => {
                videoRef.current?.play()
                    .then(() => setIsPlaying(true))
                    .catch((err) => {
                        console.log("Playback failed, trying muted:", err);
                        if (videoRef.current) {
                            videoRef.current.muted = true;
                            setCardMuted(true);
                            videoRef.current.play()
                                .then(() => setIsPlaying(true))
                                .catch(() => {});
                        }
                    });
            }, 500);
        } else {
            if (videoRef.current) {
                videoRef.current.pause();
                videoRef.current.currentTime = 0;
                videoRef.current.muted = false; // Reset to unmuted for the next play
                setCardMuted(false);
                setIsPlaying(false);
            }
        }
        return () => clearTimeout(timeout);
    }, [isCenter, isHovered, hasVideo, isModalOpen]);

    return (
        <motion.div
            layoutId={`card-${card.id}`}
            className={`absolute rounded-2xl transition-all duration-500 cursor-pointer
                ${isCenter ? "z-30 w-[80%] md:w-[60%] h-full border-2 border-gold/30 shadow-[0_0_50px_rgba(212,175,55,0.2)]" : "z-10 w-[60%] md:w-[40%] h-[80%] opacity-60 brightness-50 grayscale hover:grayscale-0"}
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
            onClick={() => {
                router.push("/events#what-celebrities-say");
            }}
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
                        playsInline
                        loop
                        preload="none" // Optimize loading
                    />
                )}

                {/* Volume Toggle Button */}
                {isCenter && hasVideo && isPlaying && (
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            if (videoRef.current) {
                                const nextMuted = !videoRef.current.muted;
                                videoRef.current.muted = nextMuted;
                                setCardMuted(nextMuted);
                            }
                        }}
                        className="absolute top-4 right-4 z-40 p-3 rounded-full bg-black/40 backdrop-blur-md border border-white/10 text-white/70 hover:text-white hover:bg-black/60 transition-all pointer-events-auto"
                        aria-label={cardMuted ? "Unmute review video" : "Mute review video"}
                    >
                        {cardMuted ? (
                            <VolumeX size={18} />
                        ) : (
                            <Volume2 size={18} />
                        )}
                    </button>
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
    const [selectedVideo, setSelectedVideo] = useState<{ url: string, title: string } | null>(null);

    const handleNext = () => {
        setActiveIndex((prev) => (prev + 1) % VIDEOS.length);
    };

    const handlePrev = () => {
        setActiveIndex((prev) => (prev - 1 + VIDEOS.length) % VIDEOS.length);
    };

    const getVisibleCards = () => {
        const total = VIDEOS.length;
        if (total === 0) return [];
        if (total === 1) {
            return [{ ...VIDEOS[0], position: "center", index: 0 }];
        }
        if (total === 2) {
            const otherIndex = (activeIndex + 1) % 2;
            return [
                { ...VIDEOS[otherIndex], position: "left", index: otherIndex },
                { ...VIDEOS[activeIndex], position: "center", index: activeIndex },
            ];
        }
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
                <Link href="/events#what-celebrities-say" className="flex flex-col items-center mb-12 group cursor-pointer w-fit mx-auto">
                    <h2 className="font-serif text-5xl mb-4 text-center group-hover:text-gold transition-colors">Client <span className="text-gold group-hover:text-white transition-colors">Reviews</span></h2>
                    <div className="h-1 w-24 bg-gradient-to-r from-transparent via-gold to-transparent group-hover:scale-x-125 transition-transform duration-300" />
                </Link>

                <div className="relative h-[400px] md:h-[500px] flex items-center justify-center">
                    <AnimatePresence mode="popLayout">
                        {getVisibleCards().map((card) => (
                            <CinematicCard
                                key={card.id}
                                card={card}
                                position={card.position}
                                onPrev={handlePrev}
                                onNext={handleNext}
                                onSelectVideo={(url, title) => setSelectedVideo({ url, title })}
                                isModalOpen={selectedVideo !== null}
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

            {/* Lightbox Modal */}
            <AnimatePresence>
                {selectedVideo && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/95 backdrop-blur-xl"
                        onClick={() => setSelectedVideo(null)}
                    >
                        {/* Close button */}
                        <button
                            onClick={() => setSelectedVideo(null)}
                            className="absolute top-6 right-6 z-[110] w-12 h-12 rounded-full bg-white/10 hover:bg-gold hover:text-black border border-white/20 text-white flex items-center justify-center text-xl transition-all shadow-[0_0_20px_rgba(0,0,0,0.8)]"
                        >
                            ✕
                        </button>

                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 120 }}
                            className="relative w-full max-w-5xl aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-[0_30px_80px_rgba(0,0,0,0.8)] bg-black"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <video
                                src={selectedVideo.url}
                                className="w-full h-full object-contain"
                                controls
                                autoPlay
                                playsInline
                            />
                            {/* Title bar */}
                            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black via-black/40 to-transparent pointer-events-none">
                                <h3 className="font-serif text-white text-xl md:text-2xl drop-shadow-md">{selectedVideo.title}</h3>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
}
