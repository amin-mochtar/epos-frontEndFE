import StepIndicator from 'react-native-step-indicator';
import { memo } from 'react';
import { TProgressStep } from './progress-step.type';
import { customProgressStepStyles } from './progress-step.styles';

export const ProgressStep = memo(
  ({ currentPosition, labels, onPressStep = () => null, direction, renderLabel }: TProgressStep) => {
    const stepCount = labels?.length;
    return (
      <StepIndicator
        stepCount={stepCount}
        direction={direction}
        customStyles={customProgressStepStyles}
        currentPosition={currentPosition}
        labels={labels}
        renderLabel={renderLabel}
        onPress={(v: number) => onPressStep(v)}
      />
    );
  },
);
