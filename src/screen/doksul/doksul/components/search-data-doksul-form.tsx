import { plaiStyles } from "plai_common_frontend";
import { Text, TextInput, View } from "react-native";
import { color } from 'common_ui_components/app/theme';
import { Button } from 'common_ui_components/app/components-ui';
import { Divider } from "react-native-paper";
import { TResponseData } from "../doksul.screen";

type TSearchDoksulForm = {
  spajNumber: string,
  value: string,
  onChangeText: (value: string) => void,
  editable: boolean,
  data: TResponseData,
  onPressReset: () => void,
  onPressSearch: () => void
}

export const SearchDoksulForm = ({ spajNumber, value, onChangeText, editable, data, onPressReset, onPressSearch }: TSearchDoksulForm) => {
  return (
    <>
      <View style={[plaiStyles.borderbf0, plaiStyles.mt8]}>
        <View style={[plaiStyles.row, plaiStyles.justifyBetween, plaiStyles.alignCenter]}>
          <Text style={[plaiStyles.fontGrey33, plaiStyles.lineH20]}>
            Nomor (SPAJ/SPAJ Syariah) <Text style={plaiStyles.fontRed}> *</Text>
          </Text>
        </View>
        <View style={[plaiStyles.flex, plaiStyles.row, plaiStyles.justifyBetween]}>
          <TextInput
            style={[plaiStyles.fontBlack, plaiStyles.font16, plaiStyles.flex, plaiStyles.py8]}
            placeholder={'Masukan nomor (SPAJ/SPAJ Syariah)'}
            placeholderTextColor={color.greycc}
            value={value}
            onChangeText={onChangeText}
            editable={editable ? false : true}
          />
        </View>
      </View>

      {!spajNumber && (
        <View style={[plaiStyles.row, plaiStyles.mt12]}>
          <Button
            style={[plaiStyles.bgBtnSecondary, !value || data?.loading ? plaiStyles.opacity3 : plaiStyles.bgBtnSecondary, plaiStyles.btnSmall, plaiStyles.flex]}
            textStyle={[plaiStyles.fontRed]}
            onPress={onPressReset}
            disabled={!value || data?.loading}
            text={'Atur Ulang'}
          />
          <Divider style={[plaiStyles.px8]} />
          <Button
            style={[editable ? plaiStyles.bgBtnDisabled : plaiStyles.bgBtnRed, plaiStyles.btnSmall, plaiStyles.flex]}
            textStyle={[plaiStyles.fontWhite]}
            onPress={onPressSearch}
            disabled={editable}
            text={'Cari Nomor SPAJ'}

          />
        </View>
      )}
    </>
  )
}