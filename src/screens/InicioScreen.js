import React from 'react';
import { StyleSheet, Text, View, ScrollView, Pressable } from 'react-native';

export default function InicioScreen({ cambiarPestana }) {
  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <View style={styles.headerCard}>
        <Text style={styles.headerTitle}>Bienvenido a PUENTE</Text>
        <Text style={styles.headerSubtitle}>Plataforma de Coordinación de Ayuda Humanitaria</Text>
      </View>

      <Text style={styles.sectionTitle}>Módulos Principales</Text>
      
      <Pressable style={styles.cardAction} onPress={() => cambiarPestana('recursos')}>
        <Text style={styles.cardActionTitle}>Consultar Centros de Ayuda</Text>
        <Text style={styles.cardActionDesc}>Encuentra apoyo cerca de ti</Text>
      </Pressable>

      <Pressable style={styles.cardAction} onPress={() => cambiarPestana('voluntariado')}>
        <Text style={styles.cardActionTitle}>Quiero Ayudar</Text>
        <Text style={styles.cardActionDesc}>Súmate como voluntario</Text>
      </Pressable>

      <Pressable style={styles.cardAction} onPress={() => cambiarPestana('donar')}>
        <Text style={styles.cardActionTitle}>Donar Insumos</Text>
        <Text style={styles.cardActionDesc}>Convierte recursos en esperanza</Text>
      </Pressable>

      <View style={styles.impactContainer}>
        <Text style={styles.sectionTitle}>Impacto Comunitario</Text>
        <View style={styles.impactStats}>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>12</Text>
            <Text style={styles.statLabel}>Centros activos</Text>
          </View>
          <View style={styles.statBox}>
            <Text style={styles.statNumber}>48</Text>
            <Text style={styles.statLabel}>Voluntarios</Text>
          </View>
        </View>
        <Text style={styles.metaText}>78% de nuestra meta mensual</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: { padding: 20, paddingBottom: 40 },
  headerCard: { backgroundColor: '#1d4ed8', padding: 20, borderRadius: 12, marginBottom: 20 },
  headerTitle: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  headerSubtitle: { color: '#93c5fd', fontSize: 13, marginTop: 4 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1e293b', marginBottom: 12, marginTop: 10 },
  cardAction: { backgroundColor: '#fff', padding: 16, borderRadius: 10, marginBottom: 12, borderWidth: 1, borderColor: '#e2e8f0' },
  cardActionTitle: { fontSize: 16, fontWeight: 'bold', color: '#0f172a' },
  cardActionDesc: { fontSize: 13, color: '#64748b', marginTop: 2 },
  impactContainer: { backgroundColor: '#fff', padding: 15, borderRadius: 10, marginTop: 10, borderWidth: 1, borderColor: '#e2e8f0' },
  impactStats: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 },
  statBox: { alignItems: 'center' },
  statNumber: { fontSize: 22, fontWeight: 'bold', color: '#2563eb' },
  statLabel: { fontSize: 12, color: '#64748b' },
  metaText: { textAlign: 'center', fontSize: 12, color: '#059669', fontWeight: '600', marginTop: 5 },
});