import { View, BackHandler, ScrollView, Text, FlatList } from 'react-native';
import React, { FC, useEffect } from 'react';
import { ModalInformation, plaiStyles } from 'plai_common_frontend';
import { PruColor, PruScreen } from 'common_ui_components';
import { EposFooter, EposHeader } from '../../../components';
// import { useTranslation } from 'react-i18next';
import SubmissionInfo from './components/SubmissionInfo';
import useUnderwritingDecision from './hooks/useUnderwritingDecision';
import ResultCard from './components/ResultCard';
import { useTranslation } from 'react-i18next';

type TNotesItem = {
  content: string;
};

export const SPAJUnderwritingDecision = () => {
  const { t } = useTranslation('Epos');
  const {
    onBack,
    onContinue,
    infoUpfrontDecision,
    result,
    notesContent,
    showModalDocument,
    buttonPrimary,
    buttonSecondary,
  } = useUnderwritingDecision();

  useEffect(() => {
    // Back Device
    const backHandler = BackHandler.addEventListener('hardwareBackPress', onBack);
    return () => backHandler.remove();
  }, []);

  return (
    <PruScreen backgroundColor={PruColor.greyf8}>
      <>
        <View style={[plaiStyles.flex]}>
          <View style={[plaiStyles.bgwhite, plaiStyles.px16, plaiStyles.py16]}>
            <EposHeader />
          </View>
          <ScrollView scrollEnabled>
            <View style={[plaiStyles.px16, plaiStyles.pb16, plaiStyles.bgwhite]}>
              <Text style={plaiStyles.fontHeaderTitle}>{t('Epos:upfront_decision:underwriting_decision')}</Text>
              <Text style={[plaiStyles.mt8, plaiStyles.fontGrey66Thin, plaiStyles.lineH20]}>
                {t('Epos:upfront_decision:result_subheader')}
              </Text>
            </View>
            <View style={[plaiStyles.px16, plaiStyles.py16, plaiStyles.my8, plaiStyles.bgwhite]}>
              <ResultCard {...result?.response_detail} />
              <SubmissionInfo infoList={infoUpfrontDecision} />
            </View>
            <View style={[plaiStyles.bgwhite, plaiStyles.px16, plaiStyles.py16, plaiStyles.mb48]}>
              <Text style={[plaiStyles.fontGrey33Bold, plaiStyles.lineH24, plaiStyles.font16, plaiStyles.mb16]}>
                {t('Epos:upfront_decision:notes')}
              </Text>
              <FlatList
                data={notesContent}
                renderItem={({ item }) => <NotesItem content={item} />}
                ItemSeparatorComponent={() => <View style={plaiStyles.mt16} />}
              />
            </View>
          </ScrollView>
          <ModalInformation
            title={t('Epos:attention')}
            desc={t('Epos:upfront_decision:desc_need_document')}
            visible={showModalDocument}
            buttonPrimary={buttonPrimary}
            buttonSecondary={buttonSecondary}
          />
        </View>
        <EposFooter
          position={0}
          leftButton={{
            onPress: onBack,
          }}
          rightButton={{
            disabled: false,
            onPress: onContinue,
            text: result?.response_detail?.decision === 'DECLINE_ADMIN' ? 'Kembali ke Landing' : 'Selanjutnya',
          }}
          isPrimaryButtonOnly={result?.response_detail?.decision === 'DECLINE_ADMIN'}
        />
      </>
    </PruScreen>
  );
};

//#region CHILD COMPONENT
const NotesItem: FC<TNotesItem> = ({ content }) => {
  return (
    <View style={[plaiStyles.row, plaiStyles.pr4]}>
      <View style={[plaiStyles.br50, plaiStyles.h3, plaiStyles.w3, plaiStyles.bgBlack, plaiStyles.ml4, plaiStyles.mr8, plaiStyles.mt8]} />
      <Text style={[plaiStyles.fontGrey33Thin, plaiStyles.flexShrink]}>{content}</Text>
    </View>
  );
};
//#endregion
