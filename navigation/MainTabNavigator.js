import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import TabBarIcon from '../components/TabBarIcon';

import HomeScreen from '../screens/main_screens/HomeScreen/HomeScreen';
import CourseDetailsScreen from '../screens/main_screens/HomeScreen/CourseDetailsScreen';
import PaymentScreen from '../screens/main_screens/HomeScreen/PaymentScreen';

import BadgeScreen from '../screens/main_screens/BadgeScreen/BadgeScreen';
import CourseScreen from '../screens/main_screens/CourseScreen/CourseScreen';
import ProfileScreen from '../screens/main_screens/ProfileScreen/ProfileScreen';
import {
  BadgeIconBlack, 
  BadgeIconBlue,
  HomeIconBlack,
  HomeIconBlue,
  CourseIconBlack,
  CourseIconBlue,
  ProfileIconBlack,
  ProfileIconBlue
} from '../components/icons/Icons';
import BadgeDetailsScreen from '../screens/main_screens/BadgeScreen/BadgeDetailsScreen';


// const config = Platform.select({
//   web: { headerMode: 'screen' },
//   default: {},
// });

export const HomeStack = createStackNavigator(
  {
    Home: HomeScreen,
    CourseDetails: CourseDetailsScreen,
    Payment: PaymentScreen
  },
  //config,
  {
    initialRouteName: 'Home',
    headerLayoutPreset: 'center'
  }
);

HomeStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    focused?<HomeIconBlue/>:<HomeIconBlack/>
  ),

};



HomeStack.path = '';


const BadgeStack = createStackNavigator(
  {
    Badge: BadgeScreen,
    BadgeDetails : BadgeDetailsScreen
  },
  {headerLayoutPreset: 'center'}
  //config
);

BadgeStack.navigationOptions = {
  tabBarLabel: 'Badges',
  tabBarIcon: ({ focused }) => (
    focused?<BadgeIconBlue/>:<BadgeIconBlack/>
  ),
};

BadgeStack.path = '';

const CourseStack = createStackNavigator(
  {
    Course: CourseScreen,
  },
  {headerLayoutPreset: 'center'}
  //config
);

CourseStack.navigationOptions = {
  tabBarLabel: 'Courses',
  tabBarIcon: ({ focused }) => (
    focused?<CourseIconBlue/>:<CourseIconBlack/>
  ),
};

CourseStack.path = '';

const ProfileStack = createStackNavigator(
  {
    Profile: ProfileScreen,
  },
  {headerLayoutPreset: 'center'}
  //config
);

ProfileStack.navigationOptions = {
  tabBarLabel: 'My Profile',
  tabBarIcon: ({ focused }) => (
    focused?<ProfileIconBlue/>:<ProfileIconBlack/>
  ),
};

ProfileStack.path = '';

const tabNavigator = createBottomTabNavigator({
  HomeStack,
  BadgeStack,
  CourseStack,
  ProfileStack
});

tabNavigator.path = '';

export default tabNavigator;
