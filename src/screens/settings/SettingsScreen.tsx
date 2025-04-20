import React, { useContext, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import { COLORS } from '../../constants/styles';
import Button from '../../components/Button';
import auth from '@react-native-firebase/auth';
import { UserContext } from '../../context/userContext/user.cotext';
// import { useNavigation } from '@react-navigation/native';

const SettingsScreen = () => {
    const {setCurrentUser} = useContext(UserContext);
    // const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const handleLogout = async () => {
        setLoading(true);
        auth().signOut().then(()=> {
            setCurrentUser(null);
            // navigation.navigate('Unboarding');
            setLoading(false);
        });
    };
    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: COLORS[0].background }}>
            <Button
            title={loading ? 'loading...' : 'SignOut'}
            onPress={handleLogout}
            type={'fill'}
            />
        </View>
    );
};

const styles = StyleSheet.create({})

export default SettingsScreen;
