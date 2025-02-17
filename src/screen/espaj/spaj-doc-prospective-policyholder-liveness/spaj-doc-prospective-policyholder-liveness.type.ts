export type TLivenessResponse = {
  data: TDataLivenessResponse;
  source: string;
};

export type TDataLivenessResponse = {
  errors: any[];
  face_1: string;
  face_2: string;
  fc_token: string;
  message: string;
  result: boolean;
  timeout: boolean;
  transaction_id: string;
  applicationId: string;
  mediaTransactionId: string;
};

export type TRLivenessData = {
  primaryInsurance?: TLivenessData;
  payor?: TLivenessData;
  polis?: TLivenessData;
}

export type TLivenessData = {
  imgBase64: string;
  livenessResult: TDataLivenessResponse,
  isFinish?: boolean;
  isManualDocument?: boolean;
}

export type TResponseLandingUrl = {
  code: number | string,
  status: string,
  message: string,
  data: TResponseDataLandingUrl
}

type TResponseDataLandingUrl = {
  id: string,
  application_id: string,
  application_name: string,
  user_landing_url: string,
  csrf_token: string,
  expired_at: string
}

export type TDecodedResponse = {
  exp: string | number,
  iat: string | number,
  iss: string | number,
  additional: TAdditionalDecoded
}

type TAdditionalDecoded = {
  face_1_hash: string,
  face_2_hash: string,
  face_id_1: string,
  face_id_2: string,
  provider_message: string,
  result: boolean,
  score: number,
  transaction_id: string,
}