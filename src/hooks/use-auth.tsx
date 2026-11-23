import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import type { Session, User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";

export type PerfilEquipe = {
  id: string;
  nome: string;
  email: string | null;
  papel: string;
  aprovado: boolean;
};

type ContextoAuth = {
  usuario: User | null;
  sessao: Session | null;
  perfil: PerfilEquipe | null;
  carregando: boolean;
  sair: () => Promise<void>;
  recarregarPerfil: () => Promise<void>;
};

const AuthContext = createContext<ContextoAuth | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<User | null>(null);
  const [sessao, setSessao] = useState<Session | null>(null);
  const [perfil, setPerfil] = useState<PerfilEquipe | null>(null);
  const [carregando, setCarregando] = useState(true);

  const carregarPerfil = useCallback(async (id: string) => {
    const { data } = await supabase
      .from("verde_perfis")
      .select("id, nome, email, papel, aprovado")
      .eq("id", id)
      .maybeSingle();
    setPerfil(data ?? null);
  }, []);

  useEffect(() => {
    let ativo = true;

    const { data: assinatura } = supabase.auth.onAuthStateChange(
      (_evento, novaSessao) => {
        if (!ativo) return;
        setSessao(novaSessao);
        setUsuario(novaSessao?.user ?? null);

        if (novaSessao?.user) {
          const id = novaSessao.user.id;
          setTimeout(() => {
            if (ativo) void carregarPerfil(id);
          }, 0);
        } else {
          setPerfil(null);
        }
      },
    );

    supabase.auth
      .getSession()
      .then(({ data }) => {
        if (!ativo) return;
        setSessao(data.session);
        setUsuario(data.session?.user ?? null);
        if (data.session?.user) void carregarPerfil(data.session.user.id);
        setCarregando(false);
      })
      .catch(() => {
        if (ativo) setCarregando(false);
      });

    return () => {
      ativo = false;
      assinatura.subscription.unsubscribe();
    };
  }, [carregarPerfil]);

  const sair = useCallback(async () => {
    await supabase.auth.signOut();
    setPerfil(null);
  }, []);

  const recarregarPerfil = useCallback(async () => {
    if (usuario) await carregarPerfil(usuario.id);
  }, [carregarPerfil, usuario]);

  return (
    <AuthContext.Provider
      value={{ usuario, sessao, perfil, carregando, sair, recarregarPerfil }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const contexto = useContext(AuthContext);
  if (!contexto) {
    throw new Error("useAuth precisa estar dentro de AuthProvider.");
  }
  return contexto;
}
