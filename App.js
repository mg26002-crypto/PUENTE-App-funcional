import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import {
  BackHandler,
  PanResponder,
  Platform,
  Pressable,
  SafeAreaView,
  ScrollView,
  Text,
  View,
  Alert,
  ActivityIndicator,
} from 'react-native';

import { obtenerActividadesApi, obtenerCentrosApi, registrarActividadApi } from './src/api/api';
import {
  cerrarSesionApi,
  convertirUsuarioDeSesion,
  iniciarSesionApi,
  obtenerUsuarioDeSesion,
} from './src/api/authApi';
import { supabase, supabaseConfigurado } from './src/api/supabaseClient';
import {
  guardarActividadesGuardadas,
  obtenerActividadesGuardadas,
} from './src/storage/actividadesStorage';
import styles from './src/styles/AppStyles';
import InicioSesionScreen from './src/screens/InicioSesionScreen';
import AdministradorScreen from './src/screens/AdministradorScreen';
import InicioScreen from './src/screens/InicioScreen';
import RecursosScreen from './src/screens/RecursosScreen';
import VoluntariadoScreen from './src/screens/VoluntariadoScreen';
import DonarScreen from './src/screens/DonarScreen';
import PerfilScreen from './src/screens/PerfilScreen';

/**
 * Punto central de la app: administra la sesión, carga los datos compartidos
 * entre pantallas y conecta cada pantalla con las funciones de API y almacenamiento.
 */
