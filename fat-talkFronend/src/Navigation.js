import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from '../assets/screens/home';
import OrderPage from '../assets/screens/orderPage';
import PointsPage from '../assets/screens/pointsPage';
import Profile from '../assets/screens/morePage';
import ItemsPage from '../assets/screens/itemsPage';
import { StyleSheet, View } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import { StatusBar } from 'expo-status-bar';


// const Stack  = createStackNavigator();
const Tab  = createBottomTabNavigator();


export default function Navigation() {
  return (
    <NavigationContainer style={styles.navContainer}>
       <StatusBar style="dark" /> 
      <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Order') {
            iconName = focused ? 'order' : 'order';
          } else if (route.name === 'Itmes') {
            iconName = focused ? 'shopping-outline' : 'shopping-outline';
          }else if (route.name === 'Earn Points'){
            iconName = focused ? 'qrcode' : 'qrcode';
          } else if (route.name === 'More'){
            iconName = focused ? 'account' : 'account';
          }

          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#FFC72C',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarShowLabel: false, // Hide labels if preferred
      })}
    >
        <Tab.Screen name="Home" component={Home} />
        <Tab.Screen name="Order" component={OrderPage} />
        <Tab.Screen name="Itmes" component={ItemsPage} /> 
        <Tab.Screen name="Earn Points" component={PointsPage} /> 
        <Tab.Screen name="More" component={Profile} /> 
        {/* <Tab.Screen name="Gifs" component={ContactUs} /> */}
      </Tab.Navigator>
    </NavigationContainer>
  )
}

const styles = StyleSheet.create({
  navContainer: {
    backgroundColor: '#000',
  }
})
