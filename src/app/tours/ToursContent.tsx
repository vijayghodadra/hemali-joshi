"use client";
import { Star, MapPin, Calendar, ArrowRight, Play, Pause } from "lucide-react";
import { useState, useRef } from "react";
import Footer from "@/components/Footer";
import EventsHeaderTitle from "@/components/EventsHeaderTitle";

export default function ToursContent() {
    return (
        <main className="min-h-screen bg-black text-white pt-24 selection:bg-gold selection:text-black overflow-x-hidden">
            {/* Hero Section */}
            <section className="relative px-6 py-20 text-center container mx-auto">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-px h-24 bg-gradient-to-b from-transparent to-gold/50" />

                <EventsHeaderTitle />
                <p className="text-xl md:text-2xl text-gold/80 font-serif italic tracking-wider mb-12">
                    Performing on stages across the globe.
                </p>

                <div className="flex justify-center">
                    <div className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent opacity-50" />
                </div>
            </section>

            {/* Artistic Events List */}
            <section className="container mx-auto px-6 pb-24 max-w-5xl">
                <div className="grid gap-12">
                    {/* Event 1: UK 24 25 */}
                    <div className="group relative bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:bg-white/10 transition-all duration-500">
                        <div className="absolute inset-0 bg-gradient-to-r from-maroon/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="p-8 md:p-12 relative z-10 flex flex-col md:flex-row gap-8">
                            <div className="flex-1 w-full">
                                <span className="inline-block px-3 py-1 border border-maroon/50 rounded-full text-xs uppercase tracking-widest text-gold mb-4">International</span>
                                <h3 className="text-3xl md:text-5xl font-serif mb-2 text-white">UK 24 25</h3>
                                <p className="text-gray-400 flex items-center gap-2 mb-8">
                                    <MapPin size={16} className="text-gold" /> United Kingdom
                                </p>
                                
                                {/* Static Grid Gallery */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {[
                                        { src: "/assets/Bansi/2024.jpeg", label: "London Dreams" },
                                        { src: "/assets/Bansi/20251.jpeg", label: "Performance Night" },
                                        { src: "/assets/Bansi/20252.jpeg", label: "UK Tour Moments" }
                                    ].map((img, idx) => (
                                        <div key={idx} className="relative aspect-[4/5] rounded-xl overflow-hidden border border-white/10 group/card">
                                            <img
                                                src={img.src}
                                                alt={img.label}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110"
                                            />
                                            <div className="absolute inset-x-0 bottom-0 p-4 bg-gradient-to-t from-black/90 to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300">
                                                <p className="text-xs uppercase tracking-widest text-gold text-center font-medium">{img.label}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="hidden md:flex border-l border-white/10 pl-8 flex-col justify-center">
                                <span className="text-6xl font-serif text-gold/10 group-hover:text-gold/30 transition-colors duration-500">01</span>
                            </div>
                        </div>
                    </div>

                    {/* Event 2: USA */}
                    <div className="group relative bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:bg-white/10 transition-all duration-500">
                        <div className="absolute inset-0 bg-gradient-to-r from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="p-8 md:p-12 relative z-10 flex flex-col md:flex-row gap-8">
                            <div className="flex-1 w-full">
                                <span className="inline-block px-3 py-1 border border-gold/30 rounded-full text-xs uppercase tracking-widest text-gold mb-4">World Tour</span>
                                <h3 className="text-3xl md:text-5xl font-serif mb-2 text-white">USA</h3>
                                <p className="text-gray-400 flex items-center gap-2 mb-8">
                                    <MapPin size={16} className="text-gold" /> United States of America
                                </p>
                                
                                {/* Static Grid Gallery */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    <div className="relative aspect-[4/5] sm:aspect-auto sm:col-span-1 rounded-xl overflow-hidden border border-white/10 bg-black group/card">
                                         <VideoItem src="/assets/tours/usa/us 2.mp4" />
                                    </div>
                                    <div className="relative aspect-[4/5] sm:aspect-auto sm:col-span-1 rounded-xl overflow-hidden border border-white/10 group/card">
                                        <img
                                            src="/assets/tours/usa/us 1.jpeg"
                                            alt="USA Background"
                                            className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110"
                                        />
                                    </div>
                                    <div className="relative aspect-[4/5] sm:aspect-auto sm:col-span-1 rounded-xl overflow-hidden border border-white/10 bg-black group/card">
                                         <VideoItem src="/assets/tours/usa/us 3.mp4" />
                                    </div>
                                </div>
                            </div>
                            <div className="hidden md:flex border-l border-white/10 pl-8 flex-col justify-center">
                                <span className="text-6xl font-serif text-gold/10 group-hover:text-gold/30 transition-colors duration-500">02</span>
                            </div>
                        </div>
                    </div>

                    {/* Event 3: Ratri Before Navratri */}
                    <div className="group relative bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:bg-white/10 transition-all duration-500">
                        <div className="absolute inset-0 bg-gradient-to-r from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="p-8 md:p-12 relative z-10 flex flex-col md:flex-row gap-8">
                            <div className="flex-1 w-full">
                                <span className="inline-block px-3 py-1 border border-gold/30 rounded-full text-xs uppercase tracking-widest text-gold mb-4">Navratri</span>
                                <h3 className="text-3xl md:text-5xl font-serif mb-2 text-white">Ratri Before Navratri</h3>
                                <p className="text-gray-400 flex items-center gap-2 mb-8">
                                    <MapPin size={16} className="text-gold" /> Vadodara, Gujarat
                                </p>
                                
                                {/* Static Grid Gallery */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {[
                                        { src: "/assets/tours/Vadodara/vod 2.jpeg", label: "Performance" },
                                        { src: "/assets/tours/Vadodara/Vod 3.jpeg", label: "Event Background" },
                                        { src: "/assets/tours/Vadodara/Vod 1.jpeg", label: "Stage" }
                                    ].map((img, idx) => (
                                        <div key={idx} className="relative aspect-[4/5] rounded-xl overflow-hidden border border-white/10 group/card">
                                            <img
                                                src={img.src}
                                                alt={img.label}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="hidden md:flex border-l border-white/10 pl-8 flex-col justify-center">
                                <span className="text-6xl font-serif text-gold/10 group-hover:text-gold/30 transition-colors duration-500">03</span>
                            </div>
                        </div>
                    </div>

                    {/* Event 4: Sharad Purnima */}
                    <div className="group relative bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:bg-white/10 transition-all duration-500">
                        <div className="absolute inset-0 bg-gradient-to-r from-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="p-8 md:p-12 relative z-10 flex flex-col md:flex-row gap-8">
                            <div className="flex-1 w-full">
                                <span className="inline-block px-3 py-1 border border-gold/30 rounded-full text-xs uppercase tracking-widest text-gold mb-4">Cultural</span>
                                <h3 className="text-3xl md:text-5xl font-serif mb-2 text-white">Sharad Purnima</h3>
                                <p className="text-gray-400 flex items-center gap-2 mb-8">
                                    <MapPin size={16} className="text-gold" /> Patan, Gujarat
                                </p>
                                
                                {/* Static Grid Gallery */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {[
                                        { src: "/assets/tours/patan/patan 1.jpeg", label: "Performance" },
                                        { src: "/assets/tours/patan/Patan 2.jpeg", label: "Patan Background" },
                                        { src: "/assets/tours/patan/patan 3.jpeg", label: "Stage" }
                                    ].map((img, idx) => (
                                        <div key={idx} className="relative aspect-[4/5] rounded-xl overflow-hidden border border-white/10 group/card">
                                            <img
                                                src={img.src}
                                                alt={img.label}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="hidden md:flex border-l border-white/10 pl-8 flex-col justify-center">
                                <span className="text-6xl font-serif text-gold/10 group-hover:text-gold/30 transition-colors duration-500">04</span>
                            </div>
                        </div>
                    </div>

                    {/* Event 5: Yash Raj Studios */}
                    <div className="group relative bg-white/5 border border-white/10 rounded-3xl overflow-hidden hover:bg-white/10 transition-all duration-500">
                        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <div className="p-8 md:p-12 relative z-10 flex flex-col md:flex-row gap-8">
                            <div className="flex-1 w-full">
                                <span className="inline-block px-3 py-1 border border-purple-500/30 rounded-full text-xs uppercase tracking-widest text-gold mb-4">Bollywood</span>
                                <h3 className="text-3xl md:text-5xl font-serif mb-2 text-white">Yash Raj Studios</h3>
                                <p className="text-gray-400 flex items-center gap-2 mb-8">
                                    <Star size={16} className="text-gold" /> Exclusive Project
                                </p>
                                
                                {/* Static Grid Gallery */}
                                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                    {[
                                        { src: "yrf1.JPG", label: "Yash Raj Studios Work 1" },
                                        { src: "yrf2.JPG", label: "Yash Raj Studios Work 2" },
                                        { src: "yrf3.JPG", label: "Yash Raj Studios Work 3" }
                                    ].map((img, idx) => (
                                        <div key={idx} className="relative aspect-[4/5] rounded-xl overflow-hidden border border-white/10 group/card">
                                            <img
                                                src={`/assets/tours/${img.src}`}
                                                alt={img.label}
                                                className="w-full h-full object-cover transition-transform duration-500 group-hover/card:scale-110"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="hidden md:flex border-l border-white/10 pl-8 flex-col justify-center">
                                <span className="text-6xl font-serif text-gold/10 group-hover:text-gold/30 transition-colors duration-500">05</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Quote */}
                <div className="mt-20 text-center">
                    <p className="font-serif italic text-2xl text-gray-500">
                        "Creating moments that last a lifetime."
                    </p>
                </div>
            </section>

            <Footer />
        </main>
    );
}

// Custom Video Player with Play Button Overlay
function VideoItem({ src }: { src: string }) {
    const videoRef = useRef<HTMLVideoElement>(null);
    const [isPlaying, setIsPlaying] = useState(false);

    const togglePlay = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <div className="relative w-full h-full cursor-pointer" onClick={togglePlay}>
            <video
                ref={videoRef}
                src={src}
                loop
                muted
                playsInline
                className="w-full h-full object-cover"
            />
            {/* Play/Pause Button Overlay */}
            <div className={`absolute inset-0 flex items-center justify-center bg-black/40 transition-opacity duration-300 ${isPlaying ? 'opacity-0 hover:opacity-100' : 'opacity-100'}`}>
                <div className="w-12 h-12 rounded-full bg-gold/80 flex items-center justify-center text-black shadow-xl transform transition-transform hover:scale-110 active:scale-95">
                    {isPlaying ? <Pause size={20} fill="currentColor" /> : <Play size={20} className="ml-1" fill="currentColor" />}
                </div>
            </div>
        </div>
    );
}
