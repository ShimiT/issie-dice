import { Box, Text, Button } from '@react-native-material/core';
import { View, Switch, StyleSheet, Image } from "react-native";
import React, { useState } from 'react';
import OnOffButton from '../components/onOffButton';


const onOffLayer = () => {

    return (
        <Box style={styles.container}>
            <Text color='white' style={styles.text}>Recovery Time</Text>
            {/* <Image source={require('../assets/dice1.svg')}></Image> */}
            <OnOffButton></OnOffButton>
        </Box>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingLeft: 30,
        paddingRight: 30,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 100,
        backgroundColor: '#403B41',
    },
    text: {
        fontSize: 18,
        marginRight: 10,
    },
});

export default onOffLayer;