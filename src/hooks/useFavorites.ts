import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../redux/store';
import { FavoriteItem, toggleFavorite } from '../redux/favoritesSlice';

export const useFavorites = () => {
  const dispatch = useDispatch<AppDispatch>();
  const favorites = useSelector((state: RootState) => state.favorites.items);

  const addToFavorites = (item: FavoriteItem) => {
    dispatch(toggleFavorite(item));
  };

  const removeFromFavorites = (id: string) => {
    dispatch(toggleFavorite({ id } as FavoriteItem));
  };

  const isFavorite = (id: string) => {
    return favorites.some(item => item.id === id);
  };

  const toggleFavorites = (item: FavoriteItem) => {
    dispatch(toggleFavorite(item));
  };

  return {
    favorites,
    addToFavorites,
    removeFromFavorites,
    isFavorite,
    toggleFavorites,
  };
};
