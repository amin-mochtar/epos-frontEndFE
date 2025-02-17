import React, { useMemo, useState } from 'react';
import { View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';
import { StackActions, useNavigation } from '@react-navigation/native';
import { plaiStyles, ModalInformation } from 'plai_common_frontend';
import { Button } from 'common_ui_components/app/components-ui';
import { PruHeader, PruScreen } from 'common_ui_components';
import {ISQSDetail, TObjectSQSByKey } from '../../../utilities';
import { RootState } from 'redux/reducer';
import { EposState } from '../../../redux';
import { useEposRealm, useObject } from '../../../database';
import { EposRoutes } from '../../../navigation';
import { SubStyles } from './substandart.style';
import { FormValues } from './substandart.type';
import { DEFAULT_SUBSTANDARD } from './substandard.data';
import { pruTestID } from 'common_services_frontend';
import { TabView } from 'common_ui_components/app/components-ui';
import { SubstandardForm } from './components/substandard.form';

export const SubstrandartScreen = () => {
  const { t } = useTranslation();
  const navigation = useNavigation();

  const { selectedSQSId } = useSelector<RootState, EposState>((state) => state.epos);
  const RSQSData = useObject<ISQSDetail>('SQSDetail', selectedSQSId as never);
  const { updateSQSByKey } = useEposRealm();

  const [visible, setVisible] = useState(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: useMemo(() => {
      const primarySubstandard = (RSQSData?.substandar ? JSON.parse(RSQSData?.substandar) : DEFAULT_SUBSTANDARD.substandards[0])

      let substandardsList = [
        primarySubstandard,
      ]

      if(RSQSData?.additionalLifeAssuredSelf === 'other') {
        const additionalSubstandard = (RSQSData?.additionalSubstandar ? JSON.parse(RSQSData?.additionalSubstandar) : DEFAULT_SUBSTANDARD.substandards[0])
        substandardsList.push(additionalSubstandard)
      }

      return {
        substandards: substandardsList
      }
    },[RSQSData?.substandar, RSQSData?.additionalSubstandar]),
  });

  const formContext = {
    control,
    errors,
    watch,
    getValues,
    setValue
  };

  const {ROUTES} = useMemo(() => {
    const INIT_ROUTES = [
      {
        key: 'primaryInsured',
        title: t('Epos:primary_participant_candidate'),
      },
    ]

    if(RSQSData?.additionalLifeAssuredSelf === 'other') {
      INIT_ROUTES.push({
        key: 'additionalInsured',
        title: t('Epos:additional_participant_candidate_1'),
      })
    }

    const ROUTES = INIT_ROUTES.map((route, index) => {
      return {
        ...route,
        screen: () => {
          return <SubstandardForm
            index={index}
            activeIndex={activeIndex}
            policyType={RSQSData?.policyType || 'conventional'}
            setVisible={setVisible}
            {...formContext}
          />
        },
      }
    })

    return { ROUTES }
  }, [activeIndex, formContext, control]);

  const onSave = async (data: FormValues) => {
    const updateSQSData: TObjectSQSByKey[] = [
      {
        key: 'substandar',
        value: JSON.stringify(data.substandards[0]),
      },
    ];

    if(RSQSData?.additionalLifeAssuredSelf === 'other') {
      updateSQSData.push({
        key: 'additionalSubstandar',
        value: JSON.stringify(data.substandards[1]),
      })
    }

    await updateSQSByKey(RSQSData?.sqsId!, updateSQSData);
    navigation.dispatch(StackActions.replace(EposRoutes.CALCULATOR));
  };

  const onSubmit = async () => onSave(getValues());

  const handleActiveIndex = (idx: number) => {
    setActiveIndex(idx)
  }

  const handleRemove = () => {
    setValue(`substandards.${activeIndex}`, DEFAULT_SUBSTANDARD.substandards[0]);
  }

  return (
    <PruScreen>
      <PruHeader
        headerText="Substandard"
        leftIcon="arrow_back"
        onLeftPress={() => navigation.dispatch(StackActions.replace(EposRoutes.CALCULATOR))}
      />
      <View style={[plaiStyles.pb16, plaiStyles.flex]}>
        <TabView
          onIndexChange={handleActiveIndex}
          selectedIndex={activeIndex}
          routes={ROUTES}
        />
        <View style={SubStyles.footerHeader}>
          <Button
            style={[plaiStyles.bgBtnSecondary, plaiStyles.mt16]}
            textStyle={plaiStyles.fontRed}
            text={t('Calculator:remove_data')}
            onPress={handleRemove}
            {...pruTestID(`remove-data-button`)}
          />
          <Button
            style={[plaiStyles.bgBtnRed, plaiStyles.mt16]}
            textStyle={plaiStyles.fontWhite}
            text={t('Calculator:save_continue')}
            onPress={handleSubmit(onSubmit)}
            {...pruTestID(`save-continue-button`)}
          />
          <ModalInformation
            visible={visible}
            title="Informasi"
            desc="Masih terdapat substandard yang belum diisi. silakan cek kembali."
            buttonPrimary={{
              text: 'Tutup',
              onPress: () => {
                setVisible(false);
              },
            }}
          />
        </View>
      </View>
    </PruScreen>
  );
};
