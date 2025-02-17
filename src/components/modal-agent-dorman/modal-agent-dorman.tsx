import { useNavigation } from "@react-navigation/native";
import { AppRoutes } from "common_services_frontend";
import { Button } from "common_ui_components/app/components-ui";
import { View } from "native-base";
import { ModalInformation, plaiStyles } from "plai_common_frontend";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { Text } from "react-native";

type Props = {
    isVisible: boolean;
    onClose: Function;
};

export const ModalAgentDorman: FC<Props> = ({ isVisible = false, onClose }) => {
    const navigation = useNavigation();
    const { t } = useTranslation();
    return (
        <View>
            <ModalInformation
                visible={isVisible}
                title={t('Epos:unable_to_continue')}
                desc={t('Epos:agent_dormant_unable_to_continue')}
                buttonPrimary={{ text: t('Epos:to_training'), onPress: () => navigation.navigate(AppRoutes.TRAINING) }}
                buttonSecondary={{ text: t('Epos:later'), onPress: () => onClose() }}
            />
        </View>
    );
};