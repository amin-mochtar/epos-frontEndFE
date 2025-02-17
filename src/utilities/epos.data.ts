import i18n from 'i18next';

import {
  heartrate,
  study,
  time,
  shield,
  bpjs,
  hospital,
  other,
  personchair,
  gift,
  pregnant,
  disabled,
  accidentProtection
} from '../assets';
import { TZipCode } from '../screen/espaj/spaj-premium-payer-candidate/spaj-premium-payer-candidate.type';
import { TOptionalCardData } from '../components';
import { WR_SHARIA_CONVENT } from './wording/common.wording';
import { getAge } from './common-function';

const POLICY_OPTION = [
  {
    key: 'study',
    icon: study,
    label: 'Proteksi Dana Pendidikan',
  },
  {
    key: 'heartrate',
    icon: heartrate,
    label: 'Proteksi Kesehatan',
  },
  {
    key: 'time',
    icon: time,
    label: 'Dana Pensiun',
  },
  {
    key: 'shield',
    icon: hospital,
    label: 'Proteksi Jiwa',
  },
  {
    key: 'hospital',
    icon: accidentProtection,
    label: 'Perlindungan Kecelakaan',
  },
  {
    key: 'personchair',
    icon: personchair,
    label: 'Proteksi terhadap Kritis & Cacat',
  },
  {
    key: 'other',
    icon: other,
    label: 'Lainnya',
  },
  {
    key: 'bpjs',
    icon: bpjs,
    label: 'BPJS Kesehatan',
  },
  {
    key: 'noPolis',
    icon: disabled,
    label: 'Nasabah Belum Memiliki Polis',
  },
];

const QPOLICY_HOLDER_TARGET = [
  {
    key: 'I',
    title: 'Individu',
    detail: 'Perlindungan finansial dan risiko pribadi terhadap kejadian tak terduga.',
    icon: 'account',
  },
  {
    key: 'B',
    title: 'Badan Usaha',
    detail: 'Perlindungan bisnis terhadap risiko keuangan, kerugian.',
    icon: 'office-building',
  },
];

const QINSURED_TARGET = [
  {
    key: 'self',
    title: 'Calon Pemegang Polis',
    detail: 'Calon Tertanggung / Calon Peserta yang diasuransikan adalah Calon Pemegang Polis',
    icon: 'account',
  },
  {
    key: 'other',
    title: 'Orang Lain',
    detail: 'Calon Tertanggung / Calon Peserta yang diasuransikan adalah Orang Lain',
    icon: 'account-supervisor',
  },
];

const INSURANCE_GOALS_OPTION = [
  {
    key: 'kesehatan',
    icon: heartrate,
    label: 'Proteksi Kesehatan',
  },
  {
    key: 'kecelakaan',
    icon: accidentProtection,
    label: 'Perlindungan Kecelakaan',
  },
  {
    key: 'danaPensiun',
    icon: time,
    label: 'Perencanaan Keuangan Pensiun',
  },
  {
    key: 'investasi',
    icon: shield,
    label: 'Proteksi Jiwa dan Investasi sesuai dengan alokasi Premi',
  },
  {
    key: 'jiwa',
    icon: hospital,
    label: 'Proteksi Jiwa',
  },
  {
    key: 'penyakitKritis',
    icon: personchair,
    label: 'Proteksi terhadap Kritis & Cacat',
  },
  {
    key: 'pendidikan',
    icon: study,
    label: 'Proteksi Dana Pendidikan',
  },
  {
    key: 'danaWarisan',
    icon: gift,
    label: 'Proteksi Dana Warisan',
  },
  // {
  //   key: 'pregnant',
  //   icon: pregnant,
  //   label: 'Proteksi Sejak dalam Kandungan',
  // },
];

const QDOMICILE_ACEH = [
  {
    key: true,
    title: 'Ya, berdomisili di Aceh',
    detail: 'Nasabah yang berdomisili di Aceh hanya dapat memilih produk syariah',
  },
  {
    key: false,
    title: 'Tidak, berdomisili bukan di Aceh ',
    detail: 'Nasabah yang berdomisili bukan di Aceh dapat memilih produk konvensional atau syariah',
  },
];

const QDOMICILE_SUMATERAUTARA = [
  {
    key: true,
    title: 'Ya, berdomisili di Sumatera Utara',
  },
  {
    key: false,
    title: 'Tidak, berdomisili bukan di Sumatera Utara  ',
  },
];

const QPOLICY_TYPE = [
  {
    key: 'conventional',
    icon: 'lightbulb',
    title: 'Konvensional',
    detail: 'Perlindungan finansial yang didasarkan pada prinsip-prinsip umum asuransi.',
  },
  {
    key: 'sharia',
    icon: 'brightness-4',
    title: 'Syariah',
    detail: 'Perlindungan finansial yang sesuai dengan prinsip-prinsip syariah.',
  },
];

const QINVESTMENT_OWNED = [
  {
    key: '1',
    title: 'Tabungan dan Deposito',
  },
  {
    key: '2',
    title: 'Reksadana',
  },
  {
    key: '3',
    title: 'Saham',
  },
  {
    key: '4',
    title: 'Tidak memiliki investasi',
  },
  {
    key: '5',
    title: 'Lainnya',
  },
];

const QKNOWLEDGE_INVESTMENT = [
  {
    key: '0',
    title: i18n.t('Epos:dont_have_knowledge'),
    detail: i18n.t('Epos:dont_have_knowledge_detail'),
  },
  {
    key: '1',
    title: i18n.t('Epos:enough'),
    detail: i18n.t('Epos:enough_detail'),
  },
  {
    key: '2',
    title: i18n.t('Epos:very_good'),
    detail: i18n.t('Epos:very_good_detail'),
  },
];

const QPURPOSE_INVESTMENT = [
  {
    key: '0',
    title: 'Imbal Balik Stabil',
    detail:
      'Lebih fokus untuk menghasilkan pengembalian investasi yang stabil, dibandingkan pada pertumbuhan investasi (potensi tingkat pengembalian yang lebih rendah dan tingkat volatilitas lebih rendah).',
  },
  {
    key: '1',
    title: 'Imbal Balik Sedang',
    detail:
      'Bersedia menerima dampak sedang dari volatilitas pasar dan mengharapkan sejumlah pertumbuhan investasi (potensi tingkat pengembalian sedang dan tingkat volatilitas sedang)',
  },
  {
    key: '2',
    title: 'Imbal Balik Tinggi',
    detail:
      'Fokus pada pertumbuhan investasi, kurang tertarik untuk menghasilkan pengembalian investasi yang stabil dan bersedia menerima dampak volatilitas pasar (potensi tingkat pengembalian dan tingkat volatilitas yang tinggi).',
  },
];

const QRISK = [
  {
    key: '0',
    title: 'Penurunan 5%',
    detail: 'Bersedia menerima penurunan di bawah 5% dari investasi awal',
  },
  {
    key: '1',
    title: 'Penurunan 5% - 15%',
    detail: 'Bersedia menerima penurunan di bawah 5% - 15% dari investasi awal',
  },
  {
    key: '2',
    title: 'Penurunan di atas 15%',
    detail: 'Bersedia menerima penurunan di atas 5% - 15% dari investasi awal',
  },
];
const QEXPERIENCE_INVESTMENT = [
  {
    key: '0',
    title: i18n.t('Epos:experience_investment_1'),
  },
  {
    key: '1',
    title: i18n.t('Epos:experience_investment_2'),
  },
  {
    key: '2',
    title: i18n.t('Epos:experience_investment_3'),
  },
];
const QPERIOD_INVESTMENT = [
  {
    key: '0',
    title: 'Kurang dari atau sama dengan 5 tahun',
  },
  {
    key: '1',
    title: 'Antara 5 tahun sampai dengan 10 tahun',
  },
  {
    key: '2',
    title: 'Lebih dari 10 tahun',
  },
];

