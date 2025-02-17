import { View, Text, ScrollView, BackHandler, Linking } from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { PruColor, PruScreen } from 'common_ui_components';
import { CheckboxGroup, ModalInformation, plaiStyles, setMultipleSelect, LoadingFull, GlobalPromptModal, TCommonConstantData } from 'plai_common_frontend';
import { EposFooter, EposHeader, TOptionalCardData } from '../../../components';
import {
  TCommonOptionalData,
  WR_SHARIA_CONVENT,
  UpfrontDecisionModel,
  ISPAJData,
  ISQSDetail,
  ISummaryProposal,
  CHANNEL,
} from '../../../utilities';
import { useEposRealm, useObject } from '../../../database';
//@ts-ignore
import { RootState } from 'redux/reducer';
import { EposState, resetRMessaging, responseData, updateEposState } from '../../../redux';
import { useDispatch, useSelector } from 'react-redux';
import { DefaultValues, SubmitHandler, useForm } from 'react-hook-form';
import { TDisclaimerItem, TFormDisclaimer, TShow, TShowAccountPH, defaultFormDisclaimer } from './disclaimer.type';
import { mapBenefitsData, productType, showModalMaintenance } from '../../../utilities/common-function';
import { useTranslation } from 'react-i18next';
import { StackActions, useNavigation } from '@react-navigation/native';
import { EposRoutes } from '../../../navigation';
import { getDisclaimerList } from './disclaimer.function';
import moment from 'moment';
import { onCheckBank, sendPaydiSMS } from '../../../network';
import { postUpfrontDecision } from '../../../network/services';
import { useSpajNumber, useSubmission } from '../../../hooks';
import { defaultCommonValue } from '../spaj-amandement/spaj-amendment.type';
import RNFS from 'react-native-fs';
import {
  AccountHolderForm,
  AdditionalSpajOfferingProduct,
  ModalDisclaimer,
  PremiRefundQuestion,
  SurplusUnderwriting,
} from './components';
import { ENV } from '@env';
import { additionalQuestionValidation } from './disclaimer.data';

