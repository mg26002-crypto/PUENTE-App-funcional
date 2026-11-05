-- Esquema opcional/legacy para guardar actividades en Supabase.
-- La app actual guarda actividades en MockAPI (/centros, categoria = 'actividad')
-- y no ejecuta este archivo. Usa estas políticas solo si se migra el guardado a Supabase.
create table if not exists public.actividades (
  id uuid primary key default gen_random_uuid(),
  client_id text not null,
  user_id uuid not null default auth.uid() references auth.users (id) on delete cascade,
  usuario text not null default (auth.jwt() ->> 'email'),
  tipo text not null check (tipo in ('donacion', 'postulacion')),
  titulo text not null,
  detalle text not null,
  created_at timestamptz not null default now(),
  constraint actividades_user_client_unique unique (user_id, client_id)
);

alter table public.actividades enable row level security;
alter table public.actividades force row level security;

revoke all on table public.actividades from public, anon, authenticated;

grant select (id, client_id, user_id, usuario, tipo, titulo, detalle, created_at)
  on table public.actividades to authenticated;
grant insert (client_id, tipo, titulo, detalle)
  on table public.actividades to authenticated;

drop policy if exists "Users read own activities and admins read all"
  on public.actividades;
create policy "Users read own activities and admins read all"
  on public.actividades
  for select
  to authenticated
  using (
    user_id = (select auth.uid())
    or (select auth.jwt() -> 'app_metadata' ->> 'role') = 'administrador'
  );

drop policy if exists "Authorized users create activities as themselves"
  on public.actividades;
create policy "Authorized users create activities as themselves"
  on public.actividades
  for insert
  to authenticated
  with check (
    user_id = (select auth.uid())
    and (select auth.jwt() -> 'app_metadata' ->> 'role')
      in ('administrador', 'voluntariado')
  );
