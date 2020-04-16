import React, { useState, useEffect } from 'react';
import { View, ScrollView,SafeAreaView ,StyleSheet, Alert, TouchableOpacity, ActivityIndicator, Text, Picker, AsyncStorage, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import api from '../services/api';
export default function TrashTime() {
    const [city, setCity] = useState('')
    const [options, setOptions] = useState([])
    const [loader, setLoader] = useState(false);
    const [cityHours, setCityHours] = useState([]);

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

    let itensReturn = ({ item }) => {
        return (
            <View style={styles.item}>
                <Text style={styles.label}>{item.neighborhood}</Text>
                <Text style={styles.label}>{item.estimatedTime}</Text>
            </View>
        );
    }
    const getHeader = ()=>{
        return (<View style={styles.item}>
             <Text style={styles.tableHeading}>Vila</Text>
             <Text style={styles.tableHeading}>Horário previsto</Text>
        </View>);
    }
    function loadServices() {
        let serviceItems = options.map((option, index) => {

            return <Picker.Item label={option.cityName} value={option._id} key={index} />
        })
        return serviceItems;
    }
    let valueChange = async (itemValue, itemIndex) => {
        setCity(itemValue)
        setLoader(true);
        try {
            let result = await api.get(`/trashtimein/${itemValue}`,
                {
                    headers: {
                        Authorization: `Bearer ${await AsyncStorage.getItem('token')}`
                    }
                }
            )
            setLoader(false)
            setCityHours(JSON.parse(result.request._response))
        } catch (e) {
            Alert.alert('ATENÇÃO',
                'Ocorreu um erro ao pegar os dados !! Verifique sua conexão')
            setLoader(false)
        }
    }
    return (
        <View style={styles.container}>

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
            {(loader) ? (<ActivityIndicator size="large" color="#4286f4" />) :
                
                  
                    <FlatList
                        data={cityHours}
                        renderItem={itensReturn}
                        keyExtractor={(item, index) => index}
                        ListHeaderComponent={getHeader}

                    />
                
            }
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
    },
    tableHeading:{
        textAlign: "center",
        fontSize: 17,
        fontWeight: 'bold'
    },
    item:{
        flex:1,
        flexDirection:'row',
        justifyContent:'space-around',
        alignContent:'flex-start'
    }
})