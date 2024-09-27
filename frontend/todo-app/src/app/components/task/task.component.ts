import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Task } from '../../models/task.model';
import { Router } from '@angular/router';
import { State } from '../../store/tasks/task.reducer';
import { Store } from '@ngrx/store';
import { TaskActions } from '../../store/tasks/task.actions';

@Component({
  selector: 'app-task',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task.component.html',
  styleUrls: ['./task.component.css']
})
export class TaskComponent {
  @Input() task!: Task;

  constructor(private store: Store<{ tasks: State }>, private router: Router) { }

  completeTask(taskId: string): void {
    this.store.dispatch(TaskActions.completeTask({ id: taskId }));
  }

  deleteTask(taskId: string): void {
    this.store.dispatch(TaskActions.deleteTask({ id: taskId }));
  }

  editTask(): void {
    this.router.navigate(['tasks/edit', this.task._id]);
  }
}
