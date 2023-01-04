import {View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, Pressable} from 'react-native';
import { Button } from '@react-native-material/core';
import Cube from '../cube';
import { useState } from 'react';
import * as Speech from 'expo-speech'



const Home = ({ navigation }) => {
  const [click,setOnlicked]= useState(false)

  const handlePress = () => {
    // Use the Tts.speak method to play the text as a sound
    console.log("yoni")
    Speech.speak("Goren")
    setOnlicked(true)
  };

  return (
    <Pressable style={{height:"100%",width:"100%"}} onPress={handlePress}>
    <View style={styles.container}>
      <Text>Home page</Text>
      {click?<Cube></Cube>: ""}
    </View>
  </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  }
});

export default Home;
