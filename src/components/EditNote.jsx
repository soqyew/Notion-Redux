import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const EditNote = () => {
  const { id } = useParams(); 
  const [note, setNote] = useState(null);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const userNotes = JSON.parse(localStorage.getItem("notes")) || [];
    const foundNote = userNotes.find(note => note.id === parseInt(id)); 
    if (foundNote) {
      setNote(foundNote);
      setTitle(foundNote.title);
      setBody(foundNote.body);
    } else {
      navigate("/notes"); 
    }
  }, [id, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const userNotes = JSON.parse(localStorage.getItem("notes")) || [];
    const updatedNotes = userNotes.map((note) =>
      note.id === parseInt(id) ? { ...note, title, body } : note
    );

    localStorage.setItem("notes", JSON.stringify(updatedNotes));
    
    navigate(`/view-note/${id}`);
  };

  const handleBack = () => {
    navigate("/notes");
  };

  if (!note) return <p>Загрузка...</p>; 

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Редактировать заметку</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="mb-4">
          <label className="block mb-1" htmlFor="title">Название заметки:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Введите название заметки"
            className="px-3 py-2 border border-gray-300 rounded-md w-full"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="body">Тело заметки:</label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Введите тело заметки"
            className="px-3 py-2 border border-gray-300 rounded-md w-full"
            rows="5"
          />
        </div>
        <button
          type="submit"
          className="bg-gray-600 text-white py-2 px-4 rounded-md hover:bg-gray-400"
        >
          Сохранить
        </button>
      </form>
      <button
        onClick={handleBack}
        className="mt-4 text-gray-600 hover:underline"
      >
        Назад
      </button>
    </div>
  );
};

export default EditNote;