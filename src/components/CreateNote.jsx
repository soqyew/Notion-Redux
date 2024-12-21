import React, { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addNote } from '../actions/notesActions'; // Импортируем действие

const CreateNote = ({ addNote }) => {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");
  const [titleError, setTitleError] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setTitleError("");

    const currentUser = JSON.parse(localStorage.getItem("currentUser"));

    if (title.trim() === "") {
      setTitleError("Название заметки не может быть пустым.");
      return;
    }

    if (!currentUser) {
      alert('Пользователь не авторизован.');
      return;
    }

    const newNote = {
      userId: currentUser.id,
      title: title,
      body: body,
      createdAt: new Date().toISOString(),
    };

    try {
      const response = await fetch('http://localhost:5000/notes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newNote),
      });

      if (!response.ok) {
        throw new Error('Ошибка при создании заметки');
      }

      const data = await response.json();
      addNote(data); // Добавляем заметку в Redux
      alert('Заметка успешно создана!');
      navigate(`/view-note/${data.id}`);
    } catch (error) {
      console.error(error);
      alert(error.message);
    }
  };

  const handleBack = () => {
    navigate("/notes");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <h1 className="text-2xl font-bold mb-4">Создать новую заметку</h1>
      <form onSubmit={handleSubmit} className="w-full max-w-md">
        <div className="mb-4">
          <label className="block mb-1" htmlFor="title">Название заметки:</label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Введите название заметки"
            className={`px-3 py-2 border ${titleError ? "border-red-500" : "border-gray-300"} rounded-md w-full`}
          />
          {titleError && <p className="text-red-500 text-sm">{titleError}</p>}
        </div>
        <div className="mb-4">
          <label className="block mb-1" htmlFor="body">Тело заметки:</label>
          <textarea
            id="body"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            placeholder="Введите тело заметки (можно оставить пустым)"
            className="px-3 py-2 border border-gray-300 rounded-md w-full"
            rows="5"
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
        >
          Создать
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

// Подключаем компонент к Redux
const mapDispatchToProps = {
  addNote,
};

export default connect(null, mapDispatchToProps)(CreateNote);