import AsyncStorage from '@react-native-async-storage/async-storage';

// Clave única donde se conserva el historial local para mostrarlo y reintentar envíos.
const ACTIVIDADES_KEY = 'puente_actividades';

// Lee y valida el historial del dispositivo; si aún no existe, comienza vacío.
export async function obtenerActividadesGuardadas() {
  const guardadas = await AsyncStorage.getItem(ACTIVIDADES_KEY);
  const actividades = guardadas ? JSON.parse(guardadas) : [];

  if (!Array.isArray(actividades)) {
    throw new Error('El historial guardado no tiene un formato válido.');
  }

  return actividades;
}

// Guarda el historial completo como JSON para poder recuperarlo en otra apertura.
export async function guardarActividadesGuardadas(actividades) {
  await AsyncStorage.setItem(ACTIVIDADES_KEY, JSON.stringify(actividades));
}
