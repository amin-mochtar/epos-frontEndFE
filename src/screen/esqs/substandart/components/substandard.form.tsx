import React, { useEffect, useMemo, useState } from 'react';
import { View, ScrollView, Text } from 'react-native';
import {
  Control,
  Controller,
  FieldErrors,
  useFieldArray,
  UseFormGetValues,
  UseFormSetValue,
  UseFormWatch,
} from 'react-hook-form';
import { DropdownField, InputField, plaiStyles, sanitizedText } from 'plai_common_frontend';
import { Button } from 'common_ui_components/app/components-ui';
import { FormValues, TSubstandardData } from '../substandart.type';
import { TOptionalCardData } from '../../../../components';
import { useTranslation } from 'react-i18next';
import {
  sanitizeTextWithCustomSymbol,
  SUBSTANDART as SUBSTANDARD_DATA,
  WR_SHARIA_CONVENT,
} from '../../../../utilities';
import { pruTestID } from 'common_services_frontend';
import { PruIconFont } from 'common_ui_components';
import { color } from 'common_ui_components/app/theme';
import { ALLOWED_SYMBOL } from '../substandard.data';

interface SubstandardFormProps {
  control: Control<FormValues>;
  errors: FieldErrors<FormValues>;
  watch: UseFormWatch<FormValues>;
  setValue: UseFormSetValue<FormValues>;
  getValues: UseFormGetValues<FormValues>;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
  index: number;
  activeIndex: number
  policyType: 'conventional' | 'sharia';
}

export const SubstandardForm = ({
  control,
  errors,
  index,
  watch,
  setValue,
  getValues,
  policyType,
  activeIndex,
  setVisible
}: SubstandardFormProps) => {
  const { t } = useTranslation();
  const [substandardList, setSubstandardList] = useState<TOptionalCardData[]>([]);

  const SUBSTANDARD: TSubstandardData[] = [...SUBSTANDARD_DATA];

  const { fields, append, remove } = useFieldArray({ name: `substandards.${index}.substandard`, control });

  const WORDING = useMemo(() => WR_SHARIA_CONVENT[policyType], []);

  const activeFields = useMemo(() => fields.filter(i => i.code || i.code == ''), [fields]);

  const getListSubstandardCodes = useMemo(() => {
    return (codeIndex: number) => {
      const selectedType = watch(`substandards.${activeIndex}.substandard.${codeIndex}.type`) as TOptionalCardData

      const matchedSubstandard = SUBSTANDARD.find(({ code }) => code === selectedType?.key);

      return (
        matchedSubstandard?.value?.map((value) => ({
          key: value.code,
          label: value.code,
          selectedValue: value.value,
          divider: value.divider,
          code: value.code,
          selectedCode: value.code,
        })) || []
      );
    };
  }, [activeIndex]);

  useEffect(() => {
    if (!substandardList.length) {
      const tempSubstandard = SUBSTANDARD.filter((substandard: any) => {
        return substandard.level.split(',').includes(activeIndex === 0 ? '1' : '2')
      });

      const tempListSubstandard: TOptionalCardData[] = tempSubstandard
      .map((substandard: any) => ({
        key: substandard.code,
        label: substandard.code,
      }));

      setSubstandardList(tempListSubstandard);
    }
  }, [activeIndex]);

  const handleAddSubstandard = () => {
    const tempValue = getValues().substandards[activeIndex].substandard[activeFields.length - 1];
    console.log(JSON.stringify(tempValue, null, '	'));
    if (tempValue.code!) {
      append({ type: '', code: '' });
    } else {
      setVisible(true);
    }
  };

  return (
    <ScrollView style={plaiStyles.px16}>
      {activeFields.map((field, substandardIndex) => (
        <View key={field.id}>
          <Controller
            name={`substandards.${index}.substandard.${substandardIndex}.type`}
            control={control}
            rules={index === 0 ? { required: t('Calculator:substandart_type_required') } : {}}
            render={({ field: { onChange, value } }) => (
              <DropdownField
                labelMap={{
                  title: t('Epos:substandart_type'),
                  placeholder: t('Epos:substandart_type_placeholder'),
                }}
                data={substandardList}
                selected={value as TOptionalCardData}
                onSelected={(val) => {
                  setValue(`substandards.${index}.substandard.${substandardIndex}.type`, '');
                  onChange(val);
                }}
                error={
                  errors?.substandards?.length ? errors?.substandards[index]?.substandard?.[substandardIndex]?.type : ''
                }
                id={`dropdown-substandard-type-${index}`}
              />
            )}
          />

          <Controller
            name={`substandards.${index}.substandard.${substandardIndex}.code`}
            control={control}
            rules={index === 0 ? { required: t('Calculator:substandart_code_required') } : {}}
            render={({ field: { onChange, value } }) => (
              <DropdownField
                labelMap={{
                  title: t('Epos:substandart_code'),
                  placeholder: t('Epos:substandart_code_placeholder'),
                }}
                data={getListSubstandardCodes(substandardIndex)}
                selected={value as TOptionalCardData}
                onSelected={onChange}
                error={
                  errors?.substandards?.length ? errors?.substandards[index]?.substandard?.[substandardIndex]?.code : ''
                }
                id={`dropdown-substandard-code-${index}`}
              />
            )}
          />

          {activeFields.length > 1 && (
            <Button
              style={[plaiStyles.flex, plaiStyles.row, plaiStyles.py8, plaiStyles.borderGreycc, plaiStyles.mt24]}
              onPress={() => remove(substandardIndex)}
              {...pruTestID(`remove-substandard-button-${substandardIndex}`)}
            >
              <PruIconFont style={plaiStyles.pr10} name={'delete'} size={16} color={color.grey33} />
              <Text style={[plaiStyles.fontGrey33, plaiStyles.ml10]}>{t('Calculator:remove')}</Text>
            </Button>
          )}
        </View>
      ))}

      <Button
        style={[plaiStyles.flex, plaiStyles.row, plaiStyles.py8, plaiStyles.bgBtnRedLight, plaiStyles.mt24]}
        onPress={handleAddSubstandard}
        {...pruTestID(`add-substandard-button`)}
      >
        <PruIconFont style={plaiStyles.pr10} name={'instruction_add'} size={16} color={color.majorRed} />
        <Text style={[plaiStyles.fontRed, plaiStyles.ml10]}>{t('Calculator:add_substandart')}</Text>
      </Button>

      {index === 0 && (
        <>
          <Controller
            name={`substandards.${index}.information`}
            control={control}
            render={({ field: { onChange, value } }) => (
              <InputField
                required={false}
                label={t('Epos:information')}
                placeholder={t('Epos:information_placeholder')}
                value={value}
                setValue={(val) => onChange(sanitizeTextWithCustomSymbol(val, ALLOWED_SYMBOL))}
                rightItem="counter"
                maxLength={5000}
                id="input-additional-terms"
              />
            )}
          />

          <Controller
            name={`substandards.${index}.noSpaj`}
            control={control}
            render={({ field: { onChange, value } }) => (
              <InputField
                required={false}
                label={t('Calculator:number_spaj', { spaj: WORDING.spaj })}
                placeholder={t('Calculator:enter_number_spaj', { spaj: WORDING.spaj })}
                keyboardType="phone-pad"
                value={value}
                setValue={(val) => onChange(sanitizedText(val))}
                id="input-spaj-number"
              />
            )}
          />
        </>
      )}
    </ScrollView>
  );
};
