import React, { useState, FC } from "react";
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom'
import ModalOverlay from '../ModalOverlay/ModalOverlay';
import "./modal.css";
import exit from '../../images/exit-menu.svg';
import { Navigate, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
const modalRoot = (document.getElementById("react-modals"));

const Modal = ({ isOpen, onClose, children }) => {

  const overlay = React.useRef(null);

  React.useEffect(() => {
    const closeByClick = (event) => {
      if (event !== null && event.target) {if ((event.target).classList.contains('modalOverlay')) {
        handleClose();
      }}
    };
    const element = overlay.current;
    if (element && overlay && overlay.current) {
      element.addEventListener('click', closeByClick);
        return () => {
          element.removeEventListener('click', closeByClick);
        };
    }
  }, []);

  function handleClose() {
    onClose();
  }

  React.useEffect(() => {
    const escFunction = (event) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };
    document.addEventListener("keydown", escFunction); 
    return () => {
    document.removeEventListener("keydown", escFunction);
    }
  }, [])

  return ReactDOM.createPortal (
    <div className={`modal ${isOpen ? 'modal_opened' : ''}`}>
      <div ref={overlay}>
        <ModalOverlay isOpen={isOpen} />
      </div>
      <div className='modal__container'>
        <div className="modal__close-button">
          <img src={exit} alt='Иконка закрытия' onClick={handleClose} />
        </div>
        {children}
       </div>
    </div>, modalRoot
  );
}

export default Modal;
