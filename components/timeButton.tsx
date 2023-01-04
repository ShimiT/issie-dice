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
            title: '0',
        },
        {
            title: '5',
        },
        {
            title: '10',
        },
        {
            title: '20',
        },
    ];

    return (
        <Box style={styles.container}>
            {buttons.map(item => (
                <Button
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
                    style={{
                        backgroundColor: 'transparent',
                    }}></Button>
            ))}
        </Box>
    );
};

export default TimeButtons;
