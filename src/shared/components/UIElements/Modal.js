import React from 'react';
import ReactDOM from 'react-dom';
import { CSSTransition } from 'react-transition-group';

import Backdrop from './Backdrop';
import './Modal.css';

const ModalOverlay = props => {
  

  let errorGd = '';
  if (props.children.props.children === 'Please check origin airport CODE' || props.children.props.children === 'Please check destination airport CODE') {
    errorGd = 'errorGd';
  }

  const content = (
    <div className={props.modal} style={props.style}>
      <header className={`${props.modal}__header`}>
        <footer className={`${props.modal}__actions`}>{props.header}</footer>
        <footer className="modal__actions">{props.footer}</footer>
      </header>
      <form onSubmit={props.onSubmit ? props.onSubmit : event => event.preventDefault()}>
        <div className={`modal__content${errorGd}`}   >
          {props.children}
        </div>
      </form>
    </div>
  );
  return ReactDOM.createPortal(content, document.getElementById('modal-hook'));
};

const Modal = props => {

  return (
    <React.Fragment>
      {props.show && <Backdrop onClick={props.onCancel} moldalBackdrop={props.modal} />}
      <CSSTransition in={props.show} mountOnEnter unmountOnExit timeout={200} classNames="modal" >
        <ModalOverlay {...props} />
      </CSSTransition>
    </React.Fragment>
  )
};
export default Modal;
