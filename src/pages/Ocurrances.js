import React, { useState } from 'react';
import { View, AsyncStorage, Dimensions, StyleSheet, Text, Picker, ActivityIndicator, TextInput, Alert, TouchableOpacity } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import api from '../services/api';
import * as Crypto from 'expo-crypto';

export default function Ocurrances() {
    const [description, setDescription] = useState('')
    const [loader, setLoader] = useState(false);
    const [category, setCategory] = useState('Descarte irregular de lixo')
    let photo;
    let location = {
        location
    }

    let chooseMethodToSendImage = async () => {
        Alert.alert(
            'ATENÇÃO',
            'Por Favor escolher um método para coletar a foto !!',
            [
                {
                    text: 'Tirar Foto',
                    onPress: PhotoFromCamera
                },
                {
                    text: 'Enviar arquivo da galeria',
                    onPress: openImagePickerAsync,
                },
                {
                    text: 'Cancelar'
                }
            ]
        )
    }

    let handleSubmmit = async () => {

        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }

        let location;
        const latitude = await AsyncStorage.getItem('lat');
        const longitude = await AsyncStorage.getItem('lng');
        if(latitude === null && longitude === null){
            const aux = await Location.getCurrentPositionAsync({})
            location =
            { 
                latitude : aux.coords.latitude,
                longitude : aux.coords.longitude
            }
        }else{
            
            location = 
            {
                latitude,
                longitude  
            }
            await AsyncStorage.removeItem('lat');
            await AsyncStorage.removeItem('lng');
        }
        
        if (photo !== undefined) {
            setLoader(true);
            let formdata = new FormData();
            formdata.append('img', { type: "image/jpeg", name: 'ocurance.jpg', uri: photo.uri });
            formdata.append('lat', location.latitude);
            formdata.append('lng', location.longitude);
            formdata.append('description', description);
            formdata.append('type', category);
           
            try {
                let result = await api.post('/ocurrance',
                    formdata,
                    {
                        headers:
                        {
                            'Content-Type': 'application/json;charset=utf-8',
                            'user': await AsyncStorage.getItem('user'),
                            'Authorization': 'Bearer ' + await AsyncStorage.getItem('token')
                        }
                    }
                )
                
                if (result.status === 200) {
                    
                    let res = JSON.parse(result.request._response);
                    try{
                       let ok = await api.post('/protocolEmail', {protocol:res.protocol},  {
                            headers:
                            {
                                'user': await AsyncStorage.getItem('user'),
                                'Authorization': 'Bearer ' + await AsyncStorage.getItem('token')
                            }
                        })
                        console.log(ok)
                        if(ok.status === 200){
                            Alert.alert('Sua imagem foi enviada', 'Será enviado um protocolo no seu email para que você possa acompanhar a resolução do problema');
                            setDescription('');
                            setLoader(false);
                        }else{
                            setLoader(false);
                            Alert.alert('Erro ao enviar imagem', 'Verifique sua conexão com a internet');
                        }
                    }catch(e){
                        console.log(e);
                    }
                    
                } else {
                    Alert.alert('Erro ao enviar imagem', 'Verifique sua conexão com a internet');
                    setDescription('');
                    setLoader(false);
                }

            } catch (err) {
                
                Alert.alert('ERRO',
                    'Ocorreu um erro ao enviar');
                setLoader(false);
            }
        } else {
            Alert.alert('ATENÇÃO',
                'Você não pode enviar uma ocorrência sem a foto, por favor tire uma foto e tente novamente');
        }



    };

    const valueChange = (itemValue, itemIndex) => {
        setCategory(itemValue)
        
    }

    let openImagePickerAsync = async () => {
        let permissionResultGaleria = await ImagePicker.requestCameraRollPermissionsAsync(Permissions.LOCATION);

        if (permissionResultGaleria.granted === false) {
            alert("É necessária a permissão da galeria para continuar");
            return;
        }

        let pickerResult = await ImagePicker.launchImageLibraryAsync({
            allowsEditing: true,
            aspect: [4, 5],
            allowsMultipleSelection: true,
        });
        
    }
    let PhotoFromCamera = async () => {
        let PermissionResultCamera = await ImagePicker.requestCameraPermissionsAsync({
            allowsEditing: true,
            aspect: [4, 5]
            , allowsMultipleSelection: true,

        }, Permissions.LOCATION)

        if (PermissionResultCamera.granted === false) {
            alert('Eu preciso da sua permissão para continuar');
        }
        let pickerResult = await ImagePicker.launchCameraAsync();
        if (!pickerResult.cancelled) {
            photo = pickerResult;
            
        }

    }

    return (

        <View style={styles.container}>
            <Text style={styles.header}>
                Formulário de Ocorrência
            </Text>
            <Text>
                Escolha uma categoria
            </Text>
            <View style={styles.customPicker}>
                <Picker
                    selectedValue={category}
                    onValueChange={valueChange}
                >
                    <Picker.Item label="Descate irregular de lixo" value="Descarte irregular de lixo" />
                    <Picker.Item label="Animal Perdido" value="Animal Perdido" />

                    <Picker.Item label="Infraestrutura" value="Infraestrutura" />
                    <Picker.Item label="Outros" value="Outros" />
                </Picker>
            </View>
            <Text style={styles.label}>
                Descreva aqui o que ocorreu
            </Text>
            <View styles={styles.AreaInput}>
                <TextInput
                    multiline={true}
                    numberOfLines={4}
                    style={styles.input}
                    placeholder='Seja o mais claro possível com as palavras'
                    value={description}
                    onChangeText={setDescription}
                />


                {
                    (loader === true) ? (<ActivityIndicator size="large" color="#4286f4" />) :
                        (<View style={styles.containerButton}>
                            <TouchableOpacity onPress={chooseMethodToSendImage} style={styles.buttonSend}>
                                <Icon name='camera' size={20} color={'white'} />
                                <Text style={{ color: 'white', fontSize: 14, marginLeft: 5 }}>Eviar foto</Text>

                            </TouchableOpacity>
                            <TouchableOpacity onPress={handleSubmmit} style={styles.buttonSend}>
                                <Icon name='upload' size={20} color={'white'} />
                                <Text style={{ color: 'white', fontSize: 14, marginLeft: 5 }}>Relatar ocorrência</Text>
                            </TouchableOpacity>
                        </View>)
                }
            </View>


            
        </View>
        
        
    );
}
const { height, width } = Dimensions.get('window');
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignContent: 'center',
        padding: 10,
        marginVertical: 10
    },
    header: {
        fontSize: 25,
        textAlign: 'center',
        margin: 10,
        fontWeight: 'bold'
    },
    label: {
        fontSize: 15
    },
    input: {
        borderWidth: 1,
        borderBottomColor: '#33691e',
        paddingHorizontal: 20,
        fontSize: 16,
        height: 44,
        marginBottom: 20,
        borderRadius: 2,
    },
    button: {
        padding: 10,
        borderRadius: 50,
        backgroundColor: '#4286f4',
        marginLeft: 5,
        marginTop: 15,
        width: 50
    },
    AreaInput: {
        flexDirection: 'row',
    },
    containerButton: {
        flexDirection: "row",
        justifyContent: "space-around",
    },
    buttonSend: {
        padding: 10,
        borderRadius: 2,
        backgroundColor: '#4286f4',
        marginLeft: 5,
        marginTop: 15,
        width: 180,
        height: 44,
        justifyContent: 'center',
        alignContent: 'center',
        flexDirection: 'row'
    },
    customPicker: {
        borderWidth: 1,
        borderBottomColor: '#33691e',
        paddingHorizontal: 20,
        fontSize: 16,
        height: 44,
        marginBottom: 20,
        borderRadius: 2,
    },
    buttonData: {
        justifyContent: 'center',
        alignContent: 'center',
        flexDirection: 'row',
        borderRadius: 2,
        fontWeight: 'bold',
        fontSize: 20,
        padding: 10,
        paddingHorizontal: 20,
        marginBottom: 20,
        height: 44,
        backgroundColor: '#4286f4',
        width: width - 20
    }

});