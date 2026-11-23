import { useState, type FormEvent } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Loader2, Plus, RadioTower, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useAreas, useSensores } from "@/hooks/use-verde";
import {
  atualizarSensor,
  criarSensor,
  rotulo,
  situacoesSensor,
  tiposSensor,
} from "@/lib/verde";
import { cn } from "@/lib/utils";

type Campos = {
  codigo: string;
  tipo: string;
  situacao: string;
  area_id: string;
  ultima_verificacao: string;
  observacoes: string;
};

const camposIniciais: Campos = {
  codigo: "",
  tipo: "temperatura",
  situacao: "instalado",
  area_id: "",
  ultima_verificacao: "",
  observacoes: "",
};

const corSituacao: Record<string, string> = {
  instalado: "border-sky/30 bg-sky/5 text-sky",
  operacional: "border-moss/30 bg-moss/10 text-moss",
  manutencao: "border-ember/30 bg-ember/5 text-ember",
  inativo: "border-border bg-secondary/70 text-muted-foreground",
};

export function SensoresPanel({ usuarioId }: { usuarioId: string }) {
  const { data: sensores, isLoading, isError } = useSensores();
  const { data: areas } = useAreas();
  const queryClient = useQueryClient();

  const [formAberto, setFormAberto] = useState(false);
  const [campos, setCampos] = useState<Campos>(camposIniciais);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [atualizando, setAtualizando] = useState<string | null>(null);

  const atualizarCampo = (campo: keyof Campos, valor: string) => {
    setCampos((atual) => ({ ...atual, [campo]: valor }));
  };

  const recarregar = async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ["verde", "sensores"] }),
      queryClient.invalidateQueries({ queryKey: ["verde", "indicadores"] }),
    ]);
  };

  const salvar = async (evento: FormEvent) => {
    evento.preventDefault();
    setErro(null);

    if (campos.codigo.trim().length < 2) {
      setErro("Informe o código de identificação do sensor.");
      return;
    }

    setSalvando(true);
    try {
      await criarSensor(
        {
          codigo: campos.codigo.trim(),
          tipo: campos.tipo,
          situacao: campos.situacao,
          area_id: campos.area_id || null,
          ultima_verificacao: campos.ultima_verificacao || null,
          observacoes: campos.observacoes.trim() || null,
        },
        usuarioId,
      );
      await recarregar();
      setCampos(camposIniciais);
      setFormAberto(false);
    } catch {
      setErro("Não foi possível registrar o sensor. Tente novamente.");
    } finally {
      setSalvando(false);
    }
  };

  const mudarSituacao = async (id: string, situacao: string) => {
    setAtualizando(id);
    try {
      await atualizarSensor(id, { situacao });
      await recarregar();
    } catch {
      setErro("Não foi possível atualizar a situação do sensor.");
    } finally {
      setAtualizando(null);
    }
  };

  const nomeArea = (areaId: string | null) =>
    areas?.find((area) => area.id === areaId)?.nome ?? "Sem área vinculada";

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="eyebrow">Rede experimental</span>
          <h2 className="display-title mt-2 text-[clamp(1.4rem,2.6vw,1.9rem)]">
            Sensores ambientais
          </h2>
          <p className="mt-2 max-w-xl text-[12.5px] leading-relaxed text-muted-foreground">
            Apenas sensores com situação “operacional” entram no indicador
            público de sensores efetivamente em funcionamento.
          </p>
        </div>
        {!formAberto && (
          <Button onClick={() => setFormAberto(true)} size="sm" className="shrink-0">
            <Plus />
            Novo sensor
          </Button>
        )}
      </div>

      {formAberto && (
        <form
          onSubmit={salvar}
          noValidate
          className="rounded-[var(--radius)] border border-border bg-secondary/30 p-5 sm:p-6"
        >
          <div className="flex items-start justify-between">
            <div>
              <span className="eyebrow">Novo cadastro</span>
              <p className="mt-2 font-display text-[19px]">Sensor ambiental</p>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setFormAberto(false)}
              aria-label="Fechar formulário"
            >
              <X />
            </Button>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="sensor-codigo">Código *</Label>
              <Input
                id="sensor-codigo"
                value={campos.codigo}
                onChange={(e) => atualizarCampo("codigo", e.target.value)}
                placeholder="Ex.: FS-001"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="sensor-tipo">Tipo de medição</Label>
              <Select
                value={campos.tipo}
                onValueChange={(v) => atualizarCampo("tipo", v)}
              >
                <SelectTrigger id="sensor-tipo">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {tiposSensor.map((tipo) => (
                    <SelectItem key={tipo.valor} value={tipo.valor}>
                      {tipo.rotulo}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sensor-situacao">Situação</Label>
              <Select
                value={campos.situacao}
                onValueChange={(v) => atualizarCampo("situacao", v)}
              >
                <SelectTrigger id="sensor-situacao">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {situacoesSensor.map((situacao) => (
                    <SelectItem key={situacao.valor} value={situacao.valor}>
                      {situacao.rotulo}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sensor-area">Área vinculada</Label>
              <Select
                value={campos.area_id || "nenhuma"}
                onValueChange={(v) =>
                  atualizarCampo("area_id", v === "nenhuma" ? "" : v)
                }
              >
                <SelectTrigger id="sensor-area">
                  <SelectValue placeholder="Selecione" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="nenhuma">Sem área vinculada</SelectItem>
                  {areas?.map((area) => (
                    <SelectItem key={area.id} value={area.id}>
                      {area.nome}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="sensor-data">Última verificação</Label>
              <Input
                id="sensor-data"
                type="date"
                value={campos.ultima_verificacao}
                onChange={(e) =>
                  atualizarCampo("ultima_verificacao", e.target.value)
                }
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="sensor-observacoes">Observações</Label>
              <Textarea
                id="sensor-observacoes"
                rows={2}
                value={campos.observacoes}
                onChange={(e) => atualizarCampo("observacoes", e.target.value)}
                placeholder="Conectividade, alimentação, histórico de manutenção."
              />
            </div>
          </div>

          {erro && (
            <p className="mt-3 text-[12px] text-destructive" role="alert">
              {erro}
            </p>
          )}

          <div className="mt-5 flex justify-end gap-2 border-t border-border pt-4">
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={() => setFormAberto(false)}
            >
              Cancelar
            </Button>
            <Button type="submit" size="sm" disabled={salvando}>
              {salvando ? <Loader2 className="animate-spin" /> : null}
              Registrar sensor
            </Button>
          </div>
        </form>
      )}

      {!formAberto && erro && (
        <p className="text-[12px] text-destructive" role="alert">
          {erro}
        </p>
      )}

      {isLoading && (
        <p className="text-[13px] text-muted-foreground">Carregando sensores…</p>
      )}

      {isError && (
        <p className="rounded-[var(--radius)] border border-destructive/30 bg-destructive/5 p-4 text-[12.5px] text-destructive">
          Não foi possível carregar os sensores.
        </p>
      )}

      {!isLoading && !isError && (sensores?.length ?? 0) === 0 && (
        <div className="rounded-[var(--radius)] border border-dashed border-border p-8 text-center">
          <RadioTower className="mx-auto h-5 w-5 text-moss" />
          <p className="mt-4 font-display text-[18px]">Nenhum sensor cadastrado</p>
          <p className="mx-auto mt-2 max-w-sm text-[12.5px] leading-relaxed text-muted-foreground">
            Registre os dispositivos dos testes preliminares da Fase I para
            acompanhar a rede experimental.
          </p>
        </div>
      )}

      <div className="overflow-hidden rounded-[var(--radius)] border border-border bg-card">
        {sensores?.map((sensor) => (
          <div
            key={sensor.id}
            className="flex flex-col gap-3 border-b border-border p-4 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
          >
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-[12px] font-medium">
                  {sensor.codigo}
                </span>
                <span
                  className={cn(
                    "rounded-full border px-2 py-0.5 font-mono text-[8.5px] uppercase tracking-[0.12em]",
                    corSituacao[sensor.situacao],
                  )}
                >
                  {rotulo(situacoesSensor, sensor.situacao)}
                </span>
              </div>
              <p className="mt-1 text-[11.5px] text-muted-foreground">
                {rotulo(tiposSensor, sensor.tipo)} · {nomeArea(sensor.area_id)}
                {sensor.ultima_verificacao
                  ? ` · verificado em ${new Date(
                      `${sensor.ultima_verificacao}T12:00:00`,
                    ).toLocaleDateString("pt-BR")}`
                  : ""}
              </p>
            </div>

            <div className="flex shrink-0 items-center gap-2">
              {atualizando === sensor.id && (
                <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />
              )}
              <Select
                value={sensor.situacao}
                onValueChange={(valor) => mudarSituacao(sensor.id, valor)}
              >
                <SelectTrigger className="h-8 w-[152px] text-[12px]">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {situacoesSensor.map((situacao) => (
                    <SelectItem key={situacao.valor} value={situacao.valor}>
                      {situacao.rotulo}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
