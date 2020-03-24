import React, { useState } from 'react';
import { Image, View, Text, TextInput, KeyboardAvoidingView, TouchableOpacity, Button, StyleSheet, AsyncStorage } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import api from '../services/api'


export default function Register({ navigation }) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [name, setName] = useState('');
    const [password2, setPassword2] = useState('');
    const [verifyPassword, setVerifyPassword] = useState(false)
    const handleBack = () => {
        navigation.navigate('Login');
    }
    const handleSubmit = async () => {
        if (password !== password2) {
            setVerifyPassword(true);
        } else {
            try {
                let data = {
                    email,
                    name,
                    password
                }
                let result = await api.post('/register', data);
                if (result.status === 200) {
                    let dados = JSON.parse(result.request._response);
                    await AsyncStorage.setItem('user', dados.user._id);
                    await AsyncStorage.setItem('token', dados.token);
                    navigation.navigate('ViewOcurrance');
                }
            } catch (err) {
                console.log(err);
            }
        }

    }
    return (
        <View style={styles.container}>
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.buttom} onPress={handleBack}>
                    <Icon name='arrow-left'  size={25} color={'white'} />
                </TouchableOpacity>
            </View>
            <KeyboardAvoidingView style={{ marginVertical: 65 }} behavior="padding" enabled={Platform.OS}>
                <Text style={styles.header}>Cadastro</Text>
                <Text style={styles.label}>Seu Nome</Text>
                <TextInput style={styles.input}
                    placeholder="Seu Nome "
                    placeholderTextColor="#999"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={name}
                    onChangeText={setName}
                />
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Email"
                    placeholderTextColor="#999"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={email}
                    onChangeText={setEmail}
                />
                <Text style={styles.label}>Sua Senha *</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Sua senha "
                    placeholderTextColor="#999"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                />
                <Text style={styles.label}>Confirme sua senha *</Text>
                <TextInput
                    style={styles.input}
                    placeholder="Sua senha "
                    placeholderTextColor="#999"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                    value={password2}
                    onChangeText={setPassword2}
                />

                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                    <Text style={{ color: 'white', fontSize: 20, padding: 2 }}>Registrar</Text>
                </TouchableOpacity>
                {
                    (verifyPassword === true) ? (<Text style={{ color: 'red' }}>A senhas não correspondem, insira novamente sua senha </Text>) : (<Text></Text>)
                }

            </KeyboardAvoidingView>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'flex-start',
        alignContent: 'center',
        padding: 10,
        marginVertical: 15
    },
    input: {
        borderWidth: 1,
        borderBottomColor: '#33691e',
        paddingHorizontal: 20,
        fontSize: 16,
        height: 44,
        marginBottom: 20,
        borderRadius: 2
    },
    label: {
        fontWeight: 'bold',
        color: '#444',
        marginBottom: 8,
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
    header: {
        fontSize: 27,
        textAlign: 'center',
        fontWeight: 'bold'
    },
    buttom: {
        padding: 10,
        borderRadius: 50,
        backgroundColor: '#4286f4',
        marginLeft: 5,
        marginTop: 15,
        width: 50
    },
    buttonContainer: {
        marginVertical: 15
    }
})