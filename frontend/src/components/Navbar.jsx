import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

import { hooks } from '../providers';

const Navbar = () => {
  const { t } = useTranslation();
  const { useAuth, useApi } = hooks;
  const auth = useAuth();
  const { socket } = useApi();

  const handleLogOut = () => {
    auth.logOut();
    socket.disconnect();
  };

  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <Link className="navbar-brand" to="/">{t('entities.appName')}</Link>
        {auth.loggedIn ? <Button onClick={handleLogOut} variant="btn btn-primary">{t('actions.quit')}</Button> : null}
      </div>
    </nav>
  );
};

export default Navbar;
