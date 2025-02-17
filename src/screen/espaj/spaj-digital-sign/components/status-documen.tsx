import { View, Text } from 'react-native';
import React, { memo } from 'react';
import { plaiStyles } from 'plai_common_frontend';
import { pruTestID } from 'common_services_frontend';

const theme = {
    green: {
        wrapper: { backgroundColor: '#DFF7EF' },
        text: { color: '#24C791' },
    },
    yellow: {
        wrapper: { backgroundColor: '#FFF5E0' },
        text: { color: '#FFB83D' },
    },
    purple: {
        wrapper: { backgroundColor: '#EFEBFF' },
        text: { color: '#A574F3' },
    },
    orange: {
        wrapper: { backgroundColor: '#FFEFE3' },
        text: { color: '#FF872E' },
    },
    blue: {
        wrapper: { backgroundColor: '#DBF1F9' },
        text: { color: '#009CBD' },
    },
    red: {
        wrapper: { backgroundColor: '#FFE4E6' },
        text: { color: '#E8192C' },
    },
};

type TChips = {
    text: string;
    type: keyof typeof theme;
    isRounded: boolean;
    testID: string;
};

export const StatusDocument = memo(({ text, type, isRounded = false, testID }: TChips) => {
    return (
        <View
            style={[
                plaiStyles.selfStart,
                plaiStyles.px8,
                plaiStyles.py4,
                plaiStyles.br4,
                theme[type].wrapper,
                isRounded && plaiStyles.br12,
            ]}
            {...pruTestID(`${type}-${testID}`)}
        >
            <Text style={[plaiStyles.font12, plaiStyles.fontBold, theme[type].text]}>{text}</Text>
        </View>
    );
});
