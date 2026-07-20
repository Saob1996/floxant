export type DisplayFaq = {
  id: string;
  question: string;
  shortAnswer: string;
  detailedAnswer?: string;
  category: string;
  region?: string;
  locale?: "de" | "en";
  relatedService?: string;
  relatedArticle?: string;
};

export type AuthorityLink = {
  href: string;
  label: string;
  description?: string;
};
