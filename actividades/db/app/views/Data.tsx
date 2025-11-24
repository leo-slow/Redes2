import React, { useState, useEffect } from 'react';
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  ActivityIndicator,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { getData } from '../controllers/Data.js'; 

const COLORS = {
  primaryDark: '#303F9F',
  primary: '#3F51B5',
  accent: '#FF4081',
  textGray: '#757575',
  lineGray: '#BDBDBD',
  background: '#F5F5F5',
};

export default function DataScreen({ navigation }) {
  const [listaAlumnos, setListaAlumnos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);

  const fetchStudents = async (isBackground = false) => {
    if (!refreshing && !isBackground) {
        setLoading(true);
    }
    
    try {
        const data = await getData();
        if (data) {
          setListaAlumnos(data);
        }
    } catch (error) {
        console.error("Error fetching data:", error);
    } finally {
        setLoading(false);
        setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchStudents();

    const intervalId = setInterval(() => {
        fetchStudents(true);
    }, 5000);

    return () => clearInterval(intervalId);
  }, []);

  const renderCard = ({ item }) => (
    <View style={styles.card}>
      <View style={styles.cardHeader}>
        <View style={styles.iconContainer}>
            <MaterialIcons name="person" size={24} color="white" />
        </View>
        <Text style={styles.cardTitle}>{item.nombre}</Text>
      </View>
      
      <View style={styles.cardContent}>
        <View style={styles.cardRow}>
            <Text style={styles.cardLabel}>Matrícula:</Text>
            <Text style={styles.cardValue}>{item.matricula}</Text>
        </View>
        
        <View style={styles.cardRow}>
            <Text style={styles.cardLabel}>Semestre:</Text>
            <Text style={styles.cardValue}>{item.semestre}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={COLORS.primaryDark} barStyle="light-content" />

      <View style={styles.appBar}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={{ paddingRight: 10 }}>
          <MaterialIcons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.appBarTitle}>Base de Datos</Text>
        <View style={{ width: 24 }} />
      </View>

      <View style={styles.container}>
        {loading && !refreshing ? (
            <ActivityIndicator size="large" color={COLORS.primary} style={{ marginTop: 20 }} />
        ) : (
            <FlatList
            data={listaAlumnos}
            keyExtractor={(item, index) => item.id ? item.id.toString() : index.toString()}
            renderItem={renderCard}
            contentContainerStyle={{ padding: 16 }}
            refreshing={refreshing}
            onRefresh={() => {
                setRefreshing(true);
                fetchStudents();
            }}
            ListEmptyComponent={
                <View style={styles.emptyContainer}>
                    <MaterialIcons name="inbox" size={50} color={COLORS.lineGray} />
                    <Text style={{ color: COLORS.textGray, marginTop: 10 }}>No hay alumnos registrados.</Text>
                </View>
            }
            />
        )}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: COLORS.primary,
  },
  appBar: {
    height: 56,
    backgroundColor: COLORS.primary,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    elevation: 4,
  },
  appBarTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
    marginLeft: 16,
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 8,
    marginBottom: 12,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    overflow: 'hidden',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#EEE',
  },
  iconContainer: {
    backgroundColor: COLORS.primary,
    padding: 8,
    borderRadius: 20,
    marginRight: 12,
  },
  cardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    flex: 1,
  },
  cardContent: {
    padding: 12,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 6,
  },
  cardLabel: {
    fontSize: 14,
    color: COLORS.textGray,
  },
  cardValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  emptyContainer: {
    alignItems: 'center',
    marginTop: 50,
  }
});