export default function App() {
  // Estado de navegación, sesión y centros consultados al iniciar la app.
  const [pestanaActiva, setPestanaActiva] = useState('inicio');
  const [usuario, setUsuario] = useState(null);
  const [cargandoSesion, setCargandoSesion] = useState(true);
  const [centros, setCentros] = useState([]);
  const [cargandoCentros, setCargandoCentros] = useState(true);
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

  // Historial completo en el dispositivo y registros remotos del panel de administración.
  const [actividades, setActividades] = useState([]);
  const [actividadesRemotas, setActividadesRemotas] = useState([]);
  const [actividadesListas, setActividadesListas] = useState(false);
  const [errorAlmacenamiento, setErrorAlmacenamiento] = useState('');
  const [errorSincronizacion, setErrorSincronizacion] = useState('');
  const [cargandoActividadesRemotas, setCargandoActividadesRemotas] = useState(false);
  const actividadesRef = useRef([]);
  const escrituraRef = useRef(Promise.resolve());
  const sincronizandoRef = useRef(false);

  // Restaura la sesión de Supabase y escucha cambios como inicio o cierre de sesión.
  useEffect(() => {
    let activa = true;

    if (!supabaseConfigurado) {
      setCargandoSesion(false);
      return () => {
        activa = false;
      };
    }

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_evento, sesion) => {
      const cuenta = convertirUsuarioDeSesion(sesion?.user);
      if (activa) {
        setUsuario(cuenta);
        setCargandoSesion(false);
      }

      if (sesion?.user && !cuenta) {
        setTimeout(() => {
          cerrarSesionApi().catch((error) =>
            console.error('Error al cerrar una sesión sin rol:', error),
          );
        }, 0);
      }
    });

    obtenerUsuarioDeSesion()
      .then((cuenta) => {
        if (activa) {
          setUsuario(cuenta);
          setCargandoSesion(false);
        }
      })
      .catch((error) => {
        console.error('Error al recuperar la sesión:', error);
        if (activa) setCargandoSesion(false);
      });

    return () => {
      activa = false;
      subscription.unsubscribe();
    };
  }, []);

  // Descarga centros una vez al inicio; cargarCentros también se usa al reintentar.
  const cargarCentros = useCallback(async () => {
    setCargandoCentros(true);
    setErrorCentros('');

    try {
      setCentros(await obtenerCentrosApi());
    } catch (error) {
      console.error('Error al cargar los centros de ayuda:', error);
      setCentros([]);
      setErrorCentros('No se pudieron cargar los centros. Verifica tu conexión e inténtalo de nuevo.');
    } finally {
      setCargandoCentros(false);
    }
  }, []);

  useEffect(() => {
    cargarCentros();
  }, [cargarCentros]);

  // Recupera el historial local antes de permitir nuevas donaciones o postulaciones.
  useEffect(() => {
    let activa = true;

    async function cargarActividades() {
      try {
        const datos = await obtenerActividadesGuardadas();
        actividadesRef.current = datos;
        if (activa) setActividades(datos);
      } catch (error) {
        console.error('Error al cargar el historial de PUENTE:', error);
        if (activa) setErrorAlmacenamiento('No se pudo cargar el historial guardado.');
      } finally {
        if (activa) setActividadesListas(true);
      }
    }

    cargarActividades();
    return () => {
      activa = false;
    };
  }, []);

  // Serializa las escrituras para que varios registros rápidos no se sobrescriban.
  const guardarActividades = useCallback(async (nuevasActividades) => {
    const escritura = escrituraRef.current.then(() =>
      guardarActividadesGuardadas(nuevasActividades),
    );
    escrituraRef.current = escritura.catch(() => {});

    try {
      await escritura;
      return true;
    } catch (error) {
      console.error('Error al guardar el historial de PUENTE:', error);
      setErrorAlmacenamiento('No se pudo guardar el historial en este dispositivo.');
      return false;
    }
  }, []);

  // Envía al servidor las actividades pendientes del usuario y marca las que ya llegaron.
  const sincronizarActividadesPendientes = useCallback(async (usuarioId) => {
    if (sincronizandoRef.current) return;
    sincronizandoRef.current = true;

    try {
      for (const pendiente of actividadesRef.current.filter(
        (actividad) => !actividad.sincronizada && actividad.userId === usuarioId,
      )) {
        const sincronizada = await registrarActividadApi({
          ...pendiente,
          idLocal: pendiente.id,
          sincronizada: true,
        });
        if (sincronizada) {
          const actualizadas = actividadesRef.current.map((actividad) =>
            actividad.id === pendiente.id ? { ...actividad, sincronizada: true } : actividad,
          );
          actividadesRef.current = actualizadas;
          setActividades(actualizadas);
          await guardarActividades(actualizadas);
        } else {
          setErrorSincronizacion(
            'No se pudo sincronizar la actividad. Se conserva en este dispositivo para reintentar.',
          );
        }
      }
    } finally {
      sincronizandoRef.current = false;
    }
  }, [guardarActividades]);

  // Actualiza el panel: primero intenta enviar pendientes y luego consulta la API.
  const actualizarActividadesRemotas = useCallback(async (usuarioId) => {
    setCargandoActividadesRemotas(true);
    setErrorSincronizacion('');

    try {
      await sincronizarActividadesPendientes(usuarioId);
      setActividadesRemotas(await obtenerActividadesApi());
    } catch (error) {
      setErrorSincronizacion(
        'No se pudo actualizar la actividad. Verifica tu conexión con la API e inténtalo de nuevo.',
      );
    } finally {
      setCargandoActividadesRemotas(false);
    }
  }, [sincronizarActividadesPendientes]);

  // Sincroniza al entrar y repite cada 30 segundos mientras hay una sesión activa.
  useEffect(() => {
    if (!usuario || !actividadesListas) return undefined;

    if (usuario.rol === 'administrador' && pestanaActiva === 'administrador') {
      actualizarActividadesRemotas(usuario.id);
      const intervalo = setInterval(() => actualizarActividadesRemotas(usuario.id), 30000);
      return () => clearInterval(intervalo);
    }

    const intervalo = setInterval(() => {
      sincronizarActividadesPendientes(usuario.id).catch((error) => {
        console.error('Error al sincronizar actividades pendientes:', error);
      });
    }, 30000);
    sincronizarActividadesPendientes(usuario.id).catch((error) => {
      console.error('Error al sincronizar actividades pendientes:', error);
    });
    return () => clearInterval(intervalo);
  }, [
    usuario,
    pestanaActiva,
    actividadesListas,
    actualizarActividadesRemotas,
    sincronizarActividadesPendientes,
  ]);

  // Guarda primero en el dispositivo para conservar la actividad si falla la conexión.
  const registrarActividad = async (actividad) => {
    if (!actividadesListas) {
      Alert.alert('Espera un momento', 'El historial todavía se está cargando.');
      return { guardadoLocal: false, sincronizada: false };
    }

    const nuevaActividad = {
      ...actividad,
      id: `${Date.now()}-${Math.random().toString(36).slice(2)}`,
      fecha: new Date().toISOString(),
      userId: usuario.id,
      sincronizada: false,
    };
    const nuevasActividades = [
      ...actividadesRef.current,
      nuevaActividad,
    ];
    actividadesRef.current = nuevasActividades;
    setActividades(nuevasActividades);

    const guardadoLocal = await guardarActividades(nuevasActividades);
    let sincronizada = false;
    try {
      sincronizada = await registrarActividadApi({
        ...nuevaActividad,
        idLocal: nuevaActividad.id,
        sincronizada: true,
      });
    } catch (error) {
      console.error('Error al sincronizar la actividad:', error);
    }

    let guardadoFinal = guardadoLocal;
    if (sincronizada) {
      const actualizadas = actividadesRef.current.map((registro) =>
        registro.id === nuevaActividad.id ? { ...registro, sincronizada: true } : registro,
      );
      actividadesRef.current = actualizadas;
      setActividades(actualizadas);
      const guardadoActualizado = await guardarActividades(actualizadas);
      guardadoFinal = guardadoFinal && guardadoActualizado;
    } else {
      setErrorSincronizacion(
        'La actividad se guardó localmente, pero no se pudo enviar al servidor. Se conservará para reintentar.',
      );
    }

    if (guardadoFinal) {
      setErrorAlmacenamiento('');
    }

    return { guardadoLocal, sincronizada };
  };

  // Inicia una sesión real y abre el panel inicial que corresponde al rol autorizado.
  const iniciarSesion = async (correo, contrasena) => {
    const cuenta = await iniciarSesionApi(correo, contrasena);
    setUsuario(cuenta);
    const pestanaInicial = cuenta.rol === 'administrador' ? 'administrador' : 'inicio';
    historialRef.current = { anterior: [], siguiente: [] };
    pestanaActivaRef.current = pestanaInicial;
    setPestanaActiva(pestanaInicial);
  };

  // Permite recorrer la app sin credenciales; las actividades siguen usando la API en línea.
  const iniciarSesionDemo = (rol) => {
    const esAdministrador = rol === 'administrador';
    setUsuario({
      id: esAdministrador ? 'demo-administrador' : 'demo-voluntariado',
      correo: esAdministrador ? 'admin@demo.puente' : 'voluntario@demo.puente',
      nombre: esAdministrador ? 'Administración demo' : 'Voluntario demo',
      rol,
      modoDemo: true,
    });
    const pestanaInicial = esAdministrador ? 'administrador' : 'inicio';
    historialRef.current = { anterior: [], siguiente: [] };
    pestanaActivaRef.current = pestanaInicial;
    setPestanaActiva(pestanaInicial);
  };

  // Cierra Supabase, restablece el usuario y regresa a la pantalla de inicio de sesión.
  const cerrarSesion = async () => {
    try {
      await cerrarSesionApi();
      setUsuario(null);
      historialRef.current = { anterior: [], siguiente: [] };
      pestanaActivaRef.current = 'inicio';
      setPestanaActiva('inicio');
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
      Alert.alert('No se pudo cerrar sesión', 'Inténtalo de nuevo.');
    }
  };

  // Antes de mostrar las pantallas, espera a conocer la sesión guardada en el dispositivo.
  if (cargandoSesion) {
    return (
      <SafeAreaView style={styles.container}>
        <ActivityIndicator size="large" color="#2563eb" />
      </SafeAreaView>
    );
  }

  // Sin sesión, se ofrece autenticación real (si está configurada) o acceso demo.
  if (!usuario) {
    return (
      <SafeAreaView style={styles.container}>
        <InicioSesionScreen
          onIniciarSesion={iniciarSesion}
          onIniciarSesionDemo={iniciarSesionDemo}
          supabaseConfigurado={supabaseConfigurado}
        />
      </SafeAreaView>
    );
  }

  // El administrador obtiene una pestaña adicional; todas las demás son compartidas.
  const pestanas = [
    ...(usuario.rol === 'administrador' ? [{ id: 'administrador', texto: '🛠 Admin' }] : []),
    { id: 'inicio', texto: '🏠 Inicio' },
    { id: 'recursos', texto: '📍 Recursos' },
    { id: 'voluntariado', texto: '🤝 Ayudar' },
    { id: 'donar', texto: '📦 Donar' },
    { id: 'perfil', texto: '👤 Perfil' },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content} {...panResponder.panHandlers}>
        {pestanaActiva === 'administrador' && usuario.rol === 'administrador' && (
          <AdministradorScreen
            actividades={actividades}
            actividadesRemotas={actividadesRemotas}
            centros={centros}
            cargandoCentros={cargandoCentros}
            errorCentros={errorCentros}
            cargandoActividades={!actividadesListas}
            errorAlmacenamiento={errorAlmacenamiento}
            errorSincronizacion={errorSincronizacion}
            cargandoActividadesRemotas={cargandoActividadesRemotas}
            modoDemo={usuario.modoDemo}
            actualizarActividades={() => actualizarActividadesRemotas(usuario.id)}
          />
        )}
        {pestanaActiva === 'inicio' && (
          <InicioScreen
            cambiarPestana={cambiarPestana}
            centros={centros}
            cargandoCentros={cargandoCentros}
            errorCentros={errorCentros}
            actividades={actividades}
            usuario={usuario}
          />
        )}
        {pestanaActiva === 'recursos' && (
          <RecursosScreen
            centros={centros}
            cargando={cargandoCentros}
            error={errorCentros}
            onReintentar={cargarCentros}
          />
        )}
        {pestanaActiva === 'voluntariado' && (
          <VoluntariadoScreen usuario={usuario} registrarActividad={registrarActividad} />
        )}
        {pestanaActiva === 'donar' && (
          <DonarScreen usuario={usuario} registrarActividad={registrarActividad} />
        )}
        {pestanaActiva === 'perfil' && (
          <PerfilScreen
            usuario={usuario}
            actividades={actividades}
            cerrarSesion={cerrarSesion}
          />
        )}
      </View>

      <View style={styles.navBar}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.navContent}
        >
          {pestanas.map((pestana) => (
            <Pressable
              key={pestana.id}
              onPress={() => cambiarPestana(pestana.id)}
              style={styles.navItem}
              accessibilityRole="button"
              accessibilityState={{ selected: pestanaActiva === pestana.id }}
            >
              <Text style={[styles.navText, pestanaActiva === pestana.id && styles.navActive]}>
                {pestana.texto}
              </Text>
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}
