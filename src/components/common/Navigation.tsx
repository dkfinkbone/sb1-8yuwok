import { Link, useLocation } from 'react-router-dom';

export const Navigation = () => {
  const location = useLocation();
  const isAdmin = location.pathname === '/admin';

  return (
    <div className="flex justify-between items-center mb-8">
      <h1 className="text-3xl font-bold text-gray-900">
        {isAdmin ? 'Tile Management Admin' : 'Tile Gallery'}
      </h1>
      <Link 
        to={isAdmin ? '/' : '/admin'}
        className={`${
          isAdmin 
            ? 'bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-500' 
            : 'bg-gray-600 hover:bg-gray-700 focus:ring-gray-500'
        } text-white px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2`}
      >
        {isAdmin ? 'View User Interface' : 'Admin Panel'}
      </Link>
    </div>
  );
};