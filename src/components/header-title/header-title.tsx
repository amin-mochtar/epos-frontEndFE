import { StyleProp, View, ViewStyle, Text, TextStyle } from 'react-native';
import React, { FC, useEffect, useMemo, useState } from 'react';
import { plaiStyles } from 'plai_common_frontend';

type Props = {
    title?: string;
    /** Tag Title true is for only show default value, inject string to params for new value */
    tagTitle?: boolean | string;

    /** Title Style is Text Style Type for Override Text Style for Title */
    titleStyle?: TextStyle | TextStyle[] | undefined | null;

    /** Description Title is description for Title that text is below and font size smaller than Title */
    descriptionTitle?: string;

    /** Description Style is Text Style Type for Override Text Style for Description Text */
    descriptionStyle?: TextStyle | TextStyle[] | undefined | null;
};

export const HeaderTitle: FC<Props> = ({
    tagTitle = false,
    title = '',
    titleStyle,
    descriptionTitle,
    descriptionStyle
}) => {
    const contentAdditionalTitle = useMemo(() => {
        const additionalTitleText = typeof tagTitle === 'string' ? tagTitle : 'MENGERTI KEBUTUHAN ANDA';
        return (
            <View
                style={[
                    plaiStyles.selfStart,
                    plaiStyles.px8,
                    plaiStyles.py4,
                    plaiStyles.bgBtnRedLight,
                    plaiStyles.br4,
                    plaiStyles.mb8
                ]}
            >
                <Text style={[plaiStyles.font14, plaiStyles.fontBold, plaiStyles.fontRedBold]}>{additionalTitleText}</Text>
            </View>
        )
    }, [tagTitle])
    return (
        <View>
            {tagTitle && contentAdditionalTitle}
            {title && <Text style={titleStyle ?? [plaiStyles.fontHeaderTitle, plaiStyles.mb8]}>{title}</Text>}
            {descriptionTitle && <Text style={descriptionStyle ?? [plaiStyles.fontHeaderSubTitle, plaiStyles.mt8]}>{descriptionTitle}</Text>}
        </View>
    )
}