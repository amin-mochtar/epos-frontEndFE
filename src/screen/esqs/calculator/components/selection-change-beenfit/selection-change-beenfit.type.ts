import { TOptionalCardData } from '../../../../../components'

export type TSelectionChangeBenefit = {
  titleHeader: string
  productName: string
  visible: boolean
  onClose: () => void
  data: TOptionalCardData[]
  onSelected: (value: TOptionalCardData) => void
  onPress: () => void
  selected: TOptionalCardData[]
  errorMessage: any
}