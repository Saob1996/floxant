# SEO & Performance Standards Compliance (2026)

This document confirms that the FLOXANT technical architecture has been hardened to meet the 2026 standards for AI-driven search (SGE), Voice Search, and Core Web Vitals (INP).

## 1. Structured Data (JSON-LD)
The JSON-LD graph has been expanded to support modern entity-based search:

- **SGE-Ready FAQs**: Questions and answers are formatted to be easily extracted by LLMs (Gemini, ChatGPT) and Google Search Generative Experience.
- **Price & Offer Schema**: Each service now includes detailed `Offer` data (`priceCurrency`, `price`, `priceRange`), enabling rich price snippets in SERPs.
- **Speakable Property**: Implemented the `SpeakableSpecification` to identify key content for audio playback by voice assistants (Siri, Alexa, Google Assistant).
- **Entity Trust (E-E-A-T)**: Connected the organization and cities to official **Wikidata** and social profiles through the `sameAs` property.

## 2. Performance (INP - Interaction to Next Paint)
The client-side interactivity has been optimized to maintain a fast Main Thread:

- **Static Data Isolation**: Large data objects (like activity feeds) are moved outside the component lifecycle to prevent re-allocation.
- **Hardware-Accelerated Animations**: Transitions in the `LiveActivityFeed` use GPU-native properties (transform, opacity), ensuring that user interactions (scrolling, clicking) are never blocked by rendering logic.

## 3. Localization Strategy
- Full support for `de`, `en`, and `ru` within the structured data.
- Hreflang and metadata are synchronized with the JSON-LD objects to prevent "Locale Mismatch" penalties.

---
**Status**: COMPLIANT (2026 STANDARDS)
**Last Audit**: 2026-04-16