const QWAITING_PERIOD = [
  {
    key: 'A',
    title: 'A',
    detail:
      'Memilih klaim tidak dikenakan Masa Tunggu* dengan syarat bersedia melampirkan hasil pemeriksaan kesehatan pribadi, yaitu Laporan Pemeriksaan Kesehatan (LPK) dan HbA1c dalam kurun waktu 6 (enam) bulan terakhir sejak tanggal pengajuan SPAJ, dan jika pengajuan SPAJ disetujui Penanggung maka Anda setuju Penanggung membayarkan 25% dari total klaim yang disetujui untuk pengajuan klaim yang penyebab klaimnya terjadi dalam Masa Tunggu*.',
  },
  {
    key: 'B',
    title: 'B',
    detail:
      'Memilih klaim tidak dikenakan Masa Tunggu* dengan syarat bersedia melakukan pemeriksaan kesehatan, yaitu Laporan Pemeriksaan Kesehatan (LPK) & HbA1c atas biaya Calon Pemegang Polis di laboratorium/RS/Klinik manapun (kecuali nasabah domisili Sumatra Utara yang wajib melakukan pemeriksaan ksehatan di rekanan Medical Check Up Pengelola), dan jika pengajuan SPAJ syariah disetujui Pengelola maka Anda setuju Pengelola membayarkan 25% dari total klaim yang disetujui untuk pengajuan klaim yang penyebab klaimnya terjadi dalam Masa Tunggu*.',
  },
  {
    key: 'C',
    title: 'C',
    detail:
      'Memilih klaim dikenakan Masa Tunggu* dan tidak bersedia melakukan pemeriksaan kesehatan dan jika pengajuan SPAJ disetujui Penanggung maka Anda mengerti, memahami serta menyetujui konsekuensi Masa Tunggu jika terjadi kalim, dimana Penanggung tidak membayarkan klaim Rawat Inap yang terjadi dalam 30 (tiga puluh) hari dan atau pengajuan klaim Kondisi Kritis yang gejala dan diagnosanya terjadi dalam 90 (sembilan puluh) hari sejak tanggal Polis Terbit.',
  },
];

const QPREMI_PAYMENT_VALIDATION = (premiContribution: string) => {
  return [
    {
      key: 'Y',
      icon: 'account',
      title: 'Ya, Sama',
      detail: `Calon Pemegang Polis merupakan orang yang sama dengan Calon Pembayar ${premiContribution}.`,
    },
    {
      key: 'N',
      icon: 'account-supervisor',
      title: 'Tidak, Berbeda',
      detail: `Calon Pemegang Polis merupakan orang yang berbeda dengan Calon Pembayar ${premiContribution}.`,
    },
  ];
};

const QWHO_PREMI_PAYMENY = (premiContribution: string, mainParticipant: string) => {
  return {
    MainInsured: {
      key: 'TertanggungUtama',
      icon: 'account',
      title: mainParticipant,
      detail: `${mainParticipant} merupakan Calon Pembayar ${premiContribution}.`,
    },
    PrimaryInsured: {
      key: 'TertanggungUtama',
      icon: 'account',
      title: mainParticipant,
      detail: `${mainParticipant} merupakan Calon Pembayar ${premiContribution}.`,
    },
    Other: {
      key: 'Other',
      icon: 'account-supervisor',
      title: 'Lainnya',
      detail: `Calon Pembayar ${premiContribution} adalah orang lain.`,
    },
  };
};

const QCONFIRMATION_RECOMMENDATION_PRODUCT = [
  {
    key: 'Follow',
    title: 'SAYA Mengikuti Rekomendasi',
    detail:
      'SAYA mengikuti rekomendasi secara penuh sesuai yang dinyatakan pada bagian ‘Rekomendasi Produk & Asuransi Tambahan’',
  },
  {
    key: 'NotFollow',
    title: 'SAYA Tidak Mengikuti Rekomendasi',
    detail:
      'SAYA tidak mengikuti rekomendasi yang dinyatakan pada bagian ‘Rekomendasi Produk dan Asuransi Tambahan‘ serta membeli produk asuransi dan pilihan dana investasi sesuai dengan keinginan SAYA sendiri',
  },
];

const GenderList = [
  { label: 'Pria', key: 'M' },
  { label: 'Wanita', key: 'F' },
];

const SmokerList = [
  { label: 'Perokok', key: 'S' },
  { label: 'Bukan Perokok', key: 'NS' },
];

const IndonesianLanguageCapability = [
  { label: 'Ya', key: 'ILC' },
  { label: 'Tidak', key: 'NOILC' },
];

const DisabilityCategoryStatus = [
  { label: 'Buta', key: 'BLIND' },
  { label: 'Bisu', key: 'MUTE' },
  { label: 'Tuli', key: 'DEAF' },
  { label: 'Tidak Memiliki', key: 'HEALTHY' },
];

const ValidationDisabilityCategoryStatus = [
  { label: 'Ya', key: 'YES' },
  { label: 'Tidak', key: 'NO' },
];

const maritalStatusList = [
  { label: 'Menikah', key: 'M' },
  { label: 'Belum Menikah', key: 'S' },
  { label: 'Duda/Janda', key: 'W' },
];

const minMaxSalaryData = {
  '2500000': {
    min: 0,
    max: 2500000,
  },
  '3750000': {
    min: 2500000,
    max: 5000000,
  },
  '6250000': {
    min: 5000000,
    max: 7500000,
  },
  '8750000': {
    min: 7500000,
    max: 10000000,
  },
  '17500000': {
    min: 10000000,
    max: 25000000,
  },
  '37750000': {
    min: 25000000,
    max: 50000000,
  },
  '75000000': {
    min: 50000000,
    max: 100000000,
  },
  '175000000': {
    min: 100000000,
    max: 250000000,
  },
  '375000000': {
    min: 250000000,
    max: 500000000,
  },
  '750000000': {
    min: 500000000,
    max: 1000000000,
  },
  '1250000000': {
    min: 1000000000,
    max: 1500000000,
  },
  '1750000000': {
    min: 1500000000,
    max: 2000000000,
  },
  '2500000000': {
    min: 2000000000,
    max: 3000000000,
  },
  '3500000000': {
    min: 3000000000,
    max: 4000000000,
  },
  '4500000000': {
    min: 4000000000,
    max: 5000000000,
  },
  '5000000000': {
    min: 5000000000,
    max: 5000000000,
  },
  '0': {
    min: 0,
    max: 0,
  },
};

const netWorthList = [
  { label: '</= Rp.100 Juta', key: '2500000' },
  { label: 'Rp. 101 Juta s/d </= Rp. 500 Juta', key: '305000000' },
  { label: 'Rp. 501 Juta s/d < Rp. 1 Miliar', key: '850000000' },
  { label: 'Rp. 1 Miliar s/d < Rp. 3 Miliar', key: '2500000000' },
  { label: 'Rp. 3 Miliar s/d < Rp. 5 Miliar', key: '4500000000' },
  { label: '>/= Rp. 5 Miliar', key: '5000000000' },
];

const tExpenses = [
  { label: '20%', key: '20' },
  { label: '30%', key: '30' },
  { label: '50%', key: '50' },
  { label: '70%', key: '70' },
];

const currencyList = [
  {
    label: 'IDR',
    key: 'IDR',
  },
  {
    label: 'USD',
    key: 'USD',
  }
];

// TEMPORARY
const OCCUPATION = [
  {
    nameEng: 'Beekeeper',
    code: 'BEEK',
    gender: 'All',
    nameInd: 'Peternak lebah',
    minAge: '0',
    descriptionInd: 'Seseorang yang merawat lebah-lebah madu',
    descriptionEng: 'A person who keeps honey bees',
    clazz: '3',
  },
  {
    nameEng: 'Sheep shearer',
    code: 'SHSH',
    gender: 'All',
    nameInd: 'Pencukur bulu domba',
    minAge: '0',
    descriptionInd: 'seorang pekerja yang menggunakan pisau atau mesin cukur untuk mencabut wol dari domba',
    descriptionEng: 'a worker who uses-blade or machine shears to remove wool from domestic sheep',
    clazz: '3',
  },
  {
    nameEng: 'Shepherd',
    code: 'SHEP',
    gender: 'All',
    nameInd: 'Gembala',
    minAge: '0',
    descriptionInd: 'seseorang yang menggembalakan, memberi makan, atau melindungi kawanan domba',
    descriptionEng: 'a person who herds, feeds, or guards herds of sheep.',
    clazz: '3',
  },
  {
    nameEng: 'Inseminator',
    code: 'INSE',
    gender: 'All',
    nameInd: 'Pelaku inseminasi ternak',
    minAge: '0',
    descriptionInd:
      'seorang teknisi yang sudah menyiapkan air mani untuk dimasukkan ke alat kelamin binatang pada masa pembiakan',
    descriptionEng: 'a technician who introduces prepared semen into the genital tract of breeding animals',
    clazz: '2',
  },
  {
    nameEng: 'Milker Dairy Farmer',
    code: 'DAIR',
    gender: 'All',
    nameInd: 'Pemerah susu',
    minAge: '0',
    descriptionInd:
      'Seseorang yang terlibat dalam bidang pertanian atau peternakan untuk memproduksi susu jangka panjang, biasanya susu dapat berasal dari sapi perah atau dari kambing,domba,maupun unta; untuk kemudian dikirim atau diolah lebih lanjut di pabrik susu hingga akhirnya dijual secara eceran.',
    descriptionEng:
      'Dairy farmer is person engaged in agricultural, or an animal husbandry, enterprise, for long-term production of milk, usually from dairy cows but also from goats, sheep and camels, which may be either processed on-site or transported to a dairy factory for processing and eventual retail sale.',
    clazz: '2',
  },
  {
    nameEng: 'Poultry worker / Hatchery worker / Poultry worker (food and drink production)',
    code: 'POUL',
    gender: 'All',
    nameInd: 'Pekerja unggas / Pekerja penetasan / Pekerja unggas (produksi makanan dan minuman)',
    minAge: '0',
    descriptionInd: 'pekerja yang memastikan keselamatan dan keefisiensian operasi dari peternakan unggas',
    descriptionEng: 'a worker who ensures the safety and efficiency of poultry farm operations',
    clazz: '2',
  },
  {
    nameEng: 'Stock worker',
    code: 'STOC',
    gender: 'All',
    nameInd: 'Buruh stok',
    minAge: '0',
    descriptionInd: 'seseorang yang memindahkan produk dari gudang ke toko',
    descriptionEng: 'someone who moves products from the warehouse to store shelves',
    clazz: '3',
  },
  {
    nameEng: 'Crofter',
    code: 'CROF',
    gender: 'All',
    nameInd: 'Tukang kebun di area tertutup',
    minAge: '0',
    descriptionInd: 'seseorang yang memiliki lahan kecil',
    descriptionEng: 'a person who farms a croft.',
    clazz: '3',
  },
];

