-- Programa Verde Nexia: perfis de equipe, areas monitoradas, sensores e mensagens de contato

create table public.verde_perfis (
  id uuid primary key references auth.users(id) on delete cascade,
  nome text not null default '',
  email text,
  papel text not null default 'membro' check (papel in ('admin','membro')),
  aprovado boolean not null default false,
  criado_em timestamptz not null default now()
);

alter table public.verde_perfis enable row level security;

create or replace function public.verde_eh_admin(uid uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.verde_perfis p
    where p.id = uid and p.papel = 'admin' and p.aprovado = true
  );
$$;

create or replace function public.verde_eh_membro(uid uuid)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1 from public.verde_perfis p
    where p.id = uid and p.aprovado = true
  );
$$;

create policy "perfil_proprio_ou_equipe" on public.verde_perfis
  for select to authenticated
  using (id = auth.uid() or public.verde_eh_membro(auth.uid()));

create policy "admin_atualiza_perfis" on public.verde_perfis
  for update to authenticated
  using (public.verde_eh_admin(auth.uid()))
  with check (public.verde_eh_admin(auth.uid()));

create or replace function public.verde_criar_perfil()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  v_primeiro boolean;
begin
  select not exists (select 1 from public.verde_perfis) into v_primeiro;

  insert into public.verde_perfis (id, nome, email, papel, aprovado)
  values (
    new.id,
    coalesce(nullif(new.raw_user_meta_data->>'nome', ''), split_part(coalesce(new.email, ''), '@', 1)),
    new.email,
    case when v_primeiro then 'admin' else 'membro' end,
    v_primeiro
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

create trigger verde_on_auth_user_created
  after insert on auth.users
  for each row execute function public.verde_criar_perfil();

-- Areas monitoradas
create table public.verde_areas (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  tipo text not null default 'outro',
  municipio text not null default 'Mesquita',
  bairro text,
  extensao_ha numeric(12,2),
  latitude numeric(9,6),
  longitude numeric(9,6),
  estagio text not null default 'planejada' check (estagio in ('planejada','levantamento','ativa','suspensa')),
  orgao_gestor text,
  observacoes text,
  arquivada boolean not null default false,
  criado_por uuid references auth.users(id) on delete set null,
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now()
);

alter table public.verde_areas enable row level security;

create policy "equipe_le_areas" on public.verde_areas
  for select to authenticated
  using (public.verde_eh_membro(auth.uid()));

create policy "equipe_cria_areas" on public.verde_areas
  for insert to authenticated
  with check (public.verde_eh_membro(auth.uid()) and criado_por = auth.uid());

create policy "equipe_edita_areas" on public.verde_areas
  for update to authenticated
  using (public.verde_eh_membro(auth.uid()))
  with check (public.verde_eh_membro(auth.uid()));

-- Sensores
create table public.verde_sensores (
  id uuid primary key default gen_random_uuid(),
  area_id uuid references public.verde_areas(id) on delete set null,
  codigo text not null,
  tipo text not null default 'temperatura',
  situacao text not null default 'instalado' check (situacao in ('instalado','operacional','manutencao','inativo')),
  ultima_verificacao date,
  observacoes text,
  criado_por uuid references auth.users(id) on delete set null,
  criado_em timestamptz not null default now(),
  atualizado_em timestamptz not null default now()
);

alter table public.verde_sensores enable row level security;

create policy "equipe_le_sensores" on public.verde_sensores
  for select to authenticated
  using (public.verde_eh_membro(auth.uid()));

create policy "equipe_cria_sensores" on public.verde_sensores
  for insert to authenticated
  with check (public.verde_eh_membro(auth.uid()) and criado_por = auth.uid());

create policy "equipe_edita_sensores" on public.verde_sensores
  for update to authenticated
  using (public.verde_eh_membro(auth.uid()))
  with check (public.verde_eh_membro(auth.uid()));

-- Mensagens de contato
create table public.verde_mensagens (
  id uuid primary key default gen_random_uuid(),
  nome text not null,
  organizacao text,
  email text not null,
  telefone text,
  assunto text not null default 'parceria',
  mensagem text not null,
  lida boolean not null default false,
  arquivada boolean not null default false,
  criado_em timestamptz not null default now()
);

alter table public.verde_mensagens enable row level security;

create policy "publico_envia_mensagem" on public.verde_mensagens
  for insert to anon, authenticated
  with check (true);

create policy "equipe_le_mensagens" on public.verde_mensagens
  for select to authenticated
  using (public.verde_eh_membro(auth.uid()));

create policy "equipe_atualiza_mensagens" on public.verde_mensagens
  for update to authenticated
  using (public.verde_eh_membro(auth.uid()))
  with check (public.verde_eh_membro(auth.uid()));

-- Leitura publica sem coordenadas
create or replace view public.verde_areas_publicas
with (security_invoker = false) as
select id, nome, tipo, municipio, bairro, extensao_ha, estagio, orgao_gestor
from public.verde_areas
where arquivada = false;

grant select on public.verde_areas_publicas to anon, authenticated;

-- Indicadores publicos
create or replace view public.verde_indicadores_publicos
with (security_invoker = false) as
select
  (select count(*) from public.verde_areas where arquivada = false)::int as areas_total,
  (select count(*) from public.verde_areas where arquivada = false and estagio = 'ativa')::int as areas_ativas,
  coalesce((select sum(extensao_ha) from public.verde_areas where arquivada = false), 0)::numeric as extensao_ha,
  (select count(*) from public.verde_sensores)::int as sensores_total,
  (select count(*) from public.verde_sensores where situacao in ('instalado','operacional','manutencao'))::int as sensores_instalados,
  (select count(*) from public.verde_sensores where situacao = 'operacional')::int as sensores_operacionais;

grant select on public.verde_indicadores_publicos to anon, authenticated;
