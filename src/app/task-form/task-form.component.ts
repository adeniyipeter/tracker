import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import type { Task } from '../task.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  providers: [DatePipe],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent {
  @Output() taskAdded = new EventEmitter<Task>()

  public taskForm;
  private currentDate: string;

  constructor(private fb: FormBuilder,
    private datePipe: DatePipe) {
    this.currentDate = this.datePipe.transform(new Date(), 'yyyy-MM-dd') || '';
    this.taskForm = this.fb.group({
      title: ["", Validators.required],
      dueDate: [this.currentDate, Validators.required],
      priority: ["medium"],
    });
  }

  onSubmit() {
    if (this.taskForm.valid) {
      const newTask: Task = {
        title: this.taskForm.value.title!,
        completed: false,
        dueDate: this.taskForm.value.dueDate!,
        priority: this.taskForm.value.priority as "low" | "medium" | "high",
      }
      this.taskAdded.emit(newTask)
      this.taskForm.reset({ priority: "medium", dueDate: this.currentDate })
    }
  }

}