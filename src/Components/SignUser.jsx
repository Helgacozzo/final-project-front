import React, { useState } from 'react';
import "./SignUser.scss";
import { useUser } from '../context/UserContext'; 

const SignUser = ({ type }) => {

  const title = type === 'login' ? 'Log In' : 'Sign Up';

  const { signUp, logIn, error } = useUser(); 

  const [formData, setFormData] = useState({
    email: '',
    username: '',
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
    setConfirmPasswordError('');
    const { email, username, password, confirmPassword } = formData;
    if (type === 'signup' && password !== confirmPassword) {
      setConfirmPasswordError('Passwords do not match.');
      return;
    }
    if (type === 'signup') {
      try {
        await signUp(email, password); 
      } catch (error) {
        console.error('Sign up error:', error.message);
      }
    } else {
      try {
        await logIn(email, password); 
      } catch (error) {
        console.error('Log in error:', error.message);
      }
    }
  };

  return (
    <div className='Background-Container'>
      <div className='form-content'>
        <h2 className='subtitle'>{title}</h2>
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
                <label>Username:</label>
                <span>*</span>
                <input
                  type="text"
                  name="username"
                  value={formData.username}
                  onChange={handleChange}
                  required
                />
              </div>
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
      </div>
    </div>
  );
};

export default SignUser;
