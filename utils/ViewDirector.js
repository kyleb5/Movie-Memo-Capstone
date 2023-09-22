import PropTypes from 'prop-types';
import { useAuth } from './context/authContext';
import Loading from '../components/Loading';
import FooterBarAuth from '../components/FooterBarAuth';
import Signin from '../components/Signin';
import NavBarAuth from '../components/NavBarAuth';

const ViewDirectorBasedOnUserAuthStatus = ({ component: Component, pageProps }) => {
  const { user, userLoading } = useAuth();

  // if user state is null, then show loader
  if (userLoading) {
    return <Loading />;
  }

  // what the user should see if they are logged in
  if (user) {
    return (
      <div className="page-container">
        <NavBarAuth /> {/* NavBar only visible if user is logged in and is in every view */}
        <div className="content">
          <Component {...pageProps} />
        </div>
        <div className="footer-div">
          <FooterBarAuth />
        </div>
      </div>
    );
  }

  return <Signin />;
};

export default ViewDirectorBasedOnUserAuthStatus;

ViewDirectorBasedOnUserAuthStatus.propTypes = {
  component: PropTypes.func.isRequired,
  pageProps: PropTypes.oneOfType([PropTypes.object]).isRequired,
};
