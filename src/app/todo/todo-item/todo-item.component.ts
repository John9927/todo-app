import { ManagementService } from './../../services/management.service';
import { Todo } from './../../dashboard/dashboard.component';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ThemeService } from 'src/app/theme';

export type CheckEvent = { id: number, checked: boolean};

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  @Input() todo!: Todo;
  @Output() onCheck: EventEmitter<CheckEvent> = new EventEmitter();
  constructor(private themeService: ThemeService, private mService: ManagementService) { }

  ngOnInit(): void {
    var todos = JSON.parse(localStorage.getItem("todosCompleted"))
    this.todo = { ...this.todo };
  }

  get checkedStyles() {
    return {'text-decoration': this.todo.checked ? 'line-through' : '', 'color': this.todo.checked ? 'hsl(236, 9%, 61%)' : ''}
  }

  get checkedCircle() {
    return {'dispay': this.todo.checked ? 'flex': 'none'}
  }

  handleCheck() {
    this.onCheck.emit({ id: this.todo.id, checked: !this.todo.checked });
    // SetItem check
    localStorage.setItem("todos", JSON.stringify(this.mService.todos));
  }

  onClickRemove(id: number) {
    localStorage.setItem("todos", JSON.stringify(this.mService.todos));
    this.mService.deleteTodoById(id);
  }
}
