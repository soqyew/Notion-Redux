import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const ViewNote = () => {
  const { id } = useParams(); 
  const [note, setNote] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const userNotes = JSON.parse(localStorage.getItem("notes")) || [];
    const foundNote = userNotes.find(note => note.id === parseInt(id)); 
    if (foundNote) {
      setNote(foundNote);
    } else {
      navigate("/notes"); 
    }
  }, [id, navigate]);

  const handleDelete = () => {
    if (window.confirm("Вы уверены, что хотите удалить эту заметку?")) {
      const userNotes = JSON.parse(localStorage.getItem("notes")) || [];
      const updatedNotes = userNotes.filter(note => note.id !== parseInt(id));
      localStorage.setItem("notes", JSON.stringify(updatedNotes));
      navigate("/notes"); 
    }
  };

  if (!note) return <p>Загрузка...</p>; 

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">{note.title}</h1>
      
      <div className="flex space-x-4 mb-4">
        <button
          className="text-gray-700"
          onClick={() => navigate(`/edit-note/${note.id}`)} 
        > 
         Редактировать
        </button>
        <button
          className="text-gray-700"
          onClick={handleDelete} 
        >
         Удалить
        </button>
      </div>

      <h2 className="text-lg font-semibold mb-2">Содержимое заметки:</h2>
      <pre className="bg-white p-4 border border-gray-300 rounded-md w-full max-w-md">
        {note.body}
      </pre>

      <button
        onClick={() => navigate("/notes")} 
        className="mt-4 bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
      >
        Назад
      </button>
    </div>
  );
};

export default ViewNote;