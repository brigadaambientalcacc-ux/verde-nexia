import { Link } from "react-router-dom";
import { Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/verde/page-header";
import { ProjectCard } from "@/components/verde/project-card";
import { projetos } from "@/data/projetos";

export default function Projetos() {
  const totalNucleos = projetos.reduce(
    (soma, projeto) => soma + projeto.equipe,
    0,
  );

  return (
    <div>
      <PageHeader
        eyebrow="Estrutura científica"
        titulo="Seis núcleos, uma arquitetura integrada"
        descricao="Os projetos tecnológicos são complementares e concebidos para funcionar de forma integrada, do dado bruto coletado em campo à informação disponível no NOC Ambiental."
      >
        <dl className="mt-9 grid max-w-2xl grid-cols-2 gap-6 border-t border-border pt-6 sm:grid-cols-3">
          <div>
            <dt className="font-display text-[26px] font-light leading-none">
              {totalNucleos}
            </dt>
            <dd className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
              postos nos núcleos
            </dd>
          </div>
          <div>
            <dt className="font-display text-[26px] font-light leading-none">
              18
            </dt>
            <dd className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
              funções transversais
            </dd>
          </div>
          <div>
            <dt className="font-display text-[26px] font-light leading-none">
              200
            </dt>
            <dd className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-muted-foreground">
              profissionais previstos
            </dd>
          </div>
        </dl>
      </PageHeader>

      <section className="container-page py-14 sm:py-20">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {projetos.map((projeto, indice) => (
            <ProjectCard
              key={projeto.slug}
              projeto={projeto}
              indice={indice + 1}
            />
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-5 rounded-[var(--radius)] border border-border bg-secondary/40 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <div className="flex gap-3">
            <Users className="mt-0.5 h-4 w-4 shrink-0 text-moss" />
            <p className="max-w-xl text-[13.5px] leading-relaxed text-muted-foreground">
              A estrutura organizacional completa contempla 64 categorias de
              cargos, com formação progressiva das equipes conforme cada etapa de
              implantação.
            </p>
          </div>
          <Button asChild variant="outline" className="shrink-0">
            <Link to="/governanca">Ver governança</Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
