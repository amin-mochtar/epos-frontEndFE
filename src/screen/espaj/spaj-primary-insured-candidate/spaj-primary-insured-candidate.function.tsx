export const idCardAdditionalInfo = (errors: any, checkAge: number, value: string) => {
  if (errors?.message) {
    return '';
  }
  if (checkAge > 17) {
    return 'Pastikan No. Kartu Identitas Diri Anda sesuai dengan KTP';
  }
  if (!value || value.length < 6) {
    return 'Minimal 6 digit';
  }
  return '';
}