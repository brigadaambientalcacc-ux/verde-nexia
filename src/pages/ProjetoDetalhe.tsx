import { Link, useParams } from "react-router-dom";
import { AlertTriangle, ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/verde/page-header";
import { projetos, projetoPorSlug } from "@/data/projetos";
import NotFound from "@/pages/NotFound";

export default function ProjetoDetalhe() {
  const { slug } = useParams();
  const projeto = projetoPorSlug(slug);

  if (!projeto) {
    return <NotFound />;
  }

  const indice = projetos.findIndex((item) => item.slug === projeto.slug);
  const anterior = projetos[(indice - 1 + projetos.length) % projetos.length];
  const proximo = projetos[(indice + 1) % projetos.length];
  const Icone = projeto.icone;

  return (
    <div>
      <PageHeader
        eyebrow={`Núcleo ${String(indice + 1).padStart(2, "0")} · ${projeto.apelido}`}
        titulo={projeto.nome}
        descricao={projeto.subtitulo}
        voltarPara={{ rotulo: "Todos os projetos", href: "/projetos" }}
      >
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <span className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-card text-moss">
            <Icone className="h-5 w-5" />
          </span>
          <div className="flex flex-wrap gap-x-8 gap-y-2 border-l border-border pl-5">
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              Equipe planejada · {projeto.equipe} profissionais
            </span>
            <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
              Núcleo de PD&amp;I
            </span>
          </div>
        </div>
      </PageHeader>

      <section className="container-page py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          <div>
            <span className="eyebrow">Objeto de pesquisa</span>
            <p className="mt-4 font-display text-[clamp(1.25rem,2.2vw,1.65rem)] font-light leading-[1.45] tracking-tight">
              {projeto.resumo}
            </p>

            <div className="mt-10">
              <span className="eyebrow">Frentes de trabalho</span>
              <ul className="mt-5 space-y-4">
                {projeto.foco.map((item) => (
                  <li key={item} className="flex gap-3.5">
                    <span className="mt-[7px] h-1.5 w-1.5 shrink-0 rounded-full bg-moss" />
                    <span className="text-[14.5px] leading-relaxed text-foreground/90">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <div className="rounded-[var(--radius)] border border-border bg-card p-6 shadow-card sm:p-7">
              <span className="eyebrow">Resultados pretendidos</span>
              <ul className="mt-5 space-y-3.5">
                {projeto.resultados.map((item) => (
                  <li key={item} className="flex gap-3">
                    <Check className="mt-0.5 h-4 w-4 shrink-0 text-moss" />
                    <span className="text-[14px] leading-relaxed text-muted-foreground">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-5 flex gap-3 rounded-[var(--radius)] border border-ember/30 bg-ember/5 p-5">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-ember" />
              <div>
                <p className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-ember">
                  Limite de atuação
                </p>
                <p className="mt-2 text-[13px] leading-relaxed text-muted-foreground">
                  {projeto.limites}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-t border-border bg-secondary/40">
        <div className="container-page grid gap-4 py-10 sm:grid-cols-2">
          <Link
            to={`/projetos/${anterior.slug}`}
            className="group flex items-center gap-3 rounded-[var(--radius)] border border-border bg-card p-5 transition-colors hover:border-moss/50"
          >
            <ArrowLeft className="h-4 w-4 text-muted-foreground transition-transform group-hover:-translate-x-1" />
            <span>
              <span className="block font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
                Núcleo anterior
              </span>
              <span className="mt-1 block font-display text-[17px]">
                {anterior.nome}
              </span>
            </span>
          </Link>
          <Link
            to={`/projetos/${proximo.slug}`}
            className="group flex items-center justify-end gap-3 rounded-[var(--radius)] border border-border bg-card p-5 text-right transition-colors hover:border-moss/50"
          >
            <span>
              <span className="block font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
                Próximo núcleo
              </span>
              <span className="mt-1 block font-display text-[17px]">
                {proximo.nome}
              </span>
            </span>
            <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>

      <section className="container-page py-14 sm:py-16">
        <div className="flex flex-col gap-4 rounded-[var(--radius)] border border-border bg-card p-6 shadow-card sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <p className="max-w-xl text-[14px] leading-relaxed text-muted-foreground">
            Quer propor cooperação científica, financiamento de PD&amp;I ou
            acompanhar os resultados deste núcleo?
          </p>
          <Button asChild>
            <Link to="/contato">Falar com a coordenação</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
