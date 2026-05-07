import type { Metadata } from "next";
import Footer from "@/components/Footer";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
    title: "Brand Shoot | Himali Joshi",
    description: "Explore the brand collaborations and partnerships of Himali Joshi.",
};

const brandImages = [
    "/Brand Collabration/DSC04529.jpg",
    "/Brand Collabration/DSC04537.jpg",
    "/Brand Collabration/DSC04563.jpg",
    "/Brand Collabration/DSC04653.jpg",
    "/Brand Collabration/DSC04684.jpg",
    "/Brand Collabration/DSC04697.jpg",
    "/Brand Collabration/DSC04859.jpg",
    "/Brand Collabration/DSC05859.jpg",
    "/Brand Collabration/DSC06658.jpg",
    "/Brand Collabration/amazon.jpeg",
    "/Brand Collabration/apple.jpeg",
    "/Brand Collabration/music1.jpg"
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
                
                {/* Pure CSS Masonry Grid */}
                <div className="columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6 mb-32">
                    {brandImages.map((src, index) => (
                        <div key={index} className="break-inside-avoid relative group rounded-2xl overflow-hidden bg-white/5 border border-white/10 shadow-2xl cursor-pointer">
                            <Image
                                src={src}
                                alt={`Brand Collaboration by Himali Joshi - ${index + 1}`}
                                width={800}
                                height={1200}
                                className="w-full h-auto object-cover filter contrast-[1.05] group-hover:scale-[1.03] group-hover:contrast-125 transition-all duration-700"
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                            />
                            {/* Premium Glass Overlay on Hover */}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex items-end p-6 pointer-events-none">
                                <span className="text-gold font-serif italic text-lg opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                    Premium Partner
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
