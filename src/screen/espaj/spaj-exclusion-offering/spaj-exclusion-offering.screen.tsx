import { BackHandler, ScrollView, Text, TouchableWithoutFeedback, View } from 'react-native';
import React, { FC, useEffect } from 'react';
import { PruColor, PruScreen } from 'common_ui_components';
import { InputField, ModalInformation, ShapeItem, SignaturePad, plaiStyles } from 'plai_common_frontend';
import { EposFooter, EposHeader, OptionCard, SignatureTime } from '../../../components';
import { useExclusionOffering } from './hooks/useExclusionOffering';
import { Controller } from 'react-hook-form';
import { ValidationForm, exclusionOfferOption } from '../../../utilities';
import { Button } from 'common_ui_components/app/components-ui';

export const SPAJExclusionOffering = () => {
  const {
    showNotice,
    control,
    isButtonValid,
    t,
    errors,
    signatureDate,
    showSignatureDate,
    showModalConfirm,
    isAgreePolicyHolderNotice,
    onBack,
    onChangeAgreement,
    onPolicyHolderAgreement,
    onChangeSignature,
    onNext,
    content,
    showSignature,
    setShowSignature,
    buttonModalPrimary,
    buttonModalSecondary,
    showContent,
    signature,
  } = useExclusionOffering();
  useEffect(() => {
    // Back Device
    const backHandler = BackHandler.addEventListener('hardwareBackPress', onBack);
    return () => backHandler.remove();
  }, []);
  return (
    <PruScreen backgroundColor={PruColor.greyf8}>
      <>
        <View style={[plaiStyles.flex, plaiStyles.pb24]}>
          <View style={[plaiStyles.bgwhite, plaiStyles.px16, plaiStyles.py16]}>
            <EposHeader />
          </View>
          <ScrollView scrollEnabled={true}>
            <View style={[plaiStyles.py16, plaiStyles.px16, plaiStyles.bgwhite]}>
              <Text style={plaiStyles.fontHeaderTitle}>Exclusion Offering</Text>
              <Text style={[plaiStyles.mt8, plaiStyles.fontGrey66Thin, plaiStyles.lineH20]}>
                {t('Epos:upfront_decision:exclusion_offer_subheader')}
              </Text>
            </View>
            <View style={[plaiStyles.bgwhite, plaiStyles.my8, plaiStyles.px16, plaiStyles.py16]}>
              <Text style={[plaiStyles.fontGrey33Thin, plaiStyles.lineH20]}>{content}</Text>
              <Controller
                name="exclustion-offering-agreement"
                control={control}
                rules={ValidationForm({ isRequired: true })}
                render={({ field: { onChange, value } }) => (
                  <View style={plaiStyles.mt16}>
                    <OptionCard
                      type="radio"
                      theme="border"
                      data={exclusionOfferOption}
                      selected={value}
                      onSelected={(item) => {
                        onChangeAgreement(item);
                        onChange(item);
                      }}
                    />
                  </View>
                )}
              />
              {showContent && <>
                <Notice show={showNotice} />
                <Controller
                  name="policy-holder-agreement"
                  control={control}
                  rules={ValidationForm({ isRequired: true })}
                  render={({ field: { onChange } }) => (
                    <TouchableWithoutFeedback onPress={() => onPolicyHolderAgreement(onChange)}>
                      <View style={[plaiStyles.mt24, plaiStyles.flex, plaiStyles.row]}>
                        <ShapeItem type="box" mode="check" isSelected={isAgreePolicyHolderNotice} />
                        <Text style={[plaiStyles.ml8, plaiStyles.fontGrey33Thin, plaiStyles.lineH20]}>
                          {`SAYA (Calon Pemegang Polis) telah membaca dan mengerti seluruh informasi yang terdapat dalam halaman Surat Penawaran Substandard, dan menyetujui semua yang tercantum pada Surat Penawaran Substandard tersebut.`}
                        </Text>
                      </View>
                    </TouchableWithoutFeedback>
                  )}
                />
              </>}
            </View>
            {showContent && <View style={[plaiStyles.px16, plaiStyles.py16, plaiStyles.bgwhite]}>
              <Text style={[plaiStyles.fontGrey33Bold, plaiStyles.mb16, plaiStyles.font16]}>
                Tanda Tangan Calon Pemegang Polis
              </Text>
              {showSignature ? (
                <>
                  <Controller
                    name={'e-signature'}
                    control={control}
                    rules={ValidationForm({ isRequired: true })}
                    render={({ field: { value, onChange } }) => (
                      <SignaturePad
                        textReset={t('Epos:replay')}
                        textSave={t('Epos:save')}
                        value={value}
                        fileType='png'
                        onChange={(base64Uri: string | null) => {
                          onChangeSignature(base64Uri, onChange);
                        }}
                        error={errors?.['e-signature']?.message}
                      />
                    )}
                  />
                  <Controller
                    name="signature-location"
                    control={control}
                    rules={ValidationForm({ isRequired: true })}
                    render={({ field: { value, onChange } }) => (
                      <InputField
                        label="Tempat"
                        placeholder="Masukkan lokasi tanda tangan"
                        value={value}
                        setValue={onChange}
                        error={errors?.['signature-location']?.message}
                      />
                    )}
                  />
                  {showSignatureDate && <SignatureTime date={signatureDate} signature={signature} />}
                </>
              ) : (
                <Button
                  style={[plaiStyles.bgBtnSecondary]}
                  textStyle={plaiStyles.fontRed}
                  text={t('Epos:start_signature')}
                  onPress={() => setShowSignature(true)}
                />
              )}
            </View>}
          </ScrollView>
        </View>
        <ModalInformation
          title={'Ajukan Proposal'}
          desc={'Apakah Anda yakin ingin mengajukan proposal?'}
          visible={showModalConfirm}
          buttonPrimary={buttonModalPrimary}
          buttonSecondary={buttonModalSecondary}
        />
        <EposFooter
          position={0}
          leftButton={{
            onPress: onBack,
          }}
          rightButton={{
            disabled: !isButtonValid,
            onPress: onNext,
          }}
        />
      </>
    </PruScreen>
  );
};

//#region CHILD COMPONENT
const Notice: FC<{ show: boolean }> = ({ show }) => {
  return show ? (
    <View style={[plaiStyles.mt16, plaiStyles.bgOrangeThin, plaiStyles.px12, plaiStyles.py8, plaiStyles.br8]}>
      <Text style={[plaiStyles.fontOrangeThin, plaiStyles.lineH18, plaiStyles.font12]}>
        Apakah Anda yakin memilih "Tidak Setuju"? {'\n'}Apabila "Tidak Setuju", maka pengajuan SPAJ ini tidak dapat
        dilanjutkan.
      </Text>
    </View>
  ) : (
    <></>
  );
};
//#endregion
