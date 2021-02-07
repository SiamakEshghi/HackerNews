//@flow
import * as React from 'react';

import Card from '../Card/Card';
import styles from './ErrorModal.module.scss';

type ErrorModalProps = {
  showModal: boolean,
  errorMessage: string,
  closeHandler: () => void,
};

const ErrorModal = (props: ErrorModalProps): React.Node => {
  const { showModal, errorMessage, closeHandler } = props;
  const btnRef = React.useRef();

  React.useEffect(() => {
    if (showModal) btnRef.current.focus();
  }, [showModal]);

  if (!showModal) return false;

  return (
    <div className={styles.modal}>
      <Card customClass={styles.error}>
        <p>{errorMessage}</p>
        <button className={styles.closeBtn} onClick={closeHandler} ref={btnRef}>
          Close
        </button>
      </Card>
    </div>
  );
};

export default ErrorModal;
