import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { UserContext } from '../context/userContext/user.cotext';
import MainNavigation from './main/MainNavigation';
import AuthNacigation from './auth/AuthNacigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Navigation = () => {
    const { currentUser } = useContext(UserContext);

    return (
        <SafeAreaProvider>
        <NavigationContainer>
            {currentUser ? <MainNavigation /> : <AuthNacigation />}
        </NavigationContainer>
        </SafeAreaProvider>
    );
};

export default Navigation;
