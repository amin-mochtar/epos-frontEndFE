import { View, Text, FlatList, Linking, TouchableOpacity } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { PruColor, PruScreen } from 'common_ui_components';
import { Divider, DropdownField, LoadingFull, ModalContainer, ModalInformation, numberWithCommas, plaiStyles, TextDecoration } from 'plai_common_frontend';
import { EposFooter, EposHeader, OptionCard, TOptionalCardData } from '../../../components';
import { ScrollView } from 'react-native';
import { StackActions, useNavigation } from '@react-navigation/native';
import { EposRoutes } from '../../../navigation';
import { useEposRealm, useObject } from '../../../database';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/reducer';
import { EposState } from '../../../redux';
import { CHANNEL, DEFAULT_OPTIONAL_DATA, paymentBankName, paymentType, statement, ISPAJData, ISQSDetail, UpfrontDecisionModel, showModalFailedSubmitDoksul, showModalMaintenance, isEmailAutomation, WR_SHARIA_CONVENT } from '../../../utilities';
import { useTranslation, Trans } from 'react-i18next';
import { checkStatusPayment, generateLinkPayment, submissionProposal } from '../../../network';
// import { InAppBrowser } from 'react-native-inappbrowser-reborn'
import {
  TCart,
  TParamGenerateLink,
  TPaymentLink,
  TPaymentStatus,
  defaultParam,
  defaultTOptionCard,
} from './spaj-payment.type';
import { cStyles } from './spaj-payment.style';
import WebView from 'react-native-webview';
import { useSubmission } from '../../../hooks';
import { NoticeBar } from '../../esqs/calculator/components';
import RNFS from 'react-native-fs';
import moment from 'moment';

type TPopupType = {
  autodebit?: boolean,
  submitproposal?: boolean,
  requestbillnumber?: boolean,
  onlinepayment?: boolean,
  blockcash?: boolean;
};

