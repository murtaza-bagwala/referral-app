import React, { useState } from 'react';

import './App.css';
import Footer from './components/Footer';
import Header from './components/Header';
import Login from './components/Login';
import ReferralList from './components/ReferralList';

export default function App() {
  const [token, setToken] = useState();

  if (!token) {
    return <Login setToken={setToken} />;
  }

  if (token) {
    sessionStorage.setItem('token', token);
  }

  return (
    <>
      <div className="content">
        <Header setToken={setToken}/>

        <main>
          <ReferralList />
        </main>
        
      </div>
     
      <Footer />
    </>
  );
}
