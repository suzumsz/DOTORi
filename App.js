import * as React from 'react';
import {SafeAreaView, ScrollView, View, Image} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import 'react-native-gesture-handler';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { Component, Text, } from 'react-native';
import moment from 'moment';

import Logo from './components/screens/Logo';
import Login from './components/screens/Login';
import Dashboard from './components/screens/Dashboard';
import Profile from './components/screens/Profile';
import Passwordedit from './components/screens/Passwordedit';

function LogoScreen({
  navigation,
  timer = setTimeout(() => {
    navigation.navigate('Login');
  }, 2000),
}) {
  return <Logo />;
}

function LoginScreen({navigation}) {
  return <Login />;
}

function DashboardScreen({navigation}) {
  
  return <Dashboard />;
}

function ProfileScreen({navigation}) {
  return <Profile />;
}

function PasswordeditScreen({navigation}) {
  return <Passwordedit />;
}

const Tab = createBottomTabNavigator();

function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
      /*   initialRouteName="Logo"
        backBehavior="history"
        headerMode="none"
        drawerStyle={{
          backgroundColor: 'rgba(255,132,42,1)',
          color: '#ffffff',
        }}*/
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            let iconName;

            if (route.name === 'Dashboard') {
              iconName = "md-home" ;
            } else if (route.name === 'Profile') {
              iconName = "ios-contact" ;
            }

            else if (route.name === 'Passwordedit') {
              iconName = "ios-lock" ;
            }

            return <Ionicons name={iconName} size={25} color={color} />;
          },
        })}
        tabBarOptions={{
          activeTintColor: "#ff842a",
          inactiveTintColor: 'gray',
          keyboardHidesTabBar: true,
          
        }}
        >
     
        <Tab.Screen
          name="logo"
          component={LogoScreen}
          options={{
            headerMode: 'none',
            tabBarVisible: false,
           // tabBarIcon:()=>(  
            //  <Ionicons name="ios-home" color='gray' size={25}/> )  
          }} 
        />
        <Tab.Screen name="Login" component={LoginScreen} options={{
            //headerMode: 'none',
            tabBarVisible: false
          }} 
            />
        <Tab.Screen name="Dashboard" component={DashboardScreen} options={{
            tabBarVisible: false
          }}  />
        <Tab.Screen name="Profile" component={ProfileScreen} options={{
            tabBarVisible: false
          }} />
        <Tab.Screen name="Passwordedit" component={PasswordeditScreen} options={{
            tabBarVisible: false
          }} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

 

export default App;