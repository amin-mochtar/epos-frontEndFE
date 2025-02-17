import i18n from 'i18next';

import { RegisterOptions } from 'react-hook-form';
import { TCalculateForm } from '../calculator.type';
import { TOptionalCardData } from '../../../../components';
import { TBenefitsValue, validateObject } from '../../../../utilities';

export const validateChildApproveStandard = (value: string | TOptionalCardData, approveStandard: boolean) => {
  const _value = typeof value == 'string' ? value : value.key;
  return (!approveStandard && _value != '') || i18n.t('Epos:required');
};

export const validateAlphabet = (value: string) => {
  return (
    [/^[a-zA-Z][a-zA-Z., ]{2,}$/].every((pattern) => pattern.test(value)) ||
    'Alphabet Character, No special Character except (.) and (,), Minimum 3 Character with no space in the beginning'
  );
}

export const VALIDATION: {
  [key: string]: {
    name: keyof TCalculateForm;
    rule: RegisterOptions;
    label?: string;
    placeholder?: string;
  };
} = {
  frequencyPayment: {
    name: 'frequencyPayment',
    rule: {
      required: {
        value: true,
        message: i18n.t('Epos:required'),
      },
    },
  },
  annualPremium: {
    name: 'annualPremium',
    rule: {
      required: {
        value: true,
        message: i18n.t('Epos:required'),
      },
    },
  },
  regularPremium: {
    name: 'regularPremium',
    rule: {
      required: {
        value: true,
        message: i18n.t('Epos:required'),
      },
    },
  },
  feeAdministration: {
    name: 'feeAdministration',
    rule: {
      required: {
        value: true,
        message: i18n.t('Epos:required'),
      },
    },
  },
  age1: {
    name: 'age1',
    rule: {
      required: {
        value: true,
        message: i18n.t('Epos:required'),
      },
    },
  },
  age2: {
    name: 'age2',
    rule: {
      required: {
        value: true,
        message: i18n.t('Epos:required'),
      },
    },
  },
  age3: {
    name: 'age3',
    rule: {
      required: {
        value: true,
        message: i18n.t('Epos:required'),
      },
    },
  },
  backdate: {
    name: 'backdate',
    rule: {
      validate: validateObject,
    },
  },
  backdateValue: {
    name: 'backdateValue',
    rule: {
      required: {
        value: true,
        message: i18n.t('Epos:required'),
      },
    },
  },
  premiTopup: {
    name: 'regularTopupPremium',
    rule: {},
    label: i18n.t('Epos:topup_premium'),
    placeholder: i18n.t('Epos:enter_topup_premium'),
  },
  contribusiTopup: {
    name: 'regularTopupPremium',
    rule: {},
    label: i18n.t('Epos:contribution_premium'),
    placeholder: i18n.t('Epos:enter_contribution_premium'),
  },
  saMain: {
    name: 'sumInsured',
    rule: {
      required: {
        value: true,
        message: i18n.t('Epos:required'),
      },
      pattern: {
        value: /^[\d.]+$/,
        message: "numbers with dots"
      }
    },
    label: i18n.t('Epos:sum_insured'),
    placeholder: i18n.t('Epos:enter_sum_insured'),
  },
  paymentPeriod: {
    name: 'paymentPeriod',
    rule: {
      validate: validateObject,
    },
    label: 'Rencana Masa Pembayaran Yang Dikehendaki Nasabah (Tahun)',
    placeholder: 'Pilih tahun',
  },
  periodMain: {
    name: 'periodInsured',
    rule: {
      required: {
        value: true,
        message: i18n.t('Epos:required'),
      },
    },
    label: i18n.t('Epos:period_insured'),
    placeholder: i18n.t('Epos:enter_period_insured'),
  },
  planRider: {
    name: 'planRider',
    rule: {
      validate: validateObject,
    },
    label: 'Plan',
    placeholder: 'Pilih Plan',
  },
  roomRider: {
    name: 'roomRider',
    rule: {
      validate: validateObject,
    },
    label: 'Batas Harga Kamar',
    placeholder: 'Pilih Batas Harga Kamar',
  },
  saverRider: {
    name: 'saverRider',
    rule: {
      validate: validateObject,
    },
    label: 'PRUPrime Saver',
    placeholder: 'Pilih PRUPrime Saver',
  },
  periodRider: {
    name: 'periodRider',
    rule: {
      validate: validateObject,
    },
    label: i18n.t('Epos:period_insured'),
    placeholder: i18n.t('Epos:enter_period_insured'),
  },
  premiRider: {
    name: 'premiRider',
    rule: {},
    label: 'Premi Tahunan',
    placeholder: 'Jumlah pertanggungan',
  },
  /**
   * SUBSTANDARD
   */
  approvalSubstandard: {
    name: 'approvalSubstandard',
    rule: {
      validate: validateObject,
    },
    label: 'Persetujuan Substandard',
    placeholder: '',
  },
  bank: {
    name: 'bank',
    rule: {
      required: {
        value: true,
        message: i18n.t('Epos:required'),
      },
      validate: validateObject,
    },
    label: 'Bank Untuk Transfer',
    placeholder: 'Pilih Bank',
  },
  branchBank: {
    name: 'branchBank',
    rule: {
      required: {
        value: true,
        message: i18n.t('Epos:required'),
      },
      minLength: {
        value: 3,
        message: 'Minimal 3 karakter',
      },
      maxLength: {
        value: 60,
        message: i18n.t('Epos:client_name_max'),
      },
      validate: (value) => validateAlphabet(value),
    },
    label: 'Cabang',
    placeholder: 'Masukkan cabang',
  },
  bankAccountNumber: {
    name: 'bankAccountNumber',
    rule: {
      required: {
        value: true,
        message: i18n.t('Epos:required'),
      },
      maxLength: {
        value: 30,
        message: 'Maksimal 30 karakter',
      },
    },
    label: 'Nomor Rekening',
    placeholder: 'Masukkan nomor rekening',
  },
  bankAccountName: {
    name: 'bankAccountName',
    rule: {
      required: {
        value: true,
        message: i18n.t('Epos:required'),
      },
      minLength: {
        value: 3,
        message: 'Minimal 3 karakter',
      },
      maxLength: {
        value: 60,
        message: i18n.t('Epos:client_name_max'),
      },
      validate: (value) => validateAlphabet(value),
    },
    label: 'Nama Pemilik Rekening',
    placeholder: 'Masukkan nama',
  },
  bankCurrency: {
    name: 'bankCurrency',
    rule: {
      required: {
        value: true,
        message: i18n.t('Epos:required'),
      },
      validate: validateObject,
    },
    label: 'Mata Uang',
    placeholder: 'Pilih mata uang',
  },
  educationBenefitPeriod: {
    name: 'educationBenefitPeriod',
    rule: {
      required: {
        value: true,
        message: i18n.t('Epos:required'),
      },
    },
    label: 'Masa Tunggu Manfaat Dana Pendidikan (tahun)',
    placeholder: 'Pilih tahun',
  },
  contributionPaymentPeriod: {
    name: 'contributionPaymentPeriod',
    rule: {
      required: {
        value: true,
        message: i18n.t('Epos:required'),
      },
    },
    label: 'Masa Pembayaran Kontribusi (tahun)',
    placeholder: 'Pilih tahun',
  },
  saMainAuto: {
    name: 'sumInsured',
    rule: {},
    label: i18n.t('Epos:sum_insured'),
    placeholder: i18n.t('Epos:enter_sum_insured'),
  },
};
