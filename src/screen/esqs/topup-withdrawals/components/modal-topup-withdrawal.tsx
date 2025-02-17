import { InputField, ModalContainer, plaiStyles } from 'plai_common_frontend';
import { ScrollView, Text, View } from 'react-native';
import { EposRangeSlider } from '../../../../components/epos-range-slider/epos-range-slider';
import { Switch } from 'react-native-paper';
import { PruColor } from 'common_ui_components';
import { Button } from 'common_ui_components/app/components-ui';

type Variant = 'top-up' | 'withdrawal'

type Props = {
  variant: Variant;
  isShow: boolean;
  isUsePeriodYear: boolean;
  slideValue: number[];
  maxValue: number;
  value: string;
  onClose: () => void;
  onChangeSlider: (value: any) => void;
  onChangeSwitch: (value: any) => void;
  onSetValue: (value: string) => void;
  onSave: () => void;
  setSlideValue: (value: number[]) => void;
};

const ModalTopupWithdrawal = ({
  isShow,
  variant,
  onClose,
  onChangeSlider,
  onChangeSwitch,
  onSave,
  value,
  isUsePeriodYear,
  slideValue,
  maxValue,
  onSetValue,
}: Props) => {

  const content = variant == 'top-up' ? 'Top Up' : 'Penarikan';
  return (
    <ModalContainer visible={isShow} titleHeader={`Tambah ${content}`} onClose={onClose} avoidingKeyboard={true}>
      <ScrollView>
        <View style={[plaiStyles.pb24]}>
          <View style={[plaiStyles.row, plaiStyles.pb24]}>
            {!isUsePeriodYear ? (
              <>
                <View style={[plaiStyles.flex]}>
                  <Text style={[plaiStyles.fontBlackThin, plaiStyles.lineH20]}>Tahun ke</Text>
                </View>
                <View>
                  <Text style={[plaiStyles.fontBlackBold, plaiStyles.font18, plaiStyles.lineH22]}>
                    {slideValue[0] == 0 ? '0' : `1 - ${slideValue[0]}`}
                  </Text>
                </View>
              </>
            ) : (
              <>
                <View style={[plaiStyles.flex]}>
                  <Text style={[plaiStyles.fontBlackThin, plaiStyles.lineH20]}>Tahun Mulai</Text>
                  <Text style={[plaiStyles.fontBlackBold, plaiStyles.font18, plaiStyles.lineH22]}>{slideValue[0]}</Text>
                </View>
                <View style={[plaiStyles.flex]}>
                  <Text style={[plaiStyles.fontBlackThin, plaiStyles.lineH20]}>Tahun Akhir</Text>
                  <Text style={[plaiStyles.fontBlackBold, plaiStyles.font18, plaiStyles.lineH22]}>{slideValue[1]}</Text>
                </View>
              </>
            )}
          </View>

          <EposRangeSlider
            minimumValue={1}
            maximumValue={maxValue}
            onValueChange={onChangeSlider}
            step={1}
            isRangeSlider={isUsePeriodYear}
          />

          <View style={[plaiStyles.row, plaiStyles.justifyBetween]}>
            <Text style={plaiStyles.fontGrey66Thin}>{0}</Text>
            <Text style={plaiStyles.fontGrey66Thin}>{maxValue}</Text>
          </View>
          <View style={[plaiStyles.pb24]}>
            <InputField
              label={`Jumlah ${content}`}
              placeholder={`${content}`}
              keyboardType="phone-pad"
              required={false}
              leftItem={<Text style={[plaiStyles.fontGrey66, plaiStyles.font16]}>IDR</Text>}
              value={value}
              setValue={onSetValue}
            />
          </View>
          <View style={[plaiStyles.row]}>
            <View style={[plaiStyles.flex]}>
              <Text>Gunakan Periode Tahun</Text>
            </View>
            <View>
              <Switch value={isUsePeriodYear} color={PruColor.red} onValueChange={onChangeSwitch} />
            </View>
          </View>
        </View>
        <Button
          style={[plaiStyles.btnMedium]}
          textStyle={plaiStyles.fontWhite}
          text={'Simpan'}
          onPress={onSave}
        />
      </ScrollView>
    </ModalContainer>
  );
};

export default ModalTopupWithdrawal;
