"use client";

import { useEffect, useMemo, useState } from "react";

import type { CustomerJourneyItem } from "@/components/navigation/customer-journey.types";

export function useActiveSection(items: CustomerJourneyItem[]) {
  const [availableKeys, setAvailableKeys] = useState<string[]>([]);
  const [activeKey, setActiveKey] = useState<string | null>(null);

  useEffect(() => {
    const nextAvailable = items
      .filter((item) => item.targetId && document.getElementById(item.targetId))
      .map((item) => item.key);

    setAvailableKeys(nextAvailable);

    if (!activeKey || !nextAvailable.includes(activeKey)) {
      setActiveKey(nextAvailable[0] ?? items[0]?.key ?? null);
    }
  }, [activeKey, items]);

  useEffect(() => {
    const targets = items
      .map((item) => ({
        key: item.key,
        element: item.targetId ? document.getElementById(item.targetId) : null,
      }))
      .filter(
        (entry): entry is { key: string; element: HTMLElement } => Boolean(entry.element),
      );

    if (targets.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;

        const match = targets.find((target) => target.element === visible.target);
        if (match) setActiveKey(match.key);
      },
      {
        rootMargin: "-18% 0px -58% 0px",
        threshold: [0.18, 0.35, 0.6],
      },
    );

    targets.forEach((target) => observer.observe(target.element));
    return () => observer.disconnect();
  }, [items]);

  const visibleItems = useMemo(
    () =>
      items.filter(
        (item) => (item.targetId && availableKeys.includes(item.key)) || Boolean(item.fallbackHref),
      ),
    [availableKeys, items],
  );

  return {
    activeKey,
    setActiveKey,
    visibleItems,
  };
}
