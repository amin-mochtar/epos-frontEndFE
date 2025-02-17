import { View, BackHandler } from 'react-native';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { LoadingFull, plaiStyles } from 'plai_common_frontend';
import { EposRoutes } from '../../../navigation';
import { StackActions, useNavigation } from '@react-navigation/native';
import { PruColor, PruScreen } from 'common_ui_components';
import { EposFooter, EposHeader, NumberTitle } from '../../../components';
import { useTranslation } from 'react-i18next';
//@ts-ignore
import { CaseAnswerType, NavigationItem } from './spaj-life-style.type';
import {
  magnumGetCaseAnswers,
  magnumResumeCase,
  magnumStartCase,
  magnumStartUp,
  magnumSyncRuleBase,
  magnumGetNavigation,
  ISPAJData,
  ISQSDetail,
} from '../../../utilities';
//@ts-ignore
import MagnumWebview from 'react-native-magnum-plugin';
import { useSelector } from 'react-redux';
//@ts-ignore
import { RootState } from 'redux/reducer';
import { EposState } from '../../../redux';
import { useEposRealm, useObject } from '../../../database';
import { useMappingBootstrap } from '../../../hooks';

export const SPAJLifeStyleScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { proposalId, spajId, selectedSQSId } = useSelector<RootState, EposState>((state) => state.epos);
  const RSPAJData = useObject<ISPAJData>('SPAJData', spajId as never);
  const RSQSData = useObject<ISQSDetail>('SQSDetail', selectedSQSId as never);
  const { updateSPAJStatusSubMenu, getSummaryProposalById } = useEposRealm();
  const DataCompleteness = RSPAJData?.DataCompleteness
  const RSummaryProposal = getSummaryProposalById(proposalId);
  const { _mappingBootstrap } = useMappingBootstrap();
  const [routeNavigation, setRouteNavigation] = useState<NavigationItem[]>([]);

  const CONTAINER_ID = 'magnum-container';
  const _magnumRef = useRef();
  const [magnumForm, setMagnumForm] = useState({
    caseId: '',
    data: undefined,
    isFullUW: false,
    isCompletion: false,
    isResubmit: false,
    isLoading: false,
    isInterview: false,
  });
  const [indexPage, setIndexPage] = useState(1);
  const [loading, setLoading] = useState(true);

  const clientIndex = useMemo(() => {
    let clientIndex = 0
    const isPrucerah = ['E1O', 'E1OP'].includes(RSQSData?.product?.key ?? '')

    if (isPrucerah) {
      clientIndex = 1
    }

    return clientIndex
  }, [])

  const initMagnumData = { caseId: proposalId, formUuid: RSQSData?.isGIO ? '423bb70a-f787-43cf-b721-1ce241b8db03' : '21b8b2bf-79b4-42a2-b39e-778e02356dff', lifeIndex: clientIndex };

  useEffect(() => {
    initial();

    const backHandler = BackHandler.addEventListener('hardwareBackPress', onBack);

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    setIndexPage(routeNavigation?.findIndex((data: any) => {
      return data.Uuid == magnumForm.data?.formUuid
    }) + 1)
  }, [magnumForm]);

  const enumNavigation = (data: any) => {
    data.Data.NavigationList.forEach((item: NavigationItem) => {
      const routeId = DataCompleteness?.find((list) => list.key == item.Uuid)?.key;
      if (item.Progress == 100) {
        updateSPAJStatusSubMenu(spajId, routeId ?? '', {
          key: 'status',
          value: true,
        });
        return
      }
      updateSPAJStatusSubMenu(spajId, routeId ?? '', {
        key: 'status',
        value: false,
      });
    });
  };

  const initial = async () => {
    await resumeMagnum(proposalId);
    const _magnumForm: CaseAnswerType | any = await magnumGetCaseAnswers(proposalId);
    setMagnumForm({ ...magnumForm, caseId: proposalId, isFullUW: !!_magnumForm.Data.LifeList[clientIndex].Forms.length });
    const navigationLife = await magnumGetNavigation(proposalId, clientIndex);
    setRouteNavigation(navigationLife.Data.NavigationList);
    enumNavigation(navigationLife);
    await loadLifeStyleScreen();
  };

  const nextHandle = async () => {
    const confirmationSQS = RSPAJData?.confirmationSQS ? JSON.parse(RSPAJData.confirmationSQS) : ''
    if (magnumForm.data) {
      _magnumRef.current!.saveForm();
      let tempData = JSON.parse(JSON.stringify(magnumForm.data!));
      const nextRoute = routeNavigation?.findIndex((navigation: NavigationItem) => {
        return navigation.Uuid == magnumForm?.data?.formUuid
      })
      if (routeNavigation != undefined && nextRoute != undefined && routeNavigation[nextRoute + 1]) {
        tempData.formUuid = routeNavigation[nextRoute + 1].Uuid;
        loadUnderwritingFormScreen(tempData);
      } else {
        // SPAJ_TOPUP
        if (confirmationSQS?.premiumPaymentCandidate == 'N') {
          navigation.dispatch(StackActions.replace(EposRoutes.SPAJ_PREMIUM_PAYER_CANDIDATE));
        } else {
          navigation.dispatch(StackActions.replace(EposRoutes.SPAJ_TOPUP));
        }
      }
    } else {
      loadUnderwritingFormScreen(initMagnumData);
    }
    const navigationLife = await magnumGetNavigation(proposalId, clientIndex);
    enumNavigation(navigationLife);
  };

  const onBack = () => {
    handleBack();
    return true;
  };

  const handleBack = async () => {
    if (magnumForm.data) {
      _magnumRef.current!.saveForm();
      let tempData = JSON.parse(JSON.stringify(magnumForm.data!));
      const nextRoute = routeNavigation?.findIndex((navigation: NavigationItem) => {
        return navigation.Uuid == magnumForm?.data?.formUuid
      })
      if (routeNavigation != undefined && nextRoute != undefined && routeNavigation[nextRoute - 1]) {
        tempData.formUuid = routeNavigation[nextRoute - 1].Uuid;
        loadUnderwritingFormScreen(tempData);
      } else {
        setMagnumForm({ ...magnumForm, data: undefined, isInterview: false });
        await loadLifeStyleScreen();
      }
    } else {
      navigation.dispatch(StackActions.replace(EposRoutes.SPAJ_DATA_COMPLETENESS));
    }
    const navigationLife = await magnumGetNavigation(proposalId, clientIndex);
    enumNavigation(navigationLife);
  };

  const loadUnderwritingFormScreen = (data: any) => {

    setMagnumForm({ ...magnumForm, data: data, isInterview: true });
    _magnumRef.current!.loadUrl('magnum-assets/interview-form.html', () => {
      _magnumRef.current!.initMagnumApp(
        {
          containerId: CONTAINER_ID,
          language: 'id_ID',
          primaryColor: RSummaryProposal?.shariaFlag == 'sharia' ? null : '#E8192C',
          data,
        },
        (error: any) => { },
      );
    });
  };

  const loadLifeStyleScreen = () => {
    _magnumRef.current!.loadUrl(
      'magnum-assets/life-selection.html',
      () => {

        _magnumRef.current!.onBaseFormClick((data: any) => {
          loadUnderwritingFormScreen(data, 'tesss');
        });
        _magnumRef.current!.initMagnumApp(
          {
            containerId: CONTAINER_ID,
            language: 'id_ID',
            primaryColor: RSummaryProposal?.shariaFlag == 'sharia' ? null : '#E8192C',
            data: {
              caseId: proposalId,
            },
          },
          (error: any) => {
            console.log(error);
          },
        );
      },
      (errors: any) => {
        // TODO ERROR
      },
    );
  };

  const resumeMagnum = async (proposalId: string) => {
    try {
      await magnumResumeCase(proposalId);
    } catch (resumeError) {
      // TODO CATCH ERROR
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading && <LoadingFull />}
      <PruScreen backgroundColor={PruColor.white}>
        <>
          <View style={[plaiStyles.spacing]}>
            <EposHeader onPressSpajCompleteness={onBack} />
            <NumberTitle
              number="2"
              text={magnumForm.data && !RSQSData?.isGIO ? `${indexPage}/${routeNavigation.length} ${t('Epos:health_data')}` : t('Epos:health_data')}
            />
          </View>
          <MagnumWebview
            ref={_magnumRef as any}
            key={CONTAINER_ID}
            containerId={CONTAINER_ID}
            style={plaiStyles.flex}
          />
          <EposFooter
            position={6}
            leftButton={{
              onPress: handleBack,
            }}
            rightButton={{
              disabled: false,
              onPress: () => nextHandle(),
            }}
          />
        </>
      </PruScreen>
    </>
  );
};
