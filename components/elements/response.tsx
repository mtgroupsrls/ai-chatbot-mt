"use client";

import { type ComponentProps, memo } from "react";
import { Streamdown } from "streamdown";
import { cn } from "@/lib/utils";

type ResponseProps = ComponentProps<typeof Streamdown> & {
  preserveLineBreaks?: boolean;
};

export const Response = memo(
  ({ className, preserveLineBreaks = false, children, ...props }: ResponseProps) => {
    // If preserveLineBreaks is true, convert single line breaks to double line breaks
    // so markdown will render them as paragraphs
    const processedChildren = preserveLineBreaks && typeof children === 'string'
      ? children.replace(/\n/g, '  \n') // Add two spaces before newline for markdown hard break
      : children;

    return (
      <Streamdown
        className={cn(
          "size-full [&>*:first-child]:mt-0 [&>*:last-child]:mb-0 [&_code]:whitespace-pre-wrap [&_code]:break-words [&_pre]:max-w-full [&_pre]:overflow-x-auto",
          className
        )}
        {...props}
      >
        {processedChildren}
      </Streamdown>
    );
  },
  (prevProps, nextProps) =>
    prevProps.children === nextProps.children &&
    prevProps.preserveLineBreaks === nextProps.preserveLineBreaks
);

Response.displayName = "Response";
