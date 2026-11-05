import React from 'react';
import { ActivityIndicator, Pressable, ScrollView, Text, View } from 'react-native';
import styles from '../styles/AdministradorScreenStyles';

// Panel para revisar los datos del servidor y los registros locales aún pendientes.
export default function AdministradorScreen({
  actividades,
  actividadesRemotas,
  centros,
  cargandoCentros,
  errorCentros,
  cargandoActividades,
  errorAlmacenamiento,
  errorSincronizacion,
  cargandoActividadesRemotas,
  modoDemo,
  actualizarActividades,
}) {
  // Evita mostrar dos veces un registro que ya llegó a la API y sigue en el historial local.
  const idsRemotos = new Set(actividadesRemotas.map((actividad) => actividad.idLocal || actividad.id));
  const actividadVisible = [
    ...actividadesRemotas,
    ...actividades.filter((actividad) => !idsRemotos.has(actividad.id)),
  ];

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <Text style={styles.screenTitle}>Panel de administración</Text>
      <Text style={styles.screenSubtitle}>Novedades, donaciones y postulaciones de PUENTE</Text>
      {modoDemo ? (
        <Text style={styles.demoNotice}>
          Los registros se consultan desde la API en línea. No incluyas datos privados en esta demostración.
        </Text>
      ) : null}

      <Pressable
        style={styles.refreshButton}
        onPress={actualizarActividades}
        disabled={cargandoActividadesRemotas}
        accessibilityRole="button"
      >
        {cargandoActividadesRemotas ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.refreshButtonText}>Actualizar actividad</Text>
        )}
      </Pressable>

      {errorAlmacenamiento ? (
        <Text style={styles.errorMessage}>{errorAlmacenamiento}</Text>
      ) : null}
      {errorSincronizacion ? (
        <Text style={styles.errorMessage}>{errorSincronizacion}</Text>
      ) : null}

      <View style={styles.summaryCard}>
        <Text style={styles.summaryNumber}>{actividadVisible.length}</Text>
        <Text style={styles.summaryLabel}>Cambios y registros recibidos</Text>
      </View>

      <Text style={styles.sectionTitle}>Actividad reciente</Text>
      {/* Cada estado muestra carga, lista vacía o la actividad disponible. */}
      {cargandoActividades ? (
        <ActivityIndicator size="large" color="#2563eb" style={styles.loader} />
      ) : actividadVisible.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyText}>Todavía no hay donaciones ni postulaciones registradas.</Text>
        </View>
      ) : (
        [...actividadVisible].reverse().map((actividad) => (
          <View key={actividad.id} style={styles.activityCard}>
            <Text style={styles.activityType}>
              {actividad.tipo === 'donacion' ? 'DONACIÓN' : 'POSTULACIÓN'}
            </Text>
            <Text style={styles.activityTitle}>{actividad.titulo}</Text>
            <Text style={styles.activityDetail}>{actividad.detalle}</Text>
            <Text style={styles.activityMeta}>
              {actividad.usuario} · {new Date(actividad.fecha).toLocaleString()}
            </Text>
            {actividad.sincronizada === false ? (
              <Text style={styles.pendingSync}>
                Guardada en este dispositivo; pendiente de envío a la API.
              </Text>
            ) : null}
          </View>
        ))
      )}

      <Text style={styles.sectionTitle}>Centros de ayuda</Text>
      {cargandoCentros ? (
        <ActivityIndicator size="large" color="#2563eb" style={styles.loader} />
      ) : errorCentros ? (
        <Text style={styles.errorMessage}>{errorCentros}</Text>
      ) : centros.length === 0 ? (
        <View style={styles.emptyCard}>
          <Text style={styles.emptyText}>No hay centros disponibles en este momento.</Text>
        </View>
      ) : (
        centros.map((centro, index) => (
          <View key={centro.id || `${centro.nombre}-${index}`} style={styles.activityCard}>
            <Text style={styles.activityType}>{centro.tipo || 'CENTRO DE AYUDA'}</Text>
            <Text style={styles.activityTitle}>{centro.nombre || 'Centro sin nombre'}</Text>
            <Text style={styles.activityDetail}>
              {centro.ubicacion || centro.receptor || 'Ubicación no especificada'}
            </Text>
          </View>
        ))
      )}
    </ScrollView>
  );
}
