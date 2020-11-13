import styled from "styled-components";
import { Button } from "./Utils";
import { memo, useCallback } from "react";

const TodosWrapper = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  border-radius: 0 0 10px 10px;
`;

const StyledTodoItem = styled.li`
  display: flex;
  align-items: stretch;
  height: 60px;
  transition: 0.3s;
  opacity: 1;
  & + & {
    border-top: 1px solid #ccc;
  }

  > div {
    display: flex;
    align-items: center;
    padding: ${(props) => props.theme.padding.m};
  }
`;

const StyledContent = styled(Content)`
  flex-grow: 1;
  & > input {
    position: relative;
    outline: none;
    width: 100%;
    padding: 2px 0;
    top: 3px;
    transition: 0.3s;
    color: inherit;
    border: none;
    border-bottom: 1px solid #99999900;
    transition: 0.3s ease-in-out;
  }

  & > input:focus {
    color: #777;
    border-bottom: 1px solid #999999ff;
    outline: none;
  }
`;

function Content({ className, content, onChange }) {
  return (
    <div className={className}>
      <input value={content} onChange={onChange}></input>
    </div>
  );
}

const CheckButton = styled(({ isDone, ...props }) => <Button {...props} />)`
  border-right: 1px solid #ccc;
  color: transparent;
  user-select: none;
  font-size: 1.2em;

  & div {
    background: linear-gradient(to top, #eee 52%, #999 48%);
    background-clip: text;
    -webkit-background-clip: text;
    background-size: 100% 200%;
    background-position: 0% -100%;
    transition: background-position 0.3s ease-in-out, transform 0.1s;
    ${(props) =>
      props.isDone &&
      `transition: background-position .3s ease-in-out, transform .1s;
    background-position: 0% 0%;`}
  }

  &:hover div {
    text-shadow: none;
    background-position: 0% 0%;
  }
`;

const TodoItem = ({
  todo,
  toggleTodoDone,
  updateTodoContent,
  deleteTodo,
}) => {
  const handleContentUpdate = (e) => {
    updateTodoContent(todo.id, e.target.value);
  };
  const handleDeleteButton = () => {
    deleteTodo(todo.id);
  };
  const handleToggleButton = () => {
    toggleTodoDone(todo.id);
  };

  return (
    <StyledTodoItem key={todo.id}>
      <CheckButton
        isDone={todo.isDone}
        onClick={handleToggleButton}
        value="✔"
      />
      <StyledContent
        onChange={handleContentUpdate}
        content={todo.content}
      />
      <Button onClick={handleDeleteButton} value="⨯" />
    </StyledTodoItem>
  );
};

const MemoTodoItem = memo(TodoItem);

export default function Todolist({
  todosData,
  deleteTodo,
  toggleTodoDone,
  updateTodoContent,
}) {
  const todoList = todosData.map((todo) => {
    return (
      <MemoTodoItem
        todo={todo}
        toggleTodoDone={toggleTodoDone}
        updateTodoContent={updateTodoContent}
        deleteTodo={deleteTodo}
      />
    );
  });
  return <TodosWrapper>{todoList}</TodosWrapper>;
}
