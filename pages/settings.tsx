import { Box, Text, Button, Flex } from '@react-native-material/core';
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
        height: '100%'
    },
    text: {
        marginTop: 100,
        color: '#BABABA',
    },
    cubeCounter: {
        marginTop: 100,
        color: '#BABABA',
    },
    recoveryTime: {
        marginBottom: 300,
        color: '#BABABA',
        alignItems: 'center'
    },
    flex: {
        backgroundColor: '#0000003D'
    }
});

const Settings = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}> Design Your Game</Text>
            <Flex style={{ alignItems: 'center' }}>
                <Flex>
                    <Text style={styles.cubeCounter}> Num of Cubes</Text>
                    {<CubeCounter></CubeCounter>}
                </Flex>
            </Flex>
            {/* <Image
                style={styles.tinyLogo}
                source={require('@expo/snack-static/react-native-logo.png')}
            ></Image> */}
            <Flex style={styles.recoveryTime}>
                {<OnOffLayer></OnOffLayer>}
                {<TimeButtons></TimeButtons>}
            </Flex>
        </View>
    );
};

export default Settings;
