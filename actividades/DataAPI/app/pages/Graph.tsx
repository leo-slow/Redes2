import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BarChart } from 'react-native-chart-kit';
import { Dimensions } from 'react-native';

export default function Graph({ route }) {
    const { region, date, deaths, confirmed, active } = route.params;

    // Obtiene el ancho de la pantalla
    const { width } = Dimensions.get('window');

    const data = {
        labels: ['Casos Confirmados', 'Muertes', 'Casos Activos'],
        datasets: [
            {
                data: [confirmed, deaths, active],
                color: (opacity = 1) => `rgba(134, 65, 244, ${opacity})`, // Color de las barras
                barThickness: 20, // Grosor de las barras
            },
        ],
    };

    const chartConfig = {
        backgroundColor: '#ffffff',
        backgroundGradientFrom: '#ffffff',
        backgroundGradientTo: '#ffffff',
        decimalPlaces: 0,
        color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        style: {
            borderRadius: 16,
        },
    };

    return (
        <View style={styles.main}>
            <View style={styles.second}>
                <View>
                    <Text style={styles.text}>Date: {date}</Text>
                    <Text style={styles.text}>Region: {region}</Text>
                    <Text style={styles.text}>Deaths: {deaths}</Text>
                    <Text style={styles.text}>Confirmed: {confirmed}</Text>
                    <Text style={styles.text}>Active: {active}</Text>
                </View>
            </View>
            <View style={styles.third}>
                <Text style={{ fontSize: 18, marginBottom: 10 }}>Estadísticas en {region} ({date})</Text>
                <BarChart
                    data={data}
                    width={width - 20}
                    height={380}
                    chartConfig={chartConfig}
                    verticalLabelRotation={30}
                />
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    main: {
        width: "100%",
        height: "100%",
        justifyContent: "flex-start",
        alignItems: "center",
    },
    second: {
        width: "100%",
        height: "40%",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(97, 87, 87, 0.7)",
        borderRadius: 15,
        marginBottom: "5%",
    },
    third: {
        width: "90%",
        height: "40%",
        justifyContent: "flex-start",
        alignItems: "center",
        borderRadius: 15,
        marginBottom: "5%",
    },
    text: {
        textAlign: 'center',
    }
});
