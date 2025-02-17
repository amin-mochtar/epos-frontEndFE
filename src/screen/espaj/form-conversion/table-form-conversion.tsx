import { plaiStyles } from "plai_common_frontend";
import { Trans, useTranslation } from "react-i18next";
import { Text, View } from "react-native";
import i18next from 'i18next';


export const Table = ({ previouslyProduct, productGoal }: { previouslyProduct: string, productGoal: string }) => {
  const { t } = useTranslation()
  const data = [
    {
      title: i18next.t('Epos:underwriting_process'),
      value: i18next.t('Epos:desc_underwriting_process'),
    },
    {
      title: i18next.t('Epos:underwriting_decision'),
      value: i18next.t('Epos:desc_underwriting_decision'),
    },
    {
      title: i18next.t('Epos:waiting_period'),
      value: i18next.t('Epos:desc_waiting_period', { productGoal }),
    },
    {
      title: i18next.t('Epos:claim_processing'),
      value: i18next.t('Epos:desc_claim_processing', { productGoal, previouslyProduct })
    },
    {
      title: i18next.t('Epos:applicability_of_benefit', { previouslyProduct }),
      value: i18next.t('Epos:desc_applicability_of_benefit', { productGoal }),
    }
  ]

  return (
    <View style={[plaiStyles.borderF0, plaiStyles.mt32, plaiStyles.mb10]}>
      <View style={[plaiStyles.lineH16, plaiStyles.bgGrey, plaiStyles.row, plaiStyles.justifyCenter]}>
        <Text style={[plaiStyles.flex, plaiStyles.px8, plaiStyles.py8, plaiStyles.fontBlackBold, plaiStyles.textCenter, plaiStyles.borderF0]}>Nama Proses</Text>
        <Text style={[plaiStyles.flex, plaiStyles.px8, plaiStyles.py8, plaiStyles.fontBlackBold, plaiStyles.textCenter, plaiStyles.borderF0]}>Keterangan</Text>
      </View>
      {data.map((item) => (
        <View style={[plaiStyles.row, plaiStyles.justifyCenter, plaiStyles.bgwhite]}>
          <Text style={[plaiStyles.flex, plaiStyles.px8, plaiStyles.py8, plaiStyles.borderF0, plaiStyles.fontGrey33Thin]}>
            {/* {item.title} */}
            <Trans
              i18nKey={item?.title}
              components={{
                i: <Text style={[plaiStyles.fontItalic]} />,
                b: <Text style={[plaiStyles.fontBold]} />,
                u: <Text style={{ textDecorationLine: 'underline' }} />,
                pru: <Text style={[plaiStyles.fontRed]} />
              }}
            />
          </Text>
          <Text style={[plaiStyles.flex, plaiStyles.px8, plaiStyles.py8, plaiStyles.borderF0, plaiStyles.fontGrey33Thin]}>
            {/* {item.value} */}
            <Trans
              i18nKey={item?.value}
              components={{
                i: <Text style={[plaiStyles.fontItalic]} />,
                b: <Text style={[plaiStyles.fontBold]} />,
                u: <Text style={{ textDecorationLine: 'underline' }} />,
                pru: <Text style={[plaiStyles.fontRed]} />
              }}
            />
          </Text>
        </View>
      ))}
    </View>
  );
};
