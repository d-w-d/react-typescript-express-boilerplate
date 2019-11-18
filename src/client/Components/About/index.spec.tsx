import 'regenerator-runtime/runtime';
import React from 'react';
import Enzyme from 'enzyme';

import { About } from '.';

describe('Concerning <About />:', () => {
  it("it doesn't crash", async () => {
    const aboutWrapper = Enzyme.mount(<About />);
    expect(aboutWrapper).toBeTruthy();
  });
});
