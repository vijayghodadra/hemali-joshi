import type { Metadata } from "next";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "Wedding Gallery | Himali Joshi - Professional Wedding Singer",
    description: "Capturing the magical moments of love and celebration. Explore the wedding performance gallery of Himali Joshi.",
};

export default function WeddingGalleryPage() {
    return (
        <main className="bg-black min-h-screen text-white pt-24">
            <Gallery initialCategory="wedding" />
            <Footer />
        </main >
    );
}
