import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { hooks } from '../providers';

const Navbar = () => {
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
        <Link className="navbar-brand" to="/">Hexlet Chat</Link>
        {auth.loggedIn ? <Button onClick={handleLogOut} variant="btn btn-primary">Выйти</Button> : null}
      </div>
    </nav>
  );
};

export default Navbar;
