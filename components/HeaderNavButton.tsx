import React from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';
import { IconButton } from '@react-native-material/core';
import { GestureResponderEvent, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  headerButton: {
    borderRadius: 15,
    overflow: 'hidden',
    height: 44,
    width: 44
  },
  headerIconButton: {
    height: 44,
    width: 44
  }
});

interface IHeaderIconButtonProps {
  icon: string;
  color?: string;
  disabled: boolean;
  onPress: (event: GestureResponderEvent) => void;
  colors?: string[];
}

const defaultProps: IHeaderIconButtonProps = {
  icon: '',
  color: 'white',
  disabled: false,
  onPress: () => {},
  colors: ['#746D75', '#5A545A']
};

const HeaderIconButton: React.FC<IHeaderIconButtonProps> = (props) => {
  return (
    <LinearGradient colors={props.colors ?? []} style={styles.headerButton}>
      <IconButton
        disabled={props.disabled}
        icon={(iprops) => (
          <Icon name={props.icon} {...iprops} color={props.color} />
        )}
        style={styles.headerIconButton}
        onPress={(event: GestureResponderEvent) => {
          props.onPress(event);
        }}
      />
    </LinearGradient>
  );
};

HeaderIconButton.defaultProps = defaultProps;

export default HeaderIconButton;
