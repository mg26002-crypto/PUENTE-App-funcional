import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  scrollContent: { padding: 20, paddingBottom: 40 },
  screenTitle: { fontSize: 24, fontWeight: 'bold', color: '#1e293b' },
  screenSubtitle: { fontSize: 14, color: '#64748b', marginBottom: 15 },
  formContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  label: { fontSize: 16, fontWeight: 'bold', color: '#0f172a', marginBottom: 15 },
  inputLabel: { fontSize: 13, fontWeight: '600', color: '#334155', marginBottom: 5 },
  input: {
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 8,
    padding: 10,
    marginBottom: 15,
    backgroundColor: '#f8fafc',
  },
  buttonPrimary: {
    backgroundColor: '#ea580c',
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: { color: '#fff', fontWeight: 'bold', fontSize: 15 },
});
