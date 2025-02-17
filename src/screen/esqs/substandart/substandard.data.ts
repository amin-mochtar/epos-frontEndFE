import { FormValues } from './substandart.type';

export const ALLOWED_SYMBOL = ['/', '(', ')', '-', '&', '_', '+', '!', '@', '#', '$', '%', '?', '>', '<', ',', '.'];

export const DEFAULT_SUBSTANDARD: FormValues = {
  substandards: [
    {
      substandard: [{ type: '', code: '' }],
      information: '',
      noSpaj: '',
    },
  ],
};
