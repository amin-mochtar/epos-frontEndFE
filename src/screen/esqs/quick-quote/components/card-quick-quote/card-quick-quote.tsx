import React, { useMemo, useState } from 'react';
import { Pressable, Text, View } from 'react-native';
import { DetailProduct } from '../detail-product/detail-product';
import { Button } from 'common_ui_components/app/components-ui';
import Icon from 'react-native-vector-icons/Feather';
import { Divider, ModalMenu, numberWithCommas, plaiStyles } from 'plai_common_frontend';
import { cQQStyle } from './card-quick-quote.style';
import { StackActions, useNavigation } from '@react-navigation/native';
import { EposRoutes } from '../../../../../navigation';
import { useDispatch } from 'react-redux';
import { updateEposState, SQS_STATE } from '../../../../../redux';
import { useTranslation } from 'react-i18next';
import { WR_SHARIA_CONVENT, ICustomerStorage, ISQSDetail, IQuickQuoteResult } from '../../../../../utilities';
import { TCalculateForm } from '../../../calculator/calculator.type';

type CardQuickQouteProps = {
  active: boolean;
  quickQouteNumber: number;
  data: IQuickQuoteResult;
  onPress: () => void;
  onDelete?: (id: string) => void;
  sqsCount: number;
};

export const CardQuickQoute = ({
  active,
  quickQouteNumber,
  data,
  onPress,
  onDelete,
  sqsCount,
}: CardQuickQouteProps) => {
  const navigation = useNavigation();
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const [changeQQMenu, setChangeQQMenu] = useState(false);
  const [otherMenu, setOtherMenu] = useState(false);

  /** Data Not Change (Memo) Add Here */
  // const { calculatorData, product, isProductPWM, label } = useMemo(() => {
  //   const product = data.product;
  //   let _label = {
  //     monthlyIncome: 'Premi',
  //     compensation: t('Epos:sum_insured'),
  //   };
  //   if (isSyariah) {
  //     _label = {
  //       monthlyIncome: 'Kontribusi',
  //       compensation: t('Epos:insurance_compensation'),
  //     };
  //   }

  //   return {
  //     calculatorData: JSON.parse(data.calculator!) as TCalculateForm,
  //     product,
  //     isProductPWM: product?.key === 'H14' || product?.key === 'H15',
  //     label: WR_SHARIA_CONVENT[data?.policyType || 'conventional'],
  //   };
  // }, [data?.product]);

  // const saverValue = useMemo(() => {
  //   let value = '-';
  //   if (calculatorData.topupBenefits.length > 0 && calculatorData?.topupBenefits[0]?.regularTopupPremium) {
  //     value = `Rp${calculatorData.topupBenefits[0].regularTopupPremium}`;
  //   }
  //   return value;
  // }, [calculatorData]);

  const otherMenus = useMemo(() => {
    let menus = [
      {
        text: 'Bagikan',
        onPress: () => navigation.dispatch(StackActions.push(EposRoutes.ILLUSTRATION_SHARE)),
      },
      {
        text: 'Hapus',
        onPress: () => onDelete?.(data?.sqsId ?? ''),
      },
    ];

    return menus;
  }, [sqsCount, onDelete]);

  const changeMenu = useMemo(() => {
    return [
      {
        text: 'Daftar Informasi / Budget',
        onPress: () => onChangeQQSection(EposRoutes.POLICY_OWNER_DATA),
      },
      {
        text: 'Tujuan Keuangan / Goal',
        onPress: () => onChangeQQSection(EposRoutes.INSURANCE_GOALS),
      },
      {
        text: 'Produk Manfaat / Dana',
        onPress: () => onChangeQQSection(EposRoutes.PRODUCT_RECOMMENDATION),
      },
      {
        text: `Nilai ${data.isSharia? "Kontribusi": "Premi"} / Alokasi Manfaat`,
        onPress: () => onChangeQQSection(EposRoutes.CALCULATOR),
      },
    ];
  }, [data, active]);

  // const insuranceGoal = useMemo(() => {
  //   if (data?.insuranceGoal.length <= 1) {
  //     return data?.insuranceGoal[0];
  //   }
  //   return data?.insuranceGoal.slice(0, -1).join(', ') + ' & ' + data?.insuranceGoal?.pop();
  // }, []);

  const onChangeQQSection = (path: string) => {
    if (path && active) {
      dispatch(
        updateEposState({
          sqsState: SQS_STATE.CHANGE_QQ,
        }),
      );
      navigation.dispatch(
        StackActions.replace(path, {
          sqsState: 'CHANGE_QQ',
        }),
      );
    }
  };

  const onChangeQQ = () => {
    if (active) setChangeQQMenu(true);
  };

  const onChangeOtherQQ = () => {
    if (active) setOtherMenu(true);
  };

  const onQuickQuoteDetail = async () => {
    navigation.navigate(EposRoutes.QUICK_QUOTE_DETAILS, {
      data,
    });
  };

  // const ProductDetail = useMemo(() => {
  //   switch (product?.key) {
  //     case 'H15':
  //     case 'H14':
  //       return (
  //         <>
  //           <DetailProduct label={product?.label || ''} productStyle={{ label: true }} value={calculatorData.mainBenefits[0].planRider?.label!} />
  //           <DetailProduct label={'PRUWell Saver'} productStyle={{ label: true }} value={calculatorData.mainBenefits[0].saverRider?.key == 'Tidak dipilih' ? calculatorData.mainBenefits[0].saverRider?.label! : `Rp${numberWithCommas(calculatorData.mainBenefits[0].saverRider?.label!)}`} />
  //         </>
  //       )
  //     case 'U12':
  //     case 'U13':
  //       return (
  //         <>
  //           <DetailProduct label={'PRUPrime Saver'} productStyle={{ label: true }} value={saverValue} />
  //           <DetailProduct label={`${label.compensation} Meninggal`} value={`Rp${calculatorData.mainBenefits[0].sumInsured}`} />
  //         </>
  //       )
  //     default:
  //       return <></>
  //   }
  // }, [calculatorData, data])

  return (
    <>
      <View style={[plaiStyles.bgwhite, plaiStyles.br12, plaiStyles.mt16, active && cQQStyle.wrapperSelected]}>
        <Pressable onPress={onPress}>
          <>
            <View style={[plaiStyles.spacingp, active ? cQQStyle.headerSelected : cQQStyle.header]}>
              <Text style={[plaiStyles.font14, plaiStyles.fontRedBold]}>Quick Quote {quickQouteNumber + 1}</Text>
              <Text style={[plaiStyles.fontGrey33Thin, plaiStyles.mt8, plaiStyles.lineH20]}>{data.insuranceGoal}</Text>
            </View>
            <View style={[plaiStyles.px16]}>
              {/* Need Improve to Library Method for Different Product */}
              {data.summary.map((item: any) => {
                return <DetailProduct label={item.label} value={item.value} additionalDesc={item?.additionalDesc || ""}/>;
              })}
              {/* <DetailProduct label="Produk" productStyle={{ value: true }} value={product?.label || ''} />
              <DetailProduct
                label={
                  t('Epos:monthly_total', { label: label.premiContribution }) +
                  ' ' +
                  lifeAssuredData?.clientPayment?.label
                }
                value={`Rp${calculatorData.regularPremium}`}
              /> */}
              {/* @ts-ignore */}
              {/* {ProductDetail} */}
              {data.detail.listItem.length > 0 && (
                <Pressable onPress={onQuickQuoteDetail}>
                  <Text style={[plaiStyles.mt24, plaiStyles.fontRed]}>Lihat Detail Quick Quote</Text>
                </Pressable>
              )}
            </View>
          </>
        </Pressable>

        <View style={[plaiStyles.px16, plaiStyles.row, plaiStyles.mt24, plaiStyles.mb16]}>
          <Button
            style={[!active ? plaiStyles.bgBtnDisabled : plaiStyles.bgBtnRed, plaiStyles.btnSmall, plaiStyles.flex]}
            textStyle={plaiStyles.font14}
            onPress={onChangeQQ}
            text={'Ubah Quick Quote'}
          />
          <Divider width={8} />
          <Button
            style={[!active ? plaiStyles.bgBtnDisabled : plaiStyles.bgBtnSecondary, plaiStyles.btnSmall]}
            textStyle={[active ? plaiStyles.fontRed : plaiStyles.fontWhite]}
            onPress={onChangeOtherQQ}
          >
            <Icon name="more-horizontal" size={24} />
          </Button>
        </View>
      </View>
      <ModalMenu
        key={'modal-menu-change-qq'}
        title='Ubah Quick Quote'
        data={changeMenu}
        visible={changeQQMenu}
        onClose={() => setChangeQQMenu(false)}
      />
      <ModalMenu
        key={'modal-menu-other-qq'}
        data={otherMenus}
        visible={otherMenu}
        onClose={() => setOtherMenu(false)}
      />
    </>
  );
};