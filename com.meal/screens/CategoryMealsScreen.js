import React from "react";
import { CATEGORIES } from "../data/dummy-data";
import MealList from "../components/MealList";
import { useSelector } from 'react-redux'
import { View, StyleSheet } from 'react-native'
import DefaultText from "../components/DefaultText";
function CategoryMealsScreen(props) {
    const catId = props.navigation.getParam('categoryId');
    const availableMeals = useSelector(state => state.mealsReducer.filteredMeals);
    const displayedMeals = availableMeals.filter(meal => meal.categoryIds.includes(catId));

    if (displayedMeals.length === 0 || !displayedMeals) {
        return <View style={styles.content}>
            <DefaultText>No meals found. Please check your filters!</DefaultText>
        </View>
    }

    return <MealList listData={displayedMeals} navigation={props.navigation} />
}
CategoryMealsScreen.navigationOptions = navigationData => {
    const catId = navigationData.navigation.getParam('categoryId');
    const selectedCategory = CATEGORIES.find(category => category.id === catId);
    return {
        headerTitle: selectedCategory.title
    }
}

const styles = StyleSheet.create({
    content: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});


export default CategoryMealsScreen