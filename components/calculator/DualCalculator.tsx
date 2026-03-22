"use client";

import React, { useEffect } from 'react';
import { AnimatePresence, m } from 'framer-motion';
import { useCalculatorStore, ServiceType } from '@/store/calculatorStore';
import ExpressCalculator from './ExpressCalculator';
import AdvancedCalculator from './AdvancedCalculator';
import LeadCaptureForm from './LeadCaptureForm';
import LiveActivityFeed from '../trust/LiveActivityFeed';
import ExitIntentModal from './ExitIntentModal';

interface DualCalculatorProps {
  initialService?: ServiceType;
}

export default function DualCalculator({ initialService }: DualCalculatorProps) {
  const { mode, setServiceType } = useCalculatorStore();

  useEffect(() => {
    if (initialService) {
      setServiceType(initialService);
    }
  }, [initialService, setServiceType]);

  return (
    <div className="w-full relative">
      <LiveActivityFeed />
      <ExitIntentModal />
      <AnimatePresence mode="wait">
        {mode === 'express' && (
          <m.div 
            key="express"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
          >
            <ExpressCalculator />
          </m.div>
        )}

        {mode === 'advanced' && (
          <m.div 
            key="advanced"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5, type: 'spring', bounce: 0.3 }}
          >
            <AdvancedCalculator />
          </m.div>
        )}

        {/* Lead state - we added this to Mode conditionally but let's assume mode === 'lead' is an extension. */}
        {/* We need to make sure 'lead' is aded to CalculatorMode type in the store. */}
        {/* If the user clicks "Angebot sichern", we will switch mode to 'lead'. */}
        {mode === ('lead' as any) && (
          <m.div 
            key="lead"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.4 }}
          >
            <LeadCaptureForm />
          </m.div>
        )}
      </AnimatePresence>
    </div>
  );
}
