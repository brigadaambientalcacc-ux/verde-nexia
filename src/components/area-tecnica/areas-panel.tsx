import { useState, type FormEvent } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  Archive,
  ArchiveRestore,
  Loader2,
  MapPinned,
  Pencil,
  Plus,
  X,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
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
import { useAreas } from "@/hooks/use-verde";
import {
  atualizarArea,
  criarArea,
  estagiosArea,
  formatarNumero,
  rotulo,
  tiposArea,
  type Area,
} from "@/lib/verde";
import { cn } from "@/lib/utils";

type Campos = {
  nome: string;
  tipo: string;
  municipio: string;
  bairro: string;
  extensao: string;
  latitude: string;
  longitude: string;
  estagio: string;
  orgao: string;
  observacoes: string;
};

const camposIniciais: Campos = {
  nome: "",
  tipo: "parque",
  municipio: "Mesquita",
  bairro: "",
  extensao: "",
  latitude: "",
  longitude: "",
  estagio: "planejada",
  orgao: "",
  observacoes: "",
};

const numero = (valor: string): number | null => {
  const limpo = valor.replace(/\./g, "").replace(",", ".").trim();
  if (!limpo) return null;
  const convertido = Number(limpo);
  return Number.isFinite(convertido) ? convertido : null;
};

const corEstagio: Record<string, string> = {
  planejada: "border-border bg-secondary/70 text-muted-foreground",
  levantamento: "border-sky/30 bg-sky/5 text-sky",
  ativa: "border-moss/30 bg-moss/10 text-moss",
  suspensa: "border-ember/30 bg-ember/5 text-ember",
};

