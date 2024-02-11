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
          <li><a href="https://www.instagram.com/"><FaInstagram size={19}/></a></li>
          <li><a href="https://www.facebook.com/"><FaFacebook size={19}/></a></li>
          <li><a href="https://twitter.com/"><FaTwitter size={19}/></a></li>
        </ul>
      </div>

    </nav>

  );
  
}
