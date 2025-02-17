import React, { useEffect } from 'react';
import { PruColor, PruScreen } from 'common_ui_components';
import { plaiStyles } from 'plai_common_frontend';
import { View, ScrollView, Text, BackHandler } from 'react-native';
import { EposFooter, EposHeader } from '../../../components';
import useAbr from './hooks/useAbr';
import {
  PolicyApplicationInfo,
  PolicyInfo,
  PolicyHolderInfo,
  InsuredApplicationInfo,
  AgentPovReview,
  AgentSignature,
} from './components';
import { labelEducationalBackground, labelFamilyBackground, labelLifeStyle } from './config';

export const SPAJAbr = () => {
  const {
    onBack,
    onContinue,
    control,
    errors,
    isPolicyHolderEqualtoPrimaryInsured,
    onChangeSignatureAgent,
    onChangeShowSignature,
    agentSignDate,
    agentCode,
    agentNameEn,
    spajNumber,
    piName,
    phName,
    showSignatureDate,
    showSignature,
    agentSignature,
    handleSubmit,
  } = useAbr();

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
              <Text style={plaiStyles.fontHeaderTitle}>Laporan Agent/FSC</Text>
            </View>
            <PolicyInfo spaj_number={spajNumber ?? ''} policy_holder_name={phName} policy_insured_name={piName} />
            <PolicyApplicationInfo control={control} errors={errors} />
            <PolicyHolderInfo
              control={control}
              errors={errors}
              labelLifeStyle={labelLifeStyle}
              labelFamilyBackground={labelFamilyBackground}
              labelEducationalBackground={labelEducationalBackground}
            />
            <InsuredApplicationInfo
              control={control}
              errors={errors}
              labelLifeStyle={labelLifeStyle}
              labelFamilyBackground={labelFamilyBackground}
              labelEducationalBackground={labelEducationalBackground}
              show={!isPolicyHolderEqualtoPrimaryInsured}
            />
            <AgentPovReview control={control} errors={errors} />
            <AgentSignature
              // @ts-ignore
              agent_name={agentNameEn}
              agent_code={agentCode ?? ''}
              control={control}
              errors={errors}
              onChangeSignature={onChangeSignatureAgent}
              onChangeShowSignature={onChangeShowSignature}
              agentSignDate={agentSignDate}
              showDate={showSignatureDate}
              showSignature={showSignature}
              signature={agentSignature}
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
