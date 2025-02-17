import { TCommonConstantData, GlobalPromptModal } from "plai_common_frontend";
import { WR_SHARIA_CONVENT } from "../wording/common.wording"
import { TCommonOptionalData } from "../epos.type";
import i18n from 'i18next';
import { useFieldArray } from "react-hook-form";
import { ISPAJDataCompleteness } from "../model";

export const filterSPAJDataDoc = (premiumPayorSPAJ: string, dataCompleteness: ISPAJDataCompleteness[], isTopupPayor: boolean) => {
  return dataCompleteness.filter(item => {

    // only filter "kelengkapan dokumen"
    if (item.categoryKey !== 'Kelengkapan Dokumen') {
      return false;
    }

    // If isTopupPayor is true, include all 'Kelengkapan Dokumen' items
    if (isTopupPayor) {
      return true;
    }

    // isTopupPayor is false
    if (premiumPayorSPAJ === 'N') {
      return item.key !== 'SPAJDocPremiumPayor';
    } else {
      return item.key !== 'SPAJDocTopupPayor' && item.key !== 'SPAJDocPremiumPayor';
    }
  });
};

export const checkMainParticipant = (productCode: string, policyType: string, isInsured?: boolean, isPoliceHolder?: boolean, ageMainParticipant?: number) => {
  const { mainParticipant, participant, lifeAssured, insurancePayor, candidate, mainParticipantU17, mainParticipantU17_1 } = WR_SHARIA_CONVENT[policyType || 'conventional'];

  const isConventional = policyType === "conventional";
  const primaryInsuredCodes = ["E1O", "E1OP", "U13", "L1Q"];
  const mainInsuredCandidateCodes = ["T1Q", "T1P"];

  // If the person is a policyholder but not insured
  if (isPoliceHolder && !isInsured) {
    return candidate;
  }

  if (ageMainParticipant && ageMainParticipant < 17) {

    return ['U12', 'U13'].includes(productCode) ? mainParticipantU17 : mainParticipantU17_1;
  }
  // Handle conventional policies
  if (isConventional) {
    if (isInsured) {
      return productCode !== "U12" ? lifeAssured : insurancePayor;
    }

    return mainInsuredCandidateCodes.includes(productCode)
      ? mainParticipant
      : productCode !== "U12"
        ? participant
        : mainParticipant;
  }

  // Handle non-conventional policies
  if (isInsured) {
    return primaryInsuredCodes.includes(productCode)
      ? insurancePayor
      : lifeAssured;
  }

  return primaryInsuredCodes.includes(productCode)
    ? mainParticipant
    : participant;
};

export const onShowModalCantContinueSPAJ = () => {
  GlobalPromptModal.show({
    title: 'Tidak Dapat Melanjutkan',
    subtitle: 'Sehubung dengan Kebijakan Internal Perusahaan, Pengajuan SPAJ ini tidak dapat di proses.',
    testID: 'modal-prevent-nias',
    buttonPrimary: {
      text: 'Tutup',
      onPress: () => {
        GlobalPromptModal?.close()
      }
    },
  })
}

export const validateField = (data: string | number | boolean | TCommonConstantData) => {
  if (typeof data == 'object') {
    if (data?.key == '') return 'wajib diisi';
  } else {
    if (!data) return 'wajib diisi';
  }
};

export const validateCode = (_data: TCommonOptionalData) => {
  const message = i18n.t('Epos:required') as string;
  return _data.code != '' || message;
};

export const validateFormatCompanyName = (value: string) => {
  for (let i = 0; i < value.length - 2; i++) {
    if (value[i] === value[i + 1] && value[i] === value[i + 2]) {
      return i18n.t('Epos:wrong_format_company_name')
    }
  }
}

export const validatePhoneCell = (value: string) => {
  if (!value) {
    return i18n.t('Epos:required')
  } else if (value?.length < 9) {
    return i18n.t('Epos:Minimum digit nomor handphone adalah 9 karakter')
  }
}

export const validatIdCard = (value: string) => {
  if (!value || value?.length < 16) {
    return 'KTP harus 16 digit';
  }
};

// fungsi nya mencegah space input di awal, dan semua nya uppercase request dari mas tio model beginian
export const sanitizedLetterTextUpperCase = (value: string) => {
  if (value !== undefined && value !== null) {
    const result = value.replace(/^\s+|[^a-zA-Z\s]/g, '');
    return result.toUpperCase();
  }
};
export const sanitizedLetterTextNoSpace = (value: string) => {
  if (value !== undefined && value !== null) {
    const result = value.replace(/^\s+|[^a-zA-Z\s]/g, '');
    return result;
  }
};

export const sanitizedTextNoSpace = (value: string) => {
  if (value !== undefined && value !== null) {
    const sanitizedValue = value.trim().replace(/\D+/g, '');
    if (sanitizedValue !== '' && sanitizedValue[0] !== '0') {
      return sanitizedValue;
    }
  }
  return '';
};

export const fieldArrayHandlers = (name: string, control: any) => {
  const { fields, append, remove } = useFieldArray({ name, control });
  return { fields, append, remove };
};

export const getConditionLampung = (
  RSQSData: any,
  RSPAJData: any,
  isHealth?: boolean
) => {
  const policyHolderData = RSPAJData?.policyHolderData ? JSON.parse(RSPAJData.policyHolderData) : '';
  const isPWM = ['H14', 'H15'].includes(RSQSData?.product?.key!)
  const isPHonLampung = policyHolderData?.clientResidenceProvince?.key === 'LAMPUNG'
  const isPHMailingAddressOnLampung = policyHolderData?.clientResidenceMailingAddress?.key === 'OT' &&
    policyHolderData?.clientOtherResidenceProvince?.key === 'LAMPUNG'
  const isLifeAssuredSelf = RSQSData?.lifeAssuredSelf == 'self'
  const isShowFormLampungPH = isPHonLampung || isPHMailingAddressOnLampung
  if (isLifeAssuredSelf) {
    return (isShowFormLampungPH) && (isHealth || isPWM)
  }
  const primaryInsured = RSPAJData?.primaryInsured ? JSON.parse(RSPAJData.primaryInsured) : '';
  const isPrimaryInsuredOnLampung = primaryInsured?.clientResidenceProvince?.key === 'LAMPUNG'
  return (isShowFormLampungPH || isPrimaryInsuredOnLampung) && (isHealth || isPWM)
}

export const removeMainWordingBeneficiary = (list: Array<{
  konven: string,
  syariah: string,
  code: string,
  gender: string
}>, productCode: string) => {
  const TRDCode = ['H15', 'H14', 'L1Q', 'L1WR', 'L1WD', 'C16', 'U17R', 'U17D', 'T1P', 'T1Q']
  const newList = list.map(({ konven, syariah, ...item }) => {
    if (TRDCode.includes(productCode)) {
      return ({
        konven: konven.replace(/\bUtama\b\s?/g, ''),
        syariah: syariah.replace(/\bUtama\b\s?/g, ''),
        ...item
      })
    }
    return ({
      konven,
      syariah,
      ...item
    })
  })
  return newList
}