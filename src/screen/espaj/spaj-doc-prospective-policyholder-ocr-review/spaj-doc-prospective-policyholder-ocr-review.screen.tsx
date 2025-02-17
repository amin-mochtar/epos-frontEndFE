/* eslint-disable @typescript-eslint/no-explicit-any */
import { StackActions, useNavigation, useRoute } from '@react-navigation/native';
import { PruColor, PruScreen } from 'common_ui_components';
import { InputDate, plaiStyles } from 'plai_common_frontend';
import { View, Text, ScrollView, BackHandler } from 'react-native';
import Icon from 'react-native-vector-icons/AntDesign';
import { EposRoutes } from '../../../navigation';
import { spajOcrStyle } from '../spaj-doc-prospective-policyholder-ocr-compare/spaj-doc-prospective-policyholder-ocr-compare.stye';
import { GenderList, ISPAJData, additionalValidationSPAJModal } from '../../../utilities';
import { OptionCard } from '../../../components';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/reducer';
import { EposState } from '../../../redux';
import { useObject } from '../../../database';
import { useEffect } from 'react';
import { IOCRUserDataType } from '../spaj-doc-prospective-policyholder-ocr/ocr.type';

export const SPAJDocProspectivePolicyholderOCRReviewScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const routes: any = useRoute();
  const isPrimaryInsurance = routes?.params?.isPrimaryInsurance;
  const isAdditionalInsurance = routes?.params?.isAdditionalInsurance;
  const isPayor = routes?.params?.isPayor;
  const { spajId } = useSelector<RootState, EposState>((state) => state.epos);
  const RSPAJData = useObject<ISPAJData>('SPAJData', spajId as never);
  const ocrdatas: any = RSPAJData?.spajOcr && JSON.parse(RSPAJData?.spajOcr);
  const ocrdata = isPrimaryInsurance
    ? ocrdatas?.primaryInsurance
    : isAdditionalInsurance
      ? ocrdatas?.additionalInsurance
      : isPayor
        ? ocrdatas?.payor
        : ocrdatas?.polis;

  const ocrResult: any = ocrdata?.compareResult;
  const OCRUserDataType: IOCRUserDataType = isPrimaryInsurance
  ? 'primaryInsurance'
  : isAdditionalInsurance
  ? 'additionalInsurance'
  : isPayor
  ? 'payor'
  : 'polis';
  const redirectedByDataType = {
    primaryInsurance: EposRoutes.SPAJ_DOC_PRIMARY_PARTICIPANT_CANDIDATE,
    payor: EposRoutes.SPAJ_DOC_PREMIUM_PAYOR,
    polis: EposRoutes.SPAJ_DOC_PROSPECTIVE_POLICYHOLDER,
    additionalInsurance: EposRoutes.SPAJ_DOC_PRIMARY_PARTICIPANT_CANDIDATE,
  };

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', onHeaderPressed);

    return () => backHandler.remove();
  }, []);

  const renderBorderLeftRed = (text: string) => {
    return (
      <View style={[plaiStyles.mx16, spajOcrStyle.berderLeftRed, plaiStyles.mb14]}>
        <Text style={[plaiStyles.pl10]}>{text}</Text>
      </View>
    );
  };

  const renderWithTextLabel = ({ label, value }: { label: string; value: string }) => {
    return (
      <View style={[plaiStyles.my8]}>
        <Text style={[plaiStyles.mb12, plaiStyles.fontGrey33, plaiStyles.font14, plaiStyles.lineH20]}>{label}</Text>
        <Text style={[plaiStyles.fontGrey33, plaiStyles.font16, plaiStyles.lineH20]}>{value}</Text>
      </View>
    );
  };

  const onHeaderPressed = () => {
    const urlRoute = redirectedByDataType[OCRUserDataType];
    navigation.dispatch(StackActions.replace(urlRoute, isAdditionalInsurance ? {
      isAdditionalInsurance: true,
    } : {}));
    return true;
  };

  return (
    <PruScreen backgroundColor={PruColor.white}>
      <ScrollView scrollEnabled={true}>
        <View style={[plaiStyles.mb32]}>
          <View style={[plaiStyles.mb32, plaiStyles.mt24, plaiStyles.pt24, plaiStyles.ml12]}>
            <Icon name={`arrowleft`} size={20} onPress={onHeaderPressed} />
          </View>
          <View style={[spajOcrStyle.borderSeperateSection, plaiStyles.mb24]}>
            <View style={[plaiStyles.px12]}>
              <Text style={[plaiStyles.fontBlackBold, plaiStyles.font24]}>Konfirmasi Data Diri</Text>
              <Text style={[plaiStyles.font14, plaiStyles.lineH24, plaiStyles.mt14, plaiStyles.mb16]}>
                Pastikan semua data Calon Pemegang Polis yang diambil sesuai dengan E-KTP.
              </Text>
            </View>
          </View>

          {/* Private Information / Informasi Pribadi Section */}
          <View style={[spajOcrStyle.borderSeperateSection, plaiStyles.mb24, plaiStyles.pb24]}>
            {renderBorderLeftRed('Informasi Pribadi')}
            <View style={[plaiStyles.px16]}>
              {renderWithTextLabel({
                label: 'Nama Lengkap (Sesuai Kartu Identitas)',
                value: ocrResult?.clientName || '',
              })}
            </View>
            <View style={[plaiStyles.px16, plaiStyles.mb16]}>
              {/* Gender */}
              <OptionCard
                label={t('Epos:gender')}
                style={[plaiStyles.flex, plaiStyles.row]}
                insideStyle={[plaiStyles.flex, plaiStyles.mr8]}
                theme="border"
                data={GenderList}
                selected={ocrResult?.clientGender}
                onSelected={() => { }}
                uniqueTestId='gender'
              />
            </View>
            <View style={[plaiStyles.px16, plaiStyles.mb12]}>
              {renderWithTextLabel({
                label: t('Epos:date_of_birth'),
                value: ocrResult?.clientDateBirth || '',
              })}
            </View>
            <View style={[plaiStyles.px16, plaiStyles.mb12]}>
              {/* Client City Birth */}
              {renderWithTextLabel({
                label: t('Epos:city_birth'),
                value: ocrResult?.clientCityBirth || '',
              })}
            </View>
            <View style={[plaiStyles.px16, plaiStyles.mb12]}>
              {renderWithTextLabel({
                label: t('Epos:civics'),
                value: ocrResult?.clientCivics?.name || '',
              })}
            </View>
            <View style={[plaiStyles.px16, plaiStyles.mb12]}>
              {renderWithTextLabel({
                label: t('Epos:marital_status'),
                value: ocrResult?.clientMaritalStatus?.label || '',
              })}
            </View>
            <View style={[plaiStyles.px16]}>
              {renderWithTextLabel({
                label: t('Epos:religion'),
                value: ocrResult?.clientReligion?.label || '',
              })}
            </View>
          </View>
          {/* End of Section (Informasi Pribadi) */}
          {/* KTP Informations Section */}
          <View style={[plaiStyles.mb32, plaiStyles.pb12, spajOcrStyle.borderSeperateSection]}>
            {renderBorderLeftRed('Informasi KTP')}
            <View style={[plaiStyles.px16, plaiStyles.mb12]}>
              {renderWithTextLabel({
                label: t('Epos:idcard_number'),
                value: ocrResult?.clientIdCardNumber || '',
              })}
            </View>
            <View style={[plaiStyles.px16, plaiStyles.mb12]}>
              <OptionCard
                label={t('Epos:lifetime_validity_period')}
                style={[plaiStyles.flex, plaiStyles.row]}
                insideStyle={[plaiStyles.flex, plaiStyles.mr8]}
                theme="border"
                data={additionalValidationSPAJModal}
                selected={ocrResult?.clientMassApplies}
                onSelected={() => { }}
                uniqueTestId='lifetime-validity-period'
              />
            </View>
            {ocrResult?.clientMassApplies === 'N' && (
              <View style={[plaiStyles.px16, plaiStyles.mb12]}>
                <InputDate
                  formatDate="YYYY-MM-DD"
                  label={t('Epos:mass_valid_until')}
                  placeholder={t('Epos:select_date')}
                  value={ocrResult?.clientMassValidUntil}
                  setValue={() => { }}
                  error={undefined}
                  disabled={true}
                  id="inputdate-mass-valid-until"
                />
              </View>
            )}
          </View>
          {/* End of KTP Informations Section */}

          {/* KTP Address Section */}
          {ocrResult?.clientIdCardNumber || ocrResult?.clientIdCardNumber === '-' ? (
            <View style={[plaiStyles.mb32]}>
              {renderBorderLeftRed('Alamat KTP')}
              <View style={[plaiStyles.px16, plaiStyles.mb24]}>
                <Text>
                  {renderWithTextLabel({
                    label: t('Epos:residence_address'),
                    value: ocrResult?.residanceAddress || '',
                  })}
                </Text>
              </View>
              <View style={[plaiStyles.px16, plaiStyles.mb24]}>
                <Text>
                  {renderWithTextLabel({
                    label: t('Epos:neighbourdhood1'),
                    value: ocrResult?.neighbourdhood1 || '',
                  })}
                </Text>
              </View>
              <View style={[plaiStyles.px16, plaiStyles.mb24]}>
                <Text>
                  {renderWithTextLabel({
                    label: t('Epos:neighbourdhood2'),
                    value: ocrResult?.neighbourdhood2 || '',
                  })}
                </Text>
              </View>
              <View style={[plaiStyles.px16, plaiStyles.mb24]}>
                <Text>
                  {renderWithTextLabel({
                    label: t('Epos:district'),
                    value: ocrResult?.district || '',
                  })}
                </Text>
              </View>
              <View style={[plaiStyles.px16, plaiStyles.mb24]}>
                <Text>
                  {renderWithTextLabel({
                    label: t('Epos:urban_village'),
                    value: ocrResult?.urbanVillage || '',
                  })}
                </Text>
              </View>
              <View style={[plaiStyles.px16, plaiStyles.mb24]}>
                <Text>
                  {renderWithTextLabel({
                    label: t('Epos:province'),
                    value: ocrResult?.province || '',
                  })}
                </Text>
              </View>
              <View style={[plaiStyles.px16, plaiStyles.mb32]}>
                <Text>
                  {renderWithTextLabel({
                    label: t('Epos:city_regency'),
                    value: ocrResult?.cityRegency || '',
                  })}
                </Text>
              </View>
            </View>
          ) : (
            <></>
          )}
          {/* End of Section KTP Address */}
        </View>
      </ScrollView>
    </PruScreen>
  );
};
