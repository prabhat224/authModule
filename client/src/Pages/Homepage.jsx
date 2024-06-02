import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Correct named import

const Homepage = () => {
  const navigate = useNavigate();
  const [newQuote, setNewQuote] = useState('');
  const [quotes, setQuotes] = useState([]);

  const populateQuotes = async () => {
    try {
      const resp = await fetch('http://localhost:8080/quotes', {
        method: 'GET',
        headers: {
          'x-access-token': localStorage.getItem('token'),
        },
      });

      if (!resp.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await resp.json();
      setQuotes(data.quotes); // Store quotes in state
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  const handleAddQuote = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/register');
        return;
      }
      const user = jwtDecode(token);
      if (!user) {
        localStorage.removeItem('token');
        navigate('/register');
        return;
      }
      // Add quote
      const resp = await fetch('http://localhost:8080/quotes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-access-token': token,
        },
        body: JSON.stringify({ quote: newQuote }),
      });

      if (!resp.ok) {
        throw new Error('Failed to add quote');
      }

      // Refresh quotes
      populateQuotes();
      // Clear the input field
      setNewQuote('');
    } catch (error) {
      console.error('Error:', error.message);
    }
  };

  useEffect(() => {
    populateQuotes();
  }, []);

  return (
    <div className="mx-auto max-w-md p-4">
      <h1 className="text-3xl font-bold mb-4">Home</h1>
      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter a new quote"
          className="border border-gray-400 p-2 rounded mr-2"
          value={newQuote}
          onChange={(e) => setNewQuote(e.target.value)}
        />
        <button
          onClick={handleAddQuote}
          className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Add Quote
        </button>
      </div>
      {/* Render quotes */}
      <div>
        {quotes.map((quote, index) => (
          <div key={index} className="border border-gray-400 p-2 rounded mb-2">
            {quote}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Homepage;
