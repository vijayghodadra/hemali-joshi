"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import NewsIntro from "@/components/NewsIntro";
import Footer from "@/components/Footer";
import { ExternalLink, Calendar, Newspaper, Play, Star } from "lucide-react";

const GENERAL_NEWS = [
    { id: 4, src: "/assets/News/article_interview.jpg", title: "Press Clipping", source: "Times Of India", date: "Interview", span: "md:col-span-2 md:row-span-2" },
    { id: 2, src: "/assets/News/Spark news .jpeg", title: "Media Spotlight", source: "Spark News", date: "Coverage", span: "col-span-1" },
    { id: 1, src: "/assets/News/sandesh.jpeg", title: "Cultural Achievements", source: "Sandesh News", date: "Feature", span: "col-span-1" },
    { id: 3, src: "/assets/News/media_collage_2.jpg", title: "Live Performance Highlights", source: "Press Coverage", date: "2024", span: "col-span-1" },
];

const PATAN_NEWS = [
    { id: 7, src: "/assets/News/IMG_7113.JPG", title: "Musical Journey", source: "Lifestyle Magazine", date: "Profile", span: "col-span-1" },
    { id: 4, src: "/assets/News/IMG_7110.JPG", title: "Navratri Special Feature", source: "Gujarat Samachar", date: "2024", span: "col-span-1" },
    { id: 5, src: "/assets/News/IMG_7112.JPG", title: "Cultural Excellence Award", source: "Divya Bhaskar", date: "2024", span: "col-span-1" },
    { id: 6, src: "/assets/News/IMG_7109.JPG", title: "Voice of Gujarat", source: "City News", date: "Exclusive", span: "col-span-1" },
    { id: 8, src: "/assets/News/IMG_7111.JPG", title: "Live Performance", source: "Event Coverage", date: "2023", span: "col-span-1" },
    { id: 10, src: "/assets/News/f86147fd-8ba6-4252-bad6-b677022ab066.JPG", title: "Community Recognition", source: "Local Press", date: "Award", span: "col-span-1" },
    { id: 11, src: "/assets/News/cc5b3716-4fef-4d05-94c5-11ac1a560463.JPG", title: "The Art of Garba", source: "Culture Beat", date: "Review", span: "col-span-1" },
];

const ALL_NEWS_ITEMS = [...GENERAL_NEWS, ...PATAN_NEWS];

