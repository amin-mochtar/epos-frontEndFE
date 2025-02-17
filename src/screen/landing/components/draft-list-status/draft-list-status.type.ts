import { ImageSourcePropType } from "react-native"

export type DraftListStatusType = {
  image: ImageSourcePropType
  type: string
  title: string
  subTitle: string
  onPress?: () => void
}