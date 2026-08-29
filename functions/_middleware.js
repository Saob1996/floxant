const PERMANENT_REDIRECTS = new Map([
  ["/anfrage-mit-preisrahmen", "/umzug-mit-preisvorstellung"],
  ["/regensburg/reinigungsfirma", "/regensburg/reinigung"],
  ["/regensburg/umzugsservice", "/regensburg/umzug"],
  ["/regensburg/umzugsunternehmen", "/regensburg/umzug"],
  ["/en/regensburg/moving-company", "/en/regensburg/moving"],
  ["/regensburg/uebergabereinigung", "/regensburg/reinigung-nach-umzug"],
  ["/regensburg/endreinigung", "/regensburg/reinigung-nach-umzug"],
  ["/regensburg/besenreine-uebergabe", "/regensburg/reinigung-nach-umzug"],
  ["/regensburg/haushaltsaufloesung", "/regensburg/wohnungsaufloesung"],
  ["/solarreinigung", "/pv-anlagen-reinigung"],
  ["/regensburg/solarreinigung", "/pv-anlagen-reinigung"],
  ["/rueckfahrt-boerse", "/leerfahrt-rueckfahrt"],
  ["/rueckfahrt-radar", "/leerfahrt-rueckfahrt"],
  ["/beiladung", "/leerfahrt-rueckfahrt"],
  ["/beiladung-regensburg", "/leerfahrt-rueckfahrt"],
  ["/angebot-pruefen", "/angebot-guenstiger-pruefen"],
  ["/angebotscheck", "/angebot-guenstiger-pruefen"],
  ["/fairpreis-check", "/angebot-guenstiger-pruefen"],
  ["/angebot-red-flag-scanner", "/angebot-guenstiger-pruefen#red-flag-scanner"],
  ["/umzugsunternehmen-regensburg", "/regensburg/umzug"],
  ["/endreinigung-regensburg", "/regensburg/reinigung-nach-umzug"],
  ["/blog/solarreinigung-pv-angebot-pruefen", "/pv-anlagen-reinigung"],
]);

export async function onRequest(context) {
  const requestUrl = new URL(context.request.url);
  const destination = PERMANENT_REDIRECTS.get(requestUrl.pathname);

  if (!destination) return context.next();

  const target = new URL(destination, requestUrl);
  target.search = requestUrl.search;
  return Response.redirect(target.toString(), 301);
}
