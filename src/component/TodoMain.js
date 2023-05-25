import React from 'react'
import TodoItem from './TodoItem'

import './scss/TodoMain.scss';

const TodoMain = ({todoList,remove,check}) => {
    // console.log(props);

    const rederTodoItem = () =>{
        const todoItems = todoList.map(todo=><TodoItem/>);
        
        return todoItems;
    };
  return (
    <ul className='todo-list'>
        {
           todoList.map(todo=><TodoItem key={todo.id} item={todo} remove={remove} check={check}/>)
        }
    </ul>
  )
}

export default TodoMain