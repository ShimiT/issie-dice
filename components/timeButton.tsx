import { Box, Text, Button } from '@react-native-material/core';
import { StyleSheet } from 'react-native';
import { useState } from 'react';

const styles = StyleSheet.create({
    container: {
        paddingLeft: 30,
        paddingRight: 30,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 100,
    },
    button: {
        width: 71,
        height: 56,
        borderRadius: 15,
        backgroundColor: '#1A191B',
        // backgroundColor: { buttonColor },
    },
    buttonText: {
        fontWeight: 'bold',
    },
    buttonCaptionText: {
        fontWeight: 'normal',
    },
});

const TimeButtons = () => {
    const buttons = [
        {
            id: 1,
            title: '0',
        },
        {
            id: 2,
            title: '5',
        },
        {
            id: 3,
            title: '10',
        },
        {
            id: 4,
            title: '20',
        },
    ];

    var buttonColor = '#1A191B'

    const handleTime = (timeInput) => {
        if (timeInput == '0') {
            console.log("pressed 0")
        } else if (timeInput == '5') {

        } else if (timeInput == '10') {

        } else {
            console.log("pressed 20")
        }
    }

    return (
        <Box style={styles.container}>
            {buttons.map(item => (
                <Button
                    key={item.id}
                    title={
                        <Box
                            style={{
                                display: 'flex',
                                flexDirection: 'row',
                                alignItems: 'center',
                            }}>
                            <Box
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <Text variant="body1" color="white" style={styles.buttonText}>
                                    {item.title}
                                </Text>
                                <Text variant="caption" color="white">
                                    Sec
                                </Text>
                            </Box>
                        </Box>
                    }
                    contentContainerStyle={styles.button}
                    underlayColor='#fff'
                    onPress={() => handleTime(item.title)}
                    style={{
                        backgroundColor: 'transparent',
                    }}></Button>
            ))}
        </Box>
    );
};

export default TimeButtons;
