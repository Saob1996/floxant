import React from 'react';
import Image from 'next/image';
import { UserCheck, Award, ThumbsUp } from 'lucide-react';
import { company } from '@/lib/company';

interface AuthorBoxProps {
  name: string;
  role: string;
  description: string;
  headshot?: string;
}

/**
 * AuthorBox - E-E-A-T Authority Component
 * Displays the verified expert behind the content to boost Google Trust signals.
 * Injects Person schema for entity clarity.
 */
export function AuthorBox({ name, role, description, headshot = "/assets/expert-alexander.png" }: AuthorBoxProps) {
  const personLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": name,
    "jobTitle": role,
    "description": description,
    "image": `${company.url}${headshot}`,
    "worksFor": {
      "@type": "Organization",
      "name": company.name,
      "url": company.url
    },
    "knowsAbout": ["Logistik", "Umzugsplanung", "Reinigungsservice", "Bavarian Logistics"]
  };

  return (
    <section className="mt-16 p-8 rounded-[2rem] border border-white/5 bg-[#0B0B14] relative overflow-hidden group">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(personLd) }} />
      
      <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/5 blur-3xl rounded-full transition-all group-hover:bg-blue-500/10" />
      
      <div className="flex flex-col md:flex-row items-center md:items-start gap-8 relative z-10">
        <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-2xl border-2 border-blue-500/20 shadow-xl shadow-blue-500/5">
          <Image
            src={headshot}
            alt={name}
            fill
            className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
          />
        </div>
        
        <div className="flex-1 text-center md:text-start">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-bold uppercase tracking-widest mb-3">
            <UserCheck size={12} /> Verifizierter Experte
          </div>
          <h3 className="text-2xl font-bold text-white mb-2">{name}</h3>
          <p className="text-blue-500 font-medium text-sm mb-4">{role}</p>
          <p className="text-white/60 text-sm leading-relaxed mb-6 italic">
            "{description}"
          </p>
          
          <div className="flex flex-wrap justify-center md:justify-start gap-4">
            <div className="flex items-center gap-2 text-xs text-white/40">
              <Award size={14} className="text-blue-500" />
              <span>15+ Jahre Erfahrung</span>
            </div>
            <div className="flex items-center gap-2 text-xs text-white/40">
              <ThumbsUp size={14} className="text-blue-500" />
              <span>Qualitätsgeprüft</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
