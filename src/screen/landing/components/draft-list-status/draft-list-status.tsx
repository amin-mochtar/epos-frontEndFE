import React from "react";
import { Image, Text, View } from "react-native";
import { loadingGif, plaiStyles } from "plai_common_frontend";
import { DraftListStatusType } from "./draft-list-status.type";

export const DraftListStatus = ({
    image,
    type,
    title,
    subTitle,
    onPress
}: DraftListStatusType) => {
    return (
        <View style={[plaiStyles.spacing, plaiStyles.spacingp, plaiStyles.flex, plaiStyles.alignCenter]}>
            <View style={[plaiStyles.justifyCenter, plaiStyles.flex, plaiStyles.alignCenter]}>
                <Image source={image} style={{ width: 101, height: 101 }} />
                <Text style={[plaiStyles.textCenter, plaiStyles.font18, plaiStyles.fontBold, plaiStyles.lineH24]}>{title}</Text>
                <Text style={[plaiStyles.textCenter, plaiStyles.font14, plaiStyles.fontGrey66Thin, plaiStyles.lineH20, plaiStyles.mt16]}>{subTitle}</Text>
            </View>
        </View>
    );
}