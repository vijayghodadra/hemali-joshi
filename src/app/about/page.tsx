import type { Metadata } from "next";
import { Award, Music, Star, User, Mic, Heart, Globe, Quote, Trophy, Crown } from "lucide-react";
import Footer from "@/components/Footer";
import DynamicPortrait from "@/components/DynamicPortrait";
import AnimatedCounter from "@/components/AnimatedCounter";
import ArtisticRoleText from "@/components/ArtisticRoleText";
import MusicalKeyText from "@/components/MusicalKeyText";
import ThreeDAwardCard from "@/components/ThreeDAwardCard";

export const metadata: Metadata = {
    title: "About Himali Joshi | Top Music Artist in India & Professional Performer in Vadodara",
    description: "Learn about Himali Joshi, a top music artist in India and professional live performer in Vadodara. Renowned for Bollywood covers, Garba, and devotional singing. Available globally.",
    keywords: ["About Himali Joshi", "Top Music Artist in India", "Professional Performer in Vadodara", "Garba Singer Gujarat", "Playback Singer Vadodara", "Devotional Singer", "Best Singer in Vadodara"],
};

const STATS = [
    { label: "Own Created Albums", value: 4, suffix: "+" },
    { label: "Listeners", value: 65, suffix: "K+" },
    { label: "Video Albums", value: 8, suffix: "+" },
    { label: "Music Videos", value: 125, suffix: "+" },
];

const AWARDS = [
    {
        year: "2025",
        org: "Vadodara Got Talent",
        title: "Best Singer",
        desc: "Awarded Best Singer for outstanding vocal performance and artistic expression in 2025.",
        image: "/assets/Gal/IMG_7083.JPG",
        icon: Crown,
        isFeatured: true
    },
    {
        year: "2024",
        org: "Parul University",
        title: "Singing Competition Judge",
        desc: "Honoring Excellence in Judging Singing Competitions, mentoring the next generation of talent.",
        image: "/assets/Gal/IMG_7092.JPG",
        icon: Award
    },
    {
        year: "2023",
        org: "Patidar Navratri Morbi",
        title: "Best Garba Performer",
        desc: "Recognized as the Best Garba Performer of the season for energetic and soulful performances.",
        image: "/assets/Gal/IMG_7071.JPG",
        icon: Trophy
    },
    {
        year: "2022",
        org: "Bajkhedaval Brahman Samaj",
        title: "Best Female Anchorage Icon",
        desc: "Celebrates excellence in hosting and acknowledges remarkable contributions to the community.",
        image: "/assets/Gal/IMG_7088.JPG",
        icon: Mic
    },
    {
        year: "2010",
        org: "Maa Krishna Ashram",
        title: "Devotional Singing Excellence",
        desc: "Recognizing excellence in devotional singing, celebrating the divine through music.",
        image: "/assets/Gal/IMG_7093.JPG",
        icon: Star
    },
];

const TESTIMONIALS = [
    {
        name: "Mr. Ripal Shah",
        role: "Event Organizer",
        text: "Himali Joshi's performances are truly exceptional. Her captivating renditions at 'Ratri Before Navratri 2023' and during her Dubai tour showcased her immense talent and ability to enchant audiences."
    },
    {
        name: "V4U Visa Consultancy",
        role: "Corporate Client",
        text: "Her talent and dedication captivated the audience, making the event a grand success. We look forward to future collaborations and more mesmerizing performances."
    },
    {
        name: "Mrs. Suhani",
        role: "Wedding Client",
        text: "Himali's performance at my wedding Garba night was nothing short of magical. Her melodious voice and vibrant energy created the perfect atmosphere for a memorable evening."
    }
];

const GENRES = [
    { title: "Traditional Music", desc: "A timeless expression of culture & heritage, resonating through generations." },
    { title: "Devotional (Arti)", desc: "Like the soothing melody of an 'Arti,' uplifting the spirit and nurturing the soul." },
    { title: "Bollywood Covers", desc: "Vibrant fusion of classic melodies with modern twists, capturing the essence of Hindi cinema." },
    { title: "Gujarati Garbas", desc: "Rhythmic and vibrant, embodying the spirit of Navratri celebrations." },
];



