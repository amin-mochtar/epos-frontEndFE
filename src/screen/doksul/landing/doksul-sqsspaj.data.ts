import { ISummaryProposal } from "../../../utilities";

export const typeModalAlert = (data?: ISummaryProposal) => {
  return {
    defaultData: {
      type: 'defaultData',
      visible: false,
      title: '',
      desc: '',
    },
    removeDraft: {
      type: 'remove',
      visible: true,
      title: 'Hapus Dokumen',
      desc: 'Apakah Anda ingin menghapus Dokumen Susulan ini? Dokuemn yang telah dihapus tidak dapat dikembalikan',
    },
    sendSMS: {
      type: 'send',
      visible: true,
      title: 'Kirim SMS',
      desc: 'Apakah Anda Yakin ingin mengirim SMS yang baru ?',
    },
    successSMS: {
      type: 'success',
      visible: true,
      title: 'Berhasil Kirim SMS',
      desc: `Proposal ${data?.spajNumber} sudah tersedia di basis data. Pastikan calon nasabah/nasabah telah menerima SMS CEKATAN, jika belum, silakan cek kembali nomor ponsel yang terdaftar di proposal atau sistem PRUDENTIAL.`
    },
    submittedDraft: {
      type: 'submited',
      visible: true,
      title: 'Proposal Telah di Submit',
      desc: 'Maaf proposal ini sudah berhasil disubmit',
    }
  }
}

export const statusDoksulProposal = [
  'Draft',
  'SPAJ Pending UW',
  'SPAJ Pending UW Cekatan Submitted',
  'SPAJ Pending UW Requirement',
  'SPAJ Pending Payment',
  'Others',
  'Inforce',
  'Dalam Proses Submit',
  'Submitted',
  'Change PH Submitted'
];


export const dataSummary = [{
  keyValue: 'productName',
},
{
  label: 'Tanggal Dibuat',
  keyValue: 'createdDate',
  type: 'Date',
},
{
  label: `Nomor SPAJ`,
  keyValue: 'spajNumber',
},
{
  label: 'Tertanggung Utama',
  keyValue: 'lifeAssuredName',
},
{
  label: 'Status',
  keyValue: 'statusProposal',
  type: 'Chips',
},]