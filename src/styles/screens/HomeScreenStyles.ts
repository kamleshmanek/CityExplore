import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../themes/styleConfig';
import fonts from '../../themes/fonts';
import colors from '../../themes/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.primary,
  },
  header: {
    alignItems: 'center',
    marginBottom: verticalScale(15),
    paddingHorizontal: scale(20),
  },
  title: {
    fontSize: moderateScale(32),
    color: colors.text.primary,
    marginBottom: verticalScale(10),
    fontFamily: fonts.bold,
  },
  titleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: verticalScale(10),
  },
  citySelector: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.background.secondary,
    paddingHorizontal: scale(12),
    paddingVertical: verticalScale(12),
    borderRadius: moderateScale(10),
    width:"100%",
    marginBottom: verticalScale(10),

  },
  cityText: {
    fontSize: moderateScale(14),
    color: colors.text.black,
    fontFamily: fonts.regular,
    marginRight: scale(5),
  },
  cityIcon: {
    fontSize: moderateScale(14),
  },
  subtitle: {
    fontSize: moderateScale(16),
    color: colors.text.secondary,
    fontFamily: fonts.regular,
  },
  categoriesContainer: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: scale(20),
    paddingBottom: verticalScale(20),
  },
  categoryCard: {
    width: '48%',
    aspectRatio: 1, // Make cards square
    marginBottom: verticalScale(20),
    borderRadius: moderateScale(20),
    backgroundColor: colors.background.primary,
    shadowColor: colors.shadow.default,
    shadowOffset: {
      width: 0,
      height: verticalScale(8),
    },
    shadowOpacity: 0.25,
    shadowRadius: moderateScale(10),
    elevation: 10,
    overflow: 'hidden',
  },
  cardContent: {
    flex: 1,
    borderRadius: moderateScale(20),
    padding: scale(15),
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  categoryIcon: {
    fontSize: moderateScale(36),
    marginBottom: verticalScale(8),
  },
  categoryName: {
    fontSize: moderateScale(14),
    color: colors.background.primary,
    textAlign: 'center',
    fontFamily: fonts.bold,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
    lineHeight: moderateScale(20),
  },
  // City Selection Modal Styles
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: colors.background.primary,
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(20),
    paddingBottom: verticalScale(30),
    maxHeight: '70%',
  },
  modalTitle: {
    fontSize: moderateScale(20),
    color: colors.text.primary,
    fontFamily: fonts.bold,
    marginBottom: verticalScale(20),
    textAlign: 'center',
  },
  searchInput: {
    borderWidth: 1,
    borderColor: colors.border.light,
    borderRadius: moderateScale(10),
    paddingHorizontal: scale(15),
    paddingVertical: verticalScale(12),
    fontSize: moderateScale(16),
    backgroundColor: colors.background.secondary,
    marginBottom: verticalScale(15),
  },
  loadingContainer: {
    alignItems: 'center',
    paddingVertical: verticalScale(20),
  },
  loadingText: {
    fontSize: moderateScale(16),
    color: colors.text.secondary,
    fontFamily: fonts.regular,
  },
  suggestionsList: {
    maxHeight: verticalScale(200),
    marginBottom: verticalScale(20),
  },
  citySuggestion: {
    paddingVertical: verticalScale(15),
    paddingHorizontal: scale(10),
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  citySuggestionText: {
    fontSize: moderateScale(16),
    color: colors.text.primary,
    fontFamily: fonts.regular,
  },
  closeButton: {
    backgroundColor: colors.category.restaurants,
    paddingVertical: verticalScale(12),
    paddingHorizontal: scale(30),
    borderRadius: moderateScale(25),
    alignSelf: 'center',
  },
  closeButtonText: {
    fontSize: moderateScale(16),
    color: colors.background.primary,
    fontFamily: fonts.bold,
  },
});

export default styles;
