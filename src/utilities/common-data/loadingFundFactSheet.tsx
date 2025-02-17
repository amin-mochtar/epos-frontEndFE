import { View, Text, Dimensions } from 'react-native';
import React, { useEffect, useState } from 'react';
import { ModalContainer, TCommonData, plaiStyles, useCommonDataRealm } from 'plai_common_frontend';
import { Button } from 'common_ui_components/app/components-ui';
import * as Progress from 'react-native-progress';
import { PruColor } from 'common_ui_components';
import { IFundFactSheet, useEposRealm } from '../../database';
import { getFundFactSheetListDoc, getFundFactSheetDoc } from '../../network';
import { set } from 'lodash';


const _LoadingFundFactSheet = (
    { selectedFund, setFundFactSheetFormVisible, finishDownloadConfirmation, setLoading }: {
        selectedFund: any, setFundFactSheetFormVisible: any, finishDownloadConfirmation: () => void; setLoading: any;
    }) => {
    const { onInsertData, getCommonDataDetailById } = useCommonDataRealm();

    const [visible, setVisible] = useState(false);
    const [indexDownload, setIndexDownload] = useState<number>(0);
    const [numberDownload, setNumberDownload] = useState<number>(selectedFund.length);
    const { updateFundFactSheetDoc, getFundFactSheetDocRealm, deleteAllFundFactSheetDocRealm } = useEposRealm();
    const [error, setError] = useState({
        status: false,
        message: ''
    });
    // const [confirmRetry, setConfirmRetry] = useState(false)
    const [confirmCancel, setConfirmCancel] = useState(false);

    useEffect(() => {
        if (indexDownload === numberDownload) {
            // butuh pake timeout karena effek loading nya ga keluar kalo langsung di hit function nya, dan terlihat seperti tidak mendownload apapun, padahal indexDownload nya sudah terupdate.
            setTimeout(() => {
                finishDownloadConfirmation();
            }, 500);
        }
    }, [indexDownload]);

    useEffect(() => {
        initialSetup();
    }, []);

    const onSaveRealm = async () => {
        // API untuk ambil list Fund nya dulu
        const fundList = await getFundFactSheetListDoc();
        //  input data fundlist to Realm
        const data = {
            name: 'fundFactSheet',
            data: JSON.stringify(fundList),
            version: `fundFactSheet`,
            createdDate: `${new Date()}`,
            updatedDate: `${new Date()}`
        };

        if (!fundList) {
            setVisible(true);
            setError({ status: true, message: 'Terjadi masalah saat mengunduh Dokumen Fund Factsheet. Silakan periksa koneksi Anda dan coba lagi.' });
            setConfirmCancel(true);
        } else {
            await onInsertData(data);
            return fundList;
        }
    };

    const isDownloadPassed = async (realmFundList: TCommonData, realmFundfData: IFundFactSheet[]) => {
        const currentDate = new Date();
        const month = currentDate.getMonth();
        const day = currentDate.getDate();

        if (realmFundList) {
            // const realmDate = new Date('January 20 00:00:00');
            const realmDate = new Date(realmFundList.createdDate);
            const realmDay = realmDate.getDate();
            const realmMonth = realmDate.getMonth();
            // check if data expired or not
            if (month !== realmMonth || (day > 20 && realmDay < 21)) {
                deleteAllFundFactSheetDocRealm();
                const fundList = await onSaveRealm();
                return { passed: true, fundList: fundList };
            }
            // if not expired download not needed but still need check if there is new ffsDoc check or not
            const result = selectedFund.filter((item: any) => {
                const fundId = item.type_ui;
                const dataTemp = realmFundfData.find((el) => el.fundId === fundId);
                return !dataTemp; // Mengembalikan true jika dataTemp tidak ditemukan
            });

            if (result.length) {
                // untuk masukin total download yang baru.
                setNumberDownload(result.length);
                return { passed: true, fundList: JSON.parse(realmFundList.data) };
            }
            return { passed: false, undefined };
        } else {
            const fundList = await onSaveRealm();
            return { passed: true, fundList: fundList };
        }
    };

    const initialSetup = async () => {
        // get data FundList from Realm
        const realmFundList: any = getCommonDataDetailById('fundFactSheet');
        // isi base64 yang sudah di download
        const realmFundfData: any = getFundFactSheetDocRealm();

        const { passed, fundList } = await isDownloadPassed(realmFundList, realmFundfData);
        if (passed && fundList) {
            selectedFund.forEach(async (item: any) => {
                setVisible(true);
                const fundId = item.type_ui;
                const dataTemp = realmFundfData.find((el) => el.fundId === fundId);

                // API untuk ambil data base64 sesuai dari fundlist ID yang di dapat
                const fundFactSheetDoc = await getFundFactSheetDoc(fundList[fundId]?.id as string);
                if (!fundFactSheetDoc) {
                    setError({ status: true, message: 'Terjadi masalah saat mengunduh Dokumen Fund Factsheet. Silakan periksa koneksi Anda dan coba lagi.' });
                    setConfirmCancel(true);
                } else if (!dataTemp) {
                    const body = {
                        fundId: fundId,
                        period: fundList[fundId].period,
                        data: fundFactSheetDoc.content,
                        nameDoc: fundFactSheetDoc.name,
                    };
                    // update realm fundfact sheet
                    updateFundFactSheetDoc(body);
                    setIndexDownload(prev => prev! + 1);
                }
            });
        } else {
            if (!passed) setLoading(true);
            setTimeout(() => {
                finishDownloadConfirmation();
            }, 300);
        }
    };

    // ada kemungkinan di pakai tergantung tambahan skenario
    const onConfirmRetry = () => {
        setError({ status: false, message: '' });
        initialSetup();
    };
    const onCanceled = () => {
        setConfirmCancel(true);
        setVisible(false);
        setFundFactSheetFormVisible(false);
    };

    return (
        <ModalContainer visible={visible}>
            <Text style={[plaiStyles.fontBold, plaiStyles.fontBlack, plaiStyles.font18]}>{error.status ? 'Gagal Mengunduh Data' : 'Mengunduh Fund Factsheet'}</Text>
            <Text style={[plaiStyles.fontGrey66Thin, plaiStyles.mt8]}>{error.status ? error.message : 'Dokumen Fund Factsheet yang sedang diunduh. Mohon menunggu beberapa saat.'}</Text>
            {
                !error.status &&
                (<>
                    <Progress.Bar
                        style={plaiStyles.mt24}
                        progress={indexDownload / numberDownload || 0}
                        width={Dimensions.get('window').width - 40}
                        borderRadius={10}
                        borderWidth={0}
                        color={PruColor.majorRed}
                        unfilledColor="#D9D9D9"
                    />
                    <View style={[plaiStyles.row, plaiStyles.justifyBetween, plaiStyles.mt8]}>
                        <Text style={plaiStyles.fontGrey66Thin}>Mengunduh..</Text>
                        <Text style={plaiStyles.fontGrey66Thin}>{`${indexDownload} / ${numberDownload || 0}`}</Text>
                    </View>
                </>)
            }
            {error.status && <Button style={plaiStyles.mt24} text='Coba Lagi' preset='tertiary' onPress={onConfirmRetry} />}
            {confirmCancel &&
                < Button style={plaiStyles.mt24} text='Tutup' preset='primary' onPress={onCanceled} />
            }
        </ModalContainer>
    );
};

export const LoadingFundFactSheet = ({ selectedFund, fundFactSheetVisible, setFundFactSheetFormVisible, finishDownloadConfirmation, setLoading }: {
    selectedFund: any, fundFactSheetVisible: boolean, setFundFactSheetFormVisible: any, finishDownloadConfirmation: () => void; setLoading: any;
}) => {
    if (fundFactSheetVisible)
        return (
            <_LoadingFundFactSheet
                selectedFund={selectedFund}
                setFundFactSheetFormVisible={setFundFactSheetFormVisible}
                finishDownloadConfirmation={finishDownloadConfirmation}
                setLoading={setLoading} />
        );
};