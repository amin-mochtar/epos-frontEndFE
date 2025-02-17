import { pruTestID } from "common_services_frontend";
import { ModalContainer, plaiStyles, TextDecoration } from 'plai_common_frontend';
import { FlatList, ListRenderItemInfo, Text, TouchableWithoutFeedback, View } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Button } from 'common_ui_components/app/components-ui';
import { useCallback } from 'react';
type TModalAgreementDesc = {
    key: string;
    id: string | number;
    url?: boolean;
    isGreyThinFontColor?: boolean;
}
type TModalAgreementItem = {
    label: string;
    key: string;
    desc: TModalAgreementDesc[];
    information: string;
};
type Props = {
    isVisible: boolean;
    isButtonValid?: boolean;
    agreementModalItem?: TModalAgreementItem;
    onClose?: () => void;
    onAgree?: () => void;
    onScroll?: (event: any) => void;
    onOpenLink?: (url: string, index: number) => void;
    onEndReached?: ((info: { distanceFromEnd: number }) => void) | null | undefined;
};

const ModalAgreementProviderData = ({
    isVisible,
    isButtonValid,
    agreementModalItem,
    onClose,
    onScroll,
    onOpenLink,
    onEndReached,
    onAgree,
}: Props) => {
    const { t } = useTranslation();
    const extractLink = (text?: string) => {
        if (typeof text !== 'string') return '';
        const match = text.match(/(http[s]?:\/\/[^\s]+)/g);
        return match ? match[0] : null;
    };

    const _renderSpecialText = (item: any, index: number) => {
        if (item?.boldText) return <Text style={[plaiStyles.fontBold]}>{item.key}</Text>;
        if (item?.url) {
            const urls = extractLink(item.key);
            const newText = item.key.split(urls)[0];
            const afterUrlText = item.key.split(urls)[item.key.split(urls).length - 1]
            if (index > 0) {
                return (
                    <View style={[plaiStyles.flex, plaiStyles.row]}>
                        <Text>{item.id !== '-' ? item.id : '\t'}</Text>
                        <Text style={[plaiStyles.lineH20]}>
                            <TextDecoration label={newText} />
                            <Text style={{ color: 'red' }} {...pruTestID(`link-${item.key}`)}>
                                {urls}
                            </Text>
                            <TextDecoration label={afterUrlText} />
                        </Text>
                    </View>
                );
            }
        }
        return (
            <View>
                {item.id !== undefined && item?.key && (
                    <View style={[plaiStyles.flex, plaiStyles.row]}>
                        <Text>{item.id !== '-' ? item.id : ''}</Text>
                        <Text style={[plaiStyles.flex, plaiStyles.flexWrap, plaiStyles.lineH20, item?.isGreyThinFontColor ? plaiStyles.fontGrey66Thin : {}]}>
                            <TextDecoration label={item.key} />
                        </Text>
                    </View>
                )}
            </View>
        );
    };

    const renderItem = useCallback(
        ({ item, index }: ListRenderItemInfo<TModalAgreementDesc>) => {
            const url = extractLink(item.key);
            return (
                <View style={[plaiStyles.px8, plaiStyles.pr12]}>
                    <TouchableWithoutFeedback onPress={() => url && onOpenLink?.(url, index)} key={`${index}touch`}>
                        <View style={{ marginBottom: 10 }} key={`${index}v`}>
                            {_renderSpecialText(item, index)}
                        </View>
                    </TouchableWithoutFeedback>
                </View>
            );
        },
        [_renderSpecialText, agreementModalItem, onOpenLink],
    );

    return (
        <ModalContainer
            visible={isVisible}
            onClose={onClose}
            type="bottom"
            disabledBackdropPress={true}
            titleHeader={agreementModalItem?.information}
        >
            <FlatList
                data={agreementModalItem?.desc}
                style={[plaiStyles.mt8]}
                renderItem={renderItem}
                keyExtractor={(item, index) => (item.key ? item.key.toString() : `default-key-${index}`)}
                onEndReached={onEndReached}
                onEndReachedThreshold={0.1}
                onScroll={onScroll}
            />
            <Button
                style={[isButtonValid ? plaiStyles.bgBtnRed : plaiStyles.bgBtnDisabled, plaiStyles.mt24]}
                textStyle={plaiStyles.fontWhite}
                text={t('Epos:agree')}
                onPress={onAgree}
                disabled={!isButtonValid}
                {...pruTestID(`button-agree-${agreementModalItem?.key}`)}
            />
        </ModalContainer>
    );
};
export default ModalAgreementProviderData;
