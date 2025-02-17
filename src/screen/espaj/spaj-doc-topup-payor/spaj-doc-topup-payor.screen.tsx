import { View, Text, ScrollView, Pressable, BackHandler } from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { StackActions, useNavigation } from '@react-navigation/native';
import { Trans, useTranslation } from 'react-i18next';
import { Controller, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { EposRoutes } from '../../../navigation';
import { PruColor, PruScreen } from 'common_ui_components';
import { DropdownField, InputImage, ModalInformation, ShapeItem, plaiStyles } from 'plai_common_frontend';
import { EposFooter, EposHeader, InfoBar, NumberTitle } from '../../../components';
import { Button } from 'common_ui_components/app/components-ui';
import { ISPAJData, ISQSDetail, typeDocsList } from '../../../utilities';
import { ValidationForm } from '../../../utilities/common-function';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/reducer';
import { EposState } from '../../../redux';
import { useEposRealm, useObject } from '../../../database';
import { TFormDocTopupPayor, defaultFormDocTopupPayor } from './spaj-doc-topup-payor';
import { pruTestID } from 'common_services_frontend';

export const SPAJDocTopupPayorScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { updateSPAJByKey, updateSummaryByKey, updateSPAJStatusSubMenu } = useEposRealm();
  const { spajId, proposalId, selectedSQSId } = useSelector<RootState, EposState>((state) => state.epos);
  const RSPAJData = useObject<ISPAJData>('SPAJData', spajId as never);
  const RSQSData = useObject<ISQSDetail>('SQSDetail', selectedSQSId as never);
  const confirmationSQS = RSPAJData?.confirmationSQS ? JSON.parse(RSPAJData.confirmationSQS) : '';
  const lifeAssuredSelf = RSQSData ? RSQSData.lifeAssuredSelf : '';
  const SPAJDataDoc = RSPAJData?.DataCompleteness?.filter((item) => item.categoryKey == 'Kelengkapan Dokumen');
  const defaultTopupPayorDoc = RSPAJData?.topupPayorDoc ? JSON.parse(RSPAJData.topupPayorDoc!) : null;
  const [isMaxItemsModal, setisMaxItemsModal] = useState(false);
  const {
    control,
    getValues,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TFormDocTopupPayor>({
    defaultValues: useMemo(() => {
      let result = defaultFormDocTopupPayor;
      if (RSPAJData && RSPAJData?.topupPayorDoc) {
        result = defaultTopupPayorDoc;
      }
      return result as TFormDocTopupPayor;
    }, []),
  });

  const { fields, append, remove } = useFieldArray({
    name: 'docPolicyholder',
    control,
  });

  const toggleMaxItemsModal = useCallback(() => {
    setisMaxItemsModal(!isMaxItemsModal);
  }, [isMaxItemsModal]);

  const onAddItem = () => {
    if (fields?.length < 10) {
      append({
        typeDocument: '',
        document: '',
      });
    } else {
      toggleMaxItemsModal();
    }
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', onBack);

    return () => backHandler.remove();
  }, [isValid]);

  const _routeBack = useMemo(() => {
    return confirmationSQS?.premiumPaymentCandidate === 'N' && lifeAssuredSelf === 'self'
      ? EposRoutes.SPAJ_DOC_PREMIUM_PAYOR
      : confirmationSQS?.premiumPaymentCandidate !== 'N' && lifeAssuredSelf === 'self'
        ? EposRoutes.SPAJ_DOC_PROSPECTIVE_POLICYHOLDER
        : confirmationSQS?.premiumPaymentCandidate === 'N' && lifeAssuredSelf !== 'self'
          ? EposRoutes.SPAJ_DOC_PREMIUM_PAYOR
          : EposRoutes.SPAJ_DOC_PROSPECTIVE_POLICYHOLDER;
  }, [confirmationSQS?.premiumPaymentCandidate, lifeAssuredSelf]);

  const filteredTypeDocsList = useMemo(() => {
    const selectedKeys = [t('Epos:idcard'), 'PP', 'KKK', 'KIA'];
    return typeDocsList.filter((doc) => selectedKeys.includes(doc.key));
  }, []);

  const onBack = () => {
    if (spajId) {
      onSave(getValues());
      updateSummaryByKey(proposalId, {
        key: 'lastState',
        value: _routeBack,
      });
    }

    if (RSPAJData?.topupPayorDoc) {
      if (isValid) {
        updateSPAJStatusSubMenu(spajId, EposRoutes.SPAJ_DOC_TOPUP_PAYOR, {
          key: 'status',
          value: true,
        });
      } else {
        updateSPAJStatusSubMenu(spajId, EposRoutes.SPAJ_DOC_TOPUP_PAYOR, {
          key: 'status',
          value: false,
        });
      }
    }
    navigation.dispatch(StackActions.replace(_routeBack));
    return true;
  };

  const onSave = (data: TFormDocTopupPayor) => {
    updateSPAJByKey(RSPAJData.spajId, {
      key: 'topupPayorDoc',
      value: JSON.stringify(data)
    });
  };

  const onContinue: SubmitHandler<TFormDocTopupPayor> = async (data) => {
    await onSave(data);
    await updateSummaryByKey(proposalId, {
      key: 'lastState',
      value: EposRoutes.SPAJ_AMANDEMENT,
    });
    await updateSPAJStatusSubMenu(spajId, EposRoutes.SPAJ_DOC_TOPUP_PAYOR, {
      key: 'status',
      value: true,
    });
    navigation.dispatch(StackActions.replace(EposRoutes.SPAJ_AMANDEMENT));
  };

  return (
    <PruScreen backgroundColor={PruColor.white}>
      <>
        <View style={[plaiStyles.spacing, plaiStyles.flex]}>
          <EposHeader onPressSpajCompleteness={onBack} />
          <NumberTitle
            number="6"
            text={`${SPAJDataDoc?.length}/${SPAJDataDoc?.length} ${t('Epos:completeness_doc')}`}
          />
          <Text style={plaiStyles.fontHeaderTitle}>
            <Trans
              i18nKey="Epos:candidate_topup_payers"
              components={{ i: <Text style={[plaiStyles.fontItalic, plaiStyles.fontHeaderTitle]} /> }}
            />
          </Text>
          <Text style={[plaiStyles.mt8, plaiStyles.mb8, plaiStyles.fontGrey66Thin]}>
            {t('Epos:we_need_some_docs_to_apply')}
          </Text>

          <ScrollView>
            {fields.map((fields: any, index: number) => {
              const fieldValue = getValues().docPolicyholder[index]?.typeDocument?.key;
              const inputImageConfig = {
                pickImage: fieldValue !== 'MCU',
                pickPdf: true,
                isDirecLaunchCamera: true,
              };
              return (
                <View key={fields.id}>
                  <View style={[plaiStyles.mt32, plaiStyles.row]}>
                    <Text style={[plaiStyles.fontRed]}>{`\u25CF`}</Text>
                    <Text style={[plaiStyles.ml8, plaiStyles.fontGrey33Bold]}>
                      {t('Epos:docs')} {index + 1}
                    </Text>
                  </View>
                  <Controller
                    name={`docPolicyholder.${index}.typeDocument`}
                    control={control}
                    defaultValue={t('Epos:idcard')}
                    rules={ValidationForm({ isRequired: true })}
                    render={({ field: { onChange, value } }) => (
                      <>
                        <DropdownField
                          labelMap={{
                            title: t('Epos:type_doc'),
                            placeholder: t('Epos:select_type_docs'),
                          }}
                          data={filteredTypeDocsList}
                          selected={value}
                          onSelected={onChange}
                          error={errors?.docPolicyholder?.[index]?.typeDocument}
                          id={`dropdown-type-doc-${index}`}
                        />
                      </>
                    )}
                  />

                  <Controller
                    name={`docPolicyholder.${index}.document`}
                    control={control}
                    rules={ValidationForm({ isRequired: true })}
                    render={({ field: { onChange, value } }) => (
                      <>
                        <View style={[plaiStyles.mt16]}>
                          <InputImage
                            value={value}
                            onChange={onChange}
                            buttonText={t('Epos:upload_image')}
                            hidden={inputImageConfig}
                            uniqueTestId={`inputImage-${index}`}
                          />
                        </View>
                      </>
                    )}
                  />

                  <Button
                    style={[plaiStyles.py8, plaiStyles.borderGreycc]}
                    textStyle={plaiStyles.fontGrey33}
                    text={t('Calculator:remove')}
                    onPress={() => remove(index)}
                  />
                </View>
              );
            })}

            <View style={[plaiStyles.mt16]}>
              <InfoBar
                variant="info"
                withIcon
                content={`Silakan Lampirkan ID yang valid Calon Pembayar Top-up`}
              />
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
              rules={ValidationForm({ isRequired: true })}
              render={({ field: { onChange, value } }) => (
                <>
                  <Pressable
                    style={[plaiStyles.flex, plaiStyles.row, plaiStyles.mt32]}
                    onPress={() => onChange(!value)}
                    {...pruTestID('checkbox-statement-marketer')}
                  >
                    <View style={[plaiStyles.justifyCenter]}>
                      <ShapeItem type="box" isSelected={value} />
                    </View>
                    <Text style={[plaiStyles.fontGrey33Thin, plaiStyles.lineH20, plaiStyles.flex, plaiStyles.ml16]}>
                      {t('Epos:statement_marketer')}
                    </Text>
                  </Pressable>
                  {errors?.statementMarketer && (
                    <Text style={[plaiStyles.mt4, plaiStyles.fontRed, plaiStyles.font12, plaiStyles.lineH16]}>
                      {errors?.statementMarketer.message}
                    </Text>
                  )}
                </>
              )}
            />
            <ModalInformation
              visible={isMaxItemsModal}
              title={t('Epos:info')}
              desc={t('Epos:max_add_doc')}
              buttonPrimary={{
                text: 'Ok',
                onPress: () => {
                  toggleMaxItemsModal();
                },
              }}
            />
          </ScrollView>
        </View>
        <EposFooter
          position={6}
          leftButton={{
            onPress: onBack,
          }}
          rightButton={{
            disabled: false,
            onPress: handleSubmit(onContinue),
          }}
        />
      </>
    </PruScreen>
  );
};
