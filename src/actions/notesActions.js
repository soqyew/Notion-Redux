export const loadNotes = (notes) => ({
    type: 'LOAD_NOTES',
    payload: notes,
  });
  
  export const addNote = (note) => ({
    type: 'ADD_NOTE',
    payload: note,
  });
  
  export const deleteNote = (noteId) => ({
    type: 'DELETE_NOTE',
    payload: noteId,
  });