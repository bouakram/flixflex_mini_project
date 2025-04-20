import React, { useContext, useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { UserContext } from '../../context/userContext/user.cotext';
import { COLORS } from '../../constants/styles';
import auth from '@react-native-firebase/auth';

const RegisterScreen = () => {
  const navigation = useNavigation();
  const { setCurrentUser } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleAuth = async () => {
    setLoading(true);
    try {
      const UserCredential = await auth().createUserWithEmailAndPassword(email, password);
      setCurrentUser(UserCredential.user);
      navigation.navigate('Login');
    } catch (error: any) {
      Alert.alert('Error', error.message);
    } finally {
      setLoading(false);
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
        placeholderTextColor={COLORS[0].desabledText}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
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
                Register
              </Text>
            )
        }
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigateToSignUp()}>
        <Text style={styles.switchText}>
          Have an account already? Login.
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

export default RegisterScreen;
