import { ImageBackground, View, StyleSheet, Pressable } from 'react-native';
import { Button } from '@react-native-material/core';
import Cube from '../cube';
import { useState } from 'react';
import React from 'react';
// import { useNavigation } from '@react-navigation/native';

const Home = ({ navigation }: any) => {
  const [boardMode, setBoardMode] = useState(false)

  const handlePress = () => {
    // Use the Tts.speak method to play the text as a sound
    // Speech.speak("Goren")
    setBoardMode(true)
  };

  return (
    <Pressable style={{ height: "100%", width: "100%" }} onPress={handlePress}>
      <View style={styles.container}>
        <ImageBackground style={styles.image} resizeMode='cover' source={require('../assets/logo.svg')} >
          {boardMode && <Cube onBack={() => setBoardMode(false)} />}
        </ImageBackground>
      </View>
    </Pressable>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'red',
    // alignItems: 'center',
    // justifyContent: 'center'
  },
  image: {
    flex: 1,
    justifyContent: "center",
    width: '100%',
    height: '90%',
  },
  button: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    borderRadius: 25,
  },

  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
});


const timeStyles = StyleSheet.create({
  timeButton: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#333034',
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
})

export default Home;
