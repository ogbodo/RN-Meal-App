import { MEALS } from "../../data/dummy-data";
import { TOGGLE_FAVORITE, SET_FILTERS } from "../actions/mealActions";

const initialState = {
    meals: MEALS,
    filteredMeals: MEALS,
    favoriteMeals: []
}
const mealsReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_FAVORITE:
            const foundMeal = state.favoriteMeals.find(meal => meal.id === action.mealId);
            if (foundMeal) {
                return {
                    ...state,
                    favoriteMeals: state.favoriteMeals.filter(favorite => favorite.id !== action.mealId)
                };
            } else {
                return {
                    ...state,
                    favoriteMeals: state.favoriteMeals.concat(state.meals.find(meal => meal.id === action.mealId))
                };
            }

        case SET_FILTERS:
            const appliedFilter = action.filterSettings;

            const filteredMeals = state.meals.filter(meal => {
                if (appliedFilter.isGlutenFree && !meal.isGlutenFree) {
                    return false;
                }
                if (appliedFilter.isLactoseFree && !meal.isLactoseFree) {
                    return false;
                } if (appliedFilter.isVegan && !meal.isVegan) {
                    return false;
                } if (appliedFilter.isVegetarian && !meal.isVegetarian) {
                    return false;
                }
                return true;
            });
            return { ...state, filteredMeals }

        default:
            return state;
    }
}


export default mealsReducer; 