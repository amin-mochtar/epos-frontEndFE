import { PruColor } from 'common_ui_components'
import { StyleSheet } from 'react-native'
import { eposColor } from '../../utilities'

export const cptStyle = StyleSheet.create({
  wrapperCard: {
    flex: 1,
    borderWidth: 1,
    borderRadius: 12,
    marginBottom: 12,
    paddingHorizontal: 16,
    paddingVertical: 20,
    minHeight: 102,
  },
  defaultColor: { borderColor: PruColor.white, backgroundColor: PruColor.white },
  colorSelected: { borderColor: PruColor.majorRed, backgroundColor: eposColor.redF8 },
  wrapperImage: { width: 30, height: 30 },
  image: { width: '100%', height: '100%', resizeMode: 'contain' },
})
