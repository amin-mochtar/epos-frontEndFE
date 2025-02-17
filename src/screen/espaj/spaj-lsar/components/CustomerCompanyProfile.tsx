import { View, Text } from 'react-native';
import React, { FC } from 'react';
import { Control, Controller, FieldErrors } from 'react-hook-form';
import { SectionTitle } from '../../../../components';
import { InputDate, InputField, onChangeNumber, plaiStyles, sanitizedText } from 'plai_common_frontend';
import { UpfrontDecisionModel, ValidationForm } from '../../../../utilities';
import WithSpacing from './WithView';

type Props = {
  control: Control<UpfrontDecisionModel.FormLsar>;
  errors: FieldErrors<UpfrontDecisionModel.FormLsar>;
};

const CustomerCompanyProfile: FC<Props> = ({ control, errors }) => {
  const percentageValidation = (value: number) => {
    return value >= 0 && value <= 100;
  };

  const Https = <Text>https://</Text>;

  return (
    <View style={[plaiStyles.px16, plaiStyles.py16, plaiStyles.bgwhite]}>
      <SectionTitle text="Profil Perusahaan Nasabah" wrapperStyle={[plaiStyles.mt0]} />
      <Text style={[plaiStyles.fontGrey33Thin, plaiStyles.my16]}>Mohon lengkapi Profil Perusahaan Anda</Text>
      <Controller
        name={'customer_company_profile.name'}
        control={control}
        rules={ValidationForm({ isRequired: true, maxLength: 60 })}
        render={({ field: { onChange, value } }) => (
          <WithSpacing>
            <InputField
              label="Nama Perusahaan"
              setValue={onChange}
              value={value}
              containerStyle={[plaiStyles.mt0,]}
              error={errors?.customer_company_profile?.name}
              placeholder="Masukkan nama"
              maxLength={60}
              rightItem=""
            />
          </WithSpacing>
        )}
      />
      <Controller
        name={'customer_company_profile.official_site'}
        control={control}
        rules={ValidationForm({
          isRequired: true,
          maxLength: 60,
          validate: (value: string) => {
            const pattern = /.*\..+/;
            return pattern.test(value);
          },
        })}
        render={({ field: { onChange, value } }) => (
          <WithSpacing>
            <InputField
              label="Situs Resmi Perusahaan"
              setValue={onChange}
              value={value}
              containerStyle={[plaiStyles.mt0,]}
              error={errors?.customer_company_profile?.name}
              placeholder="Masukan situs"
              leftItem={Https}
              maxLength={60}
              additionalInfo={'contoh: www.prudential.co.id'}
            />
          </WithSpacing>
        )}
      />
      <Controller
        name={'customer_company_profile.location'}
        control={control}
        rules={ValidationForm({ isRequired: true, maxLength: 60 })}
        render={({ field: { onChange, value } }) => (
          <WithSpacing>
            <InputField
              label="Lokasi Kantor"
              setValue={onChange}
              value={value}
              containerStyle={[plaiStyles.mt0,]}
              error={errors?.customer_company_profile?.name}
              placeholder="Masukan lokasi"
              rightItem=""
              maxLength={60}
            />
          </WithSpacing>
        )}
      />
      <Controller
        name={'customer_company_profile.position'}
        control={control}
        rules={ValidationForm({ isRequired: true, maxLength: 60 })}
        render={({ field: { onChange, value } }) => (
          <WithSpacing>
            <InputField
              label="Jabatan/Posisi Nasabah"
              setValue={onChange}
              value={value}
              containerStyle={[plaiStyles.mt0,]}
              error={errors?.customer_company_profile?.name}
              placeholder="Masukan jabatan"
              maxLength={60}
              rightItem=""
            />
          </WithSpacing>
        )}
      />
      <Controller
        name={'customer_company_profile.job_description'}
        control={control}
        rules={ValidationForm({ isRequired: true, maxLength: 60 })}
        render={({ field: { onChange, value } }) => (
          <WithSpacing>
            <InputField
              label="Uraian Pekerjaan"
              setValue={onChange}
              value={value}
              containerStyle={[plaiStyles.mt0,]}
              error={errors?.customer_company_profile?.name}
              placeholder="Masukan uraian pekerjaan"
              maxLength={60}
              rightItem=""
            />
          </WithSpacing>
        )}
      />
      <Controller
        name={'customer_company_profile.company_type'}
        control={control}
        rules={ValidationForm({ isRequired: true, maxLength: 60 })}
        render={({ field: { onChange, value } }) => (
          <WithSpacing>
            <InputField
              label="Jenis Usaha"
              setValue={onChange}
              value={value}
              containerStyle={[plaiStyles.mt0,]}
              error={errors?.customer_company_profile?.name}
              placeholder="Masukan jenis usaha"
              maxLength={60}
              rightItem=""
            />
          </WithSpacing>
        )}
      />
      <Controller
        name={'customer_company_profile.company_establishment_date'}
        control={control}
        rules={ValidationForm({ isRequired: true, maxLength: 60 })}
        render={({ field: { onChange, value } }) => (
          <WithSpacing>
            <InputDate
              formatDate="YYYY-MM-DD"
              label={'Tanggal Pendirian Perusahaan'}
              placeholder={'Pilih tanggal'}
              value={value}
              setValue={onChange}
              error={errors?.customer_company_profile?.company_establishment_date}
              maxDate={new Date().toString()}
              inputContainerStyle={[plaiStyles.mt0,]}
            />
          </WithSpacing>
        )}
      />
      <Controller
        name={'customer_company_profile.total_employee'}
        control={control}
        rules={ValidationForm({ isRequired: true, maxLength: 10 })}
        render={({ field: { onChange, value } }) => (
          <WithSpacing>
            <InputField
              label="Jumlah Pegawai"
              setValue={(item: string) => {
                onChangeNumber(item, onChange);
              }}
              value={value}
              containerStyle={[plaiStyles.mt0,]}
              error={errors?.customer_company_profile?.total_employee}
              placeholder="Masukkan jumlah pegawai"
              keyboardType="numeric"
              maxLength={10}
            />
          </WithSpacing>
        )}
      />
      <Controller
        name={'customer_company_profile.share_holder_percentage'}
        control={control}
        rules={ValidationForm({ isRequired: true, validate: percentageValidation })}
        render={({ field: { onChange, value } }) => (
          <WithSpacing>
            <InputField
              label="Share Kepemilikan Usaha (%)"
              setValue={(value) => {
                onChange(sanitizedText(value));
              }}
              value={value}
              containerStyle={[plaiStyles.mt0,]}
              error={errors?.customer_company_profile?.share_holder_percentage}
              placeholder="Masukkan Persentase"
              keyboardType="numeric"
              maxLength={3}
              additionalInfo="Maksimal 100%"
            />
          </WithSpacing>
        )}
      />
    </View>
  );
};

export default CustomerCompanyProfile;
