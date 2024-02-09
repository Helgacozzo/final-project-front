import React from 'react';
import { slide as Menu } from 'react-burger-menu';
import { FaBars } from 'react-icons/fa';
import Logo from '../assets/Logo.svg';
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

      <div className='menu-wrapper'>
        <FaBars className='menu-icon' />
        <Menu className='menu' right>
          <a href="/" className="menu-item">Home</a>
          <a href="#" className="menu-item">About</a>
          <a href="#" className="menu-item">Contact</a>
        </Menu>
      </div>

    </nav>

  );
}
