import { MAGNUMMASTER, TBootstrapAttributes } from './model';

export const magnumBootStarpData: MAGNUMMASTER = {
  basicData: {
    'case.life.SmokingStatus': [
      {
        attribute: 'SmokingStatus',
        label: 'SMOKER',
        locator: 'case.life.SmokingStatus',
        dataBlock: 'A',
        uuid: '3c718d43-4db5-471c-bfc7-9ead40a91d97',
      },
      {
        attribute: 'SmokingStatus',
        label: 'NON_SMOKER',
        locator: 'case.life.SmokingStatus',
        dataBlock: 'A',
        uuid: 'e2813798-35a9-4e2f-9715-f90ba5161413',
      },
    ],
    'case.life.product.LifeRole': [
      {
        attribute: 'LifeRole',
        label: 'Main Life',
        locator: 'case.life.product.LifeRole',
        dataBlock: 'A',
        uuid: '3f0a276f-b01a-4404-8a96-830643db8184',
      },
      {
        attribute: 'LifeRole',
        label: 'Second Life',
        locator: 'case.life.product.LifeRole',
        dataBlock: 'A',
        uuid: '38343975-af27-4bc2-a52a-35dbac1b715e',
      },
    ],
    'case.life.ExistingSystemsRecords.ClaimRecord.ClaimBenefitType': [
      {
        attribute: 'ClaimBenefitType',
        label: 'ACC',
        locator: 'case.life.ExistingSystemsRecords.ClaimRecord.ClaimBenefitType',
        dataBlock: 'C',
        uuid: '35d38e17-306c-4f66-9904-3f7c841139a8',
      },
      {
        attribute: 'ClaimBenefitType',
        label: 'DEATH',
        locator: 'case.life.ExistingSystemsRecords.ClaimRecord.ClaimBenefitType',
        dataBlock: 'C',
        uuid: '225b6509-ad52-4800-9f8c-58c3ecbf7b67',
      },
      {
        attribute: 'ClaimBenefitType',
        label: 'DIS',
        locator: 'case.life.ExistingSystemsRecords.ClaimRecord.ClaimBenefitType',
        dataBlock: 'C',
        uuid: '90338c41-ab8b-4568-b941-3be7492133e6',
      },
      {
        attribute: 'ClaimBenefitType',
        label: 'MED',
        locator: 'case.life.ExistingSystemsRecords.ClaimRecord.ClaimBenefitType',
        dataBlock: 'C',
        uuid: '628f8fdf-83a9-45ed-851e-d6180f6357be',
      },
      {
        attribute: 'ClaimBenefitType',
        label: 'CI',
        locator: 'case.life.ExistingSystemsRecords.ClaimRecord.ClaimBenefitType',
        dataBlock: 'C',
        uuid: 'afdae36d-67a0-4118-869f-e2ec1f16fd47',
      },
    ],
    'case.life.product.benefit.WOPCategory': [
      {
        attribute: 'WOPCategory',
        label: 'Payor',
        locator: 'case.life.product.benefit.WOPCategory',
        dataBlock: 'A',
        uuid: 'af59ce86-0f57-4962-8d8e-ab2340a028e0',
      },
      {
        attribute: 'WOPCategory',
        label: 'Spouse',
        locator: 'case.life.product.benefit.WOPCategory',
        dataBlock: 'A',
        uuid: '0e364780-099e-4b6a-bcfd-8467eced2e77',
      },
      {
        attribute: 'WOPCategory',
        label: 'Waiver',
        locator: 'case.life.product.benefit.WOPCategory',
        dataBlock: 'A',
        uuid: '35d766f4-dca3-461d-8b2b-c5fd5fa20cc9',
      },
    ],
    'case.CountryOfContract': [
      {
        attribute: 'CountryOfContract',
        label: 'Indonesia',
        locator: 'case.CountryOfContract',
        dataBlock: 'B',
        uuid: '1f087fa1-4b87-485e-88f5-de581e9440b7',
      },
    ],
    'case.UnderwritingRegion': [
      {
        attribute: 'UnderwritingRegion',
        label: 'Asia',
        locator: 'case.UnderwritingRegion',
        dataBlock: 'B',
        uuid: '14cee142-116f-4b34-a4a2-fd94768fc222',
      },
    ],
    'case.SalesChannel': [
      {
        attribute: 'SalesChannel',
        label: 'Agency',
        locator: 'case.SalesChannel',
        dataBlock: 'A',
        uuid: '1d08e6de-de44-4d48-83b4-b30a0d4c988f',
      },
      {
        attribute: 'SalesChannel',
        label: 'Broker',
        locator: 'case.SalesChannel',
        dataBlock: 'A',
        uuid: '0a5f5e0e-a39f-4d49-9b3b-3e39d8ee19f5',
      },
      {
        attribute: 'SalesChannel',
        label: 'Bank',
        locator: 'case.SalesChannel',
        dataBlock: 'A',
        uuid: '5325661a-dab8-4059-88f4-7e64500d3671',
      },
      {
        attribute: 'SalesChannel',
        label: 'Consumer',
        locator: 'case.SalesChannel',
        dataBlock: 'A',
        uuid: 'a18ad6f7-446a-4cdd-b625-24817d5a1a13',
      },
      {
        attribute: 'SalesChannel',
        label: 'Direct Sales Force',
        locator: 'case.SalesChannel',
        dataBlock: 'A',
        uuid: 'b09cf62c-c6af-47f5-8455-12bf9505ac5a',
      },
    ],
    'case.CorporateAgency': [
      {
        attribute: 'CorporateAgency',
        label: 'Yes',
        locator: 'case.CorporateAgency',
        dataBlock: 'B',
        uuid: 'fc7610f9-7c80-4182-b815-a82bff28524c',
      },
      {
        attribute: 'CorporateAgency',
        label: 'No',
        locator: 'case.CorporateAgency',
        dataBlock: 'B',
        uuid: '16fee183-8a2c-4a0c-87f4-dc6ff69f9d6a',
      },
    ],
    'case.life.PreviousAdverseDecision.DeclinedOrPostponeRecordThisCompany': [
      {
        attribute: 'DeclinedOrPostponeRecordThisCompany',
        label: 'Yes',
        locator: 'case.life.PreviousAdverseDecision.DeclinedOrPostponeRecordThisCompany',
        dataBlock: 'C',
        uuid: 'fc7610f9-7c80-4182-b815-a82bff28524c',
      },
      {
        attribute: 'DeclinedOrPostponeRecordThisCompany',
        label: 'No',
        locator: 'case.life.PreviousAdverseDecision.DeclinedOrPostponeRecordThisCompany',
        dataBlock: 'C',
        uuid: '16fee183-8a2c-4a0c-87f4-dc6ff69f9d6a',
      },
    ],
    'case.life.product.CoverPurpose': [
      {
        attribute: 'CoverPurpose',
        label: 'Health Protection',
        locator: 'case.life.product.CoverPurpose',
        dataBlock: 'B',
        uuid: '3eae62ed-46c5-4100-a975-fab75a642cab',
      },
      {
        attribute: 'CoverPurpose',
        label: 'Accident Protection',
        locator: 'case.life.product.CoverPurpose',
        dataBlock: 'B',
        uuid: 'db248494-6d77-4732-89f0-b6c86615db3a',
      },
      {
        attribute: 'CoverPurpose',
        label: 'Disability and Critical Illness Protection',
        locator: 'case.life.product.CoverPurpose',
        dataBlock: 'B',
        uuid: '90796832-9db4-46bd-8215-1f3a5c209323',
      },
      {
        attribute: 'CoverPurpose',
        label: 'Investment Fund',
        locator: 'case.life.product.CoverPurpose',
        dataBlock: 'B',
        uuid: '80a7b076-9537-4c2a-b3e8-dfa8cbc1feea',
      },
      {
        attribute: 'CoverPurpose',
        label: 'Life Protection',
        locator: 'case.life.product.CoverPurpose',
        dataBlock: 'B',
        uuid: '87e307af-2f9a-48cf-9664-bba743af4b33',
      },
      {
        attribute: 'CoverPurpose',
        label: 'Pension Fund',
        locator: 'case.life.product.CoverPurpose',
        dataBlock: 'B',
        uuid: 'd939a2b5-3ac9-4633-9486-650d6832e1d2',
      },
      {
        attribute: 'CoverPurpose',
        label: 'Education Fund',
        locator: 'case.life.product.CoverPurpose',
        dataBlock: 'B',
        uuid: '530e0d64-0391-4ce2-919a-10859cc8fb12',
      },
      {
        attribute: 'CoverPurpose',
        label: 'Inheritance tax / estate planning',
        locator: 'case.life.product.CoverPurpose',
        dataBlock: 'B',
        uuid: 'd8c519ce-e2aa-4f42-8a8d-36f01444af0d',
      },
    ],
    'case.ApplicationType': [
      {
        attribute: 'ApplicationType',
        label: 'SIO',
        locator: 'case.ApplicationType',
        dataBlock: 'A',
        uuid: '8efc5fbd-31b7-4f03-b775-b611593406d6',
      },
      {
        attribute: 'ApplicationType',
        label: 'GIO',
        locator: 'case.ApplicationType',
        dataBlock: 'A',
        uuid: 'b375bda3-08e8-4bcc-9871-1beb4e168ed9',
      },
      {
        attribute: 'ApplicationType',
        label: 'Normal',
        locator: 'case.ApplicationType',
        dataBlock: 'A',
        uuid: '409f04e5-ff1f-4d64-8e79-e5ba1796243b',
      },
    ],
    'case.life.product.type': [
      {
        attribute: 'Type',
        label: 'PAA2',
        locator: 'case.life.product.Type',
        dataBlock: 'A',
        uuid: 'e7b11941-bdb6-407b-b5f3-fabd24099283',
      },
      {
        attribute: 'Type',
        label: 'PSAA2',
        locator: 'case.life.product.Type',
        dataBlock: 'A',
        uuid: 'c3504042-550d-4f2a-abec-3019dbb6e3e4',
      },
      {
        attribute: 'Type',
        label: 'T1SR',
        locator: 'case.life.product.Type',
        dataBlock: 'A',
        uuid: '83580cbd-3481-411e-8a06-10614d17f038',
      },
      {
        attribute: 'Type',
        label: 'T1PR',
        locator: 'case.life.product.Type',
        dataBlock: 'A',
        uuid: '96b4bc6c-f146-4fbf-b5cf-b08b1294831a',
      },
      {
        attribute: 'Type',
        label: 'T1RR',
        locator: 'case.life.product.Type',
        dataBlock: 'A',
        uuid: '986db269-ae51-45f1-aa94-0bd8a42b0e87',
      },
      {
        attribute: 'Type',
        label: 'T1QR',
        locator: 'case.life.product.Type',
        dataBlock: 'A',
        uuid: '2d51f4ef-85c6-4f00-83b0-a03724f3069c',
      },
      {
        attribute: 'Type',
        label: 'H101',
        locator: 'case.life.product.Type',
        dataBlock: 'A',
        uuid: '031d8cb4-39a7-4870-b0d7-76bcb4c0e023',
      },
      {
        attribute: 'Type',
        label: 'H111',
        locator: 'case.life.product.Type',
        dataBlock: 'A',
        uuid: '070b842a-2218-46da-acce-123e4825e3d4',
      },
      {
        attribute: 'Type',
        label: 'L1PR',
        locator: 'case.life.product.Type',
        dataBlock: 'A',
        uuid: 'ba4da17e-f7c7-4a7f-a793-346302b846a2',
      },
      {
        attribute: 'Type',
        label: 'L1WR',
        locator: 'case.life.product.Type',
        dataBlock: 'A',
        uuid: 'fd6f828c-d2af-4fd7-8bde-d8b36abb3b36',
      },
      {
        attribute: 'Type',
        label: 'L1WD',
        locator: 'case.life.product.Type',
        dataBlock: 'A',
        uuid: '21dddde1-d337-4465-933c-5c291a23ce9a',
      },
      {
        attribute: 'Type',
        label: 'E1OR',
        locator: 'case.life.product.Type',
        dataBlock: 'A',
        uuid: '9aeca147-2d64-4e59-8343-04aa7c86a73f',
      },
      {
        attribute: 'Type',
        label: 'E1O1',
        locator: 'case.life.product.Type',
        dataBlock: 'A',
        uuid: 'f4e60cf1-e7a8-41e3-8c9e-9ee7df868122',
      },
      {
        attribute: 'Type',
        label: 'C16R',
        locator: 'case.life.product.Type',
        dataBlock: 'A',
        uuid: 'a1619eb4-aede-412f-bb6f-ef5fa7c7b32b',
      },
      {
        attribute: 'Type',
        label: 'L1QR',
        locator: 'case.life.product.Type',
        dataBlock: 'A',
        uuid: 'cf9459dd-12aa-4699-8fdb-84c3b0d430e1',
      },
      {
        attribute: 'Type',
        label: 'H121',
        locator: 'case.life.product.Type',
        dataBlock: 'A',
        uuid: '62b48eaf-f5ca-4574-94eb-91e206bbbb29',
      },
      {
        attribute: 'Type',
        label: 'H123',
        locator: 'case.life.product.Type',
        dataBlock: 'A',
        uuid: '17cd2b4c-9950-41ed-8756-e8bac16a2339',
      },
      {
        attribute: 'Type',
        label: 'H131',
        locator: 'case.life.product.Type',
        dataBlock: 'A',
        uuid: '26334091-7576-4dd4-8002-cd3b53283c92',
      },
      {
        attribute: 'Type',
        label: 'H141',
        locator: 'case.life.product.Type',
        dataBlock: 'A',
        uuid: '16da0156-afa0-4703-8341-08af0278f257',
      },
      {
        attribute: 'Type',
        label: 'H151',
        locator: 'case.life.product.Type',
        dataBlock: 'A',
        uuid: 'f7879ed0-39a6-49f4-9c45-2dbfa09f5d04',
      },
      {
        attribute: 'Type',
        label: 'H133',
        locator: 'case.life.product.Type',
        dataBlock: 'A',
        uuid: '105d747c-aacf-4ecb-8733-0ad5e7b1e5eb',
      },
      {
        attribute: 'Type',
        label: 'U12R',
        locator: 'case.life.product.Type',
        dataBlock: 'A',
        uuid: 'b7ce63c0-5efb-478f-a805-48fd3a433a81',
      },
      {
        attribute: 'Type',
        label: 'U13R',
        locator: 'case.life.product.Type',
        dataBlock: 'A',
        uuid: '76be7f1a-835e-4d93-a866-87cc6ec9218a',
      },
      {
        attribute: 'Type',
        label: 'U17R',
        locator: 'case.life.product.Type',
        dataBlock: 'A',
        uuid: 'b2d662b9-f882-4a70-bece-66373ac4d46a',
      },
      {
        attribute: 'Type',
        label: 'U17D',
        locator: 'case.life.product.Type',
        dataBlock: 'A',
        uuid: 'e148b670-a20f-4171-a738-f1f715808231',
      },
      {
        attribute: 'Type',
        label: 'U18R',
        locator: 'case.life.product.Type',
        dataBlock: 'A',
        uuid: '7a82b78e-ee7b-405b-b32a-02b09a1d97c3',
      },
    ],
    'case.TransactionType': [
      {
        attribute: 'TransactionType',
        label: 'NB',
        locator: 'case.TransactionType',
        dataBlock: 'A',
        uuid: 'bbcc253c-45fa-47c5-bcc7-24d65bdd44e8',
      },
      {
        attribute: 'TransactionType',
        label: 'PAL',
        locator: 'case.TransactionType',
        dataBlock: 'A',
        uuid: '9dd43789-f9df-47b1-b651-7223c31c9b33',
      },
    ],
    'case.TransactionCode': [
      {
        attribute: 'TransactionCode',
        label: 'HealthDec',
        locator: 'case.TransactionCode',
        dataBlock: 'A',
        uuid: 'fc311ccb-8efe-40ae-8f25-1a59e1c0fa9b',
      },
      {
        attribute: 'TransactionCode',
        label: 'Revival',
        locator: 'case.TransactionCode',
        dataBlock: 'A',
        uuid: '586f2e6e-e2a0-4908-8f7e-bfffbacf1a5c',
      },
    ],
    'case.life.MaritalStatus': [
      {
        attribute: 'MaritalStatus',
        label: 'Single',
        locator: 'case.life.MaritalStatus',
        dataBlock: 'B',
        uuid: 'a28bf2ee-202b-4ef2-8e15-c94260e2a349',
      },
      {
        attribute: 'MaritalStatus',
        label: 'Married',
        locator: 'case.life.MaritalStatus',
        dataBlock: 'B',
        uuid: '2836d692-1642-4b6d-978f-6f79287a4318',
      },
      {
        attribute: 'MaritalStatus',
        label: 'Divorced',
        locator: 'case.life.MaritalStatus',
        dataBlock: 'B',
        uuid: '77c46ebe-f430-4482-aec3-0b036b904c3d',
      },
      {
        attribute: 'MaritalStatus',
        label: 'Widowed',
        locator: 'case.life.MaritalStatus',
        dataBlock: 'B',
        uuid: 'e5e7cd6b-05de-4a5e-9fd8-e3bbe949ac28',
      },
    ],
    'case.life.product.benefit.termBasis': [
      {
        attribute: 'TermBasis',
        label: 'WHOLE_LIFE',
        locator: 'case.life.product.benefit.termBasis',
        dataBlock: 'B',
        uuid: 'de701835-42fc-40ae-b31e-b2388167a1d8',
      },
      {
        attribute: 'TermBasis',
        label: 'YEARS',
        locator: 'case.life.product.benefit.termBasis',
        dataBlock: 'B',
        uuid: 'f8b8a32e-b7d5-4d93-8d22-22f199c327e1',
      },
      {
        attribute: 'TermBasis',
        label: 'CEASING_AGE',
        locator: 'case.life.product.benefit.termBasis',
        dataBlock: 'B',
        uuid: '10ebd3fc-d336-4ba7-9af2-dd89abc12463',
      },
    ],
    'case.VIPAgent': [
      {
        attribute: 'VIPAgent',
        label: 'Yes',
        locator: 'case.VIPAgent',
        dataBlock: 'C',
        uuid: 'fc7610f9-7c80-4182-b815-a82bff28524c',
      },
      {
        attribute: 'VIPAgent',
        label: 'No',
        locator: 'case.VIPAgent',
        dataBlock: 'C',
        uuid: '16fee183-8a2c-4a0c-87f4-dc6ff69f9d6a',
      },
    ],
    'case.life.ExistingSystemsRecords.ClaimCodePresent': [
      {
        attribute: 'ClaimCodePresent',
        label: 'Yes',
        locator: 'case.life.ExistingSystemsRecords.ClaimCodePresent',
        dataBlock: 'C',
        uuid: 'fc7610f9-7c80-4182-b815-a82bff28524c',
      },
      {
        attribute: 'ClaimCodePresent',
        label: 'No',
        locator: 'case.life.ExistingSystemsRecords.ClaimCodePresent',
        dataBlock: 'C',
        uuid: '16fee183-8a2c-4a0c-87f4-dc6ff69f9d6a',
      },
    ],
    'case.life.ExistingSystemsRecords.ImpairmentCodePresent': [
      {
        attribute: 'ImpairmentCodePresent',
        label: 'Yes',
        locator: 'case.life.ExistingSystemsRecords.ImpairmentCodePresent',
        dataBlock: 'C',
        uuid: 'fc7610f9-7c80-4182-b815-a82bff28524c',
      },
      {
        attribute: 'ImpairmentCodePresent',
        label: 'No',
        locator: 'case.life.ExistingSystemsRecords.ImpairmentCodePresent',
        dataBlock: 'C',
        uuid: '16fee183-8a2c-4a0c-87f4-dc6ff69f9d6a',
      },
    ],
    'case.SalesBusinessSource': [
      {
        attribute: 'SalesBusinesSource',
        label: 'Sharia',
        locator: 'case.SalesBusinessSource',
        dataBlock: 'A',
        uuid: '91b68799-e0ac-4af6-a542-8fde890af3e6',
      },
      {
        attribute: 'SalesBusinesSource',
        label: 'Conventional',
        locator: 'case.SalesBusinessSource',
        dataBlock: 'A',
        uuid: '1b9dd477-cc36-4dfb-aa3f-cda0f98065a9',
      },
    ],
    'case.life.PreviousAdverseDecision.SubStandardRecordThisCompany': [
      {
        attribute: 'SubStandardRecordThisCompany',
        label: 'Yes',
        locator: 'case.life.PreviousAdverseDecision.SubStandardRecordThisCompany',
        dataBlock: 'C',
        uuid: 'fc7610f9-7c80-4182-b815-a82bff28524c',
      },
      {
        attribute: 'SubStandardRecordThisCompany',
        label: 'No',
        locator: 'case.life.PreviousAdverseDecision.SubStandardRecordThisCompany',
        dataBlock: 'C',
        uuid: '16fee183-8a2c-4a0c-87f4-dc6ff69f9d6a',
      },
    ],
    'case.PremiumPaymentMode': [
      {
        attribute: 'PremiumPaymentMode',
        label: 'Regular',
        locator: 'case.PremiumPaymentMode',
        dataBlock: 'B',
        uuid: 'faeddbd7-ef5d-4bbb-9952-b4f8a9d76c3d',
      },
      {
        attribute: 'PremiumPaymentMode',
        label: 'Single',
        locator: 'case.PremiumPaymentMode',
        dataBlock: 'B',
        uuid: '659d0a47-1710-457e-abcd-0baa00998ef6',
      },
    ],
    'case.life.product.benefit.type': [
      {
        attribute: 'Type',
        label: 'LIFE',
        locator: 'case.life.product.benefit.type',
        dataBlock: 'A',
        uuid: 'c6eca5b2-117c-4196-ad73-32c827592cda',
      },
      {
        attribute: 'Type',
        label: 'ADB',
        locator: 'case.life.product.benefit.type',
        dataBlock: 'A',
        uuid: '3a9bdc7a-3662-424b-aff4-3aee11fa8c7b',
      },
      {
        attribute: 'Type',
        label: 'ADD',
        locator: 'case.life.product.benefit.type',
        dataBlock: 'A',
        uuid: 'f9725a67-6f83-4a4a-bb4a-14f5917a8fe5',
      },
      {
        attribute: 'Type',
        label: 'CI',
        locator: 'case.life.product.benefit.type',
        dataBlock: 'A',
        uuid: '0ca13a68-9c02-4e74-8f9b-f217c164a093',
      },
      {
        attribute: 'Type',
        label: 'TPD',
        locator: 'case.life.product.benefit.type',
        dataBlock: 'A',
        uuid: 'b9cf5e5f-816c-4510-8337-9d8e9f4c1350',
      },
      {
        attribute: 'Type',
        label: 'MEDEXIP',
        locator: 'case.life.product.benefit.type',
        dataBlock: 'A',
        uuid: 'df67ed16-095c-4b27-9d25-b3f429f6fd10',
      },
      {
        attribute: 'Type',
        label: 'JCI',
        locator: 'case.life.product.benefit.type',
        dataBlock: 'A',
        uuid: '1483b4dc-c2c2-4691-abb6-934149fbda0f',
      },
      {
        attribute: 'Type',
        label: 'ECI',
        locator: 'case.life.product.benefit.type',
        dataBlock: 'A',
        uuid: '2c8b3883-ab5f-429a-ab17-7b98a5ca3480',
      },
      {
        attribute: 'Type',
        label: 'OTHRMED',
        locator: 'case.life.product.benefit.type',
        dataBlock: 'A',
        uuid: 'b133994c-f4b9-4033-9ba5-e5c0e199e10e',
      },
    ],
    'case.ClientPresent': [
      {
        attribute: 'ClientPresent',
        label: 'Yes',
        locator: 'case.ClientPresent',
        dataBlock: 'A',
        uuid: 'fc7610f9-7c80-4182-b815-a82bff28524c',
      },
      {
        attribute: 'ClientPresent',
        label: 'No',
        locator: 'case.ClientPresent',
        dataBlock: 'A',
        uuid: '16fee183-8a2c-4a0c-87f4-dc6ff69f9d6a',
      },
    ],
    'case.life.Gender': [
      {
        attribute: 'Gender',
        label: 'MALE',
        locator: 'case.life.Gender',
        dataBlock: 'A',
        uuid: '2c092228-bc36-4208-874f-9c3082f59bab',
      },
      {
        attribute: 'Gender',
        label: 'FEMALE',
        locator: 'case.life.Gender',
        dataBlock: 'A',
        uuid: '618c52a5-da03-40c4-9494-c339ee221a9c',
      },
    ],
    'case.FormClass': [
      {
        attribute: 'FormClass',
        label: 'Generic',
        locator: 'case.FormClass',
        dataBlock: 'A',
        uuid: 'd22a8012-3564-4f9b-a246-fcfc226050a2',
      },
    ],
    'case.FormText': [
      {
        attribute: 'FormText',
        label: 'Andy lam',
        locator: 'case.FormText',
        dataBlock: 'A',
        uuid: 'b1c2f3a6-bddf-4b15-9b0c-6aa93d5c6432',
      },
    ],
  },
  occp: {
    SCOF: {
      uuid: 'a7b5b38a-71a4-4653-bcce-6160480d7d28',
    },
    AGLA: {
      uuid: 'b3243ce8-8d2a-43fe-8bd8-a79a20107dca',
    },
    SNDW: {
      uuid: '4f87aab4-3839-4839-91d9-138e9f8a94fc',
    },
    LEGY: {
      uuid: 'c7be6ab6-190c-481a-a8a3-460df4b2fc79',
    },
    ACCT: {
      uuid: 'ee9bf9ea-626f-48a8-a2bf-b2cd2477dd16',
    },
    RSRH: {
      uuid: 'fe379882-e1f9-453c-8c45-cecf4a8f03a8',
    },
    FRSW: {
      uuid: '68cdda8b-57d4-4b3c-8834-b53de1216724',
    },
    HETI: {
      uuid: '70d262ec-773d-4d00-afb8-1a264257fc16',
    },
    COUR: {
      uuid: '9d676637-e482-4233-9102-8095c18dec80',
    },
    FARM: {
      uuid: 'e9710be8-c527-4b4d-9f2b-733a8be2481b',
    },
    SCOP: {
      uuid: '2e9a0b2b-e3eb-46d0-b098-6deec33218e0',
    },
    COUN: {
      uuid: '65228c40-6ea2-4f40-b2ac-49b4feaf15a5',
    },
    BLRM: {
      uuid: 'ecdb336c-a381-47ba-a10b-36f3271b3694',
    },
    LRAT: {
      uuid: 'ccc6bc35-f37a-4c61-b536-b36d226c41e5',
    },
    FARR: {
      uuid: 'da459d57-c4e5-4e2c-84d6-e991c5e53d45',
    },
    AGME: {
      uuid: 'd72c9ec9-4ac3-4d23-ad30-70fd0243f038',
    },
    AGMC: {
      uuid: '7a3c720f-ee12-4131-9870-fb83841379ae',
    },
    STOS: {
      uuid: '711ef099-361a-4e32-8bc2-f9d0c0264d0a',
    },
    YOTH: {
      uuid: 'cccc9855-28a8-4167-89ec-4f182431d345',
    },
    TUNP: {
      uuid: 'f5f22320-70d0-4199-9ee0-691d6565cb17',
    },
    WTCS: {
      uuid: '3118cd4a-843e-4b99-8f10-6c304b6545a6',
    },
    TUNN: {
      uuid: '57bf81f2-d047-45f0-bbda-dc93ef48e464',
    },
    HNDD: {
      uuid: 'c0dd4d63-51c2-4e29-be64-50cf280d1832',
    },
    SCNT: {
      uuid: '1fe306a2-4497-4def-bb0b-0b6712af858c',
    },
    RBOT: {
      uuid: '0871aa09-307b-4015-a58c-823fbc3b44ce',
    },
    OPTI: {
      uuid: 'de24e00e-0e9b-4427-9744-533c6be1fd1b',
    },
    DRYC: {
      uuid: '5a0277cc-2f18-4069-bb5a-6849616b5254',
    },
    LEGI: {
      uuid: '28efba99-7a0f-43f4-95c7-58122cd0e6e0',
    },
    HROF: {
      uuid: '9bc12acb-52b0-4147-8f6d-4a4a73302d2b',
    },
    GOLD: {
      uuid: '6cbd31dc-a5f2-4a8e-bb97-b35ec8a81743',
    },
    AIRF: {
      uuid: 'f1d9ea83-c166-4eb1-9b2d-4c4b761c1a5d',
    },
    ARCO: {
      uuid: '0808a674-dcf2-452f-a6e7-4cc2649a258c',
    },
    GOLF: {
      uuid: 'a5aed77e-e5c4-4945-b570-debe6fcdb7b8',
    },
    STRS: {
      uuid: '3b4c6955-5309-47da-ab92-d1f95427a69a',
    },
    AIRC: {
      uuid: '5867f662-9067-48eb-bc5d-6574031b5bd4',
    },
    ARCH: {
      uuid: 'e24afae4-1763-4913-acfd-440310a7e89a',
    },
    ACEX: {
      uuid: '9028840c-2550-4a07-8381-f757042995a0',
    },
    QTYC: {
      uuid: 'bc0c57f6-70c3-4179-8cac-40312db58c52',
    },
    ARCD: {
      uuid: 'c744559a-491c-4dfe-a704-e47cc28c0332',
    },
    HAND: {
      uuid: '3d635c87-d126-4461-9220-7815d35e260a',
    },
    EXDC: {
      uuid: 'ef616fa4-7ce9-4b10-9f65-7f9622a1271b',
    },
    RSTH: {
      uuid: '09b105e5-745d-403d-b01c-37bf75a533e8',
    },
    IFUN: {
      uuid: 'b77a7887-8376-458e-bd0b-9f8695a7104c',
    },
    STSP: {
      uuid: 'ec958681-1611-4276-abc3-9b53de638b58',
    },
    CMSO: {
      uuid: 'c6b923ea-0460-4b2c-a4bd-d7cd6e46e7eb',
    },
    AGMI: {
      uuid: '42f1ec5c-d707-4b3d-ac1a-c7666fe369ca',
    },
    RSTM: {
      uuid: 'df39b20c-55eb-443f-9c6d-2d6790475c94',
    },
    SALE: {
      uuid: '676a349c-fb5a-4636-a6cb-67abdcb599b6',
    },
    GSSG: {
      uuid: '810e147b-c5e8-4bf3-8fb3-a9e161a767b3',
    },
    WTER: {
      uuid: '0ebd95d1-cf02-4a39-8266-6b24ac7703f7',
    },
    TODM: {
      uuid: 'e10c22f2-3dfe-4e1e-bb0f-b2be0365b92b',
    },
    SPIN: {
      uuid: '33ec9347-7aed-4f44-953f-b22571301c0b',
    },
    CIMA: {
      uuid: '0bb02ab1-f904-4d34-824c-e6c5154b0a7d',
    },
    AISF: {
      uuid: '983e973c-7982-436a-b899-53c33bd0f74d',
    },
    FRTL: {
      uuid: 'b14d80dc-3671-482a-a870-9062bc1b0686',
    },
    SCPN: {
      uuid: '5afdba46-c076-4a03-804c-ae1aad088261',
    },
    FLHK: {
      uuid: '4a4b6b5b-1250-4ffc-ac6e-9b522e987aba',
    },
    SLAT: {
      uuid: '91343138-600a-4c6f-ba87-18a4e01f60fa',
    },
    DIR: {
      uuid: '98265d68-9888-4ce2-a691-713a7978f121',
    },
    FNLP: {
      uuid: '4a023dd3-a39a-49ea-a962-ed4bc2ad7448',
    },
    TODR: {
      uuid: '53a480ef-919e-4fd2-b2cb-af2dfbfa67e5',
    },
    CGHT: {
      uuid: '77dd20ef-11f9-492d-b250-be3c99f941f9',
    },
    GMGR: {
      uuid: 'ee44235d-2a6f-4d4f-8094-9c5b9634bfe0',
    },
    EXCA: {
      uuid: '77c0b5c6-717b-442c-a0e2-da1f8d24cb1a',
    },
    IMAM: {
      uuid: 'c457ebe4-66f7-4e08-acdd-499cd18c83d8',
    },
    AGNT: {
      uuid: '5fdae3bd-13d4-4fc6-b0aa-94ace40f1dc5',
    },
    STRD: {
      uuid: 'a9c448b0-94df-419a-b6b9-5368d1570a04',
    },
    SCPR: {
      uuid: '05ce59cd-09bb-4626-b11b-8dbd90a538f7',
    },
    MUEZ: {
      uuid: '4f5a7252-2e66-43c0-8da3-df791e08817a',
    },
    ARCW: {
      uuid: '4c2e7055-273a-414f-b7d2-a8c7c12da1d4',
    },
    STRL: {
      uuid: '17de9335-eb71-42c4-83fc-2ed1d5a5661f',
    },
    AIRM: {
      uuid: '500e8ee2-635d-40df-b700-4500410ade5a',
    },
    SALV: {
      uuid: '723b9af4-aed1-42f9-b764-f22e96dbbb0b',
    },
    ACHE: {
      uuid: '7af1fb50-efa1-4e34-a83e-dee49ca2ea5a',
    },
    POST: {
      uuid: '3aee6a4a-b9c0-47f0-bdfc-ee282fc0d3a6',
    },
    AITC: {
      uuid: '6ad6c14b-2fbd-4807-b9f6-47416bd35018',
    },
    SEWR: {
      uuid: 'e7ad4c25-8b35-474c-91bc-3b25b8296c6a',
    },
    HPMO: {
      uuid: 'bc36cceb-3a1d-402e-8283-1142d2b3f771',
    },
    LITE: {
      uuid: '42ce67e7-5efc-4d99-9a16-fe692e27d247',
    },
    NVGT: {
      uuid: '6cb9ce0e-bf8b-4641-8e9d-f359e4fdfa88',
    },
    POTF: {
      uuid: 'ec599fb3-dff9-470d-8a7d-b2e703eb3e92',
    },
    SVYG: {
      uuid: '70e739d4-77b7-45f3-a325-fb3be4d490aa',
    },
    TDRS: {
      uuid: 'bc26ab02-28ff-449f-8b90-66c773ad40d5',
    },
    LITO: {
      uuid: '3fe06057-f362-4692-b435-340d773eff6c',
    },
    TUTO: {
      uuid: '65c57161-eefa-4814-bdb7-22358cd4e0a5',
    },
    POTM: {
      uuid: 'f7c8adce-64e1-48dc-89f3-b9bb8fe64449',
    },
    CIMG: {
      uuid: '7c0615bd-5c40-4acb-bb85-79fa8855c4c7',
    },
    STUL: {
      uuid: '13106d00-9920-4ab9-8e6b-c2476a59d5c6',
    },
    POTO: {
      uuid: 'd203c949-b880-45ec-b104-926422068b82',
    },
    LABO: {
      uuid: 'bb401321-c64b-49df-9d62-3c915618802a',
    },
    STSW: {
      uuid: '90d6e3fc-891c-493e-a3a0-bd17791bb06f',
    },
    MSCC: {
      uuid: '6458e05e-aff9-4645-a411-433f347fb297',
    },
    LABT: {
      uuid: '7e2544e4-f112-483c-a656-c0d450f7cbe0',
    },
    SCRD: {
      uuid: '35dc7ac9-1028-48c1-9e1c-e6877d8c0d9e',
    },
    SNGL: {
      uuid: '07f6ade7-203f-4032-ae77-847052e1d03d',
    },
    LABR: {
      uuid: 'fd64bcbe-ca9b-4ad2-a095-3fdb68928977',
    },
    BUIN: {
      uuid: 'a6b9ecf6-e059-4a59-bd26-672a80abeeda',
    },
    SNGM: {
      uuid: 'd0200a76-0125-4125-9327-0bc8fdade135',
    },
    SCRP: {
      uuid: 'fe7a2384-7734-4f25-b2b6-7b2e6e339887',
    },
    BUIL: {
      uuid: 'cc742ba3-88f3-4494-ab35-78e89de85682',
    },
    PGBY: {
      uuid: '3db32db6-6ae9-4972-bfd7-bbe005e03b02',
    },
    NGHW: {
      uuid: '5a3660c1-1802-4aa1-8e6d-35e9ad2de4d7',
    },
    WIRE: {
      uuid: '57e97ee2-605e-4116-aa71-3758acb10d40',
    },
    SNGW: {
      uuid: '802e2067-85ce-4d22-bab0-e58f5ca058d0',
    },
    SCRM: {
      uuid: '1fa8f25d-e712-45da-a8b9-66d254f3dbb7',
    },
    DWFA: {
      uuid: '38888046-22ff-4a56-b73f-6664e8ef2191',
    },
    SANI: {
      uuid: 'bacec3a4-7d95-463c-ae00-16c48c628fff',
    },
    EXEC: {
      uuid: '7ffe0974-2e4b-4332-8945-6d00866b71fc',
    },
    LGOF: {
      uuid: '34bf5f27-1b00-4e78-bc1a-20448bdff01a',
    },
    SCRW: {
      uuid: 'a644c178-b938-4b74-8968-d9b9fdafbaff',
    },
    CINS: {
      uuid: '82e9ea0f-2440-4ed6-84eb-f08d4943b4df',
    },
    POSD: {
      uuid: 'ff2fa6af-dda4-4722-89b7-097e828f6c14',
    },
    BLWR: {
      uuid: '7492d966-b031-4ed1-95d4-0a04448a6f36',
    },
    POSS: {
      uuid: '5afcc5fa-fa90-40e9-a723-29963352888d',
    },
    STTN: {
      uuid: 'c2b2c313-6b1a-4022-a436-c84cb05ac025',
    },
    POSO: {
      uuid: 'da1e7e97-9653-4314-b66e-9193677fc5cc',
    },
    ISPC: {
      uuid: '48fa8c58-3dd2-4729-9404-8ee7c1c832eb',
    },
    GOND: {
      uuid: '5814150b-cba4-42b0-83c8-961651aacc22',
    },
    OFFS: {
      uuid: '14f4b728-04c2-4940-8234-6b187eff81b5',
    },
    SCUL: {
      uuid: '2c67be7c-2fe8-49a1-bc4b-74b500396f82',
    },
    CRAN: {
      uuid: '5de5a080-b74c-42fc-acfb-2f813b89b049',
    },
    AGRI: {
      uuid: '078d397f-8d69-40f7-808f-9b75349d72aa',
    },
    IDUD: {
      uuid: 'fd70b03e-dd2a-4740-bd0e-b2e28e3d1078',
    },
    STWD: {
      uuid: '889553c9-1e24-43d2-855c-ccc1f77cef9e',
    },
    IDUE: {
      uuid: '858af4dc-b85f-4389-839d-734f1c8a0f59',
    },
    EXHA: {
      uuid: 'e73279f3-1e21-4ddb-aeeb-fa8decddc23e',
    },
    UGWO: {
      uuid: '0f53cb83-4b99-4c2c-8496-6c1b22f74e9d',
    },
    UNDT: {
      uuid: '7bc5b4de-8bb9-435b-aa74-3b4d30953fde',
    },
    CRAB: {
      uuid: '88b87c85-e433-466d-87fd-c03feea753a1',
    },
    IDUM: {
      uuid: '9b8eab64-bf2d-450e-ad14-d2edb9d5dc47',
    },
    EXHI: {
      uuid: '5c8cd8ba-80f9-4a49-9a5b-d1f606f1ba6f',
    },
    SPOD: {
      uuid: '3a0afc74-7a75-4cb3-9f4a-4fbdfb1d75a3',
    },
    HARP: {
      uuid: '8896832a-90be-426c-8daa-3353b8e70492',
    },
    SLGH: {
      uuid: 'd8b76546-7f4d-4f2f-ad16-ea3a113e5a4a',
    },
    CRBN: {
      uuid: 'd3d16ac3-de0d-47f2-a9d4-fe9a8a1b5502',
    },
    EGEL: {
      uuid: 'dc160025-da47-42ac-a566-0cf9476b7bae',
    },
    WELD: {
      uuid: '3945ca74-5660-46b4-a68e-4fa59b4ff690',
    },
    CRBA: {
      uuid: '864711ed-7aae-474d-889d-fa5be30a5066',
    },
    VOCC: {
      uuid: 'aa53aaec-359e-4f79-a44e-7508e96c9b79',
    },
    UNDA: {
      uuid: '8275c7e7-51a8-4e04-8c6d-4e7072cb6248',
    },
    OFFD: {
      uuid: '7273dafc-a65d-4263-916d-8b176bccbab5',
    },
    ROOF: {
      uuid: '94412ba1-1430-44fd-a9b0-490a24e9cba6',
    },
    POUL: {
      uuid: '0c2ad748-920d-424c-abd1-e1e47157b9cc',
    },
    FAWO: {
      uuid: 'ce1b5bda-592b-4ce8-a89e-5ab534c65a88',
    },
    NEGA: {
      uuid: 'f7abe40f-3ca8-42ef-8965-0e8f7544e046',
    },
    IMEX: {
      uuid: 'b33df6ee-872c-4eca-9179-d6e9e9e7a689',
    },
    ROOB: {
      uuid: 'fef16e31-4224-4ba2-b9d3-df4f2c8d3749',
    },
    STVE: {
      uuid: '93dd5db3-b67a-47cd-8418-702e017c8824',
    },
    NEGC: {
      uuid: 'dcf827a9-32dc-43ff-b11e-d4bd1e860e3a',
    },
    OFFB: {
      uuid: 'f32a99df-6246-403a-b37a-5232fc7dbb48',
    },
    HRSB: {
      uuid: '943e6a85-478f-489a-b9e1-92c195b3b080',
    },
    RICK: {
      uuid: 'ab374e72-4ca8-463f-aad6-1e8f88f4630a',
    },
    OFFM: {
      uuid: 'c167cc39-7f69-4d60-819f-069e784fee15',
    },
    OFFG: {
      uuid: 'df3c1451-a047-4e4b-849b-f2382d1beacd',
    },
    FLMC: {
      uuid: 'c9f565e9-7fb1-411d-be19-597e69500af7',
    },
    CRAS: {
      uuid: '97eb676a-3692-48d2-8ab3-7ab852131544',
    },
    OFFI: {
      uuid: '24e93ae6-aaad-4ed0-8572-6680b689a72f',
    },
    FLOI: {
      uuid: 'c7feb461-2b6b-4f8a-af30-ab2b871f0a11',
    },
    WIWO: {
      uuid: '1a0e2946-fbe8-4903-a30c-b7f46a18810e',
    },
    EMTO: {
      uuid: '02f59b22-5325-415b-88a7-3a3bfbb05000',
    },
    CIRC: {
      uuid: '6d5aff58-2966-47d8-8ad8-5250a43a9de8',
    },
    FLOR: {
      uuid: '867b05ec-2d98-4010-8c5a-3ef4bbc750fd',
    },
    MULL: {
      uuid: '8ea127ce-62e5-46fc-bcbe-ac9f02aac83b',
    },
    BULL: {
      uuid: '8af23a8b-849d-474e-a331-0c5c285053fc',
    },
    CAAS: {
      uuid: '1b3ea906-f925-415f-8e52-99ffc6f7b14b',
    },
    ANAE: {
      uuid: 'afc58fa0-d7b9-4b44-8164-1a1059098e35',
    },
    JANI: {
      uuid: 'f5a71f8b-cc4c-4010-92ed-54f90a85ef98',
    },
    PEDC: {
      uuid: 'a00a59b2-ff7f-4cb8-8380-187ee619b5bc',
    },
    TSTR: {
      uuid: '5dffae27-11e7-4228-9e20-269fcbd29136',
    },
    PMTR: {
      uuid: 'f537f69b-a0ae-4967-81a4-cf5c43df8dea',
    },
    APDV: {
      uuid: 'a6884a90-f850-4116-9c63-51bf294fc5eb',
    },
    DSAS: {
      uuid: '3ff83f99-64f1-44b7-8e06-2134e87a447f',
    },
    SLGR: {
      uuid: 'd1623264-4f89-4a6d-b0f6-a535691fd47c',
    },
    SPOT: {
      uuid: 'fa22dd74-a3ab-4d71-b8b4-845ce2601ce8',
    },
    UNEM: {
      uuid: 'dcd992c8-c2f2-473c-8770-b4257b811123',
    },
    SPOR: {
      uuid: 'bf9f9bc2-74a2-4a89-ad65-7029c2342811',
    },
    EMSY: {
      uuid: 'bb29e82f-f921-4c1b-897b-aa2fbde456a0',
    },
    CRDC: {
      uuid: '5a4dd8b6-d617-4176-b846-0e619547d77f',
    },
    CVLE: {
      uuid: 'd6f156b0-c47d-4dd9-8e05-9370813e1fc3',
    },
    SYAN: {
      uuid: '9e65fd4d-8bb7-4d89-b0b0-48eb45f2e1dc',
    },
    ETAG: {
      uuid: 'bff30e93-38de-4529-b8ad-ba7188779a04',
    },
    LAGG: {
      uuid: '877f4464-b47c-4a29-a3ab-39a9118d3474',
    },
    LCKS: {
      uuid: '4924442c-dfab-432e-92e7-c7b00290a63d',
    },
    FNSH: {
      uuid: '7db24454-d542-4f8a-a90e-08cf80e4b9f2',
    },
    POWS: {
      uuid: 'e4cee6a1-a6e9-424f-a19a-24a8402ab3d2',
    },
    CPAS: {
      uuid: 'ee91c24b-4732-4513-b523-934bbc2fe0d5',
    },
    ANCT: {
      uuid: 'f1f601d8-2be5-451b-81d9-95c9217d5c8b',
    },
    CADD: {
      uuid: 'bcf906bb-187f-4f17-ab6e-a80c29ec6a3e',
    },
    SPRY: {
      uuid: '4339cdcd-cc72-4ab6-aac4-e29955f24833',
    },
    ANCS: {
      uuid: '994cee53-ecc7-4301-b5a7-b58c0183d9a6',
    },
    RIGS: {
      uuid: 'd68d5432-86d7-4370-ba5b-9cf817b63a1a',
    },
    RMOT: {
      uuid: 'fabda940-05e0-4c38-90ff-381f7d66fff4',
    },
    ATOR: {
      uuid: '43df602f-2709-4121-8160-4e8e9541f605',
    },
    AERE: {
      uuid: 'cd3bd6e4-a529-4714-b50c-09ad21eb50a6',
    },
    APGM: {
      uuid: 'd5ae8c42-c8db-495b-97e6-85537460db32',
    },
    ANCI: {
      uuid: '697e1d0f-193b-4081-8d70-36dd08c1a3b0',
    },
    CREG: {
      uuid: 'b144689c-e075-4890-86cd-8375d1fd52da',
    },
    ATOM: {
      uuid: 'a3c9f711-56a7-4c7f-bca4-839fb38b8974',
    },
    FWGH: {
      uuid: '0b64a26e-6080-42d2-ba53-948c4286ff40',
    },
    WNCH: {
      uuid: '04f1ef50-cdfc-44e5-827f-5377e4adf6f8',
    },
    PTCP: {
      uuid: '81afe649-5bef-4190-a28d-f3ac8f2addbe',
    },
    SHCL: {
      uuid: '0a65a64a-7b62-4d6f-9308-1ec19cdf660e',
    },
    PINO: {
      uuid: '9a0965d5-3d98-47fd-9e9c-ad586a23b7f2',
    },
    MOAD: {
      uuid: '616f0bfe-93fa-43fe-96ee-55fc46af7f27',
    },
    AESF: {
      uuid: '7621f841-1b0b-4e03-ab30-6609ea1766ce',
    },
    AGWF: {
      uuid: 'ae082ea9-dbd9-4636-869f-bcc29332ab69',
    },
    MSIR: {
      uuid: '8c6fd7d5-8e6e-47bb-82c4-552990a9e159',
    },
    JEWE: {
      uuid: '2f5eec53-43f1-4863-afc1-e5e3a9c8b302',
    },
    RIGG: {
      uuid: '3a6b1453-3d3c-41ae-a160-0ffb0f11f34d',
    },
    HAUL: {
      uuid: '73419e15-f982-4006-9b78-93366dc8601f',
    },
    JEWM: {
      uuid: 'af47828a-4c10-4b9b-a881-2451d63c917b',
    },
    ETCH: {
      uuid: '40a98cca-aa36-4ec9-b29f-5495b8f59e6d',
    },
    TCHR: {
      uuid: '48b60813-695d-438c-a276-c4ea4104a56e',
    },
    JEWR: {
      uuid: '90937c38-41f4-4b03-9935-97397ff69e6e',
    },
    QUAM: {
      uuid: '6d53ed77-49a1-4f3d-b46c-7ef61e97afe9',
    },
    SPRT: {
      uuid: 'a7b5f6d3-f65f-4a3b-94c1-77890a37c9be',
    },
    SHBL: {
      uuid: '9cc9ff4c-9827-46a7-bed5-0122dd163b82',
    },
    SRVS: {
      uuid: '50484b60-ab19-4671-9099-37b81ff207b1',
    },
    RIGM: {
      uuid: '15745df9-2c42-4887-b479-c94612a466ce',
    },
    MDLT: {
      uuid: 'cd92d3a4-2338-4a98-8e71-eddd160959c5',
    },
    CREW: {
      uuid: 'b3f8fbcd-681b-47b5-8b95-6708d9b262e4',
    },
    CPAT: {
      uuid: 'c50ca928-a910-4869-9960-19ae06e55013',
    },
    ROSO: {
      uuid: '7d9bff6d-13c6-426e-9b28-0882d2abdba8',
    },
    AERO: {
      uuid: '19a93094-2551-464a-8050-5f1d9cf9e013',
    },
    ANEV: {
      uuid: '1b8a3f31-8991-4774-b69b-3be5f18b4745',
    },
    SAWM: {
      uuid: 'df0e1b3d-98d9-4fb8-b9c1-67250677b6e0',
    },
    ARMY: {
      uuid: 'cf4f4bf1-2c28-44d3-9841-60e1e7443adf',
    },
    SHDR: {
      uuid: '2a047dd4-6789-4c48-9f77-6e3342d2b32a',
    },
    SHDO: {
      uuid: '89653ffd-2205-4724-9c60-565c4a01d0c3',
    },
    BDOF: {
      uuid: '39776153-585c-4c59-8850-c7e7fe7f90b1',
    },
    GOVT: {
      uuid: '6ade4eb8-41c2-4404-8302-621f51c583e9',
    },
    OWNR: {
      uuid: '3376cd80-b2a7-4185-886e-b03a0d9ded40',
    },
    PIPF: {
      uuid: '601c2368-ea70-410f-b5e0-e2c9c8759510',
    },
    CGRA: {
      uuid: 'b9de0324-0978-4520-a482-d31470701477',
    },
    DSGF: {
      uuid: '0c7e44be-a183-47b2-a4fd-487d89623785',
    },
    MODL: {
      uuid: '01d0c929-068e-4486-96e6-fa295d328dc6',
    },
    LETH: {
      uuid: '71118888-f64f-4bd2-ada0-dc0f7a8d14cc',
    },
    SAWR: {
      uuid: '5d3172b3-90d5-4093-9a0b-5447d5539d95',
    },
    PIPL: {
      uuid: '9b83bcbc-e0f2-476f-a3b1-c28228644380',
    },
    TXAS: {
      uuid: 'db787069-15b2-4a70-92a3-dfb6c648657b',
    },
    SHEE: {
      uuid: '7d33f5d7-47cb-4f03-baf2-6f1d323a4458',
    },
    PIPM: {
      uuid: '22a38883-bffd-4e2b-95f3-74f810076f9e',
    },
    DSGN: {
      uuid: 'ae0d8047-c4e5-47f7-a430-6ee6607fb18d',
    },
    LNEX: {
      uuid: '4866daa8-3008-49cd-8209-acd5d27f604a',
    },
    FUEL: {
      uuid: '93b840f6-4f24-4367-bcf7-508cb84062cf',
    },
    SHEN: {
      uuid: 'ebce2a39-49db-4895-a8bb-7ab084a6e043',
    },
    WRMC: {
      uuid: '5c517e45-bf86-4556-a9f9-6438ea298a4a',
    },
    EGME: {
      uuid: '1468778d-33f7-4113-9246-545dfc59eb39',
    },
    DSGR: {
      uuid: '9f4f875b-4645-4b29-a729-226432cf3761',
    },
    LETT: {
      uuid: '3579a7f7-e3dc-470a-8019-acee86c1752f',
    },
    ACOR: {
      uuid: 'f721d306-e3c7-4e60-b199-7d986a26fb64',
    },
    HYGS: {
      uuid: '713911ca-18f6-49cf-a658-3a615fcb4244',
    },
    MOCG: {
      uuid: '22504932-a610-4bff-8c1d-608628795ce0',
    },
    SPTE: {
      uuid: 'f98a4e98-0741-4abf-84ad-9598855ca36f',
    },
    EXMF: {
      uuid: 'bd97965d-6857-4c4f-ae87-07b5718be292',
    },
    HAWK: {
      uuid: '961dab42-01d6-4804-94a6-3d7285792b0b',
    },
    READ: {
      uuid: '1a6da2b9-2ce9-474c-ab58-38eea7bb308c',
    },
    MOCV: {
      uuid: 'a22dd3be-382c-4850-ae84-da63cdb6e4ca',
    },
    TICC: {
      uuid: '79e94f19-0bcb-4ff3-9e3c-f9bf58bc9d14',
    },
    LNDR: {
      uuid: 'ad69524b-1095-4e80-b364-b5110cf0fdb1',
    },
    WRLN: {
      uuid: '17d648dc-e1d0-4806-ba66-eb640bc09567',
    },
    LCOM: {
      uuid: '2ba7abc6-cb50-40b0-9ffe-dd63ce239bc1',
    },
    SPTH: {
      uuid: '8994d358-0c71-475f-a6f6-ca5be108764b',
    },
    SAWG: {
      uuid: '60b9a19c-030d-42cc-a44a-2ed153583c09',
    },
    RGEN: {
      uuid: 'f514912a-2c28-44d5-add4-337334f1d396',
    },
    EXMT: {
      uuid: '7ba40cbd-0efb-4288-98b4-a6e5259113ec',
    },
    TICK: {
      uuid: 'c069d91e-adb1-440c-9b90-c5e6d1c4bde4',
    },
    CIVS: {
      uuid: 'accce09d-5a7f-495b-a073-e989b9bae610',
    },
    TOON: {
      uuid: '1e37b61b-7c17-4e74-9e46-8ea5566454b3',
    },
    TOOL: {
      uuid: '235e2aba-9737-4d9e-aff3-ffd3f2469cf3',
    },
    CNAS: {
      uuid: 'e32faedd-169b-42cd-8ded-a6cbbed25743',
    },
    RECT: {
      uuid: 'd0a88041-bbcc-404d-bfb5-61f233b790f8',
    },
    AEVO: {
      uuid: '024cca0a-758c-45f3-82e4-ad21e4979b9d',
    },
    RECR: {
      uuid: '56b0f718-a2e4-4b93-bdc5-18988167afd2',
    },
    CRIT: {
      uuid: '6535a86d-6294-4479-b3d5-589e9de0c9fa',
    },
    CAHD: {
      uuid: 'acd9d8c4-b8aa-4e83-9460-6182b2c4e484',
    },
    RECP: {
      uuid: '375203da-dc3e-49d7-8f14-5c1cadb2e5b1',
    },
    SHFR: {
      uuid: '091181e1-b8eb-425c-a309-36d71ad31dbb',
    },
    TXCL: {
      uuid: 'c90cbeac-4f7d-490f-9d6d-d839bd31181b',
    },
    PRCO: {
      uuid: '51471959-2065-4d77-8e48-5addb0ffbd10',
    },
    ACRB: {
      uuid: '1bda1a05-1ddf-4ddd-a764-b2ed09a17fa3',
    },
    SLOA: {
      uuid: '03391fa8-951f-4042-af31-4330b946ca46',
    },
    AROM: {
      uuid: '33658414-d39a-4ea3-ac57-0bb2188987ce',
    },
    TXCS: {
      uuid: 'd649b5fb-99c9-47ed-886a-e73ec4c33a1b',
    },
    DUMP: {
      uuid: '7dc78deb-3025-437b-983c-3e658ec3a39c',
    },
    EXPR: {
      uuid: '63970916-2d5b-40f3-abc8-ceee3e22987f',
    },
    PRCT: {
      uuid: '28cdf9ef-e873-4512-9516-52a5ed917068',
    },
    VOLC: {
      uuid: 'cab312d2-2c08-49c1-be05-2a4967feb754',
    },
    MUSG: {
      uuid: '76f1cf9a-38c6-41f2-b099-8c9fba100af1',
    },
    MUSI: {
      uuid: '76bde162-2f62-4c9b-beb4-de2c99c32337',
    },
    RGHN: {
      uuid: '71c44884-fd76-4380-abbd-42ca566d9145',
    },
    SHEW: {
      uuid: '877f4196-51e9-4c5e-aa57-1e67a036ee24',
    },
    IMMI: {
      uuid: '49392c39-6306-4079-9553-944dabad3e9e',
    },
    SHES: {
      uuid: '5a609095-c39c-4c4a-b1c8-499c2340f7a9',
    },
    SHEP: {
      uuid: '684fb379-405c-4b2d-85ec-389d1624e5ac',
    },
    BUST: {
      uuid: '0f8d9835-fa96-4f6f-9231-a4c691173a62',
    },
    OYST: {
      uuid: '28b3a543-7377-4276-8e7a-b40c452cd48c',
    },
    ATTR: {
      uuid: '25dc1269-d9db-4b8b-9746-6887e1e36556',
    },
    LAMI: {
      uuid: '5c289a27-c447-4d50-a57e-a4b8f8405d5f',
    },
    WTRP: {
      uuid: '1c535cac-41c9-4a67-ae6d-1261ddb7346a',
    },
    MDPP: {
      uuid: '5467a7a0-89dc-4329-88b3-69edd0c11a7c',
    },
    RECC: {
      uuid: 'b7a8a43d-88a0-4bba-82fd-1c58e961ef6b',
    },
    BUSI: {
      uuid: '4ec45521-94ae-494f-a5cb-544b8bc2d00a',
    },
    NPDT: {
      uuid: 'f175e56b-3909-4b46-bad6-e726090e1de1',
    },
    RMSV: {
      uuid: 'dfcda359-09f3-4d6d-96c4-c1d442c11a87',
    },
    MGR: {
      uuid: '314b51a2-5ab3-41f9-95de-46cca62680a0',
    },
    BUSD: {
      uuid: '66ced953-3476-4f6e-9d04-73f84a16bfa6',
    },
    BUSC: {
      uuid: '64685fe2-a095-456c-81a7-c450ceac4549',
    },
    SHFL: {
      uuid: 'c8ad60b2-5d9c-447e-a13e-272184c8f24f',
    },
    BUSA: {
      uuid: 'cd13abe7-ad47-44a3-bda9-e7c9c123110a',
    },
    SHFI: {
      uuid: '6f9ff913-afc9-4bdf-b5d4-2305616c2e42',
    },
    SPVR: {
      uuid: '6dbc4f8f-6dbf-45b1-be3e-1fca446b87b1',
    },
    IMPS: {
      uuid: '2d1148c8-9076-485f-adee-2e783e092ad3',
    },
    DWSF: {
      uuid: 'afbed74e-3a27-4145-83e0-f4459fffb0e9',
    },
    SHIB: {
      uuid: '043efcc2-fda0-490f-af0d-0d36b76c0a25',
    },
    SHIC: {
      uuid: '70fb8320-a51c-492a-9e18-780a7dbeb582',
    },
    WLDR: {
      uuid: '201eb485-e0f2-4c5a-b50e-0e455971693a',
    },
    DOCD: {
      uuid: '7a9b736b-7b07-400b-8ebb-a1fd4491a700',
    },
    DOCF: {
      uuid: 'a7f4e53b-cc63-49bb-80aa-0737ca778839',
    },
    ANIM: {
      uuid: '074f0ade-26ee-497c-80a5-84c1eff26b4d',
    },
    PREM: {
      uuid: 'b1992306-7008-4d4d-82a3-77d28795c7d3',
    },
    PREX: {
      uuid: '294fdd44-d3f2-4fcd-9a44-5f8f46315b5d',
    },
    RMVR: {
      uuid: '061bcf5b-c630-4041-83f6-d9b551c3bd1b',
    },
    DOCK: {
      uuid: 'fc472049-5848-4b9c-8f6f-8634d78f1b09',
    },
    DOCM: {
      uuid: '8cb22ce4-dbfa-4185-aea6-28682693b07d',
    },
    PRES: {
      uuid: '24321a48-70ea-48dc-8985-64737a9d7d36',
    },
    SHID: {
      uuid: 'b63c8ffb-a2de-4266-8115-d8753754f992',
    },
    LCTR: {
      uuid: '518340c7-f170-427a-bffd-771447d3f590',
    },
    EVNT: {
      uuid: '764363bc-a3b8-4c48-abd4-ac9d936e8795',
    },
    SHIE: {
      uuid: 'd5d1edf4-b4c7-4cba-bf9a-96d3f06c8fd1',
    },
    SWGA: {
      uuid: 'd4610039-7df1-4970-98d2-c5eca52a6376',
    },
    SHIP: {
      uuid: 'fb9a1191-efee-48ff-8543-769bcd711f8b',
    },
    FDHD: {
      uuid: 'ec73d51f-3b2a-476c-947e-ea9ab925a0cb',
    },
    DOCT: {
      uuid: '082054af-ba23-4e10-8488-6d677e8c2db9',
    },
    CVSC: {
      uuid: 'b710df88-20c6-4540-a149-ab79083641ef',
    },
    BUTC: {
      uuid: '9224b7d6-db63-4df7-b6bd-be5d21dcc248',
    },
    MSON: {
      uuid: 'eb22ee4f-b0ca-4bcd-b549-11a9714be123',
    },
    ACUP: {
      uuid: '6b3c948d-7363-4388-a138-008c145d3fdc',
    },
    PRDE: {
      uuid: '265fa9cc-c883-44e1-aecb-978ed8dd0459',
    },
    PRDD: {
      uuid: '53952726-7989-44ae-bac6-bc81bac166bd',
    },
    BOIL: {
      uuid: 'cc7d4e83-c2ee-4120-ae87-9245abfb1541',
    },
    MIN: {
      uuid: '0cad242c-c812-4d26-8a89-99ec414e248b',
    },
    CTPF: {
      uuid: '7bc8d4f7-eb43-4787-ba24-a81356afb3a7',
    },
    SHHO: {
      uuid: 'd333cc77-518f-4197-8ebd-9ada9fb76a39',
    },
    NAIT: {
      uuid: '73d95dfa-f273-426f-9912-6541bc76304a',
    },
    NCMP: {
      uuid: '06817031-3d5c-45ae-babd-5cbf153db135',
    },
    ACTU: {
      uuid: '776bbb81-8d4c-4f59-93b0-47311bc50abd',
    },
    MDRT: {
      uuid: '4f72bdbf-80ee-47e4-96d7-f63f9e7748ab',
    },
    IVAS: {
      uuid: '7128c10b-1702-47c3-a065-f80dbd9b0026',
    },
    CAFE: {
      uuid: '4fc9533e-98bd-426c-bbfe-2f51b4404824',
    },
    ARRA: {
      uuid: '2d1e471d-ee0b-4a81-9cac-e916421c04b8',
    },
    ACTR: {
      uuid: '17341895-e978-4aca-abf1-4d35fea2acfb',
    },
    GRAV: {
      uuid: '1f30847a-0cdb-4ef7-a628-68de8fe0e849',
    },
    PGRA: {
      uuid: '01108865-398f-477e-af6c-ba2b18db2062',
    },
    OFSC: {
      uuid: 'd53f41f7-3e3b-46a7-9961-7dcb241bd6c6',
    },
    CLAS: {
      uuid: 'd35e9b72-2ffc-436e-a314-c82e5398b5c1',
    },
    EGRV: {
      uuid: '1466d6e6-6418-4c3b-a0c4-bfb6065c17d8',
    },
    RTEC: {
      uuid: '2f811501-fc40-4e09-bb30-08cbd2e81613',
    },
    PRGG: {
      uuid: 'cadf5e59-fa0f-411c-b6bd-5fbe72dde66e',
    },
    MOJK: {
      uuid: 'a397a464-1076-4221-a68d-6baeffb76274',
    },
    CRMS: {
      uuid: 'fe188b02-250a-4896-99f6-43679221d7e3',
    },
    ANKR: {
      uuid: 'e78b870f-b68c-4bdd-83c3-0918eea1eb07',
    },
    CALB: {
      uuid: 'bf9e73e1-99f2-4b3e-a3ff-1cf6485f702e',
    },
    NETS: {
      uuid: 'a4f0c5a9-6d0f-41fe-bdd1-903ef6dee260',
    },
    WARD: {
      uuid: '1ac8a34f-2320-4cc2-9862-57b5d9aa1063',
    },
    WARE: {
      uuid: 'bac36641-8ed9-46d3-8adf-0a300d915296',
    },
    SLSM: {
      uuid: 'b1e5ef92-1526-4bfc-ba4b-d65247230cd7',
    },
    WARG: {
      uuid: 'fb8eefdd-98de-4588-b092-7a2269882570',
    },
    SHKP: {
      uuid: 'a90bfdeb-21c0-4e1b-a4e3-98a970d84153',
    },
    BDVO: {
      uuid: '899b91f6-b186-480a-9465-d4e3241519a2',
    },
    CLBO: {
      uuid: 'b4200384-ca1f-430e-accc-d7b607bea6b4',
    },
    BOKS: {
      uuid: 'f37e0ae9-7f8c-46f7-aad5-0a11ee438fe9',
    },
    ARTW: {
      uuid: '21ba763b-ba12-433d-a174-8949e290a3e6',
    },
    GTEC: {
      uuid: '72b68b15-4724-449e-b84c-a0fd98bc437d',
    },
    CRNS: {
      uuid: 'ab203703-2d19-4467-82f9-3afaeb7cda38',
    },
    APPT: {
      uuid: '1f8cfad3-387e-43eb-9a64-1cbaee7fe707',
    },
    ARTS: {
      uuid: '15705ba3-e960-4118-a95e-06553c29801c',
    },
    CRNO: {
      uuid: '5ec71dfe-ce77-4869-bef9-e758af1df447',
    },
    MKAN: {
      uuid: '763388bd-3a6b-43cb-9869-e81583f60c46',
    },
    BOKM: {
      uuid: 'fa82049c-0b2a-4d1f-b61b-cde6b0462576',
    },
    TEAF: {
      uuid: 'dc37fe41-0a8a-489b-aa11-cfae0d073187',
    },
    REGI: {
      uuid: '80e9c5c3-23a2-4f20-b11e-dded91c5ee51',
    },
    BOKI: {
      uuid: '7f1b6ca1-468d-456f-a82a-b43f8984b5d7',
    },
    TEAC: {
      uuid: '9db45add-9801-4876-99b6-2bf6f9ae0899',
    },
    MBPK: {
      uuid: '87c591d6-b6c5-4bf7-b6b5-6e205b3d8fa4',
    },
    WLFO: {
      uuid: '22e82af5-861c-4c6a-aa1a-4087a6924143',
    },
    FSFO: {
      uuid: '282f9ad6-42e5-44dd-9c5f-2c213ad6592b',
    },
    VICA: {
      uuid: '2734a3e3-cb8a-46f7-84f4-a54dd2b89b7b',
    },
    SHJO: {
      uuid: 'fd65c8d9-1e8a-414c-b92e-e07dfa181102',
    },
    DHWR: {
      uuid: '67385931-aa68-49f7-9207-be8faafd7857',
    },
    TOUR: {
      uuid: 'd0fb4e6a-f687-4728-a34d-72a0ccbf309a',
    },
    ARTD: {
      uuid: 'e8512cd7-7a95-4ad7-88c2-35d261d8a4ce',
    },
    ITAX: {
      uuid: 'af8f38bc-4ed1-4277-a435-c5edb027795b',
    },
    PRIN: {
      uuid: '3df12a4c-93dd-4734-9d6c-bf02adcc2606',
    },
    MOLP: {
      uuid: 'a88c4754-d94f-44b9-955b-b28f41605426',
    },
    MDWF: {
      uuid: 'ae74ed51-8a8d-486f-bdae-cb7e9f0ba7dc',
    },
    PEPA: {
      uuid: '7437407b-351f-4e2e-9c1f-183ec0b3c7b0',
    },
    MOLQ: {
      uuid: '43373af6-f6f6-4382-a74d-055f45508f18',
    },
    DSOC: {
      uuid: '79f46e1e-98e7-44b7-b1fd-0e1b1eb6255a',
    },
    PRIG: {
      uuid: '073f38ef-010e-402a-be9e-e06a16316c85',
    },
    DOGB: {
      uuid: '0b3f1003-9d7e-4295-85f8-3458318f4958',
    },
    ITBA: {
      uuid: 'c49c3d35-2f09-4009-8929-6c89dfad9f16',
    },
    TILE: {
      uuid: '6cd36dd8-9e5e-42b5-bee3-921305ed6dd2',
    },
    RABB: {
      uuid: '048625a8-3075-416e-ae0e-a27a0526896f',
    },
    PRIS: {
      uuid: 'e0af5764-0019-4e20-b16c-0a3c74f68814',
    },
    PRIV: {
      uuid: 'd7057c73-f4f4-43ee-897d-a9d18e69fdd0',
    },
    OFUL: {
      uuid: 'b558e662-5638-4161-9e1d-811bfad1d2a4',
    },
    CAND: {
      uuid: '8d59f0f2-a6f2-4ac1-97ff-76e4f87db291',
    },
    TOXI: {
      uuid: '7730957a-6706-457a-af90-cf5c92a4b246',
    },
    CROS: {
      uuid: 'fc371523-dc6b-408a-bafe-0cc3274cd48f',
    },
    MOLR: {
      uuid: 'f96597be-7007-488e-8b74-b894e5409507',
    },
    CTST: {
      uuid: '2bd435ae-49f3-458d-80d0-40a8e9a653ef',
    },
    CANB: {
      uuid: 'f6e23fb9-222a-41bd-8f87-d9f3d659d1bd',
    },
    PRIO: {
      uuid: 'c27d7fce-593b-4de1-a319-9ac8838dc1ec',
    },
    CLCK: {
      uuid: '23fcacc7-75f4-4849-9faf-420472123659',
    },
    RGNB: {
      uuid: '2b298896-ecba-4ce6-b9bd-5efa32aa96c8',
    },
    CROP: {
      uuid: 'e1c5d26c-0e6d-4a10-a331-13044c3a988c',
    },
    NANO: {
      uuid: '016e56b9-4ccb-4f23-b849-d18333e0b9ec',
    },
    GVLO: {
      uuid: 'a1fcab0c-fb20-4d37-b9f9-08537283d2fb',
    },
    HSCM: {
      uuid: '7958bcc0-8c34-436e-a847-cd35b551ccd9',
    },
    CROK: {
      uuid: '481b6c67-17cd-4204-8723-2c6c2dca6029',
    },
    TGHT: {
      uuid: 'f95ec245-9a3a-455e-b9df-0346b1492a98',
    },
    CROF: {
      uuid: '0ba95864-8638-4076-a254-139753d696d1',
    },
    RTHE: {
      uuid: 'f502ae0d-1c48-4fbf-b346-8affa7b46ca8',
    },
    CAMR: {
      uuid: '967fe77a-355d-4f48-8483-51875b50953d',
    },
    TILR: {
      uuid: '84c90665-3f99-4d2a-8104-9534d12dbf02',
    },
    RGNT: {
      uuid: 'aefa2f9d-e9af-4662-9f07-0f7fb76511e9',
    },
    CAMP: {
      uuid: '42b1934a-b5ba-4d0b-8535-1b4b472a72b8',
    },
    CAMO: {
      uuid: '1bb1d9c5-555a-41f6-af09-28689de7d478',
    },
    WARP: {
      uuid: 'ee1f0fb5-e9ad-4f5f-a584-db912d6298b6',
    },
    LPPO: {
      uuid: '833c53cb-2437-4319-9f93-c25c89b3ab99',
    },
    PGSA: {
      uuid: '5f381a47-eaf0-498a-9fda-a37812edcca1',
    },
    LASE: {
      uuid: '1674ec22-3272-4dc7-bd4b-3062308b66f9',
    },
    BIAS: {
      uuid: '67d03b4f-150c-4063-86bc-4042c8bb4ff5',
    },
    LASC: {
      uuid: '78e9fbed-b1d6-4de9-9960-4ec03b86425c',
    },
    WARH: {
      uuid: 'f8757e87-b3fe-4ab9-bc76-55a21715de24',
    },
    ENAA: {
      uuid: 'fd130013-a280-4e4f-8b08-7feb0bf18a27',
    },
    VIDT: {
      uuid: '00de99a0-19d5-4a98-b593-a339cfcde737',
    },
    LASF: {
      uuid: 'cb6ce836-1fcc-4e06-b854-01f9404fb253',
    },
    ANNS: {
      uuid: '68edce71-ec7d-4153-8dc8-d0696ad6b5ad',
    },
    ARVS: {
      uuid: 'a8b420ac-2164-4d31-9864-3c50c3807085',
    },
    PCKM: {
      uuid: '55ff5256-d736-436e-8881-499db2fb9148',
    },
    WRTR: {
      uuid: '9bad4ffa-e5d8-4bfd-a708-df5eb2148921',
    },
    PCKL: {
      uuid: '6be44722-17a3-48b8-9dc9-d7fb7dd5c5df',
    },
    LASP: {
      uuid: '169e24e6-fe79-4dd8-9520-72612217fb90',
    },
    TECH: {
      uuid: 'ad25a2ee-406f-48a3-9983-46228e8032fc',
    },
    BUYS: {
      uuid: '0cf0e34c-b580-45d6-abbc-3ed0ce2f8b20',
    },
    LASO: {
      uuid: '23328723-6273-42dd-9215-f8ad753b99fa',
    },
    DSNR: {
      uuid: '47953396-f77c-4caa-a650-87a59164aee0',
    },
    PCKN: {
      uuid: '352e02e1-21b8-486e-8296-ac533ae0b234',
    },
    MOKY: {
      uuid: '71400f61-6c1b-43ef-afd4-d8565c2396aa',
    },
    SSAS: {
      uuid: '71698261-0e6a-4cb9-8bac-171c91a5682e',
    },
    WASF: {
      uuid: '116fc7de-a249-443b-aa9b-f8f6a1b48587',
    },
    LASS: {
      uuid: 'f8670157-1de3-45cb-87cd-bf696703913f',
    },
    WASH: {
      uuid: 'e791ffdf-5b0c-4f7a-b99f-8864065c83cb',
    },
    PRID: {
      uuid: 'baae9b1d-d416-431b-955d-0be2640b64da',
    },
    TGGR: {
      uuid: '45405925-d8a8-47ad-9f08-95f84dabe854',
    },
    IVES: {
      uuid: '5b54a1fd-e8e1-42f8-ac0e-fb426ec7bead',
    },
    TECO: {
      uuid: '3bfaa1a5-66ce-48b7-8c84-df5f421eaf50',
    },
    PCKW: {
      uuid: 'af087973-d8b3-468f-9158-50a07ed963ca',
    },
    TECM: {
      uuid: 'a874340c-4fa0-4787-a6cd-a7b7cfa28bf8',
    },
    MOLB: {
      uuid: '5a73fb50-9872-4d7f-b69c-c90568b81d13',
    },
    BOMA: {
      uuid: '958dd610-7a7b-4bbc-8317-a22f4bd082e9',
    },
    REIN: {
      uuid: 'e886747f-f575-46b2-ad1d-302b8983e072',
    },
    SDDL: {
      uuid: '56aa4617-3236-4318-bd6f-a54e5bade3a2',
    },
    PCKR: {
      uuid: '63e2e39f-b1c5-49dd-bf73-76e7309f17d5',
    },
    WRWD: {
      uuid: 'a6db7729-6bdb-4a6d-96c7-9229e5b54886',
    },
    MONL: {
      uuid: 'fc3a0129-7b64-42f8-9ce9-5d58d72e9be0',
    },
    PAIX: {
      uuid: 'fb671374-2ff7-4843-a29b-316a1509369a',
    },
    HDGR: {
      uuid: 'e2cedf72-db3b-46b1-ae2e-ee648858fa5d',
    },
    CLER: {
      uuid: '3eed40b3-8c9a-4cc4-a6c0-5631bfaa92b8',
    },
    SHOE: {
      uuid: 'b30e6275-b0b7-4cca-b4a9-46c0e5868b48',
    },
    BDYG: {
      uuid: 'a9a1aa82-90e2-47b5-8342-aa80cc63366f',
    },
    SHOP: {
      uuid: 'f0dea0ad-95d2-4c9d-b3a3-4436b5537d41',
    },
    HSEM: {
      uuid: 'd88e7551-3eb6-45d8-b530-642081f64aaa',
    },
    HSEO: {
      uuid: '1efd2f9f-91b9-4398-aa5c-24855c3a7e82',
    },
    ITDP: {
      uuid: '0c3e6ef8-0cef-4cbc-9f3e-f1406e63f27a',
    },
    CLEA: {
      uuid: 'd7808daa-6276-4e8a-b405-53c9d0564a71',
    },
    ECOM: {
      uuid: '9ce21759-7a7d-4126-a913-ad3e5848aee6',
    },
    ANOD: {
      uuid: 'ada7196c-53a5-4670-9304-0c137a9ddce5',
    },
    RADO: {
      uuid: '8f578113-c81e-4325-8952-852ea6a52ea7',
    },
    SWMC: {
      uuid: 'c6bf6610-3faa-457c-b595-4a1764af4a37',
    },
    SHOS: {
      uuid: 'e5180d57-27d7-4646-8231-3e83c75d5653',
    },
    GIST: {
      uuid: 'c478bb86-de88-479e-9ada-128d5e3cd747',
    },
    NEWG: {
      uuid: 'caebbb75-b1ba-4e4f-b178-d661a8592f2c',
    },
    MOMK: {
      uuid: 'f9357c12-9fce-48ba-85ec-39d6d4c031ff',
    },
    PPFI: {
      uuid: 'd7e1c7bf-e07e-4706-a22d-bf48322d2f60',
    },
    GREE: {
      uuid: 'c20359d2-b9a3-4bee-b38c-6a112091a835',
    },
    PPFT: {
      uuid: 'ca2aa4e9-ca53-4b8d-a6e1-f9be1a593ab8',
    },
    FUNI: {
      uuid: '5bc477f8-396f-43b1-904a-eeb1e722eb46',
    },
    CNJR: {
      uuid: '42301907-7acf-4688-b301-ec8a30096093',
    },
    TIMB: {
      uuid: '7d2cdbf7-3dd1-476d-87d8-a49e96f0d338',
    },
    LAUN: {
      uuid: '37f168f4-e9e5-4bb4-b461-9d2e585d6039',
    },
    HYPN: {
      uuid: 'eb220243-fea3-47ef-8044-c2c262394363',
    },
    OUTB: {
      uuid: 'f9eb8e0a-b9b3-4a26-80b5-07750a86dd50',
    },
    GACY: {
      uuid: '8d5cb76b-465f-4f7b-8fc5-894364c4eb70',
    },
    NEWV: {
      uuid: '34c3fa61-e937-4f6d-adc8-654c489f3705',
    },
    HYPO: {
      uuid: 'a195c328-56eb-48f2-a3cf-1dff1eae69df',
    },
    PAIN: {
      uuid: 'd45b1870-8972-4238-afde-cec251af23fd',
    },
    XMIN: {
      uuid: 'dd945b65-d4ce-4e1d-bacc-dee7a8d852e5',
    },
    NEWP: {
      uuid: 'a0fb00c4-d724-42d0-8b22-772a98c45c5c',
    },
    BOOK: {
      uuid: 'ff71f097-8eda-4717-9189-a047d985b965',
    },
    RACE: {
      uuid: '2050c881-dfc2-4b3f-9d9f-cd4e5431ee8a',
    },
    NEWS: {
      uuid: '505b9ce3-e281-4440-a1b6-261e73bd3cb7',
    },
    MONK: {
      uuid: '87619370-e015-4188-bfdb-155355730e79',
    },
    CAPT: {
      uuid: '102176e9-467b-4e0e-8077-4388d1198df0',
    },
    SHNT: {
      uuid: 'a2844d65-bbd7-4aff-8b90-c5e4fa113ca9',
    },
    PAIS: {
      uuid: '08bb330a-185a-408e-b0f2-c71db38e759c',
    },
    BOOB: {
      uuid: '8a16cbea-a4e7-4cef-940e-ccfde2442906',
    },
    CARS: {
      uuid: 'f1d1380c-aedb-4ad9-b42a-e7771684cf95',
    },
    MOPR: {
      uuid: '18ebee66-a4b2-4d43-b9ce-9318ded8393a',
    },
    CARR: {
      uuid: '079cce50-a5f0-4d3e-8946-a3e0d4fecab3',
    },
    CARP: {
      uuid: 'b90eae2d-db2f-413f-a496-ad95b07646f9',
    },
    TRAF: {
      uuid: '4567ad23-10e0-4f08-9553-cbce0e83f578',
    },
    TRAD: {
      uuid: 'cbb42d43-a41a-4af6-950e-7dc66afe80ef',
    },
    FOEB: {
      uuid: '0f49daa6-f052-468b-a130-d3652fce8afd',
    },
    ENFF: {
      uuid: '6aa263e6-0827-453a-a0a8-cb72e4937559',
    },
    PLAT: {
      uuid: 'd6fda116-285c-4554-9d76-4a04035fdd03',
    },
    PNEU: {
      uuid: 'd33903bd-19eb-44e9-a0a5-f5a4807ce3c8',
    },
    PLAN: {
      uuid: '14750721-23e8-4d20-bb95-9ae065112707',
    },
    TRAM: {
      uuid: '9dd36664-bc45-40fd-8379-6cd6651fb773',
    },
    RENC: {
      uuid: '2a067043-0947-4de9-94f5-b4a72bcd62bb',
    },
    CARD: {
      uuid: '121d5571-b83e-46bd-b364-8afbbee6d35b',
    },
    RENO: {
      uuid: 'b5747db4-5874-430a-889f-deaf692a8f5e',
    },
    ENFO: {
      uuid: '5e8e58bd-6797-45d4-a6b0-954e5d6f1cec',
    },
    CRSP: {
      uuid: '3f517d95-3127-4cf0-8077-e6038d16fb74',
    },
    TRAV: {
      uuid: '230eaaea-481d-4f24-8614-82fb287bb8af',
    },
    GAGA: {
      uuid: 'ba1debe2-148a-476b-b16c-5b562a26e7f8',
    },
    PETR: {
      uuid: '9c0077e8-1aeb-4b41-8d7e-9c60a4e6e446',
    },
    ENFS: {
      uuid: '533a033a-f81d-4ef9-b89b-9394bc554342',
    },
    TRAS: {
      uuid: '6bd04c69-d0d3-4e2a-b960-465d10073aff',
    },
    SBET: {
      uuid: '0e978a58-eb27-4bce-936b-e71febb97d8b',
    },
    PTRM: {
      uuid: '75a3aafb-cba1-463f-b6ed-56866731b324',
    },
    ICED: {
      uuid: '17d132bc-5042-412c-832b-36875bba1c90',
    },
    SHPH: {
      uuid: '5a8be982-44d5-427d-a798-cc3dd4f0c2fb',
    },
    CASH: {
      uuid: 'db9cc8be-c8c8-4722-b569-2ee8f31b396d',
    },
    JUDG: {
      uuid: '3502c122-915e-4bd6-8742-159e71ff8250',
    },
    PCOD: {
      uuid: '9ae3be2d-4868-4532-824f-e0e73359b40d',
    },
    PCOF: {
      uuid: 'ad4cfff5-6c44-4571-b677-3ead76d7395b',
    },
    SHPP: {
      uuid: 'f0386de5-ae05-4d71-9414-38dbcec5cd73',
    },
    PEST: {
      uuid: '00095bb5-564a-44dc-9a8a-1e9e2df57f54',
    },
    MOPE: {
      uuid: 'e6819d56-f734-432d-9af2-50dd98ff6b72',
    },
    GTKP: {
      uuid: '75f3557e-ff27-4137-a29f-f513a6f10758',
    },
    PESO: {
      uuid: '00d95fa6-2eb4-4f57-8631-f9642af99fbe',
    },
    CRTO: {
      uuid: '63a5360c-83c7-40c6-b236-0e2ac4042286',
    },
    NRSA: {
      uuid: '66f0b612-143f-473e-9124-b6fb6e650481',
    },
    SHPL: {
      uuid: '077ed99a-884d-4bb6-89e2-a6b06587714e',
    },
    SHPY: {
      uuid: 'c4562379-ee7d-4a74-893c-f1363a6eab1a',
    },
    CRTK: {
      uuid: '74375ed7-0f3a-4734-b77a-06c2e665c977',
    },
    PRMG: {
      uuid: '47104f5b-290f-433f-b70d-59eaf8c0fd5e',
    },
    TRCL: {
      uuid: 'f5241c3a-06b6-4b35-bc24-0840f6259f21',
    },
    MORT: {
      uuid: '1802650d-3606-4b86-9e8c-490cdbf77661',
    },
    TRCK: {
      uuid: 'c9f21ee2-26cd-404d-81b0-8c53536caf2f',
    },
    SWPR: {
      uuid: '591dc61e-3f33-4f58-a6b8-65aa5d77d78f',
    },
    CATS: {
      uuid: '43ce2734-45e2-49de-aaa2-dcd640612315',
    },
    DOME: {
      uuid: 'ceeeac3e-c7f9-4932-a05f-5ee4b9e44b9b',
    },
    SFOA: {
      uuid: '70afeea6-14b1-435c-8c66-1cb526b653c6',
    },
    ITHD: {
      uuid: 'b75b9724-90a2-4600-aaed-a6a865021151',
    },
    MGBI: {
      uuid: 'c482600b-570a-456d-a6e4-f221434862a1',
    },
    NATC: {
      uuid: 'd16ca634-f97d-441a-b159-764992fa3c5e',
    },
    PROO: {
      uuid: 'ac15d9db-4401-4eef-bc15-6a4b79e6350e',
    },
    CHAS: {
      uuid: '387dc0b9-9a36-49af-9bd0-c3b9fda68ba7',
    },
    SHSH: {
      uuid: 'c637fc4e-0319-403b-9ad4-7dd12f74e37f',
    },
    CATH: {
      uuid: '07d625b1-95f1-484f-bf2f-02a8f90dc3bf',
    },
    TRCO: {
      uuid: '2bbd070d-7227-4f50-90f2-f35bb8e01943',
    },
    SHSF: {
      uuid: '90333146-d693-4462-ba12-bf20e9a25142',
    },
    MIFT: {
      uuid: 'cab56190-01d2-4366-a4d6-3cf00a72199d',
    },
    DIAL: {
      uuid: 'f75019aa-5021-45b5-94ea-9b9ece54cfe3',
    },
    DOMS: {
      uuid: '1b87225d-c680-4cee-a4a0-47ad32879cd2',
    },
    REPR: {
      uuid: '15d73dc8-76af-4efe-b480-450fae095d38',
    },
    FMCO: {
      uuid: '1f8d3c41-1bcf-43da-8b59-5ba7c3e1c1df',
    },
    HDLG: {
      uuid: 'd4d76f35-5c6e-4404-8778-6f8fb5a51af8',
    },
    OBSR: {
      uuid: '3c0e479e-7486-4fce-96cc-c8d7f40af14b',
    },
    REPN: {
      uuid: '354f1ad5-d7cc-4d13-89aa-e89d14502bd9',
    },
    MOSD: {
      uuid: '7a09f0c8-1892-45e2-a1a5-156b8b20e145',
    },
    PTTM: {
      uuid: 'a0b2b426-f0ad-4cc0-8c15-c196147f1680',
    },
    FDRO: {
      uuid: '5cda16cf-fdf8-4849-b66e-0b292d732854',
    },
    VILL: {
      uuid: '43b5ee1e-4277-486d-adb0-0bbdc13c55ca',
    },
    BORE: {
      uuid: '8888479f-0d9c-47aa-b1ef-53ede64b27ec',
    },
    FDPR: {
      uuid: '3f70d388-b269-43b6-a5e5-1f0b9c4e6f6a',
    },
    FURD: {
      uuid: '97293c4c-c9b1-4851-9e9f-e1e67d0611bf',
    },
    GAGM: {
      uuid: 'e8526fd0-7be9-4d8c-9158-d5ac7b5dabb9',
    },
    SWOP: {
      uuid: 'a13641b5-685b-45d7-910f-95f49c87fda5',
    },
    FURE: {
      uuid: '1a99a495-a5fa-4d78-b9ec-6bfae428a821',
    },
    LFBO: {
      uuid: 'ec89358e-0ef1-4a47-bcea-bacfaceb23e3',
    },
    PTRO: {
      uuid: '8acb29ed-1786-41ae-bcc2-b3ef16c75ea3',
    },
    FDPW: {
      uuid: '816c59fd-1528-43bc-8cbc-e4e58ec7367a',
    },
    SYSN: {
      uuid: '0da8a6ad-da10-4706-a217-56260eb28323',
    },
    FOFC: {
      uuid: '80ac76b8-29f7-4ee5-a927-f88750b17b1e',
    },
    LAYO: {
      uuid: 'ead883d6-8d54-423b-9a0d-60ec8728f7ea',
    },
    ELCF: {
      uuid: '1c660b1c-01c3-423d-9cd0-11ecfd1d40e9',
    },
    FURN: {
      uuid: '1e635c0e-56da-4740-b9f3-2a96e809ce7c',
    },
    ENGI: {
      uuid: '312142c7-c523-42f6-a7fd-c4280cf537ff',
    },
    ELCH: {
      uuid: 'b6fadf3c-4788-4ef5-9085-cf27f8b39388',
    },
    REOF: {
      uuid: 'd486eee3-e5f5-4976-9070-02816aa110f7',
    },
    ENGJ: {
      uuid: '595f566c-af53-4cf5-8f57-05e7fa196b8f',
    },
    DOLO: {
      uuid: '4cb278ff-152a-4c41-bc58-8bd1bd684d25',
    },
    BOSW: {
      uuid: '879e8c8f-b27f-465f-b618-58fbd937faa3',
    },
    PROB: {
      uuid: '045f353f-1719-46fe-90bd-4ba2f2bf70a9',
    },
    OSTE: {
      uuid: 'eeffa9bd-0556-4fb5-ae0e-99e3272d8a3c',
    },
    VMST: {
      uuid: 'cdb6aea9-8319-4e98-9605-071c6132237e',
    },
    ELCM: {
      uuid: '28c7446a-bdce-4e7b-a6b5-0a2b8a0d76c0',
    },
    FURU: {
      uuid: '5c65489e-916f-46be-af94-88b9e74a2ee3',
    },
    ANTQ: {
      uuid: '6b990f18-6637-403d-8e80-8dfccd767258',
    },
    ENGR: {
      uuid: '5b64d94e-2679-4119-b174-53251255c602',
    },
    ANTR: {
      uuid: '4df6b83c-ab6d-42cc-8de5-8c8c9860a4cb',
    },
    ELCT: {
      uuid: '5ece593f-8c56-48c5-b58e-e19be238553d',
    },
    TRCC: {
      uuid: 'b4af9269-40dd-4809-a710-210219a3dcef',
    },
    VECH: {
      uuid: '1eed4639-e1b7-4ce1-b965-c515cde3574f',
    },
    PROF: {
      uuid: '6cb78c6f-cfe7-40dd-a094-00df0430f6a1',
    },
    SHRV: {
      uuid: '1d9ad89e-2d6d-486d-bf70-902a2c97a0f5',
    },
    PROG: {
      uuid: '144991b9-7916-49f6-b4a2-17a7ca9ad1cd',
    },
    ANTH: {
      uuid: '6fb8dacf-8d07-4aa9-b55e-d7aa482805ee',
    },
    DOOD: {
      uuid: 'd136f6fe-2bb4-4063-88cd-48484399253c',
    },
    SOBL: {
      uuid: 'ed084658-fe08-4534-92e3-d6a8de5c20f9',
    },
    CPTA: {
      uuid: '4367686b-7cac-4f65-be28-3fdb991ba92b',
    },
    RTOP: {
      uuid: 'a4764517-f996-4703-b7b1-25ee6a6cfd5b',
    },
    MOTS: {
      uuid: '2d760f2c-5f24-4281-953b-4ed8fd5da9e7',
    },
    DSWO: {
      uuid: 'a1d9f61d-41cd-4e90-8abb-52abf749b215',
    },
    RNCH: {
      uuid: '08f152d7-44d0-4795-9a9f-922e61121738',
    },
    ADAT: {
      uuid: '7f8aa177-c5fc-4f5e-bd42-83552fae25ab',
    },
    TRES: {
      uuid: '3b56a66d-a52f-478f-84a0-019406239133',
    },
    PAPM: {
      uuid: '65ff0309-d795-42c8-ae74-89bea7f87221',
    },
    CHCP: {
      uuid: '1743bb02-4f56-43b8-9657-a7617615c903',
    },
    TREQ: {
      uuid: '0dda3071-05ca-4fa6-bf74-ce3b5a96ac2a',
    },
    TELE: {
      uuid: '44b0d41a-2510-4775-8251-5a5e3e0aa924',
    },
    DOOR: {
      uuid: '672566d6-f644-4417-8074-45ff7e964f98',
    },
    TCHA: {
      uuid: '8d4225e6-f262-436c-aa84-89fdf29139e0',
    },
    FDTH: {
      uuid: 'db99fd80-9a18-477a-80f2-07a7c4f24a01',
    },
    TELL: {
      uuid: '3eccd217-9d85-47a9-82f6-b0f05b8006bc',
    },
    RNCW: {
      uuid: 'ac6b55b3-cdd0-4c49-9df6-bd32423506d7',
    },
    TCHW: {
      uuid: 'c7d2a78a-ba5d-4f6c-8bd2-cbc96f2ecadf',
    },
    TELX: {
      uuid: 'a49c70d0-bf2e-4188-9911-f0cdf415261c',
    },
    AUBR: {
      uuid: '4e65bc5a-e11e-4535-9695-9f7230f865e4',
    },
    CNOF: {
      uuid: '83e25e22-26ea-4865-838b-07a19e67399f',
    },
    MOUN: {
      uuid: '460cde73-9b1a-4341-bb3c-7c09b219b919',
    },
    CLMA: {
      uuid: '34d7f801-9169-4e2c-95c5-5b6bde4386ce',
    },
    SHTC: {
      uuid: '1c3e14cc-10fd-4d6c-bee9-bea9535b12c5',
    },
    MIGR: {
      uuid: '1a69a27f-48be-43ce-97e3-78b1a790d5d8',
    },
    MGCI: {
      uuid: 'd9109745-734a-499b-8b7e-5b3b81e87717',
    },
    PPLO: {
      uuid: '5c9fb120-8d9d-4bfa-9075-9d00662e4f1f',
    },
    AUDI: {
      uuid: 'e13cade7-1d89-409b-b0bc-b4b04083110e',
    },
    BEAU: {
      uuid: '24c4af4a-1cf8-495d-bb0f-8b24666d93dd',
    },
    PPLY: {
      uuid: '1a042a6c-5c39-4a5f-bde0-0237cd0f4288',
    },
    TRDR: {
      uuid: 'e51f0988-1b56-4d8b-a3b9-ae043f787d45',
    },
    AUDE: {
      uuid: '87215939-353a-4a9a-a79e-41d1b7a94efe',
    },
    RAIE: {
      uuid: '9a9395ae-c12a-4d37-b352-bfa895f59d53',
    },
    TRDO: {
      uuid: 'ae5f24a6-702a-473c-89a5-28f4d477b7ce',
    },
    SHTG: {
      uuid: '57f2db0a-1d14-43f2-bae7-2bd2d1a0b724',
    },
    MGCS: {
      uuid: '85f12b7b-9c79-44d7-9edc-b2d4d89b5b44',
    },
    ELEN: {
      uuid: 'e0d215c6-1251-45a0-8a63-a3a4e5bfc38c',
    },
    SWRD: {
      uuid: 'be2739e1-a293-482e-98e2-9843a24ad484',
    },
    ELEP: {
      uuid: '765dfdb5-8326-45ea-9e14-692177a0dcc9',
    },
    MOTC: {
      uuid: '42b0ee9b-182a-4896-ba44-37cd32ab2ef8',
    },
    ELET: {
      uuid: '24873c12-7257-4836-a851-8a24c86642cc',
    },
    TREF: {
      uuid: 'e1331e5f-f8d6-4f14-841f-be7818baed0a',
    },
    FDSM: {
      uuid: '59c975b4-e3a8-441d-bdcb-263ae2637b75',
    },
    ELEV: {
      uuid: '81608cf0-e393-437c-b24d-b11e1cd3d94f',
    },
    MOTO: {
      uuid: 'e47a684f-31d0-4df6-80ab-46aad4f04e24',
    },
    AUCT: {
      uuid: '43ad02be-fbac-4383-8ebe-5da0f2edbb9d',
    },
    WNTT: {
      uuid: '4e788956-87bc-4df8-8901-35029b6ea454',
    },
    VIPE: {
      uuid: '0265d862-44c2-4559-ad68-3d9b309b56e8',
    },
    TRGO: {
      uuid: '7efc8079-0fdb-43c9-8820-3425d457f388',
    },
    DIEC: {
      uuid: '88468e16-e6bc-43a4-8a22-2e52d0907379',
    },
    PRSW: {
      uuid: '3f5eadcc-1b54-4f9c-ac7b-50ed42766723',
    },
    PPOP: {
      uuid: '2198e8f1-2d25-46a1-b4e9-196ff80ea861',
    },
    PARA: {
      uuid: '678e1556-420a-4099-86f0-744b08a656d8',
    },
    PRST: {
      uuid: '3f0e0471-c01f-4937-a231-3e9bc4e6eca8',
    },
    FSSO: {
      uuid: 'ae9493a0-a43f-4a30-b39f-63e993c75604',
    },
    GRNK: {
      uuid: 'aec7c75e-3c53-4154-aced-90fd048fdf81',
    },
    SHWN: {
      uuid: 'b051fc9c-f4ad-4c3b-9860-1f651976e358',
    },
    RETL: {
      uuid: '51268124-12aa-450a-98cd-2e2ab6c4ec14',
    },
    RETI: {
      uuid: 'efa81956-4487-4463-9794-0f300aaee784',
    },
    CLMT: {
      uuid: 'eec2c7cd-f4d3-4ccc-bfdf-d42f1848b000',
    },
    PARK: {
      uuid: '6298a3e6-5f30-4bde-a590-79f086cc8b7f',
    },
    CHEN: {
      uuid: 'eb019a38-6a50-4b90-9a7d-0f1374633957',
    },
    CHEM: {
      uuid: '32914d50-1b54-4c6a-9641-8b550ef9364f',
    },
    ENLV: {
      uuid: '517e971a-9fa5-464f-ab33-166f18bb2f11',
    },
    DIET: {
      uuid: '9c612a3e-f123-4601-b35a-09de4c55b4fc',
    },
    PARS: {
      uuid: 'eb62efc6-27ed-4aae-8fcd-6e6691197c56',
    },
    CHEF: {
      uuid: '7d85cb22-b138-4f96-9b8d-180333f999b1',
    },
    GAMK: {
      uuid: '8f0bb2cf-7ac8-4424-9056-43baad362498',
    },
    CLMG: {
      uuid: '0e87f284-1a4a-4545-8014-fe26fda0fe1e',
    },
    SSMG: {
      uuid: 'b6c769ef-74fa-440d-8fb4-88a21044b5b5',
    },
    GROC: {
      uuid: '33801821-e327-4a19-86f1-5598702adbe8',
    },
    ENMC: {
      uuid: 'ab8da847-48fa-4d9c-898f-5abce7bfdd91',
    },
    CNSG: {
      uuid: '42c0a15f-fe91-44d4-b474-24e6d3a0b90c',
    },
    TEMC: {
      uuid: '31299d09-477b-412b-9726-1b97fd3a2371',
    },
    ASBL: {
      uuid: '2bf55b0f-8e69-49e5-8415-d20339b838fa',
    },
    ZOOC: {
      uuid: '32316484-df42-43cf-8e21-f286567cc844',
    },
    ZOOH: {
      uuid: '76855153-0e82-450a-ab9c-625736c14a50',
    },
    SOCI: {
      uuid: 'a7b01310-7b9d-4c94-93d7-01178b25f0bd',
    },
    RVTR: {
      uuid: 'c7675826-16b2-4332-a04b-a3cdd4dffe30',
    },
    BOXE: {
      uuid: '1fdf3d90-e5e1-4490-8937-0b53ddac1438',
    },
    ASBF: {
      uuid: '1b72119c-67dc-477d-a247-5d03799287ae',
    },
    RESO: {
      uuid: 'a4f0f912-21f8-42da-8cca-9b547f1708c2',
    },
    ASBD: {
      uuid: '69c09fd9-71d8-40b8-8f47-b9f741ea9bf1',
    },
    TEMH: {
      uuid: 'da97d236-c79e-4d7c-960e-a2a5b50227ee',
    },
    ASBC: {
      uuid: '0300a4a1-1962-42ca-b81c-9619cb56b3cb',
    },
    RAKE: {
      uuid: 'aa5884df-17ea-4cec-a9d4-cf766f907717',
    },
    MEAT: {
      uuid: 'adf09b9d-a804-48ab-93ed-e10e5b9bc6e6',
    },
    CLNR: {
      uuid: '4b1bfe4c-5027-404f-9b87-e93d18e36989',
    },
    LFGD: {
      uuid: 'eef0f383-3195-4a99-9d09-c80636e5a658',
    },
    PRSB: {
      uuid: '6803c3ab-345d-42bd-b576-5f09dae9064f',
    },
    RESP: {
      uuid: '7545fa7c-4ac8-43f5-b353-2e01848ba015',
    },
    CNRO: {
      uuid: '09afb334-0406-4ddd-8002-ae3d5a2033af',
    },
    ZOOL: {
      uuid: '0c6b0b32-5f95-4d2d-8236-a2768b6667f7',
    },
    VCCH: {
      uuid: '52e60da0-8ee3-45ba-abb4-769b91a5ee4d',
    },
    ZOOK: {
      uuid: '92d09968-107d-46d9-bf0d-00bbe57a4f3e',
    },
    TRGD: {
      uuid: '022e3a6f-d8a6-41ea-8a0c-64898901db9a',
    },
    GLAZ: {
      uuid: 'f71bc1f0-0378-4737-9f35-867acf2f8139',
    },
    SURV: {
      uuid: '8c7462a5-824b-413f-bea0-11e9bcbfe57d',
    },
    MEDS: {
      uuid: '4b219b03-9e30-4242-94ab-67f7913d49ba',
    },
    PLIN: {
      uuid: '68157ac9-bc1a-4bcb-820f-9ad98f6497db',
    },
    FIAD: {
      uuid: '16a3065b-d75e-4d8a-ac3b-a61e3ccd7e90',
    },
    ADEX: {
      uuid: '4dc8d85d-cbcb-42ff-b6c3-6e2acb950247',
    },
    PATR: {
      uuid: '09359499-72a3-4144-a8b4-c5a771c1dd82',
    },
    ENNR: {
      uuid: 'f0e27bf4-3aab-4f75-99fb-e283178ca3f6',
    },
    USHR: {
      uuid: '0b52fed8-bccc-4f72-b9d1-1352a0df8da3',
    },
    PHAS: {
      uuid: '1485ced7-bffb-4727-9163-596169a45722',
    },
    ABAL: {
      uuid: '230e62e2-de05-4220-bb91-2bb34872218c',
    },
    PYCL: {
      uuid: '759660fa-9718-40d4-bbd3-bb2c3c7f81d9',
    },
    BILL: {
      uuid: '99770b6a-9fc7-40cb-9ceb-9b70a786c077',
    },
    PAUA: {
      uuid: '504eff96-15dd-4aa4-bc49-3e9fd87a0003',
    },
    HDRO: {
      uuid: '0dda1012-d126-475f-a346-a970534844ec',
    },
    ANYS: {
      uuid: '30f4d765-e833-4cd8-8248-7cdfff6bca7e',
    },
    SUSO: {
      uuid: '45bfb6d4-7bc1-4a95-8110-2899a153be7e',
    },
    ASBT: {
      uuid: '375308e5-c5c3-452f-aff2-f8f3111d30ef',
    },
    BOXO: {
      uuid: 'e50f1df0-9e0b-4073-b75d-8bc929086b21',
    },
    ASBS: {
      uuid: '00a682a6-af5b-4adb-ab5f-f439603f7f69',
    },
    CLOF: {
      uuid: 'a4ad7bba-47cf-4b7e-8c6d-eb39b02ae81c',
    },
    ELIF: {
      uuid: '9c062f72-2ca0-493f-baa7-35bb764bfaef',
    },
    FSTM: {
      uuid: '20ab2901-c20c-42ae-947f-1b6d3f3cc9ca',
    },
    GROM: {
      uuid: '56b54bf4-c0d7-4c82-aa07-301293d67db4',
    },
    ENMO: {
      uuid: 'b007fa06-7442-4526-807f-31885c8a5ec6',
    },
    ELIN: {
      uuid: 'c3302627-e208-40e5-96d0-d6eda1c7d7a0',
    },
    MTAC: {
      uuid: '705ae802-67cb-4302-a9eb-92438432014e',
    },
    GROP: {
      uuid: '7a20996d-1f76-4a83-97bf-9b03686eca75',
    },
    FOLO: {
      uuid: 'cce2a249-4982-41ab-b07c-630057dab394',
    },
    ENMS: {
      uuid: '32a55ee0-a19e-4955-b903-f95ac8668fe1',
    },
    TRIB: {
      uuid: '8f4e47e9-a345-4432-a6d6-1952997a4e29',
    },
    SURG: {
      uuid: '29bc6732-62ed-4e4d-bbd5-4b39d4be3b96',
    },
    FOLT: {
      uuid: 'db6f8f11-a01f-4f15-be74-25e04c50562e',
    },
    ENMT: {
      uuid: 'f956ed27-62f1-4ab4-a0f4-15cc2dfac7d7',
    },
    GANG: {
      uuid: '0aa504e3-8663-4cc1-af03-46afb612a2c0',
    },
    CFDL: {
      uuid: 'afb945ea-24b0-491e-bf92-382b0eb277c6',
    },
    MTAL: {
      uuid: 'a826ce88-4224-4f61-85f2-6b56fa1665f2',
    },
    CNTR: {
      uuid: '9643edbd-3649-44a0-9a12-12526800d998',
    },
    BEEK: {
      uuid: '59fedadb-4ed3-418a-8ebb-d3657226674d',
    },
    SFTR: {
      uuid: '11f6f23f-c0d6-41fc-9770-c6509d35e30c',
    },
    PAST: {
      uuid: '8f0bdfe8-a383-47d7-affa-eddf48629eb0',
    },
    MILL: {
      uuid: 'fbee4d2e-50a1-4349-8335-78a35dc70680',
    },
    VMYR: {
      uuid: '2e4cf857-1bbb-4ed9-859f-923369aa1117',
    },
    MILM: {
      uuid: '3bcd22ef-3941-43fc-8f7e-a6bcf311e2c5',
    },
    BTBU: {
      uuid: '1eb5cc55-bc3c-4e0e-ac2d-5ce25376962e',
    },
    WLTS: {
      uuid: '92171a7e-0361-42c8-8d99-817c08a127e3',
    },
    MEDD: {
      uuid: 'dca9debb-90df-423b-bca4-ceb027db3474',
    },
    GRPD: {
      uuid: '5fc27405-dbf4-4609-8d01-1dd59a0691a2',
    },
    MILK: {
      uuid: 'c01cafb4-0b70-4dad-a801-8abe3f149817',
    },
    TRIC: {
      uuid: '88ebedaa-b5c1-4561-807e-c3878bb4e994',
    },
    CWGR: {
      uuid: '0c5b6162-f928-47fe-af48-ee99b8d73981',
    },
    PAVI: {
      uuid: 'eb7db69a-52d6-4ea8-b17f-123753fc55b3',
    },
    BIOD: {
      uuid: 'bbff64d3-0468-4f46-af30-a165729f3075',
    },
    HOID: {
      uuid: 'e1efb42b-dbd3-41bb-96b4-67c5b9db4003',
    },
    INDE: {
      uuid: '3008a2db-af45-4084-ad95-1973dc40f00d',
    },
    FICE: {
      uuid: '52079260-7139-4108-a0b4-7ac0d1faef91',
    },
    DOUR: {
      uuid: 'b59184de-3da4-407c-8b12-6f9d03393dbb',
    },
    SFWR: {
      uuid: '9516b018-d231-4dae-93dc-ffcb0379207c',
    },
    RCTR: {
      uuid: '73bbc0a3-9aa4-4efe-91e0-10561978bbea',
    },
    NUCD: {
      uuid: 'edfb4876-459a-446f-b939-ce9c131a01c5',
    },
    ENPS: {
      uuid: '17d1fd15-78da-45a1-909e-c2935144d35f',
    },
    JOCK: {
      uuid: '6bd824f7-15ff-468c-88ae-9cba812fd209',
    },
    FOOT: {
      uuid: 'c199e7b9-366e-42e9-b391-cc0e87ecdc3f',
    },
    NUCP: {
      uuid: '01653813-ab1c-41f5-8682-a1fe2dfc5fe4',
    },
    HOIS: {
      uuid: 'd671c0a5-5867-4ec8-86f2-fcc526f030dc',
    },
    CHIR: {
      uuid: 'd5a96bdb-380a-43aa-b782-d05a2d052cd2',
    },
    CHIP: {
      uuid: 'fedb256a-a023-4661-91e2-6da750d9b700',
    },
    CPYW: {
      uuid: '5d7fb634-d287-4e5b-a77b-728bfbc323cb',
    },
    CHIM: {
      uuid: 'd2525b96-605e-402f-890c-062edde9a4e8',
    },
    CPYT: {
      uuid: 'b91d6622-7ccd-4bfd-96ed-90ffb1daac13',
    },
    MTDP: {
      uuid: 'ec2203a0-b5ff-43e7-96b2-ae14555ccd19',
    },
    CHIL: {
      uuid: '0cf1362a-093d-4417-a875-51733e3e5993',
    },
    ELMA: {
      uuid: 'e597bcfe-8c0c-452d-80e8-de23eb28398e',
    },
    CHIH: {
      uuid: '3a51e8b0-9c11-4a28-badd-4bd841a69089',
    },
    ICOS: {
      uuid: '80ceb03c-314d-444d-b758-0ea3943e2d7a',
    },
    ELMC: {
      uuid: 'b109d2b3-fac5-497a-804e-1c9f24c587ab',
    },
    ELMD: {
      uuid: '3779518c-1291-4de0-9cdb-d28071ee3160',
    },
    ENOF: {
      uuid: '82ca7220-b9fb-49de-a4c0-aa5526fa4203',
    },
    REWK: {
      uuid: '65c66ba2-8a50-401e-a5ef-d6537f69f477',
    },
    TCMC: {
      uuid: '5175562a-7be1-4ca5-8c3a-66646490d640',
    },
    MEEN: {
      uuid: '8d3f8846-c4f4-4e4e-8068-a95950de4546',
    },
    HSPN: {
      uuid: '07f44d9e-bc4f-421c-a546-599029f72315',
    },
    HSPP: {
      uuid: '0db7ffe9-4eae-43a7-a11d-8f0daff8d404',
    },
    MCAS: {
      uuid: 'ef62104a-a075-434e-b603-604045852366',
    },
    ITOP: {
      uuid: '1184025c-7995-4386-9d04-1ac8b24d80ee',
    },
    HSPS: {
      uuid: '38b016f5-13e4-437e-bf82-5932401ff8a4',
    },
    CNVY: {
      uuid: 'cb7ed433-d773-4a43-baf2-15b64eed1c81',
    },
    DEAN: {
      uuid: 'e9465e98-5796-490b-8c08-03dca9118ea1',
    },
    MINI: {
      uuid: '28f2fdd5-0d73-4f5c-8a0e-065308be9dde',
    },
    SUTE: {
      uuid: 'd4e57f3f-78a6-40f7-a906-a5676e976fd3',
    },
    KITM: {
      uuid: 'b2d2af81-f001-491d-a55d-c072aa911579',
    },
    MTCN: {
      uuid: 'bd8bd580-4aee-4148-a2ad-3b8ac1ae3fef',
    },
    TAIL: {
      uuid: '5d1949d6-660d-4545-9928-aec83fd0b419',
    },
    BIOM: {
      uuid: '02e0f6f5-0fda-471f-9e9a-e5dfdf95b252',
    },
    CNVO: {
      uuid: 'e653394f-0604-43e3-ab28-755dab1b8b39',
    },
    BIOL: {
      uuid: 'b13a9133-8a8b-4e1e-8623-0b1b2709440d',
    },
    ENPB: {
      uuid: '9875acc6-0955-4419-a384-37920c815bee',
    },
    GRRD: {
      uuid: 'd3ec241c-7f9a-405e-9e00-18a6a8990ed7',
    },
    CLRK: {
      uuid: '7aea4115-48ce-4dde-b5cc-7c3c75c147b3',
    },
    OGFR: {
      uuid: '6d348e15-bb23-4418-90d6-4d83b77034f5',
    },
    MTFB: {
      uuid: '3c9707a7-94b5-4db3-8fb4-89e1f3377701',
    },
    GASA: {
      uuid: '807f2cc5-8d34-4d98-bf6c-3e6c4baf8e3e',
    },
    GASD: {
      uuid: 'aef5edd8-9fbf-4b77-8cad-9d8ff317ef36',
    },
    GASC: {
      uuid: 'd601431a-000d-4dd1-bc86-1a8cac6077ef',
    },
    VRGN: {
      uuid: '84bec1ca-65bf-44c8-845b-070a045937a2',
    },
    INFO: {
      uuid: 'dc73b03f-1649-497b-b7f9-c78e61cf6465',
    },
    GASF: {
      uuid: 'd7858ca4-32bd-45a9-a360-f9c309cbc895',
    },
    ENRW: {
      uuid: 'c5d40308-9a4b-4723-aa83-2d114a293f97',
    },
    VRGR: {
      uuid: '3b58f884-1e20-4a25-bb26-87822aa7773a',
    },
    SUWK: {
      uuid: 'b9642f38-b633-4fe3-8cfc-d558e0c2322c',
    },
    NUEN: {
      uuid: 'c5f85ddc-9254-4b60-8bf5-37c735006517',
    },
    FGAT: {
      uuid: 'b6bdd4a0-fdf8-448f-beb0-8fc17d533453',
    },
    GASM: {
      uuid: '2408ad85-e8ba-4380-9a62-f86c0052cc22',
    },
    ADIO: {
      uuid: 'f8b94f63-69f5-488f-9388-a842098c29e9',
    },
    PLNO: {
      uuid: '41604cd9-d92b-4a14-846f-9bf30a0e1591',
    },
    ADIM: {
      uuid: '8d33b849-2798-4a15-86ac-7c2b77f76da3',
    },
    GAST: {
      uuid: '8de19ef4-990c-4578-8c52-1b7d38141b64',
    },
    FORC: {
      uuid: 'aac9ff6b-7d13-4379-9fde-e3ca20060bda',
    },
    DTAN: {
      uuid: '0904c5a0-08bc-4ebc-b076-b90539bc4542',
    },
    FORE: {
      uuid: '11922414-79de-44d6-9ade-82f20a170089',
    },
    ASFT: {
      uuid: '2a4e9594-b357-4072-8e63-5c8b6d25b211',
    },
    HOLC: {
      uuid: '08de2cbf-7e9b-4e96-ad27-86bc8c62e0a6',
    },
    TPHN: {
      uuid: '5e13e1ea-95b1-4855-bd2b-06dc4e59cc39',
    },
    HSRP: {
      uuid: '7de54135-9fe1-4a4b-91c9-92a85d245a6f',
    },
    MTEM: {
      uuid: 'c7303d2e-fde5-4e76-a2e6-ed2a78a1fe3f',
    },
    GARB: {
      uuid: '3dfa3a2b-11fe-4ffc-a6e8-bff8f5db3f02',
    },
    TRLY: {
      uuid: 'f4747eb6-0c38-45b0-8458-91ae1bba8579',
    },
    WSEN: {
      uuid: '4d5541b9-169b-47f3-bd4d-c409a05dd76d',
    },
    GARD: {
      uuid: 'df45d352-c8b4-4ecb-a90b-fa42c3454461',
    },
    PAWN: {
      uuid: 'd53c4c80-ea61-4258-ad78-5fb307ca3703',
    },
    INEM: {
      uuid: '0fd0aef2-f7e6-43c8-a67e-15665d8da826',
    },
    TRMF: {
      uuid: '89020542-eb4e-4237-9c97-1579341d2c10',
    },
    CLTY: {
      uuid: 'd767fceb-914b-4704-8c6e-30a4cfd3cf95',
    },
    MKTM: {
      uuid: '18305c64-6ed3-4c0b-aeb4-13ec2a7c7b93',
    },
    BGMS: {
      uuid: '7a5eb3f1-9609-4c06-80cc-f136deea33cb',
    },
    GARM: {
      uuid: 'e53921e8-71eb-4b20-a687-0b140e2b0f7c',
    },
    DECL: {
      uuid: '0db62d37-8458-4f23-8c1d-b11a298354c7',
    },
    MTEO: {
      uuid: '1a867265-10e1-4fd3-8d17-5a2b459ee671',
    },
    MKTG: {
      uuid: 'ae9e1630-72d9-4730-86f5-70c435daa07b',
    },
    MKTS: {
      uuid: '0017a110-d901-448b-ab9e-d7af94d53a34',
    },
    ENRC: {
      uuid: '134b330b-24c2-4c66-917d-2c8afa347ce2',
    },
    CSAS: {
      uuid: '0b5b982f-a4c8-43ce-a3b2-b6ee6192d36b',
    },
    GART: {
      uuid: 'bd7ffb32-fbdb-4fb0-b927-066ea9097f05',
    },
    AQCS: {
      uuid: '86ede65c-02a2-4c39-9ec9-dbf2083b5f80',
    },
    MTEX: {
      uuid: '327531f0-8d33-4075-8a7d-d853826239bc',
    },
    GARW: {
      uuid: '79d63c49-902d-47ef-a875-3e23ab0cef22',
    },
    OILW: {
      uuid: 'd50e1b62-09a8-4934-acbc-177ec519a79b',
    },
    DTBS: {
      uuid: '619f8e08-3ad9-45b2-ab61-50bf3432a433',
    },
    TROV: {
      uuid: '745bc158-6fba-4963-aae6-7111460a69f7',
    },
    HOMI: {
      uuid: '40303479-40a0-4418-925f-4ccc318ca562',
    },
    ELPL: {
      uuid: 'c285309c-94f9-4891-a9ff-6b048b2424c4',
    },
    SOLR: {
      uuid: '52221ea9-b7dd-4a2e-a0c0-0a270bde5829',
    },
    PLOT: {
      uuid: '34336e88-ad21-4e6f-a955-c509c24434fa',
    },
    OILS: {
      uuid: '5a233b11-f077-4fb9-9ed3-1dace1a867d5',
    },
    SOLP: {
      uuid: 'b8d575b9-2028-4439-8c37-48fe448a880d',
    },
    OILU: {
      uuid: '31440ed5-03d0-433f-bee3-c90d64d3ff54',
    },
    OILT: {
      uuid: '79472374-7b20-48bf-bdca-0f6d435cf68d',
    },
    ENTR: {
      uuid: 'f0150246-6209-4c4b-8a5c-f96d59839f29',
    },
    TCRO: {
      uuid: '5fc9c2d9-f97b-4530-93b9-e387d36fc5bd',
    },
    FOST: {
      uuid: 'b8f963cc-906f-4fd2-829b-94b2959e6bf4',
    },
    HOMS: {
      uuid: '1a0bef4f-04d7-4098-b5f5-0b0adb4611fa',
    },
    OTC3: {
      uuid: 'baf03135-f4de-4a11-bd74-ad22d67affc0',
    },
    LOAP: {
      uuid: '30df7722-d4dd-498f-b11b-9bbf56f7c78c',
    },
    OTC2: {
      uuid: 'fc935ce0-9f6e-42cf-89d1-8ff81c1d6b5a',
    },
    AUMC: {
      uuid: '73738b49-dc36-47ad-9029-af239d318cc8',
    },
    OTC1: {
      uuid: '146334ec-c435-4163-b08a-39f9268f0ef8',
    },
    PNTR: {
      uuid: 'cb7bccbe-62a3-471b-abdc-0b68a8b0994b',
    },
    TRPO: {
      uuid: '40dd560b-147a-46c2-9c1f-8389fd3d3de4',
    },
    MACH: {
      uuid: 'a46f64df-9630-4358-abb2-af4313554b4a',
    },
    TRPN: {
      uuid: 'f2d88310-0115-4e96-a56d-38f5d6a4ea65',
    },
    PNTO: {
      uuid: 'c21e77b7-9c6d-4bd9-9032-3f8126222a9f',
    },
    MISO: {
      uuid: '778c218a-96bd-448a-9d5d-9b58e1c26d55',
    },
    TRPL: {
      uuid: '4ff00b2c-7e0c-4580-a434-6cec8027dd4f',
    },
    RCYC: {
      uuid: 'bbb87955-0977-4790-8c35-cc4835fe6664',
    },
    BRCT: {
      uuid: 'a8c4a019-372b-44b0-b47d-e54208e45f7c',
    },
    BRCS: {
      uuid: '9f48c8f3-b8e6-43d7-9978-23134e00086b',
    },
    PLNR: {
      uuid: '65d74509-f27c-4e0b-8e33-2f643fe379b7',
    },
    GRUN: {
      uuid: 'b0f44a4f-02d2-4144-b239-ecfce3767935',
    },
    TRNR: {
      uuid: 'a9b2afcb-bc72-478b-ae0e-4fa68c200a30',
    },
    CWLO: {
      uuid: '1f0f89a8-5963-4bc6-ac7f-f7dbbb23d8e4',
    },
    IRON: {
      uuid: '2a47e869-ad4e-4589-a7e4-362769218f8b',
    },
    MRCH: {
      uuid: 'd3e44360-b044-406f-8e7f-011f1ed26b78',
    },
    OILF: {
      uuid: 'b33ca305-8ed7-4790-b76b-89d06798024b',
    },
    BREA: {
      uuid: '715a5548-3d03-465b-bae9-c740cebdda16',
    },
    ENTA: {
      uuid: '354d9414-2c97-497d-a4ac-c5cd1766ae04',
    },
    BIST: {
      uuid: 'bf73bd15-0469-49d0-95ed-baf2fad34cb1',
    },
    ELPA: {
      uuid: '19a01b67-a692-4677-b681-3a02037203cc',
    },
    OILP: {
      uuid: '73602951-cd10-4e7c-8b96-5d7b3cb4ed8c',
    },
    LUMB: {
      uuid: 'c39a5cb4-2c52-4148-9798-287fd97e2053',
    },
    OILM: {
      uuid: 'cdfc17c4-1cdf-4088-a5ed-b29f85b14221',
    },
    CSET: {
      uuid: 'd304caea-a4ad-42ad-9fca-7bb9160fb1a8',
    },
    TEXM: {
      uuid: '460ad71f-1a9e-4c45-a871-1784d3b12074',
    },
    CSER: {
      uuid: 'fb136a61-432d-4304-a9b1-d77ddadc4f42',
    },
    FOUN: {
      uuid: '0fd3bf1a-7bfb-4c29-8a09-0d7a8ec90052',
    },
    CSEO: {
      uuid: '412e9d73-f641-4f76-a90a-09868e6009cd',
    },
    CHPE: {
      uuid: '9713034e-22f2-4cba-86ae-8fe7129fc43e',
    },
    TLEO: {
      uuid: '5d62ce55-e8b3-4c19-97e7-649475cad31d',
    },
    VGVR: {
      uuid: '3c25f4d2-2111-4358-82a9-3fbdbfcae314',
    },
    TLEN: {
      uuid: '19fac821-2a3c-4b5b-9711-58c5b9ca0a8a',
    },
    MCHT: {
      uuid: '30476e2b-e835-48c4-b59b-43a297743e98',
    },
    TLEM: {
      uuid: '422aac0d-1fdc-4777-afbd-a285461fda83',
    },
    LOCK: {
      uuid: '5d32a2c1-cfdf-444a-abdf-b38168a42910',
    },
    MEMB: {
      uuid: '049deba1-fb13-45c4-91e6-2b06776db768',
    },
    CSEH: {
      uuid: 'f5329f18-104c-4800-9c9c-8ae7de3dcece',
    },
    LOCO: {
      uuid: 'ff3d48ea-4d80-486c-96ef-1e59616db8d4',
    },
    CSEG: {
      uuid: 'c943bbb2-eeb5-4330-8263-278682cf4550',
    },
    CSEF: {
      uuid: '6fbb4067-ee82-40fb-b4dd-dee4b24c8a7b',
    },
    TEXP: {
      uuid: 'd322ccdc-0159-48bc-a943-5ad3f722e072',
    },
    DRAF: {
      uuid: '14e19c69-5206-4abd-ab79-3cab27aed187',
    },
    DRAG: {
      uuid: '016532fb-fcf1-424e-a904-ec67a2738bdf',
    },
    CHOR: {
      uuid: 'f2162856-c197-4429-86d0-3dc36557ee73',
    },
    ADMN: {
      uuid: '00a097c3-5f6b-411a-bb77-d0d218208dcf',
    },
    ADMO: {
      uuid: 'e496a124-7725-4fea-bc78-40f131cc1459',
    },
    BELL: {
      uuid: '5af44d9f-2a4f-446e-ae8d-12e61bfd6bc8',
    },
    GHEA: {
      uuid: 'a6b49e81-5022-42b2-bbb5-1a835dc237e5',
    },
    ELSI: {
      uuid: '1dcbccd4-7386-4419-85f3-2c28873200e4',
    },
    CLWN: {
      uuid: 'c300b1c2-5745-413e-8020-3b1f3c5e5b1c',
    },
    WSIN: {
      uuid: 'fac1d312-2637-4fae-af41-9cd373f10804',
    },
    BRGM: {
      uuid: 'fea3bef2-901a-4665-b76b-9b3389864ec1',
    },
    KERB: {
      uuid: 'dca4ab75-ea9d-40a6-b5b9-319ae0d86f53',
    },
    PUBL: {
      uuid: '3418ac39-cbfb-45df-a867-afd71c7c939e',
    },
    MELC: {
      uuid: '708957db-68e7-4e93-9741-947aed2bdc7f',
    },
    PUBF: {
      uuid: 'a15163a7-2937-4f4f-b32b-8e92952e2a5f',
    },
    PUBE: {
      uuid: 'f907dda0-45e7-4dcb-ad07-5987ad8cd926',
    },
    MPAN: {
      uuid: 'd045211a-d594-42f6-8d6e-439a207006e8',
    },
    PUBM: {
      uuid: '8ea119d6-f68b-4d90-bf49-9df12c00e1b2',
    },
    LOBS: {
      uuid: '9b506df7-5405-458e-a193-c0adafbe2496',
    },
    FOUD: {
      uuid: 'eae13e24-862b-466b-ab0a-5832e9bced36',
    },
    TEXD: {
      uuid: '8265629e-c585-4aea-876d-2e5e38053ba0',
    },
    TEXC: {
      uuid: '6e29f817-ded4-4e92-b5af-13fdad1100ef',
    },
    HSWF: {
      uuid: '348685e0-7e78-479e-ae06-cf301968a13f',
    },
    TEXB: {
      uuid: '4b09de8f-3a91-4d07-92a1-0dd7045301c9',
    },
    CHPL: {
      uuid: '1f6e19d8-d96e-4317-ba5d-31d0f956d950',
    },
    VLAS: {
      uuid: '6c8205a4-fa1f-4186-a6c2-900b19296ad2',
    },
    BAGG: {
      uuid: '2ef879f3-30c8-405e-8a65-3cc65853ac32',
    },
    AMAR: {
      uuid: '19c50fd0-43b0-485b-8de8-b4f807a90b19',
    },
    PYMD: {
      uuid: '37b349ea-8675-4d5d-a996-6ece1f3f0bf3',
    },
    PDCR: {
      uuid: '315c6944-da97-424d-bceb-79f98bea7ea8',
    },
    BTLR: {
      uuid: '8fca4a33-bf99-4860-81a3-fca0bc8f1be1',
    },
    VETE: {
      uuid: 'f66f8f94-6bb7-46b9-af98-794778508036',
    },
    PLTE: {
      uuid: 'bfbb71e4-d2c4-4668-aa9b-fa2145be7644',
    },
    ASMO: {
      uuid: '3a112fd2-f078-4ba3-ba15-03228d49cec1',
    },
    VALE: {
      uuid: '12e097e3-54cd-4f3c-b571-a89f06a9c9ce',
    },
    PLTC: {
      uuid: 'f5793106-eba0-4290-b33e-198876e9bc94',
    },
    TARM: {
      uuid: 'bae564d6-6918-4b7f-af3a-2fca5ed375b7',
    },
    PLTO: {
      uuid: '01990067-7c95-4b76-8fe9-d02964e29650',
    },
    PLTN: {
      uuid: 'd4031d60-d002-4bf2-af39-0c0f5bb49e82',
    },
    MAGI: {
      uuid: 'ccfe3997-6758-4a0c-82a6-d1ec04faebc7',
    },
    AFST: {
      uuid: '197d1440-1049-4e94-ba11-5a25acbad3cd',
    },
    VALR: {
      uuid: '254ab6ed-9e9b-4286-a297-cd24050595e2',
    },
    PLTW: {
      uuid: '6dc7b490-55d0-48a9-a670-183b8b4447ae',
    },
    VALT: {
      uuid: '7d8124c4-8dfd-4b14-99c4-c8d7d64ed530',
    },
    PSAW: {
      uuid: '04d684f0-1666-40ea-95da-a8bc59c8d895',
    },
    MAGR: {
      uuid: 'f9ce45bd-04de-44c4-bf7c-3163a3f476e1',
    },
    FILE: {
      uuid: '85ad3c6f-3f28-430d-b0d4-89e8077a11a0',
    },
    PHLO: {
      uuid: 'bb844bf1-a508-4302-9e2c-ab3650f14a02',
    },
    DRAU: {
      uuid: '431e425f-80e9-4033-87a5-d54e491e9b7e',
    },
    AMBS: {
      uuid: '420302dd-2c97-4400-893b-114fe5dd0c95',
    },
    TRRW: {
      uuid: '80c65bee-72cf-4416-aba8-cbef2538dcfa',
    },
    DRAY: {
      uuid: 'ed6bb604-f13d-4b73-8ac9-d557c9d2953d',
    },
    RLLR: {
      uuid: '9929bf29-5ccb-40d1-89e3-8a010355fefa',
    },
    CHSF: {
      uuid: '15749c70-06d1-4568-93a2-a268eed993b5',
    },
    AMBL: {
      uuid: '2ac9076f-4bff-4fc9-9caa-2e92823266d2',
    },
    ASNS: {
      uuid: '06adc206-a836-4eab-a4cf-8a1e53814b8e',
    },
    ASNP: {
      uuid: '69c0a722-8de1-4011-b183-e8024dcd86e4',
    },
    TNKF: {
      uuid: '2c586078-a03b-4fae-b631-8045f62f769c',
    },
    AMBC: {
      uuid: 'aaef680d-b688-46fc-ae5f-c02256a73d43',
    },
    PLSH: {
      uuid: 'aec7cdbd-8438-498a-9a31-2fed33a0006c',
    },
    BRIC: {
      uuid: '781442e4-4542-4b88-93ff-46a0f2589c0b',
    },
    MGRU: {
      uuid: '999b76b9-91a5-4318-bb56-9d37ca4d1982',
    },
    CHRP: {
      uuid: '1e6c6844-6c18-4789-921e-b4b3c4d13537',
    },
    PLSP: {
      uuid: 'bbed817a-cfa7-40de-b774-54fbdf2df7a9',
    },
    FOWK: {
      uuid: '7f28e062-ad93-48d2-a0bf-05e77bdb544c',
    },
    WODA: {
      uuid: '2aa019df-317d-4431-bc3c-1c6f22468c86',
    },
    PLSO: {
      uuid: '0b8b01e5-41e2-4782-bc88-46a952bef984',
    },
    MGRQ: {
      uuid: '40d9e3e8-73fd-481c-a27e-cceca10b3409',
    },
    MGRR: {
      uuid: '48ca8adf-59f9-43c0-9c77-0acca6539bc9',
    },
    MGRS: {
      uuid: 'a8efaa23-ba65-4af5-9a5b-9bb77d873f0c',
    },
    PDEV: {
      uuid: 'b963958a-962a-4e69-b496-797656579ef9',
    },
    COAS: {
      uuid: '56868851-c5a7-48d4-a1d3-51782dfbad59',
    },
    HOSP: {
      uuid: '59964bfb-3d8e-4a63-9d18-31a7ca40d7ea',
    },
    DIST: {
      uuid: 'f3f01d40-5d84-4a7d-97a5-b62ca20719d7',
    },
    COAM: {
      uuid: 'b6c2e8d3-94a5-4f56-8bdc-ce5a91aad4cd',
    },
    COAL: {
      uuid: 'd3320cbe-f4bf-48ef-b5ff-5c4cd300d5a2',
    },
    VTSU: {
      uuid: '525ab460-4672-46e9-959c-8a2dfd87704d',
    },
    PSCO: {
      uuid: '6fb8d97d-ba6d-4949-a4c8-267d0751e11b',
    },
    PSCI: {
      uuid: '4a1a7e7b-bbd7-4afb-8a3b-ba09165bae7e',
    },
    FEER: {
      uuid: 'c6b01368-47f1-4817-b00e-c98d867a4286',
    },
    DRED: {
      uuid: 'b5da4487-1a3a-4fba-b4e2-45eb7bba9d27',
    },
    TATO: {
      uuid: '9c846ebf-5875-4e34-ad0b-d500e8e848a5',
    },
    COAC: {
      uuid: 'c448975b-de78-4c5a-a4b6-0b739c42900f',
    },
    COAB: {
      uuid: '0a84ba40-abe8-43f7-8a11-20aa03f5ff6f',
    },
    ORDR: {
      uuid: '1573d22e-2e13-48a4-900d-fae9730ea201',
    },
    CHSW: {
      uuid: '4b4e7aa8-31f4-41f4-aaa5-cc8534f10ff9',
    },
    OISK: {
      uuid: '7e6525a6-5b5d-4686-a4b5-90186277cc61',
    },
    MAIN: {
      uuid: 'f041fbe5-1cb5-4d36-b96b-775792fc24f7',
    },
    SIGN: {
      uuid: '489370c6-a98a-471d-bd0f-6c9841cf70e7',
    },
    OCGR: {
      uuid: '3b83f7a5-bb7a-4ff9-bcba-628653e69988',
    },
    DRES: {
      uuid: '97bee146-a38a-4b8c-9ece-6b14ef6615c8',
    },
    MAIT: {
      uuid: '5b1a3573-9c7c-4c63-a418-ab6866aa8dc5',
    },
    HOTL: {
      uuid: 'eb342300-28c4-4990-a345-c00a111bd23c',
    },
    INOG: {
      uuid: 'bf2390ad-1305-49cb-9fc7-8dca86c06961',
    },
    DELI: {
      uuid: 'f2bcdf34-c3cd-48e1-bac4-e87eaa9a87a6',
    },
    ASPW: {
      uuid: '8aee6535-7898-4c20-94d3-b1176a5b2152',
    },
    HORS: {
      uuid: 'ce7b6c8d-7855-4ca7-95b6-77a3e11daf34',
    },
    ORCH: {
      uuid: '1b3d90de-d9f5-4d57-9d76-c2808df936e5',
    },
    PLUM: {
      uuid: '48481247-7c7f-476b-9ed0-d429a399e811',
    },
    ASPK: {
      uuid: '9be74105-b397-4e76-b4d1-aecd22c42a61',
    },
    MAHD: {
      uuid: 'f25952f1-ef41-469b-ae94-89b8d9ef17e0',
    },
    ASPH: {
      uuid: 'a8274603-0809-4d39-8442-0a6e6fa5c062',
    },
    AUTH: {
      uuid: '6a9a7890-d6d8-4f06-b87c-e863eb976307',
    },
    SORT: {
      uuid: 'ce5a46ef-eb9f-4392-aaa3-d9f3741f6e64',
    },
    HOSE: {
      uuid: '3eb75196-7e91-4481-831d-ede60d20fd06',
    },
    ESCP: {
      uuid: '9838b3bd-0b42-4b80-abeb-77843247fc8b',
    },
    DGOP: {
      uuid: '6a7953a2-8347-40db-bded-85ea71285f8a',
    },
    DISK: {
      uuid: '03b5177e-25b0-4552-a4ab-8c67ec2345c1',
    },
    BAKE: {
      uuid: '892f5151-5f6a-4f97-9ddf-d67223dbc4c6',
    },
    THCO: {
      uuid: '7ee2980b-89d6-4dcc-8394-44cdd1c92de1',
    },
    LWYR: {
      uuid: 'fcdae434-d2a3-4eba-8c42-68c7a3bfb885',
    },
    ILLS: {
      uuid: 'f388a4f4-12d0-4691-8811-bee12c173cc0',
    },
    HEAL: {
      uuid: 'd3285b3e-af11-484c-8471-c3d5fd982790',
    },
    COCL: {
      uuid: '1e02bede-8eed-4d1e-a956-3f88c8fdc6cc',
    },
    BTPN: {
      uuid: '57b76cee-7adf-4885-991c-21ccfaacaec4',
    },
    AMEG: {
      uuid: '0857f13a-a5a7-4c7d-8e6a-ece7092f8042',
    },
    HEAT: {
      uuid: '11196a82-a2d6-4576-917f-ba09cd555e39',
    },
    TLLI: {
      uuid: 'ba88e716-f637-4854-bfd4-4c905bfce097',
    },
    HEAV: {
      uuid: 'f1c5d00d-d833-4e4b-bfad-0eab342fe96c',
    },
    DIVE: {
      uuid: '72187dec-01f4-456b-9f0e-18533ebd936b',
    },
    MESS: {
      uuid: 'f1e41df9-946e-461d-9519-cbac0d24d9b4',
    },
    FIPL: {
      uuid: 'f18968bf-12de-44c8-9906-414b7dee0ff4',
    },
    QCCK: {
      uuid: '181421d6-3b78-42ee-afa7-fe5efd2778b5',
    },
    SIGW: {
      uuid: 'f9f8a123-ff20-49a0-8be3-8a5b46a7eac9',
    },
    MTOL: {
      uuid: 'f51bcb50-9ca5-4d37-9c09-65efb07ed544',
    },
    BCPM: {
      uuid: 'b1dfb841-d162-4368-904b-7f66915a3cb6',
    },
    MTOM: {
      uuid: '48e5d047-3675-4c10-938b-ba08d8227012',
    },
    CHWO: {
      uuid: 'eb8fb7c2-030e-4826-8c45-d3a6de342de2',
    },
    INOP: {
      uuid: 'ae468ff6-3d31-4af7-96d0-42fe9fa897ef',
    },
    FINO: {
      uuid: 'ad847eeb-86bd-4bfe-a7c0-5be21b6d28f9',
    },
    CODR: {
      uuid: '6ce86cec-bfcd-4584-a849-40d583a49ad4',
    },
    RUBB: {
      uuid: '21a66ee3-4d2e-4fb7-8926-68cac5574da6',
    },
    INOT: {
      uuid: '8601f261-38f2-4de1-a928-cf126dd962de',
    },
    NUNS: {
      uuid: 'f5e08e2b-2e74-463f-8519-b9561c2f16d3',
    },
    PHOF: {
      uuid: '838c4c41-d670-4f2e-a938-de6244ead067',
    },
    MRKT: {
      uuid: 'ab86d0bc-d9ad-443d-90a9-a179bc169bf1',
    },
    HOTW: {
      uuid: '24410f95-099e-4aa7-9b00-116927219d13',
    },
    CODL: {
      uuid: '1b740d8d-80f9-44ab-bf12-1941dae2ab4b',
    },
    MTOP: {
      uuid: '0ea93df8-4839-44ad-92cd-7b54a41ba326',
    },
    KNIT: {
      uuid: 'cfa63656-f876-4b16-ba5b-b863b4a2b7bb',
    },
    BRMM: {
      uuid: '5ab6d844-1555-44b4-9190-8099dc736378',
    },
    LDSM: {
      uuid: '8c44b11e-fae3-453b-88df-461bf188fbf4',
    },
    TRWN: {
      uuid: 'eb3fe81a-5a56-4e43-ad80-22857d7254c5',
    },
    DEMW: {
      uuid: '164c80e9-b493-45e6-a6d6-6efabea28350',
    },
    CBJT: {
      uuid: 'b933f7ff-36a8-498a-9948-6a622cf815ce',
    },
    PSDT: {
      uuid: 'c9e48ad2-1bd0-4737-8b91-04b0f8e3f02b',
    },
    LDSV: {
      uuid: '2fdf7d9c-cc91-4d69-b731-89ec128e1193',
    },
    OVNF: {
      uuid: '61e43568-196a-43bc-a205-dc132e1ba513',
    },
    OCHS: {
      uuid: '8c65fd86-794e-41d0-8382-fcae8148edcf',
    },
    MERS: {
      uuid: 'e81dedd7-f6e9-4963-818c-5c1fefad0441',
    },
    MTPC: {
      uuid: 'dc03e10b-7380-4754-b155-af470c0cce7e',
    },
    BAKM: {
      uuid: '663b937c-70f6-436a-bfd6-471f3bd50228',
    },
    LOKK: {
      uuid: '9e3c873f-7102-4e0c-8334-d427f40c41e0',
    },
    MTRR: {
      uuid: '3af895b6-89f7-45af-82b6-ea1479297135',
    },
    ADVM: {
      uuid: 'fc3b0f41-8188-45ed-8fad-497be9e156f2',
    },
    MTRN: {
      uuid: '87990fcb-7638-49f1-937f-73c713670768',
    },
    VARN: {
      uuid: 'd5e5b977-3498-4a37-b03b-710049cee2e2',
    },
    ASSR: {
      uuid: '80e77c6a-310e-4e5c-8730-14c9cc10829e',
    },
    SECG: {
      uuid: '2284df42-5261-4be8-9e52-1840e2af7add',
    },
    BTRM: {
      uuid: '82d3d2fd-8ffc-4c07-b47d-f876ccf7dda0',
    },
    INSE: {
      uuid: 'd747cc46-ca84-41a5-be66-5b5079b3ee44',
    },
    PHRM: {
      uuid: '5d522d60-c773-46b3-979d-f3b7ca3b6d4c',
    },
    FIRE: {
      uuid: 'ec30da91-93c9-4597-8199-086a396b96bf',
    },
    SECB: {
      uuid: '9613594b-58d9-46bd-95cc-0fa346fcceca',
    },
    DENT: {
      uuid: 'ab923821-089b-4df6-88fb-ba7735596d26',
    },
    DRIV: {
      uuid: '5343029a-6cfd-4cc9-b484-294b1fd9509e',
    },
    OGST: {
      uuid: '2fbe4105-0ce8-415b-87df-43141f9f7828',
    },
    INSM: {
      uuid: '145fd02c-be99-498b-b113-c4045b90ef6b',
    },
    QCEN: {
      uuid: '547e9c72-0b35-4554-a74e-c667fb47f4c8',
    },
    DENM: {
      uuid: 'cbac7084-8f0a-4300-99c2-b960e0757f00',
    },
    BANK: {
      uuid: 'b49cfb44-16eb-46ac-bced-8dd234194170',
    },
    MPIL: {
      uuid: '4b764beb-0f85-4503-85cb-50687bf5e903',
    },
    FIPO: {
      uuid: 'bef1ddce-fb0e-45de-921e-1a42b0a0f8e3',
    },
    METC: {
      uuid: '7a5e6372-cd70-40e2-92c8-5f2bed1d27bf',
    },
    CBMD: {
      uuid: 'be26f35b-9cba-4162-a288-43cc0a5a5a3e',
    },
    OPCN: {
      uuid: 'b0507495-ca44-42c6-9e36-42f3574981bc',
    },
    EDIT: {
      uuid: '894903c6-d641-4ad4-b054-2a5f648b27d3',
    },
    CURT: {
      uuid: 'ee2a83ce-b972-421f-8347-6dd2265cceb2',
    },
    BNGO: {
      uuid: '26094714-ab1a-4b17-9e0a-8ea2dd586fea',
    },
    PBEA: {
      uuid: '515bfae6-e33a-49f2-bfa5-b42f4e582c1d',
    },
    BLCK: {
      uuid: '40e27fe8-3c59-466e-8864-ed1f4c5edb34',
    },
    BEVE: {
      uuid: '1fb68e88-2796-43da-9d2c-3746de97e2dd',
    },
    ASTR: {
      uuid: 'e97d4b85-df37-4635-9a53-4cd198646914',
    },
    RNWC: {
      uuid: '049a4ab9-11d2-446c-8974-28ea35c52d01',
    },
    MNEN: {
      uuid: 'e9523b3d-299a-42be-a5e7-862dd9f1463b',
    },
    METF: {
      uuid: 'b684fe98-3e7b-4db2-849e-d16e9614d21e',
    },
    ASTP: {
      uuid: 'f85256b1-ca26-4c01-97ce-162c21e4fad0',
    },
    BNGH: {
      uuid: '76fadaea-14b2-45b6-9536-7ae992c93bba',
    },
    COFF: {
      uuid: '3bb3b4a2-b8b2-4d53-837e-8610d38ffd79',
    },
    ASTO: {
      uuid: '865a4458-a738-4f37-a988-2b184e2523a4',
    },
    GYMM: {
      uuid: 'a7fdfddc-16ba-44d8-a8e9-e544fd562299',
    },
    BNGC: {
      uuid: 'c5cc2f2e-526e-495d-ac0c-b4147709c0a6',
    },
    DCKR: {
      uuid: 'f16d3a83-29b8-4f2b-8b8e-38c843e0bb0b',
    },
    TAXI: {
      uuid: '956fc46a-f395-4024-b92d-3426dc1957af',
    },
    ASTE: {
      uuid: 'b4b0c306-5d92-4636-8475-ee45c645b2da',
    },
    TAXD: {
      uuid: '09b11bfc-ed4b-4a11-9681-98b04f37f68b',
    },
    DGSP: {
      uuid: 'd81bb4f9-73a2-44cf-bbef-82d7ae7bc9cf',
    },
    PLYW: {
      uuid: '4aff7b9a-ceee-4c61-b449-15c9563a659f',
    },
    FISP: {
      uuid: 'fcb2b7d1-207a-45a3-bb6d-7acac1efe57a',
    },
    CBNM: {
      uuid: '0a951929-2b5a-4688-88fd-22db879edc87',
    },
    WDWS: {
      uuid: '1b206bdf-3538-48fc-8907-c51f42e0c9c6',
    },
    INTV: {
      uuid: 'f000cdef-3714-41ef-b85d-301dd94a02bf',
    },
    SILV: {
      uuid: '5464e8cf-1b69-43c6-93c9-cd44818cbd81',
    },
    JIGL: {
      uuid: 'a5e48670-a4cf-4200-bc74-629368b890c8',
    },
    FISW: {
      uuid: 'f6ca33c4-8d37-478b-be62-92481c80a694',
    },
    NUSY: {
      uuid: 'c0423157-9959-4eff-8c37-295c2dbb0e73',
    },
    CUST: {
      uuid: '73154b5d-201b-4abe-adab-275ffb0e13aa',
    },
    FACT: {
      uuid: '467f85f6-2b5c-47c7-8d46-70b170beb2d4',
    },
    PUMP: {
      uuid: '0647fb7e-1864-4b32-b94f-f67d763306cd',
    },
    MTTX: {
      uuid: 'd126b5b5-b7f4-419a-94e8-d5023cb29e32',
    },
    WMIN: {
      uuid: 'bc9b5ddf-766e-4908-86c0-28b33f821859',
    },
    SCAF: {
      uuid: '169442de-a3c0-48ed-8074-d8bf91ef8987',
    },
    FREM: {
      uuid: '2bd1877e-cb44-419d-a9cd-b5897d27057c',
    },
    TLPH: {
      uuid: 'dd2eed3c-b952-49ed-8382-a6ca3737dcb0',
    },
    STBR: {
      uuid: 'e11fbeb1-14cc-41e8-8c73-1b9e130df4b4',
    },
    FITH: {
      uuid: '72dabc1b-0243-4538-bd79-a3e490b74c28',
    },
    CUSH: {
      uuid: '8824197e-28bb-44fa-a2e6-9001c3ec79a0',
    },
    DNCR: {
      uuid: 'fa6b985d-d25a-492b-80b9-4ddab0338f9e',
    },
    FRET: {
      uuid: 'af421f6b-8a3f-49e5-a620-c9b96f7a3073',
    },
    SCAN: {
      uuid: '84dcaaa6-c627-4e12-9e4f-7b431ba42651',
    },
    JORS: {
      uuid: '4cd51792-cf35-4663-9955-27fc9a145238',
    },
    INST: {
      uuid: '5d4fdfff-e9bd-4c2d-9f44-a2ce4e742684',
    },
    WSTE: {
      uuid: '719b2790-ecdd-4ff6-9b42-8d65621cd450',
    },
    INSS: {
      uuid: 'df225bec-1289-4768-a1a5-564b48be0dcc',
    },
    BLER: {
      uuid: '70aab933-2be4-4c31-9b96-894a3d770a4b',
    },
    ADYM: {
      uuid: 'ea9ab151-564a-4b61-9422-19cd0e51b246',
    },
    MANC: {
      uuid: '3d401416-81c7-455a-b7a9-29cc2fa4b047',
    },
    CSPU: {
      uuid: 'dd11ec18-be9f-4149-962b-e367d95a14df',
    },
    FABR: {
      uuid: '4cfd287c-48da-4af0-acaf-6b24dfe6d35e',
    },
    CMDN: {
      uuid: 'a7d42099-18a0-4792-98d4-4d4deb3e1d44',
    },
    NURS: {
      uuid: '3a857f5a-2f8d-45e6-b143-51c083f3dda7',
    },
    PHSC: {
      uuid: '6301d683-5ab1-471b-9c10-783c3017fa73',
    },
    PHSO: {
      uuid: 'efab76e1-32a8-445d-ba1a-09e7cc779e52',
    },
    STAT: {
      uuid: '45e2fa63-0cf8-42c3-8a4d-b901ae31d7c6',
    },
    MTTC: {
      uuid: '8f715838-1de7-44df-b147-4b1d84525738',
    },
    FISB: {
      uuid: '3e8360c2-35f5-4138-b90b-ac043558acca',
    },
    FISC: {
      uuid: 'b796a9e1-6fbd-4228-9ad7-4aa3e4bc5a5b',
    },
    CUTM: {
      uuid: '53730fec-0b6d-441e-a0bc-61c4a788432e',
    },
    FISD: {
      uuid: '0291c02c-4d1b-493b-94af-d21520d9e7af',
    },
    FISF: {
      uuid: '520158e3-ecae-4d68-90d5-c272b9eb6b2d',
    },
    FISG: {
      uuid: 'cd07c5ef-f3b5-4196-97e3-7088c050fec6',
    },
    FISH: {
      uuid: '19040814-6ddd-4eb9-8eb3-6296b90a8994',
    },
    GSCO: {
      uuid: '38b808af-26ca-4a5a-a691-8812d876a15b',
    },
    DAIR: {
      uuid: '5e5d9444-453a-4d36-a3b8-59d7bf83ebcb',
    },
    PHSY: {
      uuid: 'a34fa20c-fd25-413d-84d3-959acee3abbd',
    },
    WSTL: {
      uuid: '8a87fc83-aabb-4ebc-b232-ed470c3e0572',
    },
    TNST: {
      uuid: 'f5add43c-ce34-4c7d-923e-8993244d595b',
    },
    PSIA: {
      uuid: '621ee828-a9a7-46d8-b0e7-de6166503884',
    },
    SILO: {
      uuid: '9d687813-7aed-414c-a824-3194c1086996',
    },
    FISO: {
      uuid: '6f86e428-a306-44ea-b95d-3caf6de0db7e',
    },
    JOUR: {
      uuid: '1a0fc2e5-f54f-4776-90f5-7a9bce127400',
    },
    STDE: {
      uuid: '0b436ef5-bd0d-4be4-a752-31ee47505ace',
    },
    LICM: {
      uuid: '380955fa-7ffc-4dd8-9757-147682499136',
    },
    WOOD: {
      uuid: 'cfb31e9f-bf59-49e6-a973-37ed2e88e7ee',
    },
    AICV: {
      uuid: '31af72db-be14-4494-b89e-0a6c6942cf45',
    },
    RSER: {
      uuid: '7a534743-7133-4f1a-8ad2-8efda347bab2',
    },
    AICO: {
      uuid: '05ea44a8-6c83-4a62-8cdd-a289d2769b9e',
    },
    STDN: {
      uuid: '0473d7fe-67f8-43c6-8dc2-0e52df9f3dbd',
    },
    DRMN: {
      uuid: 'b766ec98-d1a1-48a6-83f1-a88643628977',
    },
    HTEL: {
      uuid: 'a6347847-d157-4faa-af5e-fee0f8f733f3',
    },
    WICL: {
      uuid: '732300d4-9a7f-4065-ba27-a968a11e1674',
    },
    DRMT: {
      uuid: 'cc95d8f8-2f0e-4ea4-85c8-ff1744789361',
    },
    HTEM: {
      uuid: '9409ce09-8c22-4b32-bb25-9e0ac942b424',
    },
    COIF: {
      uuid: '7de098d4-b3a9-487c-b8ff-db687c597f3d',
    },
    ASWM: {
      uuid: '5ba4a2bf-1762-4230-a51f-d38d839683e5',
    },
    BAPR: {
      uuid: 'a60e1e2a-1941-4ae9-b9a3-b5a578786fc4',
    },
    BARR: {
      uuid: 'da0d3398-426a-4695-b2d4-a21896ad4b34',
    },
    BARP: {
      uuid: '15bfd710-22d5-4149-95ac-b6780f618d8b',
    },
    FITT: {
      uuid: '8920f177-9145-4d09-8380-a728bf452c6c',
    },
    BARM: {
      uuid: 'e4ca1d4a-913d-418d-9834-e2428f444709',
    },
    BARN: {
      uuid: '98f9ca9b-0d9b-4e75-910d-60a45e1b4ea8',
    },
    GUID: {
      uuid: 'e65933a8-126d-456f-8c8a-c3f028032472',
    },
    SING: {
      uuid: 'aa4ef376-4a88-45c4-99cf-158ccd0d29d7',
    },
    BLGS: {
      uuid: 'ae62f10f-1ece-4d11-bff4-8ebf45eaf492',
    },
    BARG: {
      uuid: 'feb861c2-6576-486f-a855-d8caa50772c5',
    },
    STCN: {
      uuid: '9aef2964-7f8e-492d-8bee-6836bca46644',
    },
    BNKS: {
      uuid: '66075bad-a890-49d2-815b-ea06dca33ef7',
    },
    PDMG: {
      uuid: 'a793e266-8f72-4222-a6db-bfceafd694f0',
    },
    STCL: {
      uuid: '6f6ef87a-760e-4acb-a095-6d08883e6d88',
    },
    LIBR: {
      uuid: '0d2113f2-cb08-4b7c-a8ff-bab9dd30975e',
    },
    STCK: {
      uuid: '1b374eaf-80f8-46bc-aabc-e70c83ab50df',
    },
    MAPO: {
      uuid: '8a97cefb-e1da-4207-b3a4-39ec2f272f1d',
    },
    DRLO: {
      uuid: '9a2ef67d-8115-4d2d-beb0-4eb8cc052f19',
    },
    BARB: {
      uuid: 'c8657dfa-e66f-44b4-adad-b6cfe674dbf2',
    },
    CSRO: {
      uuid: 'c5ab37dd-2890-418c-93f4-340e86241a62',
    },
    STCV: {
      uuid: 'a1bf1106-8dd6-49be-b059-2a71c6c74629',
    },
    DRLS: {
      uuid: '4762e158-a5d2-40b3-8319-7e5c02d606ae',
    },
    STCR: {
      uuid: 'f76f0805-465d-4e89-bd3c-a69a55d7a43b',
    },
    RLWY: {
      uuid: '98bd0da0-0fd9-4373-aa81-53841218c3f1',
    },
    JGGL: {
      uuid: 'f4227a5f-9d5b-4911-88d5-91553dc02bf7',
    },
    STFE: {
      uuid: 'acf4c554-9d17-4de9-9f64-2e567b8972b2',
    },
    EMBA: {
      uuid: '178270a2-979f-4e67-b81d-93704f756cf5',
    },
    BASM: {
      uuid: '988e750b-2404-4c90-bb73-6b3a11d3a153',
    },
    FNAC: {
      uuid: '13850629-d5be-4fa0-b2a5-ec506bb55847',
    },
    POET: {
      uuid: '54fb13c0-46b0-4756-b2b2-eb64c642c636',
    },
    MASS: {
      uuid: '495d4fcb-ba57-4bce-ad3b-f785de05d669',
    },
    BARW: {
      uuid: 'c2228a58-a5e1-4281-ab27-5ada3dace243',
    },
    NSTN: {
      uuid: '4af00b0c-f065-414a-b968-73b9fddb351e',
    },
    PBLS: {
      uuid: '1c602eb9-f4f1-4dd7-a7cc-d9f2c908a140',
    },
    BART: {
      uuid: 'bc15e95d-eaf6-42b1-a597-dff8713266df',
    },
    SCEN: {
      uuid: 'afe9430b-3c92-4f52-9c4c-ac49883786d6',
    },
    PODI: {
      uuid: '20119e4f-2db9-4aaf-b6ca-85b7fc4da53b',
    },
    BATR: {
      uuid: 'ecc22b91-93f5-4dd1-945c-978ec2268c3a',
    },
    LOPS: {
      uuid: 'f2cf7413-412d-4ed9-a695-0e37f8d8db52',
    },
    RFLX: {
      uuid: '8a57c4ca-4f36-4fa6-8479-6191b105b419',
    },
    STEE: {
      uuid: '897aabb5-1978-4e1c-b6e7-1bd4c80035fe',
    },
    RDIF: {
      uuid: 'fabf152b-882d-43ab-8f64-157fffebb034',
    },
    COLU: {
      uuid: 'f60e4d2a-4ed6-4b4a-91ae-44ac0f5a107d',
    },
    STEP: {
      uuid: 'e5e1461d-e628-49cd-902c-16c08bf00859',
    },
    GWOK: {
      uuid: '69271c37-b5bb-4b1e-9a48-197e27813571',
    },
    MARK: {
      uuid: '3b40b2ca-d3e7-404c-b367-6c8db76df0e7',
    },
    MRTC: {
      uuid: '1ddcb9f5-3fdb-4f9f-afea-f09e7af56a77',
    },
    CSTR: {
      uuid: '57cf7b56-91e3-4fd7-b149-f061b1abd05d',
    },
    STEW: {
      uuid: '2521bd31-c2b5-4a27-b6c1-8b3ed9f42a6c',
    },
    OLAT: {
      uuid: 'ad920d7c-c944-489f-9d3c-8835452821c4',
    },
    FAGA: {
      uuid: '32cf2d9c-5d9a-4df5-ba85-663091c25ad5',
    },
    MNLG: {
      uuid: '4fccb070-5478-4093-a59a-36f09a9b2832',
    },
    WIDD: {
      uuid: 'ef97867d-ff4f-44e6-8b9c-1003a07271a2',
    },
    GLZR: {
      uuid: 'ba80a7ce-fe46-4c6a-92c7-56adf71b3ead',
    },
    EDPO: {
      uuid: 'c5387cc4-a3dc-4cb9-bc81-2050d089ca83',
    },
    CSTE: {
      uuid: '159a7c12-e12f-46a0-bc7f-a31589b90cfd',
    },
    RDIO: {
      uuid: '1d486762-a82c-45c0-ac13-33ba4cee5bd1',
    },
    STHN: {
      uuid: 'c38d1f4d-fc08-4560-a223-495bb0d0f1b1',
    },
    HIST: {
      uuid: 'cb19e4d4-9aad-4113-b76d-73873090c264',
    },
    ROAD: {
      uuid: '5d370dda-9a51-4d62-8e88-bca33be77cd2',
    },
    FAIT: {
      uuid: '4915ab3f-daa8-4cd6-b617-b81b0dfa1dfd',
    },
    ROAS: {
      uuid: 'ecab747a-d862-496c-ad78-c98c2275c5c4',
    },
    COMU: {
      uuid: '35db6843-4afd-4151-8506-a917453c87b6',
    },
    COMS: {
      uuid: '72bc9e07-c64a-4cf7-8697-8ae255136e8f',
    },
    ROAM: {
      uuid: '49a15af4-6ae0-42e2-a036-c393da2d7567',
    },
    POGR: {
      uuid: '14dba749-23a3-434f-a019-97bf6246db89',
    },
    WIGM: {
      uuid: 'd597ebdc-de1b-4375-a0d4-42540c4bf5a7',
    },
    COMO: {
      uuid: '5417a699-4796-4f9a-8c64-aee42c768a14',
    },
    OPMC: {
      uuid: 'ba030610-cf31-419f-9877-d94721c8a48e',
    },
    COMM: {
      uuid: '741ac894-df9b-4fa9-a3f8-a54044463297',
    },
    ROAW: {
      uuid: '35a54df2-8aaf-418d-a227-f74fc513b3e7',
    },
    ROAT: {
      uuid: 'e66373ef-bee4-4dd4-bb69-0b7ee951b2b1',
    },
    NSVC: {
      uuid: '8acccdb7-653d-44c8-88ce-7ccf93381899',
    },
    FNCT: {
      uuid: 'bf6551b7-cd34-42d4-a902-47a808aa73d7',
    },
    COMD: {
      uuid: '4a6f8f25-f7a3-44da-8129-9644fd5a0293',
    },
    MLIN: {
      uuid: 'c8b043fe-dfee-453e-a93f-58e3e16b1c71',
    },
    MATC: {
      uuid: '1a3250d5-9d71-4e3f-9658-d3db67b9e4d8',
    },
    WORD: {
      uuid: '2ab92ca4-594f-4f3d-8432-9bfc9a9aa2e0',
    },
    PURS: {
      uuid: 'b451d164-d250-4d32-8a69-344afa7c7c6c',
    },
    HGNS: {
      uuid: 'a36828cf-bc5d-4783-a230-ef86b8ce8765',
    },
    LIFT: {
      uuid: '4c139fa4-8d24-4246-a9ac-009998f093ef',
    },
    CONW: {
      uuid: 'a0e8409c-ae0f-4407-8aa1-65c1b6ba077a',
    },
    FTNK: {
      uuid: '87a36568-f3cc-4e6e-9b62-99605262d0fd',
    },
    MATH: {
      uuid: 'ecc5e625-5a55-4aab-9a44-77b7e332bf13',
    },
    ONGP: {
      uuid: 'e4c4ebfa-a901-48e7-b8aa-27e6102da1a4',
    },
    CONT: {
      uuid: '7aa7eafb-c453-4405-92a2-60169be0879b',
    },
    DRPP: {
      uuid: 'f51cc56a-b0ab-4100-b8b9-98373c8b9397',
    },
    CONS: {
      uuid: '7f318446-cb2a-45fb-8692-1465f466d90e',
    },
    CONR: {
      uuid: '7fe4d905-f97d-4c7b-88dd-92ed1840b012',
    },
    GSIN: {
      uuid: 'ec9c3125-5063-4739-b471-fac21ebb8eb1',
    },
    DTTV: {
      uuid: 'cb7a1b67-a419-4dcc-9f6e-4e4a3fb2210e',
    },
    CONO: {
      uuid: '7b22c6f1-99e7-4e74-947e-0338255417ea',
    },
    THMN: {
      uuid: '08f99a86-7813-4b92-b2b3-1d5f79f519e5',
    },
    BRWR: {
      uuid: '59f5b842-1f4e-47a3-97c8-2fc5daced5c0',
    },
    KNTH: {
      uuid: 'b443c5a8-fc8a-4b91-858e-e750189ab40a',
    },
    CONM: {
      uuid: '82ff7313-9cbf-4dd3-a199-5d7d364c8d83',
    },
    CONL: {
      uuid: '2358a9e1-529b-4ba0-80bf-a478b3e517f7',
    },
    SCFF: {
      uuid: '0b7ad9cd-1109-4072-85d9-f241fa0ad032',
    },
    PHYS: {
      uuid: 'a24acfe1-556c-4d2a-a4cb-4fd478ce96f7',
    },
    HVLS: {
      uuid: '23174e94-35c7-44f0-8b0e-f3fecb62b68b',
    },
    CONI: {
      uuid: 'da026656-2231-4412-a952-ad1589aaf377',
    },
    WORK: {
      uuid: '8eb7418c-4b82-429d-833e-c1f69148d0d2',
    },
    TUGB: {
      uuid: '537c0b29-c546-4682-b246-d417d3906f19',
    },
    STHD: {
      uuid: 'affb3b5e-9c41-424f-8fc9-c287f165d88a',
    },
    CONE: {
      uuid: 'fa4f3df7-71f1-4e1f-871f-ecebae6a381d',
    },
    COND: {
      uuid: '81f6e056-9bc4-49be-aea1-2c1179579a34',
    },
    LIGH: {
      uuid: '26653189-24d1-4623-9f54-ad7236e57cb8',
    },
    CONC: {
      uuid: '9fe19a56-ef02-417a-8611-efa7f47c5360',
    },
    SEMA: {
      uuid: '2a1bf2c3-24b1-42c2-a830-b2dc36f7f94d',
    },
    DTWH: {
      uuid: '790b2d74-5073-4c9c-a5d0-73a3ca6144ef',
    },
    DCUT: {
      uuid: '59ae54b0-8cfd-4d26-8fef-6dadd15ef76a',
    },
    ROCM: {
      uuid: 'a0968dd7-c029-45b0-8e55-88785b756530',
    },
    RFRE: {
      uuid: '6a0ad460-7c5f-4dc2-b305-3940db2fb280',
    },
    LEAI: {
      uuid: 'e7b6cb96-51a2-4447-a86c-24745f026946',
    },
    RSKM: {
      uuid: 'e5c78ef9-77c3-4494-afa1-c36ab3dd313c',
    },
    LEAS: {
      uuid: '82cfa566-b62e-4535-9987-9fa3e15235a6',
    },
    CICS: {
      uuid: '6fe7e085-b36e-4c9f-b720-bbbd1919a1f5',
    },
    SCIE: {
      uuid: 'e05fed97-74e7-402a-94f8-b77441193ce9',
    },
    TSER: {
      uuid: '355f50c6-4464-4f57-bb6a-dde25a883e71',
    },
    FRMN: {
      uuid: '8ce8b50d-c168-4398-a33c-7e8cfa3bb12f',
    },
    TSEN: {
      uuid: '3f843387-301e-4ac1-909d-49331d958134',
    },
    SCIO: {
      uuid: 'd354aa2a-b16b-4509-98ee-96c10d9cfa23',
    },
    AGEN: {
      uuid: '250a5043-ced1-47c7-9e2c-b64c55b8aa39',
    },
    COOP: {
      uuid: '43505bbc-3563-4420-aaff-c6a16d217d25',
    },
    GODO: {
      uuid: 'b58ac7e2-04e2-4c89-a4c8-12f76a260baa',
    },
    COOK: {
      uuid: '30634aa7-964f-4f36-85fc-d493aad8cf72',
    },
    RODE: {
      uuid: '2b3b5d9e-e712-4a94-98eb-03faea2650a5',
    },
    FLAS: {
      uuid: '7860ffc1-e0be-42bb-9063-6c94732a452b',
    },
    CSWK: {
      uuid: '89041a5b-0743-46cc-a47d-e24fcc5cd66f',
    },
    THPW: {
      uuid: '1bde9e9d-9cb7-433e-8f9e-d83e2d89c6c8',
    },
    FCPO: {
      uuid: '7de1f9e5-ddf8-4788-a48e-e1332340951f',
    },
    DRTD: {
      uuid: '048adc04-132c-47cb-8d0b-ab77825c385c',
    },
    STKB: {
      uuid: 'b467a305-08a9-4a45-ba2e-ac1e1196bc69',
    },
    TYRE: {
      uuid: '89a76447-e562-4974-a528-b4e045aea5fd',
    },
    SREG: {
      uuid: 'e0c387b7-ec56-4998-b8e6-09499db49c73',
    },
    OCTH: {
      uuid: '369a6e41-4fa4-43ae-b35d-af23a5f2ebd3',
    },
    TYPT: {
      uuid: '60512253-0980-46f2-98fd-65e70fec7ce3',
    },
    STIP: {
      uuid: 'd752428a-93df-4522-99cc-e05e1054f385',
    },
    DPNR: {
      uuid: 'ec922dad-1da9-4505-9738-4612be084aae',
    },
    COPR: {
      uuid: 'efaf9b4c-b252-4d30-9d68-1fe3abf3b25a',
    },
    AGFO: {
      uuid: '757fced6-ad86-4457-bdbb-ee40ca21a246',
    },
    BLMO: {
      uuid: '2f0c0ece-4583-4ffb-9b7e-455a066461ad',
    },
    GOCO: {
      uuid: 'd296846f-37b2-4a7b-9ea0-a87ece0cceba',
    },
    SPAT: {
      uuid: 'b54dee53-691b-4633-8dcb-12c5648d2cb4',
    },
    FCON: {
      uuid: 'a98d20ab-f9f3-472f-8631-dbe23afea9f2',
    },
    SVPT: {
      uuid: '75e76be6-d104-4591-9938-2a7da5982298',
    },
    BLOC: {
      uuid: '5bd0a112-3738-47a0-9acf-7baed927d009',
    },
    SVPS: {
      uuid: '6ba644f6-f508-41da-88a5-83fe2ba839b6',
    },
    FTSH: {
      uuid: '51ce19ee-0c5b-4758-a2ae-07ce799c88c3',
    },
    EMHC: {
      uuid: '8b10cb03-fe7b-4806-919f-2efd6c184530',
    },
    CORB: {
      uuid: 'a5585c91-c85b-48df-8ae8-da01e55892a6',
    },
    AMTC: {
      uuid: '4c3ade85-e327-45a6-bdf8-22e2f0807243',
    },
    ESTM: {
      uuid: 'db7fa95d-8b73-48a2-804d-80074b4da1d0',
    },
    ESTO: {
      uuid: '0d2e9adf-6142-4274-89a6-7eee4c305f72',
    },
    FROP: {
      uuid: '96aeac46-e237-46b8-a9e5-f58a52f323fd',
    },
    EMHM: {
      uuid: '26cfa83c-2bc7-4f56-9c23-22a8249e139c',
    },
    ESTT: {
      uuid: '0a6f784c-3100-43e1-8363-ea1ef41f765c',
    },
    MAYR: {
      uuid: 'ae151ee2-ddd8-4459-b365-66db27686316',
    },
    SPDO: {
      uuid: '90583714-3e04-4152-91c0-6a2961179158',
    },
    FLCN: {
      uuid: 'c618257e-9a6e-4ed8-a3e1-1b4e5ff1d02c',
    },
    DRVD: {
      uuid: 'd38903d3-cd70-40b1-9c4c-ff026e62bce0',
    },
    STMG: {
      uuid: '641b1680-8f42-4b00-b36d-5ef6116a485e',
    },
    DPRD: {
      uuid: '7e041af9-a0ca-47e2-8f1d-6bfbb4527353',
    },
    STKP: {
      uuid: 'e1fef94b-6ecc-460e-9896-b71155403c14',
    },
    SRGN: {
      uuid: 'a2c23092-2aa5-4bb2-83c8-b5333d1a85b7',
    },
    FRNC: {
      uuid: '98122d40-9b72-46f4-a72e-59b4f2f21568',
    },
    COSE: {
      uuid: '1a70ee22-0833-4eb8-82d7-273c7fef73b1',
    },
    WEBC: {
      uuid: '8b1763c9-0676-41ea-b348-5f392a163d23',
    },
    WEAV: {
      uuid: '6216afb9-ad92-4ca1-b34f-132ae7a6a3c0',
    },
    SAFE: {
      uuid: '6ecc5c42-6cf2-4e00-a032-75ee70ede3c9',
    },
    CMNT: {
      uuid: '3bc36657-3fd7-4da3-a555-b157f7a27b3f',
    },
    SPCO: {
      uuid: 'f54a4da4-c6a6-44b7-9f05-fb4a3421b2ec',
    },
    FAMA: {
      uuid: '383abc97-8a74-4fd4-99b8-b097c1c792e5',
    },
    CORT: {
      uuid: '0708fb84-e98d-444d-8c09-1c6d46ff5faa',
    },
    SAFO: {
      uuid: '42339d0b-672b-456f-8232-df1a3e73d1a0',
    },
    ORTH: {
      uuid: '366282a2-e563-49a6-a534-c1f9c7de74f9',
    },
    WEBO: {
      uuid: '1a0d7cdd-f1c0-4cf3-a23a-1eac992b580c',
    },
    AILO: {
      uuid: '1f8f9389-c121-4f8d-bfcb-d32101a6610f',
    },
    RDOP: {
      uuid: '49a42268-6109-4f3f-ae3f-f599e0179b49',
    },
    CORP: {
      uuid: '4d660214-b070-4275-b509-d4b6d1db4535',
    },
    CORO: {
      uuid: '392410ec-1de9-4754-8a78-139b1a74e3f9',
    },
    ORTD: {
      uuid: '48daaac9-aa1f-44c3-b6c0-1ef6d9632ae8',
    },
    WEBD: {
      uuid: '5838c18a-feab-41c2-829d-9ecfe32a30dc',
    },
    STLE: {
      uuid: 'a3548019-5344-4fc6-8970-63d505756525',
    },
    SGRW: {
      uuid: 'aeda02f8-6643-4fa3-8da8-21a30da9566a',
    },
    CMPE: {
      uuid: 'e67d3ccc-0c55-4018-a3ce-dec969e9f09c',
    },
    CMPC: {
      uuid: '78593b98-3004-4cf6-9dd4-0df1c41b57b8',
    },
    HAIR: {
      uuid: 'e8fc9614-18d2-46e2-b80b-be65198680fa',
    },
    THTC: {
      uuid: '0bb446a5-39c6-47f8-844a-65c90eeab025',
    },
    STNO: {
      uuid: 'e8f9c7f6-67a7-42e3-ad4a-26a6447953e9',
    },
    STNP: {
      uuid: '20c5cdae-75d0-4a78-bd96-af1e59e9ef2f',
    },
    NOTA: {
      uuid: 'f6e6ee3e-2bfb-40c2-96b4-1574c7faa43e',
    },
    HERB: {
      uuid: '80509ee2-5193-44d0-8c34-359f4d8aa630',
    },
    VLVE: {
      uuid: 'b49849aa-8489-496d-ae3e-fb77fa0beed7',
    },
    SPFT: {
      uuid: '3e7f05eb-6268-4d3a-b609-e0eb72aefc68',
    },
    TUND: {
      uuid: 'e216b3e2-aad9-4b5f-af12-f69e2a659c31',
    },
    AIMS: {
      uuid: '41871b14-d410-4ca6-9943-36c59176dc71',
    },
    TUNC: {
      uuid: 'ec258aca-fca6-426e-b3c5-e813ce460392',
    },
    STOC: {
      uuid: '4b72de65-3712-4374-8651-dd0e87ac57c9',
    },
    TFPO: {
      uuid: '97875143-b70c-49ae-90e1-c0fb1b34b21a',
    },
    SAIL: {
      uuid: '77d05ece-a577-4748-87a9-17601e6dce35',
    },
    COSM: {
      uuid: '0452bd81-4957-4dca-8368-dab339b1eb87',
    },
    STOK: {
      uuid: '88f88cb9-356e-471c-98b9-8eaa051cb26d',
    },
    LINO: {
      uuid: '61edc354-4e71-42d0-82f8-f1eb407216da',
    },
    COSH: {
      uuid: '456c0e7b-e0f6-4bb8-b969-2d6c33104076',
    },
    LGHP: {
      uuid: '5806b298-be3f-44e5-9d8f-dfc30072f73a',
    },
    STMS: {
      uuid: '0573524a-984c-40ed-84dc-3529536690ee',
    },
    DPRI: {
      uuid: 'f05b5b85-adf0-4f4e-aecd-bf2895ab0ef1',
    },
    POLS: {
      uuid: '772b4e12-f29c-4472-88c3-5bb23a0f3ab8',
    },
    PSTR: {
      uuid: 'e6c61e1d-41f8-433c-8908-1e825eeca716',
    },
    LGHT: {
      uuid: '00306f4e-9bc8-4d80-98a7-0b2acc5e5762',
    },
    WEDC: {
      uuid: '77000266-7af0-4666-8afd-45902b2c5539',
    },
    VDED: {
      uuid: '19446b27-2bd4-4193-acad-6b9a7c12b5a9',
    },
    STMO: {
      uuid: 'e8ab4c14-d201-4346-ac56-6a5b9bf0377e',
    },
    POLM: {
      uuid: '0a4e9e30-a2ef-4c78-bca9-deae1cb0cc96',
    },
    FTTR: {
      uuid: '02c17208-fbc2-4733-a56a-d19a5e1e186e',
    },
    FCSC: {
      uuid: 'f3b6184b-cddd-4aa7-ac2d-74d9a8619269',
    },
    MNTH: {
      uuid: '4c4a9108-5aae-42de-875a-d57a9e812d9f',
    },
    MNTI: {
      uuid: '26be83bc-6d69-4cbc-8f3a-13e2192590d2',
    },
    WILW: {
      uuid: 'cc695ed8-ea91-422f-a3ab-81a636f4dd32',
    },
    COTR: {
      uuid: 'bdb0b89a-1420-45ed-a4eb-f77cde9dba3d',
    },
    CMPO: {
      uuid: 'c7c0b4e7-8752-45f3-ad6b-908bdca470e0',
    },
    SEPO: {
      uuid: 'b0009195-9dc9-4c0d-96dc-ca9e72c6e311',
    },
    FCSP: {
      uuid: '53920ad3-3f23-4e41-86ed-097085f90570',
    },
    DRWE: {
      uuid: '20dabf92-f26f-41fc-9eec-fa7e6406e815',
    },
    JACK: {
      uuid: 'fc9b0ff2-7151-4d8b-9db1-37849985f25a',
    },
    MNTM: {
      uuid: '1d033eef-2c44-4018-bc77-b59382a756f9',
    },
    GVRN: {
      uuid: '8279be1b-e445-4938-95a6-2afd3d4a8c57',
    },
  },
};

