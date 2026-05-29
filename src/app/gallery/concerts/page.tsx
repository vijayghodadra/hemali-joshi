import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Live Concerts | Himali Joshi",
    description: "Experience the high energy and magical moments of Himali Joshi's live concerts.",
};

const concertImages = [
    "/Concert/con 1.jpeg",
    "/Concert/con 2.jpeg",
    "/Concert/con 3.jpeg",
    "/Concert/con 4.jpeg",
    "/Concert/con 7.jpeg",
    "/Concert/con 8.jpeg",
    "/Concert/con 9.jpeg",
    "/Concert/con 10.jpeg"
];

export default function ConcertsGalleryPage() {
    return (
        <main className="bg-black min-h-screen text-white pt-32 pb-0">
            <div className="w-full px-4 md:px-8 max-w-[1600px] mx-auto">
                {/* Header Section */}
                <div className="mb-16 text-center relative flex flex-col items-center">
                    <Link href="/gallery" className="absolute left-2 md:left-0 top-1/2 -translate-y-1/2 flex items-center gap-2 text-gold/60 hover:text-gold transition-colors group">
                        <span className="group-hover:-translate-x-1 transition-transform">←</span>
                        <span className="hidden md:inline tracking-widest text-sm font-bold uppercase">Back to Hub</span>
                    </Link>
                    
                    <h1 className="font-serif text-4xl md:text-6xl mb-6 tracking-tighter uppercase">
                        LIVE <span className="text-gold italic ml-4 font-allura normal-case tracking-normal">Concerts</span>
                    </h1>
                    <div className="h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent" />
                </div>
                
                {/* Pure CSS Masonry Grid */}
                <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6 mb-32">
                    {concertImages.map((src, index) => (
                        <div key={index} className="break-inside-avoid relative group rounded-2xl overflow-hidden bg-white/5 border border-white/10 shadow-2xl cursor-pointer">
                            <Image
                                src={src}
                                alt={`Live Concert by Himali Joshi - ${index + 1}`}
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
