import { APIResponse } from '../model/api-model';

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace UpfrontDecisionModel {
  export type Followup = {
    client_name: string;
    pending_req: string[];
  };
  export type DecisionStatus =
    | 'JET_CASE'
    | 'DECLINE'
    | 'NON_JET'
    | 'AUTO_REQUIREMENT'
    | 'AUTO_REQUIREMENT_ON'
    | 'SUBSTANDARD_EXCLUSION'
    | 'DECLINE_ADMIN';
  type TResponseDetail = {
    decision: DecisionStatus;
    decision_description: string;
    decision_date: string;
    need_additional_form: string[];
    follow_up: Followup[];
    exclusion: string | any[];
  };
  export interface Item {
    status: 'SUCCESS' | 'EXCEPTION' | 'IN_PROGRESS';
    validity: 'VALID' | 'NOT_VALID';
    response_detail: TResponseDetail;
  }

  export type Response = APIResponse<Item>;

  export type Request = Record<string, unknown>;

  export type RealmData = {
    result?: Item;
    signatureExclusionOffering?: RealmSignatureExclustion;
    lsar?: RealmLSAR;
    abr?: RealmAbr;
    isNeedRequest?: boolean;
    transactionId?: string;
    timeSubmitted?: string;
  };

  export type KeyRealmUpdate =
    | 'result'
    | 'signatureExclusionOffering'
    | 'lsar'
    | 'abr'
    | 'isNeedRequest'
    | 'timeSubmitted'
    | 'transactionId';

  export type RealmSignatureExclustion = {
    'exclustion-offering-agreement': {
      key: string;
      label: string;
    };
    'policy-holder-agreement': string;
    'e-signature': string;
    'signature-location': string;
    'signature-date': string;
  };

  export type IncomeItem = {
    year: string;
    salary: string;
    private_business: string;
    others: string;
    total_salary_per_year: string;
  };

  export type CompanyFinancial = {
    year: string;
    turnover: string;
    gross_profit: string;
    net_profit: string;
  };

  export type SignatureItem = {
    location: string;
    e_sign: string;
    time: string;
  };

  export type RealmLSAR = {
    spaj_number: string;
    customer_confirmation: {
      full_name: string;
      years_known_marketers: string;
    };
    income: IncomeItem[];
    customer_wealth: {
      saving: string;
      invest_amount: string;
      private_property: string;
      share_ownership_value: string;
    };
    customer_debt: {
      kpr_kpa: string;
      private_loan: string;
      business_loan: string;
    };
    customer_company_profile: {
      name: string;
      official_site: string;
      location: string;
      position: string;
      job_description: string;
      company_type: string;
      company_establishment_date: string;
      total_employee: string;
      share_holder_percentage: string;
    };
    customer_company_financial: CompanyFinancial[];
    customer_company_address: {
      address: string;
      neighborhood_1: string;
      neighborhood_2: string;
      km: string;
      postal_code: string;
      district: string;
      urban_village: string;
      province: {
        key: string;
        label: string;
      };
      city_regency: string;
    };
    bankruptcy_info?: {
      key: string;
      label: string;
    };
    customer_signature: {
      policy_holder: SignatureItem;
      insured: SignatureItem;
    };
    marketer_signature: {
      name: string;
      code: string;
    } & SignatureItem;
  };

  export type CustomerInfoLifeStyle = {
    life_style: string;
    family_background: string;
    educational_background: string;
  };

  export type RealmAbr = {
    spaj_number: string;
    policy_holder_name: string;
    policy_insured_name: string;
    policy_application_reason: string;
    policy_holder_info: CustomerInfoLifeStyle;
    primary_insured_info: CustomerInfoLifeStyle;
    agent_pov_review: string;
    agent_signature: { name: string; code: string } & SignatureItem;
  };

  export type FormAbr = Omit<RealmAbr, 'spaj_number' | 'policy_holder_name' | 'policy_insured_name'>;

  export type FormLsar = Omit<UpfrontDecisionModel.RealmLSAR, 'spaj_number'>;

  type PostResponseItem = {
    responseCode: string;
    responseMessage: string;
    content: null;
    data: {
      message: string;
      transaction_id: string;
      code: string;
    };
    propNo: null;
  };

  export type PostResponse = APIResponse<PostResponseItem>;
}

// eslint-disable-next-line @typescript-eslint/no-namespace
export namespace UpfrontMapping {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  export namespace Product {
    type Coverage = {
      code: string;
      coverageAttributes:
      | {
        name: string;
        value: string;
      }[]
      | [];
    };
    type Fund = {
      code: string;
      allocation: string;
    };
    export type Item = {
      code: string;
      type: string;
      principleType: 'Y' | 'N';
      coverage: Coverage[];
      fund: Fund[];
      fundTopUp: Fund[];
    };
  }

  type Substandard = {
    code: string;
    class: string;
    role: 'LA';
  };

