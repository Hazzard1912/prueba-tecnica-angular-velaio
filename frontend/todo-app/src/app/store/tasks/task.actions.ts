import { createActionGroup, emptyProps, props } from '@ngrx/store';
import { Task } from '../../models/task.model';

export const TaskActions = createActionGroup({
  source: 'Task',
  events: {
  'Add Task': props<{ task: Task }>(),
  'Add Task Success': props<{ task: Task }>(),
  'Add Task Failure': props<{ error: string }>(),

  'Update Task': props<{ task: Task }>(),
  'Update Task Success': props<{ task: Task }>(),
  'Update Task Failure': props<{ error: string }>(),

  'Delete Task': props<{ id: string }>(),
  'Delete Task Success': props<{ id: string }>(),
  'Delete Task Failure': props<{ error: string }>(),

  'Complete Task': props<{ id: string }>(),
  'Complete Task Success': props<{ task: Task }>(),
  'Complete Task Failure': props<{ error: string }>(),

  'Load Tasks': emptyProps(),
  'Load Tasks Success': props<{ tasks: Task[] }>(),
  'Load Tasks Failure': props<{ error: string }>(),
  }
});
