import React from "react";
import "./modalOverlay.css";
import PropTypes from 'prop-types';

function ModalOverlay(props) {
  const {isOpen} = props;

  return (
      <div className={`modalOverlay ${isOpen ? 'modalOverlay_opened' : ''}`}>
      </div>
  );
}

export default ModalOverlay;

ModalOverlay.propTypes = {
  isOpen: PropTypes.bool.isRequired
};
