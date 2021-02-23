import React from 'react';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import LearningModuleNavigator from './LearningModuleNavigator'
import MainTabNavigator from './MainTabNavigator';
import {LoginNavigator} from './ScreenNavigator';
// import {HomeStack} from './MainTabNavigator';

export default createAppContainer(
  createSwitchNavigator({
    // You could add another route here for authentication.
    // Read more at https://reactnavigation.org/docs/en/auth-flow.html
    Main: MainTabNavigator,
    Login: LoginNavigator,
    Learning: LearningModuleNavigator
    // Home: HomeStack

  },
  {
    initialRouteName: 'Login'
  })
);
