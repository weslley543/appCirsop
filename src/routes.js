import React from 'react'

import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
import Login from './pages/Login'
import Register from './pages/Register'
import AppRoutes from './pages/routes/app.routes'
import Ocurrance from './pages/Ocurrances'

export default function Routes() {
    return (
            <Stack.Navigator initialRouteName='Login' headerMode="float">
                <Stack.Screen name='Login' component={Login} />
                <Stack.Screen
                 name='Registre-se' 
                 component={Register} 
                 options={{}}/>
                <Stack.Screen name='Mapa das Ocorrências' navigationOptions={{header:null}} component={AppRoutes}
                    options={{title:''}}
                />
                
                
            </Stack.Navigator>
    );
}