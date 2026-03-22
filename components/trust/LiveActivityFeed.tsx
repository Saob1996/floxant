"use client";

import React, { useState, useEffect } from 'react';
import { m, AnimatePresence } from 'framer-motion';
import { CheckCircle2, MapPin } from 'lucide-react';

interface Activity {
  id: number;
  message: string;
  location: string;
  timeAgo: string;
  type: 'booking' | 'viewing';
}

const mockActivities: Omit<Activity, 'id'>[] = [
  { message: "Gerade gebucht: Umzug", location: "München", timeAgo: "vor 2 Min", type: "booking" },
  { message: "3 Personen schauen sich diesen Rechner an", location: "in deiner Nähe", timeAgo: "Live", type: "viewing" },
  { message: "Angebot bestätigt: Reinigung", location: "Augsburg", timeAgo: "vor 12 Min", type: "booking" },
  { message: "Letzte Anfrage", location: "Nürnberg", timeAgo: "vor 4 Min", type: "booking" },
  { message: "Gerade gebucht: Entsorgung", location: "Berlin", timeAgo: "vor 8 Min", type: "booking" },
];

export default function LiveActivityFeed() {
  const [currentActivity, setCurrentActivity] = useState<Activity | null>(null);

  useEffect(() => {
    let timeout: NodeJS.Timeout;

    const triggerRandomActivity = () => {
      // Pick random activity
      const activityTemplate = mockActivities[Math.floor(Math.random() * mockActivities.length)];
      setCurrentActivity({ ...activityTemplate, id: Date.now() });

      // Dismiss after 4 seconds
      setTimeout(() => {
        setCurrentActivity(null);
      }, 4000);

      // Re-trigger between 8 to 20 seconds later
      const nextInterval = Math.floor(Math.random() * (20000 - 8000 + 1)) + 8000;
      timeout = setTimeout(triggerRandomActivity, nextInterval);
    };

    // First trigger after 3 seconds
    timeout = setTimeout(triggerRandomActivity, 3000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className="fixed bottom-6 left-6 z-50 pointer-events-none">
      <AnimatePresence>
        {currentActivity && (
          <m.div
            key={currentActivity.id}
            initial={{ opacity: 0, y: 15, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            transition={{ type: "tween", duration: 0.4, ease: "easeOut" }}
            className="bg-secondary/90 border border-border shadow-lg rounded-full py-2.5 px-4 flex items-center gap-3 max-w-sm backdrop-blur-md"
          >
            <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${currentActivity.type === 'booking' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-primary/10 text-primary'}`}>
              {currentActivity.type === 'booking' ? <CheckCircle2 size={12} /> : <MapPin size={12} />}
            </div>
            <div className="flex items-center gap-2">
              <span className="text-foreground text-[11px] font-medium leading-none tracking-wide">{currentActivity.message}</span>
              <span className="text-muted-foreground/30 text-[10px]">|</span>
              <span className="text-muted-foreground text-[10px] uppercase tracking-wider">{currentActivity.location}</span>
            </div>
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
