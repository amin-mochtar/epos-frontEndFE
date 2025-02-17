import { View, Text, Dimensions } from 'react-native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { PruColor, PruScreen } from 'common_ui_components';
import { plaiStyles } from 'plai_common_frontend';
import { DoksulHeader } from '../../../components';
import { StackActions, useNavigation, useRoute } from '@react-navigation/native';
import { SceneMap, TabBar, TabView } from 'react-native-tab-view';
import { EposDoksulRoutes } from '../../../navigation';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../../redux/reducer';
import { EposState } from '../../../redux';
import { useObject } from '../../../database';
import { ISPAJData, ISummaryProposal } from '../../../utilities';
import DoksulDocsScreen from './doksul-docs.screen';
import { getTabRoutes } from './doksul-docs.function';

const indicatorStyle = {
  backgroundColor: 'red',
  padding: 1,
  marginBottom: 2,
};

const DEFAULT_ROUTES = [
  { key: 'policy_holder', title: 'Pemegang Polis' },
  { key: 'primary_insured', title: 'Tertanggung Utama' },
  { key: 'additional_insured', title: 'Peserta Tambahan' },
  { key: 'premium_payor', title: 'Pembayar Premi' },
  { key: 'topup_payor', title: 'Pembayar Top Up' },
]

export const DoksulDocumentScreen = () => {
  const params = useRoute().params as any;
  const { spajId, proposalId } = useSelector<RootState, EposState>((state: any) => state.epos);
  const RSPAJData = useObject<ISPAJData>('SPAJData', spajId as never);
  const SummaryProposal = useObject<ISummaryProposal>('SummaryProposal', proposalId as never);
  const formDoksulExisted = params?.formDoksulExisted

  const refPH = useRef(null);
  const refLA = useRef(null);
  const refTT = useRef(null);
  const refPP = useRef(null);
  const refTP = useRef(null);
  const isMultiCurrencyProduct = ['U17', 'L1W'].includes(SummaryProposal?.productCode!);
  const navigation = useNavigation();
  const [index, setIndex] = useState(0);

  const { ROUTES } = useMemo(() => {
    let ROUTES = DEFAULT_ROUTES;
    if (!Boolean(SummaryProposal?.hasAdditionalLA)) {
      ROUTES = DEFAULT_ROUTES.filter((route) => route.key !== 'additional_insured');
    }
    return { ROUTES };
  }, []);

  const renderRoutes = useMemo(() => {
    if (SummaryProposal?.isDoksulCTA) {
      const routes = formDoksulExisted?.length ? params.formDoksulExisted : getTabRoutes(RSPAJData);
      return mapRoutes(routes);
    }
    return ROUTES;
  }, [formDoksulExisted, SummaryProposal?.isDoksulCTA, RSPAJData]);

  const renderRouteRef = useMemo(() => {
    if (SummaryProposal?.isDoksulCTA) {
      const routes = formDoksulExisted?.length ? params.formDoksulExisted : getTabRoutes(RSPAJData);
      return routes.map((form: any) => {
        switch (form) {
          case 'ph': return refPH;
          case 'la': return refLA;
          case 'tt': return refTT;
          case 'pp': return refPP;
          case 'tp': return refTP;
          default: return null;
        }
      }).filter(Boolean);
    }
    return [refPH, refLA, refPP, refTP, refTT];
  }, [formDoksulExisted, SummaryProposal?.isDoksulCTA, RSPAJData]);

  const handleIndexChange = (updatedIndex: number) => {
    setIndex((prev) => {
      // @ts-ignore
      renderRouteRef?.[prev]?.current?.onSubmitParent();
      return updatedIndex;
    });
  };

  const componentConfig = useMemo(() => ({
    onNext: handleIndexChange,
    routeList: renderRoutes,
  }), []);

  const renderScene = SceneMap({
    // @ts-ignore
    policy_holder: (props) => <DoksulDocsScreen ref={refPH} variant='policy_holder' {...componentConfig} isMultiCurrencyProduct={isMultiCurrencyProduct} {...props} />,
    // @ts-ignore
    primary_insured: (props) => <DoksulDocsScreen ref={refLA} variant='primary_insured' {...componentConfig} isMultiCurrencyProduct={isMultiCurrencyProduct} {...props} />,
    ...(Boolean(SummaryProposal?.hasAdditionalLA) && {
      // @ts-ignore
      additional_insured: (props) => <DoksulDocsScreen ref={refLA} variant='additional_insured' {...componentConfig} {...props} />
    }),
    // @ts-ignore
    premium_payor: (props) => <DoksulDocsScreen ref={refPP} variant='premium_payor' {...componentConfig} isMultiCurrencyProduct={isMultiCurrencyProduct} {...props} />,
    // @ts-ignore
    topup_payor: (props) => <DoksulDocsScreen ref={refTP} variant='topup_payor' {...componentConfig} isMultiCurrencyProduct={isMultiCurrencyProduct} {...props} />,
  });

  const renderTabBar = (props: any) => {
    return (
      <TabBar
        {...props}
        scrollEnabled
        renderLabel={({ focused, route }) => {
          return (
            <Text style={[focused ? plaiStyles.fontBold : plaiStyles.fontGrey66Bold, plaiStyles.font12]}>
              {route.title}
            </Text>
          );
        }}
        indicatorStyle={indicatorStyle}
        style={[plaiStyles.bgwhite]}
      />
    );
  };

  const initialLayout = { width: Dimensions.get('window').width };

  const onBack = useCallback(() => {
    // @ts-ignore
    renderRouteRef?.[index]?.current?.onSubmitParent();
    navigation.dispatch(StackActions.replace(EposDoksulRoutes.DOKSUL, {params: { isBackHomeDoksul: true }}));
  }, [index])

  return (
    <PruScreen backgroundColor={PruColor.white}>
      <>
        <View style={[plaiStyles.spacing, plaiStyles.flex]}>
          <DoksulHeader
            title={'Dokumen Pendukung'}
            onPress={onBack}
          />
          <TabView
            navigationState={{ index, routes: renderRoutes }}
            renderScene={renderScene}
            onIndexChange={handleIndexChange}
            renderTabBar={renderTabBar}
            initialLayout={initialLayout}
          />
        </View>
      </>
    </PruScreen>
  );
};

//#region
function mapRoutes(data: any) {
  let routes: any = []
  data.forEach((form: any) => {
    if (form === 'ph') {
      routes.push(DEFAULT_ROUTES[0])
    } else if (form === 'la') {
      routes.push(DEFAULT_ROUTES[1])
    } else if (form === 'pp') {
      routes.push(DEFAULT_ROUTES[3])
    } else if (form === 'tt') {
      routes.push(DEFAULT_ROUTES[2])
    } else if (form === 'tp') {
      routes.push(DEFAULT_ROUTES[4])
    }
  })
  return routes
}
//#endregion
