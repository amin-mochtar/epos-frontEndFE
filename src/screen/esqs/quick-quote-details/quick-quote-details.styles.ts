import { StyleSheet } from 'react-native';
import { PruColor } from 'common_ui_components';
const detailProductStyles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: PruColor.white,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  contentWrapper: {
    paddingHorizontal: 20,
    paddingTop: 24,
  },
  quickQuote1: {
    fontSize: 16,
    color: PruColor.majorRed,
    fontWeight: '600',
    lineHeight: 24,
  },
  proteksiJiwa: {
    fontSize: 14,
    color: PruColor.grey33,
    fontWeight: '400',
    lineHeight: 20,
    marginTop: 8,
    marginBottom: 24,
  },
  lineHorizontal: {
    width: '100%',
    height: 1,
    backgroundColor: PruColor.greyf0,
    marginBottom: 16,
  },
  product: {
    fontSize: 14,
    color: PruColor.grey33,
    fontWeight: '400',
    lineHeight: 22,
  },
  productName: {
    fontSize: 16,
    color: PruColor.grey33,
    fontWeight: '700',
    lineHeight: 20,
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: PruColor.grey33,
    fontWeight: '400',
    lineHeight: 20,
    marginBottom: 4,
  },
  amount: {
    fontSize: 16,
    color: PruColor.grey33,
    fontWeight: '700',
    lineHeight: 22,
    marginBottom: 16,
  },
  asumsiNilaiTunai: {
    fontSize: 16,
    color: PruColor.grey33,
    fontWeight: '600',
    lineHeight: 24,
    marginBottom: 4,
  },
  asumsiNilaiTunaiTahun: {
    fontSize: 14,
    color: PruColor.grey33,
    fontWeight: '400',
    lineHeight: 20,
  },
  progressStepWrapper: {
    height: 200,
  },
  stepLabel: {
    fontSize: 14,
    textAlign: 'left',
    fontWeight: '400',
    color: PruColor.grey33,
    width: 153,
  },
});
export default detailProductStyles;