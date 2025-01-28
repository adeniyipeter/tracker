import { Component, signal, effect, Inject, PLATFORM_ID, AfterViewInit, Renderer2 } from '@angular/core';
import { CommonModule, isPlatformServer } from '@angular/common';
import { TaskFormComponent } from '../task-form/task-form.component';
import { TaskListComponent } from '../task-list/task-list.component';
import { TaskService, Task } from '../task.service';

@Component({
  selector: 'app-task-tracker',
  standalone: true,
  imports: [TaskFormComponent, TaskListComponent, CommonModule],
  providers: [TaskService],
  templateUrl: './task-tracker.component.html',
  styleUrls: ['./task-tracker.component.css']
})
export class TaskTrackerComponent implements AfterViewInit {
  tasks = signal<Task[]>([]);
  filter = signal<"all" | "active" | "completed">("all");
  darkMode = signal<boolean>(false);

  constructor(private taskService: TaskService,
              @Inject(PLATFORM_ID) private platformId: Object,
              private renderer: Renderer2) {
    this.loadTasks();

  }

    ngAfterViewInit(): void {
        effect(() => {
              if(isPlatformServer(this.platformId)){
                  return;
              }
                if (this.darkMode()) {
                  this.renderer.addClass(document.documentElement, 'dark');
                  } else {
                    this.renderer.removeClass(document.documentElement, 'dark');
                }
          });
      }

  loadTasks() {
    this.taskService.getTasks().subscribe((tasks) => this.tasks.set(tasks.slice(0, 10)));
  }

  addTask(task: Task) {
    this.taskService.addTask(task).subscribe((newTask) => this.tasks.update((tasks) => [newTask, ...tasks]));
  }

  toggleTask(task: Task) {
    const updatedTask = { ...task, completed: !task.completed };
    this.taskService.updateTask(updatedTask).subscribe(() => this.tasks.update((tasks) => tasks.map((t) => (t.id === task.id ? updatedTask : t))));
  }

  deleteTask(id: number) {
    this.taskService.deleteTask(id).subscribe(() => this.tasks.update((tasks) => tasks.filter((t) => t.id !== id)));
  }

  editTask(updatedTask: Task) {
    this.taskService.updateTask(updatedTask).subscribe(() => this.tasks.update((tasks) => tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t))));
  }

  filteredTasks() {
    return this.tasks().filter((task) => {
      if (this.filter() === "active") return !task.completed;
      if (this.filter() === "completed") return task.completed;
      return true;
    });
  }

  setFilter(filter: "all" | "active" | "completed") {
    this.filter.set(filter);
  }

  toggleDarkMode() {
    this.darkMode.update((value) => !value);
  }
}
