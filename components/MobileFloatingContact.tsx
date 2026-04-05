"use client";

import React, { useState, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { Phone, MessageCircle, Calculator } from 'lucide-react';
import Link from 'next/link';
import { useParams } from 'next/navigation';

export default function MobileFloatingContact({ dic }: { dic?: any }) {
  const [isVisible, setIsVisible] = useState(false);
  const params = useParams();
  const lang = params?.lang as string || 'de';

  useEffect(() => {
    const handleScroll = () => {
      // Show after scrolling down a bit (e.g. 300px)
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <m.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 100, opacity: 0 }}
          transition={{ type: 'spring', bounce: 0.1, duration: 0.5 }}
          className="fixed bottom-0 inset-x-0 w-full z-50 lg:hidden"
        >
          {/* Subtle gradient to blend into background */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/90 to-transparent -z-10 h-[150%]" />
          
          <div className="bg-[#111] border-t border-white/10 px-2 py-3 pb-8 md:pb-4 shadow-[0_-10px_40px_rgba(0,0,0,0.5)] safe-area-bottom">
            <div className="flex items-center justify-around gap-2 max-w-md mx-auto">
              
              {/* WhatsApp Button */}
              <a 
                href="https://wa.me/4915771105087" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex flex-col items-center justify-center w-full gap-1 p-2 text-gray-400 hover:text-[#25D366] transition-colors"
                aria-label="WhatsApp Chat"
              >
                <div className="bg-white/5 p-2.5 rounded-full mb-1">
                    <MessageCircle size={20} className="text-[#25D366]" />
                </div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-[#25D366]">{dic?.common?.mobile_chat || "Chatten"}</span>
              </a>

              {/* Calculator Action Button (Primary) */}
              <Link 
                href={`/${lang}/#contact`}
                className="flex flex-col items-center justify-center w-full gap-1 p-2 -mt-6 transform"
                aria-label="Zum Rechner"
              >
                <div className="bg-primary p-4 rounded-full shadow-[0_0_20px_rgba(var(--primary),0.5)] border-2 border-background flex items-center justify-center text-primary-foreground mb-1">
                  <Calculator size={24} />
                </div>
                <span className="text-[11px] uppercase font-bold tracking-widest text-white">{dic?.common?.mobile_calc || "Rechner"}</span>
              </Link>

              {/* Call Button */}
              <a 
                href="tel:+4915771105087"
                className="flex flex-col items-center justify-center w-full gap-1 p-2 text-gray-400 hover:text-white transition-colors"
                aria-label="Jetzt anrufen"
              >
                <div className="bg-white/5 p-2.5 rounded-full mb-1">
                    <Phone size={20} className="text-white" />
                </div>
                <span className="text-[10px] uppercase font-bold tracking-widest text-white">{dic?.common?.mobile_call || "Anrufen"}</span>
              </a>

            </div>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  );
}
