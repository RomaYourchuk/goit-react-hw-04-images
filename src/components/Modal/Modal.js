import s from './Modal.module.css';

import { useEffect } from 'react';

function Modal({ activeImgURL, activeImgAlt, onClose }) {
  useEffect(() => {
    const handleKeyDown = e => {
      if (e.code === 'Escape') {
        console.log(e.code);

        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  const onOverlayClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

  return (
    <div className={s.Overlay} onClick={onOverlayClick}>
      <div className={s.Modal}>
        <img src={activeImgURL} alt={activeImgAlt} />
      </div>
    </div>
  );
}

export default Modal;

