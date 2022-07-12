import { Modal, Button } from "semantic-ui-react";

import "./ConfirmModal.scss";

interface Props {
  show: boolean;
  title?: string;
  onClose: () => void;
  onFirstOption: () => void;
  onFirstOptionText?: string;
  onFirstOptionType?: "negative" | "positive";
  onSecondOption: () => void;
  onSecondOptionText?: string;
  onSecondOptionType?: "negative" | "positive";
}

export const ConfirmModal = ({
  show,
  title,
  onClose,
  onFirstOption,
  onFirstOptionText,
  onFirstOptionType,
  onSecondOption,
  onSecondOptionText,
  onSecondOptionType,
}: Props) => {
  return (
    <Modal className="modal-confirm" open={show} onClose={onClose} size="mini">
      {title && <Modal.Header>{title}</Modal.Header>}

      <Modal.Actions>
        <Button
          positive={onFirstOptionType === "positive"}
          negative={onFirstOptionType === "negative"}
          onClick={onFirstOption}
        >
          {onFirstOptionText || "Cancelar"}
        </Button>
        <Button
          positive={onSecondOptionType === "positive"}
          negative={onSecondOptionType === "negative"}
          onClick={onSecondOption}
        >
          {onSecondOptionText || "Aceptar"}
        </Button>
      </Modal.Actions>
    </Modal>
  );
};
