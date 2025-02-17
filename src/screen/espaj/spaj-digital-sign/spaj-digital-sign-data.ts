export const DOCUMENT_GENERATE = [
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
  },
  {
    key: '4',
    label: 'Cetak Polis',
    documentName: 'Form-Cetak-Polis'
  },
]

export const STATUS_DOCUMENT = {
  onSubmit: {
    label: 'Dokumen Sedang Dikirim',
    color: 'yellow'
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