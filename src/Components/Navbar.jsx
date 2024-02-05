import React from 'react';
import Logo from '../assets/Logo.png'
import './Navbar.scss';

export default function Navbar() {

  return (

    <nav className='navbar'>

      <div className='menu'>
        <ul>
          <li><a href="/albums">Events</a></li>
          <li><a href="/musicians">Tarots</a></li>
          <li><a href="/musicians">Experience</a></li>
        </ul>
      </div>

      <hr />

      <figure className='logo'>
        <a href="/"><img src={Logo} alt="" /></a>
      </figure>

      <hr />

      <div className='menu'>
        <ul>
          <li><a href="/albums">Events</a></li>
          <li><a href="/musicians">Tarots</a></li>
          <li><a href="/musicians">Experience</a></li>
        </ul>
      </div>

    </nav>

  );

}