const paymentFreqList = [
  { label: 'Bulanan', key: '12' },
  { label: '3 Bulanan', key: '04' },
  { label: '6 Bulanan', key: '02' },
  { label: 'Tahunan', key: '01' },
  { label: 'Sekali Bayar', key: '00' },
];

const typeCust = [
  { label: 'Nasabah Baru', key: 'N' },
  { label: 'Nasabah Terdaftar', key: 'O' },
];

const statement = [
  {
    key: 'Y',
    label: i18n.t('Epos:yes'),
  },
  {
    key: 'N',
    label: i18n.t('Epos:no'),
  },
];

const statementApproval = [
  {
    key: 'Y',
    label: i18n.t('Epos:approve'),
  },
  {
    key: 'N',
    label: i18n.t('Epos:not_agree'),
  },
];

const changeBenefitList = [
  { label: 'PruPrime Healthcare Plus Pro', key: 'plus pro' },
  { label: 'PRULink Investor', key: 'investor1' },
  { label: 'PRULink Investor', key: 'investor2' },
];

const OCCUPATION_SIMPLE = [
  {
    key: 'salary',
    label: i18n.t('Epos:salary'),
  },
  {
    key: 'parent',
    label: i18n.t('Epos:parents'),
  },
  {
    key: 'investment',
    label: i18n.t('Epos:invesment'),
  },
  {
    key: 'commission',
    label: i18n.t('Epos:commission'),
  },
  {
    key: 'corporateProfits',
    label: i18n.t('Epos:company_profit'),
  },
  {
    key: 'bonus',
    label: 'Bonus',
  },
  {
    key: 'personalBusiness',
    label: i18n.t('Epos:personal_business'),
  },
  {
    key: 'salaryHusbandWife',
    label: i18n.t('Epos:husbandwife_income'),
  },
  {
    key: 'other',
    label: i18n.t('Epos:other'),
  },
  {
    key: 'noIncome',
    label: 'Tidak Berpenghasilan',
  },
];

const idcard = [
  {
    key: 'idcard',
    label: 'KTP',
  },
  {
    key: 'KA',
    label: 'KIA/AKTA',
  },
  {
    key: 'other',
    label: i18n.t('Epos:other'),
  },
];

const questions = [
  {
    key: 'Y',
    title: i18n.t('Epos:yes'),
  },
  {
    key: 'N',
    title: i18n.t('Epos:no'),
  },
];

const sourceIncomePerYear = [
  { label: 'Bonus', key: 'B' },
  { label: i18n.t('Epos:invesment'), key: 'I' },
  { label: i18n.t('Epos:commission'), key: 'C' },
  { label: 'Hadiah/Warisan', key: 'P' },
  { label: i18n.t('Epos:asset_sales'), key: 'L' },
  { label: i18n.t('Epos:other'), key: 'O' },
];

const relationshipPH = [
  { label: 'Orang Tua Kandung(Ayah/Ibu) Calon Tertanggung/Peserta', key: 'OT' },
  { label: 'kakek/Nenek Kandung Tertanggung/Peserta', key: 'KN' },
  { label: 'Paman/Bibi Kandung Tertanggung/Peserta', key: 'PB' },
  { label: 'Mertua Tertanggung/Peserta', key: 'M' },
  { label: 'Pemegang Polis', key: '-' },
  { label: 'Lainnya', key: 'O' },
];

const listStatusResidence = [
  {
    label: "Milik Sendiri",
    key: "S"
  },
  {
    label: "Milik Keluarga",
    key: "F"
  },
  {
    label: "Rumah Dinas",
    key: "C"
  },
  {
    label: "Sewa",
    key: "R"
  },
  {
    label: "Kost",
    key: "K"
  },
  {
    label: "Lainnya",
    key: "O"
  }
]

const generateRelationPHwithTU = (
  type: 'conventional' | 'sharia',
  gender: 'M' | 'F',
  maritalStatus: 'S' | 'M' | 'W',
  phBirtDate: string,
  tuBirthDate: string,
  lifeAssured: string,
) => {
  const phAge = getAge(phBirtDate);
  const tuAge = getAge(tuBirthDate);
  const isTUOlder = tuAge > phAge;
  const isTuUnderage = tuAge < 18;
  const maritalItems = {
    label: `${gender === 'M' ? 'Suami' : 'Istri'} ${lifeAssured}`,
    key: gender === 'M' ? 'HU' : ' WI',
  };
  const ageItems = [
    {
      label: `Orang Tua Kandung(Ayah/Ibu) ${lifeAssured}`,
      key: 'FA',
    },
    {
      label: `Anak ${lifeAssured}`,
      key: 'SO',
    },
  ];
  const list = [
    {
      label: `Adik/Kakak Kandung ${lifeAssured}`,
      key: 'BS',
    },
    {
      label: `Cucu Kandung ${lifeAssured}`,
      key: 'GDC',
    },
    {
      label: `Kakek/Nenek ${lifeAssured}`,
      key: 'GP',
    },
    {
      label: `Paman/Bibi Kandung ${lifeAssured}`,
      key: 'UA',
    },
    {
      label: `Mertua ${lifeAssured}`,
      key: 'MM',
    },
    {
      label: `Lainnya`,
      key: 'O',
    },
  ];
  if (isTUOlder) {
    list.unshift(ageItems[1]);
  } else {
    list.unshift(ageItems[0]);
  }
  if (maritalStatus === 'M' && !isTuUnderage) {
    list.unshift(maritalItems);
  }
  return list;
};

const countryList = [
  { label: 'Indonesia', key: 'I' },
  { label: 'Malaysia', key: 'M' },
  { label: 'Singapore', key: 'S' },
];

const religionList = [
  { label: 'Islam', key: 'I' },
  { label: 'Kristen', key: 'KR' },
  { label: 'Katolik', key: 'KT' },
  { label: 'Hindu', key: 'H' },
  { label: 'Budha', key: 'B' },
  { label: i18n.t('Epos:other'), key: 'O' },
];

const educationList = [
  { label: 'Tidak/Belum Sekolah', key: 'H' },
  { label: 'Lulusan Sekolah Dasar', key: 'A' },
  { label: 'Lulusan Sekolah Menengah Pertama', key: 'B' },
  { label: 'Lulusan Sekolah Menengah Umum', key: 'C' },
  { label: 'Lulusan Akademi/Kejuruan', key: 'D' },
  { label: 'Lulusan Universitas', key: 'E' },
];

const statusList = [
  { label: 'Aktif', key: 'A' },
  { label: 'Non Aktif', key: 'NA' },
];

const massAppliesList = [
  { label: 'Seumur Hidup', key: 'SH' },
  { label: 'Tidak Seumur Hidup', key: 'TSH' },
];

const mailingAddressList = [
  { label: i18n.t('Epos:home'), key: 'H' },
  { label: i18n.t('Epos:office'), key: 'O' },
  { label: i18n.t('Epos:other'), key: 'OT' },
];

