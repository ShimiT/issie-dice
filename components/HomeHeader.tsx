import { Flex, HStack, IconButton, Box } from '@react-native-material/core';
import React from 'react';
import { View, StyleSheet, GestureResponderEvent } from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { LinearGradient } from 'expo-linear-gradient';
import Header from './Header';
import HeaderNavButton from './HeaderNavButton';

const styles = StyleSheet.create({
  container: {
    height: '100%'
  },
  headerButton: {
    borderRadius: 15,
    overflow: 'hidden',
    height: 44,
    width: 44,
    marginRight: 10
  },
  headerIconButton: {
    height: 44,
    width: 44
  }
});

interface IHomeHeaderProps {
  onSettingsPressed: (event: GestureResponderEvent) => void;
}

const HomeHeader = (props: IHomeHeaderProps) => {
  return (
    <Header>
      <Flex
        justify="between"
        items="center"
        direction="row"
        style={styles.container}
      >
        <HStack spacing={15}>
          <Box>
            <HeaderNavButton
              icon="cog-outline"
              onPress={props.onSettingsPressed}
            />
          </Box>
          <Box>
            <HeaderNavButton
              icon="format-list-bulleted-square"
              onPress={props.onSettingsPressed}
            />
          </Box>
        </HStack>
        <HeaderNavButton
          icon="cube"
          onPress={props.onSettingsPressed}
          colors={['#8C1CAC', '#6E1987']}
        />
      </Flex>
    </Header>
  );
};

export default HomeHeader;
