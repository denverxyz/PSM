import React from 'react';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import LearningScreen from '../screens/learning_module_screens/LearningScreen';
import MyCourseDetailsScreen from '../screens/learning_module_screens/MyCourseDetailsScreen';
import TestScreen from '../screens/learning_module_screens/TestScreen';

import {
  TestIconBlack, 
  TestIconBlue,
  DetailsIconBlack,
  DetailsIconBlue,
  CourseIconBlack,
  CourseIconBlue
} from '../components/icons/Icons';
import QuestionScreen from '../screens/learning_module_screens/QuestionScreen';


// const config = Platform.select({
//   web: { headerMode: 'screen' },
//   default: {},
// });




const MyCourseStack = createStackNavigator(
  {
    MyCourse: MyCourseDetailsScreen,
  },
  {headerLayoutPreset: 'center'}
  //config
);

MyCourseStack.navigationOptions = {
  tabBarLabel: 'Details',
  tabBarIcon: ({ focused }) => (
    focused?<DetailsIconBlue/>:<DetailsIconBlack/>
  ),
};

MyCourseStack.path = '';


export const LearningStack = createStackNavigator(
    {
      Learning: LearningScreen
    },
    {headerLayoutPreset: 'center'}
    //config,
);
  
LearningStack.navigationOptions = {
tabBarLabel: 'Modules',
tabBarIcon: ({ focused }) => (
  focused?<CourseIconBlue/>:<CourseIconBlack/>
  ),

};
  
LearningStack.path = '';

const TestStack = createStackNavigator(
  {
    Test: TestScreen,
    Question: QuestionScreen
    
  },
  {headerLayoutPreset: 'center',
    defaultNavigationOptions: {
      gesturesEnabled: false,
    }  
  }
  //config
);
TestStack.navigationOptions = ({navigation}) => {
  let tabBarVisible = true;
  if (navigation.state.index > 0) {
    tabBarVisible = false;
  }

  return {
    tabBarVisible,
    tabBarLabel: 'Test',
    tabBarIcon: ({ focused }) => (
      focused?<TestIconBlue/>:<TestIconBlack/>
    )
  };
}

TestStack.path = '';

const tabNavigator = createBottomTabNavigator({
  MyCourseStack,
  LearningStack,
  TestStack
});

tabNavigator.path = '';

export default tabNavigator;
