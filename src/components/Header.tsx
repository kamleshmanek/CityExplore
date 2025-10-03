import { useNavigation } from '@react-navigation/native';
import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  StyleProp,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

interface HeaderProps {
  title: string;
  subtitle?: string;

  // styles for everything
  containerStyle?: StyleProp<ViewStyle>;
  leftButtonStyle?: StyleProp<ViewStyle>;
  rightButtonStyle?: StyleProp<ViewStyle>;
  titleStyle?: StyleProp<TextStyle>;
  subtitleStyle?: StyleProp<TextStyle>;
  textContainerStyle?: StyleProp<ViewStyle>;

  // optional overrides for icons
  leftIconColor?: string;
  rightIconColor?: string;
  leftIconName?: string;
  rightIconName?: string;

  // custom press handlers
  onLeftPress?: () => void;
  onRightPress?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  title,
  subtitle,
  containerStyle,
  leftButtonStyle,
  rightButtonStyle,
  titleStyle,
  subtitleStyle,
  textContainerStyle,
  leftIconColor = 'white',
  rightIconColor = 'white',
  leftIconName = 'arrow-back',
  rightIconName,
  onLeftPress,
  onRightPress,
}) => {
  const navigation = useNavigation<any>();

  return (
    <View style={[styles.header, containerStyle]}>
      <TouchableOpacity
        style={[styles.headerButton, leftButtonStyle]}
        onPress={onLeftPress ?? (() => navigation.goBack())}
      >
        <Ionicons name={leftIconName} size={24} color={leftIconColor} />
      </TouchableOpacity>

      <View style={[styles.textContainer, textContainerStyle]}>
        <Text style={[styles.headerTitle, titleStyle]}>{title}</Text>
        {subtitle ? (
          <Text style={[styles.headerSubtitle, subtitleStyle]}>
            {subtitle}
          </Text>
        ) : null}
      </View>

      <TouchableOpacity
        style={[styles.headerButton, rightButtonStyle]}
        onPress={onRightPress}
        disabled={!onRightPress}
      >
        {rightIconName ? (
          <Ionicons name={rightIconName} size={24} color={rightIconColor} />
        ) : null}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 10,
    paddingVertical: 9,
    backgroundColor: 'black',
    marginBottom: 10,
  },
  headerButton: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    color: 'white',
    fontSize: 20,
    fontWeight: '600',
  },
  headerSubtitle: {
    color: 'gray',
    fontSize: 14,
  },
});

export default Header;
