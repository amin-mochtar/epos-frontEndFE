import { DropdownField, InputImage, ModalInformation, plaiStyles, ShapeItem, TCommonConstantData } from "plai_common_frontend";
import { Controller, useFieldArray, useFormContext } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { ScrollView, Text, View, Pressable } from "react-native";
import { DEFAULT_OPTIONAL_DATA, typeDocsList } from "../../../utilities";
import { Button } from 'common_ui_components/app/components-ui';
import { InfoBar } from "../../../components";
import { useEffect, useMemo, useState } from "react";
import { TFormDoc } from "./doksul-docs.type";
import Icon from 'react-native-vector-icons/Feather';
import { Color } from "common_ui_components";


type TDocDoksulForm = {
  defaultData: TFormDoc,
  variant: string,
  onSubmit: (value: any) => void
}

export const DocDoksulForm = ({ variant, onSubmit }: TDocDoksulForm) => {
  const { t } = useTranslation();
  const [modalAlert, setModalAlert] = useState(false);

  const {
    control,
    setValue,
    getValues,
    handleSubmit,
  } = useFormContext<TFormDoc>();

  const { fields, append, remove } = useFieldArray({
    name: 'docs',
    control,
  });

  const handleDocsTypeChange = (index: number, value: TCommonConstantData) => {
    setValue(`docs.${index}.typeDocument`, value);
    if (value?.key === '') {
      setValue(`docs.${index}.document`, '');
    }
  };


  useEffect(() => {
    if (fields?.length === 0) {
      setValue('docs', [
        {
          typeDocument: DEFAULT_OPTIONAL_DATA,
          document: '',
        },
      ]);
    }
  }, []);


  const onAddItem = () => {
    if (fields?.length < 10) {
      append({
        typeDocument: DEFAULT_OPTIONAL_DATA,
        document: '',
      });
    } else {
      setModalAlert(true)
    }
  };

  return (
    <View style={[plaiStyles.flex]}>
      <ScrollView style={plaiStyles.bgwhite}>
        {fields.map((field: any, index: number) => {
          const typeDocument = getValues(`docs.${index}.typeDocument`)?.key;
          return (
            <View key={field.id} style={[plaiStyles.mb8, plaiStyles.mt10]}>
              <View style={[plaiStyles.row, plaiStyles.mt16]}>
                <Text style={[plaiStyles.fontRed]}>{`\u25CF`}</Text>
                <Text style={[plaiStyles.ml8, plaiStyles.fontGrey33Bold, plaiStyles.font16]}>
                  {t('Epos:docs')} {index + 1}
                </Text>
              </View>
              <Controller
                name={`docs.${index}.typeDocument`}
                control={control}
                defaultValue={t('Epos:idcard')}
                render={({ field }) => (
                  <>
                    <DropdownField
                      labelMap={{
                        title: t('Epos:type_doc'),
                        placeholder: t('Epos:select_type_docs'),
                      }}
                      data={typeDocsList}
                      selected={field.value}
                      onSelected={(value) => {
                        handleDocsTypeChange(index, value)
                      }}
                    />
                  </>
                )}
              />

              {typeDocument != '' && (
                <Controller
                  name={`docs.${index}.document`}
                  control={control}
                  render={({ field: { onChange, value } }) => (
                    <>
                      <View style={[plaiStyles.mt16]}>
                        <InputImage
                          pickImageText='Unggah Foto'
                          hidden={{
                            pickCamera: false,
                            pickImage: typeDocument === 'MCU' ? false : true,
                            pickPdf: true,
                            isHiddenSubmitBtn: false,
                            isDirectLaunchCamera: false,
                          }}
                          value={value}
                          onChange={onChange}
                          buttonText={t('Epos:upload_image')} />
                      </View>
                    </>
                  )}
                />
              )}

              {fields.length > 1 && index > 0 && (
                <Button
                  style={[plaiStyles.py8, plaiStyles.borderGreycc, plaiStyles.mt16]}
                  onPress={() => remove(index)}
                >
                  <View style={[plaiStyles.flex, plaiStyles.alignCenter, plaiStyles.justifyCenter, plaiStyles.row]}>
                    <Icon name="trash-2" color={Color.black} size={16} />
                    <Text style={[plaiStyles.fontGrey33, plaiStyles.ml4]}>{t('Calculator:remove')}</Text>
                  </View>
                </Button>
              )}
            </View>
          );
        })}

        <View style={[plaiStyles.mt16]}>
          <InfoBar variant="info" withIcon content={`Silakan Lampirkan ID yang valid ${variant}`} />
        </View>

        <Button
          style={[plaiStyles.bgBtnSecondary, plaiStyles.mt32]}
          textStyle={plaiStyles.fontRed}
          text={t('Epos:add_docs')}
          onPress={onAddItem}
        />

        <Controller
          name={`statementMarketer`}
          control={control}
          render={({ field: { onChange, value } }) => {
            return (
              <>
                <Pressable style={[plaiStyles.flex, plaiStyles.row, plaiStyles.mt32]} onPress={() => onChange(!value)}>
                  <View style={[plaiStyles.justifyCenter]}>
                    <ShapeItem type="box" isSelected={value} />
                  </View>
                  <Text style={[plaiStyles.fontGrey33Thin, plaiStyles.lineH20, plaiStyles.flex, plaiStyles.ml16]}>
                    {t('Epos:statement_marketer')}
                  </Text>
                </Pressable>
              </>
            );
          }}
        />
        <ModalInformation
          visible={modalAlert}
          title={t('Epos:info')}
          desc={t('Epos:max_add_doc')}
          buttonPrimary={{
            text: 'Ok',
            onPress: () => setModalAlert(!modalAlert),
          }}
        />
      </ScrollView>
      <View style={[plaiStyles.bgwhite, plaiStyles.boxShadowProp]}>
        <Button
          style={[plaiStyles.bgBtnRed, plaiStyles.mt24, plaiStyles.mb16]}
          textStyle={[plaiStyles.fontWhite, plaiStyles.fontBold]}
          text={'Selanjutnya'}
          onPress={handleSubmit(onSubmit)}
        />
      </View>
    </View>
  )
}