import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

import Splash from '../pages/Splash';
import DashBoard from '../pages/DashBoard';
import Salario from '../pages/Salario';

const Auth = createStackNavigator();

const AuthRoutes: React.FC = () => (
  <Auth.Navigator
  screenOptions={{
    headerShown: false,
    cardStyle: { backgroundColor: '#673AB7'},
  }}>
    <Auth.Screen name="Splash" component={Splash} />
    <Auth.Screen name="DashBoard" component={DashBoard} />
    <Auth.Screen name="Salario" component={Salario} />
  </Auth.Navigator>
);

export default AuthRoutes;