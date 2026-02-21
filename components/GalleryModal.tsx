"use client";

import { useEffect, useState, useCallback } from "react";
import Image from "next/image";
import { m, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Download } from "lucide-react";

interface GalleryModalProps {
    images: string[];
    initialIndex: number;
    onClose: () => void;
}

export function GalleryModal({ images, initialIndex, onClose }: GalleryModalProps) {
    const [index, setIndex] = useState(initialIndex);
    const [direction, setDirection] = useState(0);

    // Keyboard navigation
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
            if (e.key === "ArrowLeft") prevImage();
            if (e.key === "ArrowRight") nextImage();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [index, onClose]);

    const nextImage = useCallback(() => {
        if (images.length <= 1) return;
        setDirection(1);
        setIndex((prev) => (prev + 1) % images.length);
    }, [images.length]);

    const prevImage = useCallback(() => {
        if (images.length <= 1) return;
        setDirection(-1);
        setIndex((prev) => (prev - 1 + images.length) % images.length);
    }, [images.length]);

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.5
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1,
            scale: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0,
            scale: 0.5
        })
    };

    return (
        <m.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md"
            onClick={onClose}
        >
            {/* Controls */}
            <div className="absolute top-4 right-4 z-50 flex gap-4">
                <button
                    onClick={(e) => { e.stopPropagation(); window.open(images[index], '_blank'); }}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                    <Download className="w-6 h-6" />
                </button>
                <button
                    onClick={onClose}
                    className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                >
                    <X className="w-6 h-6" />
                </button>
            </div>

            {/* Navigation Buttons - Only if multiple images */}
            {images.length > 1 && (
                <>
                    <button
                        className="absolute left-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                        onClick={(e) => { e.stopPropagation(); prevImage(); }}
                    >
                        <ChevronLeft className="w-8 h-8" />
                    </button>
                    <button
                        className="absolute right-4 top-1/2 -translate-y-1/2 z-50 p-3 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                        onClick={(e) => { e.stopPropagation(); nextImage(); }}
                    >
                        <ChevronRight className="w-8 h-8" />
                    </button>
                </>
            )}

            {/* Image Counter */}
            {images.length > 1 && (
                <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-black/50 text-white text-sm font-medium border border-white/10 backdrop-blur-sm">
                    {index + 1} / {images.length}
                </div>
            )}

            {/* Main Image */}
            <div
                className="relative w-full h-full max-w-7xl max-h-[90vh] p-4 flex items-center justify-center overflow-hidden"
                onClick={(e) => e.stopPropagation()}
            >
                <AnimatePresence initial={false} custom={direction}>
                    <m.div
                        key={index}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                        }}
                        className="absolute w-full h-full flex items-center justify-center p-4"
                    >
                        <div className="relative w-full h-full max-w-6xl max-h-[85vh]">
                            {images[index] ? (
                                <Image
                                    src={images[index]}
                                    alt={`Gallery Image ${index + 1}`}
                                    fill
                                    sizes="(max-width: 768px) 100vw, 80vw"
                                    priority={true}
                                    className="object-contain"
                                    quality={90}
                                    onError={(e) => {
                                        console.error("Image load failed:", images[index]);
                                        // Could set a local error state here to show a fallback icon using a wrapper component
                                        e.currentTarget.style.display = 'none'; // Simple fallback: hide broken image
                                        e.currentTarget.parentElement?.classList.add('bg-white/5', 'flex', 'items-center', 'justify-center');
                                        const fallback = document.createElement('div');
                                        fallback.innerText = '⚠️ Image not available';
                                        fallback.className = 'text-white/50 font-medium';
                                        e.currentTarget.parentElement?.appendChild(fallback);
                                    }}
                                />
                            ) : (
                                <div className="flex items-center justify-center h-full text-white/50">
                                    Image source missing
                                </div>
                            )}
                        </div>
                    </m.div>
                </AnimatePresence>
            </div>

            {/* Thumbnail Strip (Optional, for > 1 images) */}
            {images.length > 1 && (
                <div className="absolute bottom-6 right-6 z-50 hidden md:flex gap-2 p-2 rounded-xl bg-black/50 backdrop-blur-sm border border-white/10 overflow-x-auto max-w-md" onClick={(e) => e.stopPropagation()}>
                    {images.map((img, i) => (
                        <button
                            key={i}
                            onClick={() => { setDirection(i > index ? 1 : -1); setIndex(i); }}
                            className={`relative w-12 h-12 rounded-lg overflow-hidden border-2 transition-all ${i === index ? 'border-primary scale-110' : 'border-transparent opacity-60 hover:opacity-100'}`}
                        >
                            <Image
                                src={img}
                                alt={`Thumbnail ${i}`}
                                fill
                                sizes="50px"
                                className="object-cover"
                            />
                        </button>
                    ))}
                </div>
            )}
        </m.div>
    );
}
