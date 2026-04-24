"use client";

import { useEffect } from 'react';
import { useCalculatorStore } from '@/store/calculatorStore';

export default function UtmCapture() {
 const { updateLeadDetails } = useCalculatorStore();

 useEffect(() => {
  // Only run on the client
  if (typeof window === 'undefined') return;

  const params = new URLSearchParams(window.location.search);
  
  // Check if there's any UTM/gclid in the URL
  const utmSource = params.get('utm_source');
  const utmMedium = params.get('utm_medium');
  const utmCampaign = params.get('utm_campaign');
  const gclid = params.get('gclid');

  // If found in URL, save it to the global store (which could persist if we added persist middleware, 
  // but for the session it's fine)
  if (utmSource || utmMedium || utmCampaign || gclid) {
   updateLeadDetails({
    ...(utmSource && { utmSource }),
    ...(utmMedium && { utmMedium }),
    ...(utmCampaign && { utmCampaign }),
    ...(gclid && { gclid }),
   });
   
   // Also save to sessionStorage so it survives across page reloads during the session
   if (utmSource) sessionStorage.setItem('floxant_utm_source', utmSource);
   if (utmMedium) sessionStorage.setItem('floxant_utm_medium', utmMedium);
   if (utmCampaign) sessionStorage.setItem('floxant_utm_campaign', utmCampaign);
   if (gclid) sessionStorage.setItem('floxant_gclid', gclid);
  } else {
   // Try to recover from sessionStorage if the user navigated to another page
   const storedSource = sessionStorage.getItem('floxant_utm_source');
   const storedMedium = sessionStorage.getItem('floxant_utm_medium');
   const storedCampaign = sessionStorage.getItem('floxant_utm_campaign');
   const storedGclid = sessionStorage.getItem('floxant_gclid');
   
   if (storedSource || storedMedium || storedCampaign || storedGclid) {
    updateLeadDetails({
     ...(storedSource && { utmSource: storedSource }),
     ...(storedMedium && { utmMedium: storedMedium }),
     ...(storedCampaign && { utmCampaign: storedCampaign }),
     ...(storedGclid && { gclid: storedGclid }),
    });
   }
  }
 }, [updateLeadDetails]);

 return null; // Invisible component
}
