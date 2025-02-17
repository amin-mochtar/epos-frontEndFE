import { checkMaximumPremi, replacePlaceholderInMessage, shouldShowNoticeBar } from "./calculator.config";

describe('replacePlaceholderInMessage', () => {
  it('replaces the placeholder in the message with the value', () => {
    const message = `Your primogems is {0}.`;
    const value = 1000;
    const result = replacePlaceholderInMessage(message, value);
    expect(result).toBe('You primogems is 1,000.');
  });

  it('returns the original message if no placeholder is found', () => {
    const message = 'Your primogems is 1000.';
    const value = 1000;
    const result = replacePlaceholderInMessage(message, value);
    expect(result).toBe('Your primogems is 1000.');
  });
});

describe('shouldShowNoticeBar', () => {
  it('returns true if alert ruleType is in the ruleType list', () => {
    const alert = { ruleType: 'MAXLIFEAGE_YEAR' };
    const item = { rule: 'periodMain' };
    const result = shouldShowNoticeBar(alert, item);
    expect(result).toBe(true);
  });

  it('returns false if alert ruleType is not in the ruleType list', () => {
    const alert = { ruleType: 'UNKNOWN_RULE' };
    const item = { rule: 'periodMain' };
    const result = shouldShowNoticeBar(alert, item);
    expect(result).toBe(false);
  });

  it('returns false if item rule is not in ruleTypes', () => {
    const alert = { ruleType: 'MAXLIFEAGE_YEAR' };
    const item = { rule: 'unknownRule' };
    const result = shouldShowNoticeBar(alert, item);
    expect(result).toBe(false);
  });
});

describe('checkMaximumPremi', () => {
  it('returns true if client budget exceeds max premium and productKey requires check', () => {
    const params = {
      lifeAssured: 'self',
      productKey: 'U12',
      income: { client: 50000, payer: 30000 },
      clientBudget: 30000,
      isPolicyHolderIsPremiumPayorSelf: true,
    };
    const result = checkMaximumPremi(params);
    expect(result).toBe(true);
  });

  it('returns false if client budget does not exceed max premium', () => {
    const params = {
      lifeAssured: 'self',
      productKey: 'U12',
      income: { client: 50000, payer: 30000 },
      clientBudget: 20000,
      isPolicyHolderIsPremiumPayorSelf: true,
    };
    const result = checkMaximumPremi(params);
    expect(result).toBe(false);
  });

  it('returns false if productKey does not require max premium check', () => {
    const params = {
      lifeAssured: 'self',
      productKey: 'H14', //PWM dkk
      income: { client: 50000, payer: 0 },
      clientBudget: 30000,
      isPolicyHolderIsPremiumPayorSelf: true,
    };
    const result = checkMaximumPremi(params);
    expect(result).toBe(false);
  });
});