import { useDeleteToDoMutation, usePatchTodoMutation, useCheckTodoMutation } from '../../services/toDo'
import { useState } from 'react'

const Task = ({ id, title, isCompleted }) => {
  const [deleteToDo, { isLoading: isDeleting }] = useDeleteToDoMutation();
  const [patchTodo, { isLoading: isPatching }] = usePatchTodoMutation();
  const [checkTodo, { isLoading: isChecking }] = useCheckTodoMutation();
  const [editTitle, setEditTitle] = useState(title);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = async () => {
    try {
      await patchTodo({ id, title: editTitle });
      setIsEditing(false);
    } catch (error) {
      console.error('Failed to update todo:', error);
    }
  };

  const handleCheck = async () => {
    try {
      await checkTodo({ id, isCompleted: !isCompleted });
    } catch (error) {
      console.error('Failed to toggle todo:', error);
    }
  };

  if (isDeleting || isPatching || isChecking) {
    return <div>Loading...</div>;
  }

  return (
    <li>
      {isEditing ? (
        <>
          <input 
            value={editTitle} 
            onChange={(e) => setEditTitle(e.target.value)}
          />
          <button onClick={handleSave}>Save</button>
          <button onClick={() => setIsEditing(false)}>Cancel</button>
        </>
      ) : (
        <>
          <p 
            style={{
              textDecoration: isCompleted ? 'line-through' : 'none',
              cursor: 'pointer' 
            }}
            onClick={handleCheck}
          >
            {title}
          </p>
          <button onClick={() => deleteToDo(id)}>Delete</button>
          <button onClick={() => setIsEditing(true)}>Edit</button>
        </>
      )}
    </li>
  );
};

export default Task;