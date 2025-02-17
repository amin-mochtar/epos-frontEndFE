import { View, Text, Keyboard, TouchableWithoutFeedback, FlatList, TextInput, BackHandler } from 'react-native';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { ISQSDetail, POLICY_OPTION, hasPolicyDescription } from '../../../utilities';
import { EposFooter, EposHeader, CardPolicyType, HeaderTitle } from '../../../components';
import { EposDoksulRoutes, EposRoutes } from '../../../navigation';
import { isEmpty } from 'lodash';
import { CheckboxGroup, plaiStyles, setMultipleSelect, TCheckboxData, TCheckboxGroup } from 'plai_common_frontend';
import { PruColor, PruScreen } from 'common_ui_components';
import { EposState, updateSqs, updateEposState, resetResponsePayment, updateProspectDetailLead } from '../../../redux';
import { useDispatch, useSelector } from 'react-redux';
//@ts-ignore
import { RootState } from 'redux/reducer';
import { useEposRealm, useObject } from '../../../database';
import { StackActions, useNavigation, useRoute, RouteProp } from '@react-navigation/native';
import { useTranslation } from 'react-i18next';
import { ScrollView } from 'react-native-gesture-handler';
import { defaultSqsDataSlice, resetSqs } from '../../../redux/epos.slice';
import { generateDefaultFormCustomer } from '../../../database/epos-db.service';

