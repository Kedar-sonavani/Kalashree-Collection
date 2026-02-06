'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles } from 'lucide-react';

export function HeroSection() {
    return (
        <section className="relative w-full h-[calc(100vh-4rem)] min-h-[700px] overflow-hidden bg-[#faf9f6]">
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1.5 }}
                className="absolute inset-0 w-full h-full"
            >
                <Image
                    src={process.env.NEXT_PUBLIC_HERO_IMAGE || "/aai.png"}
                    alt="Premium Ethnic Collection"
                    fill
                    className="object-cover object-right md:object-center"
                    priority
                />

                {/* Desktop: Soft light gradient from left */}
                <div className="absolute inset-0 bg-gradient-to-r from-[#faf9f6] via-[#faf9f6]/40 to-transparent hidden md:block" />

                {/* Mobile: Stronger light overlay to protect black text */}
                <div className="absolute inset-0 bg-white/40 md:hidden" />
            </motion.div>

            {/* Editorial Frame (Darkened for visibility) */}
            <div className="absolute inset-6 md:inset-10 border border-black/10 pointer-events-none z-10 flex flex-col justify-between p-4 md:p-8">
                <div className="flex justify-between items-start text-[10px] md:text-xs font-medium uppercase tracking-[0.3em] text-black/60">
                    <span>Collection No. 02</span>
                    <span className="hidden md:block">Handcrafted Heritage</span>
                    <span>© 2024</span>
                </div>
                <div className="flex justify-between items-end text-[10px] md:text-xs font-medium uppercase tracking-[0.3em] text-black/60">
                    <div className="flex items-center gap-2">
                        <div className="w-8 h-[1px] bg-black/20" />
                        <span>Sustainably Sourced</span>
                    </div>
                </div>
            </div>

            <div className="relative z-20 container h-full flex items-center">
                <div className="max-w-2xl text-left">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 1, delay: 0.2 }}
                    >
                        <div className="inline-flex items-center gap-2 py-2 px-4 bg-white/90 backdrop-blur-md border border-amber-200/50 rounded-full text-[10px] md:text-xs font-bold uppercase tracking-[0.2em] text-amber-800 shadow-sm mb-8">
                            <Sparkles className="w-3 h-3 text-amber-600" />
                            Tradition Redefined
                        </div>

                        <h1 className="font-heading text-6xl md:text-8xl lg:text-9xl font-light tracking-tighter leading-[0.85] text-black mb-6">
                            TIMELESS <br />
                            <span className="font-serif italic font-normal text-amber-900/80">Elegance</span>
                        </h1>

                        <p className="text-base md:text-xl text-zinc-800 max-w-sm leading-relaxed font-medium mb-10 border-l-2 border-amber-600/30 pl-6">
                            Discover the art of hand-woven textures and artisanal details, curated for the modern connoisseur of heritage.
                        </p>

                        <div className="flex flex-col sm:flex-row gap-6 items-start sm:items-center">
                            <Link href="#collection">
                                <Button className="group h-16 px-10 bg-black text-white hover:bg-zinc-800 rounded-none text-xs font-bold uppercase tracking-[0.2em] transition-all">
                                    Shop Collection
                                    <ArrowRight className="ml-3 h-4 w-4 transition-transform group-hover:translate-x-1" />
                                </Button>
                            </Link>
                            <Link href="/collections" className="group flex items-center text-xs font-bold uppercase tracking-[0.2em] text-black/70 hover:text-black transition-colors py-2">
                                View Lookbook
                                <div className="ml-2 w-0 h-[1px] bg-black transition-all group-hover:w-8" />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>

            <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 hidden md:block">
                <motion.div
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-[1px] h-12 bg-gradient-to-b from-black/40 to-transparent"
                />
            </div>
        </section>
    );
}