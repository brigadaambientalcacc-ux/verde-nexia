import { Link } from "react-router-dom";
import {
  AlertTriangle,
  ArrowUpRight,
  BadgeCheck,
  Building2,
  Gavel,
  Handshake,
  Leaf,
  Scale,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/verde/page-header";
import { SectionHeading } from "@/components/verde/section-heading";
import { contratos, governanca, instituicao } from "@/data/conteudo";

export default function Governanca() {
  return (
    <div>
      <PageHeader
        eyebrow="Governança e sustentabilidade"
        titulo="Estrutura de gestão, contratos e financiamento"
        descricao="A execução do programa observa o estatuto do CACC, os poderes de representação institucional e os instrumentos jurídicos utilizados em cada parceria."
      />

      {/* Governança */}
      <section className="container-page py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Modelo de governança"
              titulo="Oito instâncias de decisão"
              descricao="A estrutura organiza direção científica, coordenação tecnológica, operação de campo e controle administrativo."
            />
            <div className="mt-8 flex gap-3 rounded-[var(--radius)] border border-border bg-secondary/50 p-5">
              <Gavel className="mt-0.5 h-4 w-4 shrink-0 text-moss" />
              <p className="text-[12.5px] leading-relaxed text-muted-foreground">
                O CACC atua dentro dos limites de sua capacidade jurídica e dos
                instrumentos celebrados. A implementação não confere poderes de
                polícia ambiental, competência fiscalizatória estatal ou
                administração de unidades de conservação.
              </p>
            </div>
          </div>

          <ul className="divide-y divide-border border-y border-border">
            {governanca.map((item, indice) => (
              <li
                key={item.nome}
                className="flex gap-5 py-4 transition-colors hover:bg-secondary/30"
              >
                <span className="mt-0.5 font-mono text-[10px] tracking-[0.18em] text-moss">
                  {String(indice + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="text-[14.5px] font-medium leading-snug">
                    {item.nome}
                  </p>
                  <p className="mt-1 text-[12.5px] leading-relaxed text-muted-foreground">
                    {item.descricao}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Pessoal */}
      <section className="surface-paper border-y border-border py-14 sm:py-20">
        <div className="container-page">
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <div>
              <Users className="h-5 w-5 text-moss" />
              <h2 className="display-title mt-6 text-[clamp(1.7rem,3.2vw,2.4rem)]">
                Até 200 profissionais em capacidade plena
              </h2>
              <p className="prose-verde mt-5">
                O modelo operacional foi dimensionado para reunir direção
                científica, gestão de inovação, engenharia, desenvolvimento de
                software, inteligência artificial, geoprocessamento, biologia,
                pesquisa florestal, telecomunicações, sensoriamento, operação de
                drones, análise ambiental e atividades técnicas de campo.
              </p>
              <p className="mt-4 text-[13.5px] leading-relaxed text-muted-foreground">
                O quadro analítico contempla 64 categorias de cargos. A formação
                das equipes é progressiva, priorizando competências compatíveis
                com cada etapa de implantação.
              </p>
            </div>

            <div className="rounded-[var(--radius)] border border-border bg-card p-6 shadow-card sm:p-8">
              <span className="eyebrow">Referência de remuneração</span>
              <p className="mt-5 font-display text-[clamp(2rem,4vw,2.8rem)] font-light leading-none tracking-tight">
                R$ 45.200
              </p>
              <p className="mt-2 text-[12.5px] leading-relaxed text-muted-foreground">
                Remuneração bruta referencial do cargo de Diretor Científico de
                PD&amp;I. Os demais cargos possuem valores próprios na matriz
                salarial do projeto executivo.
              </p>
              <div className="mt-6 space-y-3 border-t border-border pt-5">
                {[
                  "Sujeitos à revisão de encargos e jornadas",
                  "Pisos profissionais aplicáveis",
                  "Disponibilidade financeira de cada fase",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-center gap-2.5 text-[12.5px] text-muted-foreground"
                  >
                    <BadgeCheck className="h-3.5 w-3.5 shrink-0 text-moss" />
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contratos */}
      <section className="container-page py-14 sm:py-20">
        <SectionHeading
          eyebrow="Contratos e serviços"
          titulo="Categorias planejadas de contratação"
          descricao="Cada contratação deverá ser precedida de especificação técnica, estudo de necessidade, estimativa orçamentária e instrumento contratual apropriado."
        />
        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {contratos.map((contrato, indice) => (
            <div
              key={contrato.nome}
              className="rounded-[var(--radius)] border border-border bg-card p-5 transition-colors hover:border-moss/40"
            >
              <span className="font-mono text-[10px] tracking-[0.16em] text-moss">
                {String(indice + 1).padStart(2, "0")}
              </span>
              <p className="mt-4 font-display text-[16px] leading-snug">
                {contrato.nome}
              </p>
              <p className="mt-2 text-[12px] leading-relaxed text-muted-foreground">
                {contrato.descricao}
              </p>
            </div>
          ))}
        </div>
        <p className="mt-6 flex gap-2.5 rounded-[var(--radius)] border border-border bg-secondary/40 p-4 text-[12px] leading-relaxed text-muted-foreground">
          <Building2 className="mt-0.5 h-4 w-4 shrink-0 text-moss" />
          Os contratos serão dimensionados conforme as necessidades de cada etapa
          de execução. As categorias acima não representam contratações já
          efetivadas.
        </p>
      </section>

      {/* Financiamento */}
      <section className="surface-forest relative overflow-hidden">
        <div className="container-page relative py-14 sm:py-20">
          <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-[hsl(var(--moss-bright))]" />
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[hsl(var(--moss-bright))]">
                  Sustentabilidade econômica
                </span>
              </div>
              <h2 className="display-title mt-4 text-[clamp(1.7rem,3.2vw,2.5rem)] text-[hsl(var(--paper))]">
                Pesquisa aplicada como fonte de continuidade
              </h2>
              <p className="mt-5 text-[14.5px] leading-relaxed text-[hsl(var(--paper)/0.72)]">
                A estratégia contempla projetos de pesquisa aplicada, contratos
                de desenvolvimento tecnológico, cooperação científica,
                investimentos empresariais e doações, sempre em formatos
                juridicamente compatíveis.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild variant="inverseSolid">
                  <Link to="/contato">
                    Propor cooperação
                    <ArrowUpRight />
                  </Link>
                </Button>
              </div>
            </div>

            <div className="space-y-4">
              <div className="rounded-[var(--radius)] border border-[hsl(var(--paper)/0.18)] bg-[hsl(var(--paper)/0.05)] p-6">
                <Handshake className="h-4 w-4 text-[hsl(var(--moss-bright))]" />
                <p className="mt-4 font-display text-[19px] text-[hsl(var(--paper))]">
                  Lei do Bem (Lei nº 11.196/2005)
                </p>
                <p className="mt-2.5 text-[13px] leading-relaxed text-[hsl(var(--paper)/0.65)]">
                  Poderá ser examinada por empresas que preencham os requisitos
                  legais, conforme regime tributário, natureza dos dispêndios e
                  legislação vigente. O financiamento de um projeto de PD&amp;I
                  não assegura automaticamente redução tributária.
                </p>
              </div>

              <div className="rounded-[var(--radius)] border border-[hsl(var(--paper)/0.18)] bg-[hsl(var(--paper)/0.05)] p-6">
                <Scale className="h-4 w-4 text-[hsl(var(--moss-bright))]" />
                <p className="mt-4 font-display text-[19px] text-[hsl(var(--paper))]">
                  Licenciamento e projetos cooperativos
                </p>
                <p className="mt-2.5 text-[13px] leading-relaxed text-[hsl(var(--paper)/0.65)]">
                  Licenciamento tecnológico, desenvolvimento experimental
                  contratado e uso autorizado de resultados científicos, com
                  centros de custos segregados, prestação de contas e
                  documentação fiscal.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Carbono + PI */}
      <section className="container-page py-14 sm:py-20">
        <div className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-[var(--radius)] border border-border bg-card p-7 shadow-card sm:p-9">
            <Leaf className="h-5 w-5 text-moss" />
            <h2 className="display-title mt-6 text-[clamp(1.4rem,2.4vw,1.9rem)]">
              Carbono e serviços ecossistêmicos
            </h2>
            <p className="mt-4 text-[14px] leading-relaxed text-muted-foreground">
              O programa poderá desenvolver estudos sobre estoques de carbono na
              vegetação e capacidade potencial de remoção de CO₂, com imagens,
              inventários florestais e metodologias reconhecidas.
            </p>
            <div className="mt-5 flex gap-3 rounded-[var(--radius)] border border-ember/30 bg-ember/5 p-4">
              <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0 text-ember" />
              <p className="text-[12.5px] leading-relaxed text-muted-foreground">
                Mensurar estoques ou fluxos não equivale a emitir créditos
                certificados. Eventual comercialização depende de metodologia
                apropriada, comprovação de adicionalidade, regras de titularidade
                e verificação independente.
              </p>
            </div>
          </article>

          <article className="rounded-[var(--radius)] border border-border bg-card p-7 shadow-card sm:p-9">
            <Gavel className="h-5 w-5 text-moss" />
            <h2 className="display-title mt-6 text-[clamp(1.4rem,2.4vw,1.9rem)]">
              Pesquisa e propriedade intelectual
            </h2>
            <p className="mt-4 text-[14px] leading-relaxed text-muted-foreground">
              Os seis projetos deverão possuir planos científicos
              individualizados, com objetivos, hipóteses, metodologias,
              experimentos, indicadores e resultados verificáveis.
            </p>
            <ul className="mt-5 space-y-2.5">
              {[
                "Titularidade e licenciamento definidos em contrato",
                "Rastreabilidade dos experimentos e das despesas",
                "Proteção de dados e confidencialidade",
                "Documentação apta a acompanhamento técnico e auditoria",
              ].map((item) => (
                <li
                  key={item}
                  className="flex gap-2.5 text-[12.5px] leading-relaxed text-muted-foreground"
                >
                  <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-moss" />
                  {item}
                </li>
              ))}
            </ul>
          </article>
        </div>

        <p className="mt-8 font-mono text-[10px] uppercase leading-relaxed tracking-[0.16em] text-muted-foreground">
          {instituicao.proponente} · CNPJ {instituicao.cnpj} ·{" "}
          {instituicao.referencia}
        </p>
      </section>
    </div>
  );
}
