import { FlatList, Text, View } from 'react-native';
import React, { FC } from 'react';
import { plaiStyles } from 'plai_common_frontend';
import { useTranslation } from 'react-i18next';

type TInfoItem = {
  label: string;
  value: string;
};

type TSubmissionInfo = {
  infoList: TInfoItem[];
};

const SubmissionInfo: FC<TSubmissionInfo> = ({ infoList }) => {
  const { t } = useTranslation();
  return (
    <View>
      <Text style={[plaiStyles.fontGrey33, plaiStyles.font16, plaiStyles.mb16]}>{t('Epos:upfront_decision:submission_info')}</Text>
      <FlatList
        data={infoList}
        renderItem={({ item }) => <InfoItem {...item} />}
        ItemSeparatorComponent={() => <View style={plaiStyles.mt16} />}
      />
    </View>
  );
};

export default SubmissionInfo;

//#region CHILD COMPONENT
const InfoItem: FC<TInfoItem> = ({ label, value }) => {
  return (
    <View style={[plaiStyles.row, plaiStyles.alignCenter, plaiStyles.justifyBetween]}>
      <Text style={plaiStyles.fontGrey66Thin}>{label}</Text>
      <Text style={plaiStyles.fontGrey33Bold}>{value}</Text>
    </View>
  );
};
//#endregion
