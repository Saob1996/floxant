const suspiciousMojibakePattern = /[\u00c2\u00c3\u00e2\u00ef\ufffd]/;

const chr = (...codes: number[]) => String.fromCharCode(...codes);

const directSequenceReplacements: Array<[string, string]> = [
  [chr(195, 164), "\u00e4"],
  [chr(195, 132), "\u00c4"],
  [chr(195, 182), "\u00f6"],
  [chr(195, 150), "\u00d6"],
  [chr(195, 188), "\u00fc"],
  [chr(195, 156), "\u00dc"],
  [chr(195, 159), "\u00df"],
  [chr(194, 183), "\u00b7"],
  [chr(194), ""],
  [chr(226, 128, 147), "\u2013"],
  [chr(226, 128, 148), "\u2014"],
  [chr(226, 128, 166), "\u2026"],
  [chr(226, 130, 172), "\u20ac"],
];

const transliterationReplacements: Array<[RegExp, string]> = [
  [/\bFuer\b/g, "F\u00fcr"],
  [/\bfuer\b/g, "f\u00fcr"],
  [/\bUeber\b/g, "\u00dcber"],
  [/\bueber\b/g, "\u00fcber"],
  [/\bBuerokratie\b/g, "B\u00fcrokratie"],
  [/\bbuerokratie\b/g, "b\u00fcrokratie"],
  [/\bBueroumzug\b/g, "B\u00fcroumzug"],
  [/\bbueroumzug\b/g, "b\u00fcroumzug"],
  [/\bBueroentsorgung\b/g, "B\u00fcroentsorgung"],
  [/\bbueroentsorgung\b/g, "b\u00fcroentsorgung"],
  [/\bBueroinventar\b/g, "B\u00fcroinventar"],
  [/\bBueros\b/g, "B\u00fcros"],
  [/\bBuero\b/g, "B\u00fcro"],
  [/\bbuero\b/g, "b\u00fcro"],
  [/\bEntruempelung\b/g, "Entr\u00fcmpelung"],
  [/\bentruempelung\b/g, "entr\u00fcmpelung"],
  [/\bWohnungsaufloesung\b/g, "Wohnungsaufl\u00f6sung"],
  [/\bwohnungsaufloesung\b/g, "wohnungsaufl\u00f6sung"],
  [/\bAufloesung\b/g, "Aufl\u00f6sung"],
  [/\baufloesung\b/g, "aufl\u00f6sung"],
  [/\bRueckfahrt\b/g, "R\u00fcckfahrt"],
  [/\brueckfahrt\b/g, "r\u00fcckfahrt"],
  [/\bRuecktransport\b/g, "R\u00fccktransport"],
  [/\bruecktransport\b/g, "r\u00fccktransport"],
  [/\bRueckruf\b/g, "R\u00fcckruf"],
  [/\brueckruf\b/g, "r\u00fcckruf"],
  [/\bMuenchen\b/g, "M\u00fcnchen"],
  [/\bNuernberg\b/g, "N\u00fcrnberg"],
  [/\bWuerzburg\b/g, "W\u00fcrzburg"],
  [/\bFuerth\b/g, "F\u00fcrth"],
  [/\bKoeln\b/g, "K\u00f6ln"],
  [/\bWuerttemberg\b/g, "W\u00fcrttemberg"],
  [/\bSchluesseluebergabe\b/g, "Schl\u00fcssel\u00fcbergabe"],
  [/\bSchluessel\b/g, "Schl\u00fcssel"],
  [/\bMoebel\b/g, "M\u00f6bel"],
  [/\bmoebel\b/g, "m\u00f6bel"],
  [/\bKueche\b/g, "K\u00fcche"],
  [/\bkueche\b/g, "k\u00fcche"],
  [/\bRaeum/g, "R\u00e4um"],
  [/\braeum/g, "r\u00e4um"],
  [/\bPruefung\b/g, "Pr\u00fcfung"],
  [/\bpruefung\b/g, "pr\u00fcfung"],
  [/\bVorpruefung\b/g, "Vorpr\u00fcfung"],
  [/\bvorpruefung\b/g, "vorpr\u00fcfung"],
  [/\bPruef/g, "Pr\u00fcf"],
  [/\bpruef/g, "pr\u00fcf"],
  [/\bGeprueft\b/g, "Gepr\u00fcft"],
  [/\bgeprueft\b/g, "gepr\u00fcft"],
  [/\bLoesung\b/g, "L\u00f6sung"],
  [/\bloesung\b/g, "l\u00f6sung"],
  [/\bUebergabe\b/g, "\u00dcbergabe"],
  [/\buebergabe\b/g, "\u00fcbergabe"],
  [/\bUebertragung\b/g, "\u00dcbertragung"],
  [/\buebertragung\b/g, "\u00fcbertragung"],
  [/\bUmzuege\b/g, "Umz\u00fcge"],
  [/\bumzuege\b/g, "umz\u00fcge"],
  [/\bUmzueg/g, "Umz\u00fcg"],
  [/\bumzueg/g, "umz\u00fcg"],
  [/\bHaende\b/g, "H\u00e4nde"],
  [/\bhaende\b/g, "h\u00e4nde"],
  [/\bHaeuser\b/g, "H\u00e4user"],
  [/\bhaeuser\b/g, "h\u00e4user"],
  [/\bHaeufige\b/g, "H\u00e4ufige"],
  [/\bhaeufige\b/g, "h\u00e4ufige"],
  [/\bmoechte\b/g, "m\u00f6chte"],
  [/\bmoechten\b/g, "m\u00f6chten"],
  [/\bMoeglich\b/g, "M\u00f6glich"],
  [/\bmoeglich\b/g, "m\u00f6glich"],
  [/\bgroessere\b/g, "gr\u00f6\u00dfere"],
  [/\bgroesst/g, "gr\u00f6\u00dft"],
  [/\bzusaetzlich/g, "zus\u00e4tzlich"],
  [/\bnaechst/g, "n\u00e4chst"],
  [/\bregelmaessig/g, "regelm\u00e4\u00dfig"],
  [/\bverlaesslich/g, "verl\u00e4sslich"],
  [/\bVerfuegbarkeit\b/g, "Verf\u00fcgbarkeit"],
  [/\bverfuegbarkeit\b/g, "verf\u00fcgbarkeit"],
];

