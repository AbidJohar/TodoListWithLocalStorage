import { useEffect, useState } from 'react'
import { TodoProvider } from './contexts/Todocontext'
import Todoform from './components/Todoform';
import ListItem from './components/ListItem';
import backgroundImage from './assets/todo.jpg'

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo)=>{
     setTodos((prev)=> [...prev, {id: Date.now(), ...todo}] );
  }

  const toggleComplete = (id)=> {
    setTodos((prev)=>  prev.map((singleTodo)=> singleTodo.id === id ? {...singleTodo, complete: !singleTodo.complete} : singleTodo)
    )
  }

  const updateTodo = (id, todo)=>{
    setTodos((prev) => {
    return  prev.map((singleTodo)=> (
        singleTodo.id == id ? todo : singleTodo
      ))
  })
  };

  const deleteTodo = (id)=>{
     setTodos((prev) => (
       prev.filter((singleTodo)=> singleTodo.id !== id)
     ))
  }
   useEffect(()=>{

    const todos =  JSON.parse(localStorage.getItem("todos"));
    // console.log('Retrieved todos from localStorage:', todos);
    if(todos && todos.length >0)  {
      setTodos(todos);
    }
   }, []);
   useEffect(()=>{
    localStorage.setItem("todos", JSON.stringify(todos));
    
   }, [todos]);
  
  return (
    <TodoProvider value={{todos,toggleComplete,addTodo,deleteTodo,updateTodo}}>
       <div className=" h-screen w-screen py-8 bg-cover bg-center"
       style={{backgroundImage:`url(${backgroundImage})`}}>
                <div className="w-full max-w-2xl mx-auto border border-1 border-white/50  rounded-lg px-4 py-3 text-white">
                    <h1 className="text-2xl font-bold text-center mb-8 mt-2">TODO LIST</h1>
                    <div className="mb-4">
                        {/* Todo form goes here */} 
                        <Todoform/>
                    </div>
                    <div className="flex flex-wrap gap-y-3">
                        {/*Loop and Add TodoItem here */}
                          {
                            todos.map((todo)=>{
                           
                            return   <div key={todo.id}
                              className='w-full '
                              >
                                <ListItem todo={todo}/>
                              </div>
                            })
                          }
                    </div>
                </div>
            </div>
    </TodoProvider>
  )
}

export default App
