type TDefaultAgentStatementTRDProps = {
  spaj: string;
  lifeAssured: string;
  premiContribution: string;
  insurancePayor: string;
  isSharia: boolean;
  productName: string;
  companyName: string;
  companyNameShort: string;
  insurerManager: string;
};

type TDefaultAgentStatementULProps = {
  spaj: string;
  insurancePayor: string;
  additionalPerson0: string;
  additionalPerson1: string;
  additionalPerson2: string;
  isSharia: boolean;
  productName: string;
  premiContribution: string;
  companyName: string;
  companyNameShort: string;
  insurerManager: string;
};

export const agent_statement: Record<string, Record<string, unknown>[]> = {
  H14: [
    {
      id: '1. ',
      key: 'Semua keterangan yang terdapat di SPAJ ini adalah semata-mata berdasarkan keterangan yang diberikan oleh Calon Pemegang Polis dan/atau Calon Tertanggung dan/atau Calon Pembayar Premi, dan dengan ini SAYA selaku Tenaga Pemasar menyatakan bahwa SAYA tidak mengubah, membantu, mengarahkan, memberikan rekomendasi dan/atau menyembunyikan informasi atau keterangan apa pun yang telah diberikan oleh Calon Pemegang Polis dan/atau Calon Tertanggung dan/atau Calon Pembayar Premi yang dapat memengaruhi penerimaan SPAJ ini.',
    },
    {
      id: '2. ',
      key: 'SAYA telah menerangkan semua isi butir pernyataan di SPAJ dengan benar, akurat, dan menjelaskan informasi/keterangan mengenai produk asuransi dan manfaatnya sesuai dengan Ketentuan Polis dan Ketentuan Khusus Polis, termasuk namun tidak terbatas mengenai penyampaian informasi dimana Calon Pemegang Polis dan/atau Calon Tertanggung dan/atau Calon Pembayar Premi berkewajiban untuk mengungkapkan informasi pribadi, informasi kesehatan, informasi finansial, dan/atau informasi lainnya yang dipersyaratkan dalam SPAJ dengan benar, akurat dan lengkap, beserta dengan konsekuensi yang berhak ditetapkan oleh Penanggung yang dapat berakibat pada keputusan klaim dengan mengacu pada ketentuan Polis yang berlaku dan/atau keberlangsungan Polis setelah diterbitkan.',
    },
    {
      id: '3. ',
      key: 'SAYA telah melakukan verifikasi atas data diri dan kondisi terakhir Calon Tertanggung termasuk memastikan pengisian dan penandatanganan SPAJ secara elektronik di hadapan SAYA dan/atau melalui media elektronik (<i>video call</i>) oleh Calon Pemegang Polis dan/atau Calon Tertanggung.',
    },
    {
      id: '4. ',
      key: 'SAYA mengenal Calon Pemegang Polis dan/atau Calon Tertanggung dan/atau Calon Pembayar Premi sebagai anggota keluarga/teman/referensi/<i>Public Figure</i>*/lainnya (pilih salah satu) *) Contoh: Pejabat/pejabat pemerintah, artis, politikus, dll.',
    },
    {
      id: '5. ',
      key: 'SAYA telah menerangkan, memberikan penjelasan dan memberikan informasi yang benar dan akurat mengenai produk asuransi, termasuk informasi penting terkait dengan syarat dan ketentuan Polis dan Ringkasan Informasi Produk dan Layanan Versi Umum dan Ringkasan Informasi Produk dan Layanan Versi Personal (Ilustrasi) <b>PRU</b>Well Medical kepada Calon Pemegang Polis dan/atau Calon Tertanggung dan/atau Calon Pembayar Premi.',
    },
    {
      id: '6. ',
      key: 'Dalam melakukan pemasaran produk asuransi, SAYA hanya menggunakan materi pemasaran <b>PRU</b>Well Medical (termasuk Ringkasan Informasi Produk dan Layanan Versi Umum dan Ringkasan Informasi Produk dan Layanan Versi Personal (Ilustrasi) <b>PRU</b>Well Medical) yang terbaru yang dikeluarkan secara resmi oleh PT Prudential Life Assurance.',
    },
    {
      id: '7. ',
      key: 'Seluruh proses penjualan atas produk asuransi ini SAYA lakukan dengan mengikuti dan sesuai dengan kode etik keagenan, panduan, dan peraturan yang berlaku di PT Prudential Life Assurance serta terbebas dari unsur <i>mis-selling</i>.',
    },
    {
      id: '8. ',
      key: 'SAYA mengetahui, memahami, dan menyetujui dalam hal salah satu atau lebih dari pernyataan SAYA di atas salah atau tidak benar, maka SAYA bersedia menerima Tindakan Disiplin dari PT Prudential Life Assurance sebagaimana diatur dalam Perjanjian Keagenan dan/atau Perjanjian Manajer Keagenan, serta SAYA bersedia untuk menerima segala bentuk sanksi, tindakan atau keputusan hukum baik secara perdata maupun pidana yang dikenakan kepada SAYA, walaupun hubungan keagenan SAYA dengan PT Prudential Life Assurance telah berakhir.',
    },
    {
      id: '9. ',
      key: 'SAYA telah melakukan proses identifikasi dan verifikasi terhadap identitas Calon Pemegang Polis dan/atau Calon Tertanggung dan/atau Calon Pembayar Premi.',
    },
    {
      id: '10. ',
      key: 'SAYA mengetahui kewajiban SAYA untuk setiap saat, atas permintaan PT Prudential Life Assurance (walaupun hubungan keagenan SAYA dengan PT Prudential Life Assurance telah berakhir) hadir di kantor PT Prudential Life Assurance dan/atau memberikan seluruh informasi yang SAYA miliki dengan benar kepada PT Prudential Life Assurance, atau menghadiri setiap persidangan atau panggilan pihak yang berwajib dan regulator sebagai saksi, untuk memberikan bukti, informasi mengenai nasabah, pelayanan yang SAYA berikan kepada nasabah, atau perjanjian keagenan SAYA.',
    },
    {
      id: '11. ',
      key: 'Sebelum dilakukan penutupan atas <b>PRU</b>Well Medical, SAYA telah menjelaskan secara lengkap kepada Calon Pemegang Polis.',
    },
    {
      id: '12. ',
      key: 'SAYA bukan merupakan karyawan PT Prudential Life Assurance maka untuk itu atas kesalahan, pelanggaran dan/atau tindakan yang SAYA lakukan tersebut dalam rangka pemasaran yang tidak sesuai dengan Perjanjian Keagenan, kode etik keagenan, maupun peraturan perundang-undangan yang berlaku, termasuk konsekuensi hukum baik secara perdata maupun pidana, sepenuhnya menjadi tanggung jawab SAYA pribadi.',
    },
    {
      id: '13. ',
      key: 'SAYA bertanggung jawab dan setiap saat akan menjaga kerahasiaan atas segala data dan/atau informasi data Calon Pemegang Polis dan/atau Calon Tertanggung serta perubahannya (jika ada) yang SAYA sampaikan/lengkapi di dalam SPAJ. SAYA menyatakan dengan ini bahwa data dan/atau informasi Calon Pemegang Polis dan/atau Calon Tertanggung dimaksud telah SAYA peroleh secara sah dan tidak melawan hukum. SAYA memahami dan menyetujui dan tunduk bahwa SAYA dilarang untuk memproses data Calon Pemegang Polis dan/atau Calon Tertanggung termasuk menyalin, mengubah dengan mengombinasikan data asli, menggunakan, mengirimkan data Calon Pemegang Polis dan/atau Calon Tertanggung dengan cara apa pun, kepada pihak manapun dan untuk tujuan apa pun di luar kepentingan/diperuntukan untuk PT Prudential Life Assurance dalam proses pengajuan polis ini. Sehubungan dengan pernyataan yang SAYA berikan ini, maka SAYA menjamin dan membebaskan Prudential Indonesia dari segala kewajiban, klaim, ganti rugi dan/atau tuntutan hukum yang mungkin timbul di saat ini ataupun di kemudian hari sehubungan dengan pemrosesan data pribadi yang tidak sah atau di luar keperluan PT Prudential Life Assurance.',
    },
  ],
  H15: [
    {
      id: '1. ',
      key: 'Semua keterangan yang terdapat di SPAJ Syariah ini adalah semata-mata berdasarkan keterangan yang diberikan oleh Calon Pemegang Polis dan/atau Calon Peserta Yang Diasuransikan dan/atau Calon Pembayar Kontribusi, dan dengan ini SAYA selaku Tenaga Pemasar menyatakan bahwa SAYA tidak mengubah, membantu, mengarahkan, memberikan rekomendasi dan/atau menyembunyikan informasi atau keterangan apa pun yang telah diberikan oleh Calon Pemegang Polis dan/atau Calon Peserta Yang Diasuransikan dan/atau Calon Pembayar Kontribusi yang dapat memengaruhi penerimaan SPAJ Syariah ini.',
    },
    {
      id: '2. ',
      key: 'SAYA telah menerangkan semua isi butir pernyataan di SPAJ Syariah dengan benar, akurat, dan menjelaskan informasi/keterangan mengenai produk asuransi dan manfaatnya sesuai dengan Ketentuan Polis dan Ketentuan Khusus Polis, termasuk namun tidak terbatas mengenai penyampaian informasi dimana Calon Pemegang Polis dan/atau Calon Peserta Yang Diasuransikan dan/atau Calon Pembayar Kontribusi berkewajiban untuk mengungkapkan informasi pribadi, informasi kesehatan, informasi finansial, dan/atau informasi lainnya yang dipersyaratkan dalam SPAJ Syariah dengan benar, akurat dan lengkap, beserta dengan konsekuensi yang berhak ditetapkan oleh Pengelola yang dapat berakibat pada keputusan klaim dengan mengacu pada ketentuan Polis yang berlaku dan/atau keberlangsungan Polis setelah diterbitkan.',
    },
    {
      id: '3. ',
      key: 'SAYA telah melakukan verifikasi atas data diri dan kondisi terakhir Calon Peserta Yang Diasuransikan termasuk memastikan pengisian dan penandatanganan SPAJ secara elektronik di hadapan SAYA dan/atau melalui media elektronik (<i>video call</i>) oleh Calon Pemegang Polis dan/atau Calon Peserta Yang Diasuransikan.',
    },
    {
      id: '4. ',
      key: 'SAYA mengenal Calon Pemegang Polis dan/atau Calon Peserta Yang Diasuransikan dan/atau Calon Pembayar Kontribusi sebagai anggota keluarga/teman/referensi/<i>Public Figure</i>*/lainnya (pilih salah satu). *) Contoh: Pejabat/pejabat pemerintah, artis, politikus, dll.',
    },
    {
      id: '5. ',
      key: 'SAYA telah menerangkan, memberikan penjelasan dan memberikan informasi yang benar dan akurat mengenai produk asuransi, termasuk informasi penting terkait dengan syarat dan ketentuan Polis dan Ringkasan Informasi Produk dan Layanan Versi Umum dan Ringkasan Informasi Produk dan Layanan Versi Personal (Ilustrasi) <b>PRU</b>Well Medical Syariah kepada Calon Pemegang Polis dan/atau Calon Peserta Yang Diasuransikan.',
    },
    {
      id: '6. ',
      key: 'Dalam melakukan pemasaran produk asuransi, SAYA hanya menggunakan materi pemasaran <b>PRU</b>Well Medical Syariah (termasuk Ringkasan Informasi Produk dan Layanan Versi Umum dan Ringkasan Informasi Produk dan Layanan Versi Personal (Ilustrasi) <b>PRU</b>Well Medical Syariah) yang terbaru yang dikeluarkan secara resmi oleh PT Prudential Sharia Life Assurance (Prudential Syariah).',
    },
    {
      id: '7. ',
      key: 'Seluruh proses keikutsertaan atas produk asuransi ini SAYA lakukan dengan mengikuti dan sesuai dengan kode etik keagenan, panduan, dan peraturan yang berlaku di PT Prudential Sharia Life Assurance (Prudential Syariah) serta terbebas dari unsur <i>mis-selling.</i>',
    },
    {
      id: '8. ',
      key: 'SAYA mengetahui, memahami, dan menyetujui dalam hal salah satu atau lebih dari pernyataan SAYA di atas salah atau tidak benar, maka SAYA bersedia menerima Tindakan Disiplin dari PT Prudential Sharia Life Assurance (Prudential Syariah) sebagaimana diatur dalam Perjanjian Keagenan dan/atau Perjanjian Manajer Keagenan, serta SAYA bersedia untuk menerima segala bentuk sanksi, tindakan atau keputusan hukum baik secara perdata maupun pidana yang dikenakan kepada SAYA, walaupun hubungan keagenan SAYA dengan PT Prudential Sharia Life Assurance (Prudential Syariah) telah berakhir.',
    },
    {
      id: '9. ',
      key: 'SAYA telah melakukan proses identifikasi dan verifikasi terhadap identitas Calon Pemegang Polis dan/atau Calon Peserta Yang Diasuransikan dan/atau Calon Pembayar Kontribusi.',
    },
    {
      id: '10. ',
      key: 'SAYA mengetahui kewajiban SAYA untuk setiap saat, atas permintaan PT Prudential Sharia Life Assurance (Prudential Syariah) (walaupun hubungan keagenan SAYA dengan PT Prudential Sharia Life Assurance (Prudential Syariah) telah berakhir) hadir di kantor PT Prudential Sharia Life Assurance (Prudential Syariah) dan/atau memberikan seluruh informasi yang SAYA miliki dengan benar kepada PT Prudential Sharia Life Assurance (Prudential Syariah), atau menghadiri setiap persidangan atau panggilan pihak yang berwajib dan regulator sebagai saksi, untuk memberikan bukti, informasi mengenai nasabah, pelayanan yang SAYA berikan kepada nasabah, atau perjanjian keagenan SAYA.',
    },
    {
      id: '11. ',
      key: 'Sebelum dilakukan penutupan atas <b>PRU</b>Well Medical Syariah yang ditawarkan, SAYA telah menjelaskan secara lengkap kepada Calon Pemegang Polis dan/atau Calon Peserta Yang Diasuransikan mengenai manfaat, risiko, persyaratan dan tata cara, dan biaya dari <b>PRU</b>Well Medical Syariah yang ditawarkan.',
    },
    {
      id: '12. ',
      key: 'SAYA bukan merupakan karyawan PT Prudential Sharia Life Assurance (Prudential Syariah) maka untuk itu atas kesalahan, pelanggaran dan/atau tindakan yang SAYA lakukan tersebut dalam rangka pemasaran yang tidak sesuai dengan Perjanjian Keagenan, kode etik keagenan, maupun peraturan perundang-undangan yg berlaku, termasuk konsekuensi hukum baik secara perdata maupun pidana, sepenuhnya menjadi tanggung jawab SAYA pribadi.',
    },
    {
      id: '13. ',
      key: 'SAYA bertanggung jawab dan setiap saat akan menjaga kerahasiaan atas segala data dan/atau informasi data Calon Pemegang Polis dan/atau Calon Peserta Yang Diasuransikan serta perubahannya (jika ada) yang SAYA sampaikan/lengkapi di dalam SPAJ Syariah. SAYA menyatakan dengan ini bahwa data dan/atau informasi Calon Pemegang Polis dan/atau Calon Peserta Yang Diasuransikan dimaksud telah SAYA peroleh secara sah dan tidak melawan hukum. SAYA memahami dan menyetujui dan tunduk bahwa SAYA dilarang untuk memproses data Calon Pemegang Polis dan/atau Calon Peserta Yang Diasuransikan termasuk menyalin, mengubah dengan mengombinasikan data asli, menggunakan, mengirimkan data Calon Pemegang Polis dan/atau Calon Peserta Yang Diasuransikan dengan cara apa pun, kepada pihak manapun dan untuk tujuan apa pun di luar kepentingan/diperuntukan untuk PT Prudential Sharia Life Assurance (Prudential Syariah) dalam proses pengajuan Polis ini. Sehubungan dengan pernyataan yang SAYA berikan ini, maka SAYA menjamin dan membebaskan Prudential Syariah dari segala kewajiban, klaim, ganti rugi dan/atau tuntutan hukum yang mungkin timbul di saat ini ataupun di kemudian hari sehubungan dengan pemrosesan data pribadi yang tidak sah atau di luar keperluan PT Prudential Sharia Life Assurance (Prudential Syariah).',
    },
  ],
  U12: [
    {
      id: '1. ',
      key: `Semua keterangan yang terdapat di SPAJ ini adalah semata-mata berdasarkan keterangan yang diberikan oleh Calon Pemegang Polis dan/atau Calon Tertanggung Utama dan/atau Calon Tertanggung Tambahan 1 dan/atau Calon Tertanggung Tambahan 2 (yang selanjutnya disebut Calon Tertanggung Tambahan) dan/atau Calon Pembayar Premi dan/atau Calon Pembayar Premi <i>Top-up</i> Tunggal, dan dengan ini SAYA selaku Tenaga Pemasar menyatakan bahwa SAYA tidak mengubah, membantu, mengarahkan, memberikan rekomendasi dan/atau menyembunyikan informasi atau keterangan apa pun yang telah diberikan oleh Calon Pemegang Polis dan/atau Calon Tertanggung Utama dan/atau Calon Tertanggung Tambahan 1 dan/atau Calon Tertanggung Tambahan 2 dan/atau Calon Pembayar Premi dan/atau Calon Pembayar Premi <i>Top-up</i> Tunggal yang dapat memengaruhi penerimaan SPAJ ini.`,
    },
    {
      id: '2. ',
      key: `SAYA telah menerangkan semua isi butir pernyataan di SPAJ dengan benar, akurat, dan menjelaskan informasi/keterangan mengenai produk asuransi dan manfaatnya sesuai dengan Ketentuan Umum dan Ketentuan Khusus Polis, termasuk namun tidak terbatas mengenai penyampaian informasi dimana Calon Pemegang Polis dan/atau Calon Tertanggung Utama dan/atau Calon Tertanggung Tambahan 1 dan/atau Calon Tertanggung Tambahan 2 dan/atau Calon Pembayar Premi berkewajiban untuk mengungkapkan informasi pribadi, informasi kesehatan, informasi finansial, dan/atau informasi lainnya yang dipersyaratkan dalam SPAJ dengan benar, akurat dan lengkap, beserta dengan konsekuensi yang berhak ditetapkan oleh Penanggung yang dapat berakibat pada keputusan klaim dengan mengacu pada ketentuan Polis yang berlaku dan/atau keberlangsungan Polis setelah diterbitkan.`,
    },
    {
      id: '3. ',
      key: `SAYA telah bertemu dan melihat secara langsung kondisi terakhir Calon Tertanggung Utama dan/atau Calon Tertanggung Tambahan 1 dan/atau Calon Tertanggung Tambahan 2, pada saat SPAJ ini diisi dan ditandatangani secara elektronik di hadapan SAYA oleh Calon Pemegang Polis dan/atau Calon Tertanggung Utama dan/atau Calon Tertanggung Tambahan 1 dan/atau Calon Tertanggung Tambahan 2.`,
    },
    {
      id: '4. ',
      key: 'SAYA mengenal Calon Pemegang Polis dan/atau Calon Tertanggung Utama dan/atau Calon Tertanggung Tambahan 1 dan/atau Calon Tertanggung Tambahan 2 dan/atau Calon Pembayar Premi dan/atau Calon Pembayar <i>Top-up</i> Premi Tunggal sebagai anggota keluarga/teman/referensi/<i>Public Figure</i>*/lainnya (pilih salah satu)*) Contoh: Pejabat/pejabat pemerintah, artis, politikus, dll.',
    },
    {
      id: '5. ',
      key: 'SAYA telah menerangkan, memberikan penjelasan dan memberikan informasi yang benar dan akurat mengenai produk asuransi, termasuk informasi penting terkait dengan syarat dan ketentuan Polis dan Ringkasan Informasi Produk dan Layanan Versi Umum dan Ringkasan Informasi Produk dan Layanan Versi Personal (Ilustrasi) <b>PRU</b>Link NextGen kepada Calon Pemegang Polis dan/atau Calon Tertanggung Utama dan/atau Calon Tertanggung Tambahan 1 dan/atau Calon Tertanggung Tambahan 2.',
    },
    {
      id: '6. ',
      key: 'Dalam melakukan pemasaran produk asuransi, SAYA hanya menggunakan materi pemasaran <b>PRU</b>Link NextGen (termasuk Ringkasan Informasi Produk dan Layanan Versi Umum dan Ringkasan Informasi Produk dan Layanan Versi Personal (Ilustrasi) <b>PRU</b>Link NextGen) yang terbaru yang dikeluarkan secara resmi oleh PT Prudential Life Assurance.',
    },
    {
      id: '7. ',
      key: 'Seluruh proses penjualan atas produk asuransi ini SAYA lakukan dengan mengikuti dan sesuai dengan kode etik keagenan, panduan, dan peraturan yang berlaku di PT Prudential Life Assurance serta terbebas dari unsur <i>mis-selling</i>.',
    },
    {
      id: '8. ',
      key: 'SAYA mengetahui, memahami, dan menyetujui dalam hal salah satu atau lebih dari pernyataan SAYA di atas salah atau tidak benar, maka SAYA bersedia menerima Tindakan Disiplin dari PT Prudential Life Assurance sebagaimana diatur dalam Perjanjian Keagenan dan/atau Perjanjian Manajer Keagenan, serta SAYA bersedia untuk menerima segala bentuk sanksi, tindakan atau keputusan hukum baik secara perdata maupun pidana yang dikenakan kepada SAYA, walaupun hubungan keagenan SAYA dengan PT Prudential Life Assurance telah berakhir.',
    },
    {
      id: '9. ',
      key: 'SAYA telah melakukan proses identifikasi dan verifikasi terhadap identitas Calon Pemegang Polis dan/atau Calon Tertanggung Utama dan/atau Calon Tertanggung Tambahan 1 dan/atau Calon Tertanggung Tambahan 2 dan/atau Calon Pembayar Premi dan/atau Calon Pembayar <i>Top-up</i> Premi Tunggal.',
    },
    {
      id: '10. ',
      key: 'SAYA telah memastikan bahwa Calon Pemegang Polis mengunggah rekaman suara di sarana yang disediakan oleh Penanggung dan rekaman suara tersebut dilakukan secara langsung oleh Calon Pemegang Polis menggunakan naskah dari Penanggung.',
    },
    {
      id: '11. ',
      key: 'SAYA mengetahui kewajiban SAYA untuk setiap saat, atas permintaan PT Prudential Life Assurance (walaupun hubungan keagenan SAYA dengan PT Prudential Life Assurance telah berakhir) hadir di kantor PT Prudential Life Assurance dan/atau memberikan seluruh informasi yang SAYA miliki dengan benar kepada PT Prudential Life Assurance, atau menghadiri setiap persidangan atau panggilan pihak yang berwajib dan regulator sebagai saksi, untuk memberikan bukti, informasi mengenai nasabah, Pelayanan yang SAYA berikan kepada nasabah, atau perjanjian keagenan SAYA.',
    },
    {
      id: '12. ',
      key: 'Sebelum dilakukan penutupan atas <b>PRU</b>Link NextGen, SAYA telah menjelaskan secara lengkap kepada Calon Pemegang Polis dan/atau Calon Tertanggung Utama dan/atau Calon Tertanggung Tambahan 1 dan/atau Calon Tertanggung Tambahan 2 mengenai manfaat, risiko, persyaratan dan tata cara, dan biaya dari <b>PRU</b>Link NextGen yang ditawarkan.',
    },
    {
      id: '13. ',
      key: 'SAYA bukan merupakan karyawan PT Prudential Life Assurance maka untuk itu atas kesalahan, pelanggaran dan/atau tindakan yang SAYA lakukan tersebut dalam rangka pemasaran yang tidak sesuai dengan Perjanjian Keagenan, kode etik keagenan, maupun peraturan perundang-undangan yang berlaku, termasuk konsekuensi hukum baik secara perdata maupun pidana, sepenuhnya menjadi tanggung jawab SAYA pribadi.',
    },
    {
      id: '14. ',
      key: 'SAYA bertanggung jawab dan setiap saat akan menjaga kerahasiaan atas segala data dan/atau informasi data Calon Pemegang Polis dan/atau Calon Tertanggung  Utama dan/atau Calon Tertanggung Tambahan 1 dan/atau Calon Tertanggung Tambahan 2 serta perubahannya (jika ada) yang SAYA sampaikan/lengkapi di dalam SPAJ. SAYA menyatakan dengan ini bahwa data dan/atau informasi Calon Pemegang Polis dan/atau Calon Tertanggung  Utama dan/atau Calon Tertanggung Tambahan 1 dan/atau Calon Tertanggung Tambahan 2 dimaksud telah SAYA peroleh secara sah dan tidak melawan hukum. SAYA memahami dan menyetujui dan tunduk bahwa SAYA dilarang untuk memproses data Calon Pemegang Polis dan/atau Calon Tertanggung  Utama dan/atau Calon Tertanggung Tambahan 1 dan/atau Calon Tertanggung Tambahan 2 termasuk menyalin, mengubah dengan mengombinasikan data asli, menggunakan, mengirimkan data Calon Pemegang Polis dan/atau Calon Tertanggung  Utama dan/atau Calon Tertanggung Tambahan 1 dan/atau Calon Tertanggung Tambahan 2 dengan cara apa pun, kepada pihak manapun dan untuk tujuan apa pun di luar kepentingan/diperuntukan untuk PT Prudential Life Assurance dalam proses pengajuan polis ini. Sehubungan dengan pernyataan yang SAYA berikan ini, maka SAYA menjamin dan membebaskan Prudential Indonesia dari segala kewajiban, klaim, ganti rugi dan/atau tuntutan hukum yang mungkin timbul di saat ini ataupun di kemudian hari sehubungan dengan pemrosesan data pribadi yang tidak sah atau di luar keperluan PT Prudential Life Assurance.',
    },
  ],
  U13: [
    {
      id: '1. ',
      key: `Semua keterangan yang terdapat di SPAJ Syariah ini adalah semata-mata berdasarkan keterangan yang diberikan oleh Calon Pemegang Polis dan/atau Calon Peserta Utama Yang Diasuransikan dan/atau Calon Peserta Tambahan 1 Yang Diasuransikan dan/atau Calon Peserta Tambahan 2 Yang Diasuransikan (yang selanjutnya disebut Calon Peserta Tambahan Yang Diasuransikan) dan/atau Calon Pembayar Kontribusi dan/atau Calon Pembayar <i>Top-up</i> Kontribusi Tunggal,  dan dengan ini SAYA selaku Tenaga Pemasar menyatakan bahwa SAYA tidak mengubah, membantu, mengarahkan, memberikan rekomendasi dan/atau menyembunyikan informasi atau keterangan apa pun yang telah diberikan oleh Calon Pemegang Polis dan/atau Calon Peserta Utama Yang Diasuransikan dan/atau Calon Peserta Tambahan 1 Yang Diasuransikan dan/atau Calon Peserta Tambahan 2 Yang Diasuransikan (yang selanjutnya disebut Calon Peserta Tambahan Yang Diasuransikan) dan/atau Calon Pembayar Kontribusi dan/atau Calon Pembayar Kontribusi <i>Top-up</i> Tunggal yang dapat memengaruhi penerimaan SPAJ Syariah ini.`,
    },
    {
      id: '2. ',
      key: `SAYA telah menerangkan semua isi butir pernyataan di SPAJ Syariah dengan benar, akurat, dan menjelaskan informasi/keterangan mengenai produk asuransi dan manfaatnya sesuai dengan Ketentuan Umum dan Ketentuan Khusus Polis, termasuk namun tidak terbatas mengenai penyampaian informasi dimana Calon Pemegang Polis dan/atau Calon Peserta Utama Yang Diasuransikan dan/atau Calon Peserta Tambahan 1 Yang Diasuransikan dan/atau Calon Peserta Tambahan 2 Yang Diasuransikan dan/atau Calon Pembayar Kontribusi berkewajiban untuk mengungkapkan informasi pribadi, informasi kesehatan, informasi finansial, dan/atau informasi lainnya yang dipersyaratkan dalam SPAJ Syariah dengan benar, akurat dan lengkap, beserta dengan konsekuensi yang berhak ditetapkan oleh Pengelola yang dapat berakibat pada keputusan klaim dengan mengacu pada ketentuan Polis yang berlaku dan/atau keberlangsungan Polis setelah diterbitkan.`,
    },
    {
      id: '3. ',
      key: `SAYA telah bertemu dan melihat secara langsung kondisi terakhir Calon Peserta Utama Yang Diasuransikan dan/atau Calon Peserta Tambahan 1 Yang Diasuransikan dan/atau Calon Peserta Tambahan 2 Yang Diasuransikan, pada saat SPAJ Syariah ini diisi dan ditandatangani secara elektronik di hadapan SAYA oleh Calon Pemegang Polis dan/atau Calon Peserta Utama Yang Diasuransikan dan/atau Calon Peserta Tambahan 1 Yang Diasuransikan dan/atau Calon Peserta Tambahan 2 Yang Diasuransikan.`,
    },
    {
      id: '4. ',
      key: `SAYA mengenal Calon Pemegang Polis dan/atau Calon Peserta Utama Yang Diasuransikan dan/atau Calon Peserta Tambahan 1 Yang Diasuransikan dan/atau Calon Peserta Tambahan 2 Yang Diasuransikan dan/atau Calon Pembayar Kontribusi dan/atau Calon Pembayar <i>Top-up</i> Kontribusi Tunggal sebagai anggota keluarga/teman/referensi/<i>Public Figure</i>*/lainnya (pilih salah satu)*) Contoh: Pejabat/pejabat pemerintah, artis, politikus, dll.`,
    },
    {
      id: '5. ',
      key: `SAYA telah menerangkan, memberikan penjelasan dan memberikan informasi yang benar dan akurat mengenai produk asuransi, termasuk informasi penting terkait dengan syarat dan ketentuan Polis dan Ringkasan Informasi Produk dan Layanan Versi Umum dan Ringkasan Informasi Produk dan Layanan Versi Personal (Ilustrasi) <b>PRU</b>Link NextGen Syariah kepada Calon Pemegang Polis dan/atau Calon Peserta Utama Yang Diasuransikan dan/atau Calon Peserta Tambahan 1 Yang Diasuransikan dan/atau Calon Peserta Tambahan 2 Yang Diasuransikan.`,
    },
    {
      id: '6. ',
      key: 'Dalam melakukan pemasaran produk asuransi, SAYA hanya menggunakan materi pemasaran <b>PRU</b>Link NextGen Syariah (termasuk Ringkasan Informasi Produk dan Layanan Versi Umum dan Ringkasan Informasi Produk dan Layanan Versi Personal (Ilustrasi) <b>PRU</b>Link NextGen Syariah) yang terbaru yang dikeluarkan secara resmi oleh PT Prudential Sharia Life Assurance (Prudential Syariah).',
    },
    {
      id: '7. ',
      key: 'Seluruh proses keikutsertaan atas produk asuransi ini SAYA lakukan dengan mengikuti dan sesuai dengan kode etik keagenan, panduan, dan peraturan yang berlaku di PT Prudential Sharia Life Assurance (Prudential Syariah) serta terbebas dari unsur <i>mis-selling</i>.',
    },
    {
      id: '8. ',
      key: `SAYA mengetahui, memahami, dan menyetujui dalam hal salah satu atau lebih dari pernyataan SAYA di atas salah atau tidak benar, maka SAYA bersedia menerima Tindakan Disiplin dari PT Prudential Sharia Life Assurance (Prudential Syariah) sebagaimana diatur dalam Perjanjian Keagenan dan/atau Perjanjian Manajer Keagenan, serta SAYA bersedia untuk menerima segala bentuk sanksi, tindakan atau keputusan hukum baik secara perdata maupun pidana yang dikenakan kepada SAYA, walaupun hubungan keagenan SAYA dengan PT Prudential Sharia Life Assurance (Prudential Syariah) telah berakhir.`,
    },
    {
      id: '9. ',
      key: 'SAYA telah melakukan proses identifikasi dan verifikasi terhadap identitas Calon Pemegang Polis dan/atau Calon Peserta Utama Yang Diasuransikan dan/atau Calon Peserta Tambahan 1 Yang Diasuransikan dan/atau Calon Peserta Tambahan 2 Yang Diasuransikan dan/atau Calon Pembayar Kontribusi dan/atau Calon Pembayar <i>Top-up</i> Kontribusi Tunggal.',
    },
    {
      id: '10. ',
      key: `SAYA telah memastikan bahwa Calon Pemegang Polis mengunggah rekaman suara di sarana yang disediakan oleh Pengelola dan rekaman suara tersebut dilakukan secara langsung oleh Calon Pemegang Polis menggunakan naskah dari Pengelola.`,
    },
    {
      id: '11. ',
      key: `SAYA mengetahui kewajiban SAYA untuk setiap saat, atas permintaan PT Prudential Sharia Life Assurance (Prudential Syariah) (walaupun hubungan keagenan SAYA dengan PT Prudential Sharia Life Assurance (Prudential Syariah) telah berakhir) hadir di kantor PT Prudential Sharia Life Assurance (Prudential Syariah) dan/atau memberikan seluruh informasi yang SAYA miliki dengan benar kepada PT Prudential Sharia Life Assurance (Prudential Syariah), atau menghadiri setiap persidangan atau panggilan pihak yang berwajib dan regulator sebagai saksi, untuk memberikan bukti, informasi mengenai nasabah, Pelayanan yang SAYA berikan kepada nasabah, atau perjanjian keagenan SAYA.`,
    },
    {
      id: '12. ',
      key: `Sebelum dilakukan penutupan atas <b>PRU</b>Link NextGen Syariah yang ditawarkan, SAYA telah menjelaskan secara lengkap kepada Calon Pemegang Polis dan/atau Calon Peserta Utama Yang Diasuransikan dan/atau Calon Peserta Tambahan 1 Yang Diasuransikan dan/atau Calon Peserta Tambahan 2 Yang Diasuransikan mengenai manfaat, risiko, persyaratan dan tata cara, dan biaya dari <b>PRU</b>Link NextGen Syariah yang ditawarkan.`,
    },
    {
      id: '13. ',
      key: `SAYA bukan merupakan karyawan PT Prudential Sharia Life Assurance (Prudential Syariah) maka untuk itu atas kesalahan, pelanggaran dan/atau tindakan yang SAYA lakukan tersebut dalam rangka pemasaran yang tidak sesuai dengan Perjanjian Keagenan, kode etik keagenan, maupun peraturan perundang-undangan yg berlaku, termasuk konsekuensi hukum baik secara perdata maupun pidana, sepenuhnya menjadi tanggung jawab SAYA pribadi.`,
    },
    {
      id: '14. ',
      key: `SAYA bertanggung jawab dan setiap saat akan menjaga kerahasiaan atas segala data dan/atau informasi data Calon Pemegang Polis dan/atau Calon Peserta Utama Yang Diasuransikan dan/atau Calon Peserta Tambahan 1 Yang Diasuransikan dan/atau Calon Peserta Tambahan 2 Yang Diasuransikan serta perubahannya (jika ada) yang SAYA sampaikan/lengkapi di dalam SPAJ Syariah. SAYA menyatakan dengan ini bahwa data dan/atau informasi Calon Pemegang Polis dan/atau Calon Peserta Utama Yang Diasuransikan dan/atau Calon Peserta Tambahan 1 Yang Diasuransikan dan/atau Calon Peserta Tambahan 2 Yang Diasuransikan dimaksud telah SAYA peroleh secara sah dan tidak melawan hukum. SAYA memahami dan menyetujui dan tunduk bahwa SAYA dilarang untuk memproses data Calon Pemegang Polis dan/atau Calon Peserta Utama Yang Diasuransikan dan/atau Calon Peserta Tambahan 1 Yang Diasuransikan dan/atau Calon Peserta Tambahan 2 Yang Diasuransikan termasuk menyalin, mengubah dengan mengombinasikan data asli, menggunakan, mengirimkan data Calon Pemegang Polis dan/atau Calon Peserta Utama Yang Diasuransikan dan/atau Calon Peserta Tambahan 1 Yang Diasuransikan dan/atau Calon Peserta Tambahan 2 Yang Diasuransikan dengan cara apa pun, kepada pihak manapun dan untuk tujuan apa pun di luar kepentingan/diperuntukan untuk PT Prudential Sharia Life Assurance (Prudential Syariah) dalam proses pengajuan Polis ini. Sehubungan dengan pernyataan yang SAYA berikan ini, maka SAYA menjamin dan membebaskan Prudential Syariah dari segala kewajiban, klaim, ganti rugi dan/atau tuntutan hukum yang mungkin timbul di saat ini ataupun di kemudian hari sehubungan dengan pemrosesan data pribadi yang tidak sah atau di luar keperluan PT Prudential Sharia Life Assurance (Prudential Syariah).`,
    },
  ],
  E1O: [
    {
      id: '1. ',
      key: `Semua keterangan yang terdapat di SPAJ Syariah ini adalah semata-mata berdasarkan keterangan yang diberikan oleh Calon Pemegang Polis dan/atau Calon Peserta Utama Yang Diasuransikan dan/atau Calon Peserta Tambahan 1 Yang Diasuransikan dan/atau Calon Pembayar Kontribusi, dan dengan ini SAYA selaku Tenaga Pemasar menyatakan bahwa SAYA tidak mengubah, membantu, mengarahkan, memberikan rekomendasi dan/atau menyembunyikan informasi atau keterangan apa pun yang telah diberikan oleh Calon Pemegang Polis dan/atau Calon Peserta Utama Yang Diasuransikan dan/atau Calon Peserta Tambahan 1 Yang Diasuransikan dan/atau Calon Pembayar Kontribusi yang dapat memengaruhi penerimaan SPAJ Syariah ini. `,
    },
    {
      id: '2. ',
      key: `SAYA telah menerangkan semua isi butir pernyataan di SPAJ Syariah dengan benar, akurat, dan menjelaskan informasi/keterangan mengenai produk asuransi dan manfaatnya sesuai dengan Ketentuan Polis dan Ketentuan Khusus Polis, termasuk namun tidak terbatas mengenai penyampaian informasi dimana Calon Pemegang Polis dan/atau Calon Peserta Utama Yang Diasuransikan dan/atau Calon Peserta Tambahan 1 Yang Diasuransikan dan/atau Calon Pembayar Kontribusi berkewajiban untuk mengungkapkan informasi pribadi, informasi kesehatan, informasi finansial, dan/atau informasi lainnya yang dipersyaratkan dalam SPAJ Syariah dengan benar, akurat dan lengkap, beserta dengan konsekuensi yang berhak ditetapkan oleh Pengelola yang dapat berakibat pada keputusan klaim dengan mengacu pada ketentuan Polis yang berlaku dan/atau keberlangsungan Polis setelah diterbitkan.`,
    },
    {
      id: '3. ',
      key: `SAYA telah bertemu dan melihat secara langsung kondisi terakhir Calon Peserta Yang Diasuransikan, pada saat SPAJ Syariah ini diisi dan ditandatangani secara elektronik di hadapan SAYA oleh Calon Pemegang Polis dan/atau Calon Peserta Utama Yang Diasuransikan dan/atau Calon Peserta Tambahan 1 Yang Diasuransikan.`,
    },
    {
      id: '4. ',
      key: `SAYA mengenal Calon Pemegang Polis dan/atau Calon Peserta Utama Yang Diasuransikan dan/atau Calon Peserta Tambahan 1 Yang Diasuransikan dan/atau Calon Pembayar Kontribusi sebagai anggota keluarga/teman/referensi/Public Figure*/lainnya (pilih salah satu). *) Contoh: Pejabat/pejabat pemerintah, artis, politikus, dll. `,
    },
    {
      id: '5. ',
      key: `SAYA telah menerangkan, memberikan penjelasan dan memberikan informasi yang benar dan akurat mengenai produk asuransi, termasuk informasi penting terkait dengan syarat dan ketentuan Polis dan Ringkasan Informasi Produk dan Layanan Versi Umum dan Ringkasan Informasi Produk dan Layanan Versi Personal (Ilustrasi) PRUCerah kepada Calon Pemegang Polis dan/atau Calon Peserta Yang Diasuransikan.`,
    },
    {
      id: '6. ',
      key: `Dalam melakukan pemasaran produk asuransi, SAYA hanya menggunakan materi pemasaran PRUCerah (termasuk Ringkasan Informasi Produk dan Layanan Versi Umum dan Ringkasan Informasi Produk dan Layanan Versi Personal (Ilustrasi) PRUCerah) yang terbaru yang dikeluarkan secara resmi oleh PT Prudential Sharia Life Assurance (Prudential Syariah).`,
    },
    {
      id: '7. ',
      key: `Seluruh proses keikutsertaan atas produk asuransi ini SAYA lakukan dengan mengikuti dan sesuai dengan kode etik keagenan, panduan, dan peraturan yang berlaku di PT Prudential Sharia Life Assurance (Prudential Syariah) serta terbebas dari unsur mis-selling.`,
    },
    {
      id: '8. ',
      key: `SAYA mengetahui, memahami, dan menyetujui dalam hal salah satu atau lebih dari pernyataan SAYA di atas salah atau tidak benar, maka SAYA bersedia menerima Tindakan Disiplin dari PT Prudential Sharia Life Assurance (Prudential Syariah) sebagaimana diatur dalam Perjanjian Keagenan dan/atau Perjanjian Manajer Keagenan, serta SAYA bersedia untuk menerima segala bentuk sanksi, tindakan atau keputusan hukum baik secara perdata maupun pidana yang dikenakan kepada SAYA, walaupun hubungan keagenan SAYA dengan PT Prudential Sharia Life Assurance (Prudential Syariah) telah berakhir.`,
    },
    {
      id: '9. ',
      key: `SAYA telah melakukan proses identifikasi dan verifikasi terhadap identitas Calon Pemegang Polis dan/atau Calon Peserta Utama Yang Diasuransikan dan/atau Calon Peserta Tambahan 1 Yang Diasuransikan dan/atau Calon Pembayar Kontribusi.`,
    },
    {
      id: '10. ',
      key: `SAYA mengetahui kewajiban SAYA untuk setiap saat, atas permintaan PT Prudential Sharia Life Assurance (Prudential Syariah) (walaupun hubungan keagenan SAYA dengan PT Prudential Sharia Life Assurance (Prudential Syariah) telah berakhir) hadir di kantor PT Prudential Sharia Life Assurance (Prudential Syariah) dan/atau memberikan seluruh informasi yang SAYA miliki dengan benar kepada PT Prudential Sharia Life Assurance (Prudential Syariah), atau menghadiri setiap persidangan atau panggilan pihak yang berwajib dan regulator sebagai saksi, untuk memberikan bukti, informasi mengenai nasabah, pelayanan yang SAYA berikan kepada nasabah, atau perjanjian keagenan SAYA.`,
    },
    {
      id: '11. ',
      key: `Sebelum dilakukan penutupan atas PRUCerah yang ditawarkan, SAYA telah menjelaskan secara lengkap kepada Calon Pemegang Polis dan/atau Calon Peserta Yang Diasuransikan mengenai manfaat, risiko, persyaratan dan tata cara, dan biaya dari PRUCerah yang ditawarkan.`,
    },
    {
      id: '12. ',
      key: `SAYA bukan merupakan karyawan PT Prudential Sharia Life Assurance (Prudential Syariah) maka untuk itu atas kesalahan, pelanggaran dan/atau tindakan yang SAYA lakukan tersebut dalam rangka pemasaran yang tidak sesuai dengan Perjanjian Keagenan, kode etik keagenan, maupun peraturan perundang-undangan yg berlaku, termasuk konsekuensi hukum baik secara perdata maupun pidana, sepenuhnya menjadi tanggung jawab SAYA pribadi.`,
    },
    {
      id: '13. ',
      key: `SAYA bertanggung jawab dan setiap saat akan menjaga kerahasiaan atas segala data dan/atau informasi data Calon Pemegang Polis dan/atau Calon Peserta Utama Yang Diasuransikan dan/atau Calon Peserta Tambahan 1 Yang Diasuransikan serta perubahannya (jika ada) yang SAYA sampaikan/lengkapi di dalam SPAJ Syariah. SAYA menyatakan dengan ini bahwa data dan/atau informasi Calon Pemegang Polis dan/atau Calon Peserta Utama Yang Diasuransikan dan/atau Calon Peserta Tambahan 1 Yang Diasuransikan dimaksud telah SAYA peroleh secara sah dan tidak melawan hukum. SAYA memahami dan menyetujui dan tunduk bahwa SAYA dilarang untuk memproses data Calon Pemegang Polis dan/atau Calon Peserta Utama Yang Diasuransikan dan/atau Calon Peserta Tambahan 1 Yang Diasuransikan termasuk menyalin, mengubah dengan mengombinasikan data asli, menggunakan, mengirimkan data Calon Pemegang Polis dan/atau Calon Peserta Utama Yang Diasuransikan dan/atau Calon Peserta Tambahan 1 Yang Diasuransikan dengan cara apa pun, kepada pihak manapun dan untuk tujuan apa pun di luar kepentingan/diperuntukan untuk PT Prudential Sharia Life Assurance (Prudential Syariah) dalam proses pengajuan Polis ini. Sehubungan dengan pernyataan yang SAYA berikan ini, maka SAYA menjamin dan membebaskan Prudential Syariah dari segala kewajiban, klaim, ganti rugi dan/atau tuntutan hukum yang mungkin timbul di saat ini ataupun di kemudian hari sehubungan dengan pemrosesan data pribadi yang tidak sah atau di luar keperluan PT Prudential Sharia Life Assurance (Prudential Syariah).`,
    },
  ],
  E1OP: [
    {
      id: '1. ',
      key: `Semua keterangan yang terdapat di SPAJ Syariah ini adalah semata-mata berdasarkan keterangan yang diberikan oleh Calon Pemegang Polis dan/atau Calon Peserta Utama Yang Diasuransikan dan/atau Calon Peserta Tambahan 1 Yang Diasuransikan dan/atau Calon Pembayar Kontribusi, dan dengan ini SAYA selaku Tenaga Pemasar menyatakan bahwa SAYA tidak mengubah, membantu, mengarahkan, memberikan rekomendasi dan/atau menyembunyikan informasi atau keterangan apa pun yang telah diberikan oleh Calon Pemegang Polis dan/atau Calon Peserta Utama Yang Diasuransikan dan/atau Calon Peserta Tambahan 1 Yang Diasuransikan dan/atau Calon Pembayar Kontribusi yang dapat memengaruhi penerimaan SPAJ Syariah ini. `,
    },
    {
      id: '2. ',
      key: `SAYA telah menerangkan semua isi butir pernyataan di SPAJ Syariah dengan benar, akurat, dan menjelaskan informasi/keterangan mengenai produk asuransi dan manfaatnya sesuai dengan Ketentuan Polis dan Ketentuan Khusus Polis, termasuk namun tidak terbatas mengenai penyampaian informasi dimana Calon Pemegang Polis dan/atau Calon Peserta Utama Yang Diasuransikan dan/atau Calon Peserta Tambahan 1 Yang Diasuransikan dan/atau Calon Pembayar Kontribusi berkewajiban untuk mengungkapkan informasi pribadi, informasi kesehatan, informasi finansial, dan/atau informasi lainnya yang dipersyaratkan dalam SPAJ Syariah dengan benar, akurat dan lengkap, beserta dengan konsekuensi yang berhak ditetapkan oleh Pengelola yang dapat berakibat pada keputusan klaim dengan mengacu pada ketentuan Polis yang berlaku dan/atau keberlangsungan Polis setelah diterbitkan.`,
    },
    {
      id: '3. ',
      key: `SAYA telah bertemu dan melihat secara langsung kondisi terakhir Calon Peserta Yang Diasuransikan, pada saat SPAJ Syariah ini diisi dan ditandatangani secara elektronik di hadapan SAYA oleh Calon Pemegang Polis dan/atau Calon Peserta Utama Yang Diasuransikan dan/atau Calon Peserta Tambahan 1 Yang Diasuransikan.`,
    },
    {
      id: '4. ',
      key: `SAYA mengenal Calon Pemegang Polis dan/atau Calon Peserta Utama Yang Diasuransikan dan/atau Calon Peserta Tambahan 1 Yang Diasuransikan dan/atau Calon Pembayar Kontribusi sebagai anggota keluarga/teman/referensi/Public Figure*/lainnya (pilih salah satu). *) Contoh: Pejabat/pejabat pemerintah, artis, politikus, dll. `,
    },
    {
      id: '5. ',
      key: `SAYA telah menerangkan, memberikan penjelasan dan memberikan informasi yang benar dan akurat mengenai produk asuransi, termasuk informasi penting terkait dengan syarat dan ketentuan Polis dan Ringkasan Informasi Produk dan Layanan Versi Umum dan Ringkasan Informasi Produk dan Layanan Versi Personal (Ilustrasi) PRUCerah Plus kepada Calon Pemegang Polis dan/atau Calon Peserta Yang Diasuransikan.`,
    },
    {
      id: '6. ',
      key: `Dalam melakukan pemasaran produk asuransi, SAYA hanya menggunakan materi pemasaran PRUCerah Plus (termasuk Ringkasan Informasi Produk dan Layanan Versi Umum dan Ringkasan Informasi Produk dan Layanan Versi Personal (Ilustrasi) PRUCerah Plus) yang terbaru yang dikeluarkan secara resmi oleh PT Prudential Sharia Life Assurance (Prudential Syariah).`,
    },
    {
      id: '7. ',
      key: `Seluruh proses keikutsertaan atas produk asuransi ini SAYA lakukan dengan mengikuti dan sesuai dengan kode etik keagenan, panduan, dan peraturan yang berlaku di PT Prudential Sharia Life Assurance (Prudential Syariah) serta terbebas dari unsur mis-selling.`,
    },
    {
      id: '8. ',
      key: `SAYA mengetahui, memahami, dan menyetujui dalam hal salah satu atau lebih dari pernyataan SAYA di atas salah atau tidak benar, maka SAYA bersedia menerima Tindakan Disiplin dari PT Prudential Sharia Life Assurance (Prudential Syariah) sebagaimana diatur dalam Perjanjian Keagenan dan/atau Perjanjian Manajer Keagenan, serta SAYA bersedia untuk menerima segala bentuk sanksi, tindakan atau keputusan hukum baik secara perdata maupun pidana yang dikenakan kepada SAYA, walaupun hubungan keagenan SAYA dengan PT Prudential Sharia Life Assurance (Prudential Syariah) telah berakhir.`,
    },
    {
      id: '9. ',
      key: `SAYA telah melakukan proses identifikasi dan verifikasi terhadap identitas Calon Pemegang Polis dan/atau Calon Peserta Utama Yang Diasuransikan dan/atau Calon Peserta Tambahan 1 Yang Diasuransikan dan/atau Calon Pembayar Kontribusi.`,
    },
    {
      id: '10. ',
      key: `SAYA mengetahui kewajiban SAYA untuk setiap saat, atas permintaan PT Prudential Sharia Life Assurance (Prudential Syariah) (walaupun hubungan keagenan SAYA dengan PT Prudential Sharia Life Assurance (Prudential Syariah) telah berakhir) hadir di kantor PT Prudential Sharia Life Assurance (Prudential Syariah) dan/atau memberikan seluruh informasi yang SAYA miliki dengan benar kepada PT Prudential Sharia Life Assurance (Prudential Syariah), atau menghadiri setiap persidangan atau panggilan pihak yang berwajib dan regulator sebagai saksi, untuk memberikan bukti, informasi mengenai nasabah, pelayanan yang SAYA berikan kepada nasabah, atau perjanjian keagenan SAYA.`,
    },
    {
      id: '11. ',
      key: `Sebelum dilakukan penutupan atas PRUCerah Plus yang ditawarkan, SAYA telah menjelaskan secara lengkap kepada Calon Pemegang Polis dan/atau Calon Peserta Yang Diasuransikan mengenai manfaat, risiko, persyaratan dan tata cara, dan biaya dari PRUCerah Plus yang ditawarkan.`,
    },
    {
      id: '12. ',
      key: `SAYA bukan merupakan karyawan PT Prudential Sharia Life Assurance (Prudential Syariah) maka untuk itu atas kesalahan, pelanggaran dan/atau tindakan yang SAYA lakukan tersebut dalam rangka pemasaran yang tidak sesuai dengan Perjanjian Keagenan, kode etik keagenan, maupun peraturan perundang-undangan yg berlaku, termasuk konsekuensi hukum baik secara perdata maupun pidana, sepenuhnya menjadi tanggung jawab SAYA pribadi.`,
    },
    {
      id: '13. ',
      key: `SAYA bertanggung jawab dan setiap saat akan menjaga kerahasiaan atas segala data dan/atau informasi data Calon Pemegang Polis dan/atau Calon Peserta Utama Yang Diasuransikan dan/atau Calon Peserta Tambahan 1 Yang Diasuransikan serta perubahannya (jika ada) yang SAYA sampaikan/lengkapi di dalam SPAJ Syariah. SAYA menyatakan dengan ini bahwa data dan/atau informasi Calon Pemegang Polis dan/atau Calon Peserta Utama Yang Diasuransikan dan/atau Calon Peserta Tambahan 1 Yang Diasuransikan dimaksud telah SAYA peroleh secara sah dan tidak melawan hukum. SAYA memahami dan menyetujui dan tunduk bahwa SAYA dilarang untuk memproses data Calon Pemegang Polis dan/atau Calon Peserta Utama Yang Diasuransikan dan/atau Calon Peserta Tambahan 1 Yang Diasuransikan termasuk menyalin, mengubah dengan mengombinasikan data asli, menggunakan, mengirimkan data Calon Pemegang Polis dan/atau Calon Peserta Utama Yang Diasuransikan dan/atau Calon Peserta Tambahan 1 Yang Diasuransikan dengan cara apa pun, kepada pihak manapun dan untuk tujuan apa pun di luar kepentingan/diperuntukan untuk PT Prudential Sharia Life Assurance (Prudential Syariah) dalam proses pengajuan Polis ini. Sehubungan dengan pernyataan yang SAYA berikan ini, maka SAYA menjamin dan membebaskan Prudential Syariah dari segala kewajiban, klaim, ganti rugi dan/atau tuntutan hukum yang mungkin timbul di saat ini ataupun di kemudian hari sehubungan dengan pemrosesan data pribadi yang tidak sah atau di luar keperluan PT Prudential Sharia Life Assurance (Prudential Syariah).`,
    },
  ],
  C16: [
    {
      id: '1. ',
      key: `Semua keterangan yang terdapat di SPAJ Syariah ini adalah semata-mata berdasarkan keterangan yang diberikan oleh Calon Pemegang Polis dan/atau Calon Peserta Yang Diasuransikan dan/atau Calon Pembayar Kontribusi, dan dengan ini SAYA selaku Tenaga Pemasar menyatakan bahwa SAYA tidak mengubah, membantu, mengarahkan, memberikan rekomendasi dan/atau menyembunyikan informasi atau keterangan apa pun yang telah diberikan oleh Calon Pemegang Polis dan/atau Calon Peserta Yang Diasuransikan dan/atau Calon Pembayar Kontribusi yang dapat memengaruhi penerimaan SPAJ Syariah ini.`,
    },
    {
      id: '2. ',
      key: `SAYA telah menerangkan semua isi butir pernyataan di SPAJ Syariah dengan benar, akurat, dan menjelaskan informasi/keterangan mengenai produk asuransi dan manfaatnya sesuai dengan Ketentuan Polis dan Ketentuan Khusus Polis, termasuk namun tidak terbatas mengenai penyampaian informasi dimana Calon Pemegang Polis dan/atau Calon Peserta Yang Diasuransikan dan/atau Calon Pembayar Kontribusi berkewajiban untuk mengungkapkan informasi pribadi, informasi kesehatan, informasi finansial, dan/atau informasi lainnya yang dipersyaratkan dalam SPAJ Syariah dengan benar, akurat dan lengkap, beserta dengan konsekuensi yang berhak ditetapkan oleh Pengelola yang dapat berakibat pada keputusan klaim dengan mengacu pada ketentuan Polis yang berlaku dan/atau keberlangsungan Polis setelah diterbitkan.`,
    },
    {
      id: '3. ',
      key: `SAYA telah bertemu dan melihat secara langsung kondisi terakhir Calon Peserta Yang Diasuransikan, pada saat SPAJ Syariah ini diisi dan ditandatangani secara elektronik di hadapan SAYA oleh Calon Pemegang Polis dan/atau Calon Peserta Yang Diasuransikan.`,
    },
    {
      id: '4. ',
      key: `SAYA mengenal Calon Pemegang Polis dan/atau Calon Peserta Yang Diasuransikan dan/atau Calon Pembayar Kontribusi sebagai anggota keluarga/teman/referensi/Public Figure*/lainnya (pilih salah satu). *) Contoh: Pejabat/pejabat pemerintah, artis, politikus, dll.`,
    },
    {
      id: '5. ',
      key: `SAYA telah menerangkan, memberikan penjelasan dan memberikan informasi yang benar dan akurat mengenai produk asuransi, termasuk informasi penting terkait dengan syarat dan ketentuan Polis dan Ringkasan Informasi Produk dan Layanan Versi Umum dan Ringkasan Informasi Produk dan Layanan Versi Personal (Ilustrasi) PRUSolusi Kondisi Kritis Syariah kepada Calon Pemegang Polis dan/atau Calon Peserta Yang Diasuransikan.`,
    },
    {
      id: '6. ',
      key: `Dalam melakukan pemasaran produk asuransi, SAYA hanya menggunakan materi pemasaran PRUSolusi Kondisi Kritis Syariah (termasuk Ringkasan Informasi Produk dan Layanan Versi Umum dan Ringkasan Informasi Produk dan Layanan Versi Personal (Ilustrasi) PRUSolusi Kondisi Kritis Syariah) yang terbaru yang dikeluarkan secara resmi oleh PT Prudential Sharia Life Assurance (Prudential Syariah)`,
    },
    {
      id: '7. ',
      key: `Seluruh proses keikutsertaan atas produk asuransi ini SAYA lakukan dengan mengikuti dan sesuai dengan kode etik keagenan, panduan, dan peraturan yang berlaku di PT Prudential Sharia Life Assurance (Prudential Syariah) serta terbebas dari unsur mis-selling.`,
    },
    {
      id: '8. ',
      key: `SAYA mengetahui, memahami, dan menyetujui dalam hal salah satu atau lebih dari pernyataan SAYA di atas salah atau tidak benar, maka SAYA bersedia menerima Tindakan Disiplin dari PT Prudential Sharia Life Assurance (Prudential Syariah) sebagaimana diatur dalam Perjanjian Keagenan dan/atau Perjanjian Manajer Keagenan, serta SAYA bersedia untuk menerima segala bentuk sanksi, tindakan atau keputusan hukum baik secara perdata maupun pidana yang dikenakan kepada SAYA, walaupun hubungan keagenan SAYA dengan PT Prudential Sharia Life Assurance (Prudential Syariah) telah berakhir.`,
    },
    {
      id: '9. ',
      key: `SAYA telah melakukan proses identifikasi dan verifikasi terhadap identitas Calon Pemegang Polis dan/atau Calon Peserta Yang Diasuransikan dan/atau Calon Pembayar Kontribusi.`,
    },
    {
      id: '10. ',
      key: `SAYA mengetahui kewajiban SAYA untuk setiap saat, atas permintaan PT Prudential Sharia Life Assurance (Prudential Syariah) (walaupun hubungan keagenan SAYA dengan PT Prudential Sharia Life Assurance (Prudential Syariah) telah berakhir) hadir di kantor PT Prudential Sharia Life Assurance (Prudential Syariah) dan/atau memberikan seluruh informasi yang SAYA miliki dengan benar kepada PT Prudential Sharia Life Assurance (Prudential Syariah), atau menghadiri setiap persidangan atau panggilan pihak yang berwajib dan regulator sebagai saksi, untuk memberikan bukti, informasi mengenai nasabah, pelayanan yang SAYA berikan kepada nasabah, atau perjanjian keagenan SAYA.`,
    },
    {
      id: '11. ',
      key: `Sebelum dilakukan penutupan atas PRUSolusi Kondisi Kritis Syariah yang ditawarkan, SAYA telah menjelaskan secara lengkap kepada Calon Pemegang Polis dan/atau Calon Peserta Yang Diasuransikan mengenai manfaat, risiko, persyaratan dan tata cara, dan biaya dari PRUSolusi Kondisi Kritis Syariah yang ditawarkan.`,
    },
    {
      id: '12. ',
      key: `SAYA bukan merupakan karyawan PT Prudential Sharia Life Assurance (Prudential Syariah) maka untuk itu atas kesalahan, pelanggaran dan/atau tindakan yang SAYA lakukan tersebut dalam rangka pemasaran yang tidak sesuai dengan Perjanjian Keagenan, kode etik keagenan, maupun peraturan perundang-undangan yg berlaku, termasuk konsekuensi hukum baik secara perdata maupun pidana, sepenuhnya menjadi tanggung jawab SAYA pribadi`,
    },
    {
      id: '13. ',
      key: `SAYA bertanggung jawab dan setiap saat akan menjaga kerahasiaan atas segala data dan/atau informasi data Calon Pemegang Polis dan/atau Calon Peserta Yang Diasuransikan serta perubahannya (jika ada) yang SAYA sampaikan/lengkapi di dalam SPAJ Syariah. SAYA menyatakan dengan ini bahwa data dan/atau informasi Calon Pemegang Polis dan/atau Calon Peserta Yang Diasuransikan dimaksud telah SAYA peroleh secara sah dan tidak melawan hukum. SAYA memahami dan menyetujui dan tunduk bahwa SAYA dilarang untuk memproses data Calon Pemegang Polis dan/atau Calon Peserta Yang Diasuransikan termasuk menyalin, mengubah dengan mengombinasikan data asli, menggunakan, mengirimkan data Calon Pemegang Polis dan/atau Calon Peserta Yang Diasuransikan dengan cara apa pun, kepada pihak manapun dan untuk tujuan apa pun di luar kepentingan/diperuntukan untuk PT Prudential Sharia Life Assurance (Prudential Syariah) dalam proses pengajuan Polis ini. Sehubungan dengan pernyataan yang SAYA berikan ini, maka SAYA menjamin dan membebaskan Prudential Syariah dari segala kewajiban, klaim, ganti rugi dan/atau tuntutan hukum yang mungkin timbul di saat ini ataupun di kemudian hari sehubungan dengan pemrosesan data pribadi yang tidak sah atau di luar keperluan PT Prudential Sharia Life Assurance (Prudential Syariah)`,
    },
  ],
};

