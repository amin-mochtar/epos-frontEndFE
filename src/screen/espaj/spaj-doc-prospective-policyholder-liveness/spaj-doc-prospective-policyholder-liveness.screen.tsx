import Icon from 'react-native-vector-icons/AntDesign';
import { GlobalPromptModal, ModalInformation, plaiStyles } from 'plai_common_frontend';
import { useEffect, useMemo, useState } from 'react';
import { View, Text, BackHandler } from 'react-native';
import WebView from 'react-native-webview';
import { useNavigation, StackActions, useRoute } from '@react-navigation/native';
import { EposRoutes } from '../../../navigation';
import { PruActivityIndicator, PruScreen } from 'common_ui_components/app/components';
import { PruColor } from 'common_ui_components';
import { getPrivyLandingUrlLiveness } from '../../../network';
import { isEmpty } from 'lodash';
import { useEposRealm } from '../../../database';
import { useObject } from '../../../database/epos-database';
import { EposState } from '../../../redux';
import { RootState } from 'redux/reducer';
import { useSelector } from 'react-redux';
import md5 from 'crypto-js/md5';
import encBase64 from 'crypto-js/enc-base64';
import { TDataLivenessResponse, TDecodedResponse, TLivenessResponse, TResponseLandingUrl } from './spaj-doc-prospective-policyholder-liveness.type';
import moment from 'moment';
import { WebViewErrorEvent, WebViewMessageEvent } from 'react-native-webview/lib/WebViewTypes';
import { livenessDummy } from './liveness-dummy';
import { IOCRUserDataType } from '../spaj-doc-prospective-policyholder-ocr/ocr.type';
import { isEmailAutomation, ISPAJData, ISQSDetail } from '../../../utilities';

