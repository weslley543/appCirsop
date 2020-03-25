import React, { useState, useEffect } from 'react';
import { View, StyleSheet, Alert, TouchableOpacity, Text, Picker, AsyncStorage } from 'react-native';
import { Table, TableWrapper, Row, Rows, Col, Cols, Cell } from 'react-native-table-component';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import api from '../services/api';
export default function TrashTime({ navigation }) {
    const [city, setCity] = useState('')
    const [options, setOptions] = useState([])

    const handleViewOcurrances = () => {
        navigation.navigate('ViewOcurrance')
    }

    useEffect(() => {
        async function getCities() {
            try {
                let result = await api.get('/city',
                    {
                        headers: {
                            Authorization: `Bearer ${await AsyncStorage.getItem('token')}`
                        }
                    }
                )
                setOptions(JSON.parse(result.request._response));
            } catch (e) {
                Alert.alert(
                    'ATENÇÃO',
                    'Ocorreu um erro ao pegar os dados !!'
                )
            }

        }
        getCities();
    }, [])

    const loadTrashTruckTimeIn = async () => {
        let result = await api.get(`/loadtrashtimein/${city}`, {
            headers: {
                Authorization: `Bearer ${await AsyncStorage.getItem('token')}`
            }
        })
    }
    function loadServices() {
        let serviceItems = options.map((option, index) => {

            return <Picker.Item label={option.cityName} value={option._id} key={index} />
        })
        return serviceItems;
    }
    let valueChange = async (itemValue, itemIndex) => {
        setCity(itemValue)
        
        let result = await api.get(`/trashtimein/${itemValue}`,
            {
                headers: {
                    Authorization : `Bearer ${await AsyncStorage.getItem('token')}`
                }
            }
        )
        console.log(JSON.parse(result.request._response));
    }
    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={handleViewOcurrances} style={styles.button}>
                <Icon name='arrow-left' size={25} color={'white'} />
            </TouchableOpacity>

            <Text style={styles.header}>Horários da coleta do lixo</Text>

            <Text style={styles.label}>Escolha sua cidade</Text>
            <Picker
                selectedValue={city}
                onValueChange={
                    valueChange
                }>
                {
                    loadServices()
                }
            </Picker>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignContent: 'center',
        padding: 10,
        marginVertical: 10
    },
    button: {
        padding: 10,
        borderRadius: 50,
        backgroundColor: '#4286f4',
        marginLeft: 5,
        marginTop: 15,
        width: 50
    },
    header: {
        fontSize: 25,
        textAlign: 'center',
        margin: 10,
        fontWeight: 'bold'
    },
    label: {
        textAlign: "center",
        fontSize: 15
    }
})