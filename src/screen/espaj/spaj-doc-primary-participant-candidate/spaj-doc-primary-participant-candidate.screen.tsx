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
import { checkMainParticipant, filterSPAJDataDoc, typeDocsList, WR_SHARIA_CONVENT, ISPAJData, ISQSDetail } from '../../../utilities';
import {
  TFormDocPrimaryParticipant,
  defaultFormPrimaryParticipant,
} from './spaj-doc-primary-participant-candidate.type';
import { ValidationForm, calculateAge } from '../../../utilities/common-function';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/reducer';
import { EposState } from '../../../redux';
import { useEposRealm, useObject } from '../../../database';
import moment from 'moment';
import { BottomSheetOCR } from '../spaj-doc-prospective-policyholder-ocr/components/botom-sheet-ocr';
import {
  BodyContentBottomSheetLiveness,
  FooterContentBottomSheetLiveness,
} from '../spaj-doc-prospective-policyholder/components/bottom-sheet-content-liveness';
import {
  onPressCustom as OnPressCustom,
  labelControl as LabelControl,
  onRemoveFieldControl as OnRemoveFieldControl,
  valueControl as ValueControl,
  hiddenBtnControl as HiddenBtnControl,
  onChangeControllerDocument as OnChangeControllerDocument
} from '../spaj-doc-prospective-policyholder-ocr/ocr-service';
import { pruTestID } from 'common_services_frontend';

