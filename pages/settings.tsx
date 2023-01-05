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
        // marginTop: 100,
    },
    text: {
        marginTop: 50,
        color: '#BABABA',
    },
});

const Settings = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}> Design Your Game</Text>
            <Flex style={{ alignItems: 'center' }}>
                <Text style={styles.text}> Num of Cubes</Text>
                <Flex>
                    {<CubeCounter></CubeCounter>}
                </Flex>
            </Flex>
            {/* <Image
                style={styles.tinyLogo}
                source={require('@expo/snack-static/react-native-logo.png')}
            ></Image> */}
            <Flex>
                {<OnOffLayer></OnOffLayer>}
                {<TimeButtons></TimeButtons>}
            </Flex>
        </View>
    );
};

export default Settings;
