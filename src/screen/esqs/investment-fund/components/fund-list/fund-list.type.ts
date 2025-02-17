import { FundType } from '../../investment-fund.type';

export type DataFund = {
  onSelectedFund: (value: FundType | any, section: 'basic' | 'topup') => void;
  onSlideChange: (value: number, index: number, section: 'basic' | 'topup', indexCategory: number) => void;
  openFactSheet: (fundSelected: FundType) => void
  fund: FundType[];
  selectedFund: FundType[];
  isDisableFund: boolean;
  indexCategory: number;
  section: 'basic' | 'topup';
};
