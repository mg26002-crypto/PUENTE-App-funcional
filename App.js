import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Pressable, Text, SafeAreaView, Platform } from 'react-native';

import { obtenerCentrosApi } from './src/api/api';
import InicioScreen from './src/screens/InicioScreen';
import RecursosScreen from './src/screens/RecursosScreen';
import VoluntariadoScreen from './src/screens/VoluntariadoScreen';
import DonarScreen from './src/screens/DonarScreen';
import PerfilScreen from './src/screens/PerfilScreen';

export default function App() {
  const [pestanaActiva, setPestanaActiva] = useState('inicio');
  const [centros, setCentros] = useState([]);
  const [cargando, setCargando] = useState(false);

  useEffect(() => {
    async function cargarDatos() {
      setCargando(true);
      const datos = await obtenerCentrosApi();
      setCentros(datos);
      setCargando(false);
    }
    cargarDatos();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        {pestanaActiva === 'inicio' && <InicioScreen cambiarPestana={setPestanaActiva} />}
        {pestanaActiva === 'recursos' && <RecursosScreen centros={centros} cargando={cargando} />}
        {pestanaActiva === 'voluntariado' && <VoluntariadoScreen />}
        {pestanaActiva === 'donar' && <DonarScreen />}
        {pestanaActiva === 'perfil' && <PerfilScreen />}
      </View>

      {/* BARRA DE NAVEGACIÓN INFERIOR */}
      <View style={styles.navBar}>
        <Pressable onPress={() => setPestanaActiva('inicio')} style={styles.navItem}>
          <Text style={[styles.navText, pestanaActiva === 'inicio' && styles.navActive]}>🏠 Inicio</Text>
        </Pressable>
        <Pressable onPress={() => setPestanaActiva('recursos')} style={styles.navItem}>
          <Text style={[styles.navText, pestanaActiva === 'recursos' && styles.navActive]}>📍 Recursos</Text>
        </Pressable>
        <Pressable onPress={() => setPestanaActiva('voluntariado')} style={styles.navItem}>
          <Text style={[styles.navText, pestanaActiva === 'voluntariado' && styles.navActive]}>🤝 Ayudar</Text>
        </Pressable>
        <Pressable onPress={() => setPestanaActiva('donar')} style={styles.navItem}>
          <Text style={[styles.navText, pestanaActiva === 'donar' && styles.navActive]}>📦 Donar</Text>
        </Pressable>
        <Pressable onPress={() => setPestanaActiva('perfil')} style={styles.navItem}>
          <Text style={[styles.navText, pestanaActiva === 'perfil' && styles.navActive]}>👤 Perfil</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1, 
    backgroundColor: '#f8fafc',
    // Ajuste para evitar pantallas en blanco en navegadores web
    height: Platform.OS === 'web' ? '100vh' : '100%' 
  },
  content: { flex: 1 },
  navBar: { flexDirection: 'row', backgroundColor: '#fff', borderTopWidth: 1, borderTopColor: '#e2e8f0', paddingVertical: 10 },
  navItem: { flex: 1, alignItems: 'center' },
  navText: { fontSize: 12, color: '#64748b' },
  navActive: { color: '#2563eb', fontWeight: 'bold' }
});