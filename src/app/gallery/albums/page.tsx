import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Albums Gallery | Himali Joshi",
    description: "Explore the exclusive own album gallery of Himali Joshi, featuring original music and performances.",
};

const albumImages = [
    { src: "/Own Album/Album 1.jpeg", ratio: 1.41, title: "Artistic Expression" },
    { src: "/Own Album/Album 2.jpeg", ratio: 0.70, title: "Portrait Session" },
    { src: "/Own Album/Album 3.jpeg", ratio: 1.00, title: "Musical Harmony" },
    { src: "/Own Album/Album 4.jpeg", ratio: 1.00, title: "Vocal Essence" },
    { src: "/Own Album/Album 5.jpeg", ratio: 1.00, title: "Studio Vibe" },
    { src: "/Own Album/Album 6.jpeg", ratio: 0.80, title: "Soulful Melody" },
    { src: "/Own Album/Album 7.jpeg", ratio: 0.67, title: "Elegant Performance" },
    { src: "/Own Album/Album 8.jpeg", ratio: 1.00, title: "Artist Spotlight" },
    { src: "/Own Album/Album 9.jpeg", ratio: 1.00, title: "Backstage Magic" },
    { src: "/Own Album/Album 10.jpeg", ratio: 1.00, title: "Rhythm & Blues" },
    { src: "/Own Album/Album 12.jpeg", ratio: 1.00, title: "Classic Style" },
    { src: "/Own Album/Album 13.jpeg", ratio: 1.00, title: "Pure Emotion" },
    { src: "/Own Album/Album 14.jpeg", ratio: 1.00, title: "Stage Presence" },
    { src: "/Own Album/15657711-5532-4f2f-aae9-4b2ef333f09e.JPG", ratio: 1.00, title: "Visual Storytelling" },
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
                        ALBUMS
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
                                src={img.src}
                                alt={`Own Album by Himali Joshi - ${img.title}`}
                                width={800}
                                height={1200}
                                className="w-full h-auto object-cover filter contrast-[1.05] group-hover:scale-[1.03] group-hover:contrast-125 transition-all duration-700"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                            />
                            {/* Premium Glass Overlay on Hover */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6 pointer-events-none">
                                <span className="text-gold font-serif italic text-lg opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                    {img.title}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            <Footer />
        </main>
    );
}
