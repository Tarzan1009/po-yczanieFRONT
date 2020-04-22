import { createStackNavigator } from 'react-navigation-stack';
import React from 'react';
import Header from '../shared/header';
import Register from './register';
 
const screens = {
  Register: {
    screen: Register,
    navigationOptions: ({ navigation }) => {
      return {
        headerTitle: () => <Header title='Rejestracja' navigation={navigation} />
      }
    },
  },
}

const RegisterStack = createStackNavigator(screens, {
  defaultNavigationOptions: {
    headerTintColor: '#444',
    headerStyle: { backgroundColor: '#eee', height: 60 },
  }
});

export default RegisterStack;