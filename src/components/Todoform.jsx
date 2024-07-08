import React, { useState } from 'react'
import { useTodo } from '../contexts/Todocontext';

const Todoform = () => {
    const [todo, setTodo] = useState("");
    const {addTodo} = useTodo();

    const add  = (e)=>{
      e.preventDefault();
      if(!todo){ return  console.log('nothing');
      }else{
      console.log(todo);
      addTodo({todo, complete:false})
    //  console.log(addTodo({todo, complete:false}));
      setTodo("");
    }
    }

  return (
    <form onSubmit={add} className="flex">
    <input
        type="text"
        placeholder="Write Todo..."
        className="w-full border border-black/10 rounded-l-lg px-3 placeholder:text-white outline-none duration-150 bg-white/40 py-1.5"
        value={todo}
        onChange={(e)=> setTodo(e.target.value)}
    />
    <button type="submit" className="rounded-r-lg rounded-l-none px-3 py-1 bg-green-500 hover:bg-green-700 text-white shrink-0">
        Add
    </button>
</form>
  )
}

export default Todoform
