import React, { useMemo, useState } from 'react';
import { Text, View, ScrollView, TextInput, ActivityIndicator, Pressable } from 'react-native';
import styles from '../styles/RecursosScreenStyles';

const CATEGORIAS = ['Todos', 'Alimentación', 'Albergue', 'Higiene'];

export default function RecursosScreen({ centros, cargando, error, onReintentar }) {
  const [filtro, setFiltro] = useState('Todos');
  const [busqueda, setBusqueda] = useState('');
  const centrosFiltrados = useMemo(() => {
    const textoBusqueda = busqueda.trim().toLowerCase();
    return centros.filter((centro) => {
      if (!centro || typeof centro !== 'object') return false;
      const nombre = typeof centro.nombre === 'string' ? centro.nombre : '';
      const categoria = typeof centro.categoria === 'string' ? centro.categoria : '';
      const ubicacion = typeof centro.ubicacion === 'string' ? centro.ubicacion : '';
      const coincideFiltro = filtro === 'Todos' || categoria.toLowerCase() === filtro.toLowerCase();
      return coincideFiltro
        && (nombre.toLowerCase().includes(textoBusqueda)
          || ubicacion.toLowerCase().includes(textoBusqueda));
    });
  }, [busqueda, centros, filtro]);

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.header}>
        <Text style={styles.headerBrand}>PUENTE</Text>
        <Text style={styles.headerTitle}>Centros de Ayuda</Text>
        <Text style={styles.headerSubtitle}>Recursos cerca de ti</Text>
      </View>

      <View style={styles.body}>
        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput
            placeholder="Buscar por nombre o ubicación"
            placeholderTextColor="#94a3b8"
            style={styles.searchInput}
            value={busqueda}
            onChangeText={setBusqueda}
            accessibilityLabel="Buscar centros de ayuda"
          />
        </View>

        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersRow}>
          {CATEGORIAS.map((categoria) => (
            <Pressable
              key={categoria}
              style={[styles.filterChip, filtro === categoria && styles.filterChipActive]}
              onPress={() => setFiltro(categoria)}
              accessibilityRole="button"
              accessibilityState={{ selected: filtro === categoria }}
            >
              <Text style={[styles.filterText, filtro === categoria && styles.filterTextActive]}>
                {categoria}
              </Text>
            </Pressable>
          ))}
        </ScrollView>

        <View style={styles.resultsInfoRow}>
          <Text style={styles.resultsCount}>{centrosFiltrados.length} centros disponibles</Text>
          <Text style={styles.locationTag}>📍 Sonsonate</Text>
        </View>

        {cargando ? (
          <ActivityIndicator size="large" color="#2563eb" style={{ marginTop: 30 }} />
        ) : error ? (
          <View style={styles.stateCard}>
            <Text style={styles.stateTitle}>No se pudieron cargar los centros</Text>
            <Text style={styles.stateText}>{error}</Text>
            <Pressable
              style={styles.retryButton}
              onPress={onReintentar}
              accessibilityRole="button"
            >
              <Text style={styles.retryButtonText}>Reintentar</Text>
            </Pressable>
          </View>
        ) : centrosFiltrados.length === 0 ? (
          <View style={styles.stateCard}>
            <Text style={styles.stateTitle}>
              {centros.length === 0 ? 'Aún no hay centros disponibles' : 'No hay resultados'}
            </Text>
            <Text style={styles.stateText}>
              {centros.length === 0
                ? 'Inténtalo de nuevo más tarde.'
                : 'Prueba con otra búsqueda o categoría.'}
            </Text>
          </View>
        ) : (
          centrosFiltrados.map((centro, index) => (
            <View key={centro.id ?? index} style={styles.centerCard}>
              <View style={styles.centerHeader}>
                <View style={styles.catBadge}>
                  <Text style={styles.catBadgeText}>
                    {typeof centro.categoria === 'string' ? centro.categoria : 'ASISTENCIA'}
                  </Text>
                </View>
              </View>
              <Text style={styles.centerName}>
                {typeof centro.nombre === 'string' ? centro.nombre : 'Centro de ayuda'}
              </Text>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Ubicación</Text>
                <Text style={styles.infoVal}>{centro.ubicacion || 'No disponible'}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Horario</Text>
                <Text style={styles.infoVal}>{centro.horario || 'No disponible'}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Contacto</Text>
                <Text style={styles.infoVal}>{centro.contacto || 'No disponible'}</Text>
              </View>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}
