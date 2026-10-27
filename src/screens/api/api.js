// src/api/api.js

const API_URL = 'https://6ada69187512f497b3ffeeef.mockapi.io/api/v1/centros';

export async function obtenerCentrosApi() {
  try {
    const respuesta = await fetch(API_URL);
    const datos = await respuesta.json();
    return Array.isArray(datos) ? datos : [];
  } catch (error) {
    console.error('Error al obtener centros:', error);
    return [];
  }
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