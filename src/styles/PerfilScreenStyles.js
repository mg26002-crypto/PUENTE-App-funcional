import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  scrollContent: { padding: 20, paddingBottom: 40 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1e293b', marginBottom: 12, marginTop: 10 },
  centroCard: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  centroNombre: { fontSize: 16, fontWeight: 'bold', color: '#0f172a' },
  centroDetalle: { fontSize: 13, color: '#475569', marginTop: 4 },
  profileHeader: {
    backgroundColor: '#1d4ed8',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 15,
  },
  verifiedBadge: { color: '#bfdbfe', fontSize: 12, fontWeight: 'bold', marginBottom: 5 },
  profileName: { color: '#fff', fontSize: 20, fontWeight: 'bold' },
  profileSub: { color: '#93c5fd', fontSize: 12 },
  statsRow: { flexDirection: 'row', justifyContent: 'space-between', marginBottom: 20 },
  statMini: {
    backgroundColor: '#fff',
    flex: 1,
    marginHorizontal: 4,
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  statNum: { fontSize: 16, fontWeight: 'bold', color: '#1e293b' },
  statLbl: { fontSize: 11, color: '#64748b' },
});
