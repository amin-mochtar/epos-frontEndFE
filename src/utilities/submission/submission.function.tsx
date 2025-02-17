import { GlobalPromptModal } from "plai_common_frontend";
import { failure } from "../../assets";
import i18next from "i18next";

export const showModalDialogSubmitDoksul = (callback?: () => void) => {
  GlobalPromptModal.show({
    title: 'Submit Dokumen',
    subtitle: 'Apakah Anda yakin submit dokumen susulan?',
    buttonPrimary: {
      text: 'Ya',
      onPress: () => {
        callback?.()
        GlobalPromptModal.close();
      }
    },
    buttonSecondary: {
      text: 'Tidak',
      onPress: () => {
        GlobalPromptModal.close();
      }
    },
  })
}
export const showModalFailedSubmitDoksul = (callback?: () => void) => {
  GlobalPromptModal.show({
    title: 'Gagal Submit Dokumen',
    subtitle: 'Silakan coba submit kembali dan pastikan koneksi internet Anda dalam keadaan baik.',
    buttonPrimary: {
      text: 'Coba Lagi',

      onPress: () => {
        callback?.()
        GlobalPromptModal.close();
      }
    },
    buttonSecondary: {
      text: 'Batal',
      onPress: () => {
        GlobalPromptModal.close();
      }
    },
    image: failure,
  })
}

export const showModalIquaryAgentFailed = async (responseCode: string) => {
  GlobalPromptModal.show({
    title: i18next.t('Epos:unable_to_continue'),
    subtitle: responseCode == '20' ? i18next.t('Epos:max_spaj_inquary') : i18next.t('Epos:max_agent_inquary'),
    buttonPrimary: {
      text: 'Tutup',
      onPress: () => {
        GlobalPromptModal.close();
      }
    }
  })
}