import { ReactNode } from "react";
import { Modal } from "semantic-ui-react";

import "./BasicModal.scss";

interface Props {
  show: boolean;
  size?: "tiny" | "mini" | "small" | "large" | "fullscreen" | undefined;
  title?: string;
  children: ReactNode;
  onClose: () => void;
}

export const BasicModal = ({
  show,
  size = "tiny",
  title,
  children,
  onClose,
}: Props) => {
  return (
    <Modal className="modal-basic" open={show} onClose={onClose} size={size}>
      {title && <Modal.Header>{title}</Modal.Header>}
      <Modal.Content>{children}</Modal.Content>
    </Modal>
  );
};
