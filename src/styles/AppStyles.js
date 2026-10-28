import { StyleSheet, Platform } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    height: Platform.OS === 'web' ? '100vh' : '100%',
  },
  content: { flex: 1 },
  navBar: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#e2e8f0',
    paddingVertical: 10,
  },
  navItem: { flex: 1, alignItems: 'center' },
  navText: { fontSize: 12, color: '#64748b' },
  navActive: { color: '#2563eb', fontWeight: 'bold' },
});
