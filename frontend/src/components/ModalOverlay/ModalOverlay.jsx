<<<<<<< HEAD
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
=======
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
>>>>>>> 6e74c0a3aec6ba4adcc65121d292aafa40b04daf