const defaultPopupType = {
  autodebit: false,
  submitproposal: false,
  requestbillnumber: false,
  onlinepayment: false,
  blockcash: false
};
/*
field
linkPayment
listBank
statusPayment
*/
export const SpajPaymentScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { selectedSQSId, proposalId, spajId, spajNumber, responsePaymentGenerate, responseCheckPayment, loading } = useSelector<
    RootState,
    EposState
  >((state) => state.epos);
  const authState = useSelector((state: any) => {
    return state.auth;
  });
  const { updateSPAJByKey, updateSummaryByKey, getMultipleCustomer } = useEposRealm();
  const { generateSubmission } = useSubmission();
  const RSQSData = useObject<ISQSDetail>('SQSDetail', selectedSQSId as never);
  const RSPAJData = useObject<ISPAJData>('SPAJData', spajId as never);
  const allCustomerData = getMultipleCustomer(RSQSData?.clientIdSelected!);
  const currency = allCustomerData?.[0]?.clientCurrency?.key || "IDR"
  const paymentData = RSPAJData?.spajPayment ? JSON.parse(RSPAJData?.spajPayment) : '';
  const { result, isNeedRequest } = RSPAJData?.upfrontDecisionResult ?? {};
  const resultUpfront = result ? JSON.parse(result) as UpfrontDecisionModel.RealmData['result'] : {};
  const isUpfrontDecisionExist = isNeedRequest === 'true';
  const calculatorData = JSON.parse(RSQSData?.calculator!);
  const resultCalculator = RSQSData?.resultCalculator? JSON.parse(RSQSData?.resultCalculator!): undefined;
  const product = RSQSData?.product;
  const policyOwnerData = RSPAJData?.policyHolderData! ? JSON.parse(RSPAJData?.policyHolderData!) : '';
  const [paymentLink, setPaymentLink] = useState<TPaymentLink>(
    paymentData != '' ? paymentData.paymentLink : responsePaymentGenerate,
  );
  const [paymentStatus, setPaymentStatus] = useState<TPaymentStatus>(
    paymentData != '' ? paymentData.paymentStatus : responseCheckPayment,
  );
  const [autoDebit, setAutoDebit] = useState<TOptionalCardData>(
    paymentData != '' ? paymentData.autoDebit : defaultTOptionCard,
  );
  const [totalPayment, setTotalPayment] = useState('');
  const [visibleModal, setVisibleModal] = useState(false);
  const [modalPayment, setModalPayment] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<TOptionalCardData>(paymentData ? paymentData?.paymentMethod : DEFAULT_OPTIONAL_DATA);
  const [bankName, setBankName] = useState<any>(paymentData ? paymentData?.bankName : DEFAULT_OPTIONAL_DATA);
  const [popupType, setPopupType] = useState<TPopupType>(defaultPopupType);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  const { premiContribution } = useMemo(() => WR_SHARIA_CONVENT[RSQSData?.policyType || 'conventional'], []);

  const isProductUnitLink = useMemo(() => {
    if (isUpfrontDecisionExist && resultUpfront?.response_detail?.decision === 'JET_CASE') {
      return false
    }
    if (RSPAJData?.upfrontDecisionResult?.signatureExclusionOffering) {
      const exclusionData: UpfrontDecisionModel.RealmSignatureExclustion = JSON.parse(RSPAJData?.upfrontDecisionResult?.signatureExclusionOffering!);
      if (exclusionData['exclustion-offering-agreement'].key === 'Y') {
        return false
      }
    }
    const productCategory = CHANNEL[product?.key ?? '']?.productCategory;
    return productCategory === 'UL' ? true : false;
  }, [product?.key, isUpfrontDecisionExist, resultUpfront?.response_detail?.decision]);

  const propsModalInformasi = {
    title: popupType.autodebit ?
      'Daftar Autodebit'
      : popupType.requestbillnumber || popupType.onlinepayment ?
        'Bayar'
        : popupType.blockcash ?
          'Perhatian'
          : 'Ajukan Proposal',

    desc: popupType.autodebit ?
      'Anda akan dialihkan ke halaman pendaftaran Autodebit. Pastikan koneksi internet Anda stabil. Mohon menyelesaikan pembayaran dalam waktu 15 menit.'
      : popupType.requestbillnumber ?
        'Silahkan lanjutkan pembayaran (Link akan expired dalam 15 menit), Apakah anda yakin ?'
        : popupType.onlinepayment ?
          'Anda akan membuka halaman pembayaran, pastikan saat transaksi Anda terhubung internet dengan baik.'
          : popupType.blockcash ?
            'Pemegang Polis dimohon untuk segera mendaftarkan layanan autodebit rekening atau kartu kredit. Polis akan terbit apabila pendaftaran autodebit rekening atau kartu kredit telah diterima oleh Prudential Indonesia. Terima kasih.'
            : 'Anda yakin ingin mengajukan proposal? ',

    textButtotnPrimary: popupType.autodebit || popupType.submitproposal ? 'Lanjutkan' : popupType.blockcash ? 'Tutup' : 'Ya',
    textButtotnSecondary: popupType.autodebit || popupType.submitproposal ? 'Batal' : 'Tidak'
  };

  useEffect(() => {
    if (['BLOCKCSASHNEW', 'BLOCKCSASH', 'BLOCKCASHPREM'].includes(resultCalculator?.rule[0]?.ruleCd || "")) {
      setPopupType({ blockcash: true });
      setTimeout(() => setVisibleModal(true), 500);
      if (!paymentData) {
        setAutoDebit({
          key: 'Y',
          label: t('Epos:yes'),
        });
      }
    }
  }, []);

  useEffect(() => {
    getTotalPayment();
    setPaymentLink(responsePaymentGenerate);
    setPaymentStatus(responseCheckPayment as TPaymentStatus);
  }, [responsePaymentGenerate, responseCheckPayment]);


  const topUpValue = useMemo(() => {
    if (RSPAJData?.topup) {
      const _topUpData = JSON.parse(RSPAJData?.topup);
      if (_topUpData.topup) {
        return Number(_topUpData.topup.replace(/\./g, ''))
      }
      return 0;
    }
    return 0
  }, [RSPAJData?.topup])

  const getTotalPayment = () => {
    const premi = currency === "USD"? Number(calculatorData.regularPremium.replace(/\./g, '')) * Number(RSPAJData?.rateUsd || 1) : Number(calculatorData.regularPremium.replace(/\./g, ''));
    const topUp = topUpValue;
    const cetakPolis = policyOwnerData.clientReceiveSummary?.key === 'Y' ? 100000 : 0;
    const total = premi + topUp + cetakPolis;

    setTotalPayment(numberWithCommas(total.toString()));
  };

  const enableNextButton = () => {
    if (['U12', 'U13'].includes(product?.key!)) {
      if (autoDebit.key) return true;
    }
    if (paymentMethod.key == 'online') {
      return true;
    } else if (paymentMethod.key == 'offline') {
      if (bankName.key && autoDebit.key) {
        return true;
      }
    }
    return false;
  }



  const generateLink = () => {
    const param: TParamGenerateLink = defaultParam;
    const cart: TCart[] = [];
    cart.push({
      type: 'prm',
      amount: Number(calculatorData.regularPremium.replace(/\./g, '')),
    });
    if (policyOwnerData.clientReceiveSummary.key === 'Y') {
      cart.push({
        type: 'fee',
        amount: 100000,
      });
    }
    if (topUpValue != 0) {
      cart.push({
        type: 'tup',
        amount: topUpValue as number,
      });
    }
    param.cart = cart;
    param.cust_no = spajNumber;
    param.owner_name = allCustomerData[0].clientName;
    param.life_assured_name = allCustomerData.length == 1 ? allCustomerData[0].clientName : allCustomerData[1].clientName;
    param.premium_amount = Number(totalPayment.replace(/\./g, ''));
    param.void_flag = autoDebit?.key == 'Y' && paymentMethod?.key != 'online';
    param.pay_option = '0';
    param.email = policyOwnerData.clientEmail;
    param.phone = allCustomerData[0].clientPhone;
    param.is_sharia = RSQSData?.policyType === 'sharia';

    generateLinkPayment(param);
    dispatch(generateLinkPayment(param));
    setVisibleModal(true);
    setPopupType({ autodebit: true });
  };


  const checkPayment = () => {
    if (paymentLink.ref_no != '') {
      dispatch(checkStatusPayment({ ref_no: paymentLink.ref_no }));
    } else {
      generateLink();
    }
  };


  const headerAutomation = async () => {
    const isEmailTest = await policyOwnerData && isEmailAutomation(policyOwnerData);
    return { isAutomation: isEmailTest ? 'Y' : 'N' }
  }

  const onSubmissionProposal = async () => {
    setVisibleModal(false)
    setLoadingSubmit(true);
    const privyData = RSPAJData?.privyData ? JSON.parse(RSPAJData?.privyData) : '';
    const submissionData = await generateSubmission({
      privyPh: privyData.privyIdPH == 'failed' ? '' : privyData.privyIdPH,
      privyAgent: privyData.privyIdAgent == 'failed' ? '' : privyData.privyIdAgent,
      privyLA: privyData.privyIdLA == 'failed' ? '' : privyData.privyIdLA,
      privyPY: privyData.privyIdPY == 'failed' ? '' : privyData.privyIdPY,
    });
    if (!submissionData.submission.id) {
      setLoadingSubmit(false);
      showModalMaintenance()
    } else {
      const headers = await headerAutomation();
      const submissionProposalResult = await submissionProposal(submissionData, headers);
      setLoadingSubmit(false);
      if (submissionProposalResult && submissionProposalResult.responseCode == '00') {
        await updateSummaryByKey(proposalId, { key: 'statusProposal', value: 'SPAJ Pending UW' });
        updateSummaryByKey(proposalId, { key: 'statusSubmit', value: true });
        updateSummaryByKey(proposalId, { key: 'submitDate', value: moment().toISOString() });
        navigation.dispatch(StackActions.replace(EposRoutes.LINK_SUBMITTED));
      } else {
        showModalFailedSubmitDoksul(() => {
          onSubmissionProposal()
        });
      }
    }
  };

  const actionButtonPrimary = () => {
    //  online payment method
    if (popupType.requestbillnumber) {
      checkPayment();
      setVisibleModal(!visibleModal);
    } else if (popupType.onlinepayment) {
      setVisibleModal(!visibleModal);
      if (paymentLink.url_paylink) {
        setTimeout(() => {
          setModalPayment(true);
        }, 1000);
      }
      //  offline payment method
    } else if (popupType.autodebit && paymentLink.url_paylink) {
      setVisibleModal(!visibleModal);
      setTimeout(() => {
        setModalPayment(true);
      }, 1000);
      // after making payment
    } else if (popupType.submitproposal) {
      onSubmissionProposal();
      // navigation.dispatch(StackActions.replace(EposRoutes.LINK_SUBMITTED));
    } else if (popupType.blockcash) {
      setVisibleModal(!visibleModal);
    }
  };

  const conditionAutoDebit = () => {
    if (autoDebit?.key == 'Y') {
      if (paymentStatus.resp_desc != '') {
        if (paymentStatus.resp_desc == 'Payment Pending') {
          setVisibleModal(true);
          setPopupType({ autodebit: true });
        } else {
          setVisibleModal(true);
          setPopupType({ submitproposal: true });
        }
      } else {
        checkPayment();
        setVisibleModal(true);
        setPopupType({ autodebit: true });
      }
    } else {
      setPopupType({ submitproposal: true });
      setVisibleModal(true);
    }
  };

  const onContinue = () => {
    // UL product using autodebit payment
    if (isProductUnitLink) {
      conditionAutoDebit();
      // TRD product
    } else {
      if (paymentMethod?.key === 'online') {
        if (!paymentLink.url_paylink) {
          setPopupType({ requestbillnumber: true });
        } else {
          if (paymentStatus?.resp_desc !== 'Success') {
            setPopupType({ onlinepayment: true });
          } else {
            setPopupType({ submitproposal: true });
          }
        }
        setVisibleModal(true);
      } else {
        conditionAutoDebit();
      }
    }
  };

  const conditionalInfoShow = useMemo(() => {
    const isValidCondition = bankName?.key == "permata" || bankName?.key == "bca" || bankName?.key == "bni" || bankName?.key == "panin" || bankName?.key == "ocbn";
    const isWordingCondition = bankName?.key == "permata" || bankName?.key == "bca" ? '*) Kartu Tabungan Jenis ATM BERSAMA atau ALTO dapat melakukan pembayaran premi di mesin ATM Bank Permata, mengikuti panduan pembayaran di atas.' : undefined;
    return {
      isValid: isValidCondition,
      wording: isWordingCondition
    };
  }
    , [bankName]);


  const onSave = (_route?: string) => {
    const spajPayment = {
      paymentMethod: paymentMethod,
      bankName: bankName,
      autoDebit: autoDebit,
      paymentLink: paymentLink,
      paymentStatus: paymentStatus
    };

    updateSPAJByKey(RSPAJData.spajId, {
      key: 'spajPayment',
      value: JSON.stringify(spajPayment)
    });
    navigation.dispatch(StackActions.replace(_route!));
  };

  const onBack = () => {
    onSave(EposRoutes.SPAJ_DIGITAL_SIGN);
    return true;
  };


  return (
    loadingSubmit ? <LoadingFull /> :
      <PruScreen backgroundColor={PruColor.white}>
        <View style={plaiStyles.px16}>
          <EposHeader />
          <Text style={plaiStyles.fontHeaderTitle}>Pembayaran</Text>
        </View>
        <ScrollView style={plaiStyles.bgGrey}>
          <View style={[plaiStyles.bgwhite, plaiStyles.spacingp, plaiStyles.flex]}>
            <Text style={[plaiStyles.fontGrey66Thin, plaiStyles.font14, plaiStyles.lineH20]}>Total Pembayaran</Text>
            <Text style={[plaiStyles.fontGrey33Bold, plaiStyles.font20, plaiStyles.lineH24, plaiStyles.mt8]}>
              Rp{totalPayment}
            </Text>
            {paymentMethod?.key === 'online' && paymentStatus?.resp_desc === 'Success' && (
              <View style={[plaiStyles.bgGreenlight, plaiStyles.br4, plaiStyles.mt16, plaiStyles.mb8, plaiStyles.px12, plaiStyles.py8, { width: '40%' }]}>
                <Text style={[plaiStyles.fontGreen791, plaiStyles.font12]}>Pembayaran Berhasil</Text>
              </View>
            )}
          </View>

          <View style={[plaiStyles.bgwhite, plaiStyles.spacingp, plaiStyles.mt8]}>
            <Text style={[plaiStyles.font16, plaiStyles.fontGrey33Bold, plaiStyles.lineH24]}>Detail Transaksi</Text>
            <View>
              <View style={[plaiStyles.row, plaiStyles.justifyBetween, plaiStyles.alignStart]}>
              <Text style={[plaiStyles.fontGrey33Thin, plaiStyles.font14, plaiStyles.lineH20, plaiStyles.mt16]}>
                {premiContribution} Pertama
                </Text>
                <View>
                <Text
                  style={[
                    plaiStyles.fontGrey33,
                    plaiStyles.font14,
                    plaiStyles.lineH18,
                    { textAlign: 'right' },
                    plaiStyles.mt16,
                  ]}
                >
                  {currency === "USD"? "USD ": "Rp"}{calculatorData.regularPremium}
                </Text>
                {currency === "USD" &&
                  <Text
                  style={[
                    plaiStyles.fontGrey66,
                    plaiStyles.font14,
                    plaiStyles.lineH18,
                    { textAlign: 'right' },
                    plaiStyles.mt4,
                  ]}
                >
                  Rp{numberWithCommas(Number(calculatorData.regularPremium.replace(/\./g, '')) * Number(RSPAJData?.rateUsd || 1))}
                </Text>
                }
                </View>
              </View>
              <View style={[plaiStyles.row, plaiStyles.justifyBetween, plaiStyles.alignStart]}>
              <Text style={[plaiStyles.fontGrey33Thin, plaiStyles.font14, plaiStyles.lineH20, plaiStyles.mt16]}>
                  Top Up
                </Text>
                <View>
                <Text
                  style={[
                    plaiStyles.fontGrey33,
                    plaiStyles.font14,
                    plaiStyles.lineH18,
                    { textAlign: 'right' },
                    plaiStyles.mt16,
                  ]}
                >
                  {currency === "USD"? "USD ": "Rp"}{topUpValue}
                </Text>
                {currency === "USD" &&
                  <Text
                  style={[
                    plaiStyles.fontGrey66,
                    plaiStyles.font14,
                    plaiStyles.lineH18,
                    { textAlign: 'right' },
                    plaiStyles.mt4,
                  ]}
                >
                  Rp{topUpValue}
                </Text>
                }
                </View>
              </View>
              <View style={[plaiStyles.row, plaiStyles.justifyBetween, plaiStyles.alignStart]}>
              <Text style={[plaiStyles.fontGrey33Thin, plaiStyles.font14, plaiStyles.lineH20, plaiStyles.mt16]}>
                  Cetak Buku Polis
                </Text>
                <Text
                  style={[
                    plaiStyles.fontGrey33,
                    plaiStyles.font14,
                    plaiStyles.lineH18,
                    { textAlign: 'right' },
                    plaiStyles.mt16,
                  ]}
                >
                  Rp{policyOwnerData.clientReceiveSummary?.key === 'Y' ? '100.000' : '0'}
                </Text>
                </View>
            </View>
            <View style={[plaiStyles.bgF4, plaiStyles.my24]}>
              <Divider height={2} />
            </View>
            <View style={[plaiStyles.row]}>
              <View style={[plaiStyles.flex]}>
                <Text style={[plaiStyles.fontGrey33Thin, plaiStyles.font14, plaiStyles.lineH20]}>Total</Text>
              </View>
              <View style={[plaiStyles.flex]}>
                <Text style={[plaiStyles.fontGrey33, plaiStyles.font14, plaiStyles.lineH18, { textAlign: 'right' }]}>
                  Rp{totalPayment}
                </Text>
              </View>
            </View>
          </View>

          {!(paymentMethod?.key === 'online' && paymentStatus?.resp_desc === 'Success') && (
            <View style={[plaiStyles.bgwhite, plaiStyles.spacingp, plaiStyles.mt8]}>
              {!isProductUnitLink && (
                <>
                  <Text style={[plaiStyles.fontGrey33Bold, plaiStyles.mt16, plaiStyles.lineH24, plaiStyles.font16]}>
                    Metode Pembayaran
                  </Text>
                  <OptionCard
                    data={paymentType}
                    theme="border"
                    style={[plaiStyles.mt12, plaiStyles.mb16]}
                    spaceItem={8}
                    insideStyle={[plaiStyles.flex]}
                    selected={paymentMethod}
                    onSelected={setPaymentMethod}
                    uniqueTestId='payment-method'
                  />
                  {paymentMethod?.key === 'offline' && <NoticeBar message={'Pembayaran transfer sudah dapat dilakukan melalui <linking>KLIK BCA</linking>, <i>channel</i> Bank dan Non Bank dengan ketentuan mengacu pada masing-masing <i>channel</i>.'} type={'INFO'} url={'https://ibank.klikbca.com/'} />}
                </>
              )}
            </View>
          )}


          {paymentMethod?.key === 'offline' && (
            <View style={[plaiStyles.bgwhite, plaiStyles.spacingp, plaiStyles.mt8]}>
              <Text style={[plaiStyles.fontGrey33Bold, plaiStyles.font16, plaiStyles.lineH24]}>Informasi Pembayaran</Text>
              <DropdownField
                labelMap={{
                  title: t('Epos:bank_for_transfer'),
                  placeholder: t('Epos:select_bank'),
                }}
                data={paymentBankName}
                selected={bankName}
                onSelected={setBankName}
                id="dropdown-bank-name"
              />
              {bankName?.detail?.length && (
                <>
                  <Text style={[plaiStyles.fontGrey33Bold, plaiStyles.font14, plaiStyles.mt16, plaiStyles.mb16]}>Cara Transfer</Text>
                  <FlatList
                    data={bankName.detail}
                    style={[plaiStyles.mt8]}
                    renderItem={({ item, index }) => {
                      return (
                        <View>
                          {item?.key &&
                            <View style={[plaiStyles.mb10]}>
                              <Text style={[plaiStyles.fontGrey33Thin, plaiStyles.ml8, plaiStyles.flex, plaiStyles.flexWrap]}>
                                <TextDecoration label={item.key} />
                              </Text>
                            </View>
                          }
                          {item?.subkey &&
                            <View style={[plaiStyles.mb10, plaiStyles.pl16]}>
                              <Text style={[plaiStyles.fontGrey33Thin, plaiStyles.ml8, plaiStyles.flex, plaiStyles.flexWrap]}>
                                <TextDecoration label={item.subkey} />
                              </Text>
                            </View>
                          }
                        </View>
                      );
                    }}
                  />
                  {conditionalInfoShow.isValid && (
                    <NoticeBar message={'Pembayaran sampai dengan jam 14.00 WIB akan dibukukan oleh Prudential pada hari kerja yang sama.'} type={'INFO'} />
                  )}
                  {conditionalInfoShow.wording && (
                    <View style={[plaiStyles.py8, plaiStyles.px4, plaiStyles.br8, plaiStyles.mt10]}>
                      <Text >
                        {conditionalInfoShow.wording}
                      </Text>
                    </View>
                  )}
                </>
              )}
            </View>
          )}

          {(isProductUnitLink || paymentMethod?.key === 'offline') && (
            <View style={[plaiStyles.bgwhite, plaiStyles.spacingp, plaiStyles.mt8]}>
              <Text style={[plaiStyles.fontGrey33Bold, plaiStyles.font16, plaiStyles.lineH24]}>Auto Debit Pembayaran</Text>
              {paymentStatus?.resp_desc == 'Success' && (
                <View style={cStyles.wrapperSuccess}>
                  <Text style={cStyles.textSuccess}>Pendaftaran Autodebit berhasil dilakukan.</Text>
                </View>
              )}
              <Text style={[plaiStyles.fontGrey33, plaiStyles.font14, plaiStyles.lineH20]}>
                Apakah Anda mau melakukan pendaftaran autodebit?
              </Text>
              <OptionCard
                data={statement}
                theme="border"
                style={plaiStyles.row}
                insideStyle={[plaiStyles.flex, plaiStyles.mr4]}
                selected={autoDebit}
                onSelected={setAutoDebit}
                onDisabled={(item: TOptionalCardData) => paymentStatus?.resp_desc == 'Success'}
                uniqueTestId='autodebit-registration'
              />
            </View>
          )}

          {!isProductUnitLink && !(paymentMethod?.key === 'online' && paymentStatus?.resp_desc === 'Success') && (
            <View style={[plaiStyles.bgwhite, plaiStyles.spacingp, plaiStyles.mt8]}>
              <Text style={[plaiStyles.fontGrey33Bold, plaiStyles.mt16, plaiStyles.lineH24, plaiStyles.font16]}>
                Catatan
              </Text>
              <Text style={[plaiStyles.fontBlackThin, plaiStyles.lineH24, plaiStyles.mt16, plaiStyles.mb16]}>Bayarkan Premi Anda secara langsung ke rekening resmi milik PT Prudential Life Assurance (Prudential Indonesia). Informasi dan panduan pembayaran dapat dilihat pada website www.prudential.co.id - pembayaran Premi (Bayar Premi Asuransi Konvensional | Prudential Indonesia). Prudential Indonesia tidak bertanggung jawab akan risiko dan kerugian yang timbul jika Anda menggunakan metode pembayaran selain yang telah disediakan di atas.</Text>
            </View>
          )}
        </ScrollView>

        <ModalInformation
          title={propsModalInformasi.title}
          desc={propsModalInformasi.desc}
          visible={visibleModal}
          buttonPrimary={{
            text: propsModalInformasi.textButtotnPrimary,
            onPress: () => actionButtonPrimary(),
          }}
          buttonSecondary={popupType.blockcash ? null : {
            text: propsModalInformasi.textButtotnSecondary,
            onPress: () => {
              setPopupType(defaultPopupType);
              setVisibleModal(false);
            },
          }}
        />

        <ModalContainer visible={modalPayment} onClose={() => {
          checkPayment();
          setModalPayment(!modalPayment);
        }} styleWrapper={[plaiStyles.flex]}>
          <WebView
            source={{ uri: `${paymentLink?.url_paylink}${paymentLink?.ref_no}` }}
          />
        </ModalContainer>

        <EposFooter
          position={100}
          leftButton={{
            onPress: () => onBack(),
          }}
          rightButton={{
            disabled: !enableNextButton(),
            onPress: () => onContinue(),
          }}
        />
      </PruScreen>
  );
};
