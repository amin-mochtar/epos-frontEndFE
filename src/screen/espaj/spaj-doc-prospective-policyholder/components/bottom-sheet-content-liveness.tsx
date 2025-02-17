import { View, Text, Image } from 'react-native';
import { livenessworld, ocrbrigthness, ocrchecklist, ocrktp } from '../../../../assets';
import { plaiStyles } from 'plai_common_frontend';
import { Button } from 'common_ui_components/app/components-ui';

const livenessGuide = [
  {
    imgIcon: livenessworld,
    descriptionText: 'Pastikan koneksi internet Anda stabil.',
  },
  {
    imgIcon: ocrbrigthness,
    descriptionText: 'Berada di tempat dengan pencahayaan yang baik untuk hasil verifikasi terbaik.',
  },
  {
    imgIcon: ocrchecklist,
    descriptionText: 'Ikuti dengan seksama instruksi yang muncul di layar browser.',
  },
];

const HeaderBottomSheetLiveness = () => {
  return (
    <View style={[plaiStyles.mb14, plaiStyles.mt12]}>
      <Text style={[plaiStyles.lineH20, plaiStyles.font14, plaiStyles.fontBlack]}>
        Anda hanya memiliki 2 menit untuk menyelesaikan proses verifikasi wajah. Pastikan untuk memulai proses ini
        ketika Anda siap, karena melebihi waktu yang ditentukan akan membuat Anda untuk memulai proses dari awal.
      </Text>
      <Text style={[plaiStyles.mt10, plaiStyles.lineH20, plaiStyles.font14, plaiStyles.fontBlackBold]}>
        Langkah-langkah Penting:
      </Text>
    </View>
  );
};

const BodyContentBottomSheetLiveness = () => {
  return (
    <View>
      <HeaderBottomSheetLiveness />
      <View style={[plaiStyles.mb24, plaiStyles.column, { display: 'flex' }]}>
        {livenessGuide.map((data, key) => (
          <View
            key={key}
            style={[
              plaiStyles.mt12,
              plaiStyles.row,
              plaiStyles.px16,
              plaiStyles.pb10,
              { display: 'flex', borderBottomWidth: 1, borderColor: '#F0F0F0' },
            ]}
          >
            <Image source={data.imgIcon} style={[plaiStyles.selfCenter, plaiStyles.mb10]} width={30} height={30} />
            <Text style={[plaiStyles.ml14]}>{data.descriptionText}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const FooterContentBottomSheetLiveness = (onFooterBtnPress: any) => {
  return (
    <View>
      <Button preset={'primary'} text="Selanjutnya" onPress={() => onFooterBtnPress()} />
    </View>
  );
};

export { BodyContentBottomSheetLiveness, FooterContentBottomSheetLiveness };
