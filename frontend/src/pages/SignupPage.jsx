import React from 'react';
import { Image } from 'react-bootstrap';
import SignupForm from '../components/SignupForm';
import Navbar from '../components/Navbar';
import totaImg from '../img/Tota-celebrating.jpg';

const SignupPage = () => (
  <>
    <Navbar />
    <div className="container-fluid h-100">
      <div className="row justify-content-center align-content-center h-100">
        <div className="col-12 col-md-8 col-xxl-6">
          <div className="card shadow-sm">
            <div className="card-body d-flex flex-column flex-md-row justify-content-around align-items-center p-5">
              <div>
                <Image src={totaImg} alt="Mascot tota celebrates new user" roundedCircle />
              </div>
              <SignupForm />
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default SignupPage;
