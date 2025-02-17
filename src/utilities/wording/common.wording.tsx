import { Text } from 'react-native';
import React from 'react';
import { plaiStyles } from 'plai_common_frontend';
import i18n from 'i18next';
import { UpfrontMapping, TPolicyType } from '../model';
import { additionalQuestionValidation } from '../../screen/espaj/disclaimer/disclaimer.data';
import { getOfferingProductWording } from '../../screen/espaj/disclaimer/disclaimer.function';
import { productType } from '../common-function';

export type TShariaConventItem = {
  mainParticipant: string;
  mainParticipantU17: string;
  mainParticipantU17_1: string;
  participant: string;
  additionalParticipant: string;
  companyName: string;
  companyNameShort: string;
  additionalCompanyName: string;
  premiContribution: string;
  spaj: string;
  spajT: string;
  additionalLabel: string;
  payor: string;
  candidate: string;
  candidateTitle: string;
  candidateTitleOne: string;
  candidateTitleTwo: string;
  period: string;
  cost: string;
  compensation: string;
  insurerManager: string;
  insured: string;
  company: string;
  lifeAssured: string;
  lifeAssured_1: string;
  lifeAssured_2: 'Peserta' | 'Tertanggung';
  lifeAssured_3: 'Yang Diasuransikan' | '';
  insurancePayor: string;
  not_having_npwp_disclaimer: string;
  email_disclaimer: {
    ph: string;
    tu: string;
    premi: string;
  };
  info_link: string
  privacy_policy_link: string
  zone: string;
  premiumAndPayment: string;
  annualPremium: string;
  enterAnnualPremium: string;
  regularPremium: string;
  enterRegularPremium: string;
  pdp_notice_bar_PH: string
  pdp_notice_bar_Payor: string
  pdp_notice_bar_have_other_assurance_1: string
  pdp_notice_bar_have_other_assurance_2: string
  pdp_notice_bar_have_other_assurance_3: string
  pru_pay_link: string
}

export type TWRShariaConvent = {
  [key in TPolicyType]: TShariaConventItem;
};

