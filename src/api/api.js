// API pública de MockAPI: centros y actividades comparten el recurso /centros.
// La categoría permite separarlos al leer sin crear un endpoint que el servidor no ofrece.
const API_URL = 'https://6ada69187512f497b3ffeeee.mockapi.io';
const CENTROS_API_URL = `${API_URL}/centros`;

// Descarga y valida la lista común antes de que cada función la filtre por tipo.
async function obtenerRegistrosApi() {
  const respuesta = await fetch(CENTROS_API_URL);
  if (!respuesta.ok) {
    throw new Error(`El servicio respondió con estado ${respuesta.status}.`);
  }

  const datos = await respuesta.json();
  if (!Array.isArray(datos)) {
    throw new Error('El servicio devolvió un formato de registros no válido.');
  }

  return datos;
}

// Devuelve centros; omite las actividades almacenadas en el mismo recurso.
export async function obtenerCentrosApi() {
  try {
    const datos = await obtenerRegistrosApi();
    return datos.filter((dato) => dato.categoria !== 'actividad');
  } catch (error) {
    console.error('Error al obtener centros:', error);
    throw error;
  }
}

// Convierte los registros de MockAPI al formato que esperan las pantallas.
export async function obtenerActividadesApi() {
  try {
    const registros = await obtenerRegistrosApi();
    return registros
      .filter((registro) => registro.categoria === 'actividad')
      .map((actividad) => ({
        id: String(actividad.id),
        idLocal: actividad.client_id || String(actividad.id),
        tipo: actividad.tipo,
        titulo: actividad.titulo,
        detalle: actividad.detalle,
        usuario: actividad.usuario || 'Usuario de PUENTE',
        fecha: actividad.fecha || actividad.createdAt,
        sincronizada: true,
      }));
  } catch (error) {
    console.error('Error al obtener actividades:', error);
    throw error;
  }
}

// Crea una actividad en el servidor; client_id evita duplicarla al reintentar.
export async function registrarActividadApi(actividadData) {
  try {
    const clientId = String(actividadData.idLocal || actividadData.id);
    const existentes = await obtenerRegistrosApi();
    if (existentes.some((registro) => registro.client_id === clientId)) {
      return true;
    }

    const respuesta = await fetch(CENTROS_API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        categoria: 'actividad',
        client_id: clientId,
        tipo: actividadData.tipo,
        titulo: actividadData.titulo,
        detalle: actividadData.detalle,
        fecha: actividadData.fecha || new Date().toISOString(),
        usuario: 'Usuario de PUENTE',
      }),
    });

    if (!respuesta.ok) {
      throw new Error(`El servicio respondió con estado ${respuesta.status}.`);
    }

    await respuesta.json();
    return true;
  } catch (error) {
    console.error('Error al registrar actividad:', error);
    return false;
  }
}
