import * as React from 'react';
import { Button, View, Text } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Logo from './components/screens/Logo';
import Login from './components/screens/Login';
import Dashboard from './components/screens/Dashboard';

function LogoScreen({ navigation, timer = setTimeout(() => { navigation.navigate('Login') }, 2000) }) {
    return (
        <Logo/>
    );
}

function LoginScreen({ navigation }) {
    return (
        <Login onPress={() => navigation.navigate('Dashboard')}/>
    );
}

function DashboardScreen({ navigation }) {
    return (
        <Dashboard onPress={() => navigation.openDrawer()}/>
    );
}

const Drawer = createDrawerNavigator();

function App() {

  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Logo">
        <Drawer.Screen name="Logo" component={ LogoScreen } 
            options={{
                headerMode: "none"
            }}/>
        <Drawer.Screen name="Login" component={ LoginScreen } />
        <Drawer.Screen name="Dashboard" component={ DashboardScreen } />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;