import React, { useState } from 'react';

import styles from './styles.scss';

export const Test = (props: any) => {
  const [state, setState] = useState({});

  return <h1 className={styles.demoScssClass}>This is a test component styled via scss modules</h1>;
};
