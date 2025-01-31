import { TaskFormComponent } from './task-form/task-form.component';
import { ApplicationConfig } from '@angular/core';
import { provideRouter, Routes } from '@angular/router';
import { TaskTrackerComponent } from './task-tracker/task-tracker.component';
import { TaskListComponent } from './task-list/task-list.component';
import { provideHttpClient, withFetch } from '@angular/common/http'; // Import withFetch


const routes: Routes = [
    { path: '', component: TaskListComponent },
    { path: 'add', component: TaskFormComponent },
    { path: 'task/:id', component: TaskListComponent },
];

export const appConfig: ApplicationConfig = {
    providers: [provideRouter(routes), provideHttpClient(withFetch())] // Use withFetch()
};
 
