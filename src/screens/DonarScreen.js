import React, { useState } from 'react';
import { Text, View, ScrollView, TextInput, Pressable, Alert } from 'react-native';
import { registrarDonacionApi } from '../api/api';
import styles from '../styles/DonarScreenStyles';

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
