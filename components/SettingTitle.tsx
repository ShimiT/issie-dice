import {
  Flex,
  Icon,
  IconButton,
  Text,
  Stack
} from '@react-native-material/core';
import React, { Fragment } from 'react';
import { StyleSheet, View } from 'react-native';

interface ISettingTitleProps {
  title: string;
  icon?: string;
  action?: React.ReactNode;
}

const styles = StyleSheet.create({
  container: {
    height: 44,
    borderRadius: 10,
    backgroundColor: '#262427'
  }
});

const SettingTitle = (props: ISettingTitleProps) => {
  return (
    <View style={styles.container}>
      <Flex
        items="center"
        style={{
          height: '100%',
          paddingHorizontal: 10,
          overflow: 'hidden'
        }}
        justify="between"
        direction="row"
      >
        <Stack
          direction="row"
          spacing={10}
          h="100%"
          w="100%"
          items="center"
          justify="start"
        >
          {props.icon && <Icon size={20} name={props.icon} color="#BABABA" />}
          <Text variant="caption" color="#BABABA">
            {props.title}
          </Text>
        </Stack>
        {props.action && <View>{props.action}</View>}
      </Flex>
    </View>
  );
};

export default SettingTitle;
