import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {jwtDecode} from 'jwt-decode'; // Correct named import
// import jwt from 'jsonwebtoken'

const Homepage = () => {
  const navigate = useNavigate();

  const populateQuotes = async () => {
    try {
      const resp = await fetch('http://localhost:8080/quotes', {
        headers: {
          'x-access-token': localStorage.getItem('token')
        }
      });

      if (!resp.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await resp.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const user = jwtDecode(token); // Correct usage of jwt_decode

        if (!user) {
          localStorage.removeItem('token');
          navigate('/register');
        } else {
          populateQuotes();
          console.log('User found');
        }
      } catch (error) {
        localStorage.removeItem('token');
        navigate('/register');
      }
    } else {
      navigate('/register');
    }
  }, [navigate]);

  return (
    <div className="text-[100px] font-bold mx-auto">
      Home
    </div>
  );
};

export default Homepage;
