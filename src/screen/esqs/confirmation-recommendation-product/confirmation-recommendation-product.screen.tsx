import { Text, ScrollView, BackHandler, View } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ISQSDetail, QCONFIRMATION_RECOMMENDATION_PRODUCT } from '../../../utilities';
import { EposFooter, EposHeader, OptionCard } from '../../../components';
import { isEmpty } from 'lodash';
import { PruColor, PruScreen } from 'common_ui_components';
import { ALERT, ModalInformation, plaiStyles } from 'plai_common_frontend';
import { StackActions, useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/reducer';
import { EposState } from '../../../redux';
import { useEposRealm, useObject } from '../../../database';
import { EposRoutes } from '../../../navigation';


export const ConfirmationRecommendationProductScreen = () => {
  const navigation = useNavigation();
  const { selectedSQSId, proposalId } = useSelector<RootState, EposState>((state) => state.epos);
  const RSQSData = useObject<ISQSDetail>('SQSDetail', selectedSQSId as never);
  const { onUpdateSQS, updateSummaryByKey } = useEposRealm();
  const [selectedConfirmation, setSelectedConfirmation] = useState<string>(
    RSQSData?.confirmationProductRecommendation || '',
  );
  const [visibleAlert, setVisibleAlert] = useState(false);

  useEffect(() => {
    // Back Device
    const backHandler = BackHandler.addEventListener('hardwareBackPress', onBack);

    return () => backHandler.remove();
  }, []);

  const onBack = () => {
    onSave(EposRoutes.ILLUSTRATION);
    return true;
  };

  const onSave = async (_route?: string) => {
    const nextRoute = _route || EposRoutes.SPAJ_BEFORE_PROCEEDING;
    const _sqsData = {
      ...RSQSData?.toJSON(),
      confirmationProductRecommendation: selectedConfirmation,
    } as ISQSDetail;
    await onUpdateSQS(_sqsData);
    updateSummaryByKey(proposalId, { key: 'lastState', value: nextRoute });
    navigation.dispatch(StackActions.replace(nextRoute));
  };

  const onContinue = () => {
    if (selectedConfirmation == 'NotFollow') {
      setVisibleAlert(true);
    } else {
      onSave();
    }
  };
  const onCloseAlert = () => {
    setVisibleAlert(false);
    setSelectedConfirmation('');
    onSave(EposRoutes.QUICK_QUOTE);
  };

  return (
    <PruScreen backgroundColor={PruColor.greybg}>
      <View style={[plaiStyles.spacing, plaiStyles.flex]}>
        <EposHeader />
        <ScrollView>
          <Text style={plaiStyles.fontHeaderTitle}>Tanda Tangan Analisa Mengerti Kebutuhan Anda & Ilustrasi</Text>
          <OptionCard
            style={plaiStyles.mt12}
            data={QCONFIRMATION_RECOMMENDATION_PRODUCT}
            selected={selectedConfirmation}
            onSelected={(item) => {
              if (item.key == 'NotFollow') {
                setVisibleAlert(true);
              } else {
              }
              setSelectedConfirmation(item.key);
            }}
            uniqueTestId='confirmation-recommendation-product'
          />
        </ScrollView>
      </View>
      <EposFooter
        position={12}
        leftButton={{
          onPress: onBack,
        }}
        rightButton={{
          disabled: isEmpty(selectedConfirmation) || selectedConfirmation == 'NotFollow',
          onPress: onContinue,
        }}
      />
      <ModalInformation
        visible={visibleAlert}
        desc="Silakan melakukan analisa dan rekomendasi ulang karena nasabah tidak mengikuti rekomendasi"
        image={ALERT}
        title="Notifikasi"
        buttonPrimary={{
          text: 'Ulangi Analisa',
          onPress: onCloseAlert,
        }}
        buttonSecondary={{
          text: 'Tutup',
          onPress: () => setVisibleAlert(false),
        }}
      />
    </PruScreen>
  );
};
