'use client';

import Link from 'next/link';
import { ShoppingCart, Menu, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useMasterSwitch } from '@/context/MasterSwitchContext';
import { useCart } from '@/context/CartContext';
import { motion, useScroll, useMotionValueEvent, AnimatePresence, useTransform } from 'framer-motion';
import { useState } from 'react';
import CartDrawer from './CartDrawer';
import MobileMenu from './MobileMenu';
import { cn } from '@/lib/utils';
import { UserProfile } from './UserProfile';
import { Input } from '@/components/ui/input';

export function Navbar() {
    const { isEcommerceActive, whatsappNumber, isLoading } = useMasterSwitch();
    const { cartCount } = useCart();

    // State
    const [isScrolled, setIsScrolled] = useState(false);
    const [isSearchOpen, setIsSearchOpen] = useState(false);
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const { scrollY } = useScroll();

    // Handle Scroll State
    useMotionValueEvent(scrollY, "change", (latest) => {
        setIsScrolled(latest > 50);
    });

    const handleInquiry = () => {
        const message = "Hi! I'm interested in the collection.";
        window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, '_blank');
    };

    // LIGHT THEME: Transparent -> White/90
    const backgroundColor = useTransform(
        scrollY,
        [0, 50],
        ['rgba(255, 255, 255, 0)', 'rgba(255, 255, 255, 0.95)']
    );
    const borderBottom = useTransform(
        scrollY,
        [0, 50],
        ['1px solid rgba(0, 0, 0, 0)', '1px solid rgba(0, 0, 0, 0.05)']
    );

    return (
        <>
            <motion.header
                style={{ backgroundColor, borderBottom, backdropFilter: 'blur(12px)' }}
                className="sticky top-0 z-[50] w-full transition-all duration-300"
            >
                <div className="container flex items-center justify-between h-14">

                    {/* 1. LOGO */}
                    <div className="flex-shrink-0 z-20">
                        <Link href="/" className="flex items-center gap-2 group">
                            <span className="font-heading font-extrabold tracking-tighter text-2xl md:text-3xl uppercase transition-colors text-black">
                                {(process.env.NEXT_PUBLIC_SITE_NAME || "Kalashree").split(' ')[0]}{' '}
                                <span className="italic font-serif font-normal text-amber-900/80">
                                    {(process.env.NEXT_PUBLIC_SITE_NAME || "Collection").split(' ').slice(1).join(' ')}
                                </span>
                            </span>
                        </Link>
                    </div>

                    {/* 2. NAVIGATION (Premium Centered) */}
                    <nav className="hidden lg:flex items-center gap-8 absolute left-1/2 -translate-x-1/2">
                        {['New Arrivals', 'Collections'].map((item) => (
                            <Link
                                key={item}
                                href={`/${item.toLowerCase().replace(' ', '-')}`}
                                className="relative text-[10px] font-bold uppercase tracking-[0.25em] text-zinc-600 hover:text-black transition-colors py-1 group"
                            >
                                {item}
                                <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-amber-600/40 transition-all duration-300 group-hover:w-full" />
                            </Link>
                        ))}
                    </nav>

                    {/* 3. ACTIONS */}
                    <div className="flex items-center gap-1 md:gap-4 z-20">
                        <div className="flex items-center">
                            <AnimatePresence mode="wait">
                                {isSearchOpen && (
                                    <motion.div
                                        initial={{ width: 0, opacity: 0 }}
                                        animate={{ width: 200, opacity: 1 }}
                                        exit={{ width: 0, opacity: 0 }}
                                        className="hidden md:flex items-center overflow-hidden mr-2"
                                    >
                                        <Input
                                            placeholder="Search collection..."
                                            className="h-8 text-xs bg-transparent border-0 border-b border-black/20 rounded-none focus-visible:ring-0 px-0 placeholder:text-black/40 text-black"
                                            autoFocus
                                            onBlur={() => setIsSearchOpen(false)}
                                        />
                                    </motion.div>
                                )}
                            </AnimatePresence>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsSearchOpen(!isSearchOpen)}
                                className="rounded-full hover:bg-black/5 text-black/70"
                            >
                                {isSearchOpen ? <X className="h-4 w-4" /> : <Search className="h-4 w-4" />}
                            </Button>
                        </div>

                        <div className="hidden sm:block text-black">
                            <UserProfile />
                        </div>

                        {!isLoading && isEcommerceActive && (
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsCartOpen(true)}
                                className="relative rounded-full hover:bg-black/5 text-black"
                            >
                                <ShoppingCart className="h-4 w-4" />
                                <AnimatePresence>
                                    {cartCount > 0 && (
                                        <motion.span
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            exit={{ scale: 0 }}
                                            className="absolute -top-1 -right-1 text-[9px] font-bold h-4 w-4 rounded-full flex items-center justify-center bg-black text-white shadow-sm"
                                        >
                                            {cartCount}
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </Button>
                        )}

                        <Button
                            variant="ghost"
                            size="icon"
                            className="lg:hidden rounded-full hover:bg-black/5 text-black"
                            onClick={() => setIsMobileMenuOpen(true)}
                        >
                            <Menu className="h-5 w-5" />
                        </Button>
                    </div>
                </div>
            </motion.header>

            <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
            <MobileMenu isOpen={isMobileMenuOpen} onClose={() => setIsMobileMenuOpen(false)} />
        </>
    );
}