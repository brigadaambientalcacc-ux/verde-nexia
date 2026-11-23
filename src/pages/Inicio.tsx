import { Link } from "react-router-dom";
import {
  ArrowRight,
  ArrowUpRight,
  Cpu,
  Layers,
  RadioTower,
  Satellite,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { TopoBackdrop } from "@/components/verde/marca";
import { Numero } from "@/components/verde/stat";
import { ProjectCard } from "@/components/verde/project-card";
import { SectionHeading } from "@/components/verde/section-heading";
import {
  fases,
  instituicao,
  niveisTriagem,
  numerosChave,
  territorios,
} from "@/data/conteudo";
import { projetos } from "@/data/projetos";
import { useIndicadores } from "@/hooks/use-verde";
import { formatarNumero } from "@/lib/verde";
import { cn } from "@/lib/utils";

const capacidades = [
  {
    icone: Satellite,
    titulo: "Sensoriamento remoto",
    texto:
      "Imagens de satélite, drones e câmeras de campo convertidas em informação ambiental verificável.",
  },
  {
    icone: Cpu,
    titulo: "Inteligência artificial",
    texto:
      "Redes neurais profundas e visão computacional para classificar vegetação e identificar alterações.",
  },
  {
    icone: RadioTower,
    titulo: "Rede de sensores",
    texto:
      "Dispositivos de baixo consumo, gateways e telemetria testados em ambientes de vegetação.",
  },
  {
    icone: Users,
    titulo: "Equipes especializadas",
    texto:
      "Pesquisadores, engenheiros, biólogos e técnicos de campo em estrutura planejada de até 200 profissionais.",
  },
];

export default function Inicio() {
  const { data: indicadores } = useIndicadores();
  const areasTotal = indicadores?.areas_total ?? 0;
  const semCadastro = areasTotal === 0;
  const numeroOuTraco = (valor: number | null | undefined) =>
    semCadastro ? "—" : formatarNumero(valor);

  return (
    <div>
      {/* Hero */}
      <section className="surface-forest relative overflow-hidden">
        <TopoBackdrop className="pointer-events-none absolute inset-0 h-full w-full text-[hsl(var(--paper))] opacity-[0.13]" />
        <div className="container-page relative grid gap-14 py-16 sm:py-20 lg:grid-cols-[1.1fr_0.9fr] lg:items-center lg:gap-16 lg:py-28">
          <div className="animate-rise">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-[hsl(var(--paper)/0.22)] px-3.5 py-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--moss-bright))] animate-pulse-soft" />
              <span className="font-mono text-[9.5px] uppercase tracking-[0.2em] text-[hsl(var(--paper)/0.72)]">
                Programa em estruturação · Mesquita
              </span>
            </div>

            <h1 className="display-title mt-7 text-[clamp(2.4rem,6vw,4.4rem)] text-[hsl(var(--paper))]">
              Inteligência ambiental para a{" "}
              <em className="font-normal italic text-[hsl(var(--moss-bright))]">
                Mata Atlântica
              </em>
            </h1>

            <p className="mt-7 max-w-xl text-[15.5px] leading-relaxed text-[hsl(var(--paper)/0.74)] sm:text-[17px]">
              O Programa Verde Nexia integra conservação, pesquisa aplicada e
              inovação tecnológica para produzir informações sobre vegetação,
              biodiversidade, recursos hídricos e riscos ambientais — do
              território à tomada de decisão.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-3">
              <Button asChild variant="inverseSolid" size="xl">
                <Link to="/programa">
                  Conhecer o programa
                  <ArrowRight />
                </Link>
              </Button>
              <Button asChild variant="inverse" size="xl">
                <Link to="/projetos">
                  Os seis núcleos
                  <ArrowUpRight />
                </Link>
              </Button>
            </div>

            <dl className="mt-12 grid max-w-md grid-cols-3 gap-6 border-t border-[hsl(var(--paper)/0.16)] pt-6">
              {[
                { valor: "6", rotulo: "núcleos de PD&I" },
                { valor: "200", rotulo: "profissionais" },
                { valor: "120", rotulo: "meses iniciais" },
              ].map((item) => (
                <div key={item.rotulo}>
                  <dt className="font-display text-2xl font-light text-[hsl(var(--paper))]">
                    {item.valor}
                  </dt>
                  <dd className="mt-1 font-mono text-[9px] uppercase leading-relaxed tracking-[0.14em] text-[hsl(var(--paper)/0.55)]">
                    {item.rotulo}
                  </dd>
                </div>
              ))}
            </dl>
          </div>

          {/* Painel de indicadores */}
          <div className="animate-rise animation-delay-200">
            <div className="relative rounded-[var(--radius)] border border-[hsl(var(--paper)/0.18)] bg-[hsl(var(--paper)/0.06)] p-6 backdrop-blur-sm sm:p-7">
              <div className="flex items-center justify-between border-b border-[hsl(var(--paper)/0.14)] pb-4">
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[hsl(var(--paper)/0.62)]">
                  Painel do programa
                </span>
                <span className="flex items-center gap-1.5 font-mono text-[9px] uppercase tracking-[0.16em] text-[hsl(var(--moss-bright))]">
                  <span className="h-1.5 w-1.5 rounded-full bg-[hsl(var(--moss-bright))] animate-pulse-soft" />
                  cadastro ativo
                </span>
              </div>

              <div className="divide-y divide-[hsl(var(--paper)/0.12)]">
                {[
                  {
                    rotulo: "Áreas monitoradas",
                    valor: numeroOuTraco(indicadores?.areas_total),
                    unidade: "cadastradas",
                  },
                  {
                    rotulo: "Extensão territorial",
                    valor: numeroOuTraco(indicadores?.extensao_ha),
                    unidade: "hectares",
                  },
                  {
                    rotulo: "Sensores operacionais",
                    valor: numeroOuTraco(indicadores?.sensores_operacionais),
                    unidade: `de ${semCadastro ? "—" : formatarNumero(indicadores?.sensores_instalados)} instalados`,
                  },
                ].map((linha) => (
                  <div
                    key={linha.rotulo}
                    className="flex items-end justify-between py-4"
                  >
                    <span className="text-[13px] text-[hsl(var(--paper)/0.7)]">
                      {linha.rotulo}
                    </span>
                    <span className="flex items-baseline gap-2">
                      <span className="font-display text-[26px] font-light leading-none text-[hsl(var(--paper))]">
                        {linha.valor}
                      </span>
                      <span className="font-mono text-[9px] uppercase tracking-[0.12em] text-[hsl(var(--paper)/0.5)]">
                        {linha.unidade}
                      </span>
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-5 flex items-start gap-2 border-t border-[hsl(var(--paper)/0.14)] pt-4">
                <Layers className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[hsl(var(--moss-bright))]" />
                <p className="text-[11.5px] leading-relaxed text-[hsl(var(--paper)/0.55)]">
                  {semCadastro
                    ? "Nenhuma área cadastrada até o momento. Os números aparecem aqui assim que a equipe técnica registra os levantamentos."
                    : "Indicadores calculados a partir dos cadastros feitos pela equipe técnica na área reservada."}
                </p>
              </div>
            </div>

            <Link
              to="/indicadores"
              className="mt-4 flex items-center justify-between rounded-[var(--radius)] border border-[hsl(var(--paper)/0.14)] px-5 py-3.5 text-[12.5px] text-[hsl(var(--paper)/0.7)] transition-colors hover:border-[hsl(var(--paper)/0.3)] hover:text-[hsl(var(--paper))]"
            >
              Ver todos os indicadores do programa
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Números-chave */}
      <section className="border-b border-border bg-background">
        <div className="container-page grid gap-8 py-12 sm:grid-cols-2 sm:py-14 lg:grid-cols-4 lg:divide-x lg:divide-border">
          {numerosChave.map((item, indice) => (
            <Numero
              key={item.rotulo}
              valor={item.valor}
              rotulo={item.rotulo}
              detalhe={item.detalhe}
              className={cn(indice > 0 && "lg:pl-8")}
            />
          ))}
        </div>
      </section>

      {/* Capacidades */}
      <section className="container-page py-16 sm:py-20 lg:py-24">
        <SectionHeading
          eyebrow="O que o programa faz"
          titulo="Uma estrutura permanente de inteligência ambiental"
          descricao="O Verde Nexia não se limita ao monitoramento convencional: desenvolve tecnologia própria, realiza experimentos científicos e forma profissionais capazes de operar esses sistemas."
          acao={
            <Button asChild variant="outline">
              <Link to="/programa">
                Objetivos e justificativa
                <ArrowUpRight />
              </Link>
            </Button>
          }
        />

        <div className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius)] border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {capacidades.map((item) => {
            const Icone = item.icone;
            return (
              <div
                key={item.titulo}
                className="group bg-card p-6 transition-colors duration-300 hover:bg-secondary/40 lg:p-7"
              >
                <Icone className="h-5 w-5 text-moss" />
                <h3 className="mt-6 font-display text-[19px] leading-snug tracking-tight">
                  {item.titulo}
                </h3>
                <p className="mt-2.5 text-[13px] leading-relaxed text-muted-foreground">
                  {item.texto}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Projetos */}
      <section className="surface-paper border-y border-border py-16 sm:py-20 lg:py-24">
        <div className="container-page">
          <SectionHeading
            eyebrow="Estrutura científica"
            titulo="Seis núcleos integrados de pesquisa e tecnologia"
            descricao="Cada núcleo desenvolve uma frente própria de PD&I, com plano científico, equipe e resultados verificáveis — todos conectados ao Centro de Operações e Monitoramento Ambiental."
            acao={
              <Button asChild variant="outline">
                <Link to="/projetos">
                  Ver todos os projetos
                  <ArrowUpRight />
                </Link>
              </Button>
            }
          />

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {projetos.map((projeto, indice) => (
              <ProjectCard
                key={projeto.slug}
                projeto={projeto}
                indice={indice + 1}
              />
            ))}
          </div>
        </div>
      </section>

      {/* NOC */}
      <section className="surface-forest relative overflow-hidden">
        <TopoBackdrop className="pointer-events-none absolute inset-0 h-full w-full text-[hsl(var(--paper))] opacity-[0.08]" />
        <div className="container-page relative py-16 sm:py-20 lg:py-24">
          <div className="grid gap-12 lg:grid-cols-[0.95fr_1.05fr] lg:gap-16">
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-[hsl(var(--moss-bright))]" />
                <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[hsl(var(--moss-bright))]">
                  NOC Ambiental
                </span>
              </div>
              <h2 className="display-title mt-4 text-[clamp(1.8rem,3.6vw,2.7rem)] text-[hsl(var(--paper))]">
                Um centro de operações para transformar dados em decisão
              </h2>
              <p className="mt-5 max-w-lg text-[15px] leading-relaxed text-[hsl(var(--paper)/0.7)]">
                O NOC reúne as informações dos seis projetos, classifica alertas
                e encaminha ocorrências relevantes aos órgãos responsáveis, com
                protocolos de triagem e verificação humana.
              </p>
              <Button asChild variant="inverse" className="mt-8">
                <Link to="/noc">
                  Conhecer o NOC
                  <ArrowUpRight />
                </Link>
              </Button>
            </div>

            <div className="rounded-[var(--radius)] border border-[hsl(var(--paper)/0.16)]">
              {niveisTriagem.map((nivel, indice) => (
                <div
                  key={nivel.nivel}
                  className={cn(
                    "flex gap-5 p-5 sm:px-6",
                    indice > 0 && "border-t border-[hsl(var(--paper)/0.12)]",
                  )}
                >
                  <span className="font-mono text-[10px] tracking-[0.18em] text-[hsl(var(--paper)/0.4)]">
                    {nivel.nivel}
                  </span>
                  <div>
                    <p className="font-display text-[17px] text-[hsl(var(--paper))]">
                      {nivel.nome}
                    </p>
                    <p className="mt-1 text-[12.5px] leading-relaxed text-[hsl(var(--paper)/0.6)]">
                      {nivel.descricao}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Território */}
      <section className="container-page py-16 sm:py-20 lg:py-24">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
          <div>
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-moss" />
              <span className="eyebrow">Território</span>
            </div>
            <h2 className="display-title mt-4 text-[clamp(1.8rem,3.6vw,2.6rem)]">
              Onde a Mata Atlântica encontra a cidade
            </h2>
            <p className="prose-verde mt-5">
              Em Mesquita, na Baixada Fluminense, áreas urbanizadas convivem com
              remanescentes florestais e com o Maciço Gericinó-Mendanha. Essa
              proximidade torna relevante acompanhar transformações ambientais e
              identificar situações que possam comprometer os ecossistemas.
            </p>
            <p className="mt-4 text-[12px] leading-relaxed text-muted-foreground">
              {instituicao.proponente} · {instituicao.municipio}
            </p>
          </div>

          <ul className="divide-y divide-border border-y border-border">
            {territorios.map((territorio, indice) => (
              <li
                key={territorio.nome}
                className="group flex gap-5 py-4 transition-colors hover:bg-secondary/40"
              >
                <span className="mt-1 font-mono text-[10px] tracking-[0.18em] text-moss">
                  {String(indice + 1).padStart(2, "0")}
                </span>
                <div>
                  <p className="text-[14.5px] font-medium leading-snug">
                    {territorio.nome}
                  </p>
                  <p className="mt-1 text-[12.5px] leading-relaxed text-muted-foreground">
                    {territorio.descricao}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Implantação */}
      <section className="border-y border-border bg-secondary/40 py-16 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Implantação"
            titulo="Crescimento planejado em quatro fases"
            descricao="Os primeiros 36 meses concentram a estruturação e a expansão tecnológica, com ampliação progressiva das equipes até a capacidade planejada."
            acao={
              <Button asChild variant="outline">
                <Link to="/cronograma">
                  Ver cronograma completo
                  <ArrowUpRight />
                </Link>
              </Button>
            }
          />

          <div className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius)] border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {fases.slice(1, 5).map((fase) => (
              <div key={fase.id} className="bg-card p-6">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-moss">
                    {fase.rotulo}
                  </span>
                  <span className="font-mono text-[10px] text-muted-foreground">
                    {fase.intervalo}
                  </span>
                </div>
                <p className="mt-6 font-display text-[30px] font-light leading-none tracking-tight">
                  {fase.equipe}
                  <span className="ml-1.5 text-[11px] font-sans font-normal text-muted-foreground">
                    profissionais
                  </span>
                </p>
                <p className="mt-3 text-[12.5px] leading-relaxed text-muted-foreground">
                  {fase.resumo}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="container-page py-16 sm:py-20 lg:py-24">
        <div className="surface-forest relative overflow-hidden rounded-[var(--radius)] px-6 py-14 sm:px-12 sm:py-16">
          <TopoBackdrop className="pointer-events-none absolute inset-0 h-full w-full text-[hsl(var(--paper))] opacity-10" />
          <div className="relative max-w-2xl">
            <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-[hsl(var(--moss-bright))]">
              Cooperação científica e financiamento
            </span>
            <h2 className="display-title mt-4 text-[clamp(1.7rem,3.4vw,2.5rem)] text-[hsl(var(--paper))]">
              O programa está aberto à construção de parcerias
            </h2>
            <p className="mt-4 text-[15px] leading-relaxed text-[hsl(var(--paper)/0.7)]">
              Universidades, instituições de pesquisa, empresas e órgãos
              públicos podem propor cooperação técnica, projetos de PD&amp;I ou
              apoio a linhas específicas de pesquisa.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button asChild variant="inverseSolid">
                <Link to="/contato">
                  Falar com a equipe
                  <ArrowUpRight />
                </Link>
              </Button>
              <Button asChild variant="inverse">
                <Link to="/governanca">Governança e sustentabilidade</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
