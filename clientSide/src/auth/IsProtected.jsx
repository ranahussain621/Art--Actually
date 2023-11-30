import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const IsProtected = (props) => {
  const { Component } = props;
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track login status

  useEffect(() => {
    const checkLoginStatus = () => {
      let login = localStorage.getItem('user');
      
      if (!login) {
      
        navigate('/');
      } else {
       
        setIsLoggedIn(true); // Set login status to true
      }
    };

    checkLoginStatus();
  }, [navigate]);

  return (
    <div>
      {/* Render the dashboard component only if the user is logged in */}
      {isLoggedIn && <Component />}
    
    </div>
  );
};

export default IsProtected;
