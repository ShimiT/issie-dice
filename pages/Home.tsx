import {View, Text, StyleSheet, TouchableOpacity, TextInput} from 'react-native';
import { Button } from '@react-native-material/core';
import * as Speech from 'expo-speech'

const Home = ({ navigation }) => {

  const handlePress = () => {
    // Use the Tts.speak method to play the text as a sound
    console.log("yoni")
    Speech.speak("yoni")
  };


  return (
      // <TouchableOpacity onPress={handlePress} style={styles.container}>
        <View style={styles.container}>
          <Text>Home page</Text>
          <Button title="Material design button" onPress={handlePress}></Button>
          {/* Add an input field to allow the user to enter a value */}
          {/* <TextInput
              value={input}
              onChangeText={setInput}
          /> */}
        </View>
      // </TouchableOpacity>
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
