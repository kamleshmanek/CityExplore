import React from 'react';
import { TouchableOpacity, Text, View } from 'react-native';
import { Category } from '../types';
import styles from '../styles/screens/HomeScreenStyles';

interface CategoryCardProps {
  category: Category;
  onPress: (category: Category) => void;
}

export const CategoryCard: React.FC<CategoryCardProps> = ({ category, onPress }) => {
  return (
    <TouchableOpacity
      style={styles.categoryCard}
      onPress={() => onPress(category)}
      activeOpacity={0.8}
    >
      <View style={[styles.cardContent, { backgroundColor: category.color }]}>
        <Text style={styles.categoryIcon}>{category.icon}</Text>
        <Text style={styles.categoryName}>{category.name}</Text>
      </View>
    </TouchableOpacity>
  );
};
