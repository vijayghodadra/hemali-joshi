import type { Metadata } from "next";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "Pre-Wedding Gallery | Himali Joshi - Cinematic Shoots",
    description: "Elegant and cinematic pre-wedding moments captured through the lens. Explore the pre-wedding gallery of Himali Joshi.",
};

export default function PreWeddingGalleryPage() {
    return (
        <main className="bg-black min-h-screen text-white pt-24">
            <Gallery initialCategory="concerts" />
            <Footer />
        </main >
    );
}
