import { Flex, Text } from '@react-native-material/core';
import React from 'react';
import { View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    height: 108,
    backgroundColor: '#060506'
  },
  contentContainer: {
    backgroundColor: '#1A191B',
    borderRadius: 30,
    height: 125,
    paddingHorizontal: 20
  }
});

interface IHeaderProps {
  children?: React.ReactNode;
}

const Header = (props: IHeaderProps) => {
  return (
    <View style={styles.container}>
      <View style={styles.contentContainer}>{props.children}</View>
    </View>
  );
};

export default Header;
