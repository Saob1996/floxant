import NextLink from "next/link";
import type { ComponentProps } from "react";

type NoPrefetchLinkProps = ComponentProps<typeof NextLink>;

export function NoPrefetchLink({
  prefetch = false,
  ...props
}: NoPrefetchLinkProps) {
  return <NextLink prefetch={prefetch} {...props} />;
}