export const SPAJDocPrimaryParticipantCandidateScreen = () => {
  const isActive = true;
  const navigation = useNavigation();
  const routes: any = useRoute();
  const { t } = useTranslation();
  const { onUpdateSPAJ, updateSPAJByKey, updateSummaryByKey, updateSPAJStatusSubMenu, getCustomerStorageById } = useEposRealm();
  const { spajId, proposalId, selectedSQSId } = useSelector<RootState, EposState>((state) => state.epos);
  const isAdditionalInsurance = routes.params?.isAdditionalInsurance;
  const RSPAJData = useObject<ISPAJData>('SPAJData', spajId as never);
  const RSQSData = useObject<ISQSDetail>('SQSDetail', selectedSQSId as never);
  const RSPAJOcr = RSPAJData?.spajOcr ? JSON.parse(RSPAJData.spajOcr!) : '';
  const RSPAJLIveness = RSPAJData?.spajLiveness ? JSON.parse(RSPAJData?.spajLiveness) : '';

  const livenessData = useMemo(() => {
    if (isAdditionalInsurance) {
      return RSPAJLIveness?.additionalInsurance ? RSPAJLIveness?.additionalInsurance : { imgBase64: '' };
    }
    return RSPAJLIveness?.primaryInsurance ? RSPAJLIveness?.primaryInsurance : { imgBase64: '' };
  }, []);

  const ocrData = isAdditionalInsurance ? RSPAJOcr?.additionalInsurance : RSPAJOcr?.primaryInsurance ?? { imgBase64: '' };
  const confirmationSQS = RSPAJData?.confirmationSQS ? JSON.parse(RSPAJData.confirmationSQS) : '';
  const mainInsuredData = isAdditionalInsurance ? getCustomerStorageById(RSQSData?.clientIdSelected[2]!) : getCustomerStorageById(RSQSData?.clientIdSelected[1]!);

  const topupPremiumPyor = RSPAJData?.topupPremiumPyor ? JSON.parse(RSPAJData.topupPremiumPyor!) : '';
  const isTopupPayor = topupPremiumPyor?.topupPremiPayer ? topupPremiumPyor?.topupPremiPayer?.key === 'O' : false;
  const defaultPrimaryInsuredDocs = isAdditionalInsurance ? RSPAJData?.additionalInsuredDocs : RSPAJData?.primaryInsuredDocs ?? null;
  const agePlusOneYear = calculateAge(moment(mainInsuredData?.clientDateBirth).format('YYYY-MM-DD'), true);
  const [isMaxItemsModal, setisMaxItemsModal] = useState(false);
  const [isLivenessVerifModal, setIsLivenessVerifModal] = useState<boolean>(false);
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState<boolean>(false);
  const [livenessError, setLivenessError] = useState<string>('');
  const SPAJDataDoc = filterSPAJDataDoc(confirmationSQS?.premiumPaymentCandidate, RSPAJData?.DataCompleteness!, isTopupPayor)

  const {
    control,
    getValues,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<TFormDocPrimaryParticipant>({
    defaultValues: useMemo(() => {
      let result = defaultFormPrimaryParticipant(agePlusOneYear);

      if (RSPAJData && defaultPrimaryInsuredDocs) {
        result = JSON.parse(defaultPrimaryInsuredDocs!);
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
      return result as any;
    }, []),
  });

  const { fields, append, remove } = useFieldArray({
    name: 'docPolicyholder',
    control,
  });

  const mainParticipant = useMemo(() => checkMainParticipant(RSQSData?.product?.key, RSQSData?.policyType), [])

  const toggleMaxItemsModal = useCallback(() => {
    setisMaxItemsModal(!isMaxItemsModal);
  }, [isMaxItemsModal]);

  const onAddItem = () => {
    let typeDocument = {};
    const keysIncluded = ['KTP', 'Foto Selfie'];
    const includedKey = fields.filter((val) => keysIncluded.includes(val.typeDocument?.key));
    if (includedKey.length > 0) typeDocument = { ...typeDocument, key: 'Kartu Keluarga', label: 'Kartu Keluarga' };
    if (fields?.length < 10) {
      if (fields?.length < 10) {
        append({
          typeDocument: '',
          document: '',
        });
      } else {
        toggleMaxItemsModal();
      }
    }
  };

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

    let _backRoute = EposRoutes.SPAJ_DOC_PROSPECTIVE_POLICYHOLDER;
    let params = undefined;

    if (isAdditionalInsurance) {
      _backRoute = EposRoutes.SPAJ_DOC_PRIMARY_PARTICIPANT_CANDIDATE;
      params = {
        isAdditionalInsurance: false
      }
    }

    if (spajId) {
      onSave(getValues());
      updateSummaryByKey(proposalId, {
        key: 'lastState',
        value: _backRoute,
      });
    }

    if (isAdditionalInsurance ? RSPAJData?.additionalInsured : RSPAJData?.primaryInsured) {
      let _currentRoute: any = EposRoutes.SPAJ_DOC_PRIMARY_PARTICIPANT_CANDIDATE

      if (isAdditionalInsurance) _currentRoute = `${EposRoutes.SPAJ_DOC_PRIMARY_PARTICIPANT_CANDIDATE}_copy`;

      if (isValid) {
        updateSPAJStatusSubMenu(spajId, _currentRoute, {
          key: 'status',
          value: true,
        });
      } else {
        updateSPAJStatusSubMenu(spajId, _currentRoute, {
          key: 'status',
          value: false,
        });
      }
    }
    navigation.dispatch(StackActions.replace(_backRoute, params));
    return true;
  };

  const onSave = (data: TFormDocPrimaryParticipant) => {
    updateSPAJByKey(RSPAJData?.spajId!, {
      key: isAdditionalInsurance ? 'additionalInsuredDocs' : 'primaryInsuredDocs',
      value: JSON.stringify(data),
    });
  };

  const _routeNext = useMemo(() => {
    const isTopupPayor = topupPremiumPyor?.topupPremiPayer ? topupPremiumPyor?.topupPremiPayer?.key === 'O' : '';

    if (!isAdditionalInsurance && RSQSData?.additionalLifeAssuredSelf == 'other') {
      return EposRoutes.SPAJ_DOC_PRIMARY_PARTICIPANT_CANDIDATE;
    }

    return confirmationSQS?.premiumPaymentCandidate !== 'N' && !isTopupPayor
      ? EposRoutes.SPAJ_AMANDEMENT
      : confirmationSQS?.premiumPaymentCandidate !== 'N' && isTopupPayor
        ? EposRoutes.SPAJ_DOC_TOPUP_PAYOR
        : confirmationSQS?.premiumPaymentCandidate === 'N' && !isTopupPayor
          ? EposRoutes.SPAJ_DOC_PREMIUM_PAYOR
          : EposRoutes.SPAJ_DOC_PREMIUM_PAYOR;
  }, [confirmationSQS?.premiumPaymentCandidate]);

  const filteredTypeDocsList = useMemo(() => {

    const validateAge = agePlusOneYear >= 17 ? (isActive ? ['KK'] : ['KTP', 'KK', 'Foto Selfie']) : ['KIA', 'KK'];
    return typeDocsList.filter((doc) => validateAge.includes(doc.key));
  }, [agePlusOneYear]);

  const onContinue: SubmitHandler<TFormDocPrimaryParticipant> = async (data) => {

    let params = undefined
    if (_routeNext == EposRoutes.SPAJ_DOC_PRIMARY_PARTICIPANT_CANDIDATE) {
      params = {
        isAdditionalInsurance: true
      }
    }

    await onSave(data);
    await updateSummaryByKey(proposalId, {
      key: 'lastState',
      value: _routeNext,
    });

    let _updateKey: any = EposRoutes.SPAJ_DOC_PRIMARY_PARTICIPANT_CANDIDATE;
    if (isAdditionalInsurance) _updateKey = `${EposRoutes.SPAJ_DOC_PRIMARY_PARTICIPANT_CANDIDATE}_copy`;

    await updateSPAJStatusSubMenu(spajId, _updateKey, {
      key: 'status',
      value: true,
    });
    navigation.dispatch(StackActions.replace(_routeNext, params));
  };

  const valueControl = (index: number, value: string) => {
    if (isActive) {
      const typeDocument = watch('docPolicyholder')[index]['typeDocument'];
      return ValueControl({
        documentType: typeDocument,
        ocrData,
        livenessData,
        value,
        checkingAccountData: { imgBase64: '' }
      });
    }

    return value;
  };

  const labelControl = (index: number, value: string) => {
    if (isActive) {
      const typeDocument = watch('docPolicyholder')[index]['typeDocument'];
      if (!typeDocument) return value
      return LabelControl({
        documentType: typeDocument,
        ocrData,
        livenessData,
        checkingAccountData: { imgBase64: '' }
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
          insuranceType: isAdditionalInsurance ? 'isAdditionalInsurance' : 'isPrimaryInsurance',
          onSave: () => onSave(getValues()),
        });
      }

      return {
        isCustom: false,
        onPress: null,
      };
    },
    [getValues(), routes],
  );

  const onChangeControllerDocument = async (formVal: string, formChange: any, index: number) => {
    if (isActive) {
      OnChangeControllerDocument({
        formVal,
        formChange,
        routes,
        onUpdateSPAJ,
        RSPAJData,
        spajLiveness: RSPAJLIveness,
        spajOcr: RSPAJOcr,
        insuranceType: isAdditionalInsurance ? 'additionalInsurance' : 'primaryInsurance',
      });
    }

    formChange(formVal);
  };

  const HeaderText = () => {
    const page = isAdditionalInsurance ? 3 : 2;
    const headerText = isAdditionalInsurance ? t('Epos:additional_insured') : mainParticipant;
    return (
      <>
        <NumberTitle number="6" text={`${page}/${SPAJDataDoc?.length} ${t('Epos:completeness_doc')}`} />
        <Text style={plaiStyles.fontHeaderTitle}>{headerText}</Text>
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
            {agePlusOneYear >= 18 && (
              <View style={[plaiStyles.bgOrangeThin, plaiStyles.py8, plaiStyles.px12, plaiStyles.br8, plaiStyles.mt24]}>
                <Text style={[plaiStyles.fontYellow, plaiStyles.font12, plaiStyles.lineH18]}>
                  {t('Epos:must_attach_idcard_and_selfie')}
                </Text>
              </View>
            )}

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
                          data={filteredTypeDocsList}
                          selected={value}
                          onSelected={onChange}
                          error={errors?.docPolicyholder?.[index]?.typeDocument}
                          id={`dropdown-type-doc-${index}`}
                          onDisabled={isAdditionalInsurance}
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
                            onChange={(val) => onChangeControllerDocument(val, onChange, index)}
                            buttonText={labelControl(index, t('Epos:upload_image'))}
                            hidden={inputImageConfig}
                            onPressCustom={onPressCustom(index)}
                            uniqueTestId={`inputImage-${index}`}
                            titleHeaderModal='Pilih Metode'
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

            <View style={[plaiStyles.mt16]}>
              <InfoBar
                variant="info"
                withIcon
                content={`Silakan Lampirkan ID yang valid ${mainParticipant}`}
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
