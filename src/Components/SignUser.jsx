import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaCircleUser } from "react-icons/fa6";
import { useUser } from '../context/UserContext';
import { isEmail, isStrongPassword } from 'validator';
import "./SignUser.scss";


const SignUser = ({ type }) => {

  // Definizione del titolo in base al tipo di operazione (login o signup)
  const title = type === 'login' ? 'Log In' : 'Sign Up';
  // Definizione del tipo opposto per il link (se è in signup, mostra il link per il login e viceversa)
  const oppositeType = type === 'login' ? 'signup' : 'login';

  // Utilizzo del contesto utente per ottenere le funzioni di registrazione e accesso
  const { signUp, logIn, error } = useUser();

  // State per memorizzare i dati del form e gestirne i cambiamenti
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  // Funzione per gestire i cambiamenti nei campi del form
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // State per memorizzare gli eventuali errori nei campi del form
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  // Funzione per gestire il submit del form (login o signup)
  const handleSignUser = async (e) => {
    e.preventDefault();
    setConfirmPasswordError('');
    setEmailError('');
    setPasswordError('');

    const { email, password, confirmPassword } = formData;
    try {
      if (type === 'signup') {
        // Validazione dell'email
        if (!isEmail(email)) {
          setEmailError(`Dovresti inserire una email reale.`);
          return;
        }

        // Validazione della password
        if (!isStrongPassword(password)) {
          setPasswordError(`La Password non corrisponde ai requisiti richiesti.`);
          return;
        }

        // Controllo della conferma della password
        if (password !== confirmPassword) {
          setConfirmPasswordError('La password non corrisponde.');
          return;
        }

        // Registrazione dell'utente
        await signUp(email, password);
      }

      if (type === 'login') {
        // Validazione email e password per il login
        if (!isEmail(email) || !isStrongPassword(password)) {
          setEmailError('Email o password non valide.');
          return;
        }

        // Login dell'utente
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
