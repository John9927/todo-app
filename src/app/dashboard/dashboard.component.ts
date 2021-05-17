import { ManagementService } from './../services/management.service';
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
  constructor(private themeService: ThemeService, public mService: ManagementService) { }
  newTodo: Todo;

  handleNewTodo(event: Event) {
    this.mService.valueLength = (event.target as HTMLInputElement).value;
    if(this.mService.valueLength.length >= 3) {
      this.newTodo = {
        id: this.generateSeqId(this.mService.todos, 'id'),
        description: (event.target as HTMLInputElement).value,
        checked: false,
      };
      this.mService.todos = [...this.mService.todos, this.newTodo];
      // SetItem localStorage
      localStorage.setItem("todos", JSON.stringify(this.mService.todos));
    } else if (this.mService.valueLength.length >= 0) {
      this.error = true;
      setTimeout(() => {
        this.error = false;
      }, 3000)
    }
    console.log(this.mService.todos);

    // Svuoto il campo input ogni volta che inserisco un valore
    (<HTMLInputElement>document.getElementById('input')).value = '';
  }

  onClickError() {
    this.error = false;
  }

  handleTodoCheck(msg: CheckEvent) {
    this.mService.todos = this.mService.todos.map((t) => {
      t.id === msg.id ? (t.checked = !t.checked) : t;
      return { ...t };
    })
    console.log(this.mService.todos)
  }

  private generateSeqId(arr: any, prop: any): number {
    return arr.length > 0 ? arr[arr.length - 1][prop] + 1 : 1;
  }

  ngOnInit(): void {
    this.allTodo()
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

  clearCompleted() {
    this.mService.clearCompleted();
  }

  onlyCompleted() {
    document.getElementById('itemCompleted').style.color = "#4646f6";
    document.getElementById('itemActive').style.color = "var(--text)";
    document.getElementById('itemAll').style.color = "var(--text)";
    // Mobile
    document.getElementById('itemCompletedMobile').style.color = "#4646f6";
    document.getElementById('itemActiveMobile').style.color = "var(--text)";
    document.getElementById('itemAllMobile').style.color = "var(--text)";
    this.mService.onlyCompleted();
  }

  onlyActive() {
    document.getElementById('itemActive').style.color = "#4646f6";
    document.getElementById('itemCompleted').style.color = "var(--text)";
    document.getElementById('itemAll').style.color = "var(--text)";
    // Mobile
    document.getElementById('itemActiveMobile').style.color = "#4646f6";
    document.getElementById('itemCompletedMobile').style.color = "var(--text)";
    document.getElementById('itemAllMobile').style.color = "var(--text)";
    this.mService.onlyActive();
  }

  allTodo() {
    document.getElementById('itemAll').style.color = "#4646f6";
    document.getElementById('itemCompleted').style.color = "var(--text)";
    document.getElementById('itemActive').style.color = "var(--text)";
    // Mobile
    document.getElementById('itemAllMobile').style.color = "#4646f6";
    document.getElementById('itemCompletedMobile').style.color = "var(--text)";
    document.getElementById('itemActiveMobile').style.color = "var(--text)";
    this.mService.allTodo();
  }
}
