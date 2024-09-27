import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { map, Observable } from 'rxjs';
import { Task } from '../../models/task.model';
import { Store } from '@ngrx/store';
import { State } from '../../store/tasks/task.reducer';
import { TaskActions } from '../../store/tasks/task.actions';
import { TaskComponent } from "../task/task.component";
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, TaskComponent, RouterModule],
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks$: Observable<Task[]> | undefined;
  filteredTasks: Task[] = [];
  filter: 'all' | 'completed' | 'pending' = 'all';

  constructor(private store: Store<{ tasks: State }>) { }

  ngOnInit(): void {
    this.store.dispatch(TaskActions.loadTasks());
    this.tasks$ = this.store.select(state => state.tasks.tasks);
    this.tasks$!.subscribe(tasks => {
      this.filteredTasks = this.applyFilter(tasks);
    });
  }

  applyFilter(tasks: Task[]): Task[] {
    switch (this.filter) {
      case 'completed':
        return tasks.filter(task => task.is_completed);
      case 'pending':
        return tasks.filter(task => !task.is_completed);
      case 'all':
      default:
        return tasks;
    }
  }

  setFilter(filter: 'all' | 'completed' | 'pending'): void {
    if (this.filter === filter) {
      return;
    }
    this.filter = filter;
    this.tasks$!.subscribe(tasks => {
      this.filteredTasks = this.applyFilter(tasks);
    });
  }
}