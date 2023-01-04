import { StyleSheet, View } from 'react-native';
import Cube from './cube';

export default function App() {
  return (
    <View style={styles.container}>
      <Cube />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
