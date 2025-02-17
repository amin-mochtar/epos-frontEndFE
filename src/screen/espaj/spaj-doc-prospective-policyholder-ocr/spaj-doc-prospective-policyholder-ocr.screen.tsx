import { View, Text, Pressable, Image, BackHandler, Platform } from 'react-native';
import { EposCameraVision } from './../../../components/epos-camera-vision/epos-camera-vision';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { PruActivityIndicator, PruScreen } from 'common_ui_components/app/components';
import { PruColor } from 'common_ui_components';
import { plaiStyles } from 'plai_common_frontend/src/utilities/plai.style';
import { Button } from 'common_ui_components/app/components-ui';
import { StackActions, useNavigation, useRoute } from '@react-navigation/native';
import { privyOcr } from '../../../network/api/api';
import { BottomSheetOCR, TBottomSheetContentOCR } from './components/botom-sheet-ocr';
import { taskfailed } from './../../../assets/index';
import Icon from 'react-native-vector-icons/AntDesign';
import { useObject } from '../../../database/epos-database';
import { RootState } from 'redux/reducer';
import { EposState } from '../../../redux';
import { useSelector } from 'react-redux';
import { useEposRealm } from '../../../database';
import { EposRoutes } from '../../../navigation';
import { isEmpty } from 'lodash';
import { ocrDummy } from '../spaj-doc-prospective-policyholder/ocr-dummy';
import { ENV } from '@env';
import { getOcrDummy } from './ocr-liveness-data';
import { IOCRUserDataType, TFNProcessPrivyOCRKTP } from './ocr.type';
import { isEmailAutomation, ISPAJData } from '../../../utilities';
import LottieView from 'lottie-react-native';
import Orientation from 'react-native-orientation-locker';

