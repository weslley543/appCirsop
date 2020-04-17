import React, { useState, useEffect } from 'react';
import { View, AsyncStorage, Image, KeyboardAvoidingView, Platform, Alert, ActivityIndicator, StyleSheet, TouchableOpacity, Text, TextInput, Button } from 'react-native';
import logo from '../../assets/logo1.png'
import api from '../services/api'


export default function Login({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoad] = useState(false);

   

    async function handleSubmit() {
        setLoad(true);
        try {
            const response = await api.post('/login',
                {
                    email,
                    password
                }

            );

            if (response.status === 200) {
                setLoad(false);
                const { id } = response.data;
                const { token } = response.data
                await AsyncStorage.setItem('user', id);
                await AsyncStorage.setItem('token', token);
                navigation.navigate('Mapa das Ocorrências');


            } else {
                setLoad(false);
                Alert.alert('Ocorreu um erro no seu login, verifique sua senha ou usuário !!');

            }
        } catch (err) {
            setLoad(false);
            Alert.alert('Ocorreu um erro no seu login, verifique sua senha ou usuário !!');

        }
    }
    let handleRegister = () => {
        navigation.navigate('Registre-se');
    }
    return (

        <KeyboardAvoidingView behavior="padding" enabled={Platform.OS} style={styles.container}>
            <Image source={logo} style={styles.image} />
            <Text style={styles.label}>Seu Email*</Text>
            <TextInput style={styles.input}
                placeholder="Seu Email "
                placeholderTextColor="#999"
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                value={email}
                onChangeText={setEmail}
            />
            <Text style={styles.label}>Sua Senha*</Text>
            <TextInput style={styles.input}
                placeholder="Sua senha "
                placeholderTextColor="#999"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={true}
                value={password}
                onChangeText={setPassword}
            />
            {
                (loading === true) ? (<ActivityIndicator size="large" color="#4286f4" />) :
                    (<View>
                        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                            <Text style={{ color: 'white', fontSize: 20, padding: 2 }}>Login </Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.transparentButton} onPress={handleRegister}>
                            <Text style={{ color: "#4286f4", fontSize: 15, padding: 2 }}
                            >
                                Você ainda não é cadastrado ? Registre-se aqui !!
                        </Text>
                        </TouchableOpacity>

                    </View>)
            }
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignContent: 'center',
        padding: 10
    },
    image: {
        height: 150,
        resizeMode: "contain",
        alignSelf: 'center'
    },
    form: {
        alignSelf: 'stretch',
        paddingHorizontal: 30,
        marginTop: 30,
    },
    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
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
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 2,
        fontWeight: 'bold',
        fontSize: 20,
        marginTop: 25,
        padding: 10,
        backgroundColor: '#4286f4'
    },
    transparentButton: {
        marginTop: 15,
        justifyContent: "center",
        alignItems: "center",
    },
    AreaInput: {
        flexDirection: 'row',
    },



});