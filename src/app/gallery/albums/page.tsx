import type { Metadata } from "next";
import Gallery from "@/components/Gallery";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
    title: "Events Gallery | Himali Joshi - Live Performances",
    description: "High-energy live events and stage performances. Explore the events gallery of Himali Joshi.",
};

export default function EventsGalleryPage() {
    return (
        <main className="bg-black min-h-screen text-white pt-24">
            <Gallery initialCategory="albums" />
            <Footer />
        </main >
    );
}
