import React from 'react';
import { Text, View, ScrollView } from 'react-native';
import styles from '../styles/PerfilScreenStyles';

export default function PerfilScreen() {
  return (
    <ScrollView style={styles.container}>
      {/* Encabezado Azul */}
      <View style={styles.header}>
        <Text style={styles.headerBrand}>PUENTE</Text>
        <Text style={styles.headerTitle}>Mi Impacto Social</Text>
        <Text style={styles.headerSubtitle}>Tu aporte transforma comunidades</Text>
      </View>

      <View style={styles.body}>
        {/* Tarjeta de Perfil */}
        <View style={styles.profileCard}>
          <View style={styles.avatarContainer}>
            <Text style={styles.avatarIcon}>👤</Text>
          </View>
          <View style={styles.verifiedBadge}>
            <Text style={styles.verifiedText}>✔ PERFIL VERIFICADO</Text>
          </View>
          <Text style={styles.profileName}>Voluntario Comunitario</Text>
          <Text style={styles.profileRole}>Voluntario / Donante Verificado</Text>

          {/* Estadísticas de perfil */}
          <View style={styles.statsRow}>
            <View style={styles.statItem}>
              <Text style={styles.statVal}>7</Text>
              <Text style={styles.statLbl}>Actividades</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statVal}>24 h</Text>
              <Text style={styles.statLbl}>Acumuladas</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statVal}>3</Text>
              <Text style={styles.statLbl}>Donaciones</Text>
            </View>
          </View>
        </View>

        <Text style={styles.sectionLabel}>TU CONTRIBUCIÓN</Text>
        <Text style={styles.sectionTitle}>Historial de Impacto Social</Text>

        {/* Historial Item 1 */}
        <View style={styles.historyCard}>
          <View style={styles.historyLeft}>
            <View style={styles.historyCheckIcon}>
              <Text style={styles.checkText}>✔</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.historyTitle}>Jornada de Entregas de Alimentos</Text>
              <Text style={styles.historySub}>Completada · 20 de octubre</Text>
            </View>
          </View>
          <Text style={styles.historyValue}>4 horas</Text>
        </View>

        {/* Historial Item 2 */}
        <View style={styles.historyCard}>
          <View style={styles.historyLeft}>
            <View style={styles.historyCheckIcon}>
              <Text style={styles.checkText}>✔</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.historyTitle}>Clasificación de Donaciones</Text>
              <Text style={styles.historySub}>Completada · 12 de octubre</Text>
            </View>
          </View>
          <Text style={styles.historyValue}>3 horas</Text>
        </View>

        {/* Historial Item 3 */}
        <View style={styles.historyCard}>
          <View style={styles.historyLeft}>
            <View style={styles.historyCheckIconOrange}>
              <Text style={styles.checkTextOrange}>📦</Text>
            </View>
            <View style={{ flex: 1 }}>
              <Text style={styles.historyTitle}>Donación de alimentos</Text>
              <Text style={styles.historySub}>Completada · 5 de octubre</Text>
            </View>
          </View>
          <Text style={styles.historyValueOrange}>10 lbs</Text>
        </View>

        {/* Tarjeta de Insignia */}
        <View style={styles.badgePromoCard}>
          <Text style={styles.promoIcon}>🏆</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.promoTitle}>¡Sigue construyendo puentes!</Text>
            <Text style={styles.promoSub}>Te faltan 6 horas para tu próxima insignia</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}