export const defaultMagnumBootStrap: TBootstrapAttributes[] = [
  {
    attribute: 'case.FormText',
    valueAsString: '',
  },
  {
    attribute: 'case.FormClass',
    valueAsString: 'd22a8012-3564-4f9b-a246-fcfc226050a2',
  },
  {
    attribute: 'case.TransactionCode',
    valueAsString: 'fc311ccb-8efe-40ae-8f25-1a59e1c0fa9b',
  },
  {
    attribute: 'case.TransactionType',
    valueAsString: 'bbcc253c-45fa-47c5-bcc7-24d65bdd44e8',
  },
  {
    attribute: 'case.ApplicationSignDate',
    valueAsString: '2023-07-08',
  },
  {
    attribute: 'case.PayorAnnualIncome',
    valueAsString: 1,
  },
  {
    attribute: 'case.ProposerSinglePremium',
    valueAsString: 1,
  },
  {
    attribute: 'case.ProposerRegularPremium',
    valueAsString: 1,
  },
  {
    attribute: 'case.PremiumPaymentMode',
    valueAsString: 'faeddbd7-ef5d-4bbb-9952-b4f8a9d76c3d',
  },
  {
    attribute: 'case.CorporateAgency',
    valueAsString: '16fee183-8a2c-4a0c-87f4-dc6ff69f9d6a',
  },
  {
    attribute: 'case.VIPAgent',
    valueAsString: '16fee183-8a2c-4a0c-87f4-dc6ff69f9d6a',
  },
  {
    attribute: 'case.Agency',
    valueAsString: '00053752',
  },
  {
    attribute: 'case.SalesChannel',
    valueAsString: '1d08e6de-de44-4d48-83b4-b30a0d4c988f',
  },
  {
    attribute: 'case.SalesBusinessSource',
    valueAsString: '1b9dd477-cc36-4dfb-aa3f-cda0f98065a9',
  },
  {
    attribute: 'case.ApplicationType',
    valueAsString: '409f04e5-ff1f-4d64-8e79-e5ba1796243b',
  },
  {
    attribute: 'case.ClientPresent',
    valueAsString: 'fc7610f9-7c80-4182-b815-a82bff28524c',
  },
  {
    attribute: 'case.CountryOfContract',
    valueAsString: '1f087fa1-4b87-485e-88f5-de581e9440b7',
  },
  {
    attribute: 'case.UnderwritingRegion',
    valueAsString: '14cee142-116f-4b34-a4a2-fd94768fc222',
  }
];
