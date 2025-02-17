export type TShow = {
  showSignature: boolean;
  showSignatureDate: boolean;
};

type TSignatureReducerState = {
  policy_holder: TShow;
  insured: TShow;
  agent: TShow;
};

export type TAction = {
  type:
    | 'SET_SHOW_PH_SIGNATURE'
    | 'SET_SHOW_INSURED_SIGNATURE'
    | 'SET_SHOW_AGENT_SIGNATURE'
    | 'SET_SHOW_PH_SIGNATURE_DATE'
    | 'SET_SHOW_INSURED_SIGNATURE_DATE'
    | 'SET_SHOW_AGENT_SIGNATURE_DATE'
    | 'SET_PH_SIGNATURE'
    | 'SET_INSURED_SIGNATURE'
    | 'SET_AGENT_SIGNATURE';
  payload: boolean;
};

export const defaultIncomeItem = {
  year: '',
  salary: '',
  private_business: '',
  others: '',
  total_salary_per_year: '',
};

export const defaultValuesItem = {
  year: '',
  turnover: '',
  gross_profit: '',
  net_profit: '',
};

export const defaultItemSignatureDate = {
  location: '',
  e_sign: '',
  time: new Date().toString(),
};

export const defaultFormLsar = {
  customer_confirmation: {
    full_name: '',
    years_known_marketers: '',
  },
  income: [],
  customter_wealth: {
    saving: '',
    invest_amount: '',
    private_property: '',
    share_ownership_value: '',
  },
  customer_company_financial: [],
  customer_debt: {
    kpr_kpa: '',
    private_loan: '',
    business_loan: '',
  },
  customer_company_profile: {
    name: '',
    official_site: '',
    location: '',
    position: '',
    job_description: '',
    company_type: '',
    company_establishment_date: '',
    share_holder_percentage: '',
  },
  customer_company_address: {
    address: '',
    neighborhood_1: '',
    neighborhood_2: '',
    km: '',
    postal_code: '',
    district: '',
    urban_village: '',
    province: {},
    city_regency: '',
  },
  bankruptcy_info: {
    key: '',
    label: '',
  },
  customer_signature: {
    policy_holder: defaultItemSignatureDate,
    insured: defaultItemSignatureDate,
  },
  marketer_signature: {
    name: '',
    code: '',
    ...defaultItemSignatureDate,
  },
};

export const initialState: TSignatureReducerState = {
  policy_holder: {
    showSignature: false,
    showSignatureDate: false,
  },
  insured: {
    showSignature: false,
    showSignatureDate: false,
  },
  agent: {
    showSignature: false,
    showSignatureDate: false,
  },
};

export function phSignatureReducer(state: TSignatureReducerState, action: TAction): TSignatureReducerState {
  switch (action.type) {
    case 'SET_PH_SIGNATURE':
      return {
        ...state,
        policy_holder: {
          showSignature: action.payload,
          showSignatureDate: action.payload,
        },
      };
    case 'SET_INSURED_SIGNATURE':
      return {
        ...state,
        insured: {
          showSignature: action.payload,
          showSignatureDate: action.payload,
        },
      };
    case 'SET_AGENT_SIGNATURE':
      return {
        ...state,
        agent: {
          showSignature: action.payload,
          showSignatureDate: action.payload,
        },
      };
    case 'SET_SHOW_PH_SIGNATURE':
      return {
        ...state,
        policy_holder: {
          ...state.policy_holder,
          showSignature: action.payload,
        },
      };
    case 'SET_SHOW_INSURED_SIGNATURE':
      return {
        ...state,
        insured: {
          ...state.insured,
          showSignature: action.payload,
        },
      };
    case 'SET_SHOW_AGENT_SIGNATURE':
      return {
        ...state,
        agent: {
          ...state.agent,
          showSignature: action.payload,
        },
      };
    case 'SET_SHOW_PH_SIGNATURE_DATE':
      return {
        ...state,
        policy_holder: {
          ...state.policy_holder,
          showSignatureDate: action.payload,
        },
      };
    case 'SET_SHOW_INSURED_SIGNATURE_DATE':
      return {
        ...state,
        insured: {
          ...state.insured,
          showSignatureDate: action.payload,
        },
      };
    case 'SET_SHOW_AGENT_SIGNATURE_DATE':
      return {
        ...state,
        agent: {
          ...state.agent,
          showSignatureDate: action.payload,
        },
      };
    default:
      return state;
  }
}
