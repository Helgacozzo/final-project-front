import React, { useState } from 'react';
import "./SignUser.scss";

const SignUser = ({ type }) => {

  const title = type === 'log In' ? 'Log In' : 'Sign Up';

  return (
    <div className='Background-Container'>
      <div className='form-content'>
        <h2 className='subtitle'>{title}</h2>
        {error && <p className='error'>{error}</p>}
        <form onSubmit={handleSubmit}>
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
          <button className='User-button' type="submit">{title}</button>
        </form>
      </div>
    </div>
  );
};

export default SignUser;
