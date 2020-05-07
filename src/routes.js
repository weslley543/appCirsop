import React from 'react'

import { createStackNavigator } from '@react-navigation/stack';
const Stack = createStackNavigator();
import Login from './pages/Login';
import Register from './pages/Register';
import AppRoutes from './pages/routes/app.routes';
import RecoveryPassword from './pages/RecoveryPassword';
import ResetPassword from './pages/ResetPassword'


export default function Routes() {
    return (
        <Stack.Navigator initialRouteName='Login' headerMode="float">
            <Stack.Screen name='Login' component={Login} />
            <Stack.Screen
                name='Registre-se'
                component={Register}
                options={{}} />
            <Stack.Screen name='Recuperação de Senha' component={RecoveryPassword} />
            <Stack.Screen name='Resetar senha' component={ResetPassword} />
            <Stack.Screen name='Mapa das Ocorrências' navigationOptions={{ header: null }} component={AppRoutes}
                
            />


        </Stack.Navigator>
    );
}