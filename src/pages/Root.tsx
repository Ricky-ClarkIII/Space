import Navbar from '../components/Navbar';
import { Outlet } from 'react-router-dom';

const Root = (): JSX.Element => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Root;