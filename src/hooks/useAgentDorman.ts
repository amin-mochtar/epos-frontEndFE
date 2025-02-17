import { useNavigation } from '@react-navigation/native';
import { AppRoutes } from 'common_services_frontend';
import { GlobalPromptModal } from 'plai_common_frontend';
import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { View } from 'react-native';
import { useSelector } from 'react-redux';

type TIsAgentDormanValid = {
  conditionalCourse: string;
}


export default function useAgentDorman() {
  const [isLater, setIsLater] = useState<boolean>(false);
  const { t } = useTranslation();
  const navigation = useNavigation();
  const authState = useSelector((state: any) => {
    return state.auth;
  });

  const isAgentDormanValid = ({ conditionalCourse }: TIsAgentDormanValid): boolean => {
    const agentProfile = authState?.agentProfile;
    const passedCourse = agentProfile?.passedCourse;
    const dormant = agentProfile?.dormant;
    if (dormant) {
      if (dormant.flag === '' || dormant.flag === 'P') return true;
      if (dormant.flag === 'D') {
        const isSalesAllowedConditional = agentProfile?.isSalesAllowed ? true : false;
        const passedCourseConditional = passedCourse && passedCourse.length > 0 && passedCourse.includes(conditionalCourse) ? true : false;
        if (passedCourseConditional && isSalesAllowedConditional) {
          return true;
        }
      }
    }

    if (isLater === false) {
      GlobalPromptModal.show({
        title: t('Epos:unable_to_continue'),
        subtitle: t('Epos:agent_dormant_unable_to_continue'),
        buttonPrimary: {
          text: t('Epos:to_training'), onPress: () => {
            GlobalPromptModal.close();
            navigation.navigate(AppRoutes.TRAINING)
          }
        },
        buttonSecondary: {
          text: t('Epos:later'), onPress: () => {
            GlobalPromptModal.close();
          }
        }
      })
    }

    return isLater;
  }

  return {
    isAgentDormanValid,
  }
}