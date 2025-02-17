import { TCategoryRadio } from 'plai_common_frontend/src/components/filter-sort/category-radio/category-radio.type';
import { TCheckboxData, TConfig, TConfigCard, TRadioData } from 'plai_common_frontend';

const STATUS_PROPOSAL_SQS: TCheckboxData[] = [
  {
    key: 'SQSIllustration',
    label: 'SQS Illustration',
  },
  {
    key: 'SPAJPendingSubmit',
    label: 'SPAJ Pending Submit',
  },
  {
    key: 'SPAJPendingSubmitUW',
    label: 'SPAJ Pending UW',
  },
  {
    key: 'SPAJPendingUWCekatanSubmitted',
    label: 'SPAJ Pending UW Cekatan Submitted',
  },
  {
    key: 'SPAJPendingUWRequirement',
    label: 'SPAJ Pending UW Requirement',
  },
  {
    key: 'SPAJPendingProcess',
    label: 'SPAJ Pending Process',
  },
  {
    key: 'SPAJPendingPayment',
    label: 'SPAJ Pending Payment',
  },
  {
    key: 'SPAJPendingApprove',
    label: 'SPAJ Pending Approve',
  },
  {
    key: 'Inforce',
    label: 'Inforce',
  },
  {
    key: 'WaitingforPAYDI',
    label: 'Waiting for PAYDI',
  },
  {
    key: 'DalamProsesSubmit',
    label: 'Dalam Proses Submit',
  },
  {
    key: 'Others',
    label: 'Others',
  },
];
const STATUS_PROPOSAL_DOKSUL: TCheckboxData[] = [
  {
    key: 'SPAJ Pending UW',
    label: 'SPAJ Pending UW',
  },
  {
    key: 'Draft',
    label: 'Dokumen Susulan Draft',
  },
  {
    key: 'Submitted',
    label: 'Dokumen Susulan Submitted',
  },
];

const PERIOD_SUBMISSION: TRadioData[] = [
  {
    key: '7',
    label: '7 Hari',
  },
  {
    key: '14',
    label: '14 Hari',
  },
  {
    key: '30',
    label: '1 Bulan',
  },
  {
    key: '60',
    label: '2 Bulan',
  },
];

const PERIOD_CREATED: TCheckboxData[] = [
  {
    key: '7',
    label: '7 Hari',
  },
  {
    key: '14',
    label: '14 Hari',
  },
  {
    key: '30',
    label: '1 Bulan',
  },
  {
    key: '60',
    label: '2 Bulan',
  },
];

const CURRENCY: TRadioData[] = [
  {
    key: 'IDR',
    label: 'IDR Rupiah',
  },
  {
    key: 'USD',
    label: 'USD Dollar',
  },
];

const YEARLYPREMIUM: TRadioData[] = [
  {
    key: '10000,15000',
    label: '10.000 - 15.000',
  },
  {
    key: '16000,20000',
    label: '16.000 - 20.000',
  },
  {
    key: '20000',
    label: '>20.000',
  },
  {
    key: 'other',
    label: 'Lainnya',
  },
];

const PRODUCTGOALS: TCheckboxData[] = [
  // {
  //   key: 'U17R',
  //   label: 'PRULink Investor',
  // },
  // {
  //   key: 'T1R',
  //   label: 'PRUCinta',
  // },
  {
    key: 'U13',
    label: 'PRULink NextGen Syariah',
  },
  {
    key: 'U12',
    label: 'PRULink NextGen',
  },
  {
    key: 'H15',
    label: 'PRUWell Medical Syariah',
  },
  {
    key: 'H14',
    label: 'PRUWell Medical',
  },
  // {
  //   key: 'L1Q',
  //   label: 'PRUAnugerah Syariah',
  // },
  // {
  //   key: 'H13',
  //   label: 'PRUSolusi Sehat Plus Pro Syariah',
  // },
  // {
  //   key: 'C16',
  //   label: 'PRUSolusi Kondisi Kritis Syariah',
  // },
  // {
  //   key: 'H12',
  //   label: 'PRUSolusi Sehat Plus Pro',
  // },
  // {
  //   key: 'T1P',
  //   label: 'PRUCritical Benefit 88 (Premi Tunggal)',
  // },
  // {
  //   key: 'T1Q',
  //   label: '"PRUCritical Benefit 88 (Premi Berkala)"',
  // },
  // {
  //   key: 'L1P',
  //   label: 'PRUWarisan',
  // },
  // {
  //   key: 'E1O1',
  //   label: 'PRUCerah',
  // },
  // {
  //   key: 'E1O',
  //   label: 'PRUCerah Plus',
  // },
  // {
  //   key: 'U18',
  //   label: 'PRULink Syariah Investor',
  // },
];

