const MASA_PERTANGGUNGAN = [
  {
    label: '75',
    key: '75',
  },
  {
    label: '85',
    key: '85',
  },
  {
    label: '99',
    key: '99',
  },
];
const MASA_PERTANGGUNGAN_RIDER = [
  {
    label: '55',
    key: '55',
  },
  {
    label: '65',
    key: '65',
  },
  {
    label: '75',
    key: '75',
  },
  {
    label: '85',
    key: '85',
  },
  {
    label: '99',
    key: '99',
  },
];

const LIST_INPUT: {
  [key: string]: {
    code: string;
    inputList: {
      label: string;
      type: string;
      rule: string;
      placeholder?: string
    }[];
  };
} = {
  H1H7: {
    code: 'H1H7',
    inputList: [
      {
        label: 'Plan',
        type: 'option-dropdown',
        rule: 'planRider',
      },
      {
        label: 'Batas Harga Kamar',
        type: 'option-dropdown',
        rule: 'roomRider',
      },
      {
        label: 'PRUPrime Saver',
        type: 'option-dropdown',
        rule: 'saverRider',
      },
      {
        label: 'Masa Pertanggungan',
        type: 'option-dropdown',
        rule: 'periodRider',
      },
      {
        label: 'Premi',
        type: 'input-curr-disable',
        rule: 'premiRider',
      },
    ],
  },
  H1H1: {
    code: 'H1H1',
    inputList: [
      {
        label: 'Plan',
        type: 'option-dropdown',
        rule: 'planRider',
      },
      {
        label: 'Batas Harga Kamar',
        type: 'option-dropdown',
        rule: 'roomRider',
      },
      {
        label: 'PRUPrime Saver',
        type: 'option-dropdown',
        rule: 'saverRider',
      },
      {
        label: 'Masa Pertanggungan',
        type: 'option-dropdown',
        rule: 'periodRider',
      },
      {
        label: 'Premi',
        type: 'input-curr-disable',
        rule: 'premiRider',
      },
    ],
  },
  H1H5: {
    code: 'H1H5',
    inputList: [
      {
        label: 'Plan',
        type: 'option-dropdown',
        rule: 'planRider',
      },
      {
        label: 'Batas Harga Kamar',
        type: 'option-dropdown',
        rule: 'roomRider',
      },
      {
        label: 'PRUPrime Saver',
        type: 'option-dropdown',
        rule: 'saverRider',
      },
      {
        label: 'Masa Pertanggungan',
        type: 'option-dropdown',
        rule: 'periodRider',
      },
      {
        label: 'Premi',
        type: 'input-curr-disable',
        rule: 'premiRider',
      },
    ],
  },
  H1H3: {
    code: 'H1H3',
    inputList: [
      {
        label: 'Plan',
        type: 'option-dropdown',
        rule: 'planRider',
      },
      {
        label: 'Batas Harga Kamar',
        type: 'option-dropdown',
        rule: 'roomRider',
      },
      {
        label: 'PRUPrime Saver',
        type: 'option-dropdown',
        rule: 'saverRider',
      },
      {
        label: 'Masa Pertanggungan',
        type: 'option-dropdown',
        rule: 'periodRider',
      },
      {
        label: 'Premi',
        type: 'input-curr-disable',
        rule: 'premiRider',
      },
    ],
  },
  // PWH
  H161: {
    code: 'H161',
    inputList: [
      {
        label: 'Plan',
        type: 'option-dropdown',
        rule: 'planRider',
      },
      {
        label: 'Batas Harga Kamar',
        type: 'option-dropdown',
        rule: 'roomRider',
      },
      {
        label: 'PRUWell Saver',
        placeholder: 'PRUWell Saver',
        type: 'option-dropdown',
        rule: 'saverRider',
      },
      {
        label: 'Masa Pertanggungan',
        type: 'option-dropdown',
        rule: 'periodRider',
      },
      {
        label: 'Premi Tahunan',
        type: 'input-curr-disable',
        rule: 'premiRider',
      },
    ],
  },
  H165: {
    code: 'H165',
    inputList: [
      {
        label: 'Plan',
        type: 'option-dropdown',
        rule: 'planRider',
      },
      {
        label: 'Batas Harga Kamar',
        type: 'option-dropdown',
        rule: 'roomRider',
      },
      {
        label: 'PRUWell Saver Syariah',
        placeholder: 'PRUWell Saver Syariah',
        type: 'option-dropdown',
        rule: 'saverRider',
      },
      {
        label: 'Masa Pertanggungan',
        type: 'option-dropdown',
        rule: 'periodRider',
      },
      {
        label: 'Premi Tahunan',
        type: 'input-curr-disable',
        rule: 'premiRider',
      },
    ],
  },
  // PWH end
  U13R: {
    code: 'U13R',
    inputList: [
      {
        label: 'Uang Pertanggungan',
        type: 'input-curr',
        rule: 'saMain',
      },
      {
        label: 'Masa Pertanggungan',
        type: 'option-dropdown',
        rule: 'periodMain',
      },
    ],
  },
  U1I3: {
    code: 'U1I3',
    inputList: [
      {
        label: 'Premi Top-up Berkala',
        type: 'input-curr',
        rule: 'contribusiTopup',
      },
    ],
  },
  U12R: {
    code: 'U12R',
    inputList: [
      {
        label: 'Uang Pertanggungan',
        type: 'input-curr',
        rule: 'saMain',
      },
      {
        label: 'Masa Pertanggungan',
        type: 'option-dropdown',
        rule: 'periodMain',
      },
    ],
  },
  U1C5: {
    code: 'U1C5',
    inputList: [
      {
        label: 'Premi Top-up Berkala',
        type: 'input-curr',
        rule: 'premiTopup',
      },
    ],
  },
  // PWM
  H141: {
    code: 'H141',
    inputList: [
      {
        label: 'Plan',
        type: 'option-dropdown',
        rule: 'planRider',
      },
      {
        label: 'Batas Harga Kamar',
        type: 'option-dropdown',
        rule: 'roomRider',
      },
      {
        label: 'PRUWell Saver',
        placeholder: 'PRUWell Saver',
        type: 'option-dropdown',
        rule: 'saverRider',
      },
    ],
  },
  H151: {
    code: 'H151',
    inputList: [
      {
        label: 'Plan',
        type: 'option-dropdown',
        rule: 'planRider',
      },
      {
        label: 'Batas Harga Kamar',
        type: 'option-dropdown',
        rule: 'roomRider',
      },
      {
        label: 'PRUWell Saver',
        placeholder: 'PRUWell Saver',
        type: 'option-dropdown',
        rule: 'saverRider',
      },
    ],
  },
  /** Anugrah */
  L1QR: {
    code: 'L1QR',
    inputList: [
      {
        label: 'Santunan Asuransi',
        type: 'input-curr',
        rule: 'saMain',
        placeholder: 'Jumlah Santunan',
      },
    ],
  },

  // PRUCERAH
  E1O1: {
    code: 'E1O',
    inputList: [
      {
        label: 'Manfaat Penarikan Tunai Berkala',
        type: 'input-curr',
        rule: 'saMain',
        placeholder: 'Jumlah Santunan',
      },
    ],
  },
  E1OR: {
    code: 'E1OP',
    inputList: [
      {
        label: 'Manfaat Penarikan Tunai Berkala',
        type: 'input-curr',
        rule: 'saMain',
        placeholder: 'Jumlah Santunan',
      },
    ],
  },

  // PSKKS
  C16R: {
    code: 'C16R',
    inputList: [
      {
        label: 'Santunan Asuransi',
        type: 'input-curr',
        rule: 'saMain',
        placeholder: 'Jumlah Santunan',
      },
    ],
  },

  T1QR: {
    code: 'T1QR',
    inputList: [
      {
        label: 'Santunan Asuransi',
        type: 'input-curr',
        rule: 'saMain',
      },
    ],
  },
  T1PR: {
    code: 'T1PR',
    inputList: [
      {
        label: 'Uang Pertanggungan',
        type: 'input-curr',
        rule: 'saMain',
      },
    ],
  },
  L1WR: {
    code: 'L1WR',
    inputList: [
      {
        label: 'Uang Pertanggungan',
        type: 'input-curr',
        rule: 'saMain',
      },
    ],
  },
  L1WD: {
    code: 'L1WD',
    inputList: [
      {
        label: 'Uang Pertanggungan',
        type: 'input-curr',
        rule: 'saMain',
      },
    ],
  },

  // PIA
  U17R: {
    code: 'U17R',
    inputList: [
      {
        label: 'Uang Pertanggungan',
        type: 'input-curr-disable',
        rule: 'saMainAuto',
      },
    ],
  },
  U17D: {
    code: 'U17D',
    inputList: [
      {
        label: 'Uang Pertanggungan',
        type: 'input-curr-disable',
        rule: 'saMainAuto',
      },
    ],
  },
};

