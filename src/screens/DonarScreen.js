import React, { useState } from 'react';
import { Text, View, ScrollView, TextInput, Pressable, Alert } from 'react-native';
import styles from '../styles/DonarScreenStyles';

export default function DonarScreen({ usuario, registrarActividad }) {
  const [insumo, setInsumo] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [organizacion, setOrganizacion] = useState('');
  const [enviando, setEnviando] = useState(false);

  const handleDonar = async () => {
    if (enviando) return;

    const insumoValidado = insumo.trim();
    const cantidadValidada = cantidad.trim();
    const organizacionValidada = organizacion.trim();
    if (!insumoValidado || !cantidadValidada || !organizacionValidada) {
      Alert.alert('Campos incompletos', 'Por favor completa todos los datos para registrar tu donación.');
      return;
    }

    setEnviando(true);
    try {
      const resultado = await registrarActividad({
        tipo: 'donacion',
        titulo: insumoValidado,
        detalle: `Cantidad: ${cantidadValidada} · Receptor: ${organizacionValidada}`,
        usuario: usuario.nombre,
      });

      if (resultado?.guardadoLocal || resultado?.sincronizada) {
        Alert.alert(
          resultado.sincronizada ? '¡Donación registrada!' : 'Donación guardada',
          resultado.sincronizada
            ? 'Tu donación fue registrada y enviada al administrador.'
            : 'Quedó guardada en este dispositivo y se enviará cuando vuelva la conexión.',
        );
        setInsumo('');
        setCantidad('');
        setOrganizacion('');
      } else {
        Alert.alert('No se pudo guardar', 'Inténtalo de nuevo cuando el historial esté disponible.');
      }
    } catch (error) {
      console.error('Error al registrar la donación:', error);
      Alert.alert('No se pudo guardar', 'Ocurrió un error al guardar la donación. Inténtalo de nuevo.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <ScrollView style={styles.container} keyboardShouldPersistTaps="handled">
      <View style={styles.header}>
        <Text style={styles.headerBrand}>PUENTE</Text>
        <Text style={styles.headerTitle}>Registro de Donaciones</Text>
        <Text style={styles.headerSubtitle}>Cada aporte construye comunidad</Text>
      </View>

      <View style={styles.body}>
        <View style={styles.infoBanner}>
          <Text style={styles.infoBannerIcon}>📦</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.infoBannerTitle}>Tu donación hace la diferencia</Text>
            <Text style={styles.infoBannerSub}>Completa los datos para coordinar la entrega.</Text>
          </View>
        </View>

        <Text style={styles.sectionLabel}>DATOS DE LA DONACIÓN</Text>
        <Text style={styles.mainQuestion}>¿Qué deseas compartir?</Text>

        <View style={styles.formCard}>
          <Text style={styles.inputLabel}>Tipo de insumo</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej. Alimentos no perecederos, ropa"
            placeholderTextColor="#94a3b8"
            value={insumo}
            onChangeText={setInsumo}
            editable={!enviando}
          />

          <Text style={styles.inputLabel}>Cantidad / Detalle</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej. 10 lbs de frijol"
            placeholderTextColor="#94a3b8"
            value={cantidad}
            onChangeText={setCantidad}
            editable={!enviando}
          />

          <Text style={styles.inputLabel}>Organización receptora</Text>
          <TextInput
            style={styles.input}
            placeholder="Ej. Comedor San Francisco"
            placeholderTextColor="#94a3b8"
            value={organizacion}
            onChangeText={setOrganizacion}
            editable={!enviando}
          />

          <Text style={styles.privacyNote}>✓ Usaremos estos datos únicamente para coordinar tu entrega.</Text>
          <Pressable
            style={[styles.submitButton, enviando && styles.submitButtonDisabled]}
            onPress={handleDonar}
            disabled={enviando}
            accessibilityRole="button"
          >
            <Text style={styles.submitButtonText}>
              {enviando ? 'Guardando...' : 'Registrar donación en especie →'}
            </Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}
