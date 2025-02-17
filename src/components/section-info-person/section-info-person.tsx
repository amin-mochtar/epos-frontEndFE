import { View, Text, StyleProp, ViewStyle } from 'react-native';
import React, { memo } from 'react';
import { plaiStyles, TextDecoration } from 'plai_common_frontend';
import { useTranslation } from 'react-i18next';

type TSectionInfoPerson = {
	labelLeft?: string,
	keyLeft: string,
	labelRight?: string,
	keyRight: string,
	type?: string,
	containerStyle?: StyleProp<ViewStyle>;
}

export const SectionInfoPerson = memo(({ keyLeft, labelLeft, keyRight, labelRight, type, containerStyle }: TSectionInfoPerson) => {
	const { t } = useTranslation();

	const _labelLeft = type == 'agent' ? t('Epos:name_of_marketer') : type == 'PH' ? t('Epos:policyholder_name') : labelLeft;

	const _labelRight = type == 'agent' ? t('Epos:marketer_code') : type == 'PH' ? t('Epos:phone_number') : labelRight;

	return (
		<View
			style={[
				plaiStyles.row,
				plaiStyles.justifyBetween,
				plaiStyles.alignStart,
				containerStyle
			]}
		>
			<View style={[plaiStyles.flex]}>
				<Text style={[plaiStyles.mb4, plaiStyles.fontGrey99Thin]}>{_labelLeft}</Text>
				<Text style={[plaiStyles.mb4, plaiStyles.fontGrey33]}>{keyLeft}</Text>
			</View>
			<View style={[plaiStyles.flex]}>
				<Text style={[plaiStyles.mb4, plaiStyles.fontGrey99Thin, plaiStyles.textEnd]}>
					<TextDecoration label={_labelRight} additionalStyle={{ bold: [plaiStyles.fontGrey99Thin] }} />
				</Text>
				<Text style={[plaiStyles.mb4, plaiStyles.fontGrey33, plaiStyles.textEnd]}>{keyRight}</Text>
			</View>
		</View>
	);
});
