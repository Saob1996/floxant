export const DEFAULT_INDEXNOW_KEY = "floxant-indexnow-2026-9a7c5d2e";

export function getIndexNowKey() {
  return process.env.INDEXNOW_KEY?.trim() || DEFAULT_INDEXNOW_KEY;
}
