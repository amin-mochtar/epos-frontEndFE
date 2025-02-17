import { StyleProp, View, ViewStyle, Text } from 'react-native';
import React, { FC, useMemo, useState } from 'react';
import Icon from 'react-native-vector-icons/Feather';
import { StackActions, useNavigation, useRoute } from '@react-navigation/native';
import { ModalMenu, plaiStyles } from 'plai_common_frontend';
import { EposDoksulRoutes, EposRoutes } from '../../navigation';
import { AppRoutes } from 'common_services_frontend';
import { useObject } from '../../database';
import { useSelector } from 'react-redux';
//@ts-ignore
import { RootState } from 'redux/reducer';
import { EposState } from '../../redux';
import { WR_SHARIA_CONVENT, ISQSDetail, ISummaryProposal } from '../../utilities';
import { pruTestID } from 'common_services_frontend';
import { DATE_TIME_BUILD } from '@env'
import { additionalFormRoutes, sqsIlustrationRoutes } from './header-config';

type Props = {
  title?: string;
  variant?: 'default' | 'back-button'
  wrapperStyle?: StyleProp<ViewStyle>;
  onPressSpajCompleteness?: () => void;
  onBack?: () => void;

  /** Additional Title true is for only show default value, inject string to params for new value */
  additionalTitle?: boolean | string;
};

export const EposHeader: FC<Props> = ({ wrapperStyle, onPressSpajCompleteness, title, variant = 'default', onBack, additionalTitle = false }) => {
  const route = useRoute();
  const { selectedSQSId, proposalId, isDoksul } = useSelector<RootState, EposState>((state) => state.epos);
  const RSQSData = useObject<ISQSDetail>('SQSDetail', selectedSQSId as never);
  const SummaryById = useObject<ISummaryProposal>('SummaryProposal', proposalId as never);
  const navigation = useNavigation();
  const [openMenu, setOpenMenu] = useState(false);
  const headerDoksul = ['Lihat Dokumen Susulan', 'Beranda'];

  const isBackButton = variant === 'back-button';

  const listButton = useMemo(() => {

    const button = [
      {
        text: isDoksul ? headerDoksul[0] : 'Lihat Daftar Proposal',
        onPress: () => {
          if (isDoksul) {
            navigation.navigate(EposDoksulRoutes.EPOSDOKSUL, { screen: EposDoksulRoutes.LANDING_DOKSUL });

          } else {
            navigation.dispatch(StackActions.replace(EposRoutes.LANDING))
          }
        },
      },
      {
        text: 'Lihat Prospek',
        onPress: () => navigation.dispatch(StackActions.replace(AppRoutes.SALES_ENTRY)),
      },
      {
        text: 'Beranda',
        onPress: () => navigation.navigate(AppRoutes.HOME),
      },
    ];
    if (SummaryById?.spajId && route.name !== EposRoutes.SPAJ_DATA_COMPLETENESS && !sqsIlustrationRoutes.includes(route.name) && !additionalFormRoutes.includes(route.name)) {
      const spajType = WR_SHARIA_CONVENT[RSQSData?.policyType ?? 'conventional'].spaj;
      button.unshift({
        text: `Daftar Kelengkapan Data ${spajType}`,
        onPress: () => {
          onPressSpajCompleteness?.();
          navigation.dispatch(StackActions.replace(EposRoutes.SPAJ_DATA_COMPLETENESS));
        },
      });
    }

    return button;
  }, [route.name, SummaryById?.spajId, RSQSData?.policyType, navigation, onPressSpajCompleteness]);

  const listButtonDoksul = listButton.filter((item) => headerDoksul.includes(item.text));
  const dataModalMenu = isDoksul ? listButtonDoksul : listButton

  const content = useMemo(() => {
    if (isBackButton) {
      return (
        <View style={[plaiStyles.justifyBetween, plaiStyles.row]}>
          <View style={[plaiStyles.row, plaiStyles.alignCenter]}>
            <Icon name={'arrow-left'} size={24} onPress={onBack} {...pruTestID('epos-left-icon-header-back')} />
            <Text style={[plaiStyles.ml8, plaiStyles.fontBlackBold, plaiStyles.font20]}>
              {title ?? 'Page Title'}
            </Text>
          </View>
          <Icon name={'menu'} size={24} onPress={() => setOpenMenu(true)} {...pruTestID('epos-left-icon-header-hamburger')} />
        </View>);
    }
    return (
      <View style={[plaiStyles.justifyBetween, plaiStyles.row, plaiStyles.alignCenter]}>
        <Icon name={'menu'} size={24} onPress={() => setOpenMenu(true)} {...pruTestID('epos-left-icon-header-hamburger')} />
        <Text style={[plaiStyles.fontGrey66Thin, plaiStyles.font10]}>{DATE_TIME_BUILD ? `Build ${DATE_TIME_BUILD}` : ''}</Text>
      </View>
    );
  }, [title, onBack]);

  const contentAdditionalTitle = useMemo(() => {
    const additionalTitleText = typeof additionalTitle === 'string' ? additionalTitle : 'MENGERTI KEBUTUHAN ANDA';
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
  }, [additionalTitle])

  return (
    <View style={[plaiStyles.mt12]}>
      <View style={[plaiStyles.mb24, wrapperStyle]}>
        {content}
        <ModalMenu data={dataModalMenu} visible={openMenu} onClose={() => setOpenMenu(false)} />
      </View>
      {additionalTitle && contentAdditionalTitle}
    </View>
  );
};
