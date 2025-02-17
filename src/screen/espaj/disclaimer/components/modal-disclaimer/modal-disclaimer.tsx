import { ModalContainer, plaiStyles, TextDecoration } from 'plai_common_frontend';
import { FlatList, ListRenderItemInfo, Text, TouchableWithoutFeedback, View } from 'react-native';
import { NoticeBar } from '../../../../esqs/calculator/components';
import { pruTestID } from 'common_services_frontend';
import { useTranslation } from 'react-i18next';
import { Control, Controller } from 'react-hook-form';
import { Button } from 'common_ui_components/app/components-ui';
import { OptionCard, TOptionalCardData } from '../../../../../components';
import { TDisclaimerDescItem, TDisclaimerItem, TFormDisclaimer } from '../../disclaimer.type';
import { useCallback } from 'react';
import { additionalValidationSPAJModal } from '../../../../../utilities';

type Props = {
  isVisible: boolean;
  isButtonValid?: boolean;
  disclaimer?: TDisclaimerItem;
  control?: Control<TFormDisclaimer, any>;
  additionalQuestionTitle?: string;
  onClose?: () => void;
  onAgree?: () => void;
  onScroll?: (event: any) => void;
  onOpenLink?: (url: string, index: number) => void;
  onEndReached?: ((info: { distanceFromEnd: number }) => void) | null | undefined;
  onChangeAdditionalValidation: (value: TOptionalCardData, onChange: any) => void;
};

const ModalDisclaimer = ({
  isVisible,
  isButtonValid,
  disclaimer,
  control,
  additionalQuestionTitle,
  onClose,
  onScroll,
  onOpenLink,
  onEndReached,
  onChangeAdditionalValidation,
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
    if (item?.redBg)
      return (
        <View style={[plaiStyles.mt4]}>
          <NoticeBar message={item?.key} type={'BLOCKED'} img={true} />
        </View>
      );
    if (item.url) {
      const key = item.key || item.termkey || item.subkey;
      const urls = extractLink(key);
      const newText = key.split(urls)[0].trim();
      if (index > 0) {
        return (
          <Text style={item.termkey || item.subkey?[plaiStyles.pl24]:[]}>
            {newText}
            <Text style={{ color: 'red' }} {...pruTestID(`link-content-${item.key}`)}>
              {' ' + urls}
            </Text>
          </Text>
        );
      }
    }
    return (
      <View>
        {item.id !== undefined && item?.key && (
          <View style={[plaiStyles.flex, plaiStyles.row]}>
            <Text>{item.id !== '-' ? item.id : '\t'}</Text>
            <Text style={[plaiStyles.flex, plaiStyles.flexWrap, plaiStyles.lineH20]}>
              <TextDecoration label={item.key} />
            </Text>
          </View>
        )}
        <View style={[plaiStyles.flex, plaiStyles.row, plaiStyles.pl24]}>
          {item.subid !== undefined && item.subkey && (
            <>
              <Text>{item.subid !== '-' ? item.subid : '\t'}</Text>
              <Text style={[plaiStyles.flex, plaiStyles.flexWrap, plaiStyles.lineH20]}>
                <TextDecoration label={item.subkey} />
              </Text>
            </>
          )}
          {item.termid !== undefined && item.termkey && (
            <View style={[plaiStyles.flex, plaiStyles.row, plaiStyles.pl24]}>
              <Text>{item.termid !== '-' ? item.termid : '\t'}</Text>
              <Text style={[plaiStyles.flex, plaiStyles.flexWrap, plaiStyles.lineH20]}>
                <TextDecoration label={item.termkey} />
              </Text>
            </View>
          )}
        </View>
      </View>
    );
  };

  const renderItem = useCallback(
    ({ item, index }: ListRenderItemInfo<TDisclaimerDescItem>) => {
      const key = item.key || item.termkey || item.subkey;
      const url = extractLink(key);
      let indexURL = null
      if(url){
        const regex = new RegExp('Ketiga', 'i')
        const regex2 = new RegExp('Privasi', 'i')
        if(regex.test(url)){
          indexURL = 1
        } else if(regex2.test(url)){
          indexURL = 2
        }
      }
      return (
        <View>
          <TouchableWithoutFeedback onPress={() => url && onOpenLink?.(url, index)}  {...(url && pruTestID(`link-${indexURL}`))}>
            <View style={{ marginBottom: 10 }} key={`${index}v`}>
              {_renderSpecialText(item, index)}
              {disclaimer?.adiitionalQuestion && index == disclaimer?.desc.length - 1 && (
                <Controller
                  name={'additionalValidationSPAJModal'}
                  control={control}
                  // rules={ValidationForm({ isRequired: true })}
                  key={`${index}c`}
                  render={({ field: { value, onChange } }) => (
                    <>
                      <View style={[plaiStyles.flex, plaiStyles.row]}>
                        <Text style={[plaiStyles.fontGrey33, plaiStyles.lineH20, plaiStyles.mt24, plaiStyles.pr16]}>
                          {additionalQuestionTitle}
                          <Text style={[plaiStyles.fontRed, plaiStyles.py24]}> *</Text>
                        </Text>
                      </View>
                      <OptionCard
                        data={additionalValidationSPAJModal}
                        theme="border"
                        style={[plaiStyles.row]}
                        spaceItem={8}
                        insideStyle={[plaiStyles.flex]}
                        selected={value}
                        onSelected={(valueItem) => onChangeAdditionalValidation(valueItem, onChange)}
                        uniqueTestId="additional-question"
                      />
                    </>
                  )}
                />
              )}
            </View>
          </TouchableWithoutFeedback>
        </View>
      );
    },
    [_renderSpecialText, control, disclaimer, additionalQuestionTitle, onChangeAdditionalValidation, onOpenLink],
  );

  return (
    <ModalContainer
      visible={isVisible}
      onClose={onClose}
      type="bottom"
      disabledBackdropPress={true}
      titleHeader={disclaimer?.information}
    >
      <FlatList
        data={disclaimer?.desc}
        style={[plaiStyles.mt8]}
        renderItem={renderItem}
        keyExtractor={(item, index) => (item.key ? item.key.toString() : `default-key-${index}`)}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.05}
        onScroll={onScroll}
      />
      <Button
        style={[isButtonValid ? plaiStyles.bgBtnRed : plaiStyles.bgBtnDisabled, plaiStyles.mt24]}
        textStyle={plaiStyles.fontWhite}
        text={t('Epos:agree')}
        onPress={onAgree}
        disabled={!isButtonValid}
        {...pruTestID(`button-agree-${disclaimer?.key}`)}
      />
    </ModalContainer>
  );
};
export default ModalDisclaimer;
