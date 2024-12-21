import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loadNotes, deleteNote } from '../actions/notesActions';
const NotesPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("date_desc");
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();
  const notes = useSelector((state) => state.notes.notes);

  useEffect(() => {
    const loadUserNotes = () => {
      const currentUser = JSON.parse(localStorage.getItem("currentUser"));
      const userNotes = JSON.parse(localStorage.getItem("notes")) || [];

      if (!currentUser || !currentUser.id) {
        alert("Пользователь не авторизован. Пожалуйста, войдите в систему.");
        return;
      }

      const userNotesFiltered = userNotes.filter(note => note.userId === currentUser.id);
      dispatch(loadNotes(userNotesFiltered)); // Загружаем заметки в Redux
    };

    loadUserNotes();
  }, [dispatch]);

  const handleDelete = (noteId) => {
    if (window.confirm("Вы уверены, что хотите удалить эту заметку?")) {
      const updatedNotes = notes.filter(note => note.id !== noteId);
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
      dispatch(deleteNote(noteId)); // Удаляем заметку из Redux
    }
  };

  const handleSort = (order) => {
    setSortOrder(order); 
  };

  const filteredNotes = notes.filter(note =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCreateNoteRedirect = () => {
    navigate("/create-note"); 
  };

  const handleGoHome = () => {
    navigate("/home"); 
  };

  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gray-50 p-4">
      <header className="w-full bg-white shadow-sm p-4">
        <div className="flex justify-between items-center max-w-4xl mx-auto">
          <h1 className="text-xl font-semibold text-gray-800">Мое приложение</h1>
          <nav>
            <button
              onClick={handleGoHome}
              className={`mx-2 py-2 px-4 rounded-md ${location.pathname === '/home' ? 'bg-gray-200' : 'text-gray-700'}`}
            >
              Главная
            </button>
            <button
              onClick={() => navigate("/notes")}
              className={`mx-2 py-2 px-4 rounded-md ${location.pathname === '/notes' ? 'bg-gray-200' : 'text-gray-700'}`}
            >
              Заметки
            </button>
            <button onClick={() => navigate("/login")} className="text-gray-700 mx-2">Выйти</button>
          </nav>
        </div>
      </header>

      <main className="flex flex-col items-center justify-center flex-1 w-full">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">Мои заметки</h1>
        
        <button
          onClick={handleCreateNoteRedirect}
          className="mb-4 bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400"
        >
          Создать заметку
        </button>

        <input
          type="text"
          placeholder="Поиск заметок..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="mb-4 px-3 py-2 border border-gray-300 rounded-md w-full max-w-md"
        />
        
        <div className="flex flex-col w-full max-w-md mb-4">
          <div className="flex mb-2">
            <button 
              onClick={() => handleSort("date_desc")} 
              className={`text-gray-800 py-2 px-4 rounded-md flex-1 mr-2 ${sortOrder === "date_desc" ? 'bg-gray-400' : 'bg-gray-300 hover:bg-gray-400'}`}
            >
              Сортировать по дате (новые сначала)
            </button>
            <button 
              onClick={() => handleSort("date_asc")} 
              className={`text-gray-800 py-2 px-4 rounded-md flex-1 ${sortOrder === "date_asc" ? 'bg-gray-400' : 'bg-gray-300 hover:bg-gray-400'}`}
            >
              Сортировать по дате (старые сначала)
            </button>
          </div>
        </div>

        <div className="w-full max-w-md">
          {filteredNotes.length > 0 ? (
            filteredNotes.map(note => (
              <div key={note.id} className="flex justify-between items-center p-4 border-b border-gray-300 bg-white rounded-md mb-2 shadow-sm">
                <div>
                  <h2 className="font-bold cursor-pointer text-gray-800" onClick={() => navigate(`/view-note/${note.id}`)}>{note.title}</h2>
                  <p className="text-gray-600">{new Date(note.createdAt).toLocaleDateString()}</p>
                </div>
                <div className="flex space-x-2">
                  <img
                    src="/images/edit-icon.png" 
                    alt="Edit"
                    className="w-6 h-6 cursor-pointer"
                    onClick={() => navigate(`/edit-note/${note.id}`)} 
                  />
                  <img
                    src="/images/delete-icon.png" 
                    alt="Delete"
                    className="w-6 h-6 cursor-pointer"
                    onClick={() => handleDelete(note.id)}
                  />
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-500">Заметок не найдено.</p>
          )}
        </div>
      </main>
    </div>
  );
};

export default NotesPage;