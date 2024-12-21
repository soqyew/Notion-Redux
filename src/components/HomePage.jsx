import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

const HomePage = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const users = JSON.parse(localStorage.getItem("users")) || [];
  const currentUser = users[users.length - 1]; 

  const handleLogout = () => {
    navigate("/login"); 
  };

  const handleGoToNotes = () => {
    navigate("/notes"); 
  };

  const handleGoHome = () => {
    navigate("/home"); 
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-100 p-4">
      <header className="w-full bg-white shadow-md p-4">
        <div className="flex justify-between items-center max-w-4xl mx-auto">
          <h1 className="text-xl font-semibold">Главная страница</h1>
          <nav>
            <button
              onClick={handleGoHome}
              className={`mx-2 py-2 px-4 rounded-md ${location.pathname === '/home' ? 'bg-gray-300' : 'text-gray-700'}`}
            >
              Главная
            </button>
            <button onClick={handleGoToNotes} className="text-gray-700 mx-2">Заметки</button>
            <button onClick={handleLogout} className="text-gray-700 mx-2">Выйти</button>
          </nav>
        </div>
      </header>

      <main className="flex flex-col items-center justify-center flex-1 w-full">
        <div className="bg-white p-6 rounded-md shadow-md w-full max-w-md mx-auto">
          <h2 className="text-2xl font-bold mb-4">Обо мне</h2>
          {currentUser ? (
            <div>
              <p><strong>Имя:</strong> {currentUser.name}</p>
              <p><strong>Никнейм:</strong> {currentUser.nickname}</p>
              <p><strong>Email:</strong> {currentUser.email}</p>
              <p><strong>Возраст:</strong> {currentUser.age}</p>
              <p><strong>Пол:</strong> {currentUser.gender}</p>
              <p><strong>Дата регистрации:</strong> {new Date(currentUser.createdAt).toLocaleString()}</p>
            </div>
          ) : (
            <p>Пользователь не найден.</p>
          )}
          
        </div>
        <button
            onClick={handleGoToNotes}
            className="mt-4 bg-gray-500 text-white py-2 px-4 rounded-md w-full max-w-md mx-auto hover:bg-gray-400"
          >
            Перейти к заметкам
          </button>
      </main>
    </div>
  );
};

export default HomePage;