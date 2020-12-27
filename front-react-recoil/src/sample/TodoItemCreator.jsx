import { useState } from 'react';
import { todoListState } from './todo';
import { useSetRecoilState } from 'recoil';

const TodoItemCreator = () => {
  const [inputValue, setInputValue] = useState('');
  const setTodoList = useSetRecoilState(todoListState);
	// useSetRecoilState hook을 사용해 set함수만 가져올 수도 있다.
  const addItem = () => {
    setTodoList((oldTodoList) => {
      const id = oldTodoList.length
        ? oldTodoList[oldTodoList.length - 1].id + 1
        : 0; // oldTodoList에 원소가 있으면 그 원소 id + 1을 id로 하고 없으면 0을 id로 한다.
      return [
        ...oldTodoList,
        {
          id,
          text: inputValue,
          isComplete: false,
        },
      ];
    });
    setInputValue('');
  };

  const onChange = ({ target: { value } }) => {
    setInputValue(value);
  };

  return (
    <div>
      <input type='text' value={inputValue} onChange={onChange} />
      <button onClick={addItem}>Add</button>
    </div>
  );
};

export default TodoItemCreator;