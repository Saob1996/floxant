import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'FLOXANT - Premium Umzug & Reinigung',
    short_name: 'FLOXANT',
    description: 'Ihr starkes Umzugsunternehmen in Bayern. Festpreisgarantie, 100% Versichert.',
    start_url: '/',
    display: 'standalone',
    background_color: '#0A0A0A',
    theme_color: '#3b82f6',
    icons: [
      {
        src: '/icon.png',
        sizes: 'any',
        type: 'image/png',
      },
    ],
  };
}
