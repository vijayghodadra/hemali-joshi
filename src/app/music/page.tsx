import type { Metadata } from "next";
import MusicContent from "./MusicContent";

export const metadata: Metadata = {
    title: "Top Playback Singer in India | Devotional & Garba Singer in Vadodara | Music Creator",
    description: "Listen to original tracks and Bollywood covers by Himali Joshi, a leading playback singer in India, music creator, and top Garba singer in Vadodara.",
    keywords: ["Playback Singer in India", "Music Creator", "Garba Singer in Vadodara", "Devotional Singer", "Bollywood Singer", "Best Singer in India"],
};

export default function MusicPage() {
    return <MusicContent />;
}
