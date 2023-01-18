import React, { useState } from "react";

import "../App.css";
import Footer from "./Footer";
import Header from "./Header";
import Login from "./Login";
import ReferralList from "./ReferralList";

export default function App() {
  const [token, setToken] = useState();

  if (!token) {
    return <Login setToken={setToken} />;
  }

  if (token) {
    sessionStorage.setItem("token", token);
  }

  return (
    <>
      <div className="content">
        <Header setToken={setToken} />

        <main>
          <ReferralList />
        </main>
      </div>

      <Footer />
    </>
  );
}
