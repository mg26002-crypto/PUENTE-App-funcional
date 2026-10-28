import React from 'react';
import { Text, View, ScrollView, Pressable } from 'react-native';
import styles from '../styles/InicioScreenStyles';

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
