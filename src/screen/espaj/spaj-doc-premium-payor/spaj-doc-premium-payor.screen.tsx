import { View, Text, ScrollView, Pressable, BackHandler } from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { StackActions, useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Controller, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { EposRoutes } from '../../../navigation';
import { PruColor, PruScreen } from 'common_ui_components';
import { DropdownField, InputImage, ModalInformation, ShapeItem, plaiStyles } from 'plai_common_frontend';
import { EposFooter, EposHeader, InfoBar, NumberTitle } from '../../../components';
import { Button } from 'common_ui_components/app/components-ui';
import { WR_SHARIA_CONVENT, filterSPAJDataDoc, typeDocsList, ISPAJData, ISQSDetail } from '../../../utilities';
import { ValidationForm } from '../../../utilities/common-function';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/reducer';
import { EposState } from '../../../redux';
import { useEposRealm, useObject } from '../../../database';
import { TFormDocPremiumPayor, defaultFormDocPremiumPayor } from './spaj-doc-premium-payor.type';
import {
  BodyContentBottomSheetLiveness,
  FooterContentBottomSheetLiveness,
} from '../spaj-doc-prospective-policyholder/components/bottom-sheet-content-liveness';
import { BottomSheetOCR } from '../spaj-doc-prospective-policyholder-ocr/components/botom-sheet-ocr';
import {
  onPressCustom as OnPressCustom,
  labelControl as LabelControl,
  onRemoveFieldControl as OnRemoveFieldControl,
  valueControl as ValueControl,
  hiddenBtnControl as HiddenBtnControl,
  onChangeControllerDocument as OnChangeControllerDocument
} from '../spaj-doc-prospective-policyholder-ocr/ocr-service';
import { pruTestID } from 'common_services_frontend';

export const SPAJDocPremiumPayorScreen = () => {
  // Is Active config is Active or Not OCR and Liveness Privy #COMMENT: For next getting from realms config
  const isActive = true;
  const navigation = useNavigation();
  const routes: any = useRoute();
  const { t } = useTranslation();
  const { onUpdateSPAJ, updateSPAJByKey, updateSummaryByKey, updateSPAJStatusSubMenu } = useEposRealm();
  const { spajId, proposalId, selectedSQSId } = useSelector<RootState, EposState>((state) => state.epos);
  const RSPAJData = useObject<ISPAJData>('SPAJData', spajId as never);
  const RSQSData = useObject<ISQSDetail>('SQSDetail', selectedSQSId as never);
  const lifeAssuredSelf = RSQSData ? RSQSData.lifeAssuredSelf : '';
  const confirmationSQS = RSPAJData?.confirmationSQS ? JSON.parse(RSPAJData.confirmationSQS) : '';
  const topupPremiumPyor = RSPAJData?.topupPremiumPyor ? JSON.parse(RSPAJData.topupPremiumPyor!) : '';
  const isTopupPayor = topupPremiumPyor?.topupPremiPayer ? topupPremiumPyor?.topupPremiPayer?.key === 'O' : false;
  const defaultPremiumPayorDoc = RSPAJData?.premiumPayorDoc ? JSON.parse(RSPAJData.premiumPayorDoc!) : null;
  const [isMaxItemsModal, setisMaxItemsModal] = useState(false);
  const RSPAJLIveness = RSPAJData?.spajLiveness ? JSON.parse(RSPAJData?.spajLiveness) : '';
  const RSPAJOcr = RSPAJData?.spajOcr ? JSON.parse(RSPAJData.spajOcr!) : '';
  const livenessData = RSPAJLIveness?.payor ? RSPAJLIveness?.payor : { imgBase64: '' };
  const ocrData = RSPAJOcr?.payor ? RSPAJOcr?.payor : { imgBase64: '' };
  const [isLivenessVerifModal, setIsLivenessVerifModal] = useState<boolean>(false);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState<boolean>(false);
  const [livenessError, setLivenessError] = useState<string>('');
  const SPAJDataDoc = filterSPAJDataDoc(confirmationSQS?.premiumPaymentCandidate, RSPAJData?.DataCompleteness!, isTopupPayor)
  const additionalLifeAssuredSelf = RSQSData?.additionalLifeAssuredSelf;
  const prospectivePremiumPayor = RSQSData?.prospectivePremiumPayor;

  const {
    control,
    getValues,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<TFormDocPremiumPayor>({
    defaultValues: useMemo(() => {
      let result = defaultFormDocPremiumPayor;
      if (RSPAJData && RSPAJData?.premiumPayorDoc) {
        result = defaultPremiumPayorDoc;
      }

      if (isActive) {
        const initialValue: any = {
          KTP: ocrData?.imgBase64 && !ocrData?.isManualDocument ? ocrData.imgBase64 : '',
          'Foto Selfie': livenessData?.imgBase64 && !livenessData.isManualDocument ? livenessData.imgBase64 : '',
        };

        if (ocrData?.imgBase64 || livenessData?.imgBase64) {
          result.docPolicyholder.map((initVal) => {
            if (initialValue[initVal?.typeDocument?.key]) {
              initVal.document = initialValue[initVal?.typeDocument?.key];
            }
          });
        }
      }
      return result as TFormDocPremiumPayor;
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
    let typeDocument = {};
    const keysIncluded = ['KTP', 'Foto Selfie'];
    const includedKey = fields.filter((val) => keysIncluded.includes(val.typeDocument?.key));
    if (includedKey.length > 0) typeDocument = { ...typeDocument, key: 'Kartu Keluarga', label: 'Kartu Keluarga' };
    if (fields?.length < 10) {
      append({
        typeDocument: '',
        document: '',
      });
    } else {
      toggleMaxItemsModal();
    }
  };

  const wording = useMemo(() => WR_SHARIA_CONVENT[RSQSData?.policyType || 'conventional'], []);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', onBack);

    return () => backHandler.remove();
  }, [isValid]);

  useEffect(() => {
    if (routes && routes.params) {
      const { params }: any = routes;
      const livenessVerif = params?.livenessVerif;
      if (livenessVerif === false) {
        setTimeout(() => {
          setIsLivenessVerifModal(true);
        }, 350);
      }
    }
  }, [routes]);

  const onBack = () => {
    let _routeBack = EposRoutes.SPAJ_DOC_PRIMARY_PARTICIPANT_CANDIDATE;
    let params = undefined;
    if (confirmationSQS?.premiumPaymentCandidate === 'N' && lifeAssuredSelf === 'self') {
      _routeBack = EposRoutes.SPAJ_DOC_PROSPECTIVE_POLICYHOLDER
    } else if (additionalLifeAssuredSelf == 'other') {
      params = {
        isAdditionalInsurance: true,
      };
    }

    if (spajId) {
      onSave(getValues());
      updateSummaryByKey(proposalId, {
        key: 'lastState',
        value: _routeBack,
      });
    }

    if (RSPAJData?.premiumPayor) {
      if (isValid) {
        updateSPAJStatusSubMenu(spajId, EposRoutes.SPAJ_DOC_PREMIUM_PAYOR, {
          key: 'status',
          value: true,
        });
      } else {
        updateSPAJStatusSubMenu(spajId, EposRoutes.SPAJ_DOC_PREMIUM_PAYOR, {
          key: 'status',
          value: false,
        });
      }
    }
    navigation.dispatch(StackActions.replace(_routeBack, params));
    return true;
  };

  const onSave = (data: TFormDocPremiumPayor) => {
    updateSPAJByKey(RSPAJData.spajId, {
      key: 'premiumPayorDoc',
      value: JSON.stringify(data)
    });
  };

  const onContinue: SubmitHandler<TFormDocPremiumPayor> = async (data) => {
    const _routeNext = isTopupPayor ? EposRoutes.SPAJ_DOC_TOPUP_PAYOR : EposRoutes.SPAJ_AMANDEMENT;

    await onSave(data);
    await updateSummaryByKey(proposalId, {
      key: 'lastState',
      value: _routeNext,
    });
    await updateSPAJStatusSubMenu(spajId, EposRoutes.SPAJ_DOC_PREMIUM_PAYOR, {
      key: 'status',
      value: true,
    });
    navigation.dispatch(StackActions.replace(_routeNext));
  };

  const valueControl = (index: number, value: string) => {
    if (isActive) {
      const typeDocument = watch('docPolicyholder')[index]['typeDocument'];
      return ValueControl({
        documentType: typeDocument,
        ocrData,
        livenessData,
        value
      })
    }

    return value;
  };

  const labelControl = (index: number, value: string) => {
    if (isActive) {
      const typeDocument = watch('docPolicyholder')[index]['typeDocument'];
      return LabelControl({
        documentType: typeDocument,
        ocrData,
        livenessData
      });
    }

    return value;
  };

  const hiddenBtnControl = (index: number) => {
    if (isActive) {
      const typeDocument = watch('docPolicyholder')[index]['typeDocument'];
      return HiddenBtnControl(typeDocument, livenessData);
    }

    return false;
  };

  const onRemoveFieldControl = (index: number) => {
    if (isActive) {
      const typeDocument = watch('docPolicyholder')[index]['typeDocument'];
      return OnRemoveFieldControl(typeDocument);
    }

    return true;
  };

  const onPressCustom = useCallback(
    (index: number) => {
      if (isActive) {
        const typeDocument = watch('docPolicyholder')[index]['typeDocument'];
        return OnPressCustom({
          documentType: typeDocument,
          routeParams: routes?.params,
          ocrData,
          livenessData,
          navigation,
          insuranceType: 'isPayor',
          onSave: () => onSave(getValues())
        });
      }

      return {
        isCustom: false,
        onPress: null,
      };
    },
    [getValues(), routes],
  );

  const onChangeControllerDocument = async (formVal: string, formChange: any) => {
    if (isActive) {
      OnChangeControllerDocument({
        formVal,
        formChange,
        routes,
        onUpdateSPAJ,
        RSPAJData,
        spajLiveness: RSPAJLIveness,
        spajOcr: RSPAJOcr,
        insuranceType: 'payor'
      });
    }

    formChange(formVal);
  };

  const HeaderText = () => {
    let _page = 3;
    if (prospectivePremiumPayor === 'Other' && lifeAssuredSelf === 'self') {
      _page = 2;
    } else if (additionalLifeAssuredSelf == 'self') {
      _page = 3;
    } else if (additionalLifeAssuredSelf == 'other') {
      _page = 4;
    }

    return (
      <>
        <NumberTitle number="6" text={`${_page}/${SPAJDataDoc?.length} ${t('Epos:completeness_doc')}`} />
        <Text style={plaiStyles.fontHeaderTitle}>{wording.payor}</Text>
      </>
    );
  };

  return (
    <PruScreen backgroundColor={PruColor.white}>
      <>
        <View style={[plaiStyles.spacing, plaiStyles.flex]}>
          <EposHeader onPressSpajCompleteness={onBack} />
          <HeaderText />
          <Text style={[plaiStyles.mt8, plaiStyles.mb8, plaiStyles.fontGrey66Thin]}>
            {t('Epos:we_need_some_docs_to_apply')}
          </Text>

          <ScrollView>
            <View style={[plaiStyles.bgOrangeThin, plaiStyles.py8, plaiStyles.px12, plaiStyles.br8, plaiStyles.mt24]}>
              <Text style={[plaiStyles.fontYellow, plaiStyles.font12, plaiStyles.lineH18]}>
                {t('Epos:must_attach_idcard_and_selfie')}
              </Text>
            </View>

            {fields.map((field: any, index: number) => {
              const fieldValue = getValues().docPolicyholder[index]?.typeDocument?.key;
              const inputImageConfig = {
                isHiddenSubmitBtn: hiddenBtnControl(index),
                pickImage: fieldValue !== 'MCU',
                pickPdf: true,
                isDirectLaunchCamera: true,
              };
              return (
                <View key={field.id}>
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
                          data={typeDocsList.slice(2, 3)}
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
                            value={valueControl(index, value)}
                            onChange={(val) => onChangeControllerDocument(val, onChange)}
                            buttonText={labelControl(index, t('Epos:upload_image'))}
                            hidden={inputImageConfig}
                            onPressCustom={onPressCustom(index)}
                            uniqueTestId={`inputImage-${index}`}
                          />
                        </View>
                      </>
                    )}
                  />

                  {fields.length > 1 && onRemoveFieldControl(index) && (
                    <Button
                      style={[plaiStyles.py8, plaiStyles.borderGreycc]}
                      textStyle={plaiStyles.fontGrey33}
                      text={t('Calculator:remove')}
                      onPress={() => remove(index)}
                    />
                  )}
                </View>
              );
            })}

            <View style={[plaiStyles.mt16, plaiStyles.px4]}>
              <InfoBar
                variant="info"
                withIcon
                content={`Silakan Lampirkan ID yang valid Calon Pembayar ${wording.premiContribution}`}
                containerStyle={[plaiStyles.px12]}
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
            <BottomSheetOCR
              isVisible={isBottomSheetVisible}
              setIsVisible={(visible: boolean) => setIsBottomSheetVisible(visible)}
              titleHeader="Verifikasi Wajah"
              content={{
                bodyContent: BodyContentBottomSheetLiveness(),
                footerContent: FooterContentBottomSheetLiveness(() =>
                  navigation.dispatch(StackActions.replace(EposRoutes.SPAJ_DOC_PROSPECTIVE_POLICYHOLDER_LIVENESS)),
                ),
              }}
            />

            <ModalInformation
              visible={isLivenessVerifModal}
              title={routes.params?.serverError ? 'Server Bermasalah' : 'Waktu Verifikasi Telah Habis'}
              desc={
                routes.params?.serverError
                  ? 'Gagal melakukan foto selfie. Silakan lakukan foto selfie manual.'
                  : 'Waktu verifikasi wajah telah habis. Silakan lakukan foto selfie manual.'
              }
              buttonPrimary={{
                text: 'Tutup',
                onPress: () => {
                  routes.params?.serverError ? setLivenessError('serverError') : setLivenessError('timeout');
                  setIsLivenessVerifModal(false);
                },
              }}
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
