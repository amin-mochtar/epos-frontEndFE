import { Divider, plaiStyles, TextDecoration } from 'plai_common_frontend';
import { View, Text } from 'react-native';
import { memo } from 'react';

const INText = memo((props: { leftText?: string; text: string; }) => {
  const { leftText, text } = props;
  const styleWrapper = [plaiStyles.row, plaiStyles.mt14];

  return (
    <View style={styleWrapper}>
      {leftText && <Text style={[plaiStyles.fontGrey33Thin, plaiStyles.mr8, plaiStyles.lineH24]}>{leftText}</Text>}
      <Text style={[plaiStyles.fontGrey33Thin, plaiStyles.lineH24, plaiStyles.flexShrink]}><TextDecoration label={text} /></Text>
    </View>
  );
});

// kemungkinan bakal di buat file khusus, soalnya bakal penuh banget nanti, atau kemungkinan bakal di enhancement biar lebih ringkas, soalnya ada beberapa yang bedanya tipis2 doang. untuk sementara masih semi Dynamic dulu.
// LIBRARY WP
const BENEFITS = {
  conventional: {
    H1H1: ['A', 'B', 'C', 'D'],
    H161: ['A', 'B', 'C', 'E', 'F'],
    H1H3: ['A', 'B', 'C', 'D'],
  },
  sharia: {
    H1H7: ['A', 'B', 'C', 'D', 'E', 'F'],
    H165: ['A', 'B', 'D', 'G', 'E'],
    H1H5: ['A', 'B', 'C', 'D', 'E', 'F'],
  },
};

const LIBRARY = {
  conventional: {
    A: 'Penanggung akan melakukan penilaian risiko (<i>underwriting</i>) berdasarkan seluruh data kesehatan, tidak menutup kemungkinan dibutuhkan persyaratan pemeriksaan kesehatan tambahan/lanjutan dan/atau pengajuan Anda akan ditolak.',
    B: 'Diluar pemeriksaan kesehatan sebagaimana didefinisikan di atas, Penanggung berhak memintakan pemeriksaan kesehatan berdasarkan Tabel Pemeriksaan Kesehatan dan/atau pemeriksaan kesehatan lainnya termasuk namun tidak terbatas dengan kondisi yang telah ada sebelumnya (<i>Pre - Existing Condition</i>).',
    C: 'Jika pilihan jawaban Anda A dan jenis pemeriksaan yang dilampirkan belum memenuhi jenis pemeriksaan yang dibutuhkan, maka <i>underwriter</i> akan meminta kekurangannya dengan biaya ditanggung (Calon) Pemegang Polis.',
    D: 'Jika pilihan jawaban Anda C namun pengajuan Anda membutuhkan pemeriksaan kesehatan berdasarkan Tabel Pemeriksaan Kesehatan dan/atau pemeriksaan kesehatan lainnya termasuk namun tidak terbatas dengan kondisi yang telah ada sebelumnya (<i>Pre - Existing Condition</i>), maka <i>underwriter</i> akan tetap memintakan pemeriksaan tersebut dan Polis akan dikenakan Masa Tunggu sesuai dengan ketentuan Polis yang berlaku.',
    E: 'Jika pilihan jawaban Anda C namun pengajuan Anda membutuhkan pemeriksaan kesehatan berdasarkan Tabel Pemeriksaan Kesehatan dan/atau pemeriksaan kesehatan lainnya termasuk namun tidak terbatas pada kondisi yang telah ada sebelumnya (<i>Pre - Existing Condition</i>), maka <i>underwriter</i> akan tetap memintakan pemeriksaan tersebut dan Polis akan dikenakan Masa Tunggu Asuransi Tambahan sesuai dengan ketentuan Polis yang berlaku.',
    F: 'Pengecualian sebagaimana yang tercantum pada Polis tetap berlaku.',
  },
  sharia: {
    A: 'Pengelola akan melakukan penilaian risiko (<i>underwriting</i>) berdasarkan seluruh data kesehatan, tidak menutup kemungkinan dibutuhkan persyaratan pemeriksaan kesehatan tambahan/lanjutan dan/atau pengajuan Anda akan ditolak.',
    B: 'Diluar pemeriksaan kesehatan sebagaimana didefinisikan di atas, Pengelola berhak memintakan pemeriksaan kesehatan berdasarkan Tabel Pemeriksaan Kesehatan dan/atau pemeriksaan kesehatan lainnya termasuk namun tidak terbatas dengan kondisi yang telah ada sebelumnya (<i>Pre - Existing Condition</i>).',
    C: 'Pemeriksaan kesehatan untuk pengajuan klaim tanpa masa tunggu*) dapat berubah dari waktu ke waktu sesuai dengan ketentuan <i>underwriting</i> yang berlaku di PT Prudential Sharia Life Assurance.',
    D: 'Jika pilihan jawaban Anda adalah A dan jenis pemeriksaan yang dilampirkan belum memenuhi jenis pemeriksaan yang dibutuhkan, maka <i>underwriter</i> akan meminta kekurangannya dengan biaya ditanggung (Calon) Pemegang Polis.',
    E: 'Pengecualian sebagaimana yang tercantum pada Polis tetap berlaku.',
    F: 'Calon Peserta Utama Yang Diasuransikan termasuk Peserta Utama.',
    G: 'Jika pilihan jawaban Anda C namun pengajuan Anda membutuhkan pemeriksaan kesehatan berdasarkan Tabel Pemeriksaan Kesehatan dan/atau pemeriksaan kesehatan lainnya termasuk namun tidak terbatas pada kondisi yang telah ada sebelumnya (<i>Pre - Existing Condition</i>), maka <i>underwriter</i> akan tetap memintakan pemeriksaan tersebut dan Polis akan dikenakan Masa Tunggu sesuai dengan ketentuan Polis yang berlaku.',
  },
};

