import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Cover Page Gallery | Himali Joshi",
    description: "Explore the exclusive own cover page gallery of Himali Joshi, featuring original music and performances.",
};

const albumImages = [
    { src: "/Own Album/Album 3.jpeg", title: "Musical Harmony" },
    { src: "/Own Album/Album 4.jpeg", title: "Vocal Essence" },
    { src: "/Own Album/Album 5.jpeg", title: "Studio Vibe" },
    { src: "/Own Album/Album 6.jpeg", title: "Soulful Melody" },
    { src: "/Own Album/Album 8.jpeg", title: "Artist Spotlight" },
    { src: "/Own Album/Album 9.jpeg", title: "Backstage Magic" },
    { src: "/Own Album/Album 10.jpeg", title: "Rhythm & Blues" },
    { src: "/Own Album/Album 11.jpeg", title: "Sound Waves" },
    { src: "/Own Album/Album 12.jpeg", title: "Classic Style" },
    { src: "/Own Album/Album 13.jpeg", title: "Pure Emotion" },
    { src: "/Own Album/Album 14.jpeg", title: "Stage Presence" },
    { src: "/Own Album/15657711-5532-4f2f-aae9-4b2ef333f09e.JPG", title: "Visual Storytelling" },
];

export default function AlbumsGalleryPage() {
    return (
        <main className="bg-black min-h-screen text-white pt-32 pb-24">
            <div className="w-full px-4 md:px-8 max-w-[1600px] mx-auto">
                {/* Header Section */}
                <div className="mb-20 text-center relative flex flex-col items-center">
                    <Link href="/gallery" className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center gap-2 text-gold/60 hover:text-gold transition-colors group">
                        <span className="group-hover:-translate-x-1 transition-transform">←</span>
                        <span className="hidden md:inline tracking-widest text-sm font-bold uppercase">Back to Hub</span>
                    </Link>

                    <h1 className="font-serif text-4xl md:text-6xl mb-6 tracking-tighter uppercase">
                        COVER PAGE
                    </h1>
                    <div className="h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent" />
                </div>

                {/* 3-Column Masonry Gallery */}
                <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6 mb-32">
                    {albumImages.map((img, index) => (
                        <div
                            key={index}
                            className="break-inside-avoid relative group rounded-2xl overflow-hidden bg-white/5 border border-white/10 shadow-2xl cursor-pointer"
                        >
                            <Image
                                src={encodeURI(img.src)}
                                alt={`Own Album by Himali Joshi - ${img.title}`}
                                width={800}
                                height={1200}
                                unoptimized
                                style={{ width: '100%', height: 'auto' }}
                                className="rounded-2xl transition-all duration-700 group-hover:scale-[1.02] shadow-lg"
                            />
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </main>
    );
}
