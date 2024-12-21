const initialState = {
    notes: [],
  };
  
  const notesReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'LOAD_NOTES':
        return {
          ...state,
          notes: action.payload,
        };
      case 'ADD_NOTE':
        return {
          ...state,
          notes: [...state.notes, action.payload],
        };
      case 'DELETE_NOTE':
        return {
          ...state,
          notes: state.notes.filter(note => note.id !== action.payload),
        };
      default:
        return state;
    }
  };
  
  export default notesReducer;