import type { Metadata } from "next";
import HomeContent from "./HomeContent";

export const metadata: Metadata = {
  title: "Best Singer in Vadodara | Top 5 Playback & Garba Singer in Gujarat | Himali Joshi",
  description: "Book Himali Joshi, the best singer in Vadodara and a top playback & Garba artist in Gujarat. Available for events, weddings, and international bookings across India and globally.",
  keywords: ["Best Singer in Vadodara", "Top 5 Singer in Gujarat", "Playback Singer India", "Garba Singer Vadodara", "Event Singer in Gujarat", "International Booking Singer from India", "Top Singer in Gujarat"],
  alternates: {
    canonical: "https://himalijoshi.com",
  },
};

export default function Home() {
  return <HomeContent />;
}
