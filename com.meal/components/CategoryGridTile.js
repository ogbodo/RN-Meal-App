import React from "react";
import { View, Text, StyleSheet, Platform, TouchableNativeFeedback, TouchableOpacity } from 'react-native';


function CategoryGridTile(props) {
    let ButtonComponent = TouchableOpacity;
    if (Platform.OS === 'android' && Platform.Version >= 21) {
        ButtonComponent = TouchableNativeFeedback;
    }

    return <View style={styles.gridItemStyle}>
        <ButtonComponent
            style={{ flex: 1 }}
            activeOpacity={0.6}
            onPress={props.onSelect}>
            <View style={{ backgroundColor: props.color, ...styles.container }}>
                <Text style={styles.title}>{props.title}</Text>
            </View>
        </ButtonComponent>
    </View>
}


const styles = StyleSheet.create({
    gridItemStyle: {
        flex: 1,
        margin: 15,
        height: 150,
        borderRadius: 10,
        overflow: Platform.OS === 'android' && Platform.Version >= 21 ? 'hidden' : 'visible',
        elevation: 5,

    },
    container: {
        flex: 1,
        borderRadius: 10,
        shadowColor: 'black',
        shadowOpacity: 0.26,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 10,
        padding: 15,
        justifyContent: 'flex-end',
        alignItems: 'flex-end'
    },
    title: {
        fontFamily: 'open-sans-bold',
    }
})
export default CategoryGridTile