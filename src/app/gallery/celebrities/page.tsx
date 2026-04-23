import type { Metadata } from "next";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "B/W Noir Gallery | Himali Joshi - Artistic Monochrome",
    description: "The timeless beauty of black and white photography. Explore the artistic B/W Noir gallery of Himali Joshi.",
};

export default function BWGalleryPage() {
    return (
        <main className="bg-black min-h-screen text-white pt-24">
            <Gallery initialCategory="celebrities" />
            <Footer />
        </main >
    );
}
