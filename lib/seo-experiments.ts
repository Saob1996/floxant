import experimentRegistry from "@/data/seo-experiments.json";

export type SeoExperimentLocale = "de-DE" | "en";
export type SeoExperimentElement =
  | "Title"
  | "Meta Description"
  | "H1"
  | "Hero-Text"
  | "Haupt-CTA"
  | "interner Linkblock"
  | "Short Title"
  | "englische Formulierung";
export type SeoExperimentStatus = "planned" | "active" | "completed" | "rolled_back";

export type SeoExperiment = {
  id: string;
  route: string;
  locale: SeoExperimentLocale;
  element: SeoExperimentElement;
  previousValue: string;
  testValue: string;
  hypothesis: string;
  primaryMetric: string;
  secondaryMetrics: string[];
  baseline: Record<string, string | number>;
  startedAt: string | null;
  minimumEvaluationDays: number;
  status: SeoExperimentStatus;
  result: string | null;
  decision: string;
  rollbackValue: string;
  titleCandidates?: {
    direct: string;
    benefit: string;
    conversion: string;
  };
  selectedCandidate?: "direct" | "benefit" | "conversion";
  selectionReason?: string;
};

export const seoExperiments = experimentRegistry.experiments as SeoExperiment[];

export function getActiveSeoExperiment(route: string): SeoExperiment | undefined {
  return seoExperiments.find((experiment) => experiment.route === route && experiment.status === "active");
}

export function getSeoExperimentsForRoute(route: string): SeoExperiment[] {
  return seoExperiments.filter((experiment) => experiment.route === route);
}

export function getSeoExperiment(id: string): SeoExperiment | undefined {
  return seoExperiments.find((experiment) => experiment.id === id);
}
