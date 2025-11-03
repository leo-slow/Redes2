import { View, Text, StyleSheet, Dimensions } from 'react-native';

export default function Principal({ navigator }){
    return(
        <View style={style.container}>
            <Text style={{ fontSize: 24, padding: 10 }}>DATA FROM API</Text>
        </View>
    );
}

const style = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        height: "100%",
        justifyContent: "flex-start",
        alignItems: "center",
        paddingTop: "13%",
    },
});