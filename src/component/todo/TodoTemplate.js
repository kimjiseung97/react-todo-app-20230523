import React, { useEffect, useState } from 'react'
import TodoHeader from './TodoHeader'
import TodoMain from './TodoMain'
import TodoInput from './TodoInput'

import './scss/TodoTemplate.scss';
import { json } from 'react-router-dom';

const TodoTemplate = () => {

    //서버에 할일 목록(json)을 요청해서 받아와야함
    const API_BASE_URL = 'http://localhost:8383/api/todos';
    
    //todos 배열을 상태관리
    const [todos,setTodos] = useState(
      [
        
      ]
    );

    //id값 시퀀스 생서
    const makeNewId = () =>{
      if(todos.length===0) return 1;
      return todos[todos.length -1].id + 1;
    }

    //todoInput에게 todotext를 받아오는 함수
    const addTodo = todoText=>{
      //console.log('할 일 정보', todoText);
      const newTodo = {
        id : makeNewId(),
        title : todoText,
        done : false
      };
      //todos.push(newTodo);

      //리액트의 상태변수는 무조건 setter를 통해서만
      //상태값을 변경해야 레더링에 적용된다.
      //다만 상태변수가 불변성(immutable)을 가지기때문에
      //기존의 상태에서 변경이 불가능하고
      //새로운 상태를 만들어서 변경해야한다. 

      //setTodos(todos.concat([newTodo]));
      fetch(API_BASE_URL,{
        method : 'POST',
        headers : {'content-type':'application/json'},
        body : JSON.stringify(newTodo)
      })
      .then(res=>res.json())
      .then(json=>{
        setTodos(json.todos)
      });

      setTodos([...todos, newTodo]);
    };
    // TodoTemplate가 todoItem에 아이디를받아오기위해서 함수를내려보낸다
    //할 일 삭제 처리함수
    const removeTodo = id =>{
      //console.log(`삭제대상 id  :${id}`);

      // const copyArr =todos.filter(todo => todo.id!==id);
      
      // setTodos(copyArr);
      fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE'
      })
      .then(res => res.json())
      .then(json => {
        setTodos(json.todos);
      });


    };

    //할 일 체크 처리함수
    const checkTodo = (id, done) =>{
      //console.log(`체크한 Todo id : ${id}`);
      
      // const copyTodos = [...todos];
      // for(const cTodo of copyTodos){
      //   if(cTodo.id===id){
      //     cTodo.done = !cTodo.done;
      //   }
      // }
      // setTodos(copyTodos);
      fetch(API_BASE_URL, {
        method: 'PUT',
        headers: {'content-type': 'application/json'},
        body: JSON.stringify({
           done: !done,
           id: id
        })
      })
      .then(res => res.json())
      .then(json => setTodos(json.todos)); 


   // setTodos(todos.map(todo=>todo.id===id?{...todo,done:!todo.done}:todo));
      
    };

    //체크가 안된 할 일의 개수 카운트하기
    const countRestTodo = () =>{
        const filterdTodos=todos.filter(todo=>!todo.done);
        return filterdTodos.length;
    };


    useEffect(()=>{
      fetch(API_BASE_URL)
      .then(res => res.json())
      .then(json=>{
        console.log(json.todos);
        setTodos(json.todos);

      });
    },[]);


  return (
    <div className='TodoTemplate'>
        <TodoHeader count={countRestTodo}/>
        <TodoMain todoList={todos} remove={removeTodo} check={checkTodo}/>
        <TodoInput addTodo={addTodo}/>
    </div>
  )
}

export default TodoTemplate