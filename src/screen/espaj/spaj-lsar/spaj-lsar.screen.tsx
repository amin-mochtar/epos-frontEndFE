import React, { useEffect } from 'react';
import { PruColor, PruScreen } from 'common_ui_components';
import { plaiStyles } from 'plai_common_frontend';
import { View, ScrollView, Text, BackHandler } from 'react-native';
import { EposFooter, EposHeader } from '../../../components';
import useLsar from './hooks/useLsar';
import {
  CustomerConfirmation,
  CustomerDebt,
  CustomerIncome,
  CustomerWealth,
  CustomerCompanyProfile,
  CustomerCompanyFinancials,
  CustomerCompanyAddress,
  CustomerBankcruptcy,
  CustomerSignature,
  MarketerSignature,
  PolicyInfo,
} from './components';

export const SPAJLsar = () => {
  const {
    onBack,
    onContinue,
    fieldsIncome,
    fieldsCompanyFinancial,
    phSignDate,
    insuredSignDate,
    marketerSignDate,
    onChangeSignatureInsured,
    onChangeSignatureMarketer,
    onChangeSignaturePolicyHolder,
    onDeleteCompanyFinancial,
    onPressAddCompanyFinancial,
    onPressAddIncome,
    onDeleteIncome,
    agentCode,
    agentNameEn,
    control,
    errors,
    setValue,
    spajNumber,
    signatureState,
    onDispatchSignature,
    isNeedBankcruptcyDesc,
    insuredSign,
    phSign,
    marketerSign,
    isOther,
    handleSubmit,
  } = useLsar();

  useEffect(() => {
    // Back Device
    const backHandler = BackHandler.addEventListener('hardwareBackPress', onBack);
    return () => backHandler.remove();
  }, []);

  return (
    <PruScreen backgroundColor={PruColor.greyf8}>
      <>
        <View style={[plaiStyles.flex, plaiStyles.pb24]}>
          <View style={[plaiStyles.px16, plaiStyles.py16, plaiStyles.bgwhite]}>
            <EposHeader />
          </View>
          <ScrollView scrollEnabled>
            <View style={[plaiStyles.px16, plaiStyles.pb16, plaiStyles.bgwhite]}>
              <Text style={plaiStyles.fontHeaderTitle}>Folmulir LSAR</Text>
            </View>
            <PolicyInfo spaj_number={spajNumber} />
            <CustomerConfirmation control={control} errors={errors} />
            <CustomerIncome
              control={control}
              fields={fieldsIncome}
              errors={errors}
              onDelete={onDeleteIncome}
              onPressAdd={onPressAddIncome}
            />
            <CustomerWealth control={control} errors={errors} />
            <CustomerDebt control={control} errors={errors} />
            <CustomerCompanyProfile control={control} errors={errors} />
            <CustomerCompanyFinancials
              control={control}
              fields={fieldsCompanyFinancial}
              errors={errors}
              onPressAdd={onPressAddCompanyFinancial}
              onDelete={onDeleteCompanyFinancial}
            />
            <CustomerCompanyAddress control={control} errors={errors} setValue={setValue} />
            <CustomerBankcruptcy control={control} errors={errors} isNeedBankcruptcyDesc={isNeedBankcruptcyDesc} />
            <CustomerSignature
              control={control}
              errors={errors}
              insuredSignDate={insuredSignDate}
              onChangeSignatureInsured={onChangeSignatureInsured}
              onChangeSignaturePolicyHolder={onChangeSignaturePolicyHolder}
              phSignDate={phSignDate}
              showDateInsured={signatureState.insured.showSignatureDate}
              showDatePh={signatureState.policy_holder.showSignatureDate}
              showSignaturePh={signatureState.policy_holder.showSignature}
              showSignatureInsured={signatureState.insured.showSignature}
              onChangeShowSignature={onDispatchSignature}
              insuredSignature={insuredSign}
              phSignature={phSign}
              isOther={isOther}
            />
            <MarketerSignature
              //@ts-ignore
              marketer_name={agentNameEn}
              marketer_code={agentCode ?? ''}
              marketerSignDate={marketerSignDate}
              control={control}
              errors={errors}
              onChangeSignature={onChangeSignatureMarketer}
              showDate={signatureState.agent.showSignatureDate}
              showSignature={signatureState.agent.showSignature}
              onChangeShowSignature={onDispatchSignature}
              signature={marketerSign}
            />
          </ScrollView>
        </View>
        <EposFooter
          position={0}
          leftButton={{
            onPress: onBack,
          }}
          rightButton={{
            disabled: false,
            onPress: handleSubmit(onContinue),
          }}
        />
      </>
    </PruScreen>
  );
};
