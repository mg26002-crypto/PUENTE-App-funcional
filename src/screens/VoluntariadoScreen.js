import React, { useState } from 'react';
import { Text, View, ScrollView, Pressable, Alert } from 'react-native';
import styles from '../styles/VoluntariadoScreenStyles';

const JORNADAS_INICIALES = [
  {
    id: 'entregas-alimentos',
    dia: '20',
    mes: 'OCT',
    organizacion: 'Asociación Solidaria',
    titulo: 'Jornada de Entregas de Alimentos',
    fechaTexto: '20 Octubre · 8:00 AM',
    ubicacion: 'Parque Central',
    vacantes: 5,
    postulado: false,
  },
  {
    id: 'clasificacion-donaciones',
    dia: '25',
    mes: 'OCT',
    organizacion: 'Banco de Alimentos de Occidente',
    titulo: 'Clasificación de Donaciones',
    fechaTexto: '25 de octubre · 9:30 a. m.',
    ubicacion: 'Centro de Acopio Manos Unidas',
    vacantes: 8,
    postulado: false,
  },
];

export default function VoluntariadoScreen({ usuario, registrarActividad }) {
  const [jornadas, setJornadas] = useState(JORNADAS_INICIALES);
  const [jornadaEnviando, setJornadaEnviando] = useState(null);

  const handlePostular = async (jornada) => {
    if (jornada.postulado || jornadaEnviando) return;

    setJornadaEnviando(jornada.id);
    try {
      const resultado = await registrarActividad({
        tipo: 'postulacion',
        titulo: jornada.titulo,
        detalle: `${jornada.fechaTexto} · ${jornada.ubicacion}`,
        usuario: usuario.nombre,
      });

      if (resultado?.guardadoLocal || resultado?.sincronizada) {
        setJornadas((actuales) => actuales.map((item) => (
          item.id === jornada.id
            ? { ...item, postulado: true, vacantes: Math.max(0, item.vacantes - 1) }
            : item
        )));
        Alert.alert(
          resultado.sincronizada ? '¡Postulación exitosa!' : 'Postulación guardada',
          resultado.sincronizada
            ? `Te has inscrito a "${jornada.titulo}". ¡Gracias por tu ayuda!`
            : 'Quedó guardada en este dispositivo y se enviará cuando vuelva la conexión.',
        );
      } else {
        Alert.alert('No se pudo guardar', 'Inténtalo de nuevo cuando el historial esté disponible.');
      }
    } catch (error) {
      console.error('Error al registrar la postulación:', error);
      Alert.alert('No se pudo guardar', 'Ocurrió un error al guardar la postulación. Inténtalo de nuevo.');
    } finally {
      setJornadaEnviando(null);
    }
  };

  const vacantesTotales = jornadas.reduce((total, jornada) => total + jornada.vacantes, 0);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerBrand}>PUENTE</Text>
        <Text style={styles.headerTitle}>Convocatorias Activas</Text>
        <Text style={styles.headerSubtitle}>Tu tiempo puede cambiar vidas</Text>
      </View>

      <View style={styles.body}>
        <View style={styles.vacanciesBanner}>
          <Text style={styles.badgeIcon}>👥</Text>
          <View>
            <Text style={styles.bannerTitle}>{vacantesTotales} vacantes disponibles</Text>
            <Text style={styles.bannerSub}>Encuentra una causa que te inspire.</Text>
          </View>
        </View>

        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Próximas jornadas</Text>
          <Text style={styles.opportunitiesText}>{jornadas.length} oportunidades</Text>
        </View>

        {jornadas.map((jornada) => (
          <View key={jornada.id} style={styles.eventCard}>
            <View style={styles.eventMainRow}>
              <View style={styles.dateBox}>
                <Text style={styles.dateNumber}>{jornada.dia}</Text>
                <Text style={styles.dateMonth}>{jornada.mes}</Text>
              </View>
              <View style={styles.eventInfo}>
                <Text style={styles.orgName}>{jornada.organizacion}</Text>
                <Text style={styles.eventTitle}>{jornada.titulo}</Text>
              </View>
            </View>
            <View style={styles.eventDetailsList}>
              <Text style={styles.eventDetailText}>📅 {jornada.fechaTexto}</Text>
              <Text style={styles.eventDetailText}>📍 {jornada.ubicacion}</Text>
              <Text style={styles.eventDetailText}>👥 {jornada.vacantes} vacantes disponibles</Text>
            </View>
            <Pressable
              style={[styles.applyButton, jornada.postulado && styles.appliedButton]}
              onPress={() => handlePostular(jornada)}
              disabled={jornada.postulado || jornadaEnviando !== null}
              accessibilityRole="button"
            >
              <Text style={styles.applyButtonText}>
                {jornada.postulado
                  ? '✓ Postulado como voluntario'
                  : jornadaEnviando === jornada.id
                    ? 'Guardando...'
                    : 'Postularse como voluntario'}
              </Text>
            </Pressable>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
