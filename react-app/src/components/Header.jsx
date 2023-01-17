import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import Logout from './Logout';
import ReferralDialog from './ReferralDialog';


const activeStyle = {
  color: 'purple',
};

export default function Header( { setToken } ) {
  const currentUserName = sessionStorage.getItem("currentUserName");
  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">
              <img alt="Referral App" src="/images/logo.png" />
            </Link>
          </li>
          <li>
            { `Welcome ${currentUserName}` }
          </li>
          <li>
            <Logout setToken = {setToken}/>
          </li>
          <li>
            <ReferralDialog />
          </li>
        </ul>
      </nav>
    </header>
  );
}
