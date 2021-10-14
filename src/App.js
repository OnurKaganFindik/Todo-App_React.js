import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import React, { Component } from 'react';

export class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tasks: [
        { task: "Go to shopping", isDone: false },
        { task: "Do homework", isDone: true }
      ]
    };
  }
  render() {
    return (
      <div className="App">
        <h1>My Todos</h1>
        <form onSubmit={(e) => this.handleSubmit(e)}>
          <input name="task" type="text" placeholder="Do something.." required />
          <button>Add</button>
        </form>
        <ul className="todos-list">
          {this.state.tasks
            .sort((a,b) => a.isDone == b.isDone ? a.task.localeCompare(b.task) : a.isDone - b.isDone)
            .map((value, index) =>
            <li key={index} className={"task-list-item " + (value.isDone ? 'done': 'undone')}>
              <input type="checkbox" checked={value.isDone}
                onChange={(e) => this.updateTodoStatus(e, index)} />
              <span>{value.task}</span>
              <a href="#" className="btn-delete-task" onClick={(e) => this.handleDelete(e, index)}><i className="fas fa-times"></i></a>
            </li>
          )}
        </ul>
      </div>
    );
  }

  handleDelete(e, index) {
    e.preventDefault();
    const tasks = [...this.state.tasks];
    tasks.splice(index, 1);
    this.setState({ tasks: tasks });
  }

  handleSubmit(e) {
    e.preventDefault();
    const newTask = { task: e.target.task.value, isDone: false };
    const tasks = [...this.state.tasks, newTask];
    this.setState({ tasks: tasks });
    e.target.reset();
  }
  updateTodoStatus(e, index) {
    const newTodos = [...this.state.tasks]; // mevcut dizinin kopyası
    newTodos[index].isDone = e.target.checked;
    this.setState({ task: newTodos });
  }
}
export default App;