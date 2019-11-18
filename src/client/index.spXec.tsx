import React from 'react';
import ReactDOM from 'react-dom';
import { AppEntry } from './AppEntry';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<AppEntry />, div);
  if (!!div) ReactDOM.unmountComponentAtNode(div);
});
