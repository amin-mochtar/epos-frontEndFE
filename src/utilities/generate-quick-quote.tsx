import { numberWithCommas } from 'plai_common_frontend';
import { WR_SHARIA_CONVENT } from './wording/common.wording';
import { INSURANCE_GOALS_OPTION } from './epos.data';
import { LIST_INPUT } from '../screen/esqs/calculator/calculator.data';
import { TCommonOptionalData } from './epos.type';
import { ISQSDetail } from './model';
import { FUND } from './fund.data';

export interface IQuickQuoteResult {
  sqsId: string;
  isSharia: boolean;
  insuranceGoal: string;
  summary: { label: string; value: string; additionalDesc?: string }[];
  detail: {
    listItem: TCommonOptionalData[];
    rider: any[];
    option: { label: string; value: string } | null;
    investmentFundsTopup: any | null;
    investmentFunds: any | null;
    assumedCashValue: { label: string; value: string } | null;
    stepIndicator: {
      label: string;
      value: any;
    }[];
    ilustration: [];
    optionData: { label: string; key: string }[] | [];
  };
}

export const generateQuickQuote = (productKey: string, SQSData: ISQSDetail | null, ilustrationData: any) => {
  if (!SQSData) return false;

  const { calculator } = SQSData;
  const calculatorData = calculator ? JSON.parse(calculator) : null;

  /* need to refact later for PNG PNGS use case */
  const FUNDMAP = ilustrationData?.FUNDMAP;

  const fundPercentage = {
    low: 0,
    med: 0,
    hig: 0,
  };
  const selectedFundKey = FUNDMAP ? Object.keys(ilustrationData?.FUNDMAP) : [];

  selectedFundKey.forEach((fundKey) => {
    const fundData = FUND[fundKey as keyof typeof FUND];
    fundPercentage.low += Number(fundData.lowRate);
    fundPercentage.med += Number(fundData.mediumRate);
    fundPercentage.hig += Number(fundData.highRate);
  });

  const FUNDBENEFIT = ilustrationData?.FUNDBENEFIT || [];
  const benefits = calculator ? JSON.parse(calculator).benefits || [] : [];
  const product = SQSData?.product?.label || '';
  const additionalBenefits = SQSData?.additionalBenefits;
  const regularPremium = calculator ? JSON.parse(calculator).regularPremium || '' : '';
  const topupBenefits = calculator ? JSON.parse(calculator).topupBenefits || [] : [];
  const mainBenefits = calculator ? JSON.parse(calculator).mainBenefits || [] : [];
  const frequencyPayment = calculator ? JSON.parse(calculator)?.frequencyPayment?.label || '' : '';
  const fund = SQSData?.fund ? JSON.parse(SQSData.fund) || [] : [];
  const fundTopUp = SQSData?.fundTopup ? JSON.parse(SQSData.fundTopup) || [] : [];
  const isSharia = SQSData.policyType === 'sharia';
  const insuranceGoal =
    SQSData.insuranceGoal.length <= 1
      ? `${INSURANCE_GOALS_OPTION.find((item) => item.key === SQSData?.insuranceGoal[0])?.label?.replace(
        'Premi',
        WR_SHARIA_CONVENT[SQSData?.policyType || 'conventional'].premiContribution,
      ) || ''
      }`
      : `${(SQSData?.insuranceGoal || [])
        .map((result) => {
          return (
            INSURANCE_GOALS_OPTION.find((item) => item.key === result)?.label?.replace(
              'Premi',
              WR_SHARIA_CONVENT[SQSData?.policyType || 'conventional'].premiContribution,
            ) || ''
          );
        })
        .join(', ')
        .replace(',', ' &')}`;
  const paymentPeriod = calculator ? JSON.parse(calculator)?.paymentPeriod?.key || '5' : '5';
  let result: IQuickQuoteResult = {
    sqsId: SQSData?.sqsId || '',
    isSharia,
    insuranceGoal: '',
    summary: [],
    detail: {
      listItem: [],
      rider: [],
      option: null,
      investmentFundsTopup: null,
      investmentFunds: null,
      assumedCashValue: null,
      stepIndicator: [],
      ilustration: [],
      optionData: [],
    },
  };

  let summary: { label: string; value: string; additionalDesc?: string }[];

  // PWM
  if (['H14', 'H15'].includes(productKey)) {
    summary = [
      {
        label: 'Produk',
        value: product,
      },
      {
        label: `Total ${WR_SHARIA_CONVENT[SQSData?.policyType || 'conventional'].premiContribution} ${frequencyPayment}`,
        value: `Rp${regularPremium}`,
      },
      {
        label: 'PRUWell Medical',
        value: `${mainBenefits[0]?.planRider?.label}`,
      },
      {
        label: 'PRUWell Saver',
        value:
          mainBenefits[0]?.saverRider?.label && mainBenefits[0].saverRider.label !== 'Tidak dipilih'
            ? 'Rp' + numberWithCommas(mainBenefits[0]?.saverRider?.label || '')
            : '-',
      },
    ];

    result = {
      sqsId: SQSData.sqsId,
      isSharia,
      summary: summary,
      insuranceGoal,
      detail: {
        listItem: [],
        rider: [],
        investmentFundsTopup: null,
        investmentFunds: null,
        assumedCashValue: null,
        option: null,
        optionData: [],
        ilustration: [],
        stepIndicator: [],
      },
    };
  }

  // PAS
  if (productKey === 'L1Q') {
    summary = [
      {
        label: 'Produk',
        value: product,
      },
      {
        label: `Total Kontribusi ${frequencyPayment}`,
        value: `Rp${regularPremium}`,
      },
      {
        label: 'Santunan Asuransi',
        value: `Rp${mainBenefits[0]?.sumInsured}`,
      },
      {
        label: 'Masa Kepersertaan',
        value: '120 Tahun',
      },
    ];

    result = {
      sqsId: SQSData.sqsId,
      isSharia,
      insuranceGoal,
      summary: summary,
      detail: {
        listItem: summary,
        rider: [],
        investmentFundsTopup: null,
        investmentFunds: null,
        assumedCashValue: {
          label: 'Asumsi Nilai Tunai',
          value: 'Asumsi nilai tunai pada usia 120',
        },
        option: {
          label: 'Pilih Usia',
          value: '120',
        },
        optionData: calculator
          ? [
            ...Object.values({
              age1: JSON.parse(calculator).age1,
              age2: JSON.parse(calculator).age2,
              age3: JSON.parse(calculator).age3,
            }).map((age) => ({
              label: age,
              key: age,
            })),
            { key: '120', label: '120' },
          ]
          : [],
        ilustration: FUNDBENEFIT,
        stepIndicator: [
          {
            label: 'Rendah',
            value: FUNDBENEFIT.find((item: any) => item.customerAge === '120')?.lowClient,
          },
          {
            label: 'Sedang',
            value: FUNDBENEFIT.find((item: any) => item.customerAge === '120')?.medClient,
          },
          {
            label: 'Tinggi',
            value: FUNDBENEFIT.find((item: any) => item.customerAge === '120')?.highClient,
          },
        ],
      },
    };
  }

  // PNG
  if (['U12', 'U13'].includes(productKey)) {
    summary = [
      {
        label: 'Produk',
        value: `${product} (Hingga ${mainBenefits[0]?.periodInsured.label} tahun)`,
      },
      {
        label: `Total Premi ${frequencyPayment}`,
        value: `Rp${regularPremium}`,
      },
      {
        label: SQSData.policyType === 'conventional' ? 'PRUSaver' : 'PRUSaver Syariah',
        value: topupBenefits[0]?.regularTopupPremium ? 'Rp' + topupBenefits[0]?.regularTopupPremium : '-',
      },
      {
        label: SQSData.policyType === 'conventional' ? 'Uang Pertanggungan' : 'Santunan Asuransi',
        value: `Rp${mainBenefits[0]?.sumInsured || '0'}`,
      },
    ];

    result = {
      sqsId: SQSData.sqsId,
      insuranceGoal,
      isSharia,
      summary: summary,
      detail: {
        listItem: summary,
        rider:
          benefits[0]?.premiRider === '0'
            ? []
            : [
              {
                label: `${additionalBenefits?.[0]?.label || ''} (Hingga ${benefits[0]?.periodRider?.label} tahun)`,
                value: benefits[0]?.planRider?.label,
              },
              {
                label: 'Batas Harga Kamar',
                value: `Rp${benefits[0]?.roomRider?.label}`,
              },
              {
                label:
                  LIST_INPUT[additionalBenefits?.[0]?.key || 'H1H7'].inputList.find(
                    (item) => item.rule === 'saverRider',
                  )?.label || 'PRUPrime Saver',
                value: `Rp${benefits[0]?.saverRider?.label}`,
              },
            ],
        investmentFunds: {
          label: `Dana Investasi ${SQSData.policyType === 'conventional' ? 'Premi' : 'Kontribusi'} Berkala`,
          value: fund.map((item: any, _: number) => {
            return {
              label: item.desc_fund,
              value: item.percent + '%',
            };
          }),
        },
        investmentFundsTopup: {
          label: `Dana Investasi ${SQSData.policyType === 'conventional' ? 'Premi' : 'Kontribusi'} Top Up`,
          value: fundTopUp.map((item: any, _: number) => {
            return {
              label: item.desc_fund,
              value: item.percent + '%',
            };
          }),
        },
        assumedCashValue: {
          label: 'Asumsi Nilai Tunai',
          value: `Asumsi nilai tunai (IDR) jika ${SQSData.policyType === 'conventional' ? 'Premi' : 'Kontribusi'
            } dibayarkan sampai dengan usia ${benefits[0]?.periodInsured?.label} tahun (000).`,
        },
        option: {
          label: 'Pilih Usia',
          value: '99',
        },
        optionData: Array.from({ length: 90 }, (_, k) => {
          return { label: String(k + 1), key: String(k + 1) };
        }),
        ilustration: FUNDBENEFIT,
        stepIndicator: [
          {
            label: 'Negatif',
            value: `${(FUNDBENEFIT || []).find((item: any) => item.customerAge === '99')?.lowClient || '0'}`,
          },
          {
            label: 'Nol',
            value: `${(FUNDBENEFIT || []).find((item: any) => item.customerAge === '99')?.medClient || '0'}`,
          },
          {
            label: 'Positif',
            value: `${(FUNDBENEFIT || []).find((item: any) => item.customerAge === '99')?.highClient || '0'}`,
          },
          {
            label: 'Kinerja Acuan',
            value: `${(FUNDBENEFIT || []).find((item: any) => item.customerAge === '99')?.benClient || '0'}`,
          },
        ],
      },
    };
  }

  // Prucerah
  if (['E1O', 'E1OP'].includes(productKey)) {
    const educationTerm = calculator ? JSON.parse(calculator).educationBenefitPeriod.key : 0;

    const paymentTerm = calculator ? JSON.parse(calculator).contributionPaymentPeriod.key : 0;

    const guarantedBenefitCash = FUNDBENEFIT.find(
      (i: any) => i.year == JSON.parse(calculator!).educationBenefitPeriod.key,
    ).guaranteedBenefitCash;

    summary = [
      {
        label: 'Produk',
        value: product,
      },
      {
        label: `Total Kontribusi ${frequencyPayment}`,
        value: `Rp${regularPremium}`,
      },
      {
        label: `Manfaat Penarikan Tunai Berkala`,
        value: `Rp${mainBenefits[0]?.sumInsured}`,
      },
      {
        label: `Manfaat Penarikan Tunai Sekaligus`,
        value: `Rp${numberWithCommas(guarantedBenefitCash)}`,
      },
      {
        label: 'Masa Kepersetaan',
        value: `${educationTerm ? Number(educationTerm) + 4 : '-'} Tahun`,
      },
    ];

    const detail: TCommonOptionalData[] = [
      ...summary,
      {
        label: 'Masa Tunggu Manfaat Dana Pendidikan',
        value: `${educationTerm} Tahun`,
      },
      {
        label: 'Masa Pembayaran Kontribusi',
        value: `${paymentTerm} Tahun`,
      },
    ];

    result = {
      sqsId: SQSData.sqsId,
      isSharia,
      insuranceGoal,
      summary: summary,
      detail: {
        listItem: detail,
        rider: [],
        investmentFundsTopup: null,
        investmentFunds: null,
        assumedCashValue: null,
        option: null,
        optionData: [],
        ilustration: [],
        stepIndicator: [],
      },
    };
  }

  // PSKKS
  if (['C16'].includes(productKey)) {
    summary = [
      {
        label: 'Produk',
        value: product,
      },
      {
        label: `Total Kontribusi ${frequencyPayment}`,
        value: `Rp${regularPremium}`,
      },
      {
        label: 'Santunan Asuransi',
        value: `Rp${mainBenefits[0]?.sumInsured}`,
      },
      {
        label: 'Mata Uang',
        value: `IDR`,
      },
    ];

    const detail: TCommonOptionalData[] = [];

    result = {
      sqsId: SQSData.sqsId,
      isSharia,
      insuranceGoal,
      summary: summary,
      detail: {
        listItem: detail,
        rider: [],
        investmentFundsTopup: null,
        investmentFunds: null,
        assumedCashValue: null,
        option: null,
        optionData: [],
        ilustration: [],
        stepIndicator: [],
      },
    };
  }
  if (productKey === 'T1Q') {
    summary = [
      {
        label: 'Produk',
        value: product,
        additionalDesc: 'Meninggal, Kondisi Kritis atau Manfaat Jatuh Tempo (usia 88 tahun)',
      },
      {
        label: `Masa Pembayaran Premi`,
        value: `${paymentPeriod} tahun`,
      },
      {
        label: `Total Premi ${frequencyPayment}`,
        value: `Rp${regularPremium}`,
      },
      {
        label: `Uang Pertanggungan IDR`,
        value: `Rp${mainBenefits[0]?.sumInsured}`,
      },
      {
        label: 'Masa Pertanggungan',
        value: `88 Tahun`,
      },
    ];
    result = {
      sqsId: SQSData?.sqsId || '',
      isSharia,
      insuranceGoal,
      summary,
      detail: {
        listItem: [],
        rider: [],
        option: null,
        investmentFundsTopup: null,
        investmentFunds: null,
        assumedCashValue: null,
        stepIndicator: [],
        ilustration: [],
        optionData: [],
      },
    };
  }
  if (productKey === 'T1P') {
    summary = [
      {
        label: 'Produk',
        value: product,
        additionalDesc: 'Meninggal, Kondisi Kritis atau Manfaat Jatuh Tempo (usia 88 tahun)',
      },
      {
        label: `Total Premi Sekali Bayar (IDR)`,
        value: `Rp${regularPremium}`,
      },
      {
        label: `Uang Pertanggungan IDR`,
        value: `Rp${mainBenefits[0]?.sumInsured}`,
      },
      {
        label: 'Masa Pertanggungan',
        value: `88 Tahun`,
      },
    ];
    result = {
      sqsId: SQSData?.sqsId || '',
      isSharia,
      insuranceGoal,
      summary,
      detail: {
        listItem: [],
        rider: [],
        option: null,
        investmentFundsTopup: null,
        investmentFunds: null,
        assumedCashValue: null,
        stepIndicator: [],
        ilustration: [],
        optionData: [],
      },
    };
  }
  if (productKey === 'L1WR') {
    summary = [
      {
        label: 'Produk',
        value: product,
        additionalDesc: 'Meninggal Dunia',
      },
      {
        label: `Total Premi ${frequencyPayment}`,
        value: `Rp${regularPremium}`,
      },
      {
        label: `Uang Pertanggungan`,
        value: `Rp${mainBenefits[0]?.sumInsured}`,
      },
      {
        label: 'Masa Pertanggungan',
        value: `120 Tahun`,
      },
      {
        label: 'Masa Pembayaran Premi',
        value: `${paymentPeriod} Tahun`,
      },
    ];
    result = {
      sqsId: SQSData?.sqsId || '',
      isSharia,
      insuranceGoal,
      summary,
      detail: {
        listItem: [],
        rider: [],
        option: null,
        investmentFundsTopup: null,
        investmentFunds: null,
        assumedCashValue: null,
        stepIndicator: [],
        ilustration: [],
        optionData: [],
      },
    };
  }
  if (productKey === 'L1WD') {
    summary = [
      {
        label: 'Produk',
        value: product,
        additionalDesc: 'Meninggal Dunia',
      },
      {
        label: `Total Premi ${frequencyPayment}`,
        value: `USD ${regularPremium}`,
      },
      {
        label: `Uang Pertanggungan`,
        value: `USD ${mainBenefits[0]?.sumInsured}`,
      },
      {
        label: 'Masa Pertanggungan',
        value: `120 Tahun`,
      },
      {
        label: 'Masa Pembayaran Premi',
        value: `${paymentPeriod} Tahun`,
      },
    ];
    result = {
      sqsId: SQSData?.sqsId || '',
      isSharia,
      insuranceGoal,
      summary,
      detail: {
        listItem: [],
        rider: [],
        option: null,
        investmentFundsTopup: null,
        investmentFunds: null,
        assumedCashValue: null,
        stepIndicator: [],
        ilustration: [],
        optionData: [],
      },
    };
  }

  // PIA
  if (['U17R', 'U17D'].includes(productKey)) {
    summary = [
      {
        label: 'Produk',
        value: `${product} (Hingga ${calculatorData.periodInsured.label} tahun)`,
      },
      {
        label: `Total Premi Sekali Bayar`,
        value: `Rp${regularPremium}`,
      },
      {
        label: 'Uang Pertanggungan',
        value: `Rp${mainBenefits[0]?.sumInsured}`,
      },
      {
        label: 'Dana Investasi',
        value: fund.map((item: any) => {
          return {
            label: item.desc_fund,
            value: item.percent + '%',
          };
        }),
      },
    ];

    const detail: TCommonOptionalData[] = summary.filter((i) => i.label !== 'Dana Investasi');

    result = {
      sqsId: SQSData.sqsId,
      isSharia,
      insuranceGoal,
      summary: summary,
      detail: {
        listItem: detail,
        rider: [],
        investmentFundsTopup: null,
        investmentFunds: {
          label: 'Dana Investasi',
          value: fund.map((item: any) => {
            return {
              label: item.desc_fund,
              value: item.percent + '%',
            };
          }),
        },
        assumedCashValue: {
          label: 'Asumsi Nilai Tunai',
          value: `Asumsi nilai tunai (IDR) pada usia 99.`,
        },
        option: null,
        optionData: [],
        ilustration: [],
        stepIndicator: [
          {
            label: `Negatif (${fundPercentage.low}%)`,
            value: `${(FUNDBENEFIT || []).find((item: any) => item.customerAge === '99')?.lowClient || '0'}`,
          },
          {
            label: `Nol (${fundPercentage.med}%)`,
            value: `${(FUNDBENEFIT || []).find((item: any) => item.customerAge === '99')?.medClient || '0'}`,
          },
          {
            label: `Positif (${fundPercentage.hig}%)`,
            value: `${(FUNDBENEFIT || []).find((item: any) => item.customerAge === '99')?.highClient || '0'}`,
          },
        ],
      },
    };
  }
  return result;
};