// untuk sementara mapping kyk gini dulu untuk library di atas ntar pas enchancement aja, soalnya masih banyak variable yg beda.
const TABLE_LIBRARY = {
  conventional: {
    H161: [
      [
        'Usia (Calon) Peserta Utama (Yang Diasuransikan), Usia Ulang Tahun berikutnya',
        'Jenis Kelamin',
        'Plan PRUWell Health',
        'Jenis Medis Tanpa Masa Tunggu*)',
      ],
      ['s/d ≤ 15 Tahun', 'LakiLaki / Perempuan', 'Bronze/Silver/Gold/Platinum/Diamond', 'Med 20¹)'],
      ['>15 tahun s/d ≤ 50 Tahun', 'Laki-Laki / Perempuan ', 'Bronze/Silver', 'Med 21²)'],
      ['>50 tahun', 'Perempuan ', 'Bronze/Silver', 'Med 21²)'],
      ['>50 tahun', 'Laki-Laki', 'Bronze/Silver', 'Med 22³)'],
      ['>15 tahun s/d ≤ 50 Tahun', 'Laki-Laki', 'Gold/Platinum/Diamond', 'Med 23⁴)'],
      ['>50 tahun', 'Laki-Laki', 'Gold/Platinum/Diamond', 'Med 24⁵)'],
      ['>15 tahun s/d ≤ 20 Tahun', 'Perempuan', 'Gold/Platinum/Diamond', 'Med 25⁶)'],
      ['>20 Tahun', 'Perempuan', 'Gold/Platinum/Diamond', 'Med 26⁷)'],
    ],
    H1H1: [
      [
        'Usia (Calon) Peserta Utama (Yang Diasuransikan), Usia Ulang Tahun berikutnya',
        'Jenis Kelamin',
        'Plan PRUWell Health',
        'Jenis Medis Tanpa Masa Tunggu*)',
      ],
      ['s/d ≤ 15 Tahun', 'LakiLaki / Perempuan', 'Bronze/Silver/Gold/Platinum/Diamond', 'Med 20¹'],
      ['>15 tahun s/d ≤ 50 Tahun', 'Laki-Laki / Perempuan ', 'Bronze/Silver', 'Med 21²'],
      ['>50 tahun', 'Perempuan ', 'Bronze/Silver', 'Med 21²'],
      ['>50 tahun', 'Laki-Laki', 'Bronze/Silver', 'Med 22³'],
      ['>15 tahun s/d ≤ 50 Tahun', 'Laki-Laki', 'Gold/Platinum/Diamond', 'Med 23⁴'],
      ['>50 tahun', 'Laki-Laki', 'Gold/Platinum/Diamond', 'Med 24⁵'],
      ['>15 tahun s/d ≤ 20 Tahun', 'Perempuan', 'Gold/Platinum/Diamond', 'Med 25⁶'],
      ['>20 Tahun', 'Perempuan', 'Gold/Platinum/Diamond', 'Med 26⁷'],
    ],
    H1H3: [
      [
        'Usia (Calon) Peserta Utama (Yang Diasuransikan), Usia Ulang Tahun berikutnya',
        'Jenis Kelamin',
        'Plan PRUWell Health',
        'Jenis Medis Tanpa Masa Tunggu*)',
      ],
      ['s/d ≤ 15 Tahun', 'LakiLaki / Perempuan', 'Bronze/Silver/Gold/Platinum/Diamond', 'Med 20¹'],
      ['>15 tahun s/d ≤ 50 Tahun', 'Laki-Laki / Perempuan ', 'Bronze/Silver', 'Med 21²'],
      ['>50 tahun', 'Perempuan ', 'Bronze/Silver', 'Med 21²'],
      ['>50 tahun', 'Laki-Laki', 'Bronze/Silver', 'Med 22³'],
      ['>15 tahun s/d ≤ 50 Tahun', 'Laki-Laki', 'Gold/Platinum/Diamond', 'Med 23⁴'],
      ['>50 tahun', 'Laki-Laki', 'Gold/Platinum/Diamond', 'Med 24⁵'],
      ['>15 tahun s/d ≤ 20 Tahun', 'Perempuan', 'Gold/Platinum/Diamond', 'Med 25⁶'],
      ['>20 Tahun', 'Perempuan', 'Gold/Platinum/Diamond', 'Med 26⁷'],
    ],
  },
  sharia: {
    H165: [
      [
        'Usia (Calon) Peserta Utama (Yang Diasuransikan), Usia Ulang Tahun berikutnya',
        'Jenis Kelamin',
        'Plan PRUWell Health Syariah',
        'Jenis Medis Tanpa Masa Tunggu*)',
      ],
      ['s/d = 15 Tahun', 'LakiLaki / Perempuan', 'Cermat/Bronze/Silver/Gold/Platinum/Diamond', 'Med 20¹)'],
      ['>15 tahun s/d =50 Tahun', 'Laki-Laki / Perempuan ', 'Cermat/Bronze/Silver', 'Med 21²)'],
      ['>50 tahun', 'Perempuan ', 'Cermat/Bronze/Silver', 'Med 21²)'],
      ['>50 tahun', 'Laki-Laki', 'Cermat/Bronze/Silver', 'Med 22³)'],
      ['>15 tahun s/d =50 Tahun', 'Laki-Laki', 'Gold/Platinum/Diamond', 'Med 23⁴)'],
      ['>50 tahun', 'Laki-Laki', 'Gold/Platinum/Diamond', 'Med 24⁵)'],
      ['>15 tahun s/d =20 Tahun', 'Perempuan', 'Gold/Platinum/Diamond', 'Med 25⁶)'],
      ['>20 Tahun', 'Perempuan', 'Gold/Platinum/Diamond', 'Med 26⁷)'],
    ],
    H1H7: [
      [
        'Usia (Calon) Peserta Utama (Yang Diasuransikan), Usia Ulang Tahun berikutnya',
        'Jenis Kelamin',
        'Plan PRUWell Health Syariah',
        'Jenis Medis Tanpa Masa Tunggu*)',
      ],
      ['s/d = 15 Tahun', 'LakiLaki / Perempuan', 'Cermat/Bronze/Silver/Gold/Platinum/Diamond', 'Med 20¹'],
      ['>15 tahun s/d =50 Tahun', 'Laki-Laki / Perempuan ', 'Cermat/Bronze/Silver', 'Med 21²'],
      ['>50 tahun', 'Perempuan ', 'Cermat/Bronze/Silver', 'Med 21²'],
      ['>50 tahun', 'Laki-Laki', 'Cermat/Bronze/Silver', 'Med 22³'],
      ['>15 tahun s/d =50 Tahun', 'Laki-Laki', 'Gold/Platinum/Diamond', 'Med 23⁴'],
      ['>50 tahun', 'Laki-Laki', 'Gold/Platinum/Diamond', 'Med 24⁵'],
      ['>15 tahun s/d =20 Tahun', 'Perempuan', 'Gold/Platinum/Diamond', 'Med 25⁶'],
      ['>20 Tahun', 'Perempuan', 'Gold/Platinum/Diamond', 'Med 26⁷'],
    ],
    H1H5: [
      [
        'Usia (Calon) Peserta Utama (Yang Diasuransikan), Usia Ulang Tahun berikutnya',
        'Jenis Kelamin',
        'Plan PRUWell Health Syariah',
        'Jenis Medis Tanpa Masa Tunggu*)',
      ],
      ['s/d = 15 Tahun', 'LakiLaki / Perempuan', 'Cermat/Bronze/Silver/Gold/Platinum/Diamond', 'Med 20¹'],
      ['>15 tahun s/d =50 Tahun', 'Laki-Laki / Perempuan ', 'Cermat/Bronze/Silver', 'Med 21²'],
      ['>50 tahun', 'Perempuan ', 'Cermat/Bronze/Silver', 'Med 21²'],
      ['>50 tahun', 'Laki-Laki', 'Cermat/Bronze/Silver', 'Med 22³'],
      ['>15 tahun s/d =50 Tahun', 'Laki-Laki', 'Gold/Platinum/Diamond', 'Med 23⁴'],
      ['>50 tahun', 'Laki-Laki', 'Gold/Platinum/Diamond', 'Med 24⁵'],
      ['>15 tahun s/d =20 Tahun', 'Perempuan', 'Gold/Platinum/Diamond', 'Med 25⁶'],
      ['>20 Tahun', 'Perempuan', 'Gold/Platinum/Diamond', 'Med 26⁷'],
    ],
  },
};

