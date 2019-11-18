import 'regenerator-runtime/runtime';
import React from 'react';
import Enzyme from 'enzyme';

import { LazyDemo } from '.';

describe('Concerning <LazyDemo />:', () => {
  it("it doesn't crash", async () => {
    const lazyDemoWrapper = Enzyme.mount(<LazyDemo />);
    expect(lazyDemoWrapper).toBeTruthy();
  });
});
