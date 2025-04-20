import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLORS } from '../constants/styles';

type ButtonPropsType = {
    title: string,
    onPress?: () => void,
    otherStyle?: object,
    otherProps?: object,
    type?: 'fill' | 'outlin',
}

const Button = ({title, onPress, type, otherStyle}: ButtonPropsType) => {
    switch (type){
        case 'fill':
            return (
                <TouchableOpacity style={[styles.button, styles.fillButton, otherStyle]} onPress={onPress}>
                    <Text style={styles.fillText}>
                        {title}
                    </Text>
                </TouchableOpacity>
            );
        case 'outlin':
            return (
                <TouchableOpacity style={[styles.button, styles.outlineButton, otherStyle]} onPress={onPress}>
                    <Text style={styles.outlineText}>
                        {title}
                    </Text>
                </TouchableOpacity>
            );
        default:
            return;
    }
};

const styles = StyleSheet.create({
    button: {
        alignItems: 'center',
        padding: 14,
        borderRadius: 5,
        width: 300,
    },
    fillButton: {
        backgroundColor: COLORS[0].primary,
    },
    outlineButton: {
        borderColor: COLORS[0].primary,
        borderWidth: 1,
    },
    fillText: {
        color: COLORS[0].text,
        fontWeight: 'bold',
    },
    outlineText: {
        color: COLORS[0].primary,
        fontWeight: 'bold',
    },
});

export default Button;
