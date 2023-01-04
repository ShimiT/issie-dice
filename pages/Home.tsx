import { View, Text, StyleSheet, Alert, Pressable } from 'react-native';
import { Button } from '@react-native-material/core';
import Cube from '../cube';
import { useState } from 'react';

const Home = ({ navigation }) => {
  const [click,setOnlicked]= useState(false)
  return (
    <Pressable style={{height:"100%",width:"100%"}} onPress={()=>setOnlicked(true)}>
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
  },
});

export default Home;
