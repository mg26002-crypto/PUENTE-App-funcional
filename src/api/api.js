// src/api/api.js

const API_URL = 'https://6ada69187512f497b3ffeeef.mockapi.io/api/v1/centros';

export async function obtenerCentrosApi() {
  const respuesta = await fetch(API_URL);
  if (!respuesta.ok) {
    throw new Error(`No fue posible cargar los centros (HTTP ${respuesta.status}).`);
  }

  const datos = await respuesta.json();
  if (!Array.isArray(datos)) {
    throw new Error('El servicio devolvió un formato de centros no válido.');
  }

  return datos;
}

export async function registrarDonacionApi(donacionData) {
  try {
    const respuesta = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(donacionData),
    });
    return respuesta.ok;
  } catch (error) {
    console.error('Error al registrar donación:', error);
    return false;
  }
}
