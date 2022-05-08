import React from "react";
import { ModalProps } from "../../../types";
import { StyledModal } from "./Modal.styles";

const Modal = ({ onClickNo, onClickYes }: ModalProps) => {
  return (
    <StyledModal>
      <h2>Usunąć zadanie?</h2>
      <div className="buttons-wrapper">
        <button className="yes" onClick={onClickYes}>
          Tak
        </button>
        <button className="no" onClick={onClickNo}>
          Nie
        </button>
      </div>
    </StyledModal>
  );
};

export default Modal;
