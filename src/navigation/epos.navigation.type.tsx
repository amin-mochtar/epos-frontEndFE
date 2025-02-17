import { AppNavigatorParams } from 'common_services_frontend';

export enum EposRoutes {
  NEW_BUSINESS = 'ESQSESPAJ',
  LANDING = 'SQSSPAJLanding',
  PREVIOUSLY_OWNED_POLICY = 'SQSPreviouslyOwnedPolicy',
  POLICY_HOLDER_TARGET = 'SQSPolicyHolderTarget',
  INSURANCE_GOALS = 'SQSInsuranceGoals',
  POLICY_SUBMISSION_TYPE = 'SQSPolicySubmissionType',
  INVESTMENT_RISK_PROFILE = 'SQSInvestmentRiskProfile',
  POLICY_OWNER_DATA = 'SQSPolicyOwnerData',
  MAIN_INSURED_DATA = 'SQSMainInsuredData',
  PRODUCT_RECOMMENDATION = 'SQSProductRecommendation',
  INVESTMENT_FUND = 'SQSInvestmentFund',
  VALIDATION_INCOME = 'SQSValidationIncome',
  CALCULATOR = 'SQSCalculator',
  TOPUPWITHDRAWAL = 'SQSTopupWithdrawal',
  SUBSTANDART = 'SQSSubstandart',
  WAITING_PERIOD = 'SQSWaitingPeriod',
  QUICK_QUOTE = 'SQSQuickQuote',
  QUICK_QUOTE_DETAILS = 'SQSQuickQuoteDetails',
  PREMIUM_PAYOR_INCOME = 'SQSPremiumPayorIncome',
  INVESTMENT_FUND_CONFIRMATION = 'SQSInvestmentFundConfirmation',
  ILLUSTRATION = 'SQSIllustration',
  ILLUSTRATION_SHARE = 'SQSIllustrationShare',
  CONFIRMATION_RECOMMENDATION_PRODUCT = 'SQSConfirmationRecommendationProduct',
  SIGNATURE_PRODUCT_PWM = 'SignatureProductPWM',
  FORM_CONVERSION = 'FormConversion',
  SPAJ_BEFORE_PROCEEDING = 'SPAJBeforeProceeding',
  SPAJ_DATA_COMPLETENESS = 'SPAJDataCompleteness',
  SPAJ_POLICY_OWNER_DATA = 'SPAJPolicyOwnerData',
  SPAJ_PRIMARY_INSURED_CANDIDATE = 'SPAJPrimaryInsuredCandidate',
  SPAJ_PRIMARY_INSURED_ACTIVE = 'SPAJPrimaryInsuredActive',
  SPAJ_ADDITIONAL_INSURED_ACTIVE = 'SPAJAdditionalInsuredActive',
  SPAJ_LIFE_STYLE = 'SPAJLifeStyle',
  SPAJ_MAGNUM_GIO = 'SPAJMagnumGio',
  SPAJ_JOB_DETAIL = 'SPAJJobDetail',
  SPAJ_PHYSICAL_HABITS = 'SPAJPhysicalHabits',
  SPAJ_FAMILY_BACKGROUND = 'SPAJFamilyBackground',
  SPAJ_MEDICAL_HISTORY = 'SPAJMedicalHistory',
  SPAJ_PREMIUM_PAYER_CANDIDATE = 'SPAJPremiumPayerCandidate',
  SPAJ_TOPUP = 'SPAJTopup',
  SPAJ_TOPUP_PREMIUM_PAYER = 'SPAJTopup_Premium_payer',
  SPAJ_BENEFICIARY_CANDIDATE = 'SPAJBeneficiaryCandidate',
  SPAJ_DOC_PROSPECTIVE_POLICYHOLDER = 'SPAJDocProspectivePolicyholder',
  SPAJ_DOC_PROSPECTIVE_POLICYHOLDER_OCR = 'SPAJDocProspectivePolicyholderOCR',
  SPAJ_DOC_PROSPECTIVE_POLICYHOLDER_OCR_COMPARE = 'SPAJDocProspectivePolicyholderOCRCompare',
  SPAJ_DOC_PROSPECTIVE_POLICYHOLDER_OCR_REVIEW = 'SPAJDocProspectivePolicyHolderOCRReview',
  SPAJ_DOC_PROSPECTIVE_POLICYHOLDER_LIVENESS = 'SPAJDocProspectivePolicyholderLiveness',
  SPAJ_DOC_PRIMARY_PARTICIPANT_CANDIDATE = 'SPAJDocPrimaryParticipantCandidate',
  SPAJ_AMANDEMENT = 'SPAJAmandement',
  DISCLAIMER = 'SPAJDisclaimer',
  LINK_SUBMITTED = 'SPAJLinkSubmitted',
  SQS_SIGNATURE = 'SQSSignature',
  SPAJ_DIGITAL_SIGN = 'SPAJDigitalSign',
  SPAJ_DOC_PREMIUM_PAYOR = 'SPAJDocPremiumPayor',
  SPAJ_DOC_TOPUP_PAYOR = 'SPAJDocTopupPayor',
  SPAJ_SIGNATURE = 'SPAJSiganture',
  SPAJ_PAYMENT = 'SPAJPayment',
  LAMPUNG_FORM = 'LampungForm',
  WAKAF = 'Wakaf',
  PRINT_ELECTRONIC_POLICY = 'PrintElectronicPolicy',
  INSURANCE_ATTACHMENT_LETTER = 'InsuranceAttachmentLetter',
  SPAJ_UNDERWRITING_DECISION = 'SPAJUnderwritingDecision',
  SPAJ_EXCLUSTION_OFFERING = 'SPAJExclusionOffering',
  SPAJ_LSAR = 'SPAJLSAR',
  SPAJ_ABR = 'SPAJABR',
}

