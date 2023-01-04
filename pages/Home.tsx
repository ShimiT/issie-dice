import { ImageBackground, View, Text, StyleSheet, TouchableOpacity, TextInput, Alert, Pressable } from 'react-native';
import { Button } from '@react-native-material/core';
import Cube from '../cube';
import TimeButtons from '../components/timeButton';

import { useState } from 'react';
import React from 'react';



const Home = ({ navigation }: any) => {
  const [boardMode, setBoardMode] = useState(false)

  const handlePress = () => {
    // Use the Tts.speak method to play the text as a sound
    console.log("yoni")
    // Speech.speak("Goren")
    setBoardMode(true)
  };

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
    <Pressable style={{ height: "100%", width: "100%" }} onPress={handlePress}>
      <View style={styles.container}>
        <ImageBackground style={styles.image} resizeMode='cover' source={require('../assets/background.png')} >
          <Text>Home page</Text>
          {boardMode && <Cube onBack={() => setBoardMode(false)} />}
          {<TimeButtons></TimeButtons>}
        </ImageBackground>
      </View>
    </Pressable>
  );


  // chat gpt

  // const dropDownBar = ({ navigation }) => {
  //   <View style={styles.container}>
  //     <View style={styles.containerForCounterWrapper}>
  //       <View style={styles.containerForRecoveryTimes}>
  //         <TouchableOpacity style={styles.timeButton} onPress={() => handleTime(0)}>
  //           <Text style={styles.buttonText}>0</Text>
  //         </TouchableOpacity>
  //         <TouchableOpacity style={styles.timeButton} onPress={() => handleTime(5)}>
  //           <Text style={styles.buttonText}>5</Text>
  //         </TouchableOpacity>
  //         <TouchableOpacity style={styles.timeButton} onPress={() => handleTime(10)}>
  //           <Text style={styles.buttonText}>10</Text>
  //         </TouchableOpacity>
  //         <TouchableOpacity style={styles.timeButton} onPress={() => handleTime(20)}>
  //           <Text style={styles.buttonText}>20</Text>
  //         </TouchableOpacity>
  //       </View>
  //     </View>
  //     <View style={styles.containerForCounterWrapper}>
  //       <View style={styles.containerForCounter}>
  //         <TouchableOpacity style={styles.button} onPress={handleDecrement}>
  //           <Text style={styles.buttonText}>-</Text>
  //         </TouchableOpacity>
  //         <Text style={styles.count}>{count}</Text>
  //         <TouchableOpacity style={styles.button} onPress={handleIncrement}>
  //           <Text style={styles.buttonText}>+</Text>
  //         </TouchableOpacity>
  //       </View>
  //     </View>
  //   </View>
  // }


  // return (
  //   <View style={styles.container}>
  //     <View style={styles.containerForCounterWrapper}>
  //       <View style={styles.containerForRecoveryTimes}>
  //         <Button title="5 seconds" style={timeStyles.timeButton} titleStyle={timeStyles.buttonText} onPress={() => handleTime(0)}>
  //           {/* <Text style={styles.buttonText}>0</Text> */}
  //         </Button>
  //         <TouchableOpacity style={timeStyles.timeButton} onPress={() => handleTime(5)}>
  //           <Text style={styles.buttonText}>5</Text>
  //         </TouchableOpacity>
  //         <TouchableOpacity style={timeStyles.timeButton} onPress={() => handleTime(10)}>
  //           <Text style={styles.buttonText}>10</Text>
  //         </TouchableOpacity>
  //         <TouchableOpacity style={timeStyles.timeButton} onPress={() => handleTime(20)}>
  //           <Text style={styles.buttonText}>20</Text>
  //         </TouchableOpacity>
  //       </View>
  //     </View>
  //     <View style={styles.containerForCounterWrapper}>
  //       <View style={styles.containerForCounter}>
  //         <TouchableOpacity style={styles.button} onPress={handleDecrement}>
  //           <Text style={styles.buttonText}>-</Text>
  //         </TouchableOpacity>
  //         <Text style={styles.count}>{count}</Text>
  //         <TouchableOpacity style={styles.button} onPress={handleIncrement}>
  //           <Text style={styles.buttonText}>+</Text>
  //         </TouchableOpacity>
  //       </View>
  //     </View>
  //   </View>
  // );

  // return (
  //   <View style={styles.containerForCounterWrapper}>
  //     <View style={styles.containerForRecoveryTimes}>
  //       <TouchableOpacity style={styles.timeButton} onPress={() => handleTime(0)}>
  //         <Text style={styles.buttonText}>0</Text>
  //       </TouchableOpacity>
  //       <TouchableOpacity style={styles.timeButton} onPress={() => handleTime(5)}>
  //         <Text style={styles.buttonText}>5</Text>
  //       </TouchableOpacity>
  //       <TouchableOpacity style={styles.timeButton} onPress={() => handleTime(10)}>
  //         <Text style={styles.buttonText}>10</Text>
  //       </TouchableOpacity>
  //       <TouchableOpacity style={styles.timeButton} onPress={() => handleTime(20)}>
  //         <Text style={styles.buttonText}>20</Text>
  //       </TouchableOpacity>
  //     </View>
  //   </View>
  // );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  containerForRecoveryTimes: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    maxWidth: 150,
  },
  containerForCounterWrapper: {
    // flex: 1,
    flexDirection: 'row',
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
  },
  containerForCounter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 50,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
    maxWidth: 150,
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: "center"
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
  count: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    width: 50,
    textAlign: 'center',
  },
});


const timeStyles = StyleSheet.create({
  timeButton: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    borderRadius: 20,
  },
  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF',
  },
})

export default Home;
