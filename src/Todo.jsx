import { useState } from 'react';
import { useTodos } from './hooks/useTodos';

export default function Todo() {
  const [text, setText] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState('');

  const {
    todos,
    addTodo,
    updateTodo,
    deleteTodo,
    clearTodos,
  } = useTodos();

  const handleAdd = () => {
    if (text.trim()) {
      addTodo.mutate(text);
      setText('');
    }
  };

  const handleUpdate = (todo) => {
    if (editText.trim()) {
      updateTodo.mutate({ ...todo, text: editText });
      setEditingId(null);
      setEditText('');
    }
  };

  return (
    <div>
      <div className="flex gap-2 mb-4">
        <input
          type="text"
          className="border p-2 rounded w-full"
          placeholder="Malumot kiriting..."
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <button
          onClick={handleAdd}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add
        </button>
      </div>

      {todos.length === 0 && (
        <p className="text-center text-gray-500">No todos yet</p>
      )}

      <ul className="space-y-2">
        {todos.map((todo) => (
          <li
            key={todo.id}
            className="flex items-center justify-between border p-2 rounded"
          >
            {editingId === todo.id ? (
              <>
                <input
                  type="text"
                  className="border p-1 rounded w-full mr-2"
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                />
                <button
                  className="text-green-600 mr-2"
                  onClick={() => handleUpdate(todo)}
                >
                  Save
                </button>
                <button
                  className="text-gray-600"
                  onClick={() => {
                    setEditingId(null);
                    setEditText('');
                  }}
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <span>{todo.text}</span>
                <div className="flex gap-2">
                  <button
                    className="text-yellow-500"
                    onClick={() => {
                      setEditingId(todo.id);
                      setEditText(todo.text);
                    }}
                  >
                    Edit
                  </button>
                  <button
                    className="text-red-500"
                    onClick={() => deleteTodo.mutate(todo.id)}
                  >
                    Delete
                  </button>
                </div>
              </>
            )}
          </li>
        ))}
      </ul>

      {todos.length > 0 && (
        <button
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded w-full"
          onClick={() => clearTodos.mutate()}
        >
          Clear All
        </button>
      )}
    </div>
  );
}
