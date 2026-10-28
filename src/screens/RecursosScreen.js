import React, { useState } from 'react';
import {
  Text,
  View,
  ScrollView,
  TextInput,
  ActivityIndicator,
  Pressable,
} from 'react-native';
import styles from '../styles/RecursosScreenStyles';

export default function RecursosScreen({ centros, cargando, error }) {
  const [filtro, setFiltro] = useState('Todos');
  const [busqueda, setBusqueda] = useState('');

  const centrosFiltrados = centros.filter(item => {
    if (!item || typeof item !== 'object') {
      return false;
    }

    const nombre = typeof item.nombre === 'string' ? item.nombre : '';
    const categoria = typeof item.categoria === 'string' ? item.categoria : '';
    const ubicacion = typeof item.ubicacion === 'string' ? item.ubicacion : '';
    const coincideFiltro = filtro === 'Todos' || categoria.toLowerCase() === filtro.toLowerCase();
    const textoBusqueda = busqueda.toLowerCase();
    const coincideTexto = nombre.toLowerCase().includes(textoBusqueda) || ubicacion.toLowerCase().includes(textoBusqueda);
    return coincideFiltro && coincideTexto;
  });

  return (
    <ScrollView style={styles.container}>
      {/* Encabezado Azul */}
      <View style={styles.header}>
        <Text style={styles.headerBrand}>PUENTE</Text>
        <Text style={styles.headerTitle}>Centros de Ayuda</Text>
        <Text style={styles.headerSubtitle}>Recursos cerca de ti</Text>
      </View>

      <View style={styles.body}>
        {/* Barra de búsqueda */}
        <View style={styles.searchBox}>
          <Text style={styles.searchIcon}>🔍</Text>
          <TextInput 
            placeholder="Buscar por nombre o ubicación" 
            placeholderTextColor="#94a3b8"
            style={styles.searchInput}
            value={busqueda}
            onChangeText={setBusqueda}
          />
        </View>

        {/* Filtros horizontales */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.filtersRow}>
          {['Todos', 'Alimentación', 'Albergue', 'Higiene'].map(cat => (
            <Pressable 
              key={cat} 
              style={[styles.filterChip, filtro === cat && styles.filterChipActive]}
              onPress={() => setFiltro(cat)}
            >
              <Text style={[styles.filterText, filtro === cat && styles.filterTextActive]}>{cat}</Text>
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
                <Text style={styles.infoVal}>
                  {typeof centro.ubicacion === 'string' ? centro.ubicacion : 'No disponible'}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Horario</Text>
                <Text style={styles.infoVal}>
                  {typeof centro.horario === 'string' ? centro.horario : 'No disponible'}
                </Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Contacto</Text>
                <Text style={styles.infoVal}>
                  {typeof centro.contacto === 'string' ? centro.contacto : 'No disponible'}
                </Text>
              </View>

              <Pressable style={styles.detailButton}>
                <Text style={styles.detailButtonText}>Ver detalles ›</Text>
              </Pressable>
            </View>
          ))
        )}
      </View>
    </ScrollView>
  );
}
