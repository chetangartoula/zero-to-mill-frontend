import React from "react";

interface TextProps {
  title: string;
  textProps: React.HTMLProps<HTMLParagraphElement>;
}

function Text({ title, textProps }: TextProps) {
  return (
    <p className={textProps?.className ?? "text-muted"} {...textProps}>
      {title}
    </p>
  );
}

export default Text;
