
import React from 'react';
import './Modal.css'; 

const Modal = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="modal-close" onClick={onClose}>
          close
        </button>
         data
      </div>
    </div>
  );
};

export default Modal;
