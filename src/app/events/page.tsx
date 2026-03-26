import type { Metadata } from "next";
import VideosContent from "./VideosContent";

export const metadata: Metadata = {
    title: "Live Shows & Event Singer in Gujarat | Bollywood & Wedding Singer in India",
    description: "Experience live performances by Himali Joshi, a premier event singer in Gujarat and top wedding singer in India. Watch exclusive concert and show videos.",
    keywords: ["Event Singer in Gujarat", "Live Show Singer", "Wedding Singer in India", "Bollywood Singer for Events", "Himali Joshi Live", "International Booking Singer from India"],
};

export default function EventsPage() {
    return <VideosContent />;
}
