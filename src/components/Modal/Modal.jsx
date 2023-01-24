import { Component } from 'react';
import { createPortal } from 'react-dom';
import { Overlay, ModalStyled } from './Modal.styled';
const modalRef = document.querySelector('#modal-root');

export class Modal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.onCloseByEsc);
  }
  componentWillUnmount() {
    window.removeEventListener('keydown', this.onCloseByEsc);
  }
  onCloseByEsc = e => {
    if (e.code === 'Escape') {
      this.props.onClose();
    }
  };
  render() {
    const { largeImg, onClose } = this.props;
    return createPortal(
      <Overlay onClick={onClose}>
        <ModalStyled >
          <img src={largeImg} alt="big" />
        </ModalStyled>
      </Overlay>,
      modalRef
    );
  }
}
