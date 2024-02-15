import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCircleUser } from "react-icons/fa6";
import { useUser } from '../context/UserContext';
import "./SignUser.scss";

const SignUser = ({ type }) => {

  const title = type === 'login' ? 'Log In' : 'Sign Up';
  const oppositeType = type === 'login' ? 'signup' : 'login';

  const { signUp, logIn, error } = useUser();

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const SignUser = async (e) => {
    e.preventDefault();
    setConfirmPasswordError(null);
    const { email, password, confirmPassword } = formData;
    if (type === 'login') {
      logIn(email, password);
    } else {
      if (password !== confirmPassword) {
        setConfirmPasswordError('Passwords do not match.');
        return;
      }
      signUp(email, password);
    }
  };

  return (

    <div className='Background-Container'>
      <div className='form-content'>
        <h2 className='subtitle'>{title}</h2>
        <div className='user-icon-wrapper'>
          <hr />
          <FaCircleUser className='user-icon' size={70} />
          <hr />
        </div>
        {error && <p className='error'>{error}</p>}
        <form onSubmit={SignUser}>

          <div>
            <label>Email:</label>
            <span>*</span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          {type === 'signup' && (
            <>

              <div>
                <label>Password:</label>
                <span>*</span>
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />
              </div>

              <div>
                <label>Confirm Password:</label>
                <span>*</span>
                <input
                  type="password"
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  required
                />
                {confirmPasswordError && <p className='error'>{confirmPasswordError}</p>}
              </div>

            </>
          )}

          {type === 'login' && (

            <div>
              <label>Password:</label>
              <span>*</span>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>

          )}
          <button className='User-button' type="submit">{title}</button>
        </form>

        <p>{type === 'login' ? 'Non hai un account?   ' : 'Hai già un account?   '}
          <Link className='link' to={`/${oppositeType}`}>{type === 'login' ? 'Registrati' : 'Accedi'}</Link></p>

      </div>
    </div>

  );

};

export default SignUser;
