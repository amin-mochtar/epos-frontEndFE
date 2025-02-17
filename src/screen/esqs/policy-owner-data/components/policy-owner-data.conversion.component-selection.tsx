import { View, Text, FlatList, Pressable, ListRenderItemInfo } from 'react-native';
import React, { memo, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RegisteredType, TSelection, TSelectionData } from './selection.type';
import { plaiStyles, ModalContainer, Divider, SearchInput, ShapeItem, NotFoundComponent } from 'plai_common_frontend';
import { Button } from 'common_ui_components/app/components-ui';
import { ICustomerStorage } from '../../../../utilities';

export const ListRegisteredClient = memo(
  ({
    titleHeader,
    keyMap,
    visible,
    onClose,
    data,
    theme = 'radio-button',
    selected,
    onSelected,
    group,
    button,
    search,
    disabledBackdropPress = false,
    disabled = true,
  }: TSelection) => {
    const [visibleData, setVisibleData] = useState<ICustomerStorage[]>([]);
    const [masterData, setMasterData] = useState<ICustomerStorage[]>([]);
    const [selectedData, setSelectedData] = useState<ICustomerStorage | undefined>(selected);
    const [selectedWindow, setSelectedWindow] = useState<RegisteredType>('registered');
    const { t } = useTranslation();
    const buttonStyle =
      !selectedData && disabled
        ? [plaiStyles.btnMedium, plaiStyles.flex, plaiStyles.bgGrey]
        : [plaiStyles.btnMedium, plaiStyles.flex, plaiStyles.bgBtnRed];

    // Update data yang akan dirender berdasarkan selectedWindow
    useEffect(() => {
      setMasterData(data[selectedWindow]);
      if (selectedWindow) setSelectedData(undefined);
    }, [data, selectedWindow]);

    // Memperbarui visibleData setiap kali masterData berubah
    useEffect(() => {
      setVisibleData(masterData);
    }, [masterData]);

    // Fungsi untuk mengubah selectedWindow
    const handleWindowSelection = (windowName: any) => {
      setSelectedWindow(windowName);
    };

    useEffect(() => {
      setSelectedData(selected);
    }, [data, visible]);

    const filterData = (value: string) => {
      const minLengthSearch = search?.minLength || 0;
      if (value.length >= minLengthSearch) {
        const _tempData =
          value == ''
            ? masterData
            : [...masterData].filter((item) => {
              const dataSearch = item[keyMap?.search ?? 'clientName'] as string;
              const match = dataSearch.toLowerCase().match(new RegExp(`${value.toLocaleLowerCase()}`, 'g'));
              return match != null;
            });
        setVisibleData(_tempData);
      }
    };

    const handleSearch = (value: unknown) => {
      filterData(value as string);
    };

    const onChangeText = (value: unknown) => {
      if (search?.isOnChangeSearch) {
        filterData(value as string);
      }
    };

    const onSelectedData = (item: ICustomerStorage) => {
      if (button?.primaryOnPress) {
        setSelectedData(item);
      } else {
        onSelected?.(item);
      }
    };

    const onPrimaryPress = () => {
      if (selectedData) {
        onSelected?.(selectedData);
      }
      if (button?.primaryOnPress) button?.primaryOnPress();
    };

    const renderItem = ({ item, index }: ListRenderItemInfo<ICustomerStorage>) => {
      const _key = keyMap?.value || 'clientId';
      const _isSelected = selectedData
        ? Array.isArray(selectedData)
          ? selectedData.findIndex((_value) => _value[_key] == item[_key]) > -1
          : selectedData[_key] == item[_key]
        : false;

      return (
        <React.Fragment key={index}>
          <Pressable key={`selction-item-${index}`} onPress={() => onSelectedData(item)}>
            <View
              style={[
                plaiStyles.row,
                plaiStyles.alignCenter,
                plaiStyles.mt12,
                plaiStyles.spacingp,
                plaiStyles.mt0,
                _isSelected && [plaiStyles.bgF4, plaiStyles.br12],
              ]}
            >
              <ShapeItem isSelected={_isSelected} size={24} mode={theme == 'radio-button' ? 'radio' : 'check'} />
              <View style={[plaiStyles.flex, plaiStyles.column]}>
                <Text style={[plaiStyles.fontGrey33Bold, plaiStyles.ml16, plaiStyles.flexShrink]}>{`${item[keyMap?.label || 'clientName']
                  }`}</Text>
                {selectedWindow === 'registered' && (
                  <Text style={[plaiStyles.fontGrey33Thin, plaiStyles.ml16, plaiStyles.flexShrink, plaiStyles.mt4]}>{`${item[keyMap?.subLabel || 'clientId']
                    }`}</Text>
                )}
              </View>
            </View>
          </Pressable>
        </React.Fragment>
      );
    };

    return (
      <>
        <ModalContainer
          type="bottom"
          titleHeader={titleHeader}
          visible={visible}
          onClose={onClose}
          isSpacing={false}
          disabledBackdropPress={disabledBackdropPress}
          avoidingKeyboard={true}
        >
          {keyMap?.search && (
            <View style={[plaiStyles.mb16, plaiStyles.px20]}>
              <SearchInput
                style={[plaiStyles.mb8, plaiStyles.fontBlack]}
                onChange={onChangeText}
                onSubmitEditing={handleSearch}
                placeholderTip="Cari Nasabah"
              />
            </View>
          )}
          <View style={[plaiStyles.mb16, plaiStyles.borderbThin, plaiStyles.row, plaiStyles.justifyAround]}>
            <Pressable onPress={() => handleWindowSelection('registered')}>
              {({ pressed }) => (
                <View
                  style={[
                    plaiStyles.mb4,
                    plaiStyles.alignCenter,
                    pressed && { opacity: 0.5 },
                    plaiStyles.px24,
                    plaiStyles.pb8,
                    selectedWindow === 'registered' && plaiStyles.borderbRed,
                  ]}
                >
                  <Text style={[plaiStyles.fontGrey66Bold, plaiStyles.font16]}>Nasabah Terdaftar</Text>
                </View>
              )}
            </Pressable>
            <View style={[plaiStyles.px20]} />
            <Pressable onPress={() => handleWindowSelection('draft')}>
              {({ pressed }) => (
                <View
                  style={[
                    plaiStyles.mb4,
                    plaiStyles.alignCenter,
                    pressed && { opacity: 0.5 },
                    plaiStyles.px24,
                    plaiStyles.pb8,
                    selectedWindow === 'draft' && plaiStyles.borderbRed,
                  ]}
                >
                  <Text style={[plaiStyles.fontGrey66Bold, plaiStyles.font16]}>Nasabah Draft</Text>
                </View>
              )}
            </Pressable>
          </View>
          <FlatList
            style={plaiStyles.px16}
            data={visibleData}
            renderItem={renderItem}
            keyExtractor={(item, index) => `${item.clientId}-${index}`}
            initialNumToRender={20}
            maxToRenderPerBatch={60}
            updateCellsBatchingPeriod={60 / 2}
            removeClippedSubviews={true}
            keyboardShouldPersistTaps="always"
            ListEmptyComponent={EmptyList}
          />
          <View style={[plaiStyles.pt12, plaiStyles.row, plaiStyles.px16]}>
            {button?.type == 'two' && (
              <>
                <Button
                  style={[plaiStyles.bgBtnSecondary, plaiStyles.btnMedium, plaiStyles.flex]}
                  textStyle={[plaiStyles.fontRed]}
                  onPress={button.secondaryOnPress}
                  text={button.secondaryText}
                />
                <Divider width={24} />
              </>
            )}
            {button && (
              <Button
                style={buttonStyle}
                onPress={onPrimaryPress}
                text={button.primaryText || 'Simpan'}
                disabled={!selectedData && disabled}
              />
            )}
          </View>
        </ModalContainer>
      </>
    );
  },
);

//#region CHILD COMPONENT
const EmptyList = () => {
  return (
    <NotFoundComponent
      title="Belum Ada Data"
      description="Saat ini belum ada daftar nasabah yang telah disinkronisasikan. Lakukan sinkronisasi dengan menekan tombol List Client."
    />
  )
}
//#endregion
