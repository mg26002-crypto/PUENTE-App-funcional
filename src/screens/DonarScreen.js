import React, { useState } from 'react';
import { StyleSheet, Text, View, ScrollView, TextInput, Pressable, Alert } from 'react-native';
import { registrarDonacionApi } from '../api/api';

export default function DonarScreen() {
  const [tipoInsumo, setTipoInsumo] = useState('');
  const [cantidad, setCantidad] = useState('');
  const [receptor, setReceptor] = useState('');

  const manejarEnvio = async () => {
    if (!tipoInsumo || !cantidad || !receptor) {
      Alert.alert('Campos incompletos', 'Por favor completa todos los datos.');
      return;
    }

    const exito = await registrarDonacionApi({ tipoInsumo, cantidad, receptor });
    if (exito) {
      Alert.alert('¡Éxito!', 'Tu donación ha sido registrada.');
      setTipoInsumo('');
      setCantidad('');
      setReceptor('');
    } else {
      Alert.alert('Error', 'No se pudo registrar la donación.');
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollContent}>
      <Text style={styles.screenTitle}>Registro de Donaciones</Text>
      <Text style={styles.screenSubtitle}>Cada aporte construye comunidad</Text>

      <View style={styles.formContainer}>
        <Text style={styles.label}>¿Qué deseas compartir?</Text>
        
        <Text style={styles.inputLabel}>Tipo de insumo</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej. Alimentos no perecederos"
          value={tipoInsumo}
          onChangeText={setTipoInsumo}
        />

        <Text style={styles.inputLabel}>Cantidad / Detalle</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej. 10 lbs de frijol"
          value={cantidad}
          onChangeText={setCantidad}
        />

        <Text style={styles.inputLabel}>Organización receptora</Text>
        <TextInput
          style={styles.input}
          placeholder="Ej. Comedor San Francisco"
          value={receptor}
          onChangeText={setReceptor}
        />

        <Pressable style={styles.buttonPrimary} onPress={manejarEnvio}>
          <Text style={styles.buttonText}>Registrar donación en especie →</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContent: { padding: 20, paddingBottom: 40 },
  screenTitle: { fontSize: 24, fontWeight: 'bold', color: '#1e293b' },
  screenSubtitle: { fontSize: 14, color: '#64748b', marginBottom: 15 },
  formContainer: { backgroundColor: '#fff', padding: 20, borderRadius: 10, borderWidth: 1, borderColor: '#e2e8f0' },
  label: { fontSize: 16, fontWeight: 'bold', color: '#0f172a', marginBottom: 15 },
  inputLabel: { fontSize: 13, fontWeight: '600', color: '#334155', marginBottom: 5 },
  input: { borderWidth: 1, borderColor: '#cbd5e1', borderRadius: 8, padding: 10, marginBottom: 15, backgroundColor: '#f8fafc' },
  buttonPrimary: { backgroundColor: '#ea580c', padding: 15, borderRadius: 8, alignItems: 'center', marginTop: 10 },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
});