import { TPolicyType } from "./model"

type TGoalProducts = {
  investasi: string[]
  kesehatan: string[]
  kecelakaan: string[]
  penyakitKritis: string[]
  perlindunganJiwa: string[]
  jiwa: string[]
  danaPensiun: string[]
  pendidikan: string[]
  danaWarisan: string[]
}

const goalProduct: TGoalProducts = {
  investasi: ['U12', 'U13', 'U17', 'U18'],
  kesehatan: ['H12', 'H13', 'H14', 'H15'],
  kecelakaan: ['T1R', 'L1Q'],
  penyakitKritis: ['T1P', 'T1Q', 'C16', 'L1Q'],
  perlindunganJiwa: ['T1P', 'T1Q', 'L1P', 'C16', 'L1Q', 'T1R'],
  jiwa: ['T1P', 'T1Q', 'L1P', 'C16', 'L1Q', 'T1R', 'L1WR', 'L1WD'],
  danaPensiun: ['T1P', 'T1Q', 'L1P', 'T1R', 'L1Q', 'L1WR', 'L1WD'],
  pendidikan: ['E1O', 'E1OP'],
  danaWarisan: ['L1P', 'T1R', 'L1Q', 'L1WR', 'L1WD'],
}

type TSimpleProducts = {
  [key: string]: {
    desc: string
    currency: string
    remark: string
    premiumMin: number
    premiumMax: string
    ageMin: string
    ageMax: string
    productCategory: string
  }
}

const descProduct: TSimpleProducts = {
  H13: {
    desc: 'PRUSolusi Sehat Plus Pro Syariah',
    currency: 'IDR',
    remark: '',
    premiumMin: 1000,
    premiumMax: '',
    ageMin: '',
    ageMax: '75_years',
    productCategory: 'TRD',
  },
  T1R: {
    desc: 'PRUCinta',
    remark: '',
    currency: 'IDR',
    premiumMin: 100000,
    premiumMax: '',
    ageMin: '',
    ageMax: '60_years',
    productCategory: 'TRD',
  },
  C16: {
    desc: 'PRUSolusi Kondisi Kritis Syariah',
    remark: '',
    currency: 'IDR',
    premiumMin: 300000,
    premiumMax: '',
    ageMin: '',
    ageMax: '70_years',
    productCategory: 'TRD',
  },
  L1Q: {
    desc: 'PRUAnugerah Syariah',
    remark: '',
    currency: 'IDR',
    premiumMin: 500000,
    premiumMax: '',
    ageMin: '1_years',
    ageMax: '70_years',
    productCategory: 'TRD',
  },
  H12: {
    desc: 'PRUSolusi Sehat Plus Pro',
    currency: 'IDR',
    remark: '',
    premiumMin: 1000,
    premiumMax: '',
    ageMin: '',
    ageMax: '75_years',
    productCategory: 'TRD',
  },
  T1P: {
    desc: 'PRUCritical Benefit 88 (Premi Tunggal)',
    remark: '',
    currency: 'IDR',
    premiumMin: 300000,
    premiumMax: '',
    ageMin: '',
    ageMax: '60_years',
    productCategory: 'TRD',
  },
  T1Q: {
    desc: 'PRUCritical Benefit 88 (Premi Berkala)',
    remark: '',
    currency: 'IDR',
    premiumMin: 300000,
    premiumMax: '',
    ageMin: '',
    ageMax: '60_years',
    productCategory: 'TRD',
  },
  L1P: {
    desc: 'PRUWarisan',
    remark: '',
    currency: 'IDR',
    premiumMin: 300000,
    premiumMax: '',
    ageMin: '',
    ageMax: '70_years',
    productCategory: 'TRD',
  },
  E1O: {
    desc: 'PRUCerah',
    remark: '',
    currency: 'IDR',
    premiumMin: 500000,
    premiumMax: '',
    ageMin: '',
    ageMax: '18_years',
    productCategory: 'TRD',
  },
  E1OP: {
    desc: 'PRUCerah Plus',
    remark: '',
    currency: 'IDR',
    premiumMin: 500000,
    premiumMax: '',
    ageMin: '',
    ageMax: '18_years',
    productCategory: 'TRD',
  },
  U12: {
    desc: 'PRULink NextGen',
    currency: 'IDR',
    remark: '',
    premiumMin: 500000,
    premiumMax: '',
    ageMin: '',
    ageMax: '75_years',
    productCategory: 'UL',
  },
  U17R: {
    desc: 'PRULink Investor Account (Revamp)',
    currency: 'IDR',
    remark: '',
    premiumMin: 80000000,
    premiumMax: '',
    ageMin: '1_years',
    ageMax: '70_years',
    productCategory: 'UL',
  },
  U17D: {
    desc: 'PRULink Investor Account (Revamp)',
    currency: 'USD',
    remark: '',
    premiumMin: 35000,
    premiumMax: '',
    ageMin: '',
    ageMax: '70_years',
    productCategory: 'UL',
  },
  U13: {
    desc: 'PRULink NextGen Syariah',
    currency: 'IDR',
    remark: '',
    premiumMin: 500000,
    premiumMax: '',
    ageMin: '',
    ageMax: '75_years',
    productCategory: 'UL',
  },
  U18: {
    desc: 'PRULink Syariah Investor Account (Revamp)',
    currency: 'IDR',
    remark: '',
    premiumMin: 80000000,
    premiumMax: '',
    ageMin: '',
    ageMax: '70_years',
    productCategory: 'UL',
  },
  H14: {
    desc: 'PRUWell Medical',
    currency: 'IDR',
    remark: '',
    premiumMin: 1000,
    premiumMax: '',
    ageMin: '',
    ageMax: '75_years',
    productCategory: 'TRD',
  },
  H15: {
    desc: 'PRUWell Medical Syariah',
    currency: 'IDR',
    remark: '',
    premiumMin: 1000,
    premiumMax: '',
    ageMin: '',
    ageMax: '75_years',
    productCategory: 'TRD',
  },
  L1WR: {
    desc: 'PRUFuture',
    currency: 'IDR',
    remark: '',
    premiumMin: 500000,
    premiumMax: '',
    ageMin: '1_years',
    ageMax: '70_years',
    productCategory: 'TRD',
  },
  L1WD: {
    desc: 'PRUFuture',
    currency: 'USD',
    remark: '',
    premiumMin: 100,
    premiumMax: '',
    ageMin: '1_years',
    ageMax: '70_years',
    productCategory: 'TRD',
  },
}

