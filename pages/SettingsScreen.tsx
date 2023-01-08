import {
  Flex,
  Text,
  VStack,
  Box,
  HStack,
  Icon,
  Switch,
  IconButton
} from '@react-native-material/core';
import React, { useEffect, useLayoutEffect, useState } from 'react';
import { View, StyleSheet, Pressable, Image } from 'react-native';
import Header from '../components/Header';
import SettingTitle from '../components/SettingTitle';
import HeaderNavButton from '../components/HeaderNavButton';
import { useGlobalStore } from 'react-native-global-store';
import IStoreState from '../interfaces/IStoreState';
import diceTypes from '../constants/diceTypes';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#333034',
    height: '100%',
    paddingHorizontal: 16,
    paddingVertical: 60
  }
});

const recoveryTimes: number[] = [0, 5, 10, 20];

interface DiceSizeItem {
  size: number;
  label: string;
  marginTop: number;
}

const diceSizes: DiceSizeItem[] = [
  {
    size: 46,
    label: 'S',
    marginTop: 0
  },
  {
    size: 53,
    label: 'M',
    marginTop: -8
  },
  {
    size: 62,
    label: 'L',
    marginTop: -17
  },
  {
    size: 69,
    label: 'XL',
    marginTop: -25
  }
];

const SettingsScreen = ({ navigation }: any) => {
  const [globalState, setGlobalState] = useGlobalStore();
  const [diceSize, setDiceSize] = useState(globalState.cubeSize);
  const [diceType, setDiceType] = useState(globalState.diceType);
  const [numOfCubes, setNumOfCubes] = useState(globalState.numOfCubes);
  const [recoveryTime, setRecoveryTime] = useState(globalState.recoveryTime);
  const [save, setSave] = useState(false);

  useEffect(() => {
    if (save) {
      setGlobalState({
        cubeSize: diceSize,
        recoveryTime,
        numOfCubes,
        diceType
      });
      navigation.goBack();
    }
  }, [save]);

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <Header>
          <Flex
            direction="row"
            items="center"
            justify="between"
            h="100%"
            w="100%"
          >
            <HeaderNavButton
              icon="arrow-left"
              onPress={() => {
                navigation.goBack();
              }}
            />

            <Text variant="subtitle1" color="white">
              Settings
            </Text>
            <HeaderNavButton
              colors={['#3A8722', '#2E6B1A']}
              icon="check"
              onPress={() => {
                setSave(true);
              }}
            />
          </Flex>
        </Header>
      )
    });
  }, [navigation]);

  return (
    <VStack style={styles.container} spacing={20}>
      <Flex direction="column">
        <SettingTitle icon="arrow-expand" title="Dice Size" />
        <Box mt={50}>
          <HStack spacing={10} justify="around">
            {diceSizes.map((item) => (
              <Pressable
                key={item.label}
                onPress={() => {
                  setDiceSize(item.label);
                }}
              >
                <VStack
                  w={71}
                  h={76}
                  pb={5}
                  items="center"
                  justify="between"
                  radius={15}
                  style={{
                    backgroundColor:
                      item.label === diceSize ? '#8C1CAC' : '#1A191B'
                  }}
                >
                  <Box mt={item.marginTop}>
                    <Icon name="cube" size={item.size} color="white" />
                  </Box>
                  <Text
                    variant="body1"
                    color="#BABABA"
                    style={{
                      fontWeight: 'bold'
                    }}
                  >
                    {item.label}
                  </Text>
                </VStack>
              </Pressable>
            ))}
          </HStack>
        </Box>
      </Flex>
      <Flex direction="column">
        <SettingTitle icon="timer-outline" title="Recovery Time" />
        <Box mt={25}>
          <HStack spacing={10} justify="around">
            {recoveryTimes.map((item) => (
              <Pressable
                key={item}
                onPress={() => {
                  setRecoveryTime(item);
                }}
              >
                <VStack
                  w={71}
                  h={56}
                  pb={5}
                  items="center"
                  justify="center"
                  radius={15}
                  style={{
                    backgroundColor:
                      item === recoveryTime ? '#8C1CAC' : '#1A191B'
                  }}
                  spacing={5}
                >
                  <Text
                    variant="body1"
                    color="#BABABA"
                    style={{
                      fontWeight: 'bold',
                      textAlign: 'center'
                    }}
                  >
                    {item}
                  </Text>
                  <Text variant="caption" color="#BABABA">
                    Sec
                  </Text>
                </VStack>
              </Pressable>
            ))}
          </HStack>
        </Box>
      </Flex>
      <Flex direction="column">
        <SettingTitle icon="numeric" title="Number of Cubes" />
        <Flex mt={25} direction="row" justify="center" grow={1}>
          <HStack
            w={140}
            h={48}
            items="center"
            justify="between"
            radius={15}
            style={{
              backgroundColor: '#1A191B',
              paddingHorizontal: 10
            }}
          >
            <IconButton
              icon={(iprops) => (
                <Icon
                  {...iprops}
                  name="minus"
                  size={32}
                  color={numOfCubes === 1 ? 'grey' : 'white'}
                />
              )}
              onPress={() => {
                if (numOfCubes > 1) {
                  setNumOfCubes(numOfCubes - 1);
                }
              }}
              disabled={numOfCubes === 1}
            />
            <Flex
              h={28}
              w={28}
              center
              radius={7}
              style={{
                backgroundColor: '#75198F'
              }}
            >
              <Text
                variant="h6"
                color="white"
                style={{
                  fontWeight: 'bold'
                }}
              >
                {numOfCubes}
              </Text>
            </Flex>
            <IconButton
              icon={(iprops) => (
                <Icon {...iprops} name="plus" size={32} color="white" />
              )}
              onPress={() => {
                setNumOfCubes(numOfCubes + 1);
              }}
            />
          </HStack>
        </Flex>
      </Flex>
      <Flex direction="column">
        <SettingTitle icon="cube" title="Cube Type" />
        <Box mt={25}>
          <HStack spacing={10} justify="center">
            {diceTypes.map((item) => (
              <Pressable
                key={item.type}
                onPress={() => {
                  setDiceType(item.type);
                }}
                disabled={!item.enabled}
              >
                <VStack
                  w={100}
                  h={100}
                  pb={5}
                  items="center"
                  justify="between"
                  radius={15}
                  style={{
                    backgroundColor: !item.enabled
                      ? '#D3D3D3'
                      : item.type === diceType
                      ? '#8C1CAC'
                      : '#1A191B'
                  }}
                >
                  <Box>
                    <Image
                      style={{
                        width: 80,
                        height: 80
                      }}
                      source={item.image}
                    ></Image>
                    {/* <Icon name="cube" size={item.size} color="white" /> */}
                  </Box>
                  <Text
                    variant="body1"
                    color="#BABABA"
                    style={{
                      fontWeight: 'bold'
                    }}
                  >
                    {item.label}
                  </Text>
                </VStack>
              </Pressable>
            ))}
          </HStack>
        </Box>
      </Flex>
      <Flex direction="column">
        <SettingTitle title="Background:" />
      </Flex>
    </VStack>
  );
};

export default SettingsScreen;
