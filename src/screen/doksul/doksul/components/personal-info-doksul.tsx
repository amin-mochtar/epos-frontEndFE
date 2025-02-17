import { plaiStyles } from "plai_common_frontend"
import { Text, View } from "react-native"
import moment from "moment";
import { Divider } from "react-native-paper";


export const PersonalInfoDoksul = ({ data }: { data: any }) => {
  const { policyHolderName, policyHolderEmail, policyHolderPhone, policyHolderDob, lifeAssuredName, lifeAssuredDob } = data

  return (
    <>
      <View style={[plaiStyles.mt8]}>
        <Text style={[plaiStyles.fontGrey33, plaiStyles.font16]}>{policyHolderName}</Text>
        <Text style={[plaiStyles.fontGrey99Thin]}>
          {policyHolderEmail}
        </Text>
      </View>

      <View style={[plaiStyles.mt16]}>
        <View style={[plaiStyles.row, plaiStyles.justifyBetween, plaiStyles.mt12]}>
          <Text style={[plaiStyles.fontGrey66Thin]}>No. Telepon</Text>
          <Text style={[plaiStyles.fontGrey33]}>{policyHolderPhone}</Text>
        </View>

        <View style={[plaiStyles.row, plaiStyles.justifyBetween, plaiStyles.mt12]}>
          <Text style={[plaiStyles.fontGrey66Thin]}>Tanggal Lahir Pemegang Polis</Text>
          <Text style={[plaiStyles.fontGrey33]}>
            {moment(policyHolderDob).format('DD MMMM YYYY')}
          </Text>
        </View>

        <View style={[plaiStyles.row, plaiStyles.justifyBetween, plaiStyles.mt12]}>
          <Text style={[plaiStyles.fontGrey66Thin]}>Tertanggung Utama</Text>
          <Text style={[plaiStyles.fontGrey33]}>{lifeAssuredName}</Text>
        </View>

        <View style={[plaiStyles.row, plaiStyles.justifyBetween, plaiStyles.flex, plaiStyles.flexWrap, plaiStyles.mt12]}>
          <Text style={[plaiStyles.fontGrey66Thin]}>Tanggal Lahir Tertanggung Utama</Text>
          <Text style={[plaiStyles.fontGrey33]}>
            {moment(lifeAssuredDob).format('DD MMMM YYYY')}
          </Text>
        </View>
      </View>
    </>
  )
}