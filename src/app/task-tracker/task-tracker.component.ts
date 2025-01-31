import { Component, OnInit, Renderer2 } from '@angular/core';
import { TaskService, Task } from '../task.service';
import { CommonModule } from '@angular/common';
import { TaskFormComponent } from '../task-form/task-form.component';
import { TaskListComponent } from '../task-list/task-list.component';

@Component({
  selector: 'app-task-tracker',
  standalone: true,
  imports: [TaskFormComponent, TaskListComponent, CommonModule],
  providers: [TaskService],
  templateUrl: './task-tracker.component.html',
  styleUrls: ['./task-tracker.component.css']
})
export class TaskTrackerComponent implements OnInit {
  tasks: Task[] = [];
  filteredTasks: Task[] = [];
  currentFilter: 'all' | 'active' | 'completed' = 'all';
  darkMode: boolean = false; // Added dark mode state

  constructor(private taskService: TaskService, private renderer: Renderer2) { }

  ngOnInit(): void {
    this.loadTasks();
    this.loadDarkMode(); // Load dark mode preference
  }

  loadTasks() {
    this.taskService.getTasks().subscribe((tasks) => {
      this.tasks = tasks;
      this.applyFilter(); // Apply the filter after loading tasks
    });
  }

  addTask(task: Task) {
    this.taskService.addTask(task).subscribe((newTask) => {
      this.tasks.unshift(newTask); // Add the new task to the front
      this.applyFilter();
    });
  }

  toggleTask(task: Task) {
    const updatedTask = { ...task, completed: !task.completed };
    this.taskService.updateTask(updatedTask).subscribe(() => {
      const index = this.tasks.findIndex(t => t.id === task.id);
      if (index !== -1) this.tasks[index] = updatedTask;
      this.applyFilter();
    });
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(() => {
      this.tasks = this.tasks.filter(task => task.id !== id);
      this.applyFilter();
    });
  }

  editTask(updatedTask: Task) {
    this.taskService.updateTask(updatedTask).subscribe(() => {
      const index = this.tasks.findIndex(t => t.id === updatedTask.id);
      if (index !== -1) this.tasks[index] = updatedTask;
      this.applyFilter();
    });
  }

  applyFilter() {
    if (this.currentFilter === 'active') {
      this.filteredTasks = this.tasks.filter(task => !task.completed);
    } else if (this.currentFilter === 'completed') {
      this.filteredTasks = this.tasks.filter(task => task.completed);
    } else {
      this.filteredTasks = this.tasks; // Return all tasks if no specific filter
    }
  }

  setFilter(filter: 'all' | 'active' | 'completed') {
    this.currentFilter = filter;
    this.applyFilter();
  }

  toggleDarkMode() {
    this.darkMode = !this.darkMode;
    if (this.darkMode) {
      this.renderer.addClass(document.documentElement, 'dark');
    } else {
      this.renderer.removeClass(document.documentElement, 'dark');
    }
    localStorage.setItem('darkMode', JSON.stringify(this.darkMode)); // Save preference
  }

  loadDarkMode() {
    const savedMode = localStorage.getItem('darkMode');
    if (savedMode) {
      this.darkMode = JSON.parse(savedMode);
      if (this.darkMode) {
        this.renderer.addClass(document.documentElement, 'dark');
      } else {
        this.renderer.removeClass(document.documentElement, 'dark');
      }
    }
  }
}
