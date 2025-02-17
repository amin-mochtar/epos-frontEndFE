import { plaiStyles } from 'plai_common_frontend';
import { Control, Controller } from 'react-hook-form';
import { useTranslation } from 'react-i18next';
import { Text } from 'react-native';
import { TFormDisclaimer } from '../../disclaimer.type';
import { additionalValidationSPAJModal, ProductType, TPolicyType } from '../../../../../utilities';
import { getOfferingProductWording } from '../../disclaimer.function';
import { OptionCard } from '../../../../../components';

type Props = {
    control: Control<TFormDisclaimer>;
    productCode: string
    productType: ProductType;
    policyType: TPolicyType;
}

const AdditionalSpajOfferingProduct = ({control, productType, policyType, productCode}: Props) => {
  const { t } = useTranslation();
  const offerProductWording = getOfferingProductWording(
    productCode,
    productType,
    policyType
  );

  return (
    <>
      <Text style={[plaiStyles.fontGrey33Bold, plaiStyles.mt24, plaiStyles.lineH24, plaiStyles.font16]}>
        {t('Epos:offer_product')}
        <Text style={[plaiStyles.fontRed, plaiStyles.py16]}> *</Text>
      </Text>
      <Controller
        name={'additionalValidationSPAJOfferingProduct'}
        control={control}
        // rules={ValidationForm({ isRequired: isVisibleResponseBank })}
        render={({ field: { onChange, value } }) => (
          <>
            <Text style={[plaiStyles.fontGrey33, plaiStyles.lineH20, plaiStyles.mt16, plaiStyles.pr16]}>
              {offerProductWording}
              <Text style={[plaiStyles.fontRed]}> *</Text>
            </Text>
            <OptionCard
              data={additionalValidationSPAJModal}
              theme="border"
              style={[plaiStyles.row]}
              spaceItem={8}
              insideStyle={[plaiStyles.flex]}
              selected={value}
              onSelected={onChange}
              uniqueTestId="offer-product"
            />
          </>
        )}
      />
    </>
  );
};

export default AdditionalSpajOfferingProduct;
