import {
  ImageBackground,
  View,
  StyleSheet,
  Pressable,
  Image
} from 'react-native';
import Cube, { CubeFace } from '../components/cube';
import { useEffect, useLayoutEffect, useState } from 'react';
import React from 'react';
import HomeHeader from '../components/HomeHeader';
import { useGlobalStore } from 'react-native-global-store';
import { Audio } from 'expo-av';
import diceTypes from '../constants/diceTypes';
import cloneDeep from 'lodash.clonedeep';
import { Snackbar } from '@react-native-material/core';

const Home = ({ navigation }: any) => {
  const [globalState, setGlobalState] = useGlobalStore();
  const [revision, setRevision] = useState(0);
  const [canRollTheDice, setCanRollTheDice] = useState(true);
  const [roll, setRoll] = useState(false);
  const [rollAgainMessage, setRollAgainMessage] = useState('');

  let rollAgainCounter: number = 0;

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

  useEffect(() => {
    setRevision(revision + 1);
    setCubeFaces(globalState.diceType);
  }, [globalState]);

  const setCubeFaces = (diceType: string) => {
    // get the dice type faces from dice types constant
    const type = diceTypes.find((item) => item.type === diceType);
    if (!type) {
      return;
    }

    const _faces: CubeFace[] = cloneDeep(faces);

    type.faces.forEach((face, index) => {
      if (type.faceType === 'color') {
        _faces[index].image = '';
        _faces[index].color = face;
      } else {
        _faces[index].image = require(`../assets/${face}`);
      }
    });

    setFaces(_faces);
  };

  const getCubeSize = () => {
    switch (globalState.cubeSize) {
      case 'S':
        return 2;
      case 'M':
        return 3;
      case 'L':
        return 4;
      case 'XL':
        return 5;
      default:
        return 3;
    }
  };

  async function playSound() {
    const { sound } = await Audio.Sound.createAsync(
      require('../assets/rolling.mp3')
    );
    await sound.playAsync();
  }

  const handleDiceRecoveryTime = () => {
    // handle recovery time
    if (globalState.recoveryTime > 0) {
      rollAgainCounter = globalState.recoveryTime;
      const timer = setInterval(() => {
        setRollAgainMessage(
          `You can roll again in ${rollAgainCounter} seconds`
        );
        rollAgainCounter--;
        if (rollAgainCounter < 0) {
          clearInterval(timer);
          setRollAgainMessage('');
        }
      }, 1000);

      // setTimeout(() => {
      //   setRollAgainMessage('');
      // }, 2000);
      // disable interactions and enable them after recovery time
      setCanRollTheDice(false);
      setTimeout(() => {
        setCanRollTheDice(true);
      }, globalState.recoveryTime * 1000);
    }
  };

  return (
    <Pressable
      style={{ height: '100%', width: '100%' }}
      disabled={!canRollTheDice}
      onPress={() => {
        // roll the dice
        setRoll(true);
        handleDiceRecoveryTime();
        playSound();
      }}
    >
      <View style={styles.container}>
        <ImageBackground
          style={styles.image}
          resizeMode="cover"
          source={require('../assets/background.png')}
        >
          {roll && (
            <Cube
              key={revision}
              faces={faces}
              numOfCubes={globalState.numOfCubes}
              surfaceBackground={require('../assets/background.png')}
              cuebesSize={getCubeSize()}
              disabled={!canRollTheDice}
              onRoll={() => {
                playSound();
                handleDiceRecoveryTime();
              }}
            />
          )}
        </ImageBackground>
        {rollAgainMessage && (
          <Snackbar
            message={rollAgainMessage}
            style={{ position: 'absolute', start: 16, end: 16, bottom: 16 }}
          />
        )}
      </View>
    </Pressable>
  );
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
