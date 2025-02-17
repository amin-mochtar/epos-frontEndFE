import { Image, View, Text, FlatList, AppState, Platform, TouchableWithoutFeedback, Linking } from 'react-native';
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { PruActivityIndicator, PruColor, PruHeader, PruScreen } from 'common_ui_components';
import { Divider, DropdownField, GlobalPromptModal, InputField, LoadingFull, ModalContainer, ModalInformation, numberWithCommas, plaiStyles } from 'plai_common_frontend';
import { EposFooter, EposHeader, OptionCard, TOptionalCardData } from '../../../components';
import { ScrollView } from 'react-native';
import { StackActions, useNavigation } from '@react-navigation/native';
import { EposRoutes } from '../../../navigation';
import { IAdditionalForms, useEposRealm, useObject } from '../../../database';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/reducer';
import { EposState, updateEposState } from '../../../redux';
import { useTranslation } from 'react-i18next';
import { Button } from 'common_ui_components/app/components/base/button/button';
import { PrivyCardSign, StatusDocument, VerificationClien } from './components';
import WebView from 'react-native-webview';
import { DUMMY_DATA } from './dummy-data';
import { height } from 'pdfkit/js/page';
import { useSpajNumber, useSubmission, useUpfrontValidation } from '../../../hooks';
import { getPrivyIdByOuthPass, getStatusDocumentPrivy, getStatusRegistrationPrivy, registrationPrivy, submissionPrivy } from '../../../network';
import { calculateAge, showModalMaintenance, timerModalWrapper, UpfrontDecisionModel, ISPAJData, ISQSDetail, ISummaryProposal, TPrivyData } from '../../../utilities';
import { shape, success, taskfailed } from '../../../assets';
import { getUpfrontDecision } from '../../../network/services';
import RNFS from 'react-native-fs';
import { pruTestID } from 'common_services_frontend';
import { ENV } from '@env';
import { TInsuranceAttachmentLetter } from '../../additional-forms/insurance-attachment-letter/insurance-attachment-letter.type';

const STATUS_DOCUMENT = {
    onSubmit: {
        label: 'Dokumen Sedang Dikirim',
        color: 'yellow'
    },
    Uploaded: {
        label: 'Menunggu Tanda Tangan',
        color: 'blue'
    },
    Processing: {
        label: 'Menunggu Tanda Tangan',
        color: 'blue'
    },
    Completed: {
        label: 'Selesai Tanda Tangan',
        color: 'green'
    }
}

const isAndroid = Platform.OS === 'android';

