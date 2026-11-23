import { useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Clock,
  LayoutDashboard,
  LogOut,
  MapPinned,
  MessageSquare,
  RadioTower,
  ShieldCheck,
  Users,
} from "lucide-react";
import { AuthPanel } from "@/components/area-tecnica/auth-panel";
import { AreasPanel } from "@/components/area-tecnica/areas-panel";
import { EquipePanel } from "@/components/area-tecnica/equipe-panel";
import { MensagensPanel } from "@/components/area-tecnica/mensagens-panel";
import { SensoresPanel } from "@/components/area-tecnica/sensores-panel";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Marca } from "@/components/verde/marca";
import { useAuth } from "@/hooks/use-auth";

export default function AreaTecnica() {
  const { usuario, perfil, carregando, sair, recarregarPerfil } = useAuth();
  const [recarregando, setRecarregando] = useState(false);

  if (carregando) {
    return (
      <div className="container-page flex min-h-[50vh] items-center justify-center py-20">
        <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-muted-foreground">
          Carregando acesso…
        </p>
      </div>
    );
  }

  if (!usuario) {
    return (
      <div>
        <div className="border-b border-border bg-secondary/40">
          <div className="container-page py-5">
            <Link
              to="/"
              className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Voltar ao site
            </Link>
          </div>
        </div>
        <AuthPanel />
      </div>
    );
  }

  if (!perfil) {
    return (
      <div className="container-page flex min-h-[55vh] flex-col items-center justify-center py-20 text-center">
        <Marca className="h-12 w-12 text-moss" />
        <h1 className="display-title mt-6 text-[clamp(1.6rem,3vw,2.2rem)]">
          Perfil não localizado
        </h1>
        <p className="mt-3 max-w-md text-[13.5px] leading-relaxed text-muted-foreground">
          Sua conta existe, mas o registro de equipe ainda não foi carregado.
          Tente novamente em alguns instantes.
        </p>
        <div className="mt-6 flex gap-2">
          <Button
            variant="outline"
            disabled={recarregando}
            onClick={async () => {
              setRecarregando(true);
              await recarregarPerfil();
              setRecarregando(false);
            }}
          >
            Verificar novamente
          </Button>
          <Button variant="ghost" onClick={() => void sair()}>
            Sair
          </Button>
        </div>
      </div>
    );
  }

  if (!perfil.aprovado) {
    return (
      <div className="container-page flex min-h-[55vh] flex-col items-center justify-center py-20 text-center">
        <Clock className="h-8 w-8 text-ember" />
        <h1 className="display-title mt-6 text-[clamp(1.6rem,3vw,2.2rem)]">
          Acesso aguardando liberação
        </h1>
        <p className="mt-3 max-w-md text-[13.5px] leading-relaxed text-muted-foreground">
          A conta {perfil.email ?? ""} foi criada, mas ainda não foi aprovada por
          um administrador. Assim que o acesso for liberado, esta área passa a
          exibir os cadastros do programa.
        </p>
        <Button variant="outline" className="mt-6" onClick={() => void sair()}>
          <LogOut />
          Sair
        </Button>
      </div>
    );
  }

  const ehAdmin = perfil.papel === "admin";

  return (
    <div>
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-gradient-to-b from-secondary/70 to-background" />
        <div className="hairline-grid absolute inset-0 opacity-30" />
        <div className="container-page relative py-10 sm:py-14">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Link
                to="/"
                className="inline-flex items-center gap-2 font-mono text-[10px] uppercase tracking-[0.18em] text-muted-foreground transition-colors hover:text-foreground"
              >
                <ArrowLeft className="h-3.5 w-3.5" />
                Voltar ao site
              </Link>
              <div className="mt-5 flex items-center gap-3">
                <span className="h-px w-8 bg-moss" />
                <span className="eyebrow">Área técnica</span>
              </div>
              <h1 className="display-title mt-4 text-[clamp(1.9rem,4vw,2.8rem)]">
                Painel de cadastros
              </h1>
              <p className="mt-3 text-[13px] leading-relaxed text-muted-foreground">
                {perfil.nome}
                {" · "}
                <span className="inline-flex items-center gap-1.5">
                  {ehAdmin ? (
                    <ShieldCheck className="h-3.5 w-3.5 text-moss" />
                  ) : (
                    <Users className="h-3.5 w-3.5 text-moss" />
                  )}
                  {ehAdmin ? "Administrador" : "Membro da equipe"}
                </span>
              </p>
            </div>

            <Button variant="outline" size="sm" onClick={() => void sair()}>
              <LogOut />
              Sair da conta
            </Button>
          </div>
        </div>
      </section>

      <section className="container-page py-10 sm:py-14">
        <Tabs defaultValue="areas">
          <TabsList
            className={
              ehAdmin
                ? "grid h-auto w-full grid-cols-2 gap-1 bg-secondary/60 p-1 sm:w-auto sm:grid-cols-4"
                : "grid h-auto w-full grid-cols-3 gap-1 bg-secondary/60 p-1 sm:w-auto"
            }
          >
            <TabsTrigger value="areas" className="gap-1.5 text-[12px]">
              <MapPinned className="h-3.5 w-3.5" />
              Áreas
            </TabsTrigger>
            <TabsTrigger value="sensores" className="gap-1.5 text-[12px]">
              <RadioTower className="h-3.5 w-3.5" />
              Sensores
            </TabsTrigger>
            <TabsTrigger value="mensagens" className="gap-1.5 text-[12px]">
              <MessageSquare className="h-3.5 w-3.5" />
              Mensagens
            </TabsTrigger>
            {ehAdmin && (
              <TabsTrigger value="equipe" className="gap-1.5 text-[12px]">
                <Users className="h-3.5 w-3.5" />
                Equipe
              </TabsTrigger>
            )}
          </TabsList>

          <div className="mt-8">
            <TabsContent value="areas" className="mt-0">
              <AreasPanel usuarioId={usuario.id} />
            </TabsContent>
            <TabsContent value="sensores" className="mt-0">
              <SensoresPanel usuarioId={usuario.id} />
            </TabsContent>
            <TabsContent value="mensagens" className="mt-0">
              <MensagensPanel />
            </TabsContent>
            {ehAdmin && (
              <TabsContent value="equipe" className="mt-0">
                <EquipePanel perfilAtualId={perfil.id} />
              </TabsContent>
            )}
          </div>
        </Tabs>

        <div className="mt-12 flex gap-3 rounded-[var(--radius)] border border-border bg-secondary/40 p-5">
          <LayoutDashboard className="mt-0.5 h-4 w-4 shrink-0 text-moss" />
          <p className="text-[12px] leading-relaxed text-muted-foreground">
            O que é cadastrado aqui alimenta imediatamente os indicadores
            públicos do programa. Coordenadas e observações internas permanecem
            restritas à equipe.
          </p>
        </div>
      </section>
    </div>
  );
}
