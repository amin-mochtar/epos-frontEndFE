import { WR_SHARIA_CONVENT } from '../../../utilities';

export const getSPAJPolicyOwnerList = (type: string) => {
  const companyName = WR_SHARIA_CONVENT[type].companyName;
  const additionalCompanyName = WR_SHARIA_CONVENT[type].additionalCompanyName;
  const stringAdditionalCompanyName = additionalCompanyName ? ` ${additionalCompanyName} ` : '';

  const clientValidationIsEmployee = [
    {
      key: 'Y1',
      label: `Ya, SAYA adalah karyawan dari ${companyName}${stringAdditionalCompanyName}`,
    },
    {
      key: 'Y2',
      label: `Ya, SAYA adalah keluarga karyawan dari ${companyName}${stringAdditionalCompanyName}`,
    },
    {
      key: 'N',
      label: `Tidak, SAYA bukan karyawan atau keluarga karyawan dari ${companyName}${stringAdditionalCompanyName}`,
    },
  ];

  const clientValidationRelationStatus = [
    {
      key: 'Y',
      label: `Asuransi untuk karyawan ${companyName}${stringAdditionalCompanyName}tidak berlaku untuk produk ini.`,
    },
    {
      key: 'L',
      label: 'Lainnya',
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

  return { clientValidationIsEmployee, clientValidationRelationStatus, catatanSPAJotherInformation };
};