export const SPAJDocProspectivePolicyholderLivenessScreen = () => {

  const { onUpdateSPAJ } = useEposRealm();
  const route = useRoute();

  const params = route.params as { isPrimaryInsurance: boolean; isPayor: boolean; isAdditionalInsurance: boolean } | undefined;
  const navigation = useNavigation();
  const isPrimaryInsurance = params?.isPrimaryInsurance;
  const isAdditionalInsurance = params?.isAdditionalInsurance;
  const isPayor = params?.isPayor;
  const { spajId } = useSelector<RootState, EposState>((state) => state.epos);
  const RSPAJData = useObject<ISPAJData>('SPAJData', spajId as never);
  const RSPAJLiveness = RSPAJData?.spajLiveness && JSON.parse(RSPAJData?.spajLiveness);
  const [seconds, setSeconds] = useState(240);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [urlPrivy, setUrlPrivy] = useState<string>('');
  const [isFirstRun, setIsFirstRun] = useState<boolean>(true);

  const RSPAJUserDataType: IOCRUserDataType = useMemo(() => {
    return isPrimaryInsurance
      ? 'primaryInsurance'
      : isAdditionalInsurance
        ? 'additionalInsurance'
        : isPayor
          ? 'payor'
          : 'polis';
  }, [isPrimaryInsurance, isPayor]);
  let retry = 0;
  const runFirst = `
    window.addEventListener('message', function(event) {
      var data = event.data;
      if (data && data.source === 'privypass_liveness') {
        window.ReactNativeWebView.postMessage(JSON.stringify(data));
      }
    });
  `;

  const stringNavigationEposByUserDataType = {
    primaryInsurance: EposRoutes.SPAJ_DOC_PRIMARY_PARTICIPANT_CANDIDATE,
    payor: EposRoutes.SPAJ_DOC_PREMIUM_PAYOR,
    polis: EposRoutes.SPAJ_DOC_PROSPECTIVE_POLICYHOLDER,
    additionalInsurance: EposRoutes.SPAJ_DOC_PRIMARY_PARTICIPANT_CANDIDATE,
  };

  const isTest = RSPAJData?.policyHolderData && isEmailAutomation(JSON.parse(RSPAJData?.policyHolderData));

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (urlPrivy) {
      timer = setInterval(() => {
        setSeconds((prevSeconds) => {
          if (prevSeconds === 0) {
            clearInterval(timer);
            handleTimeout();
            return prevSeconds;
          }
          return prevSeconds - 1;
        });
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [urlPrivy]);

  useEffect(() => {
    if (isTest) {
      const data = {
        errors: [],
        face_1: livenessDummy,
        face_2: '',
        fc_token: '',
        message: '',
        result: true,
        timeout: false,
        transaction_id: '123456',
      }

      setTimeout(() => {
        save(data)
      }, 3000);
    }

    const backHandler = BackHandler.addEventListener('hardwareBackPress', onBack);

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    getLandingUrlUser();
  }, []);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const handleTimeout = () => {
    onBack({ livenessVerif: false });
  };

  const handleMessage = (event: WebViewMessageEvent) => {
    const message = event.nativeEvent.data;
    const eventLoading = event.nativeEvent.loading;
    try {
      const response: TLivenessResponse = JSON.parse(message);
      if (response.source === 'privypass_liveness') {
        if (response?.data?.result && eventLoading === false && isFirstRun) {
          // const fc_token = response.data.fc_token;
          // const { base64Img } = getBase64DecodeHash(fc_token)
          save(response?.data);
        }
      }
    } catch (error) {
      console.error('Error parsing message:', error);
    }
  };

  const setSPAJData = (data: TDataLivenessResponse) => {
    return {
      ...RSPAJData?.toJSON(),
      spajLiveness: JSON.stringify({
        ...RSPAJLiveness,
        [RSPAJUserDataType]: {
          imgBase64: data.face_1,
          livenessResult: data,
        },
      }),
    }
  }

  const save = async (data: TDataLivenessResponse) => {
    const _spajData = setSPAJData(data);
    setIsFirstRun(false);
    await onUpdateSPAJ(_spajData as ISPAJData);
    onBack();
  };

  const generateParamsLiveness = () => {
    const bodyMd5 = md5('').toString(encBase64);
    const timeStamp = moment().format('YYYY-MM-DDTHH:mm:ssZ');
    return { body_md5: bodyMd5, timestamp: timeStamp };
  };

  const getLandingUrlUser = async () => {
    setIsLoading(true);
    const params = generateParamsLiveness();
    const response = await getPrivyLandingUrlLiveness(params);
    const resData: TResponseLandingUrl = response?.data as TResponseLandingUrl;
    if (resData && !isEmpty(resData) && resData?.code === 200) {
      const data = resData?.data;
      setUrlPrivy(data?.user_landing_url);
      setIsLoading(false);
    } else {
      if (retry <= 3) {
        retry += 1;
        await getLandingUrlUser();
      } else {
        setIsLoading(false);
        retry = 0;
        setIsVisible(true);
      }
    }
  };

  /**
   * Get Base64 by Decoded Hash From BE
   * Comment first for future feature (new SDK Liveness)
   * @returns base64String image
   */
  // const getBase64DecodeHash = async (params: string) => {
  //   const response = await getBase64DecodeImg(params);
  //   const resData: TDecodedResponse | undefined = response?.data as TDecodedResponse;
  //   return resData.additional.face_1_hash;
  // }

  const mappingNavigationByParams = () => {
    return stringNavigationEposByUserDataType[RSPAJUserDataType];
  }

  const onBack = (params?: any) => {
    const selectedNavigation = mappingNavigationByParams();
    navigation.dispatch(StackActions.replace(selectedNavigation, {
      ...params,
      isAdditionalInsurance
    }));
    return true;
  };

  const handleOnError = (e: WebViewErrorEvent) => {
    setIsVisible(true);
  };

  return (
    <PruScreen backgroundColor={PruColor.white}>
      <>
        {isLoading ? (
          <PruActivityIndicator style={[plaiStyles.mt32, plaiStyles.flex, plaiStyles.justifyCenter]} />
        ) : (
          <View>
            <View
              style={[
                plaiStyles.row,
                plaiStyles.justifyBetween,
                plaiStyles.mt20,
                plaiStyles.px12,
                plaiStyles.pb12,
                plaiStyles.borderbf0,
              ]}
            >
              <Icon name={`close`} size={20} onPress={onBack} />
              <Text style={[plaiStyles.fontBlackBold, plaiStyles.font16, plaiStyles.lineH20]}>Liveness</Text>
              <View
                style={[
                  plaiStyles.px12,
                  plaiStyles.py4,
                  plaiStyles.blockingCard
                ]}
              >
                <Text style={[plaiStyles.fontRedBold, plaiStyles.font16]}>{formatTime(seconds)}</Text>
              </View>
            </View>
            <View style={[plaiStyles.w100, { height: '90%' }]}>
              {urlPrivy && (
                <WebView
                  originWhitelist={['*']}
                  userAgent="Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.97 Safari/537.36"
                  source={{ uri: urlPrivy }}
                  style={plaiStyles.flex}
                  allowsInlineMediaPlayback={true}
                  mediaPlaybackRequiresUserAction={false}
                  startInLoadingState={true}
                  javaScriptEnabled
                  onError={handleOnError}
                  injectedJavaScript={runFirst}
                  onMessage={handleMessage}
                  allow="camera;microphone"
                />
              )}
            </View>
          </View>
        )}
        <ModalInformation
          visible={isVisible}
          title={'Error'}
          desc={'Terdapat masalah pada server, silahkan mencoba lagi dengan manual.'}
          buttonPrimary={{
            text: 'Ok',
            onPress: () => {
              setIsVisible(false);
              setTimeout(() => {
                onBack({
                  livenessVerif: false,
                  serverError: true,
                })
              }, 350)
            },
          }}
        />
      </>
    </PruScreen>
  );
};