const asideFromNPWPList = [
  { label: i18n.t('Epos:doesnt_have_npwp'), key: 'doesnt have npwp' },
  { label: i18n.t('Epos:process_created'), key: 'process created' },
  {
    label: i18n.t('Epos:not_included_in_criteria_required'),
    key: 'not included in the criteria required',
  },
  { label: i18n.t('Epos:npwpclosed'), key: 'closed' },
];

const activitiesList = [
  {
    title: i18n.t('Epos:climbing_hiking'),
    key: i18n.t('Epos:climbing_hiking'),
  },
  {
    title: i18n.t('Epos:scuba_diving'),
    key: i18n.t('Epos:scuba_diving'),
  },
  {
    title: i18n.t('Epos:racing'),
    key: i18n.t('Epos:racing'),
  },
  {
    title: i18n.t('Epos:Parachuting'),
    key: i18n.t('Epos:Parachuting'),
  },
  {
    title: i18n.t('Epos:surfing'),
    key: i18n.t('Epos:surfing'),
  },
  {
    title: i18n.t('Epos:other_high_risk_sports'),
    key: i18n.t('Epos:other_high_risk_sports'),
  },
  {
    title: i18n.t('Epos:doing_hobbies'),
    key: i18n.t('Epos:doing_hobbies'),
  },
];

const sportyInsurend = [
  {
    title: 'Selam dengan dilengkapi peralatan selam',
    key: 'Selam dengan dilengkapi peralatan selam',
  },
  {
    title: 'Selam dengan peralatan bernapas',
    key: 'Selam dengan peralatan bernapas',
  },
  {
    title: 'Ekspedisi Khusus',
    key: 'Ekspedisi Khusus',
  },
  {
    title: 'Selam Gua / Pothole',
    key: 'Selam Gua / Pothole',
  },
  {
    title: 'Selam harta karun',
    key: 'Selam harta karun',
  },
  {
    title: 'Percobaan pencatatan rekor di kedalaman',
    key: 'Percobaan pencatatan rekor di kedalaman',
  },
  {
    title: 'Ekplorasi internal bangkai kapal',
    key: 'Ekplorasi internal bangkai kapal',
  },
  {
    title: 'Tidak ada yang sesuai',
    key: 'Tidak ada yang sesuai',
  },
];
const sportyPlace = [
  {
    title: 'Danau',
    key: 'Danau',
  },
  {
    title: 'Sungai',
    key: 'Sungai',
  },
  {
    title: 'Lubang/Tambang',
    key: 'Lubang/Tambang',
  },
  {
    title: 'Perairan Pantai',
    key: 'Perairan Pantai',
  },
];

const durationtotalAlcoholList = [
  {
    title: i18n.t('Epos:last_month'),
    key: '01',
  },
  {
    title: i18n.t('Epos:less_than_three'),
    key: '02',
  },
  {
    title: i18n.t('Epos:three_to_twelve_month'),
    key: '03',
  },
  {
    title: i18n.t('Epos:more_than_twelve'),
    key: '04',
  },
  {
    title: i18n.t('Epos:i_dont_consume'),
    key: '05',
  },
  {
    title: i18n.t('Epos:always_drink_alcoholic'),
    key: '06',
  },
];

const averageTotalAlcoholList = [
  {
    title: '1',
    key: '1',
  },
  {
    title: '2',
    key: '2',
  },
  {
    title: '3',
    key: '3',
  },
  {
    title: '4',
    key: '4',
  },
  {
    title: '5',
    key: '5',
  },
  {
    title: '6',
    key: '6',
  },
  {
    title: '7',
    key: '7',
  },
];

const totalAlcoholconsumedList = [
  {
    title: '1-2',
    key: '1-2',
  },
  {
    title: '3-4',
    key: '3-4',
  },
  {
    title: '5-6',
    key: '5-6',
  },
  {
    title: '7-10',
    key: '7-10',
  },
  {
    title: '<10',
    key: '<10',
  },
];

const diseaseTypeList = [
  { title: i18n.t('Epos:cancer'), key: i18n.t('Epos:cancer') },
  { title: i18n.t('Epos:carcinoma'), key: i18n.t('Epos:carcinoma') },
  { title: i18n.t('Epos:diabetes_mellitus'), key: i18n.t('Epos:diabetes_mellitus') },
  { title: 'HIV/AIDS', key: 'HIV/AIDS' },
  { title: i18n.t('Epos:kidney_failure'), key: i18n.t('Epos:kidney_failure') },
];

const confirmProspectivePHList = [
  {
    label: i18n.t('Epos:prospective_insured'),
    key: 'self',
  },
  {
    label: i18n.t('Epos:not_prospective_insured'),
    key: 'other',
  },
];

const premiumPaymentCandidateList = (insurancePayor: string) => {
  return [
    {
      label: i18n.t('Epos:prospective_policyholder'),
      key: 'Y',
    },
    {
      label: insurancePayor,
      key: 'TertanggungUtama',
    },
    {
      label: i18n.t('Epos:other'),
      key: 'N',
    },
  ];
};

const diseaseNameList = [
  { key: i18n.t('Epos:cancer') },
  { key: i18n.t('Epos:heart_disease') },
  { key: 'Stroke' },
  { key: 'Diabetes' },
  { key: i18n.t('Epos:kidney_disease') },
  { key: i18n.t('Epos:motor_neuron_disease') },
  { key: i18n.t('Epos:parkinson_disease') },
];

const diseaseList = [
  { label: i18n.t('Epos:cancer'), key: i18n.t('Epos:cancer') },
  { label: i18n.t('Epos:heart_disease'), key: i18n.t('Epos:heart_disease') },
  { label: 'Stroke', key: 'Stroke' },
  { label: 'Diabetes', key: 'Diabetes' },
  { label: i18n.t('Epos:kidney_disease'), key: i18n.t('Epos:kidney_disease') },
  { label: i18n.t('Epos:motor_neuron_disease'), key: i18n.t('Epos:motor_neuron_disease') },
  { label: i18n.t('Epos:parkinson_disease'), key: i18n.t('Epos:parkinson_disease') },
];

const relationshipPHList = [
  { title: i18n.t('Epos:mother'), key: 'M' },
  { title: i18n.t('Epos:father'), key: 'F' },
  { title: i18n.t('Epos:brother'), key: 'B' },
  { title: i18n.t('Epos:sister'), key: 'S' },
];

const relationshipPayerList = [
  { label: i18n.t('Epos:husband'), key: 'H' },
  { label: i18n.t('Epos:wife'), key: 'W' },
  { label: i18n.t('Epos:son_daughter'), key: 'SD' },
  { label: i18n.t('Epos:mother'), key: 'M' },
  { label: i18n.t('Epos:father'), key: 'F' },
  { label: 'Badan Usaha', key: 'B' },
  { label: i18n.t('Epos:other'), key: 'o' },
];

const SPAJCurrencyList = [
  {
    title: 'IDR',
    key: 'IDR',
  },
  {
    title: 'USD',
    key: 'USD',
  },
];

const topupPremiPayerList = (isSharia?: boolean) => {
  return [
    {
      title: i18n.t('Epos:prospective_policyholder'),
      key: 'PP',
    },
    {
      title: isSharia ? i18n.t('Epos:primary_Insured_candidate') : i18n.t('Epos:main_insured_candidate'),
      key: 'CP',
    },
    {
      title: `Calon Pembayar ${isSharia ? i18n.t('Epos:contribution') : i18n.t('Epos:premi')}`,
      key: 'PK',
    },
    {
      title: i18n.t('Epos:other'),
      key: 'O',
    },
  ];
};

const topupGoalList = [
  {
    label: i18n.t('Epos:savings'),
    key: 'S',
  },
  {
    label: i18n.t('Epos:education'),
    key: 'E',
  },
  {
    label: i18n.t('Epos:invesment'),
    key: 'I',
  },
  {
    label: i18n.t('Epos:pension_fund'),
    key: 'PF',
  },
  {
    label: i18n.t('Epos:other'),
    key: 'O',
  },
];

const locationList = [
  { title: i18n.t('Epos:indonesian'), key: 'ID' },
  { title: i18n.t('Epos:abroad'), key: 'AB' },
];

const typeDocsList = [
  {
    label: i18n.t('Epos:idcard'),
    key: i18n.t('Epos:idcard'),
  },
  {
    label: i18n.t('Epos:photo_selfie'),
    key: i18n.t('Epos:photo_selfie'),
  },
  {
    label: 'Buku/Rekening Koran',
    key: 'Buku/Rekening Koran',
  },
  {
    label: 'Kartu Keluarga',
    key: 'KK',
  },
  {
    label: 'MCU / Medical Check up',
    key: 'MCU',
  },
  {
    label: 'Paspor',
    key: 'PP',
  },
  {
    label: i18n.t('Epos:child_idcard'),
    key: 'KIA',
  },
  {
    label: 'KIMS / KITAS / KITAP',
    key: 'KKK',
  },
];

