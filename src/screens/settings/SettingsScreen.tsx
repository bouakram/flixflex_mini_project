import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { COLORS } from '../../constants/styles';
import Button from '../../components/Button';
import auth from '@react-native-firebase/auth';
import { useAppDispatch } from '../../store/store.types';
import { setUser } from '../../store/user/userSlice';

const SettingsScreen = () => {
    const dispatch = useAppDispatch();
    const [loading, setLoading] = useState(false);
    const handleLogout = async () => {
        setLoading(true);
        auth().signOut().then(()=> {
            dispatch(setUser(null));
            setLoading(false);
        });
    };
    return (
        <View style={styles.container}>
            <Button
            title={loading ? 'loading...' : 'SignOut'}
            onPress={handleLogout}
            type={'fill'}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS[0].background },
});

export default SettingsScreen;
