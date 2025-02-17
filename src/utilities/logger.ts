
import { LoggerHelper, ActionLogData, LogSourceType, LogActionType } from 'common_services_frontend';
import { EposRoutes } from '../navigation';

type TParamNBLogger = {
  CREATE_PROPOSAL: {
    actionData: ActionLogData,
    extra: any,
  },
  NEWBUSINESS_LANDING: {
    actionData: ActionLogData,
    extra: any,
  },
  NEWBUSINESS_SCREEN: {
    actionData: ActionLogData,
    extra: any,
  },
  SUBMIT_PROPOSAL: {
    actionData: ActionLogData,
    extra: any,
  },
}

const getParamNBLogger = () => {
  return {
    CREATE_PROPOSAL: {
      actionData: {
        source: '',
        sourceType: LogSourceType.NAVIGATION,
        actionType: LogActionType.CREATE_PROPOSAL,
        actionPage: EposRoutes.PREVIOUSLY_OWNED_POLICY,
      },
      extra: {},
    },
    NEWBUSINESS_LANDING: {
      actionData: {
        source: '',
        sourceType: LogSourceType.NAVIGATION,
        actionType: LogActionType.VIEW,
        actionPage: EposRoutes.LANDING,
      },
      extra: {},
    },
    NEWBUSINESS_SCREEN: {
      actionData: {
        source: '',
        sourceType: LogSourceType.NAVIGATION,
        actionType: LogActionType.VIEW,
        // Will Populate using param
        actionPage: "",
      },
      extra: {},
    },
    SUBMIT_PROPOSAL: {
      actionData: {
        source: '',
        sourceType: LogSourceType.NAVIGATION,
        actionType: LogActionType.SEND,
        actionPage: EposRoutes.LINK_SUBMITTED,
      },
      extra: {},
    }
  } as TParamNBLogger
}

type paramType = keyof TParamNBLogger;
/**
 *
 * @param type
 * @param route
 *
 * Route mandatory if type using NEWBUSINESS_SCREEN
 */
export const onEmitLoggerNB = async (type: paramType, route?: string) => {
  const paramNB = getParamNBLogger()
  const selectedParam = { ...paramNB[type] }
  if (type == 'NEWBUSINESS_SCREEN') {
    selectedParam.actionData.actionPage = route || ''
  }
  LoggerHelper.emit(selectedParam.actionData);
};