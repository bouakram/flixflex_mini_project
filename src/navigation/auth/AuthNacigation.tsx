import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import RegisterScreen from '../../screens/auth/RegisterScreen';
import LoginScreen from '../../screens/auth/LoginScreen';
import UnboardingScreen from '../../screens/unboarding/UnboardingScreen';

type AuthNavigationPropsType = {}
const Stack = createNativeStackNavigator();

const AuthNacigation = ({}: AuthNavigationPropsType) => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Unboarding" component={UnboardingScreen} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
    );
};

export default AuthNacigation;
