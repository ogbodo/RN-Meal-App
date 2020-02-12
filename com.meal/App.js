import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import * as Fonts from 'expo-font';
import { AppLoading } from 'expo';
import Tabs from './navigation/MealsNavigator';
import { enableScreens } from 'react-native-screens';
import { createStore, combineReducers } from 'redux'
import mealsReducer from './store/reducers/mealReducer';
import { Provider } from 'react-redux'

enableScreens()//To increase performance under the hood when going between screens

const rootReducer = combineReducers({ mealsReducer })
const store = createStore(rootReducer);

function fetchFonts() {
  return Fonts.loadAsync({
    'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
    'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf')
  })
}
const App = () => {
  const [fontLoaded, setFontLoaded] = useState(false);
  if (!fontLoaded) {
    return <AppLoading
      startAsync={fetchFonts}
      onFinish={() => setFontLoaded(true)} />
  }
  return <Provider store={store}><Tabs /></Provider>;
}

export default App;
