import React from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable, Alert } from 'react-native';

export default function VoluntariadoScreen() {
  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <Text style={styles.screenTitle}>Convocatorias Activas</Text>
      <Text style={styles.screenSubtitle}>Tu tiempo puede cambiar vidas</Text>

      <View style={styles.centroCard}>
        <Text style={styles.centroTipo}>ASOCIACIÓN SOLIDARIA</Text>
        <Text style={styles.centroNombre}>Jornada de Entregas de Alimentos</Text>
        <Text style={styles.centroDetalle}>📅 20 Octubre - 8:00 AM</Text>
        <Text style={styles.centroDetalle}>📍 Parque Central</Text>
        <Pressable style={styles.buttonVolunteer} onPress={() => Alert.alert('¡Postulado!', 'Te has registrado exitosamente.')}>
          <Text style={styles.buttonVolunteerText}>Postularse como voluntario</Text>
        </Pressable>
      </View>
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
  buttonVolunteer: { backgroundColor: '#16a34a', padding: 10, borderRadius: 6, alignItems: 'center', marginTop: 12 },
  buttonVolunteerText: { color: '#fff', fontWeight: 'bold', fontSize: 13 },
});