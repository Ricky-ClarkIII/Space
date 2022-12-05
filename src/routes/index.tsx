import { createBrowserRouter } from 'react-router-dom';
import Root from '../pages/Root';
import Error from '../pages/Error';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error />,
  }
]);

export default router;