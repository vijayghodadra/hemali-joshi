"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import NewsIntro from "@/components/NewsIntro";
import Footer from "@/components/Footer";
import { ExternalLink, Calendar, Newspaper } from "lucide-react";

const GENERAL_NEWS = [
    {
        id: 0,
        src: "/assets/News/article_interview.jpg",
        title: "She Dons Several Hats With Confidence",
        source: "Times of India Vadodara",
        date: "Feature Story",
        span: "col-span-1 md:col-span-2 row-span-2",
        content: `She dons several hats with confidence and has her eyes on the moon.

Meet Himali Joshi, a singer, composer, performer, writer and video creator. And it does not end here, she also has her own band and a production house too. Himali is making the most of her talent, time and resources. Her voice has already won her a huge fan base and her songs are a hit among music lovers. As a powerhouse of talent, she says the journey has just begun, better known for her popular song Chotile Dakla.

"Right from my childhood dance, music and writing became my passion. As I progressed in life, so did my passion. A trained musician, classical dancer, writer and composer, I have managed to explore my talents to win love and appreciation from people across the globe," says Himali.

Scan through her Youtube channel or Instagram reels, you see ardent followers and listeners showering their praise on her. Today she has to her credit several Garba albums topping charts, her songs used as backdrop of reels and her live performances leaving her audience mesmerised. Her authentic traditional garbas are the preferred choice of event organizers. She has performed at numerous prestigious locations both in India and internationally.

"It was during Covid I started fine tuning my art further, exploring composing songs, experimenting creating interesting videos and amplified my presence on online platforms. As an artist you can never be satisfied and one has to keep learning, improvising and creating something new all the time," adds Himali.

This go-getter and ambitious soul has also launched **White Door Production House** - a place that offers a platform for emerging talents to record their songs or create albums. "My production house is for giving emerging talents a place to kick-start their musical journey."

She is working on an interesting project wherein she is remastering old Gujarati songs, garbas and folk music into conventional formats for the Gen Z.

"Today's generation only listens to westernized versions of music. I want to ensure they listen, admire and consume traditional Gujarati songs too," shares Himali.

Since 2024 she has performed at a Navratri venue in London and has a fan following in USA, Canada, Australia and UK.

She is a verified artist on all musical channels like Spotify, iTune, Amazon Music, jio Saavan, gaana, etc. also with Youtube and Instagram.

"Performing live gives you an adrenaline rush and I enjoy being amongst the audience," avers Himali.`
    },
    { id: 1, src: "/assets/News/article_interview.jpg", title: "As an Artiste, I Keep Learning", source: "Times of India", date: "Interview", span: "col-span-1 md:col-span-2" },
    { id: 2, src: "/assets/News/media_collage_1.jpg", title: "Work Profile & Achievements", source: "Sandesh", date: "Feature", span: "col-span-1" },
    { id: 3, src: "/assets/News/media_collage_2.jpg", title: "Live Concert Highlights", source: "Spark Today", date: "Coverage", span: "col-span-1" },
    { id: 9, src: "/assets/News/IMG_7116.jpg", title: "Studio Sessions", source: "Behind The Scenes", date: "2024", span: "col-span-1" },
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
                                Stay updated with the latest news, press features, and media highlights of the <strong>best singer in India and Gujarat</strong>.
                            </p>
                            <div className="h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto opacity-50" />
                        </motion.div>
                    </section>

                    {/* Masonry-style Grid - General News */}
                    <section className="container mx-auto px-6 pb-20 max-w-7xl">
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 auto-rows-[300px] md:auto-rows-[400px]">
                            {GENERAL_NEWS.map((item, index) => (
                                <motion.div
                                    key={item.id}
                                    initial={{ opacity: 0, y: 40 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: index * 0.1, duration: 0.8 }}
                                    className={`group relative overflow-hidden rounded-md border border-white/10 bg-[#0a0a0a] ${item.span || ""}`}
                                    onClick={() => setSelectedArticle(item)}
                                >
                                    {/* Image with Contain to avoid cropping */}
                                    <div className="absolute inset-0 p-3 md:p-4 flex items-center justify-center bg-[#111] cursor-zoom-in">
                                        <div className="relative w-full h-full">
                                            {(item as any).content ? (
                                                <div className="flex flex-col h-full text-center p-6 border-8 border-double border-black/10 bg-[#fdfbf7] text-black shadow-[inset_0_0_40px_rgba(0,0,0,0.05)] overflow-hidden relative">
                                                    {/* Newspaper Header Style */}
                                                    <div className="border-b-2 border-black mb-4 pb-2">
                                                        <span className="block text-[10px] uppercase tracking-[0.3em] text-gray-500 mb-1">Exclusive Feature</span>
                                                        <h4 className="font-serif font-black text-xl uppercase tracking-widest text-[#1a1a1a]">{(item as any).source.split(' ')[0]}</h4>
                                                    </div>

                                                    {/* Headline */}
                                                    <h3 className="font-serif font-bold text-2xl md:text-3xl text-[#111] mb-4 leading-[0.9] text-left">
                                                        {item.title}
                                                    </h3>

                                                    {/* Columns Preview */}
                                                    <div className="text-left columns-2 gap-4 text-[10px] md:text-xs leading-relaxed text-gray-800 font-serif opacity-80 flex-1 overflow-hidden relative">
                                                        <p className="first-letter:text-3xl first-letter:font-bold first-letter:float-left first-letter:mr-2 first-letter:mt-[-4px]">
                                                            {(item as any).content.substring(0, 300)}...
                                                        </p>

                                                        {/* Sticker for Preview Card */}
                                                        <div className="absolute bottom-0 right-0 w-24 h-24 rotate-[-6deg] z-10 p-1 bg-white shadow-sm border border-gray-200">
                                                            <div className="relative w-full h-full overflow-hidden filter grayscale contrast-125">
                                                                <Image
                                                                    src="/assets/News/IMG_7113.JPG"
                                                                    alt="Himali Joshi Singing Live Preview"
                                                                    fill
                                                                    className="object-cover mix-blend-multiply"
                                                                />
                                                            </div>
                                                            {/* Mini Tape */}
                                                            <div className="absolute -top-2 left-1/2 -translate-x-1/2 w-8 h-3 bg-yellow-200/60 rotate-2 backdrop-blur-sm" />
                                                        </div>
                                                    </div>

                                                    {/* Fake Paper Texture overlay - using simple opacity noise if available or just opacity layer */}
                                                    <div className="absolute bottom-4 right-4 text-[10px] font-bold uppercase tracking-wider border-b border-black">Read More →</div>
                                                </div>
                                            ) : (
                                                <Image
                                                    src={item.src}
                                                    alt={item.title}
                                                    fill
                                                    className="object-contain transition-transform duration-700 group-hover:scale-[1.02] filter contrast-[1.05]"
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                />
                                            )}
                                        </div>
                                    </div>

                                    {/* Hover Overlay - Touching interaction for mobile */}
                                    <div className="absolute inset-0 bg-black/60 opacity-0 md:group-hover:opacity-100 transition-all duration-500 backdrop-blur-[2px] z-10 flex flex-col justify-end p-6 md:p-8 cursor-pointer">
                                        <div className="transform translate-y-4 md:group-hover:translate-y-0 transition-transform duration-500">
                                            <div className="flex items-center gap-3 text-gold/80 text-[10px] md:text-xs tracking-widest uppercase font-medium mb-2 md:mb-3">
                                                <span className="flex items-center gap-1"><Newspaper size={12} /> {item.source}</span>
                                                <span className="w-1 h-1 rounded-full bg-gold/50" />
                                                <span className="flex items-center gap-1"><Calendar size={12} /> {item.date}</span>
                                            </div>
                                            <h3 className="text-xl md:text-2xl font-serif text-white mb-3 md:mb-4 leading-tight">
                                                {item.title}
                                            </h3>
                                            <button className="text-sm text-white border-b border-gold pb-1 hover:text-gold transition-colors">
                                                Read Full Article
                                            </button>
                                        </div>
                                    </div>

                                    {/* Subtle Corner Accent - Visible on mobile for tap intent */}
                                    <div className="absolute top-4 right-4 z-20 opacity-100 md:opacity-0 md:group-hover:opacity-100 transition-opacity duration-500">
                                        <div className="w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center border border-gold/40 backdrop-blur-md">
                                            <ExternalLink className="text-gold w-3 h-3" />
                                        </div>
                                    </div>
                                </motion.div>
                            ))}
                        </div>
                    </section>

                    {/* Highly Artistic "Thank You Patan" Section */}
                    <section className="relative overflow-hidden bg-[#050505] py-24 md:py-32">
                        {/* Background Decoration */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full pointer-events-none overflow-hidden opacity-20">
                            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gold/10 rounded-full blur-[120px] mix-blend-screen" />
                            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-red-900/10 rounded-full blur-[120px] mix-blend-screen" />
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

                            {/* Spread Layout for Patan News */}
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-12">
                                {PATAN_NEWS.map((item, index) => (
                                    <motion.div
                                        key={item.id}
                                        initial={{ opacity: 0, rotate: index % 2 === 0 ? -5 : 5, y: 50 }}
                                        whileInView={{ opacity: 1, rotate: index % 3 === 0 ? -2 : 2, y: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: index * 0.15, duration: 1, type: "spring" }}
                                        whileHover={{ scale: 1.05, rotate: 0, zIndex: 30 }}
                                        className="relative group cursor-zoom-in"
                                        onClick={() => setSelectedArticle(item)}
                                    >
                                        {/* Frame / Matte */}
                                        <div className="bg-white p-3 md:p-5 shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/5 transition-all duration-700 group-hover:shadow-gold/20">
                                            <div className="relative aspect-[3/4] overflow-hidden bg-[#f5f5f5]">
                                                <Image
                                                    src={item.src}
                                                    alt={item.title}
                                                    fill
                                                    className="object-contain filter contrast-[1.02] sepia-[0.1]"
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                />
                                                {/* Gloss Overlay */}
                                                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />
                                            </div>

                                            {/* Labels below */}
                                            <div className="mt-4 flex flex-col items-center">
                                                <div className="h-px w-8 bg-black/10 mb-2" />
                                                <span className="text-[10px] uppercase tracking-widest text-gray-500 font-serif">City News Coverage</span>
                                                <h4 className="text-sm font-serif text-gray-800 mt-1 italic">{item.title}</h4>
                                            </div>
                                        </div>

                                        {/* Paper Clip / Tape Effects for Artistry */}
                                        {index % 2 === 0 ? (
                                            <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-10 md:w-16 h-4 md:h-6 bg-yellow-200/40 rotate-1 backdrop-blur-sm -z-10" />
                                        ) : (
                                            <div className="absolute -top-3 right-4 w-6 md:w-8 h-6 md:h-8 rounded-full bg-red-900/40 blur-sm -z-10" />
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </div>

                        {/* Floating Decorative Elements */}
                        <div className="absolute top-1/4 -left-20 w-80 h-80 border border-gold/5 rounded-full animate-spin-slow opacity-30" />
                        <div className="absolute bottom-1/4 -right-20 w-96 h-96 border border-white/5 rounded-full animate-reverse-spin-slow opacity-30" />
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
                                className={`relative w-full max-w-5xl max-h-[90vh] rounded-sm overflow-hidden shadow-2xl flex flex-col items-center
                                    ${(selectedArticle as any).content ? "bg-[#fdfbf7] text-black" : "bg-[#0a0a0a] border border-gold/20 text-white"}`}
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
                                            {/* Draggable Sticker */}
                                            <motion.div
                                                drag
                                                dragConstraints={{ left: -400, right: 50, top: -50, bottom: 200 }}
                                                className="absolute top-2 right-4 md:right-10 w-24 md:w-32 cursor-grab active:cursor-grabbing z-50 hidden md:block"
                                                whileHover={{ scale: 1.1, rotate: 5 }}
                                                whileTap={{ scale: 0.95 }}
                                                initial={{ rotate: 12 }}
                                            >
                                                <div className="bg-white p-1.5 shadow-xl border border-gray-300">
                                                    <Image
                                                        src="/assets/News/IMG_7109.JPG"
                                                        alt="Voice of Gujarat Sticker"
                                                        width={300}
                                                        height={400}
                                                        className="w-full h-auto filter sepia-[0.3] contrast-125 pointer-events-none"
                                                    />
                                                </div>
                                                {/* Simulated Paperclip */}
                                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-3 h-8 border-2 border-gray-800 rounded-full bg-transparent shadow-sm" />
                                            </motion.div>

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
                                                    {/* Tape effect */}
                                                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-yellow-200/80 -rotate-2 opacity-60 backdrop-blur-sm shadow-sm" />
                                                </div>

                                                {(selectedArticle as any).content.split('\n\n').map((paragraph: string, i: number) => (
                                                    <React.Fragment key={i}>
                                                        {/* Insert Image 2 after 2nd paragraph - Navratri Special */}
                                                        {i === 2 && (
                                                            <div className="float-left mr-6 mb-6 w-40 md:w-56 relative -rotate-1 p-2 bg-white shadow-md border border-gray-200 break-inside-avoid">
                                                                <div className="relative overflow-hidden aspect-square filter grayscale contrast-125 sepia-[0.2]">
                                                                    <Image
                                                                        src="/assets/News/IMG_7110.JPG"
                                                                        alt="Himali Joshi Navratri Special Performance"
                                                                        fill
                                                                        className="object-cover mix-blend-multiply"
                                                                    />
                                                                </div>
                                                                <p className="text-[9px] text-center mt-2 font-sans uppercase tracking-wider text-gray-500 overflow-hidden text-ellipsis whitespace-nowrap">Navratri Highlights</p>
                                                                {/* Tape effect */}
                                                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-8 bg-black/10 rotate-12 backdrop-blur-sm shadow-sm rounded-sm" />
                                                                <div className="absolute -top-3 left-1/2 -translate-x-1/2 w-12 h-8 bg-yellow-200/60 rotate-12 mix-blend-multiply" />
                                                            </div>
                                                        )}

                                                        <p className="mb-6 indent-8 text-justify">
                                                            {i === 0 && <span className="float-left text-6xl font-black leading-[0.8] mr-3 mt-[-6px] font-sans">S</span>}
                                                            {i === 0 ? paragraph.substring(1) : paragraph.replace(/"/g, '')}
                                                        </p>

                                                        {/* Insert Image 3 after 4th paragraph - Award */}
                                                        {i === 4 && (
                                                            <div className="float-right ml-6 mb-4 w-44 md:w-60 relative rotate-3 p-3 bg-white shadow-lg border border-gray-200 break-inside-avoid">
                                                                <div className="relative overflow-hidden aspect-video filter grayscale-[0.8] contrast-110">
                                                                    <Image
                                                                        src="/assets/News/IMG_7112.JPG"
                                                                        alt="Himali Joshi Receiving Cultural Excellence Award"
                                                                        fill
                                                                        className="object-cover mix-blend-multiply"
                                                                    />
                                                                </div>
                                                                <p className="text-[9px] text-center mt-2 font-sans uppercase tracking-wider text-gray-500">Excellence Award</p>
                                                                {/* Pin effect */}
                                                                <div className="absolute -top-2 -right-2 w-3 h-3 rounded-full bg-red-900/80 shadow-sm z-20" />
                                                                <div className="absolute -top-2 -right-2 w-3 h-3 rounded-full bg-white/30 scale-50 z-20" />
                                                            </div>
                                                        )}
                                                    </React.Fragment>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="mt-12 pt-12 border-t-4 border-double border-black/20 text-center relative z-10">
                                            <p className="font-serif italic text-2xl">~ Himali Joshi ~</p>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="flex-1 bg-[#050505] relative overflow-auto p-4 md:p-8 flex items-center justify-center w-full">
                                        <div className="relative w-full h-full flex items-center justify-center">
                                            <Image
                                                src={selectedArticle.src}
                                                alt={selectedArticle.title}
                                                fill
                                                className="object-contain shadow-2xl p-4"
                                                sizes="(max-width: 768px) 100vw, 90vw"
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
