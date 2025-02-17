import { useSelector } from 'react-redux';
import { useObject } from '../database';
//@ts-ignore
import { RootState } from 'redux/reducer';
import { EposState } from '../redux';
import { useCallback } from 'react';
import { calculateAge, ISPAJData, ISQSDetail } from '../utilities';
export default function useUpfrontValidation() {
  const { selectedSQSId, spajId } = useSelector<RootState, EposState>((state) => state.epos);
  const RSQSData = useObject<ISQSDetail>('SQSDetail', selectedSQSId);
  const RSPAJData = useObject<ISPAJData>('SPAJData', spajId);
  const primaryInsured = RSPAJData?.primaryInsured ? JSON.parse(RSPAJData.primaryInsured) : {};
  const isSuccessHitPostUpfront = RSPAJData?.upfrontDecisionResult?.isNeedRequest === 'true';
  const isPHEqualLA = RSQSData?.lifeAssuredSelf === 'self';

  const getValidationUpfront = useCallback(() => {
    if (!isSuccessHitPostUpfront) return false;
    const { isPHValidPrivy, isLAValidPrivy, isTTValidPrivy } = generateValidationUpfront(RSPAJData)
    if (isPHEqualLA) {
      return isPHValidPrivy;
    }

    const isMinor = calculateAge(primaryInsured?.clientDateBirth) < 17;
    const isOtherAssured = RSQSData?.additionalLifeAssuredSelf === 'other';

    if (isOtherAssured) {
      if (isMinor) {
        return isPHValidPrivy && isTTValidPrivy;
      }
      return isPHValidPrivy && isLAValidPrivy && isTTValidPrivy;
    }

    if (isMinor) {
      return isPHValidPrivy;
    }

    return isPHValidPrivy && isLAValidPrivy;
  }, [
    isPHEqualLA,
    primaryInsured?.clientDateBirth,
    RSQSData?.additionalLifeAssuredSelf,
    isSuccessHitPostUpfront,
    RSPAJData,
  ]);

  return { getValidationUpfront };
}

const generateValidationUpfront = (RSPAJData: ISPAJData) => {
  const primaryInsured = RSPAJData?.primaryInsured ? JSON.parse(RSPAJData.primaryInsured) : {};
  const additionalInsured = RSPAJData?.additionalInsured ? JSON.parse(RSPAJData.additionalInsured) : {};
  const privyData = RSPAJData?.privyData ? JSON.parse(RSPAJData?.privyData) : {};
  const isExistPrivyData = Object.keys(privyData).length > 0
  const isPHValidPrivy = isExistPrivyData ? privyData?.privyIdPH !== 'failed' : false
  const isLAValidPrivy = isExistPrivyData ? primaryInsured?.clientName && (privyData?.privyIdLA !== 'failed') : false
  const isTTValidPrivy = isExistPrivyData ? additionalInsured?.clientName && (privyData?.privyIdTT !== 'failed') : false
  return { isPHValidPrivy, isLAValidPrivy, isTTValidPrivy }
}

