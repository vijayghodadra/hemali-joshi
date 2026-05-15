"use client";
import { motion } from "framer-motion";
import Link from "next/link";

const SPONSORS = [
    { id: 1, src: "/assets/sponsors/2ec4d5bd-99bc-43b5-98be-2c62c32d4714.JPG", alt: "Sponsor 1" },
    { id: 2, src: "/assets/sponsors/51e6dbd5-ecab-472f-be99-fdd712656eb7.JPG", alt: "Sponsor 2" },
    { id: 3, src: "/assets/sponsors/741cd729-e77c-4222-9dac-c47afddacc66.JPG", alt: "Sponsor 3" },
    { id: 4, src: "/assets/sponsors/ba072700-f0ee-44ba-a025-d72b19fd9da1.JPG", alt: "Sponsor 4" },
    { id: 5, src: "/assets/sponsors/d9fc77ac-71dd-486a-9d88-e463c38a39cf.jpg", alt: "Sponsor 5" },
    { id: 6, src: "/assets/sponsors/ee0fafd6-846c-4741-810b-c54497b12619.JPG", alt: "Sponsor 6" },
];

export default function SponsorsSection() {
    return (
        <section className="pt-16 pb-32 md:py-24 bg-black relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="text-center mb-12 md:mb-16">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="inline-block p-2 px-4 rounded-full border border-gold/30 bg-gold/5 backdrop-blur-md mb-6"
                    >
                        <span className="text-gold text-xs md:text-sm uppercase tracking-[0.3em] font-medium">
                            Our Partners
                        </span>
                    </motion.div>

                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        viewport={{ once: true }}
                        className="font-serif text-4xl md:text-5xl text-white mb-6"
                    >
                        Trusted <span className="text-gold italic">Entertainment Partner</span>
                    </motion.h2>

                    <motion.div
                        initial={{ opacity: 0, width: 0 }}
                        whileInView={{ opacity: 1, width: "100px" }}
                        transition={{ delay: 0.3, duration: 1 }}
                        className="h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto"
                    />
                </div>

                {/* Marquee Wrapper - Desktop Only */}
                <div className="hidden md:flex w-full overflow-hidden mask-linear-gradient">
                    <TranslateWrapper>
                        {[...SPONSORS, ...SPONSORS, ...SPONSORS].map((sponsor, index) => (
                            <Link key={`${sponsor.id}-${index}`} href="/events">
                                <motion.div
                                    className="group relative w-32 h-32 mx-8 flex items-center justify-center p-4 cursor-pointer"
                                >
                                    <div className="absolute inset-0 bg-white/5 rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-300 opacity-0 group-hover:opacity-100" />
                                    <div className="relative z-10 w-full h-full transition-all duration-500 rounded-xl overflow-hidden border border-white/10 group-hover:border-gold/30 bg-black/50 p-2">
                                        <img
                                            src={sponsor.src}
                                            alt={sponsor.alt}
                                            className="w-full h-full object-contain"
                                        />
                                    </div>
                                </motion.div>
                            </Link>
                        ))}
                    </TranslateWrapper>
                </div>

                {/* Mobile Grid Layout */}
                <div className="grid grid-cols-2 gap-4 items-center justify-items-center md:hidden">
                    {SPONSORS.map((sponsor, index) => (
                        <Link key={sponsor.id} href="/events" className="w-full flex justify-center">
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                viewport={{ once: true }}
                                className="group relative w-full aspect-square max-w-[120px] flex items-center justify-center p-4"
                            >
                                <div className="absolute inset-0 bg-white/5 rounded-2xl transform rotate-3 group-hover:rotate-6 transition-transform duration-300 opacity-0 group-hover:opacity-100" />
                                <div className="relative z-10 w-full h-full transition-all duration-500 rounded-xl overflow-hidden border border-white/10 group-hover:border-gold/30 bg-black/50 p-2">
                                    <img
                                        src={sponsor.src}
                                        alt={sponsor.alt}
                                        className="w-full h-full object-contain"
                                    />
                                </div>
                            </motion.div>
                        </Link>
                    ))}
                </div>
            </div>

            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
            <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </section>
    );
}

const TranslateWrapper = ({ children }: { children: React.ReactNode }) => (
    <motion.div
        initial={{ x: "0%" }}
        animate={{ x: "-50%" }}
        transition={{
            duration: 30,
            ease: "linear",
            repeat: Infinity,
        }}
        className="flex items-center min-w-max"
    >
        {children}
    </motion.div>
);

