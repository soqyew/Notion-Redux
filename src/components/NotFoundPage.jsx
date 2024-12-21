import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = ({ isAuthenticated }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Страница не найдена</h1>
      <p className="text-gray-600 mb-6">К сожалению, запрашиваемая вами страница не существует.</p>
      <div>
        {isAuthenticated ? (
          <button
            onClick={() => navigate('/home')}
            className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400"
          >
            На главную страницу
          </button>
        ) : (
          <button
            onClick={() => navigate('/login')}
            className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400"
          >
            Войти
          </button>
        )}
      </div>
    </div>
  );
};

export default NotFoundPage;