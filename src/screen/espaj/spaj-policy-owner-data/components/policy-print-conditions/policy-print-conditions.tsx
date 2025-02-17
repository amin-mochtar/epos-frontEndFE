import { ModalContainer, plaiStyles, TextDecoration } from "plai_common_frontend"
import React, { memo } from "react"
import { FlatList, Image, Pressable, Text, View } from "react-native"
import { infoRed } from '../../../../../assets'
import { useTranslation } from "react-i18next"
import { Button } from 'common_ui_components/app/components-ui';
import { TPolicyPrintConditions } from "./policy-print-conditions.type"

const RenderPrintPolicy = ({ item, index }: { item: any; index: number; }) => (
  <View style={[plaiStyles.flex, plaiStyles.row]} key={index}>
    <Text style={[plaiStyles.fontGrey33Thin, plaiStyles.lineH24, plaiStyles.mr4]}>{`${index + 1}. `}</Text>
    <View style={[plaiStyles.flex]}>
      <Text style={[plaiStyles.fontGrey33Thin, plaiStyles.lineH24, plaiStyles.flexWrap]}>
        <TextDecoration label={item?.key} />
      </Text>
      {item.subKey?.length > 0 &&
        item.subKey.map((subItem: any, subIndex: number) => (
          <View style={[plaiStyles.flex, plaiStyles.row]}>
            <Text style={[plaiStyles.mr4, plaiStyles.lineH24]}>{subItem?.key}</Text>
            <Text key={subIndex} style={[plaiStyles.fontGrey33Thin, plaiStyles.lineH24, plaiStyles.flex]}>
              <TextDecoration label={subItem?.item} />
            </Text>
          </View>
        ))}
    </View>
  </View>
);

export const PolicyPrintConditions = memo(({ onOpenModal, onCloseModal, visible, setVisibe, data }: TPolicyPrintConditions) => {
  const { t } = useTranslation();

  return (
    <>
      <Pressable
        style={[plaiStyles.flex, plaiStyles.mt16, plaiStyles.row]}
        onPress={onOpenModal}
      >
        <Image style={[plaiStyles.mr8, plaiStyles.selfCenter]} source={infoRed} />
        <Text style={[plaiStyles.fontRed, plaiStyles.selfCenter]}>{t('Epos:see_policy_printing_terms')}</Text>
      </Pressable>

      <ModalContainer
        visible={visible}
        onClose={setVisibe}
        type="bottom"
        disabledBackdropPress={true}
        titleHeader={t('Epos:policy_terms_printed')}
      >
        <FlatList
          data={data}
          style={[plaiStyles.mt8]}
          renderItem={({ item, index }) => {
            return <RenderPrintPolicy item={item} index={index} />;
          }}
          keyExtractor={(item) => item.key.toString()}
        />
        <Button
          style={[plaiStyles.bgBtnRed, plaiStyles.mt24]}
          textStyle={plaiStyles.fontWhite}
          text={t('Epos:agree')}
          onPress={onCloseModal}
        />
      </ModalContainer>
    </>
  )
})