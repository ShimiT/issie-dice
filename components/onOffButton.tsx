import { Box, Text, Button } from '@react-native-material/core';
import { View, StyleSheet } from "react-native";
import { Switch } from 'react-native-switch';
import React, { useState } from 'react';
import { useGlobalStore } from "react-native-global-store";

const onOffButton = () => {
    const [isEnabled, setIsEnabled] = useState(false);
    const [globalState,setGlobalState] = useGlobalStore();

    function setRecoveryOn() {
        setIsEnabled(globalState.recoveryOn)
        setGlobalState({
            recoveryOn: Boolean(!isEnabled)
        });
    }

    return (
        <View style={styles.container}>
            <Switch
                // trackColor={{ false: "#767577", true: "#81b0ff" }}
                backgroundActive={'green'}
                backgroundInactive={'gray'}
                // thumbColor="#fff"
                // thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
                // ios_backgroundColor="#3e3e3e"
                onValueChange={() => setRecoveryOn()}
                value={globalState.recoveryOn}
                activeText={'On'}
                inActiveText={'Off'}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#1A191B',
        // flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 15,
        paddingVertical: 5,
        borderRadius: 15,
        alignContent: 'center',
    },
    switch: {
        transform: [{ scaleX: 1.5 }, { scaleY: 1.5 }],
    },
    text: {
        fontSize: 18,
        // marginRight: 20,
    },
});

export default onOffButton;