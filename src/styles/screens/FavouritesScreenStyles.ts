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
  listContainer: {
    padding: scale(20),
    paddingTop: verticalScale(10),
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: verticalScale(100),
    paddingHorizontal: scale(40),
  },
  emptyIcon: {
    fontSize: moderateScale(64),
    marginBottom: verticalScale(20),
  },
  emptyTitle: {
    fontSize: moderateScale(24),
    color: colors.text.primary,
    marginBottom: verticalScale(10),
    textAlign: 'center',
    fontFamily: fonts.bold,
  },
  emptySubtitle: {
    fontSize: moderateScale(16),
    color: colors.text.secondary,
    textAlign: 'center',
    lineHeight: verticalScale(24),
    fontFamily: fonts.regular,
  },
});

export default styles;
