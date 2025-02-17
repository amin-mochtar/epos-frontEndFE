import { showModalConnectionOffline, showModalMaintenance, TCallbacksParams } from '../../utilities';
import { submissionDoksul } from '../api';
import NetInfo from '@react-native-community/netinfo';

const postSubmissionDoksul = async ({ params, onError, onFinally, onSuccess }: TCallbacksParams<any, any>) => {
  const state = await NetInfo.fetch();
  if (state.isConnected) {
    try {
      const response = await submissionDoksul(params);
      if (response.status === 200) {
        onSuccess?.(response?.data?.data);
        return response?.data?.data;
      }
      if (response.status === 401) {
        //UNAUTHORIZED
        showModalMaintenance();
        onError?.(response);
      }
    } catch (error) {
      showModalMaintenance();
      onError?.(error);
    } finally {
      onFinally?.();
    }
    return;
  }

  showModalConnectionOffline()
  throw new Error("Offline");
};

export { postSubmissionDoksul };