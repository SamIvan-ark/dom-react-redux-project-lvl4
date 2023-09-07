import React from 'react';
import { Link } from 'react-router-dom';

const BuildPage = () => (
  <div>
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
);

export default () => BuildPage();
