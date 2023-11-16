import { Button } from 'react-bootstrap';

const Navbar = () => (
  <nav className="shadow-sm navbar navbar-expand-lg navbar-light bg-white">
    <div className="container">
      <a href="/" className="navbar-brand">Hexlet Chat</a>
      <Button href="/" variant="btn btn-primary">Выйти</Button>
    </div>
  </nav>
);

export default Navbar;
