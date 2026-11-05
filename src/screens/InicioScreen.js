import React from 'react';
import { Text, View, ScrollView, Pressable } from 'react-native';
import styles from '../styles/InicioScreenStyles';

export default function InicioScreen({
  cambiarPestana,
  centros = [],
  cargandoCentros,
  errorCentros,
  actividades = [],
  usuario,
}) {
  const misActividades = actividades.filter((actividad) => actividad.userId === usuario.id);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerBrand}>PUENTE</Text>
        <Text style={styles.headerTitle}>Bienvenido a PUENTE</Text>
        <Text style={styles.headerSubtitle}>Plataforma de Coordinación de Ayuda Humanitaria</Text>
      </View>
      {usuario.modoDemo ? (
        <Text style={styles.demoNotice}>
          Los registros se comparten con el administrador mediante la API en línea. No incluyas datos privados.
        </Text>
      ) : null}

      <View style={styles.body}>
        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionLabel}>ACCESOS DIRECTOS</Text>
          <Text style={styles.badgeActive}>● Activa</Text>
        </View>
        <Text style={styles.sectionTitle}>Módulos Principales</Text>

        <Pressable style={styles.card} onPress={() => cambiarPestana('recursos')}>
          <View style={styles.iconBoxBlue}><Text style={styles.iconText}>🔍</Text></View>
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>Consultar Centros de Ayuda</Text>
            <Text style={styles.cardDesc}>Encuentra apoyo cerca de ti</Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </Pressable>

        <Pressable style={styles.card} onPress={() => cambiarPestana('voluntariado')}>
          <View style={styles.iconBoxGreen}><Text style={styles.iconText}>❤️</Text></View>
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>Quiero Ayudar</Text>
            <Text style={styles.cardDesc}>Súmate como voluntario</Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </Pressable>

        <Pressable style={styles.card} onPress={() => cambiarPestana('donar')}>
          <View style={styles.iconBoxOrange}><Text style={styles.iconText}>📦</Text></View>
          <View style={styles.cardInfo}>
            <Text style={styles.cardTitle}>Donar Insumos</Text>
            <Text style={styles.cardDesc}>Convierte recursos en esperanza</Text>
          </View>
          <Text style={styles.arrow}>›</Text>
        </Pressable>

        <View style={styles.impactContainer}>
          <View style={styles.sectionHeaderRow}>
            <Text style={styles.sectionLabel}>TU IMPACTO</Text>
            <Text style={styles.subtextBadge}>❤️ Comunidad</Text>
          </View>
          <Text style={styles.sectionTitle}>Actividad registrada</Text>
          <View style={styles.statsRow}>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>
                {cargandoCentros ? '…' : errorCentros ? '—' : centros.length}
              </Text>
              <Text style={styles.statLabel}>Centros disponibles</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statNumber}>{misActividades.length}</Text>
              <Text style={styles.statLabel}>Tus registros</Text>
            </View>
          </View>
          {errorCentros ? (
            <Text style={styles.metaText}>No se pudo actualizar la cantidad de centros.</Text>
          ) : null}
        </View>
      </View>
    </ScrollView>
  );
}