export default function AboutPage() {
    return (
        <main className="min-h-screen text-white pt-24">

            {/* 1. Hero / Header Section */}
            <section className="relative py-12 md:py-20 px-6 text-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-b from-maroon/20 via-black to-black -z-10" />
                <div className="container mx-auto">
                    <h1 className="flex flex-wrap justify-center gap-x-2 md:gap-x-8 mb-6 drop-shadow-lg leading-tight w-full">
                        <div className="flex items-baseline justify-center flex-wrap gap-2 w-full">
                            <MusicalKeyText text="Himali" className="text-[clamp(2.5rem,10vw,5rem)] md:text-7xl font-serif text-white" />
                            <MusicalKeyText text="Joshi" className="text-[clamp(2.5rem,10vw,5rem)] md:text-7xl font-serif text-gold" goldHighlight={true} />
                        </div>
                    </h1>
                    <div className="mt-2 md:mt-4 w-full flex justify-center px-2">
                        <ArtisticRoleText
                            text="Singer | Performer | Musician"
                            className="text-[10px] sm:text-sm md:text-2xl uppercase tracking-[0.1em] md:tracking-[0.2em] text-white/90 whitespace-nowrap"
                        />
                    </div>
                    <span className="block text-xs md:text-xl uppercase tracking-[0.2em] md:tracking-[0.4em] text-gold/60 mt-1 md:mt-2">Best Singer in Vadodara, Gujarat</span>
                    <p className="text-base md:text-2xl text-gray-300 max-w-3xl mx-auto italic font-light leading-relaxed">
                        "Music is the <span className="text-gold">divine way</span> to tell beautiful, poetic things to the <span className="text-gold">heart</span>. Experience the magic of the top playback & Garba singer in Gujarat."
                    </p>
                </div>
            </section>

            {/* 2. Biography Section */}
            <section className="container mx-auto px-6 py-8 md:py-12 grid grid-cols-1 lg:grid-cols-2 gap-10 md:gap-16 items-start">
                <div className="order-2 lg:order-1 space-y-6 md:space-y-8 text-base md:text-lg text-gray-300 leading-relaxed font-light text-justify">
                    <h2 className="text-2xl md:text-3xl font-serif text-white mb-4 md:mb-6 border-l-4 border-gold pl-4">Biography</h2>
                    <p>
                        <span className="text-gold font-serif text-4xl float-left mr-2 leading-none">H</span>
                        imali Joshi, born on 14th March 1984, is a versatile Indian artist celebrated for her talents as a writer, composer, singer, video director, and actor. As a <strong>top music artist in India</strong>, her musical odyssey began during her school years, where she cultivated a profound passion for classical dance and vocal music. This early enthusiasm propelled her to pursue formal education in dance and vocal training.
                    </p>
                    <p>
                        Despite a flourishing career spanning nine years in various industries—including real estate, pharmaceuticals, and manufacturing—where she excelled as an admin and marketing planner, Himali's unwavering love for music remained her true calling. Today, she is widely recognized as the <strong>best singer in Vadodara</strong> and a highly sought-after <strong>professional live performer</strong> for events locally and internationally.
                    </p>
                    <p>
                        Renowned especially for her <strong className="text-white">vibrant Garba performances</strong>, Himali has earned a stellar reputation as one of Gujarat's most prolific singers. Her performances are highly acclaimed, particularly in Mataji's Temples across Gujarat, including Pavagadh, Chotila, Ambaji, and Bhadrakali.
                    </p>
                </div>
                <div className="order-1 lg:order-2 w-full max-w-sm mx-auto lg:max-w-none">
                    <DynamicPortrait />
                </div>
            </section>

            {/* 3. Stats Section */}
            <section className="bg-white/5 py-8 md:py-12 border-y border-white/10">
                <div className="container mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 text-center">
                    {STATS.map((stat, index) => (
                        <div key={index} className="flex flex-col items-center">
                            <h3 className="text-3xl md:text-5xl font-serif text-gold mb-1 md:mb-2">
                                <AnimatedCounter to={stat.value} suffix={stat.suffix} />
                            </h3>
                            <p className="text-[10px] md:text-sm uppercase tracking-widest text-gray-400">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            {/* 4. Musical Information & Background - VISUAL BENTO GRID */}
            <section className="container mx-auto px-6 py-16 md:py-24">
                <h2 className="text-center font-serif text-4xl md:text-5xl mb-4 leading-tight">Musical <span className="text-gold">Background</span></h2>
                <p className="text-center text-gray-400 text-sm md:text-base italic mb-10 md:mb-16">"The music that I create is a reflection of my soul."</p>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-6 max-w-6xl mx-auto auto-rows-[250px] md:auto-rows-[300px]">

                    {/* Card 1: Born Info (Text) */}
                    <div className="bg-[#111] p-6 md:p-8 rounded-2xl border border-white/10 flex flex-col justify-center relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
                            <User className="w-10 h-10 md:w-12 md:h-12 text-gold" />
                        </div>
                        <h4 className="text-xs text-gold uppercase tracking-widest mb-1 md:mb-2">Born</h4>
                        <p className="text-xl md:text-2xl font-serif text-white">14th March 1984</p>
                        <p className="text-sm text-gray-400">Vadodara, Gujarat</p>
                    </div>

                    {/* Card 2: Image Tile */}
                    <div className="sm:col-span-2 md:col-span-2 relative rounded-2xl overflow-hidden group">
                        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: "url('/assets/Gal/IMG_7098.JPG')" }} />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        <div className="absolute bottom-4 md:bottom-6 left-4 md:left-6">
                            <p className="text-sm md:text-base text-white/80 font-serif italic">"Every stage is a new chapter."</p>
                        </div>
                    </div>

                    {/* Card 3: Image Tile */}
                    <div className="relative rounded-2xl overflow-hidden group">
                        <div className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110" style={{ backgroundImage: "url('/assets/Gal/IMG_7092.JPG')" }} />
                        <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors" />
                    </div>

                    {/* Card 4: Education (Text) */}
                    <div className="sm:col-span-2 md:col-span-2 bg-[#111] p-6 md:p-8 rounded-2xl border border-white/10 flex flex-col justify-center relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 transition-opacity">
                            <Music className="w-10 h-10 md:w-12 md:h-12 text-gold" />
                        </div>
                        <h4 className="text-xs text-gold uppercase tracking-widest mb-3 md:mb-4">Music Education & Alma Mater</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                            <div>
                                <p className="text-base md:text-lg font-serif text-white mb-1">M.S. University</p>
                                <p className="text-xs text-gray-400">Vocal & B.Com Graduate</p>
                            </div>
                            <div>
                                <p className="text-base md:text-lg font-serif text-white mb-1">Trinity College London</p>
                                <p className="text-xs text-gray-400">Theory of Music & Instrument</p>
                            </div>
                        </div>
                    </div>

                    {/* Card 5: Roles (Text) */}
                    <div className="sm:col-span-full md:col-span-1 bg-gradient-to-br from-gold/10 to-black p-6 md:p-8 rounded-2xl border border-gold/20 flex flex-col justify-center text-center">
                        <Mic className="w-8 h-8 md:w-10 md:h-10 text-gold mx-auto mb-3 md:mb-4" />
                        <h4 className="text-xs text-gray-400 uppercase tracking-widest mb-1 md:mb-2">Roles</h4>
                        <p className="text-lg md:text-xl font-serif text-white leading-relaxed">Writer • Singer • Composer • Performer</p>
                    </div>

                </div>
            </section>

            {/* Awards Section (Moved from Awards Page) */}
            <section className="relative py-16 md:py-24 px-6 bg-black/40">
                <div className="container mx-auto">
                    <div className="text-center mb-16">
                        <div className="inline-block p-1 px-3 rounded-full border border-gold/30 bg-gold/10 text-gold text-xs uppercase tracking-[0.2em] mb-4 backdrop-blur-md">
                            The Trophy Room
                        </div>
                        <h2 className="font-serif text-4xl md:text-5xl mb-6">
                            Awards & <span className="text-gold italic">Recognition</span>
                        </h2>
                        <p className="text-lg text-gray-400 max-w-2xl mx-auto font-light italic">
                            "A legacy of excellence, carved in melody and gold."
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-12 xl:gap-16 max-w-7xl mx-auto">
                        {AWARDS.map((award, index) => (
                            <div key={index} className={`${index % 2 !== 0 ? "lg:mt-24" : ""} ${award.isFeatured ? "md:col-span-2 lg:col-span-2 lg:mt-0 flex justify-center mb-12" : ""}`}>
                                <div className={award.isFeatured ? "w-full max-w-2xl" : "w-full"}>
                                    <ThreeDAwardCard
                                        title={award.title}
                                        year={award.year}
                                        org={award.org}
                                        desc={award.desc}
                                        image={award.image}
                                        icon={<award.icon className="text-gold w-8 h-8" />}
                                        isFeatured={award.isFeatured}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 5. Music Style & Genres - IMAGE CARDS */}
            <section className="py-16 md:py-24 relative overflow-hidden">
                {/* Background wash */}
                <div className="absolute inset-0 bg-maroon/5 -z-10" />

                <div className="container mx-auto px-6">
                    <h2 className="text-center font-serif text-4xl md:text-5xl mb-8 md:mb-12">Styles & <span className="text-gold">Genres</span></h2>

                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 h-auto md:h-[500px]">
                        {[
                            { title: "Traditional", desc: "Timeless culture", img: "/assets/Gal/IMG_7088.JPG" },
                            { title: "Devotional", desc: "Soothing Arti", img: "/assets/Gal/IMG_7093.JPG" },
                            { title: "Bollywood", desc: "Modern Fusion", img: "/assets/Gal/IMG_7074.JPG" },
                            { title: "Garba", desc: "Rhythmic Navratri", img: "/assets/Gal/IMG_7071.JPG" },
                        ].map((genre, idx) => (
                            <div key={idx} className="relative rounded-2xl overflow-hidden group border border-white/10 cursor-pointer aspect-square md:aspect-auto">
                                {/* Background Image */}
                                <div
                                    className="absolute inset-0 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                                    style={{ backgroundImage: `url('${genre.img}')` }}
                                />
                                {/* Overlay */}
                                <div className="absolute inset-0 bg-black/60 group-hover:bg-black/30 transition-colors duration-500" />

                                {/* Content */}
                                <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-4">
                                    <h3 className="text-2xl font-serif text-white mb-2 translate-y-4 md:group-hover:translate-y-0 transition-transform duration-500">{genre.title}</h3>
                                    <p className="text-gold text-sm uppercase tracking-widest opacity-100 md:opacity-0 md:group-hover:opacity-100 translate-y-0 md:translate-y-4 md:group-hover:translate-y-0 transition-all duration-500 delay-75">{genre.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>



            {/* 7. Happy Clients / Testimonials */}
            <section className="py-24 bg-maroon/5 relative overflow-hidden">
                <div className="container mx-auto px-6 relative z-10">
                    <h2 className="text-center font-serif text-4xl mb-12">Happy <span className="text-gold">Clients</span></h2>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {TESTIMONIALS.map((t, idx) => (
                            <div key={idx} className="bg-black/40 backdrop-blur-sm p-8 rounded-2xl border border-white/5 relative">
                                <Quote className="absolute top-4 right-4 text-gold/20 w-10 h-10" />
                                <Heart className="text-maroon w-8 h-8 mb-6" />
                                <p className="text-gray-300 italic mb-6 leading-relaxed">"{t.text}"</p>
                                <div>
                                    <h4 className="text-gold font-serif text-lg">{t.name}</h4>
                                    <p className="text-xs uppercase tracking-wider text-gray-500">{t.role}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 8. Contact / Footer CTA */}
            <section className="py-24 text-center">
                <div className="container mx-auto flex flex-col items-center">
                    <h2 className="font-serif text-5xl mb-6">Let's Create <span className="text-gold">Magic</span></h2>
                    <p className="text-gray-400 mb-8 font-light italic">"Music is the soundtrack of your life!"</p>

                    <div className="flex flex-col md:flex-row gap-8 text-xl">
                        <a href="mailto:whitedoorproductionhouse14@gmail.com" className="hover:text-gold transition-colors">whitedoorproductionhouse14@gmail.com</a>
                        <span className="hidden md:block text-gold">•</span>
                        <a href="tel:+916359012805" className="hover:text-gold transition-colors">+91 6359 012 805</a>
                    </div>
                    <p className="mt-4 text-gray-500">Vadodara, Gujarat - India</p>
                </div>
            </section>

            <Footer />
        </main >
    );
}
