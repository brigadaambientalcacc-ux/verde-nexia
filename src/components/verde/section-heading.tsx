import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type SectionHeadingProps = {
  eyebrow?: string;
  titulo: string;
  descricao?: string;
  className?: string;
  acao?: ReactNode;
};

export function SectionHeading({
  eyebrow,
  titulo,
  descricao,
  className,
  acao,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 md:flex-row md:items-end md:justify-between",
        className,
      )}
    >
      <div className="max-w-2xl">
        {eyebrow && (
          <div className="mb-3 flex items-center gap-3">
            <span className="h-px w-8 bg-moss" />
            <span className="eyebrow">{eyebrow}</span>
          </div>
        )}
        <h2 className="display-title text-[clamp(1.75rem,3.4vw,2.65rem)]">
          {titulo}
        </h2>
        {descricao && (
          <p className="prose-verde mt-4 max-w-xl">{descricao}</p>
        )}
      </div>
      {acao && <div className="shrink-0">{acao}</div>}
    </div>
  );
}
