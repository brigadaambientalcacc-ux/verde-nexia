import { Link } from "react-router-dom";
import {
  Activity,
  ArrowUpRight,
  Database,
  MapPinned,
  RadioTower,
  Ruler,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHeader } from "@/components/verde/page-header";
import { SectionHeading } from "@/components/verde/section-heading";
import { Metrica } from "@/components/verde/stat";
import { indicadoresPrevistos } from "@/data/conteudo";
import { useAreasPublicas, useIndicadores } from "@/hooks/use-verde";
import { formatarNumero, rotulo, estagiosArea, tiposArea } from "@/lib/verde";
import { cn } from "@/lib/utils";

const corEstagio: Record<string, string> = {
  planejada: "border-border bg-secondary/60 text-muted-foreground",
  levantamento: "border-sky/30 bg-sky/5 text-sky",
  ativa: "border-moss/30 bg-moss/10 text-moss",
  suspensa: "border-ember/30 bg-ember/5 text-ember",
};

export default function Indicadores() {
  const { data: indicadores, isLoading, isError } = useIndicadores();
  const { data: areas, isLoading: carregandoAreas } = useAreasPublicas();

  const areasTotal = indicadores?.areas_total ?? 0;
  const semCadastro = areasTotal === 0;

  return (
    <div>
      <PageHeader
        eyebrow="Avaliação de resultados"
        titulo="Indicadores do programa"
        descricao="Os números abaixo são calculados a partir dos cadastros feitos pela equipe técnica na área reservada. Indicadores que ainda não têm medição aparecem identificados, sem valores presumidos."
      >
        <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5">
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              isError ? "bg-ember" : "bg-moss animate-pulse-soft",
            )}
          />
          <span className="font-mono text-[9.5px] uppercase tracking-[0.18em] text-muted-foreground">
            {isError
              ? "Falha ao carregar indicadores"
              : "Atualizado pelos cadastros da equipe"}
          </span>
        </div>
      </PageHeader>

      {/* Medidos */}
      <section className="container-page py-14 sm:py-20">
        <SectionHeading
          eyebrow="Medição direta"
          titulo="O que já é contabilizado"
          descricao="Três indicadores derivam diretamente das áreas e dos sensores registrados."
        />

        <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Metrica
            icone={MapPinned}
            rotulo="Áreas monitoradas"
            valor={
              isLoading
                ? "…"
                : semCadastro
                  ? "—"
                  : formatarNumero(indicadores?.areas_total)
            }
            nota={
              semCadastro
                ? "Nenhuma área cadastrada até o momento"
                : `${formatarNumero(indicadores?.areas_ativas)} em estágio ativo`
            }
          />
          <Metrica
            icone={Ruler}
            rotulo="Extensão territorial"
            valor={
              isLoading
                ? "…"
                : semCadastro
                  ? "—"
                  : `${formatarNumero(indicadores?.extensao_ha)} ha`
            }
            nota="Soma das áreas cadastradas, em hectares"
          />
          <Metrica
            icone={RadioTower}
            rotulo="Sensores operacionais"
            valor={
              isLoading
                ? "…"
                : semCadastro
                  ? "—"
                  : formatarNumero(indicadores?.sensores_operacionais)
            }
            nota={`${formatarNumero(indicadores?.sensores_instalados)} instalados · ${formatarNumero(indicadores?.sensores_total)} cadastrados`}
          />
        </div>

        {semCadastro && !isLoading && (
          <div className="mt-6 flex flex-col gap-4 rounded-[var(--radius)] border border-dashed border-border bg-secondary/30 p-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-3">
              <Database className="mt-0.5 h-4 w-4 shrink-0 text-moss" />
              <div>
                <p className="text-[14px] font-medium">
                  Ainda não há áreas cadastradas
                </p>
                <p className="mt-1 max-w-xl text-[12.5px] leading-relaxed text-muted-foreground">
                  Os levantamentos territoriais começam na Fase I. Assim que a
                  equipe registrar as áreas e os sensores, os indicadores acima
                  passam a ser calculados automaticamente.
                </p>
              </div>
            </div>
            <Button asChild variant="outline" size="sm" className="shrink-0">
              <Link to="/area-tecnica">
                Acessar área técnica
                <ArrowUpRight />
              </Link>
            </Button>
          </div>
        )}
      </section>

      {/* Áreas registradas */}
      <section className="surface-paper border-y border-border py-14 sm:py-20">
        <div className="container-page">
          <SectionHeading
            eyebrow="Territórios registrados"
            titulo="Áreas em acompanhamento"
            descricao="A visita pública exibe tipo, município, estágio e extensão. As coordenadas precisas ficam restritas à equipe técnica."
          />

          <div className="mt-10 overflow-hidden rounded-[var(--radius)] border border-border bg-card">
            <div className="hidden grid-cols-[1.6fr_0.9fr_0.9fr_0.6fr] gap-4 border-b border-border bg-secondary/40 px-5 py-3 sm:grid">
              {["Área", "Tipo", "Estágio", "Extensão"].map((coluna) => (
                <span
                  key={coluna}
                  className="font-mono text-[9.5px] uppercase tracking-[0.16em] text-muted-foreground"
                >
                  {coluna}
                </span>
              ))}
            </div>

            {carregandoAreas && (
              <p className="px-5 py-8 text-[13px] text-muted-foreground">
                Carregando áreas registradas…
              </p>
            )}

            {!carregandoAreas && (areas?.length ?? 0) === 0 && (
              <div className="px-5 py-10 text-center">
                <p className="font-display text-[19px]">
                  Nenhuma área publicada ainda
                </p>
                <p className="mx-auto mt-2 max-w-md text-[12.5px] leading-relaxed text-muted-foreground">
                  As áreas consideradas no planejamento — Parque Natural
                  Municipal, APARU Gericinó, Maciço Gericinó-Mendanha e demais
                  territórios — dependem de levantamento geográfico, autorização
                  de acesso e avaliação técnica antes de serem registradas.
                </p>
              </div>
            )}

            {areas?.map((area) => (
              <div
                key={area.id}
                className="grid gap-2 border-b border-border px-5 py-4 last:border-b-0 sm:grid-cols-[1.6fr_0.9fr_0.9fr_0.6fr] sm:items-center sm:gap-4"
              >
                <div>
                  <p className="text-[14px] font-medium leading-snug">
                    {area.nome}
                  </p>
                  <p className="mt-0.5 text-[11.5px] text-muted-foreground">
                    {area.municipio}
                    {area.bairro ? ` · ${area.bairro}` : ""}
                  </p>
                </div>
                <span className="text-[12.5px] text-muted-foreground">
                  {rotulo(tiposArea, area.tipo)}
                </span>
                <span>
                  <span
                    className={cn(
                      "inline-flex rounded-full border px-2.5 py-0.5 font-mono text-[9px] uppercase tracking-[0.12em]",
                      corEstagio[area.estagio ?? "planejada"],
                    )}
                  >
                    {rotulo(estagiosArea, area.estagio)}
                  </span>
                </span>
                <span className="font-mono text-[11px] text-muted-foreground">
                  {area.extensao_ha
                    ? `${formatarNumero(area.extensao_ha)} ha`
                    : "—"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Previstos */}
      <section className="container-page py-14 sm:py-20">
        <SectionHeading
          eyebrow="Cobertura de avaliação"
          titulo="Indicadores previstos, ainda sem medição"
          descricao="Estes indicadores constam do sistema de avaliação do programa. Serão medidos a partir dos levantamentos iniciais e revistos conforme os resultados experimentais."
        />

        <div className="mt-10 grid gap-px overflow-hidden rounded-[var(--radius)] border border-border bg-border sm:grid-cols-2">
          {indicadoresPrevistos.map((indicador) => (
            <div key={indicador.nome} className="bg-card p-5 sm:p-6">
              <div className="flex items-start justify-between gap-3">
                <span className="font-mono text-[9px] uppercase tracking-[0.16em] text-moss">
                  {indicador.grupo}
                </span>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-border px-2 py-0.5 font-mono text-[8.5px] uppercase tracking-[0.12em] text-muted-foreground">
                  <Activity className="h-2.5 w-2.5" />
                  sem medição
                </span>
              </div>
              <p className="mt-4 text-[14px] font-medium leading-snug">
                {indicador.nome}
              </p>
              <p className="mt-1.5 text-[12px] leading-relaxed text-muted-foreground">
                {indicador.descricao}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-6 text-[12px] leading-relaxed text-muted-foreground">
          Nenhum valor é estimado ou preenchido por suposição. Indicadores sem
          medição permanecem explicitamente sinalizados até que existam registros
          verificáveis produzidos pelo programa.
        </p>
      </section>
    </div>
  );
}
