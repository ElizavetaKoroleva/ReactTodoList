import React, {useEffect} from 'react';
import TodoList from './components/TodoList/TodoList';
import Context from './context';
import AddTodo from './components/AddTodo/AddTodo';
import Loader from './components/Loader/Loader';

function App() {
  const [todos, setTodos] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/todos?_limit=5')
      .then(response => response.json())
      .then(todos => {
        setTimeout(() => {
          setTodos(todos);
          setLoading(false);
        }, 1500)
      })
  }, []);

  function toggleTodo(id) {
    setTodos( 
      todos.map(todo => {
      if (todo.id === id) {
        todo.complited = !todo.complited;
      }
      return todo;
    }));
  }

  function removeTodo(id) {
    setTodos(todos.filter(todo => todo.id !== id));
  }

  function addTodo(title) {
    setTodos(todos.concat([{
      title: title,
      id: Date.now(),
      complited: false
    }]));
  }

  return (
    <Context.Provider value={{ removeTodo }}>
      <div className="wrapper">
        <h1 className="wrapper__title">Todo List</h1>
        <AddTodo onCreate={addTodo}/>
        {loading && <Loader />}
        {todos.length ? (
          <TodoList todos={todos} onToggle={toggleTodo}/> 
        ) : loading ? null : (<p className="wrapper__text">Список пуст</p>
        )}
      </div>
    </Context.Provider>
  );
}

export default App;
