import React from 'react';
import { Text, View, ScrollView, Pressable } from 'react-native';
import styles from '../styles/InicioScreenStyles';

export default function InicioScreen({ cambiarPestana }) {
  return (
    <ScrollView style={styles.container}>
      {/* Encabezado Azul */}
      <View style={styles.header}>
        <Text style={styles.headerBrand}>PUENTE</Text>
        <Text style={styles.headerTitle}>Bienvenido a PUENTE</Text>
        <Text style={styles.headerSubtitle}>Plataforma de Coordinación de Ayuda Humanitaria</Text>
      </View>

      <View style={styles.body}>
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionLabel}>ACCESOS DIRECTOS</Text>
          <Text style={styles.badgeActive}>● Activa</Text>
        </View>
        <Text style={styles.sectionTitle}>Módulos Principales</Text>

        {/* Tarjeta 1: Consultar Centros de Ayuda */}
        <Pressable style={styles.card} onPress={() => cambiarPestana('recursos')}>
          <View style={styles.iconBoxBlue}>
            <Text style={styles.iconText}>🔍</Text>
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>Consultar Centros de Ayuda</Text>
            <Text style={styles.cardDesc}>Encuentra apoyo cerca de ti</Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </Pressable>

        {/* Tarjeta 2: Quiero Ayudar */}
        <Pressable style={styles.card} onPress={() => cambiarPestana('voluntariado')}>
          <View style={styles.iconBoxGreen}>
            <Text style={styles.iconText}>❤️</Text>
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>Quiero Ayudar</Text>
            <Text style={styles.cardDesc}>Súmate como voluntario</Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </Pressable>

        {/* Tarjeta 3: Donar Insumos */}
        <Pressable style={styles.card} onPress={() => cambiarPestana('donar')}>
          <View style={styles.iconBoxOrange}>
            <Text style={styles.iconText}>📦</Text>
          </View>
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>Donar Insumos</Text>
            <Text style={styles.cardDesc}>Convierte recursos en esperanza</Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </Pressable>

        {/* Sección de Impacto */}
        <View style={styles.impactContainer}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionLabel}>NUESTRO IMPACTO</Text>
            <Text style={styles.subtextBadge}>❤️ Este mes</Text>
          </View>
          <Text style={styles.sectionTitle}>Impacto comunitario</Text>
          
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>12</Text>
              <Text style={styles.statLabel}>Centros activos</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>48</Text>
              <Text style={styles.statLabel}>Voluntarios</Text>
            </View>
          </View>

          <View style={styles.progressBarBackground}>
            <View style={styles.progressBarFill} />
          </View>
          <Text style={styles.progressText}>78% de nuestra meta mensual</Text>
        </View>
      </View>
    </ScrollView>
  );
}
