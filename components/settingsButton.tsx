import { StyleSheet, View, Text, Button, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { IoIosSettings } from "react-icons/io";

function MyButton({ }) {
    const navigation = useNavigation();

    return (
        <IoIosSettings
            title="Settings" 
            onClick={() => navigation.navigate('Settings')}
            size={30}
        />
    );
}

export default MyButton;