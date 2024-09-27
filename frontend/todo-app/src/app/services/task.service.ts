import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Task } from '../models/task.model';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class TaskService {
  private apiUrl = 'http://localhost:8000/tasks/';

  constructor(private http: HttpClient) { }

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }

  deleteTask(taskId: string): Observable<string> {
    return this.http.delete<string>(this.apiUrl + taskId + '/');
  }

  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(this.apiUrl + task._id + '/', task);
  }

  toggleTask(taskId: string): Observable<Task> {
    return this.http.patch<Task>(this.apiUrl + taskId + '/', {});
  }
}