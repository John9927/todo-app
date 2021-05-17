import { Todo } from './../dashboard/dashboard.component';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ManagementService {
  valueLength: any;
  todos: Todo[] = [];
  clear = false;
  constructor() { }

  allTodo() {
    var arr = JSON.parse(localStorage.getItem("todos"));
    this.todos = arr.filter(t => t);
  }

  onlyActive() {
    var arr = JSON.parse(localStorage.getItem("todos"));
    this.todos = arr.filter(t => t.checked == false);
  }

  onlyCompleted() {
    var arr = JSON.parse(localStorage.getItem("todos"));
    this.todos = arr.filter(t => t.checked == true);
  }

  clearCompleted() {
    var arr = JSON.parse(localStorage.getItem("todos"));
    this.todos = arr.filter(t => t.checked == false);
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }

  deleteTodoById(id: number) {
    this.todos = this.todos.filter(t => t.id !== id)
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }
}
