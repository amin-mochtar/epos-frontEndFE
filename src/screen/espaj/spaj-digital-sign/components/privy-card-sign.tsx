import { plaiStyles } from "plai_common_frontend";
import React, { useMemo } from "react";
import { Image, Text } from "react-native";
import { View } from "react-native";
import { Button } from 'common_ui_components/app/components-ui';
import { Subtitle } from "native-base";
import { warning_icon } from "epos_frontend/src/assets";
import { pruTestID } from "common_services_frontend";



type TPrivyCardSign = {
    role: string,
    name: string,
    code?: string,
    email?: string,
    privyId?: string,
    isSharia?: string
    onPress: () => void
}
export const PrivyCardSign = (
    {
        role,
        name,
        code,
        email,
        privyId,
        isSharia,
        onPress
    }: TPrivyCardSign
) => {
    const roleWording = useMemo(() => {
        if (role == "AG") {
            return {
                headerCard: "Tanda Tangan Tenaga Pemasar",
                nameTitle: 'Tenaga Pemasar',
                subTitle: 'Kode Tenaga Pemasar'
            }
        } else if (role == 'PH') {
            return {
                headerCard: "Tanda Tangan Calon Pemegang Polis",
                nameTitle: 'Pemegang Polis',
                subTitle: 'Email'
            }
        } else if (role == 'TT') {
            return {
                headerCard: "Tanda Tangan Peserta Tambahan",
                nameTitle: 'Peserta Tambahan',
                subTitle: 'Email'
            }
        } else if (role == 'LA') {
            return {
                headerCard: `Tanda Tangan ${isSharia == 'sharia' ? 'Calon Peserta Utama' : `Calon Tertanggung Utama`}`,
                nameTitle: `${isSharia == 'sharia' ? 'Peserta Utama' : `Tertanggung Utama`}`,
                subTitle: 'Email'
            }
        } else if (role == 'PY') {
            return {
                headerCard: `Tanda Tangan ${isSharia == 'sharia' ? 'Calon Pembayar Kontribusi' : `Calon Pembayar Premi`}`,
                nameTitle: `${isSharia == 'sharia' ? 'Pembayar Kontribusi' : `Pembayar Premi`}`,
                subTitle: 'Email'
            }
        }
        return {
            headerCard: '',
            nameTitle: '',
            subTitle: ''
        }
    }, [role])
    return (
        <View style={[plaiStyles.spacingp, plaiStyles.my8, plaiStyles.flex, plaiStyles.bgwhite]}>
            <Text style={[plaiStyles.fontGrey33Bold, plaiStyles.font16, plaiStyles.lineH24]}>{roleWording.headerCard}</Text>
            <Text style={[plaiStyles.fontGrey99Thin, plaiStyles.font14, plaiStyles.lineH20]}>{roleWording.nameTitle}</Text>
            <Text style={[plaiStyles.fontGrey33Bold, plaiStyles.font14, plaiStyles.lineH20]}>{name}</Text>
            <Text style={[plaiStyles.fontGrey99Thin, plaiStyles.font14, plaiStyles.lineH20]}>{roleWording.subTitle}</Text>
            <Text style={[plaiStyles.fontGrey33Bold, plaiStyles.font14, plaiStyles.lineH20]}>{role == 'AG' ? code : email}</Text>
            {
                !privyId ?
                    <Button
                        style={[plaiStyles.bgBtnSecondary, plaiStyles.mt16]}
                        textStyle={[plaiStyles.fontRed]}
                        text={'Mulai Tanda Tangan'}
                        onPress={onPress}
                        {...pruTestID(`signature-privy-button-${name}`)}
                    /> : privyId == 'failed' ?
                        <View style={[plaiStyles.mt16, plaiStyles.px12, plaiStyles.py16, plaiStyles.warningCard, plaiStyles.row, plaiStyles.alignStart]}>
                            <Image style={[plaiStyles.mr8]} source={warning_icon} />
                            <Text style={[plaiStyles.fontOrange, plaiStyles.font12, plaiStyles.lineH16]}>{role != 'AG' ? `Proses registrasi untuk Tanda Tangan Digital tidak berhasil. Tanda Tangan Anda akan diaktifkan menggunakan E-Sign.` : `Tanda Tangan Anda akan diaktifkan menggunakan E-Sign.`}</Text>
                        </View>
                        :

                        <View style={[plaiStyles.flex, plaiStyles.bgGrey, { borderRadius: 8, flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }]}>
                            <Text style={[plaiStyles.fontGrey99, plaiStyles.font14, plaiStyles.lineH24, plaiStyles.my24]}>Privy ID {privyId}</Text>
                        </View>
            }
        </View>
    )
}