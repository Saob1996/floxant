import { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'FLOXANT - Umzugsunternehmen Regensburg & Bayern | Umzug, Reinigung, Entrümpelung',
    short_name: 'FLOXANT',
    description: 'Ihr professionelles Umzugsunternehmen in Regensburg & Bayern. Umzug, Entrümpelung & Reinigung zum Festpreis. 100% versichert, 24h-Service. München, Nürnberg, Augsburg & 100+ Städte.',
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
