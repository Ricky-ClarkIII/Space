import { createBrowserRouter } from 'react-router-dom';
import Root from '../pages/Root';
import Login from '../pages/Login';
import Error from '../pages/Error';
import Gallery from '../components/Gallery';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    errorElement: <Error />,
    children: [
      {
        path: '/gallery',
        element: <Gallery />,
        errorElement: <Error />,
      },
    ]
  },
  {
    path: '/login',
    element: <Login />,
    errorElement: <Error />,
  }
]);

export default router;