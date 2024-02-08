import React from 'react';
import { FaInstagram } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import './SideBar.scss';

export default function Sidebar() {

  return (

    <nav className='sidebar'>

      <div className='socialMenu'>
        <ul>
          <li><a href="https://www.instagram.com/"><FaInstagram /></a></li>
          <li><a href="https://www.facebook.com/"><FaFacebook /></a></li>
          <li><a href="https://twitter.com/"><FaTwitter /></a></li>
        </ul>
      </div>

    </nav>

  );
  
}
