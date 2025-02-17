import { CHANNEL, formatCapitalizeFirstLetter, TPolicyType, TProductCode, WR_SHARIA_CONVENT } from '../../../utilities';
import { agent_statement, getDefaultAgentStatementTRD, getDefaultAgentStatementUL } from './spaj-signature.data';
export const spajSignatureStatement = [
  {
    id: 1,
    key: `Semua keterangan yang SAYA berikan di dalam SPAJ ini dan keterangan lain yang SAYA berikan kepada PT Prudential Life Assurance (selanjutnya disebut “Penanggung”) atau Tenaga Pemasar atau kepada Pemeriksa Kesehatan yang ditunjuk oleh Penanggung dan/atau keterangan yang tertulis di dalam dokumen SPAJ tambahan, Kuesioner dan/atau dokumen lain yang menjadi kelengkapan dan tidak terpisahkan dari SPAJ ini adalah benar dan tidak ada hal-hal lain yang SAYA sembunyikan, baik yang saya ketahui maupun tidak ketahui. Semua keterangan yang SAYA berikan di dalam SPAJ (termasuk yang ditulis di dalam Surat Pernyataan/Amendemen untuk SPAJ/SPAJT/Pengajuan Pelayanan Polis) dan/atau Kuesioner (jika ada) dan yang disampaikan kepada Pemeriksa Kesehatan yang ditunjuk oleh Penanggung (jika ada) akan menjadi dasar bagi Penanggung dalam penerbitan Polis.`,
  },
  {
    id: 2,
    key: `SAYA sendiri yang melengkapi dan menandatangani SPAJ ini serta telah menerima, memahami secara mandiri, dan menyetujui lembar Ringkasan Informasi Produk dan Layanan Versi Personal (Ilustrasi) PRULink NextGen yang menjelaskan Manfaat Asuransi dan jenis Dana Investasi PRULink yang telah disampaikan oleh Tenaga Pemasar. Segala risiko pemilihan manfaat asuransi dan jenis Dana Investasi PRULink sepenuhnya menjadi tanggung jawab SAYA.`,
  },
  {
    id: 3,
    key: `SAYA telah bertemu secara langsung dengan Tenaga Pemasar, pada saat SAYA mengisi dan menandatangani penawaran produk dan SPAJ ini.`,
  },
  {
    id: 4,
    key: `SAYA memahami bahwa setelah Polis terbit, Penanggung akan menghubungi SAYA melalui telepon (“Welcome Call”) untuk mengevaluasi layanan pembelian produk ini. SAYA mengerti dan akan menerima konsekuensinya jika SAYA tidak dapat dihubungi, maka Penanggung dapat menggunakan konfirmasi pemahaman SAYA atas produk yang SAYA beli dengan merujuk pada semua dokumen yang SAYA telah konfirmasi dan tandatangani melalui sarana pengajuan SPAJ yang ada di aplikasi PRUForce ataupun sarana lain yang telah disediakan oleh Penanggung. `,
  },
  {
    id: 5,
    key: `Bahwa Penanggung berhak meminta dokumen berupa bukti penghasilan atau dokumen lainnya yang diperlukan (dan SAYA berkewajiban untuk menyampaikan dokumen tersebut kepada Penanggung) untuk memastikan kesesuaian profil SAYA dan/atau Calon Tertanggung dan/atau Calon Pembayar Premi. Dalam hal dokumen yang diperlukan tersebut tidak diterima Penanggung atau dokumen yang diperlukan tersebut mempunyai informasi yang berbeda dan/atau tidak lengkap dengan informasi yang sebelumnya diterima oleh Penanggung, maka SAYA menyetujui bahwa Penanggung berhak menangguhkan transaksi apa pun yang SAYA ajukan dengan memberikan pemberitahuan kepada SAYA. `,
  },
  {
    id: 6,
    key: `Pertanggungan tidak akan dimulai sebelum Polis diterbitkan. Jika terjadi peristiwa yang ditanggung dalam Polis sebelum tanggal Polis diterbitkan, atau SAYA tidak melengkapi persyaratan pengajuan asuransi yang diminta oleh Penanggung dalam waktu 60 (enam puluh) hari sejak SPAJ terdaftar di Kantor Pusat Penanggung, atau SAYA membatalkan pengajuan asuransi kepada Penanggung, maka Penanggung tidak berkewajiban untuk membayar manfaat apa pun.`,
  },
  {
    id: 7,
    key: `Pertanggungan akan dinilai ulang oleh Penanggung apabila terdapat pemeriksaan kesehatan yang dilakukan sebelum Polis terbit di luar pengetahuan Penanggung, yang hasilnya dapat memengaruhi/mengubah keputusan Underwriting (Seleksi Risiko) dan/atau apabila terdapat keterangan, pernyataan atau pemberitahuan yang disampaikan (termasuk pernyataan sebagaimana dimaksud dalam butir 5 di atas) ternyata keliru atau berbeda atau berubah yang sifatnya sedemikian rupa sehingga pertanggungan dan/atau Polis dapat menjadi batal dan dianggap tidak pernah berlaku dan atas hal tersebut Penanggung tidak berkewajiban membayar apa pun selain Biaya Asuransi dan Nilai Tunai (jika ada).`,
  },
  {
    id: 8,
    key: `Jika terdapat perubahan jenis Dana Investasi PRULink, alokasi Dana Investasi PRULink, besar maupun komposisi Premi, termasuk tetapi tidak terbatas pada dikenakannya keputusan tidak standar pada pengajuan asuransi SAYA, maka Tanggal Perhitungan Harga Unit menjadi Tanggal Perhitungan berikutnya setelah diterimanya pemberitahuan perubahan jenis Dana Investasi PRULink, alokasi Dana Investasi PRULink, besar maupun komposisi Premi, Surat Persetujuan Keputusan Tidak Standar atas SPAJ ini atau teridentifikasinya seluruh pembayaran Premi Pertama di Kantor Pusat Penanggung, mana yang paling akhir. `,
  },
  {
    id: 9,
    key: `Ketentuan pembentukan Unit dari Premi Pertama untuk investasi sebagaimana dijelaskan pada Poin C.3 di bawah ini otomatis menjadi batal apabila SAYA membatalkan SPAJ SAYA, atau pengajuan SPAJ SAYA dibatalkan/ditangguhkan/ditolak oleh Penanggung. Apabila dengan kebijakan khusus kemudian Penanggung setuju untuk menerbitkan Polis setelah sebelumnya SPAJ SAYA dibatalkan/ditangguhkan/ditolak oleh Penanggung, maka dengan ini SAYA menyetujui bahwa pembentukan Unit Premi Pertama untuk Investasi yang pernah dilakukan tersebut akan tetap dibatalkan dan pembentukan Unit dari Premi Pertama untuk investasi (atas dikeluarkannya kebijakan khusus tersebut) akan mengikuti Harga Unit terdekat berikutnya setelah Polis diterbitkan.`,
  },
  {
    id: 10,
    key: `Bahwa pada waktu SAYA mengajukan klaim Manfaat Asuransi, Penanggung berhak meminta bukti keabsahan hubungan keterikatan asuransi antara Pemegang Polis, Tertanggung dan Penerima Manfaat. Dalam hal hubungan antara Pemegang Polis, Tertanggung dan Penerima Manfaat terdapat perbedaan dengan yang tertulis di SPAJ ini (tidak bisa diverifikasi), Penanggung berhak meminta dokumen pendukung yang wajar dan relevan dengan pengajuan klaim.`,
  },
  {
    id: 11,
    key: `Bahwa pada waktu SAYA mengajukan klaim Manfaat Asuransi, Penanggung berhak meminta kesesuaian profil finansial SAYA dan/atau Tertanggung dan/atau Pembayar Premi. Dalam hal terdapat perbedaan pada profil finansial SAYA dan/atau Tertanggung dan/atau Pembayar Premi dengan yang tertulis di SPAJ ini (tidak bisa diverifikasi), Penanggung berhak meminta dokumen pendukung yang wajar dan relevan dengan pengajuan klaim.`,
  },
  {
    id: 12,
    key: `SAYA dan/atau Calon Tertanggung, dengan ini memberikan kuasa dan izin kepada:`,
  },
  {
    id: '',
    key: `(i) Penanggung untuk meminta catatan riwayat kesehatan Calon Tertanggung atau informasi lain mengenai diri Calon Tertanggung dari setiap tenaga medis, rumah sakit, klinik, puskesmas, laboratorium, perusahaan asuransi, perusahaan reasuransi, badan, instansi/lembaga atau pihak lain yang mempunyai catatan/informasi riwayat kesehatan atau informasi lain mengenai diri Calon Tertanggung; dan`,
  },
  {
    id: '',
    key: `(ii) Setiap tenaga medis, rumah sakit, klinik, puskesmas, laboratorium, perusahaan asuransi, perusahaan reasuransi, badan, instansi/lembaga atau pihak lain yang mempunyai catatan riwayat kesehatan atau informasi lain mengenai diri Calon Tertanggung untuk mengungkapkan atau memberikan kepada Penanggung semua catatan riwayat kesehatan, atau perawatan atau informasi lain mengenai diri Calon Tertanggung.`,
  },
  {
    id: '',
    key: `Pemberian kuasa ini tidak dapat ditarik kembali atau dibatalkan dan tetap berlaku pada waktu Calon Tertanggung masih hidup maupun sesudah meninggal dunia, maupun oleh sebab-sebab yang disebutkan dalam Pasal 1813, Pasal 1814, dan Pasal 1816 Kitab Undang-Undang Hukum Perdata Indonesia. Salinan/fotokopi dari kuasa ini memiliki kekuatan hukum yang sama dan mengikat sesuai dengan aslinya.`,
  },
  {
    id: 13,
    key: `SAYA dan Calon Tertanggung dengan ini memberikan kuasa dan izin kepada Penanggung untuk menggunakan atau memberikan informasi kesehatan atau keterangan mengenai diri Calon Tertanggung yang tersedia, diperoleh atau disimpan oleh Penanggung, kepada perusahaan asuransi, perusahaan reasuransi atau pihak-pihak lain dalam rangka pengajuan dan pembayaran klaim, maupun pelayanan nasabah.`,
  },
  {
    id: 14,
    key: `Jika ada perbedaan data antara data di Polis sebelumnya dengan data di dalam SPAJ ini, maka yang berlaku adalah data yang tertera di dalam SPAJ ini.`,
  },
  {
    id: 15,
    key: `Dalam hal SAYA membayarkan sejumlah dana ke Penanggung atas SPAJ/Polis ini, tanpa memberikan instruksi yang jelas mengenai tujuan penggunaan dana tersebut, maka Penanggung berhak mengalokasikan dana tersebut di jenis Dana Investasi PRULink yang terakhir yang tercantum di Polis. `,
  },
  {
    id: 16,
    key: `Jika SPAJ ini merupakan SPAJ pengganti, maka Premi yang telah dibayarkan pada SPAJ sebelumnya di mana SAYA dan Calon Tertanggung merupakan orang yang sama, maka secara otomatis akan dialihkan ke SPAJ ini. Dalam hal pada SPAJ sebelumnya SAYA melampirkan Surat Kuasa Pendebitan Kartu Kredit (SKPKK) atau Surat Kuasa Pendebitan Rekening (SKPR), SAYA mengerti bahwa untuk SPAJ ini, SAYA perlu melampirkan SKPKK atau SKPR baru. `,
  },
  {
    id: 17,
    key: `Premi untuk cicilan pertama sesuai dengan frekuensi bayar yang tercantum di SPAJ/Ilustrasi tidak termasuk Premi Top-up Tunggal jika ada (selanjutnya disebut “Premi Pertama” ), dibayarkan setelah pengajuan SPAJ SAYA disetujui oleh Penanggung dengan maksimum yang terakhir antara 14 (empat belas) hari atau 30 (tiga puluh) hari (sesuai besar Premi tahunan) atau 60 (enam puluh) hari kalender sejak SPAJ diterima oleh Penanggung, jika Premi Pertama belum diterima oleh Penanggung maka pengajuan SPAJ SAYA tersebut dianggap berakhir sesuai ketentuan yang berlaku di Penanggung.`,
  },
  {
    id: 18,
    key: `Pengajuan SPAJ dan persyaratan/kelengkapan dokumen yang diperlukan disetujui oleh Penanggung kemudian seluruh pembayaran Premi diterima, teridentifikasi dan terproses oleh Kantor Pusat PT Prudential Life Assurance ("Prudential Indonesia") maka, tenggat waktu untuk jenis Dana Investasi:`,
  },
  {
    key: `a. Sebelum pukul 12.00 WIB: Khusus untuk Transaksi Dana Investasi Dalam Negeri (on-shore funds). Jumlah Unit yang dibentuk akan ditentukan berdasarkan Harga Unit pada hari yang sama. Apabila persyaratan/kelengkapan pengajuan SPAJ yang diterima tidak lengkap atau formulir tidak terisi dengan lengkap dan benar, maka perhitungan Harga Unit akan mengikuti Harga Unit setelah kelengkapan dokumen terakhir diterima dan disetujui oleh Penanggung kemudian seluruh pembayaran Premi diterima, teridentifikasi dan terproses oleh Kantor Pusat Prudential Indonesia sesuai dengan ketentuan tenggat waktu yang berlaku di Prudential Indonesia.`,
  },
  {
    key: `b. Paling lambat pukul 17.00 WIB: Jumlah Unit yang dibentuk akan ditentukan berdasarkan Harga Unit pada Tanggal Perhitungan berikutnya. Apabila persyaratan/kelengkapan pengajuan SPAJ yang diterima tidak lengkap atau formulir tidak terisi dengan lengkap dan benar, maka perhitungan Harga Unit akan mengikuti Harga Unit setelah kelengkapan dokumen terakhir diterima dan disetujui oleh Penanggung kemudian seluruh pembayaran Premi diterima, teridentifikasi dan terproses oleh Kantor Pusat Prudential Indonesia sesuai dengan ketentuan tenggat waktu yang berlaku di Prudential Indonesia.`,
  },
  {
    id: 19,
    key: `SAYA memahami dan setuju bahwa Polis SAYA akan dikirimkan secara elektronik melalui E-mail yang SAYA daftarkan pada SPAJ ini setelah proses pengajuan asuransi SAYA disetujui oleh Penanggung dan SAYA akan menerima Ringkasan Polis dalam bentuk nonelektronik (cetak). `,
  },
  {
    id: 20,
    key: `Dalam kondisi di mana Polis SAYA menjadi tidak aktif (lapsed) di kemudian hari dan SAYA memilih Pemulihan Polis tanpa Masa Tunggu*), maka SAYA memahami bahwa SAYA perlu melampirkan Formulir Pemulihan Polis dan hasil pemeriksaan kesehatan terbaru beserta Formulir Persetujuan Ketentuan Masa Tunggu (“Dokumen Kelengkapan Pemulihan Polis”). Pada saat pengajuan Pemulihan Polis, nantinya SAYA dapat memilih pilihan Masa Tunggu yang berbeda dengan pilihan SAYA saat ini. Apabila SAYA melakukan pembayaran Premi tanpa disertai Dokumen Kelengkapan Pemulihan Polis dan Polis SAYA memenuhi kriteria kebijakan Pemulihan Polis secara otomatis**), maka SAYA memahami dan menyetujui bahwa pembayaran Premi tersebut merupakan bentuk persetujuan SAYA terhadap ketentuan Masa Tunggu, sehingga Polis SAYA akan dipulihkan dengan dikenakan Masa Tunggu dan SAYA memahami konsekuensi dari Masa Tunggu.*) Ketentuan Masa Tunggu dan pembayaran klaim mengacu pada Formulir Persetujuan Ketentuan Masa Tunggu yang berlaku.**) Pemulihan Polis secara otomatis merupakan kebijakan yang dapat diberikan oleh Penanggung, namun tidak mengikat dan/atau dapat berubah sewaktu-waktu. `,
  },
  {
    key: `Dengan ini Saya menyatakan bahwa Perusahaan telah memberikan penjelasan terkait Manfaat, Manfaat tambahan (jika ada yang dipilih), Biaya, Risiko, dan Fitur Tambahan termasuk adanya ketentuan pengecualian atas manfaat produk PRULink NextGen PRUPrime Healthcare Plus Pro melalui video yang saya saksikan sendiri. Saya telah mengerti dan memahami seluruh informasi tentang produk yang saya beli sesuai dengan penjelasan yang ada didalam video.`,
  },
  {
    key: `Saya juga memahami bahwa setelah polis terbit, Perusahaan akan melakukan konfirmasi kepada Saya melalui aktivitas Welcome Call terkait pertanyaan dan penjelasan mengenai produk. Saya mengerti konsekuensinya jika saya tidak dapat dihubungi, maka Perusahaan dapat menggunakan konfirmasi pemahaman saya atas produk yang saya beli dengan merujuk pada semua dokumen yang telah saya konfirmasi dan tandatangani.`,
  },
  {
    key: `Dengan memberikan tanda centang dan membubuhkan tanda tangan dibawah ini, maka SAYA menyatakan:`,
  },
];

