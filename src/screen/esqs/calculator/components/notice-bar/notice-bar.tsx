import { plaiStyles } from 'plai_common_frontend';
import { Image, Linking, TouchableOpacity } from 'react-native';
import { Text, View } from 'native-base';
import React from 'react';
import { noticeBarType } from './notice-bar.type';
import { blocker_icon, infoBlue, warning_icon } from '../../../../../assets';
import { cStyles } from '../../calculator.style';
import { Trans } from 'react-i18next';

const typeStyles = {
    BLOCKED: {
        colorCard: plaiStyles.blockingCard,
        colorFont: plaiStyles.fontRed,
        fontStyle: {},
        iconImage: blocker_icon,
    },
    WARNING: {
        colorCard: plaiStyles.warningCard,
        colorFont: plaiStyles.fontOrange,
        fontStyle: cStyles.textWarning,
        iconImage: warning_icon,
    },
    INFO: {
        colorCard: plaiStyles.infoCard,
        colorFont: plaiStyles.fontBlue,
        fontStyle: {},
        iconImage: infoBlue,
    },
};

export const NoticeBar = ({
    message,
    type = 'BLOCKED',
    img = false,
    url,
}: noticeBarType) => {
    const { colorCard, colorFont, fontStyle, iconImage } = typeStyles[type] || typeStyles.BLOCKED;

    return (
        <View style={[plaiStyles.mt16, plaiStyles.px12, plaiStyles.py16, colorCard, plaiStyles.flex, plaiStyles.row]}>
            {img ? <Image style={[plaiStyles.mr8, plaiStyles.mt4]} source={iconImage} /> : <></>}
            <Text style={[colorFont, plaiStyles.font12, plaiStyles.lineH16, fontStyle, plaiStyles.pr12, plaiStyles.flexShrink]}>
                <Trans
                    i18nKey={message} // `message` is the translation key or plain string
                    components={{
                        i: <Text style={[{ fontStyle: 'italic' }, colorFont]} />,
                        b: <Text style={[{ fontWeight: 'bold' }, colorFont]} />,
                        u: <Text style={{ textDecorationLine: 'underline' }} />,
                        pru: <Text style={{ color: 'red' }} />,
                        // untuk sementara satu link saja dan belum dinamis, nanti di enchancement lebih dinamis saat di butuhkan
                        linking: <Text style={[{ textDecorationLine: 'underline' }, colorFont, plaiStyles.font12]} onPress={() => Linking.openURL(url!)} />
                    }}
                />
            </Text>
        </View>
    );
};
