import { Link } from 'react-router-dom';

const WelcomeComponent = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-[150px] font-bold mb-8">Welcome</h1>
      <div className="flex space-x-4">
        <Link to="/login" className="bg-blue-500 hover:bg-blue-600 text-[30px] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Login
        </Link>
        <Link to="/signup" className="bg-green-500 hover:bg-green-600 text-[30px] text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default WelcomeComponent;
