import React from "react";
import { StyledModal } from "./Modal.styles";

interface Props {
  onClickNo: React.MouseEventHandler<HTMLButtonElement>;
  onClickYes: React.MouseEventHandler<HTMLButtonElement>;
}

const Modal = ({ onClickNo, onClickYes }: Props) => {
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