export const PreviouslyOwnedPolicyScreen = () => {
  const navigation = useNavigation();
  const routes = useRoute<
    RouteProp<
      {
        params: {
          paramSelectedSQSId: string;
          paramProposalId: string;
          paramAllSQSId: string;
          paramLeadId: string;
        };
      },
      'params'
    >
  >();

  const { t } = useTranslation();
  const { sqsData, selectedSQSId, proposalId, isDoksul, ProspectDetail } = useSelector<RootState, EposState>(
    (state) => state.epos,
  );
  const { onUpdateSQS, updateSummaryByKey, deleteSQSById, deleteProposalbyID } = useEposRealm();
  const RSQSData = useObject<ISQSDetail>('SQSDetail', selectedSQSId);
  const [existingPolicy, setExistingPolicy] = useState<string[]>([]);
  const [otherData, setOtherData] = useState({
    isOther: false,
    value: '',
  });
  const [hasPolisChecker, setHasPolicChecker] = useState<{ isHavePolicy: boolean; value: TCheckboxData[] | [] }>({
    isHavePolicy: false,
    value: [],
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (routes?.params) {
      renewalProposal();
    }
    if (sqsData) {
      let selected = sqsData?.existingPolicy;
      let otherValue = sqsData?.otherPolicy;
      let _hasActivePolicy = sqsData?.hasActivePolicy;

      if (RSQSData?.existingPolicy && !routes?.params) {
        selected = RSQSData.existingPolicy;
        otherValue = RSQSData.otherPolicy as string;
      }
      if (selected.findIndex((_item) => _item == 'other') > -1) {
        setOtherData({ isOther: true, value: otherValue });
      }
      if (_hasActivePolicy || RSQSData?.hasActivePolicy)
        setHasPolicChecker({ value: hasPolicyDescription, isHavePolicy: true });

      setExistingPolicy(selected);
    }
    // Back Device
    const backHandler = BackHandler.addEventListener('hardwareBackPress', onBack);

    return () => backHandler.remove();
  }, []);

  const onCreateProposal = () => {
    dispatch(
      updateEposState({
        selectedSQSId: '',
        proposalId: '',
        sqsData: defaultSqsDataSlice,
        sqsState: '',
        lifeAssuredData: generateDefaultFormCustomer(),
        additionalFormsId: '',
      }),
    );
    dispatch(resetResponsePayment({ payload: 'reset' }));
    const _ProspectDetailLead = { ...ProspectDetail, leadId: routes?.params?.paramLeadId };
    dispatch(updateProspectDetailLead(_ProspectDetailLead));
  };

  const renewalProposal = async () => {
    await dispatch(resetSqs());
    await deleteSQSById(routes?.params?.paramSelectedSQSId);
    await deleteProposalbyID(routes?.params?.paramProposalId, routes?.params?.paramAllSQSId[0]);
    await onCreateProposal();
  };

  const onBack = () => {
    onSave();
    if (isDoksul) {
      navigation.navigate(EposDoksulRoutes.EPOSDOKSUL, { screen: EposDoksulRoutes.DOKSUL, params: { isBackHomeDoksul: true } });
    } else {
      navigation.dispatch(StackActions.replace(EposRoutes.LANDING));
    }
    return true;
  };

  const disableOnNext = useMemo(() => {
    const selectedOther = existingPolicy.indexOf('other');
    const noPolicy = existingPolicy.includes('noPolis') ? false : !hasPolisChecker.isHavePolicy;

    return isEmpty(existingPolicy) || (selectedOther > -1 && isEmpty(otherData.value)) || noPolicy;
  }, [existingPolicy, otherData, hasPolisChecker]);

  const onSelectPolicy = useCallback(
    (value: string) => {
      const selected = existingPolicy?.findIndex((item) => item == value) > -1 || false;
      const removeChecker = existingPolicy.length === 1 && selected;

      if (removeChecker) setHasPolicChecker({ ...hasPolisChecker, isHavePolicy: false, value: [] });
      if (value === 'other') {
        setOtherData({ ...otherData, isOther: selected ? false : true, value: '' });
      }

      if (value === 'noPolis') {
        if (!selected) {
          // Jika "noPolis" dipilih, kosongkan semua opsi lain dan tambahkan hanya "noPolis"
          setExistingPolicy(['noPolis']);
        } else {
          // Jika "noPolis" dibatalkan (diselect ulang), kosongkan pilihan dan izinkan opsi lain
          setExistingPolicy([]);
          setHasPolicChecker({ ...hasPolisChecker, isHavePolicy: !selected, value: [] });
        }
        return;
      }
      // Jikalau nih opsi lain dipilih, batalkan "noPolis" jika ada dalam pilihan, ini untuk jaga2 aja kalo misalnya disablednya modar.
      if (existingPolicy.includes('noPolis')) {
        setExistingPolicy([value]);
      } else {
        setExistingPolicy(setMultipleSelect(existingPolicy, value));
      }
    },
    [existingPolicy, hasPolisChecker, otherData],
  );

  const onChangeOtherValue = useCallback(
    (value: string) => {
      setOtherData({ ...otherData, value });
    },
    [otherData],
  );

  const onSave = async () => {
    if (selectedSQSId && !isDoksul && RSQSData) {
      const _sqsData = {
        ...RSQSData?.toJSON(),
        existingPolicy: existingPolicy,
        otherPolicy: otherData.isOther ? otherData.value : '',
        hasActivePolicy: hasPolisChecker.isHavePolicy,
      } as ISQSDetail;
      onUpdateSQS(_sqsData);
      updateSummaryByKey(proposalId, {
        key: 'lastState',
        value: EposRoutes.PREVIOUSLY_OWNED_POLICY,
      });
    } else {
      dispatch(updateSqs({ key: 'existingPolicy', payload: existingPolicy }));
      if (otherData.isOther) {
        dispatch(updateSqs({ key: 'otherPolicy', payload: otherData.value }));
      }
      if (hasPolisChecker.isHavePolicy) {
        dispatch(updateSqs({ key: 'hasActivePolicy', payload: hasPolisChecker.isHavePolicy }));
      }
    }
  };

  const onContinue = () => {
    onSave();
    navigation.dispatch(StackActions.replace(EposRoutes.POLICY_HOLDER_TARGET));
  };

  const visibileCheckboxHavePolicy = !existingPolicy?.includes('noPolis') && existingPolicy?.length > 0;

  const hasPolicyCheckerHandler = (item: TCheckboxData) => {
    setHasPolicChecker({
      isHavePolicy: !hasPolisChecker.isHavePolicy,
      value: setMultipleSelect([...hasPolisChecker.value], item, 'key'),
    });
    if (existingPolicy.length === 0) {
    }
  };

  return (
    <PruScreen backgroundColor={PruColor.greyf0}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView keyboardShouldPersistTaps="handled">
          <View style={[plaiStyles.px16, plaiStyles.flex]}>
            <EposHeader />
            <FlatList
              data={POLICY_OPTION}
              keyExtractor={(item, index) => `${item.key}-${index}`}
              renderItem={({ item, index }) => {
                const isOdd = index % 2 == 0;
                const separator = isOdd ? { marginRight: 5 } : { marginLeft: 5 };

                const isSelected = existingPolicy?.findIndex((value) => value === item.key) > -1;

                // Jika 'noPolis' dipilih, semua kecuali 'noPolis' harus disable
                // Jika ada policy selain 'noPolis' dipilih, 'noPolis' harus disable
                const isDisabled = existingPolicy.includes('noPolis')
                  ? item.key !== 'noPolis'
                  : existingPolicy.length > 0 && item.key === 'noPolis';

                return (
                  <CardPolicyType
                    key={`${item.key}-${index}`}
                    data={item}
                    isSelected={isSelected}
                    style={separator}
                    onPress={() => onSelectPolicy(item.key)}
                    disabled={isDisabled}
                  />
                );
              }}
              numColumns={2}
              ListHeaderComponent={<HeaderTitle title="Polis apakah yang telah dimiliki nasabah?" tagTitle={true} />}
              ListFooterComponent={
                <>
                  {otherData.isOther && (
                    <View
                      style={[plaiStyles.bgwhite, plaiStyles.px16, plaiStyles.br12, plaiStyles.mb10, plaiStyles.my10]}
                    >
                      <Text style={[plaiStyles.mt12, plaiStyles.fontGrey33, plaiStyles.lineH20]}>
                        Lainnya <Text style={plaiStyles.fontRed}>*</Text>
                      </Text>
                      <TextInput
                        editable
                        value={otherData.value}
                        onChangeText={onChangeOtherValue}
                        style={[plaiStyles.borderbThin, plaiStyles.mb16, plaiStyles.py8, plaiStyles.fontBlack]}
                        placeholder="Masukkan Detail"
                        id="other-policy-input"
                      />
                    </View>
                  )}
                  {visibileCheckboxHavePolicy && (
                    <View style={[plaiStyles.mb10, plaiStyles.my10]}>
                      <CheckboxGroup
                        data={hasPolicyDescription as TCheckboxData[]}
                        onSelected={(item) => hasPolicyCheckerHandler(item)}
                        selected={hasPolisChecker.value}
                        insideStyle={[plaiStyles.py14, plaiStyles.pr24, { alignItems: 'flex-start' }]}
                        textStyle={[plaiStyles.ml16, plaiStyles.mb12, plaiStyles.lineH20]}
                        valueKey="id"
                      />
                    </View>
                  )}
                </>
              }
            />
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>

      <EposFooter
        position={1}
        leftButton={{
          onPress: onBack,
        }}
        rightButton={{
          disabled: disableOnNext,
          onPress: onContinue,
        }}
      />
    </PruScreen>
  );
};
