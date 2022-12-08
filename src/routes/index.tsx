import { createBrowserRouter } from 'react-router-dom';
import Root from '../pages/Root';
import Login from '../pages/Login';
import Error from '../pages/Error';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error />,
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <Error />,
  }
]);

export default router;