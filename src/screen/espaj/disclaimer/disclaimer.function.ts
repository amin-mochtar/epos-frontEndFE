import { formatCapitalizeFirstLetter, TPolicyType, ProductType, productType, TCommonOptionalData, WR_SHARIA_CONVENT, TProductCode, checkMainParticipant } from '../../../utilities';
import {
  getAdditionalDisclaimerRiderList,
  getPremiumPayorStatement,
  getConditionalListTopupUL,
  getConsentProvideData,
  getContractShariaContent,
  getDeathCoverageContent,
  getPHStatementContent,
  getSalesIlustrationStatement,
  getComplianceTnC,
} from './disclaimer.data';
import { PCPPParams, SKKPKPParams } from './disclaimer.type';

export const getDisclaimerList = (
  type: string,
  additionalBenefits: TCommonOptionalData,
  productNameRAW: string,
  calculatorData: TCommonOptionalData,
  productCode?: string,
  isPremiumPayorSPAJ?: boolean,
  topUpData?: TCommonOptionalData,
) => {
  const {
    companyName: companyLabel,
    spaj: spajLabel,
    spajT: spajTLabel,
    insurerManager,
  } = WR_SHARIA_CONVENT[type as TPolicyType];
  const productName = productNameRAW.replace('PRU', '<b>PRU</b>');
  const isSharia = type === 'sharia';
  const spaj = isSharia ? formatCapitalizeFirstLetter(spajLabel, [1]) : spajLabel;
  const spajT = isSharia ? formatCapitalizeFirstLetter(spajTLabel, [1]) : spajTLabel
  const companyName = isSharia ? `${companyLabel} (Prudential Syariah)` : companyLabel;
  /**
   * Logic For One Rider
   */
  const additionalDisclaimer = getAdditionalDisclaimerRiderList(
    additionalBenefits[0]?.key ? additionalBenefits[0].key : '',
    additionalBenefits[0]?.label ? additionalBenefits[0].label : '',
    productName,
    calculatorData ? calculatorData.benefits[0]?.planRider?.label : '',
    calculatorData ? calculatorData.benefits[0]?.periodRider?.key : '',
    calculatorData ? calculatorData.benefits[0]?.saverRider?.key : '',
    companyName,
    isSharia,
  );

  const conditionalList_TOPUP_UL = getConditionalListTopupUL(type as TPolicyType, companyName);

  const productCategory = productCode ? productType(productCode) : '';
  const isTraditional = productCategory !== 'UL';

  const SalesIlustrationStatementContent = getSalesIlustrationStatement(
    productCategory as ProductType,
    spaj,
    companyName,
  );
  const ContractShariaContent = getContractShariaContent(
    productName as string,
    productCode as TProductCode,
    productCategory as ProductType,
  );
  const payloadPCPP: PCPPParams = {
    productType: productCategory as ProductType,
    policyType: type as TPolicyType,
    productCode: productCode ?? '',
    productName,
    spaj,
    spajT,
    companyName,
    rider: calculatorData?.benefits?.[0]
  };
  const payloadSKK: SKKPKPParams = {
    productType: productCategory as ProductType,
    policyType: type as TPolicyType,
    productCode: productCode ?? '',
    productName,
    spaj
  }
  const PCPPContent = getPHStatementContent(payloadPCPP);
  const SKKPKPContent = getComplianceTnC(payloadSKK);

  const ConsentProvideDataContent = getConsentProvideData(
    productCategory as ProductType,
    type as TPolicyType,
    spaj,
    productCode as TProductCode,
  );
  const DeathCoverageContent = getDeathCoverageContent(
    type as TPolicyType,
    spaj,
    productName,
    insurerManager,
    productCode as TProductCode,
  );
  const isNeedToShowTopup = topUpData?.additionalTopup ? topUpData?.additionalTopup?.key === 'Y' : false;
  const premiumPayorStatement = getPremiumPayorStatement(productCategory as ProductType, type as TPolicyType, spaj, companyName);

  const disclaimerList = [
    SalesIlustrationStatementContent,
    ContractShariaContent,
    PCPPContent,
    SKKPKPContent,
    ...(isTraditional ? [DeathCoverageContent] : [additionalDisclaimer]),
    ...(isNeedToShowTopup && !isTraditional ? [conditionalList_TOPUP_UL] : []),
    ...(isPremiumPayorSPAJ ? [premiumPayorStatement] : []),
    ConsentProvideDataContent,
  ];
  // check type of policy
  const finalDisclaimerList = disclaimerList?.filter((item) => (!isSharia ? item?.key !== 'akd' : item));
  return finalDisclaimerList;
};

