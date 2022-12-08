import { Outlet } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { auth } from '../api/firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';

const Root = (): JSX.Element => {
  const [user] = useAuthState(auth);

  const navigate = useNavigate();

  if (!user) {
    navigate('/login');
    return <></>;
  } else {
    return (
      <>
        <Navbar />
        <Outlet />
        <Footer />
      </>
    );
  }
};

export default Root;