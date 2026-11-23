import { useQuery } from "@tanstack/react-query";
import {
  buscarIndicadores,
  listarAreas,
  listarAreasPublicas,
  listarMensagens,
  listarPerfis,
  listarSensores,
} from "@/lib/verde";

export function useIndicadores() {
  return useQuery({
    queryKey: ["verde", "indicadores"],
    queryFn: buscarIndicadores,
    staleTime: 20_000,
  });
}

export function useAreasPublicas() {
  return useQuery({
    queryKey: ["verde", "areas-publicas"],
    queryFn: listarAreasPublicas,
    staleTime: 20_000,
  });
}

export function useAreas(habilitado = true) {
  return useQuery({
    queryKey: ["verde", "areas"],
    queryFn: listarAreas,
    enabled: habilitado,
  });
}

export function useSensores(habilitado = true) {
  return useQuery({
    queryKey: ["verde", "sensores"],
    queryFn: listarSensores,
    enabled: habilitado,
  });
}

export function useMensagens(habilitado = true) {
  return useQuery({
    queryKey: ["verde", "mensagens"],
    queryFn: listarMensagens,
    enabled: habilitado,
  });
}

export function usePerfis(habilitado = true) {
  return useQuery({
    queryKey: ["verde", "perfis"],
    queryFn: listarPerfis,
    enabled: habilitado,
  });
}
