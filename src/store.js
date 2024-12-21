import { createStore, combineReducers } from 'redux';
import notesReducer from './reducers/notesReducer';
import userReducer from './reducers/userReducer';

// Объединяем редюсеры
const rootReducer = combineReducers({
  notes: notesReducer,
  users: userReducer, // Добавляем редюсер пользователей
});

// Создаем хранилище с корневым редюсером
const store = createStore(rootReducer);

export default store;