import {
  Flex,
  Text,
  VStack,
  Box,
  HStack,
  Icon,
  Switch
} from '@react-native-material/core';
import React, { useLayoutEffect, useState } from 'react';
import { View, StyleSheet, Pressable } from 'react-native';
import Header from '../components/Header';
import SettingTitle from '../components/SettingTitle';
import HeaderNavButton from '../components/HeaderNavButton';
import { useGlobalStore } from 'react-native-global-store';

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

  useLayoutEffect(() => {
    navigation.setOptions({
      header: () => (
        <Header>
          <Flex
            direction="row"
            items="center"
            justify="between"
            h={'100%'}
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
                navigation.goBack();
              }}
            />
          </Flex>
        </Header>
      )
    });
  }, [navigation]);

  const handleCubeSizePress = (item: DiceSizeItem) => {
    setGlobalState({
      size: item.label
    });
  };

  const handleRecoveryTimePress = (item: number) => {
    setGlobalState({
      recoveryTime: item
    });
  };

  return (
    <VStack style={styles.container} spacing={20}>
      <Flex direction="column">
        <SettingTitle icon="arrow-expand" title="Dice Size" />
        <Box mt={50}>
          <HStack spacing={10} justify="around">
            {diceSizes.map((item) => (
              <Pressable onPress={() => handleCubeSizePress(item)}>
                <VStack
                  w={71}
                  h={76}
                  pb={5}
                  items="center"
                  justify="between"
                  radius={15}
                  style={{
                    backgroundColor:
                      item.label === globalState.size ? '#8C1CAC' : '#1A191B'
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
        <SettingTitle
          icon="timer-outline"
          title="Recovery Time"
          action={<Switch></Switch>}
        />
        <Box mt={25}>
          <HStack spacing={10} justify="around">
            {recoveryTimes.map((item) => (
              <Pressable onPress={() => handleRecoveryTimePress(item)}>
                <VStack
                  w={71}
                  h={56}
                  pb={5}
                  items="center"
                  justify="center"
                  radius={15}
                  style={{
                    backgroundColor:
                      item === globalState.recoveryTime ? '#8C1CAC' : '#1A191B'
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
        <SettingTitle title="Background:" />
      </Flex>
    </VStack>
  );
};

export default SettingsScreen;