export const note_risk_of_signing_spaj: Record<string, string> = {
  H14: 'Segala risiko yang timbul akibat ditandatanganinya SPAJ ini dalam keadaan kosong/belum terisi lengkap menjadi tanggung jawab Calon Pemegang Polis dan apabila terdapat hal-hal yang ingin ditanyakan, dapat menghubungi Tenaga Pemasar atau <i>Customer Relations Officer</i> kami setiap hari Senin s/d Sabtu dari pukul 08.00 WIB hingga 17.00 WIB di nomor 1500085.',
  H15: 'Segala risiko yang timbul akibat ditandatanganinya SPAJ Syariah ini dalam keadaan kosong/belum terisi lengkap menjadi tanggung jawab Calon Pemegang Polis dan apabila terdapat hal-hal yang ingin ditanyakan, dapat menghubungi Tenaga Pemasar atau <i>Customer Line</i> 1500577 pada hari Senin hingga Sabtu dari pukul 08.00 WIB - 17.00 WIB',
  U12: 'Segala risiko yang timbul akibat ditandatanganinya SPAJ ini dalam keadaan kosong/belum terisi lengkap menjadi tanggung jawab Calon Pemegang Polis dan apabila terdapat hal-hal yang ingin ditanyakan, dapat menghubungi Tenaga Pemasar atau <i>Customer Relations Officer</i> kami setiap hari Senin s/d Sabtu dari pukul 08.00 WIB hingga 17.00 WIB di nomor 1500085.',
  U13: 'Segala risiko yang timbul akibat ditandatanganinya SPAJ Syariah ini dalam keadaan kosong/belum terisi lengkap menjadi tanggung jawab Calon Pemegang Polis dan apabila terdapat hal-hal yang ingin ditanyakan, dapat menghubungi Tenaga Pemasar atau <i>Customer Line</i> 1500577 pada hari Senin hingga Sabtu dari pukul 08.00 WIB - 17.00 WIB',
};