const WR_SHARIA_CONVENT: TWRShariaConvent = {
  "": {
    mainParticipant: i18n.t('Epos:primary_Insured_candidate'),
    mainParticipantU17: 'Orang Tua (Bila Calon Tertanggung Utama berusia dibawah 17 Tahun)',
    mainParticipantU17_1: 'Orang Tua (Bila Calon Tertanggung berusia dibawah 17 Tahun)',
    participant: i18n.t('Epos:insured_candidate'),
    additionalParticipant: i18n.t('Epos:additional_insured_candidate'),
    companyName: 'PT Prudential Sharia Life Assurance',
    companyNameShort: 'Prudential Syariah',
    additionalCompanyName: '(Prudential Syariah)',
    premiContribution: i18n.t('Epos:contribution'),
    spaj: 'SPAJ Syariah',
    spajT: 'SPAJT SYARIAH',
    additionalLabel: 'Syariah',
    payor: i18n.t('Epos:candidate_contribution_payment'),
    period: i18n.t('Epos:period_insured_syariah'),
    candidate: i18n.t('Epos:prospective_policyholder'),
    candidateTitle: `${i18n.t('Epos:prospective_policyholder')} (${i18n.t('Epos:primary_Insured_candidate')})`,
    candidateTitleOne: `Calon Peserta Tambahan 1 Yang Diasuransikan`,
    candidateTitleTwo: `Calon Peserta Tambahan 2 Yang Diasuransikan`,
    cost: 'Ujrah',
    compensation: i18n.t('Epos:insurance_compensation'),
    insurerManager: 'Pengelola',
    insured: 'Kepesertaan',
    company: `Prudential Syariah`,
    lifeAssured: `Peserta Yang Diasuransikan`,
    lifeAssured_1: `Peserta Utama Yang Diasuransikan`,
    lifeAssured_2: 'Peserta',
    lifeAssured_3: 'Yang Diasuransikan',
    insurancePayor: 'Peserta Utama Yang Diasuransikan',
    not_having_npwp_disclaimer:
      'SAYA memberikan alasan tidak mengisi NPWP pada SPAJ Syariah ini dengan jujur dan benar. SAYA bertanggung jawab sepenuhnya untuk segala risiko yang disebabkan jika SAYA tidak mengisi alasan dengan jujur dan benar.',
    email_disclaimer: {
      ph: i18n.t('Epos:email_disclaimer_ph'),
      premi: i18n.t('Epos:sharia_email_disclaimer_premi'),
      tu: i18n.t('Epos:sharia_email_disclaimer_tu'),
    },
    info_link: 'https://bit.ly/PRUSyariahPihakKetiga',
    privacy_policy_link: 'https://bit.ly/PRUSyariahKebijakanPrivasi',
    zone: 'Cakupan Wilayah Asuransi',
    premiumAndPayment: i18n.t('Epos:premium_and_payment').replace('Premi', 'Kontribusi'),
    annualPremium: 'Kontribusi Disetahunkan',
    enterAnnualPremium: 'Masukan Kontribusi Tahunan',
    regularPremium: 'Kontribusi Berkala',
    enterRegularPremium: 'Masukan Kontribusi Berkala',
  },
  sharia: {
    mainParticipant: i18n.t('Epos:primary_Insured_candidate'),
    mainParticipantU17: 'Orang Tua (Bila Calon Peserta Utama Yang Diasuransikan berusia dibawah 17 Tahun)',
    mainParticipantU17_1: 'Orang Tua (Bila Calon Peserta Yang Diasuransikan berusia dibawah 17 Tahun)',
    participant: i18n.t('Epos:insured_candidate'),
    additionalParticipant: i18n.t('Epos:additional_insured_candidate'),
    companyName: 'PT Prudential Sharia Life Assurance',
    companyNameShort: 'Prudential Syariah',
    additionalCompanyName: '(Prudential Syariah)',
    premiContribution: i18n.t('Epos:contribution'),
    spaj: 'SPAJ Syariah',
    spajT: 'SPAJT SYARIAH',
    additionalLabel: 'Syariah',
    payor: i18n.t('Epos:candidate_contribution_payment'),
    period: i18n.t('Epos:period_insured_syariah'),
    candidate: i18n.t('Epos:prospective_policyholder'),
    candidateTitle: `${i18n.t('Epos:prospective_policyholder')} (${i18n.t('Epos:primary_Insured_candidate')})`,
    candidateTitleOne: `Calon Peserta Tambahan 1 Yang Diasuransikan`,
    candidateTitleTwo: `Calon Peserta Tambahan 2 Yang Diasuransikan`,
    cost: 'Ujrah',
    compensation: i18n.t('Epos:insurance_compensation'),
    insurerManager: 'Pengelola',
    insured: 'Kepesertaan',
    company: `Prudential Syariah`,
    lifeAssured: `Peserta Yang Diasuransikan`,
    lifeAssured_1: `Peserta Utama Yang Diasuransikan`,
    lifeAssured_2: 'Peserta',
    lifeAssured_3: 'Yang Diasuransikan',
    insurancePayor: 'Peserta Utama Yang Diasuransikan',
    not_having_npwp_disclaimer:
      'SAYA memberikan alasan tidak mengisi NPWP pada SPAJ Syariah ini dengan jujur dan benar. SAYA bertanggung jawab sepenuhnya untuk segala risiko yang disebabkan jika SAYA tidak mengisi alasan dengan jujur dan benar.',
    email_disclaimer: {
      ph: i18n.t('Epos:email_disclaimer_ph'),
      premi: i18n.t('Epos:sharia_email_disclaimer_premi'),
      tu: i18n.t('Epos:sharia_email_disclaimer_tu'),
    },
    info_link: 'https://bit.ly/PRUSyariahPihakKetiga',
    privacy_policy_link: 'https://bit.ly/PRUSyariahPemberitahuanPrivasi',
    zone: 'Cakupan Wilayah Asuransi',
    premiumAndPayment: i18n.t('Epos:premium_and_payment').replace('Premi', 'Kontribusi'),
    annualPremium: 'Kontribusi Disetahunkan',
    enterAnnualPremium: 'Masukan Kontribusi Tahunan',
    regularPremium: 'Kontribusi Berkala',
    enterRegularPremium: 'Masukan Kontribusi Berkala',
    pdp_notice_bar_PH: 'Calon Pemegang Polis harus menjawab semua pertanyaan secara benar, lengkap dan jujur, mengenai Sumber Penghasilan Rutin Per Bulan dan Sumber Dana, Total Penghasilan Rutin Per Bulan dan Nilai Harta Kekayaan Bersih (<i>Net Worth</i>), dalam kolom pertanyaan tersebut di atas. Apabila di kemudian hari ditemukan fakta bahwa pengisian data diri Calon Pemegang Polis tersebut tidak benar, tidak lengkap dan/atau tidak jujur, maka hal tersebut dapat menyebabkan keputusan <i>underwriting</i> (seleksi risiko) yang berbeda maupun mengakibatkan konsekuensi sebagaimana diatur dalam ketentuan Polis, termasuk hingga pengakhiran Polis secara sepihak oleh Prudential Syariah. Apabila Calon Pemegang Polis ingin menambahkan informasi yang belum dituliskan di SPAJ Syariah ini, mohon menuliskannya pada "Surat Pernyataan/Amendemen untuk SPAJ Syariah/SPAJT Syariah/Pengajuan Pelayanan Polis" dan dilampirkan bersama SPAJ Syariah ini.',
    pdp_notice_bar_Payor: 'Calon Pembayar Kontribusi harus menjawab semua pertanyaan secara benar, lengkap dan jujur, mengenai Sumber Penghasilan Rutin Per Bulan dan Sumber Dana, Total Penghasilan Rutin Per Bulan dan Nilai Harta Kekayaan Bersih (<i>Net Worth</i>), dalam kolom pertanyaan tersebut di atas. Apabila di kemudian hari ditemukan fakta bahwa pengisian data diri Calon Pembayar Kontribusi tersebut tidak benar, tidak lengkap dan/atau tidak jujur, maka hal tersebut dapat menyebabkan keputusan <i>underwriting</i> (seleksi risiko) yang berbeda maupun mengakibatkan konsekuensi sebagaimana diatur dalam ketentuan Polis, termasuk hingga pengakhiran Polis secara sepihak oleh Prudential Syariah. Apabila Calon Pembayar Kontribusi ingin menambahkan informasi yang belum dituliskan di SPAJ Syariah ini, mohon menuliskannya pada "Surat Pernyataan/Amendemen untuk SPAJ Syariah/SPAJT Syariah/Pengajuan Pelayanan Polis" dan dilampirkan bersama SPAJ Syariah ini.',
    pdp_notice_bar_have_other_assurance_1: '<asterisk>*</asterisk>Bila di kemudian hari ditemukan ada Polis yang <i>issued</i> di Perusahaan selain Prudential Syariah sebelum SPAJ Syariah ini <i>issued</i> , Kami berhak untuk mereview keputusan SPAJ Syariah ini dengan keputusan pembatalan Polis.',
    pdp_notice_bar_have_other_assurance_2: '<asterisk>**</asterisk>Polis <i>Substandard</i>  adalah Polis yang pengajuan Asuransi Jiwa/Kesehatan atas diri Calon Peserta Yang Diasuransikan dapat diterima dengan Kontribusi khusus atau terdapat pengecualian atau dapat ditolak/ditangguhkan.',
    pdp_notice_bar_have_other_assurance_3: '<asterisk>***</asterisk>Jika Peserta Yang Diasuransikan juga memiliki asuransi kesehatan dari perusahaan asuransi jiwa lainnya yang memberikan Manfaat Asuransi sejenis bagi Penyakit, Cedera atau Ketidakmampuan, atau juga mendapatkan penggantian atas segala biaya perawatan atas Penyakit, Cedera atau Ketidakmampuan dari perusahaan manapun yang dipertanggungkan dalam Polis ini, maka pada waktu terjadi klaim, Anda wajib menyampaikan surat koordinasi manfaat yang diterbitkan dan ditandatangani oleh pejabat yang berwenang dari perusahaan asuransi jiwa atau perusahaan lain tersebut, dan Kami hanya akan membayarkan biaya yang tersisa sampai maksimum jumlah yang dipertanggungkan berdasarkan Polis ini, setelah dikurangi jumlah total dari seluruh manfaat asuransi yang telah dibayarkan oleh perusahaan asuransi jiwa lain atau dari semua penggantian yang telah dibayarkan oleh perusahaan manapun atas segala biaya perawatan untuk Penyakit, Cedera dan Ketidakmampuan tersebut.',
    privacy_policy_link: 'https://bit.ly/PRUSyariahPemberitahuanPrivasi',
    pru_pay_link: 'https://payment.prudential.co.id',
  },
  conventional: {
    mainParticipant: i18n.t('Epos:main_insured_candidate'),
    mainParticipantU17: 'Orang Tua (Bila Calon Tertanggung Utama berusia dibawah 17 Tahun)',
    mainParticipantU17_1: 'Orang Tua (Bila Calon Tertanggung berusia dibawah 17 Tahun)',
    participant: i18n.t('Epos:prospective_insured'),
    additionalParticipant: i18n.t('Epos:additional_insured_candidate'),
    companyName: 'PT Prudential Life Assurance',
    companyNameShort: 'Prudential Indonesia',
    additionalCompanyName: '',
    premiContribution: i18n.t('Epos:premi'),
    spaj: 'SPAJ',
    spajT: 'SPAJT',
    additionalLabel: '',
    payor: i18n.t('Epos:premium_payer_candidate'),
    period: i18n.t('Epos:period_insured'),
    candidate: i18n.t('Epos:prospective_policyholder'),
    candidateTitle: `${i18n.t('Epos:prospective_policyholder')} (${i18n.t('Epos:main_insured_candidate')})`,
    candidateTitleOne: `Calon Tertanggung Tambahan`,
    candidateTitleTwo: `Calon Tertanggung Tambahan 2 `,
    cost: 'Biaya',
    compensation: i18n.t('Epos:sum_insured'),
    insurerManager: 'Penanggung',
    insured: 'Pertanggungan',
    company: `Prudential Indonesia`,
    lifeAssured: `Tertanggung`,
    lifeAssured_1: `Tertanggung`,
    lifeAssured_2: 'Tertanggung',
    lifeAssured_3: '',
    insurancePayor: 'Tertanggung Utama',
    not_having_npwp_disclaimer:
      'SAYA memberikan alasan tidak mengisi NPWP pada SPAJ ini dengan jujur dan benar. SAYA bertanggung jawab sepenuhnya untuk segala risiko yang disebabkan jika SAYA tidak mengisi alasan dengan jujur dan benar.',
    email_disclaimer: {
      ph: i18n.t('Epos:email_disclaimer_ph'),
      premi: i18n.t('Epos:conv_email_disclaimer_premi'),
      tu: i18n.t('Epos:conv_email_disclaimer_tu'),
    },
    info_link: 'https://bit.ly/PRUPihakKetiga',
    privacy_policy_link: 'https://bit.ly/PRUPemberitahuanPrivasi',
    zone: 'Wilayah Pertanggungan',
    premiumAndPayment: i18n.t('Epos:premium_and_payment'),
    annualPremium: i18n.t('Epos:annual_premium'),
    enterAnnualPremium: i18n.t('Epos:enter_annual_premium'),
    regularPremium: i18n.t('Epos:regular_premium'),
    enterRegularPremium: i18n.t('Epos:enter_regular_premium'),
    pdp_notice_bar_PH: 'Calon Pemegang Polis harus menjawab semua pertanyaan secara benar, lengkap dan jujur, mengenai Sumber Penghasilan Rutin Per Bulan dan Sumber Dana, Total Penghasilan Rutin Per Bulan dan Nilai Harta Kekayaan Bersih (<i>Net Worth</i>), sebagaimana kolom pertanyaan tersebut di atas. Apabila di kemudian hari ditemukan fakta bahwa pengisian data diri Calon Pemegang Polis tersebut tidak benar, tidak lengkap dan/atau tidak jujur, maka hal tersebut dapat menyebabkan keputusan <i>underwriting</i> (seleksi risiko) yang berbeda maupun mengakibatkan konsekuensi sebagaimana diatur dalam ketentuan Polis, termasuk hingga pengakhiran Polis secara sepihak oleh Prudential Indonesia. Apabila Calon Pemegang Polis ingin menambahkan informasi yang belum dituliskan di SPAJ ini, mohon menuliskannya pada "Surat Pernyataan/Amendemen untuk SPAJ/SPAJT/Pengajuan Pelayanan Polis" dan dilampirkan bersama SPAJ ini.',
    pdp_notice_bar_Payor: 'Calon Pembayar Premi harus menjawab semua pertanyaan secara benar, lengkap dan jujur, mengenai Sumber Penghasilan Rutin Per Bulan dan Sumber Dana, Total Penghasilan Rutin Per Bulan dan Nilai Harta Kekayaan Bersih (<i>Net Worth</i>), sebagaimana kolom pertanyaan tersebut di atas. Apabila di kemudian hari ditemukan fakta bahwa pengisian data diri Calon Pembayar Premi tersebut tidak benar, tidak lengkap dan/atau tidak jujur, maka hal tersebut dapat menyebabkan keputusan <i>underwriting</i> (seleksi risiko) yang berbeda maupun mengakibatkan konsekuensi sebagaimana diatur dalam ketentuan Polis, termasuk hingga pengakhiran Polis secara sepihak oleh Prudential Indonesia. Apabila Calon Pembayar Premi ingin menambahkan informasi yang belum dituliskan di SPAJ ini, mohon menuliskannya pada "Surat Pernyataan/Amendemen untuk SPAJ/SPAJT/Pengajuan Pelayanan Polis" dan dilampirkan bersama SPAJ ini.',
    pdp_notice_bar_have_other_assurance_1: '<asterisk>*</asterisk>Bila di kemudian hari ditemukan ada Polis yang <i>issued</i> di Perusahaan selain Prudential Indonesia sebelum SPAJ ini <i>issued</i>, Kami berhak untuk mereview keputusan SPAJ ini dengan keputusan pembatalan Polis.',
    pdp_notice_bar_have_other_assurance_2: '<asterisk>**</asterisk>Polis <i>Substandard</i> adalah Polis yang pengajuan asuransi jiwa/kesehatan atas diri Calon Tertanggung dapat diterima dengan Premi khusus atau dapat ditolak/ditangguhkan.',
    pdp_notice_bar_have_other_assurance_3: '<asterisk>***</asterisk>Jika Tertanggung juga memiliki asuransi kesehatan dari perusahaan asuransi jiwa lainnya yang memberikan pertanggungan sejenis bagi Penyakit, Cedera atau Ketidakmampuan, atau juga mendapatkan penggantian atas segala biaya perawatan atas Penyakit, Cedera atau Ketidakmampuan dari perusahaan manapun yang dipertanggungkan dalam Polis ini, maka pada waktu terjadi klaim, Anda wajib menyampaikan surat koordinasi manfaat yang diterbitkan dan ditandatangani oleh pejabat yang berwenang dari perusahaan asuransi jiwa atau perusahaan lain tersebut, dan Kami hanya akan membayarkan biaya yang tersisa sampai maksimum jumlah yang dipertanggungkan berdasarkan Polis ini, setelah dikurangi jumlah total dari seluruh manfaat asuransi yang telah dibayarkan oleh perusahaan asuransi jiwa lain atau dari semua penggantian yang telah dibayarkan oleh perusahaan manapun atas segala biaya perawatan untuk Penyakit, Cedera dan Ketidakmampuan tersebut.',
    pru_pay_link: 'https://payment.prudential.co.id',
  },
};

