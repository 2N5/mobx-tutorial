import { observable, computed, action, autorun, makeObservable } from 'mobx';

class ObservableTodoStore {
  todos = [];
  pendingRequests = 0;

  constructor() {
    makeObservable(this, {
      todos: observable,
      pendingRequests: observable,
      completedTodosCount: computed,
      report: computed,
      addTodo: action,
      loadMore: action,
    });
    autorun(() => console.log(this.report));
  }

  get completedTodosCount() {
    return this.todos.filter((todo) => todo.completed === true).length;
  }

  get report() {
    if (this.todos.length === 0) return '<none>';
    const nextTodo = this.todos.find((todo) => todo.completed === false);
    return (
      `Next todo: "${nextTodo ? nextTodo.task : '<none>'}". ` +
      `Progress: ${this.completedTodosCount}/${this.todos.length}`
    );
  }

  addTodo(task) {
    this.todos.push({
      task: task,
      completed: false,
      assignee: null,
    });
  }

  loadMore() {
    observableTodoStore.pendingRequests++;
    setTimeout(() => {
      observableTodoStore.addTodo('Random Todo ' + Math.random());
      observableTodoStore.pendingRequests--;
    }, 2000);
  }
}

const observableTodoStore = new ObservableTodoStore();
export const peopleStore = observable([{ name: 'Michel' }, { name: 'Me' }]);

observableTodoStore.todos.push({ task: 'test1', completed: false });
observableTodoStore.todos.push({ task: 'test2', completed: false });

observableTodoStore.todos[0].assignee = peopleStore[0];
observableTodoStore.todos[1].assignee = peopleStore[1];

export default observableTodoStore;
