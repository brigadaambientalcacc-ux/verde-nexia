import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import type { Projeto } from "@/data/projetos";
import { cn } from "@/lib/utils";

const tons = {
  moss: {
    chip: "bg-moss/10 text-moss",
    borda: "hover:border-moss/50",
    linha: "bg-moss",
    numero: "text-moss",
  },
  ember: {
    chip: "bg-ember/10 text-ember",
    borda: "hover:border-ember/50",
    linha: "bg-ember",
    numero: "text-ember",
  },
  sky: {
    chip: "bg-sky/10 text-sky",
    borda: "hover:border-sky/50",
    linha: "bg-sky",
    numero: "text-sky",
  },
  forest: {
    chip: "bg-forest/10 text-forest dark:bg-moss/10 dark:text-moss",
    borda: "hover:border-forest/40 dark:hover:border-moss/50",
    linha: "bg-forest dark:bg-moss",
    numero: "text-forest dark:text-moss",
  },
} as const;

type ProjectCardProps = {
  projeto: Projeto;
  indice: number;
  compacto?: boolean;
};

export function ProjectCard({ projeto, indice, compacto }: ProjectCardProps) {
  const tom = tons[projeto.tom];
  const Icone = projeto.icone;

  return (
    <Link
      to={`/projetos/${projeto.slug}`}
      className={cn(
        "group relative flex flex-col overflow-hidden rounded-[var(--radius)] border border-border bg-card p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-elegant",
        tom.borda,
      )}
    >
      <div className="flex items-start justify-between">
        <div
          className={cn(
            "flex h-11 w-11 items-center justify-center rounded-full",
            tom.chip,
          )}
        >
          <Icone className="h-5 w-5" />
        </div>
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          0{indice}
        </span>
      </div>

      <h3 className="mt-6 font-display text-[22px] leading-tight tracking-tight">
        {projeto.nome}
      </h3>
      <p className="mt-1.5 text-[13px] font-medium text-muted-foreground">
        {projeto.apelido}
      </p>
      <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
        {projeto.resumo}
      </p>

      {!compacto && (
        <div className="mt-6 flex items-center justify-between border-t border-border/80 pt-4">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            {projeto.equipe} profissionais
          </span>
          <ArrowUpRight className="h-4 w-4 text-muted-foreground transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-foreground" />
        </div>
      )}

      <span
        className={cn(
          "absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 transition-transform duration-500 group-hover:scale-x-100",
          tom.linha,
        )}
      />
    </Link>
  );
}
