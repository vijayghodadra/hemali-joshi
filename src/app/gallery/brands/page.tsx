import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Brand Shoot | Himali Joshi",
    description: "Explore the brand collaborations and partnerships of Himali Joshi.",
};

const brandImages = [
    "/Brand Collabration/1000018417.jpg.jpeg",
    "/Brand Collabration/1000018698.jpg.jpeg",
    "/Brand Collabration/101.jpeg",
    "/Brand Collabration/102.jpeg",
    "/Brand Collabration/103.jpeg",
    "/Brand Collabration/DSC04684.jpg",
    "/Brand Collabration/DSC05859.jpg",
    "/Brand Collabration/DSC06658.jpg",
    "/Brand Collabration/DSC06010.jpg"
];

export default function BrandsGalleryPage() {
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
                        BRAND <span className="text-gold italic ml-4 font-allura normal-case tracking-normal">Shoot</span>
                    </h1>
                    <div className="h-px w-24 bg-gradient-to-r from-transparent via-gold to-transparent" />
                </div>
                
                {/* Fluid Masonry Grid - Grid ratio follows Image ratio */}
                <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8 mb-32">
                    {brandImages.map((src, index) => (
                        <div 
                            key={index} 
                            className="break-inside-avoid relative group rounded-[2rem] overflow-hidden bg-white/5 border border-white/10 shadow-2xl transition-all duration-700 hover:border-gold/30 hover:shadow-gold/20"
                        >
                            <Image
                                src={src}
                                alt={`Brand Collaboration by Himali Joshi - ${index + 1}`}
                                width={800}
                                height={1200}
                                unoptimized
                                style={{ width: '100%', height: 'auto' }}
                                className="w-full h-auto object-cover transition-all duration-1000 group-hover:scale-105"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                            />
                            
                            {/* Modern Glass Corner Accents */}
                            <div className="absolute top-6 right-6 w-10 h-10 border-t-2 border-r-2 border-gold/0 group-hover:border-gold/40 transition-all duration-700 rounded-tr-xl pointer-events-none" />
                            <div className="absolute bottom-6 left-6 w-10 h-10 border-b-2 border-l-2 border-gold/0 group-hover:border-gold/40 transition-all duration-700 rounded-bl-xl pointer-events-none" />
                        </div>
                    ))}
                </div>
            </div>
            
            <Footer />
        </main>
    );
}
