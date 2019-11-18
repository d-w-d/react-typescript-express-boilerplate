import 'regenerator-runtime/runtime';
import React from 'react';
import Enzyme from 'enzyme';

import { Footer } from '.';

describe('Concerning <Footer />:', () => {
  it("it doesn't crash", async () => {
    const footerWrapper = Enzyme.mount(<Footer />);
    expect(footerWrapper).toBeTruthy();
  });
});
