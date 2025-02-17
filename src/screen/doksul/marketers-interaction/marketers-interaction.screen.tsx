import { View, ScrollView } from 'react-native';
import React, { useEffect, useMemo, useState } from 'react';
import { DoksulHeader, OptionCard, SectionTitle, TOptionalCardData } from '../../../components';
import { PruColor, PruScreen } from 'common_ui_components';
import { InputField, LoadingFull, ModalInformation, plaiStyles } from 'plai_common_frontend';
import { StackActions, useNavigation } from '@react-navigation/native';
import { EposDoksulRoutes, EposRoutes } from '../../../navigation';
import { Button } from 'common_ui_components/app/components-ui';
import { Controller, SubmitHandler, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/reducer';
import { EposState, updateEposState } from '../../../redux';
import { DataAdditionalForms, IAdditionalForms, useEposRealm, useObject } from '../../../database';
import { ValidationForm, defaultOptionalData } from '../../../utilities/common-function';
import { marketerInteractionList, showModalFailedSubmitDoksul, showModalIquaryAgentFailed } from '../../../utilities';
import moment from 'moment';
import { useDoksulSubmission } from '../../../hooks';
import RNFS from 'react-native-fs';
import { postSubmissionDoksul } from '../../../network/services';

type TMarketersInteraction = {
  interactionType: string | TOptionalCardData;
  otherInteractionType: string;
  marketersInteraction: string;
  placeOfInteraction: string;
};

const defaultMarketersInteraction = {
  interactionType: '',
  otherInteractionType: '',
  marketersInteraction: '',
  placeOfInteraction: '',
};

export const MarketersInteractionScreen = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const { additionalFormsId, proposalId } = useSelector<RootState, EposState>((state) => state.epos);
  const { onUpdateAdditionalForms, updateSummaryByKey } = useEposRealm();
  const AdditionalForms = useObject<IAdditionalForms>('AdditionalForms', additionalFormsId as never);
  const { generateDoksulSubmission } = useDoksulSubmission();
  const marketersInteraction = AdditionalForms?.marketersInteraction
    ? JSON.parse(AdditionalForms.marketersInteraction)
    : '';
  const [interactionType, setInteractionType] = useState<TOptionalCardData>(
    marketersInteraction ? marketersInteraction?.interactionType : defaultOptionalData,
  );
  const [modalSubmit, setModalSubmit] = useState(false);
  const [loading, setLoading] = useState(false)

  const {
    control,
    handleSubmit,
    setValue,
    formState: { errors, isValid },
  } = useForm<TMarketersInteraction>({
    defaultValues: useMemo(() => {
      let result = defaultMarketersInteraction;
      if (additionalFormsId) {
        if (AdditionalForms?.marketersInteraction != null || AdditionalForms?.marketersInteraction != '') {
          result = marketersInteraction;
        }
      }
      return result as any;
    }, [additionalFormsId]),
  });

  const onSave = (data: TMarketersInteraction) => {
    const _DataAdditionalForms = {
      ...AdditionalForms?.toJSON(),
      marketersInteraction: JSON.stringify(data),
    } as IAdditionalForms;
    onUpdateAdditionalForms(_DataAdditionalForms);
  };

  useEffect(() => {
    if (interactionType?.key !== 'E') {
      setValue('otherInteractionType', '');
    }
  }, [interactionType]);

  const onContinue: SubmitHandler<TMarketersInteraction> = async (data) => {
    setLoading(true)
    onSave(data);
    setModalSubmit(!modalSubmit)
    const doksulData = await generateDoksulSubmission('AMEND_AGENT');
    postSubmissionDoksul({
      params: doksulData,
      onSuccess: (resp) => {
        setLoading(false)
        if (resp?.responseCode == '00') {
          updateSummaryByKey(proposalId, { key: 'statusProposal', value: 'Submitted' });
          updateSummaryByKey(proposalId, { key: 'statusSubmit', value: true });
          updateSummaryByKey(proposalId, { key: 'submitDate', value: moment().toISOString() });
          navigation.navigate(EposRoutes.NEW_BUSINESS, { screen: EposRoutes.LINK_SUBMITTED })
          return
        } else if (['19', '20'].includes(resp?.responseCode)) {
          showModalIquaryAgentFailed(resp?.responseCode);
          return
        }
        showModalFailedSubmitDoksul(() => {
          onContinue(data);
        });
      }
    }).catch((err) => {
      setLoading(false)
    })
  };

  const onBack = () => {
    navigation.dispatch(StackActions.replace(EposDoksulRoutes.DOKSUL, {params: { isBackHomeDoksul: true }}));
  }

  return (
    <>
      {loading && <LoadingFull />}
      <PruScreen backgroundColor={PruColor.white}>
        <>
          <View style={[plaiStyles.spacing, plaiStyles.flex]}>
            <DoksulHeader
              title="Interaksi Tenaga Pemasar"
              onPress={onBack}
            />
            <ScrollView>
              <SectionTitle text={'Tipe Interaksi'} />
              <Controller
                name={'interactionType'}
                control={control}
                rules={ValidationForm({ isRequired: true })}
                render={({ field: { value, onChange } }) => (
                  <OptionCard
                    theme="border"
                    data={marketerInteractionList}
                    selected={value}
                    onSelected={(item) => {
                      onChange(item);
                      setInteractionType(item);
                    }}
                    error={errors?.interactionType}
                  />
                )}
              />

              {interactionType?.key === 'E' && (
                <Controller
                  name={`otherInteractionType`}
                  control={control}
                  rules={ValidationForm({ isRequired: true, maxLength: 500 })}
                  render={({ field: { onChange, value } }) => (
                    <InputField
                      label={'Tipe Transaksi'}
                      placeholder={'Masukan Tipe Transaksi'}
                      rightItem="counter"
                      maxLength={500}
                      value={value}
                      setValue={onChange}
                      error={errors?.otherInteractionType}
                    />
                  )}
                />
              )}

              {interactionType?.key !== '' && (
                <>
                  <Controller
                    name={`marketersInteraction`}
                    control={control}
                    rules={ValidationForm({ isRequired: true, maxLength: 5000 })}
                    render={({ field: { onChange, value } }) => (
                      <InputField
                        label={'Interaksi Tenaga Pemasar'}
                        placeholder={'Masukan Interaksi Tenaga Pemasar'}
                        rightItem="counter"
                        maxLength={5000}
                        value={value}
                        setValue={onChange}
                        error={errors?.marketersInteraction}
                      />
                    )}
                  />
                  <Controller
                    name={`placeOfInteraction`}
                    control={control}
                    rules={ValidationForm({ isRequired: true, maxLength: 500 })}
                    render={({ field: { onChange, value } }) => (
                      <InputField
                        label={'Tempat Interaksi'}
                        placeholder={'Masukkan Tempat Interaksi'}
                        value={value}
                        setValue={onChange}
                        error={errors?.placeOfInteraction}
                      />
                    )}
                  />
                </>
              )}

            </ScrollView>
            <View style={plaiStyles.bgwhite}>
              <Button
                style={[isValid ? plaiStyles.bgBtnRed : plaiStyles.bgBtnDisabled, plaiStyles.mt24, plaiStyles.mb16]}
                textStyle={[plaiStyles.fontWhite, plaiStyles.fontBold]}
                text={'Selanjutnya'}
                onPress={() => setModalSubmit(true)}
                disabled={!isValid}
              />
            </View>
          </View>
          <ModalInformation
            title={'Submit Dokumen'}
            desc={'Apakah Anda yakin ingin submit dokumen susulan?'}
            visible={modalSubmit}
            buttonPrimary={{
              text: 'Ya',
              onPress: handleSubmit(onContinue),
            }}
            buttonSecondary={{
              text: 'Tidak',
              onPress: () => setModalSubmit(!modalSubmit),
            }}
          />
        </>
      </PruScreen>
    </>
  );
};
