import { Component ,Output, EventEmitter} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import type { Task } from '../task.service';
@Component({
  selector: 'app-task-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent {
  @Output() taskAdded = new EventEmitter<Task>()

  taskForm;

  constructor(private fb: FormBuilder) {
    this.taskForm = this.fb.group({
      title: ["", Validators.required],
      dueDate: [""],
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
      this.taskForm.reset({ priority: "medium" })
    }
  }

}
