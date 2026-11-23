import { Link } from "react-router-dom";
import { ArrowUpRight, Mail, MapPin } from "lucide-react";
import { Marca, TopoBackdrop } from "@/components/verde/marca";
import { instituicao, navegacao } from "@/data/conteudo";

export function SiteFooter() {
  return (
    <footer className="surface-forest relative mt-auto overflow-hidden">
      <TopoBackdrop className="pointer-events-none absolute inset-0 h-full w-full text-[hsl(var(--paper))] opacity-[0.07]" />
      <div className="container-wide relative">
        <div className="grid gap-12 py-16 md:grid-cols-[1.4fr_1fr_1fr] md:gap-10 lg:py-20">
          <div>
            <Link to="/" className="inline-flex items-center gap-3">
              <Marca className="h-10 w-10 text-[hsl(var(--moss-bright))]" />
              <span className="flex flex-col leading-none">
                <span className="font-display text-xl tracking-tight">
                  Verde Nexia
                </span>
                <span className="mt-1.5 font-mono text-[9px] uppercase tracking-[0.2em] text-[hsl(var(--paper)/0.6)]">
                  {instituicao.assinatura}
                </span>
              </span>
            </Link>
            <p className="mt-6 max-w-sm text-sm leading-relaxed text-[hsl(var(--paper)/0.72)]">
              Estrutura integrada de pesquisa, desenvolvimento e inovação
              tecnológica voltada ao monitoramento e à conservação ambiental no
              território fluminense.
            </p>
            <p className="mt-6 font-mono text-[10px] uppercase leading-relaxed tracking-[0.18em] text-[hsl(var(--paper)/0.5)]">
              {instituicao.proponente}
              <br />
              CNPJ {instituicao.cnpj}
            </p>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[hsl(var(--moss-bright))]">
              Navegação
            </p>
            <ul className="mt-5 space-y-3">
              {navegacao.map((item) => (
                <li key={item.href}>
                  <Link
                    to={item.href}
                    className="text-sm text-[hsl(var(--paper)/0.75)] transition-colors hover:text-[hsl(var(--paper))]"
                  >
                    {item.rotulo}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-[hsl(var(--moss-bright))]">
              Contato institucional
            </p>
            <ul className="mt-5 space-y-4 text-sm text-[hsl(var(--paper)/0.75)]">
              <li className="flex gap-2.5">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--moss-bright))]" />
                <span>
                  {instituicao.municipio}
                  <br />
                  Implantação inicial do programa
                </span>
              </li>
              <li className="flex gap-2.5">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-[hsl(var(--moss-bright))]" />
                <Link
                  to="/contato"
                  className="underline-offset-4 hover:underline"
                >
                  Enviar mensagem à equipe
                </Link>
              </li>
              <li>
                <Link
                  to="/area-tecnica"
                  className="inline-flex items-center gap-1.5 font-mono text-[10px] uppercase tracking-[0.18em] text-[hsl(var(--paper)/0.55)] transition-colors hover:text-[hsl(var(--paper))]"
                >
                  Área técnica
                  <ArrowUpRight className="h-3 w-3" />
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-[hsl(var(--paper)/0.14)] py-6">
          <p className="max-w-3xl text-[11px] leading-relaxed text-[hsl(var(--paper)/0.5)]">
            Documento de referência: {instituicao.referencia}. As informações
            descrevem um programa em estruturação; não representam operação já
            implantada, contratação efetivada, parceria firmada ou certificação
            ambiental emitida.
          </p>
          <div className="mt-4 flex flex-col gap-2 text-[11px] text-[hsl(var(--paper)/0.45)] sm:flex-row sm:items-center sm:justify-between">
            <span>
              © {new Date().getFullYear()} {instituicao.proponente}
            </span>
            <span className="font-mono uppercase tracking-[0.16em]">
              Responsável executivo · {instituicao.responsavel}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}
