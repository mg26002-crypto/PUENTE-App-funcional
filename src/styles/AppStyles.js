import { StyleSheet, Platform } from 'react-native';

// Estilos del contenedor común y de la navegación inferior de toda la aplicación.
export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    height: Platform.OS === 'web' ? '100vh' : '100%',
  },
  content: { flex: 1, minHeight: 0 },
  navBar: {
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingVertical: 4,
  },
  navContent: {
    alignItems: 'center',
    paddingHorizontal: 6,
  },
  navItem: {
    minWidth: 84,
    minHeight: 52,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  navText: { fontSize: 13, color: '#64748b' },
  navActive: { color: '#2563eb', fontWeight: 'bold' },
});
