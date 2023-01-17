import React from 'react';
import Button from '@material-ui/core/Button';
import { logoutUser } from '../services/AuthService';

const Logout = ({ setToken }) => {
  const handleLogout = async () => {
    const token = sessionStorage.getItem('token');
    const response = await logoutUser(token);   
    
    if (response.status === 200) {
      sessionStorage.removeItem('token');
      sessionStorage.removeItem('currentUserName');
      setToken('');
    }
  };

  return (
    <Button
      type="submit"
      variant="contained"
      color="primary"
      onClick={handleLogout}
    >
      Logout
    </Button>
  );
};

export default Logout;
