import i18n from 'i18next';

export const validateObject = (_data: TCommonOptionalData) => {
  const message = i18n.t('Epos:required') as string;
  return _data.key != '' || message;
};

export type TCommonOptionalData = { label?: string; key?: string;[key: string]: any };

export type TFundType = {
  type_fund: string;
  type: string;
  type_ui: string;
  desc_fund: string;
  percent: number;
  lowRate: string;
  mediumRate: string;
  highRate: string;
  benRate: string;
};

export type TRate = {
  lowRate: number;
  medRate: number;
  highRate: number;
  benRate: number;
};

export type TBenefitsType = {
  label?: string;
  key?: string;
  riderCode?: string;
  riderName?: string;
};

export type TTrainingState = {
  isVisible: boolean,
  title: string,
  description: string,
  isShowSecondaryButton: boolean
}

export type TParamSMSPaydi = {
  cekatanId: string
}
