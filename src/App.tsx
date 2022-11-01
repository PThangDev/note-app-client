import { FC } from 'react';
import 'react-markdown-editor-lite/lib/index.css';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'tippy.js/dist/tippy.css';

import GlobalStyles from 'src/themes';
import ScrollToTop from './components/ScrollToTop';
import useDarkMode from './hooks/useDarkMode';
import { PageRoutes } from './routes';

interface Props {}

const App: FC<Props> = (props) => {
  useDarkMode();

  return (
    <div className="app">
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
      {/* Global styles */}
      <GlobalStyles />
      {/* Routes */}
      <PageRoutes />
      {/* Scroll to top */}
      <ScrollToTop />
    </div>
  );
};

export default App;
