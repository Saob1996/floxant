import { AiAnswerBlock as ExistingAiAnswerBlock } from "@/components/ai-answer";
import { getAiAnswerByKey, type AiAnswerKey } from "@/lib/ai-answer-system";

type AuthorityAiAnswerBlockProps = {
  answerKey: AiAnswerKey;
  className?: string;
};

export function AuthorityAiAnswerBlock({ answerKey, className = "" }: AuthorityAiAnswerBlockProps) {
  const entry = getAiAnswerByKey(answerKey);

  if (!entry) return null;

  return (
    <ExistingAiAnswerBlock
      eyebrow="Direkte Antwort"
      title={entry.title}
      answer={entry.directAnswer}
      points={entry.notPromised}
      usefulWhen={entry.usefulWhen}
      notUsefulWhen={entry.notPromised}
      neededInfo={entry.neededInfo}
      ctaHref={entry.cta.href}
      ctaLabel={entry.cta.label}
      className={className}
    />
  );
}

export { AuthorityAiAnswerBlock as AiAnswerBlock };
