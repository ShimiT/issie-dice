import { Box, Text, Button } from '@react-native-material/core';
import { StyleSheet, View } from 'react-native';
import { useState } from 'react';

const styles = StyleSheet.create({
    container: {
        // position: 'absolute',
        // paddingLeft: 30,
        // paddingRight: 30,
        height: 30,
        width: 100,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 10,
        backgroundColor: '#1A191B',
        borderRadius: 15,
        // flex: 1,
    },
    button: {
        width: 40,
        height: 30,
        backgroundColor: '#1A191B',
        minWidth: 20,
    },
    count: {
        fontSize: 16,
        fontWeight: 'bold',
        alignContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        display: 'flex',
        // flexDirection: 'row',
        // marginLeft: 10,
        // marginRight: 10,
        color: '#ffffff',
        width: 30,
        height: 30,
        justifyContent: 'center',
        textAlign: 'center',
    },
    countWrap: {
        backgroundColor: '#8C1CAC',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonText: {
        fontWeight: 'bold',
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
            <Button title={<Text variant='body1' color="white" style={styles.buttonText}>-</Text>} contentContainerStyle={styles.button} onPress={handleDecrement}>
            </Button>
            <Box style={styles.countWrap}>
                <Text style={styles.count}>{count}</Text>
            </Box>
            <Button title={<Text variant='body1' color="white" style={styles.buttonText}>+</Text>} contentContainerStyle={styles.button} onPress={handleIncrement}>
            </Button>
        </Box>
    );
};

export default CubeCounter;
