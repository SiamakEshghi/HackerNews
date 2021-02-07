// @flow
import * as React from 'react';

import Head from './Head/Head';
import styles from './Layout.module.scss';

type LayoutProps = {
  children?: React.Node,
};

const Layout = (props: LayoutProps): React.Node => {
  return (
    <div className={styles.layout}>
      <div className={styles.head}>
        <Head />
      </div>
      <div className={styles.main}>{props.children}</div>
    </div>
  );
};

export default Layout;
