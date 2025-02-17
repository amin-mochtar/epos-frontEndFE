import { AppNavigatorParams } from 'common_services_frontend';

export enum EposDoksulRoutes {
  EPOSDOKSUL = 'EPOSDOKSUL',
  LANDING_DOKSUL = 'LandingDoksul',
  DOKSUL = 'Doksul',
  MARKETERS_INTERACTION = 'MarketersInteraction',
  CONFIRM_PRODUCT_DOKSUL = 'ConfirmProductDoksul',
  ADDITIONAL_INSURANCE_STATEMENT = 'AdditionalInsuranceStatement',
  DOKSUL_DOCUMENT = 'DoksulDocument',
}

export type EposDoksulNavigationParams = AppNavigatorParams & {

  [EposDoksulRoutes.LANDING_DOKSUL]: undefined;
  [EposDoksulRoutes.DOKSUL]: undefined;
  [EposDoksulRoutes.MARKETERS_INTERACTION]: undefined;
  [EposDoksulRoutes.CONFIRM_PRODUCT_DOKSUL]: undefined;
  [EposDoksulRoutes.ADDITIONAL_INSURANCE_STATEMENT]: undefined;
  [EposDoksulRoutes.DOKSUL_DOCUMENT]: undefined;
}

export const EposDoksulRouteTypeMap = {
  [EposDoksulRoutes.LANDING_DOKSUL]: {
    module: 'PLAI EPOS DOKSUL',
    functions: 'PLAI Epos Doksul Landing',
  },
  [EposDoksulRoutes.DOKSUL]: {
    module: 'PLAI EPOS DOKSUL',
    functions: 'PLAI Epos Doksul',
  },
  [EposDoksulRoutes.MARKETERS_INTERACTION]: {
    module: 'PLAI EPOS DOKSUL',
    functions: 'PLAI Epos Marketers Interaction',
  },
  [EposDoksulRoutes.CONFIRM_PRODUCT_DOKSUL]: {
    module: 'PLAI EPOS DOKSUL',
    functions: 'PLAI Epos confirm product doksul',
  },
  [EposDoksulRoutes.ADDITIONAL_INSURANCE_STATEMENT]: {
    module: 'PLAI EPOS DOKSUL',
    functions: 'PLAI Epos additional insurance statement',
  },
  [EposDoksulRoutes.DOKSUL_DOCUMENT]: {
    module: 'PLAI EPOS DOKSUL',
    functions: 'PLAI Epos Doksul Document',
  },
}