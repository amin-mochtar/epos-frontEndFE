import { View } from 'react-native';
import React, { FC, useMemo } from 'react';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { PruColor } from 'common_ui_components';
import { plaiStyles } from 'plai_common_frontend';

type TName = 'success' | 'failure' | 'notice' | 'policy';
type Props = {
    name: TName;
    size: number;
    fillColor?: string;
};

const IconMap: Record<TName, string> = {
    success: 'check',
    failure: 'close',
    notice: 'information-variant',
    policy: 'file-document-outline',
};

export const ModalIcon: FC<Props> = ({ name = 'success', size = 40, fillColor = PruColor.grey97 }) => {
    const sizing = useMemo(
        () => ({
            width: size,
            height: size,
        }),
        [],
    );
    return (
        <View style={[sizing, plaiStyles.bgwhite, plaiStyles.brFull, plaiStyles.row, plaiStyles.alignCenter, plaiStyles.justifyCenter]}>
            <Icon name={IconMap[name]} size={24} color={fillColor} />
        </View>
    );
};