import { Camera, Info } from "lucide-react";

type BetterEstimateHintProps = {
  serviceLabel?: string;
};

export function BetterEstimateHint({ serviceLabel = "die Anfrage" }: BetterEstimateHintProps) {
  return (
    <aside className="rounded-lg border border-blue-100 bg-blue-50 p-5 text-blue-950" data-component="BetterEstimateHint">
      <div className="flex gap-3">
        <Info className="mt-0.5 h-5 w-5 shrink-0" />
        <div>
          <p className="text-base font-black">Bessere Einschaetzung ohne Preisversprechen</p>
          <p className="mt-2 text-sm font-semibold leading-7">
            Je genauer Ort, Umfang, Terminwunsch und Zugang beschrieben sind, desto besser laesst sich {serviceLabel} einordnen. Fotos oder ein vorhandenes Angebot helfen, sind aber optional.
          </p>
          <div className="mt-3 inline-flex items-center gap-2 text-xs font-black uppercase tracking-normal">
            <Camera className="h-4 w-4" />
            Fotos helfen, ersetzen aber keine finale Pruefung
          </div>
        </div>
      </div>
    </aside>
  );
}
