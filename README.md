# PUENTE-App

Aplicación móvil para consultar centros de ayuda, registrar donaciones y postularse a actividades de voluntariado. Está construida con Expo y React Native, y también puede ejecutarse en navegador.

## Ejecutar el proyecto

1. Instala las dependencias con `npm install`.
2. Inicia Expo con `npm start`.
3. Abre la app con Expo Go, usa `w` para el navegador o `a` para Android.

El proyecto usa la API pública de MockAPI configurada en `src/api/api.js`. No se necesita una cuenta ni una clave para consultar los centros o guardar actividades.

## Organización del código

| Ruta | Responsabilidad |
|---|---|
| `index.js` | Registra `App` como punto de entrada de Expo. |
| `App.js` | Controla la sesión, la pestaña activa, la carga de datos, el historial y la sincronización. Conecta las pantallas con esas funciones. |
| `src/screens/` | Componentes de pantalla. Reciben datos y acciones por propiedades (`props`) para mostrar centros, donaciones, postulaciones, perfil y panel administrativo. |
| `src/styles/` | Estilos de React Native, separados por pantalla. |
| `src/api/api.js` | Consultas y escrituras de centros y actividades en MockAPI. |
| `src/api/authApi.js` | Inicio, recuperación y cierre de sesión de Supabase, si se configura. |
| `src/api/supabaseClient.js` | Crea el cliente opcional de Supabase y guarda la sesión en el dispositivo. |
| `src/storage/actividadesStorage.js` | Guarda y lee en AsyncStorage el historial local y los registros pendientes de sincronización. |
| `supabase/schema.sql` | Esquema opcional/legacy. No se usa para el guardado actual en MockAPI. |

## Flujo de datos

1. `App.js` carga los centros y recupera las actividades locales al iniciar.
2. `RecursosScreen` muestra los centros. Si falla la conexión, ofrece reintentar.
3. `DonarScreen` y `VoluntariadoScreen` validan la acción y llaman a `registrarActividad`, que proporciona `App.js`.
4. `App.js` guarda primero la actividad localmente y luego intenta enviarla a MockAPI. Si el envío falla, la conserva para reintentar.
5. `AdministradorScreen` consulta las actividades del servidor y combina los resultados con las actividades locales pendientes.
6. `PerfilScreen` muestra el historial local asociado con el usuario actual.

## Datos de MockAPI

El servidor disponible tiene el recurso `/centros`, pero no `/actividades`. Por ello, ambos tipos de registro comparten `/centros` y se distinguen con el campo `categoria`:

- Centro de ayuda: `categoria` distinta de `actividad`.
- Donación o postulación: `categoria: "actividad"`, junto con `client_id`, `tipo`, `titulo`, `detalle`, `fecha` y `usuario`.

No borres ni cambies `categoria` al crear actividades: la app la usa para no mostrarlas como centros. MockAPI es público y no aplica los roles ni las políticas de Supabase. No envíes contraseñas, correos ni otra información sensible.

## Comentarios en el código

Los comentarios describen el propósito de cada módulo y el flujo de las operaciones que pueden ser menos obvias. Las pantallas visuales se explican con su responsabilidad y los estilos con el componente que personalizan; las propiedades de estilo individuales se nombran según su uso para evitar comentarios repetidos.
