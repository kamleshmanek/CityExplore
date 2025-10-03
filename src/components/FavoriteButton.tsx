import React from 'react';
import { TouchableOpacity, StyleSheet, ViewStyle } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { useFavorites } from '../hooks/useFavorites';

interface FavoriteButtonProps {
  item: {
    id: string;
    name: string;
    [key: string]: any;
  };
  size?: number;
  color?: string;
  activeColor?: string;
}

export const FavoriteButton: React.FC<FavoriteButtonProps> = ({
  item,
  size = 24,
  color = '#000',
  activeColor = '#ff4757',
}) => {
  const { isFavorite, toggleFavorites } = useFavorites();
  const isItemFavorite = isFavorite(item.id);

  return (
    <TouchableOpacity
      onPress={() => toggleFavorites(item)}
      style={styles.button}
      hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
    >
      <Icon
        name={isItemFavorite ? 'favorite' : 'favorite-border'}
        size={size}
        color={isItemFavorite ? activeColor : color}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    padding: 8,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
  } as ViewStyle,
});

export default FavoriteButton;
