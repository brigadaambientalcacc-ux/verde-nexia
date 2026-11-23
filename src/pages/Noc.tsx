import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  Database,
  FileText,
  Radio,
  ShieldCheck,
  Siren,
  ClipboardList,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/verde/page-header";
import { SectionHeading } from "@/components/verde/section-heading";
import { niveisTriagem } from "@/data/conteudo";
import { cn } from "@/lib/utils";

const funcoes = [
  {
    icone: Radio,
    titulo: "Recepção de dados",
    texto: "Entrada contínua das informações produzidas pelos seis núcleos científicos.",
  },
  {
    icone: Database,
    titulo: "Análise e registro",
    texto: "Tratamento dos dados, registro de eventos e manutenção do histórico operacional.",
  },
  {
    icone: Siren,
    titulo: "Classificação de alertas",
    texto: "Triagem dos indícios por nível, com separação entre teste, suspeita e emergência.",
  },
  {
    icone: ClipboardList,
    titulo: "Acompanhamento operacional",
    texto: "Monitoramento das ocorrências abertas e do retorno dos órgãos acionados.",
  },
  {
    icone: FileText,
    titulo: "Relatórios técnicos",
    texto: "Emissão de relatórios periódicos com indicadores e registros de ocorrência.",
  },
  {
    icone: ShieldCheck,
    titulo: "Integridade da informação",
    texto: "Protocolos para diferenciar alertas reais de possíveis erros de identificação.",
  },
];

const infraestrutura = [
  "Servidores e infraestrutura de processamento de IA",
  "Estações de trabalho e painéis de visualização",
  "Ferramentas de geoprocessamento e bancos de dados",
  "Sensores ambientais, gateways e telemetria",
  "Drones, baterias, peças e manutenção",
  "Rádios e dispositivos de comunicação de campo",
  "Sistemas digitais e suporte especializado",
  "Computadores, notebooks, tablets e smartphones",
];

const seguranca = [
  "Segurança da informação",
  "Disponibilidade dos serviços",
  "Backup e recuperação",
  "Controle de acesso",
  "Continuidade operacional",
];

const tons = {
  muted: "border-border bg-secondary/60 text-muted-foreground",
  sky: "border-sky/30 bg-sky/5 text-sky",
  ember: "border-ember/30 bg-ember/5 text-ember",
} as const;

export default function Noc() {
  return (
    <div>
      <PageHeader
        eyebrow="Centro de Operações e Monitoramento"
        titulo="NOC Ambiental"
        descricao="Um centro para reunir as informações dos seis projetos, acompanhar ocorrências e disponibilizar dados em uma estrutura integrada de decisão."
      >
        <div className="mt-9 flex flex-wrap gap-2">
          {["Recepção", "Análise", "Triagem", "Registro", "Comunicação"].map(
            (etapa, indice) => (
              <span
                key={etapa}
                className="flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-[11.5px] text-muted-foreground"
              >
                <span className="font-mono text-[9px] text-moss">
                  0{indice + 1}
                </span>
                {etapa}
              </span>
            ),
          )}
        </div>
      </PageHeader>

      <section className="container-page py-14 sm:py-20">
        <SectionHeading
          eyebrow="Atribuições"
          titulo="O que o centro executa"
          descricao="O NOC opera como ponto de convergência entre pesquisadores, técnicos de campo e instituições parceiras."
        />
        <div className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius)] border border-border bg-border sm:grid-cols-2 lg:grid-cols-3">
          {funcoes.map((funcao) => {
            const Icone = funcao.icone;
            return (
              <div key={funcao.titulo} className="bg-card p-6 sm:p-7">
                <Icone className="h-5 w-5 text-moss" />
                <h3 className="mt-5 font-display text-[18px] tracking-tight">
                  {funcao.titulo}
                </h3>
                <p className="mt-2.5 text-[13px] leading-relaxed text-muted-foreground">
                  {funcao.texto}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Triagem */}
      <section className="surface-paper border-y border-border py-14 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Protocolo de triagem"
            titulo="Quatro níveis antes de qualquer comunicação"
            descricao="O sistema pode operar com níveis de triagem que separam testes internos de situações de emergência. Toda comunicação é precedida de verificação humana."
          />

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {niveisTriagem.map((nivel) => (
              <div
                key={nivel.nivel}
                className={cn(
                  "flex flex-col rounded-[var(--radius)] border p-5",
                  tons[nivel.tom],
                )}
              >
                <span className="font-mono text-[10px] tracking-[0.18em] opacity-70">
                  {nivel.nivel}
                </span>
                <p className="mt-6 font-display text-[19px] leading-tight text-foreground">
                  {nivel.nome}
                </p>
                <p className="mt-2 text-[12.5px] leading-relaxed text-muted-foreground">
                  {nivel.descricao}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-8 flex gap-3 rounded-[var(--radius)] border border-ember/30 bg-ember/5 p-5 sm:p-6">
            <Siren className="mt-0.5 h-4 w-4 shrink-0 text-ember" />
            <p className="max-w-3xl text-[13px] leading-relaxed text-muted-foreground">
              A atuação do programa{" "}
              <strong className="text-foreground">
                não substitui o Corpo de Bombeiros, a Defesa Civil ou os órgãos
                ambientais competentes
              </strong>
              . O NOC registra, classifica e encaminha informações; a resposta a
              emergências permanece sob responsabilidade das instituições
              públicas competentes.
            </p>
          </div>
        </div>
      </section>

      {/* Infraestrutura */}
      <section className="container-page py-14 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16">
          <div>
            <SectionHeading
              eyebrow="Infraestrutura tecnológica"
              titulo="Componentes integrados"
              descricao="A contratação de tecnologia é planejada de forma integrada, com implantação progressiva conforme pesquisa, recursos e conectividade do território."
            />
            <ul className="mt-8 grid gap-x-6 gap-y-3 sm:grid-cols-2">
              {infraestrutura.map((item) => (
                <li
                  key={item}
                  className="flex gap-2.5 border-b border-border/70 pb-2.5 text-[13px] leading-snug text-muted-foreground"
                >
                  <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-moss" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div className="surface-forest relative overflow-hidden rounded-[var(--radius)] p-7 sm:p-9">
            <ShieldCheck className="h-5 w-5 text-[hsl(var(--moss-bright))]" />
            <h2 className="display-title mt-6 text-[clamp(1.4rem,2.4vw,1.9rem)] text-[hsl(var(--paper))]">
              Segurança e continuidade
            </h2>
            <p className="mt-4 text-[14px] leading-relaxed text-[hsl(var(--paper)/0.7)]">
              A arquitetura deve prever mecanismos de proteção da informação e
              garantia de operação, com compartilhamento controlado entre equipes
              científicas, operadores, pesquisadores e gestores.
            </p>
            <ul className="mt-7 space-y-3">
              {seguranca.map((item, indice) => (
                <li
                  key={item}
                  className="flex items-center gap-3 border-b border-[hsl(var(--paper)/0.12)] pb-3 text-[13px] text-[hsl(var(--paper)/0.8)]"
                >
                  <span className="font-mono text-[9px] text-[hsl(var(--moss-bright))]">
                    0{indice + 1}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
            <Button asChild variant="inverse" size="sm" className="mt-7">
              <Link to="/governanca">
                Governança e contratos
                <ArrowUpRight />
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
