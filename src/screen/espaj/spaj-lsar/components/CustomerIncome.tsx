import { ListRenderItem, Text, View } from 'react-native';
import React, { FC, useCallback } from 'react';
import { SectionTitle } from '../../../../components';
import { FlatList } from 'react-native';
import { InputField, onChangeNumber, plaiStyles } from 'plai_common_frontend';
import { Button } from 'common_ui_components/app/components-ui';
import { Control, Controller, FieldArrayWithId, FieldErrors } from 'react-hook-form';
import { UpfrontDecisionModel, ValidationForm } from '../../../../utilities';
import WithSpacing from './WithView';

type Props = {
  fields: FieldArrayWithId<UpfrontDecisionModel.FormLsar, 'income', 'id'>[];
  onPressAdd: () => void;
  onDelete: (index: number) => void;
  control: Control<UpfrontDecisionModel.FormLsar>;
  errors?: FieldErrors<UpfrontDecisionModel.FormLsar>;
};

const CustomerIncome: FC<Props> = ({ onPressAdd, fields, onDelete, control, errors }) => {
  const Currency = <Text>IDR</Text>;
  const renderItem: ListRenderItem<FieldArrayWithId<UpfrontDecisionModel.RealmLSAR, 'income', 'id'>> = useCallback(
    ({ item, index }) => {
      return (
        <View key={item.id}>
          <Controller
            name={`income.${index}.year`}
            control={control}
            rules={ValidationForm({ isRequired: true, maxLength: 4 })}
            render={({ field: { onChange, value } }) => (
              <WithSpacing>
                <InputField
                  label="Tahun"
                  setValue={onChange}
                  value={value}
                  containerStyle={[plaiStyles.mt0]}
                  error={errors?.income?.[index]?.year}
                  placeholder="Masukkan Tahun"
                  keyboardType="numeric"
                  maxLength={4}
                />
              </WithSpacing>
            )}
          />
          <Controller
            name={`income.${index}.salary`}
            control={control}
            rules={ValidationForm({ isRequired: true, maxLength: 15 })}
            render={({ field: { onChange, value } }) => (
              <WithSpacing>
                <InputField
                  label="Gaji"
                  setValue={(item: string) => {
                    onChangeNumber(item, onChange);
                  }}
                  keyboardType="numeric"
                  value={value}
                  containerStyle={[plaiStyles.mt0]}
                  error={errors?.income?.[index]?.salary}
                  placeholder="Masukkan jumlah"
                  leftItem={Currency}
                  maxLength={15}
                />
              </WithSpacing>
            )}
          />
          <Controller
            name={`income.${index}.private_business`}
            control={control}
            rules={ValidationForm({ isRequired: true, maxLength: 15 })}
            render={({ field: { onChange, value } }) => (
              <WithSpacing>
                <InputField
                  label="Bisnis Pribadi"
                  setValue={(item: string) => {
                    onChangeNumber(item, onChange);
                  }}
                  keyboardType="numeric"
                  value={value}
                  containerStyle={[plaiStyles.mt0]}
                  error={errors?.income?.[index]?.private_business}
                  placeholder="Masukkan jumlah"
                  leftItem={Currency}
                  maxLength={15}
                />
              </WithSpacing>
            )}
          />
          <Controller
            name={`income.${index}.others`}
            control={control}
            rules={ValidationForm({ isRequired: true, maxLength: 15 })}
            render={({ field: { onChange, value } }) => (
              <WithSpacing>
                <InputField
                  label="Lainnya (Sewa, Bunga, Investasi)"
                  setValue={(item: string) => {
                    onChangeNumber(item, onChange);
                  }}
                  keyboardType="numeric"
                  value={value}
                  containerStyle={[plaiStyles.mt0]}
                  error={errors?.income?.[index]?.others}
                  placeholder="Masukkan jumlah"
                  leftItem={Currency}
                  maxLength={15}
                />
              </WithSpacing>
            )}
          />
          <Controller
            name={`income.${index}.total_salary_per_year`}
            control={control}
            rules={ValidationForm({ isRequired: true, maxLength: 15 })}
            render={({ field: { onChange, value } }) => (
              <WithSpacing>
                <InputField
                  label="Total Penghasilan Tahunan"
                  setValue={(item: string) => {
                    onChangeNumber(item, onChange);
                  }}
                  keyboardType="numeric"
                  value={value}
                  containerStyle={plaiStyles.mt0}
                  error={errors?.income?.[index]?.total_salary_per_year}
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
        textStyle={isDisabled ? plaiStyles.fontWhite : plaiStyles.fontRed}
        style={[isDisabled ? plaiStyles.bgBtnDisabled : plaiStyles.bgBtnRedLight]}
      />
    );
  }, [fields, onPressAdd]);

  return (
    <View style={[plaiStyles.px16, plaiStyles.py16, plaiStyles.bgwhite, plaiStyles.my8]}>
      <SectionTitle text="Sumber Penghasilan nasabah" wrapperStyle={[plaiStyles.mt0, plaiStyles.mb16]} />
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

export default CustomerIncome;
