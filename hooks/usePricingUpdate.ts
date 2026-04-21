import { useEffect, useRef } from "react";
import { useCalculatorStore } from "@/store/calculatorStore";
import { 
  calculateUmzugAdvanced, 
  calculateReinigungAdvanced, 
  calculateEntsorgungAdvanced 
} from "@/lib/pricing/calculator-engine";

export function usePricingUpdate(dic: any) {
  const serviceType = useCalculatorStore((s) => s.serviceType);
  const umzugData = useCalculatorStore((s) => s.umzugData);
  const reinigungData = useCalculatorStore((s) => s.reinigungData);
  const entsorgungData = useCalculatorStore((s) => s.entsorgungData);
  const baseDetails = useCalculatorStore((s) => s.baseDetails);
  const setAdvancedEstimate = useCalculatorStore((s) => s.setAdvancedEstimate);

  useEffect(() => {
    if (!serviceType) {
      setAdvancedEstimate(null);
      return;
    }

    let estimate = null;

    try {
      if (serviceType === "umzug" || serviceType === "seniorenumzug") {
        estimate = calculateUmzugAdvanced(umzugData, baseDetails, dic);
      } else if (serviceType === "reinigung") {
        estimate = calculateReinigungAdvanced(reinigungData, dic);
      } else if (serviceType === "entsorgung") {
        estimate = calculateEntsorgungAdvanced(entsorgungData, dic);
      }
    } catch (err) {
      console.error("Pricing Engine Error:", err);
    }

    setAdvancedEstimate(estimate);
  }, [
    serviceType, 
    umzugData, 
    reinigungData, 
    entsorgungData, 
    baseDetails, 
    dic, 
    setAdvancedEstimate
  ]);
}