const NOTES_TABLE = {
  conventional: {
    H161: [
      'Medical 20: LPK',
      'Medical 21: LPK, urine, Analisa Darah lengkap (Analisa Darah Rutin, Lemak Darah, Gula Darah (Puasa & HbA1c), Tes Fungsi Ginjal, Tes Fungsi Hati, HbsAg, AFP), HIV, Rontgen thorax, Treadmill, CEA ',
      'Medical 22: LPK, urine, Analisa Darah lengkap, HIV, Rontgen thorax, Treadmill, CEA, PSA',
      'Medical 23: LPK, urine, Analisa Darah lengkap, HIV, Rontgen thorax, Treadmill, CEA, USG Abdomen',
      'Medical 24: LPK, urine, Analisa Darah lengkap, HIV, Rontgen thorax, Treadmill, CEA, USG Abdomen, PSA',
      'Medical 25: LPK, urine, Analisa Darah lengkap, HIV, Rontgen thorax, Treadmill, CEA, USG Whole Abdomen',
      'Medical 26: LPK, urine, Analisa Darah lengkap, HIV, Rontgen thorax, Treadmill, CEA, USG Whole Abdomen, USG Mammae',
    ],
    H1H1: [
      'Medical 20: LPK',
      'Medical 21: LPK, urine, Analisa Darah lengkap (Analisa Darah Rutin, Lemak Darah, Gula Darah (Puasa & HbA1c), Tes Fungsi Ginjal, Tes Fungsi Hati, HbsAg, VDRL, AFP), HIV, Rontgen thorax, Treadmill, CEA ',
      'Medical 22: LPK, urine, Analisa Darah lengkap, HIV, Rontgen thorax, Treadmill, CEA, PSA',
      'Medical 23: LPK, urine, Analisa Darah lengkap, HIV, Rontgen thorax, Treadmill, CEA, USG Abdomen',
      'Medical 24: LPK, urine, Analisa Darah lengkap, HIV, Rontgen thorax, Treadmill, CEA, USG Abdomen, PSA',
      'Medical 25: LPK, urine, Analisa Darah lengkap, HIV, Rontgen thorax, Treadmill, CEA, USG Whole Abdomen',
      'Medical 26: LPK, urine, Analisa Darah lengkap, HIV, Rontgen thorax, Treadmill, CEA, USG Whole Abdomen, USG Mammae',
    ],
    H1H3: [
      'Medical 20: LPK',
      'Medical 21: LPK, urine, Analisa Darah lengkap (Analisa Darah Rutin, Lemak Darah, Gula Darah (Puasa & HbA1c), Tes Fungsi Ginjal, Tes Fungsi Hati, HbsAg, VDRL, AFP), HIV, Rontgen thorax, Treadmill, CEA ',
      'Medical 22: LPK, urine, Analisa Darah lengkap, HIV, Rontgen thorax, Treadmill, CEA, PSA',
      'Medical 23: LPK, urine, Analisa Darah lengkap, HIV, Rontgen thorax, Treadmill, CEA, USG Abdomen',
      'Medical 24: LPK, urine, Analisa Darah lengkap, HIV, Rontgen thorax, Treadmill, CEA, USG Abdomen, PSA',
      'Medical 25: LPK, urine, Analisa Darah lengkap, HIV, Rontgen thorax, Treadmill, CEA, USG Whole Abdomen',
      'Medical 26: LPK, urine, Analisa Darah lengkap, HIV, Rontgen thorax, Treadmill, CEA, USG Whole Abdomen, USG Mammae',
    ],
  },
  sharia: {
    H1H7: [
      'Medical 20: LPK',
      'Medical 21: LPK, urine, Analisa Darah lengkap (Analisa Darah Rutin, Lemak Darah, Gula Darah (Puasa & HbA1c), Tes Fungsi Ginjal, Tes Fungsi Hati, HbsAg, VDRL, AFP), HIV, Rontgen thorax, Treadmill, CEA',
      'Medical 22: LPK, urine, Analisa Darah lengkap, HIV, Rontgen thorax, Treadmill, CEA, PSA',
      'Medical 23: LPK, urine, Analisa Darah lengkap, HIV, Rontgen thorax, Treadmill, CEA, USG Abdomen',
      'Medical 24: LPK, urine, Analisa Darah lengkap, HIV, Rontgen thorax, Treadmill, CEA, USG Abdomen, PSA',
      'Medical 25: LPK, urine, Analisa Darah lengkap, HIV, Rontgen thorax, Treadmill, CEA, USG Whole Abdomen',
      'Medical 26: LPK, urine, Analisa Darah lengkap, HIV, Rontgen thorax, Treadmill, CEA, USG Whole Abdomen, USG Mammae',
    ],
    H165: [
      'Medical 20: LPK',
      'Medical 21: LPK, urine, Analisa Darah lengkap (Analisa Darah Rutin, Lemak Darah, Gula Darah (Puasa & HbA1c), Tes Fungsi Ginjal, Tes Fungsi Hati, HbsAg, AFP), HIV, Rontgen thorax, Treadmill, CEA',
      'Medical 22: LPK, urine, Analisa Darah lengkap, HIV, Rontgen thorax, Treadmill, CEA, PSA',
      'Medical 23: LPK, urine, Analisa Darah lengkap, HIV, Rontgen thorax, Treadmill, CEA, USG Abdomen',
      'Medical 24: LPK, urine, Analisa Darah lengkap, HIV, Rontgen thorax, Treadmill, CEA, USG Abdomen, PSA',
      'Medical 25: LPK, urine, Analisa Darah lengkap, HIV, Rontgen thorax, Treadmill, CEA, USG Whole Abdomen',
      'Medical 26: LPK, urine, Analisa Darah lengkap, HIV, Rontgen thorax, Treadmill, CEA, USG Whole Abdomen, USG Mammae',
    ],
    H1H5: [
      'Medical 20: LPK',
      'Medical 21: LPK, urine, Analisa Darah lengkap (Analisa Darah Rutin, Lemak Darah, Gula Darah (Puasa & HbA1c), Tes Fungsi Ginjal, Tes Fungsi Hati, HbsAg, VDRL, AFP), HIV, Rontgen thorax, Treadmill, CEA',
      'Medical 22: LPK, urine, Analisa Darah lengkap, HIV, Rontgen thorax, Treadmill, CEA, PSA',
      'Medical 23: LPK, urine, Analisa Darah lengkap, HIV, Rontgen thorax, Treadmill, CEA, USG Abdomen',
      'Medical 24: LPK, urine, Analisa Darah lengkap, HIV, Rontgen thorax, Treadmill, CEA, USG Abdomen, PSA',
      'Medical 25: LPK, urine, Analisa Darah lengkap, HIV, Rontgen thorax, Treadmill, CEA, USG Whole Abdomen',
      'Medical 26: LPK, urine, Analisa Darah lengkap, HIV, Rontgen thorax, Treadmill, CEA, USG Whole Abdomen, USG Mammae',
    ],
  },
};

