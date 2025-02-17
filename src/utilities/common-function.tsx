import i18n from 'i18next';
import moment from "moment";
import { medicalData } from './medical.data';
import { Message, ValidationRule } from 'react-hook-form';
import { useCallback, useState } from 'react';
import { disconnect, underMaintaince, GlobalBottomInfoModal, REGION_PHONE_CODE } from 'plai_common_frontend';
import { ICommonObjectData, ProductType } from './model';
import { SummaryDraft } from '../redux';
import { magnumGetCaseAnswers } from './magnum-service';
import { TFormDataPolicyHolder } from '../screen/espaj/spaj-policy-owner-data/spaj-policy-owner-data.type';
import { ENV } from '@env';
import RNFS from 'react-native-fs';
import { firebase } from '@react-native-firebase/analytics';

export const defaultOptionalData = {
  label: '',
  key: '',
};

interface RegisterOption {
  value?: any;
  message: Message | undefined;
  minLength?: ValidationRule<number>;
  maxLength?: ValidationRule<number>;
  pattern?: {
    value: ValidationRule<RegExp>;
    message: Message;
  };
  validate?: any;
}

interface ValidationParams {
  [key: string]: RegisterOption;
}

export const calculateAge = (dob: string | number, calculateANB?: boolean) => {
  const birthdate = new Date(dob);
  const today = new Date();

  // Calculate the basic age difference
  let age = today.getFullYear() - birthdate.getFullYear();

  // Check if today's date is after the birthday in the current year
  const hasBirthdayPassed =
    today.getMonth() > birthdate.getMonth() ||
    (today.getMonth() === birthdate.getMonth() && today.getDate() > birthdate.getDate());

  // Increment age if birthday has passed this year
  if (hasBirthdayPassed && calculateANB) age++;
  if (age === 0) age = 1;

  return age;
};

export const ValidationForm = ({
  isRequired,
  minLength,
  maxLength,
  pattern,
  validate,
}: {
  isRequired?: Message | ValidationRule<boolean>;
  minLength?: ValidationRule<number>;
  maxLength?: ValidationRule<number>;
  pattern?: {
    value: ValidationRule<RegExp>;
    message: Message;
  };
  validate?: any;
}): ValidationParams => {
  const validation: ValidationParams = {
    required: {
      value: isRequired,
      message: i18n.t('Epos:required'),
    },
    minLength: {
      value: minLength,
      message: i18n.t('Epos:min_char').split(' ')[0] + ' ' + `${minLength} ${i18n.t('Epos:min_char').split(' ')[1]}`,
    },
    maxLength: {
      value: maxLength,
      message: i18n.t('Epos:max_char').split(' ')[0] + ' ' + `${maxLength} ${i18n.t('Epos:max_char').split(' ')[1]}`,
    },
    pattern: {
      value: pattern?.value,
      message: pattern?.message,
    },
    validate: validate,
  };

  return validation;
};

// max age is total max age in number
// Example: Max 70 tahun, just passing number 70
// ph 99, tu 75 (6-bulan) max, payor 70 (6-bulan) max
// Is Spare time is use for there is spare time max 6 bulan from max age
// example is 100 tahun from 2025, it will max 1925 in januari 01-01 if date now is januari 01-01
// it will januari + 6 bulan, so juli 01-01 max
export const maxAgetDateBirth = (maxAge: number, isSpareTime = true) => {
  let date = moment().subtract(maxAge, 'years');
  if (isSpareTime) {
    date = date.subtract(6, 'months');
  }

  return date.format('YYYY-MM-DD');
}

export const mapBenefitsData = (additionalBenefits: ICommonObjectData[]) => {
  let result: { riderCode: string, riderName: string }[] = []
  additionalBenefits.map((benefits) => {
    result.push({
      riderCode: benefits.key,
      riderName: benefits.label!
    })
  })
  return result
}

export const productType = (productCode: string): ProductType => {
  let result: ProductType = 'TRD'
  if (['U12', 'U13', 'U17R', 'U17D'].includes(productCode)) {
    result = 'UL'
  }
  return result
}

export function getAge(dateString: string) {
  const birthDate = moment(dateString, "YYYY-MM-DD"); // adjust format to match your date string
  const today = moment();
  const age = today.diff(birthDate, 'years');
  return age;
}