export type EposNavigationParams = AppNavigatorParams & {
  [EposRoutes.LANDING]: undefined;
  // SQS
  [EposRoutes.PREVIOUSLY_OWNED_POLICY]: undefined;
  [EposRoutes.POLICY_HOLDER_TARGET]: undefined;
  [EposRoutes.INSURANCE_GOALS]: { sqsState: string } | undefined;
  [EposRoutes.POLICY_SUBMISSION_TYPE]: undefined;
  [EposRoutes.INVESTMENT_RISK_PROFILE]: undefined;
  [EposRoutes.POLICY_OWNER_DATA]: { sqsState: string } | undefined;
  [EposRoutes.MAIN_INSURED_DATA]: { sqsState: string } | undefined;
  [EposRoutes.PRODUCT_RECOMMENDATION]: { sqsState: string } | undefined;
  [EposRoutes.INVESTMENT_FUND]: undefined;
  [EposRoutes.VALIDATION_INCOME]: undefined;
  [EposRoutes.CALCULATOR]: undefined;
  [EposRoutes.TOPUPWITHDRAWAL]: undefined;
  [EposRoutes.SUBSTANDART]: undefined;
  [EposRoutes.WAITING_PERIOD]: undefined;
  [EposRoutes.QUICK_QUOTE]: undefined;
  [EposRoutes.QUICK_QUOTE_DETAILS]: undefined;
  [EposRoutes.PREMIUM_PAYOR_INCOME]: undefined;
  [EposRoutes.INVESTMENT_FUND_CONFIRMATION]: undefined;
  [EposRoutes.ILLUSTRATION]: undefined;
  [EposRoutes.ILLUSTRATION_SHARE]: undefined;
  [EposRoutes.CONFIRMATION_RECOMMENDATION_PRODUCT]: undefined;
  //payment
  [EposRoutes.SPAJ_PAYMENT]: undefined;
  [EposRoutes.SIGNATURE_PRODUCT_PWM]: undefined;
  [EposRoutes.FORM_CONVERSION]: undefined;
  // SPAJ
  [EposRoutes.SPAJ_BEFORE_PROCEEDING]: undefined;
  [EposRoutes.SPAJ_DATA_COMPLETENESS]: undefined;
  [EposRoutes.SPAJ_POLICY_OWNER_DATA]: undefined;
  [EposRoutes.SPAJ_PRIMARY_INSURED_CANDIDATE]: undefined;
  [EposRoutes.SPAJ_PRIMARY_INSURED_ACTIVE]: undefined;
  [EposRoutes.SPAJ_ADDITIONAL_INSURED_ACTIVE]: undefined;
  [EposRoutes.SPAJ_LIFE_STYLE]: undefined;
  [EposRoutes.SPAJ_MAGNUM_GIO]: undefined;
  [EposRoutes.SPAJ_JOB_DETAIL]: undefined;
  [EposRoutes.SPAJ_PHYSICAL_HABITS]: undefined;
  [EposRoutes.SPAJ_FAMILY_BACKGROUND]: undefined;
  [EposRoutes.SPAJ_MEDICAL_HISTORY]: undefined;
  [EposRoutes.SPAJ_PREMIUM_PAYER_CANDIDATE]: undefined;
  [EposRoutes.SPAJ_TOPUP]: undefined;
  [EposRoutes.SPAJ_TOPUP_PREMIUM_PAYER]: undefined;
  [EposRoutes.SPAJ_BENEFICIARY_CANDIDATE]: undefined;
  [EposRoutes.SPAJ_DOC_PROSPECTIVE_POLICYHOLDER]: undefined;
  [EposRoutes.SPAJ_DOC_PROSPECTIVE_POLICYHOLDER_OCR]: undefined;
  [EposRoutes.SPAJ_DOC_PROSPECTIVE_POLICYHOLDER_OCR_COMPARE]: undefined;
  [EposRoutes.SPAJ_DOC_PROSPECTIVE_POLICYHOLDER_OCR_REVIEW]: undefined;
  [EposRoutes.SPAJ_DOC_PROSPECTIVE_POLICYHOLDER_LIVENESS]: { isPrimaryInsurance: boolean } | undefined;
  [EposRoutes.SPAJ_DOC_PRIMARY_PARTICIPANT_CANDIDATE]: undefined;
  [EposRoutes.SPAJ_AMANDEMENT]: undefined;
  [EposRoutes.DISCLAIMER]: undefined;
  [EposRoutes.LINK_SUBMITTED]: undefined;
  [EposRoutes.SQS_SIGNATURE]: undefined;
  [EposRoutes.SPAJ_DOC_PREMIUM_PAYOR]: undefined;
  [EposRoutes.SPAJ_DOC_TOPUP_PAYOR]: undefined;
  [EposRoutes.SPAJ_SIGNATURE]: undefined;
  [EposRoutes.SPAJ_DIGITAL_SIGN]: undefined;
  //ADDITIONAL FORMS
  [EposRoutes.LAMPUNG_FORM]: undefined;
  [EposRoutes.WAKAF]: undefined;
  [EposRoutes.PRINT_ELECTRONIC_POLICY]: undefined;
  [EposRoutes.INSURANCE_ATTACHMENT_LETTER]: undefined;
  [EposRoutes.SPAJ_UNDERWRITING_DECISION]: undefined;
  [EposRoutes.SPAJ_EXCLUSTION_OFFERING]: { content?: string };
  [EposRoutes.SPAJ_LSAR]: { needABR?: boolean };
  [EposRoutes.SPAJ_ABR]: { fromLSAR?: boolean };
};

