import React from 'react';
import { Image } from 'react-bootstrap';
import LoginForm from '../components/LoginForm';
import Navbar from '../components/Navbar';
import totaImg from '../img/Tota-with-flag.jpg';

const Login = () => (
  <div className="d-flex flex-column h-100">
    <Navbar />
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body row p-5">
              <div className="col-12 col-md-6 d-flex align-items-center justify-content-center">
                <Image src={totaImg} alt="Tota on top holds flag" roundedCircle />
              </div>
              <LoginForm />
            </div>
            <div className="card-footer p-4">
              <div className="text-center">
                <span>Нет аккаунта? </span>
                <a href="/signup">Регистрация</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Login;
