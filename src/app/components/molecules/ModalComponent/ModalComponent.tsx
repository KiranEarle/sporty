import React from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

type ModalComponentProps = {
  isOpen: boolean;
  onClose: () => void;
  children?: React.ReactNode;
};

const ModalComponent: React.FC<ModalComponentProps> = ({
  isOpen,
  onClose,
  children,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Example Modal"
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        content: {
          maxWidth: "500px",
          margin: "auto",
          padding: "2rem",
          borderRadius: "12px",
        },
      }}
    >
      <button onClick={onClose} style={{ float: "right" }}>
        ✖
      </button>
      <div>{children}</div>
    </Modal>
  );
};

export default ModalComponent;
