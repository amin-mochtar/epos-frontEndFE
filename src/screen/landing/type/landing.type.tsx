import { ISummaryProposal } from "../../../utilities";

export type ModalButtonType = {
  text: string;
  onPress: () => void;
}

// Prep for configCard start
// Leksa minta izin pindahin ke plai_common_frontend
export type TButtonConfig = {
  left?: {
    text: string;
    action: (item?: ISummaryProposal) => void;
  };
  right?: {
    text: string;
    action: (item: ISummaryProposal) => void;
  };
  one?: {
    text: string;
    action: (item?: ISummaryProposal) => void;
  };
};