import { Box, Text, Button } from '@react-native-material/core';
import { StyleSheet, View } from 'react-native';
import React, { useState, Component } from 'react';
import TimeButtons from '../components/timeButton';
import CubeCounter from '../components/cubesCounter';
import OnOffLayer from '../components/onOffLayer';



const styles = StyleSheet.create({
    container: {
        backgroundColor: '#333034',
        paddingLeft: 30,
        paddingRight: 30,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 100,
    },
    button: {
        width: 71,
        height: 56,
        borderRadius: 15,
        backgroundColor: '#1A191B',
    },
    buttonText: {
        fontWeight: 'bold',
    },
    buttonCaptionText: {
        fontWeight: 'normal',
    },
    tinyLogo: {
        width: 50,
        height: 50,
    },
});

const Settings = () => {
    return (
        <View style={styles.container}>
            {/* <Image
                style={styles.tinyLogo}
                source={require('@expo/snack-static/react-native-logo.png')}
            ></Image> */}
            {<OnOffLayer></OnOffLayer>}
            {<CubeCounter></CubeCounter>}
            {<TimeButtons></TimeButtons>}
        </View>
    );
};

export default Settings;