export function AreasPanel({ usuarioId }: { usuarioId: string }) {
  const { data: areas, isLoading, isError } = useAreas();
  const queryClient = useQueryClient();

  const [formAberto, setFormAberto] = useState(false);
  const [editando, setEditando] = useState<Area | null>(null);
  const [campos, setCampos] = useState<Campos>(camposIniciais);
  const [salvando, setSalvando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const atualizarCampo = (campo: keyof Campos, valor: string) => {
    setCampos((atual) => ({ ...atual, [campo]: valor }));
  };

  const recarregar = async () => {
    await Promise.all([
      queryClient.invalidateQueries({ queryKey: ["verde", "areas"] }),
      queryClient.invalidateQueries({ queryKey: ["verde", "areas-publicas"] }),
      queryClient.invalidateQueries({ queryKey: ["verde", "indicadores"] }),
    ]);
  };

  const abrirNovo = () => {
    setEditando(null);
    setCampos(camposIniciais);
    setErro(null);
    setFormAberto(true);
  };

  const abrirEdicao = (area: Area) => {
    setEditando(area);
    setCampos({
      nome: area.nome,
      tipo: area.tipo,
      municipio: area.municipio,
      bairro: area.bairro ?? "",
      extensao: area.extensao_ha ? String(area.extensao_ha) : "",
      latitude: area.latitude ? String(area.latitude) : "",
      longitude: area.longitude ? String(area.longitude) : "",
      estagio: area.estagio,
      orgao: area.orgao_gestor ?? "",
      observacoes: area.observacoes ?? "",
    });
    setErro(null);
    setFormAberto(true);
  };

  const fechar = () => {
    setFormAberto(false);
    setEditando(null);
    setErro(null);
  };

  const salvar = async (evento: FormEvent) => {
    evento.preventDefault();
    setErro(null);

    if (campos.nome.trim().length < 3) {
      setErro("Informe o nome da área.");
      return;
    }
    if (campos.municipio.trim().length < 2) {
      setErro("Informe o município.");
      return;
    }

    const dados = {
      nome: campos.nome.trim(),
      tipo: campos.tipo,
      municipio: campos.municipio.trim(),
      bairro: campos.bairro.trim() || null,
      extensao_ha: numero(campos.extensao),
      latitude: numero(campos.latitude),
      longitude: numero(campos.longitude),
      estagio: campos.estagio,
      orgao_gestor: campos.orgao.trim() || null,
      observacoes: campos.observacoes.trim() || null,
    };

    setSalvando(true);
    try {
      if (editando) {
        await atualizarArea(editando.id, dados);
      } else {
        await criarArea(dados, usuarioId);
      }
      await recarregar();
      fechar();
    } catch {
      setErro("Não foi possível salvar a área. Revise os dados e tente novamente.");
    } finally {
      setSalvando(false);
    }
  };

  const alternarArquivo = async (area: Area) => {
    try {
      await atualizarArea(area.id, { arquivada: !area.arquivada });
      await recarregar();
    } catch {
      setErro("Não foi possível atualizar o arquivamento desta área.");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="eyebrow">Territórios</span>
          <h2 className="display-title mt-2 text-[clamp(1.4rem,2.6vw,1.9rem)]">
            Áreas monitoradas
          </h2>
          <p className="mt-2 max-w-xl text-[12.5px] leading-relaxed text-muted-foreground">
            Áreas arquivadas deixam de aparecer no site público e nos
            indicadores, mas permanecem registradas com histórico.
          </p>
        </div>
        {!formAberto && (
          <Button onClick={abrirNovo} size="sm" className="shrink-0">
            <Plus />
            Nova área
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
              <span className="eyebrow">
                {editando ? "Editar cadastro" : "Novo cadastro"}
              </span>
              <p className="mt-2 font-display text-[19px]">
                {editando ? editando.nome : "Área monitorada"}
              </p>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={fechar}
              aria-label="Fechar formulário"
            >
              <X />
            </Button>
          </div>

          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="area-nome">Nome da área *</Label>
              <Input
                id="area-nome"
                value={campos.nome}
                onChange={(e) => atualizarCampo("nome", e.target.value)}
                placeholder="Ex.: Parque Natural Municipal de Mesquita"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="area-tipo">Tipo</Label>
              <Select
                value={campos.tipo}
                onValueChange={(v) => atualizarCampo("tipo", v)}
              >
                <SelectTrigger id="area-tipo">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {tiposArea.map((tipo) => (
                    <SelectItem key={tipo.valor} value={tipo.valor}>
                      {tipo.rotulo}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="area-estagio">Estágio</Label>
              <Select
                value={campos.estagio}
                onValueChange={(v) => atualizarCampo("estagio", v)}
              >
                <SelectTrigger id="area-estagio">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {estagiosArea.map((estagio) => (
                    <SelectItem key={estagio.valor} value={estagio.valor}>
                      {estagio.rotulo}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="area-municipio">Município *</Label>
              <Input
                id="area-municipio"
                value={campos.municipio}
                onChange={(e) => atualizarCampo("municipio", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="area-bairro">Bairro / localidade</Label>
              <Input
                id="area-bairro"
                value={campos.bairro}
                onChange={(e) => atualizarCampo("bairro", e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="area-extensao">Extensão (hectares)</Label>
              <Input
                id="area-extensao"
                inputMode="decimal"
                value={campos.extensao}
                onChange={(e) => atualizarCampo("extensao", e.target.value)}
                placeholder="Ex.: 120,5"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="area-orgao">Órgão gestor</Label>
              <Input
                id="area-orgao"
                value={campos.orgao}
                onChange={(e) => atualizarCampo("orgao", e.target.value)}
                placeholder="Responsável pela área"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="area-latitude">Latitude</Label>
              <Input
                id="area-latitude"
                inputMode="decimal"
                value={campos.latitude}
                onChange={(e) => atualizarCampo("latitude", e.target.value)}
                placeholder="-22,78"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="area-longitude">Longitude</Label>
              <Input
                id="area-longitude"
                inputMode="decimal"
                value={campos.longitude}
                onChange={(e) => atualizarCampo("longitude", e.target.value)}
                placeholder="-43,45"
              />
            </div>

            <div className="space-y-2 sm:col-span-2">
              <Label htmlFor="area-observacoes">Observações</Label>
              <Textarea
                id="area-observacoes"
                rows={3}
                value={campos.observacoes}
                onChange={(e) => atualizarCampo("observacoes", e.target.value)}
                placeholder="Autorizações, condições de acesso, contatos do órgão gestor."
              />
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-3 border-t border-border pt-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-[11px] text-muted-foreground">
              Coordenadas são visíveis apenas para a equipe autenticada.
            </p>
            <div className="flex gap-2">
              <Button type="button" variant="ghost" size="sm" onClick={fechar}>
                Cancelar
              </Button>
              <Button type="submit" size="sm" disabled={salvando}>
                {salvando ? <Loader2 className="animate-spin" /> : null}
                {editando ? "Salvar alterações" : "Cadastrar área"}
              </Button>
            </div>
          </div>

          {erro && (
            <p className="mt-3 text-[12px] text-destructive" role="alert">
              {erro}
            </p>
          )}
        </form>
      )}

      {isLoading && (
        <p className="text-[13px] text-muted-foreground">Carregando áreas…</p>
      )}

      {isError && (
        <p className="rounded-[var(--radius)] border border-destructive/30 bg-destructive/5 p-4 text-[12.5px] text-destructive">
          Não foi possível carregar as áreas. Atualize a página e tente
          novamente.
        </p>
      )}

      {!isLoading && !isError && (areas?.length ?? 0) === 0 && (
        <div className="rounded-[var(--radius)] border border-dashed border-border p-8 text-center">
          <MapPinned className="mx-auto h-5 w-5 text-moss" />
          <p className="mt-4 font-display text-[18px]">
            Nenhuma área cadastrada
          </p>
          <p className="mx-auto mt-2 max-w-sm text-[12.5px] leading-relaxed text-muted-foreground">
            Comece pelas áreas-piloto da Fase I. Os indicadores públicos passam a
            refletir o cadastro imediatamente.
          </p>
          <Button onClick={abrirNovo} size="sm" variant="outline" className="mt-5">
            <Plus />
            Cadastrar primeira área
          </Button>
        </div>
      )}

      <div className="overflow-hidden rounded-[var(--radius)] border border-border bg-card">
        {areas?.map((area) => (
          <div
            key={area.id}
            className={cn(
              "flex flex-col gap-3 border-b border-border p-4 last:border-b-0 sm:flex-row sm:items-center sm:justify-between",
              area.arquivada && "bg-secondary/30 opacity-70",
            )}
          >
            <div className="min-w-0">
              <div className="flex flex-wrap items-center gap-2">
                <p className="text-[14px] font-medium leading-snug">
                  {area.nome}
                </p>
                <span
                  className={cn(
                    "rounded-full border px-2 py-0.5 font-mono text-[8.5px] uppercase tracking-[0.12em]",
                    corEstagio[area.estagio],
                  )}
                >
                  {rotulo(estagiosArea, area.estagio)}
                </span>
                {area.arquivada && (
                  <Badge
                    variant="outline"
                    className="font-mono text-[8.5px] uppercase tracking-[0.12em]"
                  >
                    arquivada
                  </Badge>
                )}
              </div>
              <p className="mt-1 text-[11.5px] text-muted-foreground">
                {rotulo(tiposArea, area.tipo)} · {area.municipio}
                {area.bairro ? ` · ${area.bairro}` : ""}
                {area.extensao_ha
                  ? ` · ${formatarNumero(area.extensao_ha)} ha`
                  : ""}
                {area.latitude && area.longitude
                  ? ` · ${area.latitude}, ${area.longitude}`
                  : ""}
              </p>
            </div>

            <div className="flex shrink-0 gap-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                aria-label={`Editar ${area.nome}`}
                onClick={() => abrirEdicao(area)}
              >
                <Pencil />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8"
                aria-label={
                  area.arquivada
                    ? `Reativar ${area.nome}`
                    : `Arquivar ${area.nome}`
                }
                onClick={() => alternarArquivo(area)}
              >
                {area.arquivada ? <ArchiveRestore /> : <Archive />}
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
