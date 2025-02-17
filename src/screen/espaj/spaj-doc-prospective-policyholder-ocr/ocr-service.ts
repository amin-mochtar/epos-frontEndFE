import i18next from 'i18next';
import { EposRoutes } from '../../../navigation';
import { StackActions } from '@react-navigation/native';
import {
  TLabelControl,
  TOnChangeControllerDocument,
  TOnpressCustom,
  TOnPressCustomRedirected,
  TValueControl,
} from './ocr.type';
import { TLivenessData } from '../spaj-doc-prospective-policyholder-liveness/spaj-doc-prospective-policyholder-liveness.type';
import { ISPAJData } from '../../../utilities';

const labelControl = ({ documentType, ocrData, livenessData, checkingAccountData }: TLabelControl) => {
  if (documentType.key === 'KTP') {
    return ocrData?.imgBase64 && ocrData?.isFinish && !ocrData?.isManualDocument
      ? 'Lihat Data'
      : i18next.t('Epos:upload_image');
  }

  if (documentType?.key === 'Kartu Keluarga') {
    return checkingAccountData?.imgBase64 && checkingAccountData?.isFinish && !checkingAccountData?.isManualDocument
      ? 'Lihat Data'
      : i18next.t('Epos:upload_image');
  }

  if (documentType?.key === 'KIA') {
    return checkingAccountData?.imgBase64 && checkingAccountData?.isFinish && !checkingAccountData?.isManualDocument
      ? 'Lihat Data'
      : i18next.t('Epos:upload_image');
  }

  if (documentType?.key === 'Foto Selfie') {
    return livenessData?.imgBase64 && livenessData?.isFinish && !livenessData?.isManualDocument
      ? ''
      : i18next.t('Epos:upload_image');
  }

  if (documentType?.key === 'Buku/Rekening Koran') {
    return checkingAccountData?.imgBase64 && checkingAccountData?.isFinish && !checkingAccountData?.isManualDocument
      ? 'Lihat Data'
      : i18next.t('Epos:upload_image');
  }
};

const valueControl = ({ documentType, ocrData, livenessData, value, checkingAccountData }: TValueControl) => {
  if (documentType.key === 'KTP' && !ocrData?.isManualDocument) {
    return ocrData?.isFinish && ocrData?.imgBase64 && !ocrData?.isManualDocument
      ? `data:image/jpeg;base64,${value}`
      : value;
  }

  if (documentType.key === 'Kartu Keluarga' && !ocrData?.isManualDocument) {
    return ocrData?.isFinish && ocrData?.imgBase64 && !ocrData?.isManualDocument
      ? `data:image/jpeg;base64,${value}`
      : value;
  }

  if (documentType?.key === 'Foto Selfie' && !livenessData.isManualDocument) {
    return livenessData?.isFinish && livenessData?.imgBase64 && !livenessData?.isManualDocument
      ? livenessData?.imgBase64
      : value;
  }

  if (documentType?.key === 'Buku/Rekening Koran') {
    return checkingAccountData?.isFinish && checkingAccountData?.imgBase64 && !checkingAccountData?.isManualDocument
      ? checkingAccountData?.imgBase64
      : value;
  }
  return value;
};

const onRemoveFieldControl = (documentType: { key: string; document?: string }) => {
  if (['KTP', 'Foto Selfie', 'Buku/Rekening Koran'].includes(documentType.key)) return false;

  return true;
};

