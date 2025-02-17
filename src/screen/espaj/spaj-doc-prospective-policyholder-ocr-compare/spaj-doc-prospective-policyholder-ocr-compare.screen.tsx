/* eslint-disable @typescript-eslint/no-explicit-any */
import { StackActions, useNavigation, useRoute } from '@react-navigation/native';
import { View, Text } from 'native-base';
import { InputField, plaiStyles, InputDate, DropdownField, ModalInformation, REGION_PHONE_CODE } from 'plai_common_frontend';
import { useEffect, useMemo, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import Icon from 'react-native-vector-icons/AntDesign';
import { useEposRealm, useObject } from '../../../database';
import { useSelector } from 'react-redux';
import { RootState } from 'redux/reducer';
import { EposState } from '../../../redux';
import { useTranslation } from 'react-i18next';
import { PruColor, PruScreen } from 'common_ui_components';
import { BackHandler, Pressable, ScrollView } from 'react-native';
import moment from 'moment';
import { OptionCard } from '../../../components/option-card/option-card';
import {
  GenderList,
  additionalValidationSPAJModal,
  calculateAge,
  maritalStatusList,
  religionList,
  ValidationForm,
  ISPAJData,
  ISQSDetail,
  ICustomerStorage,
  defaultClientCivics,
} from '../../../utilities';
import { Button } from 'common_ui_components/app/components-ui';
import { EposRoutes } from '../../../navigation';
import { TFormOCRCompare } from './spaj-doc-prospective-policyholder-ocr-compare.type';
import hasErrorProperty from 'common_ui_components/app/components-ui/form/form-hook/utils/has-error-property';
import { spajOcrStyle } from './spaj-doc-prospective-policyholder-ocr-compare.stye';
import { assign, isEmpty, upperCase } from 'lodash';
import i18n from 'i18next';
import { pruTestID } from 'common_services_frontend';

const maritalStatusMappingKTP: { [key: string]: any } = {
  'BELUM KAWIN': { label: 'Belum Menikah', key: 'S' },
  KAWIN: { label: 'Menikah', key: 'M' },
  'CERAI HIDUP': { label: 'Duda/Janda', key: 'W' },
  'CERAI MATI': { label: 'Duda/Janda', key: 'W' },
};

const civicsStatusMapping: { [key: string]: any } = {
  WNI: defaultClientCivics()
};

const genderStatusMapping: { [key: string]: any } = {
  'LAKI-LAKI': { label: 'Pria', key: 'M' },
  PEREMPUAN: { label: 'Wanita', key: 'F' },
};

const religionStatusMapping: { [key: string]: any } = {
  islam: { label: 'Islam', key: 'I' },
  kristen: { label: 'Kristen', key: 'KR' },
  katolik: { label: 'Katolik', key: 'KT' },
  hindu: { label: 'Hindu', key: 'H' },
  budha: { label: 'Budha', key: 'B' },
  other: { label: i18n.t('Epos:other'), key: 'O' },
};

const OCR_KTP_MAP: any = {
  clientIdCardNumber: 'nik',
  clientName: 'nama',
  clientDateBirth: 'tanggal_lahir',
  clientCityBirth: 'tempat_lahir',
  clientJob: 'pekerjaan',
  clientCivics: 'kewarganegaraan',
  clientReligion: 'agama',
  clientGender: 'jenis_kelamin',
  clientMaritalStatus: 'status_perkawinan',
  clientMassApplies: 'masa_berlaku',
};

const fieldTypeDocs: { [key: string]: string } = {
  clientName: 'sqs',
  clientGender: 'sqs',
  clientDateBirth: 'sqs',
  clientCityBirth: 'spaj',
  clientCivics: 'spaj',
  clientReligion: 'spaj',
  clientIdCardNumber: 'spaj',
  clientMaritalStatus: 'spaj',
  clientMassApplies: 'spaj',
};

const customAnd = (a: unknown, b: unknown) => {
  if (a && b) {
    return true;
  } else if (!a && !b) {
    return true;
  } else {
    return false;
  }
};

type IRSPAJUserDataType = 'primaryInsured' | 'premiumPayor' | 'policyHolderData' | 'additionalInsured';
type IOCRUserDataType = 'primaryInsurance' | 'payor' | 'polis' | 'additionalInsurance';

export const SPAJDocProspectivePolicyholderOCRCompareScreen = () => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const routes: any = useRoute();
  const isPrimaryInsurance = routes.params?.isPrimaryInsurance;
  const isPayor = routes.params?.isPayor;
  const isAdditionalInsurance = routes.params?.isAdditionalInsurance;
  const { onUpdateSPAJ, onUpdateCustomer, getCustomerStorageById, updateSummaryByKey } = useEposRealm();
  const { spajId, selectedSQSId, proposalId } = useSelector<RootState, EposState>((state) => state.epos);
  const RSPAJData = useObject<ISPAJData>('SPAJData', spajId as never);
  const RSQSData = useObject<ISQSDetail>('SQSDetail', selectedSQSId as never);
  const RPayorData = isPayor && RSPAJData?.premiumPayor && JSON.parse(RSPAJData?.premiumPayor);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const _clientId: string[] = RSQSData?.clientIdSelected!;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const RSQSLifeAssuredData = getCustomerStorageById(_clientId[0]!);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const mainAssuredIndex = isAdditionalInsurance ? 2 : 1;
  const RSQSMainLifeAssuredData = _clientId.length >= 2 ? getCustomerStorageById(_clientId[mainAssuredIndex]!) : null;
  const lifeAssuredData = (isPrimaryInsurance || isAdditionalInsurance) ? RSQSMainLifeAssuredData : isPayor ? RPayorData : RSQSLifeAssuredData;
  const RSPAJUserDataType: IRSPAJUserDataType = isPrimaryInsurance
    ? 'primaryInsured'
    : isAdditionalInsurance
      ? 'additionalInsured'
      : isPayor
        ? 'premiumPayor'
        : 'policyHolderData';
  const OCRUserDataType: IOCRUserDataType = isPrimaryInsurance
    ? 'primaryInsurance'
    : isAdditionalInsurance
      ? 'additionalInsurance'
      : isPayor
        ? 'payor'
        : 'polis';

  const RSPAJUserData =
    RSPAJData && RSPAJData[RSPAJUserDataType]
      ? RSPAJData[RSPAJUserDataType] && JSON.parse(RSPAJData[RSPAJUserDataType])
      : '';
  const conditionalPolisIsNotPrimaryInsurance = customAnd(isPrimaryInsurance, RSPAJData?.primaryInsured);
  const RSPAJOcr = RSPAJData?.spajOcr && JSON.parse(RSPAJData?.spajOcr);
  const ocrdata = RSPAJOcr && RSPAJOcr[OCRUserDataType]?.ocrResult;
  const redirectedByDataType = {
    primaryInsurance: () =>
      navigation.dispatch(StackActions.replace(EposRoutes.SPAJ_DOC_PRIMARY_PARTICIPANT_CANDIDATE)),
    payor: () => navigation.dispatch(StackActions.replace(EposRoutes.SPAJ_DOC_PREMIUM_PAYOR)),
    polis: () => navigation.dispatch(StackActions.replace(EposRoutes.SPAJ_DOC_PROSPECTIVE_POLICYHOLDER)),
    additionalInsurance: () => navigation.dispatch(StackActions.replace(EposRoutes.SPAJ_DOC_PRIMARY_PARTICIPANT_CANDIDATE, routes.params)),
  };
  const [adjustedData, setAdjustedData] = useState<string[]>([]);
  const [isModalConfirm, setIsModalConfirm] = useState<boolean>(false);
  const [isModalDiffData, setIsModalDiffData] = useState<boolean>(false);
  const [isShowDateofClientMassPeriod, setIsShowDateofClientMassPeriod] = useState<boolean>(false);
  const [diffDataForModal, setDiffDataForModal] = useState<{ text: string; onPress: () => void }>({
    text: '',
    onPress: () => { },
  });

  const {
    control,
    handleSubmit,
    getValues,
    setValue,
    clearErrors,
    setError,
    formState: { errors },
  } = useForm<TFormOCRCompare>({
    defaultValues: useMemo(() => {
      let result;

      if (ocrdata) {
        result = ocrdata?.ocrResult;
      }

      return result;
    }, []),
  });

  useEffect(() => {
    const backHandler = BackHandler.addEventListener('hardwareBackPress', onBackBtn);

    return () => backHandler.remove();
  }, []);

  useEffect(() => {
    if (!civicsStatusMapping[ocrdata?.kewarganegaraan] && !ocrdata?.kewarganegaraan) setValue('clientCivics', defaultClientCivics());
  }, []);

  useEffect(() => {
    if (ocrdata && ocrdata?.masa_berlaku) {
      const masaBerlaku = ocrdata?.masa_berlaku;
      if (masaBerlaku === '-' || masaBerlaku === 'SEUMUR HIDUP') setIsShowDateofClientMassPeriod(false);
    }
  }, []);

  const renderBorderLeftRed = (text: string) => {
    return (
      <View style={[plaiStyles.mx16, spajOcrStyle.berderLeftRed]}>
        <Text style={[plaiStyles.pl10]}>{text}</Text>
      </View>
    );
  };

  const onDataAdjustment = (controllerName: any, newVal: any) => {
    const newAdjustment = adjustedData;
    const responseDataAjustment: {
      adjustedData: string[],
      error: {
        controllerName: string,
        errorData: {
          message: string,
          type: string
        }
      },
      value: {
        controllerName: any,
        data: string
      },
      isClearError: boolean
    } = {
      adjustedData: adjustedData,
      error: {
        controllerName: '',
        errorData: {
          message: '',
          type: ''
        }
      },
      value: {
        controllerName: '',
        data: ''
      },
      isClearError: false
    }

    if (isAdjustByUser(controllerName)) {
      const indexToRemove = newAdjustment.indexOf(controllerName);
      let newVal;
      if (indexToRemove !== -1) {
        newAdjustment.splice(indexToRemove, 1);
        const mappedOCRData = OCR_KTP_MAP[controllerName];
        const ocrDataValByMap = ocrdata[mappedOCRData];
        newVal =
          genderStatusMapping[ocrDataValByMap] ||
          civicsStatusMapping[ocrDataValByMap] ||
          maritalStatusMappingKTP[ocrDataValByMap] ||
          religionStatusMapping[ocrDataValByMap?.toLowerCase()] ||
          ocrDataValByMap;
        if (controllerName === 'clientDateBirth') newVal = moment(newVal || new Date(), 'DD-MM-YYYY').format('YYYY-MM-DD');

        responseDataAjustment.value.controllerName = controllerName;
        responseDataAjustment.value.data = newVal;
        responseDataAjustment.isClearError = true;
      }
    } else {
      newAdjustment.push(controllerName);

      if (!newVal) {
        responseDataAjustment.error.controllerName = controllerName;
        responseDataAjustment.error.errorData.message = "Wajib diisi";
        responseDataAjustment.error.errorData.type = 'required';
      }

      responseDataAjustment.value.controllerName = controllerName;
      responseDataAjustment.value.data = newVal || '';
    }

    responseDataAjustment.adjustedData = [...newAdjustment];

    return responseDataAjustment;
  };

  const onTriggerDataAdjustmend = (controllerName: string, newVal: any) => {
    const { adjustedData, error, isClearError, value } = onDataAdjustment(controllerName, newVal);

    setAdjustedData(adjustedData);
    if (error.controllerName && error.errorData.message && error.errorData.type) {
      setError(error.controllerName as any, error.errorData);
    }

    setValue(value.controllerName, value.data);
    if (isClearError) clearErrors();
  }

  const isAdjustByUser = (controllerName: string) => {
    return adjustedData.filter((val) => val === controllerName).length > 0;
  };

  const changeColorForAdjustment = (controllerName: string, newColor: string, defaultColor: string) => {
    const isAdjusted = isAdjustByUser(controllerName);
    if (isAdjusted) return newColor;
    return defaultColor;
  };

  const handleFormSubmit = () => {
    if (!hasErrorProperty(errors)) {
      setIsModalConfirm(true);
    }
  };

  const setRSPAJData = (RSPAJDataJson: any) => {
    const _spajData = {
      ...RSPAJDataJson,
      [RSPAJUserDataType]: JSON.stringify(RSPAJUserData),
      spajOcr: JSON.stringify({
        ...RSPAJOcr,
        [OCRUserDataType]: {
          ...RSPAJOcr[OCRUserDataType],
          isFinish: true,
          compareResult: getValues(),
        },
      }),
    } as ISPAJData;

    return _spajData;
  }

  const onConfirm = async () => {
    const compareFieldsName = [
      'clientName',
      'clientGender',
      'clientDateBirth',
      'clientCityBirth',
      'clientMaritalStatus',
      'clientReligion',
      'clientIdCardNumber',
      'clientMassApplies',
    ];

    let isDiffData = false;
    const diffDataOCRSQS: any = {};
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const values: any = getValues();

    const conditionalComparedField = (fieldName: string, selectedRealmVData: any) => {

      const isValuesIsString = typeof values[fieldName] === 'string';
      const selectedFieldValue = values[fieldName];
      const lowerCaseValues = isValuesIsString ? values[fieldName]?.toLowerCase() : values[fieldName];

      if (isValuesIsString && lowerCaseValues !== selectedRealmVData?.toLowerCase()) {
        assign(diffDataOCRSQS, { [fieldName]: selectedFieldValue });
        return true;
      } else if (selectedFieldValue?.key !== selectedRealmVData?.key) {
        assign(diffDataOCRSQS, { [fieldName]: selectedFieldValue });
        return true;
      }

      return false;
    }

    compareFieldsName.map((fieldName: string) => {
      /**
       * Conditional
       * First Field is checking if fiels is object
       * Second Field is checking if fiels is string
       * Need to check by type because of field has multiple data type
       */

      if (fieldTypeDocs[fieldName] === 'sqs') {
        const selectedLifeAssuredData = lifeAssuredData[fieldName];
        isDiffData = conditionalComparedField(fieldName, selectedLifeAssuredData);
      }

      if (fieldTypeDocs[fieldName] === 'spaj') {
        const selectedSPAJValue = RSPAJUserData[fieldName];
        isDiffData = conditionalComparedField(fieldName, selectedSPAJValue);
      }
    });

    if (isDiffData) {
      let isAnbDiff = false;
      if (diffDataOCRSQS?.clientDateBirth) {
        isAnbDiff = calculateAge(diffDataOCRSQS?.clientDateBirth, true) !== lifeAssuredData?.clientAnb ? true : false;
      }

      setIsModalConfirm(false);
      const isAnbDiffOrClientGenderConditional = isAnbDiff || diffDataOCRSQS?.clientGender;
      if (isAnbDiffOrClientGenderConditional && conditionalPolisIsNotPrimaryInsurance && !isPayor) {

        setDiffDataForModal({
          text: `Terdapat perbedaan data ${diffDataOCRSQS?.clientDateBirth ? 'Tanggal Lahir' : ''}${diffDataOCRSQS?.clientDateBirth && diffDataOCRSQS?.clientGender ? ' / ' : ''
            }${diffDataOCRSQS?.clientGender ? 'Jenis Kelamin' : ''
            } pada SQS dan KTP. Anda akan dibawa ke halaman kalkulator untuk melakukan perhitungan ulang setelah konfirmasi. Apakah anda yakin ingin mengkonfirmasi data diri? `,
          onPress: () => onModalRedirect(diffDataOCRSQS, true),
        });
      } else {
        const wordingDifferenceData = generateWordingForDifferenceData(diffDataOCRSQS);
        setDiffDataForModal(wordingDifferenceData);
      }

      setTimeout(() => {
        setIsModalDiffData(true);
      }, 500);

    } else {
      setIsModalConfirm(false);
      const RSPAJDataJson = RSPAJData?.toJSON();
      const _spajData = setRSPAJData(RSPAJDataJson)

      await setToRealms(_spajData);
      redirectedByDataType[OCRUserDataType]();
    }
  };

  /**
   * Generating Different data sqs, spaj and ocr data for confirm data
   */
  const generateWordingForDifferenceData = (data: { [key: string]: string | Record<string, string> }) => {
    const mappings: Record<string, string> = {
      clientName: 'Nama Lengkap',
      clientCityBirth: 'Kota Kelahiran',
      clientCivics: 'Kewarganegaraan',
      clientMaritalStatus: 'Status Pernikahan',
      clientReligion: 'Agama',
      clientIdCardNumber: 'Nomor Kartu Identitas',
      clientMassApplies: 'Masa Berlaku Identitas',
    };

    let result = '';
    for (const key in data) {
      if (key in data && Object.prototype.hasOwnProperty.call(mappings, key)) {
        result += `${mappings[key]} / `;
      }
    }

    result = result.slice(0, -3);
    return {
      text: `Terdapat perbedaan data ${result} dan KTP. Data akan disesuaikan dengan hasil verifikasi KTP. Apakah anda yakin ingin mengkonfirmasi data diri? `,
      onPress: () => onModalRedirect(data, false),
    }
  };

  /**
   * function for redirect to calculator and changes required data that affect calculator (Client Gender and Client Date Birth)
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const setSPAJUserData = (diffDataOCRSQS: any, RSPAJUserData: any, lifeAssuredData: any) => {
    const _spajUserData = {
      ...RSPAJUserData,
      clientName: diffDataOCRSQS?.clientName || RSPAJUserData?.clientName || lifeAssuredData?.clientName,
      clientGender: diffDataOCRSQS?.clientGender || RSPAJUserData?.clientGender || lifeAssuredData?.clientGender,
      clientDateBirth:
        diffDataOCRSQS?.clientDateBirth || RSPAJUserData?.clientDateBirth || lifeAssuredData?.clientDateBirth,
      clientCityBirth: diffDataOCRSQS?.clientCityBirth || RSPAJUserData?.clientCityBirth,
      clientMaritalStatus: diffDataOCRSQS?.clientMaritalStatus || RSPAJUserData?.clientMaritalStatus,
      clientReligion: diffDataOCRSQS?.clientReligion || RSPAJUserData?.clientReligion,
      clientIdCardNumber: diffDataOCRSQS?.clientIdCardNumber || RSPAJUserData?.clientIdCardNumber,
      clientCivics: diffDataOCRSQS?.clientCivics || RSPAJUserData?.clientCivics,
      clientMassApplies: diffDataOCRSQS?.clientMassApplies || RSPAJUserData?.clientMassApplies,
      clientMassValidUntil: diffDataOCRSQS?.clientMassValidUntil || RSPAJUserData?.clientMassValidUntil,
    };

    return _spajUserData;
  }

  const setCustomerData = (diffDataOCRSQS: any) => {
    const selectedCustomer = isPayor ? lifeAssuredData : lifeAssuredData?.toJSON();
    const clientAnb = isEmpty(diffDataOCRSQS?.clientDateBirth)
      ? selectedCustomer?.clientAnb
      : calculateAge(diffDataOCRSQS?.clientDateBirth, true);

    const newCustomerDiff = {
      ...selectedCustomer,
      clientName: diffDataOCRSQS?.clientName || selectedCustomer?.clientName,
      clientDateBirth: diffDataOCRSQS?.clientDateBirth || selectedCustomer?.clientDateBirth,
      clientAnb: clientAnb,
      clientGender: diffDataOCRSQS?.clientGender || selectedCustomer?.clientGender,
      clientMarriageStatus: diffDataOCRSQS?.clientMaritalStatus || selectedCustomer?.clientMarriageStatus,
    };

    return {
      dataDiff: newCustomerDiff,
      data: selectedCustomer
    };
  }

  const setSPAJData = (_spajUserData: Record<any, any>) => {
    const _spajData = {
      ...JSON.parse(JSON.stringify(RSPAJData?.toJSON())),
      [RSPAJUserDataType]: JSON.stringify(_spajUserData),
      spajOcr: JSON.stringify({
        ...RSPAJOcr,
        [OCRUserDataType]: {
          ...RSPAJOcr[OCRUserDataType],
          isFinish: true,
          compareResult: getValues(),
        },
      }),
    } as ISPAJData;

    return _spajData;
  }

  const setToRealms = async (data: ISPAJData): Promise<void> => {
    await onUpdateSPAJ(data);
  }

  const onModalRedirect = async (diffDataOCRSQS: { [key: string]: any }, isCalculator: boolean) => {
    const customer = setCustomerData(diffDataForModal)
    assign(customer.data, customer.dataDiff);
    const _customerStorage = customer as unknown as ICustomerStorage;
    const _spajUserData = setSPAJUserData(diffDataOCRSQS, RSPAJUserData, lifeAssuredData);
    const _spajData = setSPAJData(_spajUserData);
    setToRealms(_spajData);

    if (!isPayor) {
      await onUpdateCustomer(_customerStorage);
    }

    if (isCalculator) {
      await updateSummaryByKey(proposalId, [
        {
          key: 'lastState',
          value: EposRoutes.CALCULATOR,
        },
        { key: 'statusProposal', value: 'SQS Illustration' },
      ]);
      navigation.dispatch(StackActions.replace(EposRoutes.CALCULATOR));
    } else {
      redirectedByDataType[OCRUserDataType]();
    }
  };

  const isEqual = (fieldValue: string, realmValue: string, controllerName: string) => {

    // Add Conditional for Form Values and Values that Saved on Realms for Types
    // const isFieldvalueString = typeof fieldValue === 'string';
    // const isRealmValueString = typeof realmValue === 'string';
    // const isSameStringFieldAndRealm = isFieldvalueString && isRealmValueString;

    // Add Conditional for FieldValue and RealmValue toLocaleLowerCase();
    const lowerCaseFieldValue = fieldValue?.toLocaleLowerCase();
    const lowerCaseRealmValue = realmValue?.toLocaleLowerCase();
    const isSameLowerCaseFieldAndRealm = lowerCaseFieldValue === lowerCaseRealmValue;

    if (isSameLowerCaseFieldAndRealm && !adjustedData.includes(controllerName)) return false

    return true;
  };

  const renderSQSSPAJDiffWithOCR = (
    controllerName: string,
    newValueAdjustment: any,
    fieldLabel: string,
    dataFilter?: any[],
  ) => {
    const textFieldShow = (newValueAdjustment: any, dataFilter: any) => {
      if (dataFilter && dataFilter.length > 0) {
        const filteredData = dataFilter.filter((data: any) => {
          if (typeof newValueAdjustment === 'string' && data && newValueAdjustment) {
            return data?.toLowerCase() === newValueAdjustment?.toLowerCase();
          }
          return data?.key === newValueAdjustment?.key;
        });

        if (filteredData.length > 0) {
          return filteredData[0].label;
        }

      }

      if (newValueAdjustment && newValueAdjustment?.label) {
        return newValueAdjustment?.label;
      }

      if (typeof newValueAdjustment === 'string') {
        return newValueAdjustment;
      }

      return '';
    };

    return (
      <>
        <View
          style={[
            plaiStyles.mt10,
            plaiStyles.row,
            plaiStyles.justifyBetween,
            plaiStyles.px12,
            plaiStyles.py8,
            spajOcrStyle.borderRadius8,
            {
              backgroundColor: changeColorForAdjustment(controllerName, '#EBF3FF', '#FFEFE3'),
            },
          ]}
        >
          <Text
            style={[
              plaiStyles.font12,
              plaiStyles.fontBold,
              spajOcrStyle.width70,
              { color: changeColorForAdjustment(controllerName, '#4386E5', '#FF872E') },
            ]}
          >
            {isAdjustByUser(controllerName) ? (
              <Text style={[plaiStyles.font12, plaiStyles.lineH20, spajOcrStyle.colorAdjusted]}>
                {fieldLabel} telah disesuaikan
              </Text>
            ) : (
              <>
                {fieldLabel} pada {fieldTypeDocs[controllerName] ? upperCase(fieldTypeDocs[controllerName]) : ''}:{' '}
                <Text
                  style={[plaiStyles.font12, plaiStyles.lineH18, spajOcrStyle.fw700, spajOcrStyle.colorNotAdjusted]}
                >
                  {textFieldShow(newValueAdjustment, dataFilter)}
                </Text>
              </>
            )}
          </Text>
          <Pressable onPress={() => onTriggerDataAdjustmend(controllerName, newValueAdjustment)} {...pruTestID(`button-sesuaikan-${fieldLabel}`)}>
            <Text
              style={[
                plaiStyles.font12,
                plaiStyles.selfCenter,
                spajOcrStyle.textUnderline,
                {
                  color: changeColorForAdjustment(controllerName, '#4386E5', '#FF872E'),
                },
              ]}
            >
              {isAdjustByUser(controllerName) ? 'Batalkan' : 'Sesuaikan Data'}
            </Text>
          </Pressable>
        </View>
      </>
    );
  };

  const onBackBtn = () => {
    redirectedByDataType[OCRUserDataType]();
    return true;
  };

  const editableFieldByAdjustedFilterData = (controllerFieldName: string) => {
    return isAdjustByUser(controllerFieldName) ? true : false;
  };

  const onTriggerRePhoto = async () => {
    const { spajData } = await onRePhoto();
    if (spajData) {
      await setToRealms(spajData);
      navigation.dispatch(StackActions.replace(EposRoutes.SPAJ_DOC_PROSPECTIVE_POLICYHOLDER_OCR));
    }
  }

  const onRePhoto = async () => {
    let _spajData = null;
    if (RSPAJData?.spajOcr && !isEmpty(RSPAJData.spajOcr)) {
      _spajData = {
        ...RSPAJData?.toJSON(),
        spajOcr: JSON.stringify({
          ...RSPAJOcr,
          [OCRUserDataType]: {},
        }),
      } as ISPAJData;
    }

    return {
      spajData: _spajData || null
    }
  };

  const clientCivicsAdjustDefaultValue = (val: { code: string, name: string } | string) => {
    let newVal: any = val;
    if (typeof val !== 'string' && val?.code) {
      newVal = REGION_PHONE_CODE.filter(phoneCode => phoneCode.code === val.code);
    }

    return newVal;
  }

  return (
    <PruScreen backgroundColor={PruColor.white}>
      <ScrollView scrollEnabled={true}>
        <View style={[plaiStyles.mb32]}>
          <View style={[plaiStyles.mb32, plaiStyles.mt24, plaiStyles.pt24, plaiStyles.ml12]}>
            <Icon name={`arrowleft`} size={20} onPress={onBackBtn} />
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
            <View style={[plaiStyles.px16, plaiStyles.mb12]}>
              <Controller
                name={`clientName`}
                control={control}
                defaultValue={ocrdata?.nama}
                rules={ValidationForm({ isRequired: true, maxLength: 60 })}
                render={({ field: { onChange, value, name } }) => (
                  <>
                    <InputField
                      label="Nama Lengkap (Sesuai Kartu Identitas)"
                      value={value}
                      setValue={onChange}
                      error={errors?.clientName}
                      editable={!editableFieldByAdjustedFilterData(name)}
                      id="input-fullname"
                    />
                    {isEqual(value, lifeAssuredData?.clientName!, name) &&
                      renderSQSSPAJDiffWithOCR(name, lifeAssuredData?.clientName, 'Nama')}
                  </>
                )}
              />
            </View>
            <View style={[plaiStyles.px16, plaiStyles.mb12]}>
              <Controller
                name={`clientGender`}
                control={control}
                defaultValue={() => genderStatusMapping[ocrdata?.jenis_kelamin] || ocrdata?.jenis_kelamin}
                rules={ValidationForm({ isRequired: true })}
                render={({ field: { onChange, value, name } }) => (
                  <>
                    <OptionCard
                      label={t('Epos:gender')}
                      style={[plaiStyles.flex, plaiStyles.row]}
                      insideStyle={[plaiStyles.flex, plaiStyles.mr8]}
                      theme="border"
                      data={GenderList}
                      selected={value}
                      onSelected={onChange}
                      error={errors?.clientGender}
                      onDisabled={() => editableFieldByAdjustedFilterData(name)}
                      uniqueTestId='gender'
                    />
                    {isEqual(value?.key, lifeAssuredData?.clientGender?.key, name) &&
                      renderSQSSPAJDiffWithOCR(name, lifeAssuredData?.clientGender, t('Epos:gender'), GenderList)}
                  </>
                )}
              />
            </View>
            <View style={[plaiStyles.px16, plaiStyles.mb12]}>
              <Controller
                name={`clientDateBirth`}
                control={control}
                defaultValue={() => {
                  const formattedDate = moment(ocrdata?.tanggal_lahir || new Date(), 'DD-MM-YYYY').format('YYYY-MM-DD');
                  return formattedDate;
                }}
                rules={ValidationForm({ isRequired: true })}
                render={({ field: { onChange, value, name } }) => (
                  <>
                    <InputDate
                      formatDate="YYYY-MM-DD"
                      label={t('Epos:date_of_birth')}
                      placeholder={t('Epos:select_date')}
                      value={value}
                      setValue={onChange}
                      maxDate={`${new Date().getFullYear()}-12-31`}
                      error={errors?.clientDateBirth}
                      disabled={editableFieldByAdjustedFilterData(name)}
                      id="input-dob"
                    />
                    {isEqual(value, lifeAssuredData?.clientDateBirth!, name) &&
                      renderSQSSPAJDiffWithOCR(name, lifeAssuredData?.clientDateBirth, t('Epos:date_of_birth'))}
                  </>
                )}
              />
            </View>
            <View style={[plaiStyles.px16, plaiStyles.mb12]}>
              <Controller
                name={`clientCityBirth`}
                control={control}
                defaultValue={ocrdata?.tempat_lahir}
                rules={ValidationForm({ isRequired: true })}
                render={({ field: { onChange, value, name } }) => (
                  <>
                    <InputField
                      label={t('Epos:city_birth')}
                      value={value}
                      setValue={onChange}
                      error={errors?.clientCityBirth}
                      editable={!editableFieldByAdjustedFilterData(name)}
                      id="input-city-birth"
                    />
                    {isEqual(value, RSPAJUserData?.clientCityBirth, name) &&
                      renderSQSSPAJDiffWithOCR(name, RSPAJUserData?.clientCityBirth, t('Epos:city_birth'))}
                  </>
                )}
              />
            </View>
            <View style={[plaiStyles.px16, plaiStyles.mb12]}>
              <Controller
                name={`clientCivics`}
                control={control}
                defaultValue={() =>
                  ocrdata?.kewarganegaraan ? civicsStatusMapping[ocrdata?.kewarganegaraan] : defaultClientCivics()
                }
                rules={ValidationForm({ isRequired: true })}
                render={({ field: { onChange, value, name } }) => (
                  <>
                    <DropdownField
                      labelMap={{
                        title: t('Epos:civics'),
                      }}
                      keyMap={{
                        label: 'name',
                        search: 'name',
                        value: 'code'
                      }}
                      data={REGION_PHONE_CODE}
                      selected={value}
                      onSelected={onChange}
                      onDisabled={true}
                      error={errors.clientCivics}
                      id="dropdown-civics"
                    />
                    {isEqual(value?.code, RSPAJUserData?.clientCivics?.code, name) &&
                      renderSQSSPAJDiffWithOCR(name, clientCivicsAdjustDefaultValue(RSPAJUserData?.clientCivics), t('Epos:civics'))}
                  </>
                )}
              />
            </View>
            <View style={[plaiStyles.px16, plaiStyles.mb12]}>
              <Controller
                name={`clientMaritalStatus`}
                control={control}
                defaultValue={() => maritalStatusMappingKTP[ocrdata?.status_perkawinan] || ocrdata?.status_perkawinan}
                rules={ValidationForm({ isRequired: true })}
                render={({ field: { onChange, value, name } }) => (
                  <>
                    <DropdownField
                      labelMap={{
                        title: t('Epos:marital_status'),
                        placeholder: t('Epos:select_marital_status'),
                      }}
                      data={maritalStatusList}
                      selected={value}
                      onSelected={onChange}
                      error={errors.clientMaritalStatus}
                      onDisabled={editableFieldByAdjustedFilterData(name)}
                      id="dropdown-marital-status"
                    />
                    {isEqual(value?.key, RSPAJUserData?.clientMaritalStatus?.key, name) &&
                      renderSQSSPAJDiffWithOCR(
                        name,
                        RSPAJUserData?.clientMaritalStatus,
                        t('Epos:marital_status'),
                        maritalStatusList,
                      )}
                  </>
                )}
              />
            </View>
            <View style={[plaiStyles.px16, plaiStyles.mb12]}>
              <Controller
                name={`clientReligion`}
                control={control}
                defaultValue={() => {
                  const selectedReligionStatus = religionList.filter(
                    (val) => val?.label?.toLocaleLowerCase() === ocrdata?.agama?.toLowerCase(),
                  );
                  if (selectedReligionStatus.length > 0) {
                    return selectedReligionStatus[0];
                  }

                  return ocrdata?.agama;
                }}
                rules={ValidationForm({ isRequired: true })}
                render={({ field: { onChange, value, name } }) => (
                  <>
                    <DropdownField
                      labelMap={{
                        title: t('Epos:religion'),
                      }}
                      data={religionList}
                      selected={value}
                      onSelected={(value) => {
                        onChange(value);
                      }}
                      error={errors.clientReligion}
                      onDisabled={editableFieldByAdjustedFilterData(name)}
                      id="dropdown-religion"
                    />
                    {isEqual(value?.key, RSPAJUserData?.clientReligion?.key, name) &&
                      renderSQSSPAJDiffWithOCR(name, RSPAJUserData?.clientReligion, t('Epos:religion'), religionList)}
                  </>
                )}
              />
            </View>
          </View>
          {/* End of Section (Informasi Pribadi) */}
          {/* KTP Informations Section */}
          <View style={[plaiStyles.mb32, plaiStyles.pb12, spajOcrStyle.borderSeperateSection]}>
            {renderBorderLeftRed('Informasi KTP')}
            <View style={[plaiStyles.px16, plaiStyles.mb12]}>
              <Controller
                name={`clientIdCardNumber`}
                control={control}
                defaultValue={ocrdata?.nik}
                rules={ValidationForm({ isRequired: true })}
                render={({ field: { onChange, value, name } }) => (
                  <>
                    <InputField
                      label={t('Epos:idcard_number')}
                      value={value}
                      setValue={onChange}
                      error={errors?.clientIdCardNumber}
                      editable={!editableFieldByAdjustedFilterData(name)}
                      id="input-idcard-number"
                    />
                    {isEqual(value, RSPAJUserData?.clientIdCardNumber, name) &&
                      renderSQSSPAJDiffWithOCR(name, RSPAJUserData?.clientIdCardNumber, t('Epos:idcard_number'))}
                  </>
                )}
              />
            </View>
            <View style={[plaiStyles.px16, plaiStyles.mb12]}>
              <Controller
                name={`clientMassApplies`}
                control={control}
                defaultValue={
                  ocrdata?.masa_berlaku === 'SEUMUR HIDUP' || ocrdata?.masa_berlaku === '-' || !ocrdata?.masa_berlaku
                    ? { key: 'Y', label: 'YA' }
                    : { key: 'N', label: 'TIDAK' }
                }
                rules={ValidationForm({ isRequired: true })}
                render={({ field: { onChange, value } }) => (
                  <OptionCard
                    label={t('Epos:lifetime_validity_period')}
                    style={[plaiStyles.flex, plaiStyles.row]}
                    insideStyle={[plaiStyles.flex, plaiStyles.mr8]}
                    theme="border"
                    data={additionalValidationSPAJModal}
                    selected={value}
                    onSelected={(selectedData) => {
                      onChange(selectedData);
                      selectedData.key === 'N'
                        ? setIsShowDateofClientMassPeriod(true)
                        : setIsShowDateofClientMassPeriod(false);
                    }}
                    error={errors?.clientMassApplies}
                    uniqueTestId='lifetime-validity-period'
                  />
                )}
              />
            </View>
            {isShowDateofClientMassPeriod && (
              <View style={[plaiStyles.px16, plaiStyles.mb12]}>
                <Controller
                  name={`clientMassValidUntil`}
                  control={control}
                  defaultValue={ocrdata?.masa_berlaku}
                  rules={ValidationForm({ isRequired: true })}
                  render={({ field: { onChange, value } }) => (
                    <InputDate
                      formatDate="YYYY-MM-DD"
                      label={t('Epos:mass_valid_until')}
                      placeholder={t('Epos:select_date')}
                      value={value}
                      setValue={onChange}
                      error={errors?.clientMassApplies}
                      id="inputdate-mass-valid-until"
                    />
                  )}
                />
              </View>
            )}
          </View>
          {/* End of KTP Informations Section */}

          {/* KTP Address Section */}
          {ocrdata?.nik || ocrdata?.nik === '-' ? (
            <View style={[plaiStyles.mb32]}>
              {renderBorderLeftRed('Alamat KTP')}
              <View style={[plaiStyles.px16, plaiStyles.mb12]}>
                <Controller
                  name={`residanceAddress`}
                  control={control}
                  defaultValue={ocrdata?.alamat}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      label={t('Epos:residence_address')}
                      value={value}
                      setValue={onChange}
                      error={errors?.residanceAddress}
                      editable={false}
                      id="input-residence-address"
                    />
                  )}
                />
              </View>
              <View style={[plaiStyles.px16, plaiStyles.mb12]}>
                <Controller
                  name={`neighbourdhood1`}
                  control={control}
                  defaultValue={ocrdata?.rt_rw?.split('/')[0] || ''}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      label={t('Epos:neighbourdhood1')}
                      value={value}
                      setValue={onChange}
                      error={errors?.neighbourdhood1}
                      editable={false}
                      id="input-neighbourdhood1"
                    />
                  )}
                />
              </View>
              <View style={[plaiStyles.px16, plaiStyles.mb12]}>
                <Controller
                  name={`neighbourdhood2`}
                  control={control}
                  defaultValue={ocrdata?.rt_rw?.split('/')[1] || ''}
                  rules={ValidationForm({ isRequired: true })}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      label={t('Epos:neighbourdhood2')}
                      value={value}
                      setValue={onChange}
                      error={errors?.neighbourdhood2}
                      editable={false}
                      id="input-neighbourdhood2"
                    />
                  )}
                />
              </View>
              <View style={[plaiStyles.px16, plaiStyles.mb12]}>
                <Controller
                  name={`district`}
                  control={control}
                  defaultValue={ocrdata?.kecamatan}
                  rules={ValidationForm({ isRequired: true })}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      label={t('Epos:district')}
                      value={value}
                      setValue={onChange}
                      error={errors?.district}
                      editable={false}
                      id="input-district"
                    />
                  )}
                />
              </View>
              <View style={[plaiStyles.px16, plaiStyles.mb12]}>
                <Controller
                  name={`urbanVillage`}
                  control={control}
                  defaultValue={ocrdata?.kelurahan}
                  rules={ValidationForm({ isRequired: true })}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      label={t('Epos:urban_village')}
                      value={value}
                      setValue={onChange}
                      error={errors?.urbanVillage}
                      editable={false}
                      id="input-urban-village"
                    />
                  )}
                />
              </View>
              <View style={[plaiStyles.px16, plaiStyles.mb12]}>
                <Controller
                  name={`province`}
                  control={control}
                  defaultValue={ocrdata?.provinsi}
                  rules={ValidationForm({ isRequired: true })}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      label={t('Epos:provice')}
                      value={value}
                      setValue={onChange}
                      error={errors?.province}
                      editable={false}
                      id="input-province"
                    />
                  )}
                />
              </View>
              <View style={[plaiStyles.px16, plaiStyles.mb32]}>
                <Controller
                  name={`cityRegency`}
                  control={control}
                  defaultValue={ocrdata?.kota}
                  rules={ValidationForm({ isRequired: true })}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      label={t('Epos:city_regency')}
                      value={value}
                      setValue={onChange}
                      error={errors?.cityRegency}
                      editable={false}
                      id="input-city-regency"
                    />
                  )}
                />
              </View>
            </View>
          ) : (
            <></>
          )}
          {/* End of Section KTP Address */}
        </View>
      </ScrollView>

      <View
        style={[plaiStyles.py14, plaiStyles.px20, plaiStyles.borderTop, plaiStyles.bgwhite, spajOcrStyle.footerWrapper]}
      >
        <View
          style={[plaiStyles.flex, plaiStyles.flexWrap, plaiStyles.row, plaiStyles.justifyBetween, plaiStyles.px16]}
        >
          <View style={[plaiStyles.selfCenter]}>
            <Pressable onPress={onTriggerRePhoto}>
              <Text>Foto Ulang</Text>
            </Pressable>
          </View>
          <View style={[{ width: '40%' }]}>
            <Button onPress={handleSubmit(handleFormSubmit)} {...pruTestID('button-confirm')}>Konfirmasi</Button>
          </View>
        </View>
      </View>

      <ModalInformation
        visible={isModalConfirm}
        title={t('Epos:confirmation')}
        desc={
          'Apakah anda yakin ingin mengkonfirmasi data diri? Pastikan data diri Calon Pemegang Polis telah sesuai. Data tidak dapat diubah setelah dikonfirmasi.'
        }
        buttonPrimary={{
          text: 'Ya, Konfirmasi',
          onPress: () => onConfirm(),
        }}
        buttonSecondary={{
          text: 'Batal',
          onPress: () => setIsModalConfirm(false),
        }}
      />

      <ModalInformation
        visible={isModalDiffData}
        title={'Data Berbeda'}
        desc={diffDataForModal.text}
        buttonPrimary={{
          text: 'Ya, Konfirmasi',
          onPress: () => diffDataForModal.onPress(),
        }}
        buttonSecondary={{
          text: 'Batal',
          onPress: () => setIsModalDiffData(false),
        }}
      />

    </PruScreen>
  );
};
