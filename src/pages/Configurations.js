import React, { useState, useEffect } from 'react';
import {
    View, StyleSheet, Image, Text, ActivityIndicator, TouchableOpacity,
    ScrollView, AsyncStorage, TextInput, Picker
} from 'react-native'

import api from '../services/api'

import logo from '../../assets/logo1.png'
export default function Configurations() {
    const [nome, setNome] = useState('');
    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');
    const [senha2, setSenha2] = useState('');
    const [avatar, setAvatar] = useState('');
    useEffect(() => {
        async function getUser() {
            try {
                const authorization = await AsyncStorage.getItem('token');
                const id = await AsyncStorage.getItem('user');

                const response = await api.get(`/getUser/id/${id}`,{
                    headers:{
                       Authorization: `Bearer ${authorization}`
                    }
                });
                const { name, email, img_url } = response.data;
                setNome(name);
                setEmail(email);
                setAvatar(img_url);
            } catch (err) {
                console.log(err);
            }

        }
        getUser();
    }, [])
    const handleUpdate = async () =>{
        console.log('funcionando')
    }
    const handleChangePhoto = () =>{

    }
    return (
        <View style={styles.container}>
            <ScrollView style={styles.scrollView}>
                <TouchableOpacity onPress={handleChangePhoto} style={styles.avatarContainer}>
                    <Image style={styles.avatar} source={{
          uri: avatar,
        }} />
                </TouchableOpacity>
                <View styles={styles.formContainer}>
                    <Text style={styles.label}>Nome</Text>
                    <TextInput style={styles.input}
                        placeholder='Seu nome'
                        placeholderTextColor="#999"
                        autoCorrect={ false }
                        value={ nome }
                        onChangeText= { setNome }

                    />
                    <Text style={styles.label}>Email</Text>
                    <TextInput style={styles.input}
                        placeholder='Email'
                        placeholderTextColor="#999"
                        autoCorrect={ false }
                        value={ email }
                        onChangeText = { setEmail }

                    />
                    <Text style={styles.label}>Cidade</Text>
                    <View style={styles.customPicker}>
                        <Picker

                        >
                            <Picker.Item label="Presidente Prudente" value="Presidente Prudente" />

                        </Picker>
                    </View>
                    <Text style={styles.label}>Senha</Text>
                    <TextInput style={styles.input}
                        placeholder='Senha'
                        placeholderTextColor="#999"
                        secureTextEntry={true}
                        value = {senha}
                        onChangeText = {setSenha}

                    />
                    <Text style={styles.label}>Confirme a senha</Text>
                    <TextInput style={styles.input}
                        placeholder='Confirme a senha'
                        placeholderTextColor="#999"
                        secureTextEntry={true}
                        value = {senha2}
                        onChangeText = {setSenha2}

                    />

                    <TouchableOpacity onPress={handleUpdate} style={styles.button}>
                        <Text style={{ color: "#fafafa", fontSize: 15, padding: 2 }}>Atualizar</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}

styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignContent: 'center',
        padding:10
    },
    scrollView: {
        marginHorizontal: 10
    },
    avatarContainer: {
        flex: 1,
        alignSelf: 'center',
        height: 150,
        width: 150,
        justifyContent:'center'

    },
    avatar: {
        height: 150,
        width: 150,
        resizeMode: "contain",
        alignSelf: 'center',
        borderRadius: 150/2,
    },
    label: {
        fontWeight: 'bold',
        color: '#444',
        marginVertical: 5,
    },
    formContainer: {
        flex: 1,
        justifyContent: 'flex-start',
        alignSelf: 'center',
        alignContent: 'center',
    },
    input: {
        borderWidth: 1,
        borderBottomColor: '#33691e',
        paddingHorizontal: 20,
        fontSize: 16,
        height: 44,
        marginVertical: 10,
        marginBottom: 20,
        borderRadius: 2,
    },
    customPicker: {
        flex: 1,
        borderWidth: 1,
        borderBottomColor: '#33691e',
        fontSize: 16,
        height: 44,
        borderRadius: 2,
        marginBottom: 20,
        justifyContent: 'center',
        paddingHorizontal: 9

    },
    button: {
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 2,
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 25,
        padding: 10,
        backgroundColor: '#4286f4'
    },

})