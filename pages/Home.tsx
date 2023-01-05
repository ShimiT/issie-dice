import {ImageBackground, View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, Pressable} from 'react-native';
import Cube from '../cube';
import { useState } from 'react';
import React from 'react';



const Home = ({ navigation }:any) => {
  const [boardMode,setBoardMode]= useState(false)

  const handlePress = () => {
    // Use the Tts.speak method to play the text as a sound
    console.log("yoni")
    // Speech.speak("Goren")
    setBoardMode(true)
  };

  return (
    <Pressable style={{height:"100%",width:"100%"}} onPress={handlePress}>
    <View style={styles.container}>
    <ImageBackground style={styles.image} resizeMode='cover' source={require('../assets/background.png')} >
         <Text>Home page</Text>
          {boardMode && <Cube onBack={()=>setBoardMode(false)}/>}
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
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: "center"
  }
});

export default Home;
