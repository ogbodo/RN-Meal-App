import React from "react";
import { FlatList, StyleSheet, View } from 'react-native'
import MealItem from "./MealItem";
import { useSelector } from 'react-redux'

function MealList(props) {
    const favoriteMeals = useSelector(state => state.mealsReducer.favoriteMeals);

    const renderMealItem = itemData => {
        const isFavorite = favoriteMeals.some(meal => meal.id === itemData.item.id)
        return <MealItem
            title={itemData.item.title}
            onSelectMeal={() => {
                props.navigation.navigate({
                    routeName: 'MealDetail',
                    params: {
                        mealId: itemData.item.id,
                        mealTitle: itemData.item.title,
                        isFavorite
                    }
                })
            }}
            duration={itemData.item.duration}
            complexity={itemData.item.complexity}
            affordability={itemData.item.affordability}
            image={itemData.item.imageUrl}

        />
    }
    return <View style={styles.list}>
        <FlatList
            data={props.listData}
            renderItem={renderMealItem}
            style={{ width: '99%', margin: 5 }}
        />
    </View>
}


const styles = StyleSheet.create({
    list: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
});
export default MealList;