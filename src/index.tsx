import React from 'react';
import ReactDOM from 'react-dom/client';
import { ErrorBoundary } from 'react-error-boundary';
import { HelmetProvider } from 'react-helmet-async';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import App from './App';
import reportWebVitals from './reportWebVitals';

import store from './app/store';
import ErrorBoundaryPage from './pages/error-boundary';
import LoadingPage from './pages/loading';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);

root.render(
  <React.StrictMode>
    <ErrorBoundary fallback={<ErrorBoundaryPage />}>
      <React.Suspense fallback={<LoadingPage />}>
        <Provider store={store}>
          <Router>
            <HelmetProvider>
              <App />
            </HelmetProvider>
          </Router>
        </Provider>
      </React.Suspense>
    </ErrorBoundary>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