export const getDefaultAgentStatementTRD: (props: TDefaultAgentStatementTRDProps) => Record<string, unknown>[] = ({
  spaj,
  lifeAssured,
  premiContribution,
  isSharia,
  productName,
  companyName,
  companyNameShort,
  insurerManager,
}) => [
  {
    id: '1. ',
    key: `Semua keterangan yang terdapat di ${spaj} ini adalah semata-mata berdasarkan keterangan yang diberikan oleh Calon Pemegang Polis dan/atau Calon ${lifeAssured} dan/atau Calon Pembayar ${premiContribution}, dan dengan ini SAYA selaku Tenaga Pemasar menyatakan bahwa SAYA tidak mengubah, membantu, mengarahkan, memberikan rekomendasi dan/atau menyembunyikan informasi atau keterangan apa pun yang telah diberikan oleh Calon Pemegang Polis dan/atau Calon ${lifeAssured} dan/atau Calon Pembayar ${premiContribution} yang dapat memengaruhi penerimaan ${spaj} ini.`,
  },
  {
    id: '2. ',
    key: `SAYA telah menerangkan semua isi butir pernyataan di ${spaj} dengan benar, akurat, dan menjelaskan informasi/keterangan mengenai produk asuransi dan manfaatnya sesuai dengan Ketentuan Polis dan Ketentuan Khusus Polis, termasuk namun tidak terbatas mengenai penyampaian informasi dimana Calon Pemegang Polis dan/atau Calon ${lifeAssured} dan/atau Calon Pembayar ${premiContribution} berkewajiban untuk mengungkapkan informasi pribadi, informasi kesehatan, informasi finansial, dan/atau informasi lainnya yang dipersyaratkan dalam ${spaj} dengan benar, akurat dan lengkap, beserta dengan konsekuensi yang berhak ditetapkan oleh ${insurerManager} yang dapat berakibat pada keputusan klaim dengan mengacu pada ketentuan Polis yang berlaku dan/atau keberlangsungan Polis setelah diterbitkan.`,
  },
  {
    id: '3. ',
    key: `SAYA telah bertemu dan melihat secara langsung kondisi terakhir Calon ${lifeAssured}, pada saat ${spaj} ini diisi dan ditandatangani secara elektronik di hadapan SAYA oleh Calon Pemegang Polis dan/atau Calon ${lifeAssured}.`,
  },
  {
    id: '4. ',
    key: `SAYA mengenal Calon Pemegang Polis dan/atau Calon ${lifeAssured} dan/atau Calon Pembayar ${premiContribution} sebagai anggota keluarga/teman/referensi/<i>Public Figure</i>*/lainnya (pilih salah satu) *) Contoh: Pejabat/pejabat pemerintah, artis, politikus, dll.`,
  },
  {
    id: '5. ',
    key: `SAYA telah menerangkan, memberikan penjelasan dan memberikan informasi yang benar dan akurat mengenai produk asuransi, termasuk informasi penting terkait dengan syarat dan ketentuan Polis dan Ringkasan Informasi Produk dan Layanan Versi Umum dan Ringkasan Informasi Produk dan Layanan Versi Personal (Ilustrasi) ${productName} kepada Calon Pemegang Polis dan/atau ${
      isSharia ? 'Calon Peserta Yang Diasuransikan.' : 'Calon Tertanggung dan/atau Calon Pembayar Premi.`'
    }`,
  },
  {
    id: '6. ',
    key: `Dalam melakukan pemasaran produk asuransi, SAYA hanya menggunakan materi pemasaran ${productName} (termasuk Ringkasan Informasi Produk dan Layanan Versi Umum dan Ringkasan Informasi Produk dan Layanan Versi Personal (Ilustrasi) ${productName}) yang terbaru yang dikeluarkan secara resmi oleh ${companyName}.`,
  },
  {
    id: '7. ',
    key: `Seluruh proses ${
      isSharia ? 'keikutsertaan' : 'penjualan'
    } atas produk asuransi ini SAYA lakukan dengan mengikuti dan sesuai dengan kode etik keagenan, panduan, dan peraturan yang berlaku di ${companyName} serta terbebas dari unsur <i>mis-selling</i>.`,
  },
  {
    id: '8. ',
    key: `SAYA mengetahui, memahami, dan menyetujui dalam hal salah satu atau lebih dari pernyataan SAYA di atas salah atau tidak benar, maka SAYA bersedia menerima Tindakan Disiplin dari ${companyName} sebagaimana diatur dalam Perjanjian Keagenan dan/atau Perjanjian Manajer Keagenan, serta SAYA bersedia untuk menerima segala bentuk sanksi, tindakan atau keputusan hukum baik secara perdata maupun pidana yang dikenakan kepada SAYA, walaupun hubungan keagenan SAYA dengan ${companyName} telah berakhir.`,
  },
  {
    id: '9. ',
    key: `SAYA telah melakukan proses identifikasi dan verifikasi terhadap identitas Calon Pemegang Polis dan/atau Calon ${lifeAssured} dan/atau Calon Pembayar ${premiContribution}.`,
  },
  {
    id: '10. ',
    key: `SAYA mengetahui kewajiban SAYA untuk setiap saat, atas permintaan ${companyName} (walaupun hubungan keagenan SAYA dengan ${companyName} telah berakhir) hadir di kantor ${companyName} dan/atau memberikan seluruh informasi yang SAYA miliki dengan benar kepada ${companyName}, atau menghadiri setiap persidangan atau panggilan pihak yang berwajib dan regulator sebagai saksi, untuk memberikan bukti, informasi mengenai nasabah, pelayanan yang SAYA berikan kepada nasabah, atau perjanjian keagenan SAYA.`,
  },
  {
    id: '11. ',
    key: `Sebelum dilakukan penutupan atas ${productName} SAYA telah menjelaskan secara lengkap kepada Calon Pemegang Polis dan/atau Calon ${lifeAssured} mengenai manfaat, risiko, persyaratan dan tata cara, dan biaya dari ${productName} yang ditawarkan.`,
  },
  {
    id: '12. ',
    key: `SAYA bukan merupakan karyawan ${companyName} maka untuk itu atas kesalahan, pelanggaran dan/atau tindakan yang SAYA lakukan tersebut dalam rangka pemasaran yang tidak sesuai dengan Perjanjian Keagenan, kode etik keagenan, maupun peraturan perundang-undangan yg berlaku, termasuk konsekuensi hukum baik secara perdata maupun pidana, sepenuhnya menjadi tanggung jawab SAYA pribadi.`,
  },
  {
    id: '13. ',
    key: `SAYA bertanggung jawab dan setiap saat akan menjaga kerahasiaan atas segala data dan/atau informasi data Calon Pemegang Polis dan/atau Calon ${lifeAssured} serta perubahannya (jika ada) yang SAYA sampaikan/lengkapi di dalam ${spaj}. SAYA menyatakan dengan ini bahwa data dan/atau informasi Calon Pemegang Polis dan/atau Calon ${lifeAssured} dimaksud telah SAYA peroleh secara sah dan tidak melawan hukum. SAYA memahami dan menyetujui dan tunduk bahwa SAYA dilarang untuk memproses data Calon Pemegang Polis dan/atau Calon ${lifeAssured} termasuk menyalin, mengubah dengan mengombinasikan data asli, menggunakan, mengirimkan data Calon Pemegang Polis dan/atau Calon ${lifeAssured} dengan cara apa pun, kepada pihak manapun dan untuk tujuan apa pun di luar kepentingan/diperuntukan untuk ${companyName} dalam proses pengajuan Polis ini. Sehubungan dengan pernyataan yang SAYA berikan ini, maka SAYA menjamin dan membebaskan ${companyNameShort} dari segala kewajiban, klaim, ganti rugi dan/atau tuntutan hukum yang mungkin timbul di saat ini ataupun di kemudian hari sehubungan dengan pemrosesan data pribadi yang tidak sah atau di luar keperluan ${companyName}.`,
  },
];

export const getDefaultAgentStatementUL: (props: TDefaultAgentStatementULProps) => Record<string, unknown>[] = ({
  spaj,
  insurancePayor,
  additionalPerson0,
  additionalPerson1,
  additionalPerson2,
  isSharia,
  productName,
  premiContribution,
  companyName,
  companyNameShort,
  insurerManager,
}) => {
  return [
    {
      id: '1. ',
      key: `Semua keterangan yang terdapat di ${spaj} ini adalah semata-mata berdasarkan keterangan yang diberikan oleh Calon Pemegang Polis dan/atau Calon ${insurancePayor} dan/atau ${additionalPerson1} dan/atau ${additionalPerson2} (yang selanjutnya disebut ${additionalPerson0}) dan/atau Calon Pembayar ${premiContribution} dan/atau Calon Pembayar ${premiContribution} <i>Top-up</i> Tunggal, dan dengan ini SAYA selaku Tenaga Pemasar menyatakan bahwa SAYA tidak mengubah, membantu, mengarahkan, memberikan rekomendasi dan/atau menyembunyikan informasi atau keterangan apa pun yang telah diberikan oleh Calon Pemegang Polis dan/atau Calon ${insurancePayor} dan/atau ${additionalPerson1} dan/atau ${additionalPerson2} dan/atau Calon Pembayar ${premiContribution} dan/atau Calon Pembayar ${premiContribution} <i>Top-up</i> Tunggal yang dapat memengaruhi penerimaan ${spaj} ini.`,
    },
    {
      id: '2. ',
      key: `SAYA telah menerangkan semua isi butir pernyataan di ${spaj} dengan benar, akurat, dan menjelaskan informasi/keterangan mengenai produk asuransi dan manfaatnya sesuai dengan Ketentuan Umum dan Ketentuan Khusus Polis, termasuk namun tidak terbatas mengenai penyampaian informasi dimana Calon Pemegang Polis dan/atau ${insurancePayor} dan/atau ${additionalPerson1} dan/atau ${additionalPerson2} dan/atau Calon Pembayar ${premiContribution} berkewajiban untuk mengungkapkan informasi pribadi, informasi kesehatan, informasi finansial, dan/atau informasi lainnya yang dipersyaratkan dalam ${spaj} dengan benar, akurat dan lengkap, beserta dengan konsekuensi yang berhak ditetapkan oleh ${insurerManager} yang dapat berakibat pada keputusan klaim dengan mengacu pada ketentuan Polis yang berlaku dan/atau keberlangsungan Polis setelah diterbitkan.`,
    },
    {
      id: '3. ',
      key: `SAYA telah bertemu dan melihat secara langsung kondisi terakhir Calon ${insurancePayor} dan/atau ${additionalPerson1} dan/atau ${additionalPerson2}, pada saat ${spaj} ini diisi dan ditandatangani secara elektronik di hadapan SAYA oleh Calon Pemegang Polis dan/atau Calon ${insurancePayor} dan/atau ${additionalPerson1} dan/atau ${additionalPerson2}.`,
    },
    {
      id: '4. ',
      key: `SAYA mengenal Calon Pemegang Polis dan/atau Calon ${insurancePayor} dan/atau ${additionalPerson1} dan/atau ${additionalPerson2} dan/atau Calon Pembayar ${premiContribution} dan/atau Calon Pembayar <i>Top-up</i> ${premiContribution} Tunggal sebagai anggota keluarga/teman/referensi/<i>Public Figure</i>*/lainnya (pilih salah satu)*) Contoh: Pejabat/pejabat pemerintah, artis, politikus, dll.`,
    },
    {
      id: '5. ',
      key: `SAYA telah menerangkan, memberikan penjelasan dan memberikan informasi yang benar dan akurat mengenai produk asuransi, termasuk informasi penting terkait dengan syarat dan ketentuan Polis dan Ringkasan Informasi Produk dan Layanan Versi Umum dan Ringkasan Informasi Produk dan Layanan Versi Personal (Ilustrasi) ${productName} kepada Calon Pemegang Polis dan/atau Calon ${insurancePayor} dan/atau ${additionalPerson1} dan/atau ${additionalPerson2}.`,
    },
    {
      id: '6. ',
      key: `Dalam melakukan pemasaran produk asuransi, SAYA hanya menggunakan materi pemasaran ${productName} (termasuk Ringkasan Informasi Produk dan Layanan Versi Umum dan Ringkasan Informasi Produk dan Layanan Versi Personal (Ilustrasi) ${productName}) yang terbaru yang dikeluarkan secara resmi oleh ${companyName}.`,
    },
    {
      id: '7. ',
      key: `Seluruh proses ${
        isSharia ? 'keikutsertaan' : 'penjualan'
      } atas produk asuransi ini SAYA lakukan dengan mengikuti dan sesuai dengan kode etik keagenan, panduan, dan peraturan yang berlaku di ${companyName} serta terbebas dari unsur <i>mis-selling</i>.`,
    },
    {
      id: '8. ',
      key: `SAYA mengetahui, memahami, dan menyetujui dalam hal salah satu atau lebih dari pernyataan SAYA di atas salah atau tidak benar, maka SAYA bersedia menerima Tindakan Disiplin dari ${companyName} sebagaimana diatur dalam Perjanjian Keagenan dan/atau Perjanjian Manajer Keagenan, serta SAYA bersedia untuk menerima segala bentuk sanksi, tindakan atau keputusan hukum baik secara perdata maupun pidana yang dikenakan kepada SAYA, walaupun hubungan keagenan SAYA dengan ${companyName} telah berakhir.`,
    },
    {
      id: '9. ',
      key: `SAYA telah melakukan proses identifikasi dan verifikasi terhadap identitas Calon Pemegang Polis dan/atau Calon ${insurancePayor} dan/atau ${additionalPerson1} dan/atau ${additionalPerson2} dan/atau Calon Pembayar ${premiContribution} dan/atau Calon Pembayar <i>Top-up</i> ${premiContribution} Tunggal.`,
    },
    {
      id: '10. ',
      key: `SAYA telah memastikan bahwa Calon Pemegang Polis mengunggah rekaman suara di sarana yang disediakan oleh ${insurerManager} dan rekaman suara tersebut dilakukan secara langsung oleh Calon Pemegang Polis menggunakan naskah dari ${insurerManager}.`,
    },
    {
      id: '11. ',
      key: `SAYA mengetahui kewajiban SAYA untuk setiap saat, atas permintaan ${companyName} (walaupun hubungan keagenan SAYA dengan ${companyName} telah berakhir) hadir di kantor ${companyName} dan/atau memberikan seluruh informasi yang SAYA miliki dengan benar kepada ${companyName}, atau menghadiri setiap persidangan atau panggilan pihak yang berwajib dan regulator sebagai saksi, untuk memberikan bukti, informasi mengenai nasabah, Pelayanan yang SAYA berikan kepada nasabah, atau perjanjian keagenan SAYA.`,
    },
    {
      id: '12. ',
      key: ` Sebelum dilakukan penutupan atas ${productName}, SAYA telah menjelaskan secara lengkap kepada Calon Pemegang Polis dan/atau Calon ${insurancePayor} dan/atau ${additionalPerson1} dan/atau ${additionalPerson2} mengenai manfaat, risiko, persyaratan dan tata cara, dan biaya dari ${productName} yang ditawarkan.`,
    },
    {
      id: '13. ',
      key: `SAYA bukan merupakan karyawan ${companyName} maka untuk itu atas kesalahan, pelanggaran dan/atau tindakan yang SAYA lakukan tersebut dalam rangka pemasaran yang tidak sesuai dengan Perjanjian Keagenan, kode etik keagenan, maupun peraturan perundang-undangan yang berlaku, termasuk konsekuensi hukum baik secara perdata maupun pidana, sepenuhnya menjadi tanggung jawab SAYA pribadi.`,
    },
    {
      id: '14. ',
      key: `SAYA bertanggung jawab dan setiap saat akan menjaga kerahasiaan atas segala data dan/atau informasi data Calon Pemegang Polis dan/atau Calon ${insurancePayor} dan/atau ${additionalPerson1} dan/atau ${additionalPerson2} serta perubahannya (jika ada) yang SAYA sampaikan/lengkapi di dalam ${spaj}. SAYA menyatakan dengan ini bahwa data dan/atau informasi Calon Pemegang Polis dan/atau Calon ${insurancePayor} dan/atau ${additionalPerson1} dan/atau ${additionalPerson2} dimaksud telah SAYA peroleh secara sah dan tidak melawan hukum. SAYA memahami dan menyetujui dan tunduk bahwa SAYA dilarang untuk memproses data Calon Pemegang Polis dan/atau Calon ${insurancePayor} dan/atau ${additionalPerson1} dan/atau ${additionalPerson2} termasuk menyalin, mengubah dengan mengombinasikan data asli, menggunakan, mengirimkan data Calon Pemegang Polis dan/atau Calon ${insurancePayor} dan/atau ${additionalPerson1} dan/atau ${additionalPerson2} dengan cara apa pun, kepada pihak manapun dan untuk tujuan apa pun di luar kepentingan/diperuntukan untuk ${companyName} dalam proses pengajuan Polis ini. Sehubungan dengan pernyataan yang SAYA berikan ini, maka SAYA menjamin dan membebaskan ${companyNameShort} dari segala kewajiban, klaim, ganti rugi dan/atau tuntutan hukum yang mungkin timbul di saat ini ataupun di kemudian hari sehubungan dengan pemrosesan data pribadi yang tidak sah atau di luar keperluan ${companyName}.`,
    },
  ];
};
