import React from 'react';
import { Image, StatusBar, StyleSheet, Text, View } from 'react-native';
import { defaultImages } from '../../constants/images';
import {  COLORS } from '../../constants/styles';
import Button from '../../components/Button';
import { useNavigation } from '@react-navigation/native';

const UnboardingScreen = () => {
    const navigation = useNavigation();

    const handleButtonPress = () => navigation.navigate('MainTabs');
    return (
        <View style={styles.container}>
            <StatusBar backgroundColor={COLORS[0].background} barStyle={'light-content'}/>
            <Image 
            source={defaultImages.UNB_IMAGE}
            />
            <View style={styles.infoContainer}>
                <Text style={styles.titleStyle}>
                    Unlimited movies, TV shows & more
                </Text>
                <Text style={ styles.descriptionStyle}>
                    Watch Funflix anywhere. Cancel at any time.
                </Text>
                <Button title={'GET STARTED'} type={'fill'} onPress={handleButtonPress}/>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        backgroundColor: COLORS[0].background,
    },
    infoContainer: {
        flex: 1,
        padding: 24,
        justifyContent: 'center',
        alignItems: 'center',
        gap: 24,
    },
    titleStyle: {
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        color: COLORS[0].text,
    },
    descriptionStyle: {
        fontSize: 16,
        textAlign: 'center',
        color: COLORS[0].desabledText,
    },
});

export default UnboardingScreen;