export const agreementSignSpaj = (type: string, isPremiumPayorSPAJ?: boolean) => {
  const { spaj, premiContribution } = WR_SHARIA_CONVENT[type as TPolicyType];
  if (isPremiumPayorSPAJ)
    return [
      {
        label: '<b>SAYA telah membaca dan menyetujui informasi dan pernyataan-pernyataan di bawah ini:</b>',
        key: 'A',
      },
      {
        label: `Surat Pernyataan Asuransi Jiwa ${spaj}`,
        key: 'B',
      },
      {
        label: `Pernyataan Pembayar ${premiContribution}`,
        key: 'C',
      },
    ];
  else
    return [
      {
        label: '<b>SAYA telah membaca dan menyetujui informasi dan pernyataan-pernyataan di bawah ini:</b>',
        key: 'A',
      },
      {
        label: `Surat Pernyataan Asuransi Jiwa ${spaj}`,
        key: 'B',
      },
    ];
};

export const footerStatement = (policyType: string) => {
  const companyName: Record<string, 'Syariah' | 'Indonesia'> = {
    sharia: 'Syariah',
    conventional: 'Indonesia'
  }
  return [
    { key: `Autodebit rekening bank atau kartu kredit yang bekerja sama dengan Prudential ${companyName[policyType]}.` },
    {
      key: `Pembayaran melalui ATM, <i>Mobile</i> dan <i>Internet Banking</i>, dan Teller Bank atau Loket yang bekerja sama dengan Prudential ${companyName[policyType]}.`,
    },
    { key: '<i>E-Commerce</i>.' },
    { key: '<i>Virtual Account</i>.' },
  ]
};