export const Disclaimer = () => {
  const isUAT = ENV === 'UAT' || ENV === 'DEV';
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [chooseDisclaimer, setChooseDisclaimer] = useState<TDisclaimerItem>();
  const [listDisclaimer, setListDisclaimer] = useState<TDisclaimerItem[]>([]);
  const [isVisible, setIsVisible] = useState(false);
  const [isAtBottom, setIsAtBottom] = useState(false);
  const [isVisibleResponseMessage, setIsVisibleResponseMessage] = useState(false);
  const { updateSummaryByKey, getCustomerStorageById, onUpdateUpfrontDecision, updateSPAJByKey, getMultipleCustomer } = useEposRealm();
  const { selectedSQSId, proposalId, spajId, spajNumber } = useSelector<RootState, EposState>(
    (state) => state.epos,
  );
  const summaryById = useObject<ISummaryProposal>('SummaryProposal', proposalId as never);
  const RSQSData = useObject<ISQSDetail>('SQSDetail', selectedSQSId as never);
  const allCustomerData = getMultipleCustomer(RSQSData?.clientIdSelected!);
  const additionalBenefits = RSQSData?.additionalBenefits || [];

  const { _generateSpajNumber } = useSpajNumber();
  const calculatorData = RSQSData?.calculator ? JSON.parse(RSQSData.calculator) : '';
  const RSPAJData = useObject<ISPAJData>('SPAJData', spajId as never);
  const policyHolderData = RSPAJData?.policyHolderData ? JSON.parse(RSPAJData.policyHolderData!) : null;
  const topUpData = RSPAJData?.topup ? JSON.parse(RSPAJData.topup!) : null;
  const clientResidencePhoneCells = policyHolderData?.clientResidencePhoneCells[0];
  const PhoneCellNumber =
    clientResidencePhoneCells?.clientResidencePhoneCellCode?.dial_code +
    clientResidencePhoneCells?.clientResidencePhoneCell;
  const lifeAssuredData = getCustomerStorageById(RSQSData?.clientIdSelected[0]!);
  const product = RSQSData?.product;
  const defaultPolicyHolderAccount = RSPAJData?.policyHolderAccount ? JSON.parse(RSPAJData.policyHolderAccount!) : '';
  const isPremiumPayorSPAJ = RSPAJData ? JSON.parse(RSPAJData.confirmationSQS).premiumPaymentCandidate : '';
  const isPolicyHolderAccount = defaultPolicyHolderAccount !== '';
  const [surplusUnderwriting, setSurplusUnderwriting] = useState<TOptionalCardData>(
    defaultPolicyHolderAccount ? defaultPolicyHolderAccount?.surplusUnderwriting : '',
  );
  const [spajNumberTemp, setSpajNumberTemp] = useState(spajNumber)
  const [loading, setLoading] = useState(false);
  const [pruURLOpened, setPruURLOpened] = useState<string[]>([]);
  const [isModalHaveUrl, setIsModalHaveUrl] = useState<boolean>(false);
  const [showAccountPH, setShowAccountPH] = useState<TShowAccountPH>({
    sectionAccount: false,
    detailAccount: false,
  });
  const { generateRequestUpfront } = useSubmission();
  const dispatch = useDispatch();
  const disclaimerList = useMemo(
    () =>
      getDisclaimerList(
        RSQSData?.policyType || 'conventional',
        additionalBenefits || '',
        product?.label || '',
        calculatorData || '',
        product?.key || '',
        isPremiumPayorSPAJ === 'N',
        topUpData,
      ),
    [
      product?.key,
      product?.label,
      calculatorData,
      additionalBenefits,
      RSQSData?.policyType,
      isPremiumPayorSPAJ,
      topUpData,
    ],
  );

  const [isLinkClicked, setLinkClicked] = useState<number[]>([]);
  const [InformationMessage, setInformationMessage] = useState<TCommonOptionalData>({
    key: '',
    label: '',
    status: false,
  });
  const { premiContribution, lifeAssured } = WR_SHARIA_CONVENT[RSQSData?.policyType || 'conventional'];
  const isTraditional = useMemo(() => productType(product?.key!) === "TRD", []);
  const isSharia = RSQSData?.policyType === 'sharia';
  const additionalQuestionTitle = additionalQuestionValidation[product?.key || ''] || t('Epos:additional_question_title', { premiContribution, lifeAssured })
  const {
    control,
    setValue,
    handleSubmit,
    getValues,
    watch,
    formState: { errors, isValid },
  } = useForm<TFormDisclaimer>({
    defaultValues: useMemo(() => {
      let result = defaultFormDisclaimer;
      if (RSPAJData?.policyHolderAccount != null || RSPAJData?.policyHolderAccount != '') {
        result = defaultPolicyHolderAccount;
      }
      return result as DefaultValues<TFormDisclaimer>;
    }, []),
  });

  useEffect(() => {
    setValue("additionalValidationSPAJModal", { label: '', key: '' })
  }, [])

  const policyholderAccountInfo = watch('policyholderAccountInfo');

  const allDisclaimerChecked = useCallback(() => {
    const uniqueKeys = new Set<string | number>();
    listDisclaimer.forEach(({ key }) => {
      uniqueKeys.add(key);
    });
    return uniqueKeys.size;
  }, [listDisclaimer]);

  const isAllDisclaimerChecked = allDisclaimerChecked() === disclaimerList?.length;
  const watchAdditionalValidationModal = watch('additionalValidationSPAJModal')

  const isButtonModalDisclaimerValid = useMemo(() => {
    if (['PIPKPLPP', 'PPDIPKPLPP'].includes(chooseDisclaimer?.key || '')) {
      if (chooseDisclaimer?.key === 'PIPKPLPP') {
        return isAtBottom && isModalHaveUrl && pruURLOpened.length > 1 && watchAdditionalValidationModal.key === 'Y'
      } else {
        return isAtBottom && isLinkClicked.length > 1 && watchAdditionalValidationModal.key === 'Y'
      }
    }
    return isAtBottom
  }, [isAtBottom, chooseDisclaimer?.key, watchAdditionalValidationModal, isModalHaveUrl, pruURLOpened, isLinkClicked])

  const handleCheckboxClick = (item: TCommonOptionalData) => {
    if (listDisclaimer?.includes(item as TDisclaimerItem)) {
      setListDisclaimer(setMultipleSelect([...listDisclaimer], item, 'key'));
    } else {
      setChooseDisclaimer(item as TDisclaimerItem);
      setIsVisible(true);
    }

    if (item?.key === 'PIPKPLPP') {
      setIsModalHaveUrl(true);
    }
  };

  const handleAgree = () => {
    setListDisclaimer((prev) => [...prev, chooseDisclaimer ?? ({} as TDisclaimerItem)]);
    setIsAtBottom(false);
    setLinkClicked([]);
    setIsVisible(!isVisible);
  };

  const paramSendSMS = () => {
    const jsonSubmit = {
      clientName: policyHolderData.clientName,
      emailClient: policyHolderData.clientEmail,
      rider: mapBenefitsData(additionalBenefits),
      productCode: CHANNEL[product?.key!].lifeAsiaCode,
      productName: product?.label,
      idNumber: policyHolderData.clientIdCardNumber,
      currency: lifeAssuredData?.clientCurrency?.key,
      manfaatTambahan: '',
    };

    return {
      proposalId: proposalId,
      phoneNo: PhoneCellNumber.replace('+', ''),
      dob: moment(lifeAssuredData?.clientDateBirth).format('YYYYMMDD'),
      jsonSubmit: JSON.stringify(jsonSubmit),
    };
  };

  const onBack = () => {
    navigation.dispatch(StackActions.replace(EposRoutes.SPAJ_DATA_COMPLETENESS));
    return null;
  };

  const onSave = async (data: any) => {
    await updateSPAJByKey(RSPAJData?.spajId || '', {
      key: 'policyHolderAccount',
      value: JSON.stringify(data),
    });
  };

  const showModalBank = (title: string, subtitle: string, isServerIssue?: boolean) => {
    if (isServerIssue) showModalMaintenance()
    else GlobalPromptModal.show({
      title,
      subtitle,
      buttonPrimary: {
        text: 'Ok',
        onPress: () => {
          GlobalPromptModal.close();
        },
      }
    })
  }

  const _onCheckBank: SubmitHandler<TFormDisclaimer> = async (data) => {
    try {
      setLoading(true);
      const dataBank = {
        bankCode: data.bankName?.codeBank,
        accNo: data.accountNumber,
        accName: data.accountHolder,
      };
      const dataResponse = await onCheckBank(dataBank) as any;
      const respCodeMapping: TCommonConstantData = {
        6: {
          title: t('Epos:account_number_and_name_match'),
          subtitle: t('Epos:the_account_have_been_successfully_verified')
        },
        7: {
          title: t('Epos:account_number_and_name_no_match'),
          subtitle: t('Epos:please_double_check_the_account')
        }
      };

      const { title, subtitle } = respCodeMapping[dataResponse?.resp_code] || {
        title: t('Epos:unable_to_connect'),
        subtitle: t('Epos:unable_to_connect_to_the_server')
      };
      const isResponseSucceed = Boolean(respCodeMapping[dataResponse?.resp_code]);

      if (dataResponse?.resp_code == '6') {
        onSave(data);
      }
      showModalBank(title, subtitle, !isResponseSucceed);
    } catch (error) {
      showModalBank(t('Epos:unable_to_connect'), t('Epos:unable_to_connect_to_the_server'), true);
    } finally {
      setLoading(false);
    }
  };

  const onRemoveAccount = () => {
    setValue('accountHolder', '');
    setValue('accountNumber', '');
    setValue('bankName', defaultCommonValue);
    setValue('branch', '');
    setValue('city', '');
    setValue('additionalValidationSPAJModal', defaultCommonValue);
    setValue('additionalValidationSPAJOfferingProduct', null);
    onSave('');
  };

  const toggleResponseMessageModal = useCallback(() => {
    dispatch(resetRMessaging({ payload: 'reset' }))
    setIsVisibleResponseMessage(!isVisibleResponseMessage);
  }, [isVisibleResponseMessage]);

  const enableBtnSendMessage = () => {
    const additionalValidationSPAJ = watch('additionalValidationSPAJOfferingProduct');

    if (isAllDisclaimerChecked && additionalValidationSPAJ) {
      if (isTraditional) {
        // need check bank if choose "Ya" of question "apakah anda ingin mengisi informasi data rekening PH untuk keperluan pengembalian premi" and save to db
        if (showAccountPH?.detailAccount) {
          return isPolicyHolderAccount;

          // no need to check bank if you choose "Tidak"
        } else {
          return isValid;
        }
      } else {
        return isPolicyHolderAccount;
      }
    }
  };

  const openLink = async (url: string, index: number) => {
    try {
      await Linking.openURL(url);

      const newPruURLOpened: string[] = pruURLOpened;
      if (!newPruURLOpened.includes(url) && chooseDisclaimer?.key === 'PIPKPLPP') {
        newPruURLOpened.push(url);
        setPruURLOpened([...newPruURLOpened]);
      }

      if (chooseDisclaimer?.key === 'PPDIPKPLPP') {
        const updatedLinks = [...isLinkClicked];
        if (!updatedLinks.includes(index)) updatedLinks.push(index);
        setLinkClicked(updatedLinks);
      }

      if (
        chooseDisclaimer?.key === 'PIPKPLPP' &&
        newPruURLOpened.length > 1 &&
        getValues('additionalValidationSPAJModal')?.key === 'Y'
      ) {
        setTimeout(() => {
          setIsAtBottom(true);
        }, 300);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const showModalNotPermited = () => {
    setTimeout(() => {
      GlobalPromptModal.show({
        title: 'Tidak Dapat Melanjutkan',
        subtitle: 'Mohon Maaf, Pengajuan SPAJ belum dapat kami teruskan karena Anda belum memberikan izin untuk menggunakan dan memberikan data pribadi untuk mendukung pelayanan penerbitan Polis. Jika Anda ingin melanjutkan Proses Pengajuan SPAJ. Silakan memilih YA, untuk memberikan izin penggunaan data pribadi.',
        buttonPrimary: {
          text: 'Kembali ke Pernyataan',
          onPress: () => {
            GlobalPromptModal.close()
          }
        }
      })
    }, 600)
  }

  const onChangeAdditionalValidation = (item: TOptionalCardData, onChangeItem: any) => {
    if (item.key == 'N') {
      onChangeItem({
        key: '',
        label: ''
      })

      setIsVisible(false)
      showModalNotPermited()
      setListDisclaimer(prev => prev.filter((item) => item.key !== chooseDisclaimer?.key))
    } else {
      onChangeItem(item)
      setInformationMessage({
        key: '',
        label: '',
        status: false,
      });
    }
  };

  const onErrorPostUpfront = useCallback(() => {
    if (RSPAJData?.upfrontDecisionResult?.transactionId) {
      onUpdateUpfrontDecision(spajId, 'isNeedRequest', 'true');
    } else {
      onUpdateUpfrontDecision(spajId, 'isNeedRequest', 'false');
      if (isUAT) {
        setLoading(false);
        showModalFailedUpfrontRequest();
        return;
      }
    }
    onContinue();
  }, [spajId, isUAT, RSPAJData?.upfrontDecisionResult?.transactionId]);

  const onSuccessPostUpfront = useCallback(
    (resp: UpfrontDecisionModel.PostResponse) => {
      //@ts-ignore TODO: LATER NEED FIX TYPE
      if (resp?.data?.transaction_id) {
        onUpdateUpfrontDecision(spajId, 'isNeedRequest', 'true');
        //@ts-ignore TODO: LATER NEED FIX TYPE
        onUpdateUpfrontDecision(spajId, 'transactionId', resp?.data?.transaction_id);
        onUpdateUpfrontDecision(spajId, 'timeSubmitted', String(new Date()));
        onContinue();
        return
      } else if (RSPAJData?.upfrontDecisionResult?.transactionId) {
        onUpdateUpfrontDecision(spajId, 'isNeedRequest', 'true');
        onContinue();
        return;
      } else if (!RSPAJData?.upfrontDecisionResult?.transactionId) {
        onErrorPostUpfront();
      }
    },
    [spajId, onUpdateUpfrontDecision, onErrorPostUpfront, RSPAJData?.upfrontDecisionResult?.transactionId],
  );

  const sendSMS = async () => {
    try {
      const responseSMS = await sendPaydiSMS(paramSendSMS()) as responseData

      if (responseSMS?.problem === '' && responseSMS?.status === 201) {
        updateSummaryByKey(proposalId, [
          //@ts-ignore
          { key: 'cekatanId', value: responseSMS?.data?.data?.data?.transactionId },
          { key: 'statusProposal', value: 'Waiting for PAYDI' },
          { key: 'paramSendMessage', value: JSON.stringify(paramSendSMS()) },
        ]);
        dispatch(updateEposState({ RMessaging: responseSMS }));
        navigation.dispatch(StackActions.replace(EposRoutes.LINK_SUBMITTED));

      } else {
        setIsVisibleResponseMessage(true);
      }

    } catch (error) {
      setIsVisibleResponseMessage(true);
    }
  }

  const saveSPAJNumber = async (_spajNumber: string) => {
    await dispatch(updateEposState({ spajNumber: _spajNumber }));
    await updateSummaryByKey(proposalId, { key: 'spajNumber', value: _spajNumber });
  }
  const onRequestUpfront = useCallback(async () => {
    const paramUpfront = await generateRequestUpfront({}, 'UPFRONT', spajNumberTemp);
    if (!spajNumberTemp) {
      saveSPAJNumber(paramUpfront?.submission?.id)
    }
    //@ts-ignore
    await postUpfrontDecision({ params: paramUpfront, onSuccess: onSuccessPostUpfront, onError: onErrorPostUpfront });
  }, []);

  const onContinue = useCallback(async () => {
    await onSave(getValues());
    setLoading(false);
    if (isTraditional || summaryById?.cekatanId) {
      await updateSummaryByKey(proposalId, [
        //@ts-ignore
        { key: 'lastState', value: EposRoutes.SQS_SIGNATURE },
      ]);
      navigation.dispatch(StackActions.replace(EposRoutes.SQS_SIGNATURE));
    } else {
      sendSMS()
    }
  }, [isTraditional, onSave, spajNumber, summaryById, dispatch, getValues, spajId]);

  const onEndReached = (event: any) => {
    setIsAtBottom(true);
  }

  const onScrollDisclaimer = useCallback((event: any) => {
    const { layoutMeasurement, contentOffset, contentSize } = event.nativeEvent;
    const _tempValueLayout = Math.floor(layoutMeasurement.height + contentOffset.y)
    const _tempContentSize = Math.floor(contentSize.height)
    //THIS 24 VALUE OF SUBSTRACTION IS AQUIRED FROM PROPS DISTANCE FROM END ONENDREACH FUNCTION
    const isEndReached: boolean = _tempValueLayout >= (_tempContentSize - 24);
    if (!isEndReached) {
      setIsAtBottom(false);
      return;
    }
  }, []);

  const onCloseModalDisclaimer = () => {
    setIsVisible(!isVisible);
    setIsAtBottom(false);
    setValue('additionalValidationSPAJModal', defaultCommonValue);
    setLinkClicked([]);
    setPruURLOpened([]);
    setIsModalHaveUrl(false);
  };

  const onChangeSurplusUnderwriting = (item: TOptionalCardData, value: TOptionalCardData) => {
    setSurplusUnderwriting(item);
    if (item?.key !== value?.key) {
      setValue('policyholderAccountInfo', { label: '', key: '' });
    }
  };

  const onChangePremiRefundQuestion = (item: TOptionalCardData) => {
    if (item?.key == 'Y') {
      setShowAccountPH({ detailAccount: true, sectionAccount: true });
    } else {
      setShowAccountPH({ sectionAccount: true, detailAccount: false });
      onRemoveAccount();
    }
  };

  const showModalEnsurement = useCallback(async () => {
    if (!spajNumber) {
      const _spajNumber = await _generateSpajNumber();
      if (_spajNumber) {
        setSpajNumberTemp(_spajNumber)
        saveSPAJNumber(_spajNumber)
      }
    }
    GlobalPromptModal.show({
      title: "Perhatian",
      subtitle: `Pastikan data Anda benar dan perangkat Anda terhubung ke internet sebelum melanjutkan. Sistem akan menganalisa data Anda untuk proses <i>Underwriting</i> selanjutnya.\n\nPerhatian: Data yang Anda masukkan tidak dapat diubah setelah proses ini.`,
      buttonPrimary: {
        text: 'Ok',
        onPress: () => {
          GlobalPromptModal.close();
          setLoading(true);
          onRequestUpfront();
        },
      },
      buttonSecondary: {
        text: 'Batal',
        onPress: () => GlobalPromptModal.close(),
      },
    })
  }, [onContinue, onRequestUpfront, spajNumber]);

  const showModalFailedUpfrontRequest = useCallback(() => {
    GlobalPromptModal.show({
      title: 'Analisa Underwriting Tidak Dapat Dilanjutkan',
      subtitle: `Mohon maaf, saat ini sistem tidak dapat melakukan analisa Underwriting. Silakan melanjutkan ke halaman berikutnya.`,
      buttonPrimary: {
        text: 'Selanjutnya',
        onPress: () => {
          GlobalPromptModal.close();
          setLoading(true);
          onContinue();
        },
      },
      buttonSecondary: {
        text: 'Coba Lagi',
        onPress: () => {
          GlobalPromptModal.close();
          setLoading(true);
          onRequestUpfront();
        },
      },
    });
  }, [onContinue, onRequestUpfront]);

  //#region CHILD COMPONENT
  const AccountHolderTitle = ({ isShow }: TShow) => {
    if (isShow) {
      return (
        <Text style={[plaiStyles.fontGrey33Bold, plaiStyles.mt16, plaiStyles.lineH24, plaiStyles.font16]}>
          {t('Epos:policyholder_account_information')}
        </Text>
      );
    }
    return <></>;
  };

  // #endregion

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', onBack);
    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    //UNIT LINK CONDITIONAL INPUT BANK ACCOUNT
    if (!isTraditional) {
      setShowAccountPH({ sectionAccount: false, detailAccount: true });
      return;
    }
    //PWMS CONDITIONAL INPUT BANK ACCOUNT
    if (isSharia && isTraditional) {
      if (surplusUnderwriting?.key === 'pengembalianDana' || surplusUnderwriting?.key === 'donasiDana') {
        if (product?.key === 'L1Q') {
          setShowAccountPH({ detailAccount: true, sectionAccount: false });
        } else {
          setShowAccountPH({ sectionAccount: true });
        }
        if (policyholderAccountInfo?.key === 'Y') {
          setShowAccountPH({ sectionAccount: true, detailAccount: true });
        }
      } else if (surplusUnderwriting?.key === 'transferDana') {
        setShowAccountPH({ detailAccount: true });
      }
      return;
    }
    //PWM CONDITIONAL INPUT BANK ACCOUNT
    if (isTraditional) {
      setShowAccountPH({ sectionAccount: true });
      if (policyholderAccountInfo?.key === 'Y') {
        setShowAccountPH({ sectionAccount: true, detailAccount: true });
      }
    }
  }, [surplusUnderwriting, policyholderAccountInfo, isSharia, isTraditional]);

  return (
    <>
      {loading && <LoadingFull />}
      <PruScreen backgroundColor={PruColor.white}>
        <>
          <View style={[plaiStyles.spacing, plaiStyles.flex]}>
            <EposHeader onPressSpajCompleteness={onBack} />
            <Text style={[plaiStyles.fontHeaderTitle, plaiStyles.pb8]}>{t('Epos:important_statement')}</Text>
            <Text style={[plaiStyles.pb8, plaiStyles.fontGrey66Thin]}>{`Syarat dan Ketentuan`}</Text>

            <ScrollView>
              <Text style={[plaiStyles.mb8, plaiStyles.fontGrey66Thin]}>
                {t('Epos:checking_the_boxes_for_agreement')}
              </Text>
              <CheckboxGroup
                data={disclaimerList as any}
                selected={listDisclaimer as any}
                onSelected={handleCheckboxClick}
                insideStyle={[plaiStyles.py14, plaiStyles.pr24]}
                textStyle={[[plaiStyles.fontRedThin, plaiStyles.ml16]]}
              />
              <SurplusUnderwriting
                isShow={isSharia}
                control={control}
                productCode={product?.key}
                onChangeValue={onChangeSurplusUnderwriting}
              />
              <AccountHolderTitle isShow={showAccountPH?.detailAccount || false} />
              <PremiRefundQuestion
                isShow={showAccountPH?.sectionAccount || false}
                control={control}
                onChangeValue={onChangePremiRefundQuestion}
                premiContribution={premiContribution}
              />
              <AccountHolderForm
                isShow={showAccountPH.detailAccount || false}
                control={control}
                defaultPolicyHolderAccount={defaultPolicyHolderAccount}
                handleSubmit={handleSubmit}
                onCheckBank={_onCheckBank}
                onRemoveAccount={onRemoveAccount}
                premiContribution={premiContribution}
                errors={errors}
                policyType={RSQSData?.policyType ?? ''}
                currency={allCustomerData[0].clientCurrency.key!}
                productType={productType(product?.key ?? '')}
                onDisabled={isPolicyHolderAccount}
                productCode={product?.key ?? ''}
              />
              <AdditionalSpajOfferingProduct
                control={control}
                productCode={product?.key ?? ''}
                policyType={RSQSData?.policyType ?? ''}
                productType={productType(product?.key ?? '')}
              />
            </ScrollView>
          </View>
          <ModalDisclaimer
            additionalQuestionTitle={additionalQuestionTitle}
            isVisible={isVisible}
            control={control}
            onAgree={handleAgree}
            onScroll={onScrollDisclaimer}
            onChangeAdditionalValidation={onChangeAdditionalValidation}
            disclaimer={chooseDisclaimer}
            isButtonValid={isButtonModalDisclaimerValid}
            onClose={onCloseModalDisclaimer}
            onEndReached={onEndReached}
            onOpenLink={openLink}
          />
          <ModalInformation
            visible={isVisibleResponseMessage}
            title={t('Epos:unable_to_connect')}
            desc={t('Epos:unable_to_connect_to_the_server')}
            buttonPrimary={{
              text: 'Ok',
              onPress: toggleResponseMessageModal
            }}
          />
          {/* untuk sementara aja ini nanti bakal di centralize */}
          <ModalInformation
            visible={InformationMessage.status}
            title={InformationMessage.key}
            desc={InformationMessage.label}
            buttonPrimary={{
              text: 'Kembali ke Pernyataan',
              onPress: () => {
                setInformationMessage({ ...InformationMessage, status: false });
              },
            }}
          />
          <EposFooter
            position={6}
            leftButton={{
              onPress: onBack,
            }}
            rightButton={{
              text: isTraditional || summaryById?.cekatanId ? 'Selanjutnya' : 'Send SMS',
              disabled: !enableBtnSendMessage(),
              onPress: showModalEnsurement,
            }}
          />
        </>
      </PruScreen>
    </>
  );
};
