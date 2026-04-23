import type { Metadata } from "next";
import ToursContent from "./ToursContent";

export const metadata: Metadata = {
    title: "Book Best Singer in Vadodara | Tours & Live Concerts | Himali Joshi",
    description: "Follow the live tours of Himali Joshi, the best singer in Vadodara. Creating magic on stages across Gujarat, India, and internationally.",
    keywords: ["Himali Joshi Tours", "Live Concerts Gujarat", "Singer Tour Dates", "International Gigs", "Garba Tours"],
};

export default function ToursPage() {
    return <ToursContent />;
}
