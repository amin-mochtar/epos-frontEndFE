import { View } from 'react-native';
import React, { FC } from 'react';
import { plaiStyles } from 'plai_common_frontend';
import { SectionTitle } from '../../../../components';
import { InfoField } from '../../spaj-lsar/components';

type Props = {
  spaj_number: string;
  policy_holder_name: string;
  policy_insured_name: string;
};

const PolicyInfo: FC<Props> = ({ policy_holder_name, policy_insured_name, spaj_number }) => {
  return (
    <View style={[plaiStyles.px16, plaiStyles.py16, plaiStyles.bgwhite, plaiStyles.my8]}>
      <SectionTitle text="Informasi Polis" wrapperStyle={[plaiStyles.mt0, plaiStyles.mb24]} />
      <InfoField title="Nomor SPAJ" value={spaj_number} wrapperStyle={plaiStyles.mb16} />
      <InfoField title="Nama (Calon) Pemegang Polis" value={policy_holder_name} wrapperStyle={plaiStyles.mb16} />
      <InfoField title="Nama (Calon) Tertanggung" value={policy_insured_name ?? policy_holder_name} />
    </View>
  );
};

export default PolicyInfo;
