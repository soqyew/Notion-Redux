// reducers/userReducer.js
import { ADD_USER, SET_CURRENT_USER, ADD_NOTE } from '../actions/userActions';

const initialState = {
  users: [],
  currentUser: null,
  notes: [],
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        users: [...state.users, action.payload],
      };
    case SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    case ADD_NOTE:
      return {
        ...state,
        notes: [...state.notes, action.payload],
      };
    default:
      return state;
  }
};

export default userReducer;