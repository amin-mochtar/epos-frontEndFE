import { AgentProfile } from "common_services_frontend";
import { ModalInformation } from "plai_common_frontend";

type TEposPMKModal = {
    isSharia: boolean | undefined;
    isShow: boolean | undefined;
    onPressModal: (isPMKValid: boolean) => void;
}

export const EposPMKModal = ({ isSharia = false, onPressModal, isShow = false }: TEposPMKModal) => {
    const isShariaText = isSharia ? 'Syariah' : 'Konvensional';
    const isCompanyShariaText = isSharia ? 'PT Prudential Sharia Life Assurance' : 'PT Prudential Life Assurance';
    const modalDescText = `Anda Belum submit PK dan/atau PMK ${isShariaText} yang berlaku di ${isCompanyShariaText}, harap lengkapi sebelum dapat berjualan produk ${isShariaText}`;

    return (
        <ModalInformation
            visible={isShow}
            desc={modalDescText}
            buttonPrimary={{
                text: 'Ok',
                onPress: () => onPressModal(false),
            }}
        />
    )
}