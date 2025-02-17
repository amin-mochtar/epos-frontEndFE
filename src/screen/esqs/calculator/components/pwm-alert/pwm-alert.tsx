import { View, Text } from 'react-native'
import React, { memo, useMemo } from 'react'
import { NoticeBar } from '../notice-bar/notice-bar'
import { ICustomerStorage } from '../../../../../utilities'

export const PWMAlert = memo(({ productType, customerData }: { productType: string, customerData: ICustomerStorage }) => {
    const wording: { [key: string]: any } = {
        sharia: {
            one: 'Untuk menjual Produk Asuransi PRUWell Medical Syariah, Agen disyaratkan telah mengikuti dan lulus tes PRUWell Medical Syariah',
            second: 'Peserta Yang Diasuransikan hanya dapat memiliki satu produk asuransi kesehatan. Apabila Peserta Yang Diasuransikan sudah memiliki produk asuransi kesehatan lainnya (Asuransi Dasar atau Asuransi Tambahan), diharapkan agar Pemegang Polis mengisi Form Major Alteration atau Form Surrender untuk menghapus manfaat produk asuransi kesehatan yang telah dimiliki oleh Peserta Yang Diasuransikan agar Manfaat Asuransi PRUWell Medical Syariah dapat diterbitkan',
        },
        conventional: {
            one: 'Untuk menjual Produk Asuransi PRUWell Medical, Agen disyaratkan telah mengikuti dan lulus tes PRUWell Medical',
            second: 'Tertanggung hanya dapat memiliki satu produk asuransi kesehatan. Apabila Tertanggung sudah memiliki produk asuransi kesehatan lainnya (Asuransi Dasar atau Asuransi Tambahan), diharapkan agar Pemegang Polis mengisi Form Major Alteration atau Form Surrender untuk menghapus manfaat produk asuransi kesehatan yang telah dimiliki oleh Tertanggung agar Manfaat Asuransi PRUWell Medical dapat diterbitkan.'
        }
    }

    const { minThirtyDay, maxSeventyFiveYear } = useMemo(() => {

        // @ts-ignore
        const ageOnDay = (new Date() - new Date(customerData.clientDateBirth)) / (1000 * 60 * 60 * 24)

        return {
            minThirtyDay: Math.round(ageOnDay) < 30,
            maxSeventyFiveYear: customerData.clientAnb > 75
        }
    }, [])

    return (
        <View>
            <NoticeBar message={wording[productType].second} type={'WARNING'} />
        </View>
    )
})