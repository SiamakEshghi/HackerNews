//@flow
import * as React from 'react';

import styles from './Spinner.module.scss';

type SpinnerProps = {
  customClass?: any,
};

const Spinner = ({ customClass }: SpinnerProps): React.Node => (
  <div
    className={`${styles.spinner} ${customClass || ''}`}
    data-testid="spinner"
  >
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  </div>
);

export default Spinner;
