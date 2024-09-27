import { Routes } from '@angular/router';
import { TaskListComponent } from './components/task-list/task-list.component';
import { FormComponent } from './components/form/form.component';

export const routes: Routes = [
    {path: 'tasks', component: TaskListComponent},
    {path: 'tasks/create', component: FormComponent},
    {path: 'tasks/edit/:id', component: FormComponent},
    {path: '', redirectTo: '/tasks', pathMatch: 'full'},
    {path: '**', redirectTo: '/tasks'}
];
