import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader'; // HOC to update changes without page reloads
import Spinner from 'react-spinner-material';
import { theme } from '@client/MaterialUI';

// Acts like normalize.css. See: https://material-ui.com/components/css-baseline/
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/styles';
import { AuthContextProvider } from '@client/Contexts/AuthContext';

// Components
import { Home } from '@components/Home/index';
import { About } from '@client/Components/About';
import { Contact } from '@client/Components/Contact';
import { Test } from '@components/Test';
import { Footer } from '@client/Components/Footer';
import { Layout } from '@client/Components/Layout';
import { SignInOrUp } from '@client/Components/SignInOrUp';
import { LockedResource } from '@client/Components/LockedResource';

// Example of how to load a component lazily upon first route visitation
// Contents of LazyDemo will be placed in lazy.[hash].js
const LazyDemo = lazy(() => import(/* webpackChunkName: "lazy" */ '@components/LazyDemo'));

export const AppEntry = () => (
  <ThemeProvider theme={theme}>
    <CssBaseline />
    <HMRContent />
  </ThemeProvider>
);

const HMRContent: React.FC = hot(module)(() => {
  return (
    <div className="app-container">
      <Suspense
        fallback={<Spinner size={120} spinnerColor={'#333'} spinnerWidth={2} visible={true} />}
      >
        <AuthContextProvider>
          <Router basename={`${__BASE_HREF__}`}>
            <div className="page-wrapper">
              <Layout>
                <Switch>
                  <Route exact path="/" component={() => <Home />} />
                  <Route exact path="/about" component={About} />
                  <Route exact path="/contact" component={Contact} />
                  <Route exact path="/lazy" component={LazyDemo} />
                  <Route exact path="/locked" component={LockedResource} />
                  <Route exact path="/signin" component={() => <SignInOrUp isSigningIn={true} />} />
                  <Route exact path="/signup" component={() => <SignInOrUp />} />
                  <Route exact path="/test" component={Test} />
                  <Route exact path="*" component={() => <div>This route is not matched!</div>} />
                </Switch>
              </Layout>
            </div>
          </Router>
        </AuthContextProvider>
      </Suspense>
    </div>
  );
});
