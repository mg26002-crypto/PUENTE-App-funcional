# Configurar el acceso opcional a Supabase

Las donaciones, postulaciones y centros se guardan/consultan en MockAPI. Supabase es opcional y solo habilita el inicio de sesión con cuentas reales. Sin Supabase, la app permite entrar con perfiles de demostración.

## Probar la aplicación sin configurar Supabase

La app puede ejecutarse sin credenciales. Para comprobar el guardado en línea:

1. Inicia el proyecto con `npm start` y ábrelo en Expo Go o en el navegador.
2. En la pantalla inicial, elige **Entrar como voluntario** para registrar una postulación o una donación.
3. Vuelve a **Perfil**, cierra la sesión y entra como administrador para revisar los registros en el panel. Pulsa **Actualizar actividad** para volver a consultar el servidor.
4. Comprueba la validación del formulario de donación dejándolo vacío y enviándolo.

La API actual no requiere credenciales. Las actividades se guardan en el recurso `/centros` con `categoria: "actividad"`; por eso no aparecen en la lista de centros. MockAPI es un servicio público sin políticas de acceso privadas: no envíes correos, contraseñas ni información sensible. Si no hay conexión, los registros quedan pendientes en el dispositivo y se reintentan al recuperar conexión.

## Habilitar cuentas reales (opcional)

1. Crea un proyecto en [Supabase](https://supabase.com/dashboard).
2. En **Authentication > Users**, crea las cuentas `admin@gmail.com` y `voluntario@gmail.com`. No habilites el registro público de usuarios.
3. Asigna desde el servidor el `app_metadata.role` de cada cuenta: `administrador` para el administrador y `voluntariado` para el voluntario. Los roles deben configurarse en el servidor, no en metadatos modificables por el cliente. Por ejemplo, desde SQL Editor, después de crear las cuentas:

   ```sql
   update auth.users
   set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb)
     || '{"role":"administrador"}'::jsonb
   where email = 'admin@gmail.com';

   update auth.users
   set raw_app_meta_data = coalesce(raw_app_meta_data, '{}'::jsonb)
     || '{"role":"voluntariado"}'::jsonb
   where email = 'voluntario@gmail.com';
   ```

   Cambios de `app_metadata` se aplican al renovar la sesión; cierra sesión y vuelve a entrar después de asignar los roles.

## Configurar la app

1. Copia `.env.example` a `.env.local`.
2. Completa `EXPO_PUBLIC_SUPABASE_URL` y `EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY` con los valores del proyecto (Connect dialog de Supabase).
3. Reinicia Expo para que cargue las variables.

La clave **publishable** está diseñada para estar en la app. Nunca pongas una `service_role` o una secret key en la app ni en `EXPO_PUBLIC_*`.

El archivo `schema.sql` describe una tabla privada anterior y no es necesario para guardar las actividades en MockAPI.
