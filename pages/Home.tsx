import {
  ImageBackground,
  View,
  StyleSheet,
  Pressable,
  Image
} from 'react-native';
import Cube, { CubeFace } from '../components/cube';
import { useLayoutEffect, useState } from 'react';
import React from 'react';
import HomeHeader from '../components/HomeHeader';

const Home = ({ navigation }: any) => {
  const [boardMode, setBoardMode] = useState(false);
  const [faces, setFaces] = useState<CubeFace[]>([
    {
      image: require('../assets/dice-six-faces-one.png'),
      opacity: 1,
      isTransparent: false,
      reflectivity: 0
    },
    {
      image: require('../assets/dice-six-faces-two.png'),
      opacity: 1,
      isTransparent: true,
      reflectivity: 0
    },
    {
      image: require('../assets/dice-six-faces-three.png'),
      opacity: 1,
      isTransparent: true,
      reflectivity: 0
    },
    {
      image: require('../assets/dice-six-faces-four.png'),
      opacity: 1,
      isTransparent: true,
      reflectivity: 0
    },
    {
      image: require('../assets/dice-six-faces-five.png'),
      opacity: 1,
      isTransparent: true,
      reflectivity: 0
    },
    {
      image: require('../assets/dice-six-faces-six.png'),
      opacity: 1,
      isTransparent: true,
      reflectivity: 1
    }
  ]);

  const handlePress = () => {
    setBoardMode(true);
  };

  /**
   * Create the custom header inside the Home screen
   * for better control on events
   */
  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <HomeHeader
          onSettingsPressed={() => {
            navigation.navigate('settings');
          }}
        />
      )
    });
  }, [navigation]);

  return (
    <Pressable style={{ height: '100%', width: '100%' }} onPress={handlePress}>
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          resizeMode="cover"
          source={require('../assets/background.png')}
        >
          {boardMode && (
            <Cube
              faces={faces}
              numOfCubes={2}
              surfaceBackground={require('../assets/background.png')}
              cuebesSize={3}
            />
          )}
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
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#333034',
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
    maxWidth: 150
  },
  image: {
    width: '100%',
    height: '100%'
  },
  button: {
    width: 50,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFF',
    borderRadius: 25
  },

  buttonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFF'
  }
});

export default Home;
