import { useNavigation } from '@react-navigation/native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { FIREBASE_AUTH } from '../../utils/firebase/firebase.utils';

const RegisterScreen = () => {
    const navigation = useNavigation();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleAuth = async () => {
        try {
            const UserCredential = await signInWithEmailAndPassword(FIREBASE_AUTH, email, password);
            if (UserCredential.user) {
                navigation.navigate('Login');
            }
        } catch (error: any) {
            Alert.alert('Error', error.message);
        }
    };

    const navigateToSignUp = () => {
        navigation.navigate('Login');
    };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Register</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                value={email}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={handleAuth}>
                <Text style={styles.buttonText}>
                    Register
                </Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigateToSignUp()}>
                <Text style={styles.switchText}>
                    Already have an account? Login.
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    input: {
        height: 50,
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 8,
        marginBottom: 15,
        paddingHorizontal: 15,
        backgroundColor: 'white',
    },
    button: {
        backgroundColor: '#007AFF',
        height: 50,
        borderRadius: 8,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 15,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
    switchText: {
        color: '#007AFF',
        textAlign: 'center',
    },
});

export default RegisterScreen;
