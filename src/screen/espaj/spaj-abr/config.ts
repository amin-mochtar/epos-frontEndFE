export const defaultFormAbr = {
  policy_application_reason: '',
  policy_holder_info: {
    life_style: '',
    family_background: '',
    educational_background: '',
  },
  primary_insured_info: {
    life_style: '',
    family_background: '',
    educational_background: '',
  },
  agent_pov_review: '',
  agent_signature: {
    name: '',
    code: '',
    location: '',
    e_sign: '',
    time: new Date().toString(),
  },
};

export const labelLifeStyle =
  'Gaya Hidup (Contoh: Tempat tinggal, tujuan \nwisata, jumlah pelayan, kendaraan pribadi, \ndan lain lain)';
export const labelFamilyBackground =
  'Latar belakang keluarga (Contoh: Jenis \nusaha keluarga, profil keluarga, berapa \njumlah keluarga yang ditanggung oleh \n(Calon) Pemegang Polis)';
export const labelEducationalBackground =
  'Latar belakang pendidikan dan pengalaman \nkerja (Contoh: Tugas dan tanggung jawab \npada pekerjaan-pekerjaan sebelumnya, \nketerlibatan dalam memprakarsai \nproyek/bisnis spesial, dan lain-lain)';
