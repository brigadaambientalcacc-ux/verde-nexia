import { useState, type FormEvent } from "react";
import {
  CheckCircle2,
  Loader2,
  Mail,
  MapPin,
  Send,
  ShieldCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PageHeader } from "@/components/verde/page-header";
import { instituicao } from "@/data/conteudo";
import { assuntosContato, enviarMensagem, rotulo } from "@/lib/verde";

type Campos = {
  nome: string;
  organizacao: string;
  email: string;
  telefone: string;
  assunto: string;
  mensagem: string;
};

const vazio: Campos = {
  nome: "",
  organizacao: "",
  email: "",
  telefone: "",
  assunto: "parceria",
  mensagem: "",
};

export default function Contato() {
  const [campos, setCampos] = useState<Campos>(vazio);
  const [erros, setErros] = useState<Partial<Record<keyof Campos, string>>>({});
  const [enviando, setEnviando] = useState(false);
  const [enviado, setEnviado] = useState(false);
  const [falha, setFalha] = useState<string | null>(null);

  const atualizar = (campo: keyof Campos, valor: string) => {
    setCampos((atual) => ({ ...atual, [campo]: valor }));
    setErros((atual) => ({ ...atual, [campo]: undefined }));
  };

  const validar = () => {
    const novos: Partial<Record<keyof Campos, string>> = {};
    if (campos.nome.trim().length < 3) {
      novos.nome = "Informe seu nome completo.";
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(campos.email.trim())) {
      novos.email = "Informe um e-mail válido.";
    }
    if (campos.mensagem.trim().length < 20) {
      novos.mensagem = "Descreva o assunto com pelo menos 20 caracteres.";
    }
    setErros(novos);
    return Object.keys(novos).length === 0;
  };

  const enviar = async (evento: FormEvent) => {
    evento.preventDefault();
    setFalha(null);
    if (!validar()) return;

    setEnviando(true);
    try {
      await enviarMensagem({
        nome: campos.nome.trim(),
        organizacao: campos.organizacao.trim() || null,
        email: campos.email.trim(),
        telefone: campos.telefone.trim() || null,
        assunto: campos.assunto,
        mensagem: campos.mensagem.trim(),
      });
      setEnviado(true);
      setCampos(vazio);
    } catch {
      setFalha(
        "Não foi possível registrar sua mensagem agora. Verifique sua conexão e tente novamente.",
      );
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div>
      <PageHeader
        eyebrow="Contato"
        titulo="Falar com a coordenação do programa"
        descricao="Use este canal para propor cooperação científica, apresentar interesse em financiamento de PD&I, solicitar informações institucionais ou falar com a imprensa."
      />

      <section className="container-page py-14 sm:py-20">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          {/* Formulário */}
          <div className="rounded-[var(--radius)] border border-border bg-card p-6 shadow-card sm:p-8">
            {enviado ? (
              <div className="flex flex-col items-start py-6">
                <CheckCircle2 className="h-8 w-8 text-moss" />
                <h2 className="display-title mt-5 text-[clamp(1.5rem,2.6vw,2rem)]">
                  Mensagem registrada
                </h2>
                <p className="mt-3 max-w-md text-[14px] leading-relaxed text-muted-foreground">
                  Sua mensagem foi enviada para a equipe do programa. O retorno
                  depende da análise interna e não representa aprovação de
                  parceria, financiamento ou projeto.
                </p>
                <Button
                  variant="outline"
                  className="mt-7"
                  onClick={() => setEnviado(false)}
                >
                  Enviar outra mensagem
                </Button>
              </div>
            ) : (
              <form onSubmit={enviar} noValidate className="space-y-5">
                <div>
                  <span className="eyebrow">Formulário</span>
                  <h2 className="display-title mt-3 text-[clamp(1.35rem,2.4vw,1.75rem)]">
                    Envie sua mensagem
                  </h2>
                </div>

                <div className="grid gap-5 sm:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="nome">Nome completo *</Label>
                    <Input
                      id="nome"
                      value={campos.nome}
                      onChange={(e) => atualizar("nome", e.target.value)}
                      placeholder="Como devemos chamar você"
                      aria-invalid={Boolean(erros.nome)}
                    />
                    {erros.nome && (
                      <p className="text-[11.5px] text-destructive">
                        {erros.nome}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="organizacao">Instituição ou empresa</Label>
                    <Input
                      id="organizacao"
                      value={campos.organizacao}
                      onChange={(e) => atualizar("organizacao", e.target.value)}
                      placeholder="Opcional"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">E-mail *</Label>
                    <Input
                      id="email"
                      type="email"
                      value={campos.email}
                      onChange={(e) => atualizar("email", e.target.value)}
                      placeholder="nome@instituicao.org"
                      aria-invalid={Boolean(erros.email)}
                    />
                    {erros.email && (
                      <p className="text-[11.5px] text-destructive">
                        {erros.email}
                      </p>
                    )}
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input
                      id="telefone"
                      value={campos.telefone}
                      onChange={(e) => atualizar("telefone", e.target.value)}
                      placeholder="Opcional"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="assunto">Assunto</Label>
                  <Select
                    value={campos.assunto}
                    onValueChange={(valor) => atualizar("assunto", valor)}
                  >
                    <SelectTrigger id="assunto">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      {assuntosContato.map((assunto) => (
                        <SelectItem key={assunto.valor} value={assunto.valor}>
                          {assunto.rotulo}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="mensagem">Mensagem *</Label>
                  <Textarea
                    id="mensagem"
                    rows={6}
                    value={campos.mensagem}
                    onChange={(e) => atualizar("mensagem", e.target.value)}
                    placeholder="Descreva sua proposta, dúvida ou solicitação."
                    aria-invalid={Boolean(erros.mensagem)}
                  />
                  {erros.mensagem && (
                    <p className="text-[11.5px] text-destructive">
                      {erros.mensagem}
                    </p>
                  )}
                </div>

                {falha && (
                  <p
                    role="alert"
                    className="rounded-[var(--radius)] border border-destructive/30 bg-destructive/5 px-4 py-3 text-[12.5px] leading-relaxed text-destructive"
                  >
                    {falha}
                  </p>
                )}

                <div className="flex flex-col gap-3 border-t border-border pt-5 sm:flex-row sm:items-center sm:justify-between">
                  <p className="flex items-center gap-2 text-[11px] text-muted-foreground">
                    <ShieldCheck className="h-3.5 w-3.5 text-moss" />
                    Seus dados são usados apenas para este atendimento.
                  </p>
                  <Button type="submit" disabled={enviando}>
                    {enviando ? <Loader2 className="animate-spin" /> : <Send />}
                    {enviando ? "Enviando…" : "Enviar mensagem"}
                  </Button>
                </div>
              </form>
            )}
          </div>

          {/* Informações */}
          <aside className="space-y-4">
            <div className="surface-forest rounded-[var(--radius)] p-6 sm:p-7">
              <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-[hsl(var(--moss-bright))]">
                Dados institucionais
              </span>
              <ul className="mt-5 space-y-4 text-[13px] text-[hsl(var(--paper)/0.78)]">
                <li>
                  <span className="block font-mono text-[9px] uppercase tracking-[0.14em] text-[hsl(var(--paper)/0.45)]">
                    Proponente
                  </span>
                  {instituicao.proponente}
                </li>
                <li>
                  <span className="block font-mono text-[9px] uppercase tracking-[0.14em] text-[hsl(var(--paper)/0.45)]">
                    CNPJ
                  </span>
                  {instituicao.cnpj}
                </li>
                <li className="flex gap-2">
                  <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[hsl(var(--moss-bright))]" />
                  {instituicao.municipio}
                </li>
                <li>
                  <span className="block font-mono text-[9px] uppercase tracking-[0.14em] text-[hsl(var(--paper)/0.45)]">
                    Coordenação executiva
                  </span>
                  {instituicao.responsavel}
                </li>
                <li>
                  <span className="block font-mono text-[9px] uppercase tracking-[0.14em] text-[hsl(var(--paper)/0.45)]">
                    Referência
                  </span>
                  {instituicao.referencia}
                </li>
              </ul>
            </div>

            <div className="rounded-[var(--radius)] border border-border bg-card p-6">
              <Mail className="h-4 w-4 text-moss" />
              <p className="mt-4 text-[13.5px] font-medium">
                Temas de interesse
              </p>
              <ul className="mt-3 space-y-2">
                {assuntosContato.slice(0, 4).map((assunto) => (
                  <li
                    key={assunto.valor}
                    className="flex gap-2 text-[12.5px] leading-relaxed text-muted-foreground"
                  >
                    <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-moss" />
                    {rotulo(assuntosContato, assunto.valor)}
                  </li>
                ))}
              </ul>
            </div>

            <p className="rounded-[var(--radius)] border border-border bg-secondary/50 p-5 text-[11.5px] leading-relaxed text-muted-foreground">
              O envio de mensagem não constitui proposta aceita, parceria
              firmada, contratação ou autorização de acesso a áreas protegidas.
              Cada cooperação depende de análise institucional e instrumento
              próprio.
            </p>
          </aside>
        </div>
      </section>
    </div>
  );
}
