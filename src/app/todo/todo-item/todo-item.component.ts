import { Todo } from './../../dashboard/dashboard.component';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

export type CheckEvent = { id: number, checked: boolean};

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  @Input() todo!: Todo;
  @Output() onCheck: EventEmitter<CheckEvent> = new EventEmitter();
  constructor() { }

  ngOnInit(): void {
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
  }

}
