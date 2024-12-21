import React, { useState } from "react"; 
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Registration from "./components/RegistrationForm";
import HomePage from "./components/HomePage";
import LoginPage from "./components/LoginPage";
import NotesPage from "./components/NotesPage";
import CreateNote from "./components/CreateNote";
import EditNote from "./components/EditNote";
import ViewNote from "./components/ViewNote";
import NotFoundPage from './components/NotFoundPage';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null); // Состояние для текущего пользователя

  const login = (user) => {
    setIsAuthenticated(true);
    setCurrentUser(user); // Установите текущего пользователя
  };

  const logout = () => {
    setIsAuthenticated(false);
    setCurrentUser(null); // Сбросьте текущего пользователя
  };

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Registration />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/login" element={<LoginPage login={login} />} />
        <Route path="/notes" element={<NotesPage />} />
        <Route path="/create-note" element={<CreateNote currentUser={currentUser} />} />
        <Route path="/edit-note/:id" element={<EditNote />} />
        <Route path="/view-note/:id" element={<ViewNote />} />
        <Route path="*" element={<NotFoundPage isAuthenticated={isAuthenticated} />} />
      </Routes>
    </Router>
  );
};

export default App;