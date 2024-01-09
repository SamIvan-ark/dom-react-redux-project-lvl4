import { Button } from 'react-bootstrap';
import { hooks } from '../providers/index';

const Navbar = () => {
  const auth = hooks.useAuth();
  const handleLogOut = () => {
    window.localStorage.removeItem('userId');
    auth.logOut();
  };
  return (
    <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
      <div className="container">
        <a href="/" className="navbar-brand">Hexlet Chat</a>
        {auth.loggedIn ? <Button onClick={handleLogOut} variant="btn btn-primary">Выйти</Button> : null}
      </div>
    </nav>
  );
};

export default Navbar;
