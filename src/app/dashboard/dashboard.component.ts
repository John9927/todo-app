import { Component, OnInit } from '@angular/core';
import { ThemeService } from '../theme';
import { CheckEvent } from '../todo/todo-item/todo-item.component';

export type Todo = { id: number; description: string, checked: boolean };

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  root: any;
  light: any;
  error = false;

  constructor(private themeService: ThemeService) { }

  todos: Todo[] = [];

  handleNewTodo(event: Event) {
    console.log(event);
    let valueLength = (event.target as HTMLInputElement).value;
    if(valueLength.length >= 3) {
      const newTodo: Todo = {
        id: this.generateSeqId(this.todos, 'id'),
        description: (event.target as HTMLInputElement).value,
        checked: false,
      };
      this.todos = [...this.todos, newTodo];
    } else if (valueLength.length >= 0) {
      this.error = true;
      setTimeout(() => {
        this.error = false;
      }, 3000)
    }
    // Svuoto il campo input ogni volta che inserisco un valore
    (<HTMLInputElement>document.getElementById('input')).value = '';
  }

  onClickError() {
    this.error = false;
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

  toggle() {
    const active = this.themeService.getActiveTheme();
    if (active.name === 'light') {
      localStorage.setItem("luce", "dark");
      this.themeService.setTheme('dark');
    } else {
      localStorage.setItem("luce", "light");
      this.themeService.setTheme('light');
    }
  }
}
