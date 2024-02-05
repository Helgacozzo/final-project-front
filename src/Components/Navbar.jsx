import React from 'react';
import './Navbar.scss';

export default function Navbar() {

  return (

    <nav className='navbar'>

      <figure>
        {/* <a href="/"><img src="" alt="" /></a> */}
      </figure>

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
