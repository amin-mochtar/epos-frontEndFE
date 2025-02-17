import React, { useState } from "react";
import { CaptionProductType } from "./caption-product.type";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { plaiStyles } from "plai_common_frontend";

export const CaptionProduct = ({
    caption
}: CaptionProductType) => {
    const [showMore, setShowMore] = useState(false);
    return (
        <View>
            <Text style={[plaiStyles.font14, plaiStyles.fontGrey66Thin, plaiStyles.lineH20]}>
                {!showMore && caption.length > 60 ? `${String(caption).slice(0, 60)}...` : caption}
                <Text onPress={() => { setShowMore(!showMore) }} style={[plaiStyles.font14, plaiStyles.fontRedThin, plaiStyles.lineH20]}>
                    {showMore ? " Sembunyikan" : " Lihat Selengkapnya"}
                </Text>
            </Text>
        </View>
    );
}