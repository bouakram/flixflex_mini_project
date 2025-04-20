import React, { useContext, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { UserContext } from '../context/userContext/user.cotext';
import MainNavigation from './main/MainNavigation';
import AuthNacigation from './auth/AuthNacigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';

const Navigation = () => {
    const { currentUser } = useContext(UserContext);
    // const [currentUser, setCurrentUser] = useState(null);

    return (
        <SafeAreaProvider>
        <NavigationContainer>
            {currentUser ? <MainNavigation /> : <AuthNacigation />}
            {/* <MainNavigation /> */}
            {/* <AuthNacigation /> */}
        </NavigationContainer>
        </SafeAreaProvider>
    );
};

export default Navigation;