const DEFAULT_OPTIONAL_DATA = {
  label: '',
  key: '',
};
const benefitInsuranceList = [
  { label: i18n.t('Epos:death'), key: 'D' },
  { label: i18n.t('Epos:accident'), key: 'A' },
  { label: i18n.t('Epos:critical_illness_conditions'), key: 'CIC' },
  { label: i18n.t('Epos:daily_hospitalization'), key: 'DH' },
  { label: i18n.t('Epos:Hospitalization_benefit_coordination'), key: 'HBC' },
  { label: i18n.t('Epos:other'), key: 'O' },
];

const statusTaxList = [
  { label: i18n.t('Epos:indo_taxpayers'), key: 'IT' },
  { label: i18n.t('Epos:taxt_repoting_US'), key: 'TUS' },
  { label: i18n.t('Epos:tax_other_than_indo'), key: 'TOI' },
];

const regionList = [
  { label: 'Sumatera', key: 'S' },
  { label: 'Kep. Riau', key: 'KR' },
  { label: 'Jawa', key: 'J' },
  { label: 'Kalimantan', key: 'K' },
  { label: 'Bali', key: 'B' },
  { label: 'NTB', key: 'NTB' },
  { label: 'NTT', key: 'NTT' },
  { label: 'Sulawesi', key: 'SS' },
  { label: 'Maluku', key: 'M' },
  { label: 'Papua', key: 'P' },
  { label: 'Kep. Bangka Belitung', key: 'KBB' },
];

const regionNias = [
  { label: 'Nias', key: 'N' },
  { label: i18n.t('Epos:besides_nias'), key: 'BN' },
];

const zipCodeList: Record<string, TZipCode> = {
  10110: {
    zipcode: '10110',
    province: 'DKI JAKARTA',
    province_cd: 'DIJKT',
    kecamatan: 'GAMBIR',
    kabupaten: 'JAKARTA PUSAT',
    kelurahan: 'GAMBIR',
  },
  12110: {
    zipcode: '12110',
    province: 'DKI JAKARTA',
    province_cd: 'DIJKT',
    kecamatan: 'KEBAYORAN BARU',
    kabupaten: 'JAKARTA SELATAN',
    kelurahan: 'SELONG',
  },
  11750: {
    zipcode: '11750',
    province: 'DKI JAKARTA',
    province_cd: 'DIJKT',
    kecamatan: 'CENGKARENG',
    kabupaten: 'JAKARTA BARAT',
    kelurahan: 'DURI KOSAMBI',
  },
  15115: {
    zipcode: '15115',
    province: 'BANTEN',
    province_cd: 'BANTEN',
    kecamatan: 'KARAWACI',
    kabupaten: 'TANGERANG',
    kelurahan: 'KARAWACI',
  },
  40551: {
    zipcode: '40551',
    province: 'JAWA BARAT',
    province_cd: 'JABAR',
    kecamatan: 'CISARUA',
    kabupaten: 'BANDUNG BARAT',
    kelurahan: 'JAMBUDIPA',
  },
  55111: {
    zipcode: '55111',
    province: 'DI YOGYAKARTA',
    province_cd: 'DIY',
    kecamatan: 'PAKUALAMAN',
    kabupaten: 'YOGYAKARTA',
    kelurahan: 'GUNUNGKETUR',
  },
  60111: {
    zipcode: '60111',
    province: 'JAWA TIMUR',
    province_cd: 'JATIM',
    kecamatan: 'SUKOLILO',
    kabupaten: 'SURABAYA',
    kelurahan: 'KEPUTIH',
  },
  34111: {
    zipcode: '34111',
    province: 'LAMPUNG',
    province_cd: 'LAMPUNG',
    kecamatan: 'METRO PUSAT',
    kabupaten: 'METRO',
    kelurahan: 'METRO',
  },
  34112: {
    zipcode: '34112',
    province: 'LAMPUNG',
    province_cd: 'LAMPUNG',
    kecamatan: 'METRO TIMUR',
    kabupaten: 'METRO',
    kelurahan: 'IRING MULYO',
  },
  22811: {
    zipcode: '22811',
    province: 'SUMATERA UTARA',
    province_cd: 'SUMUT',
    kecamatan: 'GUNUNGSITOLI BARAT',
    kabupaten: 'GUNUNGSITOLI',
    kelurahan: 'TUMORI',
  },
  22812: {
    zipcode: '22812',
    province: 'SUMATERA UTARA',
    province_cd: 'SUMUT',
    kecamatan: 'MANDREHE BARAT',
    kabupaten: 'NIAS BARAT',
    kelurahan: 'ONOLIMBU RAYA',
  },
  22814: {
    zipcode: '22814',
    province: 'SUMATERA UTARA',
    province_cd: 'SUMUT',
    kecamatan: 'ALASA TALUMUZOI',
    kabupaten: 'NIAS UTARA',
    kelurahan: 'BANUA SIBOHOU III',
  },
  22815: {
    zipcode: '22815',
    province: 'SUMATERA UTARA',
    province_cd: 'SUMUT',
    kecamatan: 'BOTOMUZOI',
    kabupaten: 'NIAS',
    kelurahan: 'HILIGODU BOTOMUZOI',
  },
  22864: {
    zipcode: '22864',
    province: 'SUMATERA UTARA',
    province_cd: 'SUMUT',
    kecamatan: 'LOLOWAU',
    kabupaten: 'NIAS SELATAN',
    kelurahan: 'AMURI',
  },
};

const benefiteList = [
  {
    konven: 'Anak Angkat/Asuh Calon Tertanggung Utama',
    syariah: 'Anak Angkat/Asuh Calon Peserta Utama Yang Diasuransikan',
    code: 'AA',
    gender: '',
  },
  {
    konven: 'Anak Laki-Laki Calon Tertanggung Utama',
    syariah: 'Anak Laki-Laki Calon Peserta Utama Yang Diasuransikan',
    code: 'SO',
    gender: 'M',
  },
  {
    konven: 'Anak Perempuan Calon Tertanggung Utama',
    syariah: 'Anak Perempuan Calon Peserta Utama Yang Diasuransikan',
    code: 'DA',
    gender: 'F',
  },
  {
    konven: 'Ayah Calon Tertanggung Utama',
    syariah: 'Ayah Calon Peserta Utama Yang Diasuransikan',
    code: 'FA',
    gender: 'M',
  },
  {
    konven: 'Bisnis Calon Tertanggung Utama',
    syariah: 'Bisnis Calon Peserta Utama Yang Diasuransikan',
    code: 'BU',
    gender: '',
  },
  {
    konven: 'Ibu Calon Tertanggung Utama',
    syariah: 'Ibu Calon Peserta Utama Yang Diasuransikan',
    code: 'MO',
    gender: 'F',
  },
  {
    konven: 'Istri Calon Tertanggung Utama',
    syariah: 'Istri Calon Peserta Utama Yang Diasuransikan',
    code: 'WI',
    gender: 'F',
  },
  {
    konven: 'Kakek/Nenek Calon Tertanggung Utama',
    syariah: 'Kakek/Nenek Calon Peserta Utama Yang Diasuransikan',
    code: 'GP',
    gender: '',
  },
  {
    konven: 'Paman/Bibi Calon Tertanggung Utama',
    syariah: 'Paman/Bibi Calon Peserta Utama Yang Diasuransikan',
    code: 'UA',
    gender: '',
  },
  {
    konven: 'Karyawan Calon Tertanggung Utama',
    syariah: 'Karyawan Calon Peserta Utama Yang Diasuransikan',
    code: 'EM',
    gender: '',
  },
  {
    konven: 'Keponakan Calon Tertanggung Utama',
    syariah: 'Keponakan Calon Peserta Utama Yang Diasuransikan',
    code: 'NN',
    gender: '',
  },
  {
    konven: 'Lainnya, Mohon Jelaskan di Amandemen',
    syariah: 'Lainnya, Mohon Jelaskan di Amandemen',
    code: 'O',
    gender: '',
  },
  {
    konven: 'Mertua/Menantu Calon Tertanggung Utama',
    syariah: 'Mertua/Menantu Calon Peserta Utama Yang Diasuransikan',
    code: 'MM',
    gender: '',
  },
  {
    konven: 'Pemegang Polis',
    syariah: 'Pemegang Polis',
    code: 'PH',
    gender: '',
  },
  {
    konven: 'Perusahaan Pemberi Kredit Calon Tertanggung Utama',
    syariah: 'Perusahaan Pemberi Kredit Calon Peserta Utama Yang Diasuransikan',
    code: 'KR',
    gender: '',
  },
  {
    konven: 'Saudara Calon Tertanggung Utama',
    syariah: 'Saudara Calon Peserta Utama Yang Diasuransikan',
    code: 'BS',
    gender: '',
  },
  {
    konven: 'Suami Calon Tertanggung Utama',
    syariah: 'Suami Calon Peserta Utama Yang Diasuransikan',
    code: 'HU',
    gender: 'M',
  },
  {
    konven: 'Wali Calon Tertanggung Utama',
    syariah: 'Wali Calon Peserta Utama Yang Diasuransikan',
    code: 'WL',
    gender: '',
  },
  {
    konven: 'Yayasan Sosial/Keagamaan Calon Tertanggung Utama',
    syariah: 'Yayasan Sosial/Keagamaan Calon Peserta Utama Yang Diasuransikan',
    code: 'YY',
    gender: '',
  },
];

