import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import MainNavigation from './main/MainNavigation';
import AuthNacigation from './auth/AuthNacigation';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import auth from '@react-native-firebase/auth';
import { useAppDispatch, useAppSelector } from '../store/store.types';
import { setUser } from '../store/user/userSlice';

const Navigation = () => {
    const dispatch = useAppDispatch();
    const { currentUser } = useAppSelector((state) => state.user);
    useEffect(() => {
        const unsubscribe = auth().onAuthStateChanged((user) => {
            dispatch(setUser(user));
        });

        return unsubscribe;
    }, []);
    return (
        <SafeAreaProvider>
        <NavigationContainer>
            {currentUser ? <MainNavigation /> : <AuthNacigation />}
        </NavigationContainer>
        </SafeAreaProvider>
    );
};

export default Navigation;
