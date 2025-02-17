import { View, Text, ScrollView, Pressable, BackHandler, Image, Dimensions } from 'react-native';
import {
  onPressCustom as OnPressCustom,
  labelControl as LabelControl,
  onRemoveFieldControl as OnRemoveFieldControl,
  valueControl as ValueControl,
  hiddenBtnControl as HiddenBtnControl,
  onChangeControllerDocument as OnChangeControllerDocument
} from '../spaj-doc-prospective-policyholder-ocr/ocr-service';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { StackActions, useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { Controller, SubmitHandler, useFieldArray, useForm } from 'react-hook-form';
import { EposDoksulRoutes, EposRoutes } from '../../../navigation';
import { PruColor, PruScreen } from 'common_ui_components';
import {
  DropdownField,
  InputImage,
  ModalInformation,
  ProductConfig,
  ShapeItem,
  plaiStyles,
} from 'plai_common_frontend';
import { EposFooter, EposHeader, InfoBar, NumberTitle } from '../../../components';
import { checkMainParticipant, filterSPAJDataDoc, typeDocsList, ISPAJData, ISQSDetail, showModalDialogSubmitDoksul, ICustomerStorage, ISummaryProposal } from '../../../utilities';
import { TFormDocPolicyholder, defaultFormChangePolicyholder, defaultFormDocPolicyholder } from './spaj-doc-prospective-policyholder.type';
import { productType, showModalMaintenance, ValidationForm } from '../../../utilities/common-function';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/reducer';
import { EposState, responseData, updateEposState } from '../../../redux';
import { useEposRealm, useObject } from '../../../database';
import { Button } from 'common_ui_components/app/components-ui';
import { BottomSheetOCR } from '../spaj-doc-prospective-policyholder-ocr/components/botom-sheet-ocr';
import {
  BodyContentBottomSheetLiveness,
  FooterContentBottomSheetLiveness,
} from './components/bottom-sheet-content-liveness';
import i18n from 'i18next';
import { pruTestID } from 'common_services_frontend';
import moment from 'moment';
import RNFS from 'react-native-fs';
import { useAfterInteraction, useDoksulSubmission } from '../../../hooks';
import { sendPaydiSMS } from '../../../network';

export const SPAJDocProspectivePolicyholderScreen = () => {
  // IsActive will get from realms it is only dummy mode
  const [isActive, setIsActive] = useState(true)
  // const isActive = false;
  const navigation = useNavigation();
  const routes: any = useRoute();
  const { t } = useTranslation();
  const { onUpdateSPAJ, updateSummaryByKey, updateSPAJStatusSubMenu, getSQSById, getCustomerStorageById, getSummaryProposalById, getMultipleCustomer } = useEposRealm();
  const { generateDoksulSubmission } = useDoksulSubmission();
  const { selectedSQSId, spajId, proposalId, isDoksul, spajNumber } = useSelector<RootState, EposState>((state) => state.epos);
  const RSQSData = getSQSById(selectedSQSId) as ISQSDetail;
  const RSPAJData = useObject<ISPAJData>('SPAJData', spajId as never);
  const lifeAssuredSelf = RSQSData ? RSQSData.lifeAssuredSelf : '';
  const waitingPeriod = RSQSData ? RSQSData.waitingPeriod : '';
  const confirmationSQS = RSPAJData?.confirmationSQS ? JSON.parse(RSPAJData.confirmationSQS) : '';
  const defaultPolicyHolderDocs = RSPAJData?.policyHolderDocs ? JSON.parse(RSPAJData.policyHolderDocs!) : null;
  const topupPremiumPyor = RSPAJData?.topupPremiumPyor ? JSON.parse(RSPAJData.topupPremiumPyor!) : '';
  const RSPAJOCR = RSPAJData?.spajOcr ? JSON.parse(RSPAJData.spajOcr!) : '';
  const RSPAJLIveness = RSPAJData?.spajLiveness ? JSON.parse(RSPAJData?.spajLiveness) : '';
  const RSPAJCheckingAccount = RSPAJData?.spajCheckingAccount ? JSON.parse(RSPAJData.spajCheckingAccount) : '';
  const ocrData = RSPAJOCR?.polis ? RSPAJOCR?.polis : { imgBase64: '' };
  const livenessData = RSPAJLIveness?.polis ? RSPAJLIveness?.polis : { imgBase64: '' };
  const checkingAccountData = RSPAJCheckingAccount?.polis ? RSPAJLIveness?.polis : { imgBase64: '' };
  const [isMaxItemsModal, setisMaxItemsModal] = useState(false);
  const [isMCUModal, setisMCUModal] = useState(false);
  const isTopupPayor = topupPremiumPyor?.topupPremiPayer ? topupPremiumPyor?.topupPremiPayer?.key === 'O' : false;
  const waitingPeriodIsA = waitingPeriod === 'A' ? 'MCU' : '';
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState<boolean>(false);
  const [isLivenessVerifModal, setIsLivenessVerifModal] = useState<boolean>(false);
  const [livenessError, setLivenessError] = useState<string>('');
  const SPAJDataDoc = filterSPAJDataDoc(confirmationSQS?.premiumPaymentCandidate, RSPAJData?.DataCompleteness!, isTopupPayor)
  const mainParticipant = useMemo(() => checkMainParticipant(RSQSData?.product?.key, RSQSData?.policyType), []);
  const isUnitLink = productType(RSQSData?.product?.key!) == 'UL';
  const allCustomerData = getMultipleCustomer(RSQSData?.clientIdSelected!);
  const lifeAssuredCurrencyData = allCustomerData[0].clientCurrency.key;

  // DOKSUL
  const isChangePH = RSQSData?.isChangePH;

  const {
    control,
    handleSubmit,
    getValues,
    watch,
    setValue,
    formState: { errors, isValid },
  } = useForm<TFormDocPolicyholder>({
    defaultValues: useMemo(() => {
      let result =
        lifeAssuredCurrencyData === 'USD'
          ? {
            docPolicyholder: [
              ...defaultFormDocPolicyholder.docPolicyholder,
              {
                typeDocument: { label: 'Buku/Rekening Koran', key: 'Buku/Rekening Koran' },
                document: '',
              },
            ],
            attachForeignCurrencyAccount: false,
            statementMarketer: false,
          }
          : defaultFormDocPolicyholder;

      // DOKSUL DEFAULT & empty data
      if (isChangePH && !RSPAJData?.policyHolderDocs) {
        result = defaultFormChangePolicyholder

      } else {
        if (RSPAJData && RSPAJData?.policyHolderDocs) {
          result = defaultPolicyHolderDocs;
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

      }

      return result as TFormDocPolicyholder;
    }, []),
  });

  const { fields, append, remove } = useFieldArray({
    name: 'docPolicyholder',
    control,
  });

  const toggleMaxItemsModal = useCallback(() => {
    setisMaxItemsModal(!isMaxItemsModal);
  }, [isMaxItemsModal]);

  const toggleMCUModal = useCallback(() => {
    setisMCUModal(!isMCUModal);
  }, [isMCUModal]);

  const onAddItem = () => {
    let typeDocument = {};
    const keysIncluded = ['KTP', 'Foto Selfie'];
    const includedKey = fields.filter((val) => keysIncluded.includes(val.typeDocument?.key));
    if (includedKey.length > 0) typeDocument = { ...typeDocument, key: 'Kartu Keluarga', label: 'Kartu Keluarga' };
    if (fields?.length < 10) {
      append({
        typeDocument: isActive ? typeDocument : '',
        document: '',
      });
    } else {
      toggleMaxItemsModal();
    }
  };

  useAfterInteraction({
    onCompleted: () => {
      // if field waiting period is A & not doksul CTA (change PH) then popup info mcu will be apeared
      if (!isDoksul && !isChangePH) {
        if (waitingPeriodIsA) {
          setisMCUModal(true);
        }
      } else {
        setIsActive(false)
      }
    }
  })

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', onBack);

    return () => backHandler.remove();
  }, [isValid])

  const backRoutes = isDoksul && isChangePH
    ? isUnitLink
      ? EposDoksulRoutes.ADDITIONAL_INSURANCE_STATEMENT
      : EposDoksulRoutes.CONFIRM_PRODUCT_DOKSUL
    : EposRoutes.SPAJ_DATA_COMPLETENESS

  const onBack = () => {
    if (spajId) {
      onSave(getValues());
      updateSummaryByKey(proposalId, {
        key: 'lastState',
        value: backRoutes,
      });
    }

    if (RSPAJData?.policyHolderData) {
      if (isValid) {
        updateSPAJStatusSubMenu(spajId, EposRoutes.SPAJ_DOC_PROSPECTIVE_POLICYHOLDER, {
          key: 'status',
          value: true,
        });
      } else {
        updateSPAJStatusSubMenu(spajId, EposRoutes.SPAJ_DOC_PROSPECTIVE_POLICYHOLDER, {
          key: 'status',
          value: false,
        });
      }
    }

    if (isDoksul) {
      navigation.navigate(EposDoksulRoutes.EPOSDOKSUL, { screen: backRoutes });

    } else {
      navigation.dispatch(StackActions.replace(EposRoutes.SPAJ_DATA_COMPLETENESS));
    }
    return true;
  };

  const onSave = (data: TFormDocPolicyholder) => {
    const _spajData = {
      ...JSON.parse(JSON.stringify(RSPAJData?.toJSON())),
      policyHolderDocs: JSON.stringify(data),
    } as ISPAJData;
    onUpdateSPAJ(_spajData);
  };


  const onContinue = async (data: TFormDocPolicyholder) => {
    const _routeNext =
      lifeAssuredSelf === 'self' && confirmationSQS?.premiumPaymentCandidate !== 'N' && !isTopupPayor
        ? EposRoutes.SPAJ_AMANDEMENT
        : lifeAssuredSelf !== 'self'
          ? EposRoutes.SPAJ_DOC_PRIMARY_PARTICIPANT_CANDIDATE
          : lifeAssuredSelf === 'self' && confirmationSQS?.premiumPaymentCandidate === 'N'
            ? EposRoutes.SPAJ_DOC_PREMIUM_PAYOR
            : lifeAssuredSelf === 'self' && confirmationSQS?.premiumPaymentCandidate !== 'N' && isTopupPayor
              ? EposRoutes.SPAJ_DOC_TOPUP_PAYOR
              : '';

    await onSave(data);
    await updateSummaryByKey(proposalId, {
      key: 'lastState',
      value: _routeNext,
    });
    await updateSPAJStatusSubMenu(spajId, EposRoutes.SPAJ_DOC_PROSPECTIVE_POLICYHOLDER, {
      key: 'status',
      value: true,
    });

    navigation.dispatch(StackActions.replace(_routeNext));
  };

  //start config doksul CTA (change PH)
  const dispatch = useDispatch();
  const summaryProposalById = getSummaryProposalById(proposalId) as ISummaryProposal;
  const policyHolderData = RSPAJData?.policyHolderData ? JSON.parse(RSPAJData.policyHolderData) : ''
  const lifeAssuredData = getCustomerStorageById(RSQSData?.clientIdSelected[0]!) as ICustomerStorage

  const jsonSubmit = {
    spajNumber,
    menuName: 'ChangePHPFP',
    clientName: lifeAssuredData?.clientName,
    emailClient: policyHolderData?.clientEmail,
    rider: RSQSData?.additionalBenefits?.length
      ? [{
        riderCode: RSQSData.additionalBenefits[0]?.key,
        riderName: RSQSData.additionalBenefits[0]?.label,
        desc: null
      }]
      : [],
    productCode: RSQSData?.product?.key,
    productName: RSQSData?.product?.label,
    currency: summaryProposalById?.currency,
  };

  const sendSMS = async (data: any) => {
    try {
      const responseSMS = await sendPaydiSMS(data) as responseData

      if (responseSMS?.problem === '' && responseSMS?.status === 201) {
        dispatch(updateEposState({ RMessaging: responseSMS }));
        navigation.navigate(EposRoutes.NEW_BUSINESS, { screen: EposRoutes.LINK_SUBMITTED });

      } else {
        showModalMaintenance();
      }

    } catch (error) {
      showModalMaintenance();
    }
  }

  const doksulSubmisson = async () => {
    const doksulData = await generateDoksulSubmission(summaryProposalById?.doksulType);
    const dataSubmission = {
      dob: moment(lifeAssuredData?.clientDateBirth).format('YYYYMMDD'),
      isCorporate: false,
      isDoksul: true,
      jsonSubmit: JSON.stringify(jsonSubmit),
      phoneNo: lifeAssuredData?.clientPhone,
      proposalId: proposalId,
      doksulJson: JSON.stringify(doksulData)
    }
    sendSMS(dataSubmission)
  }

  const onSubmit: SubmitHandler<TFormDocPolicyholder> = (data) => {
    if (isDoksul) {
      showModalDialogSubmitDoksul(doksulSubmisson)
    } else {
      onContinue(data)
    }
  }

  //end config doksul CTA (change PH)

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

  const valueControl = (index: number, value: string) => {
    if (isActive) {
      const typeDocument = watch('docPolicyholder')[index]['typeDocument'];
      return ValueControl({
        documentType: typeDocument,
        ocrData,
        livenessData,
        value,
        checkingAccountData,
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
        livenessData,
        checkingAccountData,
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
          insuranceType: 'isPolis',
          onSave: () => onSave(getValues())
        }
        );
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
        spajOcr: RSPAJOCR,
        insuranceType: 'polis'
      });
    }

    setValue(`docPolicyholder.${index}.document`, formVal);
  };

  const headerTitle = useMemo(() => {
    return lifeAssuredSelf == 'self' && !isChangePH
      ? `${i18n.t('Epos:prospective_policyholder')} (${mainParticipant})`
      : i18n.t('Epos:prospective_policyholder') // if change PH only wording pemengang polis
  }, [])

  return (
    <PruScreen backgroundColor={PruColor.white}>
      <>
        <View style={[plaiStyles.spacing, plaiStyles.flex]}>
          <EposHeader onPressSpajCompleteness={onBack} />
          {!isChangePH && (<NumberTitle number="6" text={`1/${SPAJDataDoc?.length} ${t('Epos:completeness_doc')}`} />)}
          <Text style={plaiStyles.fontHeaderTitle}>{headerTitle}</Text>
          <Text style={[plaiStyles.mt8, plaiStyles.mb8, plaiStyles.fontGrey66Thin]}>
            {t('Epos:we_need_some_docs_to_apply')}
          </Text>

          <ScrollView>
            <View style={[plaiStyles.bgOrangeThin, plaiStyles.py8, plaiStyles.px12, plaiStyles.br8, plaiStyles.mt24]}>
              <Text style={[plaiStyles.fontYellow, plaiStyles.font12, plaiStyles.lineH18]}>
                {t('Epos:must_attach_idcard_and_selfie')}
              </Text>
            </View>
            {lifeAssuredCurrencyData === 'USD' && (
              <View style={[plaiStyles.bgOrangeThin, plaiStyles.py8, plaiStyles.px12, plaiStyles.br8, plaiStyles.mt16]}>
                <Text style={[plaiStyles.fontYellow, plaiStyles.font12, plaiStyles.lineH18]}>
                  Anda wajib melampirkan Buku/Rekening Koran Mata Uang Asing
                </Text>
              </View>
            )}
            {fields.map((field: any, index: number) => {
              const fieldValue = getValues().docPolicyholder[index]?.typeDocument?.key;
              const listDocsAvailable = waitingPeriodIsA ? typeDocsList.slice(2, 4) : typeDocsList.slice(2, 3);
              const inputImageConfig = {
                isHiddenSubmitBtn: hiddenBtnControl(index),
                pickImage: !['MCU', 'Buku/Rekening Koran'].includes(fieldValue),
                pickPdf: true,
                isDirectLaunchCamera: true,
              };

              const pickImageConfig =
                fieldValue === 'Buku/Rekening Koran' ? 'Unggah Foto' : 'Upload Gambar (.JPG/.JPEG)';
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
                          data={listDocsAvailable}
                          selected={value}
                          onSelected={onChange}
                          error={errors?.docPolicyholder?.[index]?.typeDocument}
                          onDisabled={
                            isActive &&
                            ['KTP', 'Foto Selfie', 'Buku/Rekening Koran'].includes(
                              getValues().docPolicyholder[index]?.typeDocument?.key,
                            )
                          }
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
                      <InputImage
                        value={valueControl(index, value)}
                        onChange={(val) => onChangeControllerDocument(val, onChange, index)}
                        buttonText={labelControl(index, t('Epos:upload_image'))}
                        hidden={inputImageConfig}
                        onPressCustom={onPressCustom(index)}
                        uniqueTestId={`inputImage-${index}`}
                        pickImageText={pickImageConfig}
                        titleHeaderModal='Pilih Metode'
                      />
                    )}
                  />

                  {fields.length > (lifeAssuredCurrencyData === 'USD' ? 3 : 1) && onRemoveFieldControl(index) && (
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

            {!isChangePH && (<View style={[plaiStyles.mt16]}>
              <InfoBar variant="info" withIcon content="Silakan Lampirkan ID yang valid Calon Pemegang Polis" />
            </View>)}

            <Button
              style={[plaiStyles.bgBtnSecondary, plaiStyles.mt32]}
              textStyle={plaiStyles.fontRed}
              text={t('Epos:add_docs')}
              onPress={onAddItem}
            />
            {lifeAssuredCurrencyData === 'USD' && (
              <Controller
                name={`attachForeignCurrencyAccount`}
                control={control}
                rules={ValidationForm({ isRequired: true })}
                render={({ field: { onChange, value } }) => {
                  return (
                    <>
                      <Pressable
                        style={[plaiStyles.flex, plaiStyles.row, plaiStyles.mt32]}
                        onPress={() => onChange(!value)}
                      >
                        <View style={[plaiStyles.justifyCenter]}>
                          <ShapeItem type="box" isSelected={value} />
                        </View>
                        <Text style={[plaiStyles.fontGrey33Thin, plaiStyles.lineH20, plaiStyles.flex, plaiStyles.ml16]}>
                          Silahkan lampirkan “Bukti kepemilikan rekening Mata Uang Asing”
                        </Text>
                      </Pressable>
                      {errors?.attachForeignCurrencyAccount && (
                        <Text style={[plaiStyles.mt4, plaiStyles.fontRed, plaiStyles.font12, plaiStyles.lineH16]}>
                          {errors?.attachForeignCurrencyAccount.message}
                        </Text>
                      )}
                    </>
                  );
                }}
              />
            )}
            <Controller
              name={`statementMarketer`}
              control={control}
              rules={ValidationForm({ isRequired: true })}
              render={({ field: { onChange, value } }) => {
                return (
                  <>
                    <Pressable
                      style={[
                        plaiStyles.flex,
                        plaiStyles.row,
                        plaiStyles.mt32,
                        lifeAssuredCurrencyData === 'USD' ? plaiStyles.mt16 : plaiStyles.mt32,
                      ]}
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
                );
              }}
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
              visible={isMCUModal ? isMCUModal : isMaxItemsModal}
              title={t('Epos:info')}
              desc={isMCUModal ? t('Epos:upload_mcu') : t('Epos:max_add_doc')}
              buttonPrimary={{
                text: 'Ok',
                onPress: () => {
                  if (isMCUModal) {
                    toggleMCUModal();
                  } else {
                    toggleMaxItemsModal();
                  }
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
            onPress: handleSubmit(onSubmit),
          }}
        />
      </>
    </PruScreen>
  );
};
