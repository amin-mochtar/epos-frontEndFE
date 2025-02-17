import { ErrorBoundary } from '../components';
import {
  ConfirmationRecommendationProductScreen,
  InsuranceGoalsScreen,
  InvestmentRiskProfileScreen,
  LandingScreen,
  PolicyHolderTargetScreen,
  PolicyOwnerDataScreen,
  PolicySubmissionTypeScreen,
  PreviouslyOwnedPolicyScreen,
  InvestmentFundScreen,
  ValidationIncomeScreen,
  WaitingPeriodScreen,
  QuickQuoteScreen,
  QuickQuoteDetailsScreen,
  ProductRecommendationScreen,
  CalculatorScreen,
  TopupWithdrawalsScreen,
  SubstrandartScreen,
  PremiumPayorIncomeScreen,
  SPAJPolicyOwnerDataScreen,
  SpajBeforeProceedingScreen,
  SPAJPrimaryInsuredCandidateScreen,
  SPAJPhysicalHabitsScreen,
  SPAJFamilyBackgroundScreen,
  SPAJLifeStyleScreen,
  SpajDataCompletenessScreen,
  SPAJMedicalHistoryScreen,
  SPAJPremiumPayerCandidateScreen,
  SPAJAdditionalInsuredActiveScreen,
  SPAJTopupScreen,
  SPAJTopupPremiumPayerScreen,
  SPAJPrimaryInsuredActiveScreen,
  SPAJBeneficiaryCandidateScreen,
  SPAJAmandementScreen,
  SPAJDocProspectivePolicyholderScreen,
  SPAJDocPrimaryParticipantCandidateScreen,
  MainInsuredDataScreen,
  Disclaimer,
  linkSumbitted,
  SqsSignatureScreen,
  SPAJDocPremiumPayorScreen,
  SPAJDocTopupPayorScreen,
  SpajSignatureScreen,
  LampungFormScreen,
  WakafScreen,
  PrintElectronicPolicyScreen,
  InsuranceAttachmentLetterScreen,
  SpajPaymentScreen,
  ConfirmProductDoksulScreen,
  FormConversionScreen,
  SpajDigitalSignScreen,
  SPAJUnderwritingDecision,
  SPAJExclusionOffering,
  SPAJLsar,
  SPAJAbr,
  IllustrationNewScreen
} from '../screen';
import { SPAJDocProspectivePolicyholderLivenessScreen } from '../screen/espaj/spaj-doc-prospective-policyholder-liveness/spaj-doc-prospective-policyholder-liveness.screen';
import { SPAJDocProspectivePolicyholderOCRCompareScreen } from '../screen/espaj/spaj-doc-prospective-policyholder-ocr-compare/spaj-doc-prospective-policyholder-ocr-compare.screen';
import { SPAJDocProspectivePolicyholderOCRReviewScreen } from '../screen/espaj/spaj-doc-prospective-policyholder-ocr-review/spaj-doc-prospective-policyholder-ocr-review.screen';
import { SPAJDocProspectivePolicyholderOCRScreen } from '../screen/espaj/spaj-doc-prospective-policyholder-ocr/spaj-doc-prospective-policyholder-ocr.screen';
import { EposNavigationParams, EposRoutes } from './epos.navigation.type';
import { TransitionPresets, createStackNavigator } from '@react-navigation/stack';

const EposStack = createStackNavigator<EposNavigationParams>();

