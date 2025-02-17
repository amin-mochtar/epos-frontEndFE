import { View, Text, ScrollView, BackHandler } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { StackActions, useNavigation } from '@react-navigation/native';
import { EposFooter, EposHeader, OptionCard, SectionTitle, HeaderTitle } from '../../../components';
import { QPREMI_PAYMENT_VALIDATION, QWHO_PREMI_PAYMENY, WR_SHARIA_CONVENT, questions, minMaxSalaryData, checkMainParticipant, ISQSDetail } from '../../../utilities';
import { EposRoutes } from '../../../navigation';
import { PruColor, PruScreen } from 'common_ui_components';
import { ModalInformation, TCommonConstantData, plaiStyles } from 'plai_common_frontend';
import { isEmpty } from 'lodash';
import { useEposRealm, useObject } from '../../../database';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/reducer';
import { EposState } from '../../../redux';
import { useTranslation } from 'react-i18next';

const ALERT_INFORMATION =
  'Produk Asuransi Yang Dikaitkan Investasi memilki karakteristik mengikuti nilai pasar sehingga dapat saja mengalami penurunan nilai. Untuk memberikan perlindungan terhadap anda, mohon pastikan anda memiliki sumber penghasilan yang memadai untuk menghadapi risiko ini.';

export const ValidationIncomeScreen = () => {
  const { t } = useTranslation();
  const { selectedSQSId, proposalId } = useSelector<RootState, EposState>((state) => state.epos);
  const RSQSData = useObject<ISQSDetail>('SQSDetail', selectedSQSId as never);
  const { updateSQSByKey, updateSummaryByKey, getCustomerStorageById } = useEposRealm();
  const [policyHolderIsPremiumPayor, setPolicyHolderIsPremiumPayor] = useState<string>(
    RSQSData?.policyHolderIsPremiumPayor || '',
  );
  const [prospectivePremiumPayor, setProspectivePremiumPayor] = useState<string>(
    RSQSData?.prospectivePremiumPayor || '',
  );
  const [otherSourceIncome, setOtherSourceIncome] = useState<string>('');
  const [income, setIncome] = useState<TCommonConstantData>({ key: '0' });
  const [showAlert, setShowAlert] = useState(false);
  const navigation = useNavigation();

  const { lifeAssuredData, MIN_INCOME, clientIncome } = useMemo(() => {
    const lifeAssuredData = getCustomerStorageById(RSQSData?.clientIdSelected[0] as string);
    const additionalValidationPolicyInformation = JSON.parse(RSQSData?.additionalValidationPolicyInformation!);
    // @ts-ignore
    const clientIncome = minMaxSalaryData[lifeAssuredData?.clientIncome.key].max;
    const libraryValidation = {
      B: 50000000,
      C: 25000000,
      D: 10000000,
      E: 10000000
    };
    // @ts-ignore
    const MIN_INCOME = libraryValidation[additionalValidationPolicyInformation.lastEducationalStatus.key];

    return {
      lifeAssuredData,
      MIN_INCOME,
      clientIncome,
    };
  }, []);

  const wording = useMemo(() => WR_SHARIA_CONVENT[RSQSData?.policyType || 'conventional'], []);
  const mainParticipant = useMemo(() => checkMainParticipant(RSQSData?.product?.key, RSQSData?.policyType), []);

  const _QWHO_PREMI_PAYMENY = useMemo(
    () =>
      RSQSData?.lifeAssuredSelf == 'self'
        ? [QWHO_PREMI_PAYMENY(wording?.premiContribution, mainParticipant)['Other']]
        : [
          QWHO_PREMI_PAYMENY(wording?.premiContribution, mainParticipant)[RSQSData?.policyType == 'sharia' ? 'PrimaryInsured' : 'MainInsured'],
          QWHO_PREMI_PAYMENY(wording?.premiContribution, mainParticipant)['Other'],
        ],
    [],
  );

  useEffect(() => {
    if (RSQSData?.clientIdSelected && RSQSData?.clientIdSelected.length > 0) {
      const id = RSQSData?.clientIdSelected[0];
      setIncome(lifeAssuredData?.clientIncome!);
    }
    // Back Device
    const backHandler = BackHandler.addEventListener('hardwareBackPress', onBack);

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    if (otherSourceIncome == 'N') {
      setShowAlert(true);
    }
  }, [otherSourceIncome]);

  useEffect(() => {
    if (policyHolderIsPremiumPayor == 'Y') {
      setOtherSourceIncome('');
      setProspectivePremiumPayor('');
    }
  }, [policyHolderIsPremiumPayor]);

  const onBack = () => {
    onSave(EposRoutes.INVESTMENT_FUND);
    return true;
  };


  const incomePremiPayor = () => {
    const defaultIncomePremiPayor = [
      {
        key: 'policyHolderIsPremiumPayor',
        value: policyHolderIsPremiumPayor
      },
      {
        key: 'prospectivePremiumPayor',
        value: prospectivePremiumPayor
      },
    ]

    return policyHolderIsPremiumPayor === 'Y'
      ? [...defaultIncomePremiPayor, {
        key: 'premiumPayorIncomeData',
        value: ''
      }]
      : defaultIncomePremiPayor
  }


  const onSave = async (route?: string) => {
    await updateSQSByKey(RSQSData?.sqsId, incomePremiPayor());
    const nextRoute =
      prospectivePremiumPayor == 'Other' || otherSourceIncome == 'Y' || prospectivePremiumPayor == 'TertanggungUtama'
        ? EposRoutes.PREMIUM_PAYOR_INCOME
        : EposRoutes.CALCULATOR;
    await updateSummaryByKey(proposalId, { key: 'lastState', value: route || nextRoute });
    navigation.dispatch(StackActions.replace(route || nextRoute));
  };

  const disabledContinue = (): boolean => {
    const _disabled =
      isEmpty(policyHolderIsPremiumPayor) ||
      (policyHolderIsPremiumPayor == 'N' && isEmpty(prospectivePremiumPayor)) ||
      (policyHolderIsPremiumPayor == 'Y' && clientIncome <= MIN_INCOME && otherSourceIncome != 'Y');
    return _disabled;
  };

  return (
    <PruScreen backgroundColor={PruColor.greybg}>
      <View style={[plaiStyles.px16, plaiStyles.flex]}>
        <EposHeader />
        <ScrollView>
          <HeaderTitle title={`Pilih Calon Pembayar ${wording.premiContribution}`} titleStyle={plaiStyles.fontHeaderTitle} />
          <SectionTitle text={t('Epos:income_validation_question', { label: wording.premiContribution })} />
          <OptionCard
            data={QPREMI_PAYMENT_VALIDATION(wording.premiContribution)}
            selected={policyHolderIsPremiumPayor}
            onSelected={(value) => setPolicyHolderIsPremiumPayor(value.key as string)}
            uniqueTestId='premi-payor'
          />
          {policyHolderIsPremiumPayor == 'N' && (
            <>
              <SectionTitle text={t('Epos:income_validation_question_2', { label: wording.premiContribution })} />
              <OptionCard
                data={_QWHO_PREMI_PAYMENY}
                selected={prospectivePremiumPayor}
                onSelected={(value) => setProspectivePremiumPayor(value.key as string)}
                uniqueTestId='prospective-premi-payor'
              />
            </>
          )}
          {clientIncome <= MIN_INCOME && policyHolderIsPremiumPayor == 'Y' && (
            <>
              <SectionTitle text="Apakah ada sumber penghasilan rutin lainnya perbulan?" />
              <OptionCard
                style={plaiStyles.row}
                insideStyle={plaiStyles.flex}
                spaceItem={8}
                data={questions}
                selected={otherSourceIncome}
                onSelected={(value) => setOtherSourceIncome(value.key as string)}
                uniqueTestId='other-payor-source-income'
              />
            </>
          )}
        </ScrollView>
      </View>
      <EposFooter
        position={8}
        leftButton={{
          onPress: onBack,
        }}
        rightButton={{
          disabled: disabledContinue(),
          onPress: onSave,
        }}
      />
      <ModalInformation
        visible={showAlert}
        title={'Informasi'}
        desc={ALERT_INFORMATION}
        buttonPrimary={{
          text: 'Ok',
          onPress: () => setShowAlert(false),
        }}
      />
    </PruScreen>
  );
};
