import React from 'react';
import { Text, View, ScrollView, ActivityIndicator } from 'react-native';
import styles from '../styles/RecursosScreenStyles';

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
