// Phase 5: Semantic Proximity & Internal Linking AI

export interface LinkTarget {
  url: string;
  anchorText: string;
  relevanceScore: number;
}

/**
 * Derives the optimal internal links for a generated article to distribute PageRank
 * and maximize conversion paths based on geography and structural relevance.
 */
export function generateSemanticLinks(currentCity: string, contentType: string): LinkTarget[] {
  // MOCK: Generates semantic clusters based on geographic proximity 
  const nearbyCities = currentCity.toLowerCase() === 'münchen' 
    ? ['Augsburg', 'Ingolstadt', 'Rosenheim']
    : ['Berlin', 'Hamburg', 'Stuttgart']; // Generic fallback

  const links: LinkTarget[] = [];

  // Prio 1: Direct conversion trap for current city (Most important for Revenue)
  links.push({
    url: `/de/angebote/umzug-${currentCity.toLowerCase()}-kosten`,
    anchorText: `Sofort Preis für ${currentCity} berechnen`,
    relevanceScore: 100
  });

  // Prio 2: Related high-intent competitor alternatives
  links.push({
    url: `/de/alternativen/movinga-${currentCity.toLowerCase()}`,
    anchorText: `Alternative zu anderen Anbietern in ${currentCity}`,
    relevanceScore: 85
  });

  // Prio 3: Geographic proximity expansion links for Googlebot crawler
  nearbyCities.forEach(city => {
    links.push({
      url: `/de/angebote/umzug-${city.toLowerCase()}-kosten`,
      anchorText: `Umzugstarife in der Nähe: ${city}`,
      relevanceScore: 60
    });
  });

  return links;
}
