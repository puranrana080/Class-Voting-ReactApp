import React from "react";
import ReactDOM from "react-dom";
import VotingForm from "./VotingForm";

const Modal = () => {
  return ReactDOM.createPortal(
    <div className="modal-backdrop">
      <div className="modal-content">
        <VotingForm/>
      </div>
    </div>,
    document.getElementById("modal-root")
  );
};

export default Modal;
