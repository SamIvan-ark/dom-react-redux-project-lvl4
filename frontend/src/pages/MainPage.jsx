import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../components/Navbar';

const MainPage = () => (
  <div className="p-0">
    <Navbar />
    <div className="d-flex flex-column h-100 p-5">
      <h1>Корневая страница</h1>
      <ul>
        <li>
          <Link to="/login">Странница залогиниваний</Link>
        </li>
      </ul>
      <ul>
        <li>
          <Link to="/chat">Странница чата в разработке</Link>
        </li>
      </ul>
    </div>
  </div>
);

export default MainPage;