const notes = [
  { key: i18n.t('Epos:account_must_be_in_name_PH') },
  { key: i18n.t('Epos:for_payment_must_use_an_account_located') },
  { key: i18n.t('Epos:account_data_will_be_used_as_the_destination_account') },
];

const categoryList = [
  { label: i18n.t('Epos:name_change'), key: 'PN' },
  { label: i18n.t('Epos:change_date_of_birth'), key: 'PTL' },
  { label: i18n.t('Epos:gender_change'), key: 'PJK' },
  { label: i18n.t('Epos:change_of_marital_status'), key: 'PSP' },
  { label: i18n.t('Epos:change_in_age_frequency'), key: 'PFB' },
  { label: i18n.t('Epos:change_ph_covered_address'), key: 'UA' },
  { label: i18n.t('Epos:change_id_number'), key: 'UNI' },
  { label: i18n.t('Epos:change_telephone_number'), key: 'UNT' },
  { label: i18n.t('Epos:change_beneficiary'), key: 'UPM' },
  { label: i18n.t('Epos:change_email_address'), key: 'UAE' },
  { label: i18n.t('Epos:health_data'), key: 'HD' },
];

const categoryDoksulList = [
  { label: 'Administrasi', key: 'AD' },
  { label: 'Medical', key: 'MD' },
];

const subCategoryList = (mainParticipant: any) => {
  return [
    { label: i18n.t('Epos:prospective_policyholder'), key: 'PP' },
    { label: mainParticipant, key: 'T/PU' },
    { label: i18n.t('Epos:additional_insured_candidate'), key: 'T/PT' },
  ];
}

const ilustrationStatementList = [
  { label: i18n.t('Epos:benefits'), key: 'M' },
  { label: i18n.t('Epos:cost'), key: 'B' },
  { label: i18n.t('Epos:risk'), key: 'R' },
  { label: i18n.t('Epos:policy_to_be_canceled'), key: 'PB' },
];

const listHospital = [
  { key: i18n.t('Epos:advent_hospital') },
  { key: i18n.t('Epos:imanuel_way_halim_hospital') },
  { key: i18n.t('Epos:bumi_waras_hospital') },
  { key: i18n.t('Epos:mitra_Husada_pringsewu_hospital') },
  { key: i18n.t('Epos:urip_sumoharjo_hospital') },
  { key: i18n.t('Epos:hermina_lampung_hospital') },
];

const waqfPledgeList = [
  { label: `${i18n.t('Epos:assured_waqf_promise_pledge_form')} ≤ 45%`, key: '≤ 45%' },
  { label: `${i18n.t('Epos:assured_waqf_promise_pledge_form')} > 45%`, key: '> 45%' },
];

const summaryPolicyList = (premiContribution: string) => {
  return [
    {
      key: i18n.t('Epos:policy_status_has_been_active'),
      subKey: [],
    },
    {
      key: i18n.t('Epos:pay_a_printing_fee_of_one_hundred_thousand_rupiah', { premiContribution }),
      subKey: [
        {
          key: 'a.',
          item: i18n.t('Epos:if_the_printing_fee_is_not_paid_together', { premiContribution }),
        },
        {
          key: 'b.',
          item: i18n.t(
            'Epos:policyholder_candidate_still_wants_to_get_a_printed_version_of_the_Electronic_policy_book',
          ),
        },
      ],
    },
    {
      key: i18n.t('Epos:this_printed_version_of_the_electronic_policy_book'),
      subKey: [
        {
          key: 'a.',
          item: i18n.t('Epos:submitting_performing_financial_transactions'),
        },
        {
          key: 'b.',
          item: i18n.t('Epos:submitting_a_claim_for_insurance_benefits'),
        },
      ],
    },
    {
      key: i18n.t('Epos:prospective_policyholders_have_fourteen_calendar_days'),
      subKey: [],
    },
    {
      key: i18n.t('Epos:payment_of_printing_costs_for_the_printed_version_of_the_electronic_policy'),
      subKey: [],
    },
  ];
};

const waqfInstitutionList = [
  { label: 'Dompet Dhuafa', key: 'DD' },
  { label: 'Lembaga Wakaf MUI', key: 'LW' },
  { label: 'Inisiatif Wakaf (iwakaf)', key: 'IW' },
  { label: 'Badan Wakaf Salman ITB', key: 'BW' },
  { label: 'Lembaga Wakaf dan Pertahanan NU', key: 'NU' },
  { label: 'Lembaga Waqaf YPI Al Azhar', key: 'LA' },
  { label: 'Lembaga Waqaf Persis', key: 'LP' },
  { label: 'Lembaga Waqaf Hidayatullah', key: 'LH' },
  // { label: 'Badan Wakaf Salman ITB', key: '01' },
  // // { label: 'Badan Wakaf Salman ITB', key: '01' },
  // { label: 'Inisiatif Wakaf (iwakaf)', key: '03' },
  // { label: 'Lembaga Wakaf MUI', key: '04' },
];

const SKAList = [
  {
    key: 'A',
    title: 'A',
    detail: `(Calon) Tertanggung/Peserta Utama merupakan Anak Kandung SAYA yang berusia 21 tahun atau lebih dan benar bergantung kepada SAYA secara <i>financial</i> untuk memenuhi kebutuhan hidup sehari-hari.`,
  },
  {
    key: 'B',
    title: 'B',
    detail:
      '(Calon) Tertanggung/Peserta Utama merupakan Cucu kandung SAYA yang belum genap berusia 21 tahun dan benar bergantung kepada SAYA secara <i>financial</i> untuk memenuhi kebutuhan hidup sehari-hari.',
  },
  {
    key: 'C',
    title: 'C',
    detail:
      '(Calon) Tertanggung/Peserta Utama merupakan Keponakan SAYA yang belum genap berusia 21 tahun dan benar bergantung kepada SAYA secara <i>financial</i> untuk memenuhi kebutuhan hidup sehari-hari.',
  },
  {
    key: 'D',
    title: 'D',
    detail:
      '(Calon) Tertanggung/Peserta Utama merupakan Menantu SAYA dan benar bergantung kepada SAYA secara <i>financial</i> untuk memenuhi kebutuhan hidup sehari-hari.',
  },
  {
    key: 'E',
    title: 'E',
    detail:
      '(Calon) Tertanggung/Peserta Utama tidak mempunyai keluarga inti dan SAYA berkeinginan untuk menunjuk (Calon) Penerima Manfaat selain keluarga inti karena alasan berikut:',
  },
  {
    key: 'F',
    title: 'F',
    detail:
      '(Calon) Tertanggung/Peserta Utama masih mempunyai keluarga inti dan SAYA berkeinginan untuk menunjuk (Calon) Penerima Manfaat selain keluarga inti karena alasan berikut:',
  },
];

const SKADocumentAttachment = [
  { key: `Akta Kelahiran (Calon) Tertanggung/Peserta Utama.` },
  { key: `Bila berusia 17 - 21 tahun wajib melampirkan Akta Kelahiran dan Kartu Tanda Penduduk (KTP).` },
  { key: `KTP Orang Tua dari (Calon) Tertanggung/Peserta Utama.` },
  {
    key: `Kartu Keluarga yang mencantumkan hubungan antara (Calon) Pemegang Polis dan (Calon) Tertanggung/Peserta Utama`,
  },
];

const marketerInteractionList = [
  { label: 'Proses telah melewati TAT', key: 'A' },
  { label: 'Tinjauan Ulang Keputusan', key: 'B' },
  { label: 'Business Consideration (Khusus)', key: 'C' },
  { label: 'Penghapusan Rider', key: 'D' },
  { label: 'Permintaan Proses Lainnya', key: 'E' },
];

