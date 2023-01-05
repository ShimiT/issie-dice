import { StyleSheet, View, Text, Button, Image, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as React from 'react';
import { MdSettings } from "react-icons/md";

function MyButton({ }) {
    const navigation = useNavigation();

    // return (
    //     <MdSettings
    //         title="Settings" 
    //         onClick={() => navigation.navigate('Settings')}
    //         size={30}
    //     />
    // );

    return (
        <Button title='settings'
            onPress={() => navigation.navigate('Settings')}
        ></Button>
    )
}

export default MyButton;