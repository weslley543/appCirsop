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

export default function ResetPassword({ navigation }) {

    const [recoveryToken, setrecoveryToken] = useState('');
    const [password, setPassword] = useState('');
    const [password2, setPassword2] = useState('');
    const [loader, setLoader] = useState(false)

    const handleSubmit = async () => {
        if ((password === password2) && (password !== "" && password2 !== "") && recoveryToken !== '') {
            try {
                setLoader(true);
                let email = await AsyncStorage.getItem('email')
                let response = await api.patch('/resetPassword', {
                    email,
                    recoveryToken,
                    password
                });
                if (response.status === 200) {
                    setLoader(false);
                    Alert.alert(
                        'Sua senha foi atualizada com sucesso !!',
                        'Utilize sua nova senha para fazer login',
                        [
                            {
                                text: 'Ok',
                                onPress: () => { navigation.navigate('Login'); }
                            },

                        ]
                    )
                }
            } catch (e) {
                setLoader(false);
                console.log(e)
            }
        } else {
            Alert.alert('Verifique sua senha', 'Os campos da senha estão vazios ou são diferentes')
        }
    }

    return (
        <View style={styles.container}>
            <KeyboardAvoidingView style={{ marginVertical: 65 }} behavior="padding" enabled={Platform.OS}>
                <Text style={styles.label}>Digite o Token* </Text>
                <TextInput
                    style={styles.input}
                    placeholder="Seu Token "
                    placeholderTextColor="#999"
                    autoCapitalize="none"
                    autoCorrect={false}
                    secureTextEntry={true}
                    value={recoveryToken}
                    onChangeText={setrecoveryToken}
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
                <Text style={styles.label}>Confirme sua Senha *</Text>
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

                {
                    (loader === true) ? (<ActivityIndicator size="large" color="#4286f4" />) :
                        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                            <Text style={{ color: 'white', fontSize: 20, padding: 2 }}>Alterar senha</Text>
                        </TouchableOpacity>
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