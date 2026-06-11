import { Fragment, type ReactNode } from "react";

/**
 * Wrap the first occurrence of `word` inside `text` with a styled span. Keeps
 * editorial emphasis (an italic bordeaux word inside a headline) locale-safe:
 * each dictionary names its own emphasis word.
 */
export function highlight(text: string, word: string, className: string): ReactNode {
  const i = text.indexOf(word);
  if (i === -1) return text;
  return (
    <Fragment>
      {text.slice(0, i)}
      <span className={className}>{word}</span>
      {text.slice(i + word.length)}
    </Fragment>
  );
}
