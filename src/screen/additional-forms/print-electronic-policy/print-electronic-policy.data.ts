export const policyTerms = (premiContribution: string) => {
  return [
    {
      key: `Status Polis telah aktif (<i>inforce</i>).`,
      subKey: [],
    },
    {
      key: `Membayar biaya cetak sebesar Rp 100.000,- (seratus ribu Rupiah) bersamaan dengan pembayaran ${premiContribution} pertama. `,
      subKey: [
        {
          item: `Jika biaya cetak tidak dibayarkan bersamaan dengan ${premiContribution} pertama, maka permintaan Buku Polis Elektronik versi cetak tidak dapat kami proses. `,
        },
        {
          item: `Jika Calon Pemegang Polis tetap ingin mendapatkan Buku Polis Elektronik versi cetak, Calon Pemegang Polis dapat melampirkan Formulir Cetak Ulang (<i>Reprint</i>) atau Cetak Buku Polis Elektronik dan Kartu Manfaat Kesehatan Konvensional dengan membayar biaya cetak sebesar Rp 100.000,- (seratus ribu Rupiah) setelah Polis terbit.`,
        },
      ],
    },
    {
      key: `Buku Polis Elektronik versi cetak ini <b>bukan</b> merupakan pengganti Ringkasan Polis asli, dan Buku Polis Elektronik versi cetak ini <b>tidak berlaku</b> untuk: `,
      subKey: [
        { item: `Mengajukan/melakukan Transaksi Keuangan dan/atau` },
        { item: `Mengajukan klaim Manfaat Asuransi` },
      ],
    },
    {
      key: `Calon Pemegang Polis memiliki waktu 14 hari kalender untuk mempelajari Polis (masa mempelajari Polis) terhitung sejak Polis diterima oleh Calon Pemegang Polis atau Calon Tertanggung dengan mengikuti ketentuan Polis. `,
      subKey: [],
    },
    {
      key: `Pembayaran biaya cetak Buku Polis Elektronik versi cetak dilakukan melalui <b>PRU</b>Pay Link atau cara pembayaran lainnya.`,
      subKey: [],
    },
  ];
};

export const statementPH = (spaj: string) => {
  return [
    {
      key: `Buku Polis Elektronik versi cetak ini <b>bukan</b> merupakan pengganti Ringkasan Polis asli, dan Buku Polis Elektronik versi cetak ini <b>tidak berlaku</b> untuk: `,
      subKey: [
        { item: `Mengajukan/melakukan Transaksi Keuangan dan/atau` },
        { item: `Mengajukan klaim Manfaat Asuransi.` },
      ],
    },
    {
      key: `SAYA telah membaca dan memahami seluruh Persyaratan dan Ketentuan pencetakan Buku Polis Elektronik yang tertera pada Formulir.`,
      subKey: [],
    },
    {
      key: `Buku Polis Elektronik versi cetak akan dikirimkan ke alamat korespondensi yang tercantum pada ${spaj} ini.`,
      subKey: [],
    },
  ];
};
