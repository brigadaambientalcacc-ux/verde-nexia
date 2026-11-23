import { Link } from "react-router-dom";
import { ArrowUpRight, CircleDot, Flag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/verde/page-header";
import { fases } from "@/data/conteudo";

const duracoes: Record<string, number> = {
  preparatoria: 0,
  "fase-1": 6,
  "fase-2": 6,
  "fase-3": 6,
  "fase-4": 18,
  continuidade: 84,
  horizonte: 120,
};

const totalMeses = 240;

export default function Cronograma() {
  return (
    <div>
      <PageHeader
        eyebrow="Implantação"
        titulo="Do primeiro sensor ao horizonte de 240 meses"
        descricao="A vigência institucional inicial pretendida é de 120 meses, com perspectiva estratégica de continuidade por mais 120 meses. A continuidade depende de modalidade jurídica, autorizações e instrumento válido."
      >
        <div className="mt-10">
          <div className="flex h-2.5 w-full overflow-hidden rounded-full bg-border">
            {fases.map((fase, indice) => (
              <div
                key={fase.id}
                style={{
                  width: `${(duracoes[fase.id] / totalMeses) * 100}%`,
                }}
                className={
                  indice < 5
                    ? "h-full border-r border-background bg-moss"
                    : indice === 5
                      ? "h-full border-r border-background bg-moss/50"
                      : "h-full bg-moss/25"
                }
              />
            ))}
          </div>
          <div className="mt-2 flex justify-between font-mono text-[9.5px] uppercase tracking-[0.16em] text-muted-foreground">
            <span>Mês 1</span>
            <span>Mês 36</span>
            <span>Mês 120</span>
            <span>Mês 240</span>
          </div>
        </div>
      </PageHeader>

      <section className="container-page py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[0.6fr_1.4fr] lg:gap-16">
          <div className="lg:sticky lg:top-24 lg:self-start">
            <span className="eyebrow">Leitura do cronograma</span>
            <h2 className="display-title mt-4 text-[clamp(1.6rem,3vw,2.2rem)]">
              Fases condicionadas a instrumentos válidos
            </h2>
            <p className="prose-verde mt-4">
              Os primeiros 36 meses constituem o ciclo de implantação,
              estruturação e expansão tecnológica. A fase de continuidade e o
              horizonte complementar não são automáticos.
            </p>
            <div className="mt-6 space-y-3 rounded-[var(--radius)] border border-border bg-secondary/40 p-5">
              <p className="flex gap-2.5 text-[12px] leading-relaxed text-muted-foreground">
                <Flag className="mt-0.5 h-3.5 w-3.5 shrink-0 text-moss" />
                Vigência inicial pretendida: 120 meses.
              </p>
              <p className="flex gap-2.5 text-[12px] leading-relaxed text-muted-foreground">
                <CircleDot className="mt-0.5 h-3.5 w-3.5 shrink-0 text-moss" />
                Horizonte potencial: 240 meses, mediante novos instrumentos.
              </p>
            </div>
            <Button asChild variant="outline" size="sm" className="mt-5">
              <Link to="/indicadores">
                Indicadores de acompanhamento
                <ArrowUpRight />
              </Link>
            </Button>
          </div>

          <ol className="relative border-l border-border pl-6 sm:pl-8">
            {fases.map((fase, indice) => (
              <li
                key={fase.id}
                className={
                  indice === fases.length - 1
                    ? "relative pb-0"
                    : "relative pb-10"
                }
              >
                <span className="absolute -left-[31px] top-1.5 flex h-3 w-3 items-center justify-center rounded-full border border-moss bg-background sm:-left-[39px]">
                  <span className="h-1 w-1 rounded-full bg-moss" />
                </span>

                <div className="flex flex-wrap items-center gap-x-4 gap-y-1">
                  <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-moss">
                    {fase.periodo}
                  </span>
                  {fase.equipe && (
                    <span className="rounded-full border border-border px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.14em] text-muted-foreground">
                      até {fase.equipe} profissionais
                    </span>
                  )}
                </div>

                <h3 className="display-title mt-2.5 text-[clamp(1.3rem,2.4vw,1.75rem)]">
                  {fase.rotulo}
                </h3>
                <p className="mt-2 max-w-xl text-[13.5px] leading-relaxed text-muted-foreground">
                  {fase.resumo}
                </p>

                <ul className="mt-4 grid gap-2 sm:grid-cols-2">
                  {fase.marcos.map((marco) => (
                    <li
                      key={marco}
                      className="flex gap-2.5 text-[12.5px] leading-relaxed text-muted-foreground"
                    >
                      <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-moss/60" />
                      {marco}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="surface-paper border-t border-border py-14 sm:py-16">
        <div className="container-page flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-[13.5px] leading-relaxed text-muted-foreground">
            As metas quantitativas deverão ser estabelecidas a partir dos
            levantamentos iniciais e revistas conforme os resultados
            experimentais de cada núcleo.
          </p>
          <Button asChild>
            <Link to="/indicadores">
              Ver indicadores
              <ArrowUpRight />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
