import { GlobalHelper } from "common_services_frontend";
import { numberWithCommas } from "plai_common_frontend";
import { ISQSDetail } from "../../../../utilities";

export const generateBodyMessageEmail = (SQSData: ISQSDetail, allCustomerData: any, agentProfile: any, proposalId: string) => {
  const product = SQSData.product;
  const policyType = SQSData?.policyType;
  const calculatorData = SQSData?.calculator ? JSON.parse(SQSData?.calculator) : null;
  const productNameSlice = `${product?.label!.slice(3, product?.label!.length)}`;
  const PHName = allCustomerData[0]?.clientName;
  const illustrationNumber = proposalId;
  const productName = productNameSlice;
  const genderType = allCustomerData[0]?.clientGender?.key === 'M' ? 'Bapak' : 'Ibu';
  const TUName = allCustomerData.length > 1 ? allCustomerData[1]?.clientName : PHName;
  const moneyType = policyType === 'sharia' ? 'Santunan Asuransi' : 'Uang Pertanggungan';
  const mainBenefits = calculatorData?.mainBenefits[0];
  const sumInsured = mainBenefits?.sumInsured || 0;
  const totalUPSA = numberWithCommas(sumInsured).replace(/\./g, ',');
  const contactService = policyType === 'sharia' ? '1500577 atau (021) - 1500577 atau e-mail ke customer.idn@prudentialsyariah.co.id' : '1500085 atau e-mail ke customer.idn@prudential.co.id';
  const userProductType = policyType === 'sharia' ? 'PT. Prudential Sharia Life Assurance' : 'PT. Prudential Life Assurance';
  const companyTypeByShariaOrConvent = policyType === 'sharia' ? 'PT Prudential Sharia Life Assurance Indonesia (Prudential Syariah)' : 'PT Prudential Life Assurance Indonesia (Prudential Indonesia)';
  const ccEmail = `cc. ${GlobalHelper.getAgentName()}/${GlobalHelper.getAgentCode()}/${agentProfile?.agentCode}`

  const message = `${genderType} ${PHName} yang terhormat,
  \nKami mengucapkan terima kasih atas kepercayaan ${genderType} yang telah mempertimbangkan ${companyTypeByShariaOrConvent} sebagai penyedia solusi perlindungan finansial bagi ${genderType} dan keluarga.
  \nBerikut ini kami kirimkan Ilustrasi Manfaat Perlindungan Asuransi Jiwa, sehubungan dengan permintaan dari ${genderType} Pemegang Polis, dengan keterangan sebagai berikut:
  \nNomor Ilustrasi : ${illustrationNumber}\nNama Produk : ${productName}\n${moneyType}: ${totalUPSA}\nCalon Pemegang Polis : ${PHName}\nCalon Peserta Utama Yang Diasuransikan : ${TUName}
  \nUntuk melanjutkan proses pembelian produk asuransi jiwa atau pertanyaan seputar ilustrasi ini, silakan hubungi Tenaga Pemasar ${genderType}.
  \nApabila ${genderType} memiliki pertanyaan lebih lanjut, silakan hubungi kami melalui Prudential Customer Line ${contactService}
  \nAtas perhatian, kerja sama, dan kepercayaan ${genderType}, kami ucapkan terima kasih.
  \nKami senantiasa berusaha memberikan produk dan pelayanan terbaik untuk memenuhi kebutuhan finansial ${genderType}.
  \nHormat kami,
  \n\n${userProductType}
  \n${ccEmail}
 `

  return message;
}