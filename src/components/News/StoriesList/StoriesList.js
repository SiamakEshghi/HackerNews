//@flow
import * as React from 'react';

import Card from '../../Shared/Card/Card';
import styles from './StoriesList.module.scss';

type Hit = {
  title: string,
  url: string,
  name: string,
  author: string,
  points: number,
  objectID: number,
};

type StoriesProps = {
  hits: Hit[],
};

const StoriesList = (props: StoriesProps): React.Node => {
  const { hits } = props;

  return (
    <div className={styles.list}>
      {hits.map((hit, index) => (
        <Card key={`${hit.objectID} ${index}`} customClass={styles.hit}>
          <a
            href={hit.url}
            className={styles.text}
            target="_blank"
            rel="noreferrer"
          >
            {hit.title}
          </a>
          <p className={styles.score}>{hit.points}</p>
          <p className={styles.text}>Author: {hit.author}</p>
        </Card>
      ))}
    </div>
  );
};

export default StoriesList;
