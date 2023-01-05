import { StyleSheet, View, Text, Button, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';

function MyButton({ }) {
    const navigation = useNavigation();

    return (
        <Button
            title="Settings"
            onPress={() => navigation.navigate('Settings')}
        />
    );
}

export default MyButton;