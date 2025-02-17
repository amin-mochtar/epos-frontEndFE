import i18n from 'i18next';
import { EposRoutes } from '../../../navigation';
import { NavigationItem } from '../spaj-life-style/spaj-life-style.type';

export type TCategories = {
  key: string;
  categoryKey: string;
  name: string;
  status: boolean;
  route: string;
  params?: any;
};

export const Categories = (
  wording: any,
  lifeAssuredSelf: string,
  additionalAssuredSelf: string,
  premiumPaymentCandidate: string,
  mainParticipant: string,
  magnumNavigation: NavigationItem[],
  productKey?: string,
  isGio?: boolean,
) => {
  const policyHolderText =
    additionalAssuredSelf == 'self'
      ? `${i18n.t('Epos:prospective_policyholder')} (${i18n.t('Epos:additional_insured')})`
      : i18n.t('Epos:prospective_policyholder');

  const libSPAJMenu: {
    [key: string]: TCategories;
  } = {
    [EposRoutes.SPAJ_POLICY_OWNER_DATA]: {
      key: EposRoutes.SPAJ_POLICY_OWNER_DATA,
      categoryKey: 'Data Informasi',
      name: policyHolderText,
      status: false,
      route: EposRoutes.SPAJ_POLICY_OWNER_DATA,
    },
    [EposRoutes.SPAJ_PRIMARY_INSURED_CANDIDATE]: {
      key: EposRoutes.SPAJ_PRIMARY_INSURED_CANDIDATE,
      categoryKey: 'Data Informasi',
      name: mainParticipant,
      status: false,
      route: EposRoutes.SPAJ_PRIMARY_INSURED_CANDIDATE,
    },
    [EposRoutes.SPAJ_PRIMARY_INSURED_ACTIVE]: {
      key: EposRoutes.SPAJ_PRIMARY_INSURED_ACTIVE,
      categoryKey: 'Data Informasi',
      name: `${i18n.t('Epos:active_policy')} ${mainParticipant}`,
      status: false,
      route: EposRoutes.SPAJ_PRIMARY_INSURED_ACTIVE,
    },
    [EposRoutes.SPAJ_MAGNUM_GIO]: {
      key: magnumNavigation[0]?.Uuid || EposRoutes.SPAJ_MAGNUM_GIO,
      categoryKey: 'Data Kesehatan',
      status: false,
      name: 'Persetujuan Mengikuti Program Khusus Nasabah',
      route: EposRoutes.SPAJ_LIFE_STYLE,
    },
    [EposRoutes.SPAJ_LIFE_STYLE]: {
      key: magnumNavigation[0]?.Uuid || EposRoutes.SPAJ_LIFE_STYLE,
      categoryKey: 'Data Kesehatan',
      status: false,
      name: 'Gaya Hidup',
      route: EposRoutes.SPAJ_LIFE_STYLE,
    },
    [EposRoutes.SPAJ_JOB_DETAIL]: {
      key: magnumNavigation[1]?.Uuid || EposRoutes.SPAJ_JOB_DETAIL,
      categoryKey: 'Data Kesehatan',
      status: false,
      name: 'Pekerjaan Detail Tambahan',
      route: EposRoutes.SPAJ_LIFE_STYLE,
    },
    [EposRoutes.SPAJ_PHYSICAL_HABITS]: {
      key: magnumNavigation.length === 5 ? magnumNavigation[2]?.Uuid : magnumNavigation[1]?.Uuid || EposRoutes.SPAJ_PHYSICAL_HABITS,
      categoryKey: 'Data Kesehatan',
      status: false,
      name: 'Fisik dan Kebiasaan',
      route: EposRoutes.SPAJ_LIFE_STYLE,
    },
    [EposRoutes.SPAJ_FAMILY_BACKGROUND]: {
      key: magnumNavigation.length === 5 ? magnumNavigation[3]?.Uuid : magnumNavigation[2]?.Uuid || EposRoutes.SPAJ_FAMILY_BACKGROUND,
      categoryKey: 'Data Kesehatan',
      status: false,
      name: 'Riwayat Keluarga',
      route: EposRoutes.SPAJ_LIFE_STYLE,
    },
    [EposRoutes.SPAJ_MEDICAL_HISTORY]: {
      key: magnumNavigation.length === 5 ? magnumNavigation[4]?.Uuid : magnumNavigation[3]?.Uuid || EposRoutes.SPAJ_MEDICAL_HISTORY,
      categoryKey: 'Data Kesehatan',
      status: false,
      name: 'Riwayat Kesehatan',
      route: EposRoutes.SPAJ_LIFE_STYLE,
    },
    [EposRoutes.SPAJ_PREMIUM_PAYER_CANDIDATE]: {
      key: EposRoutes.SPAJ_PREMIUM_PAYER_CANDIDATE,
      categoryKey: `${i18n.t('Epos:premium_payer')}${wording.premiContribution}`,
      status: premiumPaymentCandidate == 'N' ? false : true,
      name: wording.payor,
      route: premiumPaymentCandidate == 'N' ? EposRoutes.SPAJ_PREMIUM_PAYER_CANDIDATE : '',
    },
    [EposRoutes.SPAJ_TOPUP]: {
      key: EposRoutes.SPAJ_TOPUP,
      categoryKey: `${i18n.t('Epos:topup')}`,
      status: false,
      name: `${i18n.t('Epos:topup')}`,
      route: EposRoutes.SPAJ_TOPUP,
    },
    [EposRoutes.SPAJ_TOPUP_PREMIUM_PAYER]: {
      key: EposRoutes.SPAJ_TOPUP_PREMIUM_PAYER,
      categoryKey: `${i18n.t('Epos:topup')}`,
      status: false,
      name: `${i18n.t('Epos:topup_premi_payer', { premi: wording.premiContribution })}`,
      route: EposRoutes.SPAJ_TOPUP_PREMIUM_PAYER,
    },
    [EposRoutes.SPAJ_BENEFICIARY_CANDIDATE]: {
      key: EposRoutes.SPAJ_BENEFICIARY_CANDIDATE,
      categoryKey: 'Penerima Manfaat',
      status: false,
      name: 'Calon Penerima Manfaat',
      route: EposRoutes.SPAJ_BENEFICIARY_CANDIDATE,
    },
    [EposRoutes.SPAJ_DOC_PROSPECTIVE_POLICYHOLDER]: {
      key: EposRoutes.SPAJ_DOC_PROSPECTIVE_POLICYHOLDER,
      categoryKey: 'Kelengkapan Dokumen',
      status: false,
      name: lifeAssuredSelf == 'self' ? `${i18n.t('Epos:prospective_policyholder')} (${mainParticipant})` : `${i18n.t('Epos:prospective_policyholder')}`,
      route: EposRoutes.SPAJ_DOC_PROSPECTIVE_POLICYHOLDER,
    },
    [EposRoutes.SPAJ_DOC_PRIMARY_PARTICIPANT_CANDIDATE]: {
      key: EposRoutes.SPAJ_DOC_PRIMARY_PARTICIPANT_CANDIDATE,
      categoryKey: 'Kelengkapan Dokumen',
      status: false,
      name: mainParticipant,
      route: EposRoutes.SPAJ_DOC_PRIMARY_PARTICIPANT_CANDIDATE,
    },
    [EposRoutes.SPAJ_DOC_PREMIUM_PAYOR]: {
      key: EposRoutes.SPAJ_DOC_PREMIUM_PAYOR,
      categoryKey: 'Kelengkapan Dokumen',
      status: false,
      name: wording.payor,
      route: EposRoutes.SPAJ_DOC_PREMIUM_PAYOR,
    },
    [EposRoutes.SPAJ_DOC_TOPUP_PAYOR]: {
      key: EposRoutes.SPAJ_DOC_TOPUP_PAYOR,
      categoryKey: 'Kelengkapan Dokumen',
      status: false,
      name: `Calon Pembayar ${i18n.t('Epos:topup')}`,
      route: EposRoutes.SPAJ_DOC_TOPUP_PAYOR,
    },
    [EposRoutes.SPAJ_AMANDEMENT]: {
      key: EposRoutes.SPAJ_AMANDEMENT,
      categoryKey: 'Amandemen',
      status: false,
      name: 'Amandemen',
      route: EposRoutes.SPAJ_AMANDEMENT,
    },
  };

  /*
   * Default PH = LA
   */

  let defaultMenu: TCategories[] = [
    libSPAJMenu[EposRoutes.SPAJ_POLICY_OWNER_DATA],
    libSPAJMenu[EposRoutes.SPAJ_PRIMARY_INSURED_ACTIVE],
    libSPAJMenu[EposRoutes.SPAJ_LIFE_STYLE],
    libSPAJMenu[EposRoutes.SPAJ_PHYSICAL_HABITS],
    libSPAJMenu[EposRoutes.SPAJ_FAMILY_BACKGROUND],
    libSPAJMenu[EposRoutes.SPAJ_MEDICAL_HISTORY],
    libSPAJMenu[EposRoutes.SPAJ_PREMIUM_PAYER_CANDIDATE],
    libSPAJMenu[EposRoutes.SPAJ_TOPUP],
    libSPAJMenu[EposRoutes.SPAJ_TOPUP_PREMIUM_PAYER],
    libSPAJMenu[EposRoutes.SPAJ_BENEFICIARY_CANDIDATE],
    libSPAJMenu[EposRoutes.SPAJ_DOC_PROSPECTIVE_POLICYHOLDER],
    libSPAJMenu[EposRoutes.SPAJ_DOC_PREMIUM_PAYOR],
    libSPAJMenu[EposRoutes.SPAJ_DOC_TOPUP_PAYOR],
    libSPAJMenu[EposRoutes.SPAJ_AMANDEMENT],
  ];

  if (lifeAssuredSelf != 'self') {
    defaultMenu.splice(1, 0, libSPAJMenu[EposRoutes.SPAJ_PRIMARY_INSURED_CANDIDATE]);
    defaultMenu.splice(12, 0, libSPAJMenu[EposRoutes.SPAJ_DOC_PRIMARY_PARTICIPANT_CANDIDATE]);

    const isPrucerah = ['E1O', 'E1OP'].includes(productKey!);
    if (productKey && isPrucerah) {
      if (additionalAssuredSelf === 'other') {
        const additionalInsuredForm: TCategories = {
          ...libSPAJMenu[EposRoutes.SPAJ_PRIMARY_INSURED_CANDIDATE],
          key: `${EposRoutes.SPAJ_PRIMARY_INSURED_CANDIDATE}_copy`,
          name: `${i18n.t('Epos:additional_insured')}`,
          categoryKey: 'Data Informasi',
          status: false,
          params: {
            isAdditionalAssured: true,
          },
        };

        // Add additional insurance form dynamically
        const insertionIndex = defaultMenu.findIndex((item) => item.key === EposRoutes.SPAJ_PRIMARY_INSURED_CANDIDATE);
        defaultMenu.splice(insertionIndex + 1, 0, additionalInsuredForm);
      }

      let _additionalPolisText = `${i18n.t('Epos:active_policy')} ${i18n.t('Epos:additional_insured')}`;
      if (additionalAssuredSelf === 'self') {
        _additionalPolisText = `${i18n.t('Epos:active_policy')} ${policyHolderText}`;
      }

      const additionalPolicyForm: TCategories = {
        ...libSPAJMenu[EposRoutes.SPAJ_ADDITIONAL_INSURED_ACTIVE],
        key: EposRoutes.SPAJ_ADDITIONAL_INSURED_ACTIVE,
        categoryKey: 'Data Informasi',
        status: false,
        route: EposRoutes.SPAJ_ADDITIONAL_INSURED_ACTIVE,
        name: _additionalPolisText,
      };

      // Insert additional policy dynamically
      let policyInsertionIndex = defaultMenu.findIndex((item) => item.key === EposRoutes.SPAJ_PRIMARY_INSURED_ACTIVE);

      if (additionalAssuredSelf === 'other') policyInsertionIndex += 1
      defaultMenu.splice(policyInsertionIndex, 0, additionalPolicyForm);

      if (additionalAssuredSelf === 'other') {
        const additionalDocForm: TCategories = {
          ...libSPAJMenu[EposRoutes.SPAJ_DOC_PRIMARY_PARTICIPANT_CANDIDATE],
          key: `${EposRoutes.SPAJ_DOC_PRIMARY_PARTICIPANT_CANDIDATE}_copy`,
          name: `${i18n.t('Epos:additional_insured')}`,
          status: false,
          categoryKey: 'Kelengkapan Dokumen',
          params: {
            isAdditionalInsurance: true,
          },
        };

        // Add additional doc participant dynamically
        const docInsertionIndex = defaultMenu.findIndex((item) => item.key === EposRoutes.SPAJ_DOC_PRIMARY_PARTICIPANT_CANDIDATE);
        defaultMenu.splice(docInsertionIndex + 1, 0, additionalDocForm);
      }

      // Modify menu items dynamically
      defaultMenu = defaultMenu.map((i) => {
        // Modify category name on health data
        if (i.categoryKey === 'Data Kesehatan') {
          return {
            ...i,
            name: `${i.name} ${i18n.t('Epos:additional_insured')}`,
          };
        }

        // Auto-check top-up
        if (i.key === EposRoutes.SPAJ_TOPUP) {
          return {
            ...i,
            status: true,
          };
        }

        return i;
      });
    }

  }

  if (isGio) {
    const indexMenuMagnumLife = defaultMenu.findIndex((menu: TCategories) => menu.name == 'Gaya Hidup')
    defaultMenu.splice(indexMenuMagnumLife, 4, libSPAJMenu[EposRoutes.SPAJ_MAGNUM_GIO]);
  }

  if (magnumNavigation.length == 5) {
    const indexMenuMagnumLife = defaultMenu.findIndex((menu: TCategories) => menu.name == 'Gaya Hidup')
    defaultMenu.splice(indexMenuMagnumLife, 4, libSPAJMenu[EposRoutes.SPAJ_LIFE_STYLE], libSPAJMenu[EposRoutes.SPAJ_JOB_DETAIL], libSPAJMenu[EposRoutes.SPAJ_PHYSICAL_HABITS], libSPAJMenu[EposRoutes.SPAJ_FAMILY_BACKGROUND], libSPAJMenu[EposRoutes.SPAJ_MEDICAL_HISTORY]);
  }

  // PIA doesn't have polis aktif
  // if (productKey && ['U17R', 'U17D'].includes(productKey)) {
  //   defaultMenu = defaultMenu.filter((menu) => menu.key !== EposRoutes.SPAJ_PRIMARY_INSURED_ACTIVE);
  // }

  return defaultMenu;
};
