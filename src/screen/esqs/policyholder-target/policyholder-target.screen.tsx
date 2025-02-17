import { Text, ScrollView, View, BackHandler } from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { EposFooter, EposHeader, OptionCard, HeaderTitle } from '../../../components';
import { ISQSDetail, QINSURED_TARGET, TLifeAssuredSelf } from '../../../utilities';
import { EposRoutes } from '../../../navigation';
import { isEmpty } from 'lodash';
import { PruColor, PruScreen } from 'common_ui_components';
import { plaiStyles } from 'plai_common_frontend';
import { useDispatch, useSelector } from 'react-redux';
import { EposState, updateSqs } from '../../../redux';
import { RootState } from 'redux/reducer';
import { useEposRealm, useObject } from '../../../database';
import { RouteProp, StackActions, useFocusEffect, useNavigation, useRoute } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';

interface RouteParams {
  lifeAssuredIndex?: number;
}

type InitRouteProp = RouteProp<{ params: RouteParams }, 'params'>;

export const PolicyHolderTargetScreen = () => {
  const navigation = useNavigation();
  const route = useRoute<InitRouteProp>();
  const { t } = useTranslation();
  const { sqsData, selectedSQSId, proposalId, isDoksul } = useSelector<RootState, EposState>((state) => state.epos);
  const { onUpdateSQS, updateSummaryByKey } = useEposRealm();
  const RSQSData = useObject<ISQSDetail>('SQSDetail', selectedSQSId as never);
  const [lifeAssuredSelf, setLifeAssuredSelf] = useState<TLifeAssuredSelf | string>('');
  const dispatch = useDispatch();

  // primary matrix for conditioning
  const lifeAssuredIndex = route.params?.lifeAssuredIndex ?? 1;

  const assuredOptions = useMemo(() => {
    let result = QINSURED_TARGET
    if (lifeAssuredIndex != 1) {
      result = result.map(i => {
        return {
          ...i,
          detail: i.detail.replace('tertanggung', 'peserta tambahan 1')
        }
      })
    };
    return result
  }, [])

  useEffect(() => {
    const isObjectValid = RSQSData?.isValid()
    let selected = ''
    if (isObjectValid) {
      selected = RSQSData?.lifeAssuredSelf || sqsData?.lifeAssuredSelf as TLifeAssuredSelf;
      if (lifeAssuredIndex != 1) {
        selected = RSQSData?.additionalLifeAssuredSelf as TLifeAssuredSelf ?? sqsData?.additionalLifeAssuredSelf as TLifeAssuredSelf;
      }
    } else if(sqsData?.lifeAssuredSelf){
      //CONDITION NO RSQS, but Exist on REDUX
      selected = sqsData?.lifeAssuredSelf
    }
    setLifeAssuredSelf(selected);
    // Back Device
    const backHandler = BackHandler.addEventListener('hardwareBackPress', onBack);

    return () => backHandler.remove();
  }, []);

  const onBack = () => {
    let backRoute = EposRoutes.PREVIOUSLY_OWNED_POLICY;
    if (lifeAssuredIndex != 1) backRoute = EposRoutes.PRODUCT_RECOMMENDATION;
    onSave(backRoute);
    navigation.dispatch(StackActions.replace(backRoute));
    return true;
  };

  const onSave = async (route?: string) => {
    if (selectedSQSId && !isDoksul && RSQSData) {
      let lastState = EposRoutes.INSURANCE_GOALS;
      let updatedAssuredSelf: Partial<ISQSDetail> = {
        lifeAssuredSelf: lifeAssuredSelf,
      };

      if (lifeAssuredIndex != 1) {
        lastState = EposRoutes.MAIN_INSURED_DATA;
        updatedAssuredSelf = {
          additionalLifeAssuredSelf: lifeAssuredSelf,
        };
      }

      let _clientId = [...(RSQSData?.clientIdSelected || [])];

      // reset user on additional assured on assured self change
      if (lifeAssuredIndex != 1 && lifeAssuredSelf == 'other' && RSQSData?.additionalLifeAssuredSelf == 'self') {
        _clientId[2] = '';
      } else if (
        lifeAssuredIndex != 1 &&
        lifeAssuredSelf == 'self' &&
        RSQSData?.additionalLifeAssuredSelf == 'other'
      ) {
        _clientId[2] = '';
      } else if (
        lifeAssuredIndex != 1 &&
        lifeAssuredSelf == 'self' &&
        RSQSData?.clientIdSelected[0] != RSQSData?.clientIdSelected[2]
      ) {
        _clientId[2] = '';
      }


      const _sqsData = {
        ...RSQSData?.toJSON(),
        updatedAssuredSelf,
        ...updatedAssuredSelf,
        clientIdSelected: _clientId,
      } as ISQSDetail;

      onUpdateSQS(_sqsData!);
      updateSummaryByKey(proposalId, {
        key: 'lastState',
        value: route || lastState,
      });
    } else {
      const key = lifeAssuredIndex != 1 ? 'additionalLifeAssuredSelf' : 'lifeAssuredSelf';
      dispatch(updateSqs({ key, payload: lifeAssuredSelf }));
    }
  };

  const onContinue = () => {
    let nextRoute = EposRoutes.INSURANCE_GOALS;
    let params = undefined;
    if (lifeAssuredIndex != 1) {
      nextRoute = EposRoutes.MAIN_INSURED_DATA;
      params = {
        lifeAssuredIndex: lifeAssuredSelf == 'self' ? 0 : 2,
      };
    }
    onSave(nextRoute);
    navigation.dispatch(StackActions.replace(nextRoute, params));
  };

  useFocusEffect(useCallback(()=>{
    if(sqsData.lifeAssuredSelf){
      setLifeAssuredSelf(sqsData.lifeAssuredSelf)
    }
  },[sqsData.lifeAssuredSelf]))

  return (
    <PruScreen backgroundColor={PruColor.greybg}>
      <View style={[plaiStyles.px16, plaiStyles.flex]}>
        <EposHeader />
        <ScrollView>
          <HeaderTitle
            title={
              !(lifeAssuredIndex != 1) ? t('Epos:policy_holder_targer_header_title') : t('Epos:additional_insured')
            }
            titleStyle={plaiStyles.fontHeaderTitle}
            descriptionTitle={
              !(lifeAssuredIndex != 1)
                ? t('Epos:policy_holder_target_header')
                : `Pilih ${t('Epos:additional_insured')}`
            }
            descriptionStyle={[plaiStyles.fontHeaderSubTitle, plaiStyles.mt8]}
          />
          <OptionCard
            style={plaiStyles.mt12}
            data={assuredOptions}
            selected={lifeAssuredSelf}
            onSelected={(value) => setLifeAssuredSelf(value.key as TLifeAssuredSelf)}
            uniqueTestId='life-assured-self'
          />
        </ScrollView>
      </View>
      <EposFooter
        position={lifeAssuredIndex != 1 ? 8 : 2}
        leftButton={{
          onPress: onBack,
        }}
        rightButton={{
          disabled: isEmpty(lifeAssuredSelf),
          onPress: onContinue,
        }}
      />
    </PruScreen>
  );
};
