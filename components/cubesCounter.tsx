import { Box, Text, Button } from '@react-native-material/core';
import { StyleSheet, View } from 'react-native';
import { useState } from 'react';

const styles = StyleSheet.create({
    container: {
        // position: 'absolute',
        // paddingLeft: 30,
        // paddingRight: 30,
        height: 30,
        width: 170,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 100,
        backgroundColor: '#1A191B',
        // flex: 1,
    },
    button: {
        width: 10,
        height: 30,
        backgroundColor: '#1A191B',
    },
    count: {
        fontSize: 20,
        fontWeight: 'bold',
        marginLeft: 10,
        marginRight: 10,
        color: '#ffffff',
        width: 20,
        height: 30,
        textAlign: 'center',
    },
});

const CubeCounter = () => {
    // use state to store the current count
    const [count, setCount] = useState(1);

    // define event handlers for the buttons
    const handleIncrement = () => {
        if (count < 3) {
            setCount(count + 1);
        }
    }
    const handleDecrement = () => {
        if (count > 1) {
            setCount(count - 1);
        }
    }


    return (
        <Box style={styles.container}>
            <Button title={<Text variant='body1' color="white">-</Text>} contentContainerStyle={styles.button} onPress={handleDecrement}>
            </Button>
            <Text style={styles.count}>{count}</Text>
            <Button title={<Text variant='body1' color="white">+</Text>} contentContainerStyle={styles.button} onPress={handleIncrement}>
            </Button>
        </Box>
    );
};

export default CubeCounter;
