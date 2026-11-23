import { Link } from "react-router-dom";
import { ArrowUpRight, GraduationCap, MapPin, Sprout } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/verde/page-header";
import { SectionHeading } from "@/components/verde/section-heading";
import {
  instituicao,
  objetivosEspecificos,
  ressalvaTerritorial,
  territorios,
} from "@/data/conteudo";

export default function Programa() {
  return (
    <div>
      <PageHeader
        eyebrow="Apresentação institucional"
        titulo="Um modelo permanente de inteligência ambiental"
        descricao="O Programa Verde Nexia é uma proposta de desenvolvimento ambiental, científico e tecnológico que integra conservação dos recursos naturais, pesquisa aplicada, inovação e equipes multidisciplinares."
      >
        <div className="mt-8 flex flex-wrap gap-x-8 gap-y-3 border-t border-border pt-6">
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            {instituicao.proponente}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            CNPJ {instituicao.cnpj}
          </span>
          <span className="font-mono text-[10px] uppercase tracking-[0.16em] text-muted-foreground">
            {instituicao.municipio}
          </span>
        </div>
      </PageHeader>

      {/* Apresentação */}
      <section className="container-page py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-16">
          <div>
            <span className="eyebrow">Origem</span>
            <h2 className="display-title mt-4 text-[clamp(1.7rem,3.2vw,2.4rem)]">
              Concebido no CACC
            </h2>
            <p className="mt-4 text-[13px] leading-relaxed text-muted-foreground">
              A estruturação e a coordenação executiva do programa estão sob
              responsabilidade de {instituicao.responsavel}, no âmbito do{" "}
              {instituicao.proponente}.
            </p>
          </div>

          <div className="space-y-5">
            <p className="prose-verde">
              O programa tem como finalidade estabelecer um modelo permanente de
              inteligência ambiental, capaz de produzir informações sobre áreas
              verdes, vegetação, biodiversidade, recursos hídricos, riscos de
              incêndios florestais e alterações nos ecossistemas.
            </p>
            <p className="prose-verde">
              Seu diferencial está na integração de tecnologias avançadas —{" "}
              <strong>
                redes neurais profundas, visão computacional, sensores
                ambientais, drones, telemetria, servidores de processamento e
                plataformas de georreferenciamento
              </strong>{" "}
              — com pesquisa científica, formação de profissionais e produção de
              conhecimento aplicável à proteção dos recursos naturais.
            </p>
            <p className="prose-verde">
              O programa foi inicialmente planejado para o município de Mesquita,
              com perspectiva de replicação em outros territórios brasileiros,
              mediante adequação às características ambientais e às exigências
              legais de cada localidade.
            </p>
          </div>
        </div>
      </section>

      {/* Objetivo geral */}
      <section className="surface-paper border-y border-border py-14 sm:py-20">
        <div className="container-page">
          <div className="grid gap-10 lg:grid-cols-[0.55fr_1.45fr] lg:gap-16">
            <div>
              <span className="eyebrow">Objetivo geral</span>
            </div>
            <div>
              <p className="font-display text-[clamp(1.35rem,2.6vw,2rem)] font-light leading-[1.35] tracking-tight">
                Implantar e consolidar uma estrutura integrada de Pesquisa,
                Desenvolvimento e Inovação Tecnológica voltada ao monitoramento,
                à conservação e ao apoio à proteção ambiental.
              </p>
              <p className="mt-6 max-w-2xl text-[14.5px] leading-relaxed text-muted-foreground">
                Para isso, o programa desenvolve tecnologias capazes de
                identificar, analisar e acompanhar transformações ambientais,
                produzindo informações verificáveis para subsidiar estudos, ações
                preventivas e iniciativas de conservação.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Justificativa territorial */}
      <section className="container-page py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Justificativa ambiental"
              titulo="Mesquita, entre a cidade e o maciço"
              descricao="Município da Baixada Fluminense com significativa interação entre áreas urbanizadas e remanescentes de Mata Atlântica."
            />

            <dl className="mt-9 grid grid-cols-2 gap-6 border-t border-border pt-6">
              {[
                { valor: "41,169 km²", rotulo: "extensão territorial" },
                { valor: "167.127", rotulo: "habitantes (Censo 2022)" },
                { valor: "178.780", rotulo: "estimativa para 2026" },
                { valor: "Gericinó-Mendanha", rotulo: "maciço no entorno" },
              ].map((item) => (
                <div key={item.rotulo}>
                  <dt className="font-display text-[22px] font-light leading-tight tracking-tight">
                    {item.valor}
                  </dt>
                  <dd className="mt-1 font-mono text-[9px] uppercase leading-relaxed tracking-[0.14em] text-muted-foreground">
                    {item.rotulo}
                  </dd>
                </div>
              ))}
            </dl>

            <p className="mt-7 text-[13px] leading-relaxed text-muted-foreground">
              A proximidade das áreas urbanas com o Maciço Gericinó-Mendanha
              torna relevante implantar mecanismos capazes de acompanhar
              transformações ambientais e identificar situações que possam
              comprometer os ecossistemas.
            </p>
          </div>

          <div>
            <div className="flex items-center gap-3">
              <MapPin className="h-4 w-4 text-moss" />
              <span className="eyebrow">Territórios considerados</span>
            </div>
            <ul className="mt-6 divide-y divide-border border-y border-border">
              {territorios.map((territorio, indice) => (
                <li key={territorio.nome} className="flex gap-4 py-3.5">
                  <span className="font-mono text-[10px] tracking-[0.16em] text-moss">
                    {String(indice + 1).padStart(2, "0")}
                  </span>
                  <span className="text-[14px] leading-snug">
                    {territorio.nome}
                  </span>
                </li>
              ))}
            </ul>
            <p className="mt-5 rounded-[var(--radius)] border border-border bg-secondary/50 p-4 text-[12px] leading-relaxed text-muted-foreground">
              {ressalvaTerritorial}
            </p>
            <Button asChild variant="outline" size="sm" className="mt-5">
              <Link to="/indicadores">
                Ver áreas cadastradas
                <ArrowUpRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Objetivos específicos */}
      <section className="surface-paper border-y border-border py-14 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Objetivos específicos"
            titulo="Doze frentes de atuação"
            descricao="Os objetivos organizam a pesquisa, a operação e a documentação científica do programa."
          />

          <ol className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius)] border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
            {objetivosEspecificos.map((objetivo, indice) => (
              <li
                key={objetivo}
                className="group bg-card p-6 transition-colors duration-300 hover:bg-secondary/40"
              >
                <span className="font-mono text-[10px] tracking-[0.18em] text-moss">
                  {String(indice + 1).padStart(2, "0")}
                </span>
                <p className="mt-3 text-[13.5px] leading-relaxed text-foreground/90">
                  {objetivo}
                </p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Educação e replicação */}
      <section className="container-page py-14 sm:py-20">
        <div className="grid gap-6 lg:grid-cols-2">
          <article className="rounded-[var(--radius)] border border-border bg-card p-7 shadow-card sm:p-9">
            <GraduationCap className="h-5 w-5 text-moss" />
            <h2 className="display-title mt-6 text-[clamp(1.4rem,2.4vw,1.9rem)]">
              Educação ambiental e participação social
            </h2>
            <p className="mt-4 text-[14px] leading-relaxed text-muted-foreground">
              O programa prevê oficinas, apresentações, capacitações e atividades
              educativas sobre Mata Atlântica, prevenção de incêndios, recursos
              hídricos e uso responsável de tecnologias, em articulação com
              universidades, escolas e instituições científicas.
            </p>
            <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">
              A participação comunitária aproxima os resultados das pesquisas das
              necessidades territoriais e fortalece a disseminação do
              conhecimento.
            </p>
          </article>

          <article className="rounded-[var(--radius)] border border-border bg-card p-7 shadow-card sm:p-9">
            <Sprout className="h-5 w-5 text-moss" />
            <h2 className="display-title mt-6 text-[clamp(1.4rem,2.4vw,1.9rem)]">
              Replicação em outros territórios
            </h2>
            <p className="mt-4 text-[14px] leading-relaxed text-muted-foreground">
              A arquitetura permite estudar a adaptação do modelo para outros
              municípios, sempre com diagnóstico ambiental, levantamento
              territorial, orçamento próprio e instrumento de cooperação
              específico.
            </p>
            <p className="mt-3 text-[14px] leading-relaxed text-muted-foreground">
              Para Arraial do Cabo foi considerada uma adaptação que amplia o
              campo de pesquisa ao ambiente costeiro e marinho. Trata-se de uma{" "}
              <strong className="text-foreground">possibilidade estratégica</strong>,
              não de operação implantada ou parceria formalizada.
            </p>
          </article>
        </div>
      </section>

      <section className="container-page pb-16 sm:pb-20">
        <div className="flex flex-col gap-4 rounded-[var(--radius)] border border-border bg-secondary/40 p-6 sm:flex-row sm:items-center sm:justify-between sm:p-8">
          <p className="max-w-xl text-[14px] leading-relaxed text-muted-foreground">
            Conheça os seis núcleos científicos que compõem a estrutura de
            pesquisa e desenvolvimento do programa.
          </p>
          <Button asChild>
            <Link to="/projetos">
              Ver projetos
              <ArrowUpRight />
            </Link>
          </Button>
        </div>
      </section>
    </div>
  );
}
