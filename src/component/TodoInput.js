import React ,{useState}from 'react'
import { MdAdd } from 'react-icons/md'
import cn from 'classnames';

import './scss/TodoInput.scss';

const TodoInput = ({addTodo}) => {

    //입력값이 열리는 여부를 표현하는 상태값
    const [open,setOpen] = useState(false);

    //할 일 입력창에 입력한 내용을 표현하는 상태값
    const [todoText,setTodoText] = useState('');

    // + 버튼 클릭시 이벤트 처리
    const onToggle = () =>{
        setOpen(!open)
    };

    const showForm = () =>{
        
            return open && (
                <div className='form-wrapper'>
                    <form  className='insert-form'>
                        <input
                            type='text'
                            placeholder='할 일을 입력후, 엔터를 누르세요!'
                        />
                    </form>
                </div>
            )
    };

    //서브밋 이벤트 핸들러
    const submitHandler = e =>{
        e.preventDefault(); //태그의 기본기능 제한
        //console.log('이벤트폼이 제출됌 ');
        //console.log(todoText);
        addTodo(todoText);
        //입력이 끝나면 입력창비우기
        setTodoText('');
    };
    //input change 이벤트 핸들러 함수
    const todoChangeHandler = e =>{
       // console.log(e.target.value);
        setTodoText(e.target.value);
    };
  return (
    <>
        {
            open && (
                <div className='form-wrapper'>
                    <form  className='insert-form' onSubmit={submitHandler}>
                        <input
                            type='text'
                            placeholder='할 일을 입력후, 엔터를 누르세요!' 
                            onChange={todoChangeHandler} autoFocus
                            value={todoText}
                        />
                    </form>
                </div>)
        }
        {/* cn() : 첫번째 파라미터는 항상유지할 클래스
                    두번째 파라미터는 논리상태값
                    => 논리상태값이 true일 경우 해당클래스가 추가
                        false일 경우 제거
                        css이름이 다를경우 ex) abd : open 등으로 명시해주면된다.
                        
        */}
        <button className={cn('insert-btn',{open})} onClick={onToggle}> 
            <MdAdd />
        </button>
    </>
  )
}

export default TodoInput