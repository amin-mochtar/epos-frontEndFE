import { View, Text, ScrollView, BackHandler } from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { StackActions, useNavigation } from '@react-navigation/native';
import { Trans, useTranslation } from 'react-i18next';
import { Controller, SubmitHandler, useFieldArray, useForm, useWatch } from 'react-hook-form';
import { EposDoksulRoutes, EposRoutes } from '../../../navigation';
import { PruColor, PruScreen } from 'common_ui_components';
import {
  DropdownField,
  InputField,
  ModalInformation,
  plaiStyles,
  sanitizedLetterText,
  sanitizedText,
  InputDate,
  onChangeNameFormating,
  TCommonConstantData,
} from 'plai_common_frontend';
import { DoksulHeader, EposFooter, EposHeader, InfoBar, NumberTitle, OptionCard, SectionTitle, AsteriskWrapper } from '../../../components';
import { Button } from 'common_ui_components/app/components-ui';
import { GenderList, benefiteList, checkMainParticipant, statement, waqfPledgeList, ISPAJData, ISQSDetail, validateObject, DEFAULT_OPTIONAL_DATA, ISummaryProposal, WR_SHARIA_CONVENT, removeMainWordingBeneficiary } from '../../../utilities';
import { TFormBeneficiaryCandidate, defaultFormBeneficiaryCandidate } from './spaj-beneficiary-candidate.type';
import { ValidationForm, defaultOptionalData, productType } from '../../../utilities/common-function';
import { IAdditionalForms, useEposRealm, useObject } from '../../../database';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/reducer';
import { EposState } from '../../../redux';
import moment from 'moment';

const validationPersentace = (value: number) => {
  return value % 5 === 0 || 'harus kelipatan 5';
};

const defaultMarital = {
  key: '',
  label: '',
};

export const SPAJBeneficiaryCandidateScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const { updateSPAJByKey, updateSummaryByKey, updateSPAJStatusSubMenu, getCustomerStorageById, getSPAJById, getSQSById, getSummaryProposalById, onUpdateAdditionalForms } = useEposRealm();
  const { selectedSQSId, proposalId, spajId, isDoksul, isDoksulCTA, additionalFormsId } = useSelector<RootState, EposState>((state) => state.epos);
  const summaryProposalById = getSummaryProposalById(proposalId) as ISummaryProposal;
  const AdditionalForms = useObject<IAdditionalForms>('AdditionalForms', additionalFormsId as never);
  const RSQSData = getSQSById(selectedSQSId) as ISQSDetail;
  const RSPAJData = getSPAJById(spajId) as ISPAJData;
  const policyType = summaryProposalById ? summaryProposalById.shariaFlag : '';
  const wording = WR_SHARIA_CONVENT[policyType];
  const defaultBeneficiary = RSPAJData?.beneficiary ? JSON.parse(RSPAJData?.beneficiary) : null;
  const [isModal, setIsModal] = useState({
    visible: false,
    desc: ''
  });
  const [isGenderDisableForm, setIsGenderDisableForm] = useState<boolean>(false);

  const { isWakafHidden, benefiteListCode, businessEntityCode, wakafPledgeList } = useMemo(() => {
    let initialBenefitCode;
    let wakafPledgeList = waqfPledgeList;
    switch (RSQSData?.product?.key) {
      case 'L1Q':
        initialBenefitCode = ['SO', 'DA', 'FA', 'MO', 'WI', 'GP', 'UA', 'NN', 'O', 'MM', 'BS'];
        wakafPledgeList = waqfPledgeList.filter((item) => item.key !== '> 45%');
        break;

      case 'E1O':
        initialBenefitCode = ['SO', 'DA', 'FA', 'MO', 'WI', 'GP', 'UA', 'NN', 'O', 'MM', 'BS', 'HU'];
        break;

      case 'E1OP':
        initialBenefitCode = ['SO', 'DA', 'FA', 'MO', 'WI', 'GP', 'UA', 'NN', 'O', 'MM', 'BS', 'HU'];
        break;

      case 'C16':
        initialBenefitCode = [
          'SO',
          'DA',
          'FA',
          'BU',
          'MO',
          'WI',
          'GP',
          'UA',
          'EM',
          'NN',
          'O',
          'MM',
          'PH',
          'KR',
          'BS',
          'HU',
        ];
        break;
      case 'T1Q':
      case 'T1P':
        initialBenefitCode = [
          'AA',
          'SO',
          'DA',
          'FA',
          'BU',
          'MO',
          'WI',
          'GP',
          'UA',
          'EM',
          'NN',
          'O',
          'MM',
          'KR',
          'BS',
          'HU',
          'WL',
          'YY',
        ];
        break;
      case 'L1WR':
      case 'L1WD':
        initialBenefitCode = [
          'AA',
          'SO',
          'DA',
          'FA',
          'BU',
          'MO',
          'WI',
          'GP',
          'UA',
          'EM',
          'NN',
          'O',
          'MM',
          'KR',
          'BS',
          'HU',
          'WL',
          'YY',
        ];
        break;

      case 'U17R':
      case 'U17D':
        initialBenefitCode = [
          'AA',
          'SO',
          'DA',
          'FA',
          'BU',
          'MO',
          'WI',
          'GP',
          'UA',
          'EM',
          'NN',
          'O',
          'MM',
          'PH',
          'KR',
          'BS',
          'HU',
          'WL',
          'YY',
        ];
        break;
      case 'U13':
        initialBenefitCode = ['AA', 'SO', 'DA', 'FA', 'BU', 'MO', 'WI', 'GP', 'UA', 'NN', 'O', 'BS', 'HU']
        break
      case 'H15':
      case 'H14':
      case 'U12':
      default:
        initialBenefitCode = benefiteList.map(benefit => benefit.code);
        break;
    }

    return {
      benefiteListCode: initialBenefitCode.filter(code => code !== 'PH'),
      businessEntityCode: ['BU', 'KR', 'YY'],
      isWakafHidden: ['E1O', 'E1OP', 'H14', 'H15', 'C16', 'U17R', 'U17D'].includes(RSQSData?.product?.key ?? ''),
      wakafPledgeList,
    };
  }, []);

  const {
    control,
    getValues,
    setValue,
    handleSubmit,
    watch,
    formState: { errors, isValid },
  } = useForm<TFormBeneficiaryCandidate>({
    mode: 'onChange',
    defaultValues: useMemo(() => {
      let result = defaultFormBeneficiaryCandidate;
      if (RSPAJData?.beneficiary !== null || RSPAJData?.beneficiary !== '') {
        result = defaultBeneficiary;
      }
      return result as any;
    }, []),
  });

  const waqfProgram = watch('waqfProgram');
  const mainParticipant = useMemo(() => checkMainParticipant(summaryProposalById?.productCode, RSQSData?.policyType, !['U12', 'U13'].includes(RSQSData?.product?.key ?? '')), []);

  const { fields, append, remove } = useFieldArray({
    name: 'beneficiaryCandidateInfo',
    control,
  });

  useEffect(() => {
    if (fields.length === 0) {
      append({
        fullname: '',
        relationshipCandidate: DEFAULT_OPTIONAL_DATA,
        gender: DEFAULT_OPTIONAL_DATA,
        dateBirth: '',
        percentage: '0',
        idNumber: ''
      });
    }
  }, []);

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', onBack);

    return () => backHandler.remove();
  }, [isValid]);

  const isLifeAssuredSelf = useMemo(() => {
    return summaryProposalById?.policyHolderName == summaryProposalById?.lifeAssuredName
  }, [summaryProposalById?.policyHolderName, summaryProposalById?.lifeAssuredName]);

  useEffect(() => {
    if (isDoksul) {
      setValue('waqfProgram', { key: 'Y', label: t('Epos:yes') });
    }
  }, [isDoksul]);

  const selectedWaqfProgram = (value: TCommonConstantData) => {
    if (value?.key == 'Y' && !isLifeAssuredSelf && summaryProposalById?.shariaFlag == 'sharia') {
      setIsModal({
        visible: true,
        desc: `Program Wakaf dapat diberikan jika Pemegang Polis sama dengan ${mainParticipant}.`
      })
      return { key: 'N', label: t('Epos:no') }
    } else {
      return value
    }
  }


  const beneficiaryCandidateInfo = useWatch({ control, name: 'beneficiaryCandidateInfo' });

  const calculateAccumulatedPercentage = () => {
    return beneficiaryCandidateInfo?.reduce((total, item) => total + parseFloat(item.percentage || '0'), 0);
  };

  const disableGender = useMemo(() => {
    if (beneficiaryCandidateInfo) {
      const disableGender = beneficiaryCandidateInfo.map((item) => item.relationshipCandidate?.gender ? GenderList.map((item) => item.key).includes(item?.gender?.key) : false)
      return disableGender
    }
    return [false]

  }, [beneficiaryCandidateInfo])

  const totalAccumulate = calculateAccumulatedPercentage();

  const isAccumulate = totalAccumulate > 100 || totalAccumulate < 100;

  const mainInsuredMaritalStatus = useMemo(() => {
    return RSQSData?.clientIdSelected[0]
      ? getCustomerStorageById(RSQSData.clientIdSelected[0])?.clientMarriageStatus
      : DEFAULT_OPTIONAL_DATA;
  }, [RSPAJData?.primaryInsured]);

  const lifeAssuredDataMaritalStatus = useMemo(() => {
    return RSQSData?.clientIdSelected[0]
      ? getCustomerStorageById(RSQSData.clientIdSelected[0])?.clientMarriageStatus
      : DEFAULT_OPTIONAL_DATA;
  }, [RSQSData?.clientIdSelected[0]]);

  const filteredRelationshipList = useMemo(() => {
    const _list = benefiteList.filter((item) => benefiteListCode.includes(item.code));
    let list = removeMainWordingBeneficiary(_list, RSQSData?.product?.key || '');
    if (isDoksul && !isDoksulCTA) {
      return list
    }

    const maritalStatus = isLifeAssuredSelf
      ? RSPAJData?.policyHolderData
        ? JSON.parse(RSPAJData.policyHolderData)?.clientMaritalStatus
        : lifeAssuredDataMaritalStatus
      : RSPAJData?.primaryInsured
        ? JSON.parse(RSPAJData.primaryInsured)?.clientMaritalStatus
        : mainInsuredMaritalStatus;
    if (maritalStatus?.key === 'S' || !maritalStatus?.key) {
      return list.filter((item) => !/(Anak Laki-Laki|Anak Perempuan|Suami|Istri)/i.test(item.konven));
    }
    if (maritalStatus?.key === 'W') {
      return list.filter((item) => !/(suami|istri)/i.test(item.konven));
    }

    return list;
  }, [isLifeAssuredSelf, mainInsuredMaritalStatus, benefiteList, RSPAJData, isDoksul, isDoksulCTA, lifeAssuredDataMaritalStatus]);


  const AddItem = () => {
    if (beneficiaryCandidateInfo?.length < 10) {
      const currentItems = getValues('beneficiaryCandidateInfo');
      setValue('beneficiaryCandidateInfo', [
        ...currentItems,
        {
          fullname: '',
          relationshipCandidate: DEFAULT_OPTIONAL_DATA,
          gender: DEFAULT_OPTIONAL_DATA,
          dateBirth: '',
          percentage: '0',
          idNumber: ''
        },
      ]);
    } else {
      setIsModal({
        visible: true,
        desc: t('Epos:max_add_investment_funds')
      });
    }
  };

  const removeItem = (index: number) => {
    const currentItems = getValues('beneficiaryCandidateInfo');
    currentItems.splice(index, 1);
    setValue('beneficiaryCandidateInfo', [...currentItems]);
  };

  const onBack = () => {
    if (spajId) {
      onSave(getValues());
    }
    if (RSPAJData?.beneficiary) {
      if (isValid) {
        updateSPAJStatusSubMenu(spajId, EposRoutes.SPAJ_BENEFICIARY_CANDIDATE, {
          key: 'status',
          value: true,
        });
      } else {
        updateSPAJStatusSubMenu(spajId, EposRoutes.SPAJ_BENEFICIARY_CANDIDATE, {
          key: 'status',
          value: false,
        });
      }
    }

    if (isDoksul) {
      navigation.navigate(EposDoksulRoutes.EPOSDOKSUL, { screen: EposDoksulRoutes.DOKSUL, params: { isBackHomeDoksul: true } });
    } else {
      navigation.dispatch(StackActions.replace(EposRoutes.SPAJ_DATA_COMPLETENESS));
    }
    return true;
  };

  const onSave = (data: TFormBeneficiaryCandidate) => {
    const _AdditionalForms = {
      ...AdditionalForms?.toJSON(),
      waqfInsuranceBenefits: "",
    } as IAdditionalForms;
    onUpdateAdditionalForms(_AdditionalForms);
    updateSPAJByKey(RSPAJData.spajId, {
      key: 'beneficiary',
      value: JSON.stringify(data)
    });

    updateSummaryByKey(proposalId, {
      key: 'lastState',
      value: EposRoutes.SPAJ_BENEFICIARY_CANDIDATE,
    });
  };

  const onContinue: SubmitHandler<TFormBeneficiaryCandidate> = async (data) => {
    const totalPercentage = await calculateAccumulatedPercentage();

    if (isDoksul) {
      await onSave(data);
      navigation.dispatch(StackActions.replace(EposRoutes.WAKAF));
    } else if (totalPercentage === 100) {
      await onSave(data);
      await updateSPAJStatusSubMenu(spajId, EposRoutes.SPAJ_BENEFICIARY_CANDIDATE, {
        key: 'status',
        value: true,
      });
      navigation.dispatch(StackActions.replace(EposRoutes.SPAJ_DOC_PROSPECTIVE_POLICYHOLDER));
    } else {
      setIsModal({
        visible: true,
        desc: t('Epos:completeAccumulation')
      })
    }
  };

  const pdpWordingWarningBenefLitigasi = useMemo(() => {
    const point1 = `<asterisk>*</asterisk>Mohon Anda menentukan besarnya Manfaat Asuransi dalam kelipatan 5% dengan total 100%. Apabila % tidak diisi, secara otomatis Manfaat Asuransi akan dibagi rata di antara pihak-pihak yang akan menerima Manfaat Asuransi.\n`;
    const point2 = `<asterisk>**</asterisk>Mohon agar Anda memperhatikan keterikatan/hubungan antara Calon Penerima Manfaat Asuransi dengan Calon ${wording.lifeAssured} yang dapat dibuktikan dengan suatu dokumentasi pendukung atau bukti tertulis lainnya yang wajar dan relevan.\n`;
    const point3 = `Catatan: Perlu diketahui bahwa dalam hal ${wording.insurerManager} menyetujui ${policyType === 'sharia' ? 'pengajuan ' : ''}pembayaran ${policyType === 'sharia' ? 'Manfaat Asuransi atau santunan' : 'klaim'} atas diri ${wording.lifeAssured}, ${wording.insurerManager} akan membayarkan ke Pemegang Polis. Jika Pemegang Polis sudah meninggal dunia, maka ${wording.insurerManager} akan membayarkan ke Penerima Manfaat. Ketentuan yang lebih rinci dapat dilihat di ketentuan Polis.`
    return `${point1}${point2}${point3}`;
  }, [])

  return (
    <PruScreen backgroundColor={PruColor.white}>
      <>
        <View style={[plaiStyles.spacing, plaiStyles.flex]}>
          {isDoksul ?
            <></>
            : <>
              <EposHeader onPressSpajCompleteness={onBack} />
              <NumberTitle number="5" text={`1/1 ${t('Epos:beneficiary_candidate')}`} />
            </>
          }
          <ScrollView>
            {isDoksul ? (
              <DoksulHeader title={'Penerima Manfaat'} onPress={onBack} />
            ) : (
              <>
                <Text style={plaiStyles.fontHeaderTitle}>{t('Epos:insurance_beneficiary_candidate')}</Text>
                <Text style={[plaiStyles.mt8, plaiStyles.mb8, plaiStyles.fontGrey66Thin]}>
                  {t('Epos:input_data_related_insurance')}
                </Text>
              </>
            )}
            {((isWakafHidden ? !isWakafHidden : policyType == 'sharia') || isDoksul) && (
              <>
                <SectionTitle text={t('Epos:form_waqf')} />
                <Controller
                  name={'waqfProgram'}
                  control={control}
                  rules={ValidationForm({ isRequired: true })}
                  render={({ field: { onChange, value } }) => (
                    <>
                      <OptionCard
                        required={true}
                        label={t('Epos:waqf_label_question')}
                        style={[plaiStyles.flex, plaiStyles.row]}
                        insideStyle={[plaiStyles.flex, plaiStyles.mr8]}
                        theme="border"
                        data={statement}
                        selected={value}
                        onSelected={(value) => onChange(selectedWaqfProgram(value))}
                        onDisabled={() => isDoksul}
                        error={errors?.waqfProgram}
                        uniqueTestId='waqf-program'
                      />
                    </>
                  )}
                />

                <View
                  style={[plaiStyles.bgOrangeThin, plaiStyles.py8, plaiStyles.px16, plaiStyles.br8, plaiStyles.mt24]}
                >
                  <Text style={[plaiStyles.fontOrange, plaiStyles.font12, plaiStyles.lineH18]}>
                    <Trans
                      i18nKey="Epos:waqf_note"
                      components={{ i: <Text style={[plaiStyles.fontItalic, plaiStyles.fontBold]} /> }}
                    />
                  </Text>
                </View>

                {waqfProgram?.key === 'Y' && (
                  <Controller
                    name={'waqfPledge'}
                    control={control}
                    rules={ValidationForm({ isRequired: true })}
                    render={({ field: { onChange, value } }) => (
                      <>
                        <OptionCard
                          required={true}
                          label={t('Epos:select_the_waqf_testament_form')}
                          theme="border"
                          data={wakafPledgeList}
                          selected={value}
                          onSelected={onChange}
                          error={errors?.waqfProgram}
                          uniqueTestId='waqf-pledge'
                        />
                      </>
                    )}
                  />
                )}
              </>
            )}

            <SectionTitle text={t('Epos:beneficiary_information')} />

            {!isDoksul && (
              <>
                <View
                  style={[
                    plaiStyles.flex,
                    plaiStyles.row,
                    plaiStyles.justifyBetween,
                    plaiStyles.bgGreyB8,
                    plaiStyles.br8,
                    plaiStyles.px16,
                    plaiStyles.py8,
                    plaiStyles.mt16,
                    plaiStyles.mb16,
                  ]}
                >
                  <Text style={plaiStyles.fontGrey33}>Total Persentase</Text>
                  <Text style={plaiStyles.fontGrey33Bold}>{totalAccumulate}%</Text>
                </View>

                {isAccumulate && (
                  <View
                    style={[plaiStyles.bgOrangeThin, plaiStyles.br8, plaiStyles.px12, plaiStyles.py8, plaiStyles.br4]}
                  >
                    <Text style={[plaiStyles.fontYellow, plaiStyles.font12]}>
                      Total Alokasi presentasi manfaat harus 100%
                    </Text>
                  </View>
                )}
              </>
            )}

            {fields.map((field: any, index: number) => {
              const relationshipCandidate = getValues(`beneficiaryCandidateInfo.${index}.relationshipCandidate`);
              const isBusinessEntity = businessEntityCode.includes(relationshipCandidate?.code);
              return (
                <View key={field.id}>
                  <Controller
                    name={`beneficiaryCandidateInfo.${index}.fullname`}
                    control={control}
                    rules={ValidationForm({
                      isRequired: true, maxLength: 60, pattern: {
                        value: /^[,./'()a-zA-Z\s][a-zA-Z\s,./'()]*$/,
                        message: 'Tidak Boleh Angka dan Karakter Khusus',
                      }
                    })}
                    render={({ field: { onChange, value } }) => (
                      <InputField
                        rightItem="counter"
                        label={t('Epos:fullname')}
                        placeholder={t('Epos:enter_customer_name')}
                        maxLength={60}
                        value={value}
                        setValue={(value) => onChange(onChangeNameFormating(value))}
                        error={errors?.beneficiaryCandidateInfo?.[index]?.fullname}
                        id={`input-fullname-${index}`}
                      />
                    )}
                  />

                  <Controller
                    name={`beneficiaryCandidateInfo.${index}.relationshipCandidate`}
                    control={control}
                    rules={ValidationForm({ validate: validateObject })}
                    render={({ field: { onChange, value } }) => (
                      <DropdownField
                        labelMap={{
                          title: `Hubungan dengan ${mainParticipant} <asterisk>(**)</asterisk>`,
                          placeholder: t('Epos:select_relationship'),
                        }}
                        keyMap={{
                          value: 'code',
                          label: RSQSData?.policyType === 'conventional' ? 'konven' : 'syariah',
                          search: RSQSData?.policyType === 'conventional' ? 'konven' : 'syariah',
                        }}
                        search={{
                          isOnChangeSearch: true,
                        }}
                        data={filteredRelationshipList?.filter((item) => item?.code !== 'PH')}
                        selected={value}
                        onSelected={(value) => {
                          onChange(value);
                          const findGender = value?.gender ? GenderList.find(item => item.key == value?.gender) : DEFAULT_OPTIONAL_DATA as any;
                          setValue(`beneficiaryCandidateInfo.${index}.gender`, findGender, { shouldValidate: true });
                        }}
                        error={errors.beneficiaryCandidateInfo?.[index]?.relationshipCandidate}
                        id={`dropdown-beneceficiary-relationship-${index}`}
                      />
                    )}
                  />

                  <Controller
                    name={`beneficiaryCandidateInfo.${index}.gender`}
                    control={control}
                    rules={ValidationForm({ validate: !isBusinessEntity ? validateObject : () => { } })}
                    render={({ field: { onChange, value } }) => (
                      <OptionCard
                        label={t('Epos:gender')}
                        theme="border"
                        required
                        style={[plaiStyles.flex, plaiStyles.row]}
                        insideStyle={[plaiStyles.flex, plaiStyles.mr8]}
                        data={GenderList}
                        selected={value}
                        onSelected={onChange}
                        error={!isBusinessEntity && errors?.beneficiaryCandidateInfo?.[index]?.gender}
                        onDisabled={() => isBusinessEntity || isGenderDisableForm || disableGender[index]}
                        uniqueTestId={`gender-${index}`}
                      />
                    )}
                  />

                  <Controller
                    name={`beneficiaryCandidateInfo.${index}.dateBirth`}
                    control={control}
                    rules={ValidationForm({ isRequired: true })}
                    render={({ field: { onChange, value } }) => (
                      <InputDate
                        formatDate="YYYY-MM-DD"
                        label={t('Epos:date_of_birth')}
                        placeholder={t('Epos:select_date')}
                        value={value}
                        setValue={onChange}
                        minDate='1954-01-01'
                        maxDate={moment().toISOString()}
                        error={errors.beneficiaryCandidateInfo?.[index]?.dateBirth}
                        id={`inputdate-dob-${index}`}
                      />
                    )}
                  />

                  {!isDoksul && (
                    <Controller
                      name={`beneficiaryCandidateInfo.${index}.percentage`}
                      control={control}
                      rules={ValidationForm({ isRequired: true, validate: validationPersentace })}
                      render={({ field: { onChange, value } }) => (
                        <InputField
                          label={<Text>{t('Epos:percentage')}<AsteriskWrapper>*</AsteriskWrapper></Text>}
                          placeholder={t('Epos:enter_percentage')}
                          value={value}
                          setValue={(value) => {
                            onChange(sanitizedText(value));
                          }}
                          maxLength={3}
                          keyboardType="phone-pad"
                          error={errors.beneficiaryCandidateInfo?.[index]?.percentage}
                          id={`input-percentage-${index}`}
                        />
                      )}
                    />
                  )}
                  {fields.length > 1 && (
                    <Button
                      style={[plaiStyles.py8, plaiStyles.borderGreycc, plaiStyles.mt24]}
                      textStyle={plaiStyles.fontGrey33}
                      text={t('Calculator:remove')}
                      onPress={() => removeItem(index)}
                    />
                  )}
                </View>
              );
            })}
            <Button
              style={[plaiStyles.bgBtnSecondary, plaiStyles.mt24, plaiStyles.mb16]}
              textStyle={plaiStyles.fontRed}
              text={t('Epos:add_insurance_beneficiary')}
              onPress={AddItem}
            />

            <InfoBar
              variant='warn'
              iconStyle='style 2'
              isUseHtmlFormatText={true}
              withIcon={false}
              content={pdpWordingWarningBenefLitigasi}
            />
            <ModalInformation
              visible={isModal?.visible}
              title={'Informasi'}
              desc={isModal?.desc}
              buttonPrimary={{
                text: 'Ok',
                onPress: () => {
                  setIsModal({
                    visible: false,
                    desc: ''
                  })
                },
              }}
            />
          </ScrollView>
        </View>
        {isDoksul ? (
          <View style={[plaiStyles.px16, plaiStyles.bgwhite]}>
            <Button
              style={[!isValid ? plaiStyles.bgBtnDisabled : plaiStyles.bgBtnRed, plaiStyles.mt24, plaiStyles.mb16]}
              textStyle={[plaiStyles.fontWhite, plaiStyles.fontBold]}
              text={'Selanjutnya'}
              disabled={!isValid}
              onPress={handleSubmit(onContinue)}
            />
          </View>
        ) : (
          <EposFooter
            position={6}
            leftButton={{
              onPress: onBack,
            }}
            rightButton={{
              disabled: false,
              onPress: handleSubmit(onContinue),
            }}
          />
        )}
      </>
    </PruScreen>
  );
};
