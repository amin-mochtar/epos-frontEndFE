// {
//   quotation: {
//     id: proposalId,
//     createdDate: formaterDateSubmission(summaryById?.createdDate),
//     substandard: {},
//     calculator: {},
//     product: {},
//     riskProfile: {},
//   },
//   submission: {
//     id: spajNumber,
//     submitDate: formaterDateSubmission((new Date()).toString()),
//     docId: '',
//     type: 'CO',
//     agent: agentMap,
//     attachment: [],
//     bankAccount: [],
//     client: [], //TODO: JERI
//     disclaimer: {},
//     magnum: {}, //TODO: JERI
//     previousSubmissionId: '',
//     form: [],
//     signature: [],
//     topUp: {},
//     flag: {},
//     flagBoMapping: {},
//     payment: {},
//     upfront: {}
//   },
// }


type TSubstandard = {
  class: string
  code: string
  role: string
}

type TCalculator = {
  backdate: string
  billingFrequency: string
  budget: string
}

type TQuotation = {
  id: string,
  createdDate: string,
  substandard: TSubstandard[]
  calculator: TCalculator


}

type TTypeSubmissionKey = 'DOC_UPL' | 'SQS' | 'AMEND' | 'UW61' | 'WAKAF' | 'WAKAF-HIDUP' | 'UW6' | 'AMEND_AGENT' | 'SKA' | 'FORM-CONV' | 'SU' | 'PRIVY' | 'UPFRONT'

export type TSubmission = {
  id: string
  submitDate: string
  docId: string
  // type:string
  previousSubmissionId: string
  type: TTypeSubmissionKey
}

type TBodySubmission = {
  quotation: TQuotation
  submission: TSubmission
}

export type TAttachment = {
  name: string,
  type: string,
  docId: string,
  base64: string
}

export type TSubmissionType = 'UPFRONT' | 'PRIVY' | 'SU' | 'CO';
export type TPrivyData = {
  privyIdPH: string,
  privyIdAgent: string,
  privyIdLA: string,
  privyIdPY: string,
  privyIdTT: string,
  privyComplated?: boolean,
  privyIsSubmit?: boolean,
}