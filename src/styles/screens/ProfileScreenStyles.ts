import { StyleSheet } from 'react-native';
import { scale, verticalScale, moderateScale } from '../../themes/styleConfig';
import fonts from '../../themes/fonts';
import colors from '../../themes/colors';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background.secondary,
  },
  scrollContent: {
    flexGrow: 1,
    paddingBottom: verticalScale(20),
  },
  header: {
    alignItems: 'center',
    paddingVertical: verticalScale(40),
    backgroundColor: colors.background.card,
    marginBottom: verticalScale(20),
  },
  profileImage: {
    width: scale(100),
    height: scale(100),
    borderRadius: moderateScale(50),
    backgroundColor: colors.border.medium,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: verticalScale(20),
  },
  profileEmoji: {
    fontSize: moderateScale(48),
  },
  name: {
    fontSize: moderateScale(24),
    color: colors.text.primary,
    marginBottom: verticalScale(5),
    fontFamily: fonts.bold,
  },
  email: {
    fontSize: moderateScale(16),
    color: colors.text.secondary,
    fontFamily: fonts.regular,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: scale(20),
    marginBottom: verticalScale(30),
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: moderateScale(24),
    color: colors.status.rating,
    marginBottom: verticalScale(5),
    fontFamily: fonts.bold,
  },
  statLabel: {
    fontSize: moderateScale(14),
    color: colors.text.secondary,
    fontFamily: fonts.regular,
  },
  optionsContainer: {
    backgroundColor: colors.background.card,
    marginBottom: verticalScale(20),
  },
  sectionTitle: {
    fontSize: moderateScale(18),
    color: colors.text.primary,
    paddingHorizontal: scale(20),
    paddingTop: verticalScale(20),
    paddingBottom: verticalScale(10),
    fontFamily: fonts.bold,
  },
  optionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(15),
    borderBottomWidth: 1,
    borderBottomColor: colors.border.light,
  },
  optionIcon: {
    fontSize: moderateScale(20),
    marginRight: scale(15),
    width: scale(25),
    textAlign: 'center',
  },
  optionTitle: {
    flex: 1,
    fontSize: moderateScale(16),
    color: colors.text.primary,
    fontFamily: fonts.regular,
  },
  optionArrow: {
    fontSize: moderateScale(20),
    color: colors.text.light,
  },
  footer: {
    alignItems: 'center',
    paddingTop: verticalScale(20),
  },
  version: {
    fontSize: moderateScale(14),
    color: colors.text.muted,
    fontFamily: fonts.regular,
  },
});

export default styles;
