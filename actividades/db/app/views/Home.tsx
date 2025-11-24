import React, { useState } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  SafeAreaView,
  Platform,
  Alert,
} from 'react-native';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { setData } from '../controllers/Data.js';

const COLORS = {
  primaryDark: '#303F9F',
  primary: '#3F51B5',
  accent: '#FF4081',
  textGray: '#757575',
  lineGray: '#BDBDBD',
  buttonGray: '#E0E0E0',
};

export default function HomeScreen({ navigation }) {
  const [isMatriculaFocused, setIsMatriculaFocused] = useState(true);
  
  const [Matricula, setMatricula] = useState('');
  const [Nombre, setNombre] = useState('');
  const [Semestre, setSemestre] = useState('');
  
  const [loading, setLoading] = useState(false);

  const handlePress = async () => {
    if (!Matricula.trim() || !Nombre.trim() || !Semestre.trim()) {
      Alert.alert('Atención', 'Por favor llena todos los campos.');
      return;
    }

    setLoading(true);

    const success = await setData(Matricula, Nombre, Semestre);

    setLoading(false);

    if (success) {
      Alert.alert('Éxito', 'Datos almacenados correctamente.');
      setMatricula('');
      setNombre('');
      setSemestre('');
    } else {
      Alert.alert('Error', 'Hubo un problema al almacenar los datos.');
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar backgroundColor={COLORS.primaryDark} barStyle="light-content" />

      <View style={styles.appBar}>
        <Text style={styles.appBarTitle}>Practica_Supabase</Text>
        <TouchableOpacity>
          <MaterialIcons name="more-vert" size={24} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.container}>
        
        <View style={styles.inputWrapper}>
          <Text style={[
            styles.label, 
            { color: isMatriculaFocused ? COLORS.accent : COLORS.textGray }
          ]}>
            Matrícula
          </Text>
          <TextInput
            style={[
              styles.inputUnderline,
              { borderBottomColor: isMatriculaFocused ? COLORS.accent : COLORS.lineGray }
            ]}
            onFocus={() => setIsMatriculaFocused(true)}
            onBlur={() => setIsMatriculaFocused(false)}
            onChangeText={setMatricula}
            value={Matricula}
          />
        </View>

        <View style={styles.inputWrapper}>
          <TextInput
            style={[styles.inputUnderline, { borderBottomColor: COLORS.lineGray }]}
            placeholder="Nombre"
            placeholderTextColor={COLORS.textGray}
            onChangeText={setNombre}
            value={Nombre}
          />
        </View>

        <View style={styles.inputWrapper}>
          <TextInput
            style={[styles.inputUnderline, { borderBottomColor: COLORS.lineGray }]}
            placeholder="Semestre"
            placeholderTextColor={COLORS.textGray}
            onChangeText={setSemestre}
            value={Semestre}
          />
        </View>

        <TouchableOpacity 
          style={[styles.button, { opacity: loading ? 0.6 : 1 }]} 
          onPress={handlePress}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? "GUARDANDO..." : "GRABAR"}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.button, { opacity: loading ? 0.6 : 1 }]} 
          onPress={() => navigation.navigate('Data')}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            IR A OBTENER
          </Text>
        </TouchableOpacity>


      </View>

      <TouchableOpacity style={styles.fab}>
        <MaterialCommunityIcons name="email" size={24} color="white" />
      </TouchableOpacity>

    </SafeAreaView>
  );
};

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
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    elevation: 4,
    zIndex: 1,
  },
  appBarTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '500',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    padding: 16,
    paddingTop: 24,
  },
  inputWrapper: {
    marginBottom: 12,
  },
  label: {
    fontSize: 12,
    marginBottom: 4,
  },
  inputUnderline: {
    borderBottomWidth: 2,
    paddingVertical: Platform.OS === 'ios' ? 8 : 4,
    fontSize: 16,
    color: 'black',
  },
  button: {
    backgroundColor: COLORS.buttonGray,
    paddingVertical: 12,
    alignItems: 'center',
    marginTop: 20,
    borderRadius: 2,
    elevation: 2,
  },
  buttonText: {
    color: 'black',
    fontWeight: '500',
    fontSize: 14,
  },
  fab: {
    position: 'absolute',
    width: 56,
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    right: 16,
    bottom: 16,
    backgroundColor: COLORS.accent,
    borderRadius: 28,
    elevation: 6,
    zIndex: 2,
  },
});
