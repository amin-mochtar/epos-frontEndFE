import { Control, Controller, FieldErrors, SubmitHandler, UseFormHandleSubmit } from 'react-hook-form';
import { TFormDisclaimer } from '../../disclaimer.type';
import { BANK_LIST, ProductType, TPolicyType, validateField, ValidationForm } from '../../../../../utilities';
import {
  DropdownField,
  InputField,
  onChangeNameFormating,
  plaiStyles,
  sanitizedLetterText,
  TextDecoration,
} from 'plai_common_frontend';
import { useTranslation } from 'react-i18next';
import { FlatList, Text, View } from 'react-native';
import { validateAccountNumber } from '../../disclaimer.function';
import { Button } from 'common_ui_components/app/components-ui';
import { pruTestID } from 'common_services_frontend';
import { notesAccountHolder } from '../../disclaimer.data';

type Props = {
  isShow?: boolean;
  onDisabled?: boolean;
  control: Control<TFormDisclaimer>;
  errors?: FieldErrors<TFormDisclaimer>;
  premiContribution: string;
  defaultPolicyHolderAccount: any;
  policyType: TPolicyType;
  productType: ProductType;
  productCode: string;
  handleSubmit: UseFormHandleSubmit<TFormDisclaimer, undefined>;
  onCheckBank: SubmitHandler<TFormDisclaimer>;
  onRemoveAccount: () => void;
  currency: string;
};

type PropsNotes = {
  isShow?: boolean;
  productType: ProductType;
  policyType: TPolicyType;
  productCode: string;
  currency: string;
};

const AccountHolderForm = ({
  isShow,
  control,
  onDisabled,
  errors,
  premiContribution,
  defaultPolicyHolderAccount,
  productType,
  policyType,
  productCode,
  handleSubmit,
  onCheckBank,
  onRemoveAccount,
  currency,
}: Props) => {
  const { t } = useTranslation();
  if (isShow) {
    return (
      <>
        <Controller
          name={'bankName'}
          control={control}
          rules={ValidationForm({ validate: validateField })}
          render={({ field: { value, onChange } }) => (
            <DropdownField
              labelMap={{
                title: t('Epos:bank_for_transfer'),
                placeholder: t('Epos:select_bank'),
              }}
              keyMap={{
                value: 'codeBank',
                label: 'nameBank',
                search: 'nameBank',
              }}
              search={{
                isOnChangeSearch: true,
              }}
              data={BANK_LIST}
              selected={value}
              onSelected={onChange}
              onDisabled={onDisabled}
              error={errors?.bankName}
              id="dropdown-bank-name"
            />
          )}
        />
        <Controller
          name={'accountHolder'}
          control={control}
          rules={ValidationForm({
            validate: validateField,
            maxLength: 40,
            pattern: {
              value: /^[,./'()a-zA-Z\s][a-zA-Z\s,./'()]*$/,
              message: 'Tidak Boleh Angka dan Karakter Khusus',
            },
          })}
          render={({ field: { onChange, value } }) => (
            <InputField
              label={t('Epos:name_of_account_holder')}
              placeholder={t('Epos:enter_name')}
              maxLength={40}
              editable={!onDisabled}
              value={value}
              setValue={(value) => onChange(onChangeNameFormating(value))}
              error={errors?.accountHolder}
              id="input-account-holder"
            />
          )}
        />
        <View style={[plaiStyles.bgBlue, plaiStyles.py16, plaiStyles.px16, plaiStyles.br8, plaiStyles.mt24]}>
          <Text style={[plaiStyles.fontBlue]}>
            {t('Epos:account_owner_not_same_as_the_prospective_policyholder', { premiContribution })}
          </Text>
        </View>
        <Controller
          name={'city'}
          control={control}
          rules={ValidationForm({ validate: validateField, maxLength: 40 })}
          render={({ field: { onChange, value } }) => (
            <InputField
              label={t('Epos:city_regency')}
              placeholder={t('Epos:enter_city')}
              maxLength={40}
              editable={!onDisabled}
              value={value}
              setValue={(value) => onChange(sanitizedLetterText(value))}
              error={errors?.city}
              id="input-city"
            />
          )}
        />
        <Controller
          name={'branch'}
          control={control}
          rules={ValidationForm({ validate: validateField, maxLength: 40 })}
          render={({ field: { onChange, value } }) => (
            <InputField
              label={t('Epos:branch')}
              placeholder={t('Epos:enter_branch')}
              maxLength={40}
              editable={!onDisabled}
              value={value}
              setValue={(value) => onChange(sanitizedLetterText(value))}
              error={errors?.branch}
              id="input-branch"
            />
          )}
        />
        <Controller
          name={'accountNumber'}
          control={control}
          rules={ValidationForm({ validate: validateField, maxLength: 60 })}
          render={({ field: { onChange, value } }) => (
            <InputField
              label={t('Epos:account_number')}
              placeholder={t('Epos:enter_account_number')}
              maxLength={20}
              editable={!onDisabled}
              value={value}
              setValue={(value) => onChange(validateAccountNumber(value))}
              error={errors?.accountNumber}
              keyboardType="phone-pad"
              id="input-account-number"
            />
          )}
        />

        {defaultPolicyHolderAccount == '' && (
          <Button
            style={[plaiStyles.bgBtnSecondary, plaiStyles.mt24, plaiStyles.mb16]}
            textStyle={plaiStyles.fontRed}
            text={t('Epos:check')}
            onPress={handleSubmit(onCheckBank)}
            {...pruTestID('button-check-bank')}
          />
        )}

        {defaultPolicyHolderAccount != '' && (
          <Button
            style={[plaiStyles.py8, plaiStyles.borderGreycc, plaiStyles.mt24]}
            textStyle={plaiStyles.fontGrey33}
            text={t('Epos:remove_data')}
            onPress={onRemoveAccount}
            {...pruTestID('button-remove-bank')}
          />
        )}
        <AccountHolderNotes
          currency={currency}
          isShow={onDisabled}
          productType={productType}
          policyType={policyType}
          productCode={productCode}
        />
      </>
    );
  }
  return <></>;
};

const AccountHolderNotes = ({ isShow, productType, policyType, currency, productCode }: PropsNotes) => {
  const { t } = useTranslation();
  if (isShow) {
    return (
      <View style={[plaiStyles.bgOrange, plaiStyles.mt16, plaiStyles.br8, plaiStyles.py8, plaiStyles.px8]}>
        <Text style={[plaiStyles.fontOrangeBold]}>{t('Epos:note')}</Text>
        <FlatList
          data={notesAccountHolder(productType, policyType, currency, productCode)}
          style={[plaiStyles.mt8]}
          renderItem={({ item }) => {
            return (
              <View style={[plaiStyles.mb10, plaiStyles.row]}>
                <Text style={[plaiStyles.fontOrangeThin]}>{`\u2022 `}</Text>
                <Text style={[plaiStyles.fontOrangeThin, plaiStyles.flex, plaiStyles.flexWrap]}>
                  <TextDecoration label={item.key} />
                </Text>
              </View>
            );
          }}
        />
      </View>
    );
  }
  return <></>;
};

export default AccountHolderForm;
