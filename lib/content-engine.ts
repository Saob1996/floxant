// Phase 5: Autonomous Content Generation Engine

export interface GeneratedContent {
 title: string;
 slug: string;
 category: 'city_guide' | 'micro_article' | 'case_story';
 htmlBlob: string;
 metadata: Record<string, any>;
}

/**
 * Triggers the automated writing of hyper-localized SEO content.
 * MOCKED: In production, this pings an LLM (e.g. OpenAI GPT-4) using heavily structured prompt templates.
 */
export async function generateCityContent(city: string, service: string): Promise<GeneratedContent> {
 const normalizedService = service.replace(/-/g, " ");
 const serviceCap = normalizedService.charAt(0).toUpperCase() + normalizedService.slice(1);
 const title = `Alles über ${serviceCap} in ${city} - Kosten, Ablauf und Hinweise`;
 const slug = `${service}-${city.toLowerCase().replace(/ /g, '-')}`;

 const htmlBlob = `
  <article class="prose prose-invert max-w-none text-white/70">
   <p class="text-xl text-white font-light mb-6">Ein <strong>${serviceCap} in ${city}</strong> braucht eine saubere Planung und einen realistischen Kostenrahmen. Der tatsächliche Aufwand hängt meist von Zugang, Volumen, Terminlage und gewünschten Zusatzleistungen ab.</p>
   
   <h2 class="text-2xl text-white font-medium mt-10 mb-4 border-b border-white/10 pb-2">Kostenübersicht für ${city}</h2>
   <p class="mb-6">Im Raum ${city} variieren Preise vor allem nach Zugang, Terminlage, Volumen und Zusatzaufwand. FLOXANT prüft diese Punkte vor einer verbindlichen Planung, damit aus einer ersten Anfrage kein künstlich niedriger Lockpreis wird.</p>
   
   <h2 class="text-2xl text-white font-medium mt-10 mb-4 border-b border-white/10 pb-2">Was Sie in ${city} beachten sollten</h2>
   <ul class="list-disc pl-5 space-y-3 mb-8">
    <li><strong>Parkplatzsituation:</strong> Holen Sie rechtzeitig Halteverbotszonen bei der lokalen Stadtverwaltung (Kreisverwaltungsreferat) in ${city} ein.</li>
    <li><strong>Volumenberechnung:</strong> Geben Sie Mengen und besondere Stücke möglichst genau an, damit Fahrzeuggröße, Teamstärke und Zeitfenster realistisch geplant werden können.</li>
    <li><strong>Zugänge und Besonderheiten:</strong> Weisen Sie früh auf Aufzüge, lange Wege, sensible Möbel oder enge Treppenhäuser hin, damit der Ablauf sauber vorbereitet werden kann.</li>
   </ul>

   <div class="p-6 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-100">
    <strong>Tipp aus der Disposition:</strong> Wer Terminspielraum mitbringt und Zugangsdaten früh klärt, bekommt meist schneller eine belastbare Rückmeldung und oft auch die ruhigere Planung.
   </div>
  </article>
 `;

 return {
  title,
  slug,
  category: 'city_guide',
  htmlBlob,
  metadata: { city, service, target_keywords: [`${normalizedService} ${city} kosten`, `${normalizedService} ${city} preis`] }
 };
}
