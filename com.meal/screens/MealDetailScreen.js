import React, { useEffect, useCallback } from "react";
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import HeaderButton from '../components/HeaderButton';
import DefaultText from "../components/DefaultText";
import { useSelector, useDispatch } from 'react-redux'
import { toggleFavorite } from "../store/actions/mealActions";


function ListItem(props) {
    console.log(props.item);

    return <View style={styles.listIem} key={props.item}>
        <Text key={props.item}>{props.item}</Text>
    </View>
}

function MealDetailScreen(props) {
    const mealId = props.navigation.getParam('mealId');
    const availableMeals = useSelector(state => state.mealsReducer.meals);
    const selectedMeal = availableMeals.find(meal => meal.id === mealId);
    const isFavorite = useSelector(state => state.mealsReducer.favoriteMeals.some(meal => meal.id === mealId));

    const dispatch = useDispatch();
    const toggleFavoriteHandler = useCallback(() => {
        dispatch(toggleFavorite(mealId));
    }, [dispatch, mealId]);

    useEffect(() => {
        props.navigation.setParams({ isFavorite })
    }, [isFavorite])

    useEffect(() => {
        props.navigation.setParams({ toggleFav: toggleFavoriteHandler })
    }, [toggleFavoriteHandler])

    return <ScrollView>
        <Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
        <View style={styles.details}>
            <DefaultText>{selectedMeal.duration}m</DefaultText>
            <DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
            <DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
        </View>
        <Text style={styles.title}>Ingredients</Text>
        {selectedMeal.ingredients.map(ingredient => <ListItem item={ingredient} />)}
        <Text style={styles.title}>List of steps</Text>
        {selectedMeal.steps.map(step => <ListItem item={step} />)}
    </ScrollView>
}

MealDetailScreen.navigationOptions = (navData) => {
    const selectedMealTitle = navData.navigation.getParam('mealTitle');
    const toggleFavorite = navData.navigation.getParam('toggleFav');
    const isFavoriteMeal = navData.navigation.getParam('isFavorite');

    return {
        headerTitle: selectedMealTitle,
        headerRight: <HeaderButtons HeaderButtonComponent={HeaderButton}>
            <Item title='Favorite' iconName={isFavoriteMeal ? 'ios-star' : 'ios-star-outline'} onPress={toggleFavorite} />
        </HeaderButtons>
    }
}

const styles = StyleSheet.create({
    details: {
        flexDirection: 'row',
        padding: 15,
        justifyContent: 'space-around',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
    },
    title: {
        fontFamily: 'open-sans-bold',
        fontSize: 22,
        textAlign: 'center'
    },
    image: {
        width: '100%',
        height: 200
    },
    listIem: {
        marginVertical: 10,
        marginHorizontal: 20,
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 10
    }
});
export default MealDetailScreen