export const statementMarketerSpaj = (
  type: string,
  productNameRAW: string,
  productCode?: string,
  rider?: string[] | [],
) => {
  const isSharia = type === 'sharia'
  const productName = productNameRAW.replace('PRU', '<b>PRU</b>');
  const { companyName: companyNameDefault, spaj: spajDefault, insurancePayor, lifeAssured_2, lifeAssured_3, premiContribution, companyNameShort, insurerManager, lifeAssured } = WR_SHARIA_CONVENT[type as TPolicyType];
  const productCategory = productCode ? CHANNEL[productCode]?.productCategory : '';
  const hospitalRider = ['H161', 'H1H1', 'H1H3', 'H165', 'H1H5', 'H1H7'];
  const isHospitalRiderChecked = rider?.some((item: any) => hospitalRider.includes(item));
  const spaj = isSharia ? formatCapitalizeFirstLetter(spajDefault, [1]) : spajDefault;
  const getAdditionalPerson = (index: 0 | 1 | 2) => `Calon ${lifeAssured_2} Tambahan${index === 0 ? '' : ' ' + index}${lifeAssured_3 ? ' ' + lifeAssured_3 : lifeAssured_3}`
  const companyName = isSharia ? `${companyNameDefault} (${companyNameShort})` : companyNameDefault

  const agentStatementUnitLink = agent_statement[productCode as TProductCode] || getDefaultAgentStatementUL({
    additionalPerson0: getAdditionalPerson(0),
    additionalPerson1: getAdditionalPerson(1),
    additionalPerson2: getAdditionalPerson(2),
    companyName,
    insurancePayor,
    insurerManager,
    isSharia,
    companyNameShort,
    premiContribution,
    productName,
    spaj,
  });

  const agentStatementTRD =
    agent_statement[productCode as TProductCode] ||
    getDefaultAgentStatementTRD({
      companyName,
      companyNameShort,
      insurancePayor,
      insurerManager,
      isSharia,
      lifeAssured,
      premiContribution,
      productName,
      spaj,
    });

  const additionalStatement = {
    id: '15. ',
    key: `SAYA telah memberitahukan dan memberikan penjelasan kepada Calon Pemegang Polis dan/atau Calon ${insurancePayor} dan/atau ${getAdditionalPerson(1)} dan/atau ${getAdditionalPerson(2)} mengenai pilihan Masa Tunggu beserta konsekuensinya apabila terjadi klaim dalam kurun waktu Masa Tunggu, dan Calon Pemegang Polis dan/atau Calon ${insurancePayor} dan/atau ${getAdditionalPerson(1)} dan/atau ${getAdditionalPerson(2)} telah mengerti, memahami serta menyetujui konsekuensi atas pilihan Masa Tunggu tersebut.`,
  };

  //additionalList
  if (isHospitalRiderChecked)
    agentStatementUnitLink.splice(agentStatementUnitLink.length, 0, additionalStatement);
  // check category product
  const _productCategory = productCategory === 'UL' ? agentStatementUnitLink : agentStatementTRD;
  return _productCategory;
};

export const marketersChoiceStatement = [
  {
    label: `SAYA selaku Tenaga Pemasar telah memastikan bahwa tanda tangan yang dibubuhkan oleh para pihak sebagaimana tersebut di atas telah sesuai dengan identitas diri masing-masing pihak yang SAYA unggah.`,
    key: '1',
  },
  {
    label: `Terdapat perbedaan antara tanda tangan pada dokumen identitas diri dengan aplikasi pengajuan asuransi jiwa`,
    key: '2',
  },
];