export const getOfferingProductWording = (productCode: string, productType: string, policyType: string) => {
  const { lifeAssured_1, premiContribution, lifeAssured_2, companyNameShort } = WR_SHARIA_CONVENT[policyType as TPolicyType];
  const mainParticipant = checkMainParticipant(productCode, policyType)
  //TODO: NEED TO CHANGE TYPE LATER
  const wording: Record<string, string> = {
    UL: `SAYA dan/atau ${mainParticipant} dan/atau Calon ${lifeAssured_2} Tambahan 1 dan/atau ${lifeAssured_2} Tambahan 2 dan/atau Calon Pembayar ${premiContribution} bersedia menerima penawaran produk lainnya (yang tidak berhubungan dengan produk yang SAYA miliki) dari ${companyNameShort} melalui sarana komunikasi pribadi, baik yang dilakukan sendiri oleh ${companyNameShort} maupun oleh pihak ketiga yang ditunjuk oleh ${companyNameShort}?`,
    TRD: `SAYA dan/atau Calon ${lifeAssured_1} bersedia menerima penawaran produk lainnya (yang tidak berhubungan dengan produk yang SAYA miliki) dari ${companyNameShort} melalui sarana komunikasi pribadi, baik yang dilakukan sendiri oleh ${companyNameShort} maupun oleh pihak ketiga yang ditunjuk oleh ${companyNameShort}?`
  }

  const PRODUCT_OFFERING: Record<string, string> = {
    H14: `SAYA dan/atau Calon Tertanggung bersedia menerima penawaran produk lainnya (yang tidak berhubungan dengan produk yang SAYA miliki) dari Prudential Indonesia melalui sarana komunikasi pribadi, baik yang dilakukan sendiri oleh Prudential Indonesia maupun oleh pihak ketiga yang ditunjuk oleh Prudential Indonesia?`,
    H15: 'SAYA dan/atau Calon Peserta Yang Diasuransikan bersedia menerima penawaran produk lainnya (yang tidak berhubungan dengan produk yang SAYA miliki) dari Prudential Syariah melalui sarana komunikasi pribadi, baik yang dilakukan sendiri oleh Prudential Syariah maupun oleh pihak ketiga yang ditunjuk oleh Prudential Syariah?',
    U12: `SAYA dan/atau Calon Tertanggung Utama dan/atau Calon Tertanggung Tambahan 1 dan/atau Tertanggung Tambahan 2 bersedia menerima penawaran produk lainnya (yang tidak berhubungan dengan produk yang SAYA miliki) dari Prudential Indonesia melalui sarana komunikasi pribadi, baik yang dilakukan sendiri oleh Prudential Indonesia maupun oleh pihak ketiga yang ditunjuk oleh Prudential Indonesia?`,
    U13: `SAYA dan/atau Calon Peserta  Utama Yang Diasuransikan dan/atau Calon Peserta Tambahan 1 Yang Diasuransikan dan/atau Calon Peserta Tambahan 2 Yang Diasuransikan bersedia menerima penawaran produk lainnya (yang tidak berhubungan dengan produk yang SAYA miliki) dari Prudential Syariah melalui sarana komunikasi pribadi, baik yang dilakukan sendiri oleh Prudential Syariah maupun oleh pihak ketiga yang ditunjuk oleh Prudential Syariah?`,
    U17R: `SAYA dan/atau Calon Tertanggung dan/atau Calon Pembayar bersedia menerima penawaran produk dari Prudential Indonesia melalui sarana komunikasi pribadi, baik yang dilakukan sendiri oleh Prudential Indonesia maupun oleh pihak ketiga yang ditunjuk oleh Prudential Indonesia?`,
    U17D: `SAYA dan/atau Calon Tertanggung dan/atau Calon Pembayar bersedia menerima penawaran produk dari Prudential Indonesia melalui sarana komunikasi pribadi, baik yang dilakukan sendiri oleh Prudential Indonesia maupun oleh pihak ketiga yang ditunjuk oleh Prudential Indonesia?`,
    E1O: `SAYA dan/atau Calon Peserta  Utama Yang Diasuransikan dan/atau Calon Peserta Tambahan 1 Yang Diasuransikan bersedia menerima penawaran produk lainnya (yang tidak berhubungan dengan produk yang SAYA miliki) dari Prudential Syariah melalui sarana komunikasi pribadi, baik yang dilakukan sendiri oleh Prudential Syariah maupun oleh pihak ketiga yang ditunjuk oleh Prudential Syariah?`,
    E1OP: `SAYA dan/atau Calon Peserta  Utama Yang Diasuransikan dan/atau Calon Peserta Tambahan 1 Yang Diasuransikan bersedia menerima penawaran produk lainnya (yang tidak berhubungan dengan produk yang SAYA miliki) dari Prudential Syariah melalui sarana komunikasi pribadi, baik yang dilakukan sendiri oleh Prudential Syariah maupun oleh pihak ketiga yang ditunjuk oleh Prudential Syariah?`,
    C16: `SAYA dan/atau Calon Peserta Yang Diasuransikan bersedia menerima penawaran produk lainnya (yang tidak berhubungan dengan produk yang SAYA miliki) dari Prudential Syariah melalui sarana komunikasi pribadi, baik yang dilakukan sendiri oleh Prudential Syariah maupun oleh pihak ketiga yang ditunjuk oleh Prudential Syariah?`,
  }

  return PRODUCT_OFFERING[productCode] || wording[productType]
};

export const validateAccountNumber = (value: string) => {
  if (value !== undefined && value !== null) {
    const result = value.replace(/\D/g, '');
    return result;
  }
  return '';
};
