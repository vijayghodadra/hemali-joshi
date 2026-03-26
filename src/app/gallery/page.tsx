import type { Metadata } from "next";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "Photo & Video Gallery | Professional Live Performer in Vadodara & Music Artist",
    description: "Explore performance photos of Himali Joshi, an elite music artist in India and top Bollywood singer for events, capturing her vibrant live shows.",
    keywords: ["Professional Live Performer in Vadodara", "Music Artist in India", "Bollywood Singer for Events", "Live Shows Photos", "Himali Joshi Gallery"],
};

export default function GalleryPage() {
    return (
        <main className="bg-black min-h-screen text-white pt-24">
            {/* Reusing the responsive Gallery component */}
            <Gallery />
            <Footer />
        </main >
    );
}
