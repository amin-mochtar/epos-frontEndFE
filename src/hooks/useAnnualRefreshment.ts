import { useNavigation } from '@react-navigation/native';
import { AppRoutes } from 'common_services_frontend';
import { getAnnualRefreshmentPopUpSettingSearch, getAnnualRefreshmentStatus } from './../network';
import { GlobalPromptModal } from 'plai_common_frontend';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import moment from 'moment';
import { useState } from 'react';
import { showModalMaintenance } from './../utilities';

export default function useAnnualRefreshment() {
  const { t } = useTranslation();
  const [isLater, setIsLater] = useState<boolean>(false);
  const [isAnnualLoading, setIsAnnualLaoding] = useState<boolean>(false);
  const navigation = useNavigation();
  const authState = useSelector((state: any) => {
    return state.auth;
  });

  const isAnnualRefreshmentValid = async () => {
    /** Sementara di return true dulu, sembari nunggu solusi, karena ini jadi blocker. */
    return true;
    const agentCode = authState?.agentCode;
    try {
      setIsAnnualLaoding(true);
      const annualRefreshmentPopUpSetting = await getAnnualRefreshmentPopUpSettingSearch({ data: { code: 'ART' } });
      const annualRefreshmentPopUpSettingData = annualRefreshmentPopUpSetting?.data as { data: any, code: string | number };
      if (annualRefreshmentPopUpSetting?.ok) {
        const annualRefreshmentValues = annualRefreshmentPopUpSettingData?.data?.data[0] ?? null;
        if (annualRefreshmentValues) {
          let today = moment();
          const conditionalCrossYearStartDate = today.isSameOrAfter(annualRefreshmentValues.crossYearStartDt);
          const conditionalCrossYearEndDDate = today.isSameOrBefore(annualRefreshmentValues.crossYearEndDt);
          if (conditionalCrossYearStartDate && conditionalCrossYearEndDDate) {
            setIsAnnualLaoding(false);
            return true
          };
          const annualRefreshmentStatus = await getAnnualRefreshmentStatus({ agentCode: agentCode, trainingCode: 'ART' });
          const refreshmentStatusData = annualRefreshmentStatus.data as any;
          if (refreshmentStatusData && refreshmentStatusData.length > 0) {
            const annualRefreshmentStatusValues = refreshmentStatusData?.[0];
            const conditionalPublishYear = annualRefreshmentStatusValues?.publishYear === moment().year().toString();
            const conditionalPassY = annualRefreshmentStatusValues?.pass === 'Y';
            if (conditionalPublishYear && conditionalPassY) {
              setIsAnnualLaoding(false);
              return true
            };
            if (!conditionalPublishYear && conditionalPassY) {
              const conditionalPhase1Modal = today.isSameOrAfter(annualRefreshmentValues.fase1StartDt) && today.isSameOrBefore(annualRefreshmentValues.fase1EndDt);
              const conditionalPhase2Modal = today.isSameOrAfter(annualRefreshmentValues.fase2StartDt) && today.isSameOrBefore(annualRefreshmentValues.fase2EndDt);

              if (conditionalPhase1Modal) {
                if (isLater === false) {
                  setIsAnnualLaoding(false);
                  GlobalPromptModal.show({
                    title: t('Epos:unable_to_continue'),
                    subtitle: t('Epos:annual_refreshment_unable_to_continue'),
                    buttonPrimary: {
                      text: t('Epos:to_training'), onPress: () => {
                        setIsLater(true);
                        GlobalPromptModal.close();
                        navigation.navigate(AppRoutes.TRAINING);
                      }
                    },
                    buttonSecondary: {
                      text: t('Epos:later'), onPress: () => {
                        GlobalPromptModal.close()
                      }
                    }
                  })

                  return true;
                }

                return false;
              }

              if (conditionalPhase2Modal) {
                setIsAnnualLaoding(false);
                GlobalPromptModal.show({
                  title: t('Epos:unable_to_continue'),
                  subtitle: t('Epos:annual_refreshment_unable_to_continue'),
                  buttonPrimary: {
                    text: t('Epos:to_training'), onPress: () => {
                      GlobalPromptModal.close();
                      navigation.navigate(AppRoutes.TRAINING);
                    }
                  },
                })

                return false;
              }

              return false;
            } else {
              GlobalPromptModal.show({
                title: t('Epos:unable_to_continue'),
                subtitle: t('Epos:annual_refreshment_unable_to_continue'),
                buttonPrimary: {
                  text: t('Epos:to_training'), onPress: () => {
                    setIsLater(true);
                    GlobalPromptModal.close();
                    navigation.navigate(AppRoutes.TRAINING);
                  }
                },
              })

              setIsAnnualLaoding(false);
              return false;
            }

          } else {
            setIsAnnualLaoding(false);
            showModalMaintenance();
            return false;
          }
        } else {
          setIsAnnualLaoding(false);
          return false;
        }
      } else {
        setIsAnnualLaoding(false);
        showModalMaintenance();
        return false;
      }
    } catch (error) {
      setIsAnnualLaoding(false);
      return false;
    }
  }

  return {
    isAnnualRefreshmentValid,
    isAnnualLoading
  }
}