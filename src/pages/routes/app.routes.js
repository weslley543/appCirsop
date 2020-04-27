import React from 'react';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
const Tab = createMaterialBottomTabNavigator();
import Ocurrances from '../Ocurrances';
import ViewOcurrances from '../ViewOcurrance'
import TrashTime from '../TrashTime'

export default function BottomTab() {
    return (

        <Tab.Navigator
            activeColor="#f0edf6"
            inactiveColor="#fafafa"
            barStyle={{ backgroundColor: '#4286f4' }}
            headerMode="none"
            >
            
            <Tab.Screen name='Mapa das Ocorrências' component={ViewOcurrances}
                options={{
                    
                    tabBarIcon: ({ color }) => (
                        <Icon name='map-marker' size={20} color={'#fafafa'} />
                    ),
                }}

            />
            <Tab.Screen name='Enviar uma ocorrência' component={Ocurrances}
            options={{
                
                tabBarIcon: ({ color }) => (
                    <Icon name='send' size={20} color={'#fafafa'} />
                ),
            }}
            />
            <Tab.Screen name='Hora do lixo' component={TrashTime} 
                options={{
                    
                    tabBarIcon: ({ color }) => (
                        <Icon name='clock' size={20} color={'#fafafa'} />
                    ),
                }}
            />
            
        </Tab.Navigator>
       
    );
}