const _EposNavigation = () => {
  return (
    <ErrorBoundary>
      <EposStack.Navigator
        initialRouteName={EposRoutes.LANDING}
        screenOptions={{
          headerShown: false,
          gestureEnabled: false,
          ...TransitionPresets.SlideFromRightIOS,
        }}
        headerMode="none"
      >
        <EposStack.Screen name={EposRoutes.LANDING} component={LandingScreen} />
        <EposStack.Screen name={EposRoutes.PREVIOUSLY_OWNED_POLICY} component={PreviouslyOwnedPolicyScreen} />
        <EposStack.Screen name={EposRoutes.POLICY_HOLDER_TARGET} component={PolicyHolderTargetScreen} />
        <EposStack.Screen name={EposRoutes.INSURANCE_GOALS} component={InsuranceGoalsScreen} />
        <EposStack.Screen name={EposRoutes.POLICY_SUBMISSION_TYPE} component={PolicySubmissionTypeScreen} />
        <EposStack.Screen name={EposRoutes.INVESTMENT_RISK_PROFILE} component={InvestmentRiskProfileScreen} />
        <EposStack.Screen name={EposRoutes.POLICY_OWNER_DATA} component={PolicyOwnerDataScreen} />
        <EposStack.Screen name={EposRoutes.MAIN_INSURED_DATA} component={MainInsuredDataScreen} />
        <EposStack.Screen name={EposRoutes.PRODUCT_RECOMMENDATION} component={ProductRecommendationScreen} />
        <EposStack.Screen name={EposRoutes.INVESTMENT_FUND} component={InvestmentFundScreen} />
        <EposStack.Screen name={EposRoutes.CALCULATOR} component={CalculatorScreen} />
        <EposStack.Screen name={EposRoutes.TOPUPWITHDRAWAL} component={TopupWithdrawalsScreen} />
        <EposStack.Screen name={EposRoutes.SUBSTANDART} component={SubstrandartScreen} />
        <EposStack.Screen name={EposRoutes.VALIDATION_INCOME} component={ValidationIncomeScreen} />
        <EposStack.Screen name={EposRoutes.WAITING_PERIOD} component={WaitingPeriodScreen} />
        <EposStack.Screen name={EposRoutes.QUICK_QUOTE} component={QuickQuoteScreen} />
        <EposStack.Screen name={EposRoutes.QUICK_QUOTE_DETAILS} component={QuickQuoteDetailsScreen} />
        <EposStack.Screen
          name={EposRoutes.CONFIRMATION_RECOMMENDATION_PRODUCT}
          component={ConfirmationRecommendationProductScreen}
        />
        <EposStack.Screen name={EposRoutes.PREMIUM_PAYOR_INCOME} component={PremiumPayorIncomeScreen} />
        <EposStack.Screen name={EposRoutes.ILLUSTRATION} component={IllustrationNewScreen} />
        <EposStack.Screen
          name={EposRoutes.ILLUSTRATION_SHARE}
          component={IllustrationNewScreen}
          options={{ headerShown: false }}
        />
        <EposStack.Screen name={EposRoutes.INVESTMENT_FUND_CONFIRMATION} component={InvestmentFundScreen} />
        <EposStack.Screen name={EposRoutes.SPAJ_BEFORE_PROCEEDING} component={SpajBeforeProceedingScreen} />
        <EposStack.Screen name={EposRoutes.SPAJ_DATA_COMPLETENESS} component={SpajDataCompletenessScreen} />
        <EposStack.Screen name={EposRoutes.SPAJ_POLICY_OWNER_DATA} component={SPAJPolicyOwnerDataScreen} />
        <EposStack.Screen
          name={EposRoutes.SPAJ_PRIMARY_INSURED_CANDIDATE}
          component={SPAJPrimaryInsuredCandidateScreen}
        />
        <EposStack.Screen name={EposRoutes.SPAJ_PRIMARY_INSURED_ACTIVE} component={SPAJPrimaryInsuredActiveScreen} />
        <EposStack.Screen
          name={EposRoutes.SPAJ_ADDITIONAL_INSURED_ACTIVE}
          component={SPAJAdditionalInsuredActiveScreen}
        />
        <EposStack.Screen name={EposRoutes.SPAJ_LIFE_STYLE} component={SPAJLifeStyleScreen} />
        <EposStack.Screen name={EposRoutes.SPAJ_PHYSICAL_HABITS} component={SPAJPhysicalHabitsScreen} />
        <EposStack.Screen name={EposRoutes.SPAJ_FAMILY_BACKGROUND} component={SPAJFamilyBackgroundScreen} />
        <EposStack.Screen name={EposRoutes.SPAJ_MEDICAL_HISTORY} component={SPAJMedicalHistoryScreen} />
        <EposStack.Screen name={EposRoutes.SPAJ_PREMIUM_PAYER_CANDIDATE} component={SPAJPremiumPayerCandidateScreen} />
        <EposStack.Screen name={EposRoutes.SPAJ_TOPUP} component={SPAJTopupScreen} />
        <EposStack.Screen name={EposRoutes.SPAJ_TOPUP_PREMIUM_PAYER} component={SPAJTopupPremiumPayerScreen} />
        <EposStack.Screen name={EposRoutes.SPAJ_BENEFICIARY_CANDIDATE} component={SPAJBeneficiaryCandidateScreen} />
        <EposStack.Screen
          name={EposRoutes.SPAJ_DOC_PROSPECTIVE_POLICYHOLDER}
          component={SPAJDocProspectivePolicyholderScreen}
        />
        <EposStack.Screen
          name={EposRoutes.SPAJ_DOC_PROSPECTIVE_POLICYHOLDER_OCR}
          component={SPAJDocProspectivePolicyholderOCRScreen}
        />
        <EposStack.Screen
          name={EposRoutes.SPAJ_DOC_PROSPECTIVE_POLICYHOLDER_OCR_COMPARE}
          component={SPAJDocProspectivePolicyholderOCRCompareScreen}
        />
        <EposStack.Screen
          name={EposRoutes.SPAJ_DOC_PROSPECTIVE_POLICYHOLDER_OCR_REVIEW}
          component={SPAJDocProspectivePolicyholderOCRReviewScreen}
        />
        <EposStack.Screen
          name={EposRoutes.SPAJ_DOC_PROSPECTIVE_POLICYHOLDER_LIVENESS}
          component={SPAJDocProspectivePolicyholderLivenessScreen}
        />
        <EposStack.Screen
          name={EposRoutes.SPAJ_DOC_PRIMARY_PARTICIPANT_CANDIDATE}
          component={SPAJDocPrimaryParticipantCandidateScreen}
        />
        <EposStack.Screen name={EposRoutes.SPAJ_AMANDEMENT} component={SPAJAmandementScreen} />
        <EposStack.Screen name={EposRoutes.DISCLAIMER} component={Disclaimer} />
        <EposStack.Screen name={EposRoutes.LINK_SUBMITTED} component={linkSumbitted} />
        <EposStack.Screen name={EposRoutes.SQS_SIGNATURE} component={SqsSignatureScreen} />
        <EposStack.Screen name={EposRoutes.SPAJ_DOC_PREMIUM_PAYOR} component={SPAJDocPremiumPayorScreen} />
        <EposStack.Screen name={EposRoutes.SPAJ_DOC_TOPUP_PAYOR} component={SPAJDocTopupPayorScreen} />
        <EposStack.Screen name={EposRoutes.SPAJ_SIGNATURE} component={SpajSignatureScreen} />
        <EposStack.Screen name={EposRoutes.SPAJ_DIGITAL_SIGN} component={SpajDigitalSignScreen} />
        <EposStack.Screen name={EposRoutes.LAMPUNG_FORM} component={LampungFormScreen} />
        <EposStack.Screen name={EposRoutes.WAKAF} component={WakafScreen} />
        <EposStack.Screen name={EposRoutes.PRINT_ELECTRONIC_POLICY} component={PrintElectronicPolicyScreen} />
        <EposStack.Screen name={EposRoutes.INSURANCE_ATTACHMENT_LETTER} component={InsuranceAttachmentLetterScreen} />
        <EposStack.Screen name={EposRoutes.SPAJ_PAYMENT} component={SpajPaymentScreen} />
        <EposStack.Screen name={EposRoutes.SIGNATURE_PRODUCT_PWM} component={ConfirmProductDoksulScreen} />
        <EposStack.Screen name={EposRoutes.FORM_CONVERSION} component={FormConversionScreen} />
        <EposStack.Screen name={EposRoutes.SPAJ_UNDERWRITING_DECISION} component={SPAJUnderwritingDecision} />
        <EposStack.Screen name={EposRoutes.SPAJ_EXCLUSTION_OFFERING} component={SPAJExclusionOffering} />
        <EposStack.Screen name={EposRoutes.SPAJ_LSAR} component={SPAJLsar} />
        <EposStack.Screen name={EposRoutes.SPAJ_ABR} component={SPAJAbr} />
      </EposStack.Navigator>
    </ErrorBoundary>
  );
};

// export const EposNavigation = [{ name: EposRoutes.NEW_BUSINESS, component: _EposNavigation }];
export default _EposNavigation;