const onPressCustom = ({
  documentType,
  insuranceType,
  livenessData,
  navigation,
  ocrData,
  routeParams,
  onSave,
}: TOnpressCustom) => {
  const params: any = routeParams;
  if (
    (documentType?.key === 'KTP' && params?.isOcrManual === true) ||
    (documentType?.key === 'KTP' && ocrData?.isManualDocument)
  ) {
    return {
      isCustom: false,
      onPress: null,
    };
  } else if (documentType?.key === 'KTP') {
    return {
      isCustom: true,
      onPress: () =>
        onPressCustomRedirected({
          documentTypeKey: 'KTP',
          ocrData,
          navigation,
          insuranceType,
          onSave,
        }),
    };
  } else if (
    (documentType?.key === 'Foto Selfie' && params?.livenessVerif === false) ||
    (documentType?.key === 'Foto Selfie' && livenessData?.isManualDocument)
  ) {
    return {
      isCustom: false,
      onPress: null,
    };
  } else if (documentType.key === 'Foto Selfie') {
    return {
      isCustom: true,
      onPress: () =>
        onPressCustomRedirected({
          documentTypeKey: 'Foto Selfie',
          ocrData,
          navigation,
          insuranceType,
          onSave,
        }),
    };
  }

  return {
    isCustom: false,
    onPress: null,
  };
};

const onPressCustomRedirected = async ({
  documentTypeKey,
  ocrData,
  navigation,
  insuranceType,
  onSave,
}: TOnPressCustomRedirected) => {
  if (typeof onSave === 'function' && onSave) await onSave();
  if (documentTypeKey === 'KTP') {
    if (ocrData?.imgBase64 && !ocrData?.isFinish) {
      navigation.dispatch(
        StackActions.replace(EposRoutes.SPAJ_DOC_PROSPECTIVE_POLICYHOLDER_OCR_COMPARE, { [insuranceType]: true }),
      );
    } else if (ocrData?.imgBase64 && ocrData?.isFinish) {
      navigation.dispatch(
        StackActions.replace(EposRoutes.SPAJ_DOC_PROSPECTIVE_POLICYHOLDER_OCR_REVIEW, { [insuranceType]: true }),
      );
    } else {
      navigation.dispatch(
        StackActions.replace(EposRoutes.SPAJ_DOC_PROSPECTIVE_POLICYHOLDER_OCR, { [insuranceType]: true }),
      );
    }
  }

  if (documentTypeKey === 'Foto Selfie') {
    navigation.dispatch(
      StackActions.replace(EposRoutes.SPAJ_DOC_PROSPECTIVE_POLICYHOLDER_LIVENESS, { [insuranceType]: true }),
    );
  }
};

const hiddenBtnControl = (
  documentType: { key: string; document: string },
  livenessData: TLivenessData,
): boolean | undefined => {
  if (
    documentType?.key === 'Foto Selfie' &&
    livenessData?.imgBase64 &&
    livenessData?.isFinish &&
    !livenessData?.isManualDocument
  ) {
    const formtImgBase64 = documentType['document'];
    return livenessData?.imgBase64 || formtImgBase64 ? true : false;
  }
};

const onChangeControllerDocument = async ({
  formVal,
  formChange,
  routes,
  onUpdateSPAJ,
  RSPAJData,
  spajLiveness,
  spajOcr,
  insuranceType,
}: TOnChangeControllerDocument): Promise<void> => {
  if (routes.params?.livenessVerif) {
    const _spajData: ISPAJData = {
      ...JSON.parse(JSON.stringify(RSPAJData?.toJSON())),
      spajLiveness: JSON.stringify({
        ...spajLiveness,
        [insuranceType]: {
          imgBase64: formVal,
          isManualDocument: true,
          isFinish: true,
          livenessResult: '',
        },
      }),
    };

    await onUpdateSPAJ(_spajData as ISPAJData);
  } else if (routes?.params?.isOcrManual) {
    const _spajData: ISPAJData = {
      ...JSON.parse(JSON.stringify(RSPAJData?.toJSON())),
      spajOcr: JSON.stringify({
        ...spajOcr,
        [insuranceType]: {
          imgBase64: formVal,
          isManualDocument: true,
          isFinish: true,
          ocrResult: '',
        },
      }),
    };

    await onUpdateSPAJ(_spajData as ISPAJData);
  }
};

export {
  labelControl,
  valueControl,
  onRemoveFieldControl,
  onPressCustom,
  hiddenBtnControl,
  onChangeControllerDocument,
};
