import {ImageBackground, View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, Pressable} from 'react-native';
import { Button } from '@react-native-material/core';
import Cube from '../cube';
import { useState } from 'react';
import * as Speech from 'expo-speech'
import React from 'react';



const Home = ({ navigation }) => {
  const [click,setOnlicked]= useState(false)

  const handlePress = () => {
    // Use the Tts.speak method to play the text as a sound
    console.log("yoni")
    // Speech.speak("Goren")
    setOnlicked(true)
  };

  return (
    <Pressable style={{height:"100%",width:"100%"}} onPress={handlePress}>
    <View style={styles.container}>
    <ImageBackground style={styles.image} resizeMode='cover' source={require('../assets/background.png')} >
         <Text>Home page</Text>
          {click?<Cube></Cube>: ""}
      </ImageBackground>
    </View>
  </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
<<<<<<< HEAD
=======
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: "center"
  }
>>>>>>> da4b2b7ecca3ffd836bf7172e2eda47fb57a8b96
});

export default Home;
