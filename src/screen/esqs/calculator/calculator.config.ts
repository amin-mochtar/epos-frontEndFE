import { numberWithCommas } from 'plai_common_frontend';
import { TCheckPremiParams } from './calculator.type';
import { productType } from '../../../utilities';

// product release date
const RELEASE_DATE: { [key: string]: string } = {
  U12: '2023-03-03',
  U13: '2023-03-03',
  H14: '2023-03-03',
  H15: '2023-03-03',
};

// product that has disabled annual premium
const DISABLED_ANNUAL_PREMI = ['H14', 'H15', 'L1Q', 'E1O', 'E1OP', 'C16', 'T1P', 'T1Q', 'L1WR', 'L1WD'];

// product that must check max premi
const MUST_CHECK_MAX_PREMI = ['U12', 'U13', 'E1O', 'E1OP', 'C16', 'L1Q', 'T1P', 'T1Q', 'L1WR', 'L1WD'];

// placeholder for alert to replace
const ALERT_MESSAGE_PLACEHOLDER = '{0}';

// rule types
const ruleTypes: Record<string, string[]> = {
  periodMain: [
    'MAXUNAPPLIEDPREMI',
    'MAXLIFEAGE_YEAR',
    'CUSTAGE_VAL_FORTERM01',
    'CUSTAGE_VAL_FORTERM02',
    'MINLIFEAGE-DAY',
    'MINUNAPPLIEDPREMI',
  ],
  planRider: [
    'MINLIFEAGE-DAY',
    'CAMPAIGN27',
    'MAXMINLIFE_GIO',
    'VAL_TERMPPHPLUS',
    'MAXMINLIFE_GIO',
    'RIDEROBSOLETE',
    'VAL_TERMPPHPLUS01',
    'NOTALLOWPPH',
    'CAMPAIGN01',
    'MAXLIFEAGE_YEAR',
    'MINCVT_PPH_ALT',
    'MAXSAR08',
    'MINCVT_PPH',
    'CLAIMPPHPRO',
    'R_PPH_AGE_PLAN',
    'R_PPH_AGE_PLAN',
    'R_PPH_AGE_PLAN_2',
  ],
  saMain: [
    'MAXLIFEAGE_YEAR',
    'R_MAX_ADDLIFE1AGE',
    'R_MIN_ADDLIFE1AGE',
    'SA_MULTIPLIER_ROP',
    'MINSA',
    'R_MAXPREMIPLANROP',
    'SA_MULTIPLIER_ROP',
    'R_MAX_PLAN',
    'MINSASUM',
    'R_SA_MULTIPLIER_TWL',
    'MINLIFEAGE_YEAR',
    'SA_MULTIPLIER_NONPAR',
  ],
  premiTopup: ['MINUNAPPLIEDPREMI', 'SAVER'],
  premi: [
    'MINPREM',
    'BLOCKCSASHNEW',
    'PREM_MULTIPLIER',
    'R_MINRPREMIPAS_BERKALA',
    'R_MIN_PREMI_&_SAVER_U13R',
    'R_MIN_PREMI_E1O',
    'R_MINRCONTNONPAR',
    'R_MINRPREMIROP_BERKALA',
    'R_MINRPREMIWLS_BERKALA',
    'R_MINRPREMIWLS',
    'R_MINRPREMIROP_TUNGGAL',
    'MINLIFEAGE_YEAR'
  ],
  contribusiTopup: ['SAVER'],
};

const replacePlaceholderInMessage = (message: string, value: number | string) => {
  if (message.includes(ALERT_MESSAGE_PLACEHOLDER)) {
    return message.replace(ALERT_MESSAGE_PLACEHOLDER, numberWithCommas(value.toString()));
  }
  return message;
};

const shouldShowNoticeBar = (alert: { ruleType: string }, item: { rule: string }) => {
  const ruleType = ruleTypes[item.rule];
  if (!ruleType) {
    return false;
  }
  return ruleType.includes(alert.ruleType);
};

const checkMaximumPremi = ({
  lifeAssured,
  productKey,
  income,
  clientBudget,
  isPolicyHolderIsPremiumPayorSelf,
}: TCheckPremiParams) => {
  let totalIncome = income.client;

  const isUnitLink = productType(productKey) == 'UL';
  if (isUnitLink) {
    const samePayor = lifeAssured == 'self' || isPolicyHolderIsPremiumPayorSelf;
    totalIncome = samePayor ? income.payer + income.client : income.payer;
  }

  const maxPremi = (totalIncome * 12 * 30) / 100;

  return clientBudget > maxPremi && MUST_CHECK_MAX_PREMI.includes(productKey);
};

export {
  RELEASE_DATE,
  DISABLED_ANNUAL_PREMI,
  MUST_CHECK_MAX_PREMI,
  ruleTypes,
  replacePlaceholderInMessage,
  shouldShowNoticeBar,
  checkMaximumPremi,
};
