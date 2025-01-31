import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { TaskFormComponent } from './task-form/task-form.component';
import { Route } from '@angular/router';
import { TaskListComponent } from './task-list/task-list.component';
import { TaskTrackerComponent } from './task-tracker/task-tracker.component';
import { TaskService } from './task.service';
import { CommonModule } from '@angular/common';
import { provideHttpClient } from '@angular/common/http';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CommonModule,TaskTrackerComponent],

  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'task_tracker';
}
