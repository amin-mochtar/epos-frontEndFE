import { TCallbacksParams, UpfrontDecisionModel, UpfrontMapping } from '../../utilities';
import { getUpfrontDecisionAPI, postUpdrontDecisionAPI } from '../api';

const getUpfrontDecision = async ({
  params,
  onSuccess,
  onError,
  onFinally,
}: TCallbacksParams<string, UpfrontDecisionModel.Item>) => {
  try {
    const response = await getUpfrontDecisionAPI(params);
    if (response.data?.data?.status === 'SUCCESS') {
      onSuccess?.(response?.data?.data);
    } else {
      onError?.(response)
    }

  } catch (error) {
    onError?.(error);
    return { error };
  } finally {
    onFinally?.();
  }
};

const postUpfrontDecision = async ({
  params,
  onError,
  onFinally,
  onSuccess,
}: TCallbacksParams<UpfrontMapping.Request, UpfrontDecisionModel.PostResponse>) => {
  try {
    const response = await postUpdrontDecisionAPI(params);
    if (response?.data.data.responseCode === '00') {
      onSuccess?.(response.data.data);
    } else {
      onError?.(response)
    }
  } catch (error) {
    onError?.(error);
  } finally {
    onFinally?.();
  }
};

export { getUpfrontDecision, postUpfrontDecision };
