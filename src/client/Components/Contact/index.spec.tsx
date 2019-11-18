import 'regenerator-runtime/runtime';
import React from 'react';
import Enzyme from 'enzyme';

import { Contact } from '.';

describe('Concerning <Contact />:', () => {
  it("it doesn't crash", async () => {
    const contactWrapper = Enzyme.mount(<Contact />);
    expect(contactWrapper).toBeTruthy();
  });
});
