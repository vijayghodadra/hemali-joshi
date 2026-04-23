import type { Metadata } from "next";
import NewsContent from "./NewsContent";

export const metadata: Metadata = {
    title: "Himali's Buzz | Top 5 Singer in Gujarat Media & Press Features",
    description: "Stay updated with news and media coverage of Himali Joshi, recognized as one of the top 5 singers in Gujarat and a leading music artist in India.",
    keywords: ["Top 5 Singer in Gujarat", "Himali Joshi News", "Best Singer Vadodara News", "Top Playback Singer Gujarat Media", "Gujarati Singer Feature", "Music Artist in India Media"],
};

export default function NewsPage() {
    return <NewsContent />;
}
