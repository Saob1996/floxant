"use client";

import { useEffect } from "react";

import { germanizeText } from "@/lib/german-text";

const SKIP_TAGS = new Set(["SCRIPT", "STYLE", "TEXTAREA", "INPUT", "SELECT", "CODE", "PRE"]);
const PUBLIC_SKIP_PATHS = ["/dashboard", "/admin", "/login", "/api"];
const NORMALIZED_ATTRIBUTES = ["aria-label", "title", "alt", "placeholder"];

function shouldSkipNode(node: Node) {
  const parent = node.parentElement;
  if (!parent) return true;
  if (SKIP_TAGS.has(parent.tagName)) return true;
  if (parent.closest("[data-keep-raw-text]")) return true;
  return false;
}

function normalizeTextNode(node: Node) {
  if (shouldSkipNode(node)) return;
  const value = node.nodeValue || "";
  if (!/[A-Za-z\u00c2\u00c3\u00e2]/.test(value)) return;
  const normalized = germanizeText(value);
  if (normalized && normalized !== value.trim()) {
    node.nodeValue = value.replace(value.trim(), normalized);
  }
}

function normalizeElementAttributes(element: Element) {
  if (element.closest("[data-keep-raw-text]")) return;

  for (const attribute of NORMALIZED_ATTRIBUTES) {
    const value = element.getAttribute(attribute);
    if (!value || !/[A-Za-z\u00c2\u00c3\u00e2]/.test(value)) continue;

    const normalized = germanizeText(value);
    if (normalized && normalized !== value) {
      element.setAttribute(attribute, normalized);
    }
  }
}

function normalizeVisibleText(root: Node) {
  if (root.nodeType === Node.ELEMENT_NODE) {
    const element = root as Element;
    normalizeElementAttributes(element);
    element.querySelectorAll("*").forEach(normalizeElementAttributes);
  }

  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  let current = walker.nextNode();
  while (current) {
    normalizeTextNode(current);
    current = walker.nextNode();
  }
}

export function GermanTextRuntimeNormalizer() {
  useEffect(() => {
    if (PUBLIC_SKIP_PATHS.some((path) => window.location.pathname.startsWith(path))) return;

    normalizeVisibleText(document.body);

    const observer = new MutationObserver((mutations) => {
      for (const mutation of mutations) {
        mutation.addedNodes.forEach((node) => {
          if (node.nodeType === Node.TEXT_NODE) {
            normalizeTextNode(node);
            return;
          }
          if (node.nodeType === Node.ELEMENT_NODE) {
            normalizeVisibleText(node);
          }
        });
      }
    });

    observer.observe(document.body, { childList: true, subtree: true });
    return () => observer.disconnect();
  }, []);

  return null;
}
