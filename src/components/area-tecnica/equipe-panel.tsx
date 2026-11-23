import { useState } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { Check, Loader2, ShieldCheck, UserRound, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { usePerfis } from "@/hooks/use-verde";
import { atualizarPerfil } from "@/lib/verde";
import { cn } from "@/lib/utils";

export function EquipePanel({ perfilAtualId }: { perfilAtualId: string }) {
  const { data: perfis, isLoading, isError } = usePerfis();
  const queryClient = useQueryClient();
  const [processando, setProcessando] = useState<string | null>(null);
  const [erro, setErro] = useState<string | null>(null);

  const alterar = async (
    id: string,
    dados: { aprovado?: boolean; papel?: string },
  ) => {
    setErro(null);
    setProcessando(id);
    try {
      await atualizarPerfil(id, dados);
      await queryClient.invalidateQueries({ queryKey: ["verde", "perfis"] });
    } catch {
      setErro(
        "Não foi possível atualizar o acesso. Somente administradores podem liberar contas.",
      );
    } finally {
      setProcessando(null);
    }
  };

  const pendentes = (perfis ?? []).filter((perfil) => !perfil.aprovado).length;

  return (
    <div className="space-y-6">
      <div>
        <span className="eyebrow">Acessos</span>
        <h2 className="display-title mt-2 text-[clamp(1.4rem,2.6vw,1.9rem)]">
          Equipe técnica
        </h2>
        <p className="mt-2 max-w-xl text-[12.5px] leading-relaxed text-muted-foreground">
          Apenas contas aprovadas podem cadastrar áreas, registrar sensores e ler
          mensagens. {pendentes > 0 ? `${pendentes} conta(s) aguardando liberação.` : "Nenhuma conta pendente."}
        </p>
      </div>

      {erro && (
        <p className="text-[12px] text-destructive" role="alert">
          {erro}
        </p>
      )}

      {isLoading && (
        <p className="text-[13px] text-muted-foreground">Carregando equipe…</p>
      )}

      {isError && (
        <p className="rounded-[var(--radius)] border border-destructive/30 bg-destructive/5 p-4 text-[12.5px] text-destructive">
          Não foi possível carregar a lista de acessos.
        </p>
      )}

      <div className="overflow-hidden rounded-[var(--radius)] border border-border bg-card">
        {perfis?.map((perfil) => {
          const proprio = perfil.id === perfilAtualId;
          return (
            <div
              key={perfil.id}
              className="flex flex-col gap-3 border-b border-border p-4 last:border-b-0 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-start gap-3">
                <span
                  className={cn(
                    "mt-0.5 flex h-8 w-8 items-center justify-center rounded-full",
                    perfil.aprovado
                      ? "bg-moss/10 text-moss"
                      : "bg-secondary text-muted-foreground",
                  )}
                >
                  {perfil.papel === "admin" ? (
                    <ShieldCheck className="h-4 w-4" />
                  ) : (
                    <UserRound className="h-4 w-4" />
                  )}
                </span>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-[13.5px] font-medium">{perfil.nome}</p>
                    <span className="rounded-full border border-border px-2 py-0.5 font-mono text-[8.5px] uppercase tracking-[0.12em] text-muted-foreground">
                      {perfil.papel}
                    </span>
                    <span
                      className={cn(
                        "rounded-full border px-2 py-0.5 font-mono text-[8.5px] uppercase tracking-[0.12em]",
                        perfil.aprovado
                          ? "border-moss/30 bg-moss/10 text-moss"
                          : "border-ember/30 bg-ember/5 text-ember",
                      )}
                    >
                      {perfil.aprovado ? "ativo" : "pendente"}
                    </span>
                  </div>
                  <p className="mt-1 text-[11.5px] text-muted-foreground">
                    {perfil.email ?? "sem e-mail"}
                    {proprio ? " · sua conta" : ""}
                  </p>
                </div>
              </div>

              <div className="flex shrink-0 items-center gap-1.5">
                {processando === perfil.id && (
                  <Loader2 className="h-3.5 w-3.5 animate-spin text-muted-foreground" />
                )}
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={proprio}
                  onClick={() =>
                    alterar(perfil.id, { aprovado: !perfil.aprovado })
                  }
                >
                  {perfil.aprovado ? <X /> : <Check />}
                  {perfil.aprovado ? "Revogar" : "Aprovar"}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  disabled={proprio || !perfil.aprovado}
                  onClick={() =>
                    alterar(perfil.id, {
                      papel: perfil.papel === "admin" ? "membro" : "admin",
                    })
                  }
                >
                  {perfil.papel === "admin" ? "Tornar membro" : "Tornar admin"}
                </Button>
              </div>
            </div>
          );
        })}
      </div>

      <p className="text-[11px] leading-relaxed text-muted-foreground">
        Você não pode alterar o próprio papel ou revogar o próprio acesso. Isso
        evita que a área técnica fique sem administrador.
      </p>
    </div>
  );
}
