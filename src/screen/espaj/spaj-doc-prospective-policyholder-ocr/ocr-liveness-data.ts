const getOcrDummy = () => {
  const birthDate = new Date();
  birthDate.setFullYear(birthDate.getFullYear() - 27);
  const formattedDate = birthDate.toLocaleDateString('en-GB').replace(/\//g, '-');

  const data = {
    result: {
      nik: "3478103207340009",
      nama: "FAHREZI YUNTAS",
      tanggal_lahir: formattedDate,
      tempat_lahir: "PATI",
      pekerjaan: "PELAJAR/MAHASISWA",
      kewarganegaraan: "WNI",
      agama: "ISLAM",
      jenis_kelamin: "LAKI-LAKI",
      status_perkawinan: "BELUM KAWIN",
      // golongan_darah: "-",
      provinsi: "PROVINSI JAWA TENGAH",
      kota: "KABUPATEN PATI",
      kecamatan: "MARGOREJO",
      kelurahan: "SUKOHARJO",
      alamat: "DS. SUKOHARJO",
      rt_rw: "001/005",
      // dinas: "PATI",
      masa_berlaku: "SEUMUR HIDUP",
      // waktu_terbit: "29-04-2013"
    }
  }
  return data;
}

export {
  getOcrDummy
}