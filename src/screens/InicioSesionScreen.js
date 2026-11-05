import React, { useState } from 'react';
import { Pressable, ScrollView, Text, TextInput, View } from 'react-native';
import styles from '../styles/InicioSesionScreenStyles';

// Si Supabase está configurado muestra el formulario real; si no, permite entrar en demo.
export default function InicioSesionScreen({
  onIniciarSesion,
  onIniciarSesionDemo,
  supabaseConfigurado,
}) {
  const [correo, setCorreo] = useState('');
  const [contrasena, setContrasena] = useState('');
  const [error, setError] = useState('');
  const [enviando, setEnviando] = useState(false);

  // Envía las credenciales al servicio de autenticación y presenta errores en pantalla.
  const manejarInicioSesion = async () => {
    if (!supabaseConfigurado || enviando) return;
    setError('');
    setEnviando(true);
    try {
      await onIniciarSesion(correo, contrasena);
    } catch (errorInicioSesion) {
      setError(errorInicioSesion.message || 'No se pudo iniciar sesión.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <ScrollView
      contentContainerStyle={styles.scrollContent}
      keyboardShouldPersistTaps="handled"
    >
      <View style={styles.loginCard}>
        <Text style={styles.brand}>PUENTE</Text>
        <Text style={styles.title}>Accede a PUENTE</Text>
        <Text style={styles.subtitle}>
          {supabaseConfigurado
            ? 'Accede como administrador o voluntario.'
            : 'Selecciona un perfil para comenzar.'}
        </Text>

        {supabaseConfigurado ? (
          <>
            <Text style={styles.label}>Correo electrónico</Text>
            <TextInput
              style={styles.input}
              value={correo}
              onChangeText={setCorreo}
              placeholder="tu correo"
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              accessibilityLabel="Correo electrónico"
              editable={!enviando}
              onSubmitEditing={manejarInicioSesion}
            />

            <Text style={styles.label}>Contraseña</Text>
            <TextInput
              style={styles.input}
              value={contrasena}
              onChangeText={setContrasena}
              placeholder="Tu contraseña"
              secureTextEntry
              autoCapitalize="none"
              accessibilityLabel="Contraseña"
              editable={!enviando}
              onSubmitEditing={manejarInicioSesion}
            />

            {error ? <Text style={styles.error}>{error}</Text> : null}

            <Pressable
              style={styles.button}
              onPress={manejarInicioSesion}
              disabled={enviando}
              accessibilityRole="button"
            >
              <Text style={styles.buttonText}>{enviando ? 'Ingresando...' : 'Entrar'}</Text>
            </Pressable>
          </>
        ) : (
          <View style={styles.demoOptions}>
            <Text style={styles.demoTitle}>Selecciona cómo deseas entrar</Text>
            <Pressable
              style={styles.demoButton}
              onPress={() => onIniciarSesionDemo('voluntariado')}
              accessibilityRole="button"
            >
              <Text style={styles.demoButtonText}>Entrar como voluntario</Text>
            </Pressable>
            <Pressable
              style={styles.demoButton}
              onPress={() => onIniciarSesionDemo('administrador')}
              accessibilityRole="button"
            >
              <Text style={styles.demoButtonText}>Entrar como administrador</Text>
            </Pressable>
          </View>
        )}
      </View>
    </ScrollView>
  );
}
