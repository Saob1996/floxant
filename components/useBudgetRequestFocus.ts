"use client";

import { useEffect } from "react";

export function useBudgetRequestFocus(ready: boolean, setStep: (step: 1 | 2) => void) {
  useEffect(() => {
    let firstFrame = 0;
    let secondFrame = 0;
    const openBudget = () => {
      setStep(ready ? 2 : 1);
      firstFrame = requestAnimationFrame(() => {
        secondFrame = requestAnimationFrame(() => {
          const target = document.getElementById(ready ? "request-budget" : "request-service-choice")
            || document.getElementById("english-service-request-form")
            || document.getElementById("direktanfrage");
          target?.focus();
          target?.scrollIntoView({ block: "center", behavior: "instant" });
        });
      });
    };
    window.addEventListener("floxant:budget-request", openBudget);
    return () => {
      window.removeEventListener("floxant:budget-request", openBudget);
      cancelAnimationFrame(firstFrame);
      cancelAnimationFrame(secondFrame);
    };
  }, [ready, setStep]);
}