const brokenWordReplacements: Array<[RegExp, string]> = [
  [/\bWohnungs\?bergabe\b/g, "Wohnungs\u00fcbergabe"],
  [/\b\?bergabereinigung\b/g, "\u00dcbergabereinigung"],
  [/\bEntr\?mpelungskosten\b/g, "Entr\u00fcmpelungskosten"],
  [/\bQualit\?tskontrolle\b/g, "Qualit\u00e4tskontrolle"],
  [/\bVorpr\?fungsstufe\b/g, "Vorpr\u00fcfungsstufe"],
  [/\bAuszugsl\?sungen\b/g, "Auszugsl\u00f6sungen"],
  [/\bGewerbegegenst\?nde\b/g, "Gewerbegegenst\u00e4nde"],
  [/\bReinigungsauftr\?ge\b/g, "Reinigungsauftr\u00e4ge"],
  [/\bFirmenumz\?ge\b/g, "Firmenumz\u00fcge"],
  [/\bArbeitspl\?tze\b/g, "Arbeitspl\u00e4tze"],
  [/\bEntr\?mpelung\b/g, "Entr\u00fcmpelung"],
  [/\bB\?roentsorgung\b/g, "B\u00fcroentsorgung"],
  [/\bB\?roinventar\b/g, "B\u00fcroinventar"],
  [/\bB\?rotransport\b/g, "B\u00fcrotransport"],
  [/\bB\?roumzug\b/g, "B\u00fcroumzug"],
  [/\bB\?ro\b/g, "B\u00fcro"],
  [/\bVorpr\?fung\b/g, "Vorpr\u00fcfung"],
  [/\bber\?cksichtigt\b/g, "ber\u00fccksichtigt"],
  [/\bVerf\?gbarkeit\b/g, "Verf\u00fcgbarkeit"],
  [/\bUnterst\?tzung\b/g, "Unterst\u00fctzung"],
  [/\bWohnungsaufl\?sung\b/g, "Wohnungsaufl\u00f6sung"],
  [/\bTerminf\?hrung\b/g, "Terminf\u00fchrung"],
  [/\bAusf\?hrung\b/g, "Ausf\u00fchrung"],
  [/\bDurchf\?hrung\b/g, "Durchf\u00fchrung"],
  [/\bglaubw\?rdiger\b/g, "glaubw\u00fcrdiger"],
  [/\bglaubw\?rdig\b/g, "glaubw\u00fcrdig"],
  [/\bverst\?ndlich\b/g, "verst\u00e4ndlich"],
  [/\bEinsch\?tzung\b/g, "Einsch\u00e4tzung"],
  [/\bEins\?tze\b/g, "Eins\u00e4tze"],
  [/\bKleinauftr\?ge\b/g, "Kleinauftr\u00e4ge"],
  [/\bR\?ckfahrten\b/g, "R\u00fcckfahrten"],
  [/\bR\?ckfahrt\b/g, "R\u00fcckfahrt"],
  [/\bR\?umungen\b/g, "R\u00e4umungen"],
  [/\bR\?umung\b/g, "R\u00e4umung"],
  [/\bR\?ume\b/g, "R\u00e4ume"],
  [/\bSchl\?ssel\b/g, "Schl\u00fcssel"],
  [/\bseri\?se\b/g, "seri\u00f6se"],
  [/\bSt\?rke\b/g, "St\u00e4rke"],
  [/\bst\?rker\b/g, "st\u00e4rker"],
  [/\bH\?ufige\b/g, "H\u00e4ufige"],
  [/\bH\?user\b/g, "H\u00e4user"],
  [/\bM\?nchen\b/g, "M\u00fcnchen"],
  [/\bN\?rnberg\b/g, "N\u00fcrnberg"],
  [/\bN\?he\b/g, "N\u00e4he"],
  [/\bW\?rttemberg\b/g, "W\u00fcrttemberg"],
  [/\bM\?bel\b/g, "M\u00f6bel"],
  [/\bK\?che\b/g, "K\u00fcche"],
  [/\bFl\?chen\b/g, "Fl\u00e4chen"],
  [/\bFl\?che\b/g, "Fl\u00e4che"],
  [/\bUmz\?gen\b/g, "Umz\u00fcgen"],
  [/\bUmz\?ge\b/g, "Umz\u00fcge"],
  [/\bl\?ngeren\b/g, "l\u00e4ngeren"],
  [/\bm\?chten\b/g, "m\u00f6chten"],
  [/\bm\?chte\b/g, "m\u00f6chte"],
  [/\bm\?glich\b/g, "m\u00f6glich"],
  [/\bm\?ssen\b/g, "m\u00fcssen"],
  [/\bk\?nstlichen\b/g, "k\u00fcnstlichen"],
  [/\bk\?nstlich\b/g, "k\u00fcnstlich"],
  [/\bsp\?ter\b/g, "sp\u00e4ter"],
  [/\bn\?chster\b/g, "n\u00e4chster"],
  [/\bn\?chste\b/g, "n\u00e4chste"],
  [/\bl\?uft\b/g, "l\u00e4uft"],
  [/\bgepr\?ft\b/g, "gepr\u00fcft"],
  [/\bvorpr\?ft\b/g, "vorpr\u00fcft"],
  [/\berkl\?ren\b/g, "erkl\u00e4ren"],
  [/\babh\?ngen\b/g, "abh\u00e4ngen"],
  [/\bAbl\?ufe\b/g, "Abl\u00e4ufe"],
  [/\bgro\?\?ere\b/g, "gr\u00f6\u00dfere"],
  [/\bgro\?e\b/g, "gro\u00dfe"],
  [/\bz\?hlen\b/g, "z\u00e4hlen"],
  [/\bz\?hlt\b/g, "z\u00e4hlt"],
  [/\bk\?nnen\b/g, "k\u00f6nnen"],
  [/\bF\?hrung\b/g, "F\u00fchrung"],
  [/\bf\?hrt\b/g, "f\u00fchrt"],
  [/\bF\?lle\b/g, "F\u00e4lle"],
  [/\bF\?r\b/g, "F\u00fcr"],
  [/\bf\?r\b/g, "f\u00fcr"],
  [/\b\?bergabe\b/g, "\u00dcbergabe"],
  [/\b\?bergeben\b/g, "\u00fcbergeben"],
  [/\b\?ber\b/g, "\u00fcber"],
  [/\b\?ffnen\b/g, "\u00f6ffnen"],
  [/l\?uft's/g, "l\u00e4uft's"],
];

function decodeMojibake(value: string): string {
  if (!suspiciousMojibakePattern.test(value)) return value;

  let current = value;
  for (let index = 0; index < 3; index += 1) {
    if (!suspiciousMojibakePattern.test(current)) break;
    const decoder = new TextDecoder("utf-8");
    const bytes = Uint8Array.from(Array.from(current).map((char) => char.charCodeAt(0) & 0xff));
    const decoded = decoder.decode(bytes);
    if (decoded === current) break;
    current = decoded;
  }

  return current;
}

export function germanizeText(value?: string | null) {
  if (!value) return "";

  let normalized = decodeMojibake(value);
  for (const [pattern, replacement] of directSequenceReplacements) {
    normalized = normalized.split(pattern).join(replacement);
  }

  normalized = [...brokenWordReplacements, ...transliterationReplacements].reduce(
    (text, [pattern, replacement]) => text.replace(pattern, replacement),
    normalized,
  );

  return normalized.replace(/\s+/g, " ").trim();
}

export function germanText(value: string | null | undefined, fallback: string) {
  const raw = (value || "").trim();
  return germanizeText(raw || fallback);
}

export function germanizeDeep<T>(value: T): T {
  if (typeof value === "string") {
    return germanizeText(value) as T;
  }

  if (Array.isArray(value)) {
    return value.map((item) => germanizeDeep(item)) as T;
  }

  if (value && typeof value === "object") {
    return Object.fromEntries(
      Object.entries(value as Record<string, unknown>).map(([key, nestedValue]) => [
        key,
        germanizeDeep(nestedValue),
      ]),
    ) as T;
  }

  return value;
}
