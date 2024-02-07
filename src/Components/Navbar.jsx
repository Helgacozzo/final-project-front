import React from 'react';
import Logo from '../assets/Logo.png'
import './Navbar.scss';

export default function Navbar() {

  return (

    <nav className='navbar'>

      <div className='logo-container'>
        <hr />
        <figure className='logo'>
          <a href="/"><img src={Logo} alt="Ethereal" /></a>
        </figure>
        <hr />
      </div>
      
    </nav>

  );

}