export const sanitizeNumberWithDot = (value: string) => {
  if (typeof value === "string") {
    return value.replace(/[^0-9.\s]/g, '')
  }
}

export const sanitizeTextWithSymbol = (value: string) => {
  if (typeof value === 'string') {
    return value.replace(/[^a-zA-Z0-9,.:;/\/\s]/g, '');

  }
  return '';
}

export const sanitizeTextWithCustomSymbol = (value: string, symbolRegex: string[]) => {
  if (typeof value === 'string') {
    const pattern = symbolRegex.map(symbol => `\\${symbol}`).join(',');
    const regex = new RegExp(`[^a-zA-Z0-9\\s${pattern}]`, 'g');

    return value.replace(regex, '');
  }

  return value;
}

export const sanitizeTextLetterAndNumber = (value: string) => {
  if (typeof value === 'string') {
    return value.replace(/[^0-9a-zA-Z\s]/g, '');
  }
  return '';
}

export const residenceAddressFormatText = (value: string) => {
  if (typeof value === 'string' && value.length > 0) {
    return value[0].replace(/[^a-zA-Z\s]/g, '') + value.slice(1).replace(/[^a-zA-Z0-9,.:;/()'\s]/g, '');
  }

  return '';
};


export const npwpFormatText = (value: string) => {
  if (typeof value === 'string') return value.replace(/[^0-9]/g, '');
}

export const getTypeMedical = ({
  anb,
  sumInsured,
  mainBenefitKey,
}: {
  anb: string;
  sumInsured: string;
  mainBenefitKey: string;
}) => {
  let UPList,
    UPList2,
    maxUp,
    arrayAnBAge = [],
    upCollection = [],
    upCollection2 = [],
    UPFinish,
    medicalCode = '',
    maxAge,
    medicalList = medicalData;

  for (let z = 0; z < medicalList.length; z++) {
    maxAge = medicalList[z].maxAge;

    //cek maxAge > ANB
    if (parseInt(maxAge) >= parseInt(anb)) {
      arrayAnBAge.push(medicalList[z]);
    }
  }

  for (let j = 0; j < arrayAnBAge.length; j++) {
    UPList = arrayAnBAge[j];

    maxUp = UPList.maxRisk;

    //cek maxUP > UP
    if (parseFloat(maxUp) >= parseFloat(sumInsured)) {
      upCollection.push(UPList);
    }
  }

  for (let k = 0; k < upCollection.length; k++) {
    UPList2 = upCollection[k];

    if (parseInt(UPList2.minAge) <= parseInt(anb)) {
      upCollection2.push(UPList2);
    }
  }

  for (let l = 0; l < upCollection2.length; l++) {
    UPFinish = upCollection2[l];
    if (parseFloat(UPFinish.minRisk) <= parseFloat(sumInsured)) {
      let mainCoverageList = UPFinish.mainCoverage.split(',');
      mainCoverageList = mainCoverageList.map(function (mcl) {
        return mcl.trim();
      });
      if (mainCoverageList.indexOf(mainBenefitKey) != -1) {
        medicalCode = UPFinish.medicalCd;
      }
    }
  }
  if (medicalCode == '') {
    if (parseInt(anb) > 60) {
      medicalCode = 'Med 10';
    } else {
      medicalCode = 'NM';
    }
  }
  return medicalCode;
};

export function timerModalWrapper(callback: () => void, time = 500) {
  const wrap = setTimeout(callback, time)
  return wrap
}

export function showModalMaintenance(onButtonClick?: () => void) {
  GlobalBottomInfoModal.show({
    title: 'Terjadi Masalah',
    subtitle: 'Maaf, terjadi masalah saat menghubungkan ke Server, silahkan coba beberapa saat lagi.',
    image: underMaintaince,
    isShowCloseButton: true,
    buttonConfig: {
      onPress: () => {
        onButtonClick?.()
        GlobalBottomInfoModal.close()
      },
      text: 'Coba Lagi'
    }
  })
}

export function formatCapitalizeFirstLetter(content: string, indexFormated?: number[]) {
  if (content) {
    const loweringCaseLetter = (word: string) => {
      const _wordFormat = word.toLocaleLowerCase()
      return _wordFormat.charAt(0).toLocaleUpperCase() + _wordFormat.slice(1)
    }
    if (!!content.split(" ").length) {
      const _formatedWord = content.split(" ").map((word, index) => {
        if (!!indexFormated?.length) {
          if (indexFormated.includes(index)) {
            return `${loweringCaseLetter(word)}`
          }
          return word
        }
        return `${loweringCaseLetter(word)}`
      }).join(" ")
      return _formatedWord
    }
    return loweringCaseLetter(content)
  }
  return ''
}

const compareValues = (data1: any, data2: any) => {

  if (Array.isArray(data1) && Array.isArray(data2)) {
    return JSON.stringify(data1) === JSON.stringify(data2);
  }

  const isObject = (data: any): boolean => typeof data === 'object' && data !== null;
  if (isObject(data1) && isObject(data2)) {
    return !deepCompare(data1, data2);
  }
  return data1 === data2;
}

export function deepCompare(data1: any, data2: any): boolean {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);

  if (keys1.length !== keys2.length) return true;

  for (let key of keys1) {
    if (!data2.hasOwnProperty(key) || !compareValues(data1[key], data2[key])) {
      return true;
    }
  }
  return false;
}

export function showModalConnectionOffline(onButtonClick?: () => void) {
  GlobalBottomInfoModal.show({
    title: 'Tidak Dapat Terhubung',
    subtitle: 'Tidak dapat terhubung ke server, mohon periksa kembali jaringan Anda dan coba lagi.',
    image: disconnect,
    isShowCloseButton: true,
    buttonConfig: {
      onPress: () => {
        onButtonClick?.()
        GlobalBottomInfoModal.close()
      },
      text: 'Coba Lagi'
    }
  })
}

export function sortPolicyHolderName(data: SummaryDraft[], order: string) {
  return data.sort((a, b) => {
    let comparison = a.policyHolderName.toLowerCase().localeCompare(b.policyHolderName.toLowerCase());
    return order === 'terlama' ? comparison : -comparison;
  });
}

export const filterOnlyDigitNumber = (phoneNumber: string) => {
  return phoneNumber?.replace(/\D/g, "");
}

export function summaryDraftFilter(summaryDraft: SummaryDraft[], filterData: any) {
  return summaryDraft.filter((value: SummaryDraft) => {
    const peroidType = ['createdDate', 'submitDate']

    return Object.keys(filterData).every((key) => {

      // filter for range period created / period submission
      if (peroidType.includes(key)) {
        //@ts-ignore
        return moment().diff(moment(value[key]), 'd') <= Number(filterData[key])
      }

      if (Array.isArray(filterData[key])) {
        //@ts-ignore
        return filterData[key].includes(value[key])
      }

      //@ts-ignore
      return value[key] === filterData[key]

    })
  })
}

export function anbUpdated(dateOfBirth: string, anb: number) {
  const _newAnb = calculateAge(dateOfBirth, true);
  return { anbChange: _newAnb === anb, newAnb: _newAnb }
}

export function validMagnumData(proposalCd: string) {
  magnumGetCaseAnswers(proposalCd).then((res) => {
    if (res) {
      return true;
    } else {
      return false;
    }
  }).catch(() => {
    return false;
  })
}

export const defaultClientCivics = () => {
  const indo = REGION_PHONE_CODE.filter((value) => value.code === 'ID')
  return indo[0];
}

export const isEmailAutomation = (policyHolderData: TFormDataPolicyHolder) => {
  const testEmail = ['vergi.nardian2@gmail.com', 'vergi.nardian3@gmail.com', 'qwerty@mail.com'];

  const testEnv = ENV === 'UAT' || ENV === 'DEV';
  const isTestEmail =
    policyHolderData && testEmail.includes(policyHolderData?.clientEmail);
  return testEnv && isTestEmail;
}

// THIS FUNCTION ONLY FOR DEVELOPMENT
export const saveLogToFIle = (data: string, nameFile: string) => {
  const path = `${RNFS.ExternalDirectoryPath}${nameFile}.txt`
  RNFS.writeFile(path, data, 'utf8')
    .then(() => {
      console.log('Success Write File');
      console.log(path)
    })
    .catch((err) => {
      console.log('saveToFile', err);
    });
}

export const errorToLogEvent = (props: { title: string, error: any }) => {
  const { title, error } = props
  firebase.analytics().logEvent('NewbusinessError', {
    title,
    error: typeof error == 'string' ? error : JSON.stringify(error)
  });
}