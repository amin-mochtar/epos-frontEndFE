export type TRiderData = {
  key: string;
  label: string;
  caption?: string;
  hide?: boolean;
};

export type TRiderList = {
  data: TRiderData[];
  selected: TRiderData[];
  onSelected: (value: TRiderData) => void;
  errorMessage: any;
  handlerTooltip: any;
};
