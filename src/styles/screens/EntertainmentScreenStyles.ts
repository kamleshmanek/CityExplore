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
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(20),
    paddingBottom: verticalScale(10),
    backgroundColor: colors.background.primary,
  },
  title: {
    fontSize: moderateScale(28),
    color: colors.text.primary,
    marginBottom: verticalScale(5),
    fontFamily: fonts.bold,
  },
  subtitle: {
    fontSize: moderateScale(16),
    color: colors.text.secondary,
    fontFamily: fonts.regular,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background.primary,
  },
  loadingText: {
    marginTop: verticalScale(10),
    fontSize: moderateScale(16),
    color: colors.text.secondary,
    fontFamily: fonts.regular,
  },
  listContainer: {
    padding: scale(20),
    paddingTop: verticalScale(10),
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: verticalScale(100),
  },
  emptyText: {
    fontSize: moderateScale(16),
    color: colors.text.secondary,
    textAlign: 'center',
    fontFamily: fonts.regular,
  },
});

export default styles;
