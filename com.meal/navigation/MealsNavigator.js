import React from 'react'
import { Platform, Text } from 'react-native'
import { createStackNavigator } from 'react-navigation-stack'
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { createAppContainer } from 'react-navigation'
import CategoriesScreen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import Colors from '../constants/Colors'
import FavoritesScreen from '../screens/FavoritesScreen'
import { Ionicons } from '@expo/vector-icons'
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'
import FiltersScreen from '../screens/FiltersScreen';

const mealDetail = { MealDetail: MealDetailScreen };
const defaultStackNavOptions = {
    defaultNavigationOptions: {
        headerStyle: {
            backgroundColor: Platform.OS === 'android' ? Colors.primaryColor : '',
        },
        headerTitleStyle: {
            fontFamily: 'open-sans-bold'
        },
        headerBackTitleStyle: {
            fontFamily: 'open-sans'
        },

        headerTintColor: Platform.OS === 'ios' ? Colors.primaryColor : 'white',
    }
}

const mealLabel = 'Meals';
const favoriteLabel = 'Favorites';
const filterLabel = 'Filters';

const MealsNavigator = createStackNavigator({
    Categories: {
        screen: CategoriesScreen
    },
    CategoryMeals: {
        screen: CategoryMealsScreen
    },
    ...mealDetail
}, defaultStackNavOptions);

const FavoriteScreenNavigator = createStackNavigator({
    Favorites: FavoritesScreen,
    ...mealDetail
}, defaultStackNavOptions);

const tabScreenConfig = {
    Meals: {
        screen: MealsNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Ionicons name='ios-restaurant' size={25} color={tabInfo.tintColor} />
            },
            tabBarColor: Colors.primaryColor,
            tabBarLabel: Platform.OS === 'android' && <Text style={{ fontFamily: 'open-sans-bold' }}>{mealLabel}</Text>
        }
    },
    Favorites: {
        screen: FavoriteScreenNavigator,
        navigationOptions: {
            tabBarIcon: (tabInfo) => {
                return <Ionicons name='ios-star' size={25} color={tabInfo.tintColor} />
            },
            tabBarColor: Colors.accentColor,
            tabBarLabel: Platform.OS === 'android' && <Text style={{ fontFamily: 'open-sans-bold' }}>{favoriteLabel}</Text>

        }
    }
}

const FiltersNavigator = createStackNavigator({
    Filters: FiltersScreen,
}, {
        ...defaultStackNavOptions
    });

const Tabs = Platform.OS === 'android' ? createMaterialBottomTabNavigator(tabScreenConfig, {
    activeColor: 'white',
    shifting: true,
    labeled: favoriteLabel,
    barStyle: {
        backgroundColor: Colors.primaryColor
    }
}) : createBottomTabNavigator(tabScreenConfig, {
    tabBarOptions: {
        activeTintColor: Colors.accentColor,
        labelStyle: {
            fontFamily: 'open-sans'
        }
    }
});

const MainNavigator = createDrawerNavigator({
    Meals: {
        screen: Tabs,
        navigationOptions: {
            drawerLabel: mealLabel
        }
    },
    Filters: {
        screen: FiltersNavigator,
        navigationOptions: {
            drawerLabel: filterLabel
        }
    }
}, {
        contentOptions: {
            activeTintColor: Colors.accentColor,
            labelStyle: {
                fontFamily: 'open-sans-bold'
            }
        }
    })
export default createAppContainer(MainNavigator);