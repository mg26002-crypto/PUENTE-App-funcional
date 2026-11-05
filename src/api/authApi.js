import { supabase } from './supabaseClient';

// Adapta el usuario de Supabase al formato simple que usa la interfaz.
// El rol se lee de app_metadata, que solo puede asignar el servidor.
export function convertirUsuarioDeSesion(usuarioAuth) {
  const rol = usuarioAuth?.app_metadata?.role;
  if (!usuarioAuth || !['administrador', 'voluntariado'].includes(rol)) {
    return null;
  }

  return {
    id: usuarioAuth.id,
    correo: usuarioAuth.email,
    nombre: usuarioAuth.user_metadata?.full_name || usuarioAuth.email,
    rol,
  };
}

// Autentica correo y contraseña; rechaza y cierra sesión para roles no autorizados.
export async function iniciarSesionApi(correo, contrasena) {
  if (!supabase) {
    throw new Error('Configura Supabase en .env.local antes de iniciar sesión.');
  }

  const { data, error } = await supabase.auth.signInWithPassword({
    email: correo.trim().toLowerCase(),
    password: contrasena,
  });

  if (error) throw error;

  const usuario = convertirUsuarioDeSesion(data.user);
  if (!usuario) {
    await supabase.auth.signOut();
    throw new Error('Esta cuenta no tiene un rol autorizado en PUENTE.');
  }

  return usuario;
}

// Recupera la sesión persistida para mantener el acceso al volver a abrir la app.
export async function obtenerUsuarioDeSesion() {
  if (!supabase) return null;

  const { data, error } = await supabase.auth.getSession();
  if (error) throw error;

  const usuarioAuth = data.session?.user;
  const usuario = convertirUsuarioDeSesion(usuarioAuth);
  if (usuarioAuth && !usuario) {
    await supabase.auth.signOut();
  }

  return usuario;
}

// Cierra la sesión activa de Supabase.
export async function cerrarSesionApi() {
  if (!supabase) return;

  const { error } = await supabase.auth.signOut();
  if (error) throw error;
}
