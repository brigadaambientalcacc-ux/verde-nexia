import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

export type Area = Database["public"]["Tables"]["verde_areas"]["Row"];
export type AreaPublica = Database["public"]["Views"]["verde_areas_publicas"]["Row"];
export type Sensor = Database["public"]["Tables"]["verde_sensores"]["Row"];
export type Mensagem = Database["public"]["Tables"]["verde_mensagens"]["Row"];
export type Perfil = Database["public"]["Tables"]["verde_perfis"]["Row"];
export type Indicadores =
  Database["public"]["Views"]["verde_indicadores_publicos"]["Row"];

export const tiposArea = [
  { valor: "parque", rotulo: "Parque natural" },
  { valor: "aparu", rotulo: "APARU / APA" },
  { valor: "macico", rotulo: "Maciço e entorno" },
  { valor: "remanescente", rotulo: "Remanescente florestal" },
  { valor: "curso_agua", rotulo: "Curso d'água" },
  { valor: "area_verde_urbana", rotulo: "Área verde urbana" },
  { valor: "outro", rotulo: "Outro território" },
];

export const estagiosArea = [
  { valor: "planejada", rotulo: "Planejada" },
  { valor: "levantamento", rotulo: "Em levantamento" },
  { valor: "ativa", rotulo: "Ativa" },
  { valor: "suspensa", rotulo: "Suspensa" },
];

export const tiposSensor = [
  { valor: "temperatura", rotulo: "Temperatura" },
  { valor: "umidade", rotulo: "Umidade" },
  { valor: "meteorologico", rotulo: "Estação meteorológica" },
  { valor: "qualidade_ar", rotulo: "Qualidade do ar" },
  { valor: "nivel_agua", rotulo: "Nível d'água" },
  { valor: "outro", rotulo: "Outro" },
];

export const situacoesSensor = [
  { valor: "instalado", rotulo: "Instalado" },
  { valor: "operacional", rotulo: "Operacional" },
  { valor: "manutencao", rotulo: "Em manutenção" },
  { valor: "inativo", rotulo: "Inativo" },
];

export const assuntosContato = [
  { valor: "parceria", rotulo: "Parceria institucional" },
  { valor: "pesquisa", rotulo: "Pesquisa e cooperação científica" },
  { valor: "financiamento", rotulo: "Financiamento de PD&I" },
  { valor: "imprensa", rotulo: "Imprensa" },
  { valor: "outro", rotulo: "Outro assunto" },
];

export const rotulo = (
  lista: { valor: string; rotulo: string }[],
  valor: string | null | undefined,
) => lista.find((item) => item.valor === valor)?.rotulo ?? valor ?? "—";

export const formatarNumero = (valor: number | null | undefined) =>
  new Intl.NumberFormat("pt-BR", { maximumFractionDigits: 2 }).format(valor ?? 0);

export async function buscarIndicadores(): Promise<Indicadores | null> {
  const { data, error } = await supabase
    .from("verde_indicadores_publicos")
    .select(
      "areas_total, areas_ativas, extensao_ha, sensores_total, sensores_instalados, sensores_operacionais",
    )
    .maybeSingle();
  if (error) throw new Error(error.message);
  return data;
}

export async function listarAreasPublicas(): Promise<AreaPublica[]> {
  const { data, error } = await supabase
    .from("verde_areas_publicas")
    .select("id, nome, tipo, municipio, bairro, extensao_ha, estagio, orgao_gestor")
    .order("nome", { ascending: true });
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function listarAreas(): Promise<Area[]> {
  const { data, error } = await supabase
    .from("verde_areas")
    .select("*")
    .order("criado_em", { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function listarSensores(): Promise<Sensor[]> {
  const { data, error } = await supabase
    .from("verde_sensores")
    .select("*")
    .order("codigo", { ascending: true });
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function listarMensagens(): Promise<Mensagem[]> {
  const { data, error } = await supabase
    .from("verde_mensagens")
    .select("*")
    .order("criado_em", { ascending: false });
  if (error) throw new Error(error.message);
  return data ?? [];
}

export async function listarPerfis(): Promise<Perfil[]> {
  const { data, error } = await supabase
    .from("verde_perfis")
    .select("*")
    .order("criado_em", { ascending: true });
  if (error) throw new Error(error.message);
  return data ?? [];
}

export type AreaEntrada = {
  nome: string;
  tipo: string;
  municipio: string;
  bairro: string | null;
  extensao_ha: number | null;
  latitude: number | null;
  longitude: number | null;
  estagio: string;
  orgao_gestor: string | null;
  observacoes: string | null;
};

export async function criarArea(
  area: AreaEntrada,
  usuarioId: string,
): Promise<void> {
  const { error } = await supabase
    .from("verde_areas")
    .insert({ ...area, criado_por: usuarioId });
  if (error) throw new Error(error.message);
}

export async function atualizarArea(
  id: string,
  area: Partial<AreaEntrada> & { arquivada?: boolean },
): Promise<void> {
  const { error } = await supabase
    .from("verde_areas")
    .update({ ...area, atualizado_em: new Date().toISOString() })
    .eq("id", id);
  if (error) throw new Error(error.message);
}

export type SensorEntrada = {
  codigo: string;
  tipo: string;
  situacao: string;
  area_id: string | null;
  ultima_verificacao: string | null;
  observacoes: string | null;
};

export async function criarSensor(
  sensor: SensorEntrada,
  usuarioId: string,
): Promise<void> {
  const { error } = await supabase
    .from("verde_sensores")
    .insert({ ...sensor, criado_por: usuarioId });
  if (error) throw new Error(error.message);
}

export async function atualizarSensor(
  id: string,
  sensor: Partial<SensorEntrada>,
): Promise<void> {
  const { error } = await supabase
    .from("verde_sensores")
    .update({ ...sensor, atualizado_em: new Date().toISOString() })
    .eq("id", id);
  if (error) throw new Error(error.message);
}

export async function enviarMensagem(mensagem: {
  nome: string;
  organizacao: string | null;
  email: string;
  telefone: string | null;
  assunto: string;
  mensagem: string;
}): Promise<void> {
  const { error } = await supabase.from("verde_mensagens").insert(mensagem);
  if (error) throw new Error(error.message);
}

export async function atualizarMensagem(
  id: string,
  dados: { lida?: boolean; arquivada?: boolean },
): Promise<void> {
  const { error } = await supabase
    .from("verde_mensagens")
    .update(dados)
    .eq("id", id);
  if (error) throw new Error(error.message);
}

export async function atualizarPerfil(
  id: string,
  dados: { aprovado?: boolean; papel?: string },
): Promise<void> {
  const { error } = await supabase
    .from("verde_perfis")
    .update(dados)
    .eq("id", id);
  if (error) throw new Error(error.message);
}
