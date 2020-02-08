import React from "react";
import { View, Text, StyleSheet } from 'react-native';

function CategoriesScreen(props) {
    return <View style={styles.screen}>
        <Text>That's the Category screen!</Text>
    </View>
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
export default CategoriesScreen