// @flow
import * as React from 'react';

import styles from './Head.module.scss';

type HeadProps = {};

const Head = (props: HeadProps): React.Node => {
  return <h2 className={styles.title}>Hacker News</h2>;
};

export default Head;
