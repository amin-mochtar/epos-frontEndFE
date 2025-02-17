import { View, Text, Image } from 'react-native';
import { ModalContainer } from 'plai_common_frontend/src/components';
import { ReactNode, memo } from 'react';
import { plaiStyles } from 'plai_common_frontend';
import { ocrbrigthness, ocrchecklist, ocrktp } from './../../../../assets';

type TBottomSheetOCR = {
  isVisible: boolean;
  setIsVisible: (visible: boolean) => void;
  titleHeader: string;
  content: TBottomSheetContentOCR | null | undefined;
};

export type TBottomSheetContentOCR = {
  bodyContent?: ReactNode | Element | null | undefined;
  footerContent?: ReactNode | Element | null | undefined;
  contentHeader?: ReactNode | Element | null | undefined;
};

const ktpGuideData = [
  {
    imgIcon: ocrktp,
    descriptionText: 'Ambil foto E-KTP Anda sesuai dengan area yang ditentukan, dan pastikan foto terlihat jelas.',
  },
  {
    imgIcon: ocrbrigthness,
    descriptionText: 'Pastikan area memiliki pencahayaan yang memadai dan bebas dari pantulan cahaya.',
  },
  {
    imgIcon: ocrchecklist,
    descriptionText:
      'E-KTP yang digunakan harus asli dan dalam kondisi yang baik (tanpa kerusakan, lubang, atau keburaman).',
  },
];

export const BottomSheetOCR = memo(({ isVisible, setIsVisible, content, titleHeader }: TBottomSheetOCR) => {
  return (
    <ModalContainer
      styleWrapper={[plaiStyles.w100, plaiStyles.br16, { borderRadius: 0 }]}
      visible={isVisible}
      titleHeader={content?.contentHeader ? '' : titleHeader}
      onClose={() => setIsVisible(false)}

    >
      <>
        {content?.contentHeader}
        {content?.bodyContent ? (
          content?.bodyContent
        ) : (
          <View style={[plaiStyles.mb24, plaiStyles.column, { display: 'flex' }]}>
            {!content?.contentHeader && (
              <Text style={[plaiStyles.mb14]}>Silahkan ikuti panduan di bawah agar verifikasi Anda berhasil.</Text>
            )}
            {ktpGuideData.map((data, key) => (
              <View
                key={key}
                style={[
                  plaiStyles.mt12,
                  plaiStyles.row,
                  plaiStyles.pl12,
                  plaiStyles.pr24,
                  plaiStyles.pb10,
                  plaiStyles.borderbf0,
                  { display: 'flex' },
                ]}
              >
                <Image source={data.imgIcon} style={[plaiStyles.selfCenter, plaiStyles.mb10]} width={25} height={25} />
                <Text style={[plaiStyles.ml10]}>{data.descriptionText}</Text>
              </View>
            ))}
          </View>
        )}
        {content?.footerContent}
      </>
    </ModalContainer>
  );
});
