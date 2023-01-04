import { View, Text, StyleSheet } from 'react-native';
import { Button } from '@react-native-material/core';
import { TouchableOpacity } from 'react-native';
import { Header } from 'react-native/Libraries/NewAppScreen';

const Home = ({ navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Home page</Text>
      <Button title="Material design button"></Button>
    </View>
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
