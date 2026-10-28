import React, { useState } from 'react';
import { Text, View, ScrollView, TextInput, Pressable, Alert } from 'react-native';
import styles from '../styles/DonarScreenStyles';

export default function DonarScreen() {
  const [insumo, setInsumo] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [organizacion, setOrganizacion] = useState('');

  const handleDonar = () => {
    if (!insumo || !cantidad || !organizacion) {
      Alert.alert('Campos incompletos', 'Por favor completa todos los datos para registrar tu donación.');
      return;
    }
    Alert.alert('¡Donación Registrada!', 'Gracias por tu aporte. Nos pondremos en contacto para coordinar la entrega.');
    setInsumo('');
    setCantidad('');
    setOrganizacion('');
  };

  return (
    <ScrollView style={styles.container}>
      {/* Encabezado Azul */}
      <View style={styles.header}>
        <Text style={styles.headerBrand}>PUENTE</Text>
        <Text style={styles.headerTitle}>Registro de Donaciones</Text>
        <Text style={styles.headerSubtitle}>Cada aporte construye comunidad</Text>
      </View>

      <View style={styles.body}>
        {/* Banner informativo */}
        <View style={styles.infoBanner}>
          <Text style={styles.infoBannerIcon}>📦</Text>
          <View style={{ flex: 1 }}>
            <Text style={styles.infoBannerTitle}>Tu donación hace la diferencia</Text>
            <Text style={styles.infoBannerSub}>Completa los datos para coordinar la entrega.</Text>
          </View>
        </View>

        <Text style={styles.sectionLabel}>DATOS DE LA DONACIÓN</Text>
        <Text style={styles.mainQuestion}>¿Qué deseas compartir?</Text>

        {/* Formulario */}
        <View style={styles.formCard}>
          <Text style={styles.inputLabel}>Tipo de insumo</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Ej. Alimentos no perecederos, ropa" 
            placeholderTextColor="#94a3b8"
            value={insumo}
            onChangeText={setInsumo}
          />

          <Text style={styles.inputLabel}>Cantidad / Detalle</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Ej. 10 lbs de frijol" 
            placeholderTextColor="#94a3b8"
            value={cantidad}
            onChangeText={setCantidad}
          />

          <Text style={styles.inputLabel}>Organización receptora</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Ej. Comedor San Francisco" 
            placeholderTextColor="#94a3b8"
            value={organizacion}
            onChangeText={setOrganizacion}
          />

          <Text style={styles.privacyNote}>✓ Usaremos estos datos únicamente para coordinar tu entrega.</Text>

          <Pressable style={styles.submitButton} onPress={handleDonar}>
            <Text style={styles.submitButtonText}>Registrar donación en especie →</Text>
          </Pressable>
        </View>
      </View>
    </ScrollView>
  );
}
