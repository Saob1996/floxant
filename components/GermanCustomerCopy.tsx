import "server-only";

import {
  Children,
  cloneElement,
  isValidElement,
  type ReactElement,
  type ReactNode,
} from "react";

import { germanizeText, germanizeTextNode } from "@/lib/german-text";

const excludedElementNames = new Set([
  "code",
  "noscript",
  "pre",
  "script",
  "style",
  "svg",
  "template",
]);

const customerCopyAttributes = [
  "alt",
  "aria-description",
  "aria-label",
  "placeholder",
  "title",
] as const;

type CustomerElementProps = Record<string, unknown> & {
  children?: ReactNode;
};

function normalizeCustomerNode(node: ReactNode): ReactNode {
  if (typeof node === "string") return germanizeTextNode(node);
  if (!isValidElement(node)) return node;

  const element = node as ReactElement<CustomerElementProps>;
  const elementName = typeof element.type === "string" ? element.type : null;
  if (elementName && excludedElementNames.has(elementName)) return element;

  const normalizedProps: Record<string, string> = {};
  if (elementName) {
    for (const attribute of customerCopyAttributes) {
      const value = element.props[attribute];
      if (typeof value === "string") normalizedProps[attribute] = germanizeText(value);
    }
  }

  if (!("children" in element.props)) {
    return Object.keys(normalizedProps).length
      ? cloneElement(element, normalizedProps)
      : element;
  }

  return cloneElement(
    element,
    normalizedProps,
    Children.map(element.props.children, normalizeCustomerNode),
  );
}

export function GermanCustomerCopy({ children }: { children: ReactNode }) {
  return <>{Children.map(children, normalizeCustomerNode)}</>;
}
