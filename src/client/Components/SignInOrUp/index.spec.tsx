import 'regenerator-runtime/runtime';
import React from 'react';
import Enzyme from 'enzyme';
import { FetchMock } from 'jest-fetch-mock';
import { act } from 'react-dom/test-utils';

import {
  SignInOrUp,
  signInOrUpButtonId,
  signInOrUpFormId,
  usernameInputId,
  passwordInputId,
  password2InputId,
  signInOrUpTogglerId
} from '.';
import { sleep } from '@common/utils/sleep';
import { ISignInOrUpPayload } from '@common/dtoModels';
import { IDataBody } from '@server/utils/apiJsonResponse';
import { AuthContextProvider } from '@client/Contexts/AuthContext';
import { Switch, BrowserRouter as Router, Route } from 'react-router-dom';
import { Home } from '../Home';

// Create handle on fetch with `jest-fetch-mock` typings
const fetchMock: FetchMock = fetch as any;

let wrapper: any;

const mountComponent = async (isSignIn?: boolean) => {
  // Mount within:
  // 1) auth-context provider to use auth hook
  // 2) router to do perform redirects
  act(() => {
    wrapper = Enzyme.mount(
      <AuthContextProvider>
        <Router>
          <SignInOrUp isSigningIn={!!isSignIn} />
        </Router>
      </AuthContextProvider>
    );
  });
  await sleep(100);
};

describe('Concerning <SignInOrUp />:', () => {
  beforeEach(async () => {
    // Actions before each call to `it()`
    fetchMock.resetMocks();
  });

  afterEach(() => {
    //
  });

  it('it displays 2 text inputs at /signin', async () => {
    //
    await mountComponent(true);

    // Navigate to url
    window.history.pushState({}, 'Sign In Test', '/signin');
    await sleep(500);
    wrapper.update();
    await sleep(500);

    // Find input fields
    const input1 = wrapper.find('#' + usernameInputId);
    await sleep(500);
    const input2 = wrapper.find('#' + passwordInputId);
    await sleep(500);
    const input3 = wrapper.find('#' + password2InputId);
    await sleep(500);

    // Expect 1 username field and 1 password field
    expect(input1.exists()).toBeTruthy();
    expect(input2.exists()).toBeTruthy();
    expect(input3.exists()).toBeFalsy();
  });

  it('it displays 3 text inputs at /signup', async () => {
    await mountComponent();

    // Navigate to url
    window.history.pushState({}, 'Sign Up Test', '/signup');
    await sleep(500);
    wrapper.update();
    await sleep(500);

    // Find input fields
    const input1 = wrapper.find('#' + usernameInputId);
    await sleep(500);
    const input2 = wrapper.find('#' + passwordInputId);
    await sleep(500);
    const input3 = wrapper.find('#' + password2InputId);
    await sleep(500);

    // Expect 1 username field and 1 password field
    expect(input1.exists()).toBeTruthy();
    expect(input2.exists()).toBeTruthy();
    expect(input3.exists()).toBeTruthy();
  });

  it('it redirects to / after sign up', async () => {
    await mountComponent();

    await act(async () => {
      // Navigate to url
      window.history.pushState({}, 'Sign Up Test', '/signup');
      // Create a fetch-intercept event
      // I.e. next time fetch is called, it will return this object:
      fetchMock.mockResponseOnce(
        JSON.stringify({
          data: { username: 'myusername', token: 'aaa.bbb.ccc' },
          message: 'Successful sign up'
        } as IDataBody<ISignInOrUpPayload>)
      );

      // Write text to input fields
      const input1 = wrapper
        .find('#' + usernameInputId)
        .hostNodes()
        .at(0);
      await sleep(100);
      input1.simulate('change', { target: { value: 'myusername' } });
      const input2 = wrapper
        .find('#' + passwordInputId)
        .hostNodes()
        .at(0);
      await sleep(100);
      input2.simulate('change', { target: { value: 'mypassword' } });
      const input3 = wrapper
        .find('#' + password2InputId)
        .hostNodes()
        .at(0);
      input3.simulate('change', { target: { value: 'mypassword' } });
      await sleep(100);

      const formEventMocked = { preventDefault: jest.fn() };
      wrapper.find('#' + signInOrUpFormId).simulate('submit', formEventMocked);

      await sleep(500);

      // Expect the new url to be '/'
      expect((global as any).window.location.pathname).toEqual('/');
    });
  });
});
