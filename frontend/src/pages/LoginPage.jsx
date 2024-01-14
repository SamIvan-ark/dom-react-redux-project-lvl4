import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Image } from 'react-bootstrap';

import { LoginForm, Navbar } from '../components';
import totaImg from '../assets/img/Tota-with-flag.jpg';

const LoginPage = () => {
  const { t } = useTranslation();
  return (
    <>
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
                  <span className="d-inline block me-1">{t('credentials.noAcc')}</span>
                  <Link to="/signup">{t('credentials.registration')}</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
