import { TChannel } from "../../../utilities";

// ***use full product code!
const multiCurrencyProduct = ['U17R', 'U17D'];

// can use CHANNEL in future, temp using destructured params
export const formatProductLabel = (product: TChannel, productCode: string) => {
  if (multiCurrencyProduct.includes(productCode)) {
    return `${product.longName} (${product.CURRENCY.code})`;
  }
  return product.longName;
};