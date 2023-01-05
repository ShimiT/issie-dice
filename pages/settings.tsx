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
    text: {
        color: '#BABABA',

    }

});

const Settings = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}> Design Your Game</Text>
            {/* <Image
                style={styles.tinyLogo}
                source={require('@expo/snack-static/react-native-logo.png')}
            ></Image> */}
            {<CubeCounter></CubeCounter>}
            {<OnOffLayer></OnOffLayer>}
            {<TimeButtons></TimeButtons>}
        </View>
    );
};

export default Settings;
