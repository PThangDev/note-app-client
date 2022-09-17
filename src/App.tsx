import { FC } from 'react';
import { PageRoutes } from './routes';

interface Props {}

const App: FC<Props> = (props) => {
  return (
    <div className="app">
      <PageRoutes />
    </div>
  );
};

export default App;
