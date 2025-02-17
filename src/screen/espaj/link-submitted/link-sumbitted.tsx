import { View, Text } from 'react-native';
import React, { useMemo } from 'react';
import { plaiStyles } from 'plai_common_frontend';
import { PruColor, PruScreen } from 'common_ui_components';
import { Image } from 'react-native';
import { successfullysend } from '../../../assets';
import { Button } from 'common_ui_components/app/components-ui';
import { StackActions, useNavigation } from '@react-navigation/native';
import { EposDoksulRoutes, EposRoutes } from '../../../navigation';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { useObject } from '../../../database';
import { RootState } from 'app/redux/reducer';
import { EposState, resetRMessaging } from '../../../redux';
import { ISQSDetail, WR_SHARIA_CONVENT } from '../../../utilities';

export const linkSumbitted = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { isDoksul, selectedSQSId, statusDoksul, spajNumber, RMessaging } = useSelector<RootState, EposState>((state) => state.epos);
  const RSQSData = useObject<ISQSDetail>('SQSDetail', selectedSQSId as never);
  const wording = useMemo(() => WR_SHARIA_CONVENT[RSQSData?.policyType || 'conventional'], []);
  const dispatch = useDispatch()
  const ResponseSendingMessage = useMemo(() => RMessaging?.data?.data?.message, [])

  const title = useMemo(() => {
    if (isDoksul) {
      if (statusDoksul === 'SQS' || statusDoksul === 'Audio Recording Virtual Tatap Muka') {
        return t('Epos:link_submitted')
      } else {
        return `Berhasil Mengajukan Dokumen`
      }
    } else {
      if (ResponseSendingMessage === 'success') {
        return t('Epos:link_submitted')
      } else if (spajNumber) {
        return `Berhasil Mengajukan Proposal`
      }
    }
  }, [])

  const desciption = useMemo(() => {
    if (isDoksul) {
      if (statusDoksul === 'Audio Recording Virtual Tatap Muka') {
        return `Tautan untuk pengisian rekaman suara telah dikirimkan ke Calon Pemegang Polis.`
      } else if (statusDoksul === 'SQS' && !RSQSData?.isChangePH) {
        return `Formulir Pernyataan Pemahaman PAYDI dan rekaman suara telah dikirimkan ke Calon Pemegang Polis.`
      } else if (statusDoksul === 'SQS' && RSQSData?.isChangePH) {
        return 'Tautan untuk pengisian deklarasi video, Formulir Pernyataan Pemahaman PAYDI dan rekaman suara telah dikirimkan ke Calon Pemegang Polis.'
      } else {
        return `Submit dokumen susulan telah berhasil.`
      }
    } else {
      if (ResponseSendingMessage === 'success') {
        return t('Epos:desc_link_submitted')
      } else if (spajNumber) {
        return `Jika semua dokumen tersedia, Anda akan menerima e-policy Anda dalam waktu 1 hari kerja setelah disetujui.`
      }
    }
  }, [])

  const backToLanding = () => {
    if (isDoksul) {
      navigation.navigate(EposDoksulRoutes.EPOSDOKSUL, { screen: EposDoksulRoutes.LANDING_DOKSUL });
    } else {
      navigation.dispatch(StackActions.replace(EposRoutes.LANDING));
    }
    dispatch(resetRMessaging({ payload: 'reset' }))
  };

  const onBackToDoksulHome = () => {
    navigation.navigate(EposDoksulRoutes.EPOSDOKSUL, { screen: EposDoksulRoutes.DOKSUL, params: { isBackHomeDoksul: true } });
  }

  return (
    <PruScreen backgroundColor={PruColor.white}>
      <View style={[plaiStyles.spacing, plaiStyles.flex, plaiStyles.justifyCenter, plaiStyles.alignCenter]}>
        <Image style={[plaiStyles.ml8, plaiStyles.selfCenter]} source={successfullysend} />
        <Text style={[plaiStyles.fontGrey33, plaiStyles.font18, plaiStyles.lineH24, plaiStyles.mt24]}>
          {title}
        </Text>
        {!isDoksul && spajNumber && !ResponseSendingMessage && (
          <Text style={[plaiStyles.fontGrey33Bold, plaiStyles.font16, plaiStyles.mt24]}>
            No. e-{wording.spaj}: {spajNumber}
          </Text>
        )}
        <Text style={[plaiStyles.fontGrey66Thin, plaiStyles.font14, plaiStyles.lineH20, plaiStyles.mt8, plaiStyles.textCenter]}>
          {desciption}
        </Text>
        {isDoksul && !RSQSData?.isChangePH && (
          <Button
            style={[plaiStyles.bgBtnSecondary, plaiStyles.mt24]}
            textStyle={[plaiStyles.fontRed, plaiStyles.font14]}
            text={'Submit Dokumen Lainnya'}
            onPress={onBackToDoksulHome}
          />
        )}
        <Button
          style={[plaiStyles.bgBtnRed, plaiStyles.mt16]}
          textStyle={[plaiStyles.fontWhite, plaiStyles.font14]}
          text={isDoksul ? 'Kembali ke Dokumen Susulan' : t('Epos:back_to_proposal_list')}
          onPress={backToLanding}
        />
      </View>
    </PruScreen>
  );
};
