import React, { useState } from 'react'
import { useTodo } from '../contexts/Todocontext';

const ListItem = ({todo}) => {
    const [isTodoEditable, setIsTodoEditable] = useState(false);
    console.log(isTodoEditable);
    const [todoMessage, setTodoMessage] = useState(todo.todo);

  const {updateTodo, deleteTodo, toggleComplete} = useTodo();

  const editTodo = ()=>{
        updateTodo(todo.id,{...todo, todo:todoMessage});
    setIsTodoEditable(false);
  }

  const toggleCompleted = ()=>{
      toggleComplete(todo.id);
  }


  return (
    <div
    className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-md shadow-white/40 duration-300  text-black ${
        todo.complete ? "bg-[#c6e9a7] shadow-md shadow-[#c6e9a7]" : "bg-[#ccbed7]"
    }`}
>
    <input
        type="checkbox"
        className="cursor-pointer"
        checked={todo.checked}
        onChange={toggleCompleted}
    />
    <input
        type="text"
        className={`border outline-none w-full bg-transparent rounded-lg ${
            isTodoEditable ? "border-black/10 px-2" : "border-transparent"
        } ${todo.complete ? "line-through" : ""}`}
        value={todoMessage}
        onChange={(e)=> setTodoMessage(e.target.value)}
        readOnly = {!isTodoEditable}
    />
    {/* Edit, Save Button */}
    <button
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
        onClick={()=>{
            if(todo.completed) return

            else if(isTodoEditable){
                editTodo();
            } else setIsTodoEditable((prev)=> !prev);
         } }
         disabled={todo.complete}
    >
        {isTodoEditable ? "📁" : "✏️"}
    </button>
    {/* Delete Todo Button */}
    <button
      onClick={()=> deleteTodo(todo.id)}
        className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
    >
        ❌
    </button>
</div>
  );
}

export default ListItem
