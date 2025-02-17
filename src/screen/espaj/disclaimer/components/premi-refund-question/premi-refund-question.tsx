import { Control, Controller } from "react-hook-form";
import { TFormDisclaimer } from "../../disclaimer.type";
import { OptionCard, TOptionalCardData } from "../../../../../components";
import { statement, validateField, ValidationForm } from "../../../../../utilities";
import { useTranslation } from "react-i18next";
import { plaiStyles } from "plai_common_frontend";
import { Text, View } from "react-native";

type Props = {
    isShow?: boolean;
    control: Control<TFormDisclaimer>;
    onChangeValue: (item: TOptionalCardData) => void;
    premiContribution: string;
};

const PremiRefundQuestion = ({ isShow, control, onChangeValue, premiContribution }: Props) => {
    const {t} = useTranslation();
    if (isShow) {
      return (
        <>
          <Controller
            name={'policyholderAccountInfo'}
            control={control}
            rules={ValidationForm({ validate: validateField })}
            render={({ field: { value, onChange } }) => (
              <>
                <OptionCard
                  label={t('Epos:account_holder_premi_refund_question', { premiContribution })}
                  data={statement}
                  required={true}
                  theme="border"
                  style={[plaiStyles.row]}
                  spaceItem={8}
                  insideStyle={[plaiStyles.flex]}
                  selected={value as TOptionalCardData}
                  onSelected={async (item) => {
                    onChangeValue(item);
                    onChange(item);
                  }}
                  uniqueTestId="policyholder-account-info"
                />
              </>
            )}
          />
          <View style={[plaiStyles.bgOrange, plaiStyles.mt16, plaiStyles.br8, plaiStyles.py8, plaiStyles.px8]}>
            <Text style={[plaiStyles.fontOrangeThin, plaiStyles.lineH18]}>
              {t('Epos:bank_account_used_for_refund', { premiContribution })}
            </Text>
          </View>
        </>
      );
    }
    return <></>;
  };

  export default PremiRefundQuestion