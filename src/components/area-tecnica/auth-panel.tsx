import { useState, type FormEvent } from "react";
import { ArrowRight, Loader2, LockKeyhole, Mail, User } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Marca } from "@/components/verde/marca";

const traduzirErro = (mensagem: string) => {
  const texto = mensagem.toLowerCase();
  if (texto.includes("invalid login credentials")) {
    return "E-mail ou senha incorretos.";
  }
  if (texto.includes("already registered") || texto.includes("already exists")) {
    return "Este e-mail já possui conta. Use a aba Entrar.";
  }
  if (texto.includes("password") && texto.includes("6")) {
    return "A senha deve ter pelo menos 6 caracteres.";
  }
  return "Não foi possível concluir. Verifique os dados e tente novamente.";
};

export function AuthPanel() {
  const [modo, setModo] = useState("entrar");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState<string | null>(null);
  const [aviso, setAviso] = useState<string | null>(null);
  const [processando, setProcessando] = useState(false);

  const entrar = async (evento: FormEvent) => {
    evento.preventDefault();
    setErro(null);
    setProcessando(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password: senha,
    });
    if (error) setErro(traduzirErro(error.message));
    setProcessando(false);
  };

  const criar = async (evento: FormEvent) => {
    evento.preventDefault();
    setErro(null);
    setAviso(null);

    if (nome.trim().length < 3) {
      setErro("Informe seu nome completo.");
      return;
    }
    if (senha.length < 6) {
      setErro("A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    setProcessando(true);
    const { data, error } = await supabase.auth.signUp({
      email: email.trim(),
      password: senha,
      options: {
        data: { nome: nome.trim() },
        emailRedirectTo: `${window.location.origin}/`,
      },
    });

    if (error) {
      setErro(traduzirErro(error.message));
    } else if (data.session) {
      setAviso("Conta criada. Carregando área técnica…");
    } else {
      setAviso(
        "Conta criada. Confirme o e-mail institucional para acessar a área técnica.",
      );
    }
    setProcessando(false);
  };

  return (
    <div className="container-page py-14 sm:py-20">
      <div className="mx-auto grid max-w-4xl gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:gap-14">
        <div>
          <Marca className="h-12 w-12 text-moss" />
          <h1 className="display-title mt-6 text-[clamp(1.8rem,3.4vw,2.5rem)]">
            Área técnica do programa
          </h1>
          <p className="prose-verde mt-4">
            Espaço restrito à equipe do Verde Nexia para cadastrar áreas
            monitoradas, registrar sensores e responder mensagens recebidas pelo
            site.
          </p>

          <ul className="mt-8 space-y-3 border-t border-border pt-6">
            {[
              "Áreas e sensores alimentam os indicadores públicos",
              "Coordenadas precisas não são publicadas",
              "O primeiro cadastro cria a conta administradora",
            ].map((item) => (
              <li
                key={item}
                className="flex gap-2.5 text-[12.5px] leading-relaxed text-muted-foreground"
              >
                <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-moss" />
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-[var(--radius)] border border-border bg-card p-6 shadow-card sm:p-7">
          <Tabs
            value={modo}
            onValueChange={(valor) => {
              setModo(valor);
              setErro(null);
              setAviso(null);
            }}
          >
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="entrar">Entrar</TabsTrigger>
              <TabsTrigger value="criar">Criar conta</TabsTrigger>
            </TabsList>

            <TabsContent value="entrar">
              <form onSubmit={entrar} className="mt-6 space-y-4" noValidate>
                <div className="space-y-2">
                  <Label htmlFor="login-email">E-mail</Label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="login-email"
                      type="email"
                      required
                      autoComplete="email"
                      className="pl-9"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nome@instituicao.org"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="login-senha">Senha</Label>
                  <div className="relative">
                    <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="login-senha"
                      type="password"
                      required
                      autoComplete="current-password"
                      className="pl-9"
                      value={senha}
                      onChange={(e) => setSenha(e.target.value)}
                      placeholder="••••••••"
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={processando}>
                  {processando ? <Loader2 className="animate-spin" /> : null}
                  Entrar na área técnica
                  <ArrowRight />
                </Button>
              </form>
            </TabsContent>

            <TabsContent value="criar">
              <form onSubmit={criar} className="mt-6 space-y-4" noValidate>
                <div className="space-y-2">
                  <Label htmlFor="novo-nome">Nome completo</Label>
                  <div className="relative">
                    <User className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="novo-nome"
                      required
                      autoComplete="name"
                      className="pl-9"
                      value={nome}
                      onChange={(e) => setNome(e.target.value)}
                      placeholder="Nome do profissional"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="novo-email">E-mail institucional</Label>
                  <div className="relative">
                    <Mail className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="novo-email"
                      type="email"
                      required
                      autoComplete="email"
                      className="pl-9"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="nome@instituicao.org"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="nova-senha">Senha</Label>
                  <div className="relative">
                    <LockKeyhole className="pointer-events-none absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      id="nova-senha"
                      type="password"
                      required
                      minLength={6}
                      autoComplete="new-password"
                      className="pl-9"
                      value={senha}
                      onChange={(e) => setSenha(e.target.value)}
                      placeholder="Mínimo de 6 caracteres"
                    />
                  </div>
                </div>

                <Button type="submit" className="w-full" disabled={processando}>
                  {processando ? <Loader2 className="animate-spin" /> : null}
                  Criar conta
                  <ArrowRight />
                </Button>

                <p className="text-[11.5px] leading-relaxed text-muted-foreground">
                  A primeira conta criada é administradora e libera os demais
                  acessos. Contas seguintes aguardam aprovação.
                </p>
              </form>
            </TabsContent>
          </Tabs>

          {erro && (
            <p
              role="alert"
              className="mt-4 rounded-[var(--radius)] border border-destructive/30 bg-destructive/5 px-4 py-3 text-[12.5px] leading-relaxed text-destructive"
            >
              {erro}
            </p>
          )}
          {aviso && (
            <p
              role="status"
              className="mt-4 rounded-[var(--radius)] border border-moss/30 bg-moss/10 px-4 py-3 text-[12.5px] leading-relaxed text-foreground"
            >
              {aviso}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
