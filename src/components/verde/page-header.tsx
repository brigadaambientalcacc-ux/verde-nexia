import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

type PageHeaderProps = {
  eyebrow: string;
  titulo: string;
  descricao?: string;
  voltarPara?: { rotulo: string; href: string };
  children?: ReactNode;
};

export function PageHeader({
  eyebrow,
  titulo,
  descricao,
  voltarPara,
  children,
}: PageHeaderProps) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      <div className="absolute inset-0 bg-gradient-to-b from-secondary/70 via-background to-background" />
      <div className="hairline-grid absolute inset-0 opacity-40" />
      <div className="container-page relative py-12 sm:py-16 lg:py-20">
        {voltarPara && (
          <Link
            to={voltarPara.href}
            className="mb-7 inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            {voltarPara.rotulo}
          </Link>
        )}
        <div className="flex items-center gap-3">
          <span className="h-px w-8 bg-moss" />
          <span className="eyebrow">{eyebrow}</span>
        </div>
        <h1 className="display-title mt-5 max-w-4xl text-[clamp(2.1rem,5vw,3.65rem)]">
          {titulo}
        </h1>
        {descricao && (
          <p className="prose-verde mt-5 max-w-2xl text-[16px] sm:text-[17px]">
            {descricao}
          </p>
        )}
        {children}
      </div>
    </section>
  );
}
