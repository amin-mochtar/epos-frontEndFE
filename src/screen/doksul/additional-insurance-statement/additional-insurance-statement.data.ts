import { TCommonConstantData } from 'plai_common_frontend';
import { checkMainParticipant, WR_SHARIA_CONVENT } from '../../../utilities';
import i18next from 'i18next';

export const getAdditionalInsuranceStatementList = (type: string, product: TCommonConstantData, riderName: string) => {
  const { period, spaj, companyName, company: companyType } = WR_SHARIA_CONVENT[type];
  const mainParticipant = checkMainParticipant(product?.key!, type);
  const _riderName = riderName.slice(3);
  const otherCompany = type === 'sharia' ? 'PT Prudential Life Assurance' : 'PT Prudential Sharia Life Assurance'

  return [
    {
      key: i18next.t('Epos:additional_insured_note1', { period, riderName: _riderName, productName: product?.label })
    },
    {
      key: i18next.t('Epos:additional_insured_note2', { mainParticipant, companyType, companyName, otherCompany })
    },
    {
      key: i18next.t('Epos:additional_insured_note3', { spaj })
    },
    {
      key: i18next.t('Epos:additional_insured_note4')
    },
    {
      key: i18next.t('Epos:additional_insured_note5', { companyType })
    },
  ];
};
