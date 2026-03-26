import type { Metadata, Viewport } from "next";
import { Playfair_Display, Inter, Great_Vibes, Allura } from "next/font/google"; // Import Allura
import dynamic from "next/dynamic";
import Navbar from "@/components/Navbar";
import StructuredData from "@/components/StructuredData";
import ClientGlobalEffects from "@/components/ClientGlobalEffects";
import SecurityProvider from "@/components/SecurityProvider";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const greatVibes = Great_Vibes({
  weight: "400",
  variable: "--font-great-vibes",
  subsets: ["latin"],
});

// Configure Allura (Halimun alternative)
const allura = Allura({
  weight: "400",
  variable: "--font-allura",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: {
    default: "Himali Joshi | Best Singer in Vadodara, Gujarat & India",
    template: "%s | Best Singer in Vadodara & Gujarat | Himali Joshi"
  },
  metadataBase: new URL('https://himalijoshi.com'),
  alternates: {
    canonical: '/',
    languages: {
      'en-IN': '/en-IN',
    },
  },
  description: "Official website of Himali Joshi, a top music artist and best singer in Vadodara, Gujarat. Renowned for soulful vocals, live performances, Bollywood covers, and vibrant Garba performances. Available for live shows, events, weddings, and international bookings from India.",
  keywords: [
    "Himali Joshi", "Best Singer in Vadodara", "Top Singer in Vadodara", "Top 5 Singer in Gujarat", "Professional Live Performer in Vadodara",
    "Event Singer in Gujarat", "Playback Singer in India", "Music Artist in India", "Garba Singer in Vadodara",
    "Bollywood Singer for Events", "Devotional Singer in Gujarat", "Wedding Singer in India", "International Booking Singer from India",
    "Live Show Singer", "Music Creator", "Musician", "Best Singer in India", "Top Female Singer India"
  ],
  authors: [{ name: "Himali Joshi" }],
  creator: "Himali Joshi",
  publisher: "Himali Joshi",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Himali Joshi | Best Singer in Vadodara, Gujarat & India",
    description: "Official portal of Himali Joshi - Singer, Performer, and Music Creator. Experience the magic of soulful Indian music and book for international events.",
    url: "https://himalijoshi.com",
    siteName: "Himali Joshi Official",
    images: [
      {
        url: "/assets/logo-gold.png",
        width: 800,
        height: 600,
        alt: "Himali Joshi Official Logo",
      },
    ],
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Himali Joshi | Best Singer in Vadodara, Gujarat & India",
    description: "Soulful vocals and vibrant live performances by top music artist Himali Joshi.",
    images: ["/assets/logo-gold.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        suppressHydrationWarning
        className={`${playfair.variable} ${inter.variable} ${greatVibes.variable} ${allura.variable} antialiased font-sans bg-black text-white`}
      >
        <StructuredData />
        <ClientGlobalEffects />
        <SecurityProvider>
          <Navbar />
          {children}
        </SecurityProvider>
      </body>
    </html>
  );
}
