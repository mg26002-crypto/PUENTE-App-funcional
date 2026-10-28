import React from 'react';
import { Text, View, ScrollView, Pressable, Alert } from 'react-native';
import styles from '../styles/VoluntariadoScreenStyles';

export default function VoluntariadoScreen() {
  // Estado para manejar las convocatorias y hacerlas funcionales
  const [jornadas, setJornadas] = useState([
    {
      id: 1,
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
      id: 2,
      dia: '25',
      mes: 'OCT',
      organizacion: 'Banco de Alimentos de Occidente',
      titulo: 'Clasificación de Donaciones',
      fechaTexto: '25 de octubre · 9:30 a. m.',
      ubicacion: 'Centro de Acopio Manos Unidas',
      vacantes: 8,
      postulado: false,
    }
  ]);

  const handlePostular = (id) => {
    setJornadas(prevJornadas =>
      prevJornadas.map(jornada => {
        if (jornada.id === id) {
          if (jornada.postulado) {
            Alert.alert('Aviso', 'Ya estás postulado a esta jornada.');
            return jornada;
          }
          Alert.alert(
            '¡Postulación Exitosa!', 
            `Te has inscrito correctamente a "${jornada.titulo}". ¡Gracias por tu ayuda!`
          );
          return {
            ...jornada,
            vacantes: jornada.vacantes - 1,
            postulado: true
          };
        }
        return jornada;
      })
    );
  };

  return (
    <ScrollView style={styles.container}>
      {/* Encabezado Azul */}
      <View style={styles.header}>
        <Text style={styles.headerBrand}>PUENTE</Text>
        <Text style={styles.headerTitle}>Convocatorias Activas</Text>
        <Text style={styles.headerSubtitle}>Tu tiempo puede cambiar vidas</Text>
      </View>

      <View style={styles.body}>
        {/* Banner de vacantes total */}
        <View style={styles.vacanciesBanner}>
          <Text style={styles.badgeIcon}>👥</Text>
          <View>
            <Text style={styles.bannerTitle}>
              {jornadas.reduce((acc, item) => acc + item.vacantes, 0)} vacantes disponibles
            </Text>
            <Text style={styles.bannerSub}>Encuentra una causa que te inspire.</Text>
          </View>
        </View>

        <View style={styles.sectionHeaderRow}>
          <Text style={styles.sectionTitle}>Próximas jornadas</Text>
          <Text style={styles.opportunitiesText}>{jornadas.length} oportunidades</Text>
        </View>

        {/* Listado dinámico de jornadas */}
        {jornadas.map((item) => (
          <View key={item.id} style={styles.eventCard}>
            <View style={styles.eventMainRow}>
              <View style={styles.dateBox}>
                <Text style={styles.dateNumber}>{item.dia}</Text>
                <Text style={styles.dateMonth}>{item.mes}</Text>
              </View>
              <View style={styles.eventInfo}>
                <Text style={styles.orgName}>{item.organizacion}</Text>
                <Text style={styles.eventTitle}>{item.titulo}</Text>
              </View>
            </View>

            <View style={styles.eventDetailsList}>
              <Text style={styles.eventDetailText}>📅 {item.fechaTexto}</Text>
              <Text style={styles.eventDetailText}>📍 {item.ubicacion}</Text>
              <Text style={styles.eventDetailText}>👥 {item.vacantes} vacantes disponibles</Text>
            </View>

            <Pressable 
              style={[styles.applyButton, item.postulado && styles.appliedButton]} 
              onPress={() => handlePostular(item.id)}
            >
              <Text style={styles.applyButtonText}>
                {item.postulado ? '✓ Postulado como voluntario' : 'Postularse como voluntario'}
              </Text>
            </Pressable>
          </View>
        ))}
      </View>
    </ScrollView>
  );
}