const SORT_VALUE: TCategoryRadio[] = [
  {
    key: 'TD',
    label: 'Tanggal Dibuat',
    value: [
      {
        key: 'terbaru',
        label: 'Terbaru',
        labelCategory: 'createdDate',
      },
      {
        key: 'terlama',
        label: 'Terlama',
        labelCategory: 'createdDate',
      },
    ],
  },
  {
    key: 'TS',
    label: 'Tanggal Submit',
    value: [
      {
        key: 'terbaru',
        label: 'Terbaru',
        labelCategory: 'submitDate',
      },
      {
        key: 'terlama',
        label: 'Terlama',
        labelCategory: 'submitDate',
      },
    ],
  },
  {
    key: 'PP',
    label: 'Pemegang Polis',
    value: [
      {
        key: 'terlama',
        label: 'A - Z',
        labelCategory: 'policyHolderName',
      },
      {
        key: 'terbaru',
        label: 'Z - A',
        labelCategory: 'policyHolderName',
      },
    ],
  },
];

export const CONFIG_FILTER_SORT: TConfig = {
  allIds: [
    'sortBy',
    'statusProposal',
    'productGoals',
    'periodCreated',
    'periodSubmission',
    'currency',
    'yearlyPremium',
    'insured',
  ],
  byId: {
    sortBy: {
      title: 'Urutkan berdasarkan',
      type: 'category-radio',
      value: SORT_VALUE,
    },
    statusProposal: {
      title: 'Status Proposal',
      type: 'checkbox',
      value: STATUS_PROPOSAL_SQS,
    },
    productGoals: {
      title: 'Produk Dasar',
      type: 'checkbox-pill',
      value: PRODUCTGOALS,
    },
    periodCreated: {
      title: 'Periode Pembuatan',
      type: 'radio-pill',
      value: PERIOD_CREATED,
    },
    periodSubmission: {
      title: 'Periode Pengajuan',
      type: 'radio-pill',
      value: PERIOD_SUBMISSION,
    },
    currency: {
      title: 'Mata Uang',
      type: 'radio-pill',
      value: CURRENCY,
    },
    yearlyPremium: {
      title: 'Nilai Premi Tahunan',
      type: 'radio-pill',
      value: YEARLYPREMIUM,
    },
    insured: {
      title: 'Nilai Pertanggungan',
      type: 'radio-pill',
      value: YEARLYPREMIUM,
    },
  },
};

export const CONFIG_FILTER_SORT_DOKSUL: TConfig = {
  allIds: [
    'sortBy',
    'statusProposal',
    'productGoals',
    'periodCreated',
    'periodSubmission',
  ],
  byId: {
    sortBy: {
      title: 'Urutkan berdasarkan',
      type: 'category-radio',
      value: SORT_VALUE,
    },
    statusProposal: {
      title: 'Status Proposal',
      type: 'checkbox',
      value: STATUS_PROPOSAL_DOKSUL,
    },
    productGoals: {
      title: 'Produk Dasar',
      type: 'checkbox-pill',
      value: PRODUCTGOALS,
    },
    periodCreated: {
      title: 'Periode Pembuatan',
      type: 'radio-pill',
      value: PERIOD_CREATED,
    },
    periodSubmission: {
      title: 'Periode Pengajuan',
      type: 'radio-pill',
      value: PERIOD_SUBMISSION,
    },
  },
};

export const CONFIG_CARD: TConfigCard = {
  key: 'proposalId',
  keyTitle: 'policyHolderName',
  sideTitle: {
    action: () => { },
  },
  dataSummary: [
    {
      keyValue: 'productName',
    },
    {
      label: 'Tanggal Dibuat',
      keyValue: 'createdDate',
      type: 'Date',
    },
    {
      label: 'Nomor Proposal',
      keyValue: 'proposalId',
    },
    {
      label: 'Nomor SPAJ',
      keyValue: 'spajNumber',
    },
    {
      label: 'Tertanggung Utama',
      keyValue: 'lifeAssuredName',
    },
    {
      label: 'Status',
      keyValue: 'statusProposal',
      type: 'Chips',
    },
  ],
  dataDetail: [
    {
      label: 'Dokumen Susulan',
      keyValue: 'statusDoksul',
      type: 'Chips',
    },
    {
      label: 'Tanggal Diajukan',
      keyValue: 'submitDate',
      type: 'Date',
    },
  ],
  button: {
    left: {
      text: 'Lihat Ilustrasi',
      action: () => { },
    },
    right: {
      text: 'Lanjutkan',
      action: () => { },
    },
  },
};
