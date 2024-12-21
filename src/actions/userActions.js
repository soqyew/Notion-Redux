// actions/userActions.js
export const ADD_USER = 'ADD_USER';
export const SET_CURRENT_USER = 'SET_CURRENT_USER';
export const ADD_NOTE = 'ADD_NOTE';

export const addUser = (user) => ({
  type: ADD_USER,
  payload: user,
});

export const setCurrentUser = (user) => ({
  type: SET_CURRENT_USER,
  payload: user,
});

export const addNote = (note) => ({
  type: ADD_NOTE,
  payload: note,
});