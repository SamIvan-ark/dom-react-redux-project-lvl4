import { Button } from 'react-bootstrap';
import { hooks } from '../providers';

const Navbar = () => {
  const auth = hooks.useAuth();
  const handleLogOut = () => {
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
