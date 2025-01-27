import { Component,Input, Output, EventEmitter } from '@angular/core';
import type { Task } from '../task.service';
import {FormsModule} from '@angular/forms'
import { pipe } from 'rxjs';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {
  @Input() tasks: Task[] = []
  @Output() taskToggled = new EventEmitter<Task>()
  @Output() taskDeleted = new EventEmitter<number>()
  @Output() taskEdited = new EventEmitter<Task>()

  currentFilter: "all" | "active" | "completed" = "all"

  toggleTask(task: Task) {
    this.taskToggled.emit(task)
  }

  deleteTask(id: number) {
    this.taskDeleted.emit(id)
  }

  editTask(task: Task) {
    this.taskEdited.emit(task)
  }

  setFilter(filter: "all" | "active" | "completed") {
    this.currentFilter = filter
  }
}
