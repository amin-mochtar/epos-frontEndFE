import { View, Text, FlatList, ListRenderItem } from 'react-native';
import React, { FC, useCallback } from 'react';
import { InputField, onChangeNumber, plaiStyles } from 'plai_common_frontend';
import { Button } from 'common_ui_components/app/components-ui';
import { Control, Controller, FieldArrayWithId, FieldErrors } from 'react-hook-form';
import { UpfrontDecisionModel, ValidationForm } from '../../../../utilities';
import { SectionTitle } from '../../../../components';
import WithSpacing from './WithView';

type Props = {
  control: Control<UpfrontDecisionModel.FormLsar>;
  errors: FieldErrors<UpfrontDecisionModel.FormLsar>;
  fields: FieldArrayWithId<UpfrontDecisionModel.FormLsar, 'customer_company_financial', 'id'>[];
  onDelete: (index: number) => void;
  onPressAdd: () => void;
};

const CustomerCompanyFinancials: FC<Props> = ({ control, errors, fields, onDelete, onPressAdd }) => {
  const Currency = <Text>IDR</Text>;
  const renderItem: ListRenderItem<
    FieldArrayWithId<UpfrontDecisionModel.FormLsar, 'customer_company_financial', 'id'>
  > = useCallback(
    ({ item, index }) => {
      return (
        <View key={item.id}>
          <Controller
            name={`customer_company_financial.${index}.year`}
            control={control}
            rules={ValidationForm({ isRequired: true, maxLength: 4 })}
            render={({ field: { onChange, value } }) => (
              <WithSpacing>
                <InputField
                  label="Tahun"
                  setValue={onChange}
                  value={value}
                  containerStyle={[ plaiStyles.mt0]}
                  error={errors?.customer_company_financial?.[index]?.year}
                  placeholder="Masukkan Tahun"
                  keyboardType="numeric"
                  maxLength={4}
                />
              </WithSpacing>
            )}
          />
          <Controller
            name={`customer_company_financial.${index}.turnover`}
            control={control}
            rules={ValidationForm({ isRequired: true, maxLength: 15 })}
            render={({ field: { onChange, value } }) => (
              <WithSpacing>
                <InputField
                  label="Omset Perusahaan"
                  setValue={(item: string) => {
                    onChangeNumber(item, onChange);
                  }}
                  keyboardType="numeric"
                  value={value}
                  containerStyle={[ plaiStyles.mt0]}
                  error={errors?.customer_company_financial?.[index]?.turnover}
                  placeholder="Masukkan jumlah"
                  leftItem={Currency}
                  maxLength={15}
                />
              </WithSpacing>
            )}
          />
          <Controller
            name={`customer_company_financial.${index}.gross_profit`}
            control={control}
            rules={ValidationForm({ isRequired: true, maxLength: 15 })}
            render={({ field: { onChange, value } }) => (
              <WithSpacing>
                <InputField
                  label="Laba Kotor"
                  setValue={(item: string) => {
                    onChangeNumber(item, onChange);
                  }}
                  keyboardType="numeric"
                  value={value}
                  containerStyle={[ plaiStyles.mt0]}
                  error={errors?.customer_company_financial?.[index]?.gross_profit}
                  placeholder="Masukkan jumlah"
                  leftItem={Currency}
                  maxLength={15}
                />
              </WithSpacing>
            )}
          />
          <Controller
            name={`customer_company_financial.${index}.net_profit`}
            control={control}
            rules={ValidationForm({ isRequired: true, maxLength: 15 })}
            render={({ field: { onChange, value } }) => (
              <WithSpacing>
                <InputField
                  label="Laba Bersih Sebelum Pajak"
                  setValue={(item: string) => {
                    onChangeNumber(item, onChange);
                  }}
                  keyboardType="numeric"
                  value={value}
                  containerStyle={[ plaiStyles.mt0]}
                  error={errors?.customer_company_financial?.[index]?.net_profit}
                  placeholder="Masukkan jumlah"
                  leftItem={Currency}
                  maxLength={15}
                />
              </WithSpacing>
            )}
          />
          {fields.length > 1 && (
            <Button
              onPress={() => onDelete(index)}
              text="Hapus"
              textStyle={plaiStyles.fontGrey33}
              style={[plaiStyles.bgwhite, plaiStyles.borderGreycc, plaiStyles.mt16]}
            />
          )}
        </View>
      );
    },
    [errors, control, fields, onDelete],
  );

  const ItemFooter = useCallback(() => {
    const isDisabled = fields.length === 3;
    return (
      <Button
        disabled={isDisabled}
        onPress={onPressAdd}
        text="Tambah Tahun"
        textStyle={[isDisabled ? plaiStyles.fontWhite : plaiStyles.fontRed]}
        style={[isDisabled ? plaiStyles.bgBtnDisabled : plaiStyles.bgBtnRedLight]}
      />
    );
  }, [fields]);

  return (
    <View style={[plaiStyles.px16, plaiStyles.py16, plaiStyles.bgwhite, plaiStyles.my8]}>
      <SectionTitle text="Keuangan Perusahaan" wrapperStyle={[plaiStyles.mt0, ]} />
      <FlatList
        data={fields}
        renderItem={renderItem}
        ListFooterComponent={ItemFooter}
        ListFooterComponentStyle={plaiStyles.mt16}
        ItemSeparatorComponent={() => <View style={plaiStyles.mt16} />}
      />
    </View>
  );
};

export default CustomerCompanyFinancials;