const NEWBUSINESS_MODULE = 'PLAI EPOS Newbusiness'

export const EposRouteTypeMap = {
  [EposRoutes.LANDING]: { module: NEWBUSINESS_MODULE, screen: `${NEWBUSINESS_MODULE} Landing` },
  [EposRoutes.PREVIOUSLY_OWNED_POLICY]: {
    module: NEWBUSINESS_MODULE,
    screen: `PLAI Previously Owned Policy`,
  },
  [EposRoutes.POLICY_HOLDER_TARGET]: {
    module: NEWBUSINESS_MODULE,
    screen: `${NEWBUSINESS_MODULE} Policy Holder Target`,
  },
  [EposRoutes.INSURANCE_GOALS]: { module: NEWBUSINESS_MODULE, screen: `${NEWBUSINESS_MODULE} Insurance Goals` },
  [EposRoutes.POLICY_SUBMISSION_TYPE]: {
    module: NEWBUSINESS_MODULE,
    screen: `${NEWBUSINESS_MODULE} Policy Submission Type`,
  },
  [EposRoutes.INVESTMENT_RISK_PROFILE]: {
    module: NEWBUSINESS_MODULE,
    screen: `${NEWBUSINESS_MODULE} Investment Risk Profile`,
  },
  [EposRoutes.POLICY_OWNER_DATA]: { module: NEWBUSINESS_MODULE, screen: `${NEWBUSINESS_MODULE} Policy Owner Data` },
  [EposRoutes.PRODUCT_RECOMMENDATION]: {
    module: NEWBUSINESS_MODULE,
    screen: `${NEWBUSINESS_MODULE} Product Recommendation`,
  },
  [EposRoutes.INVESTMENT_FUND]: { module: NEWBUSINESS_MODULE, screen: `${NEWBUSINESS_MODULE} Investment Fund` },
  [EposRoutes.VALIDATION_INCOME]: { module: NEWBUSINESS_MODULE, screen: `${NEWBUSINESS_MODULE} Validation Income` },
  [EposRoutes.CALCULATOR]: { module: NEWBUSINESS_MODULE, screen: `${NEWBUSINESS_MODULE} Calculator` },
  [EposRoutes.TOPUPWITHDRAWAL]: { module: NEWBUSINESS_MODULE, screen: `${NEWBUSINESS_MODULE} Topup withdrawal` },
  [EposRoutes.SUBSTANDART]: { module: NEWBUSINESS_MODULE, screen: `${NEWBUSINESS_MODULE} Substandar` },
  [EposRoutes.WAITING_PERIOD]: { module: NEWBUSINESS_MODULE, screen: `${NEWBUSINESS_MODULE} Waiting Period` },
  [EposRoutes.QUICK_QUOTE]: { module: NEWBUSINESS_MODULE, screen: `${NEWBUSINESS_MODULE} Quick Quote` },
  [EposRoutes.QUICK_QUOTE_DETAILS]: { module: NEWBUSINESS_MODULE, screen: `${NEWBUSINESS_MODULE} Quick Quote Details` },
  [EposRoutes.CONFIRMATION_RECOMMENDATION_PRODUCT]: {
    module: NEWBUSINESS_MODULE,
    screen: `${NEWBUSINESS_MODULE} Confirmation Recommendation Product`,
  },
  [EposRoutes.PREMIUM_PAYOR_INCOME]: {
    module: NEWBUSINESS_MODULE,
    screen: `${NEWBUSINESS_MODULE} Premium Payor Income`,
  },
  [EposRoutes.SPAJ_BEFORE_PROCEEDING]: {
    module: NEWBUSINESS_MODULE,
    screen: `${NEWBUSINESS_MODULE} SPAJ Before Proceeding`,
  },
  [EposRoutes.SPAJ_DATA_COMPLETENESS]: {
    module: NEWBUSINESS_MODULE,
    screen: `${NEWBUSINESS_MODULE} SPAJ Completeness`,
  },
  [EposRoutes.SPAJ_POLICY_OWNER_DATA]: {
    module: NEWBUSINESS_MODULE,
    screen: `${NEWBUSINESS_MODULE} SPAJ Policy Owner Data`,
  },
  [EposRoutes.SPAJ_PRIMARY_INSURED_CANDIDATE]: {
    module: NEWBUSINESS_MODULE,
    screen: `${NEWBUSINESS_MODULE} SPAJ Primary Insured Candidate`,
  },
  [EposRoutes.SPAJ_PRIMARY_INSURED_ACTIVE]: {
    module: NEWBUSINESS_MODULE,
    screen: `${NEWBUSINESS_MODULE} SPAJ Primary Insured Active`,
  },
  [EposRoutes.SPAJ_ADDITIONAL_INSURED_ACTIVE]: {
    module: NEWBUSINESS_MODULE,
    screen: `${NEWBUSINESS_MODULE} SPAJ Additional Insured Active`,
  },
  [EposRoutes.SPAJ_LIFE_STYLE]: {
    module: NEWBUSINESS_MODULE,
    screen: `${NEWBUSINESS_MODULE} SPAJ Life Style`,
  },
  [EposRoutes.SPAJ_MAGNUM_GIO]: {
    module: NEWBUSINESS_MODULE,
    screen: `${NEWBUSINESS_MODULE} SPAJ Magnum GIO`,
  },
  [EposRoutes.SPAJ_JOB_DETAIL]: {
    module: NEWBUSINESS_MODULE,
    screen: `${NEWBUSINESS_MODULE} SPAJ Job Detail`,
  },
  [EposRoutes.SPAJ_PHYSICAL_HABITS]: {
    module: NEWBUSINESS_MODULE,
    screen: `${NEWBUSINESS_MODULE} SPAJ Physical Habits`,
  },
  [EposRoutes.SPAJ_FAMILY_BACKGROUND]: {
    module: NEWBUSINESS_MODULE,
    screen: `${NEWBUSINESS_MODULE} SPAJ Family Background`,
  },
  [EposRoutes.SPAJ_MEDICAL_HISTORY]: {
    module: NEWBUSINESS_MODULE,
    screen: `${NEWBUSINESS_MODULE} SPAJ Medical History`,
  },
  [EposRoutes.SPAJ_PREMIUM_PAYER_CANDIDATE]: {
    module: NEWBUSINESS_MODULE,
    screen: `${NEWBUSINESS_MODULE} SPAJ Premium Payer Candidate`,
  },
  [EposRoutes.SPAJ_TOPUP]: {
    module: NEWBUSINESS_MODULE,
    screen: `${NEWBUSINESS_MODULE} SPAJ Top-Up`,
  },
  [EposRoutes.SPAJ_TOPUP_PREMIUM_PAYER]: {
    module: NEWBUSINESS_MODULE,
    screen: `${NEWBUSINESS_MODULE} SPAJ Top-Up Premium Payer`,
  },
  [EposRoutes.SPAJ_BENEFICIARY_CANDIDATE]: {
    module: NEWBUSINESS_MODULE,
    screen: `${NEWBUSINESS_MODULE} SPAJ Beneficiary Candidate`,
  },
  [EposRoutes.SPAJ_DOC_PROSPECTIVE_POLICYHOLDER]: {
    module: NEWBUSINESS_MODULE,
    screen: `${NEWBUSINESS_MODULE} SPAJ Doc Prospective Policyholder`,
  },
  [EposRoutes.SPAJ_DOC_PROSPECTIVE_POLICYHOLDER_OCR]: {
    module: NEWBUSINESS_MODULE,
    screen: `${NEWBUSINESS_MODULE} SPAJ Doc Prospective Policyholder for OCR`,
  },
  [EposRoutes.SPAJ_DOC_PROSPECTIVE_POLICYHOLDER_OCR_COMPARE]: {
    module: NEWBUSINESS_MODULE,
    screen: `${NEWBUSINESS_MODULE} SPAJ Doc Prospective Policyholder for OCR, Compare OCR with SQS and SPAJ data`,
  },
  [EposRoutes.SPAJ_DOC_PROSPECTIVE_POLICYHOLDER_OCR_REVIEW]: {
    module: NEWBUSINESS_MODULE,
    screen: `${NEWBUSINESS_MODULE} SPAJ Doc Prospective Policyholder for OCR, Review Result OCR with SQS and SPAJ data`,
  },

  [EposRoutes.SPAJ_DOC_PROSPECTIVE_POLICYHOLDER_LIVENESS]: {
    module: NEWBUSINESS_MODULE,
    screen: `${NEWBUSINESS_MODULE} SPAJ Doc Prospective Policyholder for Liveness`,
  },
  [EposRoutes.SPAJ_DOC_PRIMARY_PARTICIPANT_CANDIDATE]: {
    module: NEWBUSINESS_MODULE,
    screen: `${NEWBUSINESS_MODULE} SPAJ Doc Primary Participant Candidate`,
  },
  [EposRoutes.SPAJ_AMANDEMENT]: {
    module: NEWBUSINESS_MODULE,
    screen: `${NEWBUSINESS_MODULE} SPAJ Amandement`,
  },
  [EposRoutes.DISCLAIMER]: {
    module: NEWBUSINESS_MODULE,
    screen: `${NEWBUSINESS_MODULE} Disclaimer`,
  },
  [EposRoutes.LINK_SUBMITTED]: {
    module: NEWBUSINESS_MODULE,
    screen: `${NEWBUSINESS_MODULE} SPAJ link submitted`,
  },
  [EposRoutes.SQS_SIGNATURE]: {
    module: NEWBUSINESS_MODULE,
    screen: `${NEWBUSINESS_MODULE} SQS Signature`,
  },
  [EposRoutes.LAMPUNG_FORM]: {
    module: NEWBUSINESS_MODULE,
    screen: `${NEWBUSINESS_MODULE} Lampung additional Form`,
  },
  [EposRoutes.SPAJ_DOC_PREMIUM_PAYOR]: {
    module: NEWBUSINESS_MODULE,
    screen: `${NEWBUSINESS_MODULE} SPAJ Doc Premium Payor`,
  },
  [EposRoutes.SPAJ_DOC_TOPUP_PAYOR]: {
    module: NEWBUSINESS_MODULE,
    screen: `${NEWBUSINESS_MODULE} SPAJ Doc Topup Payor`,
  },
  [EposRoutes.SPAJ_SIGNATURE]: {
    module: NEWBUSINESS_MODULE,
    screen: `${NEWBUSINESS_MODULE} SPAJ SignatureP`,
  },
  [EposRoutes.WAKAF]: {
    module: NEWBUSINESS_MODULE,
    screen: `${NEWBUSINESS_MODULE} Wakaf`,
  },
  [EposRoutes.PRINT_ELECTRONIC_POLICY]: {
    module: NEWBUSINESS_MODULE,
    screen: `${NEWBUSINESS_MODULE} Print Electronic Policy`,
  },
  [EposRoutes.INSURANCE_ATTACHMENT_LETTER]: {
    module: NEWBUSINESS_MODULE,
    screen: `${NEWBUSINESS_MODULE} Insurance Attachment Letter`,
  },
  [EposRoutes.SPAJ_PAYMENT]: {
    module: NEWBUSINESS_MODULE,
    screen: `${NEWBUSINESS_MODULE} Payment`,
  },
  [EposRoutes.SIGNATURE_PRODUCT_PWM]: {
    module: NEWBUSINESS_MODULE,
    screen: `${NEWBUSINESS_MODULE} Signature Product PWM`,
  },
  [EposRoutes.FORM_CONVERSION]: {
    module: NEWBUSINESS_MODULE,
    screen: `${NEWBUSINESS_MODULE} Form Conversion`,
  },
  [EposRoutes.SPAJ_UNDERWRITING_DECISION]: {
    module: NEWBUSINESS_MODULE,
    screen: `${NEWBUSINESS_MODULE} SPAJ Underwriting Decision`,
  },
  [EposRoutes.SPAJ_EXCLUSTION_OFFERING]: {
    module: NEWBUSINESS_MODULE,
    screen: `${NEWBUSINESS_MODULE} SPAJ Exclustion Offering`,
  },
  [EposRoutes.SPAJ_LSAR]: {
    module: NEWBUSINESS_MODULE,
    screen: `${NEWBUSINESS_MODULE} SPAJ LSAR`,
  },
  [EposRoutes.SPAJ_ABR]: {
    module: NEWBUSINESS_MODULE,
    screen: `${NEWBUSINESS_MODULE} SPAJ ABR`,
  },
};
