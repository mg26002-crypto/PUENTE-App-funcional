import React from 'react';
import { StyleSheet, Text, View, ScrollView, ActivityIndicator } from 'react-native';

export default function RecursosScreen({ centros, cargando }) {
  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <Text style={styles.screenTitle}>Centros de Ayuda</Text>
      <Text style={styles.screenSubtitle}>Recursos cerca de ti (Sonsonate)</Text>

      {cargando ? (
        <ActivityIndicator size="large" color="#2563eb" style={{ marginTop: 20 }} />
      ) : (
        centros.map((centro, index) => (
          <View key={index} style={styles.centroCard}>
            <Text style={styles.centroTipo}>{centro.tipo || 'ASISTENCIA'}</Text>
            <Text style={styles.centroNombre}>{centro.nombre || 'Comedor Comunitario San Francisco'}</Text>
            <Text style={styles.centroDetalle}>📍 Ubicación: {centro.ubicacion || 'Sonsonate Centro'}</Text>
            <Text style={styles.centroDetalle}>🕒 Horario: {centro.horario || '11:30 AM'}</Text>
            <Text style={styles.centroDetalle}>📞 Contacto: {centro.contacto || '2451-0001'}</Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: { padding: 20, paddingBottom: 40 },
  screenTitle: { fontSize: 24, fontWeight: 'bold', color: '#1e293b' },
  screenSubtitle: { fontSize: 14, color: '#64748b', marginBottom: 15 },
  centroCard: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginBottom: 12, borderWidth: 1, borderColor: '#e2e8f0' },
  centroTipo: { fontSize: 11, fontWeight: 'bold', color: '#2563eb', marginBottom: 4 },
  centroNombre: { fontSize: 16, fontWeight: 'bold', color: '#0f172a' },
  centroDetalle: { fontSize: 13, color: '#475569', marginTop: 4 },
});