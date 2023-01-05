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

    const [isActive1, setIsActive1] = useState(false);
    const [isActive2, setIsActive2] = useState(false);
    const [isActive3, setIsActive3] = useState(false);
    const [isActive4, setIsActive4] = useState(false);

    const isActiveFunctions = [setIsActive1, setIsActive2, setIsActive3, setIsActive4]

    const buttonStyles = StyleSheet.create({
        button1: {
            backgroundColor: isActive1 ? '#8C1CAC' : '#1A191B',
        },
        button2: {
            backgroundColor: isActive2 ? '#8C1CAC' : '#1A191B',
        },
        button3: {
            backgroundColor: isActive3 ? '#8C1CAC' : '#1A191B',
        },
        button4: {
            backgroundColor: isActive4 ? '#8C1CAC' : '#1A191B',
        },
    });

    return (
        <Box style={styles.container}>
            {buttons.map((item, index) => (
                getButton(item, { ...styles.button, ...Object.values(buttonStyles)[index] }, isActiveFunctions)
            ))}
        </Box>
    );
};

const getButton = (item, buttonStyle, functions) => {
    const handleTime = (timeInput) => {
        if (timeInput == '0') {
            console.log("pressed 0")
            setFunctions(0, functions)
        } else if (timeInput == '5') {
            console.log("pressed 5")
            setFunctions(1, functions)
        } else if (timeInput == '10') {
            console.log("pressed 10")
            setFunctions(2, functions)
        } else {
            console.log("pressed 20")
            setFunctions(3, functions)
        }
    }

    function setFunctions(index, functions) {
        for (let i = 0; i < 4; i++) {
            if (i == index) {
                functions[i](true)
            } else {
                functions[i](false)
            }
        }
    }

    return (
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
            contentContainerStyle={buttonStyle}
            onPress={() => handleTime(item.title)}
            style={{
                backgroundColor: 'transparent',
            }}></Button>
    )
}

export default TimeButtons;
