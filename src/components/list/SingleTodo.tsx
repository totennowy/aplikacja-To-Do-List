import React, { useEffect, useRef, useState } from "react";
import { Todo } from "../../model/model";
import { AiFillEdit } from "react-icons/ai";
import { AiFillDelete } from "react-icons/ai";
import { MdDone } from "react-icons/md";

type Props = {
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
};

const SingleTodo = ({ todo, todos, setTodos }: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const handleDone = (id: number) => {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, isDone: !todo.isDone } : todo
      )
    );
  };

  const handleDelete = (id: number) => {
    setTodos(todos.filter((todo) => todo.id !== id));
  };

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();

    setTodos(
      todos.map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );
    setEdit(false);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <form className="todos__single" onSubmit={(e) => handleEdit(e, todo.id)}>
      {edit ? (
        <input
          ref={inputRef}
          value={editTodo}
          onChange={(e) => setEditTodo(e.target.value)}
          className="todos__single--text todos__single--text-edit"
        />
      ) : todo.isDone ? (
        <span className="todos__single--text todos__single--text-erased">
          {todo.todo}
        </span>
      ) : (
        <span className="todos__single--text">{todo.todo}</span>
      )}

      <div className="icons">
        <span
          className="icons__box"
          onClick={() => {
            if (!edit && !todo.isDone) {
              setEdit(!edit);
            }
          }}
        >
          <AiFillEdit className="icons__box-img" />
        </span>
        <span className="icons__box">
          <AiFillDelete
            className="icons__box-img"
            onClick={() => handleDelete(todo.id)}
          />
        </span>
        <span className="icons__box" onClick={() => handleDone(todo.id)}>
          <MdDone className="icons__box-img" />
        </span>
      </div>
    </form>
  );
};

export default SingleTodo;
