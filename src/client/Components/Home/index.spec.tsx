import 'regenerator-runtime/runtime';
import React from 'react';
import Enzyme from 'enzyme';
import { FetchMock } from 'jest-fetch-mock';
import { act } from 'react-dom/test-utils';

import { Home, pingServerButtonId, snackBarMessageId } from '.';
import { sleep } from '@common/utils/sleep';
import { IDemoPayload } from '@common/dtoModels';
import { IDataBody } from '@server/utils/apiJsonResponse';

// Create handle on fetch with `jest-fetch-mock` typings
const fetchMock: FetchMock = fetch as any;

describe('Concerning <Home />:', () => {
  beforeEach(() => {
    // Actions before each call to `it()`
    fetchMock.resetMocks();
  });

  afterEach(() => {
    //
  });

  it('it has a ping-server button', async () => {
    let pingServerButtonNodes: any;

    act(() => {
      const homeWrapper = Enzyme.mount(<Home sth="Hello" />);
      pingServerButtonNodes = homeWrapper
        .find('#' + pingServerButtonId) //
        .hostNodes(); // See: https://github.com/airbnb/enzyme/issues/836#issuecomment-374899433
    });

    expect(pingServerButtonNodes).toHaveLength(1);
  });

  it('it displays snackbar with message after clicking ping-server button', async () => {
    let messageSpanNodes: any;

    await act(async () => {
      // Create a fetch-intercept event
      // I.e. next time fetch is called, it will return this object:
      fetchMock.mockResponseOnce(
        JSON.stringify({
          data: { test: 'Hello from server!' },
          message: 'blah blah',
          isMessageDisplayable: true
        } as IDataBody<IDemoPayload>)
      );

      // Mount Home component
      const homeWrapper = Enzyme.mount(<Home sth="Hello" />);

      // Find button to ping server and isolate its onClick method
      const pingServerButtonOnClickMethod = homeWrapper
        .find('#' + pingServerButtonId)
        .at(0) // Get first node found
        .props()['onClick'];

      // Simulate clicking ping-server button; this will call
      if (!!pingServerButtonOnClickMethod) pingServerButtonOnClickMethod({} as any);

      // Wait for api call take its effects
      await sleep(500);

      // Expect home component to now host a span with message
      homeWrapper.update();

      messageSpanNodes = homeWrapper
        .find('#' + snackBarMessageId) //
        .hostNodes(); // See: https://github.com/airbnb/enzyme/issues/836#issuecomment-374899433
    });

    // Check that the snackbar got launched
    expect(messageSpanNodes).toHaveLength(1);
  });
});
