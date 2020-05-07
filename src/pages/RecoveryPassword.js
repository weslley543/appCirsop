import React, { useState } from 'react';
import {
    View,
    AsyncStorage,
    Image,
    KeyboardAvoidingView,
    Platform,
    Alert,
    ActivityIndicator,
    StyleSheet,
    TouchableOpacity,
    Text,
    TextInput
} from 'react-native';

import api from '../services/api'

export default function RecoveryPassword({ navigation }) {
    const [email, setEmail] = useState('');
    const [loader, setLoader] = useState(false);

    const handleSubmit = async () => {
        if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)) {
            try {
                setLoader(true);
                let result = await api.post('/recoveryPassword', { email });

                if (result.status === 200) {
                    
                    await AsyncStorage.setItem('email', email);
                    navigation.navigate('Resetar senha')
                    setLoader(false);
                } else {
                    setLoader(false);
                    Alert.alert('Erro na requisição', 'Seu email não está cadastrado');
                }
            } catch (e) {
                Alert.alert('Ocorreu um erro na requisição', 'Verifique sua conexão com a internet')
            }
        } else {
            Alert.alert('Email inválido', 'Insira um email válido');
        }
    }
    return (
        <View style={styles.container}>
            <KeyboardAvoidingView behavior="padding" enabled={Platform.OS}>
                <Text style={styles.label}>Digite seu email</Text>
                <TextInput style={styles.input}
                    placeholder="Seu email "
                    placeholderTextColor="#999"
                    autoCapitalize="none"
                    autoCorrect={false}
                    value={email}
                    onChangeText={setEmail}

                />


                {
                    (loader === true) ? (<ActivityIndicator size="large" color="#4286f4" />) :
                        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                            <Text style={{ color: 'white', fontSize: 20, padding: 2 }}>Enviar</Text>
                        </TouchableOpacity>
                }






            </KeyboardAvoidingView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
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