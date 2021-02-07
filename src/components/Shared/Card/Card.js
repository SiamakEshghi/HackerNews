//@flow
import * as React from 'react';
import styles from './Card.module.scss';

type CardProps = {
  children: React.Node,
  customClass?: any,
};

const Card = ({ children, customClass }: CardProps): React.Node => {
  return (
    <div className={`${styles.card} ${customClass || ''}`}>{children}</div>
  );
};

export default Card;
