import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

export function Numero({
  valor,
  rotulo,
  detalhe,
  className,
}: {
  valor: string;
  rotulo: string;
  detalhe?: string;
  className?: string;
}) {
  return (
    <div className={cn("flex flex-col", className)}>
      <span className="font-display text-[clamp(2rem,4vw,2.9rem)] font-light leading-none tracking-tight">
        {valor}
      </span>
      <span className="mt-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
        {rotulo}
      </span>
      {detalhe && (
        <span className="mt-2 text-[12px] leading-snug text-muted-foreground/80">
          {detalhe}
        </span>
      )}
    </div>
  );
}

export function Rotulo({ children }: { children: React.ReactNode }) {
  return (
    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
      {children}
    </span>
  );
}

export function Metrica({
  icone: Icone,
  valor,
  rotulo,
  nota,
}: {
  icone: LucideIcon;
  valor: string;
  rotulo: string;
  nota?: string;
}) {
  return (
    <div className="rounded-[var(--radius)] border border-border bg-card p-5 shadow-card">
      <div className="flex items-center justify-between">
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          {rotulo}
        </span>
        <Icone className="h-4 w-4 text-moss" />
      </div>
      <p className="mt-4 font-display text-4xl font-light leading-none tracking-tight">
        {valor}
      </p>
      {nota && (
        <p className="mt-2 text-[12px] leading-snug text-muted-foreground">
          {nota}
        </p>
      )}
    </div>
  );
}
