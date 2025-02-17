import React from 'react';

export type TProgressStep = {
  currentPosition: number;
  labels: string[];
  direction?: 'horizontal' | 'vertical';
  onPressStep?: (v: number) => void;
  renderLabel?: (args: {
    position: number;
    stepStatus: string;
    label: string;
    currentPosition: number;
  }) => React.ReactNode;
};
