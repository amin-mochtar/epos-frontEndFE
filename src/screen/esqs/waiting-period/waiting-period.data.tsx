import i18n from 'i18next';



export const getWaitingPeriodList = ({ riderCode }: { riderCode: string; }) => {
  const dataWaitingPeriod = {
    H1H1: [
      {
        key: 'A',
        title: 'A',
        detail:
          'Memilih klaim tidak dikenakan Masa Tunggu Asuransi Tambahan*) dengan syarat bersedia melampirkan hasil pemeriksaan kesehatan pribadi yang dilakukan di laboratorium/RS/Klinik rekanan Medical Check Up Penanggung, seperti yang terlampir dalam tabel (selanjutnya disebut Tabel Medis Tanpa Masa Tunggu**)), dalam kurun waktu 6 (enam) bulan terakhir sejak tanggal pengajuan SPAJ/Perubahan Mayor/Pemulihan Polis, dan jika pengajuan SPAJ/Perubahan Mayor/Pemulihan Polis disetujui Penanggung maka SAYA setuju Penanggung membayarkan 25% (dua puluh lima persen) dari total klaim yang disetujui untuk pengajuan klaim yang penyebab klaimnya terjadi dalam Masa Tunggu Asuransi Tambahan*).',
      },
      {
        key: 'B',
        title: 'B',
        detail:
          'Memilih klaim tidak dikenakan Masa Tunggu Asuransi Tambahan*) dengan syarat bersedia melakukan pemeriksaan kesehatan, sesuai Tabel Medis Tanpa Masa Tunggu**) di laboratorium/RS/Klinik rekanan Medical Check Up Penanggung atas biaya (Calon) Pemegang Polis, dan jika pengajuan SPAJ/Perubahan Mayor/Pemulihan Polis disetujui Penanggung maka SAYA setuju Penanggung membayarkan 25% (dua puluh lima persen) dari total klaim yang disetujui untuk pengajuan klaim yang penyebab klaimnya terjadi dalam Masa Tunggu Asuransi Tambahan*).',
      },
      {
        key: 'C',
        title: 'C',
        detail:
          'Memilih klaim dikenakan Masa Tunggu Asuransi Tambahan*) dan tidak bersedia melakukan pemeriksaan kesehatan, jika pengajuan SPAJ/Perubahan Mayor/Pemulihan Polis disetujui Penanggung maka SAYA setuju Penanggung tidak membayarkan klaim untuk pengajuan klaim yang penyebab klaimnya terjadi dalam Masa Tunggu Asuransi Tambahan*) sesuai dengan ketentuan Polis yang berlaku.',
      },
    ],
    H161: [
      {
        key: 'A',
        title: 'A',
        detail: i18n.t('Epos:h161_wp_a'),
      },
      {
        key: 'B',
        title: 'B',
        detail: i18n.t('Epos:h161_wp_b'),
      },
      {
        key: 'C',
        title: 'C',
        detail: i18n.t('Epos:h161_wp_c'),
      },
    ],
    H165: [
      {
        key: 'A',
        title: 'A',
        detail: i18n.t('Epos:h165_wp_a'),
      },
      {
        key: 'B',
        title: 'B',
        detail: i18n.t('Epos:h165_wp_b'),
      },
      {
        key: 'C',
        title: 'C',
        detail: i18n.t('Epos:h165_wp_c'),
      },
    ],
    H171: [
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
    ],
    H1H7: [
      {
        key: 'A',
        title: 'A',
        detail:
          'Memilih klaim tidak dikenakan Masa Tunggu Asuransi Tambahan*) dengan syarat bersedia melampirkan hasil pemeriksaan kesehatan pribadi yang dilakukan di laboratorium/RS/Klinik rekanan Medical Check Up Penanggung, seperti yang terlampir dalam tabel (selanjutnya disebut Tabel Medis Tanpa Masa Tunggu**)), dalam kurun waktu 6 (enam) bulan terakhir sejak tanggal pengajuan SPAJ/Perubahan Mayor/Pemulihan Polis, dan jika pengajuan SPAJ/Perubahan Mayor/Pemulihan Polis disetujui Penanggung maka SAYA setuju Penanggung membayarkan 25% (dua puluh lima persen) dari total klaim yang disetujui untuk pengajuan klaim yang penyebab klaimnya terjadi dalam Masa Tunggu Asuransi Tambahan*).',
      },
      {
        key: 'B',
        title: 'B',
        detail:
          'Memilih klaim tidak dikenakan Masa Tunggu Asuransi Tambahan*) dengan syarat bersedia melakukan pemeriksaan kesehatan, sesuai Tabel Medis Tanpa Masa Tunggu**) di laboratorium/RS/Klinik rekanan Medical Check Up Penanggung atas biaya (Calon) Pemegang Polis, dan jika pengajuan SPAJ/Perubahan Mayor/Pemulihan Polis disetujui Penanggung maka SAYA setuju Penanggung membayarkan 25% (dua puluh lima persen) dari total klaim yang disetujui untuk pengajuan klaim yang penyebab klaimnya terjadi dalam Masa Tunggu Asuransi Tambahan*).',
      },
      {
        key: 'C',
        title: 'C',
        detail:
          'Memilih klaim dikenakan Masa Tunggu Asuransi Tambahan*) dan tidak bersedia melakukan pemeriksaan kesehatan, jika pengajuan SPAJ/Perubahan Mayor/Pemulihan Polis disetujui Penanggung maka SAYA setuju Penanggung tidak membayarkan klaim untuk pengajuan klaim yang penyebab klaimnya terjadi dalam Masa Tunggu Asuransi Tambahan*) sesuai dengan ketentuan Polis yang berlaku.',
      },
    ],
    H1H5: [
      {
        key: 'A',
        title: 'A',
        detail:
          'Memilih klaim tidak dikenakan Masa Tunggu Asuransi Tambahan*) dengan syarat bersedia melampirkan hasil pemeriksaan kesehatan pribadi yang dilakukan di laboratorium/RS/Klinik rekanan Medical Check Up Penanggung, seperti yang terlampir dalam tabel (selanjutnya disebut Tabel Medis Tanpa Masa Tunggu**)), dalam kurun waktu 6 (enam) bulan terakhir sejak tanggal pengajuan SPAJ/Perubahan Mayor/Pemulihan Polis, dan jika pengajuan SPAJ/Perubahan Mayor/Pemulihan Polis disetujui Penanggung maka SAYA setuju Penanggung membayarkan 25% (dua puluh lima persen) dari total klaim yang disetujui untuk pengajuan klaim yang penyebab klaimnya terjadi dalam Masa Tunggu Asuransi Tambahan*).',
      },
      {
        key: 'B',
        title: 'B',
        detail:
          'Memilih klaim tidak dikenakan Masa Tunggu Asuransi Tambahan*) dengan syarat bersedia melakukan pemeriksaan kesehatan, sesuai Tabel Medis Tanpa Masa Tunggu**) di laboratorium/RS/Klinik rekanan Medical Check Up Penanggung atas biaya (Calon) Pemegang Polis, dan jika pengajuan SPAJ/Perubahan Mayor/Pemulihan Polis disetujui Penanggung maka SAYA setuju Penanggung membayarkan 25% (dua puluh lima persen) dari total klaim yang disetujui untuk pengajuan klaim yang penyebab klaimnya terjadi dalam Masa Tunggu Asuransi Tambahan*).',
      },
      {
        key: 'C',
        title: 'C',
        detail:
          'Memilih klaim dikenakan Masa Tunggu Asuransi Tambahan*) dan tidak bersedia melakukan pemeriksaan kesehatan, jika pengajuan SPAJ/Perubahan Mayor/Pemulihan Polis disetujui Penanggung maka SAYA setuju Penanggung tidak membayarkan klaim untuk pengajuan klaim yang penyebab klaimnya terjadi dalam Masa Tunggu Asuransi Tambahan*) sesuai dengan ketentuan Polis yang berlaku.',
      },
    ],
    H1H3: [
      {
        key: 'A',
        title: 'A',
        detail:
          'Memilih klaim tidak dikenakan Masa Tunggu Asuransi Tambahan*) dengan syarat bersedia melampirkan hasil pemeriksaan kesehatan pribadi yang dilakukan di laboratorium/RS/Klinik rekanan Medical Check Up Penanggung, seperti yang terlampir dalam tabel (selanjutnya disebut Tabel Medis Tanpa Masa Tunggu**)), dalam kurun waktu 6 (enam) bulan terakhir sejak tanggal pengajuan SPAJ/Perubahan Mayor/Pemulihan Polis, dan jika pengajuan SPAJ/Perubahan Mayor/Pemulihan Polis disetujui Penanggung maka SAYA setuju Penanggung membayarkan 25% (dua puluh lima persen) dari total klaim yang disetujui untuk pengajuan klaim yang penyebab klaimnya terjadi dalam Masa Tunggu Asuransi Tambahan*).',
      },
      {
        key: 'B',
        title: 'B',
        detail:
          'Memilih klaim tidak dikenakan Masa Tunggu Asuransi Tambahan*) dengan syarat bersedia melakukan pemeriksaan kesehatan, sesuai Tabel Medis Tanpa Masa Tunggu**) di laboratorium/RS/Klinik rekanan Medical Check Up Penanggung atas biaya (Calon) Pemegang Polis, dan jika pengajuan SPAJ/Perubahan Mayor/Pemulihan Polis disetujui Penanggung maka SAYA setuju Penanggung membayarkan 25% (dua puluh lima persen) dari total klaim yang disetujui untuk pengajuan klaim yang penyebab klaimnya terjadi dalam Masa Tunggu Asuransi Tambahan*).',
      },
      {
        key: 'C',
        title: 'C',
        detail:
          'Memilih klaim dikenakan Masa Tunggu Asuransi Tambahan*) dan tidak bersedia melakukan pemeriksaan kesehatan, jika pengajuan SPAJ/Perubahan Mayor/Pemulihan Polis disetujui Penanggung maka SAYA setuju Penanggung tidak membayarkan klaim untuk pengajuan klaim yang penyebab klaimnya terjadi dalam Masa Tunggu Asuransi Tambahan*) sesuai dengan ketentuan Polis yang berlaku.',
      },
    ],
  };
  const data = dataWaitingPeriod[riderCode];
  return data;
};
