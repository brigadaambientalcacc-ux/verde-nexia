import { useMemo, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import {
  Archive,
  ArchiveRestore,
  Inbox,
  Mail,
  MailOpen,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useMensagens } from "@/hooks/use-verde";
import { assuntosContato, atualizarMensagem, rotulo } from "@/lib/verde";
import { cn } from "@/lib/utils";

type Filtro = "nao_lidas" | "todas" | "arquivadas";

const filtros: { valor: Filtro; rotulo: string }[] = [
  { valor: "nao_lidas", rotulo: "Não lidas" },
  { valor: "todas", rotulo: "Todas" },
  { valor: "arquivadas", rotulo: "Arquivadas" },
];

const formatarData = (iso: string) =>
  new Date(iso).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

export function MensagensPanel() {
  const { data: mensagens, isLoading, isError } = useMensagens();
  const queryClient = useQueryClient();
  const [filtro, setFiltro] = useState<Filtro>("nao_lidas");
  const [processando, setProcessando] = useState<string | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  const lista = useMemo(() => {
    const todas = mensagens ?? [];
    if (filtro === "arquivadas") return todas.filter((m) => m.arquivada);
    if (filtro === "todas") return todas.filter((m) => !m.arquivada);
    return todas.filter((m) => !m.lida && !m.arquivada);
  }, [mensagens, filtro]);

  const naoLidas = (mensagens ?? []).filter(
    (m) => !m.lida && !m.arquivada,
  ).length;

  const alterar = async (
    id: string,
    dados: { lida?: boolean; arquivada?: boolean },
  ) => {
    setErro(null);
    setProcessando(id);
    try {
      await atualizarMensagem(id, dados);
      await queryClient.invalidateQueries({
        queryKey: ["verde", "mensagens"],
      });
    } catch {
      setErro("Não foi possível atualizar a mensagem.");
    } finally {
      setProcessando(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <span className="eyebrow">Contato do site</span>
          <h2 className="display-title mt-2 text-[clamp(1.4rem,2.6vw,1.9rem)]">
            Mensagens recebidas
          </h2>
          <p className="mt-2 text-[12.5px] leading-relaxed text-muted-foreground">
            {naoLidas === 0
              ? "Nenhuma mensagem aguardando leitura."
              : `${naoLidas} mensagem(ns) aguardando leitura.`}
          </p>
        </div>

        <div className="flex gap-1 rounded-[var(--radius)] border border-border p-1">
          {filtros.map((item) => (
            <button
              key={item.valor}
              type="button"
              onClick={() => setFiltro(item.valor)}
              className={cn(
                "rounded-[calc(var(--radius)-2px)] px-3 py-1.5 text-[11.5px] transition-colors",
                filtro === item.valor
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground",
              )}
            >
              {item.rotulo}
            </button>
          ))}
        </div>
      </div>

      {erro && (
        <p className="text-[12px] text-destructive" role="alert">
          {erro}
        </p>
      )}

      {isLoading && (
        <p className="text-[13px] text-muted-foreground">
          Carregando mensagens…
        </p>
      )}

      {isError && (
        <p className="rounded-[var(--radius)] border border-destructive/30 bg-destructive/5 p-4 text-[12.5px] text-destructive">
          Não foi possível carregar as mensagens.
        </p>
      )}

      {!isLoading && !isError && lista.length === 0 && (
        <div className="rounded-[var(--radius)] border border-dashed border-border p-8 text-center">
          <Inbox className="mx-auto h-5 w-5 text-moss" />
          <p className="mt-4 font-display text-[18px]">Caixa vazia</p>
          <p className="mx-auto mt-2 max-w-sm text-[12.5px] leading-relaxed text-muted-foreground">
            As mensagens enviadas pelo formulário público aparecem aqui assim que
            forem registradas.
          </p>
        </div>
      )}

      <div className="space-y-3">
        {lista.map((mensagem) => (
          <article
            key={mensagem.id}
            className={cn(
              "rounded-[var(--radius)] border border-border bg-card p-5",
              !mensagem.lida && "border-l-2 border-l-moss",
            )}
          >
            <div className="flex flex-wrap items-start justify-between gap-3">
              <div className="min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <p className="text-[14px] font-medium">{mensagem.nome}</p>
                  <span className="rounded-full border border-border px-2 py-0.5 font-mono text-[8.5px] uppercase tracking-[0.12em] text-muted-foreground">
                    {rotulo(assuntosContato, mensagem.assunto)}
                  </span>
                  {!mensagem.lida && (
                    <span className="font-mono text-[8.5px] uppercase tracking-[0.12em] text-moss">
                      nova
                    </span>
                  )}
                </div>
                <p className="mt-1 text-[11.5px] text-muted-foreground">
                  <a
                    href={`mailto:${mensagem.email}`}
                    className="underline-offset-4 hover:underline"
                  >
                    {mensagem.email}
                  </a>
                  {mensagem.organizacao ? ` · ${mensagem.organizacao}` : ""}
                  {mensagem.telefone ? ` · ${mensagem.telefone}` : ""}
                </p>
              </div>
              <span className="font-mono text-[10px] text-muted-foreground">
                {formatarData(mensagem.criado_em)}
              </span>
            </div>

            <p className="mt-4 whitespace-pre-line border-t border-border/70 pt-4 text-[13px] leading-relaxed text-muted-foreground">
              {mensagem.mensagem}
            </p>

            <div className="mt-4 flex items-center gap-1.5">
              {processando === mensagem.id && (
                <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />
              )}
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  alterar(mensagem.id, { lida: !mensagem.lida })
                }
              >
                {mensagem.lida ? <Mail /> : <MailOpen />}
                {mensagem.lida ? "Marcar como não lida" : "Marcar como lida"}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() =>
                  alterar(mensagem.id, { arquivada: !mensagem.arquivada })
                }
              >
                {mensagem.arquivada ? <ArchiveRestore /> : <Archive />}
                {mensagem.arquivada ? "Restaurar" : "Arquivar"}
              </Button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
