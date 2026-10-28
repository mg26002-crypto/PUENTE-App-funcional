import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  scrollContent: { padding: 20, paddingBottom: 40 },
  headerCard: { backgroundColor: '#1d4ed8', padding: 20, borderRadius: 12, marginBottom: 20 },
  headerTitle: { color: '#fff', fontSize: 22, fontWeight: 'bold' },
  headerSubtitle: { color: '#93c5fd', fontSize: 13, marginTop: 4 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', color: '#1e293b', marginBottom: 12, marginTop: 10 },
  cardAction: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 10,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  cardActionTitle: { fontSize: 16, fontWeight: 'bold', color: '#0f172a' },
  cardActionDesc: { fontSize: 13, color: '#64748b', marginTop: 2 },
  impactContainer: {
    backgroundColor: '#fff',
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  impactStats: { flexDirection: 'row', justifyContent: 'space-around', marginVertical: 10 },
  statBox: { alignItems: 'center' },
  statNumber: { fontSize: 22, fontWeight: 'bold', color: '#2563eb' },
  statLabel: { fontSize: 12, color: '#64748b' },
  metaText: { textAlign: 'center', fontSize: 12, color: '#059669', fontWeight: '600', marginTop: 5 },
});
