import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Celebrities | Himali Joshi",
    description: "Memorable moments with renowned celebrities and artists.",
};

const celebrityImages = [
    "/Celebrites/cel 2.jpeg",
    "/Celebrites/cel 1.jpeg",
    "/Celebrites/cel 5.jpeg",
    "/Celebrites/cel 4.jpeg",
    "/Celebrites/cel 3.jpeg",
    "/assets/komal.png"
];

export default function CelebritiesGalleryPage() {
    return (
        <main className="bg-black min-h-screen text-white pt-32 pb-0">
            <div className="w-full px-4 md:px-8 max-w-[1600px] mx-auto">
                {/* Header Section */}
                <div className="mb-16 text-center relative flex flex-col items-center">
                    <Link href="/gallery" className="absolute left-0 top-1/2 -translate-y-1/2 flex items-center gap-2 text-gold/60 hover:text-gold transition-colors group">
                        <span className="group-hover:-translate-x-1 transition-transform">←</span>
                        <span className="hidden md:inline tracking-widest text-sm font-bold uppercase">Back to Hub</span>
                    </Link>
                    
                    <h1 className="font-serif text-4xl md:text-6xl mb-6 tracking-tighter uppercase">
                        CELEBRITIES <span className="text-gold italic ml-4 font-allura normal-case tracking-normal">Moments</span>
                    </h1>
                    <div className="h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent" />
                </div>
                
                {/* Pure CSS Masonry Grid */}
                <div className="columns-1 sm:columns-2 lg:columns-3 gap-8 space-y-8 mb-32">
                    {celebrityImages.map((src, index) => (
                        <div 
                            key={index} 
                            className="break-inside-avoid relative group rounded-3xl overflow-hidden bg-white/5 border border-white/10 shadow-2xl transition-all duration-500 hover:border-gold/30 hover:shadow-gold/10"
                        >
                            <Image
                                src={src}
                                alt={`Moment with Celebrity - ${index + 1}`}
                                width={800}
                                height={1200}
                                unoptimized
                                style={{ width: '100%', height: 'auto' }}
                                className="w-full h-auto object-cover transition-all duration-1000 group-hover:scale-110"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                            
                            {/* Corner Accents */}
                            <div className="absolute top-4 right-4 w-8 h-8 border-t border-r border-gold/0 group-hover:border-gold/40 transition-all duration-500 rounded-tr-lg" />
                            <div className="absolute bottom-4 left-4 w-8 h-8 border-b border-l border-gold/0 group-hover:border-gold/40 transition-all duration-500 rounded-bl-lg" />
                        </div>
                    ))}
                </div>
            </div>
            
            <Footer />
        </main>
    );
}