  type Calculator = {
    backdate: string;
    billingFrequency: string;
  };
  // eslint-disable-next-line @typescript-eslint/no-namespace
  export namespace Signature {
    type Esign = {
      location: string;
      date: string;
      role: string;
      base64: string;
      imageName: string;
    };
    type Digital = {
      role: string;
      provider: {
        id: string;
      };
    };

    export type Item = {
      esign: Esign;
      digital: Digital;
    };
  }

  type Attachment = {
    name: string;
    fileType: string;
    base64: string;
  };

  export type Dislaimer = {
    code: 'dataProtection1' | 'dataProtection2' | 'surplus';
    value: string;
  };

  export type BankAccount = {
    reason: string;
    bankName: string;
    branch: string;
    accountNumber: string;
    accountName: string;
    city: string;
  };

  type Form = {
    type: 'DROPHS' | 'LAMPUNG' | 'WAKAFHIDUP' | 'WAKAF' | 'AMEND';
    docId: string;
    ver: string;
    submissionType: 'CO' | 'SU';
    attributes: {
      key: string;
      value: string;
    };
  };

  type Name = {
    full: string;
  };

  type Address = {
    type: string;
    line1: string;
    line2: string;
    line3: string;
    rt: string;
    rw: string;
    km: string;
    kelurahan: string;
    kecamatan: string;
    city: string;
    province: string;
    postalCode: string;
    country: string;
  };

  type Phone = {
    type: string;
    number: string;
    countryCode: string;
  };

  type Contact = {
    phone: Phone[];
    fax: string;
  };
  // eslint-disable-next-line @typescript-eslint/no-namespace
  export namespace Agent {
    type Office = {
      code: string;
      name: string;
    };

    export type Item = {
      number: string;
      name: Name;
      office: Office;
      unit: string;
      dateOfBirth: string;
      contact: Contact;
      email: string;
    };
  }
  // eslint-disable-next-line @typescript-eslint/no-namespace
  export namespace Client {
    type Identification = {
      type: string;
      number: string;
      expiryDate: string;
    };

    type TaxPayer = {
      type: string;
      number: string;
      reason: string;
      name: string;
    };

    type Occupation = {
      code: string;
      companyName: string;
      address: Address;
    };

    type Income = {
      frequency: string;
      amount: number;
      amountCode: string;
      amountDesc: string;
      source: { desc: string; code: string }[];
    };

    export type Item = {
      name: Name;
      placeOfBirth: string;
      dateOfBirth: string;
      countryOfBirth: string;
      identification: Identification[];
      nationality: string;
      gender: 'M' | 'F';
      maritalStatus?: string;
      religion?: string;
      education?: string;
      taxpayer?: TaxPayer;
      occupation?: Occupation;
      motherName?: string;
      address: Address[];
      contact: Contact;
      email?: string;
      income?: Income;
      staffRelation?: string;
      networth?: number;
      networthRangeDesc?: string;
      declaration?: {
        hasSensoryDisabilityDesc: string;
        canSpeakBahasaDesc: string;
        vulnerable1Desc: string;
      };
      type: string;
      role: 'PH' | 'LA' | 'BE' | 'PY';
      relation: string;
      benefitAllocation: number;
    };
  }
  // eslint-disable-next-line @typescript-eslint/no-namespace
  export namespace Magnum {
    type Questionare = {
      answer: string;
      question: string;
    };

    type DataPackages = {
      attributes: {
        attribute: string;
        attributeDefinitionUuid: string;
        ddl: boolean;
        questionDefinitionUuid: string;
        value: {
          referenceDataValues?: { uuid: string }[];
          emptyValue?: boolean;
          dateValue?: string;
          stringValue?: string;
          decimalValue?: number;
          intValue?: number;
        };
      }[];
    };

    export type Item = {
      role: string;
      questionaire: Questionare[];
      data: {
        dataPackages: DataPackages[];
        externalCaseUuid: string;
        languageCode: string;
        rulebaseName: string;
        rulebaseUuid: string;
      };
    };
  }

  export type Quotation = {
    id: string; //proposal ID
    createdDate: string; //summary proposal, createdDate
    product: Product.Item[]; //product, additional benefit, main additional benefit, topup additional benefit, fund, fund topup
    substandard: Substandard[]; //substandard
    calculator: Calculator; //calculator
    signature: Signature.Item[] | []; //kemungkinan gak jadi, karena di upfront blm ada ttd
    attachment: Attachment[]; //spaj policy holder docs, etc docs
  };

  export type Submission = {
    signature: Signature.Item[] | []; //kemungkinan gak jadi, karena di upfront blm ada ttd
    disclaimer: Dislaimer[]; //ini akan hardcode, kemungkinan tipenya hanya code dan value
    bankAccount: BankAccount[]; //spaj policy holder docs
    form: Form[] | []; //additional form
    agent: Agent.Item; //auth agent
    client: Client.Item[]; //policy holder data acc atau customer storage
    magnum: Magnum.Item[]; //get data from magnum
    previousSubmissionId: string; //kalo ada conversion, pasang prev id disini
    attachment: Attachment[]; //docs dari step 6
  };

  export type Request = {
    quotation: Quotation;
    submission: Submission;
  };
}