const LEGEND = {
  conventional: {
    H161: {
      ONE_STAR:
        ' Pengajuan klaim Manfaat Asuransi Tambahan PRUWell Health yang terjadi dalam 30 (tiga puluh) hari kalender dan/atau pengajuan klaim 18 (delapan belas) penyakit tertentu sebagaimana tercantum pada pengecualian Polis dalam 12 (dua belas) bulan pertama dan/atau pengajuan klaim kanker dalam 90 (sembilan puluh) hari kalender dan/atau pengajuan klaim Manfaat Santunan HIV/AIDS dalam 12 (dua belas) bulan pertama sejak Manfaat Asuransi Tambahan PRUWell Health berlaku/ditingkatkan/dipulihkan (mana yang paling akhir)',
      TWO_STAR: 'Tabel Medis Tanpa Masa Tunggu',
    },
    H1H1: {
      ONE_STAR:
        ' Pengajuan klaim Manfaat Asuransi Tambahan PRUWell Health yang terjadi dalam 30 (tiga puluh) hari kalender dan/atau pengajuan klaim 18 (delapan belas) penyakit tertentu sebagaimana tercantum pada pengecualian Polis dalam 12 (dua belas) bulan pertama dan/atau pengajuan klaim kanker dalam 90 (sembilan puluh) hari kalender dan/atau pengajuan klaim Manfaat Santunan HIV/AIDS dalam 12 (dua belas) bulan pertama sejak Manfaat Asuransi Tambahan PRUWell Health berlaku/ditingkatkan/dipulihkan (mana yang paling akhir)',
      TWO_STAR: 'Tabel Medis Tanpa Masa Tunggu',
    },
    H1H3: {
      ONE_STAR:
        ' Pengajuan klaim Manfaat Asuransi Tambahan PRUWell Health yang terjadi dalam 30 (tiga puluh) hari kalender dan/atau pengajuan klaim 18 (delapan belas) penyakit tertentu sebagaimana tercantum pada pengecualian Polis dalam 12 (dua belas) bulan pertama dan/atau pengajuan klaim kanker dalam 90 (sembilan puluh) hari kalender dan/atau pengajuan klaim Manfaat Santunan HIV/AIDS dalam 12 (dua belas) bulan pertama sejak Manfaat Asuransi Tambahan PRUWell Health berlaku/ditingkatkan/dipulihkan (mana yang paling akhir)',
      TWO_STAR: 'Tabel Medis Tanpa Masa Tunggu',
    },
  },
  sharia: {
    H1H7: {
      ONE_STAR:
        'Pengajuan klaim Rawat Inap yang terjadi dalam 30 (tiga puluh) hari dan/atau pengajuan klaim 18 (delapan belas) penyakit tertentu sebagaimana tercantum pada pengecualian Polis dalam 12 (dua belas) bulan dan/atau pengajuan klaim kanker dalam 90 hari dan/atau pengajuan klaim Manfaat Santunan HIV/AIDS dalam 12 bulan sejak tanggal Polis terbit/Penambahan/Peningkatan Manfaat Asuransi Tambahan berlaku/Pemulihan Polis.',
      TWO_STAR: 'Tabel Medis Tanpa Masa Tunggu',
      THREE_STAR:
        'Khusus Calon Pemegang Polis Badan Usaha ditandatangani oleh Pihak Berwenang dari/yang Ditunjuk oleh Calon Pemegang Polis.',
      FOUR_STAR: 'Khusus pengajuan Pemulihan Polis tidak memerlukan tanda tangan Tenaga Pemasar.',
    },
    H165: {
      ONE_STAR:
        'Pengajuan klaim Rawat Inap yang terjadi dalam 30 (tiga puluh) hari dan/atau pengajuan klaim 18 (delapan belas) penyakit tertentu sebagaimana tercantum pada pengecualian Polis dalam 12 (dua belas) bulan dan/atau pengajuan klaim kanker dalam 90 hari dan/atau pengajuan klaim Manfaat Santunan HIV/AIDS dalam 12 bulan sejak tanggal Polis terbit/Penambahan/Peningkatan Manfaat Asuransi Tambahan berlaku/Pemulihan Polis.',
      TWO_STAR: 'Tabel Medis Tanpa Masa Tunggu',
      THREE_STAR:
        'Khusus Calon Pemegang Polis Badan Usaha ditandatangani oleh Pihak Berwenang dari/yang Ditunjuk oleh Calon Pemegang Polis.',
      FOUR_STAR: 'Khusus pengajuan Pemulihan Polis tidak memerlukan tanda tangan Tenaga Pemasar.',
    },
    H1H5: {
      ONE_STAR:
        'Pengajuan klaim Rawat Inap yang terjadi dalam 30 (tiga puluh) hari dan/atau pengajuan klaim 18 (delapan belas) penyakit tertentu sebagaimana tercantum pada pengecualian Polis dalam 12 (dua belas) bulan dan/atau pengajuan klaim kanker dalam 90 hari dan/atau pengajuan klaim Manfaat Santunan HIV/AIDS dalam 12 bulan sejak tanggal Polis terbit/Penambahan/Peningkatan Manfaat Asuransi Tambahan berlaku/Pemulihan Polis.',
      TWO_STAR: 'Tabel Medis Tanpa Masa Tunggu',
      THREE_STAR:
        'Khusus Calon Pemegang Polis Badan Usaha ditandatangani oleh Pihak Berwenang dari/yang Ditunjuk oleh Calon Pemegang Polis.',
      FOUR_STAR: 'Khusus pengajuan Pemulihan Polis tidak memerlukan tanda tangan Tenaga Pemasar.',
    },
  },
};

