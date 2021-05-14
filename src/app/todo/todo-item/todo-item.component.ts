import { Todo } from './../../dashboard/dashboard.component';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ThemeService } from 'src/app/theme';
import { threadId } from 'worker_threads';

export type CheckEvent = { id: number, checked: boolean};

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.scss']
})
export class TodoItemComponent implements OnInit {
  @Input() todo!: Todo;
  @Output() onCheck: EventEmitter<CheckEvent> = new EventEmitter();
  constructor(private themeService: ThemeService) { }

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

  onClickRemove(id: number) {
    this.todo = null;
    // document.getElementById('items__card')[id].style.display = 'none';
  }

}
