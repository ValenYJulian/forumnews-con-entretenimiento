import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';

import HomeScreen from './screens/HomeScreen';
import ClimaScreen from './screens/ClimaScreen';
import ProfileScreen from './screens/ProfileScreen';
import DeportesScreen from './screens/DeportesScreen';
import NoticiasScreen from './screens/NoticiasScreen';
import EntretenimientoScreen from './screens/EntretenimientoScreen';
import DolarScreen from './screens/DolarScreen';

const Drawer = createDrawerNavigator();

export default function MainApp() {
  return (
    <Drawer.Navigator initialRouteName="Inicio">
      <Drawer.Screen name="Inicio" component={HomeScreen} />
      <Drawer.Screen name="Clima" component={ClimaScreen} />
      <Drawer.Screen name="Perfil" component={ProfileScreen} />
      <Drawer.Screen name="Noticias" component={NoticiasScreen} />
      <Drawer.Screen name="Deportes" component={DeportesScreen} />
      <Drawer.Screen name="Dólar" component={DolarScreen} />
      <Drawer.Screen name="Entretenimiento" component={EntretenimientoScreen} />
    </Drawer.Navigator>
  );
}
