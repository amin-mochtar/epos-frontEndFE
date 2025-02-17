import { View } from 'native-base';
import { SectionTitle } from '../../../../components';
import InfoField from './InfoField';
import { plaiStyles } from 'plai_common_frontend';
import { FC } from 'react';

type Props = {
  spaj_number?: string;
};

const PolicyInfo: FC<Props> = ({ spaj_number }) => {
  return (
    <View style={[plaiStyles.px16, plaiStyles.py16, plaiStyles.bgwhite, plaiStyles.my8]}>
      <SectionTitle text="Informasi Polis" wrapperStyle={[plaiStyles.mt0]} />
      <InfoField title="Nomor SPAJ" value={spaj_number} wrapperStyle={plaiStyles.mt16} />
    </View>
  );
};

export default PolicyInfo;
