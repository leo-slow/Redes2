import React, { useState } from 'react';
import { 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity, 
  SafeAreaView, 
  ScrollView, 
  Modal, 
  FlatList,
  Alert 
} from 'react-native';
import { MaterialCommunityIcons, FontAwesome5 } from '@expo/vector-icons';
import { useActivityClassifier } from '../../hooks/useActivityClassifier';
import { ActivityIndicator } from '../../components/ActivityIndicator';
import { SessionStatsCard } from '../../components/SessionStatsCard.tsx';
import { ActivityLog, ActivityType } from '../../models/ActivityModel.ts';

const formatTime = (timestamp: number) => {
  const date = new Date(timestamp);
  return `${date.getHours()}:${date.getMinutes().toString().padStart(2, '0')}:${date.getSeconds().toString().padStart(2, '0')}`;
};

export default function ActivityTrackerScreen() {
  const {
    isActive,
    currentActivity,
    confidence,
    sessionStats,
    currentLocation,
    currentAccel,
    accelHistory,
    startTracking,
    stopTracking,
    hasPermission
  } = useActivityClassifier();

  const [logsModalVisible, setLogsModalVisible] = useState(false);
  const [sessionLogs, setSessionLogs] = useState<ActivityLog[]>([]);

  const handleToggleTracking = async () => {
    if (isActive) {
      // DETENER
      const route = stopTracking(); 
      
      if (route && route.activityLog) {
        setSessionLogs(route.activityLog);
        
        Alert.alert(
          "Sesión Finalizada", 
          `Distancia: ${route.stats.distanceMeters.toFixed(0)}m\nLogs registrados: ${route.activityLog.length}`,
          [{ text: "Ver Logs", onPress: () => setLogsModalVisible(true) }, { text: "OK" }]
        );
      }
    } else {
      // INICIAR
      setSessionLogs([]);
      await startTracking();
    }
  };

  const renderLogItem = ({ item }: { item: ActivityLog }) => {
    const colorMap: Record<string, string> = {
      [ActivityType.Running]: '#F59E0B',
      [ActivityType.Walking]: '#3B82F6',
      [ActivityType.Idle]: '#94A3B8',
      [ActivityType.Vehicle]: '#EF4444'
    };
    const color = colorMap[item.type] || '#64748B';

    return (
      <View style={styles.logItem}>
        <Text style={styles.logTime}>{formatTime(item.timestamp)}</Text>
        <View style={styles.logTypeContainer}>
           <View style={[styles.dot, { backgroundColor: color }]} />
           <Text style={[styles.logType, { color }]}>{item.type.toUpperCase()}</Text>
        </View>
        <Text style={styles.logConf}>{(item.confidence * 100).toFixed(0)}%</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        
        <View style={styles.locationCard}>
          <View style={styles.locationHeader}>
            <MaterialCommunityIcons name="map-marker-radius" size={24} color="#DC2626" />
            <Text style={styles.locationTitle}>Ubicación Actual</Text>
          </View>
          {currentLocation ? (
            <View>
              <Text style={styles.coords}>Lat: {currentLocation.latitude.toFixed(6)}</Text>
              <Text style={styles.coords}>Lon: {currentLocation.longitude.toFixed(6)}</Text>
              <Text style={styles.gpsNote}>Precisión: +/- {currentLocation.accuracy?.toFixed(1)}m</Text>
            </View>
          ) : (
            <Text style={styles.waitingText}>
              {hasPermission ? 'Esperando señal GPS...' : 'Se requieren permisos.'}
            </Text>
          )}
        </View>

        <ActivityIndicator 
          activity={currentActivity}
          confidence={confidence}
          speed={currentLocation?.speed || 0}
          acceleration={currentAccel ? Math.sqrt(currentAccel.x**2 + currentAccel.y**2 + currentAccel.z**2) : 0}
          distance={sessionStats.distanceMeters}
          history={accelHistory}
        />

        <SessionStatsCard stats={sessionStats} />

        <TouchableOpacity 
          style={[styles.actionBtn, isActive ? styles.stopBtn : styles.startBtn]}
          onPress={handleToggleTracking}
        >
          <FontAwesome5 name={isActive ? "stop" : "play"} size={20} color="white" />
          <Text style={styles.actionBtnText}>
            {isActive ? "DETENER SESIÓN" : "INICIAR TRACKING"}
          </Text>
        </TouchableOpacity>

        <View style={styles.footerRow}>
          <TouchableOpacity style={styles.footerBtn} onPress={() => setLogsModalVisible(true)}>
            <FontAwesome5 name="scroll" size={16} color="#475569" />
            <Text style={styles.footerBtnText}>Ver Logs ({sessionLogs.length})</Text>
          </TouchableOpacity>
        </View>

      </ScrollView>

      <Modal visible={logsModalVisible} animationType="slide" presentationStyle="pageSheet">
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Registro de Eventos</Text>
            <TouchableOpacity onPress={() => setLogsModalVisible(false)}>
              <MaterialCommunityIcons name="close-circle" size={30} color="#64748B" />
            </TouchableOpacity>
          </View>
          <FlatList
            data={sessionLogs}
            renderItem={renderLogItem}
            keyExtractor={(item, index) => index.toString()}
            ListEmptyComponent={
              <View style={styles.emptyContainer}>
                <MaterialCommunityIcons name="clipboard-text-off-outline" size={48} color="#CBD5E1" />
                <Text style={styles.emptyText}>No hay logs registrados.</Text>
                <Text style={styles.emptySubText}>Inicia una sesión y muévete para generar datos.</Text>
              </View>
            }
          />
        </View>
      </Modal>

    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F1F5F9' },
  scrollContent: { padding: 16, paddingBottom: 40 },
  locationCard: { backgroundColor: 'white', borderRadius: 12, padding: 16, marginBottom: 10, borderWidth: 1, borderColor: '#E2E8F0' },
  locationHeader: { flexDirection: 'row', alignItems: 'center', marginBottom: 8, gap: 8 },
  locationTitle: { fontWeight: 'bold', fontSize: 16, color: '#0F172A' },
  coords: { fontSize: 14, color: '#334155', fontFamily: 'monospace' },
  gpsNote: { fontSize: 12, color: '#94A3B8', marginTop: 4, fontStyle: 'italic' },
  waitingText: { color: '#64748B', fontStyle: 'italic' },
  actionBtn: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', paddingVertical: 16, borderRadius: 16, marginVertical: 10, elevation: 4, shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.2, shadowRadius: 4, gap: 10 },
  startBtn: { backgroundColor: '#2563EB' },
  stopBtn: { backgroundColor: '#EF4444' },
  actionBtnText: { color: 'white', fontWeight: 'bold', fontSize: 18 },
  footerRow: { flexDirection: 'row', justifyContent: 'center', marginTop: 10 },
  footerBtn: { flexDirection: 'row', alignItems: 'center', backgroundColor: 'white', paddingVertical: 12, paddingHorizontal: 24, borderRadius: 12, borderWidth: 1, borderColor: '#E2E8F0', gap: 6 },
  footerBtnText: { color: '#475569', fontWeight: '600', fontSize: 13 },
  modalContainer: { flex: 1, backgroundColor: '#F8FAFC', padding: 20 },
  modalHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 },
  modalTitle: { fontSize: 20, fontWeight: 'bold', color: '#0F172A' },
  logItem: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', paddingVertical: 12, borderBottomWidth: 1, borderBottomColor: '#E2E8F0' },
  logTime: { color: '#64748B', width: 70, fontSize: 12 },
  logTypeContainer: { flex: 1, flexDirection: 'row', alignItems: 'center', gap: 8 },
  dot: { width: 8, height: 8, borderRadius: 4 },
  logType: { fontWeight: 'bold', fontSize: 14 },
  logConf: { color: '#059669', fontWeight: 'bold', fontSize: 12 },
  emptyContainer: { alignItems: 'center', marginTop: 60 },
  emptyText: { textAlign: 'center', color: '#64748B', marginTop: 10, fontSize: 16, fontWeight: 'bold' },
  emptySubText: { textAlign: 'center', color: '#94A3B8', marginTop: 4, fontSize: 14 },
});
