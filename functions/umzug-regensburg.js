export function onRequest({ request }) {
  const target = new URL("/regensburg/umzug", request.url);
  return Response.redirect(target.toString(), 308);
}
