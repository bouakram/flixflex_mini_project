import { createUserWithEmailAndPassword } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { FIREBASE_AUTH } from '../../utils/firebase/firebase.utils';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../context/userContext/user.cotext';

const LoginScreen = () => {
    const navigation = useNavigation();
    const {setCurrentUser} = useContext(UserContext);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleAuth = async () => {
      try {
        const UserCredential = await createUserWithEmailAndPassword(FIREBASE_AUTH, email, password);
        console.log(UserCredential.user);
        setCurrentUser(UserCredential.user);
        navigation.navigate('Movies');
      } catch (error: any) {
        Alert.alert('Error', error.message);
      }
    };

    const navigateToSignUp = () => {
        navigation.navigate('Register');
    };
    return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
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
          LogIn
        </Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateToSignUp()}>
        <Text style={styles.switchText}>
        Don't have an account? Register.
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

export default LoginScreen;
