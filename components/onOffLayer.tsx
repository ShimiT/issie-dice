import { Box, Text, Button, Flex } from '@react-native-material/core';
import { View, Switch, StyleSheet, Image } from "react-native";
import React, { useState } from 'react';
import OnOffButton from '../components/onOffButton';


const onOffLayer = () => {

    return (
        <Flex style={styles.container}>
            <Text color='#BABABA' style={styles.text}>Recovery Time</Text>
            {/* <Image source={require('../assets/dice1.svg')}></Image> */}
            <OnOffButton></OnOffButton>
        </Flex>
    );
};

const styles = StyleSheet.create({
    container: {
        paddingLeft: 30,
        paddingRight: 30,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: 100,
        backgroundColor: '#0000003D',
    },
    text: {
        fontSize: 16,
        fontWeight: 'bold',
        marginRight: 20,
    },
});

export default onOffLayer;