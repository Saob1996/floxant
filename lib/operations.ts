// Phase 4: Operational Clustering & Packaging

export interface JobPackaging {
  teamSize: number;
  estimatedHours: number;
  vehicle: string;
}

/**
 * Derives operational requirements automatically based on the user's base structural inputs.
 * This completely removes manual dispatching estimation.
 */
export function calculateJobPackaging(serviceType: 'umzug' | 'reinigung' | 'entsorgung', baseMetricValue: number): JobPackaging {
  if (serviceType === 'umzug') {
    const hours = Math.ceil(baseMetricValue * 0.08 + 1.5);
    const team = baseMetricValue > 70 ? 4 : (baseMetricValue > 30 ? 3 : 2);
    const vehicle = baseMetricValue > 60 ? '7.5t LKW' : '3.5t Transporter';
    return { teamSize: team, estimatedHours: hours, vehicle };
  } else if (serviceType === 'reinigung') {
    const hours = Math.ceil(baseMetricValue * 0.05 + 1);
    const team = baseMetricValue > 100 ? 3 : 2;
    return { teamSize: team, estimatedHours: hours, vehicle: 'PKW / Caddy' };
  } else {
    // Entsorgung
    const hours = Math.ceil(baseMetricValue * 0.4 + 1);
    const team = baseMetricValue > 15 ? 3 : 2;
    const vehicle = baseMetricValue > 10 ? '7.5t Kipper' : '3.5t Pritsche';
    return { teamSize: team, estimatedHours: hours, vehicle };
  }
}

/**
 * Simulates finding the nearest cluster to group this job for margin optimization
 */
export function findOptimalCluster(city: string, date: string): string {
  // Mock logic to return a cluster ID based on city hashes
  const hash = Array.from(city).reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return `CLUSTER-${city.substring(0, 3).toUpperCase()}-${hash}-${date.replace(/-/g, '').substring(4)}`;
}
