"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, m } from "framer-motion";
import { ChevronLeft, ChevronRight, Download, X } from "lucide-react";

interface GalleryModalProps {
  images: string[];
  initialIndex: number;
  onClose: () => void;
}

export function GalleryModal({
  images,
  initialIndex,
  onClose,
}: GalleryModalProps) {
  const [index, setIndex] = useState(initialIndex);
  const [direction, setDirection] = useState(0);

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

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowLeft") prevImage();
      if (event.key === "ArrowRight") nextImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [nextImage, onClose, prevImage]);

  const variants = {
    enter: (currentDirection: number) => ({
      x: currentDirection > 0 ? 900 : -900,
      opacity: 0,
      scale: 0.96,
    }),
    center: {
      zIndex: 1,
      x: 0,
      opacity: 1,
      scale: 1,
    },
    exit: (currentDirection: number) => ({
      zIndex: 0,
      x: currentDirection < 0 ? 900 : -900,
      opacity: 0,
      scale: 0.96,
    }),
  };

  return (
    <m.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 backdrop-blur-md"
      onClick={onClose}
    >
      <div className="absolute right-4 top-4 z-50 flex gap-3">
        <button
          type="button"
          onClick={(event) => {
            event.stopPropagation();
            window.open(images[index], "_blank");
          }}
          className="rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
        >
          <Download className="h-6 w-6" />
        </button>
        <button
          type="button"
          onClick={onClose}
          className="rounded-full bg-white/10 p-2 text-white transition-colors hover:bg-white/20"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      {images.length > 1 ? (
        <>
          <button
            type="button"
            className="absolute left-4 top-1/2 z-50 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
            onClick={(event) => {
              event.stopPropagation();
              prevImage();
            }}
          >
            <ChevronLeft className="h-8 w-8" />
          </button>
          <button
            type="button"
            className="absolute right-4 top-1/2 z-50 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white transition-colors hover:bg-white/20"
            onClick={(event) => {
              event.stopPropagation();
              nextImage();
            }}
          >
            <ChevronRight className="h-8 w-8" />
          </button>
        </>
      ) : null}

      {images.length > 1 ? (
        <div className="absolute bottom-6 left-1/2 z-50 -translate-x-1/2 rounded-full border border-white/10 bg-black/50 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm">
          {index + 1} / {images.length}
        </div>
      ) : null}

      <div
        className="relative flex h-full max-h-[90vh] w-full max-w-7xl items-center justify-center overflow-hidden p-4"
        onClick={(event) => event.stopPropagation()}
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
              opacity: { duration: 0.2 },
            }}
            className="absolute flex h-full w-full items-center justify-center p-4"
          >
            <div className="relative h-full max-h-[85vh] w-full max-w-6xl">
              {images[index] ? (
                <Image
                  src={images[index]}
                  alt={`Galeriebild ${index + 1}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 80vw"
                  priority
                  className="object-contain"
                  quality={90}
                />
              ) : (
                <div className="flex h-full items-center justify-center text-white/50">
                  Bildquelle fehlt
                </div>
              )}
            </div>
          </m.div>
        </AnimatePresence>
      </div>

      {images.length > 1 ? (
        <div
          className="absolute bottom-6 right-6 z-50 hidden max-w-md gap-2 overflow-x-auto rounded-xl border border-white/10 bg-black/50 p-2 backdrop-blur-sm md:flex"
          onClick={(event) => event.stopPropagation()}
        >
          {images.map((image, imageIndex) => (
            <button
              key={image}
              type="button"
              onClick={() => {
                setDirection(imageIndex > index ? 1 : -1);
                setIndex(imageIndex);
              }}
              className={cnThumb(imageIndex === index)}
            >
              <Image
                src={image}
                alt={`Vorschaubild ${imageIndex + 1}`}
                fill
                sizes="48px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      ) : null}
    </m.div>
  );
}

function cnThumb(active: boolean) {
  return [
    "relative h-12 w-12 overflow-hidden rounded-lg border-2 transition-all",
    active
      ? "border-blue-400 scale-110"
      : "border-transparent opacity-60 hover:opacity-100",
  ].join(" ");
}
