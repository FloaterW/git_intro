import { codeToHtml, createCssVariablesTheme } from "shiki";
import CopyButton from "@/components/CopyButton";
import type { CodeLang } from "@/content/projects";

// Token colors come from --code-* variables in globals.css, so they follow the
// site palette and dark mode. Highlighting runs at build time; no client JS.
const theme = createCssVariablesTheme({ name: "site", variablePrefix: "--code-" });

const languageNames: Record<CodeLang, string> = { python: "Python", java: "Java", cpp: "C++" };

export default async function CodeBlock({
  source,
  lang,
  label,
}: {
  source: string;
  lang: CodeLang;
  label: string;
}) {
  const html = await codeToHtml(source, {
    lang,
    theme,
    transformers: [
      {
        pre(node) {
          node.properties["aria-label"] = label;
          this.addClassToHast(
            node,
            "p-4 text-code break-words whitespace-pre-wrap sm:overflow-x-auto sm:p-5 sm:whitespace-pre",
          );
        },
      },
    ],
  });

  return (
    <div className="mt-4 overflow-hidden rounded-xl border border-line bg-card">
      <div className="flex items-center justify-between border-b border-line py-1.5 pr-2 pl-4 sm:pl-5">
        <span className="text-sm text-faint">{languageNames[lang]}</span>
        <CopyButton
          text={source}
          label="Copy"
          what="Code"
          className="rounded-md px-2.5 py-1 text-sm text-muted"
        />
      </div>
      <div dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  );
}
