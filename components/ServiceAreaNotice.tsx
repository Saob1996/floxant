import type { Metadata } from "next";
import Link from "next/link";
import { company } from "@/lib/company";

export function buildServiceAreaNoticeMetadata(path:string,service:string,city:string):Metadata {
  return {title:`${service} ${city}: unser Einsatzgebiet | FLOXANT`,description:`Informationen zum FLOXANT-Einsatzgebiet für ${service}. Unsere Standorte sind Düsseldorf und Regensburg, jeweils mit 75 km lokalem Radius.`,alternates:{canonical:`${company.url}${path}`},robots:{index:false,follow:true,googleBot:{index:false,follow:true}}};
}

export function ServiceAreaNotice({city,service,moving=false}:{city:string;service:string;moving?:boolean}) {
  const piano = service.toLowerCase().includes("klaviertransport");
  const cleaning = service.toLowerCase().includes("reinigung");
  const target = piano ? "/klaviertransport-regensburg" : moving ? "/regensburg/umzug" : cleaning ? "/regensburg/reinigung" : "/regensburg/entruempelung";
  const targetLabel = piano ? "Klaviertransport ab Regensburg besprechen" : moving ? "Umzug ab Regensburg besprechen" : cleaning ? "Reinigung im Raum Regensburg" : "Räumung im Raum Regensburg";
  return (
    <main className="bg-white px-5 pb-20 pt-28 text-slate-950 sm:px-8">
      <article className="mx-auto max-w-3xl">
        <Link href="/standorte" className="font-semibold text-blue-800">FLOXANT Standorte</Link>
        <h1 className="mt-8 text-3xl font-bold leading-tight sm:text-4xl">{service} in {city}: Bitte beachten Sie unser Einsatzgebiet.</h1>
        <p className="mt-6 text-lg leading-8 text-slate-700">Unsere Standorte sind Düsseldorf und Regensburg. Lokale Leistungen bieten wir im Umkreis von jeweils 75 km Luftlinie an. {city} liegt außerhalb dieser beiden Gebiete.</p>
        <p className="mt-5 leading-8 text-slate-700">Wir haben keine Niederlassung in {city} und bieten dort über diese Seite keine örtliche Durchführung von {service} an.</p>
        {moving || piano ? <p className="mt-5 leading-8 text-slate-700">Ein {piano ? "Klaviertransport" : "Umzug"} zwischen unserem Einsatzgebiet um Regensburg und {city} kann als eigene Strecke besprochen werden. Nennen Sie dafür Start, Ziel, Termin und die gewünschte Unterstützung. Ein weiter entferntes Ziel wird separat geplant.</p> : <p className="mt-5 leading-8 text-slate-700">Wenn sich Ihr Objekt innerhalb unseres Einsatzgebiets befindet, finden Sie die passenden Leistungen auf unseren Standortseiten. Maßgeblich ist die konkrete Einsatzadresse.</p>}
        <div className="mt-8 flex flex-wrap gap-4">
          <Link href={target} className="inline-flex min-h-12 items-center rounded-lg bg-blue-800 px-5 font-bold text-white">{targetLabel}</Link>
          <Link href="/standorte" className="inline-flex min-h-12 items-center rounded-lg border border-slate-300 px-5 font-bold text-slate-800">Standorte und Einsatzgebiete</Link>
        </div>
      </article>
    </main>
  );
}
