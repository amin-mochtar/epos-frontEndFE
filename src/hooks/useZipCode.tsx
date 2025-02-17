import { PROVINCE_DATA, useCommonDataRealm } from "plai_common_frontend"

export function useZipCode() {
    const { getZipCodeById } = useCommonDataRealm()

    const onZipCodeAutoFill = (setValue: any, field: string[], zipCode: string) => {
        const zipCodeData = getZipCodeById(zipCode)
        if (zipCodeData.statusCode == 200) {
            const indexProvince = PROVINCE_DATA.findIndex((item) => item.label == zipCodeData!.data!.province);
            const _province = PROVINCE_DATA[indexProvince];
            setValue(field[0], zipCodeData!.data!.kecamatan, { shouldValidate: true });
            setValue(field[1], _province, { shouldValidate: true });
            setValue(field[2], zipCodeData!.data!.kabupaten, { shouldValidate: true });
        }
    }

    return { onZipCodeAutoFill }
}