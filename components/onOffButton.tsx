import { Box, Text, Button } from '@react-native-material/core';
import { View, Switch, StyleSheet } from "react-native";
import React, { useState } from 'react';

const onOffButton = () => {
    const [isEnabled, setIsEnabled] = useState(false);
    const toggleSwitch = () => setIsEnabled(previousState => !previousState);

    return (
        <View style={styles.container}>
            <Switch
                // trackColor={{ false: "#767577", true: "#81b0ff" }}
                trackColor={{ true: 'green', false: 'grey' }}
                thumbColor="#fff"
                // thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                ios_backgroundColor="#3e3e3e"
                onValueChange={toggleSwitch}
                value={isEnabled}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    switch: {
        transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
    },
    text: {
        fontSize: 18,
        marginRight: 10,
    },
});

export default onOffButton;