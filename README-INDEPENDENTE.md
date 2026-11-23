# Verde Nexia — versão independente do Enter

Esta é uma **adaptação técnica do código-fonte original**, não um site já compilado ou hospedado.
O backup original dos 74 arquivos foi preservado separadamente.

## Alterações realizadas
- Plugins de desenvolvimento e analytics exclusivos do Enter removidos da execução e do package.json.
- `vite.config.ts` usa o plugin React oficial com alias `@` e porta local `8080`.
- `.npmrc` aponta ao registro público do npm.
- Supabase recebe URL e chave publicável via variáveis `VITE_SUPABASE_*` (sem vincular ao EnterCloud).
- Código original de análise foi conservado como `src/analytics.enter-original.ts.txt` apenas para referência.
- As migrações SQL originais estão em `supabase/migrations/`.

## Para executar no computador
1. Instale Node.js 22 LTS ou uma versão compatível com Vite 7 e pnpm.
2. Na pasta do projeto, execute `corepack enable` e `pnpm install`.
3. Copie `.env.example` para `.env.local` e preencha com URL e chave **anon/publishable** de um projeto Supabase sob seu controle.
4. Aplique as migrações SQL em um banco Supabase de testes após **revisão de segurança**.
5. Execute `pnpm dev` e abra `http://localhost:8080`.
6. Para verificar e gerar arquivos de publicação, execute `pnpm build`; a saída será `dist/`.

## Avisos importantes
- Esta versão **não foi compilada aqui**: o ambiente de teste não conseguiu acessar registry.npmjs.org para instalar dependências.
- Os arquivos de frontend não contêm os registros de usuários, áreas, sensores e mensagens da base EnterCloud. Para migrá-los, precisa de exportação autorizada e segura.
- Revise o SQL antes de aplicar: o primeiro usuário pode se tornar administrador; views públicas possuem `security_invoker=false`.
- Não compartilhe `.env.local`, credenciais secretas, service_role ou dumps com dados pessoais.
- Para hospedagem SPA com rotas do React Router, configure fallback das requisições de rota para `/index.html`.
- Se a hospedagem for somente estática, ainda será necessário um Supabase ativo para autenticação e funções de dados.