const INPUT: {
  [key: string]: {
    code: string;
    description: string;
    type: string;
    key: string;
    value: any;
  };
} = {
  PHSPCR: {
    code: 'PHSPCR',
    description: 'Plan',
    type: 'nestedoption',
    value: [
      {
        label: 'Cermat 1 - Indonesia',
        key: '1',
        value: 'PHSPR9',
      },
      {
        label: 'Cermat 2 - Indonesia',
        key: '2',
        value: 'PHSPR10',
      },
      {
        label: 'Cermat 3 - Indonesia',
        key: '3',
        value: 'PHSP110',
      },
    ],
    key: 'PDPLAN',
  },
  PHSPR9: {
    code: 'PHSPR9',
    description: 'Batas Harga Kamar',
    type: 'nestedoption',
    value: [
      {
        label: '300000',
        key: '300000',
        value: 'PHSPR91',
      },
    ],
    key: 'PDPLAN2',
  },
  PHSPR10: {
    code: 'PHSPR10',
    description: 'Batas Harga Kamar',
    type: 'nestedoption',
    value: [
      {
        label: '550000',
        key: '550000',
        value: 'PHSPR101',
      },
    ],
    key: 'PDPLAN2',
  },
  PHSPR110: {
    code: 'PHSPR110',
    description: 'Batas Harga Kamar',
    type: 'nestedoption',
    value: [
      {
        label: '650000',
        key: '650000',
        value: 'PHSPR111',
      },
    ],
    key: 'PDPLAN2',
  },
  PHSPR91: {
    code: 'PHSPR91',
    description: 'PRUprime Saver',
    type: 'advancedoption',
    value: [
      {
        label: 'Tidak dipilih',
        key: 'Tidak dipilih',
        value: 'A1',
      },
      {
        label: '1000000',
        key: '1000000',
        value: 'A2',
      },
    ],
    key: 'PDSAVER',
  },
  PHSPR101: {
    code: 'PHSPR101',
    description: 'PRUprime Saver',
    type: 'advancedoption',
    value: [
      {
        label: 'Tidak dipilih',
        key: 'Tidak dipilih',
        value: 'B1',
      },
      {
        label: '2000000',
        key: '2000000',
        value: 'B2',
      },
    ],
    key: 'PDSAVER',
  },
  PHSPR111: {
    code: 'PHSPR111',
    description: 'PRUprime Saver',
    type: 'advancedoption',
    value: [
      {
        label: 'Tidak dipilih',
        key: 'Tidak dipilih',
        value: 'C1',
      },
      {
        label: '3000000',
        key: '3000000',
        value: 'C2',
      },
    ],
    key: 'PDSAVER',
  },
  PHSPR: {
    code: 'PHSPR',
    description: 'Plan',
    type: 'nestedoption',
    value: [
      {
        label: 'Bronze A - Indonesia - 2 Bed',
        key: '1',
        value: 'PHSPR1',
      },
      {
        label: 'Bronze B - Indonesia - 1 Bed',
        key: '2',
        value: 'PHSPR2',
      },
      {
        label: 'Silver A - Asia (excl JPN, HK, SG) - 2 Bed',
        key: '3',
        value: 'PHSPR3',
      },
      {
        label: 'Silver B - Asia (excl JPN, HK, SG) - 1 Bed',
        key: '4',
        value: 'PHSPR4',
      },
      {
        label: 'Gold A - Asia - 2 Bed',
        key: '5',
        value: 'PHSPR5',
      },
      {
        label: 'Gold B - Asia - 1 Bed',
        key: '6',
        value: 'PHSPR6',
      },
      {
        label: 'Platinum - Worldwide (excl USA) - 1 Bed',
        key: '7',
        value: 'PHSPR7',
      },
      {
        label: 'Diamond - Worldwide - 1 Bed',
        key: '8',
        value: 'PHSPR8',
      },
    ],
    key: 'PDPLAN',
  },
  PHSPR1: {
    code: 'PHSPR1',
    description: 'Batas Harga Kamar',
    type: 'nestedoption',
    value: [
      {
        label: '550000',
        key: '550000',
        value: 'PHSPR11',
      },
      {
        label: '1100000',
        key: '1100000',
        value: 'PHSPR12',
      },
    ],
    key: 'PDPLAN2',
  },
  PHSPR2: {
    code: 'PHSPR2',
    description: 'Batas Harga Kamar',
    type: 'nestedoption',
    value: [
      {
        label: '1100000',
        key: '1100000',
        value: 'PHSPR21',
      },
      {
        label: '3000000',
        key: '3000000',
        value: 'PHSPR22',
      },
    ],
    key: 'PDPLAN2',
  },
  PHSPR3: {
    code: 'PHSPR3',
    description: 'Batas Harga Kamar',
    type: 'nestedoption',
    value: [
      {
        label: '550000',
        key: '550000',
        value: 'PHSPR31',
      },
      {
        label: '1100000',
        key: '1100000',
        value: 'PHSPR32',
      },
    ],
    key: 'PDPLAN2',
  },
  PHSPR4: {
    code: 'PHSPR4',
    description: 'Batas Harga Kamar',
    type: 'nestedoption',
    value: [
      {
        label: '1100000',
        key: '1100000',
        value: 'PHSPR41',
      },
      {
        label: '3000000',
        key: '3000000',
        value: 'PHSPR42',
      },
    ],
    key: 'PDPLAN2',
  },
  PHSPR5: {
    code: 'PHSPR5',
    description: 'Batas Harga Kamar',
    type: 'nestedoption',
    value: [
      {
        label: '1100000',
        key: '1100000',
        value: 'PHSPR51',
      },
      {
        label: '3000000',
        key: '3000000',
        value: 'PHSPR52',
      },
    ],
    key: 'PDPLAN2',
  },
  PHSPR6: {
    code: 'PHSPR6',
    description: 'Batas Harga Kamar',
    type: 'nestedoption',
    value: [
      {
        label: '1700000',
        key: '1700000',
        value: 'PHSPR61',
      },
      {
        label: '5000000',
        key: '5000000',
        value: 'PHSPR62',
      },
    ],
    key: 'PDPLAN2',
  },
  PHSPR7: {
    code: 'PHSPR7',
    description: 'Batas Harga Kamar',
    type: 'nestedoption',
    value: [
      {
        label: '1700000',
        key: '1700000',
        value: 'PHSPR71',
      },
      {
        label: '10000000',
        key: '10000000',
        value: 'PHSPR72',
      },
    ],
    key: 'PDPLAN2',
  },
  PHSPR8: {
    code: 'PHSPR8',
    description: 'Batas Harga Kamar',
    type: 'nestedoption',
    value: [
      {
        label: '1700000',
        key: '1700000',
        value: 'PHSPR81',
      },
      {
        label: '10000000',
        key: '10000000',
        value: 'PHSPR82',
      },
    ],
    key: 'PDPLAN2',
  },
  PHSPR11: {
    code: 'PHSPR11',
    description: 'PRUprime Saver',
    type: 'advancedoption',
    value: [
      {
        label: 'Tidak dipilih',
        key: 'Tidak dipilih',
        value: 'A1',
      },
      {
        label: '4000000',
        key: '4000000',
        value: 'A2',
      },
    ],
    key: 'PDSAVER',
  },
  PHSPR12: {
    code: 'PHSPR12',
    description: 'PRUprime Saver',
    type: 'advancedoption',
    value: [
      {
        label: 'Tidak dipilih',
        key: 'Tidak dipilih',
        value: 'A3',
      },
      {
        label: '4000000',
        key: '4000000',
        value: 'A4',
      },
    ],
    key: 'PDSAVER',
  },
  PHSPR21: {
    code: 'PHSPR21',
    description: 'PRUprime Saver',
    type: 'advancedoption',
    value: [
      {
        label: 'Tidak dipilih',
        key: 'Tidak dipilih',
        value: 'B1',
      },
      {
        label: '5000000',
        key: '5000000',
        value: 'B2',
      },
    ],
    key: 'PDSAVER',
  },
  PHSPR22: {
    code: 'PHSPR22',
    description: 'PRUprime Saver',
    type: 'advancedoption',
    value: [
      {
        label: 'Tidak dipilih',
        key: 'Tidak dipilih',
        value: 'B3',
      },
      {
        label: '5000000',
        key: '5000000',
        value: 'B4',
      },
    ],
    key: 'PDSAVER',
  },
  PHSPR31: {
    code: 'PHSPR31',
    description: 'PRUprime Saver',
    type: 'advancedoption',
    value: [
      {
        label: 'Tidak dipilih',
        key: 'Tidak dipilih',
        value: 'C1',
      },
      {
        label: '4000000',
        key: '4000000',
        value: 'C2',
      },
    ],
    key: 'PDSAVER',
  },
  PHSPR32: {
    code: 'PHSPR32',
    description: 'PRUprime Saver',
    type: 'advancedoption',
    value: [
      {
        label: 'Tidak dipilih',
        key: 'Tidak dipilih',
        value: 'C3',
      },
      {
        label: '4000000',
        key: '4000000',
        value: 'C4',
      },
    ],
    key: 'PDSAVER',
  },
  PHSPR41: {
    code: 'PHSPR41',
    description: 'PRUprime Saver',
    type: 'advancedoption',
    value: [
      {
        label: 'Tidak dipilih',
        key: 'Tidak dipilih',
        value: 'D1',
      },
      {
        label: '5000000',
        key: '5000000',
        value: 'D2',
      },
    ],
    key: 'PDSAVER',
  },
  PHSPR42: {
    code: 'PHSPR42',
    description: 'PRUprime Saver',
    type: 'advancedoption',
    value: [
      {
        label: 'Tidak dipilih',
        key: 'Tidak dipilih',
        value: 'D3',
      },
      {
        label: '5000000',
        key: '5000000',
        value: 'D4',
      },
    ],
    key: 'PDSAVER',
  },
  PHSPR51: {
    code: 'PHSPR51',
    description: 'PRUprime Saver',
    type: 'advancedoption',
    value: [
      {
        label: 'Tidak dipilih',
        key: 'Tidak dipilih',
        value: 'E1',
      },
      {
        label: '9000000',
        key: '9000000',
        value: 'E2',
      },
    ],
    key: 'PDSAVER',
  },
  PHSPR52: {
    code: 'PHSPR52',
    description: 'PRUprime Saver',
    type: 'advancedoption',
    value: [
      {
        label: 'Tidak dipilih',
        key: 'Tidak dipilih',
        value: 'E3',
      },
      {
        label: '9000000',
        key: '9000000',
        value: 'E4',
      },
    ],
    key: 'PDSAVER',
  },
  PHSPR61: {
    code: 'PHSPR61',
    description: 'PRUprime Saver',
    type: 'advancedoption',
    value: [
      {
        label: 'Tidak dipilih',
        key: 'Tidak dipilih',
        value: 'F1',
      },
      {
        label: '10000000',
        key: '10000000',
        value: 'F2',
      },
    ],
    key: 'PDSAVER',
  },
  PHSPR62: {
    code: 'PHSPR62',
    description: 'PRUprime Saver',
    type: 'advancedoption',
    value: [
      {
        label: 'Tidak dipilih',
        key: 'Tidak dipilih',
        value: 'F3',
      },
      {
        label: '10000000',
        key: '10000000',
        value: 'F4',
      },
    ],
    key: 'PDSAVER',
  },
  PHSPR71: {
    code: 'PHSPR71',
    description: 'PRUprime Saver',
    type: 'advancedoption',
    value: [
      {
        label: 'Tidak dipilih',
        key: 'Tidak dipilih',
        value: 'G1',
      },
      {
        label: '15000000',
        key: '15000000',
        value: 'G2',
      },
    ],
    key: 'PDSAVER',
  },
  PHSPR72: {
    code: 'PHSPR72',
    description: 'PRUprime Saver',
    type: 'advancedoption',
    value: [
      {
        label: 'Tidak dipilih',
        key: 'Tidak dipilih',
        value: 'G3',
      },
      {
        label: '15000000',
        key: '15000000',
        value: 'G4',
      },
    ],
    key: 'PDSAVER',
  },
  PHSPR81: {
    code: 'PHSPR81',
    description: 'PRUprime Saver',
    type: 'advancedoption',
    value: [
      {
        label: 'Tidak dipilih',
        key: 'Tidak dipilih',
        value: 'H1',
      },
      {
        label: '20000000',
        key: '20000000',
        value: 'H2',
      },
    ],
    key: 'PDSAVER',
  },
  PHSPR82: {
    code: 'PHSPR82',
    description: 'PRUprime Saver',
    type: 'advancedoption',
    value: [
      {
        label: 'Tidak dipilih',
        key: 'Tidak dipilih',
        value: 'H3',
      },
      {
        label: '20000000',
        key: '20000000',
        value: 'H4',
      },
    ],
    key: 'PDSAVER',
  },
  PHCPR: {
    code: 'PHCPR',
    description: 'Plan',
    type: 'nestedoption',
    value: [
      {
        label: 'Bronze A - Indonesia - 2 Bed',
        key: '1',
        value: 'PHCPR1',
      },
      {
        label: 'Bronze B - Indonesia - 1 Bed',
        key: '2',
        value: 'PHCPR2',
      },
      {
        label: 'Silver A - Asia (excl JPN, HK, SG) - 2 Bed',
        key: '3',
        value: 'PHCPR3',
      },
      {
        label: 'Silver B - Asia (excl JPN, HK, SG) - 1 Bed',
        key: '4',
        value: 'PHCPR4',
      },
      {
        label: 'Gold A - Asia - 2 Bed',
        key: '5',
        value: 'PHCPR5',
      },
      {
        label: 'Gold B - Asia - 1 Bed',
        key: '6',
        value: 'PHCPR6',
      },
      {
        label: 'Platinum - Worldwide (excl USA) - 1 Bed',
        key: '7',
        value: 'PHCPR7',
      },
      {
        label: 'Diamond - Worldwide - 1 Bed',
        key: '8',
        value: 'PHCPR8',
      },
    ],
    key: 'PDPLAN',
  },
  PHCPR1: {
    code: 'PHCPR1',
    description: 'Batas Harga Kamar',
    type: 'nestedoption',
    value: [
      {
        label: '550000',
        key: '550000',
        value: 'PHCPR11',
      },
      {
        label: '1100000',
        key: '1100000',
        value: 'PHCPR12',
      },
    ],
    key: 'PDPLAN2',
  },
  PHCPR2: {
    code: 'PHCPR2',
    description: 'Batas Harga Kamar',
    type: 'nestedoption',
    value: [
      {
        label: '1100000',
        key: '1100000',
        value: 'PHCPR21',
      },
      {
        label: '3000000',
        key: '3000000',
        value: 'PHCPR22',
      },
    ],
    key: 'PDPLAN2',
  },
  PHCPR3: {
    code: 'PHCPR3',
    description: 'Batas Harga Kamar',
    type: 'nestedoption',
    value: [
      {
        label: '550000',
        key: '550000',
        value: 'PHCPR31',
      },
      {
        label: '1100000',
        key: '1100000',
        value: 'PHCPR32',
      },
    ],
    key: 'PDPLAN2',
  },
  PHCPR4: {
    code: 'PHCPR4',
    description: 'Batas Harga Kamar',
    type: 'nestedoption',
    value: [
      {
        label: '1100000',
        key: '1100000',
        value: 'PHCPR41',
      },
      {
        label: '3000000',
        key: '3000000',
        value: 'PHCPR42',
      },
    ],
    key: 'PDPLAN2',
  },
  PHCPR5: {
    code: 'PHCPR5',
    description: 'Batas Harga Kamar',
    type: 'nestedoption',
    value: [
      {
        label: '1100000',
        key: '1100000',
        value: 'PHCPR51',
      },
      {
        label: '3000000',
        key: '3000000',
        value: 'PHCPR52',
      },
    ],
    key: 'PDPLAN2',
  },
  PHCPR6: {
    code: 'PHCPR6',
    description: 'Batas Harga Kamar',
    type: 'nestedoption',
    value: [
      {
        label: '1700000',
        key: '1700000',
        value: 'PHCPR61',
      },
      {
        label: '5000000',
        key: '5000000',
        value: 'PHCPR62',
      },
    ],
    key: 'PDPLAN2',
  },
  PHCPR7: {
    code: 'PHCPR7',
    description: 'Batas Harga Kamar',
    type: 'nestedoption',
    value: [
      {
        label: '1700000',
        key: '1700000',
        value: 'PHCPR71',
      },
      {
        label: '10000000',
        key: '10000000',
        value: 'PHCPR72',
      },
    ],
    key: 'PDPLAN2',
  },
  PHCPR8: {
    code: 'PHCPR8',
    description: 'Batas Harga Kamar',
    type: 'nestedoption',
    value: [
      {
        label: '1700000',
        key: '1700000',
        value: 'PHCPR81',
      },
      {
        label: '10000000',
        key: '10000000',
        value: 'PHCPR82',
      },
    ],
    key: 'PDPLAN2',
  },
  PHCPR11: {
    code: 'PHCPR11',
    description: 'PRUprime Saver',
    type: 'advancedoption',
    value: [
      {
        label: 'Tidak dipilih',
        key: 'Tidak dipilih',
        value: 'A1',
      },
      {
        label: '4000000',
        key: '4000000',
        value: 'A2',
      },
    ],
    key: 'PDSAVER',
  },
  PHCPR12: {
    code: 'PHCPR12',
    description: 'PRUprime Saver',
    type: 'advancedoption',
    value: [
      {
        label: 'Tidak dipilih',
        key: 'Tidak dipilih',
        value: 'A3',
      },
      {
        label: '4000000',
        key: '4000000',
        value: 'A4',
      },
    ],
    key: 'PDSAVER',
  },
  PHCPR21: {
    code: 'PHCPR21',
    description: 'PRUprime Saver',
    type: 'advancedoption',
    value: [
      {
        label: 'Tidak dipilih',
        key: 'Tidak dipilih',
        value: 'B1',
      },
      {
        label: '5000000',
        key: '5000000',
        value: 'B2',
      },
    ],
    key: 'PDSAVER',
  },
  PHCPR22: {
    code: 'PHCPR22',
    description: 'PRUprime Saver',
    type: 'advancedoption',
    value: [
      {
        label: 'Tidak dipilih',
        key: 'Tidak dipilih',
        value: 'B3',
      },
      {
        label: '5000000',
        key: '5000000',
        value: 'B4',
      },
    ],
    key: 'PDSAVER',
  },
  PHCPR31: {
    code: 'PHCPR31',
    description: 'PRUprime Saver',
    type: 'advancedoption',
    value: [
      {
        label: 'Tidak dipilih',
        key: 'Tidak dipilih',
        value: 'C1',
      },
      {
        label: '4000000',
        key: '4000000',
        value: 'C2',
      },
    ],
    key: 'PDSAVER',
  },
  PHCPR32: {
    code: 'PHCPR32',
    description: 'PRUprime Saver',
    type: 'advancedoption',
    value: [
      {
        label: 'Tidak dipilih',
        key: 'Tidak dipilih',
        value: 'C3',
      },
      {
        label: '4000000',
        key: '4000000',
        value: 'C4',
      },
    ],
    key: 'PDSAVER',
  },
  PHCPR41: {
    code: 'PHCPR41',
    description: 'PRUprime Saver',
    type: 'advancedoption',
    value: [
      {
        label: 'Tidak dipilih',
        key: 'Tidak dipilih',
        value: 'D1',
      },
      {
        label: '5000000',
        key: '5000000',
        value: 'D2',
      },
    ],
    key: 'PDSAVER',
  },
  PHCPR42: {
    code: 'PHCPR42',
    description: 'PRUprime Saver',
    type: 'advancedoption',
    value: [
      {
        label: 'Tidak dipilih',
        key: 'Tidak dipilih',
        value: 'D3',
      },
      {
        label: '5000000',
        key: '5000000',
        value: 'D4',
      },
    ],
    key: 'PDSAVER',
  },
  PHCPR51: {
    code: 'PHCPR51',
    description: 'PRUprime Saver',
    type: 'advancedoption',
    value: [
      {
        label: 'Tidak dipilih',
        key: 'Tidak dipilih',
        value: 'E1',
      },
      {
        label: '9000000',
        key: '9000000',
        value: 'E2',
      },
    ],
    key: 'PDSAVER',
  },
  PHCPR52: {
    code: 'PHCPR52',
    description: 'PRUprime Saver',
    type: 'advancedoption',
    value: [
      {
        label: 'Tidak dipilih',
        key: 'Tidak dipilih',
        value: 'E3',
      },
      {
        label: '9000000',
        key: '9000000',
        value: 'E4',
      },
    ],
    key: 'PDSAVER',
  },
  PHCPR61: {
    code: 'PHCPR61',
    description: 'PRUprime Saver',
    type: 'advancedoption',
    value: [
      {
        label: 'Tidak dipilih',
        key: 'Tidak dipilih',
        value: 'F1',
      },
      {
        label: '10000000',
        key: '10000000',
        value: 'F2',
      },
    ],
    key: 'PDSAVER',
  },
  PHCPR62: {
    code: 'PHCPR62',
    description: 'PRUprime Saver',
    type: 'advancedoption',
    value: [
      {
        label: 'Tidak dipilih',
        key: 'Tidak dipilih',
        value: 'F3',
      },
      {
        label: '10000000',
        key: '10000000',
        value: 'F4',
      },
    ],
    key: 'PDSAVER',
  },
  PHCPR71: {
    code: 'PHCPR71',
    description: 'PRUprime Saver',
    type: 'advancedoption',
    value: [
      {
        label: 'Tidak dipilih',
        key: 'Tidak dipilih',
        value: 'G1',
      },
      {
        label: '15000000',
        key: '15000000',
        value: 'G2',
      },
    ],
    key: 'PDSAVER',
  },
  PHCPR72: {
    code: 'PHCPR72',
    description: 'PRUprime Saver',
    type: 'advancedoption',
    value: [
      {
        label: 'Tidak dipilih',
        key: 'Tidak dipilih',
        value: 'G3',
      },
      {
        label: '15000000',
        key: '15000000',
        value: 'G4',
      },
    ],
    key: 'PDSAVER',
  },
  PHCPR81: {
    code: 'PHCPR81',
    description: 'PRUprime Saver',
    type: 'advancedoption',
    value: [
      {
        label: 'Tidak dipilih',
        key: 'Tidak dipilih',
        value: 'H1',
      },
      {
        label: '20000000',
        key: '20000000',
        value: 'H2',
      },
    ],
    key: 'PDSAVER',
  },
  PHCPR82: {
    code: 'PHCPR82',
    description: 'PRUprime Saver',
    type: 'advancedoption',
    value: [
      {
        label: 'Tidak dipilih',
        key: 'Tidak dipilih',
        value: 'H3',
      },
      {
        label: '20000000',
        key: '20000000',
        value: 'H4',
      },
    ],
    key: 'PDSAVER',
  },
  PHCPCR: {
    code: 'PHCPCR',
    description: 'Plan',
    type: 'nestedoption',
    value: [
      {
        label: 'Cermat 1 - Indonesia',
        key: '1',
        value: 'PHCPR9',
      },
      {
        label: 'Cermat 2 - Indonesia',
        key: '2',
        value: 'PHCPR10',
      },
      {
        label: 'Cermat 3 - Indonesia',
        key: '3',
        value: 'PHCPR110',
      },
    ],
    key: 'PDPLAN',
  },
  PHCPR9: {
    code: 'PHCPR9',
    description: 'Batas Harga Kamar',
    type: 'nestedoption',
    value: [
      {
        label: '300000',
        key: '300000',
        value: 'PHCPR91',
      },
    ],
    key: 'PDPLAN2',
  },
  PHCPR10: {
    code: 'PHCPR10',
    description: 'Batas Harga Kamar',
    type: 'nestedoption',
    value: [
      {
        label: '550000',
        key: '550000',
        value: 'PHCPR101',
      },
    ],
    key: 'PDPLAN2',
  },
  PHCPR110: {
    code: 'PHCPR110',
    description: 'Batas Harga Kamar',
    type: 'nestedoption',
    value: [
      {
        label: '650000',
        key: '650000',
        value: 'PHCPR111',
      },
    ],
    key: 'PDPLAN2',
  },
  PHCPR91: {
    code: 'PHCPR91',
    description: 'PRUprime Saver',
    type: 'advancedoption',
    value: [
      {
        label: 'Tidak dipilih',
        key: 'Tidak dipilih',
        value: 'A1',
      },
      {
        label: '1000000',
        key: '1000000',
        value: 'A2',
      },
    ],
    key: 'PDSAVER',
  },
  PHCPR101: {
    code: 'PHCPR101',
    description: 'PRUprime Saver',
    type: 'advancedoption',
    value: [
      {
        label: 'Tidak dipilih',
        key: 'Tidak dipilih',
        value: 'B1',
      },
      {
        label: '2000000',
        key: '2000000',
        value: 'B2',
      },
    ],
    key: 'PDSAVER',
  },
  PHCPR111: {
    code: 'PHCPR111',
    description: 'PRUprime Saver',
    type: 'advancedoption',
    value: [
      {
        label: 'Tidak dipilih',
        key: 'Tidak dipilih',
        value: 'C1',
      },
      {
        label: '3000000',
        key: '3000000',
        value: 'C2',
      },
    ],
    key: 'PDSAVER',
  },
  PWHP: {
    code: 'PWHP',
    description: 'Plan',
    type: 'nestedoption',
    value: [
      {
        label: 'Bronze A - Indonesia - 2 Bed',
        key: 'A',
        value: 'PWHP1',
      },
      {
        label: 'Bronze B - Indonesia - 1 Bed',
        key: 'B',
        value: 'PWHP2',
      },
      {
        label: 'Silver A - Asia (excl JPN, HK, SG) - 2 Bed',
        key: 'C',
        value: 'PWHP3',
      },
      {
        label: 'Silver B - Asia (excl JPN, HK, SG) - 1 Bed',
        key: 'D',
        value: 'PWHP4',
      },
      {
        label: 'Gold - Asia - 1 Bed',
        key: 'E',
        value: 'PWHP5',
      },
      {
        label: 'Platinum - Worldwide (excl USA) - 1 Bed',
        key: 'F',
        value: 'PWHP6',
      },
      {
        label: 'Diamond - Worldwide - 1 Bed',
        key: 'G',
        value: 'PWHP7',
      },
    ],
    key: 'PDPLAN',
  },
  PWHP1: {
    code: 'PWHP1',
    description: 'Batas Harga Kamar',
    type: 'nestedoption',
    value: [
      {
        label: '600000',
        key: '600000',
        value: 'PWHP11',
      },
    ],
    key: 'PDPLAN2',
  },
  PWHP2: {
    code: 'PWHP2',
    description: 'Batas Harga Kamar',
    type: 'nestedoption',
    value: [
      {
        label: '1200000',
        key: '1200000',
        value: 'PWHP21',
      },
    ],
    key: 'PDPLAN2',
  },
  PWHP3: {
    code: 'PWHP3',
    description: 'Batas Harga Kamar',
    type: 'nestedoption',
    value: [
      {
        label: '600000',
        key: '600000',
        value: 'PWHP31',
      },
    ],
    key: 'PDPLAN2',
  },
  PWHP4: {
    code: 'PWHP4',
    description: 'Batas Harga Kamar',
    type: 'nestedoption',
    value: [
      {
        label: '1200000',
        key: '1200000',
        value: 'PWHP41',
      },
    ],
    key: 'PDPLAN2',
  },
  PWHP5: {
    code: 'PWHP5',
    description: 'Batas Harga Kamar',
    type: 'nestedoption',
    value: [
      {
        label: '1800000',
        key: '1800000',
        value: 'PWHP51',
      },
    ],
    key: 'PDPLAN2',
  },
  PWHP6: {
    code: 'PWHP6',
    description: 'Batas Harga Kamar',
    type: 'nestedoption',
    value: [
      {
        label: '2000000',
        key: '2000000',
        value: 'PWHP61',
      },
    ],
    key: 'PDPLAN2',
  },
  PWHP7: {
    code: 'PWHP7',
    description: 'Batas Harga Kamar',
    type: 'nestedoption',
    value: [
      {
        label: '2500000',
        key: '2500000',
        value: 'PWHP71',
      },
    ],
    key: 'PDPLAN2',
  },
  PWHP11: {
    code: 'PWHP11',
    description: 'PRUwell Saver',
    type: 'advancedoption',
    value: [
      {
        label: 'Tidak dipilih',
        key: 'Tidak dipilih',
        value: 'A1',
      },
      {
        label: '4000000',
        key: '4000000',
        value: 'A2',
      },
    ],
    key: 'PDSAVER',
  },
  PWHP21: {
    code: 'PWHP21',
    description: 'PRUwell Saver',
    type: 'advancedoption',
    value: [
      {
        label: 'Tidak dipilih',
        key: 'Tidak dipilih',
        value: 'B1',
      },
      {
        label: ' 5000000',
        key: ' 5000000',
        value: 'B2',
      },
    ],
    key: 'PDSAVER',
  },
  PWHP31: {
    code: 'PWHP31',
    description: 'PRUwell Saver',
    type: 'advancedoption',
    value: [
      {
        label: 'Tidak dipilih',
        key: 'Tidak dipilih',
        value: 'C1',
      },
      {
        label: '4000000',
        key: '4000000',
        value: 'C2',
      },
    ],
    key: 'PDSAVER',
  },
  PWHP41: {
    code: 'PWHP41',
    description: 'PRUwell Saver',
    type: 'advancedoption',
    value: [
      {
        label: 'Tidak dipilih',
        key: 'Tidak dipilih',
        value: 'D1',
      },
      {
        label: '5000000',
        key: '5000000',
        value: 'D2',
      },
    ],
    key: 'PDSAVER',
  },
  PWHP51: {
    code: 'PWHP51',
    description: 'PRUwell Saver',
    type: 'advancedoption',
    value: [
      {
        label: 'Tidak dipilih',
        key: 'Tidak dipilih',
        value: 'E1',
      },
      {
        label: '10000000',
        key: '10000000',
        value: 'E2',
      },
    ],
    key: 'PDSAVER',
  },
  PWHP61: {
    code: 'PWHP61',
    description: 'PRUwell Saver',
    type: 'advancedoption',
    value: [
      {
        label: 'Tidak dipilih',
        key: 'Tidak dipilih',
        value: 'F1',
      },
      {
        label: '15000000',
        key: '15000000',
        value: 'F2',
      },
    ],
    key: 'PDSAVER',
  },
  PWHP71: {
    code: 'PWHP71',
    description: 'PRUwell Saver',
    type: 'advancedoption',
    value: [
      {
        label: 'Tidak dipilih',
        key: 'Tidak dipilih',
        value: 'G1',
      },
      {
        label: '20000000',
        key: '20000000',
        value: 'G2',
      },
    ],
    key: 'PDSAVER',
  },
  PWHSP: {
    code: 'PWHSP',
    description: 'Plan',
    type: 'nestedoption',
    value: [
      {
        label: 'Bronze A - Indonesia - 2 Bed',
        key: 'A',
        value: 'PWHSP1',
      },
      {
        label: 'Bronze B - Indonesia - 1 Bed',
        key: 'B',
        value: 'PWHSP2',
      },
      {
        label: 'Silver A - Asia (excl JPN, HK, SG) - 2 Bed',
        key: 'C',
        value: 'PWHSP3',
      },
      {
        label: 'Silver B - Asia (excl JPN, HK, SG) - 1 Bed',
        key: 'D',
        value: 'PWHSP4',
      },
      {
        label: 'Gold - Asia - 1 Bed',
        key: 'E',
        value: 'PWHSP5',
      },
      {
        label: 'Platinum - Worldwide (excl USA) - 1 Bed',
        key: 'F',
        value: 'PWHSP6',
      },
      {
        label: 'Diamond - Worldwide - 1 Bed',
        key: 'G',
        value: 'PWHSP7',
      },
    ],
    key: 'PDPLAN',
  },
  PWHSP1: {
    code: 'PWHSP1',
    description: 'Batas Harga Kamar',
    type: 'nestedoption',
    value: [
      {
        label: '600000',
        key: '600000',
        value: 'PWHSP11',
      },
    ],
    key: 'PDPLAN2',
  },
  PWHSP2: {
    code: 'PWHSP2',
    description: 'Batas Harga Kamar',
    type: 'nestedoption',
    value: [
      {
        label: '1200000',
        key: '1200000',
        value: 'PWHSP21',
      },
    ],
    key: 'PDPLAN2',
  },
  PWHSP3: {
    code: 'PWHSP3',
    description: 'Batas Harga Kamar',
    type: 'nestedoption',
    value: [
      {
        label: '600000',
        key: '600000',
        value: 'PWHSP31',
      },
    ],
    key: 'PDPLAN2',
  },
  PWHSP4: {
    code: 'PWHSP4',
    description: 'Batas Harga Kamar',
    type: 'nestedoption',
    value: [
      {
        label: '1200000',
        key: '1200000',
        value: 'PWHSP41',
      },
    ],
    key: 'PDPLAN2',
  },
  PWHSP5: {
    code: 'PWHSP5',
    description: 'Batas Harga Kamar',
    type: 'nestedoption',
    value: [
      {
        label: '1800000',
        key: '1800000',
        value: 'PWHSP51',
      },
    ],
    key: 'PDPLAN2',
  },
  PWHSP6: {
    code: 'PWHSP6',
    description: 'Batas Harga Kamar',
    type: 'nestedoption',
    value: [
      {
        label: '2000000',
        key: '2000000',
        value: 'PWHSP61',
      },
    ],
    key: 'PDPLAN2',
  },
  PWHSP7: {
    code: 'PWHSP7',
    description: 'Batas Harga Kamar',
    type: 'nestedoption',
    value: [
      {
        label: '2500000',
        key: '2500000',
        value: 'PWHSP71',
      },
    ],
    key: 'PDPLAN2',
  },
  PWHSP11: {
    code: 'PWHSP11',
    description: 'PRUwell Saver',
    type: 'advancedoption',
    value: [
      {
        label: 'Tidak dipilih',
        key: 'Tidak dipilih',
        value: 'A1',
      },
      {
        label: '4000000',
        key: '4000000',
        value: 'A2',
      },
    ],
    key: 'PDSAVER',
  },
  PWHSP21: {
    code: 'PWHSP21',
    description: 'PRUwell Saver',
    type: 'advancedoption',
    value: [
      {
        label: 'Tidak dipilih',
        key: 'Tidak dipilih',
        value: 'B1',
      },
      {
        label: '5000000',
        key: '5000000',
        value: 'B2',
      },
    ],
    key: 'PDSAVER',
  },
  PWHSP31: {
    code: 'PWHSP31',
    description: 'PRUwell Saver',
    type: 'advancedoption',
    value: [
      {
        label: 'Tidak dipilih',
        key: 'Tidak dipilih',
        value: 'C1',
      },
      {
        label: '4000000',
        key: '4000000',
        value: 'C2',
      },
    ],
    key: 'PDSAVER',
  },
  PWHSP41: {
    code: 'PWHSP41',
    description: 'PRUwell Saver',
    type: 'advancedoption',
    value: [
      {
        label: 'Tidak dipilih',
        key: 'Tidak dipilih',
        value: 'D1',
      },
      {
        label: '5000000',
        key: '5000000',
        value: 'D2',
      },
    ],
    key: 'PDSAVER',
  },
  PWHSP51: {
    code: 'PWHSP51',
    description: 'PRUwell Saver',
    type: 'advancedoption',
    value: [
      {
        label: 'Tidak dipilih',
        key: 'Tidak dipilih',
        value: 'E1',
      },
      {
        label: '10000000',
        key: '10000000',
        value: 'E2',
      },
    ],
    key: 'PDSAVER',
  },
  PWHSP61: {
    code: 'PWHSP61',
    description: 'PRUwell Saver',
    type: 'advancedoption',
    value: [
      {
        label: 'Tidak dipilih',
        key: 'Tidak dipilih',
        value: 'F1',
      },
      {
        label: '15000000',
        key: '15000000',
        value: 'F2',
      },
    ],
    key: 'PDSAVER',
  },
  PWHSP71: {
    code: 'PWHSP71',
    description: 'PRUwell Saver',
    type: 'advancedoption',
    value: [
      {
        label: 'Tidak dipilih',
        key: 'Tidak dipilih',
        value: 'G1',
      },
      {
        label: '20000000',
        key: '20000000',
        value: 'G2',
      },
    ],
    key: 'PDSAVER',
  },
  PHSP110: {
    code: "PHSP110",
    description: "Batas Harga Kamar",
    type: "nestedoption",
    value: [
      {
        label: "650000",
        key: "650000",
        value: "PHSP111"
      }
    ],
    key: "PDPLAN2"
  },
  PHSP111: {
    code: "PHSP111",
    description: "PRUprime Saver",
    type: "advancedoption",
    value: [
      {
        label: "Tidak dipilih",
        key: "Tidak dipilih",
        value: "C1",
      },
      {
        label: "3000000",
        key: "3000000",
        value: "C2",
      }
    ],
    key: "PDSAVER"
  }
};

export { LIST_INPUT, INPUT, MASA_PERTANGGUNGAN, MASA_PERTANGGUNGAN_RIDER };
