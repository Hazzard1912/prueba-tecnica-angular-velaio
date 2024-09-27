import { createReducer, on } from '@ngrx/store';
import { TaskActions } from './task.actions';
import { Task } from '../../models/task.model';

export const taskFeatureKey = 'task';

export interface State {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

export const initialState: State = {
  tasks: [],
  loading: false,
  error: null,
};

export const reducer = createReducer(
  initialState,

  // Load tasks
  on(TaskActions.loadTasks, (state) => ({
    ...state,
    loading: true,
    error: null
  })),
  on(TaskActions.loadTasksSuccess, (state, { tasks }) => ({
    ...state,
    tasks,
    loading: false,
    error: null
  })),
  on(TaskActions.loadTasksFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error
  })),

  // Add task
  on(TaskActions.addTaskSuccess, (state, { task }) => ({
    ...state,
    tasks: [...state.tasks, task],
  })),
  on(TaskActions.addTaskFailure, (state, { error }) => ({
    ...state,
    error
  })),

  // Update task
  on(TaskActions.updateTaskSuccess, (state, { task }) => ({
    ...state,
    tasks: state.tasks.map((t) => (t._id === task._id ? task : t)),
  })),
  on(TaskActions.updateTaskFailure, (state, { error }) => ({
    ...state,
    error
  })),

  // Delete task
  on(TaskActions.deleteTaskSuccess, (state, { id }) => ({
    ...state,
    tasks: state.tasks.filter((task) => task._id !== id),
  })),
  on(TaskActions.deleteTaskFailure, (state, { error }) => ({
    ...state,
    error
  })),

  // Complete task
  on(TaskActions.completeTaskSuccess, (state, { task }) => ({
    ...state,
    tasks: state.tasks.map((t) => (t._id === task._id ? task : t)),
  })),
  on(TaskActions.completeTaskFailure, (state, { error }) => ({
    ...state,
    error
  }))
);