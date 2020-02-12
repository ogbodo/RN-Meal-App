import React from "react";
import MealList from "../components/MealList";
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import HeaderButton from '../components/HeaderButton'
import { useSelector } from 'react-redux'
import { View, StyleSheet } from 'react-native'
import DefaultText from "../components/DefaultText";


function FavoritesScreen(props) {
    const favoriteMeals = useSelector(state => state.mealsReducer.favoriteMeals);

    if (favoriteMeals.length === 0 || !favoriteMeals) {
        return <View style={styles.content}>
            <DefaultText>No favorite found. Start adding some!</DefaultText>
        </View>
    }
    return <MealList listData={favoriteMeals} navigation={props.navigation} />
};

FavoritesScreen.navigationOptions = (navData) => {
    return {
        headerTitle: 'Your Favorites',
        headerLeft: <HeaderButtons HeaderButtonComponent={HeaderButton} >
            <Item title='Menu' iconName='ios-menu' onPress={() => {
                navData.navigation.toggleDrawer();
            }} />
        </HeaderButtons>
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});

export default FavoritesScreen