// untuk type defined ntar aja yah, pas di enchancement
export const ImportantNotes = ({ policyType, riderCode }: { policyType: string; riderCode: string; }) => {
  const notesMap = BENEFITS[policyType][riderCode];
  const table = TABLE_LIBRARY[policyType][riderCode];
  const notesTable = NOTES_TABLE[policyType][riderCode];
  const legendMap = LEGEND[policyType][riderCode];

  return (
    <View style={[plaiStyles.bgwhite, plaiStyles.spacingp, plaiStyles.mb16]}>
      <Text style={[plaiStyles.font16, plaiStyles.fontGrey33Bold]}>Catatan Penting:</Text>
      <View style={plaiStyles.px8}>
        {notesMap &&
          notesMap.map((item, index) => {
            return <INText key={index} leftText="•" text={LIBRARY[policyType][item]} />;
          })}
      </View>
      {legendMap.ONE_STAR && <INText leftText="*)" text={legendMap['ONE_STAR']} />}
      {legendMap.TWO_STAR && <INText leftText="**)" text={legendMap['TWO_STAR']} />}
      <Divider height={16} />
      {table &&
        table.map((item, indexCol) => {
          return (
            <View key={indexCol} style={plaiStyles.row}>
              {item.map((label, indexRow) => {
                return (
                  <View
                    key={indexRow}
                    style={[
                      indexCol == 0 && plaiStyles.bgGrey,
                      plaiStyles.flex,
                      plaiStyles.flexShrink,
                      plaiStyles.alignCenter,
                      plaiStyles.justifyCenter,
                      plaiStyles.px8,
                      plaiStyles.py8,
                      plaiStyles.borderF0,
                    ]}
                  >
                    <Text
                      style={[
                        indexCol == 0 ? plaiStyles.fontGrey33Bold : plaiStyles.fontGrey33,
                        plaiStyles.font12,
                        plaiStyles.lineH18,
                      ]}
                    >
                      <TextDecoration label={label} />
                    </Text>
                  </View>
                );
              })}
            </View>
          );
        })}
      {notesTable &&
        notesTable.map((note, index) => {
          return <INText key={index} leftText={`${index + 1})`} text={note} />;
        })}
      {legendMap.THREE_STAR && <INText leftText="***)" text={legendMap['THREE_STAR']} />}
      {legendMap.FOUR_STAR && <INText leftText="****)" text={legendMap['FOUR_STAR']} />}
    </View>
  );
};