type TProductsCategory = Record<TPolicyType, string[]>

const productByCategory: TProductsCategory = {
  "": [],
  // conventional: ['U12', 'H14'],
  // sharia: ['U13', 'H15'],
  conventional: ['U12', 'H14', 'T1P', 'T1Q', 'L1WR', 'L1WD', 'U17'],
  sharia: ['U13', 'H15', 'L1Q', 'E1O', 'E1OP', 'C16'],
}

const frequencyMap: Record<string, number> = {
  '12': 1,
  '04': 3,
  '02': 6,
  '01': 12,
  '00': 1,
};

const multiCurrencyProduct = ['U17', 'L1W'];
const oneTimePaymentProduct = ['U17'];

interface MaxAnbConfig {
  maxAnb: number;
  PH: boolean;
  LA: boolean;
}

const maxAnbConfig: Record<string, MaxAnbConfig> = {
  L1WR: {
    maxAnb: 70,
    PH: true,
    LA: true,
  },
  L1WD: {
    maxAnb: 55,
    PH: true,
    LA: true,
  },
  E1O: {
    maxAnb: 19,
    PH: false,
    LA: true,
  },
  E1OP: {
    maxAnb: 19,
    PH: false,
    LA: true,
  },
};

export const getProduct = async (
  selectedGoals: string[],
  productCategory: keyof TProductsCategory,
  budget: number,
  policyHolder: string,
  currency: { label: string; key: string } | any,
  paymentFrequency: string,
  anb: number,
  clientType: 'PH' | 'LA' = 'PH'
) => {
  const _selectedGoals = [...selectedGoals];
  let errorMessage = '';

  const tempProductSelected: string[] = [];

  if (policyHolder == 'self') {
    const indexPendidikan = _selectedGoals.indexOf('pendidikan');
    if (indexPendidikan != -1) {
      _selectedGoals.splice(indexPendidikan, 1);
    }
  }

  _selectedGoals?.map((goal: string) => {
    goalProduct[goal as keyof TGoalProducts]?.map((z: string) => {
      if (!tempProductSelected.includes(z) && productByCategory[productCategory].includes(z)) {
        tempProductSelected.push(z);
      }
    });
  });

  const selectedProduct: string[] = [];
  const minBubdgetFrequency = budget / frequencyMap[paymentFrequency || '12'];

  tempProductSelected?.map((_productCode: string) => {
    let productCode = _productCode;

    // modify product that has multiple currency
    if (multiCurrencyProduct.includes(productCode)) {
      productCode = `${productCode}${currency.key == 'USD' ? 'D' : 'R'}`;
    }

    const tempProduct = descProduct[productCode];

    const isBudgetPass = tempProduct?.premiumMin <= minBubdgetFrequency;
    const isCurrencyPass = tempProduct?.currency === currency.key
    const checkAnb = maxAnbConfig[productCode]?.[clientType] || false;
    const isAnbPass = checkAnb ? (maxAnbConfig[productCode]?.maxAnb ? anb <= maxAnbConfig[productCode]?.maxAnb : true) : true;

    if (isBudgetPass && isCurrencyPass && isAnbPass) {
      // filter one-time payment product
      if (paymentFrequency === '00') {
        if (oneTimePaymentProduct.includes(_productCode)) {
          selectedProduct.push(productCode);
        }
      } else {
        if (!oneTimePaymentProduct.includes(_productCode)) {
          selectedProduct.push(productCode);
        }
      }
    } else {
      errorMessage =
        'Berdasarkan anggaran atau tujuan asuransi Anda, kami tidak memiliki rekomendasi produk. Silakan sesuaikan anggaran atau tujuan asuransi yang Anda masukkan.';
    }
  });

  return { selectedProduct, errorMessage };
};
