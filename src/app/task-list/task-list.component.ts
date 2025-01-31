import { Component, Input, Output, EventEmitter, OnInit, DoCheck } from '@angular/core';
import type { Task } from '../task.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent implements OnInit, DoCheck {
  @Input() tasks: Task[] = [];
  @Output() taskToggled = new EventEmitter<Task>();
  @Output() taskDeleted = new EventEmitter<number>();
  @Output() taskEdited = new EventEmitter<Task>();

  currentFilter: 'all' | 'active' | 'completed' = 'all';
  filteredTasks: Task[] = [];

  ngOnInit(): void {
    this.applyFilter();
  }

  ngDoCheck(): void {
    this.applyFilter();
  }

  applyFilter() {
    this.filteredTasks = this.tasks.filter(task => {
      if (this.currentFilter === 'active') return !task.completed;
      if (this.currentFilter === 'completed') return task.completed;
      return true;
    });
  }

  toggleTask(task: Task) {
    task.completed = !task.completed;
    this.taskToggled.emit(task);
    this.applyFilter();
  }

  deleteTask(id: number) {
    this.taskDeleted.emit(id);
  }

  editTask(task: Task) {
    this.taskEdited.emit(task);
  }

  setFilter(filter: 'all' | 'active' | 'completed') {
    this.currentFilter = filter;
    this.applyFilter();
  }
}
