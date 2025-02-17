export const defaultTFormLifeStyle = {
  activities: [],
  activitiesPlace: [],
  activitiesInsured: [],
  question1: '',
  question2: '',
  question3: '',
};

export type TFormLifeStyle = {
  activities: string[];
  activitiesPlace: string[];
  activitiesInsured: string[];
  question1: string;
  question2: string;
  question3: string;
};

export type NavigationItem = {
  Uuid: string;
  Title: string;
  Progress: number;
  Type: string;
  CssClass: string;
  Index?: number;
}
