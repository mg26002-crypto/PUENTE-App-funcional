import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  BackHandler,
  PanResponder,
  Platform,
  Pressable,
  SafeAreaView,
  Text,
  View,
} from 'react-native';

import { obtenerCentrosApi } from './src/api/api';
import styles from './src/styles/AppStyles';
import InicioScreen from './src/screens/InicioScreen';
import RecursosScreen from './src/screens/RecursosScreen';
import VoluntariadoScreen from './src/screens/VoluntariadoScreen';
import DonarScreen from './src/screens/DonarScreen';
import PerfilScreen from './src/screens/PerfilScreen';

export default function App() {
  const [pestanaActiva, setPestanaActiva] = useState('inicio');
  const [centros, setCentros] = useState([]);
  const [cargando, setCargando] = useState(false);
  const [errorCentros, setErrorCentros] = useState('');
  const pestanaActivaRef = useRef('inicio');
  const historialRef = useRef({ anterior: [], siguiente: [] });

  const cambiarPestana = useCallback((pestana) => {
    if (pestana === pestanaActivaRef.current) {
      return;
    }

    historialRef.current.anterior.push(pestanaActivaRef.current);
    historialRef.current.siguiente = [];
    pestanaActivaRef.current = pestana;
    setPestanaActiva(pestana);
  }, []);

  const volverPestana = useCallback(() => {
    const anterior = historialRef.current.anterior.pop();
    if (!anterior) {
      return false;
    }

    historialRef.current.siguiente.push(pestanaActivaRef.current);
    pestanaActivaRef.current = anterior;
    setPestanaActiva(anterior);
    return true;
  }, []);

  const avanzarPestana = useCallback(() => {
    const siguiente = historialRef.current.siguiente.pop();
    if (!siguiente) {
      return false;
    }

    historialRef.current.anterior.push(pestanaActivaRef.current);
    pestanaActivaRef.current = siguiente;
    setPestanaActiva(siguiente);
    return true;
  }, []);

  const panResponder = useMemo(
    () =>
      PanResponder.create({
        onMoveShouldSetPanResponder: (_event, { dx, dy }) =>
          Math.abs(dx) > 30 &&
          Math.abs(dx) > Math.abs(dy) * 1.3 &&
          (dx > 0
            ? historialRef.current.anterior.length > 0
            : historialRef.current.siguiente.length > 0),
        onPanResponderRelease: (_event, { dx, dy }) => {
          if (Math.abs(dx) < 60 || Math.abs(dx) < Math.abs(dy) * 1.3) {
            return;
          }

          if (dx > 0) {
            volverPestana();
          } else {
            avanzarPestana();
          }
        },
        onPanResponderTerminationRequest: () => false,
      }),
    [avanzarPestana, volverPestana]
  );

  useEffect(() => {
    if (Platform.OS !== 'android') {
      return undefined;
    }

    const subscription = BackHandler.addEventListener(
      'hardwareBackPress',
      volverPestana
    );
    return () => subscription.remove();
  }, [volverPestana]);

  useEffect(() => {
    async function cargarDatos() {
      setCargando(true);
      try {
        const datos = await obtenerCentrosApi();
        setCentros(datos);
        setErrorCentros('');
      } catch (error) {
        setErrorCentros(
          error instanceof Error
            ? error.message
            : 'No fue posible cargar los centros de ayuda.'
        );
      } finally {
        setCargando(false);
      }
    }
    cargarDatos();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content} {...panResponder.panHandlers}>
        {pestanaActiva === 'inicio' && <InicioScreen cambiarPestana={cambiarPestana} />}
        {pestanaActiva === 'recursos' && (
          <RecursosScreen centros={centros} cargando={cargando} error={errorCentros} />
        )}
        {pestanaActiva === 'voluntariado' && <VoluntariadoScreen />}
        {pestanaActiva === 'donar' && <DonarScreen />}
        {pestanaActiva === 'perfil' && <PerfilScreen />}
      </View>

      {/* BARRA DE NAVEGACIÓN INFERIOR */}
      <View style={styles.navBar}>
        <Pressable onPress={() => cambiarPestana('inicio')} style={styles.navItem}>
          <Text style={[styles.navText, pestanaActiva === 'inicio' && styles.navActive]}>🏠 Inicio</Text>
        </Pressable>
        <Pressable onPress={() => cambiarPestana('recursos')} style={styles.navItem}>
          <Text style={[styles.navText, pestanaActiva === 'recursos' && styles.navActive]}>📍 Recursos</Text>
        </Pressable>
        <Pressable onPress={() => cambiarPestana('voluntariado')} style={styles.navItem}>
          <Text style={[styles.navText, pestanaActiva === 'voluntariado' && styles.navActive]}>🤝 Ayudar</Text>
        </Pressable>
        <Pressable onPress={() => cambiarPestana('donar')} style={styles.navItem}>
          <Text style={[styles.navText, pestanaActiva === 'donar' && styles.navActive]}>📦 Donar</Text>
        </Pressable>
        <Pressable onPress={() => cambiarPestana('perfil')} style={styles.navItem}>
          <Text style={[styles.navText, pestanaActiva === 'perfil' && styles.navActive]}>👤 Perfil</Text>
        </Pressable>
      </View>
    </SafeAreaView>
  );
}
