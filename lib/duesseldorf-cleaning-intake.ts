import { IntakePayload } from "@/lib/types/intake";

type CleaningFormState = {
  serviceType: string;
  areaM2: number;
  condition: string;
  furnished: boolean;
  windows: string;
  kitchenIntensive: boolean;
  bathroomIntensive: boolean;
  urgency: string;
  districtOrZip: string;
  budgetSuggestion?: string;
  name: string;
  phone: string;
  email: string;
  message: string;
  estimatedPriceMin: number;
  estimatedPriceMax: number;
};

export function buildDuesseldorfCleaningIntakePayload(
  state: CleaningFormState,
): IntakePayload {
  const budgetSuggestion = state.budgetSuggestion?.trim() || "";
  const notes = [
    budgetSuggestion ? `Budget / Preisrahmen: ${budgetSuggestion}` : "",
    state.message.trim(),
  ]
    .filter(Boolean)
    .join("\n");

  return {
    contact: {
      fullName: state.name.trim() || "Interessent",
      email: state.email.trim(),
      phone: state.phone.trim(),
      callbackPreference: "jederzeit",
      notes,
    },
    service: {
      type: "reinigung",
      source: "floxant-duesseldorf-cleaning",
      entryPoint: "/duesseldorf/reinigung",
      presetFromUrl: "reinigung",
    },
    valuation: {
      systemPriceRangeMin: state.estimatedPriceMin,
      systemPriceRangeMax: state.estimatedPriceMax,
      priceRangeMin: state.estimatedPriceMin,
      priceRangeMax: state.estimatedPriceMax,
      valuationLabel: "Unverbindliche Ersteinschätzung",
      valuationStage: "Reinigung Düsseldorf",
      accuracyState: "Ersteinschätzung",
      topDrivers: [
        `Reinigungsart: ${state.serviceType}`,
        `Zustand: ${state.condition}`,
        `Terminwunsch: ${state.urgency}`,
        budgetSuggestion ? `Budgetwunsch: ${budgetSuggestion}` : "Budgetwunsch: nicht genannt",
      ],
      priceExplanation:
        "Diese Einordnung ist unverbindlich und dient als erster Preisrahmen für Reinigungsanfragen in Düsseldorf. Ein genanntes Budget wird geprüft, ist aber keine automatische Zusage.",
      pricingSignals: {
        businessUnit: "cleaning-duesseldorf",
        location: "duesseldorf",
        serviceCategory: "cleaning",
      },
    },
    configuration: {
      businessUnit: "cleaning-duesseldorf",
      source: "floxant-duesseldorf-cleaning",
      location: "duesseldorf",
      serviceCategory: "cleaning",
      page: "/duesseldorf/reinigung",
      cleaningRequest: {
        serviceType: state.serviceType,
        areaM2: state.areaM2,
        condition: state.condition,
        furnished: state.furnished,
        windows: state.windows,
        kitchenIntensive: state.kitchenIntensive,
        bathroomIntensive: state.bathroomIntensive,
        urgency: state.urgency,
        districtOrZip: state.districtOrZip.trim(),
        budgetSuggestion,
        message: state.message.trim(),
        estimatedPriceMin: state.estimatedPriceMin,
        estimatedPriceMax: state.estimatedPriceMax,
      },
    },
    metadata: {
      createdAt: new Date().toISOString(),
      intakeVersion: "duesseldorf-cleaning-1.0.0",
      source: "floxant-duesseldorf-cleaning",
      servicePresetFromUrl: "reinigung",
      clientContext: {
        businessUnit: "cleaning-duesseldorf",
        location: "duesseldorf",
        serviceCategory: "cleaning",
        page: "/duesseldorf/reinigung",
      },
    },
  };
}
