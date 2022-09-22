import { FC } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'tippy.js/dist/tippy.css';

import GlobalStyles from 'src/themes';
import { PageRoutes } from './routes';

interface Props {}

const App: FC<Props> = (props) => {
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
    </div>
  );
};

export default App;