const getWRPolicyHolderStatement = (spaj: string, companyName: string) => {
  const statement = [
    <Text style={[plaiStyles.fontGrey33Thin, plaiStyles.lineH20, plaiStyles.mt16]}>
      SAYA sebagai Calon Pemegang Polis menyatakan bahwa memahami mengenai hal-hal tersebut dibawah ini :
    </Text>,
    <Text style={[plaiStyles.fontGrey33Thin, plaiStyles.lineH20, plaiStyles.mt16]}>
      1. SAYA mengerti mengenai produk yang SAYA pilih dan menyetujui apabila SAYA mengajukan Surat Pengajuan Asuransi
      Jiwa ({spaj}) dan pengajuan tersebut disetujui oleh {companyName} untuk selanjutnya diterbitkan menjadi Polis.
    </Text>,
    <Text style={[plaiStyles.fontGrey33Thin, plaiStyles.lineH20, plaiStyles.mt16]}>
      2. SAYA telah membaca dan memahami hasil analisa dan rekomendasi dari Analisa “Mengerti Kebutuhan Anda” ini serta
      memastikan bahwa semua jawaban atas pertanyaan yang disampaikan adalah jujur, benar dan lengkap.
    </Text>,
    <Text style={[plaiStyles.fontGrey33Thin, plaiStyles.lineH20, plaiStyles.mt16]}>
      3. SAYA menyatakan bahwa produk asuransi dan / atau pilihan investasi yang sudah SAYA pilih sepenuhnya merupakan
      keputusan SAYA sendiri secara mandiri dan segala risiko yang timbul menjadi tanggung jawab SAYA, termasuk apabila
      SAYA memilih jenis produk dan / atau pilihan investasi yang tidak sesuai dengan hasil analisa dan rekomendasi dari
      Analisa “Mengerti Kebutuhan Anda” ini.
    </Text>,
    <Text style={[plaiStyles.fontGrey33Thin, plaiStyles.lineH20, plaiStyles.mt16]}>
      4. SAYA menyetujui bahwa {companyName} dari waktu ke waktu dapat menggunakan informasi yang SAYA berikan dalam
      ilustrasi penjualan ini, termasuk memberikannya kepada pihak ketiga sepanjang dianggap perlu oleh {companyName}{' '}
      dalam rangka memberikan pelayanan atas ilustrasi penjualan, dengan tunduk pada peraturan perundang-undangan yang
      berlaku.
    </Text>,
  ];

  return statement;
};

function getDisclaimerProtection(props: {productKey: string, policyType?: TPolicyType}): UpfrontMapping.Dislaimer[]{
  const { policyType, productKey } = props
  const { premiContribution, lifeAssured } = WR_SHARIA_CONVENT[policyType || 'conventional'];
  const additionalSpajValidationContent = additionalQuestionValidation[productKey || ''] || i18n.t('Epos:additional_question_title', { premiContribution, lifeAssured })
  const additionalProductOfferingContent = getOfferingProductWording(
    productKey,
    productType(productKey),
    policyType as string,
  )
  return [
  {
    code: 'dataProtection1',
    value: additionalSpajValidationContent,
  },
  {
    code: 'dataProtection2',
    value: additionalProductOfferingContent,
  },
];
}

export { WR_SHARIA_CONVENT, getWRPolicyHolderStatement, getDisclaimerProtection };
