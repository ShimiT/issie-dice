import { View, Text, StyleSheet } from 'react-native';
import { Button } from '@react-native-material/core';
import { TouchableOpacity, Image } from 'react-native';

const Settnigs = ({ navigation }) => {
    return (
      <View style={styles.container}>
        <Text>Home page</Text>
      </View>
  );
};

function SettingsButton() {
    return (
      <TouchableOpacity>
        <Image source={require('../assets/icon.png')} />
      </TouchableOpacity>
    );
  }

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },
    button: {
      alignSelf: 'flex-start',
    },
  });

export default Settnigs;