export const SpajDigitalSignScreen = () => {
    const navigation = useNavigation();
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { selectedSQSId, spajId, spajNumber, proposalId, additionalFormsId } = useSelector<
        RootState,
        EposState
    >((state) => state.epos);
    const { authState, newBussinesConfig } = useSelector((state: any) => {
        return {
            authState: state.auth,
            newBussinesConfig: state.common?.appConfigs['ID.AGENCY']?.Sales?.newbusiness
        };
    });
    const { _generateSpajNumber } = useSpajNumber();
    const { getValidationUpfront } = useUpfrontValidation()
    const { generateRequestUpfront } = useSubmission();
    const { updateSPAJByKey, updateSummaryByKey, getMultipleCustomer, onUpdateUpfrontDecision } = useEposRealm();
    const RSQSData = useObject<ISQSDetail>('SQSDetail', selectedSQSId as never);
    const RSPAJData = useObject<ISPAJData>('SPAJData', spajId as never);
    const SummaryProposalById = useObject<ISummaryProposal>('SummaryProposal', proposalId as never);
    const allCustomerData = getMultipleCustomer(RSQSData?.clientIdSelected!);
    const isPremiumPayorSPAJ = RSPAJData ? JSON.parse(RSPAJData.confirmationSQS).premiumPaymentCandidate : ''
    const [flagForm, setFlagForm] = useState<any[]>(JSON.parse(RSPAJData?.flagForm) || [])
    const [loginAgenModal, setLoginAgenModal] = useState(false)
    const [modalDisclaimer, setModalDisclaimer] = useState(false)
    const [modalVerifikasi, setModalVerifikasi] = useState(false)
    const [modalDocumentStatus, setModalDocumentStatus] = useState(false)
    const [loading, setLoading] = useState(false)
    const [privyIdAgent, setPrivyIdAgent] = useState('');
    const [privyIdPh, setPrivyIdPh] = useState('')
    const [privyIdLA, setPrivyIdLA] = useState('')
    const [privyIdTT, setPrivyIdTT] = useState('')
    const [privyIdPY, setPrivyIdPY] = useState('')
    const [privyComplated, setPrivyComplated] = useState(false);
    const [isSubmit, setIsSubmit] = useState(JSON.parse(RSPAJData?.privyData!).privyIsSubmit || false)
    const [statusDokumenPrivy, setstatusDokumenPrivy] = useState([] as any)
    const [loadingChekDocument, setLoadingChekDocument] = useState(false)
    const [role, setRole] = useState("PH")
    const [failedVerif, setFailedVerif] = useState(false)
    const [sucessSubmitModal, setSucessSubmitModal] = useState(false)
    const [blockBackModal, setBlockBackModal] = useState(false)
    const [verifPrivy, setVerifPrivy] = useState(false)
    const [userToken, setUserToken] = useState('')
    const [seconds, setSeconds] = useState(180);
    const [waitingVerif, setWaitingVerif] = useState(false);
    const [statusVerif, setStatusVerif] = useState({
        status: '',
        message: ''
    })
    const [spajNumberTemp, setSpajNumberTemp] = useState(spajNumber)
    const [reUploadData, setReUploadData] = useState(false)
    const [reTryVerif, setReTryVerif] = useState(0);
    const [docKtp, setDocKtp] = useState('');
    const [docSelfie, setDocSelfie] = useState('');
    const appState = useRef(AppState.currentState);
    const [appStateVisible, setAppStateVisible] = useState(appState.current);
    const [prevTimeCountdown, setPrevTimeCountdown] = useState(new Date().toTimeString().split(' ')[0]);
    let timer: NodeJS.Timeout;
    const isUAT = ENV === 'UAT' || ENV === 'DEV';
    const isPROD = ENV === 'PRD';
    const AdditionalForms = useObject<IAdditionalForms>('AdditionalForms', additionalFormsId as never);
    const prodLoginAgent = `https://oauth.privy.id/oauth/authorize?client_id=NAuj_31k6haYocTZJPIXkm9ZmFzRP2ihWcZXlWUAGh8&redirect_uri=https://oauthdebugger.com/debug&register=true&response_type=code&scope=read`;
    const nonProdLoginAgent = `https://stg-oauth.privy.id/oauth/authorize?client_id=_kQwuqNiylZttfF9FhgROSbT9aQox0XNbAc5Psd0Y8E&redirect_uri=urn:ietf:wg:oauth:2.0:oob&scope=read%20public%20write&response_type=code&register=true`;
    const loginAgent = isPROD ? prodLoginAgent : nonProdLoginAgent;

    const { transactionId } = RSPAJData?.upfrontDecisionResult ?? {};
    const shariaPT = useMemo(() => { return RSQSData?.policyType == 'sharia' ? 'PT Prudential Sharia Life Assurance' : 'PT Prudential Life Assurance' }, [RSQSData?.policyType])

    useEffect(() => {
        if (RSQSData && RSPAJData) {
            if (RSPAJData.privyData != '{}') {
                let privyData = JSON.parse(RSPAJData?.privyData!)
                setPrivyIdAgent(privyData.privyIdAgent)
                setPrivyIdPh(privyData.privyIdPH)
                setPrivyIdLA(privyData.privyIdLA)
                setPrivyIdPY(privyData.privyIdPY)
                setPrivyIdTT(privyData.privyIdTT)
                setPrivyComplated(privyData.privyComplated)
                setIsSubmit(privyData.privyIsSubmit)
            }

        }
    }, [RSQSData, RSPAJData])

    useEffect(() => {
        const subscription = AppState.addEventListener('change', nextAppState => {
            if (isAndroid) {
                if (
                    appState.current.match(/inactive|background/) &&
                    nextAppState === 'active'
                ) {
                    onMinimizedGetSecondsOnAndroid();
                }

                appState.current = nextAppState;
                setAppStateVisible(appState.current);
            }
        });

        return () => {
            subscription.remove();
        };
    }, [prevTimeCountdown]);

    useEffect(() => {
        if (role == 'PH' && privyIdPh == 'failed') return;
        else if (role == 'LA' && privyIdLA == 'failed') return
        else if (role == 'TT' && privyIdTT == 'failed') return
        else if (role == 'PY' && privyIdPY == 'failed') return
        if (userToken) {
            setPrevTimeCountdown(new Date().toTimeString().split(' ')[0]);
            timer = setInterval(() => {
                setSeconds((prevSeconds) => {
                    if (prevSeconds === 0) {
                        clearInterval(timer);
                        setWaitingVerif(false)
                        setStatusVerif({
                            status: 'waiting',
                            message: ''
                        })
                        setTimeout(() => setFailedVerif(true), 500)
                        return prevSeconds;
                    }

                    if (prevSeconds % 15 == 0) {
                        checkRegistPrivy()
                    }
                    return prevSeconds - 1;
                });
            }, 1000);
        }

        return () => clearInterval(timer);
    }, [userToken, reTryVerif]);

    const timeToSeconds = (time: any) => {
        const [hours, minutes, seconds] = time.split(':').map(Number);
        return hours * 3600 + minutes * 60 + seconds;
    };

    const onMinimizedGetSecondsOnAndroid = () => {
        const now = new Date().toTimeString().split(' ')[0];
        const nowInSeconds = timeToSeconds(now);
        const beforeInSeconds = timeToSeconds(prevTimeCountdown);
        const diffInSeconds = Math.abs(nowInSeconds - beforeInSeconds);
        const countdown = seconds - diffInSeconds;
        setSeconds(countdown < 0 ? 0 : countdown);
    };

    const formatTime = (time: number) => {
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    const DATA_AGENT = useMemo(() => {
        if (authState) {
            return {
                agentName: authState?.agentProfile?.displayName?.enUs,
                agentCode: authState?.agentCode
            }
        }
        return {
            agentName: '',
            agentCode: ''
        }
    }, [])

    const DATA_CLIENT = useMemo(() => {
        if (RSPAJData.policyHolderData != undefined) {
            const PHData = JSON.parse(RSPAJData?.policyHolderData!);
            const PHDocData = JSON.parse(RSPAJData?.policyHolderDocs)
            let ktpData = '';
            let selfieData = '';
            PHDocData.docPolicyholder.map((doc) => {
                if (doc.typeDocument.key == 'KTP') {
                    ktpData = doc.document;
                } else if (doc.typeDocument.key == 'Foto Selfie') {
                    selfieData = doc.document;
                }
            })
            return {
                name: PHData.clientName,
                email: PHData.clientEmail,
                ktp: PHData.clientIdCardNumber,
                phoneNumber: '0' + PHData.clientResidencePhoneCells[0].clientResidencePhoneCell,
                dob: PHData.clientDateBirth,
                fotoKTP: ktpData,
                fotoSelfie: selfieData
            }
        }
        return {
            name: '',
            email: '',
            ktp: '',
            phoneNumber: '',
            dob: '',
            fotoKTP: '',
            fotoSelfie: ''
        }
    }, [])

    const DATA_CLIENT_LA = useMemo(() => {
        if (RSPAJData?.primaryInsured) {
            const LAData = RSPAJData?.primaryInsured ? JSON.parse(RSPAJData?.primaryInsured) : null;
            const LADocData = RSPAJData?.primaryInsuredDocs ? JSON.parse(RSPAJData?.primaryInsuredDocs) : null
            let ktpData = '';
            let selfieData = '';
            LADocData.docPolicyholder.map((doc) => {
                if (doc.typeDocument.key == 'KTP') {
                    ktpData = doc.document;
                } else if (doc.typeDocument.key == 'Foto Selfie') {
                    selfieData = doc.document;
                }
            })
            return {
                name: LAData.clientName,
                email: LAData.clientEmail,
                ktp: LAData.clientIdCardNumber,
                phoneNumber: '0' + LAData.clientResidencePhoneCells[0].clientResidencePhoneCell,
                dob: LAData.clientDateBirth,
                fotoKTP: ktpData,
                fotoSelfie: selfieData


            }
        }
        return {
            name: '',
            email: '',
            ktp: '',
            phoneNumber: '',
            dob: '',
            fotoKTP: '',
            fotoSelfie: ''
        }
    }, [])

    const DATA_CLIENT_TT = useMemo(() => {
        if (RSPAJData?.additionalInsured && RSPAJData?.additionalInsuredDocs) {
            const TTData = RSPAJData?.additionalInsured ? JSON.parse(RSPAJData?.additionalInsured) : null;
            const TTDocData = RSPAJData?.additionalInsuredDocs ? JSON.parse(RSPAJData?.additionalInsuredDocs) : null
            let ktpData = '';
            let selfieData = '';
            TTDocData?.docPolicyholder.map((doc) => {
                if (doc.typeDocument.key == 'KTP') {
                    ktpData = doc.document;
                } else if (doc.typeDocument.key == 'Foto Selfie') {
                    selfieData = doc.document;
                }
            })
            return {
                name: TTData.clientName,
                email: TTData.clientEmail,
                ktp: TTData.clientIdCardNumber,
                phoneNumber: '0' + TTData.clientResidencePhoneCells[0].clientResidencePhoneCell,
                dob: TTData.clientDateBirth,
                fotoKTP: ktpData,
                fotoSelfie: selfieData


            }
        }
        return {
            name: '',
            email: '',
            ktp: '',
            phoneNumber: '',
            dob: '',
            fotoKTP: '',
            fotoSelfie: ''
        }
    }, [])

    const DATA_CLIENT_PY = useMemo(() => {
        if (RSPAJData?.premiumPayor) {
            const PYData = JSON.parse(RSPAJData?.premiumPayor!);
            const PYDocData = RSPAJData?.premiumPayorDoc ? JSON.parse(RSPAJData?.premiumPayorDoc) : { docPolicyholder: [] }
            let ktpData = '';
            let selfieData = '';
            PYDocData.docPolicyholder.map((doc) => {
                if (doc.typeDocument.key == 'KTP') {
                    ktpData = doc.document;
                } else if (doc.typeDocument.key == 'Foto Selfie') {
                    selfieData = doc.document;
                }
            })
            return {
                name: PYData.clientName,
                email: PYData.clientEmail,
                ktp: PYData.clientIdCardNumber,
                phoneNumber: '0' + PYData.clientResidencePhoneCells[0].clientResidencePhoneCell,
                dob: PYData.clientDateBirth,
                fotoKTP: ktpData,
                fotoSelfie: selfieData


            }
        }
        return {
            name: '',
            email: '',
            ktp: '',
            phoneNumber: '',
            dob: '',
            fotoKTP: '',
            fotoSelfie: ''
        }
    }, [])

    const clientDataModal = useMemo(() => {
        if (role == 'PH') return DATA_CLIENT
        else if (role == 'LA') return DATA_CLIENT_LA
        else if (role == 'TT') return DATA_CLIENT_TT
        else if (role == 'PY') return DATA_CLIENT_PY
        return {
            name: '',
            email: '',
            ktp: '',
            phoneNumber: '',
            dob: '',
            fotoKTP: '',
            fotoSelfie: ''
        }
    }, [role])

    const GENERATE_LIST_FORM = useMemo(() => {

        const excludeFormWPH = ['Form-PAYDI', 'Form-Cetak-Polis', 'WakafEform', 'SKA']
        const excludeFormWPHAG = ['SQS', 'RP', 'Form-PAYDI', 'Form-Cetak-Polis', 'WakafEform', 'FORM', 'Konversi,Form-Konversi', 'SKA']

        let documentGenerate = [
            {
                key: '1',
                label: 'SQS',
                documentName: 'SQS'
            },
            {
                key: '2',
                label: 'Risk Profile',
                documentName: 'RP'
            },
            {
                key: '3',
                label: 'SPAJ',
                documentName: 'SPAJ'
            }
        ];
        flagForm.map((dataForm: any) => {
            if (!documentGenerate.find((data) => { return data.key == dataForm.key; })) {
                documentGenerate.push(dataForm);
            }
        });
        if (['U12', 'U13'].includes(RSQSData?.product?.key)) {
            documentGenerate.push({
                key: '8',
                label: 'Formulir PAYDI',
                documentName: 'Form-PAYDI'
            });
        }
        if (privyIdPh == 'failed' && privyIdAgent == 'failed') {
            documentGenerate = documentGenerate.filter((document) =>
                !excludeFormWPHAG.includes(document.documentName)
            )
        } else if (privyIdPh == 'failed') {
            documentGenerate = documentGenerate.filter((document) =>
                !excludeFormWPH.includes(document.documentName)
            )
        }


        // setDocumentGenerateData(documentGenerate);
        return documentGenerate;
    }, [flagForm, RSQSData, privyIdPh, privyIdAgent, AdditionalForms]);

    const countClientEligible = () => {
        let countClient = 2;
        if (DATA_CLIENT_LA.name && calculateAge(DATA_CLIENT_LA.dob) >= 17) {
            countClient += 1;
        }
        if (DATA_CLIENT_TT.name && calculateAge(DATA_CLIENT_TT.dob) >= 17) {
            countClient += 1;
        }
        if (DATA_CLIENT_PY.name) {
            countClient += 1;
        }
        return countClient;
    };

    const NEXT_STATUS = useMemo(() => {
        let signPrivy = 0;
        let countFailed = 0;
        const countClient = countClientEligible();
        if (privyIdPh == '') {
            signPrivy += 1;
        } else if (privyIdPh == 'failed') {
            countFailed += 1;
        }
        if (privyIdAgent == '') {
            signPrivy += 1;
        } else if (privyIdAgent == 'failed') {
            countFailed += 1;
        }
        if (DATA_CLIENT_LA.name && calculateAge(DATA_CLIENT_LA.dob) >= 17 && privyIdLA == '') {
            signPrivy += 1;
        } else if (privyIdLA == 'failed') {
            countFailed += 1;
        }
        if (DATA_CLIENT_TT.name && calculateAge(DATA_CLIENT_TT.dob) >= 17 && privyIdTT == '') {
            signPrivy += 1;
        } else if (privyIdTT == 'failed') {
            countFailed += 1;
        }
        if (DATA_CLIENT_PY.name && privyIdPY == '') {
            signPrivy += 1;
        } else if (privyIdPY == 'failed') {
            countFailed += 1;
        }
        let countComplated = statusDokumenPrivy?.length == GENERATE_LIST_FORM?.length && GENERATE_LIST_FORM?.length != 0 && statusDokumenPrivy?.length != 0 ? 0 : 1;

        if (statusDokumenPrivy?.length > 0) {
            const complatedPrivy = statusDokumenPrivy?.findIndex((data) => { return data.data.documentStatus != 'Completed'; });
            if (complatedPrivy != -1) {
                countComplated += 1;
            }
        }

        return { privyCompleted: (countComplated == 0 && signPrivy == 0), privyFilled: signPrivy == 0, skippedPrivy: (countClient == countFailed) };

    }, [statusDokumenPrivy, privyIdAgent, privyIdPY, privyIdPh, privyIdLA, privyIdTT]);



    const onSave = async (_route?: string, isSubmitStatus?: boolean) => {

        let _privyData: TPrivyData = {
            privyIdPH: privyIdPh,
            privyIdAgent: privyIdAgent,
            privyIdLA: privyIdLA,
            privyIdPY: privyIdPY,
            privyIdTT: privyIdTT,
            privyComplated: NEXT_STATUS.privyCompleted || privyComplated,
            privyIsSubmit: isSubmitStatus || isSubmit,
        };
        await updateSPAJByKey(RSPAJData?.spajId, {
            key: 'privyData',
            value: JSON.stringify(_privyData)
        });
        if (_route) navigation.dispatch(StackActions.replace(_route));
    };
    const onBack = () => {
        // onSave(EposRoutes.SPAJ_SIGNATURE);
        if (verifPrivy || NEXT_STATUS.privyFilled) setBlockBackModal(true);
        else onSave(EposRoutes.SPAJ_SIGNATURE);
        return true;
    };

    const onGoToPayment = async () => {
        await updateSummaryByKey(proposalId, [
            //@ts-ignore
            { key: 'lastState', value: EposRoutes.SPAJ_PAYMENT },
        ]);
        navigation.dispatch(StackActions.replace(EposRoutes.SPAJ_PAYMENT));
    };

    const onSuccessGetUpfrontDecision = useCallback((data: UpfrontDecisionModel.Item) => {
        onUpdateUpfrontDecision(spajId, 'result', JSON.stringify(data));
        updateSummaryByKey(proposalId, [
            //@ts-ignore
            { key: 'lastState', value: EposRoutes.SPAJ_UNDERWRITING_DECISION },
        ]);
        navigation.dispatch(StackActions.replace(EposRoutes.SPAJ_UNDERWRITING_DECISION));
    }, [spajId]);

    const onErrorGetUpfrontDecision = () => {
        if (isUAT) {
            showModalFailedUpfrontRequest();
            return
        }
        onGoToPayment()
    };

    const onContinue = useCallback(async (skipUpfront?: boolean) => {

        if (NEXT_STATUS.privyCompleted || privyComplated || NEXT_STATUS.skippedPrivy) {
            onSave('', true);
            const isNeedUpfrontDecision = getValidationUpfront();
            if (isNeedUpfrontDecision && !skipUpfront) {
                await getUpfrontDecision({ params: transactionId, onSuccess: onSuccessGetUpfrontDecision, onError: onErrorGetUpfrontDecision });
                return;
            }
            onGoToPayment();
        } else if (!isSubmit) {
            setLoading(true);
            submitPrivyDocument();
            // checkStatusDocument()
        } else {

            checkStatusDocument();

        }
    }, [isSubmit, NEXT_STATUS, privyComplated, transactionId, getValidationUpfront]);

    const showModalFailedUpfrontRequest = () => {
        GlobalPromptModal.show({
            title: 'Tidak Dapat Membuka Halaman Keputusan Underwriting',
            subtitle:
                'Mohon maaf, saat ini Anda tidak dapat membuka halaman keputusan Underwriting. Silakan melanjutkan ke halaman berikutnya/',
            buttonPrimary: {
                text: 'Selanjutnya',
                onPress: () => {
                    GlobalPromptModal.close();
                    onContinue(true);
                },
            },
            buttonSecondary: {
                text: 'Coba Lagi',
                onPress: () => {
                    GlobalPromptModal.close();
                    onContinue();
                },
            },
        });
    };

    const openLoginAgen = () => {
        timerModalWrapper(() => setLoginAgenModal(true))
    };

    const getPrivyIdAgent = async (url: string) => {
        let urlTempSplit = url.split('code=');
        if (urlTempSplit.length == 2) {
            setLoading(true);
            setLoginAgenModal(false);
            const userToken = urlTempSplit[1];
            try {
                const param = { code: userToken };
                const privyData = await getPrivyIdByOuthPass(param);
                if (privyData) {
                    setVerifPrivy(true);
                    setPrivyIdAgent(privyData.privy_id);
                    setLoading(false);
                } else {
                    throw "Error Session end";
                }


            } catch (error) {
                showModalMaintenance()
            }
        }
    };

    const saveSPAJNumber = async (_spajNumber: string) => {
        await dispatch(updateEposState({ spajNumber: _spajNumber }));
        await updateSummaryByKey(proposalId, { key: 'spajNumber', value: _spajNumber });
    }

    const submitPrivyDocument = async () => {
        try {
            let _spajNumber = '';
            if (!spajNumber) {
                _spajNumber = await _generateSpajNumber()
                saveSPAJNumber(_spajNumber)
                setSpajNumberTemp(_spajNumber);
            }
            await onSave('');
            const submitData = await generateRequestUpfront({
                privyPh: privyIdPh == 'failed' ? '' : privyIdPh,
                privyAgent: privyIdAgent == 'failed' ? '' : privyIdAgent,
                privyLA: privyIdLA == 'failed' ? '' : privyIdLA,
                privyTT: privyIdTT == 'failed' ? '' : privyIdTT,
                privyPY: privyIdPY == 'failed' ? '' : privyIdPY,
            }, 'PRIVY', _spajNumber);

            if (!submitData.submission.id && !_spajNumber) {
                setLoading(false);
                showModalMaintenance()
                throw "Error Data Submit";
            } else {
                const submissionStatus = await submissionPrivy(submitData);
                if (submissionStatus) {
                    setLoading(false);
                    setIsSubmit(true);
                    setSucessSubmitModal(true);
                    await onSave('', true);

                } else {
                    setLoading(false);
                    showModalMaintenance()
                    throw "Error Data Submit";
                }
            }
        } catch (error) {
            setLoading(false);
            showModalMaintenance()
        }
    };

    const checkStatusDocument = async () => {
        setModalDocumentStatus(true);
        setLoadingChekDocument(true);
        try {
            const statusDocument = await getStatusDocumentPrivy(spajNumber || spajNumberTemp);
            // setLoading(false)
            if (!statusDocument || statusDocument.length > 0) {
                setstatusDokumenPrivy(statusDocument);
                setLoadingChekDocument(false);
            } else {
                setLoadingChekDocument(false);

            }
        } catch (error) {
            setLoadingChekDocument(false);

        }
    };

    const verifikasiData = async (dataClient: any, role: string) => {
        //check Dummy Data
        setModalVerifikasi(false);
        setLoading(true);
        setFailedVerif(false);
        setPrevTimeCountdown(new Date().toTimeString().split(' ')[0]);
        const privyData = newBussinesConfig?.privyIdDummy.find((item: any) => { return item.nik == dataClient.ktp && item.email.toLowerCase() == dataClient.email.toLowerCase() })
        if (privyData) {
            if (role == 'PH') setPrivyIdPh(privyData.privyId);
            else if (role == 'LA') setPrivyIdLA(privyData.privyId);
            else if (role == 'TT') setPrivyIdTT(privyData.privyId);
            else if (role == 'PY') setPrivyIdPY(privyData.privyId);
            setLoading(false);
            setVerifPrivy(true);
            setModalVerifikasi(false);
        } else {
            const dataKTP = docKtp || dataClient.fotoKTP
            const dataSelfie = docSelfie || dataClient.fotoSelfie
            const paramVerif = {
                email: dataClient.email,
                phone: dataClient.phoneNumber,
                nik: dataClient.ktp,
                nama: dataClient.name,
                tanggalLahir: dataClient.dob,
                channelId: 'pruforce-nb',
                selfie: dataSelfie.includes("data:image/jpeg;base64,") ? dataSelfie : "data:image/jpeg;base64," + dataSelfie,
                ktp: dataKTP.includes("data:image/jpeg;base64,") ? dataKTP : "data:image/jpeg;base64," + dataKTP
            };

            try {
                const statusVerification = await registrationPrivy(paramVerif);
                setLoading(false);
                setDocKtp('');
                setDocSelfie('');
                setUserToken(statusVerification.userToken);
                setModalVerifikasi(false);
                setSeconds(180);
                checkRegistPrivy(statusVerification.userToken);
                setFailedVerif(false);
                timerModalWrapper(() => setWaitingVerif(true));
            } catch (error) {
                setFailedVerif(true)
                setStatusVerif({
                    status: 'waiting',
                    message: "Verikasi Gagal"
                });
            }

            // setFailedVerif(true)
        }

    };

    const checkRegistPrivy = async (userTokenParam?: string) => {
        //du6qvbwtx2vf9q3o8ti54dfwbk342x1bpk5ir9l5681bmi1g93j0bmfoe29iy6qp dummy token invalid
        //atlpiodm2xyos3qdfjjndsbbkqdlrn1i2n0z6zqkv95f3huumyv17syf30rjwsne dummy token rejected
        //sh4rfvn93lzdlhlf95dpenow5ejp5ss1hk798fr2rwyq1y5xmrs5ef3wmzhu4vex dummy data waiting
        //lgipev7jfrdcocfjiij55igmkd18se6yqzx7jfu4x90yj566hddyklrbb9rsph19 dumy data verified
        const tempUserToken = userTokenParam || userToken;
        try {
            const statusRegistration = await getStatusRegistrationPrivy({ token: tempUserToken });
            if (statusRegistration?.status == 'invalid') {
                setWaitingVerif(false);
                clearInterval(timer);
                setFailedVerif(true);
                setStatusVerif({
                    status: 'invalid',
                    message: statusRegistration.message
                });
            } else if (statusRegistration?.status == 'rejected') {
                setWaitingVerif(false);
                setFailedVerif(true);
                clearInterval(timer);
                setStatusVerif({
                    status: 'rejected',
                    message: statusRegistration.message
                });
            } else if (statusRegistration?.status == 'verified' || statusRegistration?.status == 'registered') {
                setWaitingVerif(false);
                setFailedVerif(true);
                clearInterval(timer);
                setStatusVerif({
                    status: 'verified',
                    message: statusRegistration.message
                });

                if (role == 'PH') setPrivyIdPh(statusRegistration.privyId);
                else if (role == 'LA') setPrivyIdLA(statusRegistration.privyId);
                else if (role == 'TT') setPrivyIdTT(statusRegistration.privyId);
                else if (role == 'PY') setPrivyIdPY(statusRegistration.privyId);
            }
        } catch (error) {
            setFailedVerif(true);
            setStatusVerif({
                status: 'waiting',
                message: "Verikasi Gagal"
            });
        }

    };

    const onContinueModalVerification = () => {
        setFailedVerif(false);
        if (statusVerif.status == 'waiting') {
            if (reTryVerif < 2) {
                setSeconds(180);
                setFailedVerif(false);
                timerModalWrapper(() => setWaitingVerif(true));
                setReTryVerif((prev) => {
                    return prev + 1;
                });
                checkRegistPrivy(userToken);
            } else {
                if (role == 'PH') setPrivyIdPh('failed');
                else if (role == 'LA') setPrivyIdLA('failed');
                else if (role == 'TT') setPrivyIdTT('failed');
                else if (role == 'PY') setPrivyIdPY('failed');
                setReTryVerif(0);
            }
        } else if (statusVerif.status == 'invalid') {
            setReUploadData(true);
        } else if (statusVerif.status == 'rejected') {
            if (role == 'PH') setPrivyIdPh('failed');
            else if (role == 'LA') setPrivyIdLA('failed');
            else if (role == 'TT') setPrivyIdTT('failed');
            else if (role == 'PY') setPrivyIdPY('failed');
        }
    };

    const renderedStatusDocument = (documentData: any, dokumenName: string) => {
        const privyData = statusDokumenPrivy?.find((data: any) => {
            const documentName = data.data.filePath?.split('/');
            if (documentName) {
                const documentNameFix = documentName[documentName.length - 1].split('_')[0];
                if (documentData.documentName.includes(',')) {
                    const documentSplited = documentData.documentName.toLowerCase().split(',')
                    return documentSplited.includes(documentNameFix.toLowerCase());
                }
                return documentNameFix.toLowerCase() === documentData.documentName.toLowerCase();
            }
            return false;
        });
        if (privyData) {
            let statusDocument = STATUS_DOCUMENT[privyData.data.documentStatus];
            if (!statusDocument) {
                statusDocument = STATUS_DOCUMENT.Processing;
            }

            return (
                <StatusDocument testID={dokumenName} text={statusDocument.label} type={statusDocument.color} isRounded={false} />
            );
        }
        return (
            <StatusDocument testID={dokumenName} text={STATUS_DOCUMENT.onSubmit.label} type={STATUS_DOCUMENT.onSubmit.color} isRounded={false} />
        );
    };


    return (
        <>
            {loading && <LoadingFull />}
            <PruScreen backgroundColor={PruColor.greyf8}>
                <View style={plaiStyles.flex}>
                    <EposHeader wrapperStyle={plaiStyles.spacing} />
                    <ScrollView>
                        <View style={plaiStyles.mx16}>
                            <Text style={plaiStyles.fontHeaderTitle}>Tanda Tangan Digital</Text>
                            <Text style={[plaiStyles.mt8, plaiStyles.fontGrey66Thin]}>
                                Kami membutuhkan tanda tangan digital Anda untuk mempermudah proses pengajuan Polis.
                            </Text>
                        </View>
                        <PrivyCardSign
                            role='AG'
                            name={DATA_AGENT.agentName}
                            code={DATA_AGENT.agentCode}
                            privyId={privyIdAgent}
                            onPress={() => {
                                setRole('AG');
                                setModalDisclaimer(true);
                            }}
                        />

                        <PrivyCardSign
                            role='PH'
                            name={DATA_CLIENT.name}
                            email={DATA_CLIENT.email}
                            privyId={privyIdPh}
                            onPress={() => {
                                setRole("PH");
                                setModalDisclaimer(true);
                            }}
                        />

                        {
                            RSQSData?.additionalLifeAssuredSelf && RSQSData?.additionalLifeAssuredSelf != 'self' && DATA_CLIENT_TT.dob && calculateAge(DATA_CLIENT_TT.dob) >= 17 &&
                            <PrivyCardSign
                                role='TT'
                                name={DATA_CLIENT_TT.name}
                                email={DATA_CLIENT_TT.email}
                                privyId={privyIdTT}
                                onPress={() => {
                                    setRole("TT");
                                    setModalDisclaimer(true);
                                }}
                            />
                        }

                        {
                            RSQSData?.lifeAssuredSelf != 'self' && DATA_CLIENT_LA.dob && calculateAge(DATA_CLIENT_LA.dob) >= 17 &&
                            <PrivyCardSign
                                role='LA'
                                isSharia={SummaryProposalById?.shariaFlag!}
                                name={DATA_CLIENT_LA.name}
                                email={DATA_CLIENT_LA.email}
                                privyId={privyIdLA}
                                onPress={() => {
                                    setRole("LA");
                                    setModalDisclaimer(true);
                                }}
                            />
                        }

                        {
                            (RSQSData?.prospectivePremiumPayor == 'Other' || isPremiumPayorSPAJ == 'N') &&
                            <PrivyCardSign
                                role='PY'
                                isSharia={SummaryProposalById?.shariaFlag!}
                                name={DATA_CLIENT_PY.name}
                                email={DATA_CLIENT_PY.email}
                                privyId={privyIdPY}
                                onPress={() => {
                                    setRole("PY");
                                    setModalDisclaimer(true);
                                }}
                            />
                        }


                    </ScrollView>
                </View>

                <ModalContainer visible={loginAgenModal} onClose={() => {
                    setLoginAgenModal(prev => !prev);
                }} styleWrapper={[plaiStyles.flex]}>
                    <WebView
                        cacheEnabled={false}
                        incognito={true}
                        source={{ uri: loginAgent }}
                        onNavigationStateChange={(value) => {

                            getPrivyIdAgent(value.url);
                        }}
                    />
                </ModalContainer>

                <ModalContainer
                    visible={modalDisclaimer}
                    onClose={() => { setModalDisclaimer(prev => !prev); }}
                    titleHeader='Tanda Tangan Digital'
                >
                    <ScrollView>
                        <Text style={[plaiStyles.fontGrey33Thin, plaiStyles.font14, plaiStyles.lineH20, plaiStyles.mb10]}>Tanda Tangan Digital telah tersedia. Silakan klik lanjutkan untuk melakukan verifikasi data nasabah.</Text>
                        <Text style={[plaiStyles.fontGrey33Thin, plaiStyles.font14, plaiStyles.lineH20, plaiStyles.mb10]}>Persetujuan Penggunaan Tanda Tangan Digital:</Text>
                        <Text style={[plaiStyles.fontGrey33Thin, plaiStyles.font14, plaiStyles.lineH20, plaiStyles.mb10]} >{`Anda akan menggunakan tanda tangan elektronik untuk menandatangani dokumen elektronik dengan ${shariaPT}.\n\n${shariaPT} bekerja sama dengan PT Privy Identitas Digital selaku Penyelenggara Tanda Tangan Elektronik tersertifikasi dan Penyelenggara Sertifikasi Elektronik yang berinduk pada Kementerian Komunikasi dan Informatika Republik Indonesia dalam merek Privy.\n\nDengan ini, Anda menyatakan setuju untuk mendaftar sebagai pengguna Privy untuk melakukan data pembuatan tanda tangan elektronik dan diterbitkan sertifikat elektronik oleh PT Privy Identitas Digital dalam rangka penggunaan layanan Tanda Tangan Elektronik untuk menandatangani dokumen elektronik.\n\nAnda memberi kuasa kepada ${shariaPT} untuk memberikan data Kartu Tanda Penduduk ("KTP"), swafoto, nomor ponsel dan alamat surel Anda sebagai persyaratan data pendaftaran kepada PT Privy Identitas Digital guna memenuhi ketentuan Peraturan Perundang-undangan, yaitu Peraturan Pemerintah Nomor 71 Tahun 2019 tentang Penyelenggaraan Sistem dan Transaksi Elektronik, dan peraturan Kementrian Informasi dan Komunikasi Nomor 11 Tahun 2018 tentang Penyelenggaraan Sertifikasi Elektronik.\n\nDengan ini Anda menyatakan setuju untuk terikat pada syarat dan ketentuan layanan Privy yang terdapat pada tautan berikut: `}
                            <TouchableWithoutFeedback onPress={() => { Linking.openURL('https://privy.id/id/kebijakan-privasi'); }}>
                                <Text style={plaiStyles.fontRedThin}>
                                    Kebijakan Privasi
                                </Text>
                            </TouchableWithoutFeedback>
                            {` dan `}
                            <TouchableWithoutFeedback onPress={() => { Linking.openURL('https://privy.id/id/ketentuan-penggunaan'); }}>
                                <Text style={plaiStyles.fontRedThin}>
                                    Syarat dan Ketentuan Privy
                                </Text>
                            </TouchableWithoutFeedback>
                        </Text>
                    </ScrollView>

                    <Button
                        style={[plaiStyles.bgBtnRed, plaiStyles.br12, plaiStyles.mt16]}
                        textStyle={[plaiStyles.fontWhite, plaiStyles.py16]}
                        text={'Setuju dan Lanjutkan'}
                        onPress={() => {
                            setModalDisclaimer(false);
                            if (role == 'AG') {
                                openLoginAgen();
                            } else {
                                timerModalWrapper(() => setModalVerifikasi(true))
                            }
                        }}
                        {...pruTestID(`agreement-button`)}
                    />
                    {
                        role == 'AG' &&
                        <Button
                            style={[plaiStyles.bgBtnSecondary, plaiStyles.br12, plaiStyles.mt16]}
                            textStyle={[plaiStyles.fontRed, plaiStyles.py16]}
                            text={'Lewati & Gunakan E-Sign'
                            }
                            onPress={() => {
                                setModalDisclaimer(false);
                                setPrivyIdAgent('failed');
                            }}
                            {...pruTestID(`E-sign-button`)}
                        />
                    }

                </ModalContainer>

                <VerificationClien
                    isVisible={modalVerifikasi}
                    clientData={clientDataModal}
                    type='verification'
                    onClose={() => { setModalVerifikasi(false); }}
                    onPress={() => { verifikasiData(clientDataModal, role); }}
                />

                <VerificationClien
                    isVisible={reUploadData}
                    clientData={clientDataModal}
                    type='docUpl'
                    docKtp={docKtp}
                    docSelfie={docSelfie}
                    onCaptureKtp={(value) => { setDocKtp(value); }}
                    onCaptureSelfie={(value) => { setDocSelfie(value); }}
                    onClose={() => { setReUploadData(false); }}
                    onPress={() => {
                        setReUploadData(false);
                        verifikasiData(clientDataModal, role);
                    }}
                />


                <ModalContainer
                    visible={modalDocumentStatus}
                    onClose={() => { setModalDocumentStatus(false); }}
                    titleHeader='Status Dokumen'
                >
                    <View>
                        <FlatList
                            data={GENERATE_LIST_FORM}
                            renderItem={({ item }) => {
                                return (
                                    <View style={[plaiStyles.row, plaiStyles.my16]}>
                                        <View style={[plaiStyles.flex]}>
                                            <Text
                                                style={[plaiStyles.fontGrey33Thin, plaiStyles.font14, plaiStyles.lineH20]}
                                            >
                                                {item.label}
                                            </Text>
                                        </View>
                                        <View>
                                            {
                                                loadingChekDocument ? <PruActivityIndicator /> : renderedStatusDocument(item, item?.documentName)
                                            }

                                        </View>
                                    </View>
                                );
                            }}
                        />
                    </View>

                    <Button
                        style={[NEXT_STATUS.privyCompleted || privyComplated ? plaiStyles.bgBtnRed : plaiStyles.bgBtnSecondary, plaiStyles.br12, plaiStyles.mt16]}
                        textStyle={[NEXT_STATUS.privyCompleted || privyComplated ? plaiStyles.fontWhite : plaiStyles.fontRed, plaiStyles.py16]}
                        text={NEXT_STATUS.privyCompleted || privyComplated ? 'Selanjutnya' : 'Segarkan'}
                        onPress={() => { onContinue(); }}
                        {...pruTestID(`refresh-button`)}
                    />

                </ModalContainer>

                <ModalContainer
                    visible={waitingVerif}
                >
                    <View style={[plaiStyles.spacing]}>
                        <Image
                            source={shape}
                        />
                        <Text style={[plaiStyles.fontBlackBold, plaiStyles.font18, plaiStyles.lineH24]}>Data Sedang Diverifikasi</Text>
                        <Text style={[plaiStyles.fontGrey66Thin, plaiStyles.lineH20]}>Verifikasi data sedang berjalan, mohon menunggu beberapa saat.</Text>
                        <Text style={[plaiStyles.fontGrey66Thin, plaiStyles.lineH20]}>{formatTime(seconds)}</Text>
                    </View>
                </ModalContainer>





                {/* failedVerif */}
                <ModalContainer
                    visible={failedVerif}
                >
                    <View style={[plaiStyles.spacing]}>
                        {statusVerif.status != 'verified' &&
                            <Image
                                source={taskfailed}
                                style={[{ width: 52, height: 52 }]}
                            />
                        }
                        <Text style={[plaiStyles.fontBlackBold, plaiStyles.font18, plaiStyles.lineH24]}>
                            {statusVerif.status == 'rejected' ?
                                `Verifikasi Data Ditolak` :
                                statusVerif.status == 'invalid' ?
                                    `Verifikasi Data Tidak valid` :
                                    statusVerif.status == 'waiting' ? `Verifikasi Gagal` :
                                        `Verifikasi Berhasil`
                            }

                        </Text>
                        <Text style={[plaiStyles.fontGrey66Thin, plaiStyles.lineH20]}>
                            {
                                statusVerif.status == 'verified' ? `Verifikasi tanda tangan digital berhasil. Mohon periksa Email Anda untuk mendapatkan info akun PrivyId.` :
                                    statusVerif.status == 'waiting' ? `Verifikasi data gagal, silakan coba lagi untuk melakukan verifikasi kembali.` :
                                        statusVerif.message
                            }
                        </Text>
                    </View>

                    {statusVerif.status == 'waiting' && reTryVerif >= 2 &&
                        <Button
                            style={[plaiStyles.bgBtnSecondary, plaiStyles.br12, plaiStyles.mt16]}
                            textStyle={[plaiStyles.fontRed, plaiStyles.py16]}
                            text={'Coba Lagi'
                            }
                            onPress={() => {
                                setSeconds(180);
                                setFailedVerif(false);
                                timerModalWrapper(() => setWaitingVerif(true));
                                setReTryVerif((prev) => {
                                    return prev + 1;
                                });
                                checkRegistPrivy(userToken);
                            }}
                            {...pruTestID(`try-again-button`)}
                        />
                    }

                    <Button
                        style={[plaiStyles.bgBtnRed, plaiStyles.br12, plaiStyles.mt16]}
                        textStyle={[plaiStyles.fontWhite, plaiStyles.py16]}
                        text={['verified', 'invalid'].includes(statusVerif.status) ? 'Lanjutkan' :
                            statusVerif.status == 'waiting' && reTryVerif < 2 ? 'Coba Lagi' : `Gunakan E-Sign`
                        }
                        onPress={() => {
                            if (!userToken) {
                                verifikasiData(clientDataModal, role);
                            } else {
                                onContinueModalVerification();
                            }
                        }}
                        {...pruTestID(`status-verified-button`)}
                    />
                </ModalContainer>

                <ModalInformation
                    visible={sucessSubmitModal}
                    title='Dokumen Terkirim'
                    desc='Dokumen proposal berhasil dikirim. Mohon periksa email Anda dan Nasabah untuk mendapatkan tautan tanda tangan digital.'
                    buttonPrimary={
                        {
                            text: 'Tutup',
                            onPress: () => {
                                setSucessSubmitModal(false);
                            }
                        }
                    }
                />

                <ModalInformation
                    visible={blockBackModal}
                    title='Tidak Dapat Kembali'
                    desc='Mohon maaf, Anda tidak dapat kembali ke halaman sebelumnya, karena sedang/telah melakukan proses verifikasi tanda tangan digital.'
                    buttonPrimary={
                        {
                            text: 'Tutup',
                            onPress: () => {
                                setBlockBackModal(false);
                            }
                        }
                    }
                />

                <EposFooter
                    position={100}
                    leftButton={{
                        onPress: () => { onBack(); },
                    }}
                    rightButton={{
                        text: NEXT_STATUS.privyCompleted || privyComplated || NEXT_STATUS.skippedPrivy ? 'Selanjutnya' : !isSubmit ? 'Kirim Dokumen' : 'Cek Status',
                        disabled: !NEXT_STATUS.privyFilled,
                        onPress: () => onContinue(),
                    }}
                />
            </PruScreen>
        </>
    );
};