export default function NewsContent() {
    const [showIntro, setShowIntro] = useState(true);
    const [selectedArticle, setSelectedArticle] = useState<typeof ALL_NEWS_ITEMS[0] | null>(null);

    return (
        <main className="min-h-screen bg-black text-white selection:bg-gold selection:text-black">
            {showIntro && (
                <NewsIntro onComplete={() => setShowIntro(false)} />
            )}

            {!showIntro && (
                <div className="pt-24 animate-in fade-in duration-1000">

                    {/* Header */}
                    <section className="container mx-auto px-6 py-16 text-center">
                        <motion.div
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, ease: "easeOut" }}
                        >
                            <div className="inline-block p-1 px-4 rounded-full border border-gold/30 bg-gold/5 text-gold text-xs font-serif tracking-[0.3em] uppercase mb-6 backdrop-blur-md">
                                Editorial & Press Coverage
                            </div>
                            <h1 className="font-serif text-6xl md:text-8xl mb-8 text-white leading-tight">
                                Himali's <span className="text-gold italic">Buzz</span>
                            </h1>
                            <p className="text-gray-400 max-w-2xl mx-auto mb-8 font-light italic">
                                Stay updated with the latest news, press features, and media highlights.
                            </p>
                            <div className="h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto opacity-50" />
                        </motion.div>
                    </section>

                    {/* 1. NEWS SECTION (TOI & SANDESH) */}
                    <section className="container mx-auto px-6 pb-12 max-w-7xl">
                        <motion.div 
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="flex flex-col items-center mb-12"
                        >
                            <div className="inline-block px-4 py-1 border border-gold/30 rounded-full text-[10px] uppercase tracking-widest text-gold mb-4 bg-gold/5">
                                Featured Press
                            </div>
                        </motion.div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
                            {GENERAL_NEWS.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1, duration: 0.8 }}
                                    className={`group relative overflow-hidden rounded-xl border border-white/10 bg-[#0a0a0a] shadow-2xl ${item.span || ""}`}
                                    onClick={() => setSelectedArticle(item)}
                                >
                                    <div className="relative w-full aspect-[4/5] md:aspect-auto md:h-full min-h-[300px]">
                                        <Image
                                            src={item.src}
                                            alt={item.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-1000"
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                        />
                                        {/* Cinematic Overlay */}
                                        <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-6 flex flex-col justify-end">
                                            <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                                                <div className="flex items-center gap-2 text-gold text-[10px] tracking-widest uppercase mb-3">
                                                    <span className="px-2 py-0.5 border border-gold/30 rounded-full bg-black/40 backdrop-blur-sm">{item.source}</span>
                                                    <span className="text-white/40">{item.date}</span>
                                                </div>
                                                <h3 className="text-xl md:text-2xl font-serif text-white group-hover:text-gold transition-colors leading-tight mb-2">
                                                    {item.title}
                                                </h3>
                                                <div className="w-0 group-hover:w-12 h-px bg-gold transition-all duration-500" />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    {/* 2. THANK YOU PATAN SECTION */}
                    <section className="relative overflow-hidden bg-[#050505] py-16 md:py-20 border-y border-white/5">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none opacity-20">
                            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/10 rounded-full blur-[120px]" />
                            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-red-900/10 rounded-full blur-[120px]" />
                        </div>

                        <div className="container mx-auto px-6 relative z-10">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 1 }}
                                className="text-center mb-20"
                            >
                                <div className="inline-flex items-center gap-4 mb-6">
                                    <div className="h-[1px] w-12 md:w-24 bg-gradient-to-r from-transparent to-gold" />
                                    <span className="font-serif text-gold text-lg md:text-xl italic tracking-widest">Special Appreciation</span>
                                    <div className="h-[1px] w-12 md:w-24 bg-gradient-to-l from-transparent to-gold" />
                                </div>
                                <h2 className="font-serif text-5xl md:text-8xl text-white mb-8 leading-none tracking-tighter">
                                    Thank You <span className="italic block text-gold mt-2">Patan</span>
                                </h2>
                                <p className="text-gray-400 max-w-xl mx-auto font-light italic leading-relaxed text-sm md:text-base">
                                    Honored by the overwhelming love and recognition from the historic city of Patan. These memories remain etched in gold.
                                </p>
                            </motion.div>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                                {PATAN_NEWS.map((item, index) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, rotate: index % 2 === 0 ? -5 : 5, y: 50 }}
                                        whileInView={{ opacity: 1, rotate: index % 3 === 0 ? -2 : 2, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.15, duration: 1, type: "spring" }}
                                        whileHover={{ scale: 1.05, rotate: 0, zIndex: 30 }}
                                        className="relative group"
                                        onClick={() => setSelectedArticle(item)}
                                    >
                                        <div className="bg-white p-3 md:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5 transition-all duration-700 group-hover:shadow-gold/20">
                                            <div className="relative aspect-[3/4] overflow-hidden bg-[#f5f5f5]">
                                                <Image src={item.src} alt={item.title} fill className="object-contain filter contrast-[1.02] sepia-[0.1]" />
                                            </div>
                                            <div className="mt-4 flex flex-col items-center">
                                                <div className="h-px w-8 bg-black/10 mb-2" />
                                                <span className="text-[10px] uppercase tracking-widest text-gray-500 font-serif">City News Coverage</span>
                                                <h4 className="text-sm font-serif text-gray-800 mt-1 italic text-center">{item.title}</h4>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </section>

                    {/* 3. PODCAST SECTION */}
                    <section className="container mx-auto px-6 py-16">
                        <div className="relative rounded-3xl overflow-hidden border border-gold/20 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] shadow-[0_30px_80px_rgba(0,0,0,0.8)]">
                            <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-gold/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 pointer-events-none" />
                            
                            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8 p-6 md:p-12 lg:p-14">
                                <div className="w-full lg:w-1/3 flex justify-center">
                                    <motion.div 
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        whileHover={{ scale: 1.05, rotate: 2 }}
                                        viewport={{ once: true }}
                                        className="relative w-full max-w-md aspect-video rounded-2xl overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] border-4 border-white/10 group cursor-pointer"
                                    >
                                        <Image src="/podcast.jpeg" alt="Podcast Cover" fill className="object-cover filter contrast-[1.1] saturate-50 group-hover:saturate-100 transition-all duration-700" />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent flex items-end p-6">
                                            <div>
                                                <div className="text-gold font-serif tracking-widest text-xs uppercase mb-1">Episode 1</div>
                                                <div className="text-white font-serif text-lg leading-none">Himali's Voice</div>
                                            </div>
                                        </div>
                                    </motion.div>
                                </div>

                                <div className="w-full lg:w-2/3 text-center lg:text-left">
                                    <div className="inline-block px-4 py-1.5 border border-gold/30 rounded-full text-xs uppercase tracking-[0.2em] text-gold mb-6 bg-gold/5 backdrop-blur-sm">
                                        Featured Podcast
                                    </div>
                                    <h2 className="font-serif text-3xl md:text-5xl text-white mb-6 leading-tight">
                                        The Rhythm of <span className="text-gold italic">Roots</span>
                                    </h2>
                                    <p className="text-gray-400 text-lg mb-10 max-w-2xl font-light italic leading-relaxed">
                                        Join Himali as she discusses the journey of remastering traditional Gujarati folk music for the modern generation and the vibrant energy of global live performances.
                                    </p>

                                    <div className="w-full max-w-xl aspect-video rounded-2xl overflow-hidden border border-white/10 shadow-2xl mx-auto lg:mx-0 bg-black">
                                        <iframe
                                            width="100%"
                                            height="100%"
                                            src="https://www.youtube.com/embed/DrXeWuPPYGc"
                                            title="YouTube video player"
                                            frameBorder="0"
                                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                            allowFullScreen
                                            className="opacity-80 hover:opacity-100 transition-opacity duration-500"
                                        ></iframe>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* 4. JUDGE SECTION (NEW) */}
                    <section className="container mx-auto px-6 py-16 mb-10 border-t border-white/5">
                        <div className="flex flex-col lg:flex-row items-center gap-16">
                            <div className="w-full lg:w-1/2">
                                <motion.div
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    className="relative"
                                >
                                    <div className="inline-block px-4 py-1 border border-gold/30 rounded-full text-[10px] uppercase tracking-widest text-gold mb-6 bg-gold/5">
                                        Mentorship & Artistry
                                    </div>
                                    <h2 className="font-serif text-5xl md:text-7xl text-white mb-8 leading-tight">
                                        Nurturing the <br />
                                        <span className="text-gold italic">Next Generation</span>
                                    </h2>
                                    <p className="text-gray-400 text-lg mb-10 font-light italic leading-relaxed">
                                        As a distinguished judge and mentor, Himali brings her years of classical training and global performance experience to empower emerging talents.
                                    </p>
                                    <div className="flex flex-col gap-6">
                                        <div className="flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 group">
                                            <div className="w-12 h-12 rounded-lg bg-gold/10 flex items-center justify-center text-gold group-hover:bg-gold group-hover:text-black transition-all">
                                                <Star size={20} />
                                            </div>
                                            <div>
                                                <h4 className="text-white font-medium">Expert Critique</h4>
                                                <p className="text-xs text-gray-500">Providing technical insights to elevate vocal performances.</p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>

                            <div className="w-full lg:w-1/2">
                                <div className="grid grid-cols-2 gap-4">
                                    <motion.div
                                        initial={{ opacity: 0, scale: 0.9 }}
                                        whileInView={{ opacity: 1, scale: 1 }}
                                        viewport={{ once: true }}
                                        className="relative aspect-[3/4] rounded-2xl overflow-hidden border-2 border-white/10 shadow-2xl col-span-2 md:col-span-1"
                                    >
                                        <Image src="/Judge/jud 1.jpeg" alt="Judge Moment 1" fill className="object-cover" />
                                    </motion.div>
                                    <div className="grid grid-rows-2 gap-4 col-span-2 md:col-span-1">
                                        <motion.div
                                            initial={{ opacity: 0, x: 20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            className="relative aspect-[3/4] rounded-xl overflow-hidden border border-white/10 shadow-xl"
                                        >
                                            <Image src="/Judge/jud 2.jpeg" alt="Judge Moment 2" fill className="object-cover" />
                                        </motion.div>
                                        <motion.div
                                            initial={{ opacity: 0, x: 20 }}
                                            whileInView={{ opacity: 1, x: 0 }}
                                            viewport={{ once: true }}
                                            transition={{ delay: 0.2 }}
                                            className="relative aspect-video rounded-xl overflow-hidden border border-white/10 shadow-xl"
                                        >
                                            <Image src="/Judge/jud 3.jpeg" alt="Judge Moment 3" fill className="object-cover" />
                                        </motion.div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>

                    <Footer />

                    {/* Article Reading Modal */}
                    {selectedArticle && (
                        <div className="fixed inset-0 z-[100] flex items-center justify-center p-2 md:p-8 perspective-1000">
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                onClick={() => setSelectedArticle(null)}
                                className="absolute inset-0 bg-black/95 backdrop-blur-xl cursor-pointer"
                            />

                            <motion.div
                                layoutId={`article-${selectedArticle.id}`}
                                initial={(selectedArticle as any).content ? { rotateX: 90, opacity: 0 } : { scale: 0.9, opacity: 0 }}
                                animate={(selectedArticle as any).content ? { rotateX: 0, opacity: 1 } : { scale: 1, opacity: 1 }}
                                exit={(selectedArticle as any).content ? { rotateX: -90, opacity: 0 } : { scale: 0.9, opacity: 0 }}
                                transition={{ type: "spring", damping: 20, stiffness: 100 }}
                                className={`relative overflow-hidden shadow-2xl flex flex-col
                                    ${(selectedArticle as any).content ? "w-full max-w-5xl max-h-[90vh] rounded-sm items-center bg-[#fdfbf7] text-black" : "w-screen h-screen bg-black/60 text-white"}`}
                                style={{ transformOrigin: "top" }}
                                onClick={(e) => e.stopPropagation()}
                            >
                                {/* Close Button */}
                                <button
                                    onClick={() => setSelectedArticle(null)}
                                    className={`absolute top-4 right-4 z-[110] w-10 h-10 rounded-full flex items-center justify-center transition-colors border
                                        ${(selectedArticle as any).content ? "bg-black/10 text-black hover:bg-black hover:text-white border-black/20" : "bg-black/50 text-white hover:bg-gold hover:text-black border-white/10"}`}
                                >
                                    ✕
                                </button>

                                {/* Content Logic: If text exists, show text layout as Newspaper */}
                                {(selectedArticle as any).content ? (
                                    <div className="flex-1 overflow-y-auto p-8 md:p-16 w-full max-w-5xl mx-auto custom-scrollbar bg-[#fdfbf7]">
                                        {/* Paper Texture Overlay */}
                                        <div className="absolute inset-0 bg-black/[0.03] pointer-events-none mix-blend-multiply z-0" />

                                        <div className="relative z-10 text-center mb-10 border-b-2 border-black pb-8">
                                            <div className="flex items-center justify-center gap-4 mb-4 opacity-60">
                                                <span className="h-px w-10 bg-black" />
                                                <span className="text-[10px] uppercase tracking-[0.4em] text-black font-semibold">{selectedArticle.source}</span>
                                                <span className="h-px w-10 bg-black" />
                                            </div>
                                            <h1 className="text-4xl md:text-7xl font-serif font-black text-[#1a1a1a] mb-6 leading-[0.9] uppercase tracking-tighter">{selectedArticle.title}</h1>
                                            <div className="flex justify-between items-center text-xs font-serif italic border-t border-black/20 pt-2 text-gray-600">
                                                <span>Vadodara Edition</span>
                                                <span>{selectedArticle.date}</span>
                                                <span>Page 1</span>
                                            </div>
                                        </div>

                                        <div className="relative z-10 prose prose-lg max-w-none text-[#2a2a2a]">
                                            <div className="md:columns-2 gap-12 font-serif text-lg leading-relaxed text-justify">
                                                {/* Newspaper Photo Cutout */}
                                                <div className="float-right ml-6 mb-6 w-48 md:w-64 relative rotate-2 p-2 bg-white shadow-md border border-gray-200">
                                                    <div className="relative overflow-hidden aspect-[4/5] filter grayscale contrast-125 sepia-[0.3]">
                                                        <Image
                                                            src="/assets/News/IMG_7113.JPG"
                                                            alt="Himali Joshi Performing"
                                                            fill
                                                            className="object-cover mix-blend-multiply"
                                                        />
                                                    </div>
                                                    <p className="text-[10px] text-center mt-2 font-sans uppercase tracking-wider text-gray-500">Live in Concert</p>
                                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-yellow-200/80 -rotate-2 opacity-60 backdrop-blur-sm shadow-sm" />
                                                </div>

                                                {(selectedArticle as any).content.split('\n\n').map((paragraph: string, i: number) => (
                                                    <React.Fragment key={i}>
                                                        <p className="mb-6 indent-8 text-justify">
                                                            {i === 0 && <span className="float-left text-6xl font-black leading-[0.8] mr-3 mt-[-6px] font-sans">S</span>}
                                                            {i === 0 ? paragraph.substring(1) : paragraph.replace(/"/g, '')}
                                                        </p>
                                                    </React.Fragment>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="mt-12 pt-12 border-t-4 border-double border-black/20 text-center relative z-10">
                                            <p className="font-serif italic text-2xl">~ Himali Joshi ~</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex-1 bg-[#050505]/95 relative overflow-hidden flex items-center justify-center w-full h-full">
                                        <div className="relative w-full h-full p-4 md:p-12">
                                            <Image
                                                src={selectedArticle.src}
                                                alt={selectedArticle.title}
                                                fill
                                                className="object-contain shadow-[0_0_50px_rgba(0,0,0,0.8)]"
                                                sizes="(max-width: 768px) 100vw, 90vw"
                                                priority
                                            />
                                        </div>
                                    </div>
                                )}

                                {/* Article Info Overlay (Only for image mode on Mobile) */}
                                {!(selectedArticle as any).content && (
                                    <div className="bg-black/80 backdrop-blur-md p-6 border-t border-white/10 md:hidden w-full">
                                        <h3 className="text-xl font-serif text-gold mb-2">{selectedArticle.title}</h3>
                                        <p className="text-gray-400 text-sm">{selectedArticle.source} • {selectedArticle.date}</p>
                                    </div>
                                )}
                            </motion.div>
                        </div>
                    )}
                </div>
            )}
        </main>
    );
}
