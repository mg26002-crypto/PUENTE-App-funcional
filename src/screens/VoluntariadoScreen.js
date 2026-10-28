import React from 'react';
import { Text, View, ScrollView, Pressable, Alert } from 'react-native';
import styles from '../styles/VoluntariadoScreenStyles';

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
