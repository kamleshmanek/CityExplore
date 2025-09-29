import { StyleSheet } from 'react-native';
import colors from '../../themes/colors';

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background.card,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: colors.shadow.default,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  content: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    color: colors.text.primary,
    flex: 1,
    marginRight: 8,
  },
  rating: {
    fontSize: 14,
    color: colors.status.rating,
  },
  address: {
    fontSize: 14,
    color: colors.text.secondary,
    marginBottom: 8,
  },
  cuisine: {
    fontSize: 14,
    color: colors.status.cuisine,
    marginBottom: 12,
  },
  footer: {
    borderTopWidth: 1,
    borderTopColor: colors.border.light,
    paddingTop: 12,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    backgroundColor: colors.background.secondary,
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    marginLeft: 8,
  },
  actionButtonText: {
    fontSize: 12,
    color: colors.status.website,
  },
});

export default styles;
