export function buildSupabaseServiceHeaders(apiKey, additionalHeaders = {}) {
  const headers = {
    apikey: apiKey,
    ...additionalHeaders,
  };

  if (!apiKey.startsWith("sb_secret_")) {
    headers.Authorization = `Bearer ${apiKey}`;
  }

  return headers;
}