const businessEntityList = [
  { label: 'PT', key: 'PT' },
  { label: 'CV', key: 'CV' },
  { label: 'Yayasan', key: 'Y' },
  { label: 'Koperasi', key: 'K' },
  { label: 'Lainnya', key: 'L' },
];

// SPAJ step1 Other information
const clientValidationIsEmployee = [
  {
    key: 'Y1',
    label:
      'Ya, SAYA adalah karyawan dari {PT Prudential Life Assurance / PT Prudential Sharia Life Assurance (Prudentian Syariah)}',
  },
  {
    key: 'Y2',
    label:
      'Ya, SAYA adalah keluarga karyawan dari {PT Prudential Life Assurance / PT Prudential Sharia Life Assurance (Prudentian Syariah)}',
  },
  {
    key: 'N',
    label:
      'Tidak, SAYA bukan karyawan atau keluarga karyawan dari {PT Prudential Life Assurance / PT Prudential Sharia Life Assurance (Prudentian Syariah)}',
  },
];

const clientValidationRelationStatus = [
  {
    key: 'Y',
    label:
      'Asuransi untuk karyawan {PT Prudential Life Assurance / PT Prudential Sharia Life Assurance (Prudentian Syariah)} tidak berlaku untuk produk ini.',
  },
  {
    key: 'L',
    label: i18n.t('Epos:other'),
  },
];

const catatanSPAJotherInformation = [
  {
    key: `Keluarga Inti:`,
    subKey: [
      { item: `•  Jika Status Menikah: Suami/Istri atau Anak` },
      { item: `•  Jika Status Belum Menikah: Ayah, Ibu, Kakak, Adik` },
    ],
  },
  {
    key: `Jika dikemudian hari ditemukan fakta adanya ketidaksesuaian atas jawaban yang diberikan, maka akan berdampak terhadap klaim yang diajukan.`,
    subKey: [],
  },
];

const vulnerableCustomerAgreementList: TOptionalCardData[] = [
  {
    key: 'pergerakan',
    label: 'Penyandang Disabilitas terkait pergerakan',
    sub: [
      { label: 'Stunting', key: 'S' },
      { label: 'Cerebral Palsy', key: 'C' },
      { label: 'Lumpuh Layu', key: 'L' },
      { label: 'Amputasi bagian tubuh', key: 'A' },
      { label: 'Lainnya', key: 'O' },
    ],
  },
  {
    key: 'intelect',
    label: 'Penyandang disabilitas intelektual',
    sub: [
      { label: 'Down Syndrome', key: 'D' },
      { label: 'Lainnya', key: 'O' },
    ],
  },
  {
    key: 'mental',
    label: 'Penyandang disabilitas mental',
    sub: [
      { label: 'Psiko Social (Bipolar, Anxietas, Depresi)', key: 'P' },
      { label: 'Autis', key: 'A' },
      { label: 'Hiperaktif', key: 'H' },
      { label: 'Lainnya', key: 'O' },
    ],
  },
  { key: 'none', label: 'Calon Pemegang Polis tidak termasuk dalam kategori di atas', sub: [] },
];

const additionalValidationSPAJModal = [
  { label: 'YA', key: 'Y' },
  { label: 'TIDAK', key: 'N' },
];

const paymentType = [
  {
    title: 'Online',
    detail: 'Pembayaran online dengan Kartu Debit/Kredit, Internet Banking',
    key: 'online',
  },
  {
    title: 'Offline',
    detail: 'Pembayaran dengan Transfer Bank atau Non Bank',
    key: 'offline',
  },
];

