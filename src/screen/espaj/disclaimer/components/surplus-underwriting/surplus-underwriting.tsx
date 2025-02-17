import { Control, Controller } from "react-hook-form";
import { TFormDisclaimer } from "../../disclaimer.type";
import { validateField, ValidationForm } from "../../../../../utilities";
import { OptionCard, TOptionalCardData } from "../../../../../components";
import { surplusUnderwritingList, surplusUnderwritingNotes } from "../../disclaimer.data";
import { plaiStyles, TextDecoration } from "plai_common_frontend";
import { Text, View } from "react-native";

type Props = {
    productCode?: string
    isShow?: boolean
    control: Control<TFormDisclaimer>
    onChangeValue: (item: TOptionalCardData, value: TOptionalCardData) => void
}

const SurplusUnderwriting = ({ productCode = '', isShow, control, onChangeValue }: Props) => {
    if (isShow) {
      return (
        <>
          <Controller
            name={'surplusUnderwriting'}
            control={control}
            rules={ValidationForm({ validate: validateField })}
            render={({ field: { onChange, value } }) => (
              <>
                <OptionCard
                  label="SAYA setuju memberikan kuasa kepada pengelola untuk mengalokasikan porsi <i>surplus underwriting</i> yang SAYA terima sesuai dengan pilihan SAYA di bawah ini:"
                  data={surplusUnderwritingList[productCode] || surplusUnderwritingList['U13']}
                  theme="border"
                  style={[plaiStyles.mt12, plaiStyles.mb16]}
                  spaceItem={8}
                  insideStyle={[plaiStyles.flex]}
                  selected={value}
                  onSelected={(item) => {
                    onChange(item)
                    onChangeValue(item, value)
                  }}
                  uniqueTestId="surplus-underwriting"
                />
              </>
            )}
          />

          <View style={[plaiStyles.bgBlue, plaiStyles.mt16, plaiStyles.br8, plaiStyles.py8, plaiStyles.px8]}>
            <Text style={[plaiStyles.fontBlue, plaiStyles.lineH18]}>
              <TextDecoration label={surplusUnderwritingNotes[productCode] || surplusUnderwritingNotes['U13']} />
            </Text>
          </View>
        </>
      );
    }
    return <></>;
  };

export default SurplusUnderwriting