import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { COLORS } from '../../constants/styles';
import auth from '@react-native-firebase/auth';
import { useAppDispatch } from '../../store/store.types';
import { setUser } from '../../store/user/userSlice';

const LoginScreen = () => {
  const navigation = useNavigation();
  const dispatch = useAppDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    // simple email validation not effecient just to simulate validation
    if (!email || !password) {
      Alert.alert('Error', 'Please fill in all fields');
      return;
    }
    if (password.length < 6 || password.length > 30) {
      Alert.alert('Error', 'Password must be between 6 & 30 long');
      return;
    }
    if (!email.includes('@') && (!email.includes('.com') || !email.includes('.net') || !email.includes('.org'))) {
      Alert.alert('Error', 'Invalid email');
      return;
    }
    setLoading(true);
    try {
      const UserCredential = await auth().signInWithEmailAndPassword(email, password);
      if (UserCredential.user) {
        dispatch(setUser(UserCredential.user));
        navigation.navigate('MainTabs');
      }
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
    }
  };

  const navigateToRegister = () => {
    navigation.navigate('Register');
  };
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        textContentType={'emailAddress'}
        placeholder="Email"
        placeholderTextColor={COLORS[0].desabledText}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        textContentType={'password'}
        placeholder="Password"
        placeholderTextColor={COLORS[0].desabledText}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TouchableOpacity style={styles.button} onPress={handleAuth}>
        {
          loading ? (
            <ActivityIndicator style={{ alignSelf: 'center' }} size={'small'} color={COLORS[0].text} />
          )
            : (
              <Text style={styles.buttonText}>
                Login
              </Text>
            )
        }
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateToRegister()}>
        <Text style={styles.switchText}>
          you don't have an account? Register.
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
    backgroundColor: COLORS[0].background,
  },
  title: {
    color: COLORS[0].text,
    marginBottom: 24,
    textAlign: 'center',
    fontSize: 24,
    fontWeight: 'bold',
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderColor: COLORS[0].inputBackgroud,
    borderRadius: 8,
    marginBottom: 15,
    paddingHorizontal: 15,
    backgroundColor: COLORS[0].inputBackgroud,
  },
  button: {
    backgroundColor: COLORS[0].primary,
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
    color: COLORS[0].primary,
    textAlign: 'center',
    textDecorationLine: 'underline',
  },
});

export default LoginScreen;