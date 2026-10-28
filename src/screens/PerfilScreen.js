import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import styles from '../styles/PerfilScreenStyles';

export default function PerfilScreen() {
  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.profileHeader}>
        <Text style={styles.verifiedBadge}>✔ PERFIL VERIFICADO</Text>
        <Text style={styles.profileName}>Voluntario Comunitario</Text>
        <Text style={styles.profileSub}>Voluntario / Donante Verificado</Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statMini}><Text style={styles.statNum}>7</Text><Text style={styles.statLbl}>Actividades</Text></View>
        <View style={styles.statMini}><Text style={styles.statNum}>24 h</Text><Text style={styles.statLbl}>Acumuladas</Text></View>
        <View style={styles.statMini}><Text style={styles.statNum}>3</Text><Text style={styles.statLbl}>Donaciones</Text></View>
      </View>

      <Text style={styles.sectionTitle}>Historial de Impacto Social</Text>
      <View style={styles.centroCard}>
        <Text style={styles.centroNombre}>Jornada de Entregas de Alimentos</Text>
        <Text style={styles.centroDetalle}>Completada • 20 de octubre (4 horas)</Text>
      </View>
    </ScrollView>
  );
}