export const SPAJDocProspectivePolicyholderOCRScreen = () => {
  const isDevelopment = __DEV__;
  const { onUpdateSPAJ } = useEposRealm();
  const routes = useRoute();
  const { spajId } = useSelector<RootState, EposState>((state) => state.epos);
  const RSPAJData = useObject<ISPAJData>('SPAJData', spajId as never);
  const RSPAJOcr = RSPAJData?.spajOcr && JSON.parse(RSPAJData?.spajOcr);
  const navigation = useNavigation();
  const [base64Img, setBase64Img] = useState<string>(isDevelopment ? ocrDummy : '');
  const [isBottomSheetVisible, setIsBottomSheetVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [ocrStatus, setOcrStatus] = useState<string>('');
  const [totalRetry, setTotalRetry] = useState<number>(0);
  const [totalRePhotoRetry, setTotalRePhotoRetry] = useState<number>(0);
  const [isIpad, setIsIpad] = useState(false);

  const { params }: any = routes;
  const isPrimaryInsurance = params?.isPrimaryInsurance
  const isPayor = params?.isPayor
  const isAdditionalInsurance = params?.isAdditionalInsurance

  const RSPAJUserDataType: IOCRUserDataType = useMemo(() => {
    return isPrimaryInsurance
      ? 'primaryInsurance'
      : isAdditionalInsurance
        ? 'additionalInsurance'
        : isPayor
          ? 'payor'
          : 'polis';
  }, [isPrimaryInsurance, isPayor]);

  const stringNavigationEposByUserDataType = {
    primaryInsurance: EposRoutes.SPAJ_DOC_PRIMARY_PARTICIPANT_CANDIDATE,
    payor: EposRoutes.SPAJ_DOC_PREMIUM_PAYOR,
    polis: EposRoutes.SPAJ_DOC_PROSPECTIVE_POLICYHOLDER,
    additionalInsurance: EposRoutes.SPAJ_DOC_PRIMARY_PARTICIPANT_CANDIDATE,
  };

  const isTest = RSPAJData?.policyHolderData && isEmailAutomation(JSON.parse(RSPAJData?.policyHolderData));


  const onCapture = useCallback(
    (base64Value: string) => {
      let base64 = base64Value
      if (isTest) base64 = ocrDummy
      setBase64Img(base64);
    },
    [base64Img],
  );

  const onShowPhotoGuide = () => {
    setIsBottomSheetVisible(true);
  };

  const onManualPhotoRedirected = (): void => {
    lockOrientationLandscape()
    const navigationReplace = stringNavigationEposByUserDataType[RSPAJUserDataType];
    navigation.dispatch(
      StackActions.replace(navigationReplace, {
        ...params,
        isOcrManual: true,
      }),
    );
  }

  const processPrivyOCRKTP = async (isSkip?: boolean): TFNProcessPrivyOCRKTP => {
    let ocrStatus = '';
    const navigationData = {
      route: '',
      params: {}
    };
    const privyDataResponse: { data: any; status: number | undefined } = {
      data: '',
      status: undefined
    };
    const trId = `TRX${Math.floor(new Date().getTime() / 1000)}${spajId}`.toUpperCase();
    const { data, status } = await privyOcr({ trId: trId, ktp: base64Img });
    if (isTest) {
      const data = getOcrDummy();
      const spajData = setDataSPAJOCR(data);
      await setToRealms(spajData);
      navigationData.route = EposRoutes.SPAJ_DOC_PROSPECTIVE_POLICYHOLDER_OCR_COMPARE;
      navigationData.params = { ...params };
    } else if (status === 422 && totalRePhotoRetry < 1) {
      ocrStatus = 'failedErrorKTP';
    } else if ((status === 422 && totalRePhotoRetry >= 1) || isSkip === false) {
      ocrStatus = 'failedErrorKTPRetry';
    } else if ((status === 200 && !data && totalRePhotoRetry < 1)) {
      ocrStatus = 'failedErrorKTP';
    } else if (status === 200 || isSkip) {
      const spajData: ISPAJData = setDataSPAJOCR(data);
      privyDataResponse.data = spajData;
      privyDataResponse.status = status;
      navigationData.route = EposRoutes.SPAJ_DOC_PROSPECTIVE_POLICYHOLDER_OCR_COMPARE;;

      navigationData.params = { ...params };

    } else {
      ocrStatus = 'failedServer';
    }

    return {
      ocrStatus: ocrStatus,
      navigationData: navigationData,
      privyData: privyDataResponse
    }
  }

  const onConfirm = async (isSkip?: boolean, isManualPhoto = false) => {
    setIsLoading(true);
    if (isManualPhoto) {
      setIsLoading(false);
      onManualPhotoRedirected();
    } else {
      const { navigationData, ocrStatus, privyData } = await processPrivyOCRKTP(isSkip);
      setOcrStatus(ocrStatus);
      setIsLoading(false);
      if (privyData.status === 200) {
        await setToRealms(privyData.data);
      }
      if (navigationData.route && !isEmpty(navigationData)) {
        lockOrientationLandscape()
        navigation.dispatch(
          StackActions.replace(navigationData.route, navigationData.params),
        );
      }
    }
  };

  const setToRealms = async (data: ISPAJData) => {
    await onUpdateSPAJ(data);
  }

  const setDataSPAJOCR = (data: any): ISPAJData => {
    return {
      ...RSPAJData?.toJSON(),
      spajOcr: JSON.stringify({
        ...RSPAJOcr,
        [RSPAJUserDataType]: {
          isFinish: false,
          imgBase64: base64Img,
          ocrResult: data?.result || '',
        },
      }),
    } as ISPAJData;
  }

  const onRePhoto = async () => {
    if (RSPAJData?.spajOcr && !isEmpty(RSPAJData.spajOcr)) {
      const _spajData = {
        ...RSPAJData?.toJSON(),
        spajOcr: JSON.stringify({
          ...RSPAJOcr,
          [RSPAJUserDataType]: {},
        }),
      } as ISPAJData;

      return {
        spajData: _spajData,
      }
    }

    return {
      spajData: null
    }
  };
  const getDeviceIpad = () => {

    const platformContents = Platform.constants;
    if (platformContents?.systemName == 'iPadOS') return true
    return false
  }

  const lockOrientationLandscape = () => {

    if (getDeviceIpad() && routes.name == EposRoutes.SPAJ_DOC_PROSPECTIVE_POLICYHOLDER_OCR) {
      Orientation.lockToLandscape();
    }
  }

  useEffect(() => {
    if (['LANDSCAPE-LEFT', 'LANDSCAPE-RIGHT', 'LANDSCAPE'].includes(Orientation.getInitialOrientation())) {
      Orientation.lockToPortrait();
      setIsIpad(true);
    }
    const backHandler = BackHandler.addEventListener('hardwareBackPress', onHeaderPressed);

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    if (getDeviceIpad() && !base64Img) {
      Orientation.lockToPortrait();
    }
  }, [base64Img])

  const onHeaderPressed = () => {

    if (!base64Img) {
      lockOrientationLandscape()
      const navigationReplace = stringNavigationEposByUserDataType[RSPAJUserDataType];
      navigation.dispatch(StackActions.replace(navigationReplace, {
        isAdditionalInsurance: isAdditionalInsurance
      }));
    } else {
      setBase64Img('');
    }

    return true;
  };

  useEffect(() => {
    if (ocrStatus) setIsBottomSheetVisible(true);
  }, [ocrStatus]);

  // this FN is for when get an error for privy for render bottomSheet Content
  const cantConnectToPrivy = (statusCode: number | string) => {
    const selectedStatusCode = totalRetry >= 1 ? '500_retry' : statusCode;
    const textByStatusCode: any = {
      500: {
        isContentHeader: false,
        buttonText: 'Coba Lagi',
        desctiptionText: 'Maaf, terjadi masalah saat menghubungkan ke Server. Silahkan Coba lagi.',
        callBackOnPress: () => {
          setOcrStatus('');
          setIsBottomSheetVisible(false);
          setTotalRetry(totalRetry + 1);
          onConfirm();
        },
      },
      '500_retry': {
        isContentHeader: false,
        buttonText: 'Lewatkan',
        desctiptionText:
          'Maaf, terjadi masalah saat menghubungkan ke Server. Anda tidak dapat melakukan Verifikasi KTP untuk sementara.',
        callBackOnPress: () => {
          setOcrStatus('');
          setIsBottomSheetVisible(false);
          onConfirm(false, true);
        },
      },
      422: {
        isContentHeader: true,
        titleText: 'Foto E-KTP Tidak Jelas',
        descriptionText:
          'Foto KTP Anda tidak terlihat jelas. Silakan ambil foto ulang dengan memperhatikan hal-hal berikut:',
        buttonText: 'Ulangi Foto',
        callBackOnPress: async () => {
          setOcrStatus('');
          setIsBottomSheetVisible(false);
          setTotalRePhotoRetry(totalRePhotoRetry + 1);
          if (totalRePhotoRetry >= 1) {
            onConfirm(true);
          } else {
            onRePhotoTriggered();
          }
        },
      },
    };

    const bottomSheetCantConnectType: TBottomSheetContentOCR = {
      contentHeader: (
        <View style={[plaiStyles.mb10]}>
          <Pressable onPress={() => { }}>
            {/* <LottieView source={require('../../../assets/exclamation.json')} autoPlay style={{ width: 80, height: 80 }} /> */}
            {/* <Image source={taskfailed} style={{ width: 40, height: 40 }} /> */}
          </Pressable>
          {textByStatusCode[selectedStatusCode].isContentHeader && (
            <View style={[plaiStyles.mt14]}>
              <Text style={[plaiStyles.font18, plaiStyles.lineH24, plaiStyles.fontBold, plaiStyles.fontBlack]}>
                {textByStatusCode[selectedStatusCode].titleText}
              </Text>
              <Text style={[plaiStyles.mt10, plaiStyles.font14, plaiStyles.lineH20]}>
                {textByStatusCode[selectedStatusCode].descriptionText}
              </Text>
            </View>
          )}
        </View>
      ),
      bodyContent: !textByStatusCode[selectedStatusCode].isContentHeader ? (
        <View style={[plaiStyles.mb24, plaiStyles.mt12]}>
          <Text style={[plaiStyles.fontBold, plaiStyles.mb12]}>Tidak Dapat Terhubung</Text>
          <Text>Maaf, terjadi masalah saat menghubungkan ke Server. Silahkan Coba lagi.</Text>
        </View>
      ) : null,
      footerContent: (
        <View>
          <Button
            text={textByStatusCode[selectedStatusCode].buttonText}
            onPress={() => textByStatusCode[selectedStatusCode].callBackOnPress()}
          />
        </View>
      ),
    };

    return bottomSheetCantConnectType;
  };

  const ocrBottomSheetContents = (ocrStatus: string) => {
    const ocrBottomSheetContentsObj: any = {
      success: { bodyContent: null, footerContent: null, contentHeader: null },
      failedServer: cantConnectToPrivy(500),
      failedErrorKTP: cantConnectToPrivy(422),
      failedErrorKTPRetry: cantConnectToPrivy('500_retry')
    };

    return ocrBottomSheetContentsObj[ocrStatus]
  }

  const onRePhotoTriggered = async () => {
    const { spajData } = await onRePhoto();
    if (spajData) await setToRealms(spajData);
    setTotalRetry(0);
    setOcrStatus('');
    setBase64Img('');
  }

  return (
    <PruScreen backgroundColor={PruColor.white} enabled={false}>
      <>
        {isLoading ? (
          <PruActivityIndicator style={[plaiStyles.mt32, plaiStyles.flex, plaiStyles.justifyCenter]} />
        ) : (
          <View style={[plaiStyles.spacing, plaiStyles.flex, plaiStyles.mt20]}>
            <View style={[plaiStyles.mb32, plaiStyles.mt24]}>
              <Icon name={`${!base64Img ? 'close' : 'arrowleft'}`} size={26} onPress={onHeaderPressed} />
            </View>
            <Text style={[plaiStyles.font20, plaiStyles.fontBold, plaiStyles.fontBlack, plaiStyles.lineH24]}>
              {!base64Img ? 'Foto E-KTP' : 'Konfirmasi Photo'}
            </Text>
            <View>
              {!base64Img ? (
                <>
                  <Text
                    style={[
                      plaiStyles.font16,
                      plaiStyles.fontBlackThin,
                      plaiStyles.lineH20,
                      plaiStyles.mb10,
                      plaiStyles.mt4,
                    ]}
                  >
                    Posisikan sisi depan E-KTP Calon Pemegang Polis di dalam kotak dan pastikan semua data terlihat
                    jelas serta cukup cahaya.
                  </Text>
                  <Pressable onPress={() => onShowPhotoGuide()}>
                    <Text style={[plaiStyles.font16, plaiStyles.fontRedBold, plaiStyles.lineH20, plaiStyles.mb24]}>
                      Lihat Panduan Verifikasi KTP
                    </Text>
                  </Pressable>
                </>
              ) : (
                <Text
                  style={[
                    plaiStyles.font16,
                    plaiStyles.fontBlackThin,
                    plaiStyles.lineH20,
                    plaiStyles.mb10,
                    plaiStyles.mt4,
                  ]}
                >
                  Pastikan semua data terlihat jelas serta cukup cahaya.
                </Text>
              )}
            </View>

            <View>
              <EposCameraVision type="ktp" onCapture={onCapture} base64Img={base64Img} />
            </View>
          </View>
        )}
        {base64Img && (
          <View
            style={[
              plaiStyles.py14,
              plaiStyles.px20,
              plaiStyles.borderTop,
              {
                position: 'absolute',
                bottom: 0,
                width: '100%',
              },
            ]}
          >
            <View
              style={[plaiStyles.flex, plaiStyles.flexWrap, plaiStyles.row, plaiStyles.justifyBetween, plaiStyles.px16]}
            >
              <View style={[plaiStyles.selfCenter, plaiStyles.ml12]}>
                <Pressable disabled={isLoading} onPress={onRePhotoTriggered}>
                  <Text>Foto Ulang</Text>
                </Pressable>
              </View>
              <View style={[{ width: '40%' }]}>
                <Button disabled={isLoading} onPress={() => onConfirm()}>
                  Konfirmasi
                </Button>
              </View>
            </View>
          </View>
        )}
        {isBottomSheetVisible && (
          <BottomSheetOCR
            isVisible={isBottomSheetVisible}
            setIsVisible={(visible: boolean) => {
              if (!ocrStatus) setIsBottomSheetVisible(visible)
            }}
            titleHeader="Panduan Verifikasi KTP"

            content={
              ocrStatus
                ? ocrBottomSheetContents(ocrStatus)
                : { bodyContent: null, footerContent: null, contentHeader: null }
            }
          />
        )}
      </>
    </PruScreen>
  );
};
