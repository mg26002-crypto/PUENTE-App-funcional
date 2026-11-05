import React from 'react';
import { Text, View, ScrollView, Pressable } from 'react-native';
import styles from '../styles/PerfilScreenStyles';

export default function PerfilScreen({ usuario, actividades, cerrarSesion }) {
  const historial = actividades.filter((actividad) => actividad.userId === usuario.id);
  const donaciones = historial.filter((actividad) => actividad.tipo === 'donacion').length;
  const postulaciones = historial.filter((actividad) => actividad.tipo === 'postulacion').length;

  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.scrollContent}>
      <View style={styles.header}>
        <Text style={styles.headerBrand}>PUENTE</Text>
        <Text style={styles.headerTitle}>Mi Impacto Social</Text>
        <Text style={styles.headerSubtitle}>Tu aporte transforma comunidades</Text>
      </View>

      <View style={styles.body}>
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}><Text style={styles.avatarIcon}>👤</Text></View>
          <View style={styles.verifiedBadge}>
            <Text style={styles.verifiedText}>
              {usuario.modoDemo ? 'MODO DEMOSTRACIÓN' : 'SESIÓN ACTIVA'}
            </Text>
          </View>
          <Text style={styles.profileName}>{usuario.nombre}</Text>
          <Text style={styles.profileRole}>{usuario.correo}</Text>
          <Text style={styles.profileRole}>
            {usuario.rol === 'administrador' ? 'Administrador' : 'Voluntariado'}
          </Text>

          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statVal}>{historial.length}</Text>
              <Text style={styles.statLbl}>Actividades</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statVal}>{donaciones}</Text>
              <Text style={styles.statLbl}>Donaciones</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statVal}>{postulaciones}</Text>
              <Text style={styles.statLbl}>Postulaciones</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionLabel}>TU CONTRIBUCIÓN</Text>
        <Text style={styles.sectionTitle}>Historial de Impacto Social</Text>
        {historial.length === 0 ? (
          <View style={styles.historyCard}>
            <Text style={styles.historySub}>Aún no tienes donaciones ni postulaciones registradas.</Text>
          </View>
        ) : (
          [...historial].reverse().map((actividad) => (
            <View key={actividad.id} style={styles.historyCard}>
              <View style={styles.historyLeft}>
                <View style={actividad.tipo === 'donacion' ? styles.historyCheckIconOrange : styles.historyCheckIcon}>
                  <Text style={actividad.tipo === 'donacion' ? styles.checkTextOrange : styles.checkText}>
                    {actividad.tipo === 'donacion' ? '📦' : '✓'}
                  </Text>
                </View>
                <View style={{ flex: 1 }}>
                  <Text style={styles.historyTitle}>{actividad.titulo}</Text>
                  <Text style={styles.historySub}>
                    {actividad.detalle}
                    {actividad.sincronizada === false ? ' · Guardada en este dispositivo' : ''}
                  </Text>
                  <Text style={styles.historySub}>{new Date(actividad.fecha).toLocaleString()}</Text>
                </View>
              </View>
            </View>
          ))
        )}

        <Pressable style={styles.logoutButton} onPress={cerrarSesion} accessibilityRole="button">
          <Text style={styles.logoutText}>Cerrar sesión</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
