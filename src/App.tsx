import { FC } from 'react';

import GlobalStyles from 'src/themes';
import { PageRoutes } from './routes';

interface Props {}

const App: FC<Props> = (props) => {
  return (
    <div className="app">
      {/* Global styles */}
      <GlobalStyles />
      {/* Routes */}
      <PageRoutes />
    </div>
  );
};

export default App;
