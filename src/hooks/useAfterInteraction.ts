import { useEffect, useRef, useState } from "react";
import { InteractionManager } from "react-native";

type UseAfterInteractionsOptions = {
  onCompleted: () => void;
  dependencies?: any[];
};

export default function useAfterInteraction({ onCompleted, dependencies = [] }: UseAfterInteractionsOptions){
  const interactionHandle = useRef<ReturnType<typeof InteractionManager.runAfterInteractions> | null>(null);
  const [isInteractionDone, setIsInteractionDone] = useState(false);

  useEffect(() => {
    interactionHandle.current = InteractionManager.runAfterInteractions(() => {
      setIsInteractionDone(true);
      onCompleted?.();
    });

    return () => {
      // Cancel the interaction if it's still pending
      if (interactionHandle.current) {
        interactionHandle.current.cancel?.();
        interactionHandle.current = null;
      }
    };
  }, dependencies);
  return {
    isInteractionDone
  }
}