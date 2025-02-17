import { InputImage, ModalContainer, plaiStyles } from "plai_common_frontend";
import React, { useMemo } from "react";
import { ScrollView, Text } from "react-native";
import { View } from "react-native";
import { Button } from 'common_ui_components/app/components-ui';
import { Subtitle } from "native-base";
import { pruTestID } from "common_services_frontend";



type TVerificationClient = {
    clientData: {
        name: string,
        email: string,
        ktp: string,
        phoneNumber: string,
        dob: string
    },
    type: 'verification' | 'docUpl'
    isVisible: boolean
    docKtp?: string
    docSelfie?: string
    onCaptureKtp?: (value: string) => void
    onCaptureSelfie?: (value: string) => void
    onPress: () => void
    onClose: () => void
}
export const VerificationClien = (
    {
        clientData,
        isVisible = false,
        type = 'verification',
        docKtp = '',
        docSelfie = '',
        onCaptureKtp,
        onCaptureSelfie,
        onPress,
        onClose
    }: TVerificationClient
) => {
    return (
        <ModalContainer
            visible={isVisible}
            onClose={() => { onClose() }}
            titleHeader={type == 'verification' ? 'Verifikasi Data' : 'Dokumen Pendukung'}
        >
            <ScrollView>
                {
                    type == 'verification' &&
                    <Text>Pastikan data yang ditampilkan telah sesuai dengan data yang telah Anda masukkan.</Text>
                }

                <View style={[plaiStyles.my8]}>
                    <Text
                        style={[plaiStyles.fontGrey99]}
                    >Nama</Text>
                    <Text
                        style={[plaiStyles.fontBlackBold]}
                    >
                        {clientData.name}
                    </Text>
                    <View style={[plaiStyles.bgGrey, { height: 1 }]} />
                </View>

                <View style={[plaiStyles.my8]}>
                    <Text
                        style={[plaiStyles.fontGrey99]}
                    >Nomor KTP/Paspor</Text>
                    <Text
                        style={[plaiStyles.fontBlackBold]}
                    >
                        {clientData.ktp}
                    </Text>
                    <View style={[plaiStyles.bgGrey, { height: 1 }]} />
                </View>
                {
                    type == 'verification' &&
                    (
                        <>
                            <View style={[plaiStyles.my8]}>
                                <Text
                                    style={[plaiStyles.fontGrey99]}
                                >Tanggal Lahir</Text>
                                <Text
                                    style={[plaiStyles.fontBlackBold]}
                                >
                                    {clientData.dob}
                                </Text>
                                <View style={[plaiStyles.bgGrey, { height: 1 }]} />
                            </View>
                            <View style={[plaiStyles.my8]}>
                                <Text
                                    style={[plaiStyles.fontGrey99]}
                                >Nomer HP</Text>
                                <Text
                                    style={[plaiStyles.fontBlackBold]}
                                >
                                    {clientData.phoneNumber}
                                </Text>
                                <View style={[plaiStyles.bgGrey, { height: 1 }]} />
                            </View>
                            <View style={[plaiStyles.my8]}>
                                <Text
                                    style={[plaiStyles.fontGrey99]}
                                >Email</Text>
                                <Text
                                    style={[plaiStyles.fontBlackBold]}
                                >
                                    {clientData.email}
                                </Text>
                                <View style={[plaiStyles.bgGrey, { height: 1 }]} />
                            </View>
                            <View style={[plaiStyles.my8]}>
                                <Text
                                    style={[plaiStyles.fontGrey99]}
                                >Foto Selfie</Text>
                                <Text
                                    style={[plaiStyles.fontBlackBold]}
                                >
                                    {'File Foto Selfie PH'}
                                </Text>
                                <View style={[plaiStyles.bgGrey, { height: 1 }]} />
                            </View>
                            <View style={[plaiStyles.my8]}>
                                <Text
                                    style={[plaiStyles.fontGrey99]}
                                >Foto KTP</Text>
                                <Text
                                    style={[plaiStyles.fontBlackBold]}
                                >
                                    {'File Foto KTP PH'}
                                </Text>
                                <View style={[plaiStyles.bgGrey, { height: 1 }]} />
                            </View>
                        </>
                    )
                }
                {
                    type == 'docUpl' &&
                    (
                        <>
                            <View style={[plaiStyles.my8]}>
                                <Text
                                    style={[plaiStyles.fontGrey99]}
                                >Foto Selfie</Text>
                                <InputImage
                                    value={docSelfie} onChange={(value) => { onCaptureSelfie(value) }} buttonText={'Upload Image'}
                                />
                            </View>
                            <View style={[plaiStyles.my8]}>
                                <Text
                                    style={[plaiStyles.fontGrey99]}
                                >Foto KTP</Text>
                                <InputImage
                                    value={docKtp} onChange={(value) => { onCaptureKtp(value) }} buttonText={'Upload Image'}
                                />
                            </View>
                        </>
                    )
                }

            </ScrollView>
            <Button
                style={[plaiStyles.bgBtnRed, plaiStyles.br12, plaiStyles.mt16]}
                textStyle={[plaiStyles.fontWhite]}
                text={'Kirim'}
                onPress={() => { onPress() }}
                {...pruTestID(`send-button-${type}`)}
            />

        </ModalContainer>
    )
}