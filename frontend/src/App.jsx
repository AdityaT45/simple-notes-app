import  { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: '', content: '' });

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    const res = await axios.get('http://localhost:5000/api/notes');
    setNotes(res.data);
  };

  const addNote = async (e) => {
    e.preventDefault();
    await axios.post('http://localhost:5000/api/notes', form);
    setForm({ title: '', content: '' });
    fetchNotes();
  };

  const deleteNote = async (id) => {
    await axios.delete(`http://localhost:5000/api/notes/${id}`);
    fetchNotes();
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>📝 Simple Notes App</h1>
      <form onSubmit={addNote}>
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          required
        /><br /><br />
        <textarea
          placeholder="Content"
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          required
        ></textarea><br /><br />
        <button type="submit">Add Note</button>
      </form>

      <hr />
      <h2>All Notes</h2>
      {notes.map(note => (
        <div key={note._id} style={{ border: '1px solid gray', margin: '10px', padding: '10px' }}>
          <h3>{note.title}</h3>
          <p>{note.content}</p>
          <button onClick={() => deleteNote(note._id)}>Delete</button>
        </div>
      ))}
    </div>
  );
};

export default App;
