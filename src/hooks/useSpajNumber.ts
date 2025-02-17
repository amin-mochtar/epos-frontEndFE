import { useDispatch, useSelector } from 'react-redux';
import { generateSpajNumber } from '../network';
import { EposState, updateEposState } from '../redux';
import { useEposRealm } from '../database';
//@ts-ignore
import { RootState } from 'redux/reducer';

type TData = {
  agentCode: string;
  channel: string;
  createdDate: string;
  spajNumber: string;
};

export default function useSpajNumber() {
  const authState = useSelector((state: any) => {
    return state.auth;
  });
  const dispatch = useDispatch();
  const { updateSummaryByKey } = useEposRealm()
  const { proposalId } = useSelector<
    RootState,
    EposState
  >((state) => state.epos);
  const _generateSpajNumber = async () => {
    try {
      const param = { agentCode: authState?.agentCode, channel: '2' };
      const responseData = await generateSpajNumber(param);
      const _responseData = responseData?.data as TData
      if (_responseData?.spajNumber) {
        return _responseData?.spajNumber
      } else {
        return ''
      }
    } catch (error) {
      return ''
    }
  };

  return {
    _generateSpajNumber
  }
}