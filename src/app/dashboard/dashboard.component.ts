import { Component, OnInit } from '@angular/core';
import { CheckEvent } from '../todo/todo-item/todo-item.component';

export type Todo = { id: number; description: string, checked: boolean };

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor() { }

  todos: Todo[] = [];

  handleNewTodo(event: Event) {
    console.log(event);
    const newTodo: Todo = {
      id: this.generateSeqId(this.todos, 'id'),
      description: (event.target as HTMLInputElement).value,
      checked: false,
    };
    this.todos = [...this.todos, newTodo];
  }

  handleTodoCheck(msg: CheckEvent) {
    this.todos = this.todos.map((t) => {
      t.id === msg.id ? (t.checked = !t.checked) : t;
      return { ...t };
    })
    console.log(this.todos)
  }

  private generateSeqId(arr: any, prop: any): number {
    return arr.length > 0 ? arr[arr.length - 1][prop] + 1 : 1;
  }


  ngOnInit(): void {
  }
}
