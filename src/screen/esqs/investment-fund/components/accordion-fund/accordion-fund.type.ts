import { FundType } from '../../investment-fund.type';

export type FundListCategoryType = {
  categoryName: string;
  data: FundType[];
  totalValueFund: number;
  isExpand: boolean;
};

export type CardFundListType = {
  onSelectedFund: (fund: FundType, section: 'topup' | 'basic') => void;
  onSlideChange: (value: number, index: number, section: 'topup' | 'basic', indexCategory: number) => void;
  openFactSheet: (fundSelected: FundType) => void;
  data: FundListCategoryType[];
  selectedFund: FundType[];
  valueRiskProfile: number;
  section: 'basic' | 'topup';
  setVisible: any;
};
