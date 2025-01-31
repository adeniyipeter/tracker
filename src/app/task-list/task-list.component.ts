import { Component, Input, Output, EventEmitter, OnInit, DoCheck } from '@angular/core';
import type { Task } from '../task.service';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, NgxPaginationModule, FormsModule],
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
  currentPage = 1;
  searchTerm: string = '';

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


    if (this.searchTerm) {
      const searchTerm = this.searchTerm.toLowerCase();
      this.filteredTasks = this.filteredTasks.filter(task =>
        task.title.toLowerCase().includes(searchTerm)
      );
    }
  }

  clearSearch() {
    this.searchTerm = ''
    this.filteredTasks = [...this.tasks]; // Reset list
  }

  filterTasks() {
    this.applyFilter()
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
