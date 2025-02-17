import { plaiStyles } from "plai_common_frontend"
import { View, Text, ViewStyle, ImageStyle } from "react-native"
type TProps = {
    children?: string;
    textStyle: (ViewStyle | ImageStyle | Record<string, string>)[];
}
export const AsteriskWrapper = (props: TProps) => {
    const textStyleColor = props?.textStyle?.[0]?.color || '#666666';
    return (
        <View style={[plaiStyles.row, plaiStyles.alignCenter]}>
            {/* Left Parenthesis */}
            <Text style={[plaiStyles.font8, { color: textStyleColor }]}>{'('}</Text>
            <Text style={[plaiStyles.font12, plaiStyles.lineH18, , { color: textStyleColor, textAlignVertical: 'center' }]}>
                {props.children}
            </Text>

            {/* Right Parenthesis */}
            <Text style={[plaiStyles.font8, { color: textStyleColor }]}>{') '}</Text>

        </View>
    )
}