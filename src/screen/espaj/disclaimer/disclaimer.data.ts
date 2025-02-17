import i18next from 'i18next';
import { PCPPParams, SKKPKPParams, TDisclaimerDescItem, TDisclaimerItem } from './disclaimer.type';
import { TPolicyType, ProductType, WR_SHARIA_CONVENT, TProductCode } from '../../../utilities';

type TSurplusUnderwritingItem = {
  title: string
  detail: string
  key: string
}

export const getAdditionalDisclaimerRiderList = (
  code: string,
  riderName: string,
  productNameRAW: string,
  plan: string,
  period: string,
  primeSaver: string,
  companyName: string,
  isSharia: boolean,
): TDisclaimerItem => {
  const { insured } = WR_SHARIA_CONVENT[isSharia ? 'sharia' : 'conventional'];
  const wordingSaver = code === 'H161' || code === 'H165' ? 'PruWell Saver :' : 'PruPrime Saver :';
  const productName = productNameRAW.replace('PRU', '<b>PRU</b>');
  const riderNameBold = riderName.replace('PRU', '<b>PRU</b>');
  const wordingSaverBold = wordingSaver.replace('Pru', '<b>PRU</b>');
  const additionalDisclaimer = {
    label: i18next.t('Epos:additional_insurance_selection_statement'),
    key: 'PPAT',
    desc: [
      { id: '', key: i18next.t('Epos:additional_insurance_selection_statement') },
      { id: '', key: i18next.t('Epos:section_d_additional_insurance_selection_statement') },
      { id: '', key: i18next.t('Epos:additional_insurance_benefit_agreement_statement') },
      { id: '', key: i18next.t('Epos:additional_insurance_not_selected') },
    ],
    information: 'Pernyataan Pemilihan Asuransi Tambahan',
  };

  // Nanti kalo emang bakal banyak disclaimer kyk gini, kemungkinan bakal di bikin function sendiri.
  if (['H171', 'H1H7', 'H1H1', 'H161', 'H165', 'H1H3', 'H1H5'].includes(code)) {
    additionalDisclaimer.desc = [
      { id: '', key: i18next.t('Epos:section_d_additional_insurance_selection_statement') },
      { id: '', key: i18next.t('Epos:additional_insurance_benefit_agreement_statement') },
      { id: '', key: i18next.t('Epos:additional_insurance_with_rider', { riderName: riderNameBold }) },
      { id: '', key: i18next.t('Epos:plan_type', { plan }) },
      { id: '', key: i18next.t('Epos:saver_plan', { wordingSaver: wordingSaverBold, primeSaver }) },
      { id: '', key: i18next.t('Epos:coverage_period_until_age', { period, insured }) },
      { id: '', key: ' ' },
      { id: '', key: i18next.t('Epos:noteRiders') },
      {
        id: '',
        key: i18next.t('Epos:rider_coverage_not_exceed_product_coverage', {
          riderName: riderNameBold,
          productName,
          insured,
        }),
      },
      {
        id: '',
        key: i18next.t(
          `Epos:${isSharia ? 'single_health_insurance_policy_sharia' : 'single_health_insurance_policy'}`,
          { companyName },
        ),
      },
    ];
  }

  return additionalDisclaimer;
};

export const getSalesIlustrationStatement = (productType: ProductType, spaj: string, companyName: string): TDisclaimerItem => {
  const LIST: Record<ProductType, Record<string, unknown>[]> = {
    TRD: [
      {
        id: '',
        key: i18next.t('Epos:policyholder_understanding_statement'),
      },
      {
        id: '1.	',
        key: i18next.t('Epos:understanding_and_approval_statement', { spaj, companyName }),
      },
      {
        id: '2.	',
        key: i18next.t('Epos:understanding_and_confirmation_statement'),
      },
      {
        id: '3.	',
        key: i18next.t('Epos:independent_decision_and_risk_acknowledgment'),
      },
    ],
    UL: [
      {
        id: '',
        key: i18next.t('Epos:policyholder_understanding_statement'),
      },
      {
        id: '1.	',
        key: i18next.t('Epos:understanding_and_approval_statement', { spaj, companyName }),
      },
      {
        id: '2.	',
        key: i18next.t('Epos:understanding_and_confirmation_statement'),
      },
      {
        id: '3.	',
        key: i18next.t('Epos:independent_decision_and_risk_acknowledgment_unitLink'),
      },
      {
        id: '4.	',
        key: i18next.t('Epos:data_usage_and_third_party_sharing_approval', { companyName }),
      },
    ]
  }
  return {
    label: i18next.t('Epos:sales_illustration_statement'),
    key: 'PIP',
    desc: LIST[productType],
    information: 'Pernyataan Ilustrasi Penjualan',
  }
};

export const getContractShariaContent = (
  productName: string,
  productCode: TProductCode,
  productType: ProductType,
): TDisclaimerItem => {
  const AKAD_DEFAULT: Record<ProductType, Record<string, unknown>[]> = {
    TRD: [
      {
        id: '',
        key: `1. SAYA selaku Pemegang Polis dengan ini menyatakan hal-hal sebagai berikut:`,
      },
      {
        id: '',
        key: `a. SAYA setuju untuk memberikan sejumlah Iuran <i>Tabarru’</i> minimum sebesar 50% (lima puluh persen) dari Kontribusi yang dibebankan atas Kontribusi yang dibayarkan sesuai Akad <i>Tabarru’</i> dengan tujuan untuk saling tolong menolong apabila ada peserta yang diasuransikan atau para peserta yang diasuransikan mengalami musibah. Apabila terjadi suatu peristiwa yang diasuransikan atas diri peserta yang diasuransikan atau para peserta yang diasuransikan dan atas peristiwa tersebut harus dibayarkan Manfaat Asuransi, maka pembayaran Asuransi tersebut akan dibebankan atas Dana <i>Tabarru’</i>.`,
      },
      {
        id: '',
        key: `b. SAYA setuju atas pemrosesan kepesertaan, penerbitan Polis serta pengelolaan risiko asuransi bagi para Peserta Yang Diasuransikan dikenakan <i>Ujrah</i> Pengelolaan Risiko maksimum sebesar 50% (lima puluh persen) dari Kontribusi yang dibayarkan sejak Tanggal Mulai Kepesertaan, kecuali ditentukan lain berdasarkan Polis.`,
      },
      {
        id: '',
        key: `c. SAYA setuju memberikan kuasa kepada PT Prudential Sharia Life Assurance (Prudential Syariah) (selanjutnya disebut sebagai “Pengelola”) sesuai Akad <i>Wakalah bil Ujrah</i> untuk mengelola asuransi kesehatan syariah yang meliputi namun tidak terbatas pada kegiatan mengadministrasikan, mengelola dana, membayar klaim, <i>underwriting</i>, mengelola portofolio risiko, memasarkan dan melakukan transaksi atas nama SAYA. Atas hal tersebut Pengelola berhak untuk memotong sejumlah biaya (<i>ujrah</i>) sesuai ketentuan yang berlaku pada Polis.`,
      },
      {
        id: '',
        key: `d. SAYA setuju Iuran <i>Tabarru’</i> yang telah diberikan sebagaimana dimaksud butir (a) di atas akan dimasukkan ke dalam Dana <i>Tabarru’</i> dan kemudian akan diinvestasikan oleh Pengelola dengan Akad <i>Wakalah bil Ujrah</i>.`,
      },
      {
        id: '',
        key: `e. Dengan ini SAYA mengikhlaskan pembagian <i>surplus underwriting</i> yang terbentuk dari Dana <i>Tabarru’</i>, jika ada, dengan pembagian 20% ditahan dalam Dana <i>Tabarru’</i>, 40% diserahkan kepada Pengelola dan 40% dibagikan kepada Pemegang Polis yang berhak sesuai dengan Ketentuan dan Persyaratan yang berlaku. Apabila Dana <i>Tabarru’</i> tidak cukup untuk membayar Manfaat Asuransi, maka Pengelola akan menalangi kekurangan pembayaran Manfaat Asuransi tersebut dengan menggunakan Akad <i>Qardh</i>. Pengembalian <i>Qardh</i> kepada Pengelola akan dilakukan dari <i>surplus underwriting</i> yang terbentuk dari Dana <i>Tabarru’</i> dan/atau dari Dana <i>Tabarru’</i> itu sendiri.`,
      },
      {
        id: '',
        key: `2. SAYA selaku Peserta Yang Diasuransikan dengan ini menyatakan sebagai berikut: \nSebagai calon anggota kumpulan Peserta Yang Diasuransikan pada Asuransi Kesehatan Syariah PT Prudential Sharia Life Assurance (Prudential Syariah), dengan ini menyatakan diri sebagai anggota kumpulan Peserta Yang Diasuransikan pada Asuransi Kesehatan Syariah PT Prudential Sharia Life Assurance (Prudential Syariah).`,
      },
    ],
    UL: [
      {
        id: '',
        key: `1. SAYA selaku Pemegang Polis dengan ini menyatakan hal-hal sebagai berikut:`,
      },
      {
        id: '',
        key: `a. SAYA setuju untuk memberikan sejumlah Iuran <i>Tabarru’</i> sesuai Akad <i>Tabarru’</i> dengan tujuan untuk saling tolong menolong apabila ada peserta yang diasuransikan atau para peserta yang diasuransikan mengalami musibah. Apabila terjadi suatu peristiwa yang diasuransikan atas diri peserta yang diasuransikan atau para peserta yang diasuransikan dan atas peristiwa tersebut harus dibayarkan Manfaat Asuransi, maka pembayaran Asuransi tersebut akan dibebankan atas Dana <i>Tabarru’</i>.`,
      },
      {
        id: '',
        key: 'b. SAYA setuju atas pengelolaan risiko berdasarkan Manfaat Asuransi bagi para peserta yang diasuransikan dikenakan <i>Ujrah</i> Pengelolaan Risiko sebesar 50% (lima puluh persen) dari Biaya Asuransi yang dibebankan setiap bulan sejak Tanggal Mulai Kepesertaan, kecuali ditentukan lain berdasarkan Polis.',
      },
      {
        id: '',
        key: 'Catatan: Biaya Asuransi dibebankan setiap bulan sejak Tanggal Jatuh Tempo Pembayaran Kontribusi dan dibayar melalui pembatalan Saldo Unit Kontribusi Berkala yang dimiliki Calon Pemegang Polis.',
      },
      {
        id: '',
        key: 'c. SAYA setuju memberikan kuasa kepada PT Prudential Sharia Life Assurance (Prudential Syariah) (selanjutnya disebut sebagai “Pengelola”) sesuai Akad <i>Wakalah bil Ujrah</i> untuk mengelola asuransi jiwa syariah yang meliputi namun tidak terbatas pada kegiatan mengadministrasikan, mengelola dana, mengelola Dana Investasi <b>PRU</b>Link Syariah, membayar klaim, <i>underwriting</i>, mengelola portofolio risiko, memasarkan dan melakukan transaksi atas nama SAYA. Atas hal tersebut Pengelola berhak untuk memotong sejumlah biaya (<i>ujrah</i>) sesuai ketentuan yang berlaku yang ditetapkan oleh Pengelola.',
      },
      {
        id: '',
        key: 'd. SAYA setuju Iuran <i>Tabarru’</i> yang telah diberikan sebagaimana dimaksud butir (a) di atas akan dimasukkan ke dalam Dana <i>Tabarru’</i> dan kemudian akan diinvestasikan oleh Pengelola dengan Akad <i>Wakalah bil Ujrah.</i>',
      },
      {
        id: '',
        key: 'e. Dengan ini SAYA mengikhlaskan pembagian <i>surplus underwriting</i>  yang terbentuk dari Dana <i>Tabarru’</i>, jika ada, dengan pembagian 20% ditahan dalam Dana <i>Tabarru’</i>, 15% diserahkan kepada Pengelola dan 65% dibagikan kepada Pemegang Polis yang berhak sesuai dengan Ketentuan dan Persyaratan yang berlaku. Apabila Dana <i>Tabarru’</i> tidak cukup untuk membayar Manfaat Asuransi (selain yang berupa Nilai Tunai), maka Pengelola akan menalangi kekurangan pembayaran Manfaat Asuransi tersebut dengan menggunakan Akad <i>Qardh</i>. Pengembalian <i>Qardh</i> kepada Pengelola akan dilakukan dari <i>surplus underwriting</i>  yang terbentuk dari Dana <i>Tabarru’</i> dan/atau dari Dana <i>Tabarru’</i> itu sendiri.',
      },
      {
        id: '',
        key: '2. SAYA selaku Peserta Yang Diasuransikan dengan ini menyatakan sebagai berikut:',
      },
      {
        id: '',
        key: `Sebagai calon anggota kumpulan Peserta Yang Diasuransikan pada Asuransi Jiwa Syariah PT Prudential Sharia Life Assurance (Prudential Syariah), dengan ini menyatakan diri sebagai anggota kumpulan Peserta Yang Diasuransikan pada Asuransi Jiwa Syariah PT Prudential Sharia Life Assurance (Prudential Syariah).`,
      },
    ],
  };

  const AKAD_PWMS = [
    {
      id: '1. ',
      key: `SAYA selaku Pemegang Polis dengan ini menyatakan hal-hal sebagai berikut:`,
    },
    {
      id: 'a. ',
      key: `SAYA setuju untuk memberikan sejumlah Iuran <i>Tabarru’</i> minimum sebesar 50% (lima puluh persen) dari Kontribusi yang dibebankan atas Kontribusi yang dibayarkan sesuai Akad <i>Tabarru’</i> dengan tujuan untuk saling tolong menolong apabila ada peserta yang diasuransikan atau para peserta yang diasuransikan mengalami musibah. Apabila terjadi suatu peristiwa yang diasuransikan atas diri peserta yang diasuransikan atau para peserta yang diasuransikan dan atas peristiwa tersebut harus dibayarkan Manfaat Asuransi, maka pembayaran Asuransi tersebut akan dibebankan atas Dana <i>Tabarru’</i>.`,
    },
    {
      id: 'b. ',
      key: `SAYA setuju atas pemrosesan kepesertaan, penerbitan Polis serta pengelolaan risiko asuransi bagi para Peserta Yang Diasuransikan dikenakan <i>Ujrah</i> Pengelolaan Risiko maksimum sebesar 50% (lima puluh persen) dari Kontribusi yang dibayarkan sejak Tanggal Mulai Kepesertaan, kecuali ditentukan lain berdasarkan Polis.`,
    },
    {
      id: 'c. ',
      key: `SAYA setuju memberikan kuasa kepada PT Prudential Sharia Life Assurance (Prudential Syariah) (selanjutnya disebut sebagai “Pengelola”) sesuai Akad <i>Wakalah bil Ujrah</i> untuk mengelola asuransi kesehatan syariah yang meliputi namun tidak terbatas pada kegiatan mengadministrasikan, mengelola dana, membayar klaim, <i>underwriting</i>, mengelola portofolio risiko, memasarkan dan melakukan transaksi atas nama SAYA. Atas hal tersebut Pengelola berhak untuk memotong sejumlah biaya (<i>ujrah</i>) sesuai ketentuan yang berlaku pada Polis.`,
    },
    {
      id: 'd. ',
      key: `SAYA setuju Iuran <i>Tabarru</i>’ yang telah diberikan sebagaimana dimaksud butir (a) di atas akan dimasukkan ke dalam Dana <i>Tabarru’</i> dan kemudian akan diinvestasikan oleh Pengelola dengan Akad <i>Wakalah bil Ujrah</i>.`,
    },
    {
      id: 'e. ',
      key: `Dengan ini SAYA mengikhlaskan pembagian <i>surplus underwriting</i> yang terbentuk dari Dana <i>Tabarru’</i>, jika ada, dengan pembagian 20% ditahan dalam Dana <i>Tabarru’</i>, 40% diserahkan kepada Pengelola dan 40% dibagikan kepada Pemegang Polis yang berhak sesuai dengan Ketentuan dan Persyaratan yang berlaku. Apabila Dana <i>Tabarru‘</i> tidak cukup untuk membayar Manfaat Asuransi, maka Pengelola akan menalangi kekurangan pembayaran Manfaat Asuransi tersebut dengan menggunakan Akad <i>Qardh</i>. Pengembalian <i>Qardh</i> kepada Pengelola akan dilakukan dari <i>surplus underwriting</i> yang terbentuk dari Dana <i>Tabarru’</i> dan/atau dari Dana <i>Tabarru‘</i> itu sendiri.`,
    },
    {
      id: '2. ',
      key: `SAYA selaku Peserta Yang Diasuransikan dengan ini menyatakan sebagai berikut:`,
    },
    {
      id: '-',
      key: `Sebagai calon anggota kumpulan Peserta Yang Diasuransikan pada Asuransi Kesehatan Syariah PT Prudential Sharia Life Assurance (Prudential Syariah), dengan ini menyatakan diri sebagai anggota kumpulan Peserta Yang Diasuransikan pada Asuransi Kesehatan Syariah PT Prudential Sharia Life Assurance (Prudential Syariah).`,
    },
  ]

  const AKAD_PNGS = [
    {
      id: '1. ',
      key: `SAYA selaku Pemegang Polis dengan ini menyatakan hal-hal sebagai berikut:`,
    },
    {
      id: 'a. ',
      key: `SAYA setuju untuk memberikan sejumlah Iuran <i>Tabarru</i>’ sesuai Akad <i>Tabarru</i>’ dengan tujuan untuk saling tolong menolong apabila ada peserta yang diasuransikan atau para peserta yang diasuransikan mengalami musibah. Apabila terjadi suatu peristiwa yang diasuransikan atas diri peserta yang diasuransikan atau para peserta yang diasuransikan dan atas peristiwa tersebut harus dibayarkan Manfaat Asuransi, maka pembayaran Asuransi tersebut akan dibebankan atas Dana <i>Tabarru</i>’.`,
    },
    {
      id: 'b. ',
      key: `SAYA setuju atas pengelolaan risiko berdasarkan Manfaat Asuransi bagi para peserta yang diasuransikan dikenakan <i>Ujrah</i> Pengelolaan Risiko sebesar 50% (lima puluh persen) dari Biaya Asuransi yang dibebankan setiap bulan sejak Tanggal Mulai Kepesertaan, kecuali ditentukan lain berdasarkan Polis.`,
    },
    {
      id: '',
      key: 'Catatan: Biaya Asuransi dibebankan setiap bulan sejak Tanggal Jatuh Tempo Pembayaran Kontribusi dan dibayar melalui pembatalan Saldo Unit Kontribusi Berkala yang dimiliki Calon Pemegang Polis.',
    },
    {
      id: 'c. ',
      key: `SAYA setuju memberikan kuasa kepada PT Prudential Sharia Life Assurance (Prudential Syariah) (selanjutnya disebut sebagai “Pengelola”) sesuai Akad <i>Wakalah bil Ujrah</i> untuk mengelola asuransi jiwa syariah yang meliputi namun tidak terbatas pada kegiatan mengadministrasikan, mengelola dana, mengelola Dana Investasi <b>PRU</b>Link Syariah, membayar klaim, <i>underwriting</i>, mengelola portofolio risiko, memasarkan dan melakukan transaksi atas nama SAYA. Atas hal tersebut Pengelola berhak untuk memotong sejumlah biaya (<i>ujrah</i>) sesuai ketentuan yang berlaku yang ditetapkan oleh Pengelola.`,
    },
    {
      id: 'd. ',
      key: `SAYA setuju Iuran <i>Tabarru</i>’ yang telah diberikan sebagaimana dimaksud butir (a) di atas akan dimasukkan ke dalam Dana <i>Tabarru</i>’ dan kemudian akan diinvestasikan oleh Pengelola dengan Akad <i>Wakalah bil Ujrah</i>.`,
    },
    {
      id: 'e. ',
      key: `Dengan ini SAYA mengikhlaskan pembagian <i>surplus underwriting</i> yang terbentuk dari Dana <i>Tabarru</i>’, jika ada, dengan pembagian 20% ditahan dalam Dana <i>Tabarru</i>’, 15% diserahkan kepada Pengelola dan 65% dibagikan kepada Pemegang Polis yang berhak sesuai dengan Ketentuan dan Persyaratan yang berlaku. Apabila Dana <i>Tabarru</i>’ tidak cukup untuk membayar Manfaat Asuransi (selain yang berupa Nilai Tunai), maka Pengelola akan menalangi kekurangan pembayaran Manfaat Asuransi tersebut dengan menggunakan Akad <i>Qardh</i>. Pengembalian <i>Qardh</i> kepada Pengelola akan dilakukan dari <i>surplus underwriting</i> yang terbentuk dari Dana <i>Tabarru</i>’ dan/atau dari Dana <i>Tabarru</i>’ itu sendiri.`,
    },
    {
      id: '2. ',
      key: `SAYA selaku Peserta Yang Diasuransikan dengan ini menyatakan sebagai berikut:`,
    },
    {
      id: '-',
      key: `Sebagai calon anggota kumpulan Peserta Yang Diasuransikan pada Asuransi Kesehatan Syariah PT Prudential Sharia Life Assurance (Prudential Syariah), dengan ini menyatakan diri sebagai anggota kumpulan Peserta Yang Diasuransikan pada Asuransi Kesehatan Syariah PT Prudential Sharia Life Assurance (Prudential Syariah).`,
    },
  ]

  const AKAD_PRUCERAH = [
    {
      id: '1. ',
      key: `SAYA selaku Pemegang Polis dengan ini menyatakan hal-hal sebagai berikut:`,
    },
    {
      id: 'a. ',
      key: `SAYA setuju untuk memberikan sejumlah Iuran Tabarru’ sebesar 3% (tiga persen) dari Kontribusi yang dibebankan atas Kontribusi yang dibayarkan sesuai Akad Tabarru’ dengan tujuan untuk saling tolong menolong apabila ada peserta yang diasuransikan atau para peserta yang diasuransikan mengalami musibah. Apabila terjadi suatu peristiwa yang diasuransikan atas diri peserta yang diasuransikan atau para peserta yang diasuransikan dan atas peristiwa tersebut harus dibayarkan Manfaat Asuransi, maka pembayaran Asuransi tersebut akan dibebankan atas Dana Tabarru’.`,
    },
    {
      id: 'b. ',
      key: `SAYA setuju atas pemrosesan kepesertaan, penerbitan Polis serta pengelolaan risiko asuransi bagi para Peserta Yang Diasuransikan dikenakan Ujrah dari Kontribusi yang dibayarkan sejak Tanggal Mulai Kepesertaan, kecuali ditentukan lain berdasarkan Polis. Besar Ujrah sebagaimana tercantum pada Ringkasan Informasi Produk dan Layanan Versi Personal (Ilustrasi) Asuransi Jiwa Syariah PRUCerah Plan ${productName} (${productName}).`,
    },
    {
      id: 'c. ',
      key: `SAYA setuju untuk mengalokasikan Porsi Nilai Tunai atas Kontribusi ke Dana Nilai Tunai yang dibayar sejak Tanggal Mulai Kepesertaan, kecuali ditentukan lain berdasarkan Polis. Besar Porsi Nilai Tunai sebagaimana tercantum pada Ilustrasi PRUCerah.`,
    },
    {
      id: 'd. ',
      key: `SAYA setuju memberikan kuasa kepada PT Prudential Sharia Life Assurance (Prudential Syariah) (selanjutnya disebut sebagai “Pengelola”) sesuai Akad Wakalah bil Ujrah untuk mengelola asuransi jiwa syariah yang meliputi namun tidak terbatas pada kegiatan mengadministrasikan, mengelola Investasi Dana Tabarru‘, membayar klaim, underwriting, mengelola portofolio risiko, memasarkan dan melakukan transaksi atas nama SAYA. Atas hal tersebut Pengelola berhak untuk memotong sejumlah biaya (ujrah) sesuai ketentuan yang berlaku pada Polis.`,
    },
    {
      id: 'e. ',
      key: `SAYA setuju memberikan kuasa kepada Pengelola sesuai Akad Wakalah bil Ujrah untuk mengelola investasi Dana Nilai Tunai. Atas hal tersebut Pengelola berhak untuk memotong sejumlah biaya (ujrah) sesuai ketentuan yang berlaku pada Polis.`,
    },
    {
      id: 'f. ',
      key: `SAYA setuju Iuran Tabarru’ yang telah diberikan sebagaimana dimaksud butir (a) di atas akan dimasukkan ke dalam Dana Tabarru’ dan kemudian akan diinvestasikan oleh Pengelola dengan Akad Wakalah bil Ujrah.`,
    },
    {
      id: 'g. ',
      key: `Dengan ini SAYA mengikhlaskan pembagian surplus underwriting yang terbentuk dari Dana Tabarru’, jika ada, dengan pembagian 10% ditahan dalam Dana Tabarru’, 10% diserahkan kepada Pengelola dan 80% dibagikan kepada Pemegang Polis yang berhak sesuai dengan Ketentuan dan Persyaratan yang berlaku. Apabila Dana Tabarru’ tidak cukup untuk membayar Manfaat Asuransi (selain yang berupa Nilai Tunai), maka Pengelola akan menalangi kekurangan pembayaran Manfaat Asuransi tersebut dengan menggunakan Akad Qardh. Pengembalian Qardh kepada Pengelola akan dilakukan dari surplus underwriting yang terbentuk dari Dana Tabarru’ dan/atau dari Dana Tabarru’ itu sendiri.`,
    },
    {
      id: '2. ',
      key: `SAYA selaku Peserta Yang Diasuransikan dengan ini menyatakan sebagai berikut:`,
    },
    {
      key: `Sebagai calon anggota kumpulan Peserta Yang Diasuransikan pada Asuransi Jiwa Syariah PT Prudential Sharia Life Assurance (Prudential Syariah), dengan ini menyatakan diri sebagai anggota kumpulan Peserta Yang Diasuransikan pada Asuransi Jiwa Syariah PT Prudential Sharia Life Assurance (Prudential Syariah).`,
    },
  ];

  const AKAD_PRUANUGERAH = [
    {
      id: '1. ',
      key: 'SAYA selaku Pemegang Polis dengan ini menyatakan hal-hal sebagai berikut:',
    },
    {
      subid: 'a. ',
      subkey:
        `SAYA setuju untuk memberikan sejumlah Iuran <i>Tabarru</i>’ sebagaimana tercantum pada Ringkasan Informasi Produk dan Layanan Versi Personal (Ilustrasi) Asuransi Jiwa ${productName} (${productName}) sesuai Akad <i>Tabarru</i>’ dengan tujuan untuk saling tolong menolong apabila ada Peserta Yang Diasuransikan atau para Peserta Yang Diasuransikan mengalami musibah. Apabila terjadi suatu peristiwa yang diasuransikan atas diri Peserta Yang Diasuransikan atau para Peserta Yang Diasuransikan dan atas peristiwa tersebut harus dibayarkan Manfaat Asuransi, maka pembayaran Manfaat Asuransi tersebut akan dibebankan atas Dana <i>Tabarru</i>’`,
    },
    {
      subid: 'b. ',
      subkey:
        'SAYA setuju Iuran <i>Tabarru</i>’ yang telah diberikan sebagaimana dimaksud butir (a) di atas akan dimasukkan ke dalam Dana <i>Tabarru</i>’ dan kemudian akan diinvestasikan oleh PT Prudential Sharia Life Assurance (Prudential Syariah) (selanjutnya disebut sebagai "Pengelola") dengan Akad <i>Wakalah bil Ujrah</i>',
    },
    {
      subid: 'c. ',
      subkey:
        `SAYA setuju untuk memberikan kewenangan mengenai penggunaan Dana <i>Tabarru</i>’ termasuk Pengembalian Dana <i>Tabarru</i>’ kepada SAYA dan/atau para Pemegang Polis ${productName} lainnya apabila terdapat Penebusan Polis. Pengembalian Dana <i>Tabarru</i>’ dihitung dengan perhitungan sebagai berikut:\nTRt = 50% x\nn - t\nx Xt\nn\nn = (120 - usia masuk + 1) x 12\ndi mana:\nTRt : Pengembalian Dana <i>Tabarru</i>’ pada waktu ke-t\nn : Total periode kepesertaan dalam waktu bulanan\nt : Masa waktu berlakunya Polis (dalam bulanan)\nXt : Total Iuran <i>Tabarru</i>’ dari Peserta Yang Diasuransikan pada waktu ke-t`,
    },
    {
      subid: "d. ",
      subkey: "SAYA setuju memberikan kuasa kepada Pengelola sesuai Akad <i>Wakalah bil Ujrah</i> untuk mengelola asuransi jiwa syariah yang meliputi namun tidak terbatas pada kegiatan mengadministrasikan, mengelola dana, membayar klaim, <i>underwriting</i>, mengelola portofolio risiko, memasarkan dan melakukan transaksi atas nama SAYA. Atas hal tersebut Pengelola berhak untuk memotong sejumlah biaya (<i>ujrah</i>) sesuai ketentuan yang berlaku pada Polis."
    },
    {
      subid: "e. ",
      subkey: `SAYA setuju atas pemrosesan kepesertaan, penerbitan Polis serta pengelolaan risiko asuransi bagi para Peserta Yang Diasuransikan dikenakan <i>Ujrah</i> Pengelolaan Risiko dari Kontribusi yang dibayarkan sejak Tanggal Mulai Kepesertaan, kecuali ditentukan lain berdasarkan Polis. Besar Ujrah Pengelolaan Risiko sebagaimana tercantum pada Ilustrasi ${productName}.`
    },
    {
      subid: "f. ",
      subkey: `SAYA setuju untuk mengalokasikan Porsi Nilai Tunai atas Kontribusi ke Dana Nilai Tunai Peserta yang dibayar sejak Tanggal Mulai Kepesertaan, kecuali ditentukan lain berdasarkan Polis. Besar Porsi Nilai Tunai sebagaimana tercantum pada Ilustrasi ${productName}.`
    },
    {
      subid: "g. ",
      subkey: "SAYA setuju memberikan kuasa kepada Pengelola sesuai Akad Mudharabah untuk mengelola investasi Dana Nilai Tunai Peserta. Atas hal tersebut Pengelola berhak untuk menetapkan Nisbah Pengelolaan Dana Nilai Tunai Peserta sesuai ketentuanyang berlaku pada Polis."
    },
    {
      subid: "h. ",
      subkey: "Dengan ini SAYA mengikhlaskan pembagian surplus <i>underwriting</i> yang terbentuk dari Dana <i>Tabarru</i>’, jika ada, dengan pembagian 10% ditahan dalam Dana <i>Tabarru</i>’, 10% diserahkan kepada Pengelola dan 80% dibagikan kepada Pemegang Polis yang berhak sesuai dengan Ketentuan dan Persyaratan yang berlaku. Apabila Dana <i>Tabarru</i>’ tidak cukup untuk membayar Manfaat Asuransi (selain pembayaran Manfaat Asuransi dari Dana Nilai Tunai Peserta), maka Pengelola akan menalangi kekurangan pembayaran Manfaat Asuransi tersebut dengan menggunakan Akad <i>Qardh</i>. Pengembalian <i>Qardh</i> kepada Pengelola akan dilakukan dari surplus <i>underwriting</i> yang terbentuk dari Dana <i>Tabarru</i>’ dan/atau dari Dana <i>Tabarru</i>’ itu sendiri."
    },
    {
      subid: "i. ",
      subkey: "SAYA setuju memberikan kuasa kepada Pengelola untuk mengalokasikan porsi surplus <i>underwriting</i> yang SAYA terima sesuai dengan pilihan SAYA di bawah ini: (PILIH SALAH SATU)\nMentransfer jumlah yang diterima ke Dana Nilai Tunai Peserta.\nMengembalikan jumlah yang diterima ke Dana <i>Tabarru</i>’\nMendonasikan jumlah yang diterima ke Dana <i>Corporate Social Responsibility</i> (CSR) Prudential Syariah\nCatatan: Apabila Calon Pemegang Polis tidak memberikan pilihan atas kuasa di atas, maka porsi surplus underwriting akan dibayarkan ke Rekening Calon Pemegang Polis di Indonesia yang terdaftar di Pengelola."
    },
    {
      id: '2. ',
      key: 'SAYA selaku Peserta Yang Diasuransikan dengan ini menyatakan sebagai berikut:\nSebagai calon anggota kumpulan Peserta Yang Diasuransikan pada Asuransi Jiwa Syariah PT Prudential Sharia Life Assurance(Prudential Syariah), dengan ini menyatakan diri sebagai anggota kumpulan Peserta Yang Diasuransikan pada Asuransi Jiwa Syariah PT Prudential Sharia Life Assurance (Prudential Syariah).',
    },
  ];

  const AKAD_PSKKS = [
    {
      id: '1. ',
      key: 'SAYA selaku Pemegang Polis dengan ini menyatakan hal-hal sebagai berikut:',
    },
    {
      id: 'a. ',
      key: 'SAYA  setuju  untuk  memberikan  sejumlah  Iuran  Tabarru’  sebesar  42%  (empat  puluh  dua  persen)  dari  Kontribusi  yang dibebankan atas Kontribusi yang dibayarkan sesuai Akad Tabarru’ dengan tujuan untuk saling tolong menolong apabila ada peserta yang diasuransikan atau para peserta yang diasuransikan mengalami musibah. Apabila terjadi suatu peristiwa yang diasuransikan atas diri peserta yang diasuransikan atau para peserta yang diasuransikan dan atas peristiwa tersebut harus dibayarkan Manfaat Asuransi, maka pembayaran Asuransi tersebut akan dibebankan atas Dana Tabarru’.',
    },
    {
      id: 'b. ',
      key: 'SAYA  setuju  atas  pemrosesan  kepesertaan,  penerbitan  Polis  serta  pengelolaan  risiko  asuransi  bagi  para  Peserta  Yang Diasuransikan dikenakan Ujrah Pengelolaan Risiko sebesar 58% (lima puluh delapan persen) dari Kontribusi yang dibayarkan sejak Tanggal Mulai Kepesertaan, kecuali ditentukan lain berdasarkan Polis.',
    },
    {
      id: 'c. ',
      key: 'SAYA setuju memberikan kuasa kepada PT Prudential Sharia Life Assurance (Prudential Syariah) (selanjutnya disebut sebagai “Pengelola”) sesuai Akad Wakalah bil Ujrah untuk mengelola asuransi jiwa syariah yang meliputi namun tidak terbatas pada kegiatan mengadministrasikan, mengelola dana, membayar klaim, underwriting, mengelola portofolio risiko, memasarkan dan melakukan transaksi atas nama SAYA. Atas hal tersebut Pengelola berhak untuk memotong sejumlah biaya (ujrah) sesuai ketentuan yang berlaku pada Polis.',
    },
    {
      id: 'd. ',
      key: 'SAYA setuju Iuran Tabarru’ yang telah diberikan sebagaimana dimaksud butir (a) di atas akan dimasukkan ke dalam Dana Tabarru’ dan kemudian akan diinvestasikan oleh Pengelola dengan Akad Wakalah bil Ujrah.',
    },
    {
      id: 'e. ',
      key: 'Dengan  ini SAYA  mengikhlaskan pembagian  surplus underwriting yang terbentuk  dari Dana  Tabarru’, jika  ada, dengan pembagian 20% ditahan dalam Dana Tabarru’, 15% diserahkan kepada Pengelola dan 65% dibagikan kepada Pemegang Polis yang berhak sesuai dengan Ketentuan dan Persyaratan yang berlaku. Apabila Dana Tabarru‘ tidak cukup untuk membayar Manfaat Asuransi, maka Pengelola akan menalangi kekurangan pembayaran Manfaat Asuransi tersebut dengan menggunakan Akad Qardh. Pengembalian Qardh kepada Pengelola akan dilakukan dari surplus underwriting yang terbentuk dari Dana Tabarru’ dan/atau dari Dana Tabarru‘ itu sendiri.',
    },
    {
      id: 'f. ',
      key: 'Dalam hal Peserta Yang Diasuransikan telah mencapai usia lebih dari 99 (sembilan puluh sembilan) tahun, SAYA setuju mengikhlaskan bagian surplus underwriting untuk diberikan kepada Pemegang Polis lain yang memenuhi persyaratan.',
    },
    {
      id: '2. ',
      key: `SAYA selaku Peserta Yang Diasuransikan dengan ini menyatakan sebagai berikut:\nSebagai  calon anggota  kumpulan Peserta Yang Diasuransikan pada  Asuransi Jiwa  Syariah PT Prudential Sharia Life Assurance (Prudential Syariah), dengan ini menyatakan diri sebagai anggota kumpulan Peserta Yang Diasuransikan pada Asuransi Jiwa Syariah PT Prudential Sharia Life Assurance (Prudential Syariah)."
      `,
    },
  ];

  const AKAD: Record<string, any[]> = {
    H15: AKAD_PWMS,
    U13: AKAD_PNGS,
    L1Q: AKAD_PRUANUGERAH,
    E1O: AKAD_PRUCERAH,
    E1OP: AKAD_PRUCERAH,
    C16: AKAD_PSKKS,
  };

  return {
    label: 'Akad',
    key: 'akd',
    desc: AKAD[productCode] || AKAD_DEFAULT[productType],
    information: 'Akad',
  };
};

export const getPremiumPayorStatement = (productType: ProductType, policyType: TPolicyType, spaj: string, companyName: string): TDisclaimerItem => {
  const { premiContribution } = WR_SHARIA_CONVENT[policyType];
  const label = i18next.t('Epos:payment_statement_title', { premiContribution })
  const LIST: Record<ProductType, Record<string, unknown>[]> = {
    TRD: [
      {
        id: '',
        key: i18next.t('Epos:calon_pemegang_polis_menyatakan_traditional'),
      },
      {
        id: '1. ',
        key: i18next.t('Epos:formulir_diisi_dan_ditandatangani_traditional', { spaj }),
      },
      {
        id: '2. ',
        key: i18next.t('Epos:keterangan_formulir_benar_traditional'),
      },
      {
        id: '3. ',
        key: i18next.t('Epos:keterangan_keliru_formulir_traditional', { companyName, spaj }),
      },
    ],
    UL: [
      {
        id: '',
        key: i18next.t('Epos:payment_statement'),
      },
      {
        id: '1. ',
        key: i18next.t('Epos:form_signature_statement', { spaj }),
      },
      {
        id: '2. ',
        key: i18next.t('Epos:form_information_statement'),
      },
      {
        id: '3. ',
        key: i18next.t('Epos:form_information_disclaimer', { companyName, spaj }),
      },
    ]
  }
  return {
    label,
    key: 'PPP',
    desc: LIST[productType],
    information: label,
  }
};

export const getConditionalListTopupUL = (policyType: TPolicyType, companyName: string): TDisclaimerItem => {
  const { insurerManager } = WR_SHARIA_CONVENT[policyType];
  return {
    label: i18next.t('Epos:top_up_statement_title'),
    key: 'PPDT',
    desc: [
      {
        id: '',
        key: i18next.t('Epos:top_up_statement'),
      },
      {
        id: '',
        key: i18next.t('Epos:policyholder_statement'),
      },
      {
        id: '',
        key: i18next.t('Epos:policyholder_understanding'),
      },
      {
        id: '1. ',
        key: i18next.t('Epos:top_up_terms'),
      },
      {
        id: '2. ',
        key: i18next.t('Epos:top_up_unit_price_terms', { insurerManager, companyName }),
      },
      {
        id: '3. ',
        key: i18next.t('Epos:top_up_information', { companyName }),
      },
      {
        id: '4. ',
        key: i18next.t('Epos:unit_price_discrepancy'),
      },
      {
        id: '5. ',
        key: i18next.t('Epos:personal_info_usage', { companyName }),
      },
      {
        id: '6. ',
        key: i18next.t('Epos:contact_information_terms', { companyName }),
      },
      {
        id: '7. ',
        key: i18next.t('Epos:top_up_payment_terms', { companyName }),
      },
      {
        id: '8. ',
        key: i18next.t('Epos:top_up_document_terms', { companyName }),
      },
    ],
    information: i18next.t('Epos:top_up_statement_title'),
  };
};

export const getPHStatementContent = ({
  policyType,
  productCode,
  productName,
  spaj,
  spajT,
  companyName,
  productType,
  rider
}: PCPPParams): TDisclaimerItem => {
  const {
    insurerManager,
    premiContribution,
    lifeAssured,
    companyName: companyNameDefault,
    companyNameShort,
    additionalLabel,
    insured,
    participant
  } = WR_SHARIA_CONVENT[policyType];

  const PCPP_DEFAULT = [
    {
      id: '',
      key: i18next.t('Epos:policyholder_statement', { spaj }),
    },
    {
      id: '',
      key: i18next.t('Epos:statement_of_understanding'),
    },
    {
      id: '1. ',
      key: i18next.t('Epos:statement_of_information_traditional', { spaj, companyName, insurerManager, spajT }),
    },
    {
      id: '2. ',
      key: i18next.t('Epos:statement_of_completion_traditional', { spaj, productName }),
    },
    {
      id: '3. ',
      key: i18next.t('Epos:direct_meeting_with_agent_traditional', { spaj }),
    },
    {
      id: '4. ',
      key: i18next.t('Epos:welcome_call_evaluation_traditional', { insurerManager, spaj }),
    },
    {
      id: '5. ',
      key: i18next.t('Epos:document_request_rights_traditional', { insurerManager }),
    },
    {
      id: '6. ',
      key: i18next.t('Epos:coverage_start_condition_traditional', { insurerManager, spaj }),
    },
    {
      id: '7. ',
      key: i18next.t('Epos:coverage_reassessment_condition_traditional', { insurerManager }),
    },
    {
      id: '8. ',
      key: i18next.t('Epos:premium_payment_condition_traditional', { insurerManager }),
    },
    {
      id: '9. ',
      key: i18next.t('Epos:klaim_manfaat_asuransi_traditional', { insurerManager, spaj }),
    },
    {
      id: '10. ',
      key: i18next.t('Epos:profil_finansial_traditional', { insurerManager, spaj }),
    },
    {
      id: '11. ',
      key: i18next.t('Epos:pemberian_kuasa_traditional'),
    },
    {
      subid: '(i) ',
      subkey: i18next.t('Epos:kuasa_mengumpulkan_data_traditional', { insurerManager, spaj }),
    },
    {
      subid: '(ii) ',
      subkey: i18next.t('Epos:ungkapkan_catatan_traditional', { insurerManager }),
    },
    {
      subid: '-',
      subkey: i18next.t('Epos:kuasa_tidak_dapat_dibatalkan_traditional'),
    },
    {
      id: '12. ',
      key: i18next.t('Epos:kuasa_izin_informasi_kesehatan_traditional', { insurerManager }),
    },
    {
      id: '13. ',
      key: i18next.t('Epos:perbedaan_data_polis_traditional', { spaj }),
    },
    {
      id: '14. ',
      key: i18next.t('Epos:perbedaan_data_polis_traditional', { spaj }),
    },
    {
      id: '15. ',
      key: i18next.t('Epos:premi_pengganti_traditional', { spaj, insurerManager }),
    },
    {
      id: '16. ',
      key: i18next.t('Epos:pemahaman_polis_traditional', { spaj, insurerManager }),
    },
    {
      id: '17. ',
      key: i18next.t('Epos:pembayaran_premi_traditional', { insurerManager }),
    },
    {
      id: '18. ',
      key: i18next.t('Epos:tanda_tangan_elektronik_traditional', { spaj }),
    },
  ];

  const PCPP_PWM = [
    {
      id: '',
      key: `SAYA menyatakan bahwa telah mengerti dan telah mendapat penjelasan sepenuhnya dari Tenaga Pemasar dan selanjutnya menyatakan setuju mengenai hal-hal yang tersebut di bawah ini:`,
    },
    {
      id: '1. ',
      key: `Semua keterangan yang SAYA berikan di dalam SPAJ ini dan keterangan lain yang SAYA berikan kepada PT Prudential Life Assurance (selanjutnya disebut “Penanggung”) atau Tenaga Pemasar atau kepada Pemeriksa Kesehatan yang ditunjuk oleh Penanggung dan/atau keterangan yang tertulis di dalam dokumen SPAJ tambahan, Kuesioner dan/atau dokumen lain yang menjadi kelengkapan dan tidak terpisahkan dari SPAJ ini adalah benar, sesuai, akurat, dan tidak menyesatkan, serta tidak ada hal-hal lain yang SAYA sembunyikan baik yang SAYA ketahui maupun tidak ketahui. Semua keterangan yang SAYA berikan di dalam SPAJ (termasuk yang ditulis di dalam Surat Pernyataan/Amendemen untuk SPAJ/SPAJT/Pengajuan Pelayanan Polis) dan/atau Kuesioner (jika ada) dan yang disampaikan kepada Pemeriksa Kesehatan yang ditunjuk oleh Penanggung (jika ada) akan menjadi dasar bagi Penanggung dalam penerbitan Polis.`,
    },
    {
      id: '2. ',
      key: `SAYA sendiri yang melengkapi dan menandatangani SPAJ ini serta telah menerima, memahami secara mandiri, dan menyetujui lembar Ringkasan Informasi Produk dan Layanan Versi Personal (Ilustrasi) ${productName} yang menjelaskan risiko, manfaat, kewajiban dan pembebanan biaya asuransi yang telah disampaikan "<b>secara langsung</b>" oleh Tenaga Pemasar. Segala risiko pemilihan Manfaat Asuransi sepenuhnya menjadi tanggung jawab SAYA.`,
    },
    {
      id: '3. ',
      key: `SAYA telah bertemu secara langsung dan/atau melalui media elektronik (<i>video call</i>) dengan Tenaga Pemasar, pada saat SAYA mengisi dan menandatangani penawaran produk dan ${spaj}/${spaj} Elektronik ini.`,
    },
    {
      id: '4. ',
      key: `SAYA memahami bahwa setelah Polis terbit, ${insurerManager} akan menghubungi SAYA melalui telepon (“<i>Welcome Call</i>”) untuk mengevaluasi layanan pembelian produk ini. SAYA mengerti dan akan menerima konsekuensinya jika SAYA tidak dapat dihubungi, maka ${insurerManager} dapat menggunakan konfirmasi pemahaman SAYA atas produk yang SAYA beli dengan merujuk pada semua dokumen yang SAYA telah konfirmasi dan tandatangani melalui sarana pengajuan ${spaj} yang ada di aplikasi <b>PRU</b>Force ataupun sarana lain yang telah disediakan oleh ${insurerManager}.`,
    },
    {
      id: '5. ',
      key: `Bahwa ${insurerManager} berhak meminta dokumen berupa bukti penghasilan atau dokumen lainnya yang diperlukan (dan SAYA berkewajiban untuk menyampaikan dokumen tersebut kepada ${insurerManager}) untuk memastikan kesesuaian profil SAYA dan/atau Calon Tertanggung dan/atau Calon Pembayar Premi. Dalam hal dokumen yang diperlukan tersebut tidak diterima ${insurerManager} atau dokumen yang diperlukan tersebut mempunyai informasi yang berbeda dan/atau tidak lengkap dengan informasi yang sebelumnya diterima oleh ${insurerManager}, maka SAYA menyetujui bahwa ${insurerManager} berhak menangguhkan transaksi apa pun yang SAYA ajukan dengan memberikan pemberitahuan kepada SAYA.`,
    },
    {
      id: '6. ',
      key: `Tanpa mengesampingkan ketentuan pada Poin D (Ketentuan Pertanggungan Manfaat Meninggal Dunia Karena Kecelakaan Sebelum Polis Diterbitkan), pertanggungan tidak akan dimulai sebelum Polis diterbitkan. Jika terjadi peristiwa yang ditanggung dalam Polis sebelum tanggal Polis diterbitkan, atau SAYA tidak melengkapi persyaratan pengajuan asuransi yang diminta oleh ${insurerManager} dalam waktu 30 (tiga puluh) hari kalender sejak ${spaj} terdaftar di Kantor Pusat ${insurerManager}, atau SAYA membatalkan pengajuan asuransi kepada ${insurerManager}, maka ${insurerManager} tidak berkewajiban untuk membayar manfaat apa pun kecuali mengembalikan Premi (jika telah dibayarkan oleh SAYA) dikurangi semua biaya pemeriksaan kesehatan yang timbul (jika ada).`,
    },
    {
      id: '7. ',
      key: `Pertanggungan akan dinilai ulang oleh ${insurerManager} apabila terdapat pemeriksaan kesehatan yang dilakukan sebelum Polis terbit diluar pengetahuan ${insurerManager}, yang hasilnya dapat memengaruhi/mengubah keputusan <i>Underwriting</i> (Seleksi Risiko) dan/atau apabila terdapat keterangan, pernyataan atau pemberitahuan yang disampaikan (termasuk pernyataan sebagaimana dimaksud dalam butir 5 di atas) ternyata keliru atau berbeda atau berubah yang sifatnya sedemikian rupa sehingga pertanggungan dan/atau Polis dapat menjadi batal dan dianggap tidak pernah berlaku dan atas hal tersebut ${insurerManager} tidak berkewajiban membayar apa pun.`,
    },
    {
      id: '8. ',
      key: `Semua pembayaran Premi harus sudah diterima di rekening ${insurerManager} dan telah teridentifikasi.`,
    },
    {
      id: '9. ',
      key: `Bahwa pada waktu SAYA mengajukan klaim Manfaat Asuransi, ${insurerManager}, berhak meminta bukti keabsahan hubungan keterikatan asuransi antara Pemegang Polis, Tertanggung dan Penerima Manfaat. Dalam hal hubungan antara Pemegang Polis, Tertanggung dan Penerima Manfaat terdapat perbedaan dengan yang tertulis di ${spaj} ini (misalnya: tidak bisa diverifikasi), ${insurerManager} berhak meminta dokumen pendukung yang wajar dan relevan dengan pengajuan klaim.`,
    },
    {
      id: '10. ',
      key: `Bahwa pada waktu SAYA mengajukan klaim Manfaat Asuransi, ${insurerManager} berhak meminta kesesuaian profil finansial SAYA dan/atau Tertanggung dan/atau Pembayar Premi. Dalam hal terdapat perbedaan pada profil finansial SAYA dan/atau Tertanggung dan/atau Pembayar Premi dengan yang tertulis di SPAJ ini (misalnya: tidak bisa diverifikasi), ${insurerManager} berhak meminta dokumen pendukung yang wajar dan relevan dengan pengajuan klaim dan dokumen pendukung untuk mendukung verifikasi profil finansial. Apabila dokumen pendukung tidak disampaikan atau disampaikan tetapi tidak sesuai dengan profil finansial SAYA, maka ${insurerManager} berhak untuk melakukan pembatalan polis yang telah diterbitkan.`,
    },
    { id: '11. ', key: `SAYA dan/atau Calon Tertanggung dan/atau Calon Penerima Manfaat yang diwakilkan oleh SAYA, dengan ini memberikan kuasa dan izin kepada:` },
    {
      subid: '(i) ',
      subkey: `${insurerManager} untuk memperoleh, mengumpulkan, mengolah, menganalisis, menyimpan, memperbaiki, melakukan pembaruan, menampilkan, mengumumkan, mentransfer, menyebarluaskan, mengungkapkan, menghapus atau memusnahkan data pribadi sesuai prinsip pelindungan Data Pribadi (“Pemrosesan Data Pribadi”) terkait riwayat kesehatan, dan riwayat keuangan Calon Tertanggung atau informasi lain mengenai diri Calon Tertanggung sejak pengajuan SPAJ sampai dengan pengajuan klaim dari setiap tenaga medis, rumah sakit, klinik, puskesmas, laboratorium, perusahaan asuransi, perusahaan reasuransi, lembaga/perusahaan di bidang jasa keuangan maupun layanan informasi keuangan, badan, instansi/lembaga, Perusahaan tempat SAYA dan/atau Tertanggung bekerja atau pihak lain yang mempunyai catatan/informasi riwayat kesehatan, catatan/informasi keuangan, atau informasi lain mengenai diri Calon Tertanggung sejak periode pengajuan SPAJ sampai hingga periode pengajuan klaim; dan`,
    },
    {
      subid: '(ii) ',
      subkey: `Setiap tenaga medis, rumah sakit, klinik, puskesmas, laboratorium, perusahaan asuransi, perusahaan reasuransi, lembaga/perusahaan di bidang jasa keuangan maupun layanan informasi keuangan, badan, instansi/Lembaga, koperasi, atau pihak lain yang mempunyai catatan riwayat kesehatan, catatan/informasi keuangan, atau informasi lain mengenai diri Calon Tertanggung untuk mengungkapkan atau memberikan kepada Penanggung semua catatan riwayat kesehatan, atau perawatan, atau catatan/informasi keuangan, atau informasi lain mengenai diri Calon Tertanggung. Pemberian kuasa ini tidak dapat ditarik kembali atau dibatalkan dan tetap berlaku pada waktu Calon Tertanggung masih hidup maupun sesudah meninggal dunia, maupun oleh sebab-sebab yang disebutkan dalam Pasal 1813, Pasal 1814, dan Pasal 1816 Kitab Undang-Undang Hukum Perdata Indonesia. Salinan/fotokopi dari kuasa ini memiliki kekuatan hukum yang sama dan mengikat sesuai dengan aslinya.`,
    },
    {
      subid: ' ',
      subkey: `Pemberian kuasa ini tidak dapat ditarik kembali atau dibatalkan dan tetap berlaku pada waktu Calon Tertanggung masih hidup maupun sesudah meninggal dunia, maupun oleh sebab-sebab yang disebutkan dalam Pasal 1813, Pasal 1814, dan Pasal 1816 Kitab Undang-Undang Hukum Perdata Indonesia. Salinan/fotokopi dari kuasa ini memiliki kekuatan hukum yang sama dan mengikat sesuai dengan aslinya.`,
    },
    {
      id: '12. ',
      key: 'Dalam rangka pengajuan dan pembayaran klaim, maupun pelayanan nasabah, SAYA menyatakan bahwa SAYA telah memiliki wewenang sah yang diperoleh dari Calon Penerima Manfaat untuk memberikan data dan/atau informasi pribadi dari Calon Penerima Manfaat kepada Penanggung.',
    },
    {
      id: '13. ',
      key: "Jika ada perbedaan data antara data di Polis sebelumnya dengan data di dalam SPAJ ini, maka yang berlaku adalah data yang tertera di dalam SPAJ ini. Dalam hal Calon Pemegang Polis dan/atau Calon Tertanggung dan/atau Calon Pembayar Premi dan/atau Calon Penerima Manfaat memiliki Polis di Grup Prudential dan/atau Calon Tertanggung dan/atau Calon Pembayar Premi dan/atau Calon Penerima Manfaat berbeda dengan data terbaru pada SPAJ ini, maka SAYA setuju bahwa Prudential Indonesia dapat mengganti data Polis Prudential dengan data yang tertera pada SPAJ ini baik untuk Polis yang terbit maupun tidak terbit.",
    },
    {
      id: '14. ',
      key: 'Jika pengajuan SPAJ SAYA telah disetujui oleh Penanggung, namun Premi belum diterima oleh Penanggung dalam waktu 14 (empat belas) hari atau 30 (tiga puluh) hari (sesuai besar Premi tahunan) sejak SPAJ tersebut disetujui oleh Penanggung atau dalam waktu 30 (tiga puluh) hari kalender sejak SPAJ diterima di Kantor Pusat Penanggung, mana yang terjadi lebih dahulu, maka pengajuan SPAJ SAYA tersebut dianggap berakhir sesuai ketentuan yang berlaku di Penanggung.',
    },
    {
      id: '15. ',
      key: 'Jika SPAJ ini merupakan SPAJ pengganti, maka Premi yang telah dibayarkan pada SPAJ sebelumnya di mana SAYA dan Calon Tertanggung merupakan orang yang sama, maka secara otomatis akan dialihkan ke SPAJ ini. Dalam hal pendaftaran dan pembayaran Premi pada SPAJ ini dengan metode pembayaran autodebit kartu kredit/debit atau autodebit rekening bank yang sudah terdaftar di <b>PRU</b>Pay Link maka wajib dilakukan melalui <b>PRU</b>Pay Link (https://payment.prudential.co.id). Bagi autodebit kartu kredit berlogo BCA Card atau autodebit rekening yang belum terdaftar di <b>PRU</b>Pay Link maka perlu melampirkan Surat Kuasa Pendebitan Kartu Kredit (SKPKK) khusus BCA Card atau Surat Kuasa Pendebitan Rekening (SKPR) sesuai dengan ketentuan Bank yang berlaku. Jika Calon Pemegang Polis melewati masa 30 hari kalender setelah SPAJ diterima oleh Penanggung, maka perlu mengajukan SPAJ baru dan pendaftaran autodebit dengan nomor SPAJ yang baru melalui <b>PRU</b>Pay Link.',
    },
    {
      id: '16. ',
      key: `SAYA memahami dan setuju bahwa Polis SAYA akan dikirimkan secara elektronik melalui <i>E-mail</i> yang SAYA daftarkan pada SPAJ ini setelah proses pengajuan asuransi SAYA disetujui oleh Penanggung.`,
    },
    {
      id: '17. ',
      key: 'Penanggung hanya akan menerima pembayaran Premi (maupun transaksi lainnya) sesuai metode pembayaran yang telah ditentukan oleh Penanggung dari waktu ke waktu, yakni melalui rekening resmi milik Penanggung. Oleh karena itu, pembayaran tersebut hanya akan SAYA lakukan melalui metode pembayaran yang telah ditentukan oleh Penanggung. Penanggung tidak akan bertanggung jawab atas risiko dan kerugian yang timbul (apabila ada) jika SAYA melakukan pembayaran Premi (maupun transaksi lainnya) selain menggunakan metode pembayaran yang telah ditentukan oleh Penanggung.',
    },
    {
      id: '18. ',
      key: 'SPAJ ini berbentuk elektronik/digital sehingga untuk selanjutnya SAYA akan memberikan persetujuan dalam bentuk tanda tangan elektronik yang akan dipersamakan keabsahannya dengan tanda tangan basah SAYA.',
    },
    {
      id: '19. ',
      key: "Dalam 1 (satu) tahun terakhir sampai dengan SPAJ ini ditandatangani dan ajukan oleh SAYA kepada Penanggung, baik SAYA atau keluarga inti SAYA, atau SAYA sebagai Pemegang Polis/Tertanggung/Pembayar Premi, tidak berstatus sebagai Penerima Manfaat dari program bantuan sosial (Bansos) untuk kategori fakir miskin atau tidak mampu yang diberikan oleh Pemerintah. Jika dikemudian hari setelah SPAJ ini disampaikan kepada Penanggung dan telah diterbitkan Polis Asuransi Jiwa atas pengajuan SAYA tersebut, ditemukan fakta bahwa SAYA ataupun keluarga inti SAYA, atau SAYA sebagai Pemegang Polis/Tertanggung/Pembayar Premi, berstatus sebagai Penerima Manfaat dari program Bansos, baik sebelum maupun sesudah Polis Asuransi Jiwa diterbitkan, maka Penanggung berhak untuk meminta dokumen finansial dan/atau melakukan seleksi ulang risiko. Apabila dokumen finansial tidak dapat dipenuhi, maka Penanggung dapat membatalkan Polis Asuransi Jiwa."
    },
    {
      id: '20. ',
      key: "SAYA sendiri yang melengkapi dan menandatangani SPAJ ini serta telah menerima, memahami secara mandiri, dan menyetujui lembar Ringkasan Informasi Produk dan Layanan Versi Personal (Ilustrasi) PRUWell Medical yang menjelaskan Manfaat Asuransi yang telah disampaikan oleh Tenaga Pemasar, termasuk namun tidak terbatas pada penentuan besarnya Biaya Asuransi PRUWell Medical yang dikenakan oleh Penanggung setiap Tahun Pertanggungan Polis, yang ditentukan berdasarkan:"
    },
    {
      subid: '1) ',
      subkey: "Usia Tertanggung;"
    },
    {
      subid: '2) ',
      subkey: `<b>PRU</b>Well yang dapat dikenakan, jika:`
    },
    {
      subid: '    - ',
      subkey: "tidak terdapat klaim Manfaat Asuransi yang disetujui oleh Penanggung dalam Periode Pengamatan terakhir;"
    },
    {
      subid: '    - ',
      subkey: "besar <i>Multiplier</i> pada Tahun Pertanggungan Asuransi Tambahan sebelumnya adalah sebesar 1 (satu); dan"
    },
    {
      subid: '    - ',
      subkey: "Asuransi Tambahan tidak pernah berakhir karena lewat waktu atau <i>lapsed</i> dalam Periode Pengamatan terakhir."
    },
    {
      subid: '3) ',
      subkey: `<i>Multiplier</i> yang dikenakan, dimana:`
    },
    {
      subid: '    - ',
      subkey: "besar <i>Multiplier</i> pada suatu Tahun Pertanggungan Asuransi Tambahan berjalan adalah 1 (satu) jika tidak terdapat klaim Manfaat Asuransi atau semua klaim Manfaat Asuransi yang disetujui oleh Penanggung bersumber dari <b>PRU</b>Priority Hospitals;"
    },
    {
      subid: '    - ',
      subkey: "besar <i>Multiplier</i> dapat lebih tinggi jika terdapat klaim Manfaat Asuransi pada rumah sakit yang bukan <b>PRU</b>Priority Hospitals yang disetujui oleh Penanggung, dimana <b>PRU</b>Priority Hospitals bergantung pada tingkat kerja sama Penanggung dengan rumah sakit, dengan cakupan <b>PRU</b>Priority Hospitals dapat dipengaruhi oleh wilayah dari lokasi rumah sakit. Daftar rumah sakit yang tergabung dalam <b>PRU</b>Priority Hospitals dapat diperbaharui dari waktu ke waktu oleh Penanggung dan dapat dilihat di website Penanggung."
    },
  ]

  const PCPP_PWMS = [
    {
      id: '',
      key: 'Pernyataan Calon Pemegang Polis (selanjutnya disebut “SAYA”, harap dibaca dengan teliti sebelum menandatangani SPAJ Syariah ini)',
    },
    {
      id: '',
      key: "SAYA menyatakan bahwa telah mengerti dan telah mendapat penjelasan sepenuhnya dari Tenaga Pemasar dan selanjutnya menyatakan setuju mengenai hal-hal yang tersebut di bawah ini:",
    },
    {
      id: '1. ',
      key: 'Semua keterangan yang SAYA berikan di dalam SPAJ Syariah ini dan keterangan lain yang SAYA berikan kepada PT Prudential Sharia Life Assurance (Prudential Syariah) (selanjutnya disebut “Pengelola”) atau Tenaga Pemasar atau kepada Pemeriksa Kesehatan yang ditunjuk oleh Pengelola dan/atau keterangan yang tertulis di dalam dokumen SPAJ tambahan Syariah, Kuesioner dan/atau dokumen lain yang menjadi kelengkapan dan tidak terpisahkan dari SPAJ Syariah ini adalah benar, sesuai, akurat, dan tidak menyesatkan, serta tidak ada hal-hal lain yang telah SAYA ketahui namun SAYA sembunyikan dan/atau tidak SAYA informasikan kepada Pengelola. Semua keterangan yang SAYA berikan di dalam SPAJ Syariah (termasuk yang ditulis di dalam Surat Pernyataan/Amendemen untuk SPAJ Syariah/SPAJT Syariah/Pengajuan Pelayanan Polis) dan/atau Kuesioner (jika ada) dan yang disampaikan kepada Pemeriksa Kesehatan yang ditunjuk oleh Pengelola (jika ada) akan menjadi dasar bagi Pengelola dalam penerbitan Polis.',
    },
    {
      id: '2. ',
      key: `SAYA sendiri yang melengkapi dan menandatangani SPAJ Syariah ini serta telah menerima, memahami secara mandiri, dan menyetujui lembar Ringkasan Informasi Produk dan Layanan Versi Personal (Ilustrasi) ${productName} yang menjelaskan risiko, manfaat, kewajiban dan pembebanan biaya asuransi  yang telah disampaikan "<b>secara langsung</b>" oleh Tenaga Pemasar. Segala risiko pemilihan manfaat asuransi sepenuhnya menjadi tanggung jawab SAYA.`,
    },
    {
      id: '3. ',
      key: "SAYA telah bertemu secara langsung dengan Tenaga Pemasar, pada saat SAYA mengisi dan menandatangani penawaran produk dan SPAJ Syariah ini.",
    },
    {
      id: '4. ',
      key: `SAYA memahami bahwa setelah Polis terbit, Pengelola akan menghubungi SAYA melalui telepon (<i>"Welcome Call"</i>) untuk mengevaluasi layanan pembelian produk ini. SAYA mengerti dan akan menerima konsekuensinya jika SAYA tidak dapat dihubungi, maka Pengelola dapat menggunakan konfirmasi pemahaman SAYA atas produk yang SAYA beli dengan merujuk pada semua dokumen yang SAYA telah konfirmasi dan tandatangani melalui sarana pengajuan SPAJ Syariah yang ada di aplikasi <b>PRU</b>Force ataupun sarana lain yang telah disediakan oleh Pengelola.`,
    },
    {
      id: '5. ',
      key: "Bahwa Pengelola berhak meminta dokumen berupa bukti penghasilan atau dokumen lainnya yang diperlukan (dan SAYA berkewajiban untuk menyampaikan dokumen tersebut kepada Pengelola) untuk memastikan kesesuaian profil SAYA dan/atau Calon Peserta Yang Diasuransikan dan/atau Calon Pembayar Kontribusi. Dalam hal dokumen yang diperlukan tersebut tidak diterima Pengelola atau dokumen yang diperlukan tersebut mempunyai informasi yang berbeda dan/atau tidak lengkap dengan informasi yang sebelumnya diterima oleh Pengelola, maka SAYA menyetujui bahwa Pengelola berhak menangguhkan transaksi apa pun yang SAYA ajukan dengan memberikan pemberitahuan kepada SAYA.",
    },
    {
      id: '6. ',
      key: "Tanpa mengesampingkan ketentuan pada Poin D (Ketentuan Kepesertaan Manfaat Meninggal Dunia Karena Kecelakaan Sebelum Polis Diterbitkan), kepesertaan tidak akan dimulai sebelum Polis diterbitkan. Jika terjadi peristiwa yang ditanggung dalam Polis sebelum tanggal Polis diterbitkan, atau SAYA tidak melengkapi persyaratan pengajuan asuransi yang diminta oleh Pengelola dalam waktu 30 (tiga puluh) hari kalender sejak SPAJ Syariah terdaftar di Kantor Pusat Pengelola, atau SAYA membatalkan pengajuan asuransi kepada Pengelola, maka Pengelola tidak berkewajiban untuk membayar Manfaat Asuransi apa pun kecuali mengembalikan Kontribusi (jika telah dibayarkan oleh SAYA) dikurangi semua biaya pemeriksaan kesehatan yang timbul (jika ada).",
    },
    {
      id: '7. ',
      key: "Kepesertaan pada Asuransi Kesehatan Syariah akan dinilai ulang oleh Pengelola apabila terdapat pemeriksaan kesehatan yang dilakukan sebelum Polis terbit di luar pengetahuan Pengelola, yang hasilnya dapat memengaruhi/mengubah keputusan <i>Underwriting</i> (Seleksi Risiko) dan/atau apabila terdapat keterangan, pernyataan atau pemberitahuan yang disampaikan (termasuk pernyataan sebagaimana dimaksud dalam butir 5 di atas) ternyata keliru atau berbeda atau berubah yang sifatnya sedemikian rupa sehingga kepesertaan pada Asuransi Kesehatan Syariah dan/atau Polis dapat menjadi batal dan dianggap tidak pernah berlaku dan atas hal tersebut Pengelola tidak berkewajiban membayar apa pun.",
    },
    {
      id: '8. ',
      key: "Semua pembayaran Kontribusi harus sudah diterima di rekening Pengelola dan telah teridentifikasi.",
    },
    {
      id: '9. ',
      key: "Bahwa pada waktu SAYA mengajukan klaim Manfaat Asuransi, Pengelola berhak meminta bukti keabsahan hubungan keterikatan asuransi antara Pemegang Polis, Peserta Yang Diasuransikan dan Penerima Manfaat. Dalam hal hubungan antara Pemegang Polis, Peserta Yang Diasuransikan dan Penerima Manfaat terdapat perbedaan dengan yang tertulis di SPAJ Syariah ini (misalnya: tidak bisa diverifikasi), Pengelola berhak meminta dokumen pendukung yang wajar dan relevan dengan pengajuan klaim.",
    },
    {
      id: '10. ',
      key: "Bahwa pada waktu SAYA mengajukan klaim Manfaat Asuransi, Pengelola berhak meminta kesesuaian profil finansial SAYA dan/atau Peserta Yang Diasuransikan dan/atau Pembayar Kontribusi. Dalam hal terdapat perbedaan pada profil finansial SAYA dan/atau Peserta Yang Diasuransikan dan/atau Pembayar Kontribusi dengan yang tertulis di SPAJ Syariah ini (misalnya: tidak bisa diverifikasi), Pengelola berhak meminta dokumen pendukung yang wajar dan relevan dengan pengajuan klaim dan dokumen pendukung untuk mendukung verifikasi profil finansial. Apabila dokumen pendukung tidak disampaikan atau disampaikan tetapi tidak sesuai dengan profil finansial SAYA, maka Pengelola berhak untuk melakukan pembatalan Polis yang telah diterbitkan.",
    },
    {
      id: '11. ',
      key: "SAYA dan/atau Calon Peserta Yang Diasuransikan dan/atau Calon Penerima Manfaat yang diwakilkan oleh SAYA, dengan ini memberikan kuasa dan izin kepada:",
    },
    {
      subid: '(i) ',
      subkey: `Pengelola untuk memperoleh, mengumpulkan, mengolah, menganalisis, menyimpan, memperbaiki, melakukan pembaruan, menampilkan, mengumumkan, mentransfer, menyebarluaskan, mengungkapkan, menghapus atau memusnahkan data pribadi sesuai prinsip pelindungan Data Pribadi (Pemrosesan Data Pribadi) terkait riwayat kesehatan, dan riwayat keuangan Calon Peserta Yang Diasuransikan atau informasi lain mengenai diri Calon Peserta Yang Diasuransikan sejak pengajuan SPAJ Syariah sampai dengan pengajuan klaim dari setiap tenaga medis, rumah sakit, klinik, puskesmas, laboratorium, perusahaan asuransi, perusahaan reasuransi, lembaga/perusahaan di bidang jasa keuangan maupun layanan informasi keuangan, badan, instansi/lembaga, Perusahaan tempat SAYA dan/atau Peserta Yang Diasuransikan bekerja atau pihak lain yang mempunyai catatan/informasi riwayat kesehatan, catatan/informasi keuangan, atau informasi lain mengenai diri Calon Peserta Yang Diasuransikan sejak periode pengajuan SPAJ Syariah sampai hingga periode pengajuan klaim; dan`,
    },
    {
      subid: '(ii) ',
      subkey: "Setiap tenaga medis, rumah sakit, klinik, puskesmas, laboratorium, perusahaan asuransi, perusahaan reasuransi, lembaga/perusahaan di bidang jasa keuangan maupun layanan informasi keuangan, badan, instansi/lembaga, koperasi, atau pihak lain yang mempunyai catatan riwayat kesehatan, catatan/informasi keuangan, atau informasi lain mengenai diri Calon Peserta Yang Diasuransikan untuk mengungkapkan atau memberikan kepada Pengelola semua catatan riwayat kesehatan, atau perawatan, atau catatan/informasi keuangan, atau informasi lain mengenai diri Calon Peserta Yang Diasuransikan.",
    },
    {
      subid: '',
      subkey: "Pemberian kuasa ini tidak dapat ditarik kembali atau dibatalkan dan tetap berlaku pada waktu Calon Peserta Yang Diasuransikan masih hidup maupun sesudah meninggal dunia, maupun oleh sebab-sebab yang disebutkan dalam Pasal 1813, Pasal 1814, dan Pasal 1816 Kitab Undang-Undang Hukum Perdata Indonesia. Salinan/fotokopi dari kuasa ini memiliki kekuatan hukum yang sama dan mengikat sesuai dengan aslinya.",
    },
    {
      id: '12. ',
      key: `Dalam rangka pengajuan dan pembayaran klaim, maupun pelayanan kepada Peserta, SAYA menyatakan bahwa SAYA telah memiliki wewenang sah yang diperoleh dari Calon Penerima Manfaat untuk memberikan data dan/atau informasi pribadi dari Calon Penerima Manfaat kepada Pengelola.`,
    },
    {
      id: '13. ',
      key: "Jika ada perbedaan data antara data di Polis sebelumnya dengan data di dalam SPAJ Syariah ini, maka yang berlaku adalah data yang tertera di dalam SPAJ Syariah ini. Dalam hal Calon Pemegang Polis dan/atau Calon Peserta Yang Diasuransikan dan/atau Calon Pembayar Kontribusi dan/atau Calon Penerima Manfaat memiliki Polis di Grup Prudential dan/atau Calon Peserta Yang Diasuransikan dan/atau Calon Pembayar Kontribusi dan/atau Calon Penerima Manfaat berbeda dengan data terbaru pada SPAJ Syariah ini, maka SAYA setuju bahwa Prudential Syariah dapat mengganti data Polis Prudential dengan data yang tertera pada SPAJ Syariah ini baik untuk Polis yang terbit maupun tidak terbit.",
    },
    {
      id: '14. ',
      key: "Jika pengajuan SPAJ Syariah SAYA telah disetujui oleh Pengelola, namun Kontribusi belum diterima oleh Pengelola dalam waktu 14 (empat belas) hari atau 30 (tiga puluh) hari (sesuai besaran Kontribusi tahunan) sejak SPAJ Syariah tersebut disetujui oleh Pengelola atau dalam waktu 30 (tiga puluh) hari kalender sejak SPAJ Syariah diterima di Kantor Pusat Pengelola, mana yang terjadi lebih dahulu, maka pengajuan SPAJ Syariah SAYA tersebut dianggap berakhir sesuai ketentuan yang berlaku di Pengelola.",
    },
    {
      id: '15. ',
      key: "Jika SPAJ Syariah ini merupakan SPAJ pengganti, maka Kontribusi yang telah dibayarkan pada SPAJ sebelumnya di mana SAYA dan Calon Peserta Yang Diasuransikan merupakan orang yang sama, maka secara otomatis akan dialihkan ke SPAJ Syariah ini. Dalam hal pendaftaran dan pembayaran Kontribusi pada SPAJ Syariah ini dengan metode pembayaran autodebit kartu kredit/debit atau autodebit rekening bank yang sudah terdaftar di <b>PRU</b>Pay Link maka wajib dilakukan melalui <b>PRU</b>Pay Link <i>(https://payment.prudentialsyariah.co.id)</i>. Bagi autodebit kartu kredit berlogo BCA Card atau autodebit rekening yang belum terdaftar di <b>PRU</b>Pay Link maka perlu melampirkan Surat Kuasa Pendebitan Kartu Kredit (SKPKK) khusus BCA Card atau Surat Kuasa Pendebitan Rekening (SKPR) sesuai dengan ketentuan Bank yang berlaku. Jika Calon Pemegang Polis melewati masa 30 hari kalender setelah SPAJ Syariah diterima oleh Pengelola, maka perlu mengajukan SPAJ Syariah baru dan pendaftaran autodebit dengan nomor SPAJ Syariah yang baru melalui <b>PRU</b>Pay Link.",
    },
    {
      id: '16. ',
      key: "SAYA memahami dan setuju bahwa Polis SAYA akan dikirimkan secara elektronik melalui <i>E-mail</i> yang SAYA daftarkan pada SPAJ Syariah ini setelah proses pengajuan asuransi SAYA disetujui oleh Pengelola.",
    },
    {
      id: '17. ',
      key: "Prudential Syariah hanya akan menerima pembayaran Kontribusi (maupun transaksi lainnya) sesuai metode pembayaran yang telah ditentukan oleh Prudential Syariah dari waktu ke waktu, yakni melalui rekening resmi milik Prudential Syariah. Oleh karena itu, pembayaran tersebut hanya akan SAYA lakukan melalui metode pembayaran yang telah ditentukan oleh Prudential Syariah. Prudential Syariah tidak akan bertanggung jawab atas risiko dan kerugian yang timbul (apabila ada) jika SAYA melakukan pembayaran Kontribusi (maupun transaksi lainnya) selain menggunakan metode pembayaran yang telah ditentukan oleh Prudential Syariah.",
    },
    {
      id: '18. ',
      key: "SPAJ Syariah ini berbentuk elektronik/digital sehingga untuk selanjutnya SAYA akan memberikan persetujuan dalam bentuk tanda tangan elektronik yang akan dipersamakan keabsahannya dengan tanda tangan basah SAYA.",
    },
    {
      id: '19. ',
      key: `Dalam 1 (satu) tahun terakhir sampai dengan SPAJ Syariah ini ditandatangani dan ajukan oleh SAYA kepada Pengelola, baik SAYA atau keluarga inti SAYA, atau SAYA sebagai Pemegang Polis/Peserta Yang Diasuransikan/Pembayar Kontribusi, tidak berstatus sebagai Penerima Manfaat dari program  bantuan sosial (Bansos) untuk kategori fakir miskin atau tidak mampu yang diberikan oleh Pemerintah. Jika dikemudian hari setelah SPAJ Syariah ini disampaikan kepada Pengelola dan telah diterbitkan Polis Asuransi Jiwa atas pengajuan SAYA tersebut, ditemukan fakta bahwa SAYA ataupun keluarga inti SAYA, atau SAYA sebagai Pemegang Polis/ Peserta Yang Diasuransikan /Pembayar Kontribusi, berstatus sebagai Penerima Manfaat dari program Bansos, baik sebelum maupun sesudah Polis Asuransi Jiwa diterbitkan, maka Pengelola berhak untuk meminta dokumen finansial dan/atau  melakukan seleksi ulang risiko. Apabila dokumen finansial tidak dapat dipenuhi, maka Pengelola dapat membatalkan Polis Asuransi Jiwa Syariah.`
    },
    {
      id: '20. ',
      key: `SAYA sendiri yang melengkapi dan menandatangani SPAJ Syariah ini serta telah menerima, memahami secara mandiri, dan menyetujui lembar Ringkasan Informasi Produk dan Layanan Versi Personal (Ilustrasi) ${productName} yang menjelaskan Manfaat Asuransi yang telah disampaikan oleh Tenaga Pemasar, termasuk namun tidak terbatas pada penentuan besarnya Biaya Asuransi ${productName} yang dikenakan oleh Pengelola setiap Tahun Kepesertaan Polis, yang ditentukan berdasarkan:`,
    },
    {
      subid: '1) ',
      subkey: "Usia Peserta Yang Diasurasikan;"
    },
    {
      subid: '2) ',
      subkey: `<b>PRU</b>Well yang dapat dikenakan, jika:`
    },
    {
      subid: '    - ',
      subkey: `tidak terdapat klaim Manfaat Asuransi yang disetujui oleh ${insurerManager} dalam Periode Pengamatan terakhir;`
    },
    {
      subid: '    - ',
      subkey: "besar <i>Multiplier</i> pada Tahun Kepesertaan Asuransi Tambahan sebelumnya adalah sebesar 1 (satu); dan"
    },
    {
      subid: '    - ',
      subkey: "Asuransi Tambahan tidak pernah berakhir karena lewat waktu atau <i>lapsed</i> dalam Periode Pengamatan terakhir."
    },
    {
      subid: '3) ',
      subkey: `<i>Multiplier</i> yang dikenakan, dimana:`
    },
    {
      subid: '    - ',
      subkey: "besar <i>Multiplier</i> pada suatu Tahun Kepesertaan Asuransi Tambahan berjalan adalah 1 (satu) jika tidak terdapat klaim Manfaat Asuransi atau semua klaim Manfaat Asuransi yang disetujui oleh Pengelola bersumber dari <b>PRU</b>Priority Hospitals;"
    },
    {
      subid: '    - ',
      subkey: `besar <i>Multiplier</i> dapat lebih tinggi jika terdapat klaim Manfaat Asuransi pada rumah sakit yang bukan <b>PRU</b>Priority Hospitals yang disetujui oleh ${insurerManager}, dimana <b>PRU</b>Priority Hospitals bergantung pada tingkat kerja sama Pengelola dengan rumah sakit, dengan cakupan <b>PRU</b>Priority Hospitals dapat dipengaruhi oleh wilayah dari lokasi rumah sakit. Daftar rumah sakit yang tergabung dalam <b>PRU</b>Priority Hospitals dapat diperbaharui dari waktu ke waktu oleh ${insurerManager} dan dapat dilihat di <i>website</i> ${insurerManager}.`
    },
  ]

  const PCPP_PNG = [
    {
      id: '',
      key: i18next.t('Epos:policyholder_declaration_warning', { spaj }),
    },
    {
      id: '',
      key: i18next.t('Epos:declaration_of_understanding_and_agreement'),
    },
    {
      id: '1. ',
      key: `Semua keterangan yang SAYA berikan di dalam SPAJ ini dan keterangan lain yang SAYA berikan kepada PT Prudential Life Assurance (selanjutnya disebut “Penanggung”) atau Tenaga Pemasar atau kepada Pemeriksa Kesehatan yang ditunjuk oleh Penanggung dan/atau keterangan yang tertulis di dalam dokumen SPAJ tambahan, Kuesioner dan/atau dokumen lain yang menjadi kelengkapan dan tidak terpisahkan dari SPAJ ini adalah benar, sesuai, akurat, dan tidak menyesatkan, serta tidak ada hal-hal lain yang SAYA sembunyikan baik yang SAYA ketahui maupun tidak ketahui. Semua keterangan yang SAYA berikan di dalam SPAJ (termasuk yang ditulis di dalam Surat Pernyataan/Amendemen untuk SPAJ/SPAJT/Pengajuan Pelayanan Polis) dan/atau Kuesioner (jika ada) dan yang disampaikan kepada Pemeriksa Kesehatan yang ditunjuk oleh Penanggung (jika ada) akan menjadi dasar bagi Penanggung dalam penerbitan Polis.`,
    },
    {
      id: '2. ',
      key: `SAYA sendiri yang melengkapi dan menandatangani SPAJ ini serta telah menerima, memahami secara mandiri, dan menyetujui lembar Ringkasan Informasi Produk dan Layanan Versi Personal (Ilustrasi) <b>PRU</b>Link NextGen yang menjelaskan mengenai risiko, manfaat, kewajiban dan pembebanan biaya asuransi serta jenis Dana Investasi <b>PRU</b>Link yang telah disampaikan "<b>secara langsung</b>" oleh Tenaga Pemasar. Segala risiko pemilihan manfaat asuransi dan jenis Dana Investasi <b>PRU</b>Link sepenuhnya menjadi tanggung jawab SAYA.`,
    },
    {
      id: '3. ',
      key: `SAYA telah bertemu secara langsung dengan Tenaga Pemasar, pada saat SAYA mengisi dan menandatangani penawaran produk dan SPAJ ini.`,
    },
    {
      id: '4. ',
      key: `SAYA memahami bahwa setelah Polis terbit, Penanggung akan menghubungi SAYA melalui telepon ("<i>Welcome Call</i>") untuk mengevaluasi layanan pembelian produk ini. SAYA mengerti dan akan menerima konsekuensinya jika SAYA tidak dapat dihubungi, maka Penanggung dapat menggunakan konfirmasi pemahaman SAYA atas produk yang SAYA beli dengan merujuk pada semua dokumen yang SAYA telah konfirmasi dan tandatangani melalui sarana pengajuan SPAJ yang ada di aplikasi <b>PRU</b>Force ataupun sarana lain yang telah disediakan oleh Penanggung.`,
    },
    {
      id: '5. ',
      key: `Bahwa Penanggung berhak meminta dokumen berupa bukti penghasilan atau dokumen lainnya yang diperlukan (dan SAYA berkewajiban untuk menyampaikan dokumen tersebut kepada Penanggung) untuk memastikan kesesuaian profil SAYA dan/atau Calon Tertanggung dan/atau Calon Pembayar Premi. Dalam hal dokumen yang diperlukan tersebut tidak diterima Penanggung atau dokumen yang diperlukan tersebut mempunyai informasi yang berbeda dan/atau tidak lengkap dengan informasi yang sebelumnya diterima oleh Penanggung, maka SAYA menyetujui bahwa Penanggung berhak menangguhkan transaksi apa pun yang SAYA ajukan dengan memberikan pemberitahuan kepada SAYA.`,
    },
    {
      id: '6. ',
      key: `Pertanggungan tidak akan dimulai sebelum Polis diterbitkan. Jika terjadi peristiwa yang ditanggung dalam Polis sebelum tanggal Polis diterbitkan, atau SAYA tidak melengkapi persyaratan pengajuan asuransi yang diminta oleh Penanggung dalam waktu 30 (tiga puluh) hari kalender sejak SPAJ terdaftar di Kantor Pusat Penanggung, atau SAYA membatalkan pengajuan asuransi kepada Penanggung, maka Penanggung tidak berkewajiban untuk membayar manfaat apa pun.`,
    },
    {
      id: '7. ',
      key: `Pertanggungan akan dinilai ulang oleh Penanggung apabila terdapat pemeriksaan kesehatan yang dilakukan sebelum Polis terbit di luar pengetahuan Penanggung, yang hasilnya dapat memengaruhi/mengubah keputusan <i>Underwriting</i> (Seleksi Risiko) dan/atau apabila terdapat keterangan, pernyataan atau pemberitahuan yang disampaikan (termasuk pernyataan sebagaimana dimaksud dalam butir 5 di atas) ternyata keliru atau berbeda atau berubah yang sifatnya sedemikian rupa sehingga pertanggungan dan/atau Polis dapat menjadi batal dan dianggap tidak pernah berlaku dan atas hal tersebut Penanggung tidak berkewajiban membayar apa pun selain Biaya Asuransi dan Nilai Tunai (jika ada).`,
    },
    {
      id: '8. ',
      key: `Jika terdapat perubahan jenis Dana Investasi <b>PRU</b>Link, alokasi Dana Investasi <b>PRU</b>Link, besar maupun komposisi Premi, termasuk tetapi tidak terbatas pada dikenakannya keputusan tidak standar pada pengajuan asuransi SAYA, maka Tanggal Perhitungan Harga Unit menjadi Tanggal Perhitungan berikutnya setelah diterimanya pemberitahuan perubahan jenis Dana Investasi <b>PRU</b>Link, alokasi Dana Investasi <b>PRU</b>Link, besar maupun komposisi Premi, Surat Persetujuan Keputusan Tidak Standar atas SPAJ ini atau teridentifikasinya seluruh pembayaran Premi Pertama di Kantor Pusat Penanggung, mana yang paling akhir.`,
    },
    {
      id: '9. ',
      key: `Ketentuan pembentukan Unit dari Premi Pertama untuk investasi sebagaimana dijelaskan pada Poin C.3 di bawah ini otomatis menjadi batal apabila SAYA membatalkan SPAJ SAYA, atau pengajuan SPAJ SAYA dibatalkan/ditangguhkan/ditolak oleh Penanggung. Apabila dengan kebijakan khusus kemudian Penanggung setuju untuk menerbitkan Polis setelah sebelumnya SPAJ SAYA dibatalkan/ditangguhkan/ditolak oleh Penanggung, maka dengan ini SAYA menyetujui bahwa pembentukan Unit Premi Pertama untuk Investasi yang pernah dilakukan tersebut akan tetap dibatalkan dan pembentukan Unit dari Premi Pertama untuk investasi (atas dikeluarkannya kebijakan khusus tersebut) akan mengikuti Harga Unit terdekat berikutnya setelah Polis diterbitkan.`,
    },
    {
      id: '10. ',
      key: `Bahwa pada waktu SAYA mengajukan klaim Manfaat Asuransi, Penanggung berhak meminta bukti keabsahan hubungan keterikatan asuransi antara Pemegang Polis, Tertanggung dan Penerima Manfaat. Dalam hal hubungan antara Pemegang Polis, Tertanggung dan Penerima Manfaat terdapat perbedaan dengan yang tertulis di SPAJ ini (misalnya: tidak bisa diverifikasi), Penanggung berhak meminta dokumen pendukung yang wajar dan relevan dengan pengajuan klaim.`,
    },
    {
      id: '11. ',
      key: `Bahwa pada waktu SAYA mengajukan klaim Manfaat Asuransi, Penanggung berhak meminta kesesuaian profil finansial SAYA dan/atau Tertanggung dan/atau Pembayar Premi. Dalam hal terdapat perbedaan pada profil finansial SAYA dan/atau Tertanggung dan/atau Pembayar Premi dengan yang tertulis di SPAJ ini (misalnya: tidak bisa diverifikasi), Penanggung berhak meminta dokumen pendukung yang wajar dan relevan dengan pengajuan klaim dan dokumen pendukung untuk mendukung verifikasi profil finansial. Apabila dokumen pendukung tidak disampaikan atau disampaikan tetapi tidak sesuai dengan profil finansial SAYA, maka Penanggung berhak untuk melakukan pembatalan polis yang telah diterbitkan.`,
    },
    {
      id: '12. ',
      key: `SAYA dan/atau Calon Tertanggung dan/atau Calon Penerima Manfaat yang diwakilkan oleh SAYA, dengan ini memberikan kuasa dan izin kepada:`,
    },
    {
      subid: '(i) ',
      subkey: `Penanggung untuk memperoleh, mengumpulkan, mengolah, menganalisis, menyimpan, memperbaiki, melakukan pembaruan, menampilkan, mengumumkan, mentransfer, menyebarluaskan, mengungkapkan, menghapus atau memusnahkan data pribadi sesuai prinsip pelindungan Data Pribadi (“Pemrosesan Data Pribadi”) terkait riwayat kesehatan, dan riwayat keuangan Calon Tertanggung atau informasi lain mengenai diri Calon Tertanggung sejak pengajuan SPAJ sampai dengan pengajuan klaim dari setiap tenaga medis, rumah sakit, klinik, puskesmas, laboratorium, perusahaan asuransi, perusahaan reasuransi, lembaga/perusahaan di bidang jasa keuangan maupun layanan informasi keuangan, badan, instansi/lembaga, Perusahaan tempat SAYA dan/atau Tertanggung bekerja atau pihak lain yang mempunyai catatan/informasi riwayat kesehatan, catatan/informasi keuangan, atau informasi lain mengenai diri Calon Tertanggung sejak periode pengajuan SPAJ sampai hingga periode pengajuan klaim; dan`,
    },
    {
      subid: '(ii) ',
      subkey: `Setiap tenaga medis, rumah sakit, klinik, puskesmas, laboratorium, perusahaan asuransi, perusahaan reasuransi, lembaga/perusahaan di bidang jasa keuangan maupun layanan informasi keuangan, badan, instansi/Lembaga, koperasi, atau pihak lain yang mempunyai catatan riwayat kesehatan, catatan/informasi keuangan, atau informasi lain mengenai diri Calon Tertanggung untuk mengungkapkan atau memberikan kepada Penanggung semua catatan riwayat kesehatan, atau perawatan, atau catatan/informasi keuangan, atau informasi lain mengenai diri Calon Tertanggung.`,
    },
    {
      subid: ' ',
      subkey: `Pemberian kuasa ini tidak dapat ditarik kembali atau dibatalkan dan tetap berlaku pada waktu Calon Tertanggung masih hidup maupun sesudah meninggal dunia, maupun oleh sebab-sebab yang disebutkan dalam Pasal 1813, Pasal 1814, dan Pasal 1816 Kitab Undang-Undang Hukum Perdata Indonesia. Salinan/fotokopi dari kuasa ini memiliki kekuatan hukum yang sama dan mengikat sesuai dengan aslinya.`,
    },
    {
      id: '13. ',
      key: `Dalam rangka pengajuan dan pembayaran klaim, maupun pelayanan nasabah, SAYA menyatakan bahwa SAYA telah memiliki wewenang sah yang diperoleh dari Calon Penerima Manfaat untuk memberikan data dan/atau informasi pribadi dari Calon Penerima Manfaat kepada Penanggung.`,
    },
    {
      id: '14. ',
      key: `Jika ada perbedaan data antara data di Polis sebelumnya dengan data di dalam SPAJ ini, maka yang berlaku adalah data yang tertera di dalam SPAJ ini. Dalam hal Calon Pemegang Polis dan/atau Calon Tertanggung dan/atau Calon Pembayar Premi dan/atau Calon Penerima Manfaat memiliki Polis di Grup Prudential dan/atau Calon Tertanggung dan/atau Calon Pembayar Premi dan/atau Calon Penerima Manfaat berbeda dengan data terbaru pada SPAJ ini, maka SAYA setuju bahwa Prudential Indonesia dapat mengganti data Polis Prudential dengan data yang tertera pada SPAJ ini baik untuk Polis yang terbit maupun tidak terbit.`,
    },
    {
      id: '15. ',
      key: `Dalam hal SAYA membayarkan sejumlah dana ke Penanggung atas SPAJ/Polis ini, tanpa memberikan instruksi yang jelas mengenai tujuan penggunaan dana tersebut, maka Penanggung berhak mengalokasikan dana tersebut di jenis Dana Investasi <b>PRU</b>Link yang terakhir yang tercantum di Polis.`,
    },
    {
      id: '16. ',
      key: `Premi untuk cicilan pertama sesuai dengan frekuensi bayar yang tercantum di SPAJ/Ilustrasi tidak termasuk Premi <i>Top-up</i> Tunggal jika ada (selanjutnya disebut “Premi Pertama” ), dibayarkan setelah pengajuan SPAJ SAYA disetujui oleh Penanggung dengan maksimum yang terakhir antara 14 (empat belas) hari atau 30 (tiga puluh) hari (sesuai besar Premi tahunan) atau 30 (tiga puluh) hari kalender sejak SPAJ diterima oleh Penanggung, jika setelah pengajuan SPAJ SAYA disetujui oleh Penanggung dan Premi Pertama belum diterima oleh Penanggung maka pengajuan SPAJ SAYA tersebut dianggap berakhir sesuai ketentuan yang berlaku di Penanggung. Dan Calon Pemegang Polis juga setuju untuk dilakukan transfer kembali atas pembayaran Preminya ke rekening yang tercantum dalam SPAJ ini jika pengajuan SPAJ ini belum disetujui Penanggung.`,
    },
    {
      id: '17. ',
      key: `Jika SPAJ ini merupakan SPAJ pengganti, maka Premi yang telah dibayarkan pada SPAJ sebelumnya di mana SAYA dan Calon Tertanggung merupakan orang yang sama, maka secara otomatis akan dialihkan ke SPAJ ini setelah pengajuan SPAJ pengganti SAYA disetujui oleh Penanggung. Dalam hal pendaftaran dan pembayaran Premi pada SPAJ ini dengan metode pembayaran autodebit kartu kredit/debit atau autodebit rekening bank yang sudah terdaftar di <b>PRU</b>Pay Link maka wajib dilakukan melalui <b>PRU</b>Pay Link (https://payment.prudential.co.id). Bagi autodebit kartu kredit berlogo BCA Card atau autodebit rekening yang belum terdaftar di <b>PRU</b>Pay Link maka perlu melampirkan Surat Kuasa Pendebitan Kartu Kredit (SKPKK) khusus BCA Card atau Surat Kuasa Pendebitan Rekening (SKPR) sesuai dengan ketentuan Bank yang berlaku. Jika Calon Pemegang Polis melawati masa 30 hari kalender setelah SPAJ diterima oleh Penanggung, maka perlu mengajukan SPAJ baru dan pendaftaran autodebit dengan nomor SPAJ yang baru melalui <b>PRU</b>Pay Link.`,
    },
    {
      id: '18. ',
      key: `Pengajuan SPAJ dan persyaratan/kelengkapan dokumen yang diperlukan disetujui oleh Penanggung kemudian seluruh pembayaran Premi diterima, teridentifikasi dan terproses oleh Kantor Pusat PT Prudential Life Assurance ("Prudential Indonesia") maka, tenggat waktu untuk jenis Dana Investasi:`,
    },
    {
      subid: 'a. ',
      subkey: `Sebelum pukul 12.00 WIB Khusus untuk Transaksi Dana Investasi Dalam Negeri (on-shore funds). Jumlah Unit yang dibentuk akan ditentukan berdasarkan Harga Unit pada hari yang sama. Apabila persyaratan/kelengkapan pengajuan SPAJ yang diterima tidak lengkap atau formulir tidak terisi dengan lengkap dan benar, maka perhitungan Harga Unit akan mengikuti Harga Unit setelah kelengkapan dokumen terakhir diterima dan disetujui oleh Penanggung kemudian seluruh pembayaran Premi diterima, teridentifikasi dan terproses oleh Kantor Pusat Prudential Indonesia sesuai dengan ketentuan tenggat waktu yang berlaku di Prudential Indonesia.`
    },
    {
      subid: 'b. ',
      subkey: `Paling lambat pukul 17.00 WIB Jumlah Unit yang dibentuk akan ditentukan berdasarkan Harga Unit pada Tanggal Perhitungan berikutnya. Apabila persyaratan/kelengkapan pengajuan SPAJ yang diterima tidak lengkap atau formulir tidak terisi dengan lengkap dan benar, maka perhitungan Harga Unit akan mengikuti Harga Unit setelah kelengkapan dokumen terakhir diterima dan disetujui oleh Penanggung kemudian seluruh pembayaran Premi diterima, teridentifikasi dan terproses oleh Kantor Pusat Prudential Indonesia sesuai dengan ketentuan tenggat waktu yang berlaku di Prudential Indonesia.`
    },
    {
      id: '19. ',
      key: `SAYA memahami dan setuju bahwa Polis SAYA akan dikirimkan secara elektronik melalui <i>E-mail</i> yang SAYA daftarkan pada SPAJ ini setelah proses pengajuan asuransi SAYA disetujui oleh Penanggung.`,
    },
    {
      id: '20. ',
      key: `Dalam kondisi di mana Polis SAYA menjadi tidak aktif (<i>lapsed</i>) di kemudian hari dan SAYA memilih Pemulihan Polis tanpa Masa Tunggu*), maka SAYA memahami bahwa SAYA perlu melampirkan Formulir Pemulihan Polis dan hasil pemeriksaan kesehatan terbaru beserta Formulir Persetujuan Ketentuan Masa Tunggu (“Dokumen Kelengkapan Pemulihan Polis”). Pada saat pengajuan Pemulihan Polis, nantinya SAYA dapat memilih pilihan Masa Tunggu yang berbeda dengan pilihan SAYA saat ini. Apabila SAYA melakukan pembayaran Premi tanpa disertai Dokumen Kelengkapan Pemulihan Polis dan Polis SAYA memenuhi kriteria kebijakan Pemulihan Polis secara otomatis**), maka SAYA memahami dan menyetujui bahwa pembayaran Premi tersebut merupakan bentuk persetujuan SAYA terhadap ketentuan Masa Tunggu, sehingga Polis SAYA akan dipulihkan dengan dikenakan Masa Tunggu dan SAYA memahami konsekuensi dari Masa Tunggu. *) Ketentuan Masa Tunggu dan pembayaran klaim mengacu pada Formulir Persetujuan Ketentuan Masa Tunggu yang berlaku. **) Pemulihan Polis secara otomatis merupakan kebijakan yang dapat diberikan oleh Penanggung, namun tidak mengikat dan/atau dapat berubah sewaktu-waktu.`,
    },
    {
      id: '21. ',
      key: `Penanggung hanya akan menerima pembayaran Premi (maupun transaksi lainnya) sesuai metode pembayaran yang telah ditentukan oleh Penanggung dari waktu ke waktu, yakni melalui rekening resmi milik Penanggung. Oleh karena itu, pembayaran tersebut hanya akan SAYA lakukan melalui metode pembayaran yang telah ditentukan oleh Penanggung. Penanggung tidak akan bertanggung jawab atas risiko dan kerugian yang timbul (apabila ada) jika SAYA melakukan pembayaran Premi (maupun transaksi lainnya) selain menggunakan metode pembayaran yang telah ditentukan oleh Penanggung.`,
    },
    {
      id: '22. ',
      key: `SPAJ ini berbentuk elektronik/digital sehingga untuk selanjutnya SAYA akan memberikan persetujuan dalam bentuk tanda tangan elektronik yang akan dipersamakan keabsahannya dengan tanda tangan basah SAYA.`,
    },
    {
      id: '23. ',
      key: `Dalam 1 (satu) tahun terakhir sampai dengan SPAJ ini ditandatangani dan ajukan oleh SAYA kepada Penanggung, baik SAYA atau keluarga inti SAYA, atau SAYA sebagai Pemegang Polis/Tertanggung/Pembayar Premi, tidak berstatus sebagai Penerima Manfaat dari program bantuan sosial (Bansos) untuk kategori fakir miskin atau tidak mampu yang diberikan oleh Pemerintah. Jika dikemudian hari setelah SPAJ ini disampaikan kepada Penanggung dan telah diterbitkan Polis Asuransi Jiwa atas pengajuan SAYA tersebut, ditemukan fakta bahwa SAYA ataupun keluarga inti SAYA, atau SAYA sebagai Pemegang Polis/Tertanggung/Pembayar Premi, berstatus sebagai Penerima Manfaat dari program Bansos, baik sebelum maupun sesudah Polis Asuransi Jiwa diterbitkan, maka Penanggung berhak untuk meminta dokumen finansial dan/atau melakukan seleksi ulang risiko. Apabila dokumen finansial tidak dapat dipenuhi, maka Penanggung dapat membatalkan Polis Asuransi Jiwa.`,
    },
  ]

  const PCPP_PNGS = [
    {
      id: '',
      key: i18next.t('Epos:policyholder_declaration_warning', { spaj }),
    },
    {
      id: '',
      key: i18next.t('Epos:declaration_of_understanding_and_agreement'),
    },
    {
      id: '1. ',
      key: `Semua keterangan yang SAYA berikan di dalam SPAJ Syariah ini dan keterangan lain yang SAYA berikan kepada PT Prudential Sharia Life Assurance (Prudential Syariah) (selanjutnya disebut “Pengelola”) atau Tenaga Pemasar atau kepada Pemeriksa Kesehatan yang ditunjuk oleh Pengelola dan/atau keterangan yang tertulis di dalam dokumen SPAJ tambahan Syariah, Kuesioner dan/atau dokumen lain yang menjadi kelengkapan dan tidak terpisahkan dari SPAJ Syariah ini adalah benar, sesuai, akurat, dan tidak menyesatkan, serta tidak ada hal-hal lain yang telah SAYA ketahui namun SAYA sembunyikan dan/atau tidak SAYA informasikan kepada Pengelola. Semua keterangan yang SAYA berikan di dalam SPAJ Syariah (termasuk yang ditulis di dalam Surat Pernyataan/Amendemen untuk SPAJ Syariah/SPAJT Syariah/Pengajuan Pelayanan Polis) dan/atau Kuesioner (jika ada) dan yang disampaikan kepada Pemeriksa Kesehatan yang ditunjuk oleh Pengelola (jika ada) akan menjadi dasar bagi Pengelola dalam penerbitan Polis.`,
    },
    {
      id: '2. ',
      key: `SAYA sendiri yang melengkapi dan menandatangani SPAJ Syariah ini serta telah menerima, memahami secara mandiri, dan menyetujui lembar Ringkasan Informasi Produk dan Layanan Versi Personal (Ilustrasi) <b>PRU</b>Link NextGen Syariah yang menjelaskan mengenai risiko, manfaat, kewajiban dan pembebanan biaya asuransi serta jenis Dana Investasi <b>PRU</b>Link Syariah yang telah disampaikan "<b>secara langsung</b>" oleh Tenaga Pemasar. Segala risiko pemilihan manfaat asuransi dan jenis Dana Investasi <b>PRU</b>Link Syariah sepenuhnya menjadi tanggung jawab SAYA.`,
    },
    {
      id: '3. ',
      key: `SAYA telah bertemu secara langsung dengan Tenaga Pemasar, pada saat SAYA mengisi dan menandatangani penawaran produk dan SPAJ Syariah ini.`,
    },
    {
      id: '4. ',
      key: `SAYA memahami bahwa setelah Polis terbit, Pengelola akan menghubungi SAYA melalui telepon ("<i>Welcome Call</i>") untuk mengevaluasi layanan pembelian produk ini. SAYA mengerti dan akan menerima konsekuensinya jika SAYA tidak dapat dihubungi,maka Pengelola dapat menggunakan konfirmasi pemahaman SAYA atas produk yang SAYA beli dengan merujuk pada semua dokumen yang SAYA telah konfirmasi dan tandatangani melalui sarana pengajuan SPAJ yang ada di aplikasi <b>PRU</b>Force ataupun sarana lain yang telah disediakan oleh Pengelola.`,
    },
    {
      id: '5. ',
      key: `Bahwa Pengelola berhak meminta dokumen berupa bukti penghasilan atau dokumen lainnya yang diperlukan (dan SAYA berkewajiban untuk menyampaikan dokumen tersebut kepada Pengelola) untuk memastikan kesesuaian profil SAYA dan/atau Calon Peserta Yang Diasuransikan dan/atau Calon Pembayar Kontribusi. Dalam hal dokumen yang diperlukan tersebut tidak diterima Pengelola atau dokumen yang diperlukan tersebut mempunyai informasi yang berbeda dan/atau tidak lengkap dengan informasi yang sebelumnya diterima oleh Pengelola, maka SAYA menyetujui bahwa Pengelola berhak menangguhkan transaksi apa pun yang SAYA ajukan dengan memberikan pemberitahuan kepada SAYA.`,
    },
    {
      id: '6. ',
      key: `Kepesertaan pada Asuransi Dasar dan Asuransi Tambahan (jika ada) tidak akan dimulai sebelum Polis diterbitkan. Jika terjadi peristiwa yang diasuransikan dalam Polis sebelum tanggal Polis diterbitkan, atau SAYA tidak melengkapi persyaratan pengajuan asuransi yang diminta oleh Pengelola dalam waktu 30 (tiga puluh) hari kalender sejak SPAJ Syariah terdaftar di Kantor Pusat Pengelola, atau SAYA membatalkan pengajuan asuransi kepada Pengelola, maka Pengelola tidak berkewajiban untuk membayar manfaat apa pun.`,
    },
    {
      id: '7. ',
      key: `Kepesertaan pada Asuransi Dasar dan Asuransi Tambahan (jika ada) akan dinilai ulang oleh Pengelola apabila terdapat pemeriksaan kesehatan yang dilakukan sebelum Polis terbit di luar pengetahuan Pengelola, yang hasilnya dapat memengaruhi/mengubah keputusan <i>Underwriting</i> (Seleksi Risiko) dan/atau apabila terdapat keterangan, pernyataan atau pemberitahuan yang disampaikan (termasuk pernyataan sebagaimana dimaksud dalam butir 5 di atas) ternyata keliru atau berbeda atau berubah yang sifatnya sedemikian rupa sehingga kepesertaan pada Asuransi Dasar dan Asuransi Tambahan (jika ada) dan/atau Polis dapat menjadi batal dan dianggap tidak pernah berlaku dan atas hal tersebut Pengelola tidak berkewajiban membayar apa pun selain Biaya Asuransi dan Nilai Tunai (jika ada).`,
    },
    {
      id: '8. ',
      key: `Jika terdapat perubahan jenis Dana Investasi <b>PRU</b>Link Syariah, alokasi Dana Investasi <b>PRU</b>Link Syariah, besar maupun komposisi Kontribusi, termasuk tetapi tidak terbatas pada dikenakannya keputusan tidak standar pada pengajuan asuransi SAYA, maka Tanggal Perhitungan Harga Unit menjadi Tanggal Perhitungan berikutnya setelah diterimanya pemberitahuan perubahan jenis Dana Investasi <b>PRU</b>Link Syariah, alokasi Dana Investasi <b>PRU</b>Link Syariah, besar maupun komposisi Kontribusi, Surat Persetujuan Keputusan Tidak Standar atas SPAJ Syariah ini atau teridentifikasinya seluruh pembayaran Kontribusi Pertama di Kantor Pusat Pengelola, mana yang paling akhir.`,
    },
    {
      id: '9. ',
      key: `Ketentuan pembentukan Unit dari Kontribusi Pertama untuk investasi sebagaimana dijelaskan pada Poin C.3 di bawah ini otomatis menjadi batal apabila SAYA membatalkan SPAJ Syariah SAYA, atau pengajuan SPAJ Syariah SAYA dibatalkan/ditangguhkan/ditolak oleh Pengelola. Apabila dengan kebijakan khusus kemudian Pengelola setuju untuk menerbitkan Polis setelah sebelumnya SPAJ Syariah SAYA dibatalkan/ditangguhkan/ditolak oleh Pengelola, maka dengan ini SAYA menyetujui bahwa pembentukan Unit Kontribusi Pertama untuk Investasi yang pernah dilakukan tersebut akan tetap dibatalkan dan pembentukan Unit dari Kontribusi Pertama untuk investasi (atas dikeluarkannya kebijakan khusus tersebut) akan mengikuti Harga Unit terdekat berikutnya setelah Polis diterbitkan.`,
    },
    {
      id: '10. ',
      key: `Bahwa pada waktu SAYA mengajukan klaim Manfaat Asuransi, Pengelola berhak meminta bukti keabsahan hubungan keterikatan asuransi antara Pemegang Polis, Peserta Yang Diasuransikan dan Penerima Manfaat. Dalam hal hubungan antara Pemegang Polis, Peserta Yang Diasuransikan dan Penerima Manfaat terdapat perbedaan dengan yang tertulis di SPAJ Syariah ini (misalnya: tidak bisa diverifikasi), Pengelola berhak meminta dokumen pendukung yang wajar dan relevan dengan pengajuan klaim.`,
    },
    {
      id: '11. ',
      key: `Bahwa pada waktu SAYA mengajukan klaim Manfaat Asuransi, Pengelola berhak meminta kesesuaian profil finansial SAYA dan/atau Peserta Yang Diasuransikan dan/atau Pembayar Kontribusi. Dalam hal terdapat perbedaan pada profil finansial SAYA dan/atau Peserta Yang Diasuransikan dan/atau Pembayar Kontribusi dengan yang tertulis di SPAJ Syariah ini (misalnya: tidak bisa diverifikasi), Pengelola berhak meminta dokumen pendukung yang wajar dan relevan dengan pengajuan klaim dan dokumen pendukung untuk mendukung verifikasi profil finansial. Apabila dokumen pendukung tidak disampaikan atau disampaikan tetapi tidak sesuai dengan profil finansial SAYA, maka Pengelola berhak untuk melakukan pembatalan Polis yang telah diterbitkan.`,
    },
    {
      id: '12. ',
      key: `SAYA dan/atau Calon Peserta Yang Diasuransikan dan/atau Calon Penerima Manfaat yang diwakilkan oleh SAYA, dengan ini memberikan kuasa dan izin kepada:`,
    },
    {
      subid: '(i) ',
      subkey: `Pengelola untuk memperoleh, mengumpulkan, mengolah, menganalisis, menyimpan, memperbaiki, melakukan pembaruan, menampilkan, mengumumkan, mentransfer, menyebarluaskan, mengungkapkan, menghapus atau memusnahkan data pribadi sesuai prinsip pelindungan Data Pribadi (Pemrosesan Data Pribadi) terkait riwayat kesehatan, dan riwayat keuangan Calon Peserta Yang Diasuransikan atau informasi lain mengenai diri Calon Peserta Yang Diasuransikan sejak pengajuan SPAJ Syariah sampai dengan pengajuan klaim dari setiap tenaga medis, rumah sakit, klinik, puskesmas, laboratorium, perusahaan asuransi, perusahaan reasuransi, lembaga/perusahaan di bidang jasa keuangan maupun layanan informasi keuangan, badan, instansi/lembaga, Perusahaan tempat SAYA dan/atau Peserta Yang Diasuransikan bekerja atau pihak lain yang mempunyai catatan/informasi riwayat kesehatan, catatan/informasi keuangan, atau informasi lain mengenai diri Calon Peserta Yang Diasuransikan sejak periode pengajuan SPAJ Syariah sampai hingga periode pengajuan klaim; dan`,
    },
    {
      subid: '(ii) ',
      subkey: `Setiap tenaga medis, rumah sakit, klinik, puskesmas, laboratorium, perusahaan asuransi, perusahaan reasuransi, lembaga/perusahaan di bidang jasa keuangan maupun layanan informasi keuangan, badan, instansi/Lembaga, koperasi, atau pihak lain yang mempunyai catatan riwayat kesehatan, catatan/informasi keuangan, atau informasi lain mengenai diri Calon Peserta Yang Diasuransikan untuk mengungkapkan atau memberikan kepada Pengelola semua catatan riwayat kesehatan, atau perawatan, atau catatan/informasi keuangan, atau informasi lain mengenai diri Calon Peserta Yang Diasuransikan.`,
    },
    {
      subid: ' ',
      subkey: `Pemberian kuasa ini tidak dapat ditarik kembali atau dibatalkan dan tetap berlaku pada waktu Calon Peserta Yang Diasuransikan masih hidup maupun sesudah meninggal dunia, maupun oleh sebab-sebab yang disebutkan dalam Pasal 1813, Pasal 1814, dan Pasal 1816 Kitab Undang-Undang Hukum Perdata Indonesia. Salinan/fotokopi dari kuasa ini memiliki kekuatan hukum yang sama dan mengikat sesuai dengan aslinya.`,
    },
    {
      id: '13. ',
      key: `Dalam rangka pengajuan dan pembayaran klaim, maupun pelayanan kepada Peserta, SAYA menyatakan bahwa SAYA telah memiliki wewenang sah yang diperoleh dari Calon Penerima Manfaat untuk memberikan data dan/atau informasi pribadi dari Calon Penerima Manfaat kepada Pengelola.`,
    },
    {
      id: '14. ',
      key: `Jika ada perbedaan data antara data di Polis sebelumnya dengan data di dalam SPAJ Syariah ini, maka yang berlaku adalah data yang tertera di dalam SPAJ Syariah ini. Dalam hal Calon Pemegang Polis dan/atau Calon Peserta Yang Diasuransikan dan/atau Calon Pembayar Kontribusi dan/atau Calon Penerima Manfaat memiliki Polis di Grup Prudential dan/atau Calon Peserta Yang Diasuransikan dan/atau Calon Pembayar Kontribusi dan/atau Calon Penerima Manfaat berbeda dengan data terbaru pada SPAJ Syariah ini, maka SAYA setuju bahwa Prudential Syariah dapat mengganti data Polis Prudential dengan data yang tertera pada SPAJ Syariah ini baik untuk Polis yang terbit maupun tidak terbit.`,
    },
    {
      id: '15. ',
      key: `Dalam hal SAYA membayarkan sejumlah dana ke Pengelola atas SPAJ Syariah/Polis ini, tanpa memberikan instruksi yang jelas mengenai tujuan penggunaan dana tersebut, maka Pengelola berhak mengalokasikan dana tersebut di jenis Dana Investasi <b>PRU</b>Link Syariah yang terakhir yang tercantum di Polis.`,
    },
    {
      id: '16. ',
      key: `Kontribusi untuk iuran pertama sesuai dengan frekuensi bayar yang tercantum di SPAJ Syariah/Ilustrasi tidak termasuk Kontribusi <i>Top-up</i> Tunggal jika ada (selanjutnya disebut “Kontribusi Pertama” ), dibayarkan setelah pengajuan SPAJ Syariah SAYA disetujui oleh Pengelola dengan maksimum yang terakhir antara 14 (empat belas) hari atau 30 (tiga puluh) hari (sesuai besar Kontribusi tahunan) atau 30 (tiga puluh) hari kalender sejak SPAJ Syariah diterima oleh Pengelola, jika setelah pengajuan SPAJ Syariah SAYA disetujui oleh Pengelola dan Kontribusi Pertama belum diterima oleh Pengelola maka pengajuan SPAJ Syariah SAYA tersebut dianggap berakhir sesuai ketentuan yang berlaku di Pengelola. Dan Calon Pemegang Polis juga setuju untuk dilakukan transfer kembali atas pembayaran Kontribusinya ke rekening yang tercantum dalam SPAJ Syariah ini jika pengajuan SPAJ Syariah ini belum disetujui Pengelola.`,
    },
    {
      id: '17. ',
      key: `Jika SPAJ Syariah ini merupakan SPAJ pengganti, maka Kontribusi yang telah dibayarkan pada SPAJ sebelumnya di mana SAYA dan Calon Peserta Yang Diasuransikan merupakan orang yang sama, maka secara otomatis akan dialihkan ke SPAJ Syariah ini setelah pengajuan SPAJ Syariah pengganti SAYA disetujui oleh Pengelola. Dalam hal pendaftaran dan pembayaran Kontribusi pada SPAJ Syariah ini dengan metode pembayaran autodebit kartu kredit/debit atau autodebit rekening bank yang sudah terdaftar di <b>PRU</b>PayLink maka wajib dilakukan melalui <b>PRU</b>Pay Link (https://payment.prudentialsyariah.co.id). Bagi autodebit kartu kredit berlogo BCA Card atau autodebit rekening yang belum terdaftar di <b>PRU</b>Pay Link maka perlu melampirkan Surat Kuasa Pendebitan Kartu Kredit (SKPKK) khusus BCA Card atau Surat Kuasa Pendebitan Rekening (SKPR) sesuai dengan ketentuan Bank yang berlaku. Jika Calon Pemegang Polis melewati masa 30 hari kalender setelah SPAJ Syariah diterima oleh Pengelola, maka perlu mengajukan SPAJ Syariah baru dan pendaftaran autodebit dengan nomor SPAJ Syariah yang baru melalui <b>PRU</b>Pay Link.`,
    },
    {
      id: '18. ',
      key: `Pengajuan SPAJ Syariah dan persyaratan/kelengkapan dokumen yang diperlukan disetujui oleh Pengelola kemudian seluruh pembayaran Kontribusi diterima, teridentifikasi dan terproses oleh Kantor Pusat PT Prudential Sharia Life Assurance ("PrudentialSyariah”) maka, tenggat waktu untuk jenis Dana Investasi:`,
    },
    {
      subid: 'a. ',
      subkey: `Sebelum pukul 12.00 WIB Khusus untuk Transaksi Dana Investasi Dalam Negeri (<i>on-shore funds</i>). Jumlah Unit yang dibentuk akan ditentukan berdasarkan Harga Unit pada hari yang sama. Apabila persyaratan/kelengkapan pengajuan SPAJ Syariah yang diterima tidak lengkap atau formulir tidak terisi dengan lengkap dan benar, maka perhitungan Harga Unit akan mengikuti Harga Unit setelah kelengkapan dokumen terakhir diterima dan disetujui oleh Pengelola kemudian seluruh pembayaran Kontribusi diterima, teridentifikasi dan terproses oleh Kantor Pusat Prudential Syariah sesuai dengan ketentuan tenggat waktu yang berlaku di Prudential Syariah.`
    },
    {
      subid: 'b. ',
      subkey: `Paling lambat pukul 17.00 WIB Apabila pengajuan SPAJ Syariah disetujui maka jumlah Unit yang dibentuk akan ditentukan berdasarkan Harga Unit pada Tanggal Perhitungan berikutnya. Apabila persyaratan/kelengkapan pengajuan SPAJ Syariah yang diterima tidak lengkap atau formulir tidak terisi dengan lengkap dan benar, maka perhitungan Harga Unit akan mengikuti Harga Unit setelah kelengkapan dokumen terakhir diterima dan disetujui oleh Pengelola kemudian seluruh pembayaran Kontribusi diterima, teridentifikasi dan terproses oleh Kantor Pusat Prudential Syariah sesuai dengan ketentuan tenggat waktu yang berlaku di Prudential Syariah.`
    },
    {
      id: '19. ',
      key: `SAYA memahami dan setuju bahwa Polis SAYA akan dikirimkan secara elektronik melalui <i>E-mail</i> yang SAYA daftarkan pada SPAJ Syariah ini setelah proses pengajuan asuransi SAYA disetujui oleh Pengelola.`,
    },
    {
      id: '20. ',
      key: `Dalam kondisi di mana Polis SAYA menjadi tidak aktif (<i>lapsed</i>) di kemudian hari dan SAYA memilih Pemulihan Polis tanpa Masa Tunggu*), maka SAYA memahami bahwa SAYA perlu melampirkan Formulir Pemulihan Polis dan hasil pemeriksaan kesehatan terbaru beserta Formulir Persetujuan Ketentuan Masa Tunggu (“Dokumen Kelengkapan Pemulihan Polis”). Pada saat pengajuan Pemulihan Polis, nantinya SAYA dapat memilih pilihan Masa Tunggu yang berbeda dengan pilihan SAYA saat ini. Apabila SAYA melakukan pembayaran Kontribusi tanpa disertai Dokumen Kelengkapan Pemulihan Polis dan Polis SAYA memenuhi kriteria kebijakan Pemulihan Polis secara otomatis**), maka SAYA memahami dan menyetujui bahwa pembayaran Kontribusi tersebut merupakan bentuk persetujuan SAYA terhadap ketentuan Masa Tunggu, sehingga Polis SAYA akan dipulihkan dengan dikenakan Masa Tunggu dan SAYA memahami konsekuensi dari Masa Tunggu. *) Ketentuan Masa Tunggu dan pembayaran klaim mengacu pada Formulir Persetujuan Ketentuan Masa Tunggu yang berlaku. **) Pemulihan Polis secara otomatis merupakan kebijakan yang dapat diberikan oleh Pengelola, namun tidak mengikat dan/atau dapat berubah sewaktu-waktu.`,
    },
    {
      id: '21. ',
      key: `Prudential Syariah hanya akan menerima pembayaran Kontribusi (maupun transaksi lainnya) sesuai metode pembayaran yang telah ditentukan oleh Prudential Syariah dari waktu ke waktu, yakni melalui rekening resmi milik Prudential Syariah. Oleh karena itu,pembayaran tersebut hanya akan SAYA lakukan melalui metode pembayaran yang telah ditentukan oleh Prudential Syariah. Prudential Syariah tidak akan bertanggung jawab atas risiko dan kerugian yang timbul (apabila ada) jika SAYA melakukan pembayaran Kontribusi (maupun transaksi lainnya) selain menggunakan metode pembayaran yang telah ditentukan oleh Prudential Syariah.`,
    },
    {
      id: '22. ',
      key: `SPAJ Syariah ini berbentuk elektronik/digital sehingga untuk selanjutnya SAYA akan memberikan persetujuan dalam bentuk tanda tangan elektronik yang akan dipersamakan keabsahannya dengan tanda tangan basah SAYA.`,
    },
    {
      id: '23. ',
      key: `Dalam 1 (satu) tahun terakhir sampai dengan SPAJ Syariah ini ditandatangani dan ajukan oleh SAYA kepada Pengelola, baik SAYA atau keluarga inti SAYA, atau SAYA sebagai Pemegang Polis/Peserta Yang Diasuransikan/Pembayar Kontribusi, tidak berstatus sebagai Penerima Manfaat dari program  bantuan sosial (Bansos) untuk kategori fakir miskin atau tidak mampu yang diberikan oleh Pemerintah. Jika dikemudian hari setelah SPAJ Syariah ini disampaikan kepada Pengelola dan telah diterbitkan Polis Asuransi Jiwa atas pengajuan SAYA tersebut, ditemukan fakta bahwa SAYA ataupun keluarga inti SAYA, atau SAYA sebagai Pemegang Polis/ Peserta Yang Diasuransikan /Pembayar Kontribusi, berstatus sebagai Penerima Manfaat dari program Bansos, baik sebelum maupun sesudah Polis Asuransi Jiwa diterbitkan, maka Pengelola berhak untuk meminta dokumen finansial dan/atau  melakukan seleksi ulang risiko. Apabila dokumen finansial tidak dapat dipenuhi, maka Pengelola dapat membatalkan Polis Asuransi Jiwa Syariah.`,
    },
  ]

  const PCPP_UL_W_PWH = [
    {
      id: '24. ',
      key: i18next.t('Epos:PCPP_24_PWH', { spaj, insurerManager, premiContribution, insured })
    },
    {
      subid: '1) ',
      subkey: i18next.t('Epos:PCPP_24_PWH_Point_1', { spaj, insurerManager, premiContribution, lifeAssured })
    },
    {
      subid: '2) ',
      subkey: i18next.t('Epos:PCPP_24_PWH_Point_2', { spaj, insurerManager, premiContribution })
    },
    {
      subid: '    - ',
      subkey: i18next.t('Epos:PCPP_24_PWH_Point2_DASH_1', { spaj, insurerManager, premiContribution })
    },
    {
      subid: '    - ',
      subkey: i18next.t('Epos:PCPP_24_PWH_Point2_DASH_2', { spaj, insurerManager, premiContribution, insured })
    },
    {
      subid: '    - ',
      subkey: i18next.t('Epos:PCPP_24_PWH_Point2_DASH_3', { spaj, insurerManager, premiContribution })
    },
    {
      subid: '3) ',
      subkey: i18next.t('Epos:PCPP_24_PWH_Point_3', { spaj, insurerManager, premiContribution })
    },
    {
      subid: '    - ',
      subkey: i18next.t('Epos:PCPP_24_PWH_Point4_DASH_1', { spaj, insurerManager, premiContribution, insured })
    },
    {
      subid: '    - ',
      subkey: i18next.t('Epos:PCPP_24_PWH_Point4_DASH_2', { spaj, insurerManager, premiContribution })
    },
  ];

  const PCPP_PRUCERAH = [
    {
      id: '',
      key: `PERNYATAAN CALON PEMEGANG POLIS (selanjutnya disebut "SAYA", harap dibaca dengan teliti sebelum menandatangani ${spaj} ini)`,
    },
    {
      id: '',
      key: `SAYA menyatakan bahwa telah mengerti dan telah mendapat penjelasan sepenuhnya dari Tenaga Pemasar dan selanjutnya menyatakan setuju mengenai hal-hal yang tersebut di bawah ini:`,
    },
    {
      id: '1. ',
      key: 'Semua keterangan yang SAYA berikan di dalam SPAJ Syariah ini dan keterangan lain yang SAYA berikan kepada PT Prudential Sharia Life Assurance (Prudential Syariah) (selanjutnya disebut “Pengelola”) atau Tenaga Pemasar atau kepada Pemeriksa Kesehatan yang ditunjuk oleh Pengelola dan/atau keterangan yang tertulis di dalam dokumen SPAJ tambahan Syariah, Kuesioner dan/atau dokumen lain yang menjadi kelengkapan dan tidak terpisahkan dari SPAJ Syariah ini adalah benar, sesuai, akurat, dan tidak menyesatkan, serta tidak ada hal-hal lain yang telah SAYA ketahui namun SAYA sembunyikan dan/atau tidak SAYA informasikan kepada Pengelola. Semua keterangan yang SAYA berikan di dalam SPAJ Syariah (termasuk yang ditulis di dalam Surat Pernyataan/Amendemen untuk SPAJ Syariah/SPAJT Syariah/Pengajuan Pelayanan Polis) dan/atau Kuesioner (jika ada) dan yang disampaikan kepada Pemeriksa Kesehatan yang ditunjuk oleh Pengelola (jika ada) akan menjadi dasar bagi Pengelola dalam penerbitan Polis.',
    },
    {
      id: '2. ',
      key: `SAYA sendiri yang melengkapi dan menandatangani SPAJ Syariah ini serta telah menerima, memahami secara mandiri, dan menyetujui lembar lembar Ringkasan Informasi Produk dan Layanan Versi Personal (Ilustrasi) ${productName} yang menjelaskan risiko, manfaat, kewajiban dan pembebanan biaya asuransi yang telah disampaikan "secara langsung" oleh Tenaga Pemasar. Segala risiko pemilihan manfaat asuransi sepenuhnya menjadi tanggung jawab SAYA.`,
    },
    {
      id: '3. ',
      key: 'Bahwa Pengelola berhak meminta dokumen berupa bukti penghasilan atau dokumen lainnya yang diperlukan (dan SAYA berkewajiban untuk menyampaikan dokumen tersebut kepada Pengelola) untuk memastikan kesesuaian profil SAYA dan/atau Calon Peserta Yang Diasuransikan dan/atau Calon Pembayar Kontribusi. Dalam hal dokumen yang diperlukan tersebut tidak diterima Pengelola atau dokumen yang diperlukan tersebut mempunyai informasi yang berbeda dan/atau tidak lengkap dengan informasi yang sebelumnya diterima oleh Pengelola, maka SAYA menyetujui bahwa Pengelola berhak menangguhkan transaksi apa pun yang SAYA ajukan dengan memberikan pemberitahuan kepada SAYA.',
    },
    {
      id: '4. ',
      key: 'Tanpa mengesampingkan ketentuan pada Poin D (Ketentuan Kepesertaan Manfaat Meninggal Dunia Karena Kecelakaan Sebelum Polis Diterbitkan), kepesertaan pada Asuransi Jiwa Syariah tidak akan dimulai sebelum Polis diterbitkan. Jika terjadi peristiwa yang diasuransikan dalam Polis sebelum tanggal Polis diterbitkan, atau SAYA tidak melengkapi persyaratan pengajuan asuransi yang diminta oleh Pengelola dalam waktu 30 (tiga puluh) hari kalender sejak SPAJ Syariah terdaftar di Kantor Pusat Pengelola, atau SAYA membatalkan pengajuan asuransi kepada Pengelola, maka Pengelola tidak berkewajiban untuk membayar manfaat apa pun kecuali mengembalikan Kontribusi (jika telah dibayarkan oleh SAYA) dikurangi semua biaya pemeriksaan kesehatan yang timbul (jika ada).',
    },
    {
      id: '5. ',
      key: 'Kepesertaan pada Asuransi Jiwa Syariah akan dinilai ulang oleh Pengelola apabila terdapat pemeriksaan kesehatan yang dilakukan sebelum Polis terbit di luar pengetahuan Pengelola, yang hasilnya dapat memengaruhi/mengubah keputusan Underwriting (Seleksi Risiko) dan/atau apabila terdapat keterangan, pernyataan atau pemberitahuan yang disampaikan (termasuk pernyataan sebagaimana dimaksud dalam butir 3 di atas) ternyata keliru atau berbeda atau berubah yang sifatnya sedemikian rupa sehingga kepesertaan pada Asuransi Jiwa Syariah dan/atau Polis dapat menjadi batal dan dianggap tidak pernah berlaku dan atas hal tersebut Pengelola tidak berkewajiban membayar apa pun selain Nilai Tunai (jika ada).',
    },
    {
      id: '6. ',
      key: 'Semua pembayaran Kontribusi harus sudah diterima di rekening Pengelola dan telah teridentifikasi.',
    },
    {
      id: '7. ',
      key: 'Bahwa pada waktu SAYA mengajukan klaim Manfaat Asuransi, Pengelola berhak meminta bukti keabsahan hubungan keterikatan asuransi antara Pemegang Polis, Peserta Yang Diasuransikan dan Penerima Manfaat. Dalam hal hubungan antara Pemegang Polis, Peserta Yang Diasuransikan dan Penerima Manfaat terdapat perbedaan dengan yang tertulis di SPAJ Syariah ini (misalnya: tidak bisa diverifikasi), Pengelola berhak meminta dokumen pendukung yang wajar dan relevan dengan pengajuan klaim.',
    },
    {
      id: '8. ',
      key: 'Bahwa pada waktu SAYA mengajukan klaim Manfaat Asuransi, Pengelola berhak meminta kesesuaian profil finansial SAYA dan/atau Peserta Yang Diasuransikan dan/atau Pembayar Kontribusi. Dalam hal terdapat perbedaan pada profil finansial SAYA dan/atau Peserta Yang Diasuransikan dan/atau Pembayar Kontribusi dengan yang tertulis di SPAJ Syariah ini (misalnya: tidak bisa diverifikasi), Pengelola berhak meminta dokumen pendukung yang wajar dan relevan dengan pengajuan klaim dan dokumen pendukung untuk mendukung verifikasi profil finansial. Apabila dokumen pendukung tidak disampaikan atau disampaikan tetapi tidak sesuai dengan profil finansial SAYA, maka Pengelola berhak untuk melakukan pembatalan Polis yang telah diterbitkan.',
    },
    {
      id: '9. ',
      key: 'SAYA dan/atau Calon Peserta Yang Diasuransikan dan/atau Calon Penerima Manfaat yang diwakilkan oleh SAYA, dengan ini memberikan kuasa dan izin kepada:',
    },
    {
      subid: '(i)  ',
      subkey: 'Pengelola untuk memperoleh, mengumpulkan, mengolah, menganalisis, menyimpan, memperbaiki, melakukan pembaruan, menampilkan, mengumumkan, mentransfer, menyebarluaskan, mengungkapkan, menghapus atau memusnahkan data pribadi sesuai prinsip pelindungan Data Pribadi (Pemrosesan Data Pribadi) terkait riwayat kesehatan, dan riwayat keuangan Calon Peserta Yang Diasuransikan atau informasi lain mengenai diri Calon Peserta Yang Diasuransikan sejak pengajuan SPAJ Syariah sampai dengan pengajuan klaim dari setiap tenaga medis, rumah sakit, klinik, puskesmas, laboratorium, perusahaan asuransi, perusahaan reasuransi, lembaga/perusahaan di bidang jasa keuangan maupun layanan informasi keuangan, badan, instansi/lembaga, Perusahaan tempat SAYA dan/atau Peserta Yang Diasuransikan bekerja atau pihak lain yang mempunyai catatan/informasi riwayat kesehatan, catatan/informasi keuangan, atau informasi lain mengenai diri Calon Peserta Yang Diasuransikan sejak periode pengajuan SPAJ Syariah sampai hingga periode pengajuan klaim; dan',
    },
    {
      subid: '(ii)  ',
      subkey: 'Setiap tenaga medis, rumah sakit, klinik, puskesmas, laboratorium, perusahaan asuransi, perusahaan reasuransi, lembaga/perusahaan di bidang jasa keuangan maupun layanan informasi keuangan, badan, instansi/Lembaga, koperasi, atau pihak lain yang mempunyai catatan riwayat kesehatan, catatan/informasi keuangan, atau informasi lain mengenai diri Calon Peserta Yang Diasuransikan untuk mengungkapkan atau memberikan kepada Pengelola semua catatan riwayat kesehatan, atau perawatan, atau catatan/informasi keuangan, atau informasi lain mengenai diri Calon Peserta Yang Diasuransikan.',
    },
    {
      subid: '',
      subkey: 'Pemberian kuasa ini tidak dapat ditarik kembali atau dibatalkan dan tetap berlaku pada waktu Calon Peserta Yang Diasuransikan masih hidup maupun sesudah meninggal dunia, maupun oleh sebab-sebab yang disebutkan dalam Pasal 1813, Pasal 1814, dan Pasal 1816 Kitab Undang-Undang Hukum Perdata Indonesia. Salinan/fotokopi dari kuasa ini memiliki kekuatan hukum yang sama dan mengikat sesuai dengan aslinya.',
    },
    {
      id: '10. ',
      key: 'Dalam rangka pengajuan dan pembayaran klaim, maupun pelayanan kepada Peserta, SAYA menyatakan bahwa SAYA telah memiliki wewenang sah yang diperoleh dari Calon Penerima Manfaat untuk memberikan data dan/atau informasi pribadi dari Calon Penerima Manfaat kepada Pengelola.',
    },
    {
      id: '11. ',
      key: 'Jika ada perbedaan data antara data di Polis sebelumnya dengan data di dalam SPAJ Syariah ini, maka yang berlaku adalah data yang tertera di dalam SPAJ Syariah ini. Dalam hal Calon Pemegang Polis dan/atau Calon Peserta Yang Diasuransikan dan/atau Calon Pembayar Kontribusi dan/atau Calon Penerima Manfaat memiliki Polis di Grup Prudential dan/atau Calon Peserta Yang Diasuransikan dan/atau Calon Pembayar Kontribusi dan/atau Calon Penerima Manfaat berbeda dengan data terbaru pada SPAJ Syariah ini, maka SAYA setuju bahwa Prudential Syariah dapat mengganti data Polis Prudential dengan data yang tertera pada SPAJ Syariah ini baik untuk Polis yang terbit maupun tidak terbit.',
    },
    {
      id: '12. ',
      key: 'Jika pengajuan SPAJ Syariah SAYA telah disetujui oleh Pengelola, namun Kontribusi belum diterima oleh Pengelola dalam waktu 14 (empat belas) hari atau 30 (tiga puluh) hari (sesuai besaran Kontribusi tahunan) sejak SPAJ Syariah tersebut disetujui oleh Pengelola atau dalam waktu 30 (tiga puluh) hari kalender sejak SPAJ Syariah diterima di Kantor Pusat Pengelola, mana yang terjadi lebih dahulu, maka pengajuan SPAJ Syariah SAYA tersebut dianggap berakhir sesuai ketentuan yang berlaku di Pengelola.',
    },
    {
      id: '13. ',
      key: 'Jika SPAJ Syariah ini merupakan SPAJ pengganti, maka Kontribusi yang telah dibayarkan pada SPAJ sebelumnya di mana SAYA dan Calon Peserta Yang Diasuransikan merupakan orang yang sama, maka secara otomatis akan dialihkan ke SPAJ Syariah ini. Dalam hal pendaftaran dan pembayaran Kontribusi pada SPAJ Syariah ini dengan metode pembayaran autodebit kartu kredit/debit atau autodebit rekening bank yang sudah terdaftar di PRUPay Link maka wajib dilakukan melalui PRUPay Link (https://payment.prudential.co.id). Bagi autodebit kartu kredit berlogo BCA Card atau autodebit rekening yang belum terdaftar di PRUPay Link maka perlu melampirkan Surat Kuasa Pendebitan Kartu Kredit (SKPKK) khusus BCA Card atau Surat Kuasa Pendebitan Rekening (SKPR) sesuai dengan ketentuan Bank yang berlaku. Jika Calon Pemegang Polis melewati masa 30 hari kalender setelah SPAJ Syariah diterima oleh Pengelola, maka perlu mengajukan SPAJ Syariah baru dan pendaftaran autodebit dengan nomor SPAJ Syariah yang baru melalui PRUPay Link.',
    },
    {
      id: '14. ',
      key: 'SAYA memahami dan setuju bahwa Polis SAYA akan dikirimkan secara elektronik melalui E-mail yang SAYA daftarkan pada SPAJ Syariah ini setelah proses pengajuan asuransi SAYA disetujui oleh Pengelola.',
    },
    {
      id: '15. ',
      key: 'Prudential Syariah hanya akan menerima pembayaran Kontribusi (maupun transaksi lainnya) sesuai metode pembayaran yang telah ditentukan oleh Prudential Syariah dari waktu ke waktu, yakni melalui rekening resmi milik Prudential Syariah. Oleh karena itu, pembayaran tersebut hanya akan SAYA lakukan melalui metode pembayaran yang telah ditentukan oleh Prudential Syariah. Prudential Syariah tidak akan bertanggung jawab atas risiko dan kerugian yang timbul (apabila ada) jika SAYA melakukan pembayaran Kontribusi (maupun transaksi lainnya) selain menggunakan metode pembayaran yang telah ditentukan oleh Prudential Syariah.',
    },
    {
      id: '16. ',
      key: 'SPAJ Syariah ini berbentuk elektronik/digital sehingga untuk selanjutnya SAYA akan memberikan persetujuan dalam bentuk tanda tangan elektronik yang akan dipersamakan keabsahannya dengan tanda tangan basah SAYA.',
    },
    {
      subid: '17. ',
      subkey: 'Dalam 1 (satu) tahun terakhir sampai dengan SPAJ Syariah ini ditandatangani dan ajukan oleh SAYA kepada Pengelola, baik SAYA atau keluarga inti SAYA, atau SAYA sebagai Pemegang Polis/Peserta Yang Diasuransikan/Pembayar Kontribusi, tidak berstatus sebagai Penerima Manfaat dari program  bantuan sosial (Bansos) untuk kategori fakir miskin atau tidak mampu yang diberikan oleh Pemerintah. Jika dikemudian hari setelah SPAJ Syariah ini disampaikan kepada Pengelola dan telah diterbitkan Polis Asuransi Jiwa atas pengajuan SAYA tersebut, ditemukan fakta bahwa SAYA ataupun keluarga inti SAYA, atau SAYA sebagai Pemegang Polis/ Peserta Yang Diasuransikan /Pembayar Kontribusi, berstatus sebagai Penerima Manfaat dari program Bansos, baik sebelum maupun sesudah Polis Asuransi Jiwa diterbitkan, maka Pengelola berhak untuk meminta dokumen finansial dan/atau  melakukan seleksi ulang risiko. Apabila dokumen finansial tidak dapat dipenuhi, maka Pengelola dapat membatalkan Polis Asuransi Jiwa Syariah.'
    }
  ];

  const PCPP_PSKKS = [
    {
      id: '',
      key: `PERNYATAAN CALON PEMEGANG POLIS (selanjutnya disebut "SAYA", harap dibaca dengan teliti sebelum menandatangani ${spaj} ini)`,
    },
    {
      id: '',
      key: `SAYA menyatakan bahwa telah mengerti dan telah mendapat penjelasan sepenuhnya dari Tenaga Pemasar dan selanjutnya menyatakan setuju mengenai hal-hal yang tersebut di bawah ini:`,
    },
    {
      id: '1. ',
      key: 'Semua keterangan yang SAYA berikan di dalam SPAJ Syariah ini dan keterangan lain yang SAYA berikan kepada PT Prudential Sharia Life Assurance (Prudential Syariah) (selanjutnya disebut “Pengelola”) atau Tenaga Pemasar atau kepada Pemeriksa Kesehatan yang ditunjuk oleh Pengelola dan/atau keterangan yang tertulis di dalam dokumen SPAJ tambahan Syariah, Kuesioner dan/atau dokumen lain yang menjadi kelengkapan dan tidak terpisahkan dari SPAJ Syariah ini adalah benar, sesuai, akurat, dan tidak menyesatkan, serta tidak ada hal-hal lain yang telah SAYA ketahui namun SAYA sembunyikan dan/atau tidak SAYA informasikan kepada Pengelola. Semua keterangan yang SAYA berikan di dalam SPAJ Syariah (termasuk yang ditulis di dalam Surat Pernyataan/Amendemen untuk SPAJ Syariah/SPAJT Syariah/Pengajuan Pelayanan Polis) dan/atau Kuesioner (jika ada) dan yang disampaikan kepada Pemeriksa Kesehatan yang ditunjuk oleh Pengelola (jika ada) akan menjadi dasar bagi Pengelola dalam penerbitan Polis.',
    },
    {
      id: '2. ',
      key: `SAYA  sendiri  yang  melengkapi  dan  menandatangani  SPAJ  Syariah  ini  serta  telah  menerima,  memahami  secara  mandiri,  dan menyetujui lembar lembar Ringkasan Informasi Produk dan Layanan Versi Personal (Ilustrasi) ${productName} yang menjelaskan  risiko, manfaat, kewajiban dan pembebanan biaya asuransi  yang telah disampaikan "secara langsung" oleh Tenaga Pemasar. Segala risiko pemilihan manfaat asuransi sepenuhnya menjadi tanggung jawab SAYA.`,
    },
    {
      id: '3. ',
      key: 'Bahwa Pengelola berhak meminta dokumen berupa bukti penghasilan atau dokumen lainnya yang diperlukan (dan SAYA berkewajiban untuk menyampaikan dokumen tersebut kepada Pengelola) untuk memastikan kesesuaian profil SAYA dan/atau Calon Peserta Yang Diasuransikan dan/atau Calon Pembayar Kontribusi. Dalam hal dokumen yang diperlukan tersebut tidak diterima Pengelola atau dokumen yang diperlukan tersebut mempunyai informasi yang berbeda dan/atau tidak lengkap dengan informasi yang sebelumnya diterima oleh Pengelola, maka SAYA menyetujui bahwa Pengelola berhak menangguhkan transaksi apa pun yang SAYA ajukan dengan memberikan pemberitahuan kepada SAYA.',
    },
    {
      id: '4. ',
      key: 'Tanpa mengesampingkan ketentuan pada Poin D (Ketentuan Kepesertaan Manfaat Meninggal Dunia Karena Kecelakaan Sebelum Polis Diterbitkan), kepesertaan pada Asuransi Jiwa Syariah tidak akan dimulai sebelum Polis diterbitkan. Jika terjadi peristiwa yang diasuransikan dalam Polis sebelum tanggal Polis diterbitkan, atau SAYA tidak melengkapi persyaratan pengajuan asuransi yang diminta oleh Pengelola dalam waktu 30 (tiga puluh) hari kalender sejak SPAJ Syariah terdaftar di Kantor Pusat Pengelola, atau SAYA membatalkan pengajuan asuransi kepada Pengelola, maka Pengelola tidak berkewajiban untuk membayar manfaat apa pun kecuali mengembalikan Kontribusi (jika telah dibayarkan oleh SAYA) dikurangi semua biaya pemeriksaan kesehatan yang timbul (jika ada).',
    },
    {
      id: '5. ',
      key: 'Kepesertaan pada Asuransi Jiwa Syariah akan dinilai ulang oleh Pengelola apabila terdapat pemeriksaan kesehatan yang dilakukan sebelum Polis terbit di luar pengetahuan Pengelola, yang hasilnya dapat memengaruhi/mengubah keputusan Underwriting (Seleksi Risiko) dan/atau apabila terdapat keterangan, pernyataan atau pemberitahuan yang disampaikan (termasuk pernyataan sebagaimana dimaksud dalam butir 3 di atas) ternyata keliru atau berbeda atau berubah yang sifatnya sedemikian rupa sehingga kepesertaan pada Asuransi Jiwa Syariah dan/atau Polis dapat menjadi batal dan dianggap tidak pernah berlaku dan atas hal tersebut Pengelola tidak berkewajiban membayar apa pun selain Nilai Tunai (jika ada).',
    },
    {
      id: '6. ',
      key: 'Semua pembayaran Kontribusi harus sudah diterima di rekening Pengelola dan telah teridentifikasi.',
    },
    {
      id: '7. ',
      key: 'Bahwa pada waktu SAYA mengajukan klaim Manfaat Asuransi, Pengelola berhak meminta bukti keabsahan hubungan keterikatan asuransi antara Pemegang Polis, Peserta Yang Diasuransikan dan Penerima Manfaat. Dalam hal hubungan antara Pemegang Polis, Peserta Yang Diasuransikan dan Penerima Manfaat terdapat perbedaan dengan yang tertulis di SPAJ Syariah ini (misalnya: tidak bisa diverifikasi), Pengelola berhak meminta dokumen pendukung yang wajar dan relevan dengan pengajuan klaim.',
    },
    {
      id: '8. ',
      key: 'Bahwa pada waktu SAYA mengajukan klaim Manfaat Asuransi, Pengelola berhak meminta kesesuaian profil finansial SAYA dan/atau Peserta Yang Diasuransikan dan/atau Pembayar Kontribusi. Dalam hal terdapat perbedaan pada profil finansial SAYA dan/atau Peserta Yang Diasuransikan dan/atau Pembayar Kontribusi dengan yang tertulis di SPAJ Syariah ini (misalnya: tidak bisa diverifikasi), Pengelola berhak meminta dokumen pendukung yang wajar dan relevan dengan pengajuan klaim dan dokumen pendukung untuk mendukung verifikasi profil finansial. Apabila dokumen pendukung tidak disampaikan atau disampaikan tetapi tidak sesuai dengan profil finansial SAYA, maka Pengelola berhak untuk melakukan pembatalan Polis yang telah diterbitkan.',
    },
    {
      id: '9. ',
      key: 'SAYA dan/atau Calon Peserta Yang Diasuransikan dan/atau Calon Penerima Manfaat yang diwakilkan oleh SAYA, dengan ini memberikan kuasa dan izin kepada:',
    },
    {
      subid: '(i)  ',
      subkey: 'Pengelola untuk memperoleh, mengumpulkan, mengolah, menganalisis, menyimpan, memperbaiki, melakukan pembaruan, menampilkan, mengumumkan, mentransfer, menyebarluaskan, mengungkapkan, menghapus atau memusnahkan data pribadi sesuai prinsip pelindungan Data Pribadi (Pemrosesan Data Pribadi) terkait riwayat kesehatan, dan riwayat keuangan Calon Peserta Yang Diasuransikan atau informasi lain mengenai diri Calon Peserta Yang Diasuransikan sejak pengajuan SPAJ Syariah sampai dengan pengajuan klaim dari setiap tenaga medis, rumah sakit, klinik, puskesmas, laboratorium, perusahaan asuransi, perusahaan reasuransi, lembaga/perusahaan di bidang jasa keuangan maupun layanan informasi keuangan, badan, instansi/lembaga, Perusahaan tempat SAYA dan/atau Peserta Yang Diasuransikan bekerja atau pihak lain yang mempunyai catatan/informasi riwayat kesehatan, catatan/informasi keuangan, atau informasi lain mengenai diri Calon Peserta Yang Diasuransikan sejak periode pengajuan SPAJ Syariah sampai hingga periode pengajuan klaim; dan',
    },
    {
      subid: '(ii)  ',
      subkey: 'Setiap tenaga medis, rumah sakit, klinik, puskesmas, laboratorium, perusahaan asuransi, perusahaan reasuransi, lembaga/perusahaan di bidang jasa keuangan maupun layanan informasi keuangan, badan, instansi/Lembaga, koperasi, atau pihak lain yang mempunyai catatan riwayat kesehatan, catatan/informasi keuangan, atau informasi lain mengenai diri Calon Peserta Yang Diasuransikan untuk mengungkapkan atau memberikan kepada Pengelola semua catatan riwayat kesehatan, atau perawatan, atau catatan/informasi keuangan, atau informasi lain mengenai diri Calon Peserta Yang Diasuransikan.',
    },
    {
      subid: '(iii)  ',
      subkey: 'Pemberian kuasa ini tidak dapat ditarik kembali atau dibatalkan dan tetap berlaku pada waktu Calon Peserta Yang Diasuransikan masih hidup maupun sesudah meninggal dunia, maupun oleh sebab-sebab yang disebutkan dalam Pasal 1813, Pasal 1814, dan Pasal 1816 Kitab Undang-Undang Hukum Perdata Indonesia. Salinan/fotokopi dari kuasa ini memiliki kekuatan hukum yang sama dan mengikat sesuai dengan aslinya.',
    },
    {
      id: '10. ',
      key: 'Dalam rangka pengajuan dan pembayaran klaim, maupun pelayanan kepada Peserta, SAYA menyatakan bahwa SAYA telah memiliki wewenang sah yang diperoleh dari Calon Penerima Manfaat untuk memberikan data dan/atau informasi pribadi dari Calon Penerima',
    },
    {
      id: '11. ',
      key: 'Jika ada perbedaan data antara data di Polis sebelumnya dengan data di dalam SPAJ Syariah ini, maka yang berlaku adalah data yang tertera di dalam SPAJ Syariah ini. Dalam hal Calon Pemegang Polis dan/atau Calon Peserta Yang Diasuransikan dan/atau Calon Pembayar Kontribusi dan/atau Calon Penerima Manfaat memiliki Polis di Grup Prudential dan/atau Calon Peserta Yang Diasuransikan dan/atau Calon Pembayar Kontribusi dan/atau Calon Penerima Manfaat berbeda dengan data terbaru pada SPAJ Syariah ini, maka SAYA setuju bahwa Prudential Syariah dapat mengganti data Polis Prudential dengan data yang tertera pada SPAJ Syariah ini baik untuk Polis yang terbit maupun tidak terbit.',
    },
    {
      id: '12. ',
      key: 'Jika pengajuan SPAJ Syariah SAYA telah disetujui oleh Pengelola, namun Kontribusi belum diterima oleh Pengelola dalam waktu 14 (empat belas) hari atau 30 (tiga puluh) hari (sesuai besaran Kontribusi tahunan) sejak SPAJ Syariah tersebut disetujui oleh Pengelola atau dalam waktu 30 (tiga puluh) hari kalender sejak SPAJ Syariah diterima di Kantor Pusat Pengelola, mana yang terjadi lebih dahulu,maka pengajuan SPAJ Syariah SAYA tersebut dianggap berakhir sesuai ketentuan yang berlaku di Pengelola.',
    },
    {
      id: '13. ',
      key: 'Jika SPAJ Syariah ini merupakan SPAJ pengganti, maka Kontribusi yang telah dibayarkan pada SPAJ sebelumnya di mana SAYA dan Calon Peserta Yang Diasuransikan merupakan orang yang sama, maka secara otomatis akan dialihkan ke SPAJ Syariah ini. Dalam hal pendaftaran dan pembayaran Kontribusi pada SPAJ Syariah ini dengan metode pembayaran autodebit kartu kredit/debit atau autodebit rekening bank yang sudah terdaftar di PRUPay Link maka wajib dilakukan melalui PRUPay Link (https://payment.prudential.co.id). Bagi autodebit kartu kredit berlogo BCA Card atau autodebit rekening yang belum terdaftar di PRUPay Link maka perlu melampirkan Surat Kuasa Pendebitan Kartu Kredit (SKPKK) khusus BCA Card atau Surat Kuasa Pendebitan Rekening (SKPR) sesuai dengan ketentuan Bank yang berlaku. Jika Calon Pemegang Polis melewati masa 30 hari kalender setelah SPAJ Syariah diterima oleh Pengelola, maka perlu mengajukan SPAJ Syariah baru dan pendaftaran autodebit dengan nomor SPAJ Syariah yang baru melalui PRUPay Link.',
    },
    {
      id: '14. ',
      key: 'SAYA memahami dan setuju bahwa Polis SAYA akan dikirimkan secara elektronik melalui E-mail yang SAYA daftarkan pada SPAJ Syariah ini setelah proses pengajuan asuransi SAYA disetujui oleh Pengelola.',
    },
    {
      id: '15. ',
      key: 'Prudential Syariah hanya akan menerima pembayaran Kontribusi (maupun transaksi lainnya) sesuai metode pembayaran yang telah ditentukan oleh Prudential Syariah dari waktu ke waktu, yakni melalui rekening resmi milik Prudential Syariah. Oleh karena itu, pembayaran tersebut hanya akan SAYA lakukan melalui metode pembayaran yang telah ditentukan oleh Prudential Syariah. Prudential Syariah tidak akan bertanggung jawab atas risiko dan kerugian yang timbul (apabila ada) jika SAYA melakukan pembayaran Kontribusi (maupun transaksi lainnya) selain menggunakan metode pembayaran yang telah ditentukan oleh Prudential Syariah.',
    },
    {
      id: '16. ',
      key: 'SPAJ Syariah ini berbentuk elektronik/digital sehingga untuk selanjutnya SAYA akan memberikan persetujuan dalam bentuk tanda tangan elektronik yang akan dipersamakan keabsahannya dengan tanda tangan basah SAYA.',
    },
    {
      subid: '17. ',
      subkey: 'Dalam 1 (satu) tahun terakhir sampai dengan SPAJ Syariah ini ditandatangani dan ajukan oleh SAYA kepada Pengelola, baik SAYA atau keluarga inti SAYA, atau SAYA sebagai Pemegang Polis/Peserta Yang Diasuransikan/Pembayar Kontribusi, tidak berstatus sebagai Penerima Manfaat dari program  bantuan sosial (Bansos) untuk kategori fakir miskin atau tidak mampu yang diberikan oleh Pemerintah. Jika dikemudian hari setelah SPAJ Syariah ini disampaikan kepada Pengelola dan telah diterbitkan Polis Asuransi Jiwa atas pengajuan SAYA tersebut, ditemukan fakta bahwa SAYA ataupun keluarga inti SAYA, atau SAYA sebagai Pemegang Polis/ Peserta Yang Diasuransikan /Pembayar Kontribusi, berstatus sebagai Penerima Manfaat dari program Bansos, baik sebelum maupun sesudah Polis Asuransi Jiwa diterbitkan, maka Pengelola berhak untuk meminta dokumen finansial dan/atau  melakukan seleksi ulang risiko. Apabila dokumen finansial tidak dapat dipenuhi, maka Pengelola dapat membatalkan Polis Asuransi Jiwa Syariah.'
    }
  ];

  const PCPP_PCB88 = [
    {
      id: '',
      key: 'SAYA menyatakan bahwa telah mengerti dan telah mendapat penjelasan sepenuhnya dari Tenaga Pemasar dan selanjutnya menyatakan setuju mengenai hal-hal yang tersebut di bawah ini:',
    },
    {
      id: '1. ',
      key: 'Semua keterangan yang SAYA berikan di dalam SPAJ ini dan keterangan lain yang SAYA berikan kepada PT Prudential Life Assurance (selanjutnya disebut “Penanggung”) atau Tenaga Pemasar atau kepada Pemeriksa Kesehatan yang ditunjuk oleh Penanggung dan/atau keterangan yang tertulis di dalam dokumen SPAJ tambahan, Kuesioner dan/atau dokumen lain yang menjadi kelengkapan dan tidak terpisahkan dari SPAJ ini adalah benar dan tidak ada hal-hal lain yang SAYA sembunyikan, baik yang saya ketahui maupun tidak ketahui. Semua keterangan yang SAYA berikan di dalam SPAJ (termasuk yang ditulis di dalam Surat Pernyataan/Amendemen untuk SPAJ/SPAJT/Pengajuan Pelayanan Polis) dan/atau Kuesioner (jika ada) dan yang disampaikan kepada Pemeriksa Kesehatan yang ditunjuk oleh Penanggung (jika ada) akan menjadi dasar bagi Penanggung dalam penerbitan Polis.',
    },
    {
      id: '2. ',
      key: 'SAYA sendiri yang melengkapi dan menandatangani SPAJ ini serta telah menerima, memahami secara mandiri, dan menyetujui lembar Ringkasan Informasi Produk dan Layanan Versi Personal (Ilustrasi) PRUCritical Benefit 88 yang menjelaskan risiko, manfaat, kewajiban dan pembebanan biaya asuransi yang telah disampaikan "secara langsung" oleh Tenaga Pemasar. Segala risiko pemilihan Manfaat Asuransi sepenuhnya menjadi tanggung jawab SAYA.',
    },
    {
      id: '3. ',
      key: 'Bahwa Penanggung berhak meminta dokumen berupa bukti penghasilan atau dokumen lainnya yang diperlukan (dan SAYA berkewajiban untuk menyampaikan dokumen tersebut kepada Penanggung) untuk memastikan kesesuaian profil SAYA dan/atau Calon Tertanggung dan/atau Calon Pembayar Premi. Dalam hal dokumen yang diperlukan tersebut tidak diterima Penanggung atau dokumen yang diperlukan tersebut mempunyai informasi yang berbeda dan/atau tidak lengkap dengan informasi yang sebelumnya diterima oleh Penanggung, maka SAYA menyetujui bahwa Penanggung berhak menangguhkan transaksi apa pun yang SAYA ajukan dengan memberikan pemberitahuan kepada SAYA. ',
    },
    {
      id: '4. ',
      key: 'Tanpa mengesampingkan ketentuan pada Poin D (Ketentuan Pertanggungan Manfaat Meninggal Dunia Karena Kecelakaan Sebelum Polis Diterbitkan), pertanggungan tidak akan dimulai sebelum Polis diterbitkan. Jika terjadi peristiwa yang ditanggung dalam Polis sebelum tanggal Polis diterbitkan, atau SAYA tidak melengkapi persyaratan pengajuan asuransi yang diminta oleh Penanggung dalam waktu 30 (tiga puluh) hari kalender sejak SPAJ terdaftar di Kantor Pusat Penanggung, atau SAYA membatalkan pengajuan asuransi kepada Penanggung, maka Penanggung tidak berkewajiban untuk membayar manfaat apa pun kecuali mengembalikan Premi (jika telah dibayarkan oleh SAYA) dikurangi semua biaya pemeriksaan kesehatan yang timbul (jika ada)',
    },
    {
      id: '5. ',
      key: 'Pertanggungan akan dinilai ulang oleh Penanggung apabila terdapat pemeriksaan kesehatan yang dilakukan sebelum Polis terbit di luar pengetahuan Penanggung, yang hasilnya dapat memengaruhi/mengubah keputusan Underwriting (Seleksi Risiko) dan/atau apabila terdapat keterangan, pernyataan atau pemberitahuan yang disampaikan (termasuk pernyataan sebagaimana dimaksud dalam butir 3 di atas) ternyata keliru atau berbeda atau berubah yang sifatnya sedemikian rupa sehingga pertanggungan dan/atau Polis dapat menjadi batal dan dianggap tidak pernah berlaku dan atas hal tersebut Penanggung tidak berkewajiban membayar apa pun selain Nilai Tunai (jika ada).',
    },
    {
      id: '6. ',
      key: 'Semua pembayaran Premi harus sudah diterima di rekening Penanggung dan telah teridentifikasi.',
    },
    {
      id: '7. ',
      key: 'Bahwa pada waktu SAYA mengajukan klaim Manfaat Asuransi, Penanggung, berhak meminta bukti keabsahan hubungan keterikatan asuransi antara Pemegang Polis, Tertanggung dan Penerima Manfaat. Dalam hal hubungan antara Pemegang Polis, Tertanggung dan Penerima Manfaat terdapat perbedaan dengan yang tertulis di SPAJ ini (misalnya: tidak bisa diverifikasi), Penanggung berhak meminta dokumen pendukung yang wajar dan relevan dengan pengajuan klaim.',
    },
    {
      id: '8. ',
      key: 'Bahwa pada waktu SAYA mengajukan klaim Manfaat Asuransi, Penanggung berhak meminta kesesuaian profil finansial SAYA dan/atau Tertanggung dan/atau Pembayar Premi. Dalam hal terdapat perbedaan pada profil finansial SAYA dan/atau Tertanggung dan/atau Pembayar Premi dengan yang tertulis di SPAJ ini (misalnya: tidak bisa diverifikasi), Penanggung berhak meminta dokumen pendukung yang wajar dan relevan dengan pengajuan klaim dan dokumen pendukung untuk mendukung verifikasi profil finansial. Apabila dokumen pendukung tidak disampaikan atau disampaikan tetapi tidak sesuai dengan profil finansial SAYA, maka Penanggung berhak untuk melakukan pembatalan polis yang telah diterbitkan.',
    },
    {
      id: '9. ',
      key: 'SAYA dan/atau Calon Tertanggung dan/atau Calon Penerima Manfaat yang diwakilkan oleh SAYA, dengan ini memberikan kuasa dan izin kepada:',
    },
    {
      subid: '(i) ',
      subkey:
        'Penanggung untuk memperoleh, mengumpulkan, mengolah, menganalisis, menyimpan, memperbaiki, melakukan pembaruan, menampilkan, mengumumkan, mentransfer, menyebarluaskan, mengungkapkan, menghapus atau memusnahkan data pribadi sesuai prinsip pelindungan Data Pribadi (“Pemrosesan Data Pribadi”) terkait riwayat kesehatan, dan riwayat keuangan Calon Tertanggung atau informasi lain mengenai diri Calon Tertanggung sejak pengajuan SPAJ sampai dengan pengajuan klaim dari setiap tenaga medis, rumah sakit, klinik, puskesmas, laboratorium, perusahaan asuransi, perusahaan reasuransi, lembaga/perusahaan di bidang jasa keuangan maupun layanan informasi keuangan, badan, instansi/lembaga, Perusahaan tempat SAYA dan/atau Tertanggung bekerja atau pihak lain yang mempunyai catatan/informasi riwayat kesehatan, catatan/informasi keuangan, atau informasi lain mengenai diri Calon Tertanggung sejak periode pengajuan SPAJ sampai hingga periode pengajuan klaim; dan',
    },
    {
      subid: '(ii) ',
      subkey:
        'Setiap tenaga medis, rumah sakit, klinik, puskesmas, laboratorium, perusahaan asuransi, perusahaan reasuransi, lembaga/perusahaan di bidang jasa keuangan maupun layanan informasi keuangan, badan, instansi/Lembaga, koperasi, atau pihak lain yang mempunyai catatan riwayat kesehatan, catatan/informasi keuangan, atau informasi lain mengenai diri Calon Tertanggung untuk mengungkapkan atau memberikan kepada Penanggung semua catatan riwayat kesehatan, atau perawatan, atau catatan/informasi keuangan, atau informasi lain mengenai diri Calon Tertanggung.\nPemberian kuasa ini tidak dapat ditarik kembali atau dibatalkan dan tetap berlaku pada waktu Calon Tertanggung masih hidup maupun sesudah meninggal dunia, maupun oleh sebab-sebab yang disebutkan dalam Pasal 1813, Pasal 1814, dan Pasal 1816 Kitab Undang-Undang Hukum Perdata Indonesia. Salinan/fotokopi dari kuasa ini memiliki kekuatan hukum yang sama dan mengikat sesuai dengan aslinya.',
    },
    {
      id: '10. ',
      key: 'Dalam rangka pengajuan dan pembayaran klaim, maupun pelayanan nasabah, SAYA menyatakan bahwa SAYA telah memiliki wewenang sah yang diperoleh dari Calon Penerima Manfaat untuk memberikan data dan/atau informasi pribadi dari Calon Penerima Manfaat kepada Penanggung.',
    },
    {
      id: '11. ',
      key: 'Jika ada perbedaan data antara data di Polis sebelumnya dengan data di dalam SPAJ ini, maka yang berlaku adalah data yang tertera di dalam SPAJ ini. Dalam hal Calon Pemegang Polis dan/atau Calon Tertanggung dan/atau Calon Pembayar Premi dan/atau Calon Penerima Manfaat memiliki Polis di Grup Prudential dan/atau Calon Tertanggung dan/atau Calon Pembayar Premi dan/atau Calon Penerima Manfaat berbeda dengan data terbaru pada SPAJ ini, maka SAYA setuju bahwa Prudential Indonesia dapat mengganti data Polis Prudential dengan data yang tertera pada SPAJ ini baik untuk Polis yang terbit maupun tidak terbit.',
    },
    {
      id: '12. ',
      key: 'Jika pengajuan SPAJ SAYA telah disetujui oleh Penanggung, namun Premi belum diterima oleh Penanggung dalam waktu 14 (empat belas) hari atau 30 (tiga puluh) hari (sesuai besar Premi tahunan) sejak SPAJ tersebut disetujui oleh Penanggung atau dalam waktu 30 (tiga puluh) hari kalender sejak SPAJ diterima di Kantor Pusat Penanggung, mana yang terjadi lebih dahulu, maka pengajuan SPAJ SAYA tersebut dianggap berakhir sesuai ketentuan yang berlaku di Penanggung. ',
    },
    {
      id: '13. ',
      key: 'Jika SPAJ ini merupakan SPAJ pengganti, maka Premi yang telah dibayarkan pada SPAJ sebelumnya di mana SAYA dan Calon Tertanggung merupakan orang yang sama, maka secara otomatis akan dialihkan ke SPAJ ini. Dalam hal pendaftaran dan pembayaran Premi pada SPAJ ini dengan metode pembayaran autodebit kartu kredit/debit atau autodebit rekening bank yang sudah terdaftar di PRUPay Link maka wajib dilakukan melalui PRUPay Link (https://payment.prudential.co.id). Bagi autodebit kartu kredit berlogo BCA Card atau autodebit rekening yang belum terdaftar di PRUPay Link maka perlu melampirkan Surat Kuasa Pendebitan Kartu Kredit (SKPKK) khusus BCA Card atau Surat Kuasa Pendebitan Rekening (SKPR) sesuai dengan ketentuan Bank yang berlaku. Jika Calon Pemegang Polis melewati masa 30 hari kalender setelah SPAJ diterima oleh Penanggung, maka perlu mengajukan SPAJ baru dan pendaftaran autodebit dengan nomor SPAJ yang baru melalui PRUPay Link.',
    },
    {
      id: '14. ',
      key: 'SAYA memahami dan setuju bahwa Polis SAYA akan dikirimkan secara elektronik melalui E-mail yang SAYA daftarkan pada SPAJ ini setelah proses pengajuan asuransi SAYA disetujui oleh Penanggung.',
    },
    {
      id: '15. ',
      key: 'Penanggung hanya akan menerima pembayaran Premi (maupun transaksi lainnya) sesuai metode pembayaran yang telah ditentukan oleh Penanggung dari waktu ke waktu, yakni melalui rekening resmi milik Penanggung. Oleh karena itu, pembayaran tersebut hanya akan SAYA lakukan melalui metode pembayaran yang telah ditentukan oleh Penanggung. Penanggung tidak akan bertanggung jawab atas risiko dan kerugian yang timbul (apabila ada) jika SAYA melakukan pembayaran Premi (maupun transaksi lainnya) selain menggunakan metode pembayaran yang telah ditentukan oleh Penanggung.',
    },
    {
      id: "16, ",
      key: "SPAJ ini berbentuk elektronik/digital sehingga untuk selanjutnya SAYA akan memberikan persetujuan dalam bentuk tanda tangan elektronik yang akan dipersamakan keabsahannya dengan tanda tangan basah SAYA."
    },
    {
      id: "17. ",
      key: "Dalam 1 (satu) tahun terakhir sampai dengan SPAJ ini ditandatangani dan ajukan oleh SAYA kepada Penanggung, baik SAYA atau keluarga inti SAYA, atau SAYA sebagai Pemegang Polis/Tertanggung/Pembayar Premi, tidak berstatus sebagai Penerima Manfaat dari program bantuan sosial (Bansos) untuk kategori fakir miskin atau tidak mampu yang diberikan oleh Pemerintah. Jika dikemudian hari setelah SPAJ ini disampaikan kepada Penanggung dan telah diterbitkan Polis Asuransi Jiwa atas pengajuan SAYA tersebut, ditemukan fakta bahwa SAYA ataupun keluarga inti SAYA, atau SAYA sebagai Pemegang Polis/Tertanggung/Pembayar Premi, berstatus sebagai Penerima Manfaat dari program Bansos, baik sebelum maupun sesudah Polis Asuransi Jiwa diterbitkan, maka Penanggung berhak untuk meminta dokumen finansial dan/atau melakukan seleksi ulang risiko. Apabila dokumen finansial tidak dapat dipenuhi, maka Penanggung dapat membatalkan Polis Asuransi Jiwa."
    }
  ];

  const PCPP_PRUFUTURE = [
    {
      id: '',
      key: 'SAYA menyatakan bahwa telah mengerti dan telah mendapat penjelasan sepenuhnya dari Tenaga Pemasar dan selanjutnya menyatakan setuju mengenai hal-hal yang tersebut di bawah ini:',
    },
    {
      id: '1. ',
      key: 'Semua keterangan yang SAYA berikan di dalam SPAJ ini dan keterangan lain yang SAYA berikan kepada PT Prudential Life Assurance (selanjutnya disebut “Penanggung”) atau Tenaga Pemasar atau kepada Pemeriksa Kesehatan yang ditunjuk oleh Penanggung dan/atau keterangan yang tertulis di dalam dokumen SPAJ tambahan, Kuesioner dan/atau dokumen lain yang menjadi kelengkapan dan tidak terpisahkan dari SPAJ ini adalah benar dan tidak ada hal-hal lain yang SAYA sembunyikan, baik yang saya ketahui maupun tidak ketahui. Semua keterangan yang SAYA berikan di dalam SPAJ (termasuk yang ditulis di dalam Surat Pernyataan/Amendemen untuk SPAJ/SPAJT/Pengajuan Pelayanan Polis) dan/atau Kuesioner (jika ada) dan yang disampaikan kepada Pemeriksa Kesehatan yang ditunjuk oleh Penanggung (jika ada) akan menjadi dasar bagi Penanggung dalam penerbitan Polis.',
    },
    {
      id: '2. ',
      key: 'SAYA sendiri yang melengkapi dan menandatangani SPAJ ini serta telah menerima, memahami secara mandiri, dan menyetujui lembar Ringkasan Informasi Produk dan Layanan Versi Personal (Ilustrasi) PRUFuture yang menjelaskan Manfaat Asuransi yang telah disampaikan oleh Tenaga Pemasar. Segala risiko pemilihan Manfaat Asuransi sepenuhnya menjadi tanggung jawab SAYA.',
    },
    {
      id: '3. ',
      key: 'Bahwa Penanggung berhak meminta dokumen berupa bukti penghasilan atau dokumen lainnya yang diperlukan (dan SAYA berkewajiban untuk menyampaikan dokumen tersebut kepada Penanggung) untuk memastikan kesesuaian profil SAYA dan/atauCalon Tertanggung dan/atau Calon Pembayar Premi. Dalam hal dokumen yang diperlukan tersebut tidak diterima Penanggung atau dokumen yang diperlukan tersebut mempunyai informasi yang berbeda dan/atau tidak lengkap dengan informasi yang sebelumnya diterima oleh Penanggung, maka SAYA menyetujui bahwa Penanggung berhak menangguhkan transaksi apa pun yang SAYA ajukan dengan memberikan pemberitahuan kepada SAYA.',
    },
    {
      id: '4. ',
      key: 'Tanpa mengesampingkan ketentuan pada Poin D (Ketentuan Pertanggungan Manfaat Meninggal Dunia Karena Kecelakaan Sebelum Polis Diterbitkan), pertanggungan tidak akan dimulai sebelum Polis diterbitkan. Jika terjadi peristiwa yang ditanggung dalam Polis sebelum tanggal Polis diterbitkan, atau SAYA tidak melengkapi persyaratan pengajuan asuransi yang diminta oleh Penanggung dalam waktu 30 (tiga puluh) hari sejak SPAJ terdaftar di Kantor Pusat Penanggung, atau SAYA membatalkan pengajuan asuransi kepada Penanggung, maka Penanggung tidak berkewajiban untuk membayar manfaat apa pun kecuali mengembalikan Premi (jika telah dibayarkan oleh SAYA) dikurangi semua biaya pemeriksaan kesehatan yang timbul (jika ada).',
    },
    {
      id: '5. ',
      key: 'Pertanggungan akan dinilai ulang oleh Penanggung apabila terdapat pemeriksaan kesehatan yang dilakukan sebelum Polis terbit diluar pengetahuan Penanggung, yang hasilnya dapat memengaruhi/mengubah keputusan Underwriting (Seleksi Risiko) dan/atau apabila terdapat keterangan, pernyataan atau pemberitahuan yang disampaikan (termasuk pernyataan sebagaimana dimaksud dalam butir 3 di atas) ternyata keliru atau berbeda atau berubah yang sifatnya sedemikian rupa sehingga pertanggungan dan/atau Polisdapat menjadi batal dan dianggap tidak pernah berlaku dan atas hal tersebut Penanggung tidak berkewajiban membayar apa pun.',
    },
    {
      id: '6. ',
      key: 'Semua pembayaran Premi harus sudah diterima di rekening Penanggung dan telah teridentifikasi.',
    },
    {
      id: '7. ',
      key: 'Bahwa pada waktu SAYA mengajukan klaim Manfaat Asuransi, Penanggung, berhak meminta bukti keabsahan hubungan keterikatan asuransi antara Pemegang Polis, Tertanggung dan Penerima Manfaat. Dalam hal hubungan antara Pemegang Polis, Tertanggung dan Penerima Manfaat terdapat perbedaan dengan yang tertulis di SPAJ ini (misalnya: tidak bisa diverifikasi), Penanggung berhak meminta dokumen pendukung yang wajar dan relevan dengan pengajuan klaim.',
    },
    {
      id: '8. ',
      key: 'Bahwa pada waktu SAYA mengajukan klaim Manfaat Asuransi, Penanggung berhak meminta kesesuaian profil finansial SAYA dan/atau Tertanggung dan/atau Pembayar Premi. Dalam hal terdapat perbedaan pada profil finansial SAYA dan/atau Tertanggung dan/atau Pembayar Premi dengan yang tertulis di SPAJ ini (misalnya: tidak bisa diverifikasi), Penanggung berhak meminta dokumen pendukung yang wajar dan relevan dengan pengajuan klaim dan dokumen pendukung untuk mendukung verifikasi profil finansial.',
    },
    {
      id: '9. ',
      key: 'SAYA dan/atau Calon Tertanggung, dengan ini memberikan kuasa dan izin kepada:',
    },
    {
      subid: '(i) ',
      subkey:
        'Penanggung untuk meminta catatan riwayat kesehatan Calon Tertanggung atau informasi lain mengenai diri CalonTertanggung dari setiap tenaga medis, rumah sakit, klinik, puskesmas, laboratorium, perusahaan asuransi, perusahaan reasuransi, badan, instansi/lembaga atau pihak lain yang mempunyai catatan/informasi riwayat kesehatan atau informasi lain mengenai diri Calon Tertanggung; dan',
    },
    {
      subid: '(ii) ',
      subkey:
        'Setiap tenaga medis, rumah sakit, klinik, puskesmas, laboratorium, perusahaan asuransi atau perusahaan reasuransi, badan,instansi/lembaga atau pihak lain yang mempunyai catatan riwayat kesehatan atau informasi lain mengenai diri CalonTertanggung untuk mengungkapkan atau memberikan kepada Penanggung semua catatan riwayat kesehatan, atau perawatan atau informasi lain mengenai diri Calon Tertanggung. Pemberian kuasa ini tidak dapat ditarik kembali atau dibatalkan dan tetap berlaku pada waktu Calon Tertanggung masih hidup maupun sesudah meninggal dunia, maupun oleh sebab-sebab yang disebutkan dalam Pasal 1813, Pasal 1814, dan Pasal 1816 Kitab Undang-Undang Hukum Perdata Indonesia. Salinan/fotokopi dari kuasa ini memiliki kekuatan hukum yang sama dan mengikat sesuai dengan aslinya.',
    },
    {
      id: '10. ',
      key: 'SAYA dan Calon Tertanggung dengan ini memberikan kuasa dan izin kepada Penanggung untuk menggunakan atau memberikan informasi kesehatan atau keterangan mengenai diri Calon Tertanggung yang tersedia, diperoleh atau disimpan oleh Penanggung,kepada perusahaan asuransi, perusahaan reasuransi atau pihak-pihak lain dalam rangka pengajuan dan pembayaran klaim, maupun pelayanan nasabah.',
    },
    {
      id: '11. ',
      key: 'Jika ada perbedaan data antara data di Polis sebelumnya dengan data di dalam SPAJ ini, maka yang berlaku adalah data yang tertera di dalam SPAJ ini.',
    },
    {
      id: '12. ',
      key: 'Jika pengajuan SPAJ SAYA telah disetujui oleh Penanggung, namun Premi belum diterima oleh Penanggung dalam waktu 14 (empat belas) hari atau 30 (tiga puluh) hari (sesuai besar Premi tahunan) sejak SPAJ tersebut disetujui oleh Penanggung atau dalam waktu 30 (tiga puluh) hari kalender sejak SPAJ diterima di Kantor Pusat Penanggung, mana yang terjadi lebih dahulu, maka pengajuan SPAJ SAYA tersebut dianggap berakhir sesuai ketentuan yang berlaku di Penanggung.',
    },
    {
      id: '13. ',
      key: 'Jika SPAJ ini merupakan SPAJ pengganti, maka Premi yang telah dibayarkan pada SPAJ sebelumnya di mana SAYA dan Calon Tertanggung merupakan orang yang sama, maka secara otomatis akan dialihkan ke SPAJ ini. Dalam hal pendaftaran dan pembayaran Premi pada SPAJ ini dengan metode pembayaran autodebit kartu kredit/debit atau autodebit rekening bank yang sudah terdaftar di PRUPay Link maka wajib dilakukan melalui PRUPay Link (https://payment.prudential.co.id). Bagi autodebit kartu kredit berlogo BCACard atau autodebit rekening yang belum terdaftar di PRUPay Link maka perlu melampirkan Surat Kuasa Pendebitan Kartu Kredit (SKPKK) khusus BCA Card atau Surat Kuasa Pendebitan Rekening (SKPR) sesuai dengan ketentuan Bank yang berlaku. Jika Calon Pemegang Polis melewati masa 30 hari kalender setelah SPAJ diterima oleh Penanggung, maka perlu mengajukan SPAJ baru dan pendaftaran autodebit dengan nomor SPAJ yang baru melalui PRUPay Link.',
    },
    {
      id: '14. ',
      key: 'SAYA memahami dan setuju bahwa Polis SAYA akan dikirimkan secara elektronik melalui E-mail yang SAYA daftarkan pada SPAJ ini setelah proses pengajuan asuransi SAYA disetujui oleh Penanggung dan SAYA akan menerima Ringkasan Polis dalam bentuk non elektronik (cetak).',
    },
    {
      id: '15. ',
      key: 'Penanggung hanya akan menerima pembayaran Premi (maupun transaksi lainnya) sesuai metode pembayaran yang telah ditentukan oleh Penanggung dari waktu ke waktu, yakni melalui rekening resmi milik Penanggung. Oleh karena itu, pembayaran tersebut hanya akan SAYA lakukan melalui metode pembayaran yang telah ditentukan oleh Penanggung. Penanggung tidak akan bertanggung jawab atas risiko dan kerugian yang timbul (apabila ada) jika SAYA melakukan pembayaran Premi (maupun transaksi lainnya) selain menggunakan metode pembayaran yang telah ditentukan oleh Penanggung.',
    },
    {
      id: '16. ',
      key: 'SPAJ ini berbentuk elektronik/digital sehingga untuk selanjutnya SAYA akan memberikan persetujuan dalam bentuk tanda tangan elektronik yang akan dipersamakan keabsahannya dengan tanda tangan basah SAYA.',
    },
  ];

  const PCPP_PRUANUGRAH = [
    {
      id: "",
      key: "SAYA menyatakan bahwa telah mengerti dan telah mendapat penjelasan sepenuhnya dari Tenaga Pemasar dan selanjutnya menyatakan setuju mengenai hal-hal yang tersebut di bawah ini:"
    },
    {
      subid: "1. ",
      subkey: "Semua keterangan yang SAYA berikan di dalam SPAJ Syariah ini dan keterangan lain yang SAYA berikan kepada PT Prudential Sharia Life Assurance (Prudential Syariah) (selanjutnya disebut “Pengelola”) atau Tenaga Pemasar atau kepada Pemeriksa Kesehatan yang ditunjuk oleh Pengelola dan/atau keterangan yang tertulis di dalam dokumen SPAJ tambahan Syariah, Kuesioner dan/atau dokumen lain yang menjadi kelengkapan dan tidak terpisahkan dari SPAJ Syariah ini adalah benar, sesuai, akurat, dan tidak menyesatkan, serta tidak ada hal-hal lain yang telah SAYA ketahui namun SAYA sembunyikan dan/atau tidak SAYA informasikan kepada Pengelola. Semua keterangan yang SAYA berikan di dalam SPAJ Syariah (termasuk yang ditulis di dalam Surat Pernyataan/Amendemen untuk SPAJ Syariah/SPAJT Syariah/Pengajuan Pelayanan Polis) dan/atau Kuesioner (jika ada) dan yang disampaikan kepada Pemeriksa Kesehatan yang ditunjuk oleh Pengelola (jika ada) akan menjadi dasar bagi Pengelola dalam penerbitan Polis."
    },
    {
      subid: "2. ",
      subkey: `SAYA sendiri yang melengkapi dan menandatangani SPAJ Syariah ini serta telah menerima, memahami secara mandiri, danmenyetujui lembar Ringkasan Informasi Produk dan Layanan Versi Personal (Ilustrasi) ${productName} yang menjelaskan risiko, manfaat, kewajiban dan pembebanan biaya asuransi  yang telah disampaikan "secara langsung" oleh Tenaga Pemasar. Segala risiko pemilihan manfaat asuransi sepenuhnya menjaditanggung jawab SAYA.`
    },
    {
      subid: "3. ",
      subkey: "Bahwa Pengelola berhak meminta dokumen berupa bukti penghasilan atau dokumen lainnya yang diperlukan (dan SAYA berkewajiban untuk menyampaikan dokumen tersebut kepada Pengelola) untuk memastikan kesesuaian profil SAYA dan/atau Calon Peserta Yang Diasuransikan dan/atau Calon Pembayar Kontribusi. Dalam hal dokumen yang diperlukan tersebut tidak diterima Pengelola atau dokumen yang diperlukan tersebut mempunyai informasi yang berbeda dan/atau tidak lengkap dengan informasi yang sebelumnya diterima oleh Pengelola, maka SAYA menyetujui bahwa Pengelola berhak menangguhkan transaksi apa pun yang SAYA ajukan dengan memberikan pemberitahuan kepada SAYA."
    },
    {
      subid: "4. ",
      subkey: "Tanpa mengesampingkan ketentuan pada Poin D (Ketentuan Kepesertaan Manfaat Meninggal Dunia Karena Kecelakaan Sebelum Polis Diterbitkan), kepesertaan pada Asuransi Jiwa Syariah tidak akan dimulai sebelum Polis diterbitkan. Jika terjadi peristiwa yang diasuransikan dalam Polis sebelum tanggal Polis diterbitkan, atau SAYA tidak melengkapi persyaratan pengajuan asuransi yang diminta oleh Pengelola dalam waktu 30 (tiga puluh) hari kalender sejak SPAJ Syariah terdaftar di Kantor Pusat Pengelola, atau SAYA membatalkan pengajuan asuransi kepada Pengelola, maka Pengelola tidak berkewajiban untuk membayar Manfaat Asuransi apa pun kecuali mengembalikan Kontribusi (jika telah dibayarkan oleh SAYA) dikurangi semua biaya pemeriksaan kesehatan yang timbul (jika ada)."
    },
    {
      subid: "5. ",
      subkey: "Kepesertaan pada Asuransi Jiwa Syariah akan dinilai ulang oleh Pengelola apabila terdapat pemeriksaan kesehatan yang dilakukan sebelum Polis terbit di luar pengetahuan Pengelola, yang hasilnya dapat memengaruhi/mengubah keputusan Underwriting (Seleksi Risiko) dan/atau apabila terdapat keterangan, pernyataan atau pemberitahuan yang disampaikan (termasuk pernyataan sebagaimana dimaksud dalam butir 3 di atas) ternyata keliru atau berbeda atau berubah yang sifatnya sedemikian rupa sehingga kepesertaan pada Asuransi Jiwa Syariah dan/atau Polis dapat menjadi batal dan dianggap tidak pernah berlaku dan atas hal tersebut Pengelola tidak berkewajiban membayar apa pun selain Nilai Tunai (jika ada)."
    },
    {
      subid: "6. ",
      subkey: "Semua pembayaran Kontribusi harus sudah diterima di rekening Pengelola dan telah teridentifikasi."
    },
    {
      subid: "7. ",
      subkey: "Bahwa pada waktu SAYA mengajukan klaim Manfaat Asuransi, Pengelola berhak meminta bukti keabsahan hubungan keterikatan asuransi antara Pemegang Polis, Peserta Yang Diasuransikan dan Penerima Manfaat. Dalam hal hubungan antara Pemegang Polis,Peserta Yang Diasuransikan dan Penerima Manfaat terdapat perbedaan dengan yang tertulis di SPAJ Syariah ini (misalnya: tidak bisa diverifikasi), Pengelola berhak meminta dokumen pendukung yang wajar dan relevan dengan pengajuan klaim."
    },
    {
      subid: "8. ",
      subkey: "Bahwa pada waktu SAYA mengajukan klaim Manfaat Asuransi, Pengelola berhak meminta kesesuaian profil finansial SAYA dan/atau Peserta Yang Diasuransikan dan/atau Pembayar Kontribusi. Dalam hal terdapat perbedaan pada profil finansial SAYA dan/atau Peserta Yang Diasuransikan dan/atau Pembayar Kontribusi dengan yang tertulis di SPAJ Syariah ini (misalnya: tidak bisa diverifikasi),Pengelola berhak meminta dokumen pendukung yang wajar dan relevan dengan pengajuan klaim dan dokumen pendukung untuk mendukung verifikasi profil finansial. Apabila dokumen pendukung tidak disampaikan atau disampaikan tetapi tidak sesuai dengan profil finansial SAYA, maka Pengelola berhak untuk melakukan pembatalan Polis yang telah diterbitkan."
    },
    {
      subid: "9. ",
      subkey: "SAYA dan/atau Calon Peserta Yang Diasuransikan dan/atau Calon Penerima Manfaat yang diwakilkan oleh SAYA, dengan ini memberikan kuasa dan izin kepada:"
    },
    {
      termid: "(i) ",
      termkey: "Pengelola untuk memperoleh, mengumpulkan, mengolah, menganalisis, menyimpan, memperbaiki, melakukan pembaruan, menampilkan, mengumumkan, mentransfer, menyebarluaskan, mengungkapkan, menghapus atau memusnahkan data pribadi sesuai prinsip pelindungan Data Pribadi (Pemrosesan Data Pribadi) terkait riwayat kesehatan, dan riwayat keuangan Calon Peserta Yang Diasuransikan atau informasi lain mengenai diri Calon Peserta Yang Diasuransikan sejak pengajuan SPAJ Syariah sampai dengan pengajuan klaim dari setiap tenaga medis, rumah sakit, klinik, puskesmas, laboratorium, perusahaan asuransi, perusahaan reasuransi, lembaga/perusahaan di bidang jasa keuangan maupun layanan informasi keuangan, badan, instansi/lembaga, Perusahaan tempat SAYA dan/atau Peserta Yang Diasuransikan bekerja atau pihak lain yang mempunyai catatan/informasi riwayat kesehatan, catatan/informasi keuangan, atau informasi lain mengenai diri Calon Peserta Yang Diasuransikan sejak periode pengajuan SPAJ Syariah sampai hingga periode pengajuan klaim; dan"
    },
    {
      termid: "(ii) ",
      termkey: "Setiap tenaga medis, rumah sakit, klinik, puskesmas, laboratorium, perusahaan asuransi, perusahaan reasuransi, lembaga/perusahaan di bidang jasa keuangan maupun layanan informasi keuangan, badan, instansi/Lembaga, koperasi, atau pihak lain yang mempunyai catatan riwayat kesehatan, catatan/informasi keuangan, atau informasi lain mengenai diri Calon Peserta Yang Diasuransikan untuk mengungkapkan atau memberikan kepada Pengelola semua catatan riwayat kesehatan, atau perawatan, atau catatan/informasi keuangan, atau informasi lain mengenai diri Calon Peserta Yang Diasuransikan.\nPemberian kuasa ini tidak dapat ditarik kembali atau dibatalkan dan tetap berlaku pada waktu Calon Peserta Yang Diasuransikan masih hidup maupun sesudah meninggal dunia, maupun oleh sebab-sebab yang disebutkan dalam Pasal 1813, Pasal 1814, dan Pasal 1816 Kitab Undang-Undang Hukum Perdata Indonesia. Salinan/fotokopi dari kuasa ini memiliki kekuatan hukum yang sama dan mengikat sesuai dengan aslinya."
    },
    {
      subid: "10. ",
      subkey: "Dalam rangka pengajuan dan pembayaran klaim, maupun pelayanan kepada Peserta, SAYA menyatakan bahwa SAYA telah memiliki wewenang sah yang diperoleh dari Calon Penerima Manfaat untuk memberikan data dan/atau informasi pribadi dari Calon Penerima Manfaat kepada Pengelola."
    },
    {
      subid: "11. ",
      subkey: "Jika ada perbedaan data antara data di Polis sebelumnya dengan data di dalam SPAJ Syariah ini, maka yang berlaku adalah data yang tertera di dalam SPAJ Syariah ini. Dalam hal Calon Pemegang Polis dan/atau Calon Peserta Yang Diasuransikan dan/atau Calon Pembayar Kontribusi dan/atau Calon Penerima Manfaat memiliki Polis di Grup Prudential dan/atau Calon Peserta Yang Diasuransikan dan/atau Calon Pembayar Kontribusi dan/atau Calon Penerima Manfaat berbeda dengan data terbaru pada SPAJ Syariah ini, maka SAYA setuju bahwa Prudential Syariah dapat mengganti data Polis Prudential dengan data yang tertera pada SPAJ Syariah ini baik untuk Polis yang terbit maupun tidak terbit."
    },
    {
      subid: "12. ",
      subkey: "Jika pengajuan SPAJ Syariah SAYA telah disetujui oleh Pengelola, namun Kontribusi belum diterima oleh Pengelola dalam waktu 14 (empat belas) hari atau 30 (tiga puluh) hari (sesuai besaran Kontribusi tahunan) sejak SPAJ Syariah tersebut disetujui oleh Pengelola atau dalam waktu 30 (tiga puluh) hari kalender sejak SPAJ Syariah diterima di Kantor Pusat Pengelola, mana yang terjadi lebih dahulu,maka pengajuan SPAJ Syariah SAYA tersebut dianggap berakhir sesuai ketentuan yang berlaku di Pengelola."
    },
    {
      subid: "13. ",
      subkey: "Jika SPAJ Syariah ini merupakan SPAJ pengganti, maka Kontribusi yang telah dibayarkan pada SPAJ sebelumnya di mana SAYA dan Calon Peserta Yang Diasuransikan merupakan orang yang sama, maka secara otomatis akan dialihkan ke SPAJ Syariah ini. Dalam hal pendaftaran dan pembayaran Kontribusi pada SPAJ Syariah ini dengan metode pembayaran autodebit kartu kredit/debit atau autodebit rekening bank yang sudah terdaftar di PRUPay Link maka wajib dilakukan melalui PRUPay Link (https://payment.prudential.co.id). Bagi autodebit kartu kredit berlogo BCA Card atau autodebit rekening yang belum terdaftar di PRUPay Link maka perlu melampirkan Surat Kuasa Pendebitan Kartu Kredit (SKPKK) khusus BCA Card atau Surat Kuasa Pendebitan Rekening (SKPR) sesuai dengan ketentuan Bank yang berlaku. Jika Calon Pemegang Polis melewati masa 30 hari kalender setelah SPAJ Syariah diterima oleh Pengelola, maka perlu mengajukan SPAJ Syariah baru dan pendaftaran autodebit dengan nomor SPAJSyariah yang baru melalui PRUPay Link."
    },
    {
      subid: "14. ",
      subkey: "SAYA memahami dan setuju bahwa Polis SAYA akan dikirimkan secara elektronik melalui E-mail yang SAYA daftarkan pada SPAJSyariah ini setelah proses pengajuan asuransi SAYA disetujui oleh Pengelola."
    },
    {
      subid: "15. ",
      subkey: "Prudential Syariah hanya akan menerima pembayaran Kontribusi (maupun transaksi lainnya) sesuai metode pembayaran yang telah ditentukan oleh Prudential Syariah dari waktu ke waktu, yakni melalui rekening resmi milik Prudential Syariah. Oleh karena itu,pembayaran tersebut hanya akan SAYA lakukan melalui metode pembayaran yang telah ditentukan oleh Prudential Syariah. Prudential Syariah tidak akan bertanggung jawab atas risiko dan kerugian yang timbul (apabila ada) jika SAYA melakukan pembayaran Kontribusi (maupun transaksi lainnya) selain menggunakan metode pembayaran yang telah ditentukan oleh Prudential Syariah."
    },
    {
      subid: "16. ",
      subkey: "SPAJ Syariah ini berbentuk elektronik/digital sehingga untuk selanjutnya SAYA akan memberikan persetujuan dalam bentuk tanda tangan elektronik yang akan dipersamakan keabsahannya dengan tanda tangan basah SAYA."
    },
    {
      subid: "17. ",
      subkey: "Dalam 1 (satu) tahun terakhir sampai dengan SPAJ Syariah ini ditandatangani dan ajukan oleh SAYA kepada Pengelola, baik SAYA atau keluarga inti SAYA, atau SAYA sebagai Pemegang Polis/Peserta Yang Diasuransikan/Pembayar Kontribusi, tidak berstatus sebagai Penerima Manfaat dari program bantuan sosial (Bansos) untuk kategori fakir miskin atau tidak mampu yang diberikan oleh Pemerintah. Jika dikemudian hari setelah SPAJ Syariah ini disampaikan kepada Pengelola dan telah diterbitkan Polis Asuransi Jiwa atas pengajuan SAYA tersebut, ditemukan fakta bahwa SAYA ataupun keluarga inti SAYA, atau SAYA sebagai Pemegang Polis/ Peserta Yang Diasuransikan /Pembayar Kontribusi, berstatus sebagai Penerima Manfaat dari program Bansos, baik sebelum maupun sesudah Polis Asuransi Jiwa diterbitkan, maka Pengelola berhak untuk meminta dokumen finansial dan/atau  melakukan seleksi ulang risiko. Apabila dokumen finansial tidak dapat dipenuhi, maka Pengelola dapat membatalkan Polis Asuransi Jiwa Syariah."
    }
  ]

  const PCPP: Record<string, any[]> = {
    U12: PCPP_PNG,
    U13: PCPP_PNGS,
    H14: PCPP_PWM,
    H15: PCPP_PWMS,
    E1O: PCPP_PRUCERAH,
    E1OP: PCPP_PRUCERAH,
    C16: PCPP_PSKKS,
    T1P: PCPP_PCB88,
    T1Q: PCPP_PCB88,
    L1WR: PCPP_PRUFUTURE,
    L1WD: PCPP_PRUFUTURE,
    L1Q: PCPP_PRUANUGRAH
  };

  let _PCPP = PCPP[productCode] || PCPP_DEFAULT;

  // conditional if UL has Rider PWH
  if (productType === 'UL' && (rider?.benefitsCode === 'H165' || rider?.benefitsCode === 'H161')) {
    _PCPP = [
      ..._PCPP,
      ...PCPP_UL_W_PWH
    ];
  }

  return {
    label: i18next.t('Epos:policyholder_statement_on_form', { spaj }),
    key: 'PCPP',
    desc: _PCPP,
    information: i18next.t('Epos:policyholder_statement_on_form', { spaj }),
  };
};

export const getComplianceTnC = ({
  productType,
  policyType,
  productCode,
  productName,
  spaj,
}: SKKPKPParams): TDisclaimerItem => {
  const isSharia = policyType === 'sharia';
  const { insurerManager } = WR_SHARIA_CONVENT[policyType];
  const SKKPKP_PWM = [
    {
      id: 'A. ',
      key: i18next.t('Epos:syarat_ketentuan_keputusan_traditional'),
    },
    {
      id: '-',
      key: i18next.t('Epos:persetujuan_pernyataan_traditional'),
    },
    {
      subid: '1. ',
      subkey: `Apabila pembayaran yang SAYA lakukan terdapat indikasi mencurigakan sebagaimana yang tercantum pada peraturan perundang-undangan mengenai Pencegahan dan Pemberantasan Tindak Pidana Pencucian Uang, Pencegahan dan Pemberantasan Tindak Pidana Pendanaan Terorisme dan Pendanaan Proliferasi Senjata Pemusnah Massal beserta perubahan-perubahan dan peraturan pelaksanaannya, maka ${insurerManager} dapat melakukan hal-hal yang diperlukan sebagaimana tercantum di dalam peraturan perundang-undangan tersebut.`,
    },
    {
      subid: '2. ',
      subkey: `Sesuai dengan Peraturan OJK tentang Penerapan Program Anti Pencucian Uang, Pencegahan Pendanaan Terorisme, dan Pencegahan Pendanaan Proliferasi Senjata Pemusnah Massal di Sektor Jasa Keuangan yang berlaku beserta peraturan pelaksanaannya, SAYA menyadari, mengerti dan memahami bahwa SAYA memiliki kewajiban untuk senantiasa melakukan pengkinian data pribadi SAYA kepada ${insurerManager} dan menyerahkan salinan dokumen pendukung yang berlaku kepada ${insurerManager}. Berdasarkan peraturan tersebut, SAYA juga setuju bahwa ${insurerManager} dapat menolak hubungan usaha/transaksi, membatalkan transaksi dan/atau Pertanggungan dengan SAYA apabila SAYA, (1) tidak melakukan pengkinian data tersebut; (2) diketahui dan/atau patut diduga menggunakan dokumen palsu; (3) menyampaikan informasi yang diragukan kebenarannya; (4) terdapat di dalam Daftar Terduga Teroris dan Organisasi Teroris; (5) terdapat di dalam Daftar Pendanaan Proliferasi Senjata Pemusnah Massal dan/atau; (6) memiliki sumber dana transaksi yang diketahui dan/atau patut diduga berasal dari hasil tindak pidana.`,
    },
    {
      subid: '3. ',
      subkey: `Bahwa sebagai bagian dari pelaksanaan program Anti Pencucian Uang, Pencegahan Pendanaan Terorisme, dan Pencegahan Pendanaan Proliferasi Senjata Pemusnah Massal, ${insurerManager} juga harus tunduk dan patuh kepada aturan Grup Prudential yang berlaku terkait dengan Penerapan daftar Sanksi Tertentu. Adapun yang dimaksud dengan Sanksi Tertentu, adalah “tindakan pembatasan yang diberlakukan terhadap suatu rezim/tata pemerintahan yang berkuasa, negara, pemerintah, entitas, orang perorangan dan industri tertentu oleh lembaga international, atau pemerintah di Indonesia atau pemerintah di luar Indonesia,termasuk namun tidak terbatas pada, <i>the Office of Financial Sanctions Implementation HM Treasury, the United Nations, the European Union, the US Treasury Department’s Office of Foreign Assets Control</i>”.`,
    },
    {
      subid: '4. ',
      subkey: `Sehubungan dengan penerapan daftar Sanksi Tertentu, apabila (i) ${insurerManager} mengetahui atau diberi tahu bahwa Pemegang Polis,Tertanggung, Pembayar Premi, Pemilik Manfaat/Pengendali Perusahaan, orang yang mewakili (<i>nominee</i>), penerima manfaat, orang perorangan atau entitas yang terkait dengan pengajuan SPAJ ini beserta perubahannya di kemudian hari disebutkan atau tercantum didalam daftar Sanksi Tertentu, atau (ii) jika ${insurerManager} atau bank atau pihak ketiga terkait lainnya ditemukan melanggar kewajiban penerapan Sanksi Tertentu tersebut sebagai akibat dari pengambilan tindakan apa pun terhadap SPAJ ini, maka ${insurerManager} dapat mengakhiri pertanggungan dengan segera, setelah memberikan pemberitahuan selambat-lambatnya 30 (tiga puluh) hari kalender kepada Pemegang Polis, dan/atau mengambil tindakan lain yang ${insurerManager} anggap perlu, termasuk namun tidak terbatas pada memberitahukan kepada otoritas pemerintah terkait, menunda transaksi, membekukan uang yang dibayarkan kepada ${insurerManager},membekukan Nilai Tunai, dan/atau mentransfer pembayaran uang atau Nilai Tunai tersebut kepada otoritas pemerintah terkait sesuai instruksi dari otoritas pemerintah tersebut. Selain itu, ${insurerManager} dapat meminta penggantian atas segala kerugian yang mungkin dialami oleh ${insurerManager} kepada SAYA sebagai akibat dari pelaksanaan ketentuan ini, dan hak ini akan tetap berlaku walaupun Pertanggungan ini telah berakhir.`,
    },
    {
      subid: '5. ',
      subkey: `SAYA dengan ini mengakui dan menyetujui bahwa ${insurerManager} dapat diwajibkan untuk mematuhi, mempelajari dan memenuhi persyaratan dari hukum, peraturan, perintah, petunjuk dan permintaan dari setiap badan yudisial, pajak, pemerintah dan/atau badan pengatur (selanjutnya disebut “Otoritas-otoritas” dan secara tersendiri disebut “Otoritas”) dalam berbagai yurisdiksi sebagaimana diterbitkan dan diubah dari waktu ke waktu (selanjutnya disebut “Persyaratan yang Relevan”). Dalam hal ini, SAYA setuju bahwa ${insurerManager} dapat mengambil setiap dan seluruh langkah yang secara wajar dianggap perlu untuk diambil oleh ${insurerManager} untuk memastikan kepatuhan atau ketaatan ${insurerManager} dengan Persyaratan yang Relevan, secara khusus pengungkapan atas keadaan khusus SAYA dan/atau Calon Tertanggung terhadap Otoritas.`,
    },
    {
      subid: '6. ',
      subkey: `SAYA setuju bahwa ${insurerManager} dapat mengungkapkan keadaan khusus SAYA atau informasi apa pun mengenai SAYA kepada Otoritas sehubungan dengan ketaatan terhadap Persyaratan yang Relevan. Pengungkapan tersebut dapat diberlakukan secara langsung atau dikirimkan melalui salah satu dari Kantor Pusat ${insurerManager} atau afiliasi lainnya dari ${insurerManager}. Untuk tujuan tersebut dan tanpa mengabaikan ketentuan manapun lainnya dalam SPAJ atau Polis SAYA (apabila pengajuan SPAJ ini disetujui), ${insurerManager} dapat meminta SAYA untuk memberikan informasi lebih lanjut sebagaimana dipersyaratkan untuk pengungkapan terhadap Otoritas manapun dan SAYA wajib memberikan informasi tersebut kepada ${insurerManager} dalam jangka waktu tertentu sebagaimana dapat dipersyaratkan secara wajar. SAYA memahami konsekuensi jika SAYA tidak bersedia menyampaikan pernyataan persetujuan, instruksi atau pemberian kuasa secara tertulis dan sukarela. ${insurerManager} berhak untuk menolak hubungan usaha, transaksi dan/atau mengakhiri hubungan usaha dengan SAYA, dan SAYA berhak menolak memberikan pernyataan persetujuan, instruksi atau pemberian kuasa secara tertulis dan sukarela, dengan menerima konsekuensi seperti yang disebutkan di atas.`,
    },
    {
      subid: '7. ',
      subkey: `Tanpa mengabaikan ketentuan manapun lainnya dari SPAJ atau Polis SAYA (apabila pengajuan SPAJ ini disetujui), SAYA setuju untuk menyediakan bantuan yang mungkin secara wajar dibutuhkan untuk memungkinkan ${insurerManager} mematuhi kewajiban ${insurerManager} berdasarkan seluruh Persyaratan yang Relevan mengenai SAYA atau Polis SAYA pada ${insurerManager}.`,
    },
    {
      subid: '8. ',
      subkey: `SAYA setuju untuk memberikan informasi kepada ${insurerManager} secara tepat waktu atas setiap perubahan apa pun dari keterangan yang sebelumnya telah disampaikan kepada ${insurerManager}, atau selambat-lambatnya 90 (sembilan puluh) hari kalender sejak terjadinya perubahan yang dimaksud, baik pada saat pengisian permohonan asuransi ini atau di waktu manapun lainnya. Secara khusus, merupakan hal yang sangat penting bagi SAYA untuk memberikan informasi kepada ${insurerManager} secara langsung apabila terdapat perubahan atas kewarganegaraan SAYA, status pajak atau wajib pajak atau jika SAYA menjadi wajib pajak di lebih dari satu negara. Jika salah satu dari perubahan ini terjadi atau jika informasi manapun lainnya mengindikasikan adanya perubahan dimaksud, ${insurerManager} dapat meminta SAYA untuk memberikan dokumen-dokumen tertentu atau informasi terkait, dan SAYA setuju untuk memberikan informasi tersebut. Dokumen dan informasi tersebut adalah termasuk namun tidak terbatas pada pernyataan atau formulir pajak (dan dilegalisasi oleh notaris, apabila diperlukan) yang telah dilengkapi dan/atau ditandatangani oleh SAYA.`,
    },
    {
      subid: '9. ',
      subkey: `Jika SAYA tidak menyediakan informasi dan dokumen-dokumen yang diminta tersebut kepada ${insurerManager} dalam jangka waktu tertentu atau jika salah satu dari informasi atau dokumen-dokumen yang disediakan tersebut tidak tepat waktu, akurat atau lengkap, SAYA setuju bahwa ${insurerManager} dapat, untuk memastikan kepatuhan dan ketaatan yang berkelanjutan terhadap Persyaratan yang Relevan, mengambil setiap dan seluruh langkah yang ${insurerManager} anggap sesuai untuk memastikan kepatuhan atau ketaatan ${insurerManager} terhadap Persyaratan yang Relevan, atau selainnya untuk melindungi kepentingan hukum dan/atau komersial ${insurerManager}.`,
    },
    {
      id: 'B. ',
      key: i18next.t('Epos:pelayanan_konsumen_traditional'),
    },
    {
      id: '-',
      key: i18next.t('Epos:setuju_terhadap_pernyataan_traditional'),
    },
    {
      subid: '1. ',
      subkey: `SAYA telah menerima, mendapatkan penjelasan dan memahami mengenai Ringkasan Informasi Produk dan Layanan Versi Umum dan Ringkasan Informasi Produk dan Layanan Versi Personal (Ilustrasi) ${productName} dari Tenaga Pemasar, termasuk bahwa ${productName} adalah merupakan produk yang memberikan manfaat perlindungan terhadap risiko. SAYA telah memperoleh penjelasan dan memahami manfaat, risiko, persyaratan dan tata cara, dan biaya dari ${productName} yang ditawarkan kepada Pemegang Polis, masa leluasa (<i>grace period</i>), masa mempelajari Polis (<i>free-look period</i>), serta kewajiban Pemegang Polis, Tertanggung dan/atau Penanggung.`,
    },
    {
      subid: '2. ',
      subkey: `Bahwa Penanggung dapat menghubungi SAYA dan/atau (Calon) Tertanggung baik secara langsung maupun melalui Tenaga Pemasar atau pihak lain yang ditunjuk oleh Penanggung, untuk menyampaikan informasi mengenai SPAJ dan/atau Polis (termasuk proses klaim dan pelayanan lainnya), informasi terkait produk atau layanan Penanggung (termasuk penawaran produk dari Prudential Indonesia sepanjang SAYA dan/atau (Calon) Tertanggung menyetujuinya), termasuk namun tidak terbatas pada informasi mengenai alasan pemberian keputusan Underwriting tertentu terhadap SPAJ dan/atau Polis, atau informasi berkaitan dengan Premi. Dalam hal informasi tersebut diberikan melalui berbagai sarana komunikasi pribadi, maka SAYA menyetujui bahwa komunikasi tersebut dapat terkirim baik pada atau di luar hari/jam kerja dan SAYA bersedia untuk dihubungi oleh Penanggung, Tenaga Pemasar atau pihak lain yang ditujuk oleh Penanggung melalui sarana komunikasi pribadi.`,
    },
    {
      id: 'C. ',
      key: i18next.t('Epos:perikatan_traditional'),
    },
    {
      id: '-',
      key: i18next.t('Epos:agreement_statements_traditional'),
    },
    {
      subid: '1. ',
      subkey: `Bahwa setelah Penanggung menyetujui SPAJ ini dan Premi telah SAYA bayarkan, SAYA dan Penanggung sepakat membuat perjanjian pertanggungan kesehatan dalam bentuk Polis yang akan diterbitkan oleh Penanggung, dan oleh karenanya SAYA dan Penanggung setuju untuk memenuhi hak dan melaksanakan kewajiban masing-masing berdasarkan syarat dan ketentuan yang tercantum di dalam Ringkasan Polis, Ketentuan Polis, Ketentuan Khusus Asuransi dan Ketentuan Lain (apabila diadakan) yang merupakan bagian yang tidak terpisahkan dari Polis yang akan diterbitkan Penanggung tersebut.`,
    },
    {
      subid: '2. ',
      subkey: `Pemegang Polis memiliki kesempatan untuk mempelajari dengan seksama Polis tersebut sesuai ketentuan yang terdapat pada Polis dan keterangan yang terdapat pada Ringkasan Informasi Produk dan Layanan Versi Umum dan Ringkasan Informasi Produk dan Layanan Versi Personal (Ilustrasi) ${productName}.`,
    },
    {
      subid: '3. ',
      subkey: `Dalam rentang waktu sebagaimana dimaksud pada butir 2 di atas, Pemegang Polis dapat mengurungkan maksud untuk mempertanggungkan diri Tertanggung berdasarkan Polis tersebut, dengan cara menginformasikan hal tersebut kepada Penanggung, dan dengan ketentuan bahwa Pemegang Polis tidak pernah mengajukan perubahan Polis dan/atau melakukan transaksi Polis dan/atau mengajukan klaim atas Manfaat Asuransi yang ditanggung dalam Polis tersebut. Dalam hal ini, Penanggung akan mengembalikan Premi yang telah dibayarkan dikurangi biaya-biaya (jika ada) sesuai ketentuan yang terdapat pada Ringkasan Informasi Produk dan Layanan Versi Umum dan Ringkasan Informasi Produk dan Layanan Versi Personal (Ilustrasi) ${productName}.`,
    },
    {
      subid: '4. ',
      subkey: `SAYA selaku Calon Pemegang Polis berhak dan berwenang bertindak untuk dan atas nama Calon Tertanggung, Calon Pembayar Premi maupun Penerima Manfaat yang sah secara hukum untuk mengambil tindakan, keputusan dan/atau hal-hal lainnya yangberkaitan dengan pemenuhan hak dan kewajiban atas Polis SAYA, dan dengan ini SAYA menjamin bahwa Calon Tertanggung,Calon Pembayar Premi maupun Penerima Manfaat setuju dan sepakat atas tindakan, keputusan dan/atau hal-hal lainnya yang berkaitan dengan pemenuhan hak dan kewajiban atas Polis tersebut.`,
    },
  ];
  const SKKPKP_PWMS = [
    {
      id: 'A. ',
      key: `SYARAT DAN KETENTUAN KEPATUHAN`,
    },
    {
      id: '-',
      key: i18next.t('Epos:persetujuan_pernyataan_traditional'),
    },
    {
      subid: '1. ',
      subkey: `Apabila pembayaran yang SAYA lakukan terdapat indikasi mencurigakan sebagaimana yang tercantum pada peraturan perundang-undangan mengenai Pencegahan dan Pemberantasan Tindak Pidana Pencucian Uang, Pencegahan dan Pemberantasan Tindak Pidana Pendanaan Terorisme dan Pendanaan Proliferasi Senjata Pemusnah Massal beserta perubahan-perubahan dan peraturan pelaksanaannya, maka Pengelola dapat melakukan hal-hal yang diperlukan sebagaimana tercantum di dalam peraturan perundang-undangan tersebut.`,
    },
    {
      subid: '2. ',
      subkey: `Sesuai dengan Peraturan OJK tentang Penerapan Program Anti Pencucian Uang, Pencegahan Pendanaan Terorisme, dan Pencegahan Pendanaan Proliferasi Senjata Pemusnah Massal di Sektor Jasa Keuangan yang berlaku beserta peraturan pelaksanaannya, SAYA menyadari, mengerti dan memahami bahwa SAYA memiliki kewajiban untuk senantiasa melakukan pengkinian data pribadi SAYA kepada Pengelola dan menyerahkan salinan dokumen pendukung yang berlaku kepada Pengelola. Berdasarkan peraturan tersebut, SAYA juga setuju bahwa Pengelola dapat menolak hubungan usaha/transaksi, membatalkan transaksi dan/atau Kepesertaan dengan SAYA apabila SAYA, (1) tidak melakukan pengkinian data tersebut; (2) diketahui dan/atau patut diduga menggunakan dokumen palsu; (3) menyampaikan informasi yang diragukan kebenarannya; (4) terdapat di dalam Daftar Terduga Teroris dan Organisasi Teroris; (5) terdapat di dalam Daftar Pendanaan Proliferasi Senjata Pemusnah Massal dan/atau; (6) memiliki sumber dana transaksi yang diketahui dan/atau patut diduga berasal dari hasil tindak pidana.`,
    },
    {
      subid: '3. ',
      subkey: `Bahwa sebagai bagian dari pelaksanaan program Anti Pencucian Uang, Pencegahan Pendanaan Terorisme, dan Pencegahan Pendanaan Proliferasi Senjata Pemusnah Massal, Pengelola juga harus tunduk dan patuh kepada aturan Grup Prudential yang berlaku terkait dengan Penerapan daftar Sanksi Tertentu. Adapun yang dimaksud dengan Sanksi Tertentu, adalah “tindakan pembatasan yang diberlakukan terhadap suatu rezim/tata pemerintahan yang berkuasa, negara, pemerintah, entitas, orang perorangan dan industri tertentu oleh lembaga international, atau pemerintah di Indonesia atau pemerintah di luar Indonesia, termasuk namun tidak terbatas pada, <i>the Office of Financial Sanctions Implementation HM Treasury</i>, <i>the United Nations</i>, <i>the European Union</i>, <i>the US Treasury Department’s Office of Foreign Assets Control</i>”.`,
    },
    {
      subid: '4. ',
      subkey: `Sehubungan dengan penerapan daftar Sanksi Tertentu, apabila (i) Pengelola mengetahui atau diberi tahu bahwa Pemegang Polis, Peserta Yang Diasuransikan, Pembayar Kontribusi, Pemilik Manfaat/Pengendali Perusahaan, orang yang mewakili (<i>nominee</i>), penerima manfaat, orang perorangan atau entitas yang terkait dengan pengajuan SPAJ Syariah ini beserta perubahannya di kemudian hari disebutkan atau tercantum didalam daftar Sanksi Tertentu, atau (ii) jika Pengelola atau bank atau pihak ketiga terkait lainnya ditemukan melanggar kewajiban penerapan Sanksi Tertentu tersebut sebagai akibat dari pengambilan tindakan apa pun terhadap SPAJ Syariah ini, maka Pengelola dapat mengakhiri kepesertaan dengan segera, setelah memberikan pemberitahuan selambat-lambatnya 30 (tiga puluh) hari kalender kepada Pemegang Polis, dan/atau mengambil tindakan lain yang Pengelola anggap perlu, termasuk namun tidak terbatas pada memberitahukan kepada otoritas pemerintah terkait, menunda transaksi, membekukan uang yang dibayarkan kepada Pengelola, membekukan Nilai Tunai, dan/atau mentransfer pembayaran uang atau Nilai Tunai tersebut kepada otoritas pemerintah terkait sesuai instruksi dari otoritas pemerintah tersebut. Selain itu, Pengelola dapat meminta penggantian atas segala kerugian yang mungkin dialami oleh Pengelola kepada SAYA sebagai akibat dari pelaksanaan ketentuan ini, dan hak ini akan tetap berlaku walaupun Kepesertaan ini telah berakhir.`,
    },
    {
      subid: '5. ',
      subkey: `SAYA dengan ini mengakui dan menyetujui bahwa Pengelola dapat diwajibkan untuk mematuhi, mempelajari dan memenuhi persyaratan dari hukum, peraturan, perintah, petunjuk dan permintaan dari setiap badan yudisial, pajak, pemerintah dan/atau badan pengatur (selanjutnya disebut “Otoritas-otoritas” dan secara tersendiri disebut “Otoritas”) dalam berbagai yurisdiksi sebagaimana diterbitkan dan diubah dari waktu ke waktu (selanjutnya disebut “Persyaratan yang Relevan”). Dalam hal ini, SAYA setuju bahwa Pengelola dapat mengambil setiap dan seluruh langkah yang secara wajar dianggap perlu untuk diambil oleh Pengelola untuk memastikan kepatuhan atau ketaatan Pengelola dengan Persyaratan yang Relevan, secara khusus pengungkapan atas keadaan khusus SAYA terhadap Otoritas.`,
    },
    {
      subid: '6. ',
      subkey: `SAYA setuju bahwa Pengelola dapat mengungkapkan keadaan khusus SAYA atau informasi apa pun mengenai SAYA kepada Otoritas sehubungan dengan ketaatan terhadap Persyaratan yang Relevan. Pengungkapan tersebut dapat diberlakukan secara langsung atau dikirimkan melalui salah satu dari Kantor Pusat Pengelola atau afiliasi lainnya dari Pengelola. Untuk tujuan tersebut dan tanpa mengabaikan ketentuan manapun lainnya dalam SPAJ Syariah atau Polis SAYA (apabila pengajuan SPAJ Syariah ini disetujui), Pengelola dapat meminta SAYA untuk memberikan informasi lebih lanjut sebagaimana dipersyaratkan untuk pengungkapan terhadap Otoritas manapun dan SAYA wajib memberikan informasi tersebut kepada Pengelola dalam jangka waktu tertentu sebagaimana dapat dipersyaratkan secara wajar. SAYA memahami konsekuensi jika SAYA tidak bersedia menyampaikan pernyataan persetujuan, instruksi atau pemberian kuasa secara tertulis dan sukarela. Pengelola berhak untuk menolak hubungan usaha, transaksi dan/atau mengakhiri hubungan usaha dengan SAYA, dan SAYA berhak menolak memberikan pernyataan persetujuan, instruksi atau pemberian kuasa secara tertulis dan sukarela, dengan menerima konsekuensi seperti yang disebutkan di atas.`,
    },
    {
      subid: '7. ',
      subkey: `Tanpa mengabaikan ketentuan manapun lainnya dari SPAJ Syariah atau Polis SAYA (apabila pengajuan SPAJ Syariah ini disetujui), SAYA setuju untuk menyediakan bantuan yang mungkin secara wajar dibutuhkan untuk memungkinkan Pengelola mematuhi kewajiban Pengelola berdasarkan seluruh Persyaratan yang Relevan mengenai SAYA atau Polis SAYA pada Pengelola.`,
    },
    {
      subid: '8. ',
      subkey: `SAYA setuju untuk memberikan informasi kepada Pengelola secara tepat waktu atas setiap perubahan apa pun dari keterangan yang sebelumnya telah disampaikan kepada Pengelola, atau selambat-lambatnya 90 (sembilan puluh) hari kalender sejak terjadinya perubahan yang dimaksud, baik pada saat pengisian permohonan asuransi ini atau di waktu manapun lainnya. Secara khusus, merupakan hal yang sangat penting bagi SAYA untuk memberikan informasi kepada Pengelola secara langsung apabila terdapat perubahan atas kewarganegaraan SAYA, status pajak atau wajib pajak atau jika SAYA menjadi wajib pajak di lebih dari satu negara. Jika salah satu dari perubahan ini terjadi atau jika informasi manapun lainnya mengindikasikan adanya perubahan dimaksud, Pengelola dapat meminta SAYA untuk memberikan dokumen-dokumen tertentu atau informasi terkait, dan SAYA setuju untuk memberikan informasi tersebut. Dokumen dan informasi tersebut adalah termasuk namun tidak terbatas pada pernyataan atau formulir pajak (dan dilegalisasi oleh notaris, apabila diperlukan) yang telah dilengkapi dan/atau ditandatangani oleh SAYA.`,
    },
    {
      subid: '9. ',
      subkey: `Jika SAYA tidak menyediakan informasi dan dokumen-dokumen yang diminta tersebut kepada Pengelola dalam jangka waktu tertentu atau jika salah satu dari informasi atau dokumen-dokumen yang disediakan tersebut tidak tepat waktu, akurat atau lengkap, SAYA setuju bahwa Pengelola dapat, untuk memastikan kepatuhan dan ketaatan yang berkelanjutan terhadap Persyaratan yang Relevan, mengambil setiap dan seluruh langkah yang Pengelola anggap sesuai untuk memastikan kepatuhan atau ketaatan Pengelola terhadap Persyaratan yang Relevan, atau selainnya untuk melindungi kepentingan hukum dan/atau komersial Pengelola.`,
    },
    {
      id: 'B. ',
      key: i18next.t('Epos:pelayanan_konsumen_traditional'),
    },
    {
      id: '-',
      key: i18next.t('Epos:setuju_terhadap_pernyataan_traditional'),
    },
    {
      subid: '1. ',
      subkey: `SAYA telah menerima, mendapatkan penjelasan dan memahami mengenai Ringkasan Informasi Produk dan Layanan Versi Umum dan Ringkasan Informasi Produk dan Layanan Versi Personal (Ilustrasi) ${productName} dari Tenaga Pemasar, termasuk bahwa ${productName} adalah merupakan produk yang memberikan manfaat perlindungan terhadap risiko. SAYA telah memperoleh penjelasan dan memahami manfaat, risiko, persyaratan dan tata cara, dan biaya dari ${productName} yang ditawarkan kepada Pemegang Polis, masa leluasa (<i>grace period</i>), masa mempelajari Polis (<i>free-look period</i>), serta kewajiban Pemegang Polis, Peserta Yang Diasuransikan dan/atau Pengelola.`,
    },
    {
      subid: '2. ',
      subkey: `Bahwa Pengelola dapat menghubungi SAYA dan/atau (Calon) Peserta Yang Diasuransikan, baik secara langsung maupun melalui Tenaga Pemasar atau pihak lain yang ditunjuk oleh Pengelola, untuk menyampaikan informasi mengenai SPAJ Syariah dan/atau Polis (termasuk proses klaim dan pelayanan lainnya), informasi terkait produk atau layanan Pengelola (termasuk penawaran produk dari Prudential Syariah sepanjang SAYA dan/atau (Calon) Peserta Yang Diasuransikan menyetujuinya), termasuk namun tidak terbatas pada informasi mengenai alasan pemberian keputusan Underwriting tertentu terhadap SPAJ Syariah dan/atau Polis, atau informasi berkaitan dengan Kontribusi. Dalam hal informasi tersebut diberikan melalui berbagai sarana komunikasi pribadi, maka SAYA menyetujui bahwa komunikasi tersebut dapat terkirim baik pada atau di luar hari/jam kerja dan SAYA bersedia untuk dihubungi oleh Pengelola, Tenaga Pemasar atau pihak lain yang ditunjuk oleh Pengelola melalui sarana komunikasi pribadi.`,
    },
    {
      id: 'C. ',
      key: i18next.t('Epos:perikatan_traditional'),
    },
    {
      id: '-',
      key: i18next.t('Epos:agreement_statements_traditional'),
    },
    {
      subid: '1. ',
      subkey: `Bahwa setelah Pengelola menyetujui SPAJ Syariah ini dan Kontribusi telah SAYA bayarkan, SAYA dan Pengelola sepakat membuat perjanjian asuransi kesehatan syariah dalam bentuk Polis yang akan diterbitkan oleh Pengelola, dan oleh karenanya SAYA dan Pengelola setuju untuk memenuhi hak dan melaksanakan kewajiban masing-masing berdasarkan syarat dan ketentuan yang tercantum di dalam Ringkasan Polis, Ketentuan Polis, Ketentuan Khusus Asuransi dan Ketentuan Lain (apabila diadakan) yang merupakan bagian yang tidak terpisahkan dari Polis yang akan diterbitkan Pengelola tersebut.`,
    },
    {
      subid: '2. ',
      subkey: `Pemegang Polis memiliki kesempatan untuk mempelajari dengan seksama Polis tersebut sesuai ketentuan yang terdapat pada Polis dan keterangan yang terdapat pada Ringkasan Informasi Produk dan Layanan Versi Umum dan Ringkasan Informasi Produk dan Layanan Versi Personal (Ilustrasi) ${productName}.`,
    },
    {
      subid: '3. ',
      subkey: `Dalam rentang waktu sebagaimana dimaksud pada butir 2 di atas, Pemegang Polis dapat mengurungkan maksud untuk melindungi Peserta Yang Diasuransikan berdasarkan Polis tersebut, dengan cara menginformasikan hal tersebut kepada Pengelola, dan dengan ketentuan bahwa Pemegang Polis tidak pernah mengajukan perubahan Polis dan/atau melakukan transaksi Polis dan/atau mengajukan klaim atas Manfaat Asuransi yang diasuransikan dalam Polis tersebut. Dalam hal ini, Pengelola akan mengembalikan Kontribusi yang telah dibayarkan dikurangi biaya-biaya (jika ada) sesuai ketentuan yang terdapat pada Ringkasan Informasi Produk dan Layanan Versi Umum dan Ringkasan Informasi Produk dan Layanan Versi Personal (Ilustrasi) ${productName}.`,
    },
    {
      subid: '4. ',
      subkey: `SAYA selaku Pemegang Polis berhak dan berwenang bertindak untuk dan atas nama Calon Peserta Yang Diasuransikan, Calon Pembayar Kontribusi maupun Penerima Manfaat yang sah secara hukum untuk mengambil tindakan, keputusan dan/atau hal-hal lainnya yang berkaitan dengan pemenuhan hak dan kewajiban atas Polis SAYA, dan dengan ini SAYA menjamin bahwa Calon Peserta Yang Diasuransikan, Calon Pembayar Kontribusi maupun Penerima Manfaat setuju dan sepakat atas tindakan, keputusan dan/atau hal-hal lainnya yang berkaitan dengan pemenuhan hak dan kewajiban atas Polis tersebut.`,
    },
  ];
  const SKKPKP_DEFAULT = [
    {
      id: 'A. ',
      key: i18next.t('Epos:syarat_ketentuan_keputusan_traditional'),
    },
    {
      id: '-',
      key: i18next.t('Epos:persetujuan_pernyataan_traditional'),
    },
    {
      subid: '1. ',
      subkey: i18next.t('Epos:pembayaran_mencurigakan_traditional', { insurerManager }),
    },
    {
      subid: '2. ',
      subkey: i18next.t('Epos:kewajiban_pengkinian_data_traditional', { insurerManager }),
    },
    {
      subid: '3. ',
      subkey: i18next.t('Epos:pelaksanaan_program_anti_pencucian_uang_traditional', { insurerManager }),
    },
    {
      subid: '4. ',
      subkey: i18next.t('Epos:penerapan_daftar_sanksi_tertentu_traditional', { insurerManager, spaj }),
    },
    {
      subid: '5. ',
      subkey: i18next.t('Epos:pengakuan_kepatuhan_otoritas_traditional', { insurerManager }),
    },
    {
      subid: '6. ',
      subkey: i18next.t('Epos:persetujuan_pengungkapan_informasi_traditional', { insurerManager, spaj }),
    },
    {
      subid: '7. ',
      subkey: i18next.t('Epos:bantuan_kepatuhan_traditional', { insurerManager, spaj }),
    },
    {
      subid: '8. ',
      subkey: i18next.t('Epos:informasi_perubahan_traditional', { insurerManager }),
    },
    {
      subid: '9. ',
      subkey: i18next.t('Epos:ketidakpatuhan_informasi_dokumen_traditional', { insurerManager }),
    },
    {
      id: 'B. ',
      key: i18next.t('Epos:pelayanan_konsumen_traditional'),
    },
    {
      id: '-',
      key: i18next.t('Epos:setuju_terhadap_pernyataan_traditional'),
    },
    {
      subid: '1. ',
      subkey: i18next.t('Epos:menerima_dan_memahami_rincian_traditional', { productName, insurerManager }),
    },
    {
      subid: '2. ',
      subkey: i18next.t('Epos:informasi_kontak_traditional', { insurerManager, spaj }),
    },
    {
      id: 'C. ',
      key: i18next.t('Epos:perikatan_traditional'),
    },
    {
      id: '-',
      key: i18next.t('Epos:agreement_statements_traditional'),
    },
    {
      subid: '1. ',
      subkey: i18next.t('Epos:agreement_after_approval_traditional', { insurerManager, spaj }),
    },
    {
      subid: '2. ',
      subkey: i18next.t('Epos:policy_holder_opportunity_to_review_traditional', { productName }),
    },
    {
      subid: '3. ',
      subkey: i18next.t('Epos:policy_retraction_with_conditions_traditional', { insurerManager, productName }),
    },
    {
      subid: '4. ',
      subkey: i18next.t('Epos:pemegang_polis_berhak_traditional'),
    },
  ];
  const SKKPKP_PNG = [
    {
      id: 'A. ',
      key: i18next.t('Epos:compliance_terms'),
    },
    {
      subid: '1. ',
      subkey: `Apabila pembayaran yang SAYA lakukan terdapat indikasi mencurigakan sebagaimana yang tercantum pada peraturan perundang-undangan mengenai Pencegahan dan Pemberantasan Tindak Pidana Pencucian Uang, Pencegahan dan Pemberantasan Tindak Pidana Pendanaan Terorisme dan Pendanaan Proliferasi Senjata Pemusnah Massal beserta perubahan-perubahan dan peraturan pelaksanaannya, maka Penanggung dapat melakukan hal-hal yang diperlukan sebagaimana tercantum di dalam peraturan perundang-undangan tersebut.`
    },
    {
      subid: '2. ',
      subkey: `Sesuai dengan Peraturan OJK tentang Penerapan Program Anti Pencucian Uang, Pencegahan Pendanaan Terorisme, dan Pencegahan Pendanaan Proliferasi Senjata Pemusnah Massal di Sektor Jasa Keuangan yang berlaku beserta peraturan pelaksanaannya, SAYA menyadari, mengerti dan memahami bahwa SAYA memiliki kewajiban untuk senantiasa melakukan pengkinian data pribadi SAYA kepada Penanggung dan menyerahkan salinan dokumen pendukung yang berlaku kepada Penanggung. Berdasarkan peraturan tersebut, SAYA juga setuju bahwa Penanggung dapat menolak hubungan usaha/transaksi, membatalkan transaksi dan/atau Pertanggungan dengan SAYA apabila SAYA, (1) tidak melakukan pengkinian data tersebut; (2) diketahui dan/atau patut diduga menggunakan dokumen palsu; (3) menyampaikan informasi yang diragukan kebenarannya; (4) terdapat di dalam Daftar Terduga Teroris dan Organisasi Teroris; (5) terdapat di dalam Daftar Pendanaan Proliferasi Senjata Pemusnah Massal dan/atau; (6) memiliki sumber dana transaksi yang diketahui dan/atau patut diduga berasal dari hasil tindak pidana.`
    },
    {
      subid: '3. ',
      subkey: `Bahwa sebagai bagian dari pelaksanaan program Anti Pencucian Uang, Pencegahan Pendanaan Terorisme, dan Pencegahan Pendanaan Proliferasi Senjata Pemusnah Massal, Penanggung juga harus tunduk dan patuh kepada aturan Grup Prudential yang berlaku terkait dengan Penerapan daftar Sanksi Tertentu. Adapun yang dimaksud dengan Sanksi Tertentu, adalah “tindakan pembatasan yang diberlakukan terhadap suatu rezim/tata pemerintahan yang berkuasa, negara, pemerintah, entitas, orang perorangan dan industri tertentu oleh lembaga international, atau pemerintah di Indonesia atau pemerintah di luar Indonesia, termasuk namun tidak terbatas pada, <i>the Office of Financial Sanctions Implementation HM Treasury</i>, <i>the United Nations</i>, <i>the European Union</i>, <i>the US Treasury Department’s Office of Foreign Assets Control</i>”.`
    },
    {
      subid: '4. ',
      subkey: `Sehubungan dengan penerapan daftar Sanksi Tertentu, apabila (i) Penanggung mengetahui atau diberi tahu bahwa Pemegang Polis,Tertanggung, Pembayar Premi, Pemilik Manfaat/Pengendali Perusahaan, orang yang mewakili (nominee), penerima manfaat, orang perorangan atau entitas yang terkait dengan pengajuan SPAJ ini beserta perubahannya di kemudian hari disebutkan atau tercantum di dalam daftar Sanksi Tertentu, atau (ii) jika Penanggung atau bank atau pihak ketiga terkait lainnya ditemukan melanggar kewajiban penerapan Sanksi Tertentu tersebut sebagai akibat dari pengambilan tindakan apa pun terhadap SPAJ ini, maka Penanggung dapat mengakhiri pertanggungan dengan segera, setelah memberikan pemberitahuan selambat-lambatnya 30 (tiga puluh) hari kalender kepada Pemegang Polis, dan/atau mengambil tindakan lain yang Penanggung anggap perlu, termasuk namun tidak terbatas pada memberitahukan kepada otoritas pemerintah terkait, menunda transaksi, membekukan uang yang dibayarkan kepada Penanggung, membekukan Nilai Tunai, dan/atau mentransfer pembayaran uang atau Nilai Tunai tersebut kepada otoritas pemerintah terkait sesuai instruksi dari otoritas pemerintah tersebut. Selain itu, Penanggung dapat meminta penggantian atas segala kerugian yang mungkin dialami oleh Penanggung kepada SAYA sebagai akibat dari pelaksanaan ketentuan ini, dan hak ini akan tetap berlaku walaupun Pertanggungan ini telah berakhir.`
    },
    {
      subid: '5. ',
      subkey: `SAYA dengan ini mengakui dan menyetujui bahwa Penanggung dapat diwajibkan untuk mematuhi, mempelajari dan memenuhi persyaratan dari hukum, peraturan, perintah, petunjuk dan persyaratan-persyaratan termasuk persyaratan yang relevan berdasarkan <i>Foreign Account Tax Compliance Act</i> (FATCA) serta <i>Common Reporting Standard</i> (CRS) dan permintaan dari setiap badan yudisial, pajak, pemerintah dan/atau badan pengatur, termasuk namun tidak terbatas pada <i>Internal Revenue Service</i> (IRS) dari Amerika Serikat (selanjutnya disebut “Otoritas-otoritas” dan secara tersendiri disebut “Otoritas”) dalam berbagai yurisdiksi sebagaimana diterbitkan dan diubah dari waktu ke waktu (selanjutnya disebut “Persyaratan yang Relevan”). Dalam hal ini, SAYA setuju bahwa Penanggung dapat mengambil setiap dan seluruh langkah yang secara wajar dianggap perlu untuk memastikan kepatuhan atau ketaatan Penanggung dengan Persyaratan yang Relevan, secara khusus pengungkapan atas keadaan khusus SAYA terhadap Otoritas.`
    },
    {
      subid: '6. ',
      subkey: `SAYA setuju bahwa Penanggung dapat mengungkapkan keadaan khusus SAYA atau informasi apa pun mengenai SAYA kepada Otoritas sehubungan dengan ketaatan terhadap Persyaratan yang Relevan. Pengungkapan tersebut dapat diberlakukan secara langsung atau dikirimkan melalui salah satu dari Kantor Pusat Penanggung atau afiliasi lainnya dari Penanggung. Untuk tujuan tersebut dan tanpa mengabaikan ketentuan manapun lainnya dalam SPAJ atau Polis SAYA (apabila pengajuan SPAJ ini disetujui), Penanggung dapat meminta SAYA untuk memberikan informasi lebih lanjut sebagaimana dipersyaratkan untuk pengungkapan terhadap Otoritas manapun dan SAYA wajib memberikan informasi tersebut kepada Penanggung dalam jangka waktu tertentu sebagaimana dapat dipersyaratkan secara wajar. SAYA memahami konsekuensi jika SAYA tidak bersedia menyampaikan pernyataan persetujuan, instruksi atau pemberian kuasa secara tertulis dan sukarela. Penanggung berhak untuk menolak hubungan usaha, transaksi dan/atau mengakhiri hubungan usaha dengan SAYA, dan SAYA berhak menolak memberikan pernyataan persetujuan, instruksi atau pemberian kuasa secara tertulis dan sukarela, dengan menerima konsekuensi seperti yang disebutkan di atas.`
    },
    {
      subid: '7. ',
      subkey: `Tanpa mengabaikan ketentuan manapun lainnya dari SPAJ atau Polis SAYA (apabila pengajuan SPAJ ini disetujui), SAYA setuju untuk menyediakan bantuan yang mungkin secara wajar dibutuhkan untuk memungkinkan Penanggung mematuhi kewajiban Penanggung berdasarkan seluruh Persyaratan yang Relevan mengenai SAYA atau Polis SAYA pada Penanggung.`
    },
    {
      subid: '8. ',
      subkey: `SAYA setuju untuk memberikan informasi kepada Penanggung secara tepat waktu atas setiap perubahan apa pun dari keterangan yang sebelumnya telah disampaikan kepada Penanggung, atau selambat-lambatnya 90 (sembilan puluh) hari kalender sejak terjadinya perubahan yang dimaksud, baik pada saat pengisian permohonan asuransi ini atau di waktu manapun lainnya. Secara khusus, merupakan hal yang sangat penting bagi SAYA untuk memberikan informasi kepada Penanggung secara langsung apabila terdapat perubahan atas kewarganegaraan SAYA, status pajak atau wajib pajak atau jika SAYA menjadi wajib pajak di lebih dari satu negara. Jika salah satu dari perubahan ini terjadi atau jika informasi manapun lainnya mengindikasikan adanya perubahan dimaksud, Penanggung dapat meminta SAYA untuk memberikan dokumen-dokumen tertentu atau informasi terkait, dan SAYA setuju untuk memberikan informasi tersebut. Dokumen dan informasi tersebut adalah termasuk namun tidak terbatas pada pernyataan atau formulir pajak (dan dilegalisasi oleh notaris, apabila diperlukan) yang telah dilengkapi dan/atau ditandatangani oleh SAYA.`
    },
    {
      subid: '9. ',
      subkey: `Jika SAYA tidak menyediakan informasi dan dokumen-dokumen yang diminta tersebut kepada Penanggung dalam jangka waktu tertentu atau jika salah satu dari informasi atau dokumen-dokumen yang disediakan tersebut tidak tepat waktu, akurat atau lengkap, SAYA setuju bahwa Penanggung dapat, untuk memastikan kepatuhan dan ketaatan yang berkelanjutan terhadap Persyaratan yang Relevan, mengambil setiap dan seluruh langkah yang Penanggung anggap sesuai untuk memastikan kepatuhan atau ketaatan Penanggung terhadap Persyaratan yang Relevan, atau selainnya untuk melindungi kepentingan hukum dan/atau komersial Penanggung.`
    },
    {
      id: 'B. ',
      key: i18next.t('Epos:consumer_service_terms'),
    },
    {
      subid: '1. ',
      subkey: `SAYA telah menerima, mendapatkan penjelasan dan memahami mengenai Ringkasan Informasi Produk dan Layanan Versi Umum dan Ringkasan Informasi Produk dan Layanan Versi Personal (Ilustrasi) <b>PRU</b>Link NextGen dari Tenaga Pemasar, termasuk bahwa <b>PRU</b>Link NextGen adalah merupakan produk yang memberikan manfaat perlindungan terhadap risiko dan manfaat investasi. SAYA telah menerima, mendapatkan penjelasan dan memahami mengenai risiko yang ditanggung, premi dan biaya yang dibebankan kepada Pemegang Polis, masa leluasa (<i>grace period</i>), masa mempelajari polis (<i>free-look period</i>), penambahan dan penarikan dana, serta kewajiban Pemegang Polis, Tertanggung dan/atau Penanggung.`,
    },
    {
      subid: '2. ',
      subkey: `Bahwa Penanggung dapat menghubungi SAYA dan/atau (Calon) Tertanggung baik secara langsung maupun melalui Tenaga Pemasar atau pihak lain yang ditunjuk oleh Penanggung, untuk menyampaikan informasi mengenai SPAJ dan/atau Polis (termasuk proses klaim dan pelayanan lainnya), informasi terkait produk atau layanan Penanggung (termasuk penawaran produk dari Prudential Indonesia sepanjang SAYA dan/atau (Calon) Tertanggung menyetujuinya), termasuk namun tidak terbatas pada informasi mengenai alasan pemberian keputusan Underwriting tertentu terhadap SPAJ dan/atau Polis, atau informasi berkaitan dengan Premi. Dalam hal informasi tersebut diberikan melalui berbagai sarana komunikasi pribadi, maka SAYA menyetujui bahwa komunikasi tersebut dapat terkirim baik pada atau di luar hari/jam kerja dan SAYA bersedia untuk dihubungi oleh Penanggung, Tenaga Pemasar atau pihak lain yang ditujuk oleh Penanggung melalui sarana komunikasi pribadi.`,
    },
    {
      subid: '',
      subkey: '',
    },
    {
      id: 'C. ',
      key: i18next.t('Epos:declaration_agreement'),
    },
    {
      subid: '1. ',
      subkey: `Bahwa setelah Penanggung menyetujui SPAJ ini dan Premi telah SAYA bayarkan, SAYA dan Penanggung sepakat membuat perjanjian pertanggungan jiwa dalam bentuk Polis yang akan diterbitkan oleh Penanggung, dan oleh karenanya SAYA dan Penanggung setuju untuk memenuhi hak dan melaksanakan kewajiban masing-masing berdasarkan syarat dan ketentuan yang tercantum di dalam Ringkasan Polis, Ketentuan Umum, Ketentuan Khusus Asuransi Dasar, Ketentuan Khusus Asuransi Tambahan dan Ketentuan Lain (apabila diadakan) yang merupakan bagian yang tidak terpisahkan dari Polis yang akan diterbitkan Penanggung tersebut.`,
    },
    {
      subid: '2. ',
      subkey: `Pemegang Polis memiliki kesempatan untuk mempelajari dengan seksama Polis tersebut sesuai dengan ketentuan yang terdapat pada Polis dan keterangan yang terdapat pada Ringkasan Informasi Produk dan Layanan Versi Umum dan Ringkasan Informasi Produk dan Layanan Versi Personal (Ilustrasi) <b>PRU</b>Link NextGen.`,
    },
    {
      subid: '3. ',
      subkey: `SAYA menyetujui bahwa Premi yang telah dibayarkan akan segera dialokasikan ke dalam pilihan Dana Investasi <b>PRU</b>Link sejak Polis diterbitkan, sebagaimana yang telah SAYA pilih dan tercantum dalam ilustrasi produk. SAYA sepenuhnya telah mengerti dan memahami risiko investasi atas penempatan dana SAYA pada pilihan Dana Investasi <b>PRU</b>Link yang telah SAYA pilih tersebut.`,
    },
    {
      subid: '4. ',
      subkey: `Dalam rentang waktu sebagaimana dimaksud pada butir 2 di atas, Pemegang Polis dapat mengurungkan maksud untuk mempertanggungkan diri Tertanggung Utama berdasarkan Polis tersebut, dengan cara menginformasikan hal tersebut kepada Penanggung, dan dengan ketentuan bahwa Pemegang Polis tidak pernah mengajukan perubahan Polis dan/atau melakukan transaksi Polis dan/atau mengajukan klaim atas Manfaat Asuransi yang ditanggung dalam Polis tersebut. Dalam hal ini, Penanggung akan mengembalikan Premi yang telah dibayarkan dikurangi biaya-biaya (jika ada) ditambah dengan hasil investasi atau dikurangi dengan kerugian investasi sesuai ketentuan yang terdapat pada Polis dan keterangan yang terdapat pada Ringkasan Informasi Produk dan Layanan Versi Umum dan Ringkasan Informasi Produk dan Layanan Versi Personal (Ilustrasi) <b>PRU</b>Link NextGen.`,
    },
    {
      subid: '5. ',
      subkey: `SAYA selaku Calon Pemegang Polis berhak dan berwenang bertindak untuk dan atas nama Calon Tertanggung, Calon Pembayar Premi maupun Penerima Manfaat yang sah secara hukum untuk mengambil tindakan, keputusan dan/atau hal-hal lainnya yang berkaitan dengan pemenuhan hak dan kewajiban atas Polis SAYA, dan dengan ini SAYA menjamin bahwa Calon Tertanggung, Calon Pembayar Premi maupun Penerima Manfaat setuju dan sepakat atas tindakan, keputusan dan/atau hal-hal lainnya yang berkaitan dengan pemenuhan hak dan kewajiban atas Polis tersebut.`,
    },
  ];
  const SKKPKP_PNGS = [
    {
      id: 'A. ',
      key: i18next.t('Epos:compliance_terms'),
    },
    {
      subid: '1. ',
      subkey: `Apabila pembayaran yang SAYA lakukan terdapat indikasi mencurigakan sebagaimana yang tercantum pada peraturan perundang-undangan mengenai Pencegahan dan Pemberantasan Tindak Pidana Pencucian Uang, Pencegahan dan Pemberantasan Tindak Pidana Pendanaan Terorisme dan Pendanaan Proliferasi Senjata Pemusnah Massal beserta perubahan-perubahan dan peraturan pelaksanaannya, maka Pengelola dapat melakukan hal-hal yang diperlukan sebagaimana tercantum di dalam peraturan perundang-undangan tersebut.`
    },
    {
      subid: '2. ',
      subkey: `Sesuai dengan Peraturan OJK tentang Penerapan Program Anti Pencucian Uang, Pencegahan Pendanaan Terorisme, dan Pencegahan Pendanaan Proliferasi Senjata Pemusnah Massal di Sektor Jasa Keuangan yang berlaku beserta peraturan pelaksanaannya, SAYA menyadari, mengerti dan memahami bahwa SAYA memiliki kewajiban untuk senantiasa melakukan pengkinian data pribadi SAYA kepada Pengelola dan menyerahkan salinan dokumen pendukung yang berlaku kepada Pengelola. Berdasarkan peraturan tersebut, SAYA juga setuju bahwa Pengelola dapat menolak hubungan usaha/transaksi, membatalkan transaksi dan/atau Kepesertaan dengan SAYA apabila SAYA, (1) tidak melakukan pengkinian data tersebut; (2) diketahui dan/atau patut diduga menggunakan dokumen palsu; (3) menyampaikan informasi yang diragukan kebenarannya; (4) terdapat di dalam Daftar Terduga Teroris dan Organisasi Teroris; (5) terdapat di dalam Daftar Pendanaan Proliferasi Senjata Pemusnah Massal dan/atau; (6) memiliki sumber dana transaksi yang diketahui dan/atau patut diduga berasal dari hasil tindak pidana.`
    },
    {
      subid: '3. ',
      subkey: `Bahwa sebagai bagian dari pelaksanaan program Anti Pencucian Uang, Pencegahan Pendanaan Terorisme, dan Pencegahan Pendanaan Proliferasi Senjata Pemusnah Massal, Pengelola juga harus tunduk dan patuh kepada aturan Grup Prudential yang berlaku terkait dengan Penerapan daftar Sanksi Tertentu. Adapun yang dimaksud dengan Sanksi Tertentu, adalah “tindakan pembatasan yang diberlakukan terhadap suatu rezim/tata pemerintahan yang berkuasa, negara, pemerintah, entitas, orang perorangan dan industri tertentu oleh lembaga international, atau pemerintah di Indonesia atau pemerintah di luar Indonesia, termasuk namun tidak terbatas pada, <i>the Office of Financial Sanctions Implementation HM Treasury</i>, <i>the United Nations</i>, <i>the European Union</i>, <i>the US Treasury Department’s Office of Foreign Assets Control</i>”.`
    },
    {
      subid: '4. ',
      subkey: `Sehubungan dengan penerapan daftar Sanksi Tertentu, apabila (i) Pengelola mengetahui atau diberi tahu bahwa Pemegang Polis, Peserta Yang Diasuransikan, Pembayar Kontribusi, Pemilik Manfaat/Pengendali Perusahaan, orang yang mewakili (<i>nominee</i>), penerima manfaat, orang perorangan atau entitas yang terkait dengan pengajuan SPAJ Syariah ini beserta perubahannya di kemudian hari disebutkan atau tercantum di dalam daftar Sanksi Tertentu, atau (ii) jika Pengelola atau bank atau pihak ketiga terkait lainnya ditemukan melanggar kewajiban penerapan Sanksi Tertentu tersebut sebagai akibat dari pengambilan tindakan apa pun terhadap SPAJ Syariah ini, maka Pengelola dapat mengakhiri kepesertaan dengan segera, setelah memberikan pemberitahuan selambat-lambatnya 30 (tiga puluh) hari kalender kepada Pemegang Polis, dan/atau mengambil tindakan lain yang Pengelola anggap perlu, termasuk namun tidak terbatas pada memberitahukan kepada otoritas pemerintah terkait, menunda transaksi, membekukan uang yang dibayarkan kepada Pengelola, membekukan Nilai Tunai, dan/atau mentransfer pembayaran uang atau Nilai Tunai tersebut kepada otoritas pemerintah terkait sesuai instruksi dari otoritas pemerintah tersebut. Selain itu, Pengelola dapat meminta penggantian atas segala kerugian yang mungkin dialami oleh Pengelola kepada SAYA sebagai akibat dari pelaksanaan ketentuan ini, dan hak ini akan tetap berlaku walaupun Kepesertaan ini telah berakhir.`
    },
    {
      subid: '5. ',
      subkey: `SAYA dengan ini mengakui dan menyetujui bahwa Pengelola dapat diwajibkan untuk mematuhi, mempelajari dan memenuhi persyaratan dari hukum, peraturan, perintah, petunjuk dan persyaratan-persyaratan termasuk persyaratan yang relevan berdasarkan <i>Foreign Account Tax Compliance Act</i> (FATCA) serta <i>Common Reporting Standard</i> (CRS) dan permintaan dari setiap badan yudisial, pajak, pemerintah dan/atau badan pengatur, termasuk namun tidak terbatas pada <i>Internal Revenue Service</i> (IRS) dari Amerika Serikat (selanjutnya disebut “Otoritas-otoritas” dan secara tersendiri disebut “Otoritas”) dalam berbagai yurisdiksi sebagaimana diterbitkan dan diubah dari waktu ke waktu (selanjutnya disebut “Persyaratan yang Relevan”). Dalam hal ini, SAYA setuju bahwa Pengelola dapat mengambil setiap dan seluruh langkah yang secara wajar dianggap perlu untuk memastikan kepatuhan atau ketaatan Pengelola dengan Persyaratan yang Relevan, secara khusus pengungkapan atas keadaan khusus SAYA terhadap Otoritas.`
    },
    {
      subid: '6. ',
      subkey: `SAYA setuju bahwa Pengelola dapat mengungkapkan keadaan khusus SAYA atau informasi apa pun mengenai SAYA kepada Otoritas sehubungan dengan ketaatan terhadap Persyaratan yang Relevan. Pengungkapan tersebut dapat diberlakukan secara langsung atau dikirimkan melalui salah satu dari Kantor Pusat Pengelola atau afiliasi lainnya dari Pengelola. Untuk tujuan tersebut dan tanpa mengabaikan ketentuan manapun lainnya dalam SPAJ Syariah atau Polis SAYA (apabila pengajuan SPAJ Syariah ini disetujui), Pengelola dapat meminta SAYA untuk memberikan informasi lebih lanjut sebagaimana dipersyaratkan untuk pengungkapan terhadap Otoritas manapun dan SAYA wajib memberikan informasi tersebut kepada Pengelola dalam jangka waktu tertentu sebagaimana dapat dipersyaratkan secara wajar. SAYA memahami konsekuensi jika SAYA tidak bersedia menyampaikan pernyataan persetujuan, instruksi atau pemberian kuasa secara tertulis dan sukarela. Pengelola berhak untuk menolak hubungan usaha, transaksi dan/atau mengakhiri hubungan usaha dengan SAYA, dan SAYA berhak menolak memberikan pernyataan persetujuan, instruksi atau pemberian kuasa secara tertulis dan sukarela, dengan menerima konsekuensi seperti yang disebutkan di atas.`
    },
    {
      subid: '7. ',
      subkey: `Tanpa mengabaikan ketentuan manapun lainnya dari SPAJ Syariah atau Polis SAYA (apabila pengajuan SPAJ Syariah ini disetujui), SAYA setuju untuk menyediakan bantuan yang mungkin secara wajar dibutuhkan untuk memungkinkan Pengelola mematuhi kewajiban Pengelola berdasarkan seluruh Persyaratan yang Relevan mengenai SAYA atau Polis SAYA pada Pengelola.`
    },
    {
      subid: '8. ',
      subkey: `SAYA setuju untuk memberikan informasi kepada Pengelola secara tepat waktu atas setiap perubahan apa pun dari keterangan yangsebelumnya telah disampaikan kepada Pengelola, atau selambat-lambatnya 90 (sembilan puluh) hari kalender sejak terjadinya perubahan yang dimaksud, baik pada saat pengisian permohonan asuransi ini atau di waktu manapun lainnya. Secara khusus, merupakan hal yang sangat penting bagi SAYA untuk memberikan informasi kepada Pengelola secara langsung apabila terdapat perubahan atas kewarganegaraan SAYA, status pajak atau wajib pajak atau jika SAYA menjadi wajib pajak di lebih dari satu negara. Jika salah satu dari perubahan ini terjadi atau jika informasi manapun lainnya mengindikasikan adanya perubahan dimaksud, Pengelola dapat meminta SAYA untuk memberikan dokumen-dokumen tertentu atau informasi terkait, dan SAYA setuju untuk memberikan informasi tersebut. Dokumen dan informasi tersebut adalah termasuk namun tidak terbatas pada pernyataan atau formulir pajak (dan dilegalisasi oleh notaris, apabila diperlukan) yang telah dilengkapi dan/atau ditandatangani oleh SAYA.`
    },
    {
      subid: '9. ',
      subkey: `Jika SAYA tidak menyediakan informasi dan dokumen-dokumen yang diminta tersebut kepada Pengelola dalam jangka waktu tertentu atau jika salah satu dari informasi atau dokumen-dokumen yang disediakan tersebut tidak tepat waktu, akurat atau lengkap, SAYA setuju bahwa Pengelola dapat, untuk memastikan kepatuhan dan ketaatan yang berkelanjutan terhadap Persyaratan yang Relevan, mengambil setiap dan seluruh langkah yang Pengelola anggap sesuai untuk memastikan kepatuhan atau ketaatan Pengelola terhadap Persyaratan yang Relevan, atau selainnya untuk melindungi kepentingan hukum dan/atau komersial Pengelola.`
    },
    {
      id: 'B. ',
      key: i18next.t('Epos:consumer_service_terms'),
    },
    {
      subid: '1. ',
      subkey: `SAYA telah menerima, mendapatkan penjelasan dan memahami mengenai Ringkasan Informasi Produk dan Layanan Versi Umum dan Ringkasan Informasi Produk dan Layanan Versi Personal (Ilustrasi) <b>PRU</b>Link NextGen Syariah dari Tenaga Pemasar, termasuk bahwa <b>PRU</b>Link NextGen Syariah adalah merupakan produk yang memberikan manfaat perlindungan terhadap risiko dan manfaat investasi.SAYA telah menerima, mendapatkan penjelasan dan memahami mengenai risiko yang diasuransikan, kontribusi dan biaya yang dibebankan kepada Pemegang Polis, masa leluasa (<i>grace period</i>), masa mempelajari polis (<i>free-look period</i>), penambahan dan penarikan dana, serta kewajiban Pemegang Polis, Peserta Yang Diasuransikan dan/atau Pengelola.`,
    },
    {
      subid: '2. ',
      subkey: `Bahwa Pengelola dapat menghubungi SAYA dan/atau (Calon) Peserta Yang Diasuransikan, baik secara langsung maupun melalui Tenaga Pemasar atau pihak lain yang ditunjuk oleh Pengelola, untuk menyampaikan informasi mengenai SPAJ Syariah dan/atau Polis (termasuk proses klaim dan pelayanan lainnya), informasi terkait produk atau layanan Pengelola (termasuk penawaran produk dari Prudential Syariah sepanjang SAYA dan/atau (Calon) Peserta Yang Diasuransikan menyetujuinya), termasuk namun tidak terbatas pada informasi mengenai alasan pemberian keputusan <i>Underwriting</i> tertentu terhadap SPAJ Syariah dan/atau Polis, atau informasi berkaitan dengan Kontribusi. Dalam hal informasi tersebut diberikan melalui berbagai sarana komunikasi pribadi, maka SAYA menyetujui bahwa komunikasi tersebut dapat terkirim baik pada atau di luar hari/jam kerja dan SAYA bersedia untuk dihubungi oleh Pengelola, Tenaga Pemasar atau pihak lain yang ditunjuk oleh Pengelola melalui sarana komunikasi pribadi.`,
    },
    {
      subid: '',
      subkey: '',
    },
    {
      id: 'C. ',
      key: i18next.t('Epos:declaration_agreement'),
    },
    {
      subid: '1. ',
      subkey: `Bahwa setelah Pengelola menyetujui SPAJ Syariah ini dan Kontribusi telah SAYA bayarkan, SAYA dan Pengelola sepakat membuat perjanjian asuransi jiwa syariah dalam bentuk Polis yang akan diterbitkan oleh Pengelola, dan oleh karenanya SAYA dan Pengelola setuju untuk memenuhi hak dan melaksanakan kewajiban masing-masing berdasarkan syarat dan ketentuan yang tercantum di dalam Ringkasan Polis, Ketentuan Umum, Ketentuan Khusus Asuransi Dasar, Ketentuan Khusus Asuransi Tambahan dan Ketentuan Lain (apabila diadakan) yang merupakan bagian yang tidak terpisahkan dari Polis yang akan diterbitkan Pengelola tersebut.`,
    },
    {
      subid: '2. ',
      subkey: `Pemegang Polis memiliki kesempatan untuk mempelajari dengan seksama Polis tersebut sesuai dengan ketentuan yang terdapat pada Polis dan keterangan yang terdapat pada Ringkasan Informasi Produk dan Layanan Versi Umum dan Ringkasan Informasi Produk dan Layanan Versi Personal (Ilustrasi) <b>PRU</b>Link NextGen Syariah.`,
    },
    {
      subid: '3. ',
      subkey: `SAYA menyetujui bahwa Kontribusi yang telah dibayarkan akan segera dialokasikan ke dalam pilihan Dana Investasi <b>PRU</b>Link Syariah sejak Polis diterbitkan, sebagaimana yang telah SAYA pilih dan tercantum dalam ilustrasi produk. SAYA sepenuhnya telah mengerti dan memahami risiko investasi atas penempatan dana SAYA pada pilihan Dana Investasi <b>PRU</b>Link Syariah yang telah SAYA pilih tersebut.`,
    },
    {
      subid: '4. ',
      subkey: `Dalam rentang waktu sebagaimana dimaksud pada butir 2 di atas, Pemegang Polis dapat mengurungkan maksud untuk melindungi Peserta Utama Yang Diasuransikan berdasarkan Polis tersebut, dengan cara menginformasikan hal tersebut kepada Pengelola, dan dengan ketentuan bahwa Pemegang Polis tidak pernah mengajukan perubahan Polis dan/atau melakukan transaksi Polis dan/atau mengajukan klaim atas Manfaat Asuransi yang diasuransikan dalam Polis tersebut. Dalam hal ini,Pengelola akan mengembalikan Kontribusi yang telah dibayarkan dikurangi biaya-biaya (jika ada) ditambah dengan hasil investasi atau dikurangi dengan kerugian investasi sesuai ketentuan yang terdapat pada Polis dan keterangan yang terdapat pada Ringkasan Informasi Produk dan Layanan Versi Umum dan Ringkasan Informasi Produk dan Layanan Versi Personal (Ilustrasi) <b>PRU</b>Link NextGenSyariah.`,
    },
    {
      subid: '5. ',
      subkey: `SAYA selaku Calon Pemegang Polis berhak dan berwenang bertindak untuk dan atas nama Calon Peserta Yang Diasuransikan, Calon Pembayar Kontribusi maupun Penerima Manfaat yang sah secara hukum untuk mengambil tindakan, keputusan dan/atau hal-hal lainnya yang berkaitan dengan pemenuhan hak dan kewajiban atas Polis SAYA, dan dengan ini SAYA menjamin bahwa Calon Peserta Yang Diasuransikan, Calon Pembayar Kontribusi maupun Penerima Manfaat setuju dan sepakat atas tindakan, keputusan dan/atau hal-hal lainnya yang berkaitan dengan pemenuhan hak dan kewajiban atas Polis tersebut.`,
    },
  ]
  const SKKPKP_PSKKS = [
    {
      id: 'A. ',
      key: i18next.t('Epos:compliance_terms'),
    },
    {
      subid: '1. ',
      subkey: `Apabila pembayaran yang SAYA lakukan terdapat indikasi mencurigakan sebagaimana yang tercantum pada peraturan perundang-undangan mengenai Pencegahan dan Pemberantasan Tindak Pidana Pencucian Uang, Pencegahan dan Pemberantasan Tindak Pidana Pendanaan Terorisme dan Pendanaan Proliferasi Senjata Pemusnah Massal beserta perubahanperubahan dan peraturan pelaksanaannya, maka Pengelola dapat melakukan hal-hal yang diperlukan sebagaimana tercantum di dalam peraturan perundang-undangan tersebut.`
    },
    {
      subid: '2. ',
      subkey: `Sesuai dengan Peraturan OJK tentang Penerapan Program Anti Pencucian Uang, Pencegahan Pendanaan Terorisme, dan Pencegahan Pendanaan Proliferasi Senjata Pemusnah Massal di Sektor Jasa Keuangan yang berlaku beserta peraturan pelaksanaannya, SAYA menyadari, mengerti dan memahami bahwa SAYA memiliki kewajiban untuk senantiasa melakukan pengkinian data pribadi SAYA kepada Pengelola dan menyerahkan salinan dokumen pendukung yang berlaku kepada Pengelola. Berdasarkan peraturan tersebut, SAYA juga setuju bahwa Pengelola dapat menolak hubungan usaha/transaksi, membatalkan transaksi dan/atau Kepesertaan dengan SAYA apabila SAYA, (1) tidak melakukan pengkinian data tersebut; (2) diketahui dan/atau patut diduga menggunakan dokumen palsu; (3) menyampaikan informasi yang diragukan kebenarannya; (4) terdapat di dalam Daftar Terduga Teroris dan Organisasi Teroris; (5) terdapat di dalam Daftar Pendanaan Proliferasi Senjata Pemusnah Massal dan/atau; (6) memiliki sumber dana transaksi yang diketahui dan/atau patut diduga berasal dari hasil tindak pidana.`
    },
    {
      subid: '3. ',
      subkey: `Bahwa sebagai bagian dari pelaksanaan program Anti Pencucian Uang, Pencegahan Pendanaan Terorisme, dan Pencegahan Pendanaan Proliferasi Senjata Pemusnah Massal, Pengelola juga harus tunduk dan patuh kepada aturan Grup Prudential yang berlaku terkait dengan Penerapan daftar Sanksi Tertentu. Adapun yang dimaksud dengan Sanksi Tertentu, adalah “tindakan pembatasan yang diberlakukan terhadap suatu rezim/tata pemerintahan yang berkuasa, negara, pemerintah, entitas, orang perorangan dan industri tertentu oleh lembaga international, atau pemerintah di Indonesia atau pemerintah di luar Indonesia, termasuk namun tidak terbatas pada, <i>the Office of Financial Sanctions Implementation HM Treasury, the United Nations, the European Union, the US Treasury Department’s Office of Foreign Assets Control”</i>.`
    },
    {
      subid: '4. ',
      subkey: `Sehubungan dengan penerapan daftar Sanksi Tertentu, apabila (i) Pengelola mengetahui atau diberi tahu bahwa Pemegang Polis, Peserta Yang Diasuransikan, Pembayar Kontribusi, Pemilik Manfaat/Pengendali Perusahaan, orang yang mewakili (nominee), penerima manfaat, orang perorangan atau entitas yang terkait dengan pengajuan SPAJ Syariah ini beserta perubahannya di kemudian hari disebutkan atau tercantum di dalam daftar Sanksi Tertentu, atau (ii) jika Pengelola atau bank atau pihak ketiga terkait lainnya ditemukan melanggar kewajiban penerapan Sanksi Tertentu tersebut sebagai akibat dari pengambilan tindakan apa pun terhadap SPAJ Syariah ini, maka Pengelola dapat mengakhiri kepesertaan dengan segera, setelah memberikan pemberitahuan selambat-lambatnya 30 (tiga puluh) hari kalender kepada Pemegang Polis, dan/atau mengambil tindakan lain yang Pengelola anggap perlu, termasuk namun tidak terbatas pada memberitahukan kepada otoritas pemerintah terkait, menunda transaksi, membekukan uang yang dibayarkan kepada Pengelola, membekukan Nilai Tunai, dan/atau mentransfer pembayaran uang atau Nilai Tunai tersebut kepada otoritas pemerintah terkait sesuai instruksi dari otoritas pemerintah tersebut. Selain itu, Pengelola dapat meminta penggantian atas segala kerugian yang mungkin dialami oleh Pengelola kepada SAYA sebagai akibat dari pelaksanaan ketentuan ini, dan hak ini akan tetap berlaku walaupun Kepesertaan ini telah berakhir.`
    },
    {
      subid: '5. ',
      subkey: `SAYA dengan ini mengakui dan menyetujui bahwa Pengelola dapat diwajibkan untuk mematuhi, mempelajari dan memenuhi persyaratan dari hukum, peraturan, perintah, petunjuk dan permintaan dari setiap badan yudisial, pajak, pemerintah dan/atau badan pengatur (selanjutnya disebut “Otoritas-otoritas” dan secara tersendiri disebut “Otoritas”) dalam berbagai yurisdiksi sebagaimana diterbitkan dan diubah dari waktu ke waktu (selanjutnya disebut “Persyaratan yang Relevan”). Dalam hal ini, SAYA setuju bahwa Pengelola dapat mengambil setiap dan seluruh langkah yang secara wajar dianggap perlu untuk memastikan kepatuhan atau ketaatan Pengelola dengan Persyaratan yang Relevan, secara khusus pengungkapan atas keadaan khusus SAYA terhadap Otoritas.`
    },
    {
      subid: '6. ',
      subkey: `SAYA setuju bahwa Pengelola dapat mengungkapkan keadaan khusus SAYA atau informasi apa pun mengenai SAYA kepada Otoritas sehubungan dengan ketaatan terhadap Persyaratan yang Relevan. Pengungkapan tersebut dapat diberlakukan secara langsung atau dikirimkan melalui salah satu dari Kantor Pusat Pengelola atau afiliasi lainnya dari Pengelola. Untuk tujuan tersebut dan tanpa mengabaikan ketentuan manapun lainnya dalam SPAJ Syariah atau Polis SAYA (apabila pengajuan SPAJ Syariah ini disetujui), Pengelola dapat meminta SAYA untuk memberikan informasi lebih lanjut sebagaimana dipersyaratkan untuk pengungkapan terhadap Otoritas manapun dan SAYA wajib memberikan informasi tersebut kepada Pengelola dalam jangka waktu tertentu sebagaimana dapat dipersyaratkan secara wajar. SAYA memahami konsekuensi jika SAYA tidak bersedia menyampaikan pernyataan persetujuan, instruksi atau pemberian kuasa secara tertulis dan sukarela. Pengelola berhak untuk menolak hubungan bisnis, transaksi dan/atau mengakhiri hubungan bisnis dengan SAYA, dan SAYA berhak menolak memberikan pernyataan persetujuan, instruksi atau pemberian kuasa secara tertulis dan sukarela, dengan menerima konsekuensi seperti yang disebutkan di atas.`
    },
    {
      subid: '7. ',
      subkey: `Tanpa mengabaikan ketentuan manapun lainnya dari SPAJ Syariah atau Polis SAYA (apabila pengajuan SPAJ Syariah ini disetujui), SAYA setuju untuk menyediakan bantuan yang mungkin secara wajar dibutuhkan untuk memungkinkan Pengelola mematuhi kewajiban Pengelola berdasarkan seluruh Persyaratan yang Relevan mengenai SAYA atau Polis SAYA pada Pengelola.`
    },
    {
      subid: '8. ',
      subkey: `SAYA setuju untuk memberikan informasi kepada Pengelola secara tepat waktu atas setiap perubahan apa pun dari keterangan yang sebelumnya telah disampaikan kepada Pengelola, atau selambat-lambatnya 90 (sembilan puluh) hari kalender sejak terjadinya perubahan yang dimaksud, baik pada saat pengisian permohonan asuransi ini atau di waktu manapun lainnya. Secara khusus, merupakan hal yang sangat penting bagi SAYA untuk memberikan informasi kepada Pengelola secara langsung apabila terdapat perubahan atas kewarganegaraan SAYA, status pajak atau wajib pajak atau jika SAYA menjadi wajib pajak di lebih dari satu negara. Jika salah satu dari perubahan ini terjadi atau jika informasi manapun lainnya mengindikasikan adanya perubahan dimaksud, Pengelola dapat meminta SAYA untuk memberikan dokumen-dokumen tertentu atau informasi terkait, dan SAYA setuju untuk memberikan informasi tersebut. Dokumen dan informasi tersebut adalah termasuk namun tidak terbatas pada pernyataan atau formulir pajak (dan dilegalisasi oleh notaris, apabila diperlukan) yang telah dilengkapi dan/atau ditandatangani oleh SAYA.`
    },
    {
      subid: '9. ',
      subkey: `Jika SAYA tidak menyediakan informasi dan dokumen-dokumen yang diminta tersebut kepada Pengelola dalam jangka waktu tertentu atau jika salah satu dari informasi atau dokumen-dokumen yang disediakan tersebut tidak tepat waktu, akurat atau lengkap, SAYA setuju bahwa Pengelola dapat, untuk memastikan kepatuhan dan ketaatan yang berkelanjutan terhadap Persyaratan yang Relevan, mengambil setiap dan seluruh langkah yang Pengelola anggap sesuai untuk memastikan kepatuhan atau ketaatan Pengelola terhadap Persyaratan yang Relevan, atau selainnya untuk melindungi kepentingan hukum dan/atau komersial Pengelola.`
    },
    {
      id: 'B. ',
      key: i18next.t('Epos:consumer_service_terms'),
    },
    {
      subid: '1. ',
      subkey: `SAYA telah menerima, mendapatkan penjelasan dan memahami mengenai Ringkasan Informasi Produk dan Layanan Versi Umum dan Ringkasan Informasi Produk dan Layanan Versi Personal (Ilustrasi) PRUSolusi Kondisi Kritis Syariah dari Tenaga Pemasar, termasuk bahwa PRUSolusi Kondisi Kritis Syariah adalah merupakan produk yang memberikan manfaat perlindungan terhadap risiko. SAYA telah memperoleh penjelasan dan memahami manfaat, risiko, persyaratan dan tata cara, dan biaya dari PRUSolusi Kondisi Kritis Syariah yang ditawarkan kepada Pemegang Polis, masa leluasa (grace period), masa mempelajari polis (free-look period), serta kewajiban Pemegang Polis, Peserta Yang Diasuransikan dan/atau Pengelola.`,
    },
    {
      subid: '2. ',
      subkey: `Bahwa Pengelola dapat menghubungi SAYA dan/atau (Calon) Peserta Yang Diasuransikan, baik secara langsung maupun melalui Tenaga Pemasar atau pihak lain yang ditunjuk oleh Pengelola, untuk menyampaikan informasi mengenai SPAJ Syariah dan/atau Polis (termasuk proses klaim dan pelayanan lainnya), informasi terkait produk atau layanan Pengelola (termasuk penawaran produk dari Prudential Syariah sepanjang SAYA dan/atau (Calon) Peserta Yang Diasuransikan menyetujuinya), termasuk namun tidak terbatas pada informasi mengenai alasan pemberian keputusan Underwriting tertentu terhadap SPAJ Syariah dan/atau Polis, atau informasi berkaitan dengan Kontribusi. Dalam hal informasi tersebut diberikan melalui berbagai sarana komunikasi pribadi, maka SAYA menyetujui bahwa komunikasi tersebut dapat terkirim baik pada atau di luar hari/jam kerja dan SAYA bersedia untuk dihubungi oleh Pengelola, Tenaga Pemasar atau pihak lain yang ditunjuk oleh Pengelola melalui sarana komunikasi pribadi.`,
    },
    {
      subid: '',
      subkey: '',
    },
  ];
  const SKKPKP_PRUCERAH = [
    {
      id: 'A. ',
      key: i18next.t('Epos:compliance_terms'),
    },
    {
      subid: '1. ',
      subkey: `Apabila pembayaran yang SAYA lakukan terdapat indikasi mencurigakan sebagaimana yang tercantum pada peraturan perundang-undangan mengenai Pencegahan dan Pemberantasan Tindak Pidana Pencucian Uang, Pencegahan dan Pemberantasan Tindak Pidana Pendanaan Terorisme dan Pendanaan Proliferasi Senjata Pemusnah Massal beserta perubahanperubahan dan peraturan pelaksanaannya, maka Pengelola dapat melakukan hal-hal yang diperlukan sebagaimana tercantum di dalam peraturan perundang-undangan tersebut.`
    },
    {
      subid: '2. ',
      subkey: `Sesuai dengan Peraturan OJK tentang Penerapan Program Anti Pencucian Uang, Pencegahan Pendanaan Terorisme, dan Pencegahan Pendanaan Proliferasi Senjata Pemusnah Massal di Sektor Jasa Keuangan yang berlaku beserta peraturan pelaksanaannya, SAYA menyadari, mengerti dan memahami bahwa SAYA memiliki kewajiban untuk senantiasa melakukan pengkinian data pribadi SAYA kepada Pengelola dan menyerahkan salinan dokumen pendukung yang berlaku kepada Pengelola. Berdasarkan peraturan tersebut, SAYA juga setuju bahwa Pengelola dapat menolak hubungan usaha/transaksi, membatalkan transaksi dan/atau Kepesertaan dengan SAYA apabila SAYA, (1) tidak melakukan pengkinian data tersebut; (2) diketahui dan/atau patut diduga menggunakan dokumen palsu; (3) menyampaikan informasi yang diragukan kebenarannya; (4) terdapat di dalam Daftar Terduga Teroris dan Organisasi Teroris; (5) terdapat di dalam Daftar Pendanaan Proliferasi Senjata Pemusnah Massal dan/atau; (6) memiliki sumber dana transaksi yang diketahui dan/atau patut diduga berasal dari hasil tindak pidana.`
    },
    {
      subid: '3. ',
      subkey: `Bahwa sebagai bagian dari pelaksanaan program Anti Pencucian Uang, Pencegahan Pendanaan Terorisme, dan Pencegahan Pendanaan Proliferasi Senjata Pemusnah Massal, Pengelola juga harus tunduk dan patuh kepada aturan Grup Prudential yang berlaku terkait dengan Penerapan daftar Sanksi Tertentu. Adapun yang dimaksud dengan Sanksi Tertentu, adalah “tindakan pembatasan yang diberlakukan terhadap suatu rezim/tata pemerintahan yang berkuasa, negara, pemerintah, entitas, orang perorangan dan industri tertentu oleh lembaga international, atau pemerintah di Indonesia atau pemerintah di luar Indonesia, termasuk namun tidak terbatas pada, <i>the Office of Financial Sanctions Implementation HM Treasury, the United Nations, the European Union, the US Treasury Department’s Office of Foreign Assets Control”</i>.`
    },
    {
      subid: '4. ',
      subkey: `Sehubungan dengan penerapan daftar Sanksi Tertentu, apabila (i) Pengelola mengetahui atau diberi tahu bahwa Pemegang Polis, Peserta Yang Diasuransikan, Pembayar Kontribusi, Pemilik Manfaat/Pengendali Perusahaan, orang yang mewakili (nominee), penerima manfaat, orang perorangan atau entitas yang terkait dengan pengajuan SPAJ Syariah ini beserta perubahannya di kemudian hari disebutkan atau tercantum di dalam daftar Sanksi Tertentu, atau (ii) jika Pengelola atau bank atau pihak ketiga terkait lainnya ditemukan melanggar kewajiban penerapan Sanksi Tertentu tersebut sebagai akibat dari pengambilan tindakan apa pun terhadap SPAJ Syariah ini, maka Pengelola dapat mengakhiri kepesertaan dengan segera, setelah memberikan pemberitahuan selambat-lambatnya 30 (tiga puluh) hari kalender kepada Pemegang Polis, dan/atau mengambil tindakan lain yang Pengelola anggap perlu, termasuk namun tidak terbatas pada memberitahukan kepada otoritas pemerintah terkait, menunda transaksi, membekukan uang yang dibayarkan kepada Pengelola, membekukan Nilai Tunai, dan/atau mentransfer pembayaran uang atau Nilai Tunai tersebut kepada otoritas pemerintah terkait sesuai instruksi dari otoritas pemerintah tersebut. Selain itu, Pengelola dapat meminta penggantian atas segala kerugian yang mungkin dialami oleh Pengelola kepada SAYA sebagai akibat dari pelaksanaan ketentuan ini, dan hak ini akan tetap berlaku walaupun Kepesertaan ini telah berakhir.`
    },
    {
      subid: '5. ',
      subkey: `SAYA dengan ini mengakui dan menyetujui bahwa Pengelola dapat diwajibkan untuk mematuhi, mempelajari dan memenuhi persyaratan dari hukum, peraturan, perintah, petunjuk dan persyaratan-persyaratan termasuk persyaratan yang relevan berdasarkan <i>Foreign Account Tax Compliance Act (FATCA)</i> serta <i>Common Reporting Standard (CRS)</i> dan permintaan dari setiap badan yudisial, pajak, pemerintah dan/atau badan pengatur, termasuk namun tidak terbatas pada <i>Internal Revenue Service (IRS)</i> dari Amerika Serikat (selanjutnya disebut “Otoritas-otoritas” dan secara tersendiri disebut “Otoritas”) dalam berbagai yurisdiksi sebagaimana diterbitkan dan diubah dari waktu ke waktu (selanjutnya disebut “Persyaratan yang Relevan”). Dalam hal ini, SAYA setuju bahwa Pengelola dapat mengambil setiap dan seluruh langkah yang secara wajar dianggap perlu untuk memastikan kepatuhan atau ketaatan Pengelola dengan Persyaratan yang Relevan, secara khusus pengungkapan atas keadaan khusus SAYA terhadap Otoritas.`
    },
    {
      subid: '6. ',
      subkey: `SAYA setuju bahwa Pengelola dapat mengungkapkan keadaan khusus SAYA atau informasi apa pun mengenai SAYA kepada Otoritas sehubungan dengan ketaatan terhadap Persyaratan yang Relevan. Pengungkapan tersebut dapat diberlakukan secara langsung atau dikirimkan melalui salah satu dari Kantor Pusat Pengelola atau afiliasi lainnya dari Pengelola. Untuk tujuan tersebut dan tanpa mengabaikan ketentuan manapun lainnya dalam SPAJ Syariah atau Polis SAYA (apabila pengajuan SPAJ Syariah ini disetujui), Pengelola dapat meminta SAYA untuk memberikan informasi lebih lanjut sebagaimana dipersyaratkan untuk pengungkapan terhadap Otoritas manapun dan SAYA wajib memberikan informasi tersebut kepada Pengelola dalam jangka waktu tertentu sebagaimana dapat dipersyaratkan secara wajar. SAYA memahami konsekuensi jika SAYA tidak bersedia menyampaikan pernyataan persetujuan, instruksi atau pemberian kuasa secara tertulis dan sukarela. Pengelola berhak untuk menolak hubungan usaha, transaksi dan/atau mengakhiri hubungan usaha dengan SAYA, dan SAYA berhak menolak memberikan pernyataan persetujuan, instruksi atau pemberian kuasa secara tertulis dan sukarela, dengan menerima konsekuensi seperti yang disebutkan di atas.`
    },
    {
      subid: '7. ',
      subkey: `Tanpa mengabaikan ketentuan manapun lainnya dari SPAJ Syariah atau Polis SAYA (apabila pengajuan SPAJ Syariah ini disetujui), SAYA setuju untuk menyediakan bantuan yang mungkin secara wajar dibutuhkan untuk memungkinkan Pengelola mematuhi kewajiban Pengelola berdasarkan seluruh Persyaratan yang Relevan mengenai SAYA atau Polis SAYA pada Pengelola.`
    },
    {
      subid: '8. ',
      subkey: `SAYA setuju untuk memberikan informasi kepada Pengelola secara tepat waktu atas setiap perubahan apa pun dari keterangan yang sebelumnya telah disampaikan kepada Pengelola, atau selambat-lambatnya 90 (sembilan puluh) hari kalender sejak terjadinya perubahan yang dimaksud, baik pada saat pengisian permohonan asuransi ini atau di waktu manapun lainnya. Secara khusus, merupakan hal yang sangat penting bagi SAYA untuk memberikan informasi kepada Pengelola secara langsung apabila terdapat perubahan atas kewarganegaraan SAYA, status pajak atau wajib pajak atau jika SAYA menjadi wajib pajak di lebih dari satu negara. Jika salah satu dari perubahan ini terjadi atau jika informasi manapun lainnya mengindikasikan adanya perubahan dimaksud, Pengelola dapat meminta SAYA untuk memberikan dokumen-dokumen tertentu atau informasi terkait, dan SAYA setuju untuk memberikan informasi tersebut. Dokumen dan informasi tersebut adalah termasuk namun tidak terbatas pada pernyataan atau formulir pajak (dan dilegalisasi oleh notaris, apabila diperlukan) yang telah dilengkapi dan/atau ditandatangani oleh SAYA.`
    },
    {
      subid: '9. ',
      subkey: `Jika SAYA tidak menyediakan informasi dan dokumen-dokumen yang diminta tersebut kepada Pengelola dalam jangka waktu tertentu atau jika salah satu dari informasi atau dokumen-dokumen yang disediakan tersebut tidak tepat waktu, akurat atau lengkap, SAYA setuju bahwa Pengelola dapat, untuk memastikan kepatuhan dan ketaatan yang berkelanjutan terhadap Persyaratan yang Relevan, mengambil setiap dan seluruh langkah yang Pengelola anggap sesuai untuk memastikan kepatuhan atau ketaatan Pengelola terhadap Persyaratan yang Relevan, atau selainnya untuk melindungi kepentingan hukum dan/atau komersial Pengelola.".`
    },
    {
      id: 'B. ',
      key: i18next.t('Epos:consumer_service_terms'),
    },
    {
      subid: '1. ',
      subkey: `SAYA telah menerima, mendapatkan penjelasan dan memahami mengenai Ringkasan Informasi Produk dan Layanan Versi Umum dan Ringkasan Informasi Produk dan Layanan Versi Personal (Ilustrasi) PRUSolusi Kondisi Kritis Syariah dari Tenaga Pemasar, termasuk bahwa PRUSolusi Kondisi Kritis Syariah adalah merupakan produk yang memberikan manfaat perlindungan terhadap risiko. SAYA telah memperoleh penjelasan dan memahami manfaat, risiko, persyaratan dan tata cara, dan biaya dari PRUSolusi Kondisi Kritis Syariah yang ditawarkan kepada Pemegang Polis, masa leluasa (grace period), masa mempelajari polis (free-look period), serta kewajiban Pemegang Polis, Peserta Yang Diasuransikan dan/atau Pengelola.`,
    },
    {
      subid: '2. ',
      subkey: `Bahwa Pengelola dapat menghubungi SAYA dan/atau (Calon) Peserta Yang Diasuransikan, baik secara langsung maupun melalui Tenaga Pemasar atau pihak lain yang ditunjuk oleh Pengelola, untuk menyampaikan informasi mengenai SPAJ Syariah dan/atau Polis (termasuk proses klaim dan pelayanan lainnya), informasi terkait produk atau layanan Pengelola (termasuk penawaran produk dari Prudential Syariah sepanjang SAYA dan/atau (Calon) Peserta Yang Diasuransikan menyetujuinya), termasuk namun tidak terbatas pada informasi mengenai alasan pemberian keputusan Underwriting tertentu terhadap SPAJ Syariah dan/atau Polis, atau informasi berkaitan dengan Kontribusi. Dalam hal informasi tersebut diberikan melalui berbagai sarana komunikasi pribadi, maka SAYA menyetujui bahwa komunikasi tersebut dapat terkirim baik pada atau di luar hari/jam kerja dan SAYA bersedia untuk dihubungi oleh Pengelola, Tenaga Pemasar atau pihak lain yang ditunjuk oleh Pengelola melalui sarana komunikasi pribadi.`,
    },
    {
      subid: '',
      subkey: '',
    }
  ];
  const SKKPKP_PCB88 = [
    {
      id: '',
      key: 'Dengan ini SAYA menyatakan menyetujui pernyataan di bawah ini:',
    },
    {
      id: '1. ',
      key: 'Apabila   pembayaran  yang  SAYA  lakukan  terdapat  indikasi  mencurigakan  sebagaimana  yang  tercantum   pada   peraturan perundang-undangan   mengenai   Pencegahan   dan   Pemberantasan   Tindak   Pidana   Pencucian   Uang,   Pencegahan   dan PemberantasanTindak    Pidana   Pendanaan    Terorisme    dan    Pendanaan    Proliferasi    Senjata   Pemusnah   Massal   beserta perubahanperubahan  dan  peraturan  pelaksanaannya,  maka  Pengelola  dapat  melakukan  hal-hal  yang  diperlukan  sebagaimana tercantum di dalam peraturan perundang-undangan tersebut.',
    },
    {
      id: '2. ',
      key: 'Sesuai dengan Peraturan OJK tentang Penerapan Program Anti Pencucian Uang, Pencegahan Pendanaan Terorisme, dan Pencegahan Pendanaan Proliferasi Senjata Pemusnah Massal di Sektor Jasa Keuangan yang berlaku beserta peraturan pelaksanaannya, SAYA menyadari, mengerti dan memahami bahwa SAYA memiliki kewajiban untuk senantiasa melakukan pengkinian data pribadi SAYA kepada Pengelola dan menyerahkan salinan dokumen pendukung yang berlaku kepada Pengelola. Berdasarkan peraturan tersebut, SAYA juga setuju bahwa Pengelola dapat menolak hubungan usaha/transaksi, membatalkan transaksi dan/atau Kepesertaan dengan SAYA apabila SAYA,',
    },
    {
      subid: '(1) ',
      subkey: 'tidak melakukan pengkinian data tersebut;',
    },
    {
      subid: '(2) ',
      subkey: 'diketahui dan/atau patut diduga menggunakan dokumen palsu',
    },
    {
      subid: '(3) ',
      subkey: 'menyampaikan informasi yang diragukan kebenarannya',
    },
    {
      subid: '(4) ',
      subkey: 'terdapat di dalam Daftar Terduga Teroris dan Organisasi Teroris',
    },
    {
      subid: '(5) ',
      subkey: 'terdapat di dalam Daftar Pendanaan Proliferasi Senjata Pemusnah Massal dan/atau',
    },
    {
      subid: '(6) ',
      subkey: 'memiliki sumber dana transaksi yang diketahui dan/atau patut diduga berasal dari hasil tindak pidana.',
    },
    {
      id: '3. ',
      key: 'Bahwa  sebagai  bagian  dari  pelaksanaan  program  Anti  Pencucian  Uang,  Pencegahan  Pendanaan  Terorisme,  dan  Pencegahan Pendanaan Proliferasi Senjata Pemusnah Massal, Pengelola juga harus tunduk dan patuh kepada aturan Grup Prudential yang berlaku terkait dengan Penerapan daftar Sanksi Tertentu. Adapun yang dimaksud dengan Sanksi Tertentu, adalah “tindakan pembatasan yang diberlakukan terhadap suatu rezim/tata pemerintahan yang berkuasa, negara, pemerintah, entitas, orang perorangan dan industri tertentu oleh lembaga international, atau pemerintah di Indonesia atau pemerintah di luar Indonesia, termasuk namun tidak terbatas pada, the Office of Financial Sanctions Implementation HM Treasury, the United Nations, the European Union, the US Treasury Department’s Office of Foreign Assets Control”.',
    },
    {
      id: '4. ',
      key: 'Sehubungan dengan penerapan daftar Sanksi Tertentu, apabila',
    },
    {
      subid: '(i) ',
      subkey:
        'Pengelola mengetahui atau diberi tahu bahwa Pemegang Polis, Peserta  Yang  Diasuransikan,  Pembayar  Kontribusi,  Pemilik  Manfaat/Pengendali  Perusahaan,  orang  yang  mewakili  (nominee), penerima manfaat, orang perorangan atau entitas yang terkait dengan pengajuan SPAJ Syariah ini beserta perubahannya di kemudian hari disebutkan atau tercantum di dalam daftar Sanksi Tertentu, atau',
    },
    {
      subid: '(ii) ',
      subkey:
        'jika Pengelola atau bank atau pihak ketiga terkait lainnya ditemukan melanggar kewajiban penerapan Sanksi Tertentu tersebut sebagai akibat dari pengambilan tindakan apa pun terhadap SPAJ   Syariah   ini,   maka   Pengelola   dapat   mengakhiri   kepesertaan   dengan   segera,   setelah   memberikan   pemberitahuan selambat-lambatnya 30 (tiga puluh) hari kalender kepada Pemegang Polis, dan/atau mengambil tindakan lain yang Pengelola anggap perlu, termasuk namun tidak terbatas pada memberitahukan kepada otoritas pemerintah terkait, menunda transaksi, membekukan uang yang dibayarkan kepada Pengelola, membekukan Nilai Tunai, dan/atau mentransfer pembayaran uang atau Nilai Tunai tersebut kepada otoritas pemerintah terkait sesuai instruksi dari otoritas pemerintah tersebut. Selain itu, Pengelola dapat meminta penggantian atas segala kerugian yang mungkin dialami oleh Pengelola kepada SAYA sebagai akibat dari pelaksanaan ketentuan ini, dan hak ini akan tetap berlaku walaupun Kepesertaan ini telah berakhir.',
    },
    {
      id: '5. ',
      key: 'SAYA  dengan  ini  mengakui  dan  menyetujui  bahwa  Pengelola  dapat  diwajibkan  untuk  mematuhi,  mempelajari  dan  memenuhi persyaratan dari hukum, peraturan, perintah, petunjuk dan permintaan dari setiap badan yudisial, pajak, pemerintah dan/atau badan pengatur (selanjutnya disebut “Otoritas-otoritas” dan secara tersendiri disebut “Otoritas”) dalam berbagai yurisdiksi sebagaimana diterbitkan dan diubah dari waktu ke waktu (selanjutnya disebut “Persyaratan yang Relevan”). Dalam hal ini, SAYA setuju bahwa Pengelola dapat mengambil setiap dan seluruh langkah yang secara wajar dianggap perlu untuk memastikan kepatuhan atau ketaatan Pengelola dengan Persyaratan yang Relevan, secara khusus pengungkapan atas keadaan khusus SAYA terhadap Otoritas.',
    },
    {
      id: '6. ',
      key: 'SAYA setuju bahwa Pengelola dapat mengungkapkan keadaan khusus SAYA atau informasi apa pun mengenai SAYA kepada Otoritas sehubungan dengan ketaatan terhadap Persyaratan yang Relevan. Pengungkapan tersebut dapat diberlakukan secara langsung atau dikirimkan melalui  salah satu dari  Kantor Pusat Pengelola atau afiliasi lainnya dari  Pengelola. Untuk tujuan tersebut dan  tanpa mengabaikan  ketentuan  manapun  lainnya  dalam  SPAJ  Syariah  atau  Polis  SAYA  (apabila  pengajuan  SPAJ  Syariah  ini  disetujui), Pengelola dapat meminta SAYA untuk memberikan informasi lebih lanjut sebagaimana dipersyaratkan untuk pengungkapan terhadap Otoritas manapun dan SAYA wajib memberikan informasi tersebut kepada Pengelola dalam jangka waktu tertentu sebagaimana dapat dipersyaratkan secara wajar. SAYA memahami konsekuensi jika SAYA tidak bersedia menyampaikan pernyataan persetujuan, instruksi atau pemberian kuasa secara tertulis dan sukarela. Pengelola berhak untuk menolak hubungan bisnis, transaksi dan/atau mengakhiri hubungan bisnis dengan SAYA, dan SAYA berhak menolak memberikan pernyataan persetujuan, instruksi atau pemberian kuasa secara tertulis dan sukarela, dengan menerima konsekuensi seperti yang disebutkan di atas.',
    },
    {
      id: '7. ',
      key: 'Tanpa mengabaikan ketentuan manapun lainnya dari SPAJ Syariah atau Polis SAYA (apabila pengajuan SPAJ Syariah ini disetujui), SAYA  setuju  untuk  menyediakan  bantuan  yang  mungkin  secara  wajar  dibutuhkan  untuk  memungkinkan  Pengelola  mematuhi kewajiban Pengelola berdasarkan seluruh Persyaratan yang Relevan mengenai SAYA atau Polis SAYA pada Pengelola.',
    },
    {
      id: '8. ',
      key: 'SAYA setuju untuk memberikan informasi kepada Pengelola secara tepat waktu atas setiap perubahan apa pun dari keterangan yang sebelumnya  telah  disampaikan  kepada  Pengelola,  atau  selambat-lambatnya  90  (sembilan  puluh)  hari  kalender  sejak  terjadinya perubahan yang dimaksud, baik pada  saat  pengisian permohonan asuransi  ini  atau di  waktu manapun lainnya. Secara khusus, merupakan hal yang sangat penting bagi SAYA untuk memberikan informasi kepada Pengelola secara langsung apabila terdapat perubahan atas kewarganegaraan SAYA, status pajak atau wajib pajak atau jika SAYA menjadi wajib pajak di lebih dari satu negara. Jika salah satu dari perubahan ini terjadi atau jika informasi manapun lainnya mengindikasikan adanya perubahan dimaksud, Pengelola dapat meminta SAYA untuk memberikan dokumen-dokumen tertentu atau informasi terkait, dan SAYA setuju untuk memberikan informasi tersebut. Dokumen dan informasi tersebut adalah termasuk namun tidak terbatas pada pernyataan atau formulir pajak (dan dilegalisasi oleh notaris, apabila diperlukan) yang telah dilengkapi dan/atau ditandatangani oleh SAYA.',
    },
    {
      id: '9. ',
      key: 'Jika SAYA tidak menyediakan informasi dan dokumen-dokumen yang diminta tersebut kepada Pengelola dalam jangka waktu tertentu atau jika salah satu dari informasi atau dokumen-dokumen yang disediakan tersebut tidak tepat waktu, akurat atau lengkap, SAYA setuju bahwa Pengelola dapat, untuk memastikan kepatuhan dan ketaatan yang berkelanjutan terhadap Persyaratan yang Relevan, mengambil setiap dan seluruh langkah yang Pengelola anggap sesuai untuk memastikan kepatuhan atau ketaatan Pengelola terhadap Persyaratan yang Relevan, atau selainnya untuk melindungi kepentingan hukum dan/atau komersial Pengelola.',
    },
  ];
  const SKKPKP_PRUFUTURE = [
    {
      id: "A. ",
      key: "SYARAT DAN KETENTUAN KEPATUHAN"
    },
    {
      id: '-',
      key: 'Dengan ini SAYA menyatakan setuju terhadap pernyataan-pernyataan di bawah ini:',
    },
    {
      subid: '1. ',
      subkey: 'Apabila pembayaran yang SAYA lakukan terdapat indikasi mencurigakan sebagaimana yang tercantum pada peraturan perundang-undangan mengenai Pencegahan dan Pemberantasan Tindak Pidana Pencucian Uang, Pencegahan dan Pemberantasan Tindak Pidana Pendanaan Terorisme dan Pendanaan Proliferasi Senjata Pemusnah Massal beserta perubahan-perubahan dan peraturan pelaksanaannya, maka Penanggung dapat melakukan hal-hal yang diperlukan sebagaimana tercantum di dalam peraturan perundang-undangan tersebut.',
    },
    {
      subid: '2. ',
      subkey: 'Sesuai dengan Peraturan OJK tentang Penerapan Program Anti Pencucian Uang, Pencegahan Pendanaan Terorisme, dan Pencegahan Pendanaan Proliferasi Senjata Pemusnah Massal di Sektor Jasa Keuangan yang berlaku beserta peraturan pelaksanaannya, SAYA menyadari, mengerti dan memahami bahwa SAYA memiliki kewajiban untuk senantiasa melakukan pengkinian data pribadi SAYA kepada Penanggung dan menyerahkan salinan dokumen pendukung yang berlaku kepada Penanggung. Berdasarkan peraturan tersebut, SAYA juga setuju bahwa Penanggung dapat menolak hubungan usaha/transaksi, membatalkan transaksi dan/atau Pertanggungan dengan SAYA apabila SAYA',
    },
    {
      termid: "(1) ",
      termkey: "tidak melakukan pengkinian data tersebut;"
    },
    {
      termid: "(2) ",
      termkey: "diketahui dan/atau patut diduga menggunakan dokumen palsu;"
    },
    {
      termid: "(3) ",
      termkey: "menyampaikan informasi yang diragukan kebenarannya;"
    },
    {
      termid: "(4) ",
      termkey: "terdapat di dalam Daftar Terduga Teroris dan Organisasi Teroris;"
    },
    {
      termid: "(5) ",
      termkey: "terdapat di dalam Daftar Pendanaan Proliferasi Senjata Pemusnah Massal dan/atau;"
    },
    {
      termid: "(6) ",
      termkey: "memiliki sumber dana transaksi yang diketahui dan/atau patut diduga berasal dari hasil tindak pidana"
    },
    {
      subid: '3. ',
      subkey: 'Bahwa sebagai bagian dari pelaksanaan program Anti Pencucian Uang, Pencegahan Pendanaan Terorisme, dan Pencegahan Pendanaan Proliferasi Senjata Pemusnah Massal, Penanggung juga harus tunduk dan patuh kepada aturan Grup Prudential yang berlaku terkait dengan Penerapan daftar Sanksi Tertentu. Adapun yang dimaksud dengan Sanksi Tertentu, adalah “tindakan pembatasan yang diberlakukan terhadap suatu rezim/tata pemerintahan yang berkuasa, negara, pemerintah, entitas, orang perorangan dan industri tertentu oleh lembaga international, atau pemerintah di Indonesia atau pemerintah di luar Indonesia, termasuk namun tidak terbatas pada, <i>the Office of Financial Sanctions Implementation HM Treasury, the United Nations, the European Union, the US Treasury Department’s Office of Foreign Assets Control</i>”'
    },
    {
      subid: '4. ',
      subkey: "Sehubungan dengan penerapan daftar Sanksi Tertentu, apabila "
    },
    {
      termid: "(i) ",
      termkey: "Penanggung mengetahui atau diberi tahu bahwa Pemegang Polis, Tertanggung, Pembayar Premi, Pemilik Manfaat/Pengendali Perusahaan, orang yang mewakili (<i>nominee</i>), penerima manfaat, orang perorangan atau entitas yang terkait dengan pengajuan SPAJ ini beserta perubahannya di kemudian hari disebutkan atau tercantum di dalam daftar Sanksi Tertentu, atau"
    },
    {
      termid: "(ii) ",
      termkey: "jika Penanggung atau bank atau pihak ketiga terkait lainnya ditemukan melanggar kewajiban penerapan Sanksi Tertentu tersebut sebagai akibat dari pengambilan tindakan apa pun terhadap SPAJ ini, maka Penanggung dapat mengakhiri pertanggungan dengan segera, setelah memberikan pemberitahuan selambat-lambatnya 30 (tiga puluh) hari kalender kepada Pemegang Polis, dan/atau mengambil tindakan lain yang Penanggung anggap perlu, termasuk namun tidak terbatas pada memberitahukan kepada otoritas pemerintah terkait, menunda transaksi, membekukan uang yang dibayarkan kepada Penanggung, membekukan Nilai Penebusan, dan/atau mentransfer pembayaran uang atau Nilai Penebusan tersebut kepada otoritas pemerintah terkait sesuai instruksi dari otoritas pemerintah tersebut. Selain itu, Penanggung dapat meminta penggantian atas segala kerugian yang mungkin dialami oleh Penanggung kepada SAYA sebagai akibat dari pelaksanaan ketentuan ini, dan hak ini akan tetap berlaku walaupun Pertanggungan ini telah berakhir."
    },
    {
      subid: "5. ",
      subkey: "SAYA dengan ini mengakui dan menyetujui bahwa Penanggung dapat diwajibkan untuk mematuhi, mempelajari dan memenuhi persyaratan dari hukum, peraturan, perintah, petunjuk dan persyaratan-persyaratan termasuk persyaratan yang relevan berdasarkan <i>Foreign Account Tax Compliance Act</i> (FATCA) serta Common <i>Reporting Standard</i> (CRS) dan permintaan dari setiap badan yudisial, pajak, pemerintah dan/atau badan pengatur, termasuk namun tidak terbatas pada <i>Internal Revenue Services</i> (IRS) dari Amerika Serikat (selanjutnya disebut “Otoritas-otoritas” dan secara tersendiri disebut “Otoritas”) dalam berbagai yurisdiksi sebagaimana diterbitkan dan diubah dari waktu ke waktu (selanjutnya disebut “Persyaratan yang Relevan”). Dalam hal ini, SAYA setuju bahwa Penanggung dapat mengambil setiap dan seluruh langkah yang secara wajar dianggap perlu untuk memastikan kepatuhan atau ketaatan Penanggung dengan Persyaratan yang Relevan, secara khusus pengungkapan atas keadaan khusus SAYA terhadap Otoritas."
    },
    {
      subid: "6. ",
      subkey: "SAYA setuju bahwa Penanggung dapat mengungkapkan keadaan khusus SAYA atau informasi apa pun mengenai SAYA kepada Otoritas sehubungan dengan ketaatan terhadap Persyaratan yang Relevan. Pengungkapan tersebut dapat diberlakukan secara langsung atau dikirimkan melalui salah satu dari Kantor Pusat Penanggung atau afiliasi lainnya dari Penanggung. Untuk tujuan tersebut dan tanpa mengabaikan ketentuan manapun lainnya dalam SPAJ atau Polis SAYA (apabila pengajuan SPAJ ini disetujui), Penanggung dapat meminta SAYA untuk memberikan informasi lebih lanjut sebagaimana dipersyaratkan untuk pengungkapan terhadap Otoritas manapun dan SAYA wajib memberikan informasi tersebut kepada Penanggung dalam jangka waktu tertentu sebagaimana dapat dipersyaratkan secara wajar. SAYA memahami konsekuensi jika SAYA tidak bersedia menyampaikan pernyataan persetujuan, instruksi atau pemberian kuasa secara tertulis dan sukarela. Penanggung berhak untuk menolak hubungan usaha, transaksi dan/atau mengakhiri hubungan usaha dengan SAYA, dan SAYA berhak menolak memberikan pernyataan persetujuan, instruksi atau pemberian kuasa secara tertulis dan sukarela, dengan menerima konsekuensi seperti yang disebutkan di atas."
    },
    {
      subid: "7. ",
      subkey: "Tanpa mengabaikan ketentuan manapun lainnya dari SPAJ atau Polis SAYA (apabila pengajuan SPAJ ini disetujui), SAYA setuju untuk menyediakan bantuan yang mungkin secara wajar dibutuhkan untuk memungkinkan Penanggung mematuhi kewajiban Penanggung berdasarkan seluruh Persyaratan yang Relevan mengenai SAYA atau Polis SAYA pada Penanggung."
    },
    {
      subid: "8. ",
      subkey: "SAYA setuju untuk memberikan informasi kepada Penanggung secara tepat waktu atas setiap perubahan apa pun dari keterangan yang sebelumnya telah disampaikan kepada Penanggung, atau selambat-lambatnya 90 (sembilan puluh) hari kalender sejak terjadinya perubahan yang dimaksud, baik pada saat pengisian permohonan asuransi ini atau di waktu manapun lainnya. Secara khusus, merupakan hal yang sangat penting bagi SAYA untuk memberikan informasi kepada Penanggung secara langsung apabila terdapat perubahan atas kewarganegaraan SAYA, status pajak atau wajib pajak atau jika SAYA menjadi wajib pajak di lebih dari satu negara. Jika salah satu dari perubahan ini terjadi atau jika informasi manapun lainnya mengindikasikan adanya perubahan dimaksud, Penanggung dapat meminta SAYA untuk memberikan dokumen-dokumen tertentu atau informasi terkait, dan SAYA setuju untuk memberikan informasi tersebut. Dokumen dan informasi tersebut adalah termasuk namun tidak terbatas pada pernyataan atau formulir pajak (dan dilegalisasi oleh notaris, apabila diperlukan) yang telah dilengkapi dan/atau ditandatangani oleh SAYA."
    },
    {
      subid: "9. ",
      subkey: "Jika SAYA tidak menyediakan informasi dan dokumen-dokumen yang diminta tersebut kepada Penanggung dalam jangka waktu tertentu atau jika salah satu dari informasi atau dokumen-dokumen yang disediakan tersebut tidak tepat waktu, akurat atau lengkap, SAYA setuju bahwa Penanggung dapat, untuk memastikan kepatuhan dan ketaatan yang berkelanjutan terhadap Persyaratan yang Relevan, mengambil setiap dan seluruh langkah yang Penanggung anggap sesuai untuk memastikan kepatuhan dan ketaatan Penanggungan terhadap Persyaratan yang Relevan, atau selainnya untuk melindungi kepentingan hukum dan/atau komersial Penanggung"
    },
    {
      id: "B. ",
      key: "PELAYANAN KONSUMEN"
    },
    {
      id: "-",
      key: "Dengan ini SAYA menyatakan setuju terhadap pernyataan-pernyataan di bawah ini:  "
    },
    {
      subid: "1. ",
      subkey: "Jika SAYA tidak menyediakan informasi dan dokumen-dokumen yang diminta tersebut kepada Penanggung dalam jangka waktu tertentu atau jika salah satu dari informasi atau dokumen-dokumen yang disediakan tersebut tidak tepat waktu, akurat atau lengkap, SAYA setuju bahwa Penanggung dapat, untuk memastikan kepatuhan dan ketaatan yang berkelanjutan terhadap Persyaratan yang Relevan, mengambil setiap dan seluruh langkah yang Penanggung anggap sesuai untuk memastikan kepatuhan dan ketaatan Penanggungan terhadap Persyaratan yang Relevan, atau selainnya untuk melindungi kepentingan hukum dan/atau komersial Penanggung."
    },
    {
      subid: "2. ",
      subkey: "SAYA telah menerima, mendapatkan penjelasan dan memahami mengenai Ringkasan Informasi Produk dan Layanan Versi Umum dan Ringkasan Informasi Produk dan Layanan Versi Personal (Ilustrasi) " + productName + " dari Tenaga Pemasar, termasuk bahwa " + productName + " adalah merupakan produk yang memberikan manfaat perlindungan terhadap risiko. SAYA telah memperoleh penjelasan dan memahami manfaat, risiko, persyaratan dan tata cara, dan biaya dari " + productName + " yang ditawarkan kepada Pemegang Polis, masa leluasa (<i>grace period</i>), masa mempelajari polis (<i>free-look period</i>), serta kewajiban Pemegang Polis, Tertanggung dan/atau Penanggung."
    },
    {
      id: "C. ",
      key: "PERIKATAN"
    },
    {
      id: "-",
      key: "Dengan ini SAYA menyatakan setuju terhadap pernyataan-pernyataan di bawah ini:"
    },
    {
      subid: "1. ",
      subkey: "Bahwa Penanggung dapat menghubungi SAYA dan/atau (Calon) Tertanggung dan/atau (Calon) Pembayar Premi, baik secara langsung maupun melalui Tenaga Pemasar atau pihak lain yang ditunjuk oleh Penanggung, untuk menyampaikan informasi mengenai SPAJ dan/atau Polis (termasuk proses klaim dan pelayanan lainnya), informasi terkait produk atau layanan Penanggung (termasuk penawaran produk dari Prudential Indonesia sepanjang SAYA dan/atau (Calon) Tertanggung dan/atau (Calon) Pembayar Premi menyetujuinya), termasuk namun tidak terbatas pada informasi mengenai alasan pemberian keputusan <i>Underwriting</i> tertentu terhadap SPAJ dan/atau Polis, atau informasi berkaitan dengan Premi. Dalam hal informasi tersebut diberikan melalui berbagai sarana komunikasi pribadi, maka SAYA menyetujui bahwa komunikasi tersebut dapat terkirim baik pada atau di luar hari/jam kerja dan SAYA bersedia untuk dihubungi oleh Penanggung, Tenaga Pemasar atau pihak lain yang ditunjuk oleh Penanggung melalui sarana komunikasi pribadi."
    },
    {
      subid: "2. ",
      subkey: "Pemegang Polis memiliki kesempatan untuk mempelajari dengan seksama Polis tersebut sesuai ketentuan yang terdapat pada Polis dan keterangan yang terdapat pada Ringkasan Informasi Produk dan Layanan Versi Umum dan Ringkasan Informasi Produk dan Layanan Versi Personal (Ilustrasi) " + productName + "."
    },
    {
      subid: "3. ",
      subkey: "Dalam rentang waktu sebagaimana dimaksud pada butir 2 di atas, Pemegang Polis dapat mengurungkan maksud untuk mempertanggungkan diri Tertanggung berdasarkan Polis tersebut, dengan cara mengembalikan dokumen Ringkasan Polis kepada Penanggung, dan dengan ketentuan bahwa Pemegang Polis tidak pernah mengajukan perubahan Polis dan/atau melakukan transaksi Polis dan/atau mengajukan klaim atas Manfaat Asuransi yang ditanggung dalam Polis tersebut. Dalam hal ini, Penanggung akan mengembalikan Premi yang telah dibayarkan dikurangi biaya-biaya (jika ada) sesuai ketentuan yang terdapat pada Polis dan keterangan yang terdapat pada Ringkasan Informasi Produk dan Layanan Versi Umum dan Ringkasan Informasi Produk dan Layanan Versi Personal (Ilustrasi) " + productName + "."
    },
    {
      subid: "4. ",
      subkey: "SAYA selaku Calon Pemegang Polis berhak dan berwenang bertindak untuk dan atas nama Calon Tertanggung, Calon Pembayar Premi maupun Penerima Manfaat yang sah secara hukum untuk mengambil tindakan, keputusan dan/atau hal-hal lainnya yang berkaitan dengan pemenuhan hak dan kewajiban atas Polis SAYA, dan dengan ini SAYA menjamin bahwa Calon Tertanggung, Calon Pembayar Premi maupun Penerima Manfaat setuju dan sepakat atas tindakan, keputusan dan/atau hal-hal lainnya yang berkaitan dengan pemenuhan hak dan kewajiban atas Polis tersebut."
    }
  ];
  const SKKPKP_PRUANUGRAH = [
    {
      id: "",
      key: "Dengan ini SAYA menyatakan setuju terhadap pernyataan-pernyataan di bawah ini:"
    },
    {
      subid: "1. ",
      subkey: "Bahwa setelah Pengelola menyetujui SPAJ Syariah ini dan Kontribusi telah SAYA bayarkan, SAYA dan Pengelola sepakat membuat perjanjian asuransi jiwa syariah dalam bentuk Polis yang akan diterbitkan oleh Pengelola, dan oleh karenanya SAYA dan Pengelola setuju untuk memenuhi hak dan melaksanakan kewajiban masing-masing berdasarkan syarat dan ketentuan yang tercantum di dalam Ringkasan Polis, Ketentuan Polis, dan Ketentuan Lain (apabila diadakan) yang merupakan bagian yang tidak terpisahkan dari Polis yang akan diterbitkan Pengelola tersebut."
    },
    {
      subid: "2. ",
      subkey: `Pemegang Polis memiliki kesempatan untuk mempelajari dengan seksama Polis tersebut sesuai dengan ketentuan yang terdapat pada Polis dan keterangan yang terdapat pada Ringkasan Informasi Produk dan Layanan Versi Umum dan Ringkasan Informasi Produk danLayanan Versi Personal (Ilustrasi) ${productName}.`
    },
    {
      subid: "3. ",
      subkey: `Dalam rentang waktu sebagaimana dimaksud pada butir 2 di atas, Pemegang Polis dapat mengurungkan maksud untuk melindungi Peserta Yang Diasuransikan berdasarkan Polis tersebut, dengan cara menginformasikan hal tersebut kepada Pengelola, dan dengan ketentuan bahwa Pemegang Polis tidak pernah mengajukan perubahan Polis dan/atau melakukan transaksi Polis dan/atau mengajukan klaim atas Manfaat Asuransi yang diasuransikan dalam Polis tersebut. Dalam hal ini, Pengelola akan mengembalikan Kontribusi yang telah dibayarkan dikurangi biaya-biaya (jika ada) sesuai ketentuan yang terdapat pada Polis dan keterangan yang terdapat pada Ringkasan Informasi Produk dan Layanan Versi Umum dan Ringkasan Informasi Produk dan Layanan Versi Personal (Ilustrasi) ${productName}.`
    },
    {
      subid: "4. ",
      subkey: "SAYA selaku Calon Pemegang Polis berhak dan berwenang bertindak untuk dan atas nama Calon Peserta Yang Diasuransikan, Calon Pembayar Kontribusi maupun Penerima Manfaat yang sah secara hukum untuk mengambil tindakan, keputusan dan/atau hal-hal lainnya yang berkaitan dengan pemenuhan hak dan kewajiban atas Polis SAYA, dan dengan ini SAYA menjamin bahwa Calon Peserta Yang Diasuransikan, Calon Pembayar Kontribusi maupun Penerima Manfaat setuju dan sepakat atas tindakan, keputusan dan/atau hal-hal lainnya yang berkaitan dengan pemenuhan hak dan kewajiban atas Polis tersebut."
    }
  ]
  const SKKPKP: Record<string, any[]> = {
    U12: SKKPKP_PNG,
    U13: SKKPKP_PNGS,
    H14: SKKPKP_PWM,
    H15: SKKPKP_PWMS,
    E1O: SKKPKP_PRUCERAH,
    E1OP: SKKPKP_PRUCERAH,
    C16: SKKPKP_PSKKS,
    T1P: SKKPKP_PCB88,
    TIQ: SKKPKP_PCB88,
    L1WR: SKKPKP_PRUFUTURE,
    L1WD: SKKPKP_PRUFUTURE,
    L1Q: SKKPKP_PRUANUGRAH
  };
  const label = isSharia
    ? 'Syarat dan Ketentuan Kepatuhan, Pelayanan Konsumen dan Perikatan'
    : ['T1P', "T1Q", 'L1WR', 'L1WD'].includes(productCode) ? 'Syarat dan Ketentuan Kepatuhan, Pelayanan konsumen dan Perikatan' : 'Syarat dan Ketentuan Kepatuhan';
  return {
    label,
    key: 'SKKPKP',
    desc: SKKPKP[productCode] || SKKPKP_DEFAULT,
    information: label,
  };
};

export const getConsentProvideData = (
  productType: ProductType,
  policyType: TPolicyType,
  spaj: string,
  productCode: TProductCode,
): TDisclaimerItem => {
  const isTraditional = productType === 'TRD';
  const keyLabel = isTraditional ? 'PIPKPLPP' : 'PPDIPKPLPP';
  const isSharia = policyType === 'sharia';
  const { lifeAssured, premiContribution, companyNameShort, insurerManager, info_link, privacy_policy_link } =
    WR_SHARIA_CONVENT[policyType];
  const information = 'Persetujuan Pemberian Data dan/atau Informasi Pribadi Kepada Pihak Lain & Penawaran Produk';
  const dataList: Record<ProductType, Record<string, unknown>[]> = {
    TRD: [
      {
        id: '1. ',
        key: i18next.t('Epos:izin_pengumpulan_pemrosesan_data_pribadi_traditional', {
          spaj,
          lifeAssured,
          premiContribution,
          companyNameShort,
        }),
      },
      {
        subid: '1. ',
        subkey: i18next.t('Epos:pemrosesan_pengajuan_polis_asuransi_traditional'),
      },
      {
        subid: '2. ',
        subkey: i18next.t('Epos:pemeriksaan_kesehatan_traditional'),
      },
      {
        subid: '3. ',
        subkey: i18next.t('Epos:akses_catatan_kesehatan_fasilitas_pelayanan_kesehatan_traditional'),
      },
      {
        subid: '4. ',
        subkey: i18next.t('Epos:pelayanan_polis_dan_klaim_traditional', { insurerManager }),
      },
      {
        subid: '5. ',
        subkey: i18next.t('Epos:pembayaran_premi_dan_klaim_traditional', { premiContribution }),
      },
      {
        subid: '6. ',
        subkey: i18next.t('Epos:PIPKPLPP_06'),
      },
      {
        subid: '7. ',
        subkey: i18next.t('Epos:PIPKPLPP_07'),
      },
      {
        subid: '8. ',
        subkey: i18next.t('Epos:PIPKPLPP_08'),
      },
      {
        subid: '9. ',
        subkey: i18next.t('Epos:PIPKPLPP_09'),
      },
      {
        subid: '10. ',
        subkey: i18next.t('Epos:PIPKPLPP_10'),
      },
      {
        subid: '11. ',
        subkey: i18next.t('Epos:PIPKPLPP_11'),
      },
      {
        subid: '12. ',
        subkey: i18next.t('Epos:PIPKPLPP_12'),
      },
      {
        subid: '13. ',
        subkey: i18next.t('Epos:PIPKPLPP_13'),
      },
      {
        subid: '14. ',
        subkey: i18next.t('Epos:PIPKPLPP_14', { insurerManager }),
      },
      {
        subid: '15. ',
        subkey: i18next.t('Epos:PIPKPLPP_15'),
      },
      {
        id: '',
        key: i18next.t('Epos:PIPKPLPP_foot_01'),
      },
      {
        id: '',
        key: i18next.t('Epos:info_link_content', { info_link }),
        url: true,
      },
      {
        id: '',
        key: i18next.t('Epos:privacy_policy_content', { privacy_policy_link, companyNameShort }),
        url: true,
      },
      {
        id: '',
        key: `Anda diwajibkan membaca pada 2 link di atas untuk dapat menyetujui pertanyaan ini.`,
        redBg: true,
      },
    ],
    UL: [
      {
        id: '',
        key: i18next.t(isSharia ? 'Epos:ph_consent_statement_sharia' : 'Epos:ph_consent_statement', {
          lifeAssured,
          premiContribution,
        }),
      },
      {
        id: '',
        key: i18next.t('Epos:consent_to_process_collection_personal_data_ul', { spaj, companyNameShort }),
      },
      { id: '1. ', key: i18next.t('Epos:point_1') },
      { id: '2. ', key: i18next.t('Epos:point_2') },
      { id: '3. ', key: i18next.t('Epos:point_3') },
      {
        id: '4.  ',
        key: i18next.t('Epos:point_4', {
          insurerManager,
          otherCompany: isSharia
            ? 'lembaga/perusahaan di bidang jasa keuangan maupun layanan informasi keuangan atau perusahaan lainnya'
            : 'perusahaan lainnya',
        }),
      },
      { id: '5. ', key: i18next.t('Epos:point_5', { premiContribution }) },
      { id: '6. ', key: i18next.t('Epos:point_6') },
      { id: '7. ', key: i18next.t('Epos:point_7') },
      {
        id: '8. ',
        key: i18next.t(isSharia ? 'Epos:point_8_sharia' : 'Epos:point_8'),
      },
      { id: '9. ', key: i18next.t('Epos:point_9') },
      { id: '10. ', key: i18next.t('Epos:point_10') },
      { id: '11. ', key: i18next.t('Epos:point_11') },
      { id: '12. ', key: i18next.t('Epos:point_12') },
      {
        id: '13. ',
        key: i18next.t('Epos:point_13'),
      },
      {
        id: '14. ',
        key: i18next.t('Epos:point_14', { insurerManager }),
      },
      {
        id: '15. ',
        key: i18next.t(isSharia ? 'Epos:point_15_sharia' : 'Epos:point_15'),
      },
      {
        id: '',
        key: i18next.t(isSharia ? 'Epos:other_party_that_can_have_data_sharia' : 'Epos:other_party_that_can_have_data'),
      },
      {
        id: '',
        key: i18next.t('Epos:update_content_link', {
          link: isSharia ? 'https://bit.ly/PRUSyariahPihakKetiga' : 'https://bit.ly/PRUPihakKetiga',
        }),
        url: true,
      },
      {
        id: '',
        key: i18next.t('Epos:other_information', {
          link: isSharia ? 'https://bit.ly/PRUSyariahKebijakanPrivasi' : 'https://bit.ly/PRUKebijakanPrivasi',
          companyNameShort,
        }),
        url: true,
      },
      {
        id: '',
        key: i18next.t('Epos:required_link'),
        redBg: true,
      },
    ],
  };

  const PIPKPLPP_PNG = [
    {
      id: '1. ',
      key: `Dengan ini SAYA dan/atau Calon Tertanggung Utama dan/atau Calon Tertanggung Tambahan 1 dan/atau Calon Tertanggung Tambahan 2 dan/atau Calon Pembayar Premi dan/atau Calon Penerima Manfaat yang diwakilkan oleh SAYA:`
    },
    {
      subid: '',
      subkey: `Menyatakan telah membaca, mendapat penjelasan dari Tenaga Pemasar, memahami dan menyetujui serta memberikan izin kepada Prudential Indonesia untuk mengumpulkan, menyimpan, memproses, mempergunakan dan membagikan Data Pribadi (termasuk namun tidak terbatas pada nama, alamat surat menyurat, alamat e-mail, nomor telepon, kontak, data kesehatan maupun informasi lainnya) yang SAYA berikan dalam SPAJ ini dan dokumen lainnya sehubungan dengan pengajuan asuransi ini, serta informasi terkait Polis SAYA jika pengajuan ini disetujui, sesuai dengan kebijakan internal Prudential Indonesia maupun peraturan perundang-undangan yang berlaku untuk keperluan:`
    },
    {
      subid: '1. ',
      subkey: `Pemrosesan pengajuan permohonan Polis asuransi;`
    },
    {
      subid: '2. ',
      subkey: `Pemeriksaan Kesehatan dan riwayat keuangan;`
    },
    {
      subid: '3. ',
      subkey: `Akses terhadap catatan kesehatan di fasilitas pelayanan kesehatan dan tenaga kesehatan;`
    },
    {
      subid: '4. ',
      subkey: `Pelayanan Polis dan/atau klaim (diantaranya cetak dokumen, pengiriman dokumen melalui kurir, Third Party Administrator/TPA, Rumah Sakit/klinik/tenaga medis rekanan maupun bukan rekanan, call center yang bekerja sama dengan Penanggung, investigator klaim, penyelidik, lembaga/perusahaan di bidang jasa keuangan maupun layanan informasi keuangan atau perusahaan terkait lainnya);`
    },
    {
      subid: '5. ',
      subkey: `Pembayaran Premi dan/atau klaim;`
    },
    {
      subid: '6. ',
      subkey: `Reasuransi;`
    },
    {
      subid: '7. ',
      subkey: `Penyimpanan dokumen;`
    },
    {
      subid: '8. ',
      subkey: `Penyelesaian Sengketa dan Proses Investigasi, termasuk namun tidak terbatas pada pengacara;`
    },
    {
      subid: '9. ',
      subkey: `Pengembangan produk (seperti riset pemasaran, survei, teknologi, penelitian dan analisa statistik);`
    },
    {
      subid: '10. ',
      subkey: `Perhitungan aktuaria;`
    },
    {
      subid: '11. ',
      subkey: `Dana Investasi (seperti manajer investasi, Bank Kustodian) berikut pengelolaannya;`
    },
    {
      subid: '12. ',
      subkey: `Auditor Eksternal maupun penasihat/konsultan profesional;`
    },
    {
      subid: '13. ',
      subkey: `Mitra bisnis maupun pihak yang memasarkan produk asuransi (diantaranya Tenaga Pemasar (termasuk dalam hal pengalihan Tenaga Pemasar dan pihak lain yang terkait dengan Tenaga Pemasar), rekanan bank, badan usaha selain bank, pialang asuransi);`
    },
    {
      subid: '14. ',
      subkey: `Perusahaan dan/atau pihak terkait yang terafiliasi dengan Penanggung (seperti Grup Prudential), termasuk dukungan layanan dari atau antar Grup Prudential;`
    },
    {
      subid: '15. ',
      subkey: `Otoritas pemerintah, asosiasi, aparat penegak hukum;`
    },
    {
      subid: '16. ',
      subkey: `Pelaksanaan administrasi produk dan layanan (berikut pemenuhan kewajiban kontraktual) maupun penyelenggaraan kegiatan dari Prudential Indonesia kepada SAYA dari waktu ke waktu.`
    },
    {
      id: '',
      key: `Adapun rincian mengenai tujuan pemrosesan Data Pribadi maupun pihak lain yang dapat memperoleh dan/atau memproses Data Pribadi untuk menunjang keperluan di atas dapat dilakukan:`
    },
    {
      id: '',
      key: `• \tPengkinian secara berkala dari waktu ke waktu dan dapat diakses pada https://bit.ly/PRUPihakKetiga`,
      url: true,
    },
    {
      id: '',
      key: `• \tInformasi lebih lanjut terkait Pemberitahuan Privasi Prudential Indonesia dapat diakses pada https://bit.ly/PRUPemberitahuanPrivasi`,
      url: true,
    },
    {
      id: '',
      key: `Anda diwajibkan membaca pada 2 link di atas untuk dapat menyetujui pertanyaan ini.`,
      redBg: true,
    },
  ]
  const PIPKPLPP_PNGS = [
    {
      id: '1. ',
      key: `Dengan ini SAYA dan/atau Calon Peserta Utama Yang Diasuransikan dan/atau Calon Peserta Tambahan 1 Yang Diasuransikan dan/atau Calon Peserta Tambahan 2 Yang Diasuransikan dan/atau Calon Pembayar Kontribusi dan/atau Calon Penerima Manfaat yang diwakilkan oleh SAYA:`
    },
    {
      subid: '',
      subkey: `Menyatakan telah membaca, mendapat penjelasan dari Tenaga Pemasar, memahami dan menyetujui serta memberikan izin kepada Prudential Syariah untuk mengumpulkan, menyimpan, memproses, mempergunakan dan membagikan Data Pribadi (termasuk namun tidak terbatas pada nama, alamat surat menyurat, alamat e-mail, nomor telepon, kontak, data kesehatan maupun informasi lainnya) yang SAYA berikan dalam SPAJ Syariah ini dan dokumen lainnya sehubungan dengan pengajuan asuransi ini, serta informasi terkait Polis SAYA jika pengajuan ini disetujui, sesuai dengan kebijakan internal Prudential Syariah maupun peraturan perundang-undangan yang berlaku untuk keperluan:`
    },
    {
      subid: '1. ',
      subkey: `Pemrosesan pengajuan permohonan Polis asuransi;`
    },
    {
      subid: '2. ',
      subkey: `Pemeriksaan Kesehatan dan riwayat keuangan;`
    },
    {
      subid: '3. ',
      subkey: `Akses terhadap catatan kesehatan di fasilitas pelayanan kesehatan dan tenaga kesehatan;`
    },
    {
      subid: '4. ',
      subkey: `Pelayanan Polis dan/atau klaim (diantaranya cetak dokumen, pengiriman dokumen melalui kurir, Third Party Administrator/TPA, Rumah Sakit/klinik/tenaga medis rekanan maupun bukan rekanan, call center yang bekerja sama dengan Pengelola, investigator klaim, penyelidik, lembaga/perusahaan di bidang jasa keuangan maupun layanan informasi keuangan atau perusahaan terkait lainnya);`
    },
    {
      subid: '5. ',
      subkey: `Pembayaran Kontribusi dan/atau klaim;`
    },
    {
      subid: '6. ',
      subkey: `Reasuransi;`
    },
    {
      subid: '7. ',
      subkey: `Penyimpanan dokumen;`
    },
    {
      subid: '8. ',
      subkey: `Penyelesaian Sengketa dan Proses Investigasi, termasuk namun tidak terbatas pada pengacara;`
    },
    {
      subid: '9. ',
      subkey: `Pengembangan produk (seperti riset pemasaran, survei, teknologi, penelitian dan analisa statistik);`
    },
    {
      subid: '10. ',
      subkey: `Perhitungan aktuaria;`
    },
    {
      subid: '11. ',
      subkey: `Dana Investasi (seperti manajer investasi, Bank Kustodian) berikut pengelolaannya;`
    },
    {
      subid: '12. ',
      subkey: `Auditor Eksternal maupun penasihat/konsultan profesional;`
    },
    {
      subid: '13. ',
      subkey: `Mitra bisnis maupun pihak yang memasarkan produk asuransi (diantaranya Tenaga Pemasar (termasuk dalam hal pengalihan Tenaga Pemasar dan pihak lain yang terkait dengan Tenaga Pemasar), rekanan bank, badan usaha selain bank, pialang asuransi);`
    },
    {
      subid: '14. ',
      subkey: `Perusahaan dan/atau pihak terkait yang terafiliasi dengan Pengelola (seperti Grup Prudential), termasuk dukungan layanan dari atau antar Grup Prudential;`
    },
    {
      subid: '15. ',
      subkey: `Otoritas pemerintah, asosiasi, aparat penegak hukum;`
    },
    {
      subid: '16. ',
      subkey: `Pelaksanaan administrasi produk dan layanan (berikut pemenuhan kewajiban kontraktual) maupun penyelenggaraan kegiatan dari Prudential Syariah kepada SAYA dari waktu ke waktu.`
    },
    {
      id: '',
      key: `Adapun rincian mengenai tujuan pemrosesan Data Pribadi maupun pihak lain yang dapat memperoleh dan/atau memproses Data Pribadi untuk menunjang keperluan di atas dapat dilakukan:`
    },
    {
      id: '',
      key: `• \tPengkinian secara berkala dari waktu ke waktu dan dapat diakses pada https://bit.ly/PRUSyariahPihakKetiga`,
      url: true,
    },
    {
      id: '',
      key: `• \tInformasi lebih lanjut terkait Pemberitahuan Privasi Prudential Syariah dapat diakses pada https://bit.ly/PRUSyariahPemberitahuanPrivasi`,
      url: true,
    },
    {
      id: '',
      key: `Anda diwajibkan membaca pada 2 link di atas untuk dapat menyetujui pertanyaan ini.`,
      redBg: true,
    },
  ]
  const PIPKPLPP_PWM = [
    {
      id: '1. ',
      key: `Dengan ini SAYA dan/atau Calon Tertanggung dan/atau Calon Pembayar Premi dan/atau Calon Penerima Manfaat yang diwakilkan oleh SAYA:`
    },
    {
      subid: '',
      subkey: `Menyatakan telah membaca, mendapat penjelasan dari Tenaga Pemasar, memahami dan menyetujui serta memberikan izin kepada Prudential Indonesia untuk mengumpulkan, menyimpan, memproses, mempergunakan dan membagikan Data Pribadi (termasuk namun tidak terbatas pada nama, alamat surat menyurat, alamat e-mail, nomor telepon, kontak, data kesehatan maupun informasi lainnya) yang SAYA berikan dalam SPAJ ini dan dokumen lainnya sehubungan dengan pengajuan asuransi ini, serta informasi terkait Polis SAYA jika pengajuan ini disetujui, sesuai dengan kebijakan internal Prudential Indonesia maupun peraturan perundang-undangan yang berlaku untuk keperluan:`
    },
    {
      subid: '1. ',
      subkey: `Pemrosesan pengajuan permohonan Polis asuransi;`
    },
    {
      subid: '2. ',
      subkey: `Pemeriksaan Kesehatan dan riwayat keuangan;`
    },
    {
      subid: '3. ',
      subkey: `Akses terhadap catatan kesehatan di fasilitas pelayanan kesehatan dan tenaga kesehatan;`
    },
    {
      subid: '4. ',
      subkey: `Pelayanan Polis dan/atau klaim (diantaranya cetak dokumen, pengiriman dokumen melalui kurir, Third Party Administrator/TPA, Rumah Sakit/klinik/tenaga medis rekanan maupun bukan rekanan, call center yang bekerja sama dengan Penanggung, investigator klaim, penyelidik, lembaga/perusahaan di bidang jasa keuangan maupun layanan informasi keuangan atau perusahaan terkait lainnya);`
    },
    {
      subid: '5. ',
      subkey: `Pembayaran Premi dan/atau klaim;`
    },
    {
      subid: '6. ',
      subkey: `Reasuransi;`
    },
    {
      subid: '7. ',
      subkey: `Penyimpanan dokumen;`
    },
    {
      subid: '8. ',
      subkey: `Penyelesaian Sengketa dan Proses Investigasi, termasuk namun tidak terbatas pada pengacara;`
    },
    {
      subid: '9. ',
      subkey: `Pengembangan produk (seperti riset pemasaran, survei, teknologi, penelitian dan analisa statistik);`
    },
    {
      subid: '10. ',
      subkey: `Perhitungan aktuaria;`
    },
    {
      subid: '11. ',
      subkey: `Dana Investasi (seperti manajer investasi, Bank Kustodian) berikut pengelolaannya;`
    },
    {
      subid: '12. ',
      subkey: `Auditor Eksternal maupun penasihat/konsultan profesional;`
    },
    {
      subid: '13. ',
      subkey: `Mitra bisnis maupun pihak yang memasarkan produk asuransi (diantaranya Tenaga Pemasar (termasuk dalam hal pengalihan Tenaga Pemasar dan pihak lain yang terkait dengan Tenaga Pemasar), rekanan bank, badan usaha selain bank, pialang asuransi);`
    },
    {
      subid: '14. ',
      subkey: `Perusahaan dan/atau pihak terkait yang terafiliasi dengan Penanggung (seperti Grup Prudential), termasuk dukungan layanan dari atau antar Grup Prudential;`
    },
    {
      subid: '15. ',
      subkey: `Otoritas pemerintah, asosiasi, aparat penegak hukum;`
    },
    {
      subid: '16. ',
      subkey: `Pelaksanaan administrasi produk dan layanan (berikut pemenuhan kewajiban kontraktual) maupun penyelenggaraan kegiatan dari Prudential Indonesia kepada SAYA dari waktu ke waktu.`
    },
    {
      id: '',
      key: `Adapun rincian mengenai tujuan pemrosesan Data Pribadi maupun pihak lain yang dapat memperoleh dan/atau memproses Data Pribadi untuk menunjang keperluan di atas dapat dilakukan:`
    },
    {
      id: '',
      key: `• \tPengkinian secara berkala dari waktu ke waktu dan dapat diakses pada https://bit.ly/PRUPihakKetiga`,
      url: true,
    },
    {
      id: '',
      key: `• \tInformasi lebih lanjut terkait Pemberitahuan Privasi Prudential Indonesia dapat diakses pada https://bit.ly/PRUPemberitahuanPrivasi`,
      url: true,
    },
    {
      id: '',
      key: `Anda diwajibkan membaca pada 2 link di atas untuk dapat menyetujui pertanyaan ini.`,
      redBg: true,
    },
  ]
  const PIPKPLPP_PWMS = [
    {
      id: '1. ',
      key: `Dengan ini SAYA dan/atau Calon Peserta Yang Diasuransikan dan/atau Calon Pembayar Kontribusi dan/atau Calon Penerima Manfaat yang diwakilkan oleh SAYA:`
    },
    {
      subid: '',
      subkey: `Menyatakan telah membaca, mendapat penjelasan dari Tenaga Pemasar, memahami dan menyetujui serta memberikan izin kepada Prudential Syariah untuk mengumpulkan, menyimpan, memproses, mempergunakan dan membagikan Data Pribadi (termasuk namun tidak terbatas pada nama, alamat surat menyurat, alamat e-mail, nomor telepon, kontak, data kesehatan maupun informasi lainnya) yang SAYA berikan dalam SPAJ Syariah ini dan dokumen lainnya sehubungan dengan pengajuan asuransi ini, serta informasi terkait Polis SAYA jika pengajuan ini disetujui, sesuai dengan kebijakan internal Prudential Syariah maupun peraturan perundang-undangan yang berlaku untuk keperluan:`
    },
    {
      subid: '1. ',
      subkey: `Pemrosesan pengajuan permohonan Polis asuransi;`
    },
    {
      subid: '2. ',
      subkey: `Pemeriksaan Kesehatan dan riwayat keuangan;`
    },
    {
      subid: '3. ',
      subkey: `Akses terhadap catatan kesehatan di fasilitas pelayanan kesehatan dan tenaga kesehatan;`
    },
    {
      subid: '4. ',
      subkey: `Pelayanan Polis dan/atau klaim (diantaranya cetak dokumen, pengiriman dokumen melalui kurir, Third Party Administrator/TPA, Rumah Sakit/klinik/tenaga medis rekanan maupun bukan rekanan, call center yang bekerja sama dengan Pengelola, investigator klaim, penyelidik, lembaga/perusahaan di bidang jasa keuangan maupun layanan informasi keuangan atau perusahaan terkait lainnya);`
    },
    {
      subid: '5. ',
      subkey: `Pembayaran Kontribusi dan/atau klaim;`
    },
    {
      subid: '6. ',
      subkey: `Reasuransi;`
    },
    {
      subid: '7. ',
      subkey: `Penyimpanan dokumen;`
    },
    {
      subid: '8. ',
      subkey: `Penyelesaian Sengketa dan Proses Investigasi, termasuk namun tidak terbatas pada pengacara;`
    },
    {
      subid: '9. ',
      subkey: `Pengembangan produk (seperti riset pemasaran, survei, teknologi, penelitian dan analisa statistik);`
    },
    {
      subid: '10. ',
      subkey: `Perhitungan aktuaria;`
    },
    {
      subid: '11. ',
      subkey: `Dana Investasi (seperti manajer investasi, Bank Kustodian) berikut pengelolaannya;`
    },
    {
      subid: '12. ',
      subkey: `Auditor Eksternal maupun penasihat/konsultan profesional;`
    },
    {
      subid: '13. ',
      subkey: `Mitra bisnis maupun pihak yang memasarkan produk asuransi (diantaranya Tenaga Pemasar (termasuk dalam hal pengalihan Tenaga Pemasar dan pihak lain yang terkait dengan Tenaga Pemasar), rekanan bank, badan usaha selain bank, pialang asuransi);`
    },
    {
      subid: '14. ',
      subkey: `Perusahaan dan/atau pihak terkait yang terafiliasi dengan Pengelola (seperti Grup Prudential), termasuk dukungan layanan dari atau antar Grup Prudential;`
    },
    {
      subid: '15. ',
      subkey: `Otoritas pemerintah, asosiasi, aparat penegak hukum;`
    },
    {
      subid: '16. ',
      subkey: `Pelaksanaan administrasi produk dan layanan (berikut pemenuhan kewajiban kontraktual) maupun penyelenggaraan kegiatan dari Prudential Syariah kepada SAYA dari waktu ke waktu.`
    },
    {
      id: '',
      key: `Adapun rincian mengenai tujuan pemrosesan Data Pribadi maupun pihak lain yang dapat memperoleh dan/atau memproses Data Pribadi untuk menunjang keperluan di atas dapat dilakukan:`
    },
    {
      id: '',
      key: `• \tPengkinian secara berkala dari waktu ke waktu dan dapat diakses pada https://bit.ly/PRUSyariahPihakKetiga`,
      url: true,
    },
    {
      id: '',
      key: `• \tInformasi lebih lanjut terkait Pemberitahuan Privasi Prudential Syariah dapat diakses pada https://bit.ly/PRUSyariahPemberitahuanPrivasi`,
      url: true,
    },
    {
      id: '',
      key: `Anda diwajibkan membaca pada 2 link di atas untuk dapat menyetujui pertanyaan ini.`,
      redBg: true,
    },
  ]
  const PIPKPLPP_PCB88 = [
    {
      id: "1.",
      key: "Dengan ini SAYA dan/atau Calon Peserta Yang Diasuransikan dan/atau Calon Pembayar Kontribusi dan/atau Calon Penerima Manfaat yang diwakilkan oleh SAYA:"
    },
    {
      id: "",
      key: "Menyatakan telah membaca, mendapat penjelasan dari Tenaga Pemasar, memahami dan menyetujui serta memberikan izin kepada Prudential Syariah untuk mengumpulkan, menyimpan, memproses, mempergunakan dan membagikan Data Pribadi (termasuk namun tidak terbatas pada nama, alamat surat menyurat, alamat E-mail, nomor telepon, kontak, data kesehatan maupun informasi lainnya) yang SAYA berikan dalam SPAJ Syariah ini dan dokumen lainnya sehubungan dengan pengajuan asuransi ini, serta informasi terkait Polis SAYA jika pengajuan ini disetujui, sesuai dengan kebijakan internal Prudential Syariah maupun peraturan perundang-undangan yang berlaku untuk keperluan:"
    },
    {
      subid: "1. ",
      subkey: "Pemrosesan pengajuan permohonan Polis asuransi;",
    },
    {
      subid: "2. ",
      subkey: "Pemeriksaan Kesehatan dan riwayat keuangan;"
    },
    {
      subid: "3. ",
      subkey: "Akses terhadap catatan kesehatan di fasilitas pelayanan kesehatan dan tenaga kesehatan"
    },
    {
      subid: "4. ",
      subkey: "Pelayanan Polis dan/atau klaim (diantaranya cetak dokumen, pengiriman dokumen melalui kurir, <i>Third Party Administrator</i>/TPA, Rumah Sakit/klinik/tenaga medis rekanan maupun bukan rekanan, <i>call center</i> yang bekerja sama dengan Pengelola, <i>investigator</i> klaim, penyelidik, lembaga/perusahaan di bidang jasa keuangan maupun layanan informasi keuangan atau perusahaan terkait lainnya);"
    },
    {
      subid: "5. ",
      subkey: "Pembayaran Kontribusi dan/atau klaim;"
    },
    {
      subid: "6. ",
      subkey: "Reasuransi;"
    },
    {
      subid: "7. ",
      subkey: "Penyimpanan dokumen;"
    },
    {
      subid: "8. ",
      subkey: "Penyelesaian Sengketa dan Proses Investigasi, termasuk namun tidak terbatas pada pengacara;"
    },
    {
      subid: "9. ",
      subkey: "Pengembangan produk (seperti riset pemasaran, survei, teknologi, penelitian dan analisa statistik);"
    },
    {
      subid: "10. ",
      subkey: "Perhitungan aktuaria;"
    },
    {
      subid: "11. ",
      subkey: "Dana Investasi (seperti manajer investasi, Bank Kustodian) berikut pengelolaannya;"
    },
    {
      subid: "12. ",
      subkey: "<i>Auditor Eksternal</i> maupun penasihat/konsultan profesional;"
    },
    {
      subid: "13. ",
      subkey: "Mitra bisnis maupun pihak yang memasarkan produk asuransi (diantaranya Tenaga Pemasar (termasuk dalam hal pengalihan Tenaga Pemasar dan pihak lain yang terkait dengan Tenaga Pemasar), rekanan bank, badan usaha selain bank, pialang asuransi);"
    },
    {
      subid: "14. ",
      subkey: "Perusahaan dan/atau pihak terkait yang terafiliasi dengan Pengelola (seperti Grup Prudential), termasuk dukungan layanan dari atau antar Grup Prudential;"
    },
    {
      subid: "15. ",
      subkey: "Otoritas pemerintah, asosiasi, aparat penegak hukum;"
    },
    {
      subid: "16. ",
      subkey: "Pelaksanaan administrasi produk dan layanan (berikut pemenuhan kewajiban kontraktual) maupun penyelenggaraan kegiatan dari Prudential Syariah kepada SAYA dari waktu ke waktu."
    },
    {
      id: "",
      key: "Adapun rincian mengenai tujuan pemrosesan Data Pribadi maupun pihak lain yang dapat memperoleh dan/atau memproses Data Pribadi untuk menunjang keperluan di atas dapat dilakukan:"
    },
    {
      subid: "",
      subkey: "- Pengkinian secara berkala dari waktu ke waktu dan dapat diakses pada https://bit.ly/PRUSyariahPihakKetiga",
      url: true
    },
    {
      subid: "",
      subkey: "- Informasi lebih lanjut terkait Pemberitahuan Privasi Prudential Syariah dapat diakses pada https://bit.ly/PRUSyariahPemberitahuanPrivasi",
      url: true
    }
  ];
  const PIPKPLPP_PRUFUTURE = [
    {
      id: '1. ',
      key: 'Dengan ini SAYA dan/atau Calon Tertanggung dan/atau Calon Pembayar Premi: Menyatakan telah membaca, mendapat penjelasan dari Tenaga Pemasar, memahami dan menyetujui serta memberikan izin kepada Prudential Indonesia untuk mengumpulkan, menyimpan, memproses dan mempergunakan data Pribadi (termasuk namun tidak terbatas pada nama, alamat surat menyurat, alamat E-mail, nomor telepon rumah, nomor Handphone dan lainnya) yang SAYA berikan dalam SPAJ ini dan dokumen lainnya sehubungan dengan pengajuan asuransi ini, serta informasi terkait Polis SAYA jika pengajuan ini disetujui, sesuai dengan ketentuan Undang-Undang untuk keperluan:',
    },
    {
      subid: '1. ',
      subkey: 'Pemrosesan pengajuan permohonan polis asuransi;',
    },
    {
      subid: '2. ',
      subkey: 'Pemeriksaan Kesehatan;',
    },
    {
      subid: '3. ',
      subkey: 'Akses terhadap catatan kesehatan di fasilitas pelayanan kesehatan.',
    },
    {
      subid: '4. ',
      subkey:
        'Pelayanan polis dan/atau klaim (termasuk namun tidak terbatas pada pencetakan dokumen, kurir pengiriman, Third PartyAdministrator/TPA, Rumah Sakit rekanan maupun bukan rekanan, call center yang bekerja sama dengan Penanggung, investigator klaim, perusahaan lainnya);',
    },
    {
      subid: '5. ',
      subkey: 'Pembayaran Premi dan/atau klaim;',
    },
    {
      subid: '6. ',
      subkey: 'Sharing data dengan reasuransi;',
    },
    {
      subid: '7. ',
      subkey: 'Penyimpanan dokumen;',
    },
    {
      subid: '8. ',
      subkey: 'Penyelesaian Sengketa & Proses Investigasi;',
    },
    {
      subid: '9. ',
      subkey: 'Pengembangan produk (seperti riset pemasaran);',
    },
    {
      subid: '10. ',
      subkey: 'Perhitungan Aktuaria;',
    },
    {
      subid: '11. ',
      subkey: 'Dana Investasi (seperti manajer investasi, Bank Kustodian);',
    },
    {
      subid: '12. ',
      subkey: 'Auditor Eksternal;',
    },
    {
      subid: '13. ',
      subkey:
        'Tenaga pemasar (termasuk dalam hal pengalihan tenaga pemasar dan pihak lain yang terkait dengan tenaga pemasar);',
    },
    {
      subid: '14. ',
      subkey: 'Perusahaan dan/atau pihak terkait yang terafiliasi dengan Penanggung (seperti Grup Prudential);',
    },
    {
      subid: '15. ',
      subkey:
        'Badan Regulasi dan Penegak Hukum;',
    },
    {
      id: "",
      key: "Adapun detail dari pihak lain yang dapat memperoleh data pribadi untuk menunjang keperluan di atas yang dapat dilakukan:"
    },
    {
      subid: "",
      subkey: "- Pengkinian secara berkala dari waktu ke waktu dan dapat diakses pada https://bit.ly/PRUPihakKetiga",
      url: true
    },
    {
      subid: "",
      subkey: "- Informasi lebih lanjut terkait Kebijakan Privasi Prudential Indonesia dapat diakses pada https://bit.ly/PRUKebijakanPrivasi",
      url: true
    },
    {
      id: '2. ',
      key: 'SAYA dan/atau Calon Tertanggung dan/atau Calon Pembayar Premi bersedia menerima penawaran produk lainnya (yang tidak berhubungan dengan produk yang SAYA miliki) dari Prudential Indonesia melalui sarana komunikasi pribadi, baik yang dilakukan sendiri oleh Prudential Indonesia maupun oleh pihak ketiga yang ditunjuk oleh Prudential Indonesia? Tidak',
    },
  ];
  const PIPKPLPP_PRUANUGRAH = [
    {
      id: "1.",
      key: "Dengan ini SAYA dan/atau Calon Peserta Yang Diasuransikan dan/atau Calon Pembayar Kontribusi dan/atau Calon Penerima Manfaat yang diwakilkan oleh SAYA:"
    },
    {
      id: "",
      key: "Menyatakan telah membaca, mendapat penjelasan dari Tenaga Pemasar, memahami dan menyetujui serta memberikan izin kepada Prudential Syariah untuk mengumpulkan, menyimpan, memproses, mempergunakan dan membagikan Data Pribadi (termasuk namun tidak terbatas pada nama, alamat surat menyurat, alamat E-mail, nomor telepon, kontak, data kesehatan maupun informasi lainnya) yang SAYA berikan dalam SPAJ Syariah ini dan dokumen lainnya sehubungan dengan pengajuan asuransi ini, serta informasi terkait Polis SAYA jika pengajuan ini disetujui, sesuai dengan kebijakan internal Prudential Syariah maupun peraturan perundang-undangan yang berlaku untuk keperluan:"
    },
    {
      subid: "1. ",
      subkey: "Pemrosesan pengajuan permohonan Polis asuransi;",
    },
    {
      subid: "2. ",
      subkey: "Pemeriksaan Kesehatan dan riwayat keuangan;"
    },
    {
      subid: "3. ",
      subkey: "Akses terhadap catatan kesehatan di fasilitas pelayanan kesehatan dan tenaga kesehatan"
    },
    {
      subid: "4. ",
      subkey: "Pelayanan Polis dan/atau klaim (diantaranya cetak dokumen, pengiriman dokumen melalui kurir, <i>Third Party Administrator</i>/TPA, Rumah Sakit/klinik/tenaga medis rekanan maupun bukan rekanan, <i>call center</i> yang bekerja sama dengan Pengelola, <i>investigator</i> klaim, penyelidik, lembaga/perusahaan di bidang jasa keuangan maupun layanan informasi keuangan atau perusahaan terkait lainnya);"
    },
    {
      subid: "5. ",
      subkey: "Pembayaran Kontribusi dan/atau klaim;"
    },
    {
      subid: "6. ",
      subkey: "Reasuransi;"
    },
    {
      subid: "7. ",
      subkey: "Penyimpanan dokumen;"
    },
    {
      subid: "8. ",
      subkey: "Penyelesaian Sengketa dan Proses Investigasi, termasuk namun tidak terbatas pada pengacara;"
    },
    {
      subid: "9. ",
      subkey: "Pengembangan produk (seperti riset pemasaran, survei, teknologi, penelitian dan analisa statistik);"
    },
    {
      subid: "10. ",
      subkey: "Perhitungan aktuaria;"
    },
    {
      subid: "11. ",
      subkey: "Dana Investasi (seperti manajer investasi, Bank Kustodian) berikut pengelolaannya;"
    },
    {
      subid: "12. ",
      subkey: "<i>Auditor Eksternal</i> maupun penasihat/konsultan profesional;"
    },
    {
      subid: "13. ",
      subkey: "Mitra bisnis maupun pihak yang memasarkan produk asuransi (diantaranya Tenaga Pemasar (termasuk dalam hal pengalihan Tenaga Pemasar dan pihak lain yang terkait dengan Tenaga Pemasar), rekanan bank, badan usaha selain bank, pialang asuransi);"
    },
    {
      subid: "14. ",
      subkey: "Perusahaan dan/atau pihak terkait yang terafiliasi dengan Pengelola (seperti Grup Prudential), termasuk dukungan layanan dari atau antar Grup Prudential;"
    },
    {
      subid: "15. ",
      subkey: "Otoritas pemerintah, asosiasi, aparat penegak hukum;"
    },
    {
      subid: "16. ",
      subkey: "Pelaksanaan administrasi produk dan layanan (berikut pemenuhan kewajiban kontraktual) maupun penyelenggaraan kegiatan dari Prudential Syariah kepada SAYA dari waktu ke waktu."
    },
    {
      id: "",
      key: "Adapun rincian mengenai tujuan pemrosesan Data Pribadi maupun pihak lain yang dapat memperoleh dan/atau memproses Data Pribadi untuk menunjang keperluan di atas dapat dilakukan:"
    },
    {
      subid: "",
      subkey: "- Pengkinian secara berkala dari waktu ke waktu dan dapat diakses pada https://bit.ly/PRUSyariahPihakKetiga",
      url: true
    },
    {
      subid: "",
      subkey: "- Informasi lebih lanjut terkait Pemberitahuan Privasi Prudential Syariah dapat diakses pada https://bit.ly/PRUSyariahPemberitahuanPrivasi",
      url: true
    }
  ]
  const PIPKPLPP_PSKKS = [
    {
      id: "1.",
      key: "Dengan ini SAYA dan/atau Calon Peserta Yang Diasuransikan dan/atau Calon Pembayar Kontribusi dan/atau Calon Penerima Manfaat yang diwakilkan oleh SAYA:"
    },
    {
      id: "",
      key: "Menyatakan telah membaca, mendapat penjelasan dari Tenaga Pemasar, memahami dan menyetujui serta memberikan izin kepada Prudential Syariah untuk mengumpulkan, menyimpan, memproses, mempergunakan dan membagikan Data Pribadi (termasuk namun tidak terbatas pada nama, alamat surat menyurat, alamat E-mail, nomor telepon, kontak, data kesehatan maupun informasi lainnya) yang SAYA berikan dalam SPAJ Syariah ini dan dokumen lainnya sehubungan dengan pengajuan asuransi ini, serta informasi terkait Polis SAYA jika pengajuan ini disetujui, sesuai dengan kebijakan internal Prudential Syariah maupun peraturan perundang-undangan yang berlaku untuk keperluan:"
    },
    {
      subid: "1. ",
      subkey: "Pemrosesan pengajuan permohonan Polis asuransi;",
    },
    {
      subid: "2. ",
      subkey: "Pemeriksaan Kesehatan dan riwayat keuangan;"
    },
    {
      subid: "3. ",
      subkey: "Akses terhadap catatan kesehatan di fasilitas pelayanan kesehatan dan tenaga kesehatan;"
    },
    {
      subid: "4. ",
      subkey: "Pelayanan Polis dan/atau klaim (diantaranya cetak dokumen, pengiriman dokumen melalui kurir, <i>Third Party Administrator</i>/TPA, Rumah Sakit/klinik/tenaga medis rekanan maupun bukan rekanan, <i>call center</i> yang bekerja sama dengan Pengelola, <i>investigator</i> klaim, penyelidik, lembaga/perusahaan di bidang jasa keuangan maupun layanan informasi keuangan atau perusahaan terkait lainnya);"
    },
    {
      subid: "5. ",
      subkey: "Pembayaran Kontribusi dan/atau klaim;"
    },
    {
      subid: "6. ",
      subkey: "Reasuransi;"
    },
    {
      subid: "7. ",
      subkey: "Penyimpanan dokumen;"
    },
    {
      subid: "8. ",
      subkey: "Penyelesaian Sengketa dan Proses Investigasi, termasuk namun tidak terbatas pada pengacara;"
    },
    {
      subid: "9. ",
      subkey: "Pengembangan produk (seperti riset pemasaran, survei, teknologi, penelitian dan analisa statistik);"
    },
    {
      subid: "10. ",
      subkey: "Perhitungan aktuaria;"
    },
    {
      subid: "11. ",
      subkey: "Dana Investasi (seperti manajer investasi, Bank Kustodian) berikut pengelolaannya;"
    },
    {
      subid: "12. ",
      subkey: "<i>Auditor Eksternal</i> maupun penasihat/konsultan profesional;"
    },
    {
      subid: "13. ",
      subkey: "Mitra bisnis maupun pihak yang memasarkan produk asuransi (diantaranya Tenaga Pemasar (termasuk dalam hal pengalihan Tenaga Pemasar dan pihak lain yang terkait dengan Tenaga Pemasar), rekanan bank, badan usaha selain bank, pialang asuransi);"
    },
    {
      subid: "14. ",
      subkey: "Perusahaan dan/atau pihak terkait yang terafiliasi dengan Pengelola (seperti Grup Prudential), termasuk dukungan layanan dari atau antar Grup Prudential;"
    },
    {
      subid: "15. ",
      subkey: "Otoritas pemerintah, asosiasi, aparat penegak hukum;"
    },
    {
      subid: "16. ",
      subkey: "Pelaksanaan administrasi produk dan layanan (berikut pemenuhan kewajiban kontraktual) maupun penyelenggaraan kegiatan dari Prudential Syariah kepada SAYA dari waktu ke waktu."
    },
    {
      id: "",
      key: "Adapun rincian mengenai tujuan pemrosesan Data Pribadi maupun pihak lain yang dapat memperoleh dan/atau memproses Data Pribadi untuk menunjang keperluan di atas dapat dilakukan:"
    },
    {
      subid: "",
      subkey: "- Pengkinian secara berkala dari waktu ke waktu dan dapat diakses pada https://bit.ly/PRUSyariahPihakKetiga",
      url: true
    },
    {
      subid: "",
      subkey: "- Informasi lebih lanjut terkait Pemberitahuan Privasi Prudential Syariah dapat diakses pada https://bit.ly/PRUSyariahPemberitahuanPrivasi",
      url: true
    }
  ]
  const PIPKPLPP_PRUCERAH = [
    {
      id: "1.",
      key: "Dengan ini SAYA dan/atau Calon Peserta Utama Yang Diasuransikan dan/atau Calon Peserta Tambahan 1 Yang Diasuransikan dan/atau Calon Pembayar Kontribusi dan/atau Calon Penerima Manfaat yang diwakilkan oleh SAYA:"
    },
    {
      id: "",
      key: "Menyatakan telah membaca, mendapat penjelasan dari Tenaga Pemasar, memahami dan menyetujui serta memberikan izin kepada Prudential Syariah untuk mengumpulkan, menyimpan, memproses, mempergunakan dan membagikan Data Pribadi (termasuk namun tidak terbatas pada nama, alamat surat menyurat, alamat E-mail, nomor telepon, kontak, data kesehatan maupun informasi lainnya) yang SAYA berikan dalam SPAJ Syariah ini dan dokumen lainnya sehubungan dengan pengajuan asuransi ini, serta informasi terkait Polis SAYA jika pengajuan ini disetujui, sesuai dengan kebijakan internal Prudential Syariah maupun peraturan perundang-undangan yang berlaku untuk keperluan:"
    },
    {
      subid: "1. ",
      subkey: "Pemrosesan pengajuan permohonan Polis asuransi;",
    },
    {
      subid: "2. ",
      subkey: "Pemeriksaan Kesehatan dan riwayat keuangan;"
    },
    {
      subid: "3. ",
      subkey: "Akses terhadap catatan kesehatan di fasilitas pelayanan kesehatan dan tenaga kesehatan"
    },
    {
      subid: "4. ",
      subkey: "Pelayanan Polis dan/atau klaim (diantaranya cetak dokumen, pengiriman dokumen melalui kurir, <i>Third Party Administrator</i>/TPA, Rumah Sakit/klinik/tenaga medis rekanan maupun bukan rekanan, <i>call center</i> yang bekerja sama dengan Pengelola, <i>investigator</i> klaim, penyelidik, lembaga/perusahaan di bidang jasa keuangan maupun layanan informasi keuangan atau perusahaan terkait lainnya);"
    },
    {
      subid: "5. ",
      subkey: "Pembayaran Kontribusi dan/atau klaim;"
    },
    {
      subid: "6. ",
      subkey: "Reasuransi;"
    },
    {
      subid: "7. ",
      subkey: "Penyimpanan dokumen;"
    },
    {
      subid: "8. ",
      subkey: "Penyelesaian Sengketa dan Proses Investigasi, termasuk namun tidak terbatas pada pengacara;"
    },
    {
      subid: "9. ",
      subkey: "Pengembangan produk (seperti riset pemasaran, survei, teknologi, penelitian dan analisa statistik);"
    },
    {
      subid: "10. ",
      subkey: "Perhitungan aktuaria;"
    },
    {
      subid: "11. ",
      subkey: "Dana Investasi (seperti manajer investasi, Bank Kustodian) berikut pengelolaannya;"
    },
    {
      subid: "12. ",
      subkey: "<i>Auditor Eksternal</i> maupun penasihat/konsultan profesional;"
    },
    {
      subid: "13. ",
      subkey: "Mitra bisnis maupun pihak yang memasarkan produk asuransi (diantaranya Tenaga Pemasar (termasuk dalam hal pengalihan Tenaga Pemasar dan pihak lain yang terkait dengan Tenaga Pemasar), rekanan bank, badan usaha selain bank, pialang asuransi);"
    },
    {
      subid: "14. ",
      subkey: "Perusahaan dan/atau pihak terkait yang terafiliasi dengan Pengelola (seperti Grup Prudential), termasuk dukungan layanan dari atau antar Grup Prudential;"
    },
    {
      subid: "15. ",
      subkey: "Otoritas pemerintah, asosiasi, aparat penegak hukum;"
    },
    {
      subid: "16. ",
      subkey: "Pelaksanaan administrasi produk dan layanan (berikut pemenuhan kewajiban kontraktual) maupun penyelenggaraan kegiatan dari Prudential Syariah kepada SAYA dari waktu ke waktu."
    },
    {
      id: "",
      key: "Adapun rincian mengenai tujuan pemrosesan Data Pribadi maupun pihak lain yang dapat memperoleh dan/atau memproses Data Pribadi untuk menunjang keperluan di atas dapat dilakukan:"
    },
    {
      subid: "",
      subkey: "- Pengkinian secara berkala dari waktu ke waktu dan dapat diakses pada https://bit.ly/PRUSyariahPihakKetiga",
      url: true
    },
    {
      subid: "",
      subkey: "- Informasi lebih lanjut terkait Pemberitahuan Privasi Prudential Syariah dapat diakses pada https://bit.ly/PRUSyariahPemberitahuanPrivasi",
      url: true
    }
  ]

  const PIPKPLPP: Record<string, any[]> = {
    U12: PIPKPLPP_PNG,
    U13: PIPKPLPP_PNGS,
    H14: PIPKPLPP_PWM,
    H15: PIPKPLPP_PWMS,
    T1P: PIPKPLPP_PCB88,
    TIQ: PIPKPLPP_PCB88,
    L1WR: PIPKPLPP_PRUFUTURE,
    L1WD: PIPKPLPP_PRUFUTURE,
    L1Q: PIPKPLPP_PRUANUGRAH,
    C16: PIPKPLPP_PSKKS,
    E1O: PIPKPLPP_PRUCERAH,
    E1OP: PIPKPLPP_PRUCERAH,
  };
  return {
    label: 'Persetujuan Pemberian Data dan/atau Informasi Pribadi Kepada Pihak Lain & Penawaran Produk',
    key: keyLabel,
    desc: PIPKPLPP[productCode] || dataList[productType],
    information,
    additionalValidation: true,
    adiitionalQuestion: true,
  };
};

//ONLY ON TRADITIONAL
export const getDeathCoverageContent = (
  policyType: TPolicyType,
  spaj: string,
  productName: string,
  insurerManager: string,
  productCode: TProductCode,
): TDisclaimerItem => {
  const { insured, mainParticipant } = WR_SHARIA_CONVENT[policyType];
  const DEATH_COVERAGE_LIST: Record<TPolicyType, TDisclaimerDescItem[]> = {
    sharia: [
      {
        id: '1. ',
        key: `Dalam hal SPAJ Syariah dan pembayaran Kontribusi untuk iuran pertama sesuai dengan frekuensi bayar yang tercantum di SPAJ Syariah/Ilustrasi PRUWell Medical Syariah (selanjutnya disebut “Kontribusi Pertama”) telah diterima oleh Pengelola, kemudian terjadi Kecelakaan yang menyebabkan Calon Peserta Yang Diasuransikan Meninggal Dunia sebelum Polis diterbitkan, maka Pengelola akan membayarkan sejumlah uang tertentu (selanjutnya disebut “Manfaat Kepesertaan”) yang diambil dari Dana <i>Tabarru’</i> kepada Calon Pemegang Polis (jika berbeda dengan Calon Peserta Yang Diasuransikan) atau Penerima Manfaat dengan jumlah sebagai berikut:`,
      },
      {
        subid: 'a. ',
        subkey: `Santunan Pemakaman sebesar Rp15.000.000.`,
      },
      {
        subid: 'b. ',
        subkey: `Santunan Dana Marhamah sebesar Rp15.000.000.`,
      },
      {
        id: '2. ',
        key: `Ketika Manfaat Kepesertaan dibayarkan Pengelola, Kontribusi Pertama yang sudah dibayarkan oleh Calon Pemegang Polis tidak akan dikembalikan. Manfaat Kepesertaan ini akan berakhir seketika pada saat (1) keputusan <i>Underwriting</i> dikeluarkan oleh Pengelola; (2) SPAJ Syariah dibatalkan oleh Calon Pemegang Polis; atau (3) 30 (tiga puluh) hari kalender sejak SPAJ Syariah terdaftar pada sistem Pengelola, mana yang lebih dahulu terjadi.`,
      },
      {
        id: '3. ',
        key: `Manfaat Kepesertaan ini tidak berlaku dalam hal Calon Peserta Yang Diasuransikan meninggal dunia dikarenakan:`,
      },
      {
        subid: 'a. ',
        subkey: `Tindakan/percobaan/dugaan bunuh diri, atau pencederaan diri oleh Calon Peserta Yang Diasuransikan, baik yang dilakukan dalam keadaan sadar atau tidak sadar, dalam keadaan sehat jiwa atau sakit jiwa dengan ketentuan bahwa tindakan tersebut dapat Pengelola simpulkan dari dokumen yang disampaikan dan diterima oleh Pengelola atas diri Calon Peserta Yang Diasuransikan;`,
      },
      {
        subid: 'b. ',
        subkey: `(1) Tindak pidana kejahatan atau percobaan tindak pidana kejahatan; atau (2) tindak pidana pelanggaran atau percobaan tindak pidana pelanggaran; yang dilakukan oleh pihak yang berhak atas Manfaat Kepesertaan ini, kecuali dibuktikan sebaliknya dengan suatu putusan pengadilan;`,
      },
      {
        subid: 'c. ',
        subkey: `Perlawanan oleh Calon Peserta Yang Diasuransikan dalam hal terjadi penahanan terhadap Calon Peserta Yang Diasuransikan atau orang lain yang dilakukan oleh pihak yang berwenang;`,
      },
      {
        subid: 'd. ',
        subkey: `Pelanggaran terhadap peraturan perundang-undangan oleh Calon Peserta Yang Diasuransikan, kecuali dibuktikan sebaliknya dengan putusan pengadilan; atau`,
      },
      {
        subid: 'e. ',
        subkey: `Hukuman mati berdasarkan putusan pengadilan.`,
      },
    ],
    conventional: [
      {
        id: '1. ',
        key: i18next.t('Epos:manfaat_meninggal_kecelakaan_01_traditional', { spaj, productName, insurerManager }),
      },
      {
        id: '2. ',
        key: i18next.t('Epos:manfaat_pertanggungan_02_traditional', { insurerManager, spaj }),
      },
      {
        id: '3. ',
        key: i18next.t('Epos:manfaat_pertanggungan_tidak_berlaku_traditional'),
      },
      {
        subid: 'a. ',
        subkey: i18next.t('Epos:manfaat_pertanggungan_tindakan_bunuh_diri_traditional', { insurerManager }),
      },
      {
        subid: 'b. ',
        subkey: i18next.t('Epos:manfaat_pertanggungan_tindak_pidana_traditional'),
      },
      {
        subid: 'c. ',
        subkey: i18next.t('Epos:manfaat_pertanggungan_perlawanan_penahanan_traditional'),
      },
      {
        subid: 'd. ',
        subkey: i18next.t('Epos:pelanggaran_peraturan_perundang_undangan_traditional'),
      },
      {
        subid: 'e. ',
        subkey: i18next.t('Epos:hukuman_mati_putusan_pengadilan_traditional'),
      },
    ],
    '': [],
  };

  const KPMMD_PWM = [
    {
      id: '1. ',
      key: `Dalam hal SPAJ dan pembayaran Premi untuk cicilan pertama sesuai dengan frekuensi bayar yang tercantum di SPAJ/Ilustrasi <b>PRU</b>Well Medical (selanjutnya disebut “Premi Pertama”) telah diterima oleh Penanggung, kemudian terjadi Kecelakaan yang menyebabkan Calon Tertanggung Meninggal Dunia sebelum Polis diterbitkan, maka Penanggung akan membayarkan sejumlah uang tertentu (selanjutnya disebut “Manfaat Pertanggungan”) kepada Calon Pemegang Polis (jika berbeda dengan Calon Tertanggung) atau Penerima Manfaat dengan jumlah Santunan Pemakaman sebesar Rp15.000.000.`,
    },
    {
      id: '2. ',
      key: `Ketika Manfaat Pertanggungan dibayarkan Penanggung, Premi Pertama yang sudah dibayarkan oleh Calon Pemegang Polis tidak akan dikembalikan. Manfaat Pertanggungan ini akan berakhir seketika pada saat (1) keputusan <i>underwriting</i> dikeluarkan oleh Penanggung; (2) SPAJ dibatalkan oleh Calon Pemegang Polis; atau (3) 30 (tiga puluh) hari kalender sejak SPAJ terdaftar pada sistem Penanggung, mana yang lebih dahulu terjadi.`,
    },
    {
      id: '3. ',
      key: `Manfaat Pertanggungan ini tidak berlaku dalam hal Calon Tertanggung meninggal dunia dikarenakan:`,
    },
    {
      subid: 'a. ',
      subkey: `Tindakan/percobaan/dugaan bunuh diri, atau pencederaan diri oleh Calon Tertanggung, baik yang dilakukan dalam keadaan sadar atau tidak sadar, dalam keadaan sehat jiwa atau sakit jiwa dengan ketentuan bahwa tindakan tersebut dapat Penanggung simpulkan dari dokumen yang disampaikan dan diterima oleh Penanggung atas diri Calon Tertanggung;`,
    },
    {
      subid: 'b. ',
      subkey: `(1) Tindak pidana kejahatan atau percobaan tindak pidana kejahatan; atau (2) tindak pidana pelanggaran atau percobaan tindak pidana pelanggaran; yang dilakukan oleh pihak yang berhak atas Manfaat Pertanggungan ini, kecuali dibuktikan sebaliknya dengan suatu putusan pengadilan;`,
    },
    {
      subid: 'c. ',
      subkey: `Perlawanan oleh Calon Tertanggung dalam hal terjadi penahanan terhadap Calon Tertanggung atau orang lain yang dilakukan oleh pihak yang berwenang;`,
    },
    {
      subid: 'd. ',
      subkey: `Pelanggaran terhadap peraturan perundang-undangan oleh Calon Tertanggung, kecuali dibuktikan sebaliknya dengan putusan pengadilan; atau`,
    },
    {
      subid: 'e. ',
      subkey: `Hukuman mati berdasarkan putusan pengadilan.`,
    },
  ]
  const KPMMD_PWMS = [
    {
      id: '1. ',
      key: `Dalam hal SPAJ Syariah dan pembayaran Kontribusi untuk iuran pertama sesuai dengan frekuensi bayar yang tercantum di SPAJ Syariah/Ilustrasi <b>PRU</b>Well Medical Syariah (selanjutnya disebut "Kontribusi Pertama") telah diterima oleh Pengelola, kemudian terjadi Kecelakaan yang menyebabkan Calon Peserta Yang Diasuransikan Meninggal Dunia sebelum Polis diterbitkan, maka Pengelola akan membayarkan sejumlah uang tertentu (selanjutnya disebut "Manfaat Kepesertaan") yang diambil dari Dana <i>Tabarru</i>' kepada Calon Pemegang Polis (jika berbeda dengan Calon Peserta Yang Diasuransikan) atau Penerima Manfaat dengan jumlah sebagai berikut:`,
    },
    {
      subid: 'a. ',
      subkey: `Santunan Pemakaman sebesar Rp15.000.000.`,
    },
    {
      subid: 'b. ',
      subkey: `Santunan Dana Marhamah sebesar Rp15.000.000.`,
    },
    {
      id: '2. ',
      key: `Ketika Manfaat Kepesertaan dibayarkan Pengelola, Kontribusi Pertama yang sudah dibayarkan oleh Calon Pemegang Polis tidak akan dikembalikan. Manfaat Kepesertaan ini akan berakhir seketika pada saat (1) keputusan <i>underwriting</i> dikeluarkan oleh Pengelola; (2) SPAJ Syariah dibatalkan oleh Calon Pemegang Polis; atau (3) 30 (tiga puluh) hari kalender sejak SPAJ Syariah terdaftar pada sistem Pengelola, mana yang lebih dahulu terjadi.`,
    },
    {
      id: '3. ',
      key: `Manfaat Kepesertaan ini tidak berlaku dalam hal Calon Peserta Yang Diasuransikan meninggal dunia dikarenakan:`,
    },
    {
      subid: 'a. ',
      subkey: `Tindakan/percobaan/dugaan bunuh diri, atau pencederaan diri oleh Calon Peserta Yang Diasuransikan, baik yang dilakukan dalam keadaan sadar atau tidak sadar, dalam keadaan sehat jiwa atau sakit jiwa dengan ketentuan bahwa tindakan tersebut dapat Pengelola simpulkan dari dokumen yang disampaikan dan diterima oleh Pengelola atas diri Calon Peserta Yang Diasuransikan;`,
    },
    {
      subid: 'b. ',
      subkey: `(1) Tindak pidana kejahatan atau percobaan tindak pidana kejahatan; atau (2) tindak pidana pelanggaran atau percobaan tindak pidana pelanggaran; yang dilakukan oleh pihak yang berhak atas Manfaat Kepesertaan ini, kecuali dibuktikan sebaliknya dengan suatu putusan pengadilan;`,
    },
    {
      subid: 'c. ',
      subkey: `Perlawanan oleh Calon Peserta Yang Diasuransikan dalam hal terjadi penahanan terhadap Calon Peserta Yang Diasuransikan atau orang lain yang dilakukan oleh pihak yang berwenang;`,
    },
    {
      subid: 'd. ',
      subkey: `Pelanggaran terhadap peraturan perundang-undangan oleh Calon Peserta Yang Diasuransikan, kecuali dibuktikan sebaliknya dengan putusan pengadilan; atau`,
    },
    {
      subid: 'e. ',
      subkey: `Hukuman mati berdasarkan putusan pengadilan.`,
    },
  ]
  const KPMMD_PRUCERAH = [
    {
      subid: '1. ',
      subkey: `Dalam hal SPAJ Syariah dan pembayaran Kontribusi untuk iuran pertama sesuai dengan frekuensi bayar yang tercantum di SPAJ Syariah/Ilustrasi ${productName} (selanjutnya disebut “Kontribusi Pertama”) telah diterima oleh Pengelola, kemudian terjadi Kecelakaan yang menyebabkan ${mainParticipant} Meninggal Dunia sebelum Polis diterbitkan, maka Pengelola akan membayarkan sejumlah uang tertentu (selanjutnya disebut “Manfaat Kepesertaan”) yang diambil dari Dana Tabarru' kepada Calon Pemegang Polis (jika berbeda dengan ${mainParticipant} atau Penerima Manfaat dengan jumlah sebagai berikut:`,
    },
    {
      termid: 'a. ',
      termkey: `Jika Santunan Asuransi Manfaat Asuransi yang diajukan di SPAJ Syariah/Ilustrasi ${productName} (selanjutnya disebut "Santunan Asuransi" atau "SA") lebih kecil dari Rp250.000.000, maka akan dibayarkan sejumlah SA tersebut; atau`,
    },
    {
      termid: 'b. ',
      termkey:
        'Jika SA lebih besar dari atau sama dengan Rp250.000.000, maka akan dibayarkan sebesar 125% (seratus dua puluh lima persen) dari Kontribusi Pertama tetapi tidak akan kurang dari Rp250.000.000.',
    },
    {
      termid: '2. ',
      subkey: i18next.t('Epos:manfaat_pertanggungan_02_traditional', { insurerManager, spaj }),
    },
    {
      subid: '3 ',
      subkey: i18next.t('Epos:manfaat_pertanggungan_tidak_berlaku_traditional'),
    },
    {
      termid: 'a. ',
      termkey: i18next.t('Epos:manfaat_pertanggungan_tindakan_bunuh_diri_traditional', { insurerManager }),
    },
    {
      termid: 'b. ',
      termkey: i18next.t('Epos:manfaat_pertanggungan_tindak_pidana_traditional'),
    },
    {
      termid: 'c. ',
      termkey: i18next.t('Epos:manfaat_pertanggungan_perlawanan_penahanan_traditional'),
    },
    {
      termid: 'd. ',
      termkey: i18next.t('Epos:pelanggaran_peraturan_perundang_undangan_traditional'),
    },
    {
      termid: 'e. ',
      termkey: i18next.t('Epos:hukuman_mati_putusan_pengadilan_traditional'),
    },
  ];
  const KPMMD_PSKKS = [
    {
      subid: '1. ',
      subkey: `Dalam hal SPAJ Syariah dan pembayaran Kontribusi untuk iuran pertama sesuai dengan frekuensi bayar yang tercantum di SPAJ Syariah/Ilustrasi PRUSolusi Kondisi Kritis Syariah (selanjutnya disebut “Kontribusi Pertama”) telah diterima oleh Pengelola, kemudian terjadi Kecelakaan yang menyebabkan Calon Peserta Yang Diasuransikan Meninggal Dunia sebelum Polis diterbitkan, maka Pengelola akan membayarkan sejumlah uang tertentu (selanjutnya disebut “Manfaat Kepesertaan”) yang diambil dari Dana Tabarru' kepada Calon Pemegang Polis (jika berbeda dengan Calon Peserta Yang Diasuransikan) atau Penerima Manfaat dengan jumlah sebagai berikut:
      Ketika Manfaat Kepesertaan dibayarkan Pengelola, Kontribusi Pertama yang sudah dibayarkan oleh Calon Pemegang Polis tidak akan dikembalikan. Manfaat Kepesertaan ini akan berakhir seketika pada saat (1) keputusan underwriting dikeluarkan oleh Pengelola; (2) SPAJ Syariah dibatalkan oleh Calon Pemegang Polis; atau (3) 30 (tiga puluh) hari kalender sejak SPAJ Syariah terdaftar pada sistem Pengelola, mana yang lebih dahulu terjadi.
      Manfaat Kepesertaan ini tidak berlaku dalam hal Calon Peserta Yang Diasuransikan meninggal dunia dikarenakan:`,
    },
    {
      termid: 'a. ',
      termkey: `Jika Santunan Asuransi Manfaat Asuransi yang diajukan di SPAJ Syariah/Ilustrasi PRUSolusi Kondisi Kritis Syariah (selanjutnya disebut "Santunan Asuransi" atau "SA") lebih kecil dari Rp250.000.000, maka akan dibayarkan sejumlah SA tersebut; atau`,
    },
    {
      termid: 'b. ',
      termkey: `Jika SA lebih besar dari atau sama dengan Rp250.000.000, maka akan dibayarkan sebesar 125% (seratus dua puluh lima persen) dari Kontribusi Pertama tetapi tidak akan kurang dari Rp250.000.000.`,
    },
    {
      termid: '2. ',
      subkey: `Ketika Manfaat Kepesertaan dibayarkan Pengelola, Kontribusi Pertama yang sudah dibayarkan oleh Calon Pemegang Polis tidak akan dikembalikan. Manfaat Kepesertaan ini akan berakhir seketika pada saat (1) keputusan underwriting dikeluarkan oleh Pengelola; (2) SPAJ Syariah dibatalkan oleh Calon Pemegang Polis; atau (3) 30 (tiga puluh) hari kalender sejak SPAJ Syariah terdaftar pada sistem Pengelola, mana yang lebih dahulu terjadi.`,
    },
    {
      subid: '3 ',
      subkey: `Manfaat Kepesertaan ini tidak berlaku dalam hal Calon Peserta Yang Diasuransikan meninggal dunia dikarenakan:`,
    },
    {
      termid: 'a. ',
      termkey: `Tindakan/percobaan/dugaan bunuh diri, atau pencederaan diri oleh Calon Peserta Yang Diasuransikan, baik yang dilakukan dalam keadaan sadar atau tidak sadar, dalam keadaan sehat jiwa atau sakit jiwa dengan ketentuan bahwa tindakan tersebut dapat  Pengelola  simpulkan  dari  dokumen  yang  disampaikan  dan  diterima  oleh  Pengelola  atas  diri  Calon  Peserta  Yang Diasuransikan;`,
    },
    {
      termid: 'b. ',
      termkey: `(1) Tindak pidana kejahatan atau percobaan tindak pidana kejahatan; atau (2) tindak pidana pelanggaran atau percobaan tindak pidana pelanggaran; yang dilakukan oleh pihak yang berhak atas Manfaat Kepesertaan ini, kecuali dibuktikan sebaliknya dengan suatu putusan pengadilan;`,
    },
    {
      termid: 'c. ',
      termkey: `Perlawanan oleh Calon Peserta Yang Diasuransikan dalam hal terjadi penahanan terhadap Calon Peserta Yang Diasuransikan atau orang lain yang dilakukan oleh pihak yang berwenang;`,
    },
    {
      termid: 'd. ',
      termkey: `Pelanggaran terhadap peraturan perundang-undangan oleh Calon Peserta Yang Diasuransikan, kecuali dibuktikan sebaliknya dengan putusan pengadilan; atau`,
    },
    {
      termid: 'e. ',
      termkey: `Hukuman mati berdasarkan putusan pengadilan.`,
    },
  ];
  const KPMMD_PCB88 = [
    {
      id: '1. ',
      key: 'Dalam hal SPAJ dan pembayaran Premi untuk cicilan pertama sesuai dengan frekuensi bayar yang tercantum di SPAJ/Ilustrasi PRUCritical Benefit 88 (selanjutnya disebut “Premi Pertama”) atau pembayaran Premi Tunggal telah diterima oleh Penanggung, kemudian terjadi Kecelakaan yang menyebabkan Calon Tertanggung Meninggal Dunia sebelum Polis diterbitkan, maka Penanggung akan membayarkan sejumlah uang tertentu (selanjutnya disebut “Manfaat Pertanggungan”) kepada Calon Pemegang Polis (jika berbeda dengan Calon Tertanggung) atau Penerima Manfaat dengan jumlah sebagai berikut:',
    },
    {
      subid: 'a. ',
      subkey:
        'Jika Uang Pertanggungan Manfaat Asuransi yang diajukan di SPAJ/Ilustrasi PRUCritical Benefit 88 (selanjutnya disebut “Uang Pertanggungan" atau "UP”) lebih kecil dari Rp250.000.000, maka akan dibayarkan sejumlah UP tersebut; atau ',
    },
    {
      subid: 'b. ',
      subkey:
        'Jika UP lebih besar dari atau sama dengan Rp250.000.000, maka akan dibayarkan sebesar 125% (seratus dua puluh lima persen) dari Premi Pertama atau Premi Tunggal tetapi tidak akan kurang dari Rp250.000.000.',
    },
    {
      id: '2. ',
      key: 'Ketika Manfaat Pertanggungan dibayarkan Penanggung, Premi Pertama atau Premi Tunggal yang sudah dibayarkan oleh Calon Pemegang Polis tidak akan dikembalikan. Manfaat Pertanggungan ini akan berakhir seketika pada saat',
    },
    {
      subid: '(1) ',
      subkey: 'keputusan underwriting dikeluarkan oleh Penanggung',
    },
    {
      subid: '(2) ',
      subkey: 'SPAJ dibatalkan oleh Calon Pemegang Polis; atau',
    },
    {
      subid: '(3) ',
      subkey:
        '30 (tiga puluh) hari kalender sejak SPAJ terdaftar pada sistem Penanggung, mana yang lebih dahulu terjadi.',
    },
    {
      id: '3. ',
      key: 'Manfaat Pertanggungan ini tidak berlaku dalam hal Calon Tertanggung meninggal dunia dikarenakan',
    },
    {
      subid: 'a. ',
      subkey:
        'Tindakan/percobaan/dugaan bunuh diri, atau pencederaan diri oleh Calon Tertanggung, baik yang dilakukan dalam keadaan sadar atau tidak sadar, dalam keadaan sehat jiwa atau sakit jiwa dengan ketentuan bahwa tindakan tersebut dapat Penanggung simpulkan dari dokumen yang disampaikan dan diterima oleh Penanggung atas diri Calon Tertanggung',
    },
    {
      subid: 'b. ',
      subkey:
        '(1) Tindak pidana kejahatan atau percobaan tindak pidana kejahatan; atau (2) tindak pidana pelanggaran atau percobaan tindak pidana pelanggaran; yang dilakukan oleh pihak yang berhak atas Manfaat Pertanggungan ini, kecuali dibuktikan sebaliknya dengan suatu putusan pengadilan;',
    },
    {
      subid: 'c. ',
      subkey:
        'Perlawanan oleh Calon Tertanggung dalam hal terjadi penahanan terhadap Calon Tertanggung atau orang lain yang dilakukan oleh pihak yang berwenang;',
    },
    {
      subid: 'd. ',
      subkey:
        'Pelanggaran terhadap peraturan perundang-undangan oleh Calon Tertanggung, kecuali dibuktikan sebaliknya dengan putusan pengadilan; atau',
    },
    {
      subid: 'e. ',
      subkey: 'Hukuman mati berdasarkan putusan pengadilan.',
    },
  ];
  const KPMMD_PRUFUTURE = [
    {
      id: '1. ',
      key: 'Dalam hal SPAJ dan pembayaran Premi untuk cicilan pertama sesuai dengan frekuensi bayar yang tercantum di SPAJ/Ilustrasi PRUFuture (selanjutnya disebut "Premi Pertama") telah diterima oleh Penanggung, kemudian terjadi Kecelakaan yang menyebabkan Calon Tertanggung Meninggal Dunia sebelum Polis diterbitkan, maka Penanggung akan membayarkan sejumlah uang tertentu (selanjutnya disebut “Manfaat Pertanggungan”) kepada Calon Pemegang Polis (jika berbeda dengan Calon Tertanggung) atau Penerima Manfaat dengan jumlah sebagai berikut:',
    },
    {
      subid: 'a. ',
      subkey:
        'Jika Uang Pertanggungan Manfaat Asuransi Dasar yang diajukan di SPAJ/Ilustrasi PRUFuture (selanjutnya disebut "Uang Pertanggungan" atau "UP") lebih kecil dari Rp250.000.000, maka akan dibayarkan sejumlah UP tersebut; atau',
    },
    {
      subid: 'b. ',
      subkey:
        'Jika UP lebih besar dari atau sama dengan Rp250.000.000, maka akan dibayarkan sebesar 125% (seratus dua puluh limapersen) dari Premi Pertama tetapi tidak akan kurang dari Rp250.000.000.',
    },
    {
      id: '2. ',
      key: 'Ketika Manfaat Pertanggungan dibayarkan Penanggung, Premi Pertama yang sudah dibayarkan oleh Calon Pemegang Polis tidak akan dikembalikan. Manfaat Pertanggungan ini akan berakhir seketika pada saat',
    },
    {
      subid: '(1) ',
      subkey: 'keputusan underwriting dikeluarkan oleh Penanggung;',
    },
    {
      subid: '(2) ',
      subkey: 'SPAJ dibatalkan oleh Calon Pemegang Polis; atau',
    },
    {
      subid: '(3) ',
      subkey: '30 (tiga puluh) hari sejak SPAJ terdaftar pada sistem Penanggung, mana yang lebih dahulu terjadi.',
    },
    {
      id: '3. ',
      key: 'Manfaat Pertanggungan ini tidak berlaku dalam hal Calon Tertanggung meninggal dunia dikarenakan:',
    },
    {
      subid: 'a. ',
      subkey:
        'Tindakan/percobaan/dugaan bunuh diri, atau pencederaan diri oleh Calon Tertanggung, baik yang dilakukan dalam keadaan sadar atau tidak sadar, dalam keadaan sehat atau menderita sakit jiwa yang dapat disimpulkan oleh Penanggung dari dokumen yang disampaikan dan diterima oleh Penanggung atas diri Calon Tertanggung;',
    },
    {
      subid: 'b. ',
      subkey:
        '(1) Tindak pidana kejahatan atau percobaan tindak pidana kejahatan; (2) tindak pidana pelanggaran atau percobaan tindak pidana pelanggaran; yang dilakukan oleh pihak yang berhak atas Manfaat Pertanggungan ini;',
    },
    {
      subid: 'c. ',
      subkey:
        'Perlawanan oleh Calon Tertanggung dalam hal terjadi penahanan terhadap Calon Tertanggung atau orang lain yang dilakukan oleh pihak yang berwenang;',
    },
    {
      subid: 'd. ',
      subkey:
        'Pelanggaran atau percobaan pelanggaran terhadap peraturan perundang-undangan yang tidak perlu dibuktikan dengan adanya suatu putusan pengadilan, yang dilakukan oleh Calon Tertanggung; atau',
    },
    {
      subid: 'e. ',
      subkey: 'Hukuman mati berdasarkan putusan pengadilan.',
    },
  ];

  const KPMMD: Record<string, any[]> = {
    H14: KPMMD_PWM,
    H15: KPMMD_PWMS,
    E1O: KPMMD_PRUCERAH,
    E1OP: KPMMD_PRUCERAH,
    C16: KPMMD_PSKKS,
    T1P: KPMMD_PCB88,
    TIQ: KPMMD_PCB88,
    L1WR: KPMMD_PRUFUTURE,
    L1WD: KPMMD_PRUFUTURE,
  };
  const label = `Ketentuan ${insured} Manfaat Meninggal Dunia Karena Kecelakaan Sebelum Polis Diterbitkan`;
  return {
    label,
    key: 'KPMMD',
    desc: KPMMD[productCode] || DEATH_COVERAGE_LIST[policyType],
    information: `D. ${label}`,
  };
};

export const notesAccountHolder = (productType: ProductType, policyType: string, currency: string, productCode: string) => {
  if (productType && policyType) {
    const list: Record<ProductType, Record<string, string[]>> = {
      UL: {
        sharia: [
          'Rekening harus atas nama Calon Pemegang Polis.',
          'Untuk seluruh pembayaran atas transaksi mengenai Polis ini, harus menggunakan rekening yang terdapat di Negara Republik Indonesia.',
          'Data rekening di atas akan digunakan sebagai rekening tujuan apabila terdapat pengembalian titipan Kontribusi dan semua transaksi keuangan lainnya, kecuali untuk pembayaran klaim meninggal dan pembayaran Kontribusi yang menggunakan autodebit rekening bank/kartu kredit.',
        ],
        conventional: [
          'Rekening harus atas nama Calon Pemegang Polis.',
          'Untuk seluruh pembayaran atas transaksi mengenai Polis ini, harus menggunakan rekening yang terdapat di Negara Republik Indonesia.',
          'Data rekening di atas akan digunakan sebagai rekening tujuan apabila terdapat pengembalian titipan Premi dan semua transaksi keuangan lainnya, kecuali untuk pembayaran klaim meninggal dan pembayaran Premi yang menggunakan autodebit rekening bank/kartu kredit.',
          currency === 'USD'
            ? 'Untuk SPAJ dalam mata uang USD, wajib memberikan data rekening dengan mata uang asing atas nama Anda'
            : '',
        ],
      },
      TRD: {
        sharia: [
          'Rekening harus atas nama Calon Pemegang Polis.',
          'Untuk seluruh pembayaran atas transaksi mengenai Polis ini, harus menggunakan rekening yang terdapat di Negara Republik Indonesia.',
          'Data rekening di atas akan digunakan sebagai rekening tujuan apabila terdapat pengembalian titipan Kontribusi dan semua transaksi keuangan lainnya, kecuali untuk pembayaran klaim meninggal dan pembayaran Kontribusi yang menggunakan autodebit rekening bank/kartu kredit.',
          'Rekening di atas akan digunakan sebagai rekening tujuan untuk mentransfer porsi <i>Surplus Underwriting</i> jika Nasabah memilih untuk mentransfer porsi <i>Surplus Underwriting</i> sebagaimana tercantum pada bagian AKAD. Apabila jumlah <i>Surplus Underwriting</i> secara ekonomis membutuhkan biaya yang lebih besar daripada yang dibagikan, maka Pengelola akan mengalokasikannya dengan mengikuti Ketentuan Polis.',
        ],
        conventional: [
          'Rekening harus atas nama Calon Pemegang Polis.',
          'Untuk seluruh pembayaran atas transaksi mengenai Polis ini, harus menggunakan rekening yang terdapat di Negara Republik Indonesia.',
          'Data rekening di atas akan digunakan sebagai rekening tujuan apabila terdapat pengembalian titipan Premi dan semua transaksi keuangan lainnya, kecuali untuk pembayaran klaim meninggal dan pembayaran Premi yang menggunakan autodebit rekening bank/kartu kredit.',
          'Rekening di atas akan digunakan sebagai rekening tujuan untuk mentransfer porsi <i>Surplus Underwriting</i> jika Nasabah memilih untuk mentransfer porsi <i>Surplus Underwriting</i> sebagaimana tercantum pada bagian AKAD. Apabila jumlah <i>Surplus Underwriting</i> secara ekonomis membutuhkan biaya yang lebih besar daripada yang dibagikan, maka Pengelola akan mengalokasikannya dengan mengikuti Ketentuan Polis.',
          currency === "USD" ? 'Untuk SPAJ dalam mata uang USD, wajib memberikan data rekening dengan mata uang asing atas nama Anda' : ''
        ],
      },
    };
    const NOTES_ACC_HOLDER_PWM = [
      'Rekening harus atas nama Calon Pemegang Polis.',
      'Untuk seluruh pembayaran atas transaksi mengenai Polis ini, harus menggunakan rekening yang terdapat di Negara Republik Indonesia.',
      'Data rekening di atas akan digunakan sebagai rekening tujuan apabila terdapat pengembalian titipan Premi dan semua transaksi keuangan lainnya, kecuali untuk pembayaran klaim meninggal dan pembayaran Premi yang menggunakan autodebit rekening bank/kartu kredit.'
    ]

    const NOTES_ACC_HOLDER_PWMS = [
      'Rekening harus atas nama Calon Pemegang Polis.',
      'Untuk seluruh pembayaran atas transaksi mengenai Polis ini, harus menggunakan rekening yang terdapat di Negara Republik Indonesia.',
      'Data rekening di atas akan digunakan sebagai rekening tujuan apabila terdapat pengembalian titipan Kontribusi Pertama dan semua transaksi keuangan lainnya, kecuali untuk pembayaran klaim meninggal dan pembayaran Kontribusi yang menggunakan autodebit rekening bank/kartu kredit.',
      'Rekening di atas akan digunakan sebagai rekening tujuan untuk mentransfer porsi <i>Surplus Underwriting</i> jika Nasabah memilih untuk mentransfer porsi <i>Surplus Underwriting</i> sebagaimana tercantum pada bagian AKAD. Apabila jumlah <i>Surplus Underwriting</i> secara ekonomis membutuhkan biaya yang lebih besar daripada yang dibagikan, maka Pengelola akan mengalokasikannya dengan mengikuti Ketentuan Polis.'
    ]

    const NOTES_ACC_HOLDER_PNG = [
      'Rekening harus atas nama Calon Pemegang Polis.',
      'Untuk semua pembayaran yang masuk dan keluar, harus menggunakan rekening yang terdapat di Negara Republik Indonesia.',
      'Data rekening di atas akan digunakan sebagai rekening tujuan apabila terdapat pengembalian Premi dan semua transaksi keuangan lainnya, kecuali untuk pembayaran klaim meninggal dan pembayaran Premi yang menggunakan autodebit rekening bank/kartu kredit.',
    ]

    const NOTES_ACC_HOLDER_PNGS = [
      'Rekening harus atas nama Calon Pemegang Polis.',
      'Untuk semua pembayaran yang masuk dan keluar, harus menggunakan rekening yang terdapat di Negara Republik Indonesia.',
      'Data rekening di atas akan digunakan sebagai rekening tujuan apabila terdapat pengembalian Kontribusi dan semua transaksi keuangan lainnya, kecuali untuk pembayaran klaim meninggal dan pembayaran Kontribusi yang menggunakan autodebit rekening bank/kartu kredit.'
    ]
    const notesAccHolder: Record<string, string[]> = {
      U12: NOTES_ACC_HOLDER_PNG,
      U13: NOTES_ACC_HOLDER_PNGS,
      H14: NOTES_ACC_HOLDER_PWM,
      H15: NOTES_ACC_HOLDER_PWMS,
    }
    const _noteAccountHolder = notesAccHolder[productCode] || list[productType][policyType]

    return _noteAccountHolder.map((item) => ({
      key: item,
    })).filter((item) => item.key);
  }
  return [{ key: '' }];
};

export const surplusUnderwritingList: Record<string, TSurplusUnderwritingItem[]> = {
  H15: [
    {
      title: 'Mentransfer Dana',
      detail: 'Mentransfer jumlah yang diterima ke Rekening Calon Pemegang Polis di Indonesia',
      key: 'transferDana',
    },
    {
      title: 'Mengembalikan Dana',
      detail: 'Mengembalikan jumlah yang diterima ke Dana <i>Tabarru’</i>',
      key: 'pengembalianDana',
    },
    {
      title: 'Mendonasikan Dana',
      detail: 'Mendonasikan jumlah yang diterima ke Dana <i>Corporate Social Responsibility</i> (CSR) Prudential Syariah',
      key: 'donasiDana',
    },
  ],
  U13: [
    {
      title: 'Mentransfer Dana',
      detail: 'Mentransfer jumlah yang diterima ke Dana Investasi SAYA',
      key: 'transferDana',
    },
    {
      title: 'Mengembalikan Dana',
      detail: 'Mengembalikan jumlah yang diterima ke Dana <i>Tabarru’</i>',
      key: 'pengembalianDana',
    },
    {
      title: 'Mendonasikan Dana',
      detail: 'Mendonasikan jumlah yang diterima ke Dana <i>Corporate Social Responsibility</i> (CSR) Prudential Syariah',
      key: 'donasiDana',
    },
  ],
};

export const surplusUnderwritingNotes: Record<string, string> = {
  H15: "Apabila Calon Pemegang Polis tidak memberikan pilihan atas kuasa di atas, maka porsi <i>surplus underwriting</i> akan dibayarkan ke Rekening Calon Pemegang Polis di Indonesia yang terdaftar di Pengelola.",
  U13: "Apabila Calon Pemegang Polis tidak memberikan pilihan atas kuasa di atas, maka porsi <i>surplus underwriting</i> akan dialokasikan ke Dana Investasi",
}

export const additionalQuestionValidation: Record<string, string> = {
  H14: 'SAYA dan/atau Calon Tertanggung dan/atau Calon Pembayar Premi menyetujui terkait informasi di atas?',
  H15: 'SAYA dan/atau Calon Peserta Yang Diasuransikan dan/atau Calon Pembayar Kontribusi dan/atau Calon Penerima Manfaat yang diwakilkan oleh SAYA. Dengan ini menyetujui terkait informasi di atas?',
  U12: 'SAYA dan/atau Calon Tertanggung dan/atau Calon Pembayar Premi menyetujui terkait informasi di atas?',
  U13: 'SAYA dan atau Calon Peserta Utama Yang Diasuransikan dan/atau Calon Peserta Tambahan 1 Yang Diasuransikan dan/atau Calon Peserta Tambahan 2 Yang Diasuransikan dan/atau Calon Pembayar Kontribusi dan/atau Calon Penerima Manfaat yang diwakilkan oleh SAYA. Dengan ini menyetujui terkait informasi di atas?',
  E1O: 'SAYA dan/atau Calon Peserta Utama Yang Diasuransikan dan/atau Calon Peserta Tambahan 1 Yang Diasuransikan dan/atau Calon Pembayar Kontribusi dan/atau Calon Penerima Manfaat yang diwakilkan oleh SAYA. Dengan ini menyetujui terkait informasi di atas?',
  E1OP: 'SAYA dan/atau Calon Peserta Utama Yang Diasuransikan dan/atau Calon Peserta Tambahan 1 Yang Diasuransikan dan/atau Calon Pembayar Kontribusi dan/atau Calon Penerima Manfaat yang diwakilkan oleh SAYA. Dengan ini menyetujui terkait informasi di atas?',
  C16: 'SAYA dan/atau Calon Peserta Yang Diasuransikan dan/atau Calon Pembayar Kontribusi dan/atau Calon Penerima Manfaat yang diwakilkan oleh SAYA. Dengan ini menyetujui terkait informasi di atas?'
}
