import React from 'react';
import { observer } from 'mobx-react';
import observableTodoStore from './observableTodoStore';
import TodoItem from './TodoItem';

const TodoList = observer(({ store }) => {
  const onNewTodo = () => {
    store.addTodo(prompt('Enter a new todo:', 'coffee plz'));
  };

  return (
    <div>
      {store.report}
      <ul>
        {store.todos.map((todo, idx) => (
          <TodoItem todo={todo} key={idx} />
        ))}
      </ul>
      {store.pendingRequests > 0 ? <marquee>Loading...</marquee> : null}
      <button onClick={onNewTodo}>New Todo</button>
      <i> (double-click a todo to edit)</i>
      <br />
      <button onClick={store.loadMore}>Load more</button>
    </div>
  );
});

export default () => <TodoList store={observableTodoStore} />;
