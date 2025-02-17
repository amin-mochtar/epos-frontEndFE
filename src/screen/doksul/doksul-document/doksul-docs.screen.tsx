import React, { forwardRef, useCallback, useEffect, useImperativeHandle, useMemo } from 'react';
import { Controller, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { useEposRealm, useObject } from '../../../database';
import { useSelector } from 'react-redux';
//@ts-ignore
import { RootState } from 'redux/reducer';
import { EposState } from '../../../redux';
import { EposDoksulRoutes, EposRoutes } from '../../../navigation';
import {
  DEFAULT_OPTIONAL_DATA,
  ISPAJData,
  ISQSDetail,
  ISummaryProposal,
  TPolicyType,
  typeDocsList,
} from '../../../utilities';
import { defaultFormDoc, TFormDoc, TFormVariant } from './doksul-docs.type';
import { Pressable, ScrollView, Text, View } from 'react-native';
import {
  DropdownField,
  GlobalPromptModal,
  InputImage,
  plaiStyles,
  ShapeItem,
  TCommonConstantData,
} from 'plai_common_frontend';
import { useTranslation } from 'react-i18next';
import { Button } from 'common_ui_components/app/components-ui';
import Icon from 'react-native-vector-icons/Feather';
import { Color } from 'common_ui_components';
import { InfoBar } from '../../../components';
import { getDefaultFormDoc, getIsCanContinue, getIsDocsComplete, getTitle, showModalCantContinue } from './doksul-docs.function';
import { useNavigation } from '@react-navigation/native';

type RouteProps = {
  onNext: (index: number) => void;
  isMultiCurrencyProduct: boolean
  variant: TFormVariant;
  isReset: boolean;
  route: {
    key: TFormVariant;
  };
  routeList: any;
};

const ENUM_KEY_REALM: Record<TFormVariant, keyof ISPAJData> = {
  policy_holder: 'policyHolderDocs',
  primary_insured: 'primaryInsuredDocs',
  additional_insured: 'additionalInsuredDocs',
  premium_payor: 'premiumPayorDoc',
  topup_payor: 'topupPayorDoc',
};

const DoksulDocsScreen = forwardRef(({ onNext, route, isReset, routeList, isMultiCurrencyProduct }: RouteProps, ref) => {
  const indexActive = routeList.findIndex((item: any) => item.key === route.key);
  const navigation = useNavigation();
  const { updateSPAJByKey, updateSummaryByKey, getSummaryProposalById } = useEposRealm();
  const { t } = useTranslation();
  const { spajId, proposalId, selectedSQSId } = useSelector<RootState, EposState>((state) => state.epos);
  const RSPAJData = useObject<ISPAJData>('SPAJData', spajId as never);
  const RSQSData = useObject<ISQSDetail>('SQSDetail', selectedSQSId as never);

  const summaryProposalById = getSummaryProposalById(proposalId) as ISummaryProposal;

  const policyType = summaryProposalById?.shariaFlag || 'conventional';
  const title = getTitle(route.key, RSQSData?.product?.key!, policyType as TPolicyType);
  const defaultValues = useMemo(() => {
    let result = defaultFormDoc;
    const defaultValue = getDefaultFormDoc(route.key, RSPAJData);
    if (defaultValue) {
      result = {
        docs: defaultValue.docs || defaultFormDoc.docs,
        statementMarketer: defaultValue.statementMarketer,
      };
    }
    return result as any;
  }, [route.key, RSPAJData]);

  const { control, handleSubmit, getValues, setValue, watch } = useForm<TFormDoc>({
    defaultValues,
  });

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

  const onAddItem = () => {
    if (fields?.length < 10) {
      append({
        typeDocument: DEFAULT_OPTIONAL_DATA,
        document: '',
      });
      return;
    }
    GlobalPromptModal.show({
      title: t('Epos:info'),
      subtitle: t('Epos:max_add_doc'),
      buttonPrimary: {
        text: 'Ok',
        onPress: () => {
          GlobalPromptModal.close();
        },
      },
    });
  };

  const onSave = useCallback(
    (data: TFormDoc) => {
      if (spajId && proposalId) {
        updateSPAJByKey(RSPAJData?.spajId!, {
          key: ENUM_KEY_REALM[route.key!],
          value: JSON.stringify(data),
        });
      }
      updateSummaryByKey(proposalId, {
        key: 'lastState',
        value: EposDoksulRoutes.DOKSUL_DOCUMENT,
      });
    },
    [spajId, proposalId, route.key],
  );

  const onSubmitParent = () => {
    const data = getValues();
    onSave(data);
  };

  const onSubmit: SubmitHandler<TFormDoc> = useCallback(
    async () => {
      if (indexActive < routeList.length - 1) {
        onNext(indexActive + 1);
        return;
      }
      onSave(getValues());
      const canContinue = getIsCanContinue(RSPAJData)
      if (canContinue) {
        //@ts-ignore
        navigation.navigate(EposRoutes.NEW_BUSINESS, { screen: EposRoutes.SPAJ_SIGNATURE });
        return
      }
      showModalCantContinue();
    },
    [indexActive, onNext, onSave, routeList, RSPAJData],
  );

  useImperativeHandle(
    ref,
    () => ({
      onSubmitParent,
    }),
    [],
  );

  return (
    <View style={[plaiStyles.flex]}>
      <ScrollView style={plaiStyles.bgwhite}>
        {fields.map((field: any, index: number) => {
          const typeDocument = watch(`docs.${index}.typeDocument`)?.key;
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
                      data={
                        isMultiCurrencyProduct ?
                          typeDocsList :
                          typeDocsList.filter((item) => item.key !== "Buku/Rekening Koran")}
                      selected={field.value}
                      onSelected={(value) => {
                        handleDocsTypeChange(index, value);
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
                          pickImageText="Unggah Foto"
                          hidden={{
                            pickCamera: false,
                            pickImage: typeDocument === 'MCU' ? false : true,
                            pickPdf: true,
                            isHiddenSubmitBtn: false,
                            isDirectLaunchCamera: false,
                          }}
                          value={value}
                          onChange={onChange}
                          buttonText={t('Epos:upload_image')}
                        />
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
          <InfoBar variant="info" withIcon content={`Silakan Lampirkan ID yang valid ${title}`} />
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
  );
});

export default DoksulDocsScreen;
