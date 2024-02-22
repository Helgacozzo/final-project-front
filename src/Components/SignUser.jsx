import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCircleUser } from "react-icons/fa6";
import { useUser } from '../context/UserContext';
import { isEmail, isStrongPassword } from 'validator';
import "./SignUser.scss";

const SignUser = ({ type }) => {
  
  const title = type === 'login' ? 'Log In' : 'Sign Up';
  const oppositeType = type === 'login' ? 'signup' : 'login';

  const { signUp, logIn, error} = useUser();

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
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleSignUser = async (e) => {
    e.preventDefault();
    setConfirmPasswordError('');
    setEmailError('');
    setPasswordError('');
  
    const { email, password, confirmPassword } = formData;
    try {
      if (type === 'signup') {
        if (!isEmail(email)) {
          setEmailError(`Dovresti inserire una email reale.`);
          return;
        }
  
        if (!isStrongPassword(password)) {
          setPasswordError(`La Password non corrisponde ai requisiti richiesti.`);
          return;
        }
  
        if (password !== confirmPassword) {
          setConfirmPasswordError('La password non corrisponde.');
          return;
        }
  
        await signUp(email, password);
      }
  
      if (type === 'login') {
        if (!isEmail(email) || !isStrongPassword(password)) {
          setEmailError('Email o password non valide.');
          return;
        }
        
        await logIn(email, password);
      }
    } catch (error) {
      console.error(`Errore durante l'autenticazione:`, error);
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

        {error && <div className="error">{error}</div>}

        <form onSubmit={handleSignUser}>
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
            {emailError && <p className='error'>{emailError}</p>}
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
                {passwordError && <p className='error'>{passwordError}</p>}
              </div>
              <div>
                <label>Conferma Password:</label>
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

        <p className='account-text'>{type === 'login' ? 'Non hai un account?   ' : 'Hai già un account?   '}
          <Link className='link' to={`/${oppositeType}`}>{type === 'login' ? 'Registrati' : 'Accedi'}</Link></p>

      </div>

    </div>

  );
  
};

export default SignUser;