const paymentBankName = [
  {
    label: `PT Bank Permata`,
    key: `permata`,
    detail: [
      { key: `1. Masukkan kartu ATM Anda*)` },
      { key: `2. Jenis bahasa: pilih bahasa "<b>Indonesia</b>" atau "<b>English</b>"` },
      { key: `3. Masukkan PIN Anda` },
      { key: `4. Jenis Transaksi: pilih "<b>Transaksi lainnya</b>"` },
      { key: `5. Jenis Pembayaran: pilih "<b>Pembayaran</b>"` },
      { key: `6. Jenis Pembayaran: pilih "<b>Asuransi</b>"` },
      { key: `7. Tentukan Kode Prefix:` },
      {
        subkey: `112 Prudential Premi Lanjutan/SPAJ IDR 113 Prudential Premi Lanjutan/SPAJ USD 114: Prudential TOP UP IDR`,
      },
      { subkey: `115 Prudential TOP UP USD` },
      { subkey: `116 Prudential Biaya Cetak Polis 117: Prudential Biaya Ubah Polis` },
      {
        subkey: `118 Prudential Biaya Cetak Kartu 121: Prusyariah Kontribusi Lanjutan/SPAJ 122 Prusyariah Kontribusi Top up 123 Prusyariah Ujrah/Biaya`,
      },
      { key: `8. Nomor Polis: masukkan "<b>Kode Prefix + Nomor Polis/SPAJ</b>" Anda` },
      { key: `9. Jumlah Pembayaran: masukkan "<b>Jumlah Premi</b>" yang akan dibayar` },
      { key: `10. Jenis Rekening: pilih "<b>Rekening</b>" Anda` },
      { key: `11. Konfirmasi pembayaran` },
      { key: `12. Transaksi selesai` },
    ],
  },
  {
    label: `PT Bank Central Asia`,
    key: `bca`,
    detail: [
      { key: `1. Masukkan kartu ATM BCA Anda` },
      { key: `2. Masukkan PIN Anda` },
      { key: `3. Jenis Transaksi: pilih "<b>Transaksi lainnya</b>"` },
      { key: `4. Jenis Transaksi: pilih "<b>Pembayaran</b>""` },
      { key: `5. Jenis Pembayaran: pilih "<b>Layar Berikut</b>"` },
      { key: `6. Jenis Pembayaran: pilih "<b>Asuransi</b>"` },
      { key: `7. Pilih Perusahaan Asuransi "<b>Prudential</b>"` },
      { key: `8. Pilih Kode Bayar sesuai Jenis Pembayaran: ` },
      { subkey: `7251 Premi Lanjutan/SPAJ` },
      { subkey: `7252: Top-up Premi` },
      {
        subkey: `118 Prudential Biaya Cetak Kartu 121: Prusyariah Kontribusi Lanjutan/SPAJ 122 Prusyariah Kontribusi Top up 123 Prusyariah Ujrah/Biaya`,
      },
      { key: `9. Nomor Polis: masukkan "<b>Kode Prefix + Nomor Polis/SPAJ</b>` },
      { key: `10. Jumlah Pembayaran: masukkan "<b>Jumlah Premi</b>" yang akan dibayar` },
      { key: `11. Jenis Rekening: pilih "<b>Rekening</b>" Anda` },
      { key: `12. Konfirmasi pembayaran` },
      { key: `13. Transaksi selesai` },
    ],
  },
  {
    label: `PT Bank Mandiri`,
    key: `mandiri`,
    detail: [
      { key: `1. Masukkan kartu ATM Mandiri Anda` },
      { key: `2. Jenis bahasa: pilih bahasa "<b>Indonesia</b>" atau "<b>English</b>"` },
      { key: `3. Masukkan PIN Anda` },
      { key: `4. Jenis Transaksi: pilih "<b>Pembayaran Lainnya</b>"` },
      { key: `5. Jenis Pembayaran: pilih "<b>Asuransi</b>"` },
      { key: `6. Jenis Pembayaran: pilih "<b>Asuransi Lainnya</b>", masukan no urut: 08 atau 8` },
      { key: `7. Pilih Daftar Kode Perusahaan: Kode Prudential "23000"` },
      {
        key: `8. Masukkan no SPAJ atau no Polis Anda. Premi pertama: "<b>masukkan no SPAJ Anda</b>" Premi Lanjutan Top-up/Biaya- biaya: "<b>Masukkan no Polis Anda</b>"`,
      },
      { key: `9. Jumlah pembayaran: masukkan "<b>Jumlah Premi</b>" yang akan dibayar` },
      {
        key: `10. Pilih Nomor Jenis/Item pembayaran: Premi Pertama: "Untuk pembayaran Premi Pertama masukkan angka 1" Premi Lanjutan/Top-up/Biaya-biaya: "Untuk pembayaran premi lanjutan/Top-up/biaya-biaya, maka Anda dapat memilih angka jenis pembayaran, sbb:`,
      },
      { subkey: `1. Prem Lanjut` },
      { subkey: `2. Top-up` },
      { subkey: `3. B. Ctk Polis` },
      { subkey: `4. B. Prb Polis` },
      { subkey: `5. B. Ctk Kartu` },
      {
        key: `"<b>Jika Anda salah memasukkan no polis/no polis tidak terdaftar maka pilihan menu untuk jenis pembayaran diatas (Premi Lanjutan/Top-up/Biaya-biaya) tidak keluar dan pembayaran Anda akan dianggap pembayaran no SPAJ</b>"`,
      },
      { key: `11. Konfirmasi pembayaran` },
      { key: `12. Transaksi selesai` },
    ],
  },
  {
    label: `PT Bank Negara Indonesia`,
    key: `bni`,
    detail: [
      { key: `1. Masukkan kartu ATM BNI Anda` },
      { key: `2. Jenis bahasa: pilih bahasa "<b>Indonesia</b>" atau "<b>English</b>"` },
      { key: `3. Masukkan PIN Anda` },
      { key: `4. Pilih "Lanjutkan"` },
      { key: `5. Jenis Transaksi: pilih "<b>Pembayaran</b>"` },
      { key: `6. Jenis Pembayaran: pilih "Menu Berikutnya"` },
      { key: `7. Jenis Pembayaran: pilih "<b>Asuransi</b>"` },
      { key: `8. Pilih Perusahaan Asuransi "<b>Prudential</b>"` },
      { key: `9. Pilih Kode Bayar sesuai Jenis Pembayaran:` },
      {
        key: `Premi Lanjutan/Top-up/Biaya-biaya: "masukkan sesuai dengan <b>kode bayar</b> masing-masing pembayaran + <b>Nomor Polis</b> Anda.`,
      },
      { subkey: `7251: Premi Lanjutan/SPAJ` },
      { subkey: `7252: Top-up Premi` },
      { subkey: `7253: Biaya Cetak Ulang Polis` },
      { subkey: `7254: Biaya Perubahan Polis` },
      { subkey: `7255: Biaya Cetak Kartu` },
      { key: `10. Jumlah pembayaran: masukkan "<b>Jumlah Premi</b>" yang akan dibayar` },
      { key: `11. Konfirmasi pembayaran` },
      { key: `12. Jenis Rekening: pilih "<b>Rekening</b>" Anda` },
      { key: `13. Transaksi selesai` },
    ],
  },
  {
    label: `PT Bank Panin`,
    key: `panin`,
    detail: [
      { key: `1. Masukan kartu ATM PANIN Bank Anda` },
      { key: `2. Jenis bahasa: pilih bahasa "<b>Indonesia</b>" atau "<b>English</b>"` },
      { key: `3. Masukkan PIN Anda` },
      { key: `4. Jenis Rekening: pilih "<b>Rekening</b>" Anda` },
      { key: `5. Jenis Transaksi: pilih "<b>Pembayaran</b>"` },
      { key: `6. Jenis Pembayaran: pilih "<b>Asuransi</b>"` },
      { key: `7. Pilih Perusahaan Asuransi "<b>Prudential</b>"` },
      { key: `8. Pilih Kode Bayar sesuai Jenis Pembayaran:` },
      { subkey: `7251: Premi Lanjutan/SPAJ` },
      { subkey: `7252: Top-up Premi` },
      { subkey: `7253: Biaya Cetak Ulang Polis` },
      { subkey: `7254: Biaya Perubahan Polis` },
      { subkey: `7255: Biaya Cetak Kartu` },
      { key: `9. Nomor Polis: masukkan <b>Kode Bayar + Nomor Polis/SPAJ Anda</b>` },
      { key: `10. Jumlah Pembayaran: masukkan "<b>Jumlah Premi</b>" yang akan dibayar` },
      { key: `11. Konfirmasi pembayaran` },
      { key: `12. Transaksi selesai` },
    ],
  },
  {
    label: `PT Bank OCBC NISP`,
    key: `ocbn`,
    detail: [
      { key: `1. Masukkan kartu ATM OCBC NISP Anda` },
      { key: `2. Jenis bahasa: pilih bahasa "<b>Indonesia</b>" atau "<b>English</b>"` },
      { key: `3. Masukkan PIN Anda` },
      { key: `4. Jenis Transaksi: pilih "<b>Menu Lainnya</b>"` },
      { key: `5. Jenis Transaksi: pilih "<b>Pembayaran</b>"` },
      { key: `6. Jenis Pembayaran: pilih "<b>Asuransi</b>"` },
      { key: `7. Pilih Perusahaan Asuransi "<b>Prudential</b>"` },
      { key: `8. Pilih Pembayaran Premi:` },
      { subkey: `1. Premi Lanjutan/SPAJ` },
      { subkey: `2. Top-up` },
      { subkey: `3. Cetak Ulang Polis` },
      { subkey: `4. Perubahan Polis` },
      { subkey: `5. Cetak Kartu` },
      { key: `9. Masukkan No SPAJ atau No Polis Anda tanpa perlu masukkan kode bayar` },
      {
        key: `Jika Premi Pertama: "<b>Masukkan no SPAJ Anda</b>"Jika Premi Lanjutan/Top-up/Biaya-biaya: "<b>Masukkan No Polis Anda</b>"`,
      },
      { key: `10. Jumlah Pembayaran: masukkan "<b>Jumlah Premi</b>" yang akan dibayar` },
      { key: `11. Konfirmasi pembayaran` },
      { key: `12. Transaksi selesai` },
    ],
  },
];

const phoneCodeSettings = {
  keyMap: {
    value: 'dial_code',
    label: 'dial_code',
    labelOption: 'name',
    search: 'name',
    prefix: 'dial_code',
    labelFormater: (label: string) => `(${label})`,
  },
  title: {
    titleHeaeder: 'Kode Telepon Negara',
  },
};

const exclusionOfferOption: TOptionalCardData[] = [
  {
    key: 'Y',
    title: 'Setuju Substandard',
  },
  {
    key: 'N',
    title: 'Tidak Setuju Substandard',
  },
];

const hasPolicyDescription = [{ label: i18n.t('Epos:no_polis_check_description'), id: 'noPolis' }];

export {
  POLICY_OPTION,
  QPOLICY_HOLDER_TARGET,
  QINSURED_TARGET,
  QDOMICILE_ACEH,
  QDOMICILE_SUMATERAUTARA,
  INSURANCE_GOALS_OPTION,
  QPOLICY_TYPE,
  QINVESTMENT_OWNED,
  QKNOWLEDGE_INVESTMENT,
  QPURPOSE_INVESTMENT,
  QRISK,
  QEXPERIENCE_INVESTMENT,
  QPERIOD_INVESTMENT,
  QWAITING_PERIOD,
  QPREMI_PAYMENT_VALIDATION,
  QWHO_PREMI_PAYMENY,
  QCONFIRMATION_RECOMMENDATION_PRODUCT,
  GenderList,
  SmokerList,
  maritalStatusList,
  IndonesianLanguageCapability,
  netWorthList,
  tExpenses,
  currencyList,
  OCCUPATION,
  paymentFreqList,
  DisabilityCategoryStatus,
  ValidationDisabilityCategoryStatus,
  typeCust,
  statement,
  changeBenefitList,
  OCCUPATION_SIMPLE,
  idcard,
  questions,
  sourceIncomePerYear,
  relationshipPH,
  generateRelationPHwithTU,
  countryList,
  religionList,
  educationList,
  statusList,
  massAppliesList,
  mailingAddressList,
  asideFromNPWPList,
  activitiesList,
  sportyInsurend,
  sportyPlace,
  diseaseTypeList,
  durationtotalAlcoholList,
  averageTotalAlcoholList,
  totalAlcoholconsumedList,
  confirmProspectivePHList,
  premiumPaymentCandidateList,
  diseaseNameList,
  relationshipPHList,
  diseaseList,
  relationshipPayerList,
  SPAJCurrencyList,
  topupPremiPayerList,
  topupGoalList,
  locationList,
  typeDocsList,
  DEFAULT_OPTIONAL_DATA,
  benefitInsuranceList,
  statusTaxList,
  regionList,
  regionNias,
  zipCodeList,
  benefiteList,
  notes,
  categoryList,
  ilustrationStatementList,
  subCategoryList,
  listHospital,
  waqfPledgeList,
  summaryPolicyList,
  waqfInstitutionList,
  SKAList,
  SKADocumentAttachment,
  categoryDoksulList,
  marketerInteractionList,
  businessEntityList,
  clientValidationIsEmployee,
  clientValidationRelationStatus,
  catatanSPAJotherInformation,
  additionalValidationSPAJModal,
  vulnerableCustomerAgreementList,
  statementApproval,
  paymentType,
  paymentBankName,
  minMaxSalaryData,
  phoneCodeSettings,
  exclusionOfferOption,
  hasPolicyDescription,
  listStatusResidence,
};
