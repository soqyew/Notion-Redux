const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const path = require('path');

const app = express();
const PORT = 5000;

// Используйте CORS
app.use(cors());
app.use(bodyParser.json());

// Путь к файлу базы данных
const filePath = path.join(__dirname, 'db.json');

// Обработчик для регистрации пользователей
app.post('/users', (req, res) => {
    const userData = {
        id: Date.now(),
        ...req.body,
        createdAt: new Date().toISOString(),
    };

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Ошибка при чтении файла');
        }

        let dbData = { users: [], notes: [] };
        try {
            dbData = JSON.parse(data);
            if (typeof dbData !== 'object') {
                throw new Error('Данные в файле не являются объектом');
            }
        } catch (parseError) {
            console.error('Ошибка парсинга JSON:', parseError);
            return res.status(500).send('Ошибка при парсинге данных файла');
        }

        // Проверка на уникальность email
        const existingUser = dbData.users.find(user => user.email === userData.email);
        if (existingUser) {
            return res.status(400).send('Пользователь с таким email уже существует');
        }

        // Добавляем нового пользователя
        dbData.users.push(userData);

        fs.writeFile(filePath, JSON.stringify(dbData, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Ошибка при записи файла');
            }
            res.status(201).send('Регистрация успешна!');
        });
    });
});

// Обработчик для получения всех пользователей
app.get('/users', (req, res) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Ошибка при чтении файла');
        }

        let dbData = { users: [], notes: [] };
        try {
            dbData = JSON.parse(data);
            if (typeof dbData !== 'object') {
                throw new Error('Данные в файле не являются объектом');
            }
        } catch (parseError) {
            console.error('Ошибка парсинга JSON:', parseError);
            return res.status(500).send('Ошибка при парсинге данных файла');
        }

        res.json(dbData.users);
    });
});

// Обработчик для создания заметки
app.post('/notes', (req, res) => {
    const noteData = {
        id: Date.now(),
        authorId: req.body.userId,  // ID пользователя, который создал заметку
        title: req.body.title,
        body: req.body.body,
        createdAt: new Date().toISOString(),
    };

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Ошибка при чтении файла');
        }

        let dbData = { users: [], notes: [] };
        try {
            dbData = JSON.parse(data);
            if (typeof dbData !== 'object') {
                throw new Error('Данные в файле не являются объектом');
            }
        } catch (parseError) {
            console.error('Ошибка парсинга JSON:', parseError);
            return res.status(500).send('Ошибка при парсинге данных файла');
        }

        // Добавляем новую заметку
        dbData.notes.push(noteData);

        fs.writeFile(filePath, JSON.stringify(dbData, null, 2), (err) => {
            if (err) {
                return res.status(500).send('Ошибка при записи файла');
            }
            res.status(201).send('Заметка успешно создана!');
        });
    });
});

// Обработчик для получения заметок конкретного пользователя
app.get('/notes', (req, res) => {
    const userId = req.query.userId;
    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            return res.status(500).send('Ошибка при чтении файла');
        }

        let dbData = { users: [], notes: [] };
        try {
            dbData = JSON.parse(data);
            if (typeof dbData !== 'object') {
                throw new Error('Данные в файле не являются объектом');
            }
        } catch (parseError) {
            console.error('Ошибка парсинга JSON:', parseError);
            return res.status(500).send('Ошибка при парсинге данных файла');
        }

        const userNotes = dbData.notes.filter(note => note.userId === parseInt(userId));
        res.json(userNotes); // Возвращаем только заметки текущего пользователя
    });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Сервер запущен на http://localhost:${PORT}`);